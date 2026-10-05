import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normalizeEmail, validateEarlyAccessPayload } from "../features/early-access/validation";

describe("early access validation", () => {
  it("normalizes emails by trimming and lowering case", () => {
    assert.equal(normalizeEmail("  Parent@Example.COM  "), "parent@example.com");
  });

  it("accepts valid signups and rejects malformed content", () => {
    const valid = validateEarlyAccessPayload({
      parentFirstName: "Aisha",
      email: " Aisha@Example.com ",
      numberOfChildren: 2,
      childAgeRanges: ["4–5", "8–9"],
      learningInterests: ["Quran", "Arabic"],
      referralSource: "Instagram",
    });

    assert.deepEqual(valid, {
      parentFirstName: "Aisha",
      email: "aisha@example.com",
      normalizedEmail: "aisha@example.com",
      numberOfChildren: 2,
      childAgeRanges: ["4–5", "8–9"],
      learningInterests: ["Quran", "Arabic"],
      referralSource: "Instagram",
      utmSource: undefined,
      utmMedium: undefined,
      utmCampaign: undefined,
      utmContent: undefined,
      utmTerm: undefined,
      referrerUrl: undefined,
      landingPath: undefined,
    });

    assert.throws(
      () =>
        validateEarlyAccessPayload({
          parentFirstName: "",
          email: "aisha@example.com",
          numberOfChildren: 1,
          childAgeRanges: ["4–5"],
          learningInterests: ["Quran"],
        }),
      /parent first name/i,
    );
  });

  const base = {
    parentFirstName: "Aisha",
    email: "aisha@example.com",
    numberOfChildren: 1,
    childAgeRanges: ["4–5"],
    learningInterests: ["Quran"],
  };

  it("rejects values the form cannot produce", () => {
    assert.throws(() => validateEarlyAccessPayload({ ...base, childAgeRanges: ["4-6"] }), /age range/i);
    assert.throws(() => validateEarlyAccessPayload({ ...base, numberOfChildren: 2 }), /age range/i);
    assert.throws(() => validateEarlyAccessPayload({ ...base, learningInterests: ["Chess"] }), /learning interests/i);
    assert.throws(() => validateEarlyAccessPayload({ ...base, referralSource: "Billboard" }), /heard about/i);
  });

  it("enforces length and count limits", () => {
    assert.throws(() => validateEarlyAccessPayload({ ...base, parentFirstName: "A".repeat(81) }), /80 characters/);
    assert.throws(() => validateEarlyAccessPayload({ ...base, email: `${"a".repeat(250)}@example.com` }), /valid email/i);
    assert.throws(
      () => validateEarlyAccessPayload({ ...base, numberOfChildren: 6, childAgeRanges: Array(6).fill("4–5") }),
      /between 1 and 5/,
    );
  });

  it("truncates oversized tracking fields instead of rejecting the signup", () => {
    const result = validateEarlyAccessPayload({ ...base, utm_source: "x".repeat(500), referrer_url: "y".repeat(5000) });
    assert.equal(result.utmSource?.length, 200);
    assert.equal(result.referrerUrl?.length, 2000);
  });

  it("de-duplicates learning interests", () => {
    const result = validateEarlyAccessPayload({ ...base, learningInterests: ["Quran", "Quran", "Arabic"] });
    assert.deepEqual(result.learningInterests, ["Quran", "Arabic"]);
  });
});
