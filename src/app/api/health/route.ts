import { NextResponse } from "next/server";
import { isProduction } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    env: isProduction ? "production" : "development",
  });
}
