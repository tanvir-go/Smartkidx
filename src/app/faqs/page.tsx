"use client";

import React, { useState } from "react";
import { ChevronDown, Search, HelpCircle, Book, CreditCard, Truck, Package } from "lucide-react";

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      category: "General",
      icon: <HelpCircle size={20} />,
      items: [
        { q: "What is SmartKids?", a: "SmartKids is a premium STEM e-commerce platform dedicated to providing high-quality robotics, electronics, and educational toys for children of all ages." },
        { q: "Are the products safe for kids?", a: "Yes, all our products undergo rigorous safety testing and are certified by international standards. We specify age recommendations for every item." },
        { q: "Do you offer international shipping?", a: "Currently, we primarily serve Bangladesh, but we are expanding our shipping zones. Contact our support for specific international inquiries." }
      ]
    },
    {
      category: "Orders & Shipping",
      icon: <Truck size={20} />,
      items: [
        { q: "How long does delivery take?", a: "Delivery within Dhaka usually takes 1-2 business days. Outside Dhaka, it typically takes 3-5 business days." },
        { q: "Can I track my order?", a: "Absolutely! Once your order is shipped, you will receive a tracking ID via SMS and email." },
        { q: "What are the shipping charges?", a: "Shipping is free for orders above ৳5000. For smaller orders, a flat fee of ৳60 inside Dhaka and ৳120 outside Dhaka applies." }
      ]
    },
    {
      category: "Returns & Refunds",
      icon: <Package size={20} />,
      items: [
        { q: "What is your return policy?", a: "We offer a 7-day easy return policy for damaged or incorrect items. The product must be in its original packaging." },
        { q: "How do I request a refund?", a: "You can request a refund through your account dashboard or by contacting our support team with your order ID." }
      ]
    },
    {
      category: "Learning & Support",
      icon: <Book size={20} />,
      items: [
        { q: "Do the kits come with manuals?", a: "Yes, every STEM kit includes a detailed, step-by-step physical manual. Many also have accompanying video tutorials on our E-Learning platform." },
        { q: "Is technical support available for DIY kits?", a: "Yes, we have a dedicated technical team to help you via video call or chat if you get stuck with any assembly." }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tight mb-6 leading-tight">
            How can we <span className="text-primary underline underline-offset-8">Help you</span>?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-16 py-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 focus:outline-none focus:border-primary transition-all text-slate-800 font-bold"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((cat, idx) => (
            <div key={idx}>
              <h2 className="flex items-center gap-3 text-[11px] font-black text-primary uppercase tracking-widest mb-6 px-4">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">{cat.icon}</span>
                {cat.category}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {cat.items.map((item, itemIdx) => (
                  <FAQItem key={itemIdx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="mt-20 bg-primary rounded-3xl p-10 text-center text-white shadow-2xl shadow-primary/30">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Still have questions?</h3>
          <p className="text-primary-foreground/90 font-medium mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Contact Us</button>
            <button className="bg-primary-foreground/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20">Live Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border border-slate-100 transition-all ${isOpen ? "shadow-xl border-primary/20" : "hover:shadow-md"}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-8 py-6 text-left"
      >
        <span className="text-sm font-black text-slate-800 uppercase tracking-tight leading-tight">{question}</span>
        <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-8 pb-8 text-sm font-bold text-slate-500 leading-relaxed italic border-t border-slate-50 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}
