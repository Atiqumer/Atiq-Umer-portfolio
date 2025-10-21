"use client";

import { useState, useEffect } from "react";
import { Users, Cpu, Rocket } from "lucide-react";

const AboutMe = [
  {
    id: 1,
    title: "Collaborative & Innovative Thinker",
    icon: Users,
    description:
      "I thrive in collaborative environments where creativity meets technology. Working with diverse teams helps me design innovative, human-centered solutions that create lasting impact.",
  },
  {
    id: 2,
    title: "Technical Proficiency & Adaptability",
    icon: Cpu,
    description:
      "With expertise in Next.js, TypeScript, Tailwind CSS, and AI tools, I adapt quickly to new frameworks while maintaining clean, efficient, and scalable code for modern web projects.",
  },
  {
    id: 3,
    title: "Leadership & Growth Mindset",
    icon: Rocket,
    description:
      "I lead with empathy and determination, always eager to learn and improve. My focus on teamwork, consistency, and innovation drives successful outcomes in every challenge.",
  },
];

export default function About() {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            setVisible((prev) => Array.from(new Set([...prev, id])));
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="scroll-mt-[12vh] py-16 px-4 sm:px-6 lg:px-8 bg-[#b6b6c9f8] overflow-hidden "
    >
      {/* Background Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#1e40af]/30 via-[#b6b6c9f8]/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-[#155e75]/30 via-[#1e40af]/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#b6b6c9f8]/20 via-[#155e75]/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Section Header */}
      <div className="max-w-5xl mx-auto relative z-10 text-center mb-10">
        <h2 className="text-black text-[28px] sm:text-[33px] md:text-[45px] font-bold uppercase">
          WHY{" "}
          <span className="bg-gradient-to-r text-[#1e40af] bg-clip-text text-transparent">
            ME
          </span>
        </h2>
        <p className="text-black max-w-2xl mx-auto sm:text-[18px] leading-relaxed mt-4">
          I believe in meaningful creation — combining technology, teamwork, and
          innovation to build solutions that inspire and perform. My mindset
          focuses on collaboration, creativity, and continuous improvement in
          everything I do.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto relative z-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {AboutMe.map((skill, index) => {
          const Icon = skill.icon;
          const isVisible = visible.includes(skill.id);
          return (
            <div
              key={skill.id}
              data-id={skill.id}
              className={`${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                } transition-all duration-700 ease-out`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-[#1e40af]/20 backdrop-blur-md border border-[#155e75]/30 rounded-xl p-6 min-h-[230px] flex flex-col justify-between hover:bg-[#175a7f]/20 hover:border-[#b6b6c9f8]/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#b6b6c9f8]/30 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e40af] via-[#b6b6c9f8] to-[#155e75] p-2 flex items-center justify-center shadow-lg shadow-[#155e75] group-hover:shadow-[#175a7f]/70 transition-all duration-300">
                      <Icon className="w-6 h-6 text-[balck] group-hover:scale-110 transition-transform duration-300" /> 
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1e40af] via-[#b6b6c9f8] to-transparent opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[white] group-hover:to-[white] transition-all duration-300">
                      {skill.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
