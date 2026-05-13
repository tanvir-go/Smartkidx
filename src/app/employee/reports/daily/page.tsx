"use client";

import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
  Clock,
  Layers,
  Download
} from "lucide-react";
import { toast } from "react-toastify";

// Mock automated data for hourly sales breakdown
const HOURLY_SALES = [
  { time: '08:00', sales: 12000, orders: 15 },
  { time: '10:00', sales: 25000, orders: 42 },
  { time: '12:00', sales: 45000, orders: 75 },
  { time: '14:00', sales: 38000, orders: 60 },
  { time: '16:00', sales: 52000, orders: 85 },
  { time: '18:00', sales: 68000, orders: 110 },
  { time: '20:00', sales: 41000, orders: 65 },
  { time: '22:00', sales: 18000, orders: 30 },
];

const CATEGORY_BREAKDOWN = [
  { name: "Electronics", percentage: 45, amount: "৳ 54,000", color: "bg-blue-500" },
  { name: "Robotics Kits", percentage: 30, amount: "৳ 36,000", color: "bg-emerald-500" },
  { name: "Educational Toys", percentage: 15, amount: "৳ 18,000", color: "bg-amber-500" },
  { name: "Accessories", percentage: 10, amount: "৳ 12,000", color: "bg-purple-500" },
];

export default function EmployeeDailyReportsPage() {
  const maxSales = Math.max(...HOURLY_SALES.map(h => h.sales));

  const handleDownload = () => {
    toast.success("Generating Daily Sales PDF report...");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Daily Analytics</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Daily Sales Report</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Deep dive into today's website performance.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">
            <Calendar size={16} /> 
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <button 
            onClick={handleDownload}
            className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Gross Revenue", value: "৳ 120,000", change: "+12.5%", up: true, icon: <DollarSign size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg. Order Value", value: "৳ 1,450", change: "+2.4%", up: true, icon: <ShoppingBag size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Orders", value: "482", change: "+8.1%", up: true, icon: <TrendingUp size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Returning Customers", value: "15%", change: "-1.2%", up: false, icon: <Users size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1 duration-300">
            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
              {item.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{item.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{item.value}</h3>
              <div className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-md ${item.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hourly Traffic Chart */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2">
                <Clock size={18} className="text-primary" /> Hourly Traffic & Sales
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-1">Website volume mapped by hour</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Orders</span>
              </div>
            </div>
          </div>
          
          <div className="h-72 flex items-end justify-between gap-2 md:gap-4 mt-10">
            {HOURLY_SALES.map((data, i) => {
              const heightPercent = (data.sales / maxSales) * 100;
              const orderHeightPercent = (data.orders / 110) * 100; // 110 is max orders
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer h-full justify-end">
                  <div className="w-full relative h-full flex items-end justify-center">
                    <div className="absolute bottom-full mb-3 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none whitespace-nowrap shadow-xl">
                      ৳ {data.sales.toLocaleString()}
                      <span className="block text-[10px] font-medium text-slate-400 mt-0.5">{data.orders} orders</span>
                    </div>
                    
                    {/* Orders Bar (Background) */}
                    <div 
                      className="absolute w-full bg-blue-50 rounded-t-xl group-hover:bg-blue-100 transition-colors z-0"
                      style={{ height: `${orderHeightPercent}%` }}
                    ></div>
                    
                    {/* Revenue Bar (Foreground) */}
                    <div 
                      className="relative w-2/3 bg-primary rounded-t-xl shadow-sm z-10 group-hover:bg-primary/90 transition-colors"
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400">{data.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Categories Breakdown */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2">
              <Layers size={18} className="text-primary" /> Category Breakdown
            </h3>
            <p className="text-xs font-bold text-slate-400 mt-1">What's driving today's revenue</p>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            {CATEGORY_BREAKDOWN.map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">{cat.name}</span>
                  <span className="text-sm font-black text-slate-900">{cat.amount}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${cat.color} rounded-full`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
                <p className="text-[10px] font-black text-slate-400 text-right">{cat.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
