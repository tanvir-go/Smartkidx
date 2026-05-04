"use client";

import { 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle2,
  Home,
  Briefcase,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

const addresses = [
  { id: 1, label: "Home", name: "John Smith", address: "House 24, Road 12, Block E, Banani, Dhaka - 1213", phone: "+880 1712 345678", isDefault: true, icon: <Home size={20} /> },
  { id: 2, label: "Office", name: "John Smith", address: "Plot 16, Level 4, Sector 7, Uttara, Dhaka - 1230", phone: "+880 1712 345678", isDefault: false, icon: <Briefcase size={20} /> },
  { id: 3, label: "Parents' House", name: "John Smith", address: "Road 5, House 12, Agrabad C/A, Chittagong - 4100", phone: "+880 1712 345678", isDefault: false, icon: <Users size={20} /> },
];

export default function AddressesPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">My Addresses</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Manage your delivery locations for faster checkout.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={addr.id} 
            className={`p-8 rounded-[32px] border transition-all relative group cursor-pointer ${
              addr.isDefault ? "bg-white border-primary shadow-xl shadow-primary/5" : "bg-white border-slate-100 hover:border-primary/50 hover:shadow-xl"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                addr.isDefault ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
              } transition-all`}>
                {addr.icon}
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  addr.isDefault ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                }`}>
                  {addr.label}
                </span>
                {addr.isDefault && <CheckCircle2 size={18} className="text-emerald-500" />}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{addr.name}</p>
                <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed italic">
                  {addr.address}
                </p>
              </div>
              <p className="text-xs font-black text-slate-800 pt-4 border-t border-slate-50 flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Phone:</span>
                {addr.phone}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-4">
              {!addr.isDefault && (
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Set as Default</button>
              )}
              <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 flex items-center gap-2 transition-colors ml-auto">
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
