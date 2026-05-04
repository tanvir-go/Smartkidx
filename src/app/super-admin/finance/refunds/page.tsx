"use client";

import { 
  Undo2, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowRight
} from "lucide-react";

const refunds = [
  { id: "#RFD-201", order: "#ORD-9823", user: "John Doe", amount: "৳150.00", reason: "Damaged Item", status: "Completed", date: "Oct 24, 2023" },
  { id: "#RFD-202", order: "#ORD-9712", user: "Jane Smith", amount: "৳45.00", reason: "Wrong Size", status: "Pending", date: "Oct 25, 2023" },
  { id: "#RFD-203", order: "#ORD-9645", user: "Mike Johnson", amount: "৳280.00", reason: "Changed Mind", status: "Rejected", date: "Oct 25, 2023" },
];

export default function RefundsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Refund Management</h2>
          <p className="text-slate-500 text-sm mt-1">Review and approve customer return and refund requests.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Undo2 size={18} /> Refund Policy
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by refund ID or order..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Refund ID</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Order & User</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {refunds.map((rf) => (
              <tr key={rf.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{rf.id}</td>
                <td className="px-8 py-5">
                  <div>
                    <p className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">{rf.user}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">{rf.order}</p>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-black text-rose-500">{rf.amount}</td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">{rf.reason}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    {rf.status === "Completed" && <CheckCircle2 size={14} className="text-emerald-500" />}
                    {rf.status === "Pending" && <Clock size={14} className="text-amber-500" />}
                    {rf.status === "Rejected" && <XCircle size={14} className="text-rose-500" />}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      rf.status === "Completed" ? "text-emerald-500" : 
                      rf.status === "Pending" ? "text-amber-500" : "text-rose-500"
                    }`}>{rf.status}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1 justify-end ml-auto">
                    Details <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
