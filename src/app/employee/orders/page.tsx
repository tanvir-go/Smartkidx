"use client";

import React, { useState } from "react";
import { 
  ShoppingCart, Search, Filter, MoreHorizontal, Eye, X, Package, Truck, 
  MapPin, User, CreditCard, Clock, CheckCircle2, ChevronRight, Hash, 
  FileText, Calendar, ShieldCheck, Mail, Phone, Download
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { exportToCSV } from "@/utils/export";

export default function EmployeeOrdersPage() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<'details' | 'track' | null>(null);

  const [orders, setOrders] = useState([
    { 
      id: "#ORD-SK-1001", 
      customer: "Alice Johnson", 
      email: "alice@example.com",
      phone: "+880 1712 345678",
      address: "House 24, Road 7, Dhanmondi, Dhaka",
      total: "৳ 3,250", 
      status: "Pending", 
      method: "Cash on Delivery",
      date: "2023-10-11 14:30",
      items: [
        { name: "Robotics Starter Kit", price: 2500, qty: 1 },
        { name: "Electronic Clock", price: 750, qty: 1 }
      ],
      tracking: [
        { status: "Order Placed", time: "Oct 11, 2023 14:30", done: true },
        { status: "Payment Confirmed", time: "Oct 11, 2023 15:00", done: true },
        { status: "Processing", time: "In Progress", done: false },
        { status: "Shipped", time: "Pending", done: false },
        { status: "Delivered", time: "Pending", done: false }
      ]
    },
    { 
      id: "#ORD-SK-1002", 
      customer: "Rafiq Islam", 
      email: "rafiq@gmail.com",
      phone: "+880 1812 445566",
      address: "Flat 4B, Skyview Tower, Agrabad, Chittagong",
      total: "৳ 1,500", 
      status: "Delivered", 
      method: "Online Payment",
      date: "2023-10-12 10:15",
      items: [
        { name: "STEM Solar Car", price: 1200, qty: 1 },
        { name: "DIY Drone Propeller", price: 300, qty: 1 }
      ],
      tracking: [
        { status: "Order Placed", time: "Oct 12, 2023 10:15", done: true },
        { status: "Payment Confirmed", time: "Oct 12, 2023 10:20", done: true },
        { status: "Processing", time: "Oct 12, 2023 14:00", done: true },
        { status: "Shipped", time: "Oct 13, 2023 09:00", done: true },
        { status: "Delivered", time: "Oct 14, 2023 16:30", done: true }
      ]
    },
    { 
      id: "#ORD-SK-1003", 
      customer: "Sumi Akter", 
      email: "sumi.akter@outlook.com",
      phone: "+880 1912 778899",
      address: "Village: Bashantapur, PO: Kaliganj, Satkhira",
      total: "৳ 2,400", 
      status: "Processing", 
      method: "Cash on Delivery",
      date: "2023-10-13 11:45",
      items: [
        { name: "Smart Lamp Project", price: 1800, qty: 1 },
        { name: "Extra Jumper Wires", price: 600, qty: 1 }
      ],
      tracking: [
        { status: "Order Placed", time: "Oct 13, 2023 11:45", done: true },
        { status: "Payment Confirmed", time: "Oct 13, 2023 12:00", done: true },
        { status: "Processing", time: "Oct 13, 2023 15:30", done: true },
        { status: "Shipped", time: "In Progress", done: false },
        { status: "Delivered", time: "Pending", done: false }
      ]
    },
    { 
      id: "#ORD-SK-1004", 
      customer: "John Doe", 
      email: "john.doe@tech.com",
      phone: "+880 1512 001122",
      address: "Road 4, Sector 11, Uttara, Dhaka",
      total: "৳ 5,600", 
      status: "Delivered", 
      method: "Online Payment",
      date: "2023-10-14 09:00",
      items: [
        { name: "DIY Drone Kit Full", price: 4500, qty: 1 },
        { name: "Extra Lipo Battery", price: 1100, qty: 1 }
      ],
      tracking: [
        { status: "Order Placed", time: "Oct 14, 2023 09:00", done: true },
        { status: "Payment Confirmed", time: "Oct 14, 2023 09:30", done: true },
        { status: "Processing", time: "Oct 14, 2023 11:00", done: true },
        { status: "Shipped", time: "Oct 14, 2023 15:00", done: true },
        { status: "Delivered", time: "Oct 15, 2023 11:30", done: true }
      ]
    },
  ]);

  const filteredOrders = activeTab === 'All Orders' 
    ? orders 
    : orders.filter(o => o.status === activeTab);

  const handleOpenDetails = (order: any) => {
    setSelectedOrder(order);
    setActiveModal('details');
  };

  const handleOpenTrack = (order: any) => {
    setSelectedOrder(order);
    setActiveModal('track');
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  const handleExport = () => {
    exportToCSV(
      orders,
      ["Order ID", "Customer", "Date", "Items", "Total Amount", "Payment Method", "Status"],
      "Employee_Orders_Export",
      (order) => [order.id, order.customer, order.date, order.items.length, order.total, order.method, order.status]
    );
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: any = {
      'Pending': 'bg-amber-50 text-amber-600 border-amber-100',
      'Processing': 'bg-blue-50 text-blue-600 border-blue-100',
      'Delivered': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'Cancelled': 'bg-red-50 text-red-600 border-red-100'
    };
    return (
      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${colors[status] || 'bg-slate-100 text-slate-500'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Manage Orders</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Control, track and analyze your sales lifecycle.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => <div key={i} className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-tighter">SK</div>)}
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download size={16} /> Export Sales CSV
          </button>
          <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 animate-pulse">
            Live Feed Active
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 overflow-x-auto pb-1 scrollbar-hide">
        {['All Orders', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 text-[11px] font-black uppercase tracking-widest transition-all border-b-4 whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-t-2xl'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
          <div className="relative max-w-md w-full">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by Order ID, Customer or SKU..." className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[28px] text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" />
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => toast.info("Filters coming soon...")} className="p-4 text-slate-400 hover:text-primary bg-white border border-slate-100 rounded-2xl transition-all shadow-sm">
                <Filter size={20} />
             </button>
             <div className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200">
               Total: {filteredOrders.length}
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Reference</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lifecycle</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-3xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:scale-110 transition-transform duration-500">
                          <Package size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{order.id}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{order.date}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                     <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-slate-700 uppercase tracking-tight">{order.customer}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5"><MapPin size={10} /> Bangladesh</p>
                     </div>
                  </td>
                  <td className="px-8 py-7">
                     <div className="flex flex-col gap-1">
                        <p className="text-sm font-black text-slate-800">{order.total}</p>
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">{order.method}</p>
                     </div>
                  </td>
                  <td className="px-8 py-7">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => handleOpenDetails(order)}
                         className="px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/5 transition-all flex items-center gap-2 group/btn"
                       >
                         <Eye size={14} className="group-hover/btn:scale-110 transition-transform" /> Details
                       </button>
                       <button 
                         onClick={() => handleOpenTrack(order)}
                         className="px-6 py-2.5 bg-slate-900 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all flex items-center gap-2 group/btn"
                       >
                         <Truck size={14} className="group-hover/btn:translate-x-1 transition-transform" /> Track
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center">
                     <div className="flex flex-col items-center gap-4 opacity-30">
                        <ShoppingCart size={64} className="text-slate-300" />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">No orders match the current filter protocols.</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Track Modals */}
      <AnimatePresence>
        {activeModal && selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
              onClick={closeModal}
            />
            
            {activeModal === 'details' ? (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-white w-full max-w-4xl h-[85vh] rounded-[48px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col border border-white/20"
              >
                {/* Header */}
                <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Order Manifesto</h3>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Registry ID: {selectedOrder.id}</p>
                    </div>
                  </div>
                  <button onClick={closeModal} className="p-4 hover:bg-slate-100 rounded-3xl transition-colors group">
                    <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                  {/* Summary Grid */}
                  <div className="grid grid-cols-3 gap-8">
                     <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                           <User size={18} />
                           <p className="text-[10px] font-black uppercase tracking-widest">Customer Intel</p>
                        </div>
                        <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{selectedOrder.customer}</h4>
                        <p className="text-slate-400 text-xs font-bold mt-2 flex items-center gap-2"><Mail size={12} /> {selectedOrder.email}</p>
                        <p className="text-slate-400 text-xs font-bold mt-1 flex items-center gap-2"><Phone size={12} /> {selectedOrder.phone}</p>
                     </div>
                     <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                        <div className="flex items-center gap-3 mb-4 text-emerald-500">
                           <CreditCard size={18} />
                           <p className="text-[10px] font-black uppercase tracking-widest">Financials</p>
                        </div>
                        <h4 className="text-3xl font-black text-slate-800 tracking-tighter">{selectedOrder.total}</h4>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-3 flex items-center gap-2">
                           <ShieldCheck size={12} className="text-emerald-400" /> {selectedOrder.method}
                        </p>
                     </div>
                     <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                        <div className="flex items-center gap-3 mb-4 text-amber-500">
                           <MapPin size={18} />
                           <p className="text-[10px] font-black uppercase tracking-widest">Destination</p>
                        </div>
                        <p className="text-slate-800 text-xs font-bold leading-relaxed">{selectedOrder.address}</p>
                        <div className="mt-4 pt-4 border-t border-slate-200">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shipping Logic: Standard Delivery</p>
                        </div>
                     </div>
                  </div>

                  {/* Line Items */}
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-3">
                           <Hash size={18} className="text-primary" /> Manifest Inventory
                        </h4>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedOrder.items.length} Units</span>
                     </div>
                     <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="bg-slate-50/50">
                                 <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Product Specification</th>
                                 <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Quantity</th>
                                 <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Unit Price</th>
                                 <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Sum</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-50">
                              {selectedOrder.items.map((item: any, idx: number) => (
                                 <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                       <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                             <Package size={18} />
                                          </div>
                                          <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">{item.name}</p>
                                       </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-sm font-black text-slate-400">x{item.qty}</td>
                                    <td className="px-8 py-5 text-right text-sm font-bold text-slate-700">৳ {item.price.toLocaleString()}</td>
                                    <td className="px-8 py-5 text-right text-sm font-black text-slate-900">৳ {(item.price * item.qty).toLocaleString()}</td>
                                 </tr>
                              ))}
                           </tbody>
                           <tfoot>
                              <tr className="bg-slate-50/30">
                                 <td colSpan={3} className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Grand Total Payload</td>
                                 <td className="px-8 py-5 text-right text-lg font-black text-primary">{selectedOrder.total}</td>
                              </tr>
                           </tfoot>
                        </table>
                     </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                   <div className="flex items-center gap-4 text-slate-400">
                      <Clock size={16} />
                      <p className="text-[10px] font-black uppercase tracking-widest italic">Last Synced: Just Now</p>
                   </div>
                   <div className="flex gap-4">
                      <button onClick={closeModal} className="px-10 py-4 bg-white border border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-50 transition-all">Close</button>
                      <button 
                        onClick={() => window.print()}
                        className="px-14 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-2"
                      >
                        <FileText size={16} /> Generate Invoice PDF
                      </button>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-[48px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col border border-white/20 p-12"
              >
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-3xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                         <Truck size={28} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Logistic Tracker</h3>
                         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Real-time status synchronization</p>
                      </div>
                   </div>
                   <button onClick={closeModal} className="p-4 hover:bg-slate-100 rounded-3xl transition-colors">
                      <X size={24} className="text-slate-400" />
                   </button>
                </div>

                <div className="space-y-0 relative">
                   {/* Vertical Line */}
                   <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 rounded-full" />
                   
                   {selectedOrder.tracking.map((step: any, idx: number) => (
                      <div key={idx} className="relative flex items-start gap-8 pb-12 last:pb-0">
                         <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${
                            step.done ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'bg-white border-4 border-slate-100 text-slate-200'
                         }`}>
                            {step.status === 'Order Placed' && <Calendar size={20} />}
                            {step.status === 'Payment Confirmed' && <CreditCard size={20} />}
                            {step.status === 'Processing' && <Clock size={20} />}
                            {step.status === 'Shipped' && <Truck size={20} />}
                            {step.status === 'Delivered' && <CheckCircle2 size={20} />}
                         </div>
                         <div className="pt-2">
                            <h4 className={`text-sm font-black uppercase tracking-widest ${step.done ? 'text-slate-800' : 'text-slate-300'}`}>{step.status}</h4>
                            <p className={`text-[11px] font-bold mt-1 ${step.done ? 'text-slate-500' : 'text-slate-300'}`}>{step.time}</p>
                            {step.time === 'In Progress' && (
                               <div className="mt-3 flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-lg w-fit animate-pulse">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Active Processing</span>
                               </div>
                            )}
                         </div>
                      </div>
                   ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                         <ShieldCheck size={18} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Secure Shipment</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Protocol Version 4.2</p>
                      </div>
                   </div>
                   <button onClick={closeModal} className="px-12 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                      Dismiss Tracker
                   </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
