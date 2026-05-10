"use client";

import React, { useState } from "react";
import { 
  Lock, 
  Save, 
  Eye, 
  History, 
  ShieldCheck,
  Globe,
  FileText,
  AlertCircle
} from "lucide-react";
import { toast } from "react-toastify";

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState(`
# Privacy Policy for SmartKids Network

Last Updated: October 2023

## 1. Information We Collect
We collect information you provide directly to us when you create an account, make a purchase, or communicate with us.

## 2. How We Use Information
We use the information to process orders, provide customer support, and improve our services.

## 3. Data Security
We implement robust security measures to protect your personal information...
  `);

  const handleSave = () => {
    toast.success("Privacy Policy updated successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Privacy Policy</h2>
          <p className="text-slate-500 text-sm mt-1">Manage the platform's data protection and privacy standards.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Eye size={18} /> Preview
          </button>
          <button 
            onClick={handleSave}
            className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Save size={18} /> Publish Updates
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-primary" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Policy Editor (Markdown)</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              </div>
            </div>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[600px] p-8 text-slate-600 font-mono text-sm border-none focus:ring-0 resize-none outline-none"
              placeholder="Enter policy content in Markdown..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" /> Policy Status
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Live Version</span>
                <span className="text-[10px] font-black text-emerald-600 px-2 py-1 bg-white rounded-lg">v2.4.1</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Last Modified</span>
                <span className="text-[10px] font-bold text-slate-500">Oct 12, 2023</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <History size={16} className="text-blue-500" /> Version History
            </h4>
            <div className="space-y-4">
              {[1, 2, 3].map((v) => (
                <div key={v} className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 uppercase">Version 2.4.{v-1}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Archived on Sep {v+10}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-amber-50 rounded-[32px] border border-amber-100">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertCircle size={20} />
              <p className="text-[11px] font-black uppercase tracking-widest leading-none">Legal Notice</p>
            </div>
            <p className="text-xs font-bold text-amber-700/70 leading-relaxed uppercase tracking-tight">
              Modifying this document may have legal implications. Please consult with the legal department before publishing significant changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
