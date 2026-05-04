"use client";

import { 
  CreditCard, 
  Plus, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";

const methods = [
  { name: "bKash", type: "Mobile Finance", status: "Active", delay: "Instant", logo: "BK" },
  { name: "Nagad", type: "Mobile Finance", status: "Active", delay: "Instant", logo: "NG" },
  { name: "SSL Commerz", type: "Gateway", status: "Active", delay: "T+2 Days", logo: "SSL" },
  { name: "Stripe", type: "Global Gateway", status: "Inactive", delay: "T+7 Days", logo: "ST" },
  { name: "Cash on Delivery", type: "Offline", status: "Active", delay: "On Delivery", logo: "COD" },
];

export default function PaymentMethodsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Payment Methods Setup</h2>
          <p className="text-slate-500 text-sm mt-1">Configure and manage payment gateways and payout methods.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus size={18} /> Add New Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {methods.map((method) => (
          <div key={method.name} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative group overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xl shadow-slate-200">
                {method.logo}
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                method.status === "Active" ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-400"
              }`}>
                {method.status}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{method.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{method.type}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Settlement</p>
                  <p className="text-xs font-black text-slate-800 mt-1">{method.delay}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fee Rate</p>
                  <p className="text-xs font-black text-primary mt-1">2.5%</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                  <Settings size={14} /> Configure
                </button>
                <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                  Test Connection <ArrowRight size={14} />
                </button>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        ))}
      </div>

      {/* Security Info */}
      <div className="bg-slate-900 rounded-[40px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight">Enterprise-Grade Security</h3>
            <p className="text-xs text-slate-400 font-bold mt-1">All payment data is encrypted with AES-256 and PCI DSS compliant.</p>
          </div>
        </div>
        <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all shadow-xl shadow-white/5 flex items-center gap-2">
          <Zap size={18} /> Enable Fraud Detection
        </button>
      </div>
    </div>
  );
}
