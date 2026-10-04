import { NextRequest, NextResponse } from "next/server";

import { normalizeEmail } from "@/features/early-access/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName || "").trim();
    const email = normalizeEmail(String(body.email || ""));

    if (!firstName || !email) {
      return NextResponse.json(
        { message: "Please provide your name and email." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const supabaseConfigured = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    if (!supabaseConfigured) {
      return NextResponse.json(
        {
          message:
            "Supabase is not connected yet. Once your project credentials are configured, the Early Access flow will be connected automatically.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        message: "You’re already on the Mizan Kids Early Access list.",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
