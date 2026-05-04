import React from "react";
import { PlayCircle, BookOpen, Users, Award, Laptop, Brain } from "lucide-react";

export default function ELearningPage() {
  const features = [
    { icon: <PlayCircle size={40} />, title: "Video Tutorials", desc: "Step-by-step assembly guides for all robotics and electronics kits." },
    { icon: <Brain size={40} />, title: "Cognitive Skills", desc: "Interactive quizzes and challenges to test STEM understanding." },
    { icon: <Award size={40} />, title: "Certification", desc: "Earn digital badges and certificates for completed projects." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="bg-primary pt-24 pb-48">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-white/20">
            <Laptop size={14} /> Next-Gen Learning
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
            Interactive STEM <br/> <span className="bg-white text-primary px-4 inline-block transform -rotate-1">E-Learning Hub</span>
          </h1>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto text-lg font-bold italic mb-10">
            Unlock the full potential of your SmartKids kits with our comprehensive online learning platform.
          </p>
          <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-2xl shadow-primary/20 scale-110">
            Explore Courses
          </button>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 -mt-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:border-primary/20 transition-all">
              <div className="w-24 h-24 bg-primary/5 rounded-[32px] flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">{f.title}</h3>
              <p className="text-slate-500 font-bold leading-relaxed italic">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Categories */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-16">Popular Learning Paths</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Robotics 101", level: "Beginner", kits: 5 },
              { name: "Arduino Masterclass", level: "Intermediate", kits: 3 },
              { name: "Python for Kids", level: "Beginner", kits: 2 },
              { name: "Electronics DIY", level: "Advanced", kits: 8 },
            ].map((course, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all text-left">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">{course.level}</p>
                <h4 className="text-lg font-black text-slate-800 uppercase mb-4 leading-tight">{course.name}</h4>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tight">
                  <BookOpen size={14} /> {course.kits} Learning Kits
                </div>
                <button className="w-full mt-8 py-3 rounded-xl border-2 border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:border-primary hover:text-primary transition-all">
                  View Path
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="bg-slate-900 rounded-[50px] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">Join our Global <span className="text-primary">STEM Community</span></h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8 italic">Share your projects, get help from experts, and participate in monthly robotics competitions.</p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-black text-white">
                      {i}+
                    </div>
                  ))}
                </div>
                <p className="text-white font-bold uppercase tracking-widest text-sm">5k+ Active Learners</p>
              </div>
            </div>
            <div className="lg:w-1/3 w-full">
              <button className="w-full bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
