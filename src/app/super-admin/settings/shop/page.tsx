"use client";

import React, { useState } from "react";
import { 
  Store, 
  Save, 
  Image as ImageIcon, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Settings2,
  Clock,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { toast } from "react-toastify";

export default function ShopSettingsPage() {
  const [settings, setSettings] = useState({
    shopName: "SmartKids Official Store",
    shopTagline: "Innovating STEM Education for the Next Generation",
    shopEmail: "contact@smartkids.com",
    shopPhone: "+880 1712-345678",
    shopAddress: "Sector 7, Uttara, Dhaka, Bangladesh",
    currency: "BDT (৳)",
    timezone: "(GMT+06:00) Astana, Dhaka",
    minOrderAmount: "500",
    taxPercentage: "5"
  });

  const handleSave = () => {
    toast.success("Shop settings updated successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Shop Settings</h2>
          <p className="text-slate-500 text-sm mt-1">Configure your main platform identity and operational parameters.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <Save size={18} /> Save Global Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-3">
              <Settings2 size={16} className="text-primary" /> Core Identity
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Shop Name</label>
                <input 
                  type="text" 
                  value={settings.shopName}
                  onChange={(e) => setSettings({...settings, shopName: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    value={settings.shopEmail}
                    onChange={(e) => setSettings({...settings, shopEmail: e.target.value})}
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tagline / Motto</label>
                <input 
                  type="text" 
                  value={settings.shopTagline}
                  onChange={(e) => setSettings({...settings, shopTagline: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={settings.shopPhone}
                    onChange={(e) => setSettings({...settings, shopPhone: e.target.value})}
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={settings.shopAddress}
                    onChange={(e) => setSettings({...settings, shopAddress: e.target.value})}
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operational Settings */}
          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-3">
              <Clock size={16} className="text-primary" /> Operational Logistics
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Currency</label>
                <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none">
                  <option>BDT (৳)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Timezone</label>
                <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none">
                  <option>(GMT+06:00) Astana, Dhaka</option>
                  <option>(GMT+00:00) London</option>
                  <option>(GMT-05:00) New York</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Shop Assets */}
          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
              <ImageIcon size={16} className="text-primary" /> Brand Assets
            </h4>
            
            <div className="space-y-6">
              <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-primary transition-all">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-300 group-hover:text-primary shadow-sm mb-4">
                  <ImageIcon size={32} />
                </div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Upload Main Logo</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">PNG, SVG • Max 2MB</p>
              </div>
              
              <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-primary transition-all">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-300 group-hover:text-primary shadow-sm mb-4">
                  <Store size={32} />
                </div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Upload Favicon</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">ICO, PNG • 32x32px</p>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="p-10 bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200">
            <div className="flex items-center gap-3 text-white mb-8">
              <ShieldCheck size={24} className="text-primary" />
              <p className="text-sm font-black uppercase tracking-widest">Security Status</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between text-white/60">
                <span className="text-[10px] font-black uppercase tracking-widest">SSL Protocol</span>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span className="text-[10px] font-black uppercase tracking-widest">Payment Gateway</span>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Verified</span>
              </div>
              <div className="h-px bg-white/10"></div>
              <div className="flex items-center justify-between text-white/60">
                <span className="text-[10px] font-black uppercase tracking-widest">API Version</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">v4.8.2-LTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
