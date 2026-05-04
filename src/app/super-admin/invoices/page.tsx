"use client";

import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Printer, 
  CheckCircle2, 
  Clock,
  MoreVertical
} from "lucide-react";

const invoices = [
  { id: "#INV-9001", order: "#ORD-9823", customer: "John Doe", amount: "৳150.00", date: "Oct 24, 2023", status: "Paid" },
  { id: "#INV-9002", order: "#ORD-9712", customer: "Jane Smith", amount: "৳45.00", date: "Oct 25, 2023", status: "Unpaid" },
  { id: "#INV-9003", order: "#ORD-9645", customer: "Mike Johnson", amount: "৳280.00", date: "Oct 25, 2023", status: "Paid" },
  { id: "#INV-9004", order: "#ORD-9588", customer: "Sarah Williams", amount: "৳85.00", date: "Oct 26, 2023", status: "Overdue" },
];

export default function InvoicesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Invoice Management</h2>
          <p className="text-slate-500 text-sm mt-1">Generate and track billing invoices for all orders.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Download size={18} /> Batch Export
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by invoice ID or order..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice Details</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-slate-400" />
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase leading-none">{inv.id}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">{inv.date}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase">{inv.order}</td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{inv.customer}</td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800">{inv.amount}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    inv.status === "Paid" ? "bg-emerald-50 text-emerald-500" : 
                    inv.status === "Unpaid" ? "bg-amber-50 text-amber-500" : "bg-rose-50 text-rose-500"
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary transition-all"><Eye size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-800 transition-all"><Printer size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-800 transition-all"><MoreVertical size={16} /></button>
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
