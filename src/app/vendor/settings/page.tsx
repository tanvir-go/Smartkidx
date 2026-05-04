"use client";

import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CreditCard,
  Bell,
  Lock,
  Save,
  Plus
} from "lucide-react";

export default function VendorSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Store Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your shop profile, branches, and payment info.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shop Profile */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 relative group cursor-pointer overflow-hidden">
                <Building2 size={32} />
                <div className="absolute inset-0 bg-primary/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-black uppercase tracking-widest">Update Logo</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Global Tech Ltd</h3>
                <p className="text-xs text-slate-400 font-bold uppercase mt-1">Verified Vendor since 2023</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Name</label>
                <input type="text" defaultValue="Global Tech Ltd" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Email</label>
                <input type="email" defaultValue="admin@globaltech.com" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input type="text" defaultValue="+880 1711-000111" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Website URL</label>
                <input type="text" defaultValue="https://globaltech.com" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex justify-end">
              <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                <Save size={18} /> Update Profile
              </button>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <CreditCard size={18} className="text-primary" /> Payout Settings
            </h3>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-[10px] text-white font-black italic">BANK</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">City Bank Ltd</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Account Ending in 4521</p>
                </div>
              </div>
              <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Edit Info</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Access Card */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Account Health</p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold uppercase">Order Completion</span>
                  <span className="text-xs font-black">98%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold uppercase">Response Rate</span>
                  <span className="text-xs font-black">100%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Center */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4">Vendor Support</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">Need help with your listings or payouts? Contact our dedicated support team.</p>
            <button className="w-full py-4 bg-slate-50 text-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Contact Account Manager</button>
          </div>
        </div>
      </div>
    </div>
  );
}
