"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Building the Future of Tech",
    subtitle: "TIME TO VALUE YOUR MONEY",
    description: "Explore our latest Robotics and IoT kits designed for young innovators.",
    image: "/images/demo/hero1.png",
    color: "bg-white",
    buttonText: "LEARN MORE",
    buttonColor: "bg-primary"
  },
  {
    id: 2,
    title: "Creative Minds, Smart Play",
    subtitle: "EDUCATIONAL TOYS & GAMES",
    description: "Discover a world of learning through play with our curated collection.",
    image: "/images/demo/hero2.png",
    color: "bg-white",
    buttonText: "SHOP NOW",
    buttonColor: "bg-blue-600"
  },
  {
    id: 3,
    title: "STEM Excellence for Kids",
    subtitle: "SCIENCE & TECHNOLOGY",
    description: "Empower your child with hands-on STEM projects and experiments.",
    image: "/images/demo/hero3.png",
    color: "bg-white",
    buttonText: "VIEW PROJECTS",
    buttonColor: "bg-accent"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[300px] md:h-[450px] lg:h-[560px] rounded-2xl overflow-hidden shadow-sm group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${slides[current].color} border border-slate-100 rounded-2xl overflow-hidden`}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
          
          <div className="container mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16 px-8 md:px-16 relative z-10">
            {/* Left Side: Content */}
            <div className="flex flex-col justify-center text-left">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-black text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4"
              >
                {slides[current].subtitle}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-[1.1] mb-6 uppercase tracking-tight"
              >
                {slides[current].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-lg text-slate-500 mb-10 max-w-sm font-semibold italic"
              >
                {slides[current].description}
              </motion.p>
              <Link href="/shop">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${slides[current].buttonColor} text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 transition-all`}
                >
                  {slides[current].buttonText}
                </motion.button>
              </Link>
            </div>

            {/* Right Side: Image */}
            <div className="hidden md:flex items-center justify-center h-full relative">
               <motion.div
                 key={`box-${current}`}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, delay: 0.3 }}
                 className="absolute inset-0 bg-slate-50/50 rounded-[60px] -rotate-6 scale-95"
               ></motion.div>
               <motion.img 
                 key={`img-${current}`}
                 initial={{ opacity: 0, scale: 0.5, y: 50, rotate: 10 }}
                 animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                 transition={{ 
                   type: "spring",
                   stiffness: 100,
                   damping: 20,
                   delay: 0.4 
                 }}
                 src={slides[current].image} 
                 alt={slides[current].title}
                 className="relative z-10 w-full h-full max-h-[400px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
               />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${current === i ? "w-6 bg-primary" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
