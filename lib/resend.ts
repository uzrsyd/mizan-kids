import "server-only";

import { Resend } from "resend";

import type { SendEmail } from "@/features/early-access/confirmation-email";

export function createResendEmailSender(apiKey: string): SendEmail {
  const resend = new Resend(apiKey);

  return async ({ idempotencyKey, ...email }) => {
    const { data, error } = await resend.emails.send(email, { idempotencyKey });

    if (error) {
      // Summary only: never forward provider responses to the browser.
      return { ok: false, reason: `${error.name}${error.statusCode ? ` (${error.statusCode})` : ""}: ${error.message}` };
    }

    return { ok: true, id: data?.id ?? null };
  };
}
