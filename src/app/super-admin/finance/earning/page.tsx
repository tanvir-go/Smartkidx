"use client";

import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Filter
} from "lucide-react";

export default function EarningsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Financial Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Monitor revenue, platform earnings, and vendor payouts.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={16} /> Reports
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Payout Management
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Gross Revenue", value: "৳ 4.5M", change: "+15.2%", up: true, color: "emerald" },
          { label: "Platform Profit", value: "৳ 675k", change: "+8.4%", up: true, color: "blue" },
          { label: "Vendor Payouts", value: "৳ 3.2M", change: "+12.1%", up: true, color: "purple" },
          { label: "Tax Liability", value: "৳ 120k", change: "-2.4%", up: false, color: "rose" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            <div className="flex items-end justify-between mt-4">
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              <div className={`flex items-center gap-0.5 text-[10px] font-bold ${stat.up ? "text-emerald-500" : "text-rose-500"}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-${stat.color}-500 opacity-20`}></div>
          </div>
        ))}
      </div>

      {/* Transactions Table Placeholder */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Recent Transactions</h3>
          <div className="flex gap-2">
            <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-all"><Filter size={18} /></button>
            <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-all"><Calendar size={18} /></button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
              <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</th>
              <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { id: "#TXN-8823", type: "Order Payment", source: "SmartKids Store", amount: "+ ৳ 2,500", status: "Completed" },
              { id: "#TXN-8824", type: "Vendor Payout", source: "Global Tech", amount: "- ৳ 15,000", status: "Processing" },
              { id: "#TXN-8825", type: "Platform Fee", source: "Seller Commission", amount: "+ ৳ 375", status: "Completed" },
              { id: "#TXN-8826", type: "Refund", source: "Customer Return", amount: "- ৳ 1,200", status: "Completed" },
            ].map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{txn.id}</td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-tight">{txn.type}</td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{txn.source}</td>
                <td className={`px-8 py-5 text-[11px] font-black ${txn.amount.startsWith('+') ? "text-emerald-500" : "text-rose-500"}`}>{txn.amount}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    txn.status === "Completed" ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"
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
