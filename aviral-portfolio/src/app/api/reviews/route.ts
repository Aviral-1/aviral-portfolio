import { NextRequest, NextResponse } from "next/server";
import { jsonDB, Review } from "@/lib/jsonDB";

/* ─────────────────────────── helpers ─────────────────────────── */

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "")
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
  
  // Cleanup old entries
  if (rateLimitMap.size > 1000) {
    const oldestKey = rateLimitMap.keys().next().value;
    if (oldestKey) rateLimitMap.delete(oldestKey);
  }
  return false;
}

/* ─────────────────────────── GET ─────────────────────────── */

export async function GET() {
  try {
    const reviews = await jsonDB.getReviews();
    return NextResponse.json(reviews, { status: 200 });
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

    // Sanitize and Validate
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

    // Save to JSON DB
    const newReview: Review = {
      name,
      content: message,
      image: profileImage,
      linkedin: linkedinProfile,
      email,
      role: jobTitle,
    };

    const saved = await jsonDB.addReview(newReview);
    return NextResponse.json(saved, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[POST /api/reviews] Error:", msg);
    return NextResponse.json({ error: "Failed to save review. Please try again." }, { status: 500 });
  }
}
