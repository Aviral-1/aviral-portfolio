import { NextRequest, NextResponse } from "next/server";
import { jsonDB } from "@/lib/jsonDB";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/* ─────────────────────────── helpers ─────────────────────────── */

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .trim();
}

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const last = rateLimitMap.get(ip);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_MS) return true;
  rateLimitMap.set(ip, now);
  if (rateLimitMap.size > 1000) {
    const oldestKey = rateLimitMap.keys().next().value;
    if (oldestKey) rateLimitMap.delete(oldestKey);
  }
  return false;
}

/* ─────────────────────────── GET ─────────────────────────── */

export async function GET() {
  try {
    // Always serve from the static deployed file
    const reviews = await jsonDB.getReviews();
    return NextResponse.json(reviews.slice(0, 10), { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET /api/reviews] Error:", msg);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

/* ─────────────────────────── POST ─────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait 60 seconds." },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const name = sanitize(body.name);
    const message = sanitize(body.message);
    const profileImage = typeof body.profileImage === "string" ? body.profileImage : "";
    const linkedinProfile = sanitize(body.linkedinProfile);
    const email = sanitize(body.email);
    const jobTitle = sanitize(body.jobTitle);

    const errors: string[] = [];
    if (!name || name.length < 2) errors.push("Name must be at least 2 characters.");
    if (!message || message.length < 20) errors.push("Review must be at least 20 characters.");
    if (message && message.length > 1000) errors.push("Review cannot exceed 1000 characters.");
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
    }

    const reviewData = { name, message, profileImage, linkedinProfile, email, role: jobTitle };

    // Use Email Notification in Production
    if (process.env.NODE_ENV === "production") {
      if (!resend) {
         return NextResponse.json(
            { 
              error: "Configuration Required", 
              details: `Review submissions require an email provider in production. Please set RESEND_API_KEY and ADMIN_EMAIL in Vercel settings.` 
            },
            { status: 501 }
          );
      }

      // Send Email
      // Resend requires a verified domain to send from, but 'onboarding@resend.dev' works for testing
      // However, it can only send TO the email address you registered with Resend.
      const adminEmail = process.env.ADMIN_EMAIL || "delivered@resend.dev"; 
      
      const emailHtml = `
        <h2>New Review Submission!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>LinkedIn:</strong> ${linkedinProfile}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
        <br/>
        <p><strong>To add this to your site, copy the JSON below into data/reviews.json:</strong></p>
        <pre>
{
  "name": "${name}",
  "role": "${jobTitle}",
  "linkedin": "${linkedinProfile}",
  "email": "${email}",
  "content": ${JSON.stringify(message)},
  "image": "${profileImage}",
  "_id": "${Date.now().toString()}",
  "createdAt": "${new Date().toISOString()}"
},
        </pre>
      `;

      try {
        const { error } = await resend.emails.send({
          from: 'Portfolio <onboarding@resend.dev>',
          to: adminEmail,
          subject: `New Portfolio Review from ${name}`,
          html: emailHtml,
        });

        if (error) {
           console.error("[POST /api/reviews] Resend Error:", error);
           return NextResponse.json({ error: "Failed to send email notification.", details: error.message }, { status: 500 });
        }

        // Return a mock review object so the UI considers it a success
        return NextResponse.json({ ...reviewData, _id: "pending_approval" }, { status: 201 });
      } catch (e: any) {
        console.error("[POST /api/reviews] Email Error:", e.message);
        return NextResponse.json({ error: "Internal error sending email." }, { status: 500 });
      }

    } else {
      // Local Fallback (just write to file so dev mode is easy)
      try {
        const review = await jsonDB.addReview({
          name,
          content: message,
          image: profileImage,
          linkedin: linkedinProfile,
          email,
          role: jobTitle,
        });
        return NextResponse.json(review, { status: 201 });
      } catch (jsonError: any) {
         return NextResponse.json({ error: "Local save failed." }, { status: 500 });
      }
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[POST /api/reviews] Error:", msg);
    return NextResponse.json({ error: "Failed to save review. Please try again." }, { status: 500 });
  }
}
