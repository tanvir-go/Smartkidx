"use client";

import React from "react";
import { Trash2, Search, Mail, Bell, MoreHorizontal } from "lucide-react";

export default function VendorAbandonedCartPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Abandoned Carts</h2>
        <p className="text-slate-500 text-sm mt-1">Track users who left items in their cart and send reminders.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-sm w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by customer..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Items</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cart Value</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Abandoned At</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1, 2].map((i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">Sarah Miller</p>
                    <p className="text-xs text-slate-500">sarah@example.com</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">3 Products</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800">৳ 4,800.00</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">{i} hour ago</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                        <Mail size={14} /> Remind
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-800 transition-all"><MoreHorizontal size={18} /></button>
                    </div>
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
