"use client";

import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Download,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Truck
} from "lucide-react";

const orders = [
  { id: "#ORD-9823", customer: "John Doe", items: 3, total: "$150.00", status: "Delivered", date: "Oct 24, 2023", payment: "Paid" },
  { id: "#ORD-9712", customer: "Jane Smith", items: 1, total: "$45.00", status: "Pending", date: "Oct 25, 2023", payment: "Unpaid" },
  { id: "#ORD-9645", customer: "Mike Johnson", items: 5, total: "$280.00", status: "Shipped", date: "Oct 25, 2023", payment: "Paid" },
  { id: "#ORD-9588", customer: "Sarah Williams", items: 2, total: "$85.00", status: "Processing", date: "Oct 26, 2023", payment: "Paid" },
  { id: "#ORD-9511", customer: "Alex Brown", items: 1, total: "$12.00", status: "Cancelled", date: "Oct 26, 2023", payment: "Refunded" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Order Management</h2>
          <p className="text-slate-500 text-sm mt-1">Track, process and manage customer orders globally.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={16} /> Export CSV
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Create Order
          </button>
        </div>
      </div>

      {/* Order Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "All Orders", count: 1250, active: true },
          { label: "Pending", count: 45, active: false },
          { label: "Processing", count: 12, active: false },
          { label: "Shipped", count: 85, active: false },
          { label: "Delivered", count: 980, active: false },
        ].map((filter) => (
          <button 
            key={filter.label}
            className={`p-4 rounded-2xl border transition-all text-left ${
              filter.active 
                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                : "bg-white border-slate-100 text-slate-600 hover:border-primary/50"
            }`}
          >
            <p className={`text-[10px] font-black uppercase tracking-widest ${filter.active ? "opacity-70" : "text-slate-400"}`}>{filter.label}</p>
            <h3 className="text-xl font-black mt-1">{filter.count}</h3>
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by order ID, customer or product..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
          <Calendar size={16} /> Date Range
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div>
                    <p className="text-sm font-black text-slate-800">{order.id}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.items} Items</p>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{order.customer}</td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500">{order.date}</td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800">{order.total}</td>
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    order.payment === "Paid" ? "text-emerald-500" : order.payment === "Refunded" ? "text-blue-500" : "text-amber-500"
                  }`}>
                    {order.payment}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    {order.status === "Delivered" && <CheckCircle2 size={14} className="text-emerald-500" />}
                    {order.status === "Pending" && <Clock size={14} className="text-amber-500" />}
                    {order.status === "Shipped" && <Truck size={14} className="text-blue-500" />}
                    {order.status === "Cancelled" && <XCircle size={14} className="text-rose-500" />}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      order.status === "Delivered" ? "text-emerald-500" :
                      order.status === "Cancelled" ? "text-rose-500" :
                      order.status === "Shipped" ? "text-blue-500" : "text-amber-500"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"><Eye size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all"><MoreVertical size={16} /></button>
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
