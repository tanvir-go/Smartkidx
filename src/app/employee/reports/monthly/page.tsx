"use client";

import React from "react";
import { 
  Download, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  CalendarDays,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { toast } from "react-toastify";

// Mock automated data representing monthly website sales
const MONTHLY_DATA = [
  { month: "Jan 2023", revenue: 850000, orders: 1250, profit: 170000, growth: "+0.0%", target: 800000 },
  { month: "Feb 2023", revenue: 920000, orders: 1420, profit: 184000, growth: "+8.2%", target: 900000 },
  { month: "Mar 2023", revenue: 880000, orders: 1380, profit: 176000, growth: "-4.3%", target: 950000 },
  { month: "Apr 2023", revenue: 1050000, orders: 1650, profit: 210000, growth: "+19.3%", target: 1000000 },
  { month: "May 2023", revenue: 1150000, orders: 1820, profit: 230000, growth: "+9.5%", target: 1100000 },
  { month: "Jun 2023", revenue: 1280000, orders: 2050, profit: 256000, growth: "+11.3%", target: 1200000 },
  { month: "Jul 2023", revenue: 1450000, orders: 2300, profit: 290000, growth: "+13.2%", target: 1300000 },
  { month: "Aug 2023", revenue: 1380000, orders: 2150, profit: 276000, growth: "-4.8%", target: 1400000 },
  { month: "Sep 2023", revenue: 1650000, orders: 2600, profit: 330000, growth: "+19.5%", target: 1500000 },
  { month: "Oct 2023", revenue: 1850000, orders: 2950, profit: 370000, growth: "+12.1%", target: 1700000 },
];

export default function EmployeeMonthlySalesPage() {
  const maxRevenue = Math.max(...MONTHLY_DATA.map(d => d.revenue));

  const handleExport = () => {
    toast.success("Downloading Monthly Financial CSV...");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Macro Analytics</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Monthly Sales Report</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Aggregated MoM (Month-over-Month) website performance.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">
            <CalendarDays size={16} /> 
            <span>Year 2023</span>
          </div>
          <button 
            onClick={handleExport}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* YTD Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg">+14.2% YoY</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">YTD Revenue</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter relative z-10">৳ 12.4M</h3>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">High Volume</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">YTD Total Orders</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tighter relative z-10">19,570</h3>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Target size={24} />
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg">On Track</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">Annual Target Achieved</p>
          <div className="flex items-end gap-3 mt-1">
            <h3 className="text-4xl font-black text-slate-800 tracking-tighter relative z-10">82%</h3>
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="w-[82%] h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Month-over-Month Chart */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" /> Month-over-Month Revenue
            </h3>
            <p className="text-xs font-bold text-slate-400 mt-1">Comparing actual revenue against monthly targets.</p>
          </div>
          <div className="flex gap-4 bg-slate-50 px-4 py-2 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-md bg-slate-900"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target</span>
            </div>
          </div>
        </div>

        <div className="h-80 flex items-end justify-between gap-2 md:gap-4 mt-10 px-4">
          {MONTHLY_DATA.map((data, i) => {
            const heightPercent = (data.revenue / maxRevenue) * 100;
            const targetHeightPercent = (data.target / maxRevenue) * 100;
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer h-full justify-end relative">
                
                {/* Target Marker */}
                <div 
                  className="absolute w-full border-t-2 border-dashed border-slate-300 z-0 opacity-50 group-hover:opacity-100 group-hover:border-slate-800 transition-all"
                  style={{ bottom: `${targetHeightPercent}%` }}
                ></div>

                <div className="w-full relative h-full flex items-end justify-center">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 bg-slate-900 text-white p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none w-max shadow-2xl flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{data.month}</span>
                    <span className="text-lg font-black tracking-tighter text-white">৳ {data.revenue.toLocaleString()}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded mt-2 ${data.growth.startsWith('-') ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                      MoM: {data.growth}
                    </span>
                  </div>
                  
                  {/* Revenue Bar */}
                  <div 
                    className={`w-4/5 rounded-t-xl shadow-sm z-10 transition-colors duration-500 ${
                      data.revenue >= data.target 
                        ? "bg-slate-800 group-hover:bg-slate-700" 
                        : "bg-slate-300 group-hover:bg-slate-400"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-black text-slate-400">{data.month.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
            Monthly Financial Breakdown
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Month</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Web Orders</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Gross Revenue</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Net Profit</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">MoM Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[...MONTHLY_DATA].reverse().map((data, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-800">{data.month}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-600">{data.orders.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-800">৳ {data.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-600">৳ {data.profit.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        data.growth.startsWith('-') ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {data.growth.startsWith('-') ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                        {data.growth}
                      </span>
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
