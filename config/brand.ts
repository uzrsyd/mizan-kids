export const brand = {
  name: "Mizan Kids",
  email: "salaam@mizankids.com",
  launchDate: "December 1, 2026",
  siteUrl: "https://mizankids.com",
  tagline: "Islamic learning that grows with your child.",
  description:
    "Structured, interactive Islamic learning for Muslim children ages 4–12 with progress parents can actually see.",
  social: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  colors: {
    cream: "#F7F1E7",
    creamStrong: "#F0E7D7",
    green: "#173E39",
    greenSoft: "#2F5B57",
    gold: "#F4B342",
    orange: "#E88C54",
    teal: "#6BA9A4",
    blue: "#D7EAF6",
    white: "#FFFFFF",
    stone: "#F3F1ED",
    text: "#1C2A2E",
  },
  featureFlags: {
    enableDemo: true,
    enableEarlyAccess: true,
    enableAuth: true,
    enableParentApp: false,
    enableAdmin: false,
    enablePricing: false,
    enableSocialLinks: true,
    enableLaunchCampaign: false,
  },
};

export const siteConfig = {
  productName: brand.name,
  supportEmail: brand.email,
  launchDate: brand.launchDate,
  defaultMetaDescription: brand.description,
};
