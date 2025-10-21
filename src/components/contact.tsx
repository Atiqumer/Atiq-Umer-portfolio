"use client";

import React from "react";
import { Mail, User, MessageSquare, SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen bg-[#b6b6c9f8] text-black flex flex-col items-center justify-center p-6 scroll-mt-20 overflow-hidden"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-[28px] sm:text-[33px] md:text-[45px] font-bold uppercase text-center mb-12"
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
        className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-xl border border-cyan-800 overflow-hidden backdrop-blur-md bg-[#0b0816]/60 "
      >
        {/* Left Side: Contact Info */}
        <div className="lg:w-1/2 bg-gradient-to-r from-[#8B5CF6]/20 via-[#EC4899]/20 to-[#9606d4ee]/10 p-8 flex flex-col justify-center gap-6 relative">
          {/* Animated Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-800 to-cyan-800 opacity-30 animate-pulse-slow"></div>
          <h2 className="text-2xl sm:text-3xl font-bold z-10">
            Let’s Connect!
          </h2>
          <p className="text-black z-10">
            I’m always open for collaboration, project creation, or new
            opportunities. Feel free to reach out and let’s build something
            amazing together!
          </p>
          <div className="flex items-center gap-3 z-10">
            <Mail className="text-[#b6b6c9f8] w-6 h-6" />
            <a
              href="mailto:atiqumer15@gmail.com"
              className="text-white font-semibold underline hover:text-blue-100 transition"
            >
              atiqumer15@gmail.com
            </a>
          </div>
        </div>

        {/* Connector Line */}
        <div className="hidden lg:block w-0.5 bg-gradient-to-r from-blue-800 to-cyan-800 mx-0" />

        {/* Right Side: Contact Form */}
        <div className="lg:w-1/2 p-8 z-10">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Your Name
              </label>
              <div className="flex items-center bg-gray-800 rounded-lg border border-gray-600 focus-within:border-fuchsia-500 focus-within:ring-2 focus-within:ring-fuchsia-500 transition">
                <User className="text-blue-400 w-5 h-5 ml-3" />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-transparent outline-none rounded-lg text-gray-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your Email
              </label>
              <div className="flex items-center bg-gray-800 rounded-lg border border-gray-600 focus-within:border-fuchsia-500 focus-within:ring-2 focus-within:ring-fuchsia-500 transition">
                <Mail className="text-blue-400 w-5 h-5 ml-3" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-transparent outline-none rounded-lg text-gray-200"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <div className="flex items-start bg-gray-800 rounded-lg border border-gray-600 focus-within:border-fuchsia-500 focus-within:ring-2 focus-within:ring-fuchsia-500 transition">
                <MessageSquare className="text-blue-400 w-5 h-5 ml-3 mt-3" />
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 bg-transparent outline-none rounded-lg text-gray-200 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-800 to-cyan-800 font-semibold text-lg shadow-md hover:opacity-90 transition hover:scale-[1.02]"
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
