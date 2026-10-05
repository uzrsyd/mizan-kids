import { NextRequest, NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  ValidationError,
  validateEarlyAccessPayload,
} from "@/features/early-access/validation";

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

    const supabase = createSupabaseAdminClient();

    const { data: existingSignup, error: signupLookupError } = await supabase
      .from("early_access_signups")
      .select("id")
      .eq("normalized_email", payload.normalizedEmail)
      .limit(1);

    if (signupLookupError) {
      throw signupLookupError;
    }

    if (existingSignup && existingSignup.length > 0) {
      return NextResponse.json(
        {
          status: "already_registered",
          message: "You’re already on the Mizan Kids Early Access list.",
        },
        { status: 200 },
      );
    }

    const { data, error } = await supabase.rpc("register_early_access_signup", {
      p_parent_first_name: payload.parentFirstName,
      p_email: payload.email,
      p_normalized_email: payload.normalizedEmail,
      p_number_of_children: payload.numberOfChildren,
      p_child_age_ranges: payload.childAgeRanges,
      p_learning_interests: payload.learningInterests,
      p_referral_source: payload.referralSource ?? null,
      p_utm_source: payload.utmSource ?? null,
      p_utm_medium: payload.utmMedium ?? null,
      p_utm_campaign: payload.utmCampaign ?? null,
      p_utm_content: payload.utmContent ?? null,
      p_utm_term: payload.utmTerm ?? null,
      p_referrer_url: payload.referrerUrl ?? null,
      p_landing_path: payload.landingPath ?? null,
    });

    if (error) {
      const message = String(error.message || "").toLowerCase();
      if (error.code === "23505" || message.includes("duplicate") || message.includes("already")) {
        return NextResponse.json(
          {
            status: "already_registered",
            message: "You’re already on the Mizan Kids Early Access list.",
          },
          { status: 200 },
        );
      }

      throw error;
    }

    // Confirmation email is intentionally not sent yet; new signups keep
    // confirmation_email_status = 'pending' until the email step is built.
    return NextResponse.json(
      {
        status: "success",
        message: "You’re on the Early Access list.",
        signupId: data,
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
