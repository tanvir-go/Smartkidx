"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Filter, 
  Grid2X2, 
  List, 
  ChevronDown,
  Cpu,
  Microscope,
  Gamepad2,
  Palette,
  Baby,
  BookOpen,
  Zap
} from "lucide-react";
import { products as allProducts } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

import { categories } from "@/data/navigation";

export default function CategoryPage({ params: paramsPromise }: { params: Promise<{ slug: string[] }> }) {
  const params = use(paramsPromise);
  const slug = params.slug;
  const categorySlug = slug[0];
  const subCategorySlug = slug[1];

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [openCategory, setOpenCategory] = useState<string | null>(categorySlug);

  // Map slug back to display name
  const activeCategory = categories.find(c => c.slug === categorySlug);
  const categoryName = activeCategory?.name || categorySlug;
  const subCategoryName = subCategorySlug 
    ? activeCategory?.subcategories?.find(s => s.slug === subCategorySlug)?.name || subCategorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : null;

  // Filter products
  const filteredProducts = allProducts.filter(p => {
    const pCat = p.category.toLowerCase();
    if (categorySlug === "electronics" && pCat.includes("electronics")) return true;
    if (categorySlug === "robotics" && pCat.includes("robotics")) return true;
    if (categorySlug === "stem-kits" && pCat.includes("stem")) return true;
    if (categorySlug === "toys" && pCat.includes("toys")) return true;
    if (categorySlug === "stationary" && pCat.includes("stationary")) return true;
    if (categorySlug === "lifestyle" && pCat.includes("lifestyle")) return true;
    if (categorySlug === "books" && pCat.includes("books")) return true;
    return false;
  });

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allProducts.slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-primary transition-colors">Categories</Link>
            <ChevronRight size={12} />
            <span className={subCategoryName ? "hover:text-primary transition-colors cursor-pointer" : "text-slate-800"}>
              {categoryName}
            </span>
            {subCategoryName && (
              <>
                <ChevronRight size={12} />
                <span className="text-slate-800">{subCategoryName}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-1/4 space-y-8">
            {/* Category Filter */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 pb-4 border-b border-slate-50">All Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const isOpen = openCategory === cat.slug;
                  const isActive = categorySlug === cat.slug;
                  
                  return (
                    <div key={cat.slug} className="space-y-1">
                      <button 
                        onClick={() => setOpenCategory(isOpen ? null : cat.slug)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                          isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {cat.icon}
                          <span className="text-xs font-bold uppercase tracking-tight">{cat.name}</span>
                        </div>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${isActive ? "text-white" : "text-slate-200 group-hover:text-primary"}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && cat.subcategories && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-10 pr-4 space-y-1"
                          >
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/category/${cat.slug}/${sub.slug}`}
                                className={`block py-2 text-[11px] font-bold uppercase tracking-tight transition-colors ${
                                  subCategorySlug === sub.slug ? "text-primary" : "text-slate-400 hover:text-slate-600"
                                }`}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Placeholder */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 pb-4 border-b border-slate-50">Filter by Price</h3>
              <div className="space-y-4">
                <input type="range" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>৳0</span>
                  <span>৳50,000</span>
                </div>
                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Apply Filter</button>
              </div>
            </div>

            {/* Banner Ad */}
            <div className="relative h-80 rounded-[32px] overflow-hidden group">
              <img src="https://placehold.co/400x600/png?text=SmartKids+STEM" alt="Ad" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-8">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-2">Weekend Deal</p>
                <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4 leading-tight">UP TO 50% OFF ON ROBOTICS</h4>
                <button className="bg-white text-primary px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg">Shop Now</button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 flex flex-col gap-8">
            {/* Toolbar */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <Grid2X2 size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {displayProducts.length} Results</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort By:</span>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700">
                    {sortBy === "featured" ? "Featured" : sortBy === "price-low" ? "Price: Low to High" : "Price: High to Low"}
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Header */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
               <div className="relative z-10">
                  <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-4">{subCategoryName || categoryName}</h1>
                  <p className="text-slate-500 max-w-xl text-sm leading-relaxed font-medium">Explore our curated selection of {subCategoryName || categoryName} designed to inspire the next generation of innovators and creators. From high-quality components to complete educational kits.</p>
               </div>
               <div className="absolute top-0 right-0 w-64 h-full bg-primary/5 -skew-x-12 translate-x-20"></div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {displayProducts.map((product) => (
                <ProductCard key={product.id} {...product as any} />
              ))}
            </div>

            {/* Pagination Placeholder */}
            {displayProducts.length > 0 && (
              <div className="flex items-center justify-center gap-2 py-10">
                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all">1</button>
                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all">2</button>
                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all">3</button>
                <button className="px-4 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-primary hover:text-primary transition-all">Next</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
