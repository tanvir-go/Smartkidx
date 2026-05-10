"use client";

import { 
  BadgeDollarSign, 
  Search, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  CreditCard,
  Banknote,
  Smartphone
} from "lucide-react";
import { exportToCSV } from "@/utils/export";

const transactions = [
  { id: "#TXN-9023", order: "#ORD-9823", method: "bKash", type: "Credit", amount: "+ ৳ 2,500", date: "Oct 24, 2023", status: "Success" },
  { id: "#TXN-9024", order: "#ORD-9712", method: "Visa Card", type: "Credit", amount: "+ ৳ 4,500", date: "Oct 25, 2023", status: "Success" },
  { id: "#TXN-9025", order: "#ORD-9645", method: "Refund", type: "Debit", amount: "- ৳ 1,200", date: "Oct 25, 2023", status: "Success" },
  { id: "#TXN-9026", order: "#ORD-9588", method: "Nagad", type: "Credit", amount: "+ ৳ 850", date: "Oct 26, 2023", status: "Pending" },
  { id: "#TXN-9027", order: "#ORD-9511", method: "SSL Commerz", type: "Credit", amount: "+ ৳ 12,000", date: "Oct 26, 2023", status: "Failed" },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Financial Transactions</h2>
          <p className="text-slate-500 text-sm mt-1">Audit trail of all payments, refunds and platform fees.</p>
        </div>
        <button 
          onClick={() => exportToCSV(
            transactions, 
            ["Transaction ID", "Order ID", "Method", "Type", "Amount", "Date", "Status"], 
            "Transactions_Statement",
            (t) => [t.id, t.order, t.method, t.type, t.amount, t.date, t.status]
          )}
          className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <Download size={18} /> Export Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Volume", value: "৳ 45.2k", icon: <TrendingUp size={20} />, color: "bg-emerald-50 text-emerald-500" },
          { label: "Success Rate", value: "98.5%", icon: <CheckCircle2 size={20} />, color: "bg-blue-50 text-blue-500" },
          { label: "Pending", value: "৳ 12.8k", icon: <Clock size={20} />, color: "bg-amber-50 text-amber-500" },
          { label: "Failed", value: "৳ 1.2k", icon: <AlertCircle size={20} />, color: "bg-rose-50 text-rose-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-800 mt-2">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by transaction ID or order..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div>
                    <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{txn.id}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{txn.order}</p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    {txn.method === "bKash" || txn.method === "Nagad" ? <Smartphone size={14} className="text-primary" /> : <CreditCard size={14} className="text-slate-400" />}
                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{txn.method}</span>
                  </div>
                </td>
                <td className={`px-8 py-5 text-[11px] font-black ${txn.type === "Credit" ? "text-emerald-500" : "text-rose-500"}`}>
                  {txn.amount}
                </td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase">{txn.date}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    txn.status === "Success" ? "bg-emerald-50 text-emerald-500" : 
                    txn.status === "Pending" ? "bg-amber-50 text-amber-500" : "bg-rose-50 text-rose-500"
                  }`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";
