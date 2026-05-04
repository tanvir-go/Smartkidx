"use client";

import React from "react";
import { RotateCcw, Package, Truck, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ReturnsPage() {
  const steps = [
    {
      icon: <Package className="text-primary" />,
      title: "Check Condition",
      description: "Ensure the item is in its original packaging with all components and manuals."
    },
    {
      icon: <AlertCircle className="text-primary" />,
      title: "Contact Support",
      description: "Send an email to returns@smartkidx.com with your order ID and reason for return."
    },
    {
      icon: <Truck className="text-primary" />,
      title: "Ship Back",
      description: "Once approved, ship the item back to our hub using a tracked courier service."
    },
    {
      icon: <CheckCircle2 className="text-primary" />,
      title: "Get Refund",
      description: "After inspection, we will process your refund or exchange within 3-5 business days."
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-slate-50 py-24 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              Customer Satisfaction
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter mb-6">
              Returns & <span className="text-primary">Exchanges</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg italic leading-relaxed">
              Not happy with your STEM kit? No problem. Our 7-day hassle-free return policy ensures you can shop with absolute confidence.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Policy Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6">
                <Clock className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase mb-2">7 Days Window</h3>
              <p className="text-slate-500 text-sm font-medium italic">Return any item within 7 days of delivery for a full refund.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6">
                <RotateCcw className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase mb-2">Easy Exchange</h3>
              <p className="text-slate-500 text-sm font-medium italic">Found a defect? We'll replace it with a new unit at no extra cost.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase mb-2">Full Refunds</h3>
              <p className="text-slate-500 text-sm font-medium italic">Refunds are processed directly to your original payment method.</p>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="bg-white p-8 md:p-16 rounded-[40px] border border-slate-100 shadow-xl mb-16">
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-12 text-center">How to return an item?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-1/4 left-10 right-10 h-0.5 bg-slate-100 -z-0"></div>
              
              {steps.map((step, idx) => (
                <div key={idx} className="relative z-10 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 shadow-lg flex items-center justify-center mx-auto transition-transform hover:scale-110">
                    {step.icon}
                  </div>
                  <div className="bg-primary/10 text-primary text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center mx-auto">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed italic">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-900 p-12 rounded-[40px] text-white">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Return Conditions</h3>
              <ul className="space-y-4">
                {[
                  "Items must be unused and in the same condition as received.",
                  "Original packaging must be intact.",
                  "Proof of purchase (Invoice) is required.",
                  "Software or digital download keys cannot be returned.",
                  "Clearance items are final sale and non-refundable."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-sm font-medium text-slate-400 italic">
                    <CheckCircle2 size={18} className="text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-12 rounded-[40px] border border-slate-100">
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-8">Need Help?</h3>
              <p className="text-slate-500 font-medium mb-8 italic">Our dedicated returns team is available Saturday to Thursday, 9 AM to 8 PM. We strive to respond to all inquiries within 24 hours.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <AlertCircle className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Email Support</p>
                    <p className="text-sm font-black text-slate-800">returns@smartkidx.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <Truck className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Return Hub</p>
                    <p className="text-sm font-black text-slate-800">123 STEM Street, Robotics Hub, Dhaka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
