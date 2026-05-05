"use client";

import Link from "next/link";
import { Cpu, Microscope, Gamepad2, Palette, Baby, BookOpen } from "lucide-react";

const categories = [
  { name: "Robotics", slug: "robotics", count: 124, icon: <Cpu size={40} />, color: "bg-blue-50 text-blue-500" },
  { name: "STEM Kits", slug: "stem-kits", count: 86, icon: <Microscope size={40} />, color: "bg-emerald-50 text-emerald-500" },
  { name: "Kids Toys", slug: "kids-toys", count: 245, icon: <Gamepad2 size={40} />, color: "bg-rose-50 text-rose-500" },
  { name: "Stationary", slug: "stationary", count: 156, icon: <Palette size={40} />, color: "bg-amber-50 text-amber-500" },
  { name: "Gadgets", slug: "gadgets", count: 92, icon: <Baby size={40} />, color: "bg-indigo-50 text-indigo-500" },
  { name: "Books", slug: "books", count: 112, icon: <BookOpen size={40} />, color: "bg-purple-50 text-purple-500" },
];

export default function CategoryIcons() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 uppercase tracking-tight mb-2">Popular Categories</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center group"
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[40px] ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-sm group-hover:shadow-xl`}>
                  {cat.icon}
                </div>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[11px] mb-1">{cat.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{cat.count} Products</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
