import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { PhoneExperience } from "@/components/site/PhoneExperience";
import { GITHUB, LINKEDIN } from "@/data/services";
import { getInitialViewport } from "@/lib/initial-viewport";
import { absoluteUrl } from "@/lib/site";

const PERSON_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://atiqumer.live/#atiq-umer",
  name: "Atiq Umer",
  url: "https://atiqumer.live/",
  jobTitle: "AI/ML & Full-Stack Developer",
  homeLocation: {
    "@type": "Country",
    name: "Pakistan",
  },
  sameAs: [GITHUB, LINKEDIN],
}).replace(/</g, "\\u003c");

export const Route = createFileRoute("/")({
  loader: () => {
    return getInitialViewport();
  },
  head: () => ({
    meta: [
      { title: "Atiq Umer | AI/ML & Full-Stack Developer" },
      { name: "description", content: "Atiq Umer is an AI/ML & Full-Stack Developer based in Pakistan, building AI applications, Django backends, and React interfaces." },
      { property: "og:title", content: "Atiq Umer | AI/ML & Full-Stack Developer" },
      { property: "og:description", content: "AI-powered applications, Python backends and modern web experiences — built to solve real problems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:title", content: "Atiq Umer | AI/ML & Full-Stack Developer" },
      { name: "twitter:description", content: "AI-powered applications, Python backends and modern web experiences — built to solve real problems." },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
    scripts: [{ type: "application/ld+json", children: PERSON_SCHEMA }],
  }),
  component: Index,
});

function Index() {
  const initialViewport = Route.useLoaderData();
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <h1 className="sr-only">Atiq Umer — AI/ML &amp; Full-Stack Developer</h1>
        <PhoneExperience initialViewport={initialViewport} />
      </main>
    </MotionConfig>
  );
}
