"use client";
import React from "react";
import { Github, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#b6b6c9f8] text-black overflow-hidden">
      {/* Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-800 to-cyan-800 animate-gradient-x" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-wide text-blue-800">
            Atiq <span className="text-[#1e40af]">Umer</span>
          </h2>
          <p className="mt-3 text-black text-sm leading-relaxed">
            Crafting elegant web experiences with WordPress, React, Django and AI.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:items-center">
          <h3 className="text-blue-800 font-semibold mb-3 tracking-wider">
            Quick Links
          </h3>
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm">
            {["Home", "Skills", "Projects", "Contact"].map((link, i) => (
              <li key={i}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="font-medium text-black hover:text-black transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col md:items-end">
          <h3 className="text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-cyan-800 px-3 py-1 rounded-full mb-3 tracking-wider">
            Connect
          </h3>
          <div className="flex items-center space-x-5 mb-4">
            {[
              { icon: <Github className="w-6 h-6" />, link: "https://github.com/Atiqumer" },
              { icon: <Linkedin className="w-6 h-6" />, link: "https://www.linkedin.com/in/atiq-umer/" },
              { icon: <Facebook className="w-6 h-6" />, link: "https://www.facebook.com/share/1DGQ2vR4Bc/" },
            ].map((social, idx) => (
              <a key={idx} href={social.link} target="_blank" className="hover:text-blue-800 transition-colors duration-300">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-black text-center py-4 text-sm text-black relative z-10">
        © {new Date().getFullYear()} Atiq Umer • All Rights Reserved
      </div>

      {/* Background Glow */}
      <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 opacity-20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-20 blur-3xl animate-pulse-slow"></div>
    </footer>
  );
}
