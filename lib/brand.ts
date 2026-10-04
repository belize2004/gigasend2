const publicEnv = import.meta.env;

export const brand = {
  name: publicEnv.PUBLIC_BRAND_NAME || "Gigasend",
  productName: publicEnv.PUBLIC_BRAND_PRODUCT_NAME || "Gigasend",
  description: publicEnv.PUBLIC_BRAND_DESCRIPTION || "Fast, zero-egress large-file delivery built on Cloudflare's 335+ edge network.",
  siteUrl: (publicEnv.PUBLIC_SITE_URL || publicEnv.PUBLIC_NEXT_PUBLIC_SITE_URL || "https://gigasend.us").replace(/\/$/, ""),
  downloadOrigin: (publicEnv.PUBLIC_DOWNLOAD_ORIGIN || "https://download.gigasend.us").replace(/\/$/, ""),
  logoUrl: publicEnv.PUBLIC_BRAND_LOGO_URL || "",
  emailFrom: publicEnv.PUBLIC_BRAND_EMAIL_FROM || "Gigasend File Delivery <no-reply@mail.gigasend.us>",
  contactEmail: publicEnv.PUBLIC_BRAND_CONTACT_EMAIL || "support@gigasend.us",
  zipFilenamePrefix: publicEnv.PUBLIC_BRAND_ZIP_PREFIX || "gigasend-files",
  footerText: publicEnv.PUBLIC_BRAND_FOOTER || "Delivered securely by Gigasend.",
};

export function withBrandTitle(title?: string) {
  return title ? `${title} | ${brand.productName}` : brand.productName;
}
