"use client";

import React from "react";
import { 
  Share2, 
  Plus, 
  Search, 
  MoreVertical, 
  Target, 
  Users, 
  BarChart3,
  Mail,
  Smartphone,
  Facebook,
  Instagram,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";

const marketingTools = [
  { id: 1, name: "Email Campaign", type: "Newsletter", reach: "12,400", conversion: "3.2%", status: "Scheduled", icon: <Mail size={24} /> },
  { id: 2, name: "Facebook Ads", type: "Paid Social", reach: "45,000", conversion: "1.8%", status: "Live", icon: <Facebook size={24} /> },
  { id: 3, name: "SMS Alert", type: "Mobile", reach: "2,100", conversion: "12.5%", status: "Ended", icon: <Smartphone size={24} /> },
  { id: 4, name: "Insta-Influencer", type: "Partnership", reach: "8,900", conversion: "5.4%", status: "Live", icon: <Instagram size={24} /> },
];

export default function MarketingToolsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Marketing Tools</h2>
          <p className="text-slate-500 text-sm mt-1">Deploy and analyze promotional assets and customer acquisition campaigns.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit">
          <Plus size={18} /> Launch New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-primary/5 text-primary flex items-center justify-center shadow-inner">
            <Target size={36} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Reach</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tighter">68.4k</h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">+12% This Week</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-inner">
            <BarChart3 size={36} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Avg. Conv. Rate</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tighter">4.8%</h3>
            <p className="text-[10px] font-bold text-blue-400 uppercase mt-1">Industry standard: 2.1%</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
            <Award size={36} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">ROI Score</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tighter">8.4/10</h3>
            <p className="text-[10px] font-bold text-amber-500 uppercase mt-1">Excellent Performance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {marketingTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-[48px] border border-slate-100 p-10 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[120px] -mr-8 -mt-8 transition-all group-hover:bg-primary/5"></div>
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-200 group-hover:scale-110 transition-transform duration-500">
                  {tool.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{tool.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      tool.status === 'Live' ? 'bg-emerald-50 text-emerald-600 animate-pulse' :
                      tool.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                    }`}>{tool.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{tool.type}</p>
                </div>
              </div>

              <div className="flex gap-12 border-l border-slate-50 pl-12 hidden md:flex">
                <div className="text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reach</p>
                  <p className="text-lg font-black text-slate-800 mt-1">{tool.reach}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Conv.</p>
                  <p className="text-lg font-black text-primary mt-1">{tool.conversion}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between relative">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-500" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Analyzing Performance Log...</span>
              </div>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:translate-x-1 transition-transform">
                Full Report <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
