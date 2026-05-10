"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Printer, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  X,
  CreditCard,
  Calendar,
  User,
  ChevronRight,
  Hash
} from "lucide-react";
import { exportToCSV } from "@/utils/export";
import { toast } from "react-toastify";

export default function InvoicesPage() {
  const [invoiceList, setInvoiceList] = useState([
    { id: "#INV-9001", order: "#ORD-9823", customer: "John Doe", amount: 150.00, date: "Oct 24, 2023", status: "Paid" },
    { id: "#INV-9002", order: "#ORD-9712", customer: "Jane Smith", amount: 45.00, date: "Oct 25, 2023", status: "Unpaid" },
    { id: "#INV-9003", order: "#ORD-9645", customer: "Mike Johnson", amount: 280.00, date: "Oct 25, 2023", status: "Paid" },
    { id: "#INV-9004", order: "#ORD-9588", customer: "Sarah Williams", amount: 85.00, date: "Oct 26, 2023", status: "Overdue" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: "",
    amount: 0,
    status: "Unpaid"
  });

  const handleOpenEdit = (inv: any) => {
    setEditingInvoice(inv);
    setFormData({
      id: inv.id,
      amount: inv.amount,
      status: inv.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || formData.amount <= 0) {
      toast.error("Please provide valid invoice information");
      return;
    }

    setInvoiceList(invoiceList.map(inv => 
      inv.id === editingInvoice.id ? { ...inv, ...formData } : inv
    ));

    toast.success("Invoice record updated!");
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this invoice record?")) {
      setInvoiceList(invoiceList.filter(inv => inv.id !== id));
      toast.success("Invoice purged from system.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Invoice Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Generate and track billing invoices for all orders.</p>
        </div>
        <button 
          onClick={() => exportToCSV(
            invoiceList, 
            ["Invoice ID", "Order ID", "Customer", "Amount", "Date", "Status"], 
            "Invoices_Export",
            (i) => [i.id, i.order, i.customer, i.amount, i.date, i.status]
          )}
          className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <Download size={18} /> Batch Export
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative flex-grow max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by invoice ID or order..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice Details</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {invoiceList.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase leading-none group-hover:text-primary transition-colors">{inv.id}</p>
                        <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-widest">{inv.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase tracking-tight">{inv.order}</td>
                  <td className="px-8 py-6 text-[11px] font-black text-slate-800 uppercase tracking-widest">{inv.customer}</td>
                  <td className="px-8 py-6 text-[11px] font-black text-slate-800 tracking-tighter text-lg">৳ {inv.amount.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      inv.status === "Paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                      inv.status === "Unpaid" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all" title="View Details"><Eye size={18} /></button>
                      <button onClick={() => handleOpenEdit(inv)} className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Edit Invoice"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(inv.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Delete Record"><Trash2 size={18} /></button>
                      <button onClick={() => window.print()} className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Print Invoice"><Printer size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl border border-slate-100 p-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Update Invoice Payload</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Billing Authority Console</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Invoice ID *</label>
                <div className="relative">
                  <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Billed Amount (৳)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm">৳</span>
                  <input 
                    type="number" 
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Billing Status</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Paid", "Unpaid", "Overdue"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({...formData, status})}
                      className={`py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        formData.status === status 
                          ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200" 
                          : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 mt-4 flex items-center justify-center gap-2"
              >
                Sync Invoice Record <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
