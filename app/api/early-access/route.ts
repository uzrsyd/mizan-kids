import { NextRequest, NextResponse } from "next/server";

import { registerEarlyAccess } from "@/features/early-access/registration";
import {
  ValidationError,
  validateEarlyAccessPayload,
} from "@/features/early-access/validation";
import { createEarlyAccessDeps } from "@/lib/early-access";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { status: "validation_error", message: "Please provide valid Early Access details." },
        { status: 400 },
      );
    }

    if (body.website && String(body.website).trim()) {
      return NextResponse.json(
        { status: "validation_error", message: "Request rejected." },
        { status: 400 },
      );
    }

    const payload = validateEarlyAccessPayload(body);

    const result = await registerEarlyAccess(payload, createEarlyAccessDeps());

    if (result.status === "already_registered") {
      return NextResponse.json(
        {
          status: "already_registered",
          message: "You’re already on the Mizan Kids Early Access list.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "You’re on the Early Access list.",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          status: "validation_error",
          message: error.message,
        },
        { status: 400 },
      );
    }

    console.error("Early Access signup failed:", error);

    return NextResponse.json(
      {
        status: "server_error",
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
