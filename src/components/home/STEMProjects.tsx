"use client";

import { motion } from "framer-motion";
import { ArrowRight, Microscope, Zap, Cpu } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "DIY Hydraulic Claw",
    level: "Intermediate",
    age: "10-14 Years",
    image: "https://placehold.co/600x400/png?text=Hydraulic+Claw",
    icon: <Microscope className="text-primary" />
  },
  {
    title: "Solar Powered Car",
    level: "Beginner",
    age: "8-12 Years",
    image: "https://placehold.co/600x400/png?text=Solar+Car",
    icon: <Zap className="text-accent" />
  }
];

export default function STEMProjects() {
  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight mb-6">
                Unlock Their Potential with <span className="text-primary">STEM Projects</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Our STEM kits go beyond just toys. They are hands-on educational experiences that teach kids the fundamentals of engineering, electronics, and science in a fun and engaging way.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Cpu className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">Hands-on Learning</h4>
                    <p className="text-slate-500 text-sm">Real components and tools for a professional learning experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">Detailed Guides</h4>
                    <p className="text-slate-500 text-sm">Step-by-step video and written tutorials for every project.</p>
                  </div>
                </div>
              </div>

              <Link href="/stem-projects" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                EXPLORE ALL PROJECTS <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-slate-50 rounded-3xl overflow-hidden group border border-slate-100"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white p-2 rounded-xl shadow-md">
                    {project.icon}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase">
                      {project.level}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {project.age}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
