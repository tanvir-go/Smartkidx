"use client";

import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  CreditCard, 
  MapPin,
  Save,
  Trash2
} from "lucide-react";

export default function CustomerSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Account Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your personal information and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { name: "My Profile", icon: <User size={18} />, active: true },
            { name: "Security", icon: <Lock size={18} />, active: false },
            { name: "Notifications", icon: <Bell size={18} />, active: false },
            { name: "Privacy", icon: <Shield size={18} />, active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                item.active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-white hover:text-slate-800"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-sm flex items-center justify-center text-primary text-2xl font-black relative group">
                JS
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <EditIcon size={14} />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">John Smith</h3>
                <p className="text-xs text-slate-400 font-bold uppercase mt-1">Member since October 2023</p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase rounded-full">Premium</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase rounded-full">Verified</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" defaultValue="John Smith" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" defaultValue="john.smith@example.com" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input type="text" defaultValue="+880 1711-223344" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                <input type="date" defaultValue="1992-05-15" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
              <button className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 flex items-center gap-2">
                <Trash2 size={16} /> Delete Account
              </button>
              <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditIcon({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}
