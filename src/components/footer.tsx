"use client";
import React, { useEffect, useRef, useState } from "react";

import { Github, Linkedin, Facebook, MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m Atiq’s assistant. Ask me about his!" },
  ]);
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);

  const responses: Record<string, string> = {
    hello: "Hello there! I'm Atiq Umer's personal chatbot. 😊",
    who: "Atiq Umer is a passionate Computer Scientist and AI Enthusiast specializing in Next.js, TypeScript, and Generative AI.",
    skills:
      "Atiq’s skills include Wordpress, React.js, Tailwind CSS, BootStrap, Django, Python, FastAPI, Git, and Prompt Engineering.",
    projects:
      "He has built projects like a Portfolio Website, Company Wordpress website, EMP Management System, 3D Login Form and Breast Cancer Detection Model.",
    goals:
      "Atiq’s goal is to become an advanced AI Engineer and create impactful web applications blending creativity and intelligence.",
    contact: "You can connect with Atiq on LinkedIn or GitHub! 💼",
  };

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsgLower = userText.toLowerCase();

    const matchedKey =
      Object.keys(responses).find((k) => userMsgLower.includes(k)) || "default";

    const reply =
      matchedKey === "default"
        ? "🤖 I can tell you about Atiq’s skills, projects, or goals! Try asking about them."
        : responses[matchedKey];

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
      { sender: "bot", text: reply },
    ]);

    setInput("");
    setIsOpen(true);
  };

  return (
    <>
      {/* 🌈 FOOTER */}
      <footer className="relative bg-[#b6b6c9f8] text-black overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-800 to-cyan-800 animate-gradient-x" />

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-wide text-blue-800">
              Atiq{" "}
              <span className="text-[#1e40af]">
                Umer
              </span>
            </h2>
            <p className="mt-3 text-black text-sm leading-relaxed">
              Crafting elegant web experiences with WordPress, React, Djago and AI ✨
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-blue-800 font-semibold mb-3 tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm">
              {["Home", "Skills", "Projects", "Contact"].map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="relative group"
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-medium text-black hover:text-black transition-colors duration-300"
                  >
                    {link}
                  </a>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-[white]/80 to-[white]/20 transition-all group-hover:w-full"></span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-cyan-800 px-3 py-1 rounded-full mb-3 inline-block tracking-wider">
              Connect
            </h3>
            <div className="flex items-center space-x-5 mb-4">
              {[
                {
                  icon: <Github className="w-6 h-6" />,
                  link: "https://github.com/Atiqumer",
                },
                {
                  icon: <Linkedin className="w-6 h-6" />,
                  link: "https://www.linkedin.com/in/atiq-umer/",
                },
                {
                  icon: <Facebook className="w-6 h-6" />,
                  link: "https://www.facebook.com/share/1DGQ2vR4Bc/",
                },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  className="hover:text-blue-800 transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-black text-center py-4 text-sm text-black relative z-10">
          © {new Date().getFullYear()} Atiq Umer • All Rights Reserved
        </div>

        {/* Glowing animated background circles */}
        <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-20 blur-3xl animate-pulse-slow"></div>
      </footer>

      {/* 🌟 Floating Chat Button */}
      <motion.button
        aria-label="Open Atiq chatbot"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-gradient-to-r from-blue-800 to-cyan-800 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:block font-medium text-sm">Ask Atiq</span>
      </motion.button>

      {/* 💬 Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-8 w-80 h-96 bg-[#0c0b18] text-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-purple-500/30 z-[60]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-cyan-800 p-3 flex justify-between items-center">
              <h3 className="font-semibold text-sm">Atiq Umer Chatbot 🤖</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-black p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesRef}
              className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/40 scrollbar-track-transparent"
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === "bot" ? -12 : 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "bot"
                      ? "bg-[#b6b6c9f8] text-black self-start"
                      : "bg-[#b6b6c9f8] text-white self-end ml-auto"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 flex items-center gap-2 border-t border-purple-500/20">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about Atiq..."
                className="flex-1 bg-transparent border border-blue-800 rounded-lg px-3 py-1 text-sm focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-800 to-cyan-800 hover:opacity-95 p-2 rounded-lg"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
