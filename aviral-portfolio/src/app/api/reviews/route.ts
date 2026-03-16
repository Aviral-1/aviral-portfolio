import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/* ── types ── */
interface Review {
  _id?: string;
  name: string;
  role?: string;
  org?: string;
  email?: string;
  linkedin?: string;
  content: string;
  image?: string;
  avatar?: string;
  createdAt?: string;
}

/* ── constants ── */
const DATA_PATH = path.join(process.cwd(), "data", "reviews.json");

/* ── in-memory store (Vercel fallback) ── */
const memoryStore: Review[] = [];

/* ── helpers ── */
function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .trim();
}

async function readReviews(): Promise<Review[]> {
  try {
    if (!fs.existsSync(DATA_PATH)) return [];
    const data = await fs.promises.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeReview(review: Review): Promise<{ saved: Review; persisted: boolean }> {
  const newReview: Review = {
    ...review,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  /* Try filesystem first */
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const reviews = await readReviews();
    reviews.unshift(newReview);
    const TEMP = `${DATA_PATH}.tmp`;
    await fs.promises.writeFile(TEMP, JSON.stringify(reviews, null, 2), "utf8");
    await fs.promises.rename(TEMP, DATA_PATH);
    return { saved: newReview, persisted: true };
  } catch (err) {
    // Filesystem unavailable (Vercel read-only) — use in-memory
    console.warn("[reviews] Filesystem write failed, using in-memory store:", err);
    memoryStore.unshift(newReview);
    return { saved: newReview, persisted: false };
  }
}

/* ── Rate-limiter ── */
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const last = rateLimitMap.get(ip);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_MS) return true;
  rateLimitMap.set(ip, now);
  if (rateLimitMap.size > 1000) {
    const oldKey = rateLimitMap.keys().next().value;
    if (oldKey) rateLimitMap.delete(oldKey);
  }
  return false;
}

/* ── GET ── */
export async function GET() {
  try {
    const fsReviews = await readReviews();
    // Merge memory store reviews that aren't already on disk
    const fsIds = new Set(fsReviews.map((r) => r._id));
    const merged = [...memoryStore.filter((r) => !fsIds.has(r._id)), ...fsReviews];
    return NextResponse.json(merged, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

/* ── POST ── */
export async function POST(req: NextRequest) {
  try {
    /* Rate limiting */
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait 60 seconds and try again." },
        { status: 429 }
      );
    }

    /* Parse body */
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    /* Sanitize */
    const name = sanitize(body.name);
    const message = sanitize(body.message);
    const profileImage = typeof body.profileImage === "string" ? body.profileImage : "";
    const linkedinProfile = sanitize(body.linkedinProfile);
    const email = sanitize(body.email);
    const jobTitle = sanitize(body.jobTitle);

    /* Validate */
    const errs: string[] = [];
    if (!name || name.length < 2) errs.push("Name must be at least 2 characters.");
    if (!message || message.length < 20) errs.push("Review must be at least 20 characters.");
    if (message && message.length > 2000) errs.push("Review cannot exceed 2000 characters.");
    if (errs.length) {
      return NextResponse.json({ error: errs.join(" ") }, { status: 422 });
    }

    /* Save */
    const { saved } = await writeReview({
      name,
      content: message,
      image: profileImage,
      linkedin: linkedinProfile,
      email,
      role: jobTitle,
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[POST /api/reviews] Unexpected error:", msg);
    return NextResponse.json(
      {
        error: "Something went wrong while saving your review.",
        details: process.env.NODE_ENV === "development" ? msg : undefined,
      },
      { status: 500 }
    );
  }
}
