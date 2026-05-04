"use client";

import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar
} from "lucide-react";

export default function VendorReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Sales Reports</h2>
          <p className="text-slate-500 text-sm mt-1">Analyze your sales performance and business growth.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar size={16} /> Last 30 Days
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Download PDF
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Gross Revenue", value: "৳ 128,500", change: "+12.5%", up: true, icon: <DollarSign size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg. Order Value", value: "৳ 1,450", change: "+2.4%", up: true, icon: <ShoppingBag size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Orders", value: "482", change: "+8.1%", up: true, icon: <TrendingUp size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Returning Customers", value: "15%", change: "-1.2%", up: false, icon: <Users size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
              {item.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{item.label}</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-xl font-black text-slate-800">{item.value}</h3>
              <div className={`flex items-center gap-0.5 text-[10px] font-bold ${item.up ? "text-emerald-600" : "text-red-500"}`}>
                {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" /> Revenue Analytics
          </h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Orders</span>
            </div>
          </div>
        </div>
        
        {/* Mock Chart Visualization */}
        <div className="h-64 flex items-end gap-2 md:gap-4">
          {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50].map((height, i) => (
            <div key={i} className="flex-grow flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-full relative">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ৳{height * 100}
                </div>
                <div 
                  className="w-full bg-slate-100 rounded-t-lg group-hover:bg-primary/20 transition-all" 
                  style={{ height: `${height}%` }}
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all" 
                    style={{ height: `${height * 0.7}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
