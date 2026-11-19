import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import type { ViewportSeed } from "@/hooks/useDeviceSize";

const MOBILE_VIEWPORT: ViewportSeed = { vw: 390, vh: 844 };
const DESKTOP_VIEWPORT: ViewportSeed = { vw: 1440, vh: 900 };

function headerViewport(value: string | null): number | undefined {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 200 && parsed <= 10_000 ? Math.round(parsed) : undefined;
}

/**
 * Client Hints supply the exact viewport on repeat navigations. On the first
 * navigation, Chromium's low-entropy mobile hint selects the correct fold
 * axis without parsing a user-agent string; a stable desktop fallback covers
 * browsers that do not send client hints.
 */
export const getInitialViewport = createServerFn({ method: "GET" }).handler((): ViewportSeed => {
  const request = getRequest();
  const width = headerViewport(request.headers.get("sec-ch-viewport-width") ?? request.headers.get("viewport-width"));
  const height = headerViewport(request.headers.get("sec-ch-viewport-height") ?? request.headers.get("viewport-height"));
  const mobile = request.headers.get("sec-ch-ua-mobile") === "?1";
  const fallback = mobile ? MOBILE_VIEWPORT : DESKTOP_VIEWPORT;

  // Ask supporting browsers for precise dimensions on future SSR requests.
  setResponseHeader("Accept-CH", "Sec-CH-Viewport-Width, Sec-CH-Viewport-Height");
  return { vw: width ?? fallback.vw, vh: height ?? fallback.vh };
});
