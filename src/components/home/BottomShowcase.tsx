"use client";

import { Star, Clock } from "lucide-react";
import Link from "next/link";

const latestUpdates = [
  { id: 1, name: "Mechanical Dino v2", price: 35, image: "https://placehold.co/80x80/png?text=Dino" },
  { id: 2, name: "Solar Windmill Kit", price: 20, image: "https://placehold.co/80x80/png?text=Wind" },
  { id: 3, name: "Chemistry Lab Set", price: 45, image: "https://placehold.co/80x80/png?text=Chem" }
];

const categoryBanners = [
  { title: "Smart Watches", image: "https://placehold.co/200x150/png?text=Watch", color: "bg-slate-100" },
  { title: "New Drones", image: "https://placehold.co/200x150/png?text=Drone", color: "bg-slate-100" },
  { title: "STEM Kits", image: "https://placehold.co/200x150/png?text=STEM", color: "bg-slate-100" },
  { title: "Art & Craft", image: "https://placehold.co/200x150/png?text=Art", color: "bg-slate-100" }
];

export default function BottomShowcase() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 1. Latest Updates */}
          <div className="lg:col-span-1 bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
             <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">Latest Updates</h3>
             <div className="space-y-6">
                {latestUpdates.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden p-2 group-hover:scale-105 transition-transform duration-500">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                       <h4 className="text-[11px] font-black text-slate-800 uppercase leading-tight hover:text-primary transition-colors">{item.name}</h4>
                       <p className="text-xs font-black text-slate-900 mt-1">৳{item.price}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* 2. Hot Deals (Large) */}
          <div className="lg:col-span-1 bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm relative overflow-hidden group">
             <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">Hot Deals</h3>
             <div className="relative z-10 space-y-6 text-center">
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 p-4">
                  <img src="/images/robotics-kit.png" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="Hot Deal" />
                </div>
                <div>
                   <h4 className="text-sm font-black text-slate-800 uppercase leading-tight mb-2">Robotics Starter Kit - STEM Edition</h4>
                   <div className="flex justify-center gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                   </div>
                   <div className="flex items-center justify-center gap-4 text-primary bg-primary/5 py-3 rounded-2xl">
                      <Clock size={16} />
                      <span className="text-[11px] font-black uppercase tracking-widest">Ending Soon!</span>
                   </div>
                </div>
             </div>
          </div>

          {/* 3. Category Grid Banners */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
             {categoryBanners.map((banner, i) => (
               <div key={i} className={`${banner.color} rounded-[32px] p-6 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500`}>
                  <div className="relative z-10">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{banner.title}</h4>
                    <Link href="/shop" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Shop Now</Link>
                  </div>
                  <img src={banner.image} className="absolute bottom-0 right-0 w-1/2 h-auto object-contain transition-transform duration-700 group-hover:scale-110" alt="Banner" />
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
