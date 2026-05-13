"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  ShoppingCart, 
  DollarSign, 
  CreditCard,
  ArrowUpRight,
  PackageCheck,
  Clock,
  MapPin,
  RefreshCcw,
  Zap
} from "lucide-react";

// Mock automated data representing live website sales
const MOCK_LIVE_ORDERS = [
  { id: "#ORD-9921", time: "Just now", customer: "Sabrina Rahman", amount: 4500, status: "Processing", payment: "bKash", location: "Dhaka" },
  { id: "#ORD-9920", time: "5 mins ago", customer: "Kamrul Hasan", amount: 1250, status: "Packed", payment: "Cash on Delivery", location: "Chittagong" },
  { id: "#ORD-9919", time: "12 mins ago", customer: "Nusrat Jahan", amount: 8900, status: "Shipped", payment: "Credit Card", location: "Sylhet" },
  { id: "#ORD-9918", time: "28 mins ago", customer: "Fahim Ahmed", amount: 3200, status: "Processing", payment: "Nagad", location: "Dhaka" },
  { id: "#ORD-9917", time: "45 mins ago", customer: "Sadia Islam", amount: 1550, status: "Delivered", payment: "bKash", location: "Rajshahi" },
  { id: "#ORD-9916", time: "1 hour ago", customer: "Tanvir Rahman", amount: 6700, status: "Packed", payment: "Credit Card", location: "Khulna" },
];

export default function EmployeeTodaySalesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState(65);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setProgress(Math.min(100, progress + 2));
    }, 1000);
  };

  // Simulate progress bar movement to make it look "live"
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(100, p + 0.5));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Live Auto-Sync</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Today's Sales</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Real-time metrics generated from website traffic.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleRefresh}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <RefreshCcw size={16} className={isRefreshing ? "animate-spin" : ""} /> 
            {isRefreshing ? "Syncing..." : "Sync Now"}
          </button>
        </div>
      </div>

      {/* Target Progress Bar */}
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Sales Target</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tighter">৳ 85,450 <span className="text-sm text-slate-400 font-bold tracking-normal">/ ৳ 120,000</span></h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary">{Math.floor(progress)}%</span>
            </div>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400 mt-3 flex items-center gap-1.5">
            <Zap size={14} className="text-amber-500" />
            Trending higher than yesterday's average at this time.
          </p>
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "৳ 85,450", trend: "+12%", icon: <DollarSign size={20} />, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Orders Today", value: "142", trend: "+5%", icon: <ShoppingCart size={20} />, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Avg. Order Value", value: "৳ 601", trend: "+2%", icon: <TrendingUp size={20} />, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Conversion Rate", value: "3.2%", trend: "-0.5%", icon: <PackageCheck size={20} />, color: "text-amber-500", bg: "bg-amber-50" },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 rounded-2xl ${metric.bg} ${metric.color} flex items-center justify-center`}>
                {metric.icon}
              </div>
              <span className={`flex items-center gap-0.5 text-[11px] font-black ${metric.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                <ArrowUpRight size={14} className={metric.trend.startsWith('+') ? '' : 'rotate-90'} /> {metric.trend}
              </span>
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-800 tracking-tight">{metric.value}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Live Sales Feed */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
            <Clock size={18} className="text-primary" /> Live Transaction Feed
          </h3>
          <span className="text-xs font-bold text-slate-400">Auto-updates every 30s</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Order & Time</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Payment</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_LIVE_ORDERS.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/40 transition-colors group">
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-black text-slate-800 group-hover:text-primary transition-colors cursor-pointer">{order.id}</p>
                      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1">
                        <Clock size={10} /> {order.time}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-700">{order.customer}</p>
                      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin size={10} /> {order.location}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-800">৳ {order.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">{order.payment}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      order.status === "Processing" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                      order.status === "Packed" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      order.status === "Shipped" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                      "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
          <button className="text-xs font-black text-primary uppercase tracking-widest hover:text-primary/80 transition-colors">
            View All Today's Orders
          </button>
        </div>
      </div>

    </div>
  );
}
