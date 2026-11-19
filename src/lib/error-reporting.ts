/**
 * Vendor-neutral client error reporting. Hosting providers can collect browser
 * console output without adding runtime globals or exposing credentials.
 */
export function reportClientError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  console.error("Client route error", {
    error,
    route: window.location.pathname,
    ...context,
  });
}
