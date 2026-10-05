import { Resend } from "resend";

export function buildResendFromAddress(
  fromName: string = "Mizan Kids",
  fromAddress: string = "",
) {
  const name = fromName.trim() || "Mizan Kids";
  const address = fromAddress.trim();

  if (address) {
    return `${name} <${address}>`;
  }

  return `${name} <onboarding@resend.dev>`;
}

export function isResendConfigured(apiKey: string | undefined) {
  return Boolean((apiKey ?? "").trim());
}

export async function sendEarlyAccessConfirmationEmail({
  to,
  parentFirstName,
}: {
  to: string;
  parentFirstName?: string;
}) {
  const apiKey = (process.env.RESEND_API_KEY ?? "").trim();

  if (!isResendConfigured(apiKey)) {
    return {
      ok: false,
      skipped: true,
      reason: "RESEND_API_KEY is not configured.",
    };
  }

  const resend = new Resend(apiKey);
  const from = buildResendFromAddress(
    process.env.EMAIL_FROM_NAME ?? "Mizan Kids",
    process.env.EMAIL_FROM_ADDRESS ?? "",
  );

  const response = await resend.emails.send({
    from,
    to,
    subject: "You’re on the Mizan Kids Early Access list",
    html: `
      <p>Hi ${parentFirstName || "friend"},</p>
      <p>Thanks for joining the Mizan Kids Early Access list.</p>
      <p>We’ll be in touch with updates and early access opportunities soon.</p>
    `,
  });

  if (response.error) {
    return {
      ok: false,
      skipped: false,
      reason: response.error.message ?? "Failed to send email.",
    };
  }

  return {
    ok: true,
    skipped: false,
    id: response.data?.id ?? null,
  };
}
