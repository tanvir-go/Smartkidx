import React from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    { icon: <MapPin className="text-primary" size={24} />, title: "Our Location", details: "123 STEM Street, Robotics Hub, Dhaka, Bangladesh", label: "Visit Us" },
    { icon: <Phone className="text-primary" size={24} />, title: "Phone Number", details: "+880 9614 556655", label: "Call Us" },
    { icon: <Mail className="text-primary" size={24} />, title: "Email Address", details: "hello@smartkidx.com", label: "Email Us" },
    { icon: <Clock className="text-primary" size={24} />, title: "Working Hours", details: "Sat - Thu: 9AM - 8PM", label: "Support" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tight mb-4">Get in Touch</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg italic">
            Have a question about a STEM kit or need technical support? Our team of robotics experts is here to help!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-8 flex items-center gap-2">
                <MessageSquare className="text-primary" /> Contact Details
              </h2>
              <div className="space-y-8">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{item.label}</p>
                      <h3 className="text-sm font-black text-slate-800 uppercase mb-1">{item.title}</h3>
                      <p className="text-sm font-bold text-slate-500 leading-relaxed">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
              <h3 className="text-xl font-black uppercase tracking-tight mb-4 leading-tight">Need Immediate Assistance?</h3>
              <p className="text-primary-foreground/90 font-medium mb-6">Our live support team is available during working hours to help you with your queries.</p>
              <button className="w-full bg-white text-primary py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                Live Chat Now
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm h-full">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Send Us a Message</h2>
              <p className="text-slate-500 mb-10 font-bold italic text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-all text-slate-800 font-bold" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Your Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-all text-slate-800 font-bold" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Subject</label>
                  <input type="text" placeholder="Order Support / STEM Inquiry" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-all text-slate-800 font-bold" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Your Message</label>
                  <textarea rows={6} placeholder="How can we help you today?" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-primary transition-all text-slate-800 font-bold resize-none"></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button className="flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    <Send size={20} /> Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
