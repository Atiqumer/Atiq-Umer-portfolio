"use client";
import React from "react";
import { Menu } from "lucide-react";

interface NavProps {
openNav: () => void;
}

const Nav: React.FC<NavProps> = ({ openNav }) => {
const navLinks = [
{ name: "Home", href: "home" },
{ name: "About", href: "about" },
{ name: "Skills", href: "skills" },
{ name: "Projects", href: "projects" },
{ name: "Certificates", href: "certificates" },
{ name: "Contact", href: "contact" },
];

const handleScroll = (id: string) => {
const section = document.getElementById(id);
if (section) {
section.scrollIntoView({ behavior: "smooth" });
}
};

return (
<nav className="fixed top-4 left-0 right-0 w-full z-50 flex justify-center px-4">
<div
className="w-full max-w-[1280px]
flex justify-between items-center
bg-[hashtag#0b0816]/50 backdrop-blur-xl border border-stone-900/50 
rounded-2xl shadow-[0_0_25px_hashtag#d946ef30] px-4 sm:px-6 md:px-8 py-3"
>
{/* Logo */}
<h1 className="text-[22px] sm:text-[30px] font-bold text-[#1e40af] tracking-wide hover:text-[#1e40af] transition cursor-pointer">
Atiq Umer
</h1>

{/* Desktop Links */}
<ul className="hidden md:flex items-center space-x-8">
{navLinks.map((link) => (
<li key={link.name}>
<button
onClick={() => handleScroll(link.href)}
className="text-blue-800 font-medium text-lg relative group"
>
{link.name}
<span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-[white]/80 to-[white]/20 transition-all duration-300 group-hover:w-full" />
</button>
</li>
))}
</ul>

{/* Mobile Menu Button */}
<button
className="md:hidden text-fuchsia-400 hover:text-fuchsia-300 transition p-2"
onClick={openNav}
>
<Menu size={28} />
</button>
</div>
</nav>
);
};

export default Nav;
