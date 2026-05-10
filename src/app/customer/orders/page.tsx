"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  ChevronRight, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  X,
  MapPin,
  Calendar,
  CreditCard,
  Search,
  ArrowLeft,
  FileText
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ordersData = [
  { 
    id: "#SK-9823", 
    date: "Oct 24, 2023", 
    itemsCount: 3, 
    total: "৳ 4,500", 
    status: "In Transit", 
    icon: <Truck size={20} className="text-blue-500" />, 
    color: "text-blue-600", 
    bg: "bg-blue-50",
    paymentMethod: "Online Payment",
    address: "Apt 4B, 12/A Road, Dhanmondi, Dhaka",
    items: [
      { name: "Robotics Starter Kit", price: 2500, qty: 1, img: "R" },
      { name: "DIY Drone Parts", price: 1200, qty: 1, img: "D" },
      { name: "Sensor Module Pack", price: 800, qty: 1, img: "S" }
    ],
    timeline: [
      { title: "Order Confirmed", desc: "We have received your order", time: "Oct 24, 10:30 AM", done: true },
      { title: "Shipped", desc: "Your package is on its way", time: "Oct 25, 02:15 PM", done: true },
      { title: "In Transit", desc: "Arrived at local hub", time: "Oct 26, 09:00 AM", done: true },
      { title: "Delivered", desc: "Pending delivery", time: "Est. Oct 27", done: false }
    ]
  },
  { 
    id: "#SK-9712", 
    date: "Oct 12, 2023", 
    itemsCount: 1, 
    total: "৳ 1,200", 
    status: "Delivered", 
    icon: <CheckCircle2 size={20} className="text-emerald-500" />, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50",
    paymentMethod: "Cash on Delivery",
    address: "House 56, Sector 7, Uttara, Dhaka",
    items: [
      { name: "STEM Solar Car", price: 1200, qty: 1, img: "C" }
    ],
    timeline: [
      { title: "Order Confirmed", desc: "We have received your order", time: "Oct 12, 11:00 AM", done: true },
      { title: "Shipped", desc: "Your package is on its way", time: "Oct 13, 03:45 PM", done: true },
      { title: "Delivered", desc: "Package received by customer", time: "Oct 15, 10:20 AM", done: true }
    ]
  },
  { 
    id: "#SK-9645", 
    date: "Sep 28, 2023", 
    itemsCount: 5, 
    total: "৳ 8,950", 
    status: "Delivered", 
    icon: <CheckCircle2 size={20} className="text-emerald-500" />, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50",
    paymentMethod: "Online Payment",
    address: "Flat 2D, Building 4, Nasirabad, Chittagong",
    items: [
      { name: "Advanced Robotics Kit", price: 5500, qty: 1, img: "A" },
      { name: "Servo Motor x4", price: 2000, qty: 1, img: "M" },
      { name: "Arduino Uno", price: 1450, qty: 1, img: "U" }
    ],
    timeline: [
      { title: "Delivered", desc: "Package received", time: "Sep 30, 04:30 PM", done: true }
    ]
  },
  { 
    id: "#SK-9588", 
    date: "Sep 15, 2023", 
    itemsCount: 2, 
    total: "৳ 2,100", 
    status: "Cancelled", 
    icon: <Clock size={20} className="text-slate-400" />, 
    color: "text-slate-400", 
    bg: "bg-slate-50",
    paymentMethod: "Online Payment",
    address: "Road 1, Block B, Sylhet",
    items: [
      { name: "Intro to STEM Kit", price: 2100, qty: 1, img: "I" }
    ],
    timeline: [
      { title: "Cancelled", desc: "Order was cancelled per request", time: "Sep 16, 09:00 AM", done: true }
    ]
  },
];

export default function CustomerOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<'details' | 'track' | null>(null);

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

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">My Orders</h2>
          <p className="text-slate-500 text-sm mt-1">Check the status of your orders and view order history.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
          Last updated: Today, 10:45 AM
        </div>
      </div>

      <div className="space-y-6">
        {ordersData.map((order) => (
          <div key={order.id} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 transition-all group overflow-hidden relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-[24px] ${order.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  {order.icon}
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{order.id}</h3>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.bg} ${order.color} border border-current opacity-70`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
                     <Calendar size={12} /> Placed on {order.date} <span className="opacity-30">•</span> {order.itemsCount} Items
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-8 md:gap-12 pt-6 md:pt-0 border-t md:border-t-0 border-slate-50">
                <div className="text-left md:text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grand Total</p>
                  <p className="text-2xl font-black text-slate-800 mt-1 tracking-tight">{order.total}</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleOpenDetails(order)}
                    className="flex-1 md:flex-none px-8 py-4 bg-slate-50 text-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => handleOpenTrack(order)}
                    className="flex-1 md:flex-none px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group/btn"
                  >
                    Track <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* In-Card Progress Preview */}
            {order.status === "In Transit" && (
              <div className="mt-10 pt-8 border-t border-slate-50 relative">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Active Dispatch Log</p>
                   </div>
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                      Estimated Arrival: <span className="text-slate-800">Tomorrow</span>
                   </p>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: "65%" }} 
                     transition={{ duration: 1.5, ease: "easeOut" }}
                     className="absolute top-0 left-0 h-full bg-primary rounded-full shadow-[0_0_12px_rgba(255,107,0,0.4)]" 
                   />
                </div>
                <div className="flex justify-between mt-4">
                  {["Confirmed", "Shipped", "In Transit", "Delivered"].map((step, idx) => (
                    <span key={step} className={`text-[9px] font-black uppercase tracking-widest ${idx <= 2 ? 'text-primary' : 'text-slate-300'}`}>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
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
                className="relative bg-white w-full max-w-4xl h-[85vh] rounded-[48px] shadow-2xl overflow-hidden flex flex-col border border-white/20"
              >
                {/* Header */}
                <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      <ShoppingBag size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Order Manifesto</h3>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Registry Code: {selectedOrder.id}</p>
                    </div>
                  </div>
                  <button onClick={closeModal} className="p-4 hover:bg-slate-100 rounded-3xl transition-colors group">
                    <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     {/* Info Blocks */}
                     <div className="space-y-8">
                        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                           <div className="flex items-center gap-3 mb-5 text-primary">
                              <MapPin size={18} />
                              <p className="text-[10px] font-black uppercase tracking-widest">Shipping Destination</p>
                           </div>
                           <p className="text-sm font-bold text-slate-800 leading-relaxed uppercase tracking-tight">{selectedOrder.address}</p>
                           <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-4">Standard Transit Logistics</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                           <div className="flex items-center gap-3 mb-5 text-blue-500">
                              <CreditCard size={18} />
                              <p className="text-[10px] font-black uppercase tracking-widest">Payment Protocol</p>
                           </div>
                           <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{selectedOrder.paymentMethod}</h4>
                           <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                              <CheckCircle2 size={12} /> Transaction Verified
                           </p>
                        </div>
                     </div>

                     {/* Item Summary */}
                     <div className="p-10 border-2 border-slate-50 rounded-[48px] h-fit">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                           <Package size={16} className="text-primary" /> Package Inventory
                        </h4>
                        <div className="space-y-6">
                           {selectedOrder.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-lg uppercase">{item.img}</div>
                                    <div>
                                       <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{item.name}</p>
                                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.qty}</p>
                                    </div>
                                 </div>
                                 <p className="text-sm font-black text-slate-800">৳ {item.price.toLocaleString()}</p>
                              </div>
                           ))}
                        </div>
                        <div className="mt-10 pt-8 border-t-2 border-slate-50 space-y-4">
                           <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <span>Shipping</span>
                              <span>Free</span>
                           </div>
                           <div className="flex justify-between items-center pt-2">
                              <span className="text-sm font-black text-slate-800 uppercase tracking-widest">Grand Total</span>
                              <span className="text-2xl font-black text-primary tracking-tighter">{selectedOrder.total}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                   <div className="flex items-center gap-4 text-slate-400">
                      <FileText size={18} />
                      <p className="text-[10px] font-black uppercase tracking-widest italic">Digital Invoice Verified</p>
                   </div>
                   <div className="flex gap-4">
                      <button onClick={closeModal} className="px-12 py-4 bg-white border border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-50 transition-all shadow-sm">Dismiss</button>
                      <button 
                        onClick={() => window.print()}
                        className="px-12 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                      >
                        Download Receipt
                      </button>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-white w-full max-w-xl rounded-[48px] shadow-2xl p-12 border border-white/20"
              >
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-slate-900 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-slate-200">
                         <Truck size={32} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Live Logistics</h3>
                         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Order ID: {selectedOrder.id}</p>
                      </div>
                   </div>
                   <button onClick={closeModal} className="p-4 hover:bg-slate-100 rounded-3xl transition-colors group">
                      <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform" />
                   </button>
                </div>

                <div className="relative space-y-0">
                   {/* Vertical Line */}
                   <div className="absolute left-[31px] top-6 bottom-6 w-1 bg-slate-100 rounded-full" />
                   
                   {selectedOrder.timeline.map((step: any, idx: number) => (
                      <div key={idx} className="relative flex items-start gap-10 pb-12 last:pb-0">
                         <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 z-10 transition-all duration-700 ${
                            step.done ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110' : 'bg-white border-4 border-slate-100 text-slate-200'
                         }`}>
                            {step.title === "Order Confirmed" && <Calendar size={24} />}
                            {step.title === "Shipped" && <Package size={24} />}
                            {step.title === "In Transit" && <Truck size={24} />}
                            {step.title === "Delivered" && <CheckCircle2 size={24} />}
                         </div>
                         <div className="pt-3">
                            <h4 className={`text-sm font-black uppercase tracking-widest ${step.done ? 'text-slate-800' : 'text-slate-300'}`}>{step.title}</h4>
                            <p className={`text-[11px] font-bold mt-1 ${step.done ? 'text-slate-500' : 'text-slate-300'}`}>{step.desc}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{step.time}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <button onClick={closeModal} className="w-full mt-12 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-[28px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                   Return to Hub
                </button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Empty State Mock */}
      {ordersData.length === 0 && (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-16 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">No orders yet</h3>
          <p className="text-slate-500 text-sm mt-2 mb-8">Start exploring our amazing Robotics & STEM kits today!</p>
          <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
