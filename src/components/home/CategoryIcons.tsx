"use client";

import { Cpu, Microscope, Gamepad2, Palette, Baby, BookOpen } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Robotics", count: 124, icon: <Cpu size={40} />, color: "bg-blue-50 text-blue-500" },
  { name: "STEM Kits", count: 86, icon: <Microscope size={40} />, color: "bg-emerald-50 text-emerald-500" },
  { name: "Kids Toys", count: 245, icon: <Gamepad2 size={40} />, color: "bg-rose-50 text-rose-500" },
  { name: "Stationary", count: 156, icon: <Palette size={40} />, color: "bg-amber-50 text-amber-500" },
  { name: "Gadgets", count: 92, icon: <Baby size={40} />, color: "bg-indigo-50 text-indigo-500" },
  { name: "Books", count: 112, icon: <BookOpen size={40} />, color: "bg-purple-50 text-purple-500" },
];

export default function CategoryIcons() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              href={`/category/${cat.name.toLowerCase()}`}
              className="flex flex-col items-center group"
            >
              <div className={`w-24 h-24 rounded-[40px] ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-sm group-hover:shadow-xl`}>
                {cat.icon}
              </div>
              <h4 className="font-black text-slate-800 uppercase tracking-widest text-[11px] mb-1">{cat.name}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{cat.count} Products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
