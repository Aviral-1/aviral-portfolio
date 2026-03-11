import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";
import { jsonDB } from "@/lib/jsonDB";

/* ─────────────────────────── helpers ─────────────────────────── */

/** Strip HTML tags to prevent stored XSS */
function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "") // remove HTML tags
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .trim();
}

/** In-memory rate limiter — 1 submission per IP per 60 seconds */
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const last = rateLimitMap.get(ip);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_MS) return true;
  rateLimitMap.set(ip, now);
  // Prevent memory leak: cap at 1000 entries
  if (rateLimitMap.size > 1000) {
    const oldestKey = rateLimitMap.keys().next().value;
    if (oldestKey) rateLimitMap.delete(oldestKey);
  }
  return false;
}

const isMongoDB = !!process.env.MONGODB_URI &&
  !process.env.MONGODB_URI.includes("<username>");

/* ─────────────────────────── GET ─────────────────────────── */

export async function GET() {
  try {
    if (isMongoDB) {
      await connectDB();
      const reviews = await Review.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(); // Returns plain JS objects — ~60% less memory than Mongoose docs
      return NextResponse.json(reviews, { status: 200 });
    } else {
      // Fall back to JSON file storage
      const reviews = await jsonDB.getReviews();
      return NextResponse.json(reviews.slice(0, 10), { status: 200 });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET /api/reviews] Error:", msg);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

/* ─────────────────────────── POST ─────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    // Rate limiting by IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait 60 seconds before trying again." },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Sanitize all string inputs
    const name = sanitize(body.name);
    const message = sanitize(body.message);
    const profileImage = typeof body.profileImage === "string" ? body.profileImage : "";
    const linkedinProfile = sanitize(body.linkedinProfile);
    const email = sanitize(body.email);
    const jobTitle = sanitize(body.jobTitle);

    // Server-side validation
    const errors: string[] = [];
    if (!name || name.length < 2) errors.push("Name must be at least 2 characters.");
    if (!message || message.length < 20) errors.push("Review must be at least 20 characters.");
    if (message && message.length > 1000) errors.push("Review cannot exceed 1000 characters.");
    if (linkedinProfile && !/^(https?:\/\/)?(www\.)?linkedin\.com\/.+/.test(linkedinProfile)) {
      errors.push("LinkedIn URL is not valid.");
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Email address is not valid.");
    }
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
    }

    const reviewData = { name, message, profileImage, linkedinProfile, email, jobTitle };

    if (isMongoDB) {
      await connectDB();
      const review = await Review.create(reviewData);
      return NextResponse.json(review.toObject(), { status: 201 });
    } else {
      // Fall back to JSON file storage
      const review = await jsonDB.addReview({
        name,
        content: message,
        image: profileImage,
        linkedin: linkedinProfile,
        email,
        role: jobTitle,
      });
      return NextResponse.json(review, { status: 201 });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[POST /api/reviews] Error:", msg);
    return NextResponse.json({ error: "Failed to save review. Please try again." }, { status: 500 });
  }
}
