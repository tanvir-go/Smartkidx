"use client";

import { useState } from "react";
import ProductCard from "../product/ProductCard";

const tabs = ["KIDS TOYS", "STEM PROJECTS", "DIY KITS", "ART & CRAFT"];

const products = [
  { id: 1, name: "Mechanical Dinosaur", category: "KIDS TOYS", price: 35, image: "https://placehold.co/400x400/png?text=Dino", rating: 4 },
  { id: 2, name: "Solar Windmill", category: "STEM", price: 20, image: "https://placehold.co/400x400/png?text=Windmill", rating: 5 },
  { id: 3, name: "Crystal Growing Kit", category: "DIY", price: 25, image: "https://placehold.co/400x400/png?text=Crystal", rating: 4 },
  { id: 4, name: "Paint by Numbers", category: "ART", price: 15, image: "https://placehold.co/400x400/png?text=Paint", rating: 5 },
  { id: 5, name: "Wooden Puzzle", category: "TOYS", price: 12, image: "https://placehold.co/400x400/png?text=Puzzle", rating: 4 },
  { id: 6, name: "Magic Science Kit", category: "STEM", price: 30, image: "https://placehold.co/400x400/png?text=Science", rating: 5 },
  { id: 7, name: "Bead Jewelry Set", category: "DIY", price: 18, image: "https://placehold.co/400x400/png?text=Beads", rating: 4 },
  { id: 8, name: "Clay Modeling Set", category: "ART", price: 22, image: "https://placehold.co/400x400/png?text=Clay", rating: 5 },
];

export default function TabbedProducts() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-slate-200 pb-4">
           <div className="flex gap-8 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {tabs.map((tab, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(i)}
                  className={`text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all relative pb-4 md:pb-0 ${activeTab === i ? "text-primary" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {tab}
                  {activeTab === i && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full md:hidden"></div>}
                </button>
              ))}
           </div>
           <div className="hidden md:flex gap-2">
              <button className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                <ChevronRight size={16} />
              </button>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           {/* Featured Side Image */}
           <div className="lg:w-1/4 bg-[#FFD93D] rounded-[40px] p-8 text-white relative overflow-hidden group min-h-[350px]">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Best Selling</p>
                <h3 className="text-3xl font-black uppercase leading-tight tracking-tight mb-8">Most Popular<br/>Kids Toys</h3>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">
                  Shop All
                </button>
              </div>
              <img src="https://placehold.co/400x500/png?text=Kids+Toys" className="absolute bottom-0 right-0 w-3/4 h-auto object-contain transition-transform duration-700 group-hover:scale-110" alt="Toys" />
           </div>

           {/* Product Grid */}
           <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
