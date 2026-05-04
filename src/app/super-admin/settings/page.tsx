"use client";

import { 
  Settings, 
  Bell, 
  Lock, 
  Shield, 
  Globe, 
  Database,
  Save,
  User
} from "lucide-react";

export default function SuperAdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">System Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Configure global platform parameters and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          {[
            { name: "General Settings", icon: <Globe size={18} />, active: true },
            { name: "Security & Auth", icon: <Shield size={18} />, active: false },
            { name: "Notifications", icon: <Bell size={18} />, active: false },
            { name: "Database Backup", icon: <Database size={18} />, active: false },
            { name: "Admin Profiles", icon: <User size={18} />, active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-white hover:text-slate-800"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">General Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Name</label>
                  <input type="text" defaultValue="SmartKids" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
                  <input type="email" defaultValue="support@smartkids.com" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Currency Symbol</label>
                  <input type="text" defaultValue="৳" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Maintenance Mode</label>
                  <div className="flex items-center gap-3 h-11">
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">Disabled</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Vendor Commission</h3>
              <div className="flex items-center gap-4">
                <div className="flex-grow space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Commission Rate (%)</label>
                  <input type="number" defaultValue="15" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <button className="h-11 mt-6 px-6 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Update Rate</button>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                <Save size={18} /> Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
