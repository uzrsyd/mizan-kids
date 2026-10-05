import "server-only";

import {
  readEmailConfig,
  sendEarlyAccessConfirmation,
  type ConfirmationStatusStore,
  type SendEmail,
} from "@/features/early-access/confirmation-email";
import type { RegistrationDeps } from "@/features/early-access/registration";
import { createResendEmailSender } from "@/lib/resend";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;

function createConfirmationStatusStore(supabase: AdminClient): ConfirmationStatusStore {
  return {
    async getStatus(signupId) {
      const { data, error } = await supabase
        .from("early_access_signups")
        .select("confirmation_email_status")
        .eq("id", signupId)
        .maybeSingle();

      if (error) throw error;
      return data?.confirmation_email_status ?? null;
    },
    async markSent(signupId, sentAt) {
      const { error } = await supabase
        .from("early_access_signups")
        .update({ confirmation_email_status: "sent", confirmation_email_sent_at: sentAt.toISOString() })
        .eq("id", signupId);

      if (error) throw error;
    },
    async markFailed(signupId) {
      // Never downgrade a row that is already marked sent.
      const { error } = await supabase
        .from("early_access_signups")
        .update({ confirmation_email_status: "failed", confirmation_email_sent_at: null })
        .eq("id", signupId)
        .neq("confirmation_email_status", "sent");

      if (error) throw error;
    },
  };
}

export function createEarlyAccessDeps(): RegistrationDeps {
  const supabase = createSupabaseAdminClient();
  const config = readEmailConfig(process.env);
  const notConfigured: SendEmail = async () => ({ ok: false, reason: "not configured" });
  const sendEmail = "missing" in config ? notConfigured : createResendEmailSender(config.apiKey);
  const store = createConfirmationStatusStore(supabase);

  return {
    async isRegistered(normalizedEmail) {
      const { data, error } = await supabase
        .from("early_access_signups")
        .select("id")
        .eq("normalized_email", normalizedEmail)
        .limit(1);

      if (error) throw error;
      return Boolean(data && data.length > 0);
    },
    async register(payload) {
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
        // Unique violation: a concurrent request registered this email first.
        if (error.code === "23505") return null;
        throw error;
      }

      return data as string;
    },
    sendConfirmation(input) {
      return sendEarlyAccessConfirmation(input, { config, sendEmail, store });
    },
  };
}
