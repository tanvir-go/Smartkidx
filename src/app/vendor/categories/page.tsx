"use client";

import React from "react";
import { Layers, Plus, Search, MoreHorizontal } from "lucide-react";

export default function VendorCategoriesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Categories & Attributes</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your product categories and variations.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit">
          <Plus size={18} /> Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">My Categories</h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] focus:ring-1 focus:ring-primary outline-none" />
            </div>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Products</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "Electronics", count: 12 },
                  { name: "Robotics", count: 8 },
                  { name: "Kits", count: 15 }
                ].map((cat, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{cat.name}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 rounded-lg bg-slate-100 text-[10px] font-black text-slate-500">{cat.count}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attributes Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Attributes (Size, Color, etc.)</h3>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">+ Add Attribute</button>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: "Color", values: ["Red", "Green", "Blue"] },
              { name: "Size", values: ["Small", "Medium", "Large"] }
            ].map((attr, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{attr.name}</p>
                  <button className="text-slate-400 hover:text-red-500"><MoreHorizontal size={14} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attr.values.map((v, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
