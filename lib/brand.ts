const publicEnv = import.meta.env;

const defaultTagline = "Send large files up to 5 TB fast—with 10 GB free and no recipient sign-in required.";

export const brand = {
  name: publicEnv.PUBLIC_BRAND_NAME || "Gigasend",
  productName: publicEnv.PUBLIC_BRAND_PRODUCT_NAME || "Gigasend",
  tagline: publicEnv.PUBLIC_BRAND_TAGLINE || defaultTagline,
  description: publicEnv.PUBLIC_BRAND_DESCRIPTION || defaultTagline,
  siteUrl: (publicEnv.PUBLIC_SITE_URL || publicEnv.PUBLIC_NEXT_PUBLIC_SITE_URL || "https://gigasend.us").replace(/\/$/, ""),
  downloadOrigin: (publicEnv.PUBLIC_DOWNLOAD_ORIGIN || "https://download.gigasend.us").replace(/\/$/, ""),
  logoUrl: publicEnv.PUBLIC_BRAND_LOGO_URL || "",
  emailFrom: publicEnv.PUBLIC_BRAND_EMAIL_FROM || "Gigasend File Delivery <no-reply@mail.gigasend.us>",
  contactEmail: publicEnv.PUBLIC_BRAND_CONTACT_EMAIL || "info@gigasend.us",
  zipFilenamePrefix: publicEnv.PUBLIC_BRAND_ZIP_PREFIX || "gigasend-files",
  footerText: publicEnv.PUBLIC_BRAND_FOOTER || "All rights reserved.",
};

export function withBrandTitle(title?: string) {
  return title ? `${title} | ${brand.productName}` : brand.productName;
}
