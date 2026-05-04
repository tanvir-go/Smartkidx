"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Send,
  Globe,
  Share2,
  DollarSign,
  Rocket
} from "lucide-react";
import { motion } from "framer-motion";

export default function BecomeAffiliatePage() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    promotionMethod: "",
    audienceSize: "",
    message: "",
    agreed: false
  });

  const benefits = [
    {
      icon: <DollarSign className="text-primary" size={28} />,
      title: "High Commissions",
      description: "Earn up to 15% commission on every successful referral purchase."
    },
    {
      icon: <Target className="text-primary" size={28} />,
      title: "Quality Products",
      description: "Promote award-winning STEM kits and robotics toys that parents love."
    },
    {
      icon: <TrendingUp className="text-primary" size={28} />,
      title: "Real-time Tracking",
      description: "Monitor your clicks, conversions, and earnings through our dashboard."
    },
    {
      icon: <Award className="text-primary" size={28} />,
      title: "Exclusive Perks",
      description: "Get early access to new launches and exclusive discounts for your audience."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formState);
    alert("Thank you for applying! Our team will review your application and get back to you soon.");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/affiliate-hero.png" 
            alt="Affiliate Hero" 
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              Partner Program
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-800 uppercase tracking-tighter leading-none mb-6">
              Grow with <span className="text-primary">SmartKids</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic mb-8">
              Join our affiliate network and help us inspire the next generation of engineers and scientists while earning premium rewards.
            </p>
            <div className="flex gap-4">
              <a href="#apply-form" className="bg-primary text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Start Earning Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Benefits Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-4">Why Join Our Program?</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-black text-slate-800 uppercase mb-3">{benefit.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm italic">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="apply-form" className="py-24 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
              {/* Left Side: Info */}
              <div className="lg:w-1/3 bg-slate-900 p-12 text-white">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Ready to Partner?</h2>
                <p className="text-slate-400 font-medium mb-12 italic">Complete the application form and our partnership team will reach out to you within 48 hours.</p>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Global Access</p>
                      <p className="text-sm font-bold">Bangladesh & Beyond</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Share2 size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Marketing Tools</p>
                      <p className="text-sm font-bold">Banners, Links & More</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Rocket size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Fast Approval</p>
                      <p className="text-sm font-bold">Quick Verification Process</p>
                    </div>
                  </div>
                </div>

                <div className="mt-20 pt-12 border-t border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Trusted By</p>
                  <div className="flex flex-wrap gap-6 opacity-30 grayscale">
                    <Users size={32} />
                    <CheckCircle2 size={32} />
                    <TrendingUp size={32} />
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="lg:w-2/3 p-12 md:p-16">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Enter your name" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-800 font-bold"
                        value={formState.fullName}
                        onChange={(e) => setFormState({...formState, fullName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="name@example.com" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-800 font-bold"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+880" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-800 font-bold"
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Website / Social Profile</label>
                      <input 
                        type="url" 
                        placeholder="https://..." 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-800 font-bold"
                        value={formState.website}
                        onChange={(e) => setFormState({...formState, website: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Primary Promotion Method</label>
                      <select 
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-800 font-bold appearance-none"
                        value={formState.promotionMethod}
                        onChange={(e) => setFormState({...formState, promotionMethod: e.target.value})}
                      >
                        <option value="">Select Method</option>
                        <option value="social">Social Media</option>
                        <option value="blog">Blog / Website</option>
                        <option value="email">Email Marketing</option>
                        <option value="video">YouTube / TikTok</option>
                        <option value="offline">Offline / Word of Mouth</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Audience Size</label>
                      <select 
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-800 font-bold appearance-none"
                        value={formState.audienceSize}
                        onChange={(e) => setFormState({...formState, audienceSize: e.target.value})}
                      >
                        <option value="">Select Range</option>
                        <option value="1k">Under 1,000</option>
                        <option value="1k-10k">1,000 - 10,000</option>
                        <option value="10k-50k">10,000 - 50,000</option>
                        <option value="50k+">50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Briefly describe your strategy</label>
                    <textarea 
                      rows={4} 
                      placeholder="How do you plan to promote SmartKids?" 
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-800 font-bold resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="agree" 
                      required
                      className="w-5 h-5 rounded border-slate-200 text-primary focus:ring-primary cursor-pointer"
                      checked={formState.agreed}
                      onChange={(e) => setFormState({...formState, agreed: e.target.checked})}
                    />
                    <label htmlFor="agree" className="text-sm font-bold text-slate-500 cursor-pointer">
                      I agree to the <span className="text-primary hover:underline">Affiliate Terms & Conditions</span>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30"
                    >
                      <Send size={20} /> Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10"><Users size={120} /></div>
          <div className="absolute bottom-10 right-10 rotate-12"><Target size={150} /></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-6">Still have questions?</h2>
          <p className="text-white/80 font-medium mb-10 max-w-xl mx-auto italic">Our support team is here to help you maximize your earnings as a SmartKids partner.</p>
          <a href="/contact" className="inline-block bg-white text-primary px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
