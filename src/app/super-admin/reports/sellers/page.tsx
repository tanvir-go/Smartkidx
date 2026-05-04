"use client";

import { 
  LineChart, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Store, 
  BarChart3,
  ChevronRight,
  MoreVertical
} from "lucide-react";

const sellerPerformance = [
  { id: 1, name: "Global Tech", sales: "৳ 1.2M", orders: 450, rating: 4.8, status: "Excellent", growth: "+15%", logo: "GT" },
  { id: 2, name: "RoboMaster", sales: "৳ 450k", orders: 120, rating: 4.5, status: "Good", growth: "+8%", logo: "RM" },
  { id: 3, name: "STEM Solutions", sales: "৳ 120k", orders: 85, rating: 4.2, status: "Average", growth: "-2%", logo: "SS" },
  { id: 4, name: "Learning Hub", sales: "৳ 2.5M", orders: 890, rating: 4.9, status: "Top Seller", growth: "+22%", logo: "LH" },
];

export default function SellerPerformancePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Seller Performance Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">Benchmark and monitor vendor success across the platform.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <BarChart3 size={18} /> Compare Sellers
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search sellers by name or ID..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Seller Shop</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Sales</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Orders</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sellerPerformance.map((seller) => (
              <tr key={seller.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                      {seller.logo}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">{seller.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">{seller.status}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800">{seller.sales}</td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800">{seller.orders}</td>
                <td className="px-8 py-5">
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${seller.growth.startsWith('+') ? "text-emerald-500" : "text-rose-500"}`}>
                    {seller.growth.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {seller.growth}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-1 text-[10px] font-black text-amber-500">
                    <Star size={14} fill="currentColor" /> {seller.rating}
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-all"><ChevronRight size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
