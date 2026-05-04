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
    image: "/banner1.jpg",
    color: "bg-emerald-50",
    buttonText: "LEARN MORE",
    buttonColor: "bg-primary"
  },
  {
    id: 2,
    title: "Creative Minds, Smart Play",
    subtitle: "EDUCATIONAL TOYS & GAMES",
    description: "Discover a world of learning through play with our curated collection.",
    image: "/banner2.jpg",
    color: "bg-blue-50",
    buttonText: "SHOP NOW",
    buttonColor: "bg-blue-600"
  },
  {
    id: 3,
    title: "STEM Excellence for Kids",
    subtitle: "SCIENCE & TECHNOLOGY",
    description: "Empower your child with hands-on STEM projects and experiments.",
    image: "/banner3.jpg",
    color: "bg-amber-50",
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 ${slides[current].color} p-8 md:p-16 flex flex-col justify-center`}
        >
          <div className="max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-2"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-slate-800 leading-tight mb-4"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base text-slate-600 mb-8"
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
                className={`${slides[current].buttonColor} text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/20 transition-all`}
              >
                {slides[current].buttonText}
              </motion.button>
            </Link>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute right-0 bottom-0 w-1/2 h-full hidden md:flex items-center justify-center pointer-events-none">
             {/* Placeholder for images */}
             <div className="w-64 h-64 bg-white/50 rounded-full blur-3xl absolute animate-pulse"></div>
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
