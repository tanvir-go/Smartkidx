"use client";

import React, { useState } from "react";
import { 
  Puzzle, 
  Plus, 
  Search, 
  MoreVertical, 
  Zap, 
  ShieldCheck, 
  RefreshCw,
  Trash2,
  ExternalLink,
  Code2,
  CheckCircle2
} from "lucide-react";
import { toast } from "react-toastify";

const integrations = [
  { id: 1, name: "Google Analytics 4", provider: "Google", category: "Analytics", status: "Connected", type: "Client-side" },
  { id: 2, name: "Facebook Pixel", provider: "Meta", category: "Marketing", status: "Connected", type: "Client-side" },
  { id: 3, name: "Supabase DB", provider: "Supabase", category: "Database", status: "Connected", type: "Server-side" },
  { id: 4, name: "Firebase Auth", provider: "Google", category: "Auth", status: "Standby", type: "Middleware" },
  { id: 5, name: "Stripe API", provider: "Stripe", category: "Payments", status: "Error", type: "Full-stack" },
];

export default function APIIntegrationPage() {
  const [activeTab, setActiveTab] = useState('All Integrations');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">API Integration</h2>
          <p className="text-slate-500 text-sm mt-1">Manage 3rd party connections and cross-platform data synchronization.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit">
          <Plus size={18} /> Connect New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['All Integrations', 'Connected', 'Standby', 'Error'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-6 rounded-[32px] border-2 transition-all text-left group ${
              activeTab === tab 
                ? "bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-200" 
                : "bg-white border-slate-100 text-slate-600 hover:border-primary/20"
            }`}
          >
            <p className={`text-[9px] font-black uppercase tracking-widest ${activeTab === tab ? "opacity-70" : "text-slate-400"}`}>Filter</p>
            <h3 className="text-lg font-black mt-2 tracking-tight">{tab}</h3>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search service name or provider..." className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[28px] text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold" />
          </div>
          <button className="p-4 text-slate-400 hover:text-primary bg-white border border-slate-100 rounded-2xl transition-all shadow-sm">
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Specification</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Provider</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Type</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sync Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {integrations.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-3xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:scale-110 transition-transform duration-500">
                        <Code2 size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{svc.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{svc.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-[11px] font-black text-slate-600 uppercase">{svc.provider}</td>
                  <td className="px-8 py-8 text-center">
                    <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">{svc.type}</span>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        svc.status === 'Connected' ? 'bg-emerald-500' :
                        svc.status === 'Standby' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        svc.status === 'Connected' ? 'text-emerald-500' :
                        svc.status === 'Standby' ? 'text-amber-500' : 'text-rose-500'
                      }`}>{svc.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-3 text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100"><Zap size={18} /></button>
                      <button className="p-3 text-slate-400 hover:text-rose-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100"><Trash2 size={18} /></button>
                      <button className="p-3 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100"><ExternalLink size={18} /></button>
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
