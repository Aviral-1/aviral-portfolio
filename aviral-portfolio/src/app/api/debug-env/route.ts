import { NextResponse } from "next/server";

export async function GET() {
  const uri = process.env.MONGODB_URI;
  return NextResponse.json({
    status: "Debug View",
    hasMongoUri: !!uri,
    uriLength: uri ? uri.length : 0,
    uriMasked: uri ? `${uri.substring(0, 10)}...` : "NONE",
    nodeEnv: process.env.NODE_ENV,
    time: new Date().toISOString()
  });
}
