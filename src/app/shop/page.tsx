"use client";

import { useState } from "react";
import { 
  Filter, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Search, 
  X,
  Star,
  ChevronRight,
  Home
} from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

const allProducts = [
  {
    id: 1,
    name: "Arduino Uno R3 Ultimate Starter Kit for Kids",
    category: "Robotics | IoT",
    price: 45.00,
    oldPrice: 55.00,
    discount: 18,
    image: "/images/robotics-kit.png",
    rating: 4.9,
    reviews: 124,
    isHot: true
  },
  {
    id: 2,
    name: "Magnetic Building Blocks Set - 120 Pieces",
    category: "Kids Toys",
    price: 32.50,
    image: "/images/magnetic-blocks.png",
    rating: 4.7,
    reviews: 86,
    isNew: true
  },
  {
    id: 3,
    name: "STEM Solar Robot Kit 12-in-1 Educational Toy",
    category: "Robotics | IoT",
    price: 24.99,
    oldPrice: 29.99,
    discount: 16,
    image: "/images/solar-car.png",
    rating: 4.8,
    reviews: 210
  },
  {
    id: 4,
    name: "1000pcs DIY Art Craft Sets Supplies for Kids",
    category: "Art & Craft",
    price: 799.00,
    oldPrice: 850.00,
    discount: 6,
    image: "/images/art-craft.png",
    rating: 5,
    reviews: 45
  },
  {
    id: 5,
    name: "Science Lab Experiment Kit - 50+ Experiments",
    category: "STEM Kits",
    price: 49.00,
    image: "https://placehold.co/500x600/png?text=Science+Kit",
    rating: 4.6,
    reviews: 32
  },
  {
    id: 6,
    name: "E-Learning Tablet for Toddlers",
    category: "Electronics",
    price: 89.00,
    oldPrice: 110.00,
    discount: 19,
    image: "https://placehold.co/500x600/png?text=Tablet",
    rating: 4.4,
    reviews: 18
  },
  {
    id: 7,
    name: "Kids Microscope with 1200x Magnification",
    category: "STEM Kits",
    price: 55.00,
    image: "https://placehold.co/500x600/png?text=Microscope",
    rating: 4.8,
    reviews: 67
  },
  {
    id: 8,
    name: "Coding for Kids: Python Starter Guide",
    category: "Books",
    price: 15.00,
    image: "https://placehold.co/500x600/png?text=Coding+Book",
    rating: 4.9,
    reviews: 156
  }
];

const categories = [
  { name: "Robotics | IoT", count: 12 },
  { name: "Kids Toys", count: 45 },
  { name: "Art & Craft", count: 28 },
  { name: "STEM Kits", count: 34 },
  { name: "Electronics", count: 15 },
  { name: "Books", count: 22 }
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-800">Shop</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-8">
            {/* Categories */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-6 border-b border-slate-50 pb-4">Categories</h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <button 
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center justify-between w-full group ${selectedCategory === cat.name ? "text-primary" : "text-slate-500"}`}
                  >
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{cat.name}</span>
                    <span className="text-[10px] font-black bg-slate-50 px-2 py-1 rounded-lg text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-6 border-b border-slate-50 pb-4">Price Range</h3>
              <div className="space-y-6">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="10"
                  className="w-full accent-primary"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-grow bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 block uppercase mb-1">Min</span>
                    <span className="text-sm font-black text-slate-800">৳0</span>
                  </div>
                  <div className="flex-grow bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 block uppercase mb-1">Max</span>
                    <span className="text-sm font-black text-slate-800">৳{priceRange[1]}</span>
                  </div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">
                  Apply Filter
                </button>
              </div>
            </div>

            {/* Ratings Filter */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-6 border-b border-slate-50 pb-4">Customer Rating</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button key={rating} className="flex items-center gap-2 group w-full">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">& Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Banner Ad */}
            <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden group">
               <div className="relative z-10">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">New Collection</p>
                 <h4 className="text-2xl font-black uppercase tracking-tight leading-none mb-6">Robotics Masterclass</h4>
                 <button className="bg-white text-primary px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                   Shop Now
                 </button>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search in shop..."
                    className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                  />
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <div className="h-8 w-px bg-slate-100"></div>
                <p className="text-xs font-bold text-slate-400">Showing <span className="text-slate-800">1–8</span> of 32 results</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:border-primary transition-all">
                    Sort by: <span className="text-slate-900">Newest Items</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:border-primary transition-all group"
                >
                  Category: {selectedCategory}
                  <X size={14} className="text-slate-300 group-hover:text-primary" />
                </button>
              )}
              <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline ml-2">Clear All Filters</button>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {allProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <div className="flex gap-2">
                <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 hover:border-primary hover:text-primary transition-all shadow-sm">
                   Prev
                </button>
                <button className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20">
                   1
                </button>
                <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm">
                   2
                </button>
                <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm">
                   3
                </button>
                <span className="w-12 h-12 flex items-center justify-center text-slate-300">...</span>
                <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 hover:border-primary hover:text-primary transition-all shadow-sm">
                   Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
