import { NextResponse } from "next/server";
import { jsonDB } from "@/lib/jsonDB";

export async function GET() {
    try {
        const reviews = await jsonDB.getReviews();
        return NextResponse.json(reviews, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const review = await jsonDB.addReview(body);
        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
