import Link from "next/link";
import { Cpu, Gamepad2, Palette, Baby, BookOpen, Microscope } from "lucide-react";

const categories = [
  { name: "Electronics", icon: <Cpu size={32} />, count: "120+ Products", color: "bg-blue-50 text-blue-600" },
  { name: "Robotics", icon: <Microscope size={32} />, count: "85+ Products", color: "bg-emerald-50 text-emerald-600" },
  { name: "Kids Toys", icon: <Gamepad2 size={32} />, count: "250+ Products", color: "bg-orange-50 text-orange-600" },
  { name: "Stationary", icon: <Palette size={32} />, count: "150+ Products", color: "bg-purple-50 text-purple-600" },
  { name: "Lifestyle", icon: <Baby size={32} />, count: "90+ Products", color: "bg-pink-50 text-pink-600" },
  { name: "Books", icon: <BookOpen size={32} />, count: "300+ Products", color: "bg-amber-50 text-amber-600" },
];

export default function PopularCategories() {
  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-display font-black text-slate-900 mb-4">Popular Categories</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Discover our wide range of educational and fun products across various categories designed for every stage of childhood.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              href={`/category/${cat.name.toLowerCase()}`}
              className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
