"use client";

import React, { useState } from "react";
import { 
  Wrench, 
  Save, 
  Power, 
  Clock, 
  Users, 
  Globe, 
  AlertCircle,
  Construction,
  MessageSquare,
  ShieldAlert
} from "lucide-react";
import { toast } from "react-toastify";

export default function MaintenanceSettingsPage() {
  const [maintenance, setMaintenance] = useState({
    isActive: false,
    startTime: "2023-11-01 02:00",
    endTime: "2023-11-01 04:00",
    allowAdmins: true,
    customMessage: "SmartKids Network is currently undergoing scheduled maintenance. We'll be back shortly!"
  });

  const handleSave = () => {
    toast.success("Maintenance settings updated!");
  };

  const toggleMaintenance = () => {
    setMaintenance({...maintenance, isActive: !maintenance.isActive});
    toast.info(`System ${!maintenance.isActive ? 'Maintenance Mode Enabled' : 'Live Mode Restored'}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Maintains Settings</h2>
          <p className="text-slate-500 text-sm mt-1">Control system-wide maintenance mode and uptime protocols.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={toggleMaintenance}
            className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-lg flex items-center gap-2 ${
              maintenance.isActive 
                ? "bg-emerald-500 text-white shadow-emerald-200" 
                : "bg-rose-500 text-white shadow-rose-200"
            }`}
          >
            <Power size={18} /> {maintenance.isActive ? "Disable Maintenance" : "Enable Maintenance"}
          </button>
          <button 
            onClick={handleSave}
            className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Save size={18} /> Update Config
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Status Indicator */}
          <div className={`p-10 rounded-[40px] border-2 transition-all ${
            maintenance.isActive 
              ? "bg-amber-50 border-amber-200" 
              : "bg-emerald-50 border-emerald-200"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all ${
                  maintenance.isActive ? "bg-amber-500 text-white animate-pulse" : "bg-emerald-500 text-white"
                }`}>
                  {maintenance.isActive ? <Construction size={40} /> : <Globe size={40} />}
                </div>
                <div>
                  <h3 className={`text-2xl font-black uppercase tracking-tight ${
                    maintenance.isActive ? "text-amber-800" : "text-emerald-800"
                  }`}>
                    System is {maintenance.isActive ? "Under Maintenance" : "Fully Operational"}
                  </h3>
                  <p className={`text-sm font-bold uppercase tracking-widest mt-1 ${
                    maintenance.isActive ? "text-amber-600" : "text-emerald-600"
                  }`}>
                    {maintenance.isActive ? "Users cannot access the storefront" : "Global traffic is active"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm space-y-10">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
              <Wrench size={16} className="text-primary" /> Configuration Parameters
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Scheduled Start</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={maintenance.startTime}
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Scheduled End</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={maintenance.endTime}
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Custom Display Message</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-5 top-6 text-slate-400" />
                  <textarea 
                    value={maintenance.customMessage}
                    onChange={(e) => setMaintenance({...maintenance, customMessage: e.target.value})}
                    className="w-full pl-14 pr-5 py-5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none min-h-[120px] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
              <ShieldAlert size={16} className="text-rose-500" /> Access Control
            </h4>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Allow Admin Access</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Admins can bypass maintenance</p>
                </div>
                <button 
                  onClick={() => setMaintenance({...maintenance, allowAdmins: !maintenance.allowAdmins})}
                  className={`w-12 h-6 rounded-full transition-all relative ${maintenance.allowAdmins ? "bg-primary" : "bg-slate-200"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${maintenance.allowAdmins ? "left-7" : "left-1"}`}></div>
                </button>
              </div>
              <div className="h-px bg-slate-50"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Allow Seller Access</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Sellers can manage orders</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-slate-200 relative">
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="p-10 bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200 text-center">
            <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Users size={32} />
            </div>
            <h4 className="text-xl font-black text-white uppercase tracking-tight">Traffic Monitor</h4>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Active</p>
                <p className="text-lg font-black text-white">42</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Blocked/Min</p>
                <p className="text-lg font-black text-rose-400">{maintenance.isActive ? "124" : "0"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
