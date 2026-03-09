import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";

export async function GET() {
    try {
        await connectDB();
        const reviews = await Review.find().sort({ createdAt: -1 });
        return NextResponse.json(reviews, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await connectDB();
        const review = await Review.create(body);
        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
