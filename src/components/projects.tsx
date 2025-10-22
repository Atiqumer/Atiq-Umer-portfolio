"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; // <--- 1. Imported next/image
import { motion } from "framer-motion";

const projects = [
  {
    title: "NeuralFlex - Official Website",
    category: "WordPress, Elementor",
    description:
      "Built a responsive company website for NeuralFlex AI using WordPress and Elementor. Integrated service sections and SEO-friendly layout. Optimized performance for fast, mobile-first loading.",
    image: "/images/neural.png",
    github: "#",
    demo: "https://neuralflex.io/",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Employee Management System",
    category: "Django, PostgreSQL, HTMX, Bootstrap",
    description:
      "Developed a full-stack system to manage employees, projects, and salaries. Included role-based access,salary slips, and analytics dashboard. Deployed on PythonAnywhere.",
    image: "/images/employe.png",
    github:"https://github.com/Atiqumer/Django-Employee-Management-System",
    demo: "https://atiq1.pythonanywhere.com/",
    tech: ["Django", "PostgreSQL" ,"HTMX", "Bootstrap"],
  },
  {
    title: "Monal London Restaurant Website",
    category: " WordPress, Elementor",
    description:
      "Developed a modern restaurant website during my Internship at DI TECH SOLUTIONS. Added reservation features, responsive design, and custom content. Enhanced site speed and UX for mobile users.",
    image: "/images/monal.png",
    github:
      "#",
    demo: "https://monallondon.com/",
    tech: ["Python", "Google Colab", "Generative AI"],
  },
  {
    title: "Breast Cancer Detection (ML)",
    category: "Python, Scikit-learn, Pandas, Seaborn ",
    description:
      "Trained a logistic regression model on the Wisconsin dataset to classify tumors. Achieved ~95% test accuracy with confusion matrix and F1-score. Included EDA, scaling, and visual analysis.",
    image: "/images/ec.jpg",
    github:
      "https://github.com/Atiqumer/Breast-Cancer-Detection",
    demo: "#",
    tech: ["Python", "Scikit-learn", "Pandas", "Seaborn" ],
  },
  {
    title: "ST Dubai Tech - Official Website",
    category: "WordPress, Elementor",
    description:
      "Created a clean, responsive site for a Dubai-based maintenance company. Designed service pages,integrated contact forms, and ensured mobile optimization. Focused on performance and visual clarity.",
    image: "/images/dubai.png",
    github: "#",
    demo: "https://stdubaitech.com/",
    tech: ["HTML", "CSS"],
  },
  {
    title: "Wide Box Cargo",
    category: "Wordpress, Elementor",
    description:
      "Designed and developed the official website for Wide Box Cargo (UAE), a licensed movers and packers company offering residential and commercial services across Dubai and the UAE. Built using WordPress, the site delivers a modern, SEO-friendly, and conversion-optimized experience that highlights the brand's reliability and service excellence..",
    image: "/images/vote.png",
    github:
      "https://github.com/MaryamRiaz-chattha/Online_webbased_voting_system",
    demo: "#",
    tech: ["PHP", "MySQL", "Bootstrap"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="bg-[#b6b6c9f8] p-8 scroll-mt-24">
      <p className="text-center text-black text-[28px] sm:text-[33px] md:text-[45px] font-bold uppercase">
        My{" "}
        <span className=" text-[#1e40af]">
          Projects
        </span>
      </p>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group relative h-full rounded-xl bg-[#111827]/60 backdrop-blur-md overflow-hidden shadow-lg border border-cyan-800 hover:shadow-[0_0_25px_#155e75] transition"
          >
            {/* Image (FIXED: Using next/image) */}
            <Image
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
              src={project.image}
              alt={project.title}
              width={500} // Added fixed width/height for Next.js Image component
              height={192} // h-48 translates to 192px (48 * 4)
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" 
            />

            {/* Category */}
            <h2 className="pt-3 px-4 text-xs font-semibold text-white uppercase tracking-widest">
              {project.category}
            </h2>

            {/* Title & Description */}
            <div className="py-2 px-6">
              <h3 className="mb-2 text-xl font-extrabold text-gray-100 tracking-wide">
                {project.title}
              </h3>
              <p className="line-clamp-4 mb-3 text-gray-300">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-[#b6b6c9f8] text-black text-xs px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="pb-4 px-6 flex justify-between items-center">
              <div className="flex space-x-4">
                {/* GitHub */}
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.96.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.31-1.28-1.66-1.28-1.66-1.05-.71.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.45.11-3.01 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.56.23 2.72.12 3.01.75.81 1.2 1.85 1.2 3.11 0 4.43-2.69 5.41-5.25 5.7.41.35.77 1.05.77 2.13v3.16c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </Link>

                {/* Vercel / Demo */}
                {project.demo !== "#" && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L1 21h22L12 2z" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* See More Projects Button */}
      <div className="flex justify-center mt-10">
        <Link
          href="https://github.com/Atiqumer?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-800 to-cyan-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          See More Projects
        </Link>
      </div>
    </section>
  );
};

export default Projects;