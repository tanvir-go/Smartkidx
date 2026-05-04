"use client";

import { 
  CreditCard, 
  Plus, 
  Trash2, 
  CheckCircle2,
  Zap,
  Smartphone,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

const paymentMethods = [
  { id: 1, type: "VISA", number: "•••• •••• •••• 4242", expiry: "12/25", holder: "John Smith", color: "bg-slate-900", isPrimary: true },
  { id: 2, type: "MASTERCARD", number: "•••• •••• •••• 5555", expiry: "08/26", holder: "John Smith", color: "bg-indigo-900", isPrimary: false },
  { id: 3, type: "BKASH", number: "01712 ••• 678", expiry: "Mobile Wallet", holder: "John Smith", color: "bg-[#D12053]", isPrimary: false },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Payment Methods</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Manage your cards and digital wallets securely.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((pm, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={pm.id} 
            className={`p-8 rounded-[32px] shadow-2xl transition-all relative overflow-hidden group cursor-pointer aspect-[1.6/1] flex flex-col justify-between ${pm.color} ${
              pm.isPrimary ? "ring-4 ring-primary/20" : "opacity-90 hover:opacity-100"
            }`}
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xs text-white font-black italic tracking-tighter backdrop-blur-md border border-white/10">
                  {pm.type}
                </div>
                {pm.isPrimary ? (
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    <Zap size={14} className="text-amber-400" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Primary</span>
                  </div>
                ) : (
                  <ShieldCheck size={20} className="text-white/40" />
                )}
              </div>
              <p className="text-white text-2xl font-black tracking-[0.2em] mb-2">{pm.number}</p>
            </div>
            
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Expiry Date</p>
                <p className="text-white text-xs font-black">{pm.expiry}</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Card Holder</p>
                <p className="text-white text-xs font-black uppercase tracking-tight">{pm.holder}</p>
              </div>
            </div>
            
            {/* Background design elements */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
            <div className="absolute -left-12 -top-12 w-32 h-32 bg-black/20 rounded-full blur-2xl"></div>
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4 z-20">
              {!pm.isPrimary && (
                <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Set Primary</button>
              )}
              <button className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
        
        {/* Add New Card */}
        <button className="p-8 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-primary hover:text-primary transition-all group aspect-[1.6/1]">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-all">
            <Plus size={32} />
          </div>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-widest">Add New Method</p>
            <p className="text-[10px] font-bold mt-1">Cards or Mobile Wallets</p>
          </div>
        </button>
      </div>
    </div>
  );
}
