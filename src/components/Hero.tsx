"use client";
import Particle from "./Particle";
import TextEffect from "./textEffects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <div
      id="home"
      className="relative bg-[#b6b6c9f8] bg-center bg-cover pt-[12vh]"
    >
      <Particle />
      <div className="w-[90%] lg:w-[80%] mx-auto h-full flex flex-col-reverse lg:flex-row items-center justify-center gap-10 py-16">
        {/*  Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left lg:max-w-[50%]">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
            Hi, I am{" "}
            <span className="bg-blue-800 bg-clip-text text-transparent">
              Atiq Umer
            </span>
          </h1>
          {/* Animated Text Effect */}
          <div className="mt-2">
            <TextEffect />
          </div>
          {/* Description */}
          <p className="mt-4 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-gray-950 max-w-[600px] mx-auto lg:mx-0 leading-relaxed">
            Welcome to my portfolio! I’m{" "}
            <span className="font-semibold">Atiq Umer</span>, a passionate
            learner and web developer skilled in{" "}
            <span className="font-semibold">Next.js, TypeScript,</span> and{" "}
            <span className="font-semibold">Tailwind CSS</span>. I love creating
            beautiful and interactive websites while exploring the world of{" "}
            <span className="font-semibold">AI-driven applications</span>.
          </p>
          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/path/to/your-cv.pdf" download>
              <button className="bg-gradient-to-r from-blue-800 to-cyan-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                Download CV
              </button>
            </Link>
          </div>
        </motion.div>
        {/* ✅ Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}

          className="w-[220px] md:w-[210px] lg:w-[350px] relative flex justify-center items-center mx-auto"

        >

          <div className="w-full h-auto aspect-square rounded-[24%] overflow-hidden
             shadow-[0_0_25px_#1e40af] hover:shadow-[0_0_45px_#ffffff]
             transition duration-300 ease-in-out"
>

            <Image
              src="/images/port.jpg"
              alt="user"
              layout="responsive"
              width={400}
              height={400}
              className="object-cover" />
          </div>
        </motion.div>
      </div>
    </div>
  );

};



export default Hero;