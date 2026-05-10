"use client";

import React, { useState } from "react";
import { 
  ScrollText, 
  Save, 
  Eye, 
  FileCheck,
  History,
  Scale,
  MessageSquare,
  AlertTriangle
} from "lucide-react";
import { toast } from "react-toastify";

export default function TermsConditionsPage() {
  const [content, setContent] = useState(`
# Terms and Conditions

Welcome to SmartKids Network. By using our platform, you agree to the following terms:

## 1. Acceptance of Terms
By accessing or using our services, you confirm that you can form a binding contract with SmartKids...

## 2. User Accounts
When you create an account, you must provide accurate and complete information. You are responsible for maintaining the security of your account...

## 3. Intellectual Property
The platform and its original content are and will remain the exclusive property of SmartKids Network...
  `);

  const handleSave = () => {
    toast.success("Terms & Conditions updated successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Terms & Conditions</h2>
          <p className="text-slate-500 text-sm mt-1">Regulate the legal agreement between the platform and its users.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Eye size={18} /> Preview
          </button>
          <button 
            onClick={handleSave}
            className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Save size={18} /> Update Terms
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ScrollText size={18} className="text-primary" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Document Editor (Markdown)</span>
              </div>
            </div>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-grow p-10 text-slate-600 font-mono text-sm border-none focus:ring-0 resize-none outline-none h-[650px]"
              placeholder="Enter Terms & Conditions in Markdown..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Scale size={16} className="text-primary" /> Legal Status
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Enforcement</p>
                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">Fully Active</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Compliance Rate</p>
                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">99.8%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <History size={16} className="text-blue-500" /> Logs
            </h4>
            <div className="space-y-4">
              {[
                { date: "Oct 15, 2023", msg: "Clause 4.2 Updated" },
                { date: "Sep 28, 2023", msg: "Initial Release v3" },
                { date: "Aug 12, 2023", msg: "Security Patch" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-px bg-slate-100 relative">
                    <div className="absolute top-1 -left-[4px] w-2 h-2 rounded-full bg-slate-200"></div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{log.date}</p>
                    <p className="text-xs font-bold text-slate-700 mt-1.5">{log.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-rose-50 rounded-[32px] border border-rose-100">
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <AlertTriangle size={20} />
              <p className="text-[11px] font-black uppercase tracking-widest leading-none">Warning</p>
            </div>
            <p className="text-xs font-bold text-rose-700/70 leading-relaxed uppercase tracking-tight">
              Major changes to Terms of Service require user notification 30 days prior to enforcement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
