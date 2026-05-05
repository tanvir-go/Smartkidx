"use client";

import React, { useState } from "react";
import { ShoppingCart, Search, Filter, MoreHorizontal, Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function VendorOrdersPage() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [orders, setOrders] = useState([
    { id: "#ORD-SK-1001", customer: "Alice Johnson", total: "৳ 3,250", status: "Pending", method: "COD" },
    { id: "#ORD-SK-1002", customer: "Rafiq Islam", total: "৳ 1,500", status: "Delivered", method: "Online" },
    { id: "#ORD-SK-1003", customer: "Sumi Akter", total: "৳ 2,400", status: "Processing", method: "COD" },
    { id: "#ORD-SK-1004", customer: "John Doe", total: "৳ 5,600", status: "Delivered", method: "Online" },
  ]);

  const filteredOrders = activeTab === 'All Orders' 
    ? orders 
    : orders.filter(o => o.status === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Order Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage and track your customer orders.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 overflow-x-auto pb-1">
        {['All Orders', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-sm w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search orders..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <button onClick={() => toast.info("Filters coming soon...")} className="p-2.5 text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-slate-200">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-sm font-black text-slate-800">{order.id}</td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-700 uppercase">{order.customer}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-800">{order.total}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">{order.method}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => toast.info(`Viewing order ${order.id}`)} className="p-2 text-slate-400 hover:text-primary transition-all"><Eye size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-800 transition-all"><MoreHorizontal size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-slate-400 text-sm font-medium italic">No orders found in this category.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
