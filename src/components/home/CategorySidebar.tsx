import Link from "next/link";
import { 
  Menu, 
  ChevronRight, 
  Cpu, 
  Gamepad2, 
  BookOpen, 
  Palette, 
  Baby, 
  Zap,
  Microscope
} from "lucide-react";

const categories = [
  { name: "Electronics & Gadgets", icon: <Cpu size={18} />, href: "/category/electronics" },
  { name: "Robotics | IoT", icon: <Microscope size={18} />, href: "/category/robotics" },
  { name: "Kids Toys", icon: <Gamepad2 size={18} />, href: "/category/toys" },
  { name: "Stationary", icon: <Palette size={18} />, href: "/category/stationary" },
  { name: "Kids Lifestyle", icon: <Baby size={18} />, href: "/category/lifestyle" },
  { name: "Books", icon: <BookOpen size={18} />, href: "/category/books" },
  { name: "STEM Kits", icon: <Zap size={18} />, href: "/category/stem" },
];

export default function CategorySidebar() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hidden lg:block shadow-sm h-full">
      <div className="bg-primary text-white px-6 py-4 flex items-center gap-3">
        <Menu size={20} />
        <span className="font-bold uppercase tracking-wider text-sm">Browse Categories</span>
      </div>
      <nav className="py-2">
        {categories.map((cat, index) => (
          <Link 
            key={index} 
            href={cat.href}
            className="flex items-center justify-between px-6 py-3.5 hover:bg-secondary hover:text-primary transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-400 group-hover:text-primary transition-colors">
                {cat.icon}
              </span>
              <span className="text-sm font-medium text-slate-700">{cat.name}</span>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary" />
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t border-slate-100">
        <div className="bg-accent/10 rounded-lg p-4 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">New Arrivals</p>
          <p className="text-sm font-bold text-slate-800 mb-3">Robotics Masterclass</p>
          <button className="text-xs font-bold text-primary hover:underline">Shop Now</button>
        </div>
      </div>
    </div>
  );
}
