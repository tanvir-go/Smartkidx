"use client";

import { 
  Zap, 
  Plus, 
  Clock, 
  Search, 
  MoreVertical, 
  Timer, 
  TrendingUp,
  Package,
  ChevronRight
} from "lucide-react";

const flashSales = [
  { id: 1, title: "Winter Tech Sale", discount: "Up to 60%", items: 24, start: "2023-10-30 10:00", end: "2023-10-30 22:00", status: "Scheduled" },
  { id: 2, title: "Robot Mania", discount: "Flat 40%", items: 12, start: "2023-10-25 08:00", end: "2023-10-25 20:00", status: "Live" },
  { id: 3, title: "STEM Weekend", discount: "Buy 1 Get 1", items: 85, start: "2023-10-20 00:00", end: "2023-10-22 23:59", status: "Ended" },
];

export default function FlashSalesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Flash Sales</h2>
          <p className="text-slate-500 text-sm mt-1">Limited-time high-intensity promotional campaigns.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Zap size={18} /> Create Flash Sale
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {flashSales.map((sale) => (
          <div key={sale.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col h-full">
            <div className={`p-8 ${sale.status === "Live" ? "bg-primary text-white" : "bg-slate-50 text-slate-800"}`}>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${sale.status === "Live" ? "bg-white/20" : "bg-white text-primary shadow-sm"}`}>
                  <Zap size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  sale.status === "Live" ? "bg-white text-primary animate-pulse" : 
                  sale.status === "Scheduled" ? "bg-blue-50 text-blue-500" : "bg-slate-200 text-slate-500"
                }`}>
                  {sale.status}
                </span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight leading-none">{sale.title}</h3>
              <p className={`text-sm font-bold mt-2 ${sale.status === "Live" ? "text-white/80" : "text-slate-400"}`}>{sale.discount}</p>
            </div>
            
            <div className="p-8 space-y-6 flex flex-col flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starts</p>
                  <p className="text-xs font-black text-slate-800">{sale.start.split(' ')[0]}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                  <p className="text-xs font-black text-slate-800">{sale.start.split(' ')[1]}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-slate-400" />
                  <span className="text-xs font-black text-slate-800">{sale.items} Products</span>
                </div>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
                  Manage <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
