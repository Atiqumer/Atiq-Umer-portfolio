import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { PhoneExperience } from "@/components/site/PhoneExperience";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atiq Umer | AI/ML & Full-Stack Developer" },
      { name: "description", content: "Atiq Umer builds AI and computer vision apps, Django backends and React interfaces. Projects include VoxaSign and Django Query Sentinel." },
      { property: "og:title", content: "Atiq Umer | AI/ML & Full-Stack Developer" },
      { property: "og:description", content: "AI-powered applications, Python backends and modern web experiences — built to solve real problems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:title", content: "Atiq Umer | AI/ML & Full-Stack Developer" },
      { name: "twitter:description", content: "AI-powered applications, Python backends and modern web experiences — built to solve real problems." },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <h1 className="sr-only">Atiq Umer — AI/ML Engineer &amp; Full-Stack Developer</h1>
        <PhoneExperience />
      </main>
    </MotionConfig>
  );
}
