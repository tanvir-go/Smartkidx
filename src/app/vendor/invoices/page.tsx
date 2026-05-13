"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Search, 
  Eye, 
  CheckCircle2, 
  Download, 
  Settings,
  X,
  Building2,
  Save
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { exportToCSV } from "@/utils/export";

interface Invoice {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  customer: string;
  branch: string;
}

const MOCK_INVOICES: Invoice[] = [
  { id: "INV-88201", orderId: "ORD-SK-1001", date: "2024-05-13", amount: 5895, status: "Paid", customer: "Arif Ahmed", branch: "Dhaka Branch" },
  { id: "INV-88202", orderId: "ORD-SK-1002", date: "2024-05-12", amount: 2725, status: "Pending", customer: "Sara Khan", branch: "Dhaka Branch" },
  { id: "INV-88203", orderId: "ORD-SK-1003", date: "2024-05-10", amount: 7080, status: "Overdue", customer: "John Doe", branch: "Chittagong Branch" },
  { id: "INV-88204", orderId: "ORD-SK-1004", date: "2024-05-09", amount: 1500, status: "Paid", customer: "Mina Rahman", branch: "Sylhet Branch" },
];

export default function VendorInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Template Settings State
  const [templateSettings, setTemplateSettings] = useState({
    businessName: "SmartKids BD",
    vatNumber: "000123456-0101",
    taxRate: 5,
    footerNotes: "Thank you for your business! If you have any questions, contact support@smartkids.com.bd",
    bankDetails: "Bank: City Bank Ltd, A/C: 1234567890"
  });

  const filteredInvoices = invoices.filter(inv => 
    inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportToCSV(
        filteredInvoices,
        ["Invoice ID", "Order ID", "Date", "Customer", "Branch", "Amount (BDT)", "Status"],
        "Vendor_Invoices_Export",
        (inv) => [inv.id, inv.orderId, inv.date, inv.customer, inv.branch, inv.amount, inv.status]
      );
      setIsExporting(false);
    }, 800);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Invoice template settings updated globally for all branches.");
    setIsSettingsOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Invoice Analytics</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Track global billing and configure employee invoice templates.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:border-primary hover:text-primary transition-all shadow-sm flex items-center gap-2"
          >
            <Settings size={16} /> Template Settings
          </button>
          <button 
            onClick={handleExportCSV}
            disabled={isExporting || filteredInvoices.length === 0}
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

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Billed</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-1">৳ 17,200</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <FileText size={24} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Collected (Paid)</p>
            <h3 className="text-3xl font-black text-emerald-500 tracking-tight mt-1">৳ 7,395</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending / Overdue</p>
            <h3 className="text-3xl font-black text-rose-500 tracking-tight mt-1">৳ 9,805</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
            <X size={24} />
          </div>
        </div>
      </div>

      {/* List View */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, or Branch..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Branch Source</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Date</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{inv.id}</p>
                          <span className="text-[9px] font-black text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded">{inv.orderId}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{inv.customer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Building2 size={12} className="text-slate-400"/> {inv.branch}</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-700">{new Date(inv.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <p className="text-sm font-black text-slate-800">৳ {inv.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-max ${
                      inv.status === "Paid" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      inv.status === "Pending" ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                      "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}>
                      {inv.status === "Paid" ? <CheckCircle2 size={12}/> : inv.status === "Pending" ? <FileText size={12}/> : <X size={12}/>}
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <FileText size={48} className="mx-auto text-slate-300 mb-4 opacity-50" />
                    <p className="text-sm font-bold text-slate-500">No invoices found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Template Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
            
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden max-h-[90vh]">
              
              <div className="p-8 border-b border-slate-100 shrink-0 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <Settings size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Invoice Template Config</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Applies globally to all branch invoices</p>
                  </div>
                </div>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <form id="template-form" onSubmit={handleSaveSettings} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={templateSettings.businessName} 
                        onChange={(e) => setTemplateSettings({...templateSettings, businessName: e.target.value})} 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">VAT/Registration Number *</label>
                      <input 
                        type="text" 
                        required 
                        value={templateSettings.vatNumber} 
                        onChange={(e) => setTemplateSettings({...templateSettings, vatNumber: e.target.value})} 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Tax Rate (%) *</label>
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      required 
                      value={templateSettings.taxRate} 
                      onChange={(e) => setTemplateSettings({...templateSettings, taxRate: parseInt(e.target.value) || 0})} 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bank Payment Details</label>
                    <textarea 
                      value={templateSettings.bankDetails} 
                      onChange={(e) => setTemplateSettings({...templateSettings, bankDetails: e.target.value})} 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all min-h-[100px] resize-y" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Footer Notes / Terms & Conditions</label>
                    <textarea 
                      value={templateSettings.footerNotes} 
                      onChange={(e) => setTemplateSettings({...templateSettings, footerNotes: e.target.value})} 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all min-h-[100px] resize-y" 
                    />
                  </div>

                </form>
              </div>

              <div className="p-8 border-t border-slate-100 shrink-0 bg-slate-50 flex justify-end gap-4">
                <button type="button" onClick={() => setIsSettingsOpen(false)} className="px-8 py-4 bg-white border border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-slate-100 transition-all">Cancel</button>
                <button type="submit" form="template-form" className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                  <Save size={16} /> Save Configuration
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
