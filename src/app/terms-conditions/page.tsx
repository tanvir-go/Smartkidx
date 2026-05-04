"use client";

import React from "react";
import { FileText, Scale, Gavel, AlertTriangle, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsConditionsPage() {
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
              Agreement
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter mb-6">
              Terms & <span className="text-primary">Conditions</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg italic leading-relaxed">
              By using SmartKids, you agree to follow the rules and guidelines outlined in this document. Please read them carefully.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Main Legal Content */}
          <div className="bg-white p-8 md:p-16 rounded-[40px] border border-slate-100 shadow-xl mb-16">
            <div className="prose prose-slate max-w-none">
              <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                  <Gavel className="text-primary" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-1">Legal Terms</h2>
                  <p className="text-slate-400 font-bold italic text-sm">Last Updated: May 2026</p>
                </div>
              </div>

              <div className="space-y-12">
                <section>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-3">
                    <Globe size={20} className="text-primary" /> 1. Use of Website
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    By accessing this website, you warrant and represent to the website owner that you are legally entitled to do so and to make use of information made available via the website. You must be at least 13 years old to use this service, or have parental consent.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-3">
                    <ShieldCheck size={20} className="text-primary" /> 2. Intellectual Property
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    The trademarks, names, logos and service marks (collectively “trademarks”) displayed on this website are registered and unregistered trademarks of the website owner. Nothing contained on this website should be construed as granting any license or right to use any trademark without the prior written permission of the website owner.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-3">
                    <Scale size={20} className="text-primary" /> 3. Warranties & Liability
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    The website owner makes no warranties, representations, statements or guarantees (whether express, implied in law or residual) regarding the website. SmartKids shall not be responsible for and disclaims all liability for any loss, liability, damage (whether direct, indirect or consequential), personal injury or expense of any nature whatsoever which may be suffered by you or any third party.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-3">
                    <AlertTriangle size={20} className="text-primary" /> 4. External Links
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    External links may be provided for your convenience, but they are beyond the control of the website owner and no representation is made as to their content. Use or reliance on any external links and the content thereon provided is at your own risk.
                  </p>
                </section>

                <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4">5. Conflict of Terms</h3>
                  <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
                    If there is a conflict or contradiction between the provisions of these website terms and conditions and any other relevant terms and conditions, policies or notices, the other relevant terms and conditions, policies or notices which relate specifically to a particular section or module of the website shall prevail in respect of your use of the relevant section or module of the website.
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Quick Support Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-10 rounded-[40px] text-white">
              <h4 className="text-xl font-black uppercase mb-4">Download PDF</h4>
              <p className="text-slate-400 font-medium text-sm italic mb-6">Need a physical copy? Download the complete terms and conditions in PDF format.</p>
              <button className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all text-xs">
                <FileText size={16} /> Download Terms
              </button>
            </div>
            <div className="bg-primary p-10 rounded-[40px] text-white">
              <h4 className="text-xl font-black uppercase mb-4">Legal Inquiry</h4>
              <p className="text-white/80 font-medium text-sm italic mb-6">Have a specific legal question? Our compliance team is here to assist you.</p>
              <a href="/contact" className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all text-xs">
                Contact Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
