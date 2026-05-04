"use client";

import { Facebook, Instagram, Youtube, Twitter, Send } from "lucide-react";

export default function NewsletterBar() {
  return (
    <section className="bg-[#58C27D] py-6 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Send size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight leading-tight">Everything at 20% discount</h3>
            <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Limited time offer for new subscribers!</p>
          </div>
        </div>

        <div className="flex-grow max-w-md w-full">
           <div className="flex bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none flex-grow"
              />
              <button className="bg-white text-[#58C27D] px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">
                Subscribe
              </button>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Follow Us:</p>
          <div className="flex items-center gap-4">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#58C27D] transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative pulse */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
}
