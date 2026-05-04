"use client";

import { 
  Trophy, 
  Search, 
  Filter, 
  TrendingUp, 
  Eye, 
  ShoppingCart, 
  Package,
  ArrowRight
} from "lucide-react";

const topProducts = [
  { id: 1, name: "Robotics Starter Kit", sales: 1250, revenue: "$312.5k", stock: 150, rating: 4.9, image: "🤖" },
  { id: 2, name: "DIY Drone Kit", sales: 850, revenue: "$382.5k", stock: 12, rating: 4.7, image: "🚁" },
  { id: 3, name: "Arduino Uno R3", sales: 2400, revenue: "$20.4k", stock: 500, rating: 4.8, image: "🔌" },
  { id: 4, name: "STEM Solar Car", sales: 620, revenue: "$7.4k", stock: 45, rating: 4.5, image: "🏎️" },
  { id: 5, name: "IoT Weather Station", sales: 410, revenue: "$82k", stock: 24, rating: 4.6, image: "☁️" },
];

export default function TopProductsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Top Performing Products</h2>
          <p className="text-slate-500 text-sm mt-1">Detailed ranking of your catalog by sales volume and profitability.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Trophy size={18} /> View Leaderboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {topProducts.slice(0, 3).map((product, i) => (
          <div key={product.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative group overflow-hidden h-full flex flex-col">
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
              #{i+1}
            </div>
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              {product.image}
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{product.name}</h3>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Units Sold</p>
                <p className="text-lg font-black text-slate-800 mt-1">{product.sales}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                <p className="text-lg font-black text-primary mt-1">{product.revenue}</p>
              </div>
            </div>
            <div className="mt-auto pt-6 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{product.stock} In Stock</span>
              </div>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                Full Specs <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px] ml-4">Extended Catalog Performance</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank & Product</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Sold</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {topProducts.map((product, i) => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-slate-300 w-4">#{i+1}</span>
                    <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{product.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800">{product.sales}</td>
                <td className="px-8 py-5 text-[11px] font-black text-emerald-500">{product.revenue}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-1 text-[10px] font-black text-amber-500">
                    <TrendingUp size={12} className="text-emerald-500" /> {product.rating}
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-full">Bestseller</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
