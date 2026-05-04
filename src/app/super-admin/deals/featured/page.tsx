"use client";

import { 
  Star, 
  Plus, 
  Search, 
  MoreVertical, 
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  Edit
} from "lucide-react";

const featuredDeals = [
  { id: 1, name: "Deal of the Month", product: "Robotics Starter Kit", discount: "৳ 500 Off", status: "Active" },
  { id: 2, name: "New Arrival Special", product: "DIY Drone Kit", discount: "15% Off", status: "Active" },
  { id: 3, name: "Weekend Bestseller", product: "STEM Solar Car", discount: "Free Shipping", status: "Inactive" },
];

export default function FeaturedDealsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Featured Deals</h2>
          <p className="text-slate-500 text-sm mt-1">Promote specific products as hero deals on the homepage.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus size={18} /> Create Featured Deal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredDeals.map((deal) => (
          <div key={deal.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative group overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-lg shadow-amber-100">
                <Star size={28} fill="currentColor" />
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                deal.status === "Active" ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-400"
              }`}>
                {deal.status}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight leading-tight">{deal.name}</h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1.5">{deal.product}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Promotion Offer</p>
                <p className="text-sm font-black text-slate-800 mt-2 uppercase">{deal.discount}</p>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex gap-1">
                  <button className="p-2 text-slate-400 hover:text-primary transition-all"><Edit size={16} /></button>
                  <button className="p-2 text-slate-400 hover:text-rose-500 transition-all"><Trash2 size={16} /></button>
                </div>
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary flex items-center gap-1">
                  Settings <MoreVertical size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
