"use client";

import { 
  Store, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Package,
  MoreVertical,
  Download
} from "lucide-react";
import { exportToCSV } from "@/utils/export";

const sellers = [
  { id: 1, name: "Global Tech", email: "sales@globaltech.com", city: "Dhaka", rating: 4.8, sales: "৳ 1.2M", items: 450, status: "Verified", logo: "GT" },
  { id: 2, name: "RoboMaster", email: "info@robomaster.com", city: "Chittagong", rating: 4.5, sales: "৳ 450k", items: 120, status: "Verified", logo: "RM" },
  { id: 3, name: "STEM Solutions", email: "support@stemsol.com", city: "Sylhet", rating: 4.2, sales: "৳ 120k", items: 85, status: "Pending", logo: "SS" },
  { id: 4, name: "Learning Hub", email: "hello@learninghub.com", city: "Dhaka", rating: 4.9, sales: "৳ 2.5M", items: 890, status: "Verified", logo: "LH" },
  { id: 5, name: "EduToys", email: "contact@edutoys.com", city: "Rajshahi", rating: 3.8, sales: "৳ 85k", items: 42, status: "Suspended", logo: "ET" },
];

export default function SellersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Sellers Management</h2>
          <p className="text-slate-500 text-sm mt-1">Monitor and manage all vendors/sellers on the platform.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              sellers, 
              ["ID", "Name", "Email", "City", "Rating", "Sales", "Items", "Status"], 
              "Sellers_Export",
              (s) => [s.id, s.name, s.email, s.city, s.rating, s.sales, s.items, s.status]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Register New Seller
          </button>
        </div>
      </div>

      {/* Seller Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <Store size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Active Sellers</p>
            <h3 className="text-2xl font-black text-slate-800 mt-2">1,245</h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">+12 this month</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <Package size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Products</p>
            <h3 className="text-2xl font-black text-slate-800 mt-2">15,890</h3>
            <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">89% active stock</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
            <TrendingUp size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Avg. Seller Rating</p>
            <h3 className="text-2xl font-black text-slate-800 mt-2">4.7 / 5.0</h3>
            <div className="flex gap-0.5 mt-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="#f59e0b" className="text-amber-500" />)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search sellers by name, email or city..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Seller Shop</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Sales & items</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sellers.map((seller) => (
              <tr key={seller.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-slate-200 group-hover:scale-110 transition-all">
                      {seller.logo}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase leading-none">{seller.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
                        <MapPin size={10} /> {seller.city}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-black rounded-lg flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> {seller.rating}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Excellent</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{seller.sales} Sales</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{seller.items} Products</p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit ${
                    seller.status === "Verified" ? "bg-emerald-50 text-emerald-500" : 
                    seller.status === "Pending" ? "bg-amber-50 text-amber-500" : "bg-rose-50 text-rose-500"
                  }`}>
                    {seller.status === "Verified" && <ShieldCheck size={12} />}
                    {seller.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"><ChevronRight size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all"><MoreVertical size={18} /></button>
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
