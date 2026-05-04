import React from "react";
import { Heart, Globe, BookOpen, Gift, Users, Star } from "lucide-react";

export default function CharityPage() {
  const initiatives = [
    { icon: <BookOpen size={28} />, title: "Rural STEM Hubs", desc: "Setting up robotics labs in remote villages to provide equal opportunities." },
    { icon: <Heart size={28} />, title: "Free Workshop Days", desc: "Monthly free hands-on training sessions for underprivileged children." },
    { icon: <Gift size={28} />, title: "Kit Donation Program", desc: "Donating educational kits for every 10 kits sold on our platform." },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative py-32 bg-[#fff5f5]">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-8 animate-pulse">
            <Heart size={40} fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tight mb-6">
            SmartKids <span className="text-red-500">Charity</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-bold italic mb-10 leading-relaxed">
            We believe that every child, regardless of their background, deserves to explore the magic of science and technology.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-red-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-200">
              Donate Now
            </button>
            <button className="bg-white text-slate-800 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
              Our Impact
            </button>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white py-20 border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { label: "Children Impacted", value: "25k+" },
              { label: "Schools Reached", value: "150+" },
              { label: "Kits Donated", value: "3.5k" },
              { label: "Volunteer Mentors", value: "500+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-black text-slate-800 mb-2">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Initiatives */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-4">Our Core Initiatives</h2>
          <p className="text-slate-500 font-bold italic uppercase text-xs tracking-widest">How we make a difference</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {initiatives.map((init, i) => (
            <div key={i} className="group p-10 rounded-[40px] bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 border border-transparent hover:border-slate-100">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm mb-8 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                {init.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">{init.title}</h3>
              <p className="text-slate-500 font-bold leading-relaxed">{init.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners / Sponsors */}
      <div className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Our Supporting Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <Globe size={48} />
            <Users size={48} />
            <Star size={48} />
            <Heart size={48} />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-24">
        <div className="bg-slate-900 rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6 relative z-10 leading-tight">
            Be a Hero in a <br/> <span className="text-red-500">Child's Journey</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium text-lg italic mb-10 relative z-10">
            Your small contribution can light up a child's imagination and build a future innovator.
          </p>
          <button className="bg-red-500 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 relative z-10">
            Join Our Mission
          </button>
        </div>
      </div>
    </div>
  );
}
