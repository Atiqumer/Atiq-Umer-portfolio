import { describe, expect, it } from "vitest";
import { computeDeviceSize } from "./useDeviceSize";

describe("computeDeviceSize", () => {
  it("uses the stacked fold at mobile widths and the side fold at the 820px breakpoint", () => {
    expect(computeDeviceSize(819, 900).axis).toBe("stack");
    expect(computeDeviceSize(820, 900).axis).toBe("side");
  });

  it("keeps the pinned-stage geometry seeds within their respective layouts", () => {
    expect(computeDeviceSize(390, 844)).toMatchObject({ axis: "stack", W: 354, H: 694, top: 74 });
    expect(computeDeviceSize(1440, 900)).toMatchObject({ axis: "side", W: 540, H: 740, top: 70 });
  });
});
