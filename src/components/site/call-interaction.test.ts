import { describe, expect, it } from "vitest";
import { buildEnquiryMailto, setPendingProjectType, takePendingProjectType } from "./call-interaction";

describe("Project enquiry email", () => {
  it("goes to atiqumer15@gmail.com with type, idea, name and email", () => {
    const url = new URL(buildEnquiryMailto({ type: "Web App / MVP", idea: "A booking app", name: "Sara", email: "sara@x.com" }));
    expect(url.pathname).toBe("atiqumer15@gmail.com");
    expect(url.searchParams.get("subject")).toBe("Project Enquiry: Web App / MVP");
    const body = url.searchParams.get("body")!;
    expect(body).toContain("Project type: Web App / MVP");
    expect(body).toContain("A booking app");
    expect(body).toContain("Name: Sara");
    expect(body).toContain("Email: sara@x.com");
  });
});

describe("Discuss this service", () => {
  it("hands the chosen project type to the contact screen once", () => {
    setPendingProjectType("Python Backend / API");
    expect(takePendingProjectType()).toBe("Python Backend / API");
    expect(takePendingProjectType()).toBeNull();
  });
});

import { validateEnquiry } from "./call-interaction";
describe("validateEnquiry", () => {
  it("requires a project type, a description and a valid email", () => {
    expect(validateEnquiry({ type: "", idea: " ", email: "" })).toEqual({ type: expect.any(String), idea: expect.any(String), email: expect.any(String) });
    expect(validateEnquiry({ type: "Web App / MVP", idea: "x", email: "bad@" }).email).toBeDefined();
    expect(validateEnquiry({ type: "Web App / MVP", idea: "x", email: "a@b.co" })).toEqual({});
  });
  it("does not require a name", () => {
    expect(validateEnquiry({ type: "AI / Automation", idea: "x", email: "a@b.co", name: "" })).toEqual({});
  });
});
