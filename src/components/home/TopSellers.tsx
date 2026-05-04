"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";

const topSellers = [
  {
    id: 1,
    name: "1000pcs DIY Art Craft Sets Supplies for Kids",
    category: "Art & Craft Kits",
    price: 799.00,
    oldPrice: 850.00,
    discount: 6,
    image: "/images/art-craft.png",
    rating: 5,
    stock: "Only 12 Left!"
  },
  {
    id: 2,
    name: "Robotics Starter Kit v2.0 - STEM Edition",
    category: "Robotics | IoT",
    price: 1499.00,
    oldPrice: 1750.00,
    discount: 14,
    image: "/images/robotics-kit.png",
    rating: 4.9,
    stock: "Limited Edition"
  }
];

export default function TopSellers() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % topSellers.length);
  const prev = () => setCurrent((prev) => (prev - 1 + topSellers.length) % topSellers.length);

  const product = topSellers[current];

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden hidden xl:flex flex-col shadow-sm h-[560px] group/card hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
      <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Top Sellers</h3>
        <div className="flex gap-2">
          <button onClick={prev} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-primary hover:border-primary transition-all">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-primary hover:border-primary transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="relative aspect-square mb-8 rounded-3xl overflow-hidden group bg-slate-50 border border-slate-100 p-2">
          {/* Discount Badge */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg shadow-primary/20">
              -{product.discount}% OFF
            </span>
          </div>
          
          <div className="absolute top-4 right-4 z-10">
             <div className="bg-white/80 backdrop-blur-md text-primary text-[9px] font-black px-3 py-1.5 rounded-xl border border-primary/10 shadow-sm">
                {product.stock}
             </div>
          </div>

          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="flex-grow space-y-3">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{product.category}</p>
          <Link href={`/product/${product.id}`} className="text-lg font-black text-slate-800 hover:text-primary transition-colors line-clamp-2 leading-tight uppercase tracking-tight">
            {product.name}
          </Link>
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase">({product.rating} Rating)</span>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-50">
          <div className="flex items-baseline justify-between mb-5">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 leading-none">৳{product.price.toLocaleString()}</span>
              <span className="text-sm text-slate-400 line-through font-bold">৳{product.oldPrice.toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white py-4 rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200 group-hover/card:shadow-primary/20 flex items-center justify-center gap-3">
            <ShoppingCart size={18} /> ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
