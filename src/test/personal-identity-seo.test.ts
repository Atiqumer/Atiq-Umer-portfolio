import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

describe("homepage personal identity metadata", () => {
  it("emits one accurate Person JSON-LD record and the approved description", async () => {
    const head = await Route.options.head?.({} as never);
    const description = head?.meta?.find((tag) => tag?.name === "description");
    const personScripts = head?.scripts?.filter((script) => script?.type === "application/ld+json") ?? [];

    expect(description?.content).toBe("Atiq Umer is an AI/ML & Full-Stack Developer based in Pakistan, building AI applications, Django backends, and React interfaces.");
    expect(personScripts).toHaveLength(1);
    expect(JSON.parse(personScripts[0]!.children as string)).toEqual({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://atiqumer.live/#atiq-umer",
      name: "Atiq Umer",
      url: "https://atiqumer.live/",
      jobTitle: "AI/ML & Full-Stack Developer",
      homeLocation: { "@type": "Country", name: "Pakistan" },
      sameAs: ["https://github.com/Atiqumer", "https://www.linkedin.com/in/atiq-umer/"],
    });
  });
});
