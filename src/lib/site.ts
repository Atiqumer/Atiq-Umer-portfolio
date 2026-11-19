import siteConfig from "../../site.config.json";

export const DEFAULT_SITE_URL = siteConfig.productionSiteUrl;

export const SITE_URL = new URL(import.meta.env["VITE_SITE_URL"] ?? DEFAULT_SITE_URL).origin;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, SITE_URL).toString();
}
