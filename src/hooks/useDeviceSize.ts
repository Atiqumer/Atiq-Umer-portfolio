import { useEffect, useState } from "react";

/** Inner black bezel and outer metal rim thickness (px). */
export const BEZEL = 8;
export const RIM = 3;

/**
 * side: desktop/tablet book-style fold (halves side by side, W is one half).
 * stack: phone flip fold (halves stacked, W is full width, H full height).
 */
export type DeviceSize = { W: number; H: number; axis: "side" | "stack"; vw: number; vh: number; top: number };

export function computeDeviceSize(vw: number, vh: number): DeviceSize {
  if (vw < 820) {
    const H = Math.round(Math.min(vh - 150, 820));
    const W = Math.round(Math.min(vw - 36, 440));
    return { W, H, axis: "stack", vw, vh, top: 74 };
  }
  // Short landscape phones: trim the decorative margin so the screen stays usable.
  let H = Math.round(Math.min(vh - (vh < 520 ? 100 : 160), 760));
  let W = Math.round(H * 0.73);
  const maxW = Math.floor((vw - 80) / 2);
  if (W > maxW) {
    W = maxW;
    H = Math.round(Math.min(H, W / 0.62));
  }
  return { W, H, axis: "side", vw, vh, top: Math.max(vh < 520 ? 58 : 70, Math.round((vh - H) / 2 - 10)) };
}

export function useDeviceSize() {
  const [size, setSize] = useState<DeviceSize>(() => computeDeviceSize(1440, 900));
  useEffect(() => {
    const update = () => setSize(computeDeviceSize(window.innerWidth, window.innerHeight));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}
