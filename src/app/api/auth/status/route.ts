import { NextResponse } from "next/server";

export interface AuthStatus {
  isLoggedIn: boolean;
  user: {
    name: string;
    avatarUrl: string | null;
  } | null;
}

export async function GET(): Promise<NextResponse<AuthStatus>> {
  return NextResponse.json({
    isLoggedIn: false,
    user: null,
  });
}
