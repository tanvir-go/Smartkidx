"use client";

import { 
  HelpCircle, 
  Plus, 
  Search, 
  MoreVertical, 
  ChevronDown, 
  Edit, 
  Trash2,
  CheckCircle2
} from "lucide-react";

const faqs = [
  { id: 1, question: "How to register as a vendor?", category: "Registration", status: "Published" },
  { id: 2, question: "What are the shipping charges?", category: "Shipping", status: "Published" },
  { id: 3, question: "How to track my order?", category: "Orders", status: "Draft" },
  { id: 4, question: "Return policy details", category: "Policies", status: "Published" },
  { id: 5, question: "How to reset password?", category: "Account", status: "Published" },
];

export default function FAQManagementPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">FAQ Management</h2>
          <p className="text-slate-500 text-sm mt-1">Manage frequently asked questions and help center content.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus size={18} /> Add New FAQ
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search FAQs by question or category..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
          Categories <ChevronDown size={14} />
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Question</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {faqs.map((faq) => (
              <tr key={faq.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <HelpCircle size={18} className="text-slate-400" />
                    <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">{faq.question}</p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">{faq.category}</span>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    faq.status === "Published" ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-400"
                  }`}>
                    {faq.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary transition-all"><Edit size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
