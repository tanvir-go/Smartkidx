"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck,
  Package,
  MapPin,
  Phone,
  User,
  Mail,
  Wallet
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success("Order placed successfully!");
    }, 2000);
  };

  if (cart.length === 0 && !isSuccess) {
    router.push("/cart");
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-slate-500 mb-10 text-center max-w-md">Thank you for your order. We've received your request and will process it shortly. You'll receive a confirmation call soon.</p>
        <div className="bg-slate-50 p-8 rounded-[32px] w-full max-w-md border border-slate-100 mb-10">
          <div className="flex justify-between mb-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Order ID</span>
            <span className="text-xs font-black text-slate-800">#SK-{Math.floor(Math.random() * 100000)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Payment Method</span>
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Cash on Delivery</span>
          </div>
          <div className="h-px bg-slate-200 my-4"></div>
          <div className="flex justify-between">
            <span className="text-sm font-black text-slate-800 uppercase tracking-tight">Total Paid</span>
            <span className="text-sm font-black text-primary tracking-tight">৳{cartTotal.toFixed(2)}</span>
          </div>
        </div>
        <Link href="/" className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <Link href="/cart" className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Secure Checkout</h1>
          </div>

          <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12">
            {/* Left: Billing Details */}
            <div className="lg:w-2/3 space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Truck size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Shipping Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input required type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-black focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input required type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-black focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Full Address</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input required type="text" placeholder="Street name, House, Apartment" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-black focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input required type="tel" placeholder="+880 1234 567890" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-black focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">City</label>
                    <select className="w-full px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-black focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Sylhet</option>
                      <option>Rajshahi</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <div 
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-slate-50 hover:border-slate-100"}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-primary bg-primary" : "border-slate-200"}`}>
                        {paymentMethod === "cod" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 uppercase tracking-tight">Cash on Delivery (COD)</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Pay when you receive your order</p>
                      </div>
                    </div>
                    <Wallet size={24} className={paymentMethod === "cod" ? "text-primary" : "text-slate-200"} />
                  </div>

                  <div 
                    className="p-6 rounded-3xl border-2 border-slate-50 opacity-40 cursor-not-allowed flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center">
                      </div>
                      <div>
                        <p className="font-black text-slate-800 uppercase tracking-tight">Online Payment</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Credit Card / Mobile Banking (Coming Soon)</p>
                      </div>
                    </div>
                    <CreditCard size={24} className="text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10 sticky top-32">
                <div className="flex items-center gap-4 mb-8">
                  <Package size={20} className="text-slate-400" />
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Summary</h2>
                </div>

                <div className="space-y-4 mb-10 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 p-1 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <p className="text-xs font-bold text-slate-800 truncate uppercase tracking-tight">{item.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.quantity} x ৳{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 mb-10 pt-6 border-t border-slate-50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                    <span className="font-black text-slate-800">৳{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-400 uppercase tracking-widest">Shipping Fee</span>
                    <span className="font-black text-emerald-500 uppercase tracking-widest">Free</span>
                  </div>
                  <div className="h-px bg-slate-50"></div>
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-black text-slate-800 uppercase tracking-tight">Total Amount</span>
                    <span className="font-black text-primary tracking-tight">৳{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Place Order (COD)"}
                </button>

                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest mt-6">By placing this order you agree to our Terms of Service</p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
