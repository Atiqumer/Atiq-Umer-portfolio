"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Certificates = () => {
  const certificates = [
    {
      title: "WordPress Elementor Course",
      issuer: "Udemy",
      year: "2025",
      link: "https://www.udemy.com/certificate/UC-2c1b8e83-a6c1-462f-b10b-f00108b8229c/",
      image: "/images/cer7.png",
    },
    {
      title: "Design Prompts for Everyday Work Tasks",
      issuer: "Google",
      year: "2025",
      link: "https://www.coursera.org/account/accomplishments/verify/MOTXTYI54LF2?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
      image: "/images/cer2.jpeg",
    },
    {
      title: "YOAST WORDPRESS FOR BEGINNER",
      issuer: "Yoast",
      year: "2025",
      link: "https://academy.yoast.com/certificate/8218/1908341/e8a5e73cdc6a83eaacec7e927addc96d/1/",
      image: "/images/cer3.jpeg",
    },
    {
      title: "Advanced Wordpress Course for Professionals",
      issuer: "Udemy",
      year: "2025",
      link: "https://www.udemy.com/certificate/UC-f718aaa1-bebc-496c-bf18-11303c107dab/",
      image: "/images/cer9.png",
    },
    {
      title: "ChatGPT Prompt Engineering for Developers!",
      issuer: "DEEP LEARNING.AI",
      year: "2025",
      link: "https://learn.deeplearning.ai/accomplishments/1639d217-2f0b-494d-9aad-6d15df47d3a1?usp=sharing",
      image: "/images/cer5.jpeg",
    },
    {
      title: "Certificate of Appreciation For Volunteering",
      issuer: "LoopLab.com",
      year: "2025",
      link: "https://coursera.org/share/0d622978e4fedcccdbc648bf52837080",
      image: "/images/cer6.png",
    },
    {
      title: "AI Python for Beginners!",
      issuer: "DEEP LEARNING.AI",
      year: "2025",
      link: "https://learn.deeplearning.ai/accomplishments/fffb74de-e5dc-4d67-a004-a9ee490f4c4c?usp=sharing",
      image: "/images/cer8.png",
    },
    {
      title: "Start Writing Prompts like a Pro",
      issuer: "Google",
      year: "2025",
      link: "https://www.coursera.org/account/accomplishments/verify/936WU5G4BPO8",
      image: "/images/cer10.png",
    },
  ];

  return (
    // ✅ Section with ID for navbar smooth scroll
    <section
      id="certificates"
      className="bg-[#b6b6c9f8] text-white py-16 px-6 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl text-black font-bold text-center mb-12 uppercase">
          My{" "}
          <span className="text-blue-800">
            Certificates
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-[#545868] border border-cyan-800 rounded-2xl overflow-hidden hover:shadow-[0_0_20px_#155e75] transition transform hover:-translate-y-2"
            >
              <div className="relative w-full h-56 bg-[#ebebebf8] flex items-center justify-center">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6">
                <h4 className="text-lg font-semibold">{cert.title}</h4>
                <p className="text-gray-300">{cert.issuer}</p>
                <p className="text-gray-400 text-sm">{cert.year}</p>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                >
                  View Certificate
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
