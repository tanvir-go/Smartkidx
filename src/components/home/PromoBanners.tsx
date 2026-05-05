"use client";

import Link from "next/link";
import Image from "next/image";

const banners = [
  {
    title: "Boys Latest Trends Wear",
    subtitle: "Fashion",
    color: "bg-[#FF6B6B]",
    image: "/images/demo/hero2.png",
    link: "/shop?category=fashion"
  },
  {
    title: "Leatest Accessories",
    subtitle: "Gadgets",
    color: "bg-[#F7A4A4]",
    image: "/images/demo/hero1.png",
    link: "/shop?category=gadgets"
  },
  {
    title: "Most Popular",
    subtitle: "Electronics",
    color: "bg-[#4D96FF]",
    image: "/images/demo/hero3.png",
    link: "/shop?category=electronics"
  },
  {
    title: "Best 2026 Collection Sale",
    subtitle: "New Arrival",
    color: "bg-[#FFD93D]",
    image: "/images/demo/toys_collection.png",
    link: "/shop?category=new"
  }
];

export default function PromoBanners() {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {banners.map((banner, i) => (
            <Link 
              key={i} 
              href={banner.link}
              className={`${banner.color} rounded-2xl p-8 relative overflow-hidden group h-48 flex items-center shadow-lg shadow-slate-100 hover:shadow-2xl transition-all duration-500`}
            >
              <div className="relative z-10 w-1/2">
                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-1">{banner.subtitle}</p>
                <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">{banner.title}</h3>
                <span className="inline-block mt-4 text-[10px] font-black text-white uppercase tracking-widest border-b-2 border-white/30 pb-1 group-hover:border-white transition-colors">Shop Now</span>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-90 group-hover:scale-110 transition-transform duration-700">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-contain object-right-bottom"
                />
              </div>
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
