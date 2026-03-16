import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "Debug View",
    nodeEnv: process.env.NODE_ENV,
    time: new Date().toISOString()
  });
}
