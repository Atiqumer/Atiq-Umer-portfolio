"use client";

import { useState, useEffect, useMemo, memo } from "react";
import {
  Briefcase,
  Code,
  Factory,
  GraduationCap,
  BookOpen,
} from "lucide-react";

// --- 1. DATA DEFINITIONS (UNCHANGED) ---

interface JourneyItem {
  id: number;
  title: string;
  institution: string;
  description: string;
  icon: React.ElementType; 
  year: string;
}

const experience: JourneyItem[] = [
  {
    id: 101,
    title: "Virtual Tech Assistant",
    institution: "NeuralFlex",
    description:
      "Spearheaded the development and deployment of company websites and internal dashboards using Django, React.js, and WordPress. Actively contributed to the R&D of AI-based surveillance systems, exploring AI agents.",
    icon: Briefcase,
    year: "APRIL, 2025 - Present",
  },
  {
    id: 102,
    title: "Junior WordPress Developer (Internship)",
    institution: "DI TECH SOLUTIONS",
    description:
      "Assisted in developing and maintaining custom WordPress themes and plugins for client websites, ensuring mobile responsiveness and SEO-ready structures. Contributed to the successful launch of 2+ client projects.",
    icon: Code,
    year: "FEB, 2025 - APRIL, 2025",
  },
  {
    id: 103,
    title: "Draftsman",
    institution: "Benchmark",
    description:
      "Created detailed 2D floor plans and 3D design layouts for residential and commercial projects using industry-standard tools (AutoCAD, Adobe Illustrator), ensuring accuracy and adherence to client specifications.",
    icon: Factory,
    year: "JUNE, 2023 - ОСТ, 2023",
  },
];

const education: JourneyItem[] = [
  {
    id: 201,
    title: "BSCS In Computer Science",
    institution: "Superior University, Lahore",
    description:
      "Pursuing a Bachelor of Science in Computer Science from Superior University, Lahore, establishing a strong foundation in core computer science principles.",
    icon: GraduationCap,
    year: "2023 - 2027",
  },
  {
    id: 202,
    title: "Intermediate (Pre-Engineering)",
    institution: "Govt. Shalimar College, Lahore",
    description:
      "Completed Intermediate (Pre-Engineering) from Govt. Shalimar College, Lahore.",
    icon: BookOpen,
    year: "2021 - 2023",
  },
];

// --- 2. TIMELINE SECTION COMPONENT (Responsive Date Badge Fix) ---

const TimelineSection = memo(({ data, heading, id }: { data: JourneyItem[], heading: string, id: string }) => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  const stepsData = useMemo(() => data.map(item => ({
    ...item,
    uniqueId: `${id}-${item.id}` 
  })), [data, id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = Number(entry.target.getAttribute("data-step-id"));
            setVisibleSteps((prev) => Array.from(new Set([...prev, stepId])));
          }
        });
      },
      { threshold: 0.3 }
    );

    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      const steps = sectionElement.querySelectorAll("[data-step-id]");
      steps.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [id, stepsData]);

  return (
    <div id={id} className="pt-16 max-w-7xl mx-auto relative z-10">
      {/* Header (Ensured smooth text scaling) */}
      <div className="text-center mb-12">
        <h2 className="text-center text-black text-3xl sm:text-4xl md:text-5xl font-bold uppercase">
          MY{" "}
          <span className="text-[#1e40af]">
            {heading}
          </span>
        </h2>
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden relative max-w-md mx-auto px-4"> {/* Added px-4 for safe padding on mobile */}
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 w-1 h-full bg-white/20 rounded-full"></div>

        <div className="space-y-6">
          {data.map((step, index) => {
            const Icon = step.icon;
            const visible = visibleSteps.includes(step.id);
            return (
              <div
                key={step.id}
                data-step-id={step.id}
                className={`relative flex items-start ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  } transition-all duration-700 ease-out`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Icon */}
                <div className="z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 to-cyan-800 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/50">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="ml-6 bg-black/30 backdrop-blur-md border border-[#8B5CF6]/30 rounded-lg p-5 hover:bg-black/50 hover:border-[#155e75] hover:shadow-xl hover:shadow-[#155e75] transition-all duration-300 flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2"> {/* Changed to flex-col on mobile, flex-row on sm+ */}
                    <h3 className="text-white font-semibold text-base mb-1 sm:mb-0 sm:mr-4">{step.title}</h3>
                    {/* *** DATE BADGE IMPROVEMENT: Added flex-shrink-0 to prevent compression *** */}
                    <span className="text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-cyan-800 px-2 py-1 rounded-full flex-shrink-0">
                      {step.year}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm font-medium mb-1">{step.institution}</p>
                  <p className="text-white/70 text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden lg:block relative max-w-6xl mx-auto">
        {/* Vertical Center Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white h-full rounded-full shadow-lg shadow-[#155e75]"></div>

        <div className="space-y-16">
          {data.map((step, index) => {
            const Icon = step.icon;
            const visible = visibleSteps.includes(step.id);
            const left = index % 2 === 0;

            return (
              <div
                key={step.id}
                data-step-id={step.id} 
                className={`relative flex items-center ${left ? "justify-start" : "justify-end"
                  } ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  } transition-all duration-700 ease-out`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`w-full lg:w-5/12 px-4 ${left ? "lg:pr-8" : "lg:pl-8" // Used lg: prefix for desktop spacing
                    }`}
                >
                  <div className="bg-black/20 backdrop-blur-md border border-[#b6b6c9f8] rounded-lg p-6 hover:bg-black/40 hover:border-[#b6b6c9f8] hover:shadow-xl hover:shadow-[white]/20 transition-all duration-300">
                    {/* *** DATE BADGE (Desktop) - No major change needed, size is fine *** */}
                    <span className="text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-cyan-800 px-2 py-1 rounded-full mb-2 inline-block">
                      {step.year}
                    </span>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-white/80 font-medium text-sm mb-2">{step.institution}</p>
                    <p className="text-white text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon in center */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="relative group">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-800 to-cyan-800 p-2 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/50 group-hover:shadow-[#155e75] transition-all duration-300">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-800 to-cyan-800 opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

TimelineSection.displayName = 'TimelineSection';

// --- 3. MAIN WRAPPER COMPONENT (UNCHANGED) ---

export default function PortfolioJourney() {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[#b6b6c9f8] overflow-hidden"
    >
      {/* Background Glows (Outer Container) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-radial from-[#1e40af] via-[#155e75] to-transparent rounded-full blur-[100px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-radial from-[#1e40af] via-[#155e75] to-transparent rounded-full blur-[80px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-[#EC4899]/20 via-[#06B6D4]/10 to-transparent rounded-full blur-[60px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* RENDER EXPERIENCE TIMELINE FIRST */}
      <TimelineSection data={experience} heading="EXPERIENCE" id="experience-section" />

      {/* RENDER EDUCATION TIMELINE SECOND */}
      <TimelineSection data={education} heading="EDUCATION" id="education-section" />

    </section>
  );
}