import { NextRequest, NextResponse } from "next/server";
import { jsonDB } from "@/lib/jsonDB";

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ helpers ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .trim();
}

/** In-memory rate limiter ΓÇö 1 submission per IP per 60 seconds */
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

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ GET ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */

export async function GET() {
  try {
    const reviews = await jsonDB.getReviews();
    return NextResponse.json(reviews.slice(0, 10), { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET /api/reviews] Error:", msg);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ POST ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */

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
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
    }

    const reviewData = {
      name,
      role: jobTitle,
      content: message,
      image: profileImage,
      linkedin: linkedinProfile,
      email,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // --- Git-Based "Save in Code" Logic for Production ---
    if (process.env.NODE_ENV === "production" || process.env.GITHUB_TOKEN) {
      const token = process.env.GITHUB_TOKEN;
      const repo = process.env.GITHUB_REPO || "Aviral-1/aviral-portfolio";
      const filePath = "data/reviews.json";

      if (!token) {
        return NextResponse.json(
          { error: "Configuration Required", details: "Please set GITHUB_TOKEN in Vercel settings to save reviews in code." },
          { status: 501 }
        );
      }

      try {
        // 1. Get current file content and SHA
        const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!getRes.ok) {
          throw new Error(`Failed to fetch file from GitHub: ${getRes.statusText}`);
        }

        const fileData = await getRes.json();
        const sha = fileData.sha;
        const currentContent = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));

        // 2. Add new review
        const updatedContent = [reviewData, ...currentContent];
        const newBinaryContent = Buffer.from(JSON.stringify(updatedContent, null, 2)).toString('base64');

        // 3. Commit back to GitHub
        const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `feat: add new review from ${name} [skip ci]`,
            content: newBinaryContent,
            sha: sha,
          }),
        });

        if (!putRes.ok) {
          throw new Error(`Failed to commit review to GitHub: ${putRes.statusText}`);
        }

        return NextResponse.json(reviewData, { status: 201 });
      } catch (err: any) {
        console.error("[POST /api/reviews] GitHub Error:", err.message);
        return NextResponse.json({ error: "Failed to save review in code.", details: err.message }, { status: 500 });
      }
    } else {
      // Local development fallback: Save to local file
      try {
        const review = await jsonDB.addReview({
          name,
          role: jobTitle,
          content: message,
          image: profileImage,
          linkedin: linkedinProfile,
          email,
        });
        return NextResponse.json(review, { status: 201 });
      } catch (err) {
        return NextResponse.json({ error: "Local save failed." }, { status: 500 });
      }
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[POST /api/reviews] Error:", msg);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
