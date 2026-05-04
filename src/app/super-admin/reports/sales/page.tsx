"use client";

import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  PieChart,
  LineChart
} from "lucide-react";

export default function SalesReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Sales & Revenue Reports</h2>
          <p className="text-slate-500 text-sm mt-1">Deep dive into your platform's financial performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar size={16} /> Custom Range
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <Download size={18} /> Export Full Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
              <LineChart size={18} className="text-primary" /> Monthly Revenue Trend
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target</span>
              </div>
            </div>
          </div>
          
          <div className="h-80 flex items-end gap-3 md:gap-5">
            {[45, 75, 55, 95, 80, 65, 85, 50, 70, 90, 60, 100].map((val, i) => (
              <div key={i} className="flex-grow flex flex-col items-center gap-4 group cursor-pointer relative">
                <div className="w-full relative">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                    $ {val * 1000}
                  </div>
                  <div 
                    className="w-full bg-slate-50 rounded-2xl group-hover:bg-primary/5 transition-all relative overflow-hidden" 
                    style={{ height: `${val * 2.5}px` }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-primary/20 rounded-t-2xl transition-all" 
                      style={{ height: '100%' }}
                    ></div>
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-2xl transition-all duration-1000" 
                      style={{ height: '70%' }}
                    ></div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px] mb-8">Sales by Category</h3>
            <div className="space-y-6">
              {[
                { name: "Robotics", val: 45, color: "bg-primary" },
                { name: "Electronics", val: 30, color: "bg-blue-500" },
                { name: "STEM Toys", val: 15, color: "bg-emerald-500" },
                { name: "Other", val: 10, color: "bg-slate-200" },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{item.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.val}%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Average Order Value</p>
            <h3 className="text-3xl font-black">$ 145.20</h3>
            <div className="flex items-center gap-2 mt-4 text-emerald-400">
              <TrendingUp size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">+8.2% Growth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
