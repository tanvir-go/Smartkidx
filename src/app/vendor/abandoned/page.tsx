"use client";

import React, { useState } from "react";
import { Trash2, Search, Mail, Bell, MoreHorizontal, ShoppingCart, Clock, User, CheckCircle2, Send, Download } from "lucide-react";
import { exportToCSV } from "@/utils/export";
import { toast } from "react-toastify";
import DeleteModal from "@/components/vendor/DeleteModal";

export default function VendorAbandonedCartPage() {
  const [carts, setCarts] = useState([
    { id: 1, customer: "Sarah Miller", email: "sarah@example.com", items: 3, value: 4800, abandonedAt: "2 hours ago", status: "Active", reminded: false },
    { id: 2, customer: "Rakib Hasan", email: "rakib.h@gmail.com", items: 1, value: 1200, abandonedAt: "5 hours ago", status: "Active", reminded: false },
    { id: 3, customer: "Mina Rahman", email: "mina.r@outlook.com", items: 5, value: 12500, abandonedAt: "1 day ago", status: "Reminded", reminded: true },
    { id: 4, customer: "John Doe", email: "john.doe@tech.com", items: 2, value: 3200, abandonedAt: "45 mins ago", status: "Active", reminded: false },
  ]);

  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: 0, name: "" });

  const handleRemind = (id: number, customer: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setCarts(prev => prev.map(cart => 
        cart.id === id ? { ...cart, status: "Reminded", reminded: true } : cart
      ));
      setLoadingId(null);
      toast.success(`Reminder sent successfully to ${customer}!`);
    }, 1500);
  };

  const handleBulkRemind = () => {
    const activeCarts = carts.filter(c => !c.reminded);
    if (activeCarts.length === 0) {
      toast.info("All customers have already been reminded.");
      return;
    }
    toast.info(`Sending ${activeCarts.length} reminders in background...`);
    setTimeout(() => {
      setCarts(prev => prev.map(cart => ({ ...cart, status: "Reminded", reminded: true })));
      toast.success("Bulk reminders sent successfully!");
    }, 2000);
  };

  const handleDelete = (id: number, customer: string) => {
    setDeleteModal({ isOpen: true, id, name: customer });
  };

  const confirmDelete = () => {
    setCarts(prev => prev.filter(c => c.id !== deleteModal.id));
    toast.success(`Abandoned cart for ${deleteModal.name} has been removed.`);
    setDeleteModal({ isOpen: false, id: 0, name: "" });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Abandoned Carts</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Recover lost sales by sending personalized reminders to potential customers.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              carts, 
              ["ID", "Customer", "Email", "Items", "Value", "Abandoned At", "Status"], 
              "Abandoned_Carts_Export",
              (c) => [c.id, c.customer, c.email, c.items, c.value, c.abandonedAt, c.status]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={16} /> Export CSV
          </button>
          <button 
            onClick={handleBulkRemind}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group"
          >
            <Bell size={16} className="group-hover:animate-ring" /> Remind All Customers
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-sm w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by customer or email..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
            <ShoppingCart size={14} className="text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{carts.length} Active Carts</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Items</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Cart Value</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Lapsed</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {carts.map((cart) => (
                <tr key={cart.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{cart.customer}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cart.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{cart.items} Products</span>
                  </td>
                  <td className="px-6 py-5 text-right text-sm font-black text-slate-800">৳ {cart.value.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
                      <Clock size={14} className="text-slate-300" />
                      {cart.abandonedAt}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      cart.status === "Active" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      {cart.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleRemind(cart.id, cart.customer)}
                        disabled={cart.reminded || loadingId === cart.id}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          cart.reminded 
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-lg shadow-primary/5"
                        }`}
                      >
                        {loadingId === cart.id ? (
                          <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        ) : (
                          <Send size={14} />
                        )}
                        {loadingId === cart.id ? "Sending..." : cart.reminded ? "Sent" : "Remind"}
                      </button>
                      <button 
                        onClick={() => handleDelete(cart.id, cart.customer)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" 
                        title="Dismiss"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })} 
        onConfirm={confirmDelete} 
        itemName={deleteModal.name} 
        itemType="Abandoned Cart"
      />
    </div>
  );
}
