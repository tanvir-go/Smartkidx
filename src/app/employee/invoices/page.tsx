"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Search, 
  Eye, 
  CheckCircle2, 
  Printer, 
  Mail, 
  Building2,
  X,
  CreditCard,
  Download
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface InvoiceItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface Invoice {
  id: string;
  orderId: string;
  date: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  customer: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const MOCK_INVOICES: Invoice[] = [
  { 
    id: "INV-88201", 
    orderId: "ORD-SK-1001", 
    date: "2024-05-13", 
    dueDate: "2024-05-20",
    status: "Paid", 
    customer: {
      name: "Arif Ahmed",
      email: "arif@example.com",
      address: "House 12, Road 4, Banani, Dhaka",
      phone: "+880 1711-223344"
    },
    items: [
      { id: "SKU-101", name: "Advanced Robotics Kit V2", qty: 1, price: 4500 },
      { id: "SKU-105", name: "Extra Servo Motor", qty: 2, price: 500 }
    ],
    subtotal: 5500,
    tax: 275,
    shipping: 120,
    total: 5895
  },
  { 
    id: "INV-88202", 
    orderId: "ORD-SK-1002", 
    date: "2024-05-12", 
    dueDate: "2024-05-19",
    status: "Pending", 
    customer: {
      name: "Sara Khan",
      email: "sara@example.com",
      address: "Flat A4, Green View, Dhanmondi, Dhaka",
      phone: "+880 1811-998877"
    },
    items: [
      { id: "SKU-204", name: "Beginner Electronics Set", qty: 1, price: 2500 }
    ],
    subtotal: 2500,
    tax: 125,
    shipping: 100,
    total: 2725
  },
  { 
    id: "INV-88203", 
    orderId: "ORD-SK-1003", 
    date: "2024-05-10", 
    dueDate: "2024-05-17",
    status: "Overdue", 
    customer: {
      name: "John Doe",
      email: "john@example.com",
      address: "Sector 7, Uttara, Dhaka",
      phone: "+880 1922-334455"
    },
    items: [
      { id: "SKU-301", name: "Solar Powered Car Model", qty: 3, price: 1200 },
      { id: "SKU-302", name: "Chemistry Lab Starter Kit", qty: 1, price: 3000 }
    ],
    subtotal: 6600,
    tax: 330,
    shipping: 150,
    total: 7080
  }
];

export default function EmployeeInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(inv => 
    inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAsPaid = () => {
    if (!activeInvoice) return;
    setInvoices(invoices.map(inv => inv.id === activeInvoice.id ? { ...inv, status: "Paid" } : inv));
    setActiveInvoice({ ...activeInvoice, status: "Paid" });
    toast.success(`Invoice ${activeInvoice.id} marked as Paid.`);
  };

  const handlePrint = () => {
    window.print();
    toast.info("Opening print dialog...");
  };

  const handleSendEmail = () => {
    toast.success(`Invoice sent to ${activeInvoice?.customer.email}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Invoice Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Generate, print, and process customer invoices.</p>
        </div>
      </div>

      {/* List View */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Invoice ID, Order, or Customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm" 
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 shrink-0">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{filteredInvoices.length} Invoices</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Date</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{inv.id}</p>
                          <span className="text-[9px] font-black text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded">{inv.orderId}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{inv.customer.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-700">{new Date(inv.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Due {new Date(inv.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <p className="text-sm font-black text-slate-800">৳ {inv.total.toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">incl. tax</p>
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
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => setActiveInvoice(inv)}
                      className="px-4 py-2 bg-white border border-slate-200 hover:border-primary text-slate-600 hover:text-primary rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm"
                    >
                      View Invoice
                    </button>
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

      {/* Realistic Invoice Modal */}
      <AnimatePresence>
        {activeInvoice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 print:p-0">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm print:hidden" 
              onClick={() => setActiveInvoice(null)} 
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="relative bg-white w-full max-w-4xl rounded-[40px] md:rounded-[48px] shadow-2xl border border-slate-100 flex flex-col max-h-[95vh] print:max-h-none print:h-auto print:rounded-none print:shadow-none print:border-none print:block overflow-hidden"
            >
              
              {/* Modal Actions Header (Hidden in Print) */}
              <div className="p-6 border-b border-slate-100 shrink-0 flex items-center justify-between bg-slate-50 print:hidden">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:border-slate-300 transition-colors shadow-sm text-slate-700"
                  >
                    <Printer size={16}/> Print PDF
                  </button>
                  <button 
                    onClick={handleSendEmail}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <Mail size={16}/> Email Customer
                  </button>
                  {activeInvoice.status !== "Paid" && (
                    <button 
                      onClick={handleMarkAsPaid}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-sm"
                    >
                      <CreditCard size={16}/> Mark Paid
                    </button>
                  )}
                </div>
                <button onClick={() => setActiveInvoice(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              {/* Printable Invoice Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 print:p-0 bg-slate-50/30 print:bg-white">
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0 max-w-3xl mx-auto">
                  
                  {/* Invoice Header */}
                  <div className="flex flex-col md:flex-row justify-between gap-8 mb-12 border-b border-slate-100 pb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                          <Building2 size={20} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-800">SMART<span className="text-primary">KIDS</span></span>
                      </div>
                      <p className="text-xs font-bold text-slate-500">123 Tech Park, Gulshan Avenue</p>
                      <p className="text-xs font-bold text-slate-500">Dhaka 1212, Bangladesh</p>
                      <p className="text-xs font-bold text-slate-500 mt-2">VAT No: 000123456-0101</p>
                    </div>
                    <div className="text-left md:text-right">
                      <h1 className="text-4xl font-black text-slate-200 uppercase tracking-widest mb-2">INVOICE</h1>
                      <p className="text-sm font-black text-slate-800 mb-1">{activeInvoice.id}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date: {new Date(activeInvoice.date).toLocaleDateString()}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due: {new Date(activeInvoice.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Billing Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bill To</p>
                      <h3 className="text-base font-black text-slate-800">{activeInvoice.customer.name}</h3>
                      <p className="text-sm font-bold text-slate-500 mt-1">{activeInvoice.customer.address}</p>
                      <p className="text-sm font-bold text-slate-500">{activeInvoice.customer.phone}</p>
                      <p className="text-sm font-bold text-slate-500">{activeInvoice.customer.email}</p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Payment Status</p>
                      <div className={`inline-block px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 ${
                        activeInvoice.status === "Paid" ? "border-emerald-500 text-emerald-600 bg-emerald-50" :
                        activeInvoice.status === "Pending" ? "border-amber-500 text-amber-600 bg-amber-50" : 
                        "border-rose-500 text-rose-600 bg-rose-50"
                      }`}>
                        {activeInvoice.status}
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Order Ref: {activeInvoice.orderId}</p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="mb-12">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-800">
                          <th className="py-3 text-[10px] font-black text-slate-800 uppercase tracking-widest">Item Description</th>
                          <th className="py-3 text-[10px] font-black text-slate-800 uppercase tracking-widest text-center">Qty</th>
                          <th className="py-3 text-[10px] font-black text-slate-800 uppercase tracking-widest text-right">Price</th>
                          <th className="py-3 text-[10px] font-black text-slate-800 uppercase tracking-widest text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeInvoice.items.map(item => (
                          <tr key={item.id}>
                            <td className="py-4">
                              <p className="text-sm font-bold text-slate-800">{item.name}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase mt-0.5">SKU: {item.id}</p>
                            </td>
                            <td className="py-4 text-center text-sm font-bold text-slate-600">{item.qty}</td>
                            <td className="py-4 text-right text-sm font-bold text-slate-600">৳ {item.price.toLocaleString()}</td>
                            <td className="py-4 text-right text-sm font-black text-slate-800">৳ {(item.qty * item.price).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary */}
                  <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="w-full md:w-1/2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment Instructions</p>
                      <p className="text-xs font-bold text-slate-500">Please make checks payable to SmartKids BD.</p>
                      <p className="text-xs font-bold text-slate-500">Bank: City Bank Ltd, A/C: 1234567890</p>
                    </div>
                    <div className="w-full md:w-1/2 md:max-w-xs space-y-3">
                      <div className="flex justify-between text-sm font-bold text-slate-500">
                        <span>Subtotal</span>
                        <span>৳ {activeInvoice.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-slate-500">
                        <span>VAT/Tax (5%)</span>
                        <span>৳ {activeInvoice.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-slate-500">
                        <span>Shipping</span>
                        <span>৳ {activeInvoice.shipping.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center border-t-2 border-slate-800 pt-3 mt-3">
                        <span className="text-sm font-black text-slate-800 uppercase tracking-widest">Total Due</span>
                        <span className="text-xl font-black text-primary">৳ {activeInvoice.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-100 pt-8 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thank you for your business!</p>
                    <p className="text-xs font-bold text-slate-500 mt-1">If you have any questions about this invoice, please contact support@smartkids.com.bd</p>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
