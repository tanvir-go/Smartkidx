"use client";

import React, { useState } from "react";
import { 
  Users, 
  Store, 
  Search, 
  Filter, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Package, 
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  BarChart3,
  ExternalLink,
  Plus
} from "lucide-react";
import { toast } from "react-toastify";

export default function EmployeeVendorDashboard() {
  const [vendors, setVendors] = useState([
    { id: 1, name: "Dhaka Robotics", owner: "Asif Rahman", category: "Robotics", rating: 4.8, status: "Active", joined: "Oct 12, 2023", sales: 125000 },
    { id: 2, name: "Global Tech Hub", owner: "Sarah Karim", category: "Electronics", rating: 4.5, status: "Pending", joined: "Nov 02, 2023", sales: 0 },
    { id: 3, name: "STEM Solutions", owner: "Jamal Uddin", category: "Education", rating: 4.2, status: "Active", joined: "Sep 20, 2023", sales: 45000 },
    { id: 4, name: "EduToys BD", owner: "Nadia Islam", category: "Toys", rating: 3.9, status: "Suspended", joined: "Aug 15, 2023", sales: 12000 },
  ]);

  const stats = [
    { label: "Active Vendors", value: "1,245", icon: Store, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Pending Approvals", value: "18", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Verification Success", value: "94%", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Platform Growth", value: "+12.5%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const handleApprove = (id: number) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, status: "Active" } : v));
    toast.success("Vendor application approved and verified.");
  };

  const handleSuspend = (id: number) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, status: "Suspended" } : v));
    toast.warning("Vendor access suspended.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Employee Hub: Vendor Overseer</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Internal command center for seller onboarding and monitoring.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
          <Plus size={18} /> Add Target Seller
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 hover:border-primary/20 transition-all">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-current`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
              <h3 className="text-xl font-black text-slate-800 mt-2">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Vendor List */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Recent Applications</h3>
            <div className="relative w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Quick search..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Business Detail</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {vendors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <Store size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{v.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{v.owner}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => (
                            <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= Math.floor(v.rating) ? "bg-amber-400" : "bg-slate-200"}`} />
                          ))}
                          <span className="text-[10px] font-black text-slate-700 ml-1">৳{(v.sales/1000).toFixed(1)}k</span>
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Since {v.joined}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        v.status === "Active" ? "bg-emerald-50 text-emerald-600" : 
                        v.status === "Pending" ? "bg-orange-50 text-orange-600" : "bg-rose-50 text-rose-600"
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        {v.status === "Pending" ? (
                          <button onClick={() => handleApprove(v.id)} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title="Approve">
                            <CheckCircle2 size={18} />
                          </button>
                        ) : (
                          <button onClick={() => handleSuspend(v.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Suspend">
                            <XCircle size={18} />
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-primary rounded-lg transition-all"><ChevronRight size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
            <BarChart3 size={120} className="absolute -right-8 -bottom-8 text-white/5 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10">
              <h4 className="text-lg font-black uppercase tracking-tighter leading-none">Market Health</h4>
              <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mt-2">Vendor Performance Index</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/70 uppercase">Daily Onboarding</span>
                  <span className="text-xs font-black text-emerald-400">+5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/70 uppercase">Top Performer</span>
                  <span className="text-xs font-black text-primary uppercase">Global Hub</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-6">
                  <div className="bg-primary w-[85%] h-full rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                </div>
                <p className="text-[9px] text-white/40 font-bold text-center uppercase tracking-widest mt-2">85% Verification Quota Reached</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Internal Announcements</h4>
            <div className="space-y-4">
              {[
                { title: "New Seller Guidelines v3", time: "2h ago", type: "Update" },
                { title: "DHAKA Hub Outage", time: "5h ago", type: "Alert" }
              ].map((a, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${a.type === 'Alert' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'}`}>
                    {a.type === 'Alert' ? <XCircle size={18} /> : <Mail size={18} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">{a.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2 mt-4">
              View Bulletin Board <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
