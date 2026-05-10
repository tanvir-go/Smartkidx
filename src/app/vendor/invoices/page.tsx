"use client";

import React, { useState } from "react";
import { FileText, Search, FileDown, MoreHorizontal, Eye, CheckCircle2, Download, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import DeleteModal from "@/components/vendor/DeleteModal";
import { exportToCSV } from "@/utils/export";

export default function VendorInvoicesPage() {
  const [invoices, setInvoices] = useState([
    { id: "INV-88201", orderId: "ORD-SK-1001", date: "2023-10-11", amount: 2450, status: "Generated", customer: "Arif Ahmed" },
    { id: "INV-88202", orderId: "ORD-SK-1002", date: "2023-10-12", amount: 1200, status: "Generated", customer: "Sara Khan" },
    { id: "INV-88203", orderId: "ORD-SK-1003", date: "2023-10-13", amount: 4500, status: "Pending", customer: "John Doe" },
    { id: "INV-88204", orderId: "ORD-SK-1004", date: "2023-10-14", amount: 3100, status: "Generated", customer: "Mina Rahman" },
    { id: "INV-88205", orderId: "ORD-SK-1005", date: "2023-10-15", amount: 950, status: "Cancelled", customer: "Tanvir Hasan" },
  ]);

  const [isExporting, setIsExporting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const handleExportCSV = () => {
    exportToCSV(
      invoices,
      ["Invoice ID", "Order ID", "Date", "Customer", "Amount (BDT)", "Status"],
      "Invoices_Export",
      (inv) => [inv.id, inv.orderId, inv.date, inv.customer, inv.amount, inv.status]
    );
  };

  const handleDelete = (id: string) => {
    setDeleteModal({ isOpen: true, id, name: `#${id}` });
  };

  const confirmDelete = () => {
    setInvoices(prev => prev.filter(inv => inv.id !== deleteModal.id));
    toast.success(`Invoice ${deleteModal.name} has been deleted.`);
    setDeleteModal({ isOpen: false, id: "", name: "" });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Invoice Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Download, track, and manage your billing history.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            disabled={isExporting}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group disabled:opacity-70"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            )}
            {isExporting ? "Exporting..." : "Bulk Export CSV"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-sm w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by Invoice ID or Customer..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{invoices.length} Invoices Found</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Reference</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Date</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">#{inv.id}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{inv.customer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">{inv.orderId}</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-500">{new Date(inv.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-6 py-5 text-right text-sm font-black text-slate-800">৳ {inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      inv.status === "Generated" ? "bg-emerald-50 text-emerald-600" :
                      inv.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all" title="View PDF"><Eye size={18} /></button>
                      <button 
                        onClick={() => window.print()}
                        className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all" 
                        title="Print"
                      >
                        <FileDown size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(inv.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" 
                        title="Delete"
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
        itemType="Invoice"
      />
    </div>
  );
}
