"use client";

import { Scale, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Link from "next/link";

const compareProducts = [
  { id: 1, name: "Robotics Starter Kit", price: "৳ 2,500", rating: 4.8, category: "Robotics", stock: "In Stock", image: "https://placehold.co/150x150/png?text=Kit+1" },
  { id: 2, name: "STEM Solar Car Kit", price: "৳ 1,200", rating: 4.5, category: "STEM", stock: "In Stock", image: "https://placehold.co/150x150/png?text=Kit+2" },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-100 py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Compare Products</h1>
          <p className="text-slate-500 mt-2">Compare features and prices to find the perfect kit.</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-8 border-b border-slate-50 bg-slate-50/50 w-64">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Specifications</span>
                </th>
                {compareProducts.map((product) => (
                  <th key={product.id} className="p-8 border-b border-r border-slate-50 relative group min-w-[300px]">
                    <button className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                      <X size={18} />
                    </button>
                    <div className="flex flex-col items-center text-center">
                      <img src={product.image} alt={product.name} className="w-32 h-32 object-contain mb-4 rounded-2xl bg-slate-50 p-2" />
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight line-clamp-1">{product.name}</h3>
                      <p className="text-lg font-black text-primary mt-2">{product.price}</p>
                    </div>
                  </th>
                ))}
                <th className="p-8 border-b border-slate-50 bg-slate-50/30">
                  <button className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-300 hover:text-primary transition-all group py-10">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:border-primary transition-all">
                      <Plus size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Product</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-slate-600">
              <tr>
                <td className="p-8 border-b border-slate-50 bg-slate-50/50 uppercase tracking-widest text-[9px] text-slate-400">Category</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-8 border-b border-r border-slate-50">{p.category}</td>
                ))}
                <td className="p-8 border-b border-slate-50 bg-slate-50/30"></td>
              </tr>
              <tr>
                <td className="p-8 border-b border-slate-50 bg-slate-50/50 uppercase tracking-widest text-[9px] text-slate-400">Rating</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-8 border-b border-r border-slate-50 flex items-center gap-2">
                    <span className="text-amber-500">★</span> {p.rating} / 5.0
                  </td>
                ))}
                <td className="p-8 border-b border-slate-50 bg-slate-50/30"></td>
              </tr>
              <tr>
                <td className="p-8 border-b border-slate-50 bg-slate-50/50 uppercase tracking-widest text-[9px] text-slate-400">Availability</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-8 border-b border-r border-slate-50">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">{p.stock}</span>
                  </td>
                ))}
                <td className="p-8 border-b border-slate-50 bg-slate-50/30"></td>
              </tr>
              <tr>
                <td className="p-8 bg-slate-50/50 uppercase tracking-widest text-[9px] text-slate-400">Actions</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-8 border-r border-slate-50">
                    <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <button className="w-full text-[9px] font-black text-slate-400 uppercase tracking-widest mt-4 hover:text-red-500 transition-colors">Remove from list</button>
                  </td>
                ))}
                <td className="p-8 bg-slate-50/30"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
