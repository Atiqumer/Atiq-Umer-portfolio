"use client";

import React from "react";
import { Mail, User, MessageSquare, SendHorizonal, Phone } from "lucide-react";
import { motion } from "framer-motion";

// Define a variable for the custom color for better readability and maintenance
const BG_COLOR_LIGHT_GRAY = "#b6b6c9f8"; // Original background color, treated as light gray/off-white

const Contact = () => {
  return (
    <section
      id="contact"
      // Use standard Tailwind class for the custom color
      className={`min-h-screen bg-[${BG_COLOR_LIGHT_GRAY}] text-black flex flex-col items-center justify-center p-4 sm:p-6 scroll-mt-20 overflow-hidden`}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        // Ensured heading scales well
        className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-center mb-10"
      >
        CONTACT{" "}
        <span className="text-blue-800">
          ME
        </span>
      </motion.h1>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        // Card uses flex-col (stacks) on mobile, flex-row on large screens
        className={`w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-xl border border-cyan-800 overflow-hidden backdrop-blur-md bg-[${BG_COLOR_LIGHT_GRAY}]`}
      >
        {/* Left Side: Contact Info - Always on top in the column stack */}
        <div className="lg:w-1/2 bg-gradient-to-r from-blue-800 to-cyan-800 p-8 sm:p-10 flex flex-col justify-center gap-6 relative">
          
          {/* Animated Glow (Retained original style) */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-800 to-cyan-800 opacity-30 animate-pulse-slow"></div>
          
          <h2 className="text-2xl text-white sm:text-3xl font-bold z-10">
            Let’s Connect!
          </h2>
          <p className="text-white z-10 text-base sm:text-lg">
            I’m always open for collaboration, project creation, or new
            opportunities. Feel free to reach out and let’s build something
            amazing together!
          </p>
          
          {/* *** RESPONSIVENESS IMPROVEMENT HERE *** */}
          {/* Changed 'flex items-center gap-3' to use a block layout with vertical spacing on small screens */}
          <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-6 z-10 flex-wrap">
            
            {/* Email Link */}
            <div className="flex items-center gap-3">
              <Mail className={`text-[${BG_COLOR_LIGHT_GRAY}] w-6 h-6 flex-shrink-0`} />
              <a
                href="mailto:atiqumer15@gmail.com"
                className="text-white text-sm font-semibold underline hover:text-blue-100 transition truncate"
              >
                atiqumer15@gmail.com
              </a>
            </div>

            {/* Phone Link */}
            <div className="flex items-center gap-3">
              <Phone className={`text-[${BG_COLOR_LIGHT_GRAY}] w-6 h-6 flex-shrink-0`} />
              <a
                href="tel:03254243926" // Changed to tel: for phone link
                className="text-white text-sm font-semibold hover:text-blue-100 transition"
              >
                0325-4243926
              </a>
            </div>
          </div>
        </div>

        {/* Connector Line (Retained original style) */}
        <div className="hidden lg:block w-0.5 bg-gradient-to-r from-blue-800 to-cyan-800 mx-0" />

        {/* Right Side: Contact Form */}
        <div className="lg:w-1/2 p-8 sm:p-10 z-10">
          <form className="space-y-6">
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Your Name
              </label>
              <div className="flex items-center bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
                <User className="text-blue-500 w-5 h-5 ml-3" />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  // Changed input text color to black/gray-800 for better contrast on white background
                  className="w-full px-4 py-3 bg-transparent outline-none rounded-lg text-gray-800"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Your Email
              </label>
              <div className="flex items-center bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
                <Mail className="text-blue-500 w-5 h-5 ml-3" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-transparent outline-none rounded-lg text-gray-800"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <div className="flex items-start bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
                <MessageSquare className="text-blue-500 w-5 h-5 ml-3 mt-3 flex-shrink-0" />
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 bg-transparent outline-none rounded-lg text-gray-800 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center text-white gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-800 to-cyan-800 font-semibold text-lg shadow-md hover:opacity-90 transition hover:scale-[1.02] mt-8"
            >
              <SendHorizonal className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;