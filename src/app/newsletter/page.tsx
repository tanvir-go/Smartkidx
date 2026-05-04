import React from "react";
import { Mail, Bell, Gift, Sparkles } from "lucide-react";

export default function NewsletterPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          {/* Left Side: Content */}
          <div className="md:w-1/2 p-12 bg-primary text-white flex flex-col justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black mb-4 uppercase tracking-tight leading-tight">
              Stay Ahead with SmartKids
            </h1>
            <p className="text-primary-foreground/90 text-lg mb-8 font-medium">
              Join 50,000+ parents and educators receiving weekly STEM projects, exclusive deals, and parenting tips.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Gift size={14} />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Early Access to New Kits</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Bell size={14} />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Flash Sale Notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={14} />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Free STEM Project Guides</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="md:w-1/2 p-12 bg-white flex flex-col justify-center">
            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Subscribe Now</h2>
            <p className="text-slate-500 mb-8 font-medium italic">No spam, just pure STEM inspiration.</p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-all text-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-all text-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">I am a...</label>
                <select className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-all text-slate-800 font-bold appearance-none">
                  <option>Parent</option>
                  <option>Teacher</option>
                  <option>STEM Enthusiast</option>
                </select>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Join the Community
              </button>
            </form>
            
            <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
              By subscribing, you agree to our <br/>
              <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span> and <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
