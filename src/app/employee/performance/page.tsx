"use client";

import React from "react";
import { 
  TrendingUp, 
  Target, 
  Award, 
  Clock, 
  Star,
  CheckCircle2,
  CalendarDays,
  Activity,
  ArrowUpRight
} from "lucide-react";

// Mock automated KPI Data
const WEEKLY_PRODUCTIVITY = [
  { day: 'Mon', tasks: 25, target: 20 },
  { day: 'Tue', tasks: 32, target: 20 },
  { day: 'Wed', tasks: 28, target: 20 },
  { day: 'Thu', tasks: 35, target: 20 },
  { day: 'Fri', tasks: 40, target: 20 },
  { day: 'Sat', tasks: 15, target: 20 },
  { day: 'Sun', tasks: 0, target: 0 },
];

export default function EmployeePerformancePage() {
  const maxTasks = Math.max(...WEEKLY_PRODUCTIVITY.map(d => d.tasks), 40);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Performance Summary</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Track your personal KPIs and operational goals.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">
            <CalendarDays size={16} /> 
            <span>This Week</span>
          </div>
        </div>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-black text-emerald-500">
              <ArrowUpRight size={14} /> +12%
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 tracking-tight">175</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Orders Processed</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star size={24} />
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-black text-emerald-500">
              <ArrowUpRight size={14} /> +0.2
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 tracking-tight">4.8<span className="text-sm text-slate-400">/5.0</span></h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">CSAT Score</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-black text-emerald-500">
              <ArrowUpRight size={14} className="rotate-90" /> -5m
            </span>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 tracking-tight">12<span className="text-sm text-slate-400">m</span> 30<span className="text-sm text-slate-400">s</span></h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Avg. Handling Time</p>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-900/10 flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center">
              <Award size={24} />
            </div>
          </div>
          <div className="relative z-10">
            <h4 className="text-3xl font-black text-white tracking-tight">95%</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Overall Efficiency Rating</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Productivity Chart */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2">
                <Activity size={18} className="text-primary" /> Weekly Productivity
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-1">Tasks completed versus daily baseline targets.</p>
            </div>
            <div className="flex gap-4 bg-slate-50 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-primary"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tasks Done</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Daily Target</span>
              </div>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 md:gap-6 mt-10 px-2">
            {WEEKLY_PRODUCTIVITY.map((data, i) => {
              const heightPercent = maxTasks > 0 ? (data.tasks / maxTasks) * 100 : 0;
              const targetHeightPercent = maxTasks > 0 ? (data.target / maxTasks) * 100 : 0;
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer h-full justify-end relative">
                  
                  {/* Target Line */}
                  {data.target > 0 && (
                    <div 
                      className="absolute w-full border-t-2 border-dashed border-slate-300 z-0 opacity-50 group-hover:opacity-100 group-hover:border-primary transition-all"
                      style={{ bottom: `${targetHeightPercent}%` }}
                    ></div>
                  )}

                  <div className="w-full relative h-full flex items-end justify-center">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-3 bg-slate-900 text-white px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none text-center shadow-xl">
                      <span className="text-lg font-black tracking-tight">{data.tasks}</span>
                      <span className="block text-[10px] font-bold text-slate-400">tasks</span>
                    </div>
                    
                    {/* Bar */}
                    <div 
                      className={`w-full max-w-[40px] rounded-t-xl shadow-sm z-10 transition-all duration-500 ${
                        data.tasks >= data.target 
                          ? "bg-primary group-hover:bg-primary/90" 
                          : "bg-slate-300 group-hover:bg-slate-400"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Goals & Achievements */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2 mb-6">
              <Target size={18} className="text-primary" /> Monthly Goals
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">Order Accuracy</span>
                  <span className="text-sm font-black text-slate-900">98%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-emerald-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">Resolution Rate</span>
                  <span className="text-sm font-black text-slate-900">85%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">Upsell Conversion</span>
                  <span className="text-sm font-black text-slate-900">42%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[42%] h-full bg-amber-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-[40px] border border-primary/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-1">Manager Note</h4>
                <p className="text-sm font-bold text-slate-600 leading-relaxed">
                  "Great job maintaining high order accuracy this week! Keep focusing on improving the upsell conversions during checkout assistance."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
