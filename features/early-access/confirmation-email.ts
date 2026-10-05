// Early Access confirmation email: configuration, rendering, and the
// send-once state machine. Provider and database access are injected so this
// module can be tested without sending real email or touching Supabase.

export type ConfirmationEmailResult = "sent" | "failed" | "not_configured" | "already_sent";

export type EmailConfig = { apiKey: string; from: string };

export type OutgoingEmail = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  idempotencyKey: string;
};

export type SendEmail = (email: OutgoingEmail) => Promise<{ ok: true; id: string | null } | { ok: false; reason: string }>;

export type ConfirmationStatusStore = {
  getStatus(signupId: string): Promise<string | null>;
  markSent(signupId: string, sentAt: Date): Promise<void>;
  markFailed(signupId: string): Promise<void>;
};

export type ConfirmationEmailDeps = {
  config: EmailConfig | { missing: string[] };
  sendEmail: SendEmail;
  store: ConfirmationStatusStore;
  now?: () => Date;
  log?: Pick<Console, "warn" | "error">;
};

const requiredEnv = ["RESEND_API_KEY", "EMAIL_FROM_NAME", "EMAIL_FROM_ADDRESS"] as const;

export const confirmationEmailSubject = "You’re on the Mizan Kids Early Access list 🌱";

export function readEmailConfig(env: Record<string, string | undefined>): EmailConfig | { missing: string[] } {
  const missing = requiredEnv.filter((name) => !(env[name] ?? "").trim());
  if (missing.length > 0) {
    return { missing };
  }

  return {
    apiKey: env.RESEND_API_KEY!.trim(),
    from: `${env.EMAIL_FROM_NAME!.trim()} <${env.EMAIL_FROM_ADDRESS!.trim()}>`,
  };
}

export function confirmationIdempotencyKey(signupId: string) {
  return `early-access-confirmation/${signupId}`;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const details = [
  "No credit card is required for Early Access.",
  "Your 30 free days do not start today.",
  "Your free period begins when you activate your eligible account after launch.",
  "There is no automatic paid conversion or charge.",
];

export function renderConfirmationEmail(parentFirstName: string) {
  const name = parentFirstName.trim() || "there";

  const text = [
    `Salaam ${name},`,
    "",
    "You’re on the Mizan Kids Early Access list.",
    "",
    "We’re building structured Islamic learning for children ages 4–12, with short interactive lessons, clear learning paths, and progress parents can follow.",
    "",
    "As an Early Access family, you’ll be eligible for 30 days of full Mizan Kids access free when you activate after launch.",
    "",
    "A few important details:",
    ...details.map((item) => `• ${item}`),
    "",
    "We’re targeting December 1, 2026 for public launch.",
    "",
    "We’ll email you again when Mizan Kids is ready to activate.",
    "",
    "Mizan Kids",
    "Islamic learning for brighter tomorrows",
    "mizankids.com",
    "",
    "You’re receiving this email because you requested Early Access at mizankids.com.",
  ].join("\n");

  const p = (content: string) =>
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#173E39;">${content}</p>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(confirmationEmailSubject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F1E7;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your 30 free days begin when you activate after launch.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F7F1E7;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#FFFDFB;border:1px solid #E7DCC7;border-radius:20px;">
<tr><td style="padding:32px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
<p style="margin:0 0 24px;font-size:20px;font-weight:bold;letter-spacing:0.02em;color:#173E39;">Mizan Kids</p>
${p(`Salaam ${escapeHtml(name)},`)}
<p style="margin:0 0 16px;font-size:22px;line-height:1.35;font-weight:bold;color:#173E39;">You’re on the Mizan Kids Early Access list.</p>
${p("We’re building structured Islamic learning for children ages 4–12, with short interactive lessons, clear learning paths, and progress parents can follow.")}
${p("As an Early Access family, you’ll be eligible for <strong>30 days of full Mizan Kids access free</strong> when you activate after launch.")}
</td></tr>
<tr><td style="padding:0 32px;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F7F1E7;border-radius:14px;">
<tr><td style="padding:20px 22px;">
<p style="margin:0 0 10px;font-size:13px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:#5D6E6A;">A few important details</p>
${details.map((item) => `<p style="margin:0 0 8px;font-size:15px;line-height:1.5;color:#173E39;">&#10003;&nbsp; ${item}</p>`).join("\n")}
</td></tr>
</table>
</td></tr>
<tr><td style="padding:24px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
${p("We’re targeting <strong>December 1, 2026</strong> for public launch.")}
${p("We’ll email you again when Mizan Kids is ready to activate.")}
</td></tr>
<tr><td style="padding:8px 32px 32px;font-family:Arial,Helvetica,sans-serif;border-top:1px solid #EFE6D6;">
<p style="margin:20px 0 2px;font-size:15px;font-weight:bold;color:#173E39;">Mizan Kids</p>
<p style="margin:0 0 2px;font-size:14px;color:#5D6E6A;">Islamic learning for brighter tomorrows</p>
<p style="margin:0;font-size:14px;"><a href="https://mizankids.com" style="color:#173E39;">mizankids.com</a></p>
</td></tr>
</table>
<p style="margin:16px 0 0;max-width:560px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#7A8A86;">You’re receiving this email because you requested Early Access at mizankids.com.</p>
</td></tr>
</table>
</body>
</html>`;

  return { subject: confirmationEmailSubject, html, text };
}

export async function sendEarlyAccessConfirmation(
  input: { signupId: string; parentFirstName: string; email: string },
  deps: ConfirmationEmailDeps,
): Promise<ConfirmationEmailResult> {
  const log = deps.log ?? console;
  const now = deps.now ?? (() => new Date());

  try {
    if ((await deps.store.getStatus(input.signupId)) === "sent") {
      return "already_sent";
    }

    if ("missing" in deps.config) {
      log.error(
        `Early Access confirmation email not configured; missing env: ${deps.config.missing.join(", ")} (signup ${input.signupId})`,
      );
      await deps.store.markFailed(input.signupId);
      return "not_configured";
    }

    const content = renderConfirmationEmail(input.parentFirstName);
    const result = await deps.sendEmail({
      from: deps.config.from,
      to: input.email,
      ...content,
      idempotencyKey: confirmationIdempotencyKey(input.signupId),
    });

    if (!result.ok) {
      log.warn(`Early Access confirmation email failed for signup ${input.signupId}: ${result.reason}`);
      await deps.store.markFailed(input.signupId);
      return "failed";
    }

    // Resend accepted the email; a status-write failure must not downgrade it
    // to failed. The row stays pending and the idempotency key prevents a
    // duplicate if it is ever retried.
    await deps.store.markSent(input.signupId, now()).catch((error: unknown) => {
      log.error(
        `Early Access confirmation sent but status update failed for signup ${input.signupId}: ${error instanceof Error ? error.name : "unknown"}`,
      );
    });
    return "sent";
  } catch (error) {
    log.error(
      `Early Access confirmation email error for signup ${input.signupId}: ${error instanceof Error ? error.name : "unknown"}`,
    );
    await deps.store.markFailed(input.signupId).catch(() => undefined);
    return "failed";
  }
}
