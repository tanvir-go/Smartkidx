"use client";

import { 
  Receipt, 
  Search, 
  Download, 
  Settings, 
  PieChart, 
  BarChart3, 
  Globe,
  Plus
} from "lucide-react";

export default function TaxManagementPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Tax & Compliance</h2>
          <p className="text-slate-500 text-sm mt-1">Configure tax rates and monitor global tax liabilities.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={16} /> Tax Report
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <Plus size={18} /> Add Tax Rule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Globe size={18} className="text-primary" /> Active Tax Rules
            </h3>
            <div className="space-y-4">
              {[
                { name: "Standard VAT", rate: "15%", region: "Bangladesh", status: "Active" },
                { name: "Luxury Tax", rate: "25%", region: "Dhaka Metro", status: "Active" },
                { name: "Digital Services", rate: "5%", region: "Global", status: "Active" },
                { name: "Export Duty", rate: "0%", region: "International", status: "Active" },
              ].map((rule) => (
                <div key={rule.name} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/50 transition-colors">
                  <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{rule.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{rule.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-primary">{rule.rate}</p>
                    <button className="text-[10px] font-black text-slate-400 uppercase hover:text-primary transition-colors">Edit Rule</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <PieChart size={16} /> Tax Distribution
            </h3>
            <div className="space-y-6">
              {[
                { name: "VAT", val: 75, color: "bg-primary" },
                { name: "GST", val: 15, color: "bg-blue-500" },
                { name: "Others", val: 10, color: "bg-slate-700" },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black uppercase tracking-tight opacity-70">{item.name}</span>
                    <span className="text-[10px] font-bold opacity-70">{item.val}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <Receipt size={32} className="mx-auto text-slate-300 mb-4" />
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Quarterly Liability</h4>
            <p className="text-2xl font-black text-primary mt-2">৳ 145,200</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Due in 12 days</p>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] mt-6 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Pay Tax Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
