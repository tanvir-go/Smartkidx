"use client";

import React from "react";
import { Shield, Lock, Eye, FileText, Bell, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Eye className="text-primary" />,
      title: "Data Collection",
      content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This includes your name, email, phone number, and address."
    },
    {
      icon: <Lock className="text-primary" />,
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information. Your payment data is encrypted and processed through secure payment gateways."
    },
    {
      icon: <Globe className="text-primary" />,
      title: "Cookies & Tracking",
      content: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings."
    },
    {
      icon: <Bell className="text-primary" />,
      title: "Communications",
      content: "We may send you marketing communications if you have opted in. You can unsubscribe at any time using the link provided in our emails."
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
              Legal Information
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg italic leading-relaxed">
              At SmartKids, we are committed to protecting your privacy and ensuring your data is handled with care and transparency.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="bg-white p-8 md:p-16 rounded-[40px] border border-slate-100 shadow-xl mb-16">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-8 flex items-center gap-3">
                <Shield className="text-primary" size={28} /> Our Commitment
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-12 italic">
                Last Updated: May 2026. This policy describes how SmartKids ("we", "us", or "our") collects, uses, and shares your personal information when you visit or make a purchase from smartkidx.com.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{section.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>

              <hr className="my-16 border-slate-100" />

              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-8 flex items-center gap-3">
                <FileText className="text-primary" size={28} /> Detailed Information
              </h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-black text-slate-800 uppercase mb-3">1. Information We Collect</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 uppercase mb-3">2. How Do We Use Your Personal Information?</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to communicate with you; screen our orders for potential risk or fraud; and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 uppercase mb-3">3. Sharing Your Personal Information</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Supabase to power our backend and store user data securely. We also use Google Analytics to help us understand how our customers use the Site.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="bg-primary p-12 rounded-[40px] text-white text-center shadow-2xl shadow-primary/20">
            <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Questions about your privacy?</h3>
            <p className="text-primary-foreground/90 font-medium mb-8 italic max-w-xl mx-auto">
              If you have any questions or concerns about how we handle your data, please don't hesitate to contact our legal team.
            </p>
            <a href="/contact" className="inline-block bg-white text-primary px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl">
              Contact Privacy Officer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
