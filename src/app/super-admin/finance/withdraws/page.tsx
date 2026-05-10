"use client";

import { 
  ArrowDownCircle, 
  Search, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Filter,
  MoreVertical,
  Banknote
} from "lucide-react";
import { exportToCSV } from "@/utils/export";

const withdrawals = [
  { id: "#WD-101", seller: "Global Tech", amount: "৳ 45,000", method: "Bank Transfer", date: "Oct 24, 2023", status: "Approved" },
  { id: "#WD-102", seller: "RoboMaster", amount: "৳ 12,000", method: "bKash", date: "Oct 25, 2023", status: "Pending" },
  { id: "#WD-103", seller: "STEM Solutions", amount: "৳ 8,500", method: "Nagad", date: "Oct 25, 2023", status: "Rejected" },
  { id: "#WD-104", seller: "Learning Hub", amount: "৳ 120,000", method: "Bank Transfer", date: "Oct 26, 2023", status: "Processing" },
];

export default function WithdrawalsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Withdrawal Requests</h2>
          <p className="text-slate-500 text-sm mt-1">Review and process payout requests from platform sellers.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              withdrawals, 
              ["ID", "Seller", "Amount", "Method", "Date", "Status"], 
              "Withdrawals_Export",
              (w) => [w.id, w.seller, w.amount, w.method, w.date, w.status]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <Banknote size={18} /> Batch Process
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Pending Payouts", value: "৳ 1.2M", color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Approved Today", value: "৳ 450k", color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Rejected", value: "৳ 15.2k", color: "text-rose-500", bg: "bg-rose-50" },
          { label: "Avg. Process Time", value: "1.2 Days", color: "text-blue-500", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-3xl border border-slate-100 shadow-sm`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            <h3 className={`text-2xl font-black mt-3 ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by seller name or WD-ID..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Request ID</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Seller</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {withdrawals.map((wd) => (
              <tr key={wd.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{wd.id}</td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{wd.seller}</td>
                <td className="px-8 py-5 text-[11px] font-black text-primary">{wd.amount}</td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase">{wd.method}</td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase">{wd.date}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    {wd.status === "Approved" && <CheckCircle2 size={14} className="text-emerald-500" />}
                    {wd.status === "Pending" && <Clock size={14} className="text-amber-500" />}
                    {wd.status === "Rejected" && <XCircle size={14} className="text-rose-500" />}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      wd.status === "Approved" ? "text-emerald-500" : 
                      wd.status === "Pending" ? "text-amber-500" : "text-rose-500"
                    }`}>{wd.status}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-all">
                    <MoreVertical size={18} />
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
