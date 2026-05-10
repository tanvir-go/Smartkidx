"use client";

import React from "react";
import { 
  Tags, 
  Plus, 
  Search, 
  MoreVertical, 
  ChevronRight,
  Percent,
  Trash2,
  Edit,
  Package
} from "lucide-react";

const clearanceDeals = [
  { id: 1, title: "Summer Stock Clearout", discount: "Up to 80%", items: 45, status: "Active", endDate: "2023-11-15" },
  { id: 2, title: "Old Model Robotics", discount: "Flat 50%", items: 18, status: "Active", endDate: "2023-11-20" },
  { id: 3, title: "STEM Kit Liquidation", discount: "Buy 1 Get 2", items: 120, status: "Inactive", endDate: "2023-10-01" },
];

export default function ClearanceDealsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Clearance Deals</h2>
          <p className="text-slate-500 text-sm mt-1">Manage inventory liquidation and stock clearout campaigns.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit">
          <Plus size={18} /> Create Clearance Deal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clearanceDeals.map((deal) => (
          <div key={deal.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col h-full">
            <div className={`p-8 ${deal.status === "Active" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-400"}`}>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${deal.status === "Active" ? "bg-white/20" : "bg-white text-slate-300"}`}>
                  <Tags size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  deal.status === "Active" ? "bg-white text-amber-600 shadow-sm" : "bg-slate-200 text-slate-500"
                }`}>
                  {deal.status}
                </span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight leading-none">{deal.title}</h3>
              <p className={`text-sm font-bold mt-2 ${deal.status === "Active" ? "text-white/80" : "text-slate-400"}`}>{deal.discount}</p>
            </div>
            
            <div className="p-8 space-y-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Package size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">{deal.items} Items Locked</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-widest">Ends: {deal.endDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
                  View Items <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
