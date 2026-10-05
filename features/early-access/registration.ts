import type { ConfirmationEmailResult } from "./confirmation-email";
import type { EarlyAccessSignupPayload } from "./validation";

export type RegistrationDeps = {
  isRegistered(normalizedEmail: string): Promise<boolean>;
  // Atomically creates the signup + entitlement. Returns the new signup id, or
  // null when the normalized email is already registered (unique violation).
  register(payload: EarlyAccessSignupPayload): Promise<string | null>;
  sendConfirmation(input: { signupId: string; parentFirstName: string; email: string }): Promise<ConfirmationEmailResult>;
};

export type RegistrationResult =
  | { status: "success"; signupId: string; email: ConfirmationEmailResult }
  | { status: "already_registered" };

export async function registerEarlyAccess(
  payload: EarlyAccessSignupPayload,
  deps: RegistrationDeps,
): Promise<RegistrationResult> {
  if (await deps.isRegistered(payload.normalizedEmail)) {
    return { status: "already_registered" };
  }

  const signupId = await deps.register(payload);
  if (!signupId) {
    return { status: "already_registered" };
  }

  // The signup is committed at this point. Email is best-effort and must never
  // turn a saved signup into an error response.
  const email = await deps
    .sendConfirmation({ signupId, parentFirstName: payload.parentFirstName, email: payload.email })
    .catch((): ConfirmationEmailResult => "failed");

  return { status: "success", signupId, email };
}
