"use client";

import React from "react";
import { ScrollText, Plus, Search, MoreHorizontal } from "lucide-react";

export default function VendorPurchaseGRNPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Purchase & GRN</h2>
          <p className="text-slate-500 text-sm mt-1">Track your procurement history.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit">
          <Plus size={18} /> New Purchase Order
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center py-20">
        <ScrollText size={48} className="mx-auto text-slate-100 mb-4" />
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">No procurement data found</h3>
        <p className="text-xs text-slate-400 mt-2">Start by creating your first purchase order.</p>
      </div>
    </div>
  );
}
