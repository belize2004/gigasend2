const publicEnv = import.meta.env;

export const brand = {
  name: publicEnv.PUBLIC_BRAND_NAME || "SBVisual",
  productName: publicEnv.PUBLIC_BRAND_PRODUCT_NAME || "SBVisual File Delivery",
  description: publicEnv.PUBLIC_BRAND_DESCRIPTION || "SBVisual delivers client galleries, photography exports, and large project files through secure expiring links.",
  siteUrl: (publicEnv.PUBLIC_SITE_URL || publicEnv.PUBLIC_NEXT_PUBLIC_SITE_URL || "https://send.sbvisual.com").replace(/\/$/, ""),
  downloadOrigin: (publicEnv.PUBLIC_DOWNLOAD_ORIGIN || "https://download.gigasend.us").replace(/\/$/, ""),
  logoUrl: publicEnv.PUBLIC_BRAND_LOGO_URL || "",
  emailFrom: publicEnv.PUBLIC_BRAND_EMAIL_FROM || "SBVisual File Delivery <no-reply@mail.sbvisual.com>",
  contactEmail: publicEnv.PUBLIC_BRAND_CONTACT_EMAIL || "info@sbvisual.com",
  zipFilenamePrefix: publicEnv.PUBLIC_BRAND_ZIP_PREFIX || "sbvisual-files",
  footerText: publicEnv.PUBLIC_BRAND_FOOTER || "Delivered securely by SBVisual.",
};

export function withBrandTitle(title?: string) {
  return title ? `${title} | ${brand.productName}` : brand.productName;
}
