"use client";

import { 
  ShoppingBag, 
  DollarSign, 
  Package, 
  ArrowUpRight,
  Plus,
  Building2,
  MapPin,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ChevronDown,
  Star,
  Users
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { name: "TOTAL SALES", value: "৳ 95,500", change: "+15.2%", trend: "up", icon: <DollarSign size={20} className="text-emerald-500" />, color: "bg-emerald-50" },
  { name: "TOTAL ORDERS", value: "1,240", change: "+8.4%", trend: "up", icon: <ShoppingBag size={20} className="text-blue-500" />, color: "bg-blue-50" },
  { name: "TOTAL PRODUCTS", value: "255", change: "+12", trend: "up", icon: <Package size={20} className="text-amber-500" />, color: "bg-amber-50" },
  { name: "STORE RATING", value: "4.8", change: "+0.2", trend: "up", icon: <Star size={20} className="text-primary" />, color: "bg-primary/10" },
];

const branches = [
  { id: 1, name: "Dhaka Branch", city: "Dhaka", sales: "৳ 45,000", products: 124, status: "Active" },
  { id: 2, name: "Chittagong Branch", city: "Chittagong", sales: "৳ 32,000", products: 86, status: "Active" },
  { id: 3, name: "Sylhet Branch", city: "Sylhet", sales: "৳ 18,500", products: 45, status: "Maintenance" },
];

const recentOrders = [
  { id: "#254830", customer: "Abir Hasan", date: "12 Sept, 2027", product: "Arduino Uno", amount: "৳ 1,200", status: "PENDING" },
  { id: "#254831", customer: "Sumi Akter", date: "12 Sept, 2027", product: "Solar Robot", amount: "৳ 2,400", status: "DELIVERED" },
  { id: "#254832", customer: "Rafiq Islam", date: "11 Sept, 2027", product: "STEM Kit", amount: "৳ 1,500", status: "SHIPPED" },
  { id: "#254833", customer: "Tania Khan", date: "11 Sept, 2027", product: "3D Pen", amount: "৳ 3,200", status: "PENDING" },
];

export default function VendorDashboard() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Vendor Overview</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Manage your branches and monitor store performance.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Product
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={stat.name} 
            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.name}</p>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                {stat.trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              <div className="h-10 w-24 relative opacity-40 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <path 
                    d={stat.trend === "up" ? "M0 30 Q 25 10, 50 25 T 100 10" : "M0 10 Q 25 30, 50 15 T 100 35"} 
                    fill="none" 
                    stroke={stat.trend === "up" ? "#10b981" : "#ef4444"} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.trend === "up" ? "bg-emerald-500" : "bg-red-500"} opacity-20`}></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Monthly Revenue</h3>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">(+15%) than last month</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-all">
              <MoreVertical size={18} className="text-slate-400" />
            </button>
          </div>

          <div className="h-64 flex items-end gap-4">
            {[25, 45, 38, 52, 60, 48, 70, 55, 62, 75, 85, 95].map((val, i) => (
              <div key={i} className="flex-grow flex flex-col items-center gap-2 group cursor-pointer">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${val * 1.5}px` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className={`w-full max-w-[40px] rounded-t-lg transition-all ${
                    val > 60 ? "bg-primary" : "bg-primary/40"
                  }`}
                ></motion.div>
                <span className="text-[8px] font-black text-slate-400 uppercase">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fulfillment Status */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm mb-10">Order Fulfillment</h3>
          <div className="space-y-8">
            {[
              { name: "Shipped orders", count: 75, color: "bg-blue-500" },
              { name: "Delivered", count: 62, color: "bg-emerald-500" },
              { name: "Pending", count: 18, color: "bg-amber-500" },
              { name: "Returns", count: 5, color: "bg-rose-500" },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{item.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.count}%</p>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.count}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${item.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2">
            <Building2 size={18} className="text-primary" /> My Branch Portals
          </h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{branches.length} Branches Registered</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <Link 
              key={branch.id} 
              href={`/vendor/branch/${branch.id}`}
              className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                  <Building2 size={28} />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  branch.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                }`}>
                  {branch.status}
                </span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-black text-slate-800 group-hover:text-primary transition-colors uppercase tracking-tight">{branch.name}</h4>
                  <p className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">
                    <MapPin size={12} /> {branch.city}, Bangladesh
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Sales</p>
                    <p className="text-md font-black text-slate-800">{branch.sales}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Products</p>
                    <p className="text-md font-black text-slate-800">{branch.products}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Open Branch Dashboard <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Recent Store Orders</h3>
          <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ORDER ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">CUSTOMER</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">DATE</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">PRODUCT</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">AMOUNT</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-500 group-hover:text-primary transition-colors">{order.id}</td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{order.customer}</td>
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-500">{order.date}</td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{order.product}</td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-900">{order.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-500" :
                      order.status === "PENDING" ? "bg-amber-50 text-amber-500" :
                      "bg-blue-50 text-blue-500"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
