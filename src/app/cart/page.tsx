"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-8">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-4">Your Cart is Empty</h1>
        <p className="text-slate-500 mb-10 text-center max-w-md">Looks like you haven't added any innovations to your cart yet. Start exploring our latest STEM projects!</p>
        <Link href="/shop" className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Shopping Cart</h1>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{cart.length} Items</span>
              </div>

              <div className="p-8 space-y-8">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-50 last:border-0 last:pb-0"
                    >
                      <div className="w-32 h-32 bg-slate-50 rounded-3xl border border-slate-100 p-2 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>

                      <div className="flex-grow text-center sm:text-left">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{item.category}</p>
                        <Link href={`/product/${item.id}`} className="text-lg font-black text-slate-800 hover:text-primary transition-colors mb-2 block uppercase tracking-tight">
                          {item.name}
                        </Link>
                        <div className="flex items-center justify-center sm:justify-start gap-4">
                          <span className="text-sm font-bold text-slate-400">৳{item.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-black text-slate-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="w-24 text-right hidden sm:block">
                        <p className="text-lg font-black text-slate-900">৳{(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between px-8">
              <Link href="/shop" className="text-sm font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-all flex items-center gap-3 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10 sticky top-32">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-8">Order Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="font-black text-slate-800">৳{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Shipping</span>
                  <span className="font-black text-emerald-500 uppercase tracking-widest">Free</span>
                </div>
                <div className="h-px bg-slate-50"></div>
                <div className="flex items-center justify-between text-lg">
                  <span className="font-black text-slate-800 uppercase tracking-tight">Total Amount</span>
                  <span className="font-black text-slate-900">৳{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-4 group">
                Proceed to Checkout
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4 text-slate-400">
                  <ShieldCheck size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <CreditCard size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Pay on Delivery Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
