"use client";

import React, { useState } from "react";
import { Monitor, Search, Plus, Minus, Trash2, CreditCard, Wallet, User } from "lucide-react";

export default function EmployeePOSPage() {
  const [cart, setCart] = useState([
    { id: 1, name: "Robotic Arm Kit", price: 2500, qty: 1 },
    { id: 2, name: "Solar Car STEM", price: 1200, qty: 2 },
  ]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-160px)]">
      {/* Left: Product Selection */}
      <div className="xl:w-2/3 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Scan barcode or search products..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <Search size={20} />
          </button>
        </div>

        <div className="flex-grow bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-y-auto custom-scrollbar">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
             {[1, 2, 3, 4, 5, 6].map((i) => (
               <button key={i} className="flex flex-col text-left group">
                 <div className="aspect-square bg-slate-50 rounded-3xl mb-3 border border-slate-100 group-hover:border-primary transition-all overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-slate-300">Product {i}</div>
                 </div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Electronics</p>
                 <p className="text-xs font-black text-slate-800 uppercase leading-tight line-clamp-1 mb-1">Robotics Kit Pro {i}</p>
                 <p className="text-xs font-black text-primary">৳ 1,500</p>
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Right: Cart & Checkout */}
      <div className="xl:w-1/3 flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden h-full">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Current Sale</h3>
          <button className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto custom-scrollbar space-y-4">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
              <User size={18} />
            </div>
            <div className="flex-grow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</p>
              <p className="text-xs font-bold text-slate-800">Walk-in Customer</p>
            </div>
            <button className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-all"><Plus size={18} /></button>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div className="flex-grow min-w-0">
                <p className="text-xs font-black text-slate-800 uppercase truncate leading-none mb-1">{item.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">৳ {item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                 <button className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"><Minus size={14} /></button>
                 <span className="text-xs font-black text-slate-800 w-4 text-center">{item.qty}</span>
                 <button className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"><Plus size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
              <span className="font-black text-slate-800">৳ {subtotal}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-widest">Tax (0%)</span>
              <span className="font-black text-slate-800">৳ 0</span>
            </div>
            <div className="h-px bg-slate-200 my-4"></div>
            <div className="flex justify-between text-xl">
              <span className="font-black text-slate-800 uppercase tracking-tight">Total</span>
              <span className="font-black text-primary">৳ {subtotal}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl hover:border-primary hover:text-primary transition-all group">
              <Wallet size={20} className="text-slate-400 group-hover:text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">Cash</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl hover:border-primary hover:text-primary transition-all group">
              <CreditCard size={20} className="text-slate-400 group-hover:text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">Card</span>
            </button>
          </div>

          <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-xl shadow-slate-200">
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
}
