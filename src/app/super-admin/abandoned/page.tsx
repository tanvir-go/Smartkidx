"use client";

import { 
  Trash2, 
  Search, 
  Mail, 
  ShoppingBag, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Download
} from "lucide-react";
import { exportToCSV } from "@/utils/export";

const carts = [
  { id: "#ABC-101", user: "John Doe", items: 3, value: "$250.00", lastSeen: "2 hours ago", status: "Reminded" },
  { id: "#ABC-102", user: "Guest_452", items: 1, value: "$85.00", lastSeen: "5 hours ago", status: "New" },
  { id: "#ABC-103", user: "Sara Ahmed", items: 2, value: "$120.00", lastSeen: "1 day ago", status: "New" },
  { id: "#ABC-104", user: "Mike J.", items: 4, value: "$410.00", lastSeen: "3 days ago", status: "Expired" },
];

export default function AbandonedCartPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Abandoned Carts</h2>
          <p className="text-slate-500 text-sm mt-1">Recovery analytics for incomplete customer shopping sessions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              carts, 
              ["ID", "User", "Items", "Value", "Last Seen", "Status"], 
              "Abandoned_Carts_Export",
              (c) => [c.id, c.user, c.items, c.value, c.lastSeen, c.status]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <Mail size={18} /> Send Batch Reminders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <ShoppingBag size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Lost Revenue</p>
            <h3 className="text-2xl font-black text-rose-500 mt-2">$12,500</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Last 30 Days</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <TrendingUp size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Recovery Rate</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-2">18.5%</h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">+2.4% vs prev month</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
            <Clock size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Avg. Persistence</p>
            <h3 className="text-2xl font-black text-slate-800 mt-2">4.2 Days</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Cart Expiry Period</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Cart ID</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Items & Value</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Activity</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Recovery Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {carts.map((cart) => (
              <tr key={cart.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{cart.id}</td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{cart.user}</td>
                <td className="px-8 py-5">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-slate-800">{cart.value}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cart.items} Products</p>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase">{cart.lastSeen}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    cart.status === "Reminded" ? "bg-blue-50 text-blue-500" : 
                    cart.status === "New" ? "bg-amber-50 text-amber-500" : "bg-slate-100 text-slate-400"
                  }`}>
                    {cart.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-all">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
