// Shared by the Early Access form and server-side validation so the API only
// accepts values the form can actually produce.

export const childAgeOptions = ["4–5", "6–7", "8–9", "10–12"] as const;

export const learningInterestOptions = [
  "Quran",
  "Arabic",
  "Salah",
  "Islamic Studies",
  "Duas",
  "Seerah",
  "Akhlaq / Character",
  "Prophets",
] as const;

export const referralSourceOptions = [
  "Instagram",
  "Facebook",
  "TikTok",
  "Google",
  "Friend or family",
  "Other",
] as const;

export const maxChildren = 5;
