"use client";

import React from "react";
import Link from "next/link";
import { Home, ShoppingBag, Info, Phone, HelpCircle, User, Zap, Cpu, Microscope, Gamepad2, Palette, Baby, BookOpen, Map } from "lucide-react";
import { motion } from "framer-motion";

interface SitemapSection {
  title: string;
  icon: React.ReactNode;
  links: {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

export default function SitemapPage() {
  const sections: SitemapSection[] = [
    {
      title: "Main Pages",
      icon: <Home className="text-primary" size={20} />,
      links: [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" }
      ]
    },
    {
      title: "Shop Categories",
      icon: <ShoppingBag className="text-primary" size={20} />,
      links: [
        { name: "Electronics & Gadgets", href: "/category/electronics", icon: <Cpu size={14} /> },
        { name: "Robotics | IoT", href: "/category/robotics", icon: <Microscope size={14} /> },
        { name: "STEM Kits", href: "/category/stem-kits", icon: <Zap size={14} /> },
        { name: "Kids Toys", href: "/category/toys", icon: <Gamepad2 size={14} /> },
        { name: "Stationary", href: "/category/stationary", icon: <Palette size={14} /> },
        { name: "Kids Lifestyle", href: "/category/lifestyle", icon: <Baby size={14} /> },
        { name: "Books", href: "/category/books", icon: <BookOpen size={14} /> }
      ]
    },
    {
      title: "Partner Programs",
      icon: <Zap className="text-primary" size={20} />,
      links: [
        { name: "Become an Affiliate", href: "/become-affiliate" },
        { name: "Investment & Returns", href: "/investment" },
        { name: "Charity Program", href: "/charity" },
        { name: "E-Learning Platform", href: "/e-learning" }
      ]
    },
    {
      title: "Customer Portal",
      icon: <User className="text-primary" size={20} />,
      links: [
        { name: "Login / Register", href: "/login" },
        { name: "My Account", href: "/customer" },
        { name: "My Orders", href: "/customer/orders" },
        { name: "Wishlist", href: "/customer/wishlist" }
      ]
    },
    {
      title: "Legal & Support",
      icon: <HelpCircle className="text-primary" size={20} />,
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Returns & Exchanges", href: "/returns" },
        { name: "Terms & Conditions", href: "/terms-conditions" },
        { name: "Contact Support", href: "/contact" }
      ]
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
              Navigation
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter mb-6">
              Our <span className="text-primary">Sitemap</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg italic leading-relaxed">
              Explore the entire SmartKids world. Use the map below to find exactly what you're looking for.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">{section.title}</h2>
              </div>
              
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href}
                      className="flex items-center gap-3 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-tight transition-colors group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-colors"></span>
                      {link.icon && <span className="text-slate-400 group-hover:text-primary transition-colors">{link.icon}</span>}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Special Search Box */}
          <div className="lg:col-span-1 bg-primary p-10 rounded-[40px] text-white flex flex-col justify-center">
            <h3 className="text-2xl font-black uppercase mb-4">Can't find it?</h3>
            <p className="text-white/80 font-medium text-sm italic mb-8">Use our global search to find specific products, categories, or support articles.</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-sm focus:outline-none focus:bg-white/20 placeholder:text-white/50 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
