import { describe, expect, it } from "vitest";
import { getHeroNameEntrance, getStaticHalfGeometry } from "./PhoneExperience";

describe("getHeroNameEntrance", () => {
  it("brings the two hero-name words in from opposite screen edges and settles at their existing transform origin", () => {
    const left = getHeroNameEntrance("left");
    const right = getHeroNameEntrance("right");

    expect(left.initial).toEqual({ opacity: 0, x: "-110vw" });
    expect(right.initial).toEqual({ opacity: 0, x: "110vw" });
    expect(left.animate).toEqual({ opacity: 1, x: 0 });
    expect(right.animate).toEqual({ opacity: 1, x: 0 });
    expect(left.transition).toEqual({ duration: 1.05, ease: [0.22, 1, 0.36, 1] });
  });
});

describe("getStaticHalfGeometry", () => {
  it("overlaps the desktop static half by one pixel without shifting its screen content", () => {
    expect(getStaticHalfGeometry(true, 540, 740)).toEqual({
      width: 541,
      height: 740,
      contentOffset: { left: -528, top: 0 },
    });
  });

  it("preserves the stacked mobile half geometry", () => {
    expect(getStaticHalfGeometry(false, 354, 694)).toEqual({
      width: 354,
      height: 347,
      contentOffset: { left: 0, top: -336 },
    });
  });
});
