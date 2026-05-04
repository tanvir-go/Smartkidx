"use client";

import { useParams, useRouter } from "react-router-dom"; // Wait, Next.js use 'next/navigation'
import { useParams as useNextParams } from "next/navigation";
import { 
  Building2, 
  ArrowLeft, 
  Users, 
  ShoppingBag, 
  BarChart3, 
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const branchData: Record<string, any> = {
  "1": { name: "Dhaka Branch", city: "Dhaka", staff: 12, products: 124, revenue: "৳ 45,000", orders: 342 },
  "2": { name: "Chittagong Branch", city: "Chittagong", staff: 8, products: 86, revenue: "৳ 32,000", orders: 215 },
  "3": { name: "Sylhet Branch", city: "Sylhet", staff: 5, products: 45, revenue: "৳ 18,500", orders: 128 },
};

export default function BranchPortal() {
  const params = useNextParams();
  const id = params?.id as string;
  const branch = branchData[id] || branchData["1"];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
            <Link href="/vendor" className="hover:text-primary transition-colors">Vendor Portal</Link>
            <ChevronRight size={10} />
            <span className="text-slate-800">Branch Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/vendor"
              className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-primary transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                {branch.name} <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">ID: {id}</span>
              </h2>
              <p className="flex items-center gap-1 text-xs text-slate-500 font-bold uppercase mt-1">
                <MapPin size={12} className="text-primary" /> {branch.city}, Bangladesh
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-100 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Branch Status</p>
              <p className="text-xs font-black text-emerald-600 uppercase mt-0.5">Operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { name: "Branch Revenue", value: branch.revenue, icon: <BarChart3 size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { name: "Total Orders", value: branch.orders, icon: <ShoppingBag size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
          { name: "Active Products", value: branch.products, icon: <Building2 size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
          { name: "Staff Members", value: branch.staff, icon: <Users size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.name}</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Branch Inventory */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm">Branch Inventory</h3>
            <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Manage Stock</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "Robotics Starter Kit", stock: 24, price: "৳ 2,500", status: "In Stock" },
                  { name: "STEM Solar Car", stock: 12, price: "৳ 1,200", status: "Low Stock" },
                  { name: "Coding for Kids Book", stock: 45, price: "৳ 800", status: "In Stock" },
                  { name: "DIY Drone Kit", stock: 0, price: "৳ 4,500", status: "Out of Stock" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.stock} units</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                        item.status === "In Stock" ? "bg-emerald-50 text-emerald-600" : 
                        item.status === "Low Stock" ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Branch Team */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm mb-6">Branch Team</h3>
          <div className="space-y-4">
            {[
              { name: "Ahmed Raza", role: "Branch Manager", initial: "AR" },
              { name: "Sara Khan", role: "Sales Executive", initial: "SK" },
              { name: "Imran Hossain", role: "Inventory Lead", initial: "IH" },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {member.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{member.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{member.role}</p>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-primary transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
            <button className="w-full mt-4 py-3 border border-dashed border-slate-200 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
              + Assign Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
