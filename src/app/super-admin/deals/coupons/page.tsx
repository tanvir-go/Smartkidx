"use client";

import { 
  TicketPercent, 
  Plus, 
  Search, 
  MoreVertical, 
  Calendar,
  Copy,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { toast } from "react-toastify";

const coupons = [
  { id: 1, code: "WELCOME20", discount: "20%", type: "Percentage", used: 145, limit: 500, expiry: "Dec 31, 2023", status: "Active" },
  { id: 2, code: "FESTIVE500", discount: "৳ 500", type: "Fixed Amount", used: 89, limit: 100, expiry: "Nov 15, 2023", status: "Active" },
  { id: 3, code: "ROBOTICS10", discount: "10%", type: "Percentage", used: 320, limit: "No Limit", expiry: "Ongoing", status: "Active" },
  { id: 4, code: "SAVE50", discount: "50%", type: "Percentage", used: 50, limit: 50, expiry: "Oct 20, 2023", status: "Expired" },
  { id: 5, code: "NEWUSER", discount: "15%", type: "Percentage", used: 12, limit: 1000, expiry: "Jan 01, 2024", status: "Scheduled" },
];

export default function CouponsPage() {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Coupons & Promotions</h2>
          <p className="text-slate-500 text-sm mt-1">Create and manage discount codes for your customers.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus size={18} /> Create New Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div key={coupon.id} className={`bg-white p-6 rounded-[32px] border transition-all hover:shadow-xl hover:shadow-slate-100 group relative overflow-hidden ${
            coupon.status === "Expired" ? "opacity-60 border-slate-100" : "border-slate-100"
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-2xl ${
                coupon.status === "Active" ? "bg-emerald-50 text-emerald-500" : 
                coupon.status === "Expired" ? "bg-rose-50 text-rose-500" : "bg-blue-50 text-blue-500"
              }`}>
                <TicketPercent size={24} />
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                coupon.status === "Active" ? "bg-emerald-50 text-emerald-500" : 
                coupon.status === "Expired" ? "bg-rose-50 text-rose-500" : "bg-blue-50 text-blue-500"
              }`}>
                {coupon.status}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Coupon Code</p>
                <div className="flex items-center justify-between mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-primary/50 transition-colors">
                  <span className="text-sm font-black text-slate-800 tracking-wider">{coupon.code}</span>
                  <button onClick={() => copyToClipboard(coupon.code)} className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Discount</p>
                  <p className="text-lg font-black text-slate-800 mt-1">{coupon.discount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Usage</p>
                  <p className="text-lg font-black text-slate-800 mt-1">{coupon.used} <span className="text-xs text-slate-300 font-bold">/ {coupon.limit}</span></p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <Calendar size={12} /> Exp: {coupon.expiry}
                </p>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Edit Details</button>
              </div>
            </div>
            
            {/* Cut-out circles for ticket effect */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#F8F9FD] border border-slate-100 rounded-full"></div>
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#F8F9FD] border border-slate-100 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
