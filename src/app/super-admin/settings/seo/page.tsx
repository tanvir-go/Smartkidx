"use client";

import { 
  Globe, 
  Search, 
  Save, 
  Share2, 
  BarChart3,
  CheckCircle2
} from "lucide-react";

export default function SEOSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">SEO & Global Meta</h2>
        <p className="text-slate-500 text-sm mt-1">Optimize your platform's visibility across search engines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div className="space-y-6">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Globe size={18} className="text-primary" /> Meta Configuration
              </h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Meta Title</label>
                <input 
                  type="text" 
                  defaultValue="SmartKids | Best Robotics & STEM Kits for Kids" 
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meta Description</label>
                <textarea 
                  rows={4}
                  defaultValue="Shop the latest in educational robotics, IoT, and STEM projects. Empowering children with future-ready skills."
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meta Keywords</label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {["Robotics", "STEM", "Education", "Coding", "Drones"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white rounded-lg text-[10px] font-black text-primary border border-slate-100 uppercase tracking-widest">{tag}</span>
                  ))}
                  <button className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest">+ Add</button>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 flex justify-end">
              <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                <Save size={18} /> Update SEO Settings
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Share2 size={16} /> Social Preview
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-primary flex items-center justify-center text-white font-black text-2xl">
                SmartKids
              </div>
              <div className="p-4">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">smartkids.com</p>
                <h4 className="text-slate-800 text-sm font-black mt-1">SmartKids | Best Robotics & STEM...</h4>
                <p className="text-slate-500 text-[11px] mt-1 line-clamp-2">Shop the latest in educational robotics, IoT, and STEM projects...</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-xs font-black text-emerald-800 uppercase tracking-widest">SEO Score: 92/100</p>
            </div>
            <p className="text-[11px] text-emerald-600 font-bold leading-relaxed">Your site is well-optimized for search engines. Keep updating blog content to maintain ranking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
