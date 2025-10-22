"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Certificates = () => {
  const certificates = [
    {
      title: "Cracking the Hiring Code",
      issuer: "Microsoft Learn Student Ambassadors",
      year: "2025",
      link: "",
      image: "/images/cer1.jpeg",
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
      link: "https://assessment.panaversity.org/dashboard/results",
      image: "/images/cer3.jpeg",
    },
    {
      title: "AI for Beginner",
      issuer: "HP-LIFE",
      year: "2025",
      link: "https://www.life-global.org/certificate/adbbbc99-7e5f-4320-9995-5f876c76029c",
      image: "/images/cer4.jpeg",
    },
    {
      title: "Certificate of Appreciation For Volunteering",
      issuer: "LOOPLAB.com",
      year: "2025",
      link: "https://coursera.org/share/0d622978e4fedcccdbc648bf52837080",
      image: "/image/.jpeg",
    },
    {
      title: "ChatGPT Prompt Engineering for Developers!",
      issuer: "DEEP LEARNING.AI",
      year: "2025",
      link: "https://learn.deeplearning.ai/accomplishments/1639d217-2f0b-494d-9aad-6d15df47d3a1?usp=sharing",
      image: "/images/cer5.jpeg",
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
