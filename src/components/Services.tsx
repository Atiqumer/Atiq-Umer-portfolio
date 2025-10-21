"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Atom,
  Brain,
  Workflow,
  Cpu,
  Zap,
  Layers,
  Server,
  GitBranch,
  Github,
  Database,
  Monitor,
  Brackets,
  Palette,
  LayoutGrid,
  Wand2,
  Users,
  FileCode,
  Flame,
  Package,
  Brush,
} from "lucide-react";

// The skills array, grouped and using highly relevant icons for modern presentation
const skills = [
  // Core Languages & Frontend
  { name: "React.js", icon: <Atom className="text-sky-400 w-8 h-8" /> },
  { name: "JavaScript", icon: <Zap className="text-yellow-400 w-8 h-8" /> },
  { name: "Python", icon: <Cpu className="text-emerald-500 w-8 h-8" /> },
  { name: "HTML5", icon: <Brackets className="text-orange-500 w-8 h-8" /> },
  { name: "CSS3", icon: <Layers className="text-blue-500 w-8 h-8" /> },
  { name: "Tailwind CSS", icon: <Palette className="text-cyan-400 w-8 h-8" /> },

  // Backend & APIs
  { name: "Django", icon: <Flame className="text-green-600 w-8 h-8" /> },
  { name: "PHP", icon: <FileCode className="text-purple-400 w-8 h-8" /> },
  { name: "REST APIs", icon: <Server className="text-red-400 w-8 h-8" /> },

  // Databases & CMS
  { name: "PostgreSQL", icon: <Database className="text-indigo-400 w-8 h-8" /> },
  { name: "MySQL", icon: <Database className="text-orange-500 w-8 h-8" /> },
  { name: "WordPress", icon: <LayoutGrid className="text-sky-400 w-8 h-8" /> },
  { name: "Elementor", icon: <Brush className="text-pink-500 w-8 h-8" /> },

  // AI & Design
  { name: "AI Agents (basic)", icon: <Brain className="text-fuchsia-400 w-8 h-8" /> },
  { name: "Prompt Engineering", icon: <Wand2 className="text-yellow-300 w-8 h-8" /> },
  { name: "Responsive Design", icon: <Monitor className="text-lime-400 w-8 h-8" /> },
  { name: "UI/UX Collaboration", icon: <Users className="text-rose-400 w-8 h-8" /> },

  // Dev Tools & Deployment
  { name: "Git", icon: <GitBranch className="text-orange-400 w-8 h-8" /> },
  { name: "GitHub", icon: <Github className="text-gray-300 w-8 h-8" /> },
  { name: "Render", icon: <Package className="text-green-400 w-8 h-8" /> },
  { name: "Netlify", icon: <Package className="text-cyan-400 w-8 h-8" /> },
  { name: "PythonAnywhere", icon: <Package className="text-blue-400 w-8 h-8" /> },
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40, rotateX: 15 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Component
const Skills = () => {
  return (
    <section
      id="skills"
      className="bg-[#b6b6c9f8] pt-16 sm:pt-20 md:pt-28 pb-16 px-6 overflow-hidden scroll-mt-24"
    >
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[34px] sm:text-[45px] md:text-[55px] font-extrabold uppercase tracking-wide text-black mb-16"
        >
          My{" "}
          <span className="text-[#1e40af] text-transparent">
            Expertise
          </span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 place-items-center relative"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05, // Reduced scale for a decent feel
                rotateY: 0,  // Removed rotation for simplicity
                rotateX: 0,  // Removed rotation for simplicity
                boxShadow: "0 0 35px rgba(139, 92, 246, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full max-w-[160px] aspect-square flex flex-col items-center justify-center text-white rounded-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Border Gradient Effect */}
              <div className="absolute inset-0 p-[2px] rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[black]  to-[white] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[black]  to-[white] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl animate-pulse-slow"></div>
              </div>


              {/* Card Foreground - Cleaned up to remove redundant motion background */}
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 bg-[#99a0c5] backdrop-blur-2xl border border-[white] hover:border-[white] rounded-xl transition-all duration-500">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2.5 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-center hover:border-[white] transition-all duration-300">
                  {skill.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
