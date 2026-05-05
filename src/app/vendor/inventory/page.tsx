"use client";

import React from "react";
import { Boxes, Search, Filter, AlertCircle, ArrowUpRight } from "lucide-react";

export default function VendorInventoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Manage Inventory</h2>
        <p className="text-slate-500 text-sm mt-1">Monitor stock levels and manage product availability.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stock</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-800">1,284</h3>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-red-100 shadow-sm">
          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Low Stock</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-red-600">8</h3>
            <AlertCircle size={20} className="text-red-400" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Out of Stock</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-400">2</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Critical</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-sm w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search inventory..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <button className="p-2.5 text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-slate-200">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 shrink-0"></div>
                      <p className="text-sm font-bold text-slate-800">STEM Robotic Arm Kit {i}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">SK-ROB-00{i}</td>
                  <td className="px-6 py-4">
                    <span className={`font-black text-sm ${i === 2 ? 'text-red-500' : 'text-slate-800'}`}>
                      {i === 2 ? '3 Left' : '45 Units'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800">৳ 2,500</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${i === 2 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {i === 2 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ml-auto">
                      Restock <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
