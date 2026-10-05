import { childAgeOptions, learningInterestOptions, maxChildren, referralSourceOptions } from "./options";

export type EarlyAccessSignupPayload = {
  parentFirstName: string;
  email: string;
  normalizedEmail: string;
  numberOfChildren: number;
  childAgeRanges: string[];
  learningInterests: string[];
  referralSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrerUrl?: string;
  landingPath?: string;
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const earlyAccessFormSchema = {
  firstName: (value: string) => value.trim().length >= 2,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  numberOfChildren: (value: number) => Number.isInteger(value) && value >= 1,
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateEarlyAccessPayload(input: unknown): EarlyAccessSignupPayload {
  if (!input || typeof input !== "object") {
    throw new ValidationError("Please provide valid Early Access details.");
  }

  const body = input as Record<string, unknown>;
  const parentFirstName = String(body.parentFirstName ?? body.firstName ?? "").trim();

  if (!parentFirstName || parentFirstName.length < 2) {
    throw new ValidationError("Parent first name is required.");
  }

  if (parentFirstName.length > limits.parentFirstName) {
    throw new ValidationError(`Parent first name must be ${limits.parentFirstName} characters or fewer.`);
  }

  const rawEmail = String(body.email ?? "").trim();
  const email = normalizeEmail(rawEmail);
  if (!email || email.length > limits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ValidationError("Please enter a valid email address.");
  }

  const rawNumberOfChildren = Number(body.numberOfChildren ?? 0);
  if (!Number.isInteger(rawNumberOfChildren) || rawNumberOfChildren < 1 || rawNumberOfChildren > maxChildren) {
    throw new ValidationError(`Number of children must be between 1 and ${maxChildren}.`);
  }

  const childAgeRanges = Array.isArray(body.childAgeRanges)
    ? body.childAgeRanges.map((item) => String(item ?? "").trim()).filter(Boolean)
    : [];

  if (childAgeRanges.length !== rawNumberOfChildren || !childAgeRanges.every((age) => isOneOf(age, childAgeOptions))) {
    throw new ValidationError("Please select an age range for each child.");
  }

  const learningInterests = Array.isArray(body.learningInterests)
    ? Array.from(new Set(body.learningInterests.map((item) => String(item ?? "").trim()).filter(Boolean)))
    : [];

  if (learningInterests.length === 0) {
    throw new ValidationError("Please choose at least one learning interest.");
  }

  if (!learningInterests.every((interest) => isOneOf(interest, learningInterestOptions))) {
    throw new ValidationError("Please choose learning interests from the list.");
  }

  const referralSource = optionalText(body.referralSource);
  if (referralSource !== undefined && !isOneOf(referralSource, referralSourceOptions)) {
    throw new ValidationError("Please choose how you heard about Mizan Kids from the list.");
  }

  return {
    parentFirstName,
    email,
    normalizedEmail: email,
    numberOfChildren: rawNumberOfChildren,
    childAgeRanges,
    learningInterests,
    referralSource,
    // Tracking fields come from the URL rather than the parent, so oversized
    // values are truncated instead of rejecting the signup.
    utmSource: optionalText(body.utm_source, limits.utm),
    utmMedium: optionalText(body.utm_medium, limits.utm),
    utmCampaign: optionalText(body.utm_campaign, limits.utm),
    utmContent: optionalText(body.utm_content, limits.utm),
    utmTerm: optionalText(body.utm_term, limits.utm),
    referrerUrl: optionalText(body.referrer_url, limits.referrerUrl),
    landingPath: optionalText(body.landing_path, limits.landingPath),
  };
}

const limits = {
  parentFirstName: 80,
  email: 254,
  utm: 200,
  referrerUrl: 2000,
  landingPath: 500,
};

function isOneOf(value: string, options: readonly string[]) {
  return options.includes(value);
}

function optionalText(value: unknown, maxLength?: number) {
  if (value === undefined || value === null) {
    return undefined;
  }

  const text = String(value).trim();
  if (!text) {
    return undefined;
  }

  return maxLength === undefined ? text : text.slice(0, maxLength);
}

export function isEmailSuppressed(email: string, category: string) {
  if (!email || !category) {
    return false;
  }

  return false;
}
