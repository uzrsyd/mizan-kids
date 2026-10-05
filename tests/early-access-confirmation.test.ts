import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  confirmationIdempotencyKey,
  readEmailConfig,
  renderConfirmationEmail,
  sendEarlyAccessConfirmation,
  type EmailConfig,
  type OutgoingEmail,
  type SendEmail,
} from "../features/early-access/confirmation-email";
import { registerEarlyAccess, type RegistrationDeps } from "../features/early-access/registration";
import { validateEarlyAccessPayload } from "../features/early-access/validation";

const config: EmailConfig = { apiKey: "re_test_secret_value", from: "Mizan Kids <salaam@mizankids.com>" };
const silentLog = { warn: () => undefined, error: () => undefined };

// In-memory stand-in for early_access_signups + promotional_entitlements.
function createFakeBackend(sendResult: Awaited<ReturnType<SendEmail>> = { ok: true, id: "email_1" }) {
  const signups = new Map<string, { id: string; normalizedEmail: string; status: string; sentAt: Date | null }>();
  const entitlements = new Map<string, { normalizedEmail: string; expiresAt: null; activatedAt: null }>();
  const sent: OutgoingEmail[] = [];
  let nextId = 1;

  const sendEmail: SendEmail = async (email) => {
    sent.push(email);
    return sendResult;
  };

  const store = {
    async getStatus(id: string) {
      return signups.get(id)?.status ?? null;
    },
    async markSent(id: string, at: Date) {
      Object.assign(signups.get(id)!, { status: "sent", sentAt: at });
    },
    async markFailed(id: string) {
      const row = signups.get(id)!;
      if (row.status !== "sent") Object.assign(row, { status: "failed", sentAt: null });
    },
  };

  const deps: RegistrationDeps = {
    async isRegistered(normalizedEmail) {
      return [...signups.values()].some((row) => row.normalizedEmail === normalizedEmail);
    },
    async register(payload) {
      const id = `signup-${nextId++}`;
      signups.set(id, { id, normalizedEmail: payload.normalizedEmail, status: "pending", sentAt: null });
      entitlements.set(id, { normalizedEmail: payload.normalizedEmail, expiresAt: null, activatedAt: null });
      return id;
    },
    sendConfirmation(input) {
      return sendEarlyAccessConfirmation(input, { config, sendEmail, store, log: silentLog });
    },
  };

  return { signups, entitlements, sent, store, sendEmail, deps };
}

const payload = validateEarlyAccessPayload({
  parentFirstName: "Aisha",
  email: "Aisha@Example.com",
  numberOfChildren: 1,
  childAgeRanges: ["4–5"],
  learningInterests: ["Quran"],
});

describe("early access confirmation email", () => {
  it("attempts the email exactly once for a new signup", async () => {
    const backend = createFakeBackend();
    const result = await registerEarlyAccess(payload, backend.deps);

    assert.equal(result.status, "success");
    assert.equal(backend.sent.length, 1);
    assert.equal(backend.sent[0].to, "aisha@example.com");
    assert.equal(backend.sent[0].from, "Mizan Kids <salaam@mizankids.com>");
  });

  it("does not attempt an email for a duplicate signup", async () => {
    const backend = createFakeBackend();
    await registerEarlyAccess(payload, backend.deps);
    const second = await registerEarlyAccess(payload, backend.deps);

    assert.equal(second.status, "already_registered");
    assert.equal(backend.sent.length, 1);
    assert.equal(backend.signups.size, 1);
    assert.equal(backend.entitlements.size, 1);
  });

  it("treats a concurrent unique violation as already registered without emailing", async () => {
    const backend = createFakeBackend();
    const result = await registerEarlyAccess(payload, { ...backend.deps, register: async () => null });

    assert.equal(result.status, "already_registered");
    assert.equal(backend.sent.length, 0);
  });

  it("marks the signup sent with a timestamp after Resend accepts the email", async () => {
    const backend = createFakeBackend();
    const result = await registerEarlyAccess(payload, backend.deps);
    assert.equal(result.status, "success");

    const row = [...backend.signups.values()][0];
    assert.equal(row.status, "sent");
    assert.ok(row.sentAt instanceof Date);
  });

  it("keeps the signup and entitlement and marks failed when sending fails", async () => {
    const backend = createFakeBackend({ ok: false, reason: "validation_error (422): domain not verified" });
    const result = await registerEarlyAccess(payload, backend.deps);

    assert.deepEqual(result.status === "success" && result.email, "failed");
    assert.equal(backend.signups.size, 1);
    assert.equal(backend.entitlements.size, 1);
    const row = [...backend.signups.values()][0];
    assert.equal(row.status, "failed");
    assert.equal(row.sentAt, null);
  });

  it("still reports success when the sender throws", async () => {
    const backend = createFakeBackend();
    const throwing: RegistrationDeps = {
      ...backend.deps,
      sendConfirmation: (input) =>
        sendEarlyAccessConfirmation(input, {
          config,
          sendEmail: async () => {
            throw new Error("network down");
          },
          store: backend.store,
          log: silentLog,
        }),
    };

    const result = await registerEarlyAccess(payload, throwing);
    assert.equal(result.status, "success");
    assert.equal([...backend.signups.values()][0].status, "failed");
  });

  it("does not send again when the status is already sent", async () => {
    const backend = createFakeBackend();
    backend.signups.set("signup-x", { id: "signup-x", normalizedEmail: "x@example.com", status: "sent", sentAt: new Date() });

    const result = await sendEarlyAccessConfirmation(
      { signupId: "signup-x", parentFirstName: "X", email: "x@example.com" },
      { config, sendEmail: backend.sendEmail, store: backend.store, log: silentLog },
    );

    assert.equal(result, "already_sent");
    assert.equal(backend.sent.length, 0);
  });

  it("handles missing configuration safely without leaking values", async () => {
    const env = { RESEND_API_KEY: "re_should_never_be_logged", EMAIL_FROM_NAME: "Mizan Kids", EMAIL_FROM_ADDRESS: " " };
    const missing = readEmailConfig(env);
    assert.deepEqual(missing, { missing: ["EMAIL_FROM_ADDRESS"] });

    const backend = createFakeBackend();
    backend.signups.set("signup-y", { id: "signup-y", normalizedEmail: "y@example.com", status: "pending", sentAt: null });
    const logged: string[] = [];
    const log = { warn: (msg: string) => logged.push(msg), error: (msg: string) => logged.push(msg) };

    const result = await sendEarlyAccessConfirmation(
      { signupId: "signup-y", parentFirstName: "Y", email: "y@example.com" },
      { config: missing, sendEmail: backend.sendEmail, store: backend.store, log },
    );

    assert.equal(result, "not_configured");
    assert.equal(backend.sent.length, 0);
    assert.equal(backend.signups.get("signup-y")!.status, "failed");
    assert.ok(logged.some((msg) => msg.includes("EMAIL_FROM_ADDRESS")));
    assert.ok(logged.every((msg) => !msg.includes("re_should_never_be_logged")));
  });

  it("never falls back to a test sender", () => {
    assert.deepEqual(readEmailConfig({}), { missing: ["RESEND_API_KEY", "EMAIL_FROM_NAME", "EMAIL_FROM_ADDRESS"] });
    assert.deepEqual(
      readEmailConfig({ RESEND_API_KEY: "re_x", EMAIL_FROM_NAME: "Mizan Kids", EMAIL_FROM_ADDRESS: "salaam@mizankids.com" }),
      { apiKey: "re_x", from: "Mizan Kids <salaam@mizankids.com>" },
    );
  });

  it("escapes HTML in the parent name", () => {
    const { html, text } = renderConfirmationEmail(`<script>alert("x")</script> & 'Co'`);

    assert.ok(!html.includes("<script>"));
    assert.ok(html.includes("Salaam &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;Co&#39;,"));
    assert.ok(text.startsWith(`Salaam <script>alert("x")</script> & 'Co',`));
  });

  it("uses a stable idempotency key derived from the signup id", async () => {
    assert.equal(confirmationIdempotencyKey("abc-123"), "early-access-confirmation/abc-123");

    const backend = createFakeBackend();
    await registerEarlyAccess(payload, backend.deps);
    assert.equal(backend.sent[0].idempotencyKey, "early-access-confirmation/signup-1");
  });

  it("includes the required transactional content and avoids unsupported claims", () => {
    const { subject, html, text } = renderConfirmationEmail("Aisha");

    assert.equal(subject, "You’re on the Mizan Kids Early Access list 🌱");
    for (const body of [html, text]) {
      assert.match(body, /30 free days do not start today/);
      assert.match(body, /No credit card is required/);
      assert.match(body, /no automatic paid conversion or charge/);
      assert.match(body, /December 1, 2026/);
      assert.doesNotMatch(body, /scholar|certified|approved|subscribed|newsletter/i);
    }
  });
});
