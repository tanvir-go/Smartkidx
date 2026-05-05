"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const saleProducts = [
  { id: 1, name: "1000pcs DIY Art Craft Sets Supplies for Kids", price: 799, oldPrice: 850, discount: 6, image: "/images/demo/hero2.png" },
  { id: 2, name: "Robotics Starter Kit v2.0", price: 1499, oldPrice: 1750, discount: 14, image: "/images/demo/hero1.png" }
];

const bestPopular = [
  { id: 1, name: "Coding for Beginners", price: 25, rating: 5, image: "https://placehold.co/100x100/png?text=Book" },
  { id: 2, name: "Chemistry Lab Kit", price: 45, rating: 4, image: "https://placehold.co/100x100/png?text=Kit" },
  { id: 3, name: "Solar System Model", price: 15, rating: 5, image: "https://placehold.co/100x100/png?text=Model" },
  { id: 4, name: "Math Flash Cards", price: 10, rating: 4, image: "https://placehold.co/100x100/png?text=Cards" }
];

export default function MixedShowcase() {
  const [currentSale, setCurrentSale] = useState(0);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 1. Sale Products (Slider) */}
          <div className="lg:col-span-1 bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm">
             <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Sale Products</h3>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentSale((prev) => (prev - 1 + saleProducts.length) % saleProducts.length)} className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                    <ChevronLeft size={14} />
                  </button>
                  <button onClick={() => setCurrentSale((prev) => (prev + 1) % saleProducts.length)} className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                    <ChevronRight size={14} />
                  </button>
                </div>
             </div>
             
             <div className="space-y-6">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 p-4 group">
                  <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-2 py-1 rounded-lg z-10">-{saleProducts[currentSale].discount}%</span>
                  <img src={saleProducts[currentSale].image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt="Sale" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-black text-slate-800 uppercase leading-tight line-clamp-2">{saleProducts[currentSale].name}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-slate-900">৳{saleProducts[currentSale].price}</span>
                    <span className="text-[10px] text-slate-400 line-through font-bold">৳{saleProducts[currentSale].oldPrice}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
             </div>
          </div>

          {/* 2. Best Popular (Vertical List) */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm">
             <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">Best Popular</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                {bestPopular.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden p-2 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                      <img src={product.image} className="w-full h-full object-contain mix-blend-multiply" alt={product.name} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-800 uppercase leading-tight hover:text-primary transition-colors">{product.name}</h4>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < product.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />)}
                      </div>
                      <p className="text-sm font-black text-slate-900">৳{product.price}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* 3. Stacked Banners */}
          <div className="lg:col-span-1 flex flex-col gap-6">
             <div className="flex-grow bg-[#4D96FF] rounded-[32px] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-xl font-black uppercase leading-tight mb-2">Robotics & IOT<br/>For Smart Kids</h4>
                  <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest border-b border-white/50 hover:border-white transition-colors">Shop Now</Link>
                </div>
                <img src="/images/demo/hero1.png" className="absolute bottom-0 right-0 w-2/3 h-auto object-contain transition-transform duration-700 group-hover:scale-110" alt="Banner" />
             </div>
             <div className="flex-grow bg-[#F7A4A4] rounded-[32px] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-xl font-black uppercase leading-tight mb-2">Best Stationary<br/>For Girls</h4>
                  <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest border-b border-white/50 hover:border-white transition-colors">Shop Now</Link>
                </div>
                <img src="/images/demo/girls_stationary.png" className="absolute bottom-0 right-0 w-2/3 h-auto object-contain transition-transform duration-700 group-hover:scale-110" alt="Banner" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
