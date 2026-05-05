"use client";

import { 
  Users, 
  Rocket, 
  Heart, 
  CheckCircle2, 
  Target, 
  Award,
  ChevronRight,
  Home,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-800">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-40">
           <Image 
             src="/images/about-hero.png" 
             alt="About SmartKids" 
             fill
             className="object-cover"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-tight mb-6 uppercase tracking-tight">
              Empowering the <span className="text-primary">Next Generation</span> of Innovators
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
              We provide the tools, kits, and inspiration children need to explore the fascinating worlds of Robotics, STEM, and creative arts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Explore Our Collection
              </Link>
              <Link href="/contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Kids", value: "50,000+" },
              { label: "Products", value: "1,200+" },
              { label: "Schools Joined", value: "300+" },
              { label: "Awards Won", value: "15+" }
            ].map((stat, i) => (
              <div key={i} className="text-center text-white">
                <p className="text-3xl md:text-5xl font-black mb-2">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <Target size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To ignite curiosity and foster critical thinking in children by making high-quality STEM education accessible, engaging, and fun through hands-on learning kits.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                  <Rocket size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  A world where every child, regardless of background, has the opportunity to become a creator, a problem-solver, and a future leader in technology and innovation.
                </p>
              </div>
            </div>
            <div className="relative">
               <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative">
                  <Image 
                    src="/images/demo/featured_stem.png" 
                    alt="Mission" 
                    fill
                    className="object-cover"
                  />
               </div>
               <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs border border-slate-50 hidden md:block">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                      <Award size={24} />
                    </div>
                    <p className="font-black text-slate-800 uppercase tracking-widest text-xs">Certified Educational Partner</p>
                  </div>
                  <p className="text-slate-500 text-sm">Recognized globally for excellence in early-childhood STEM development.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-6">Why Parents <span className="text-primary">Trust Us</span></h2>
            <div className="w-24 h-2 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-slate-500 text-lg">We don't just sell kits; we provide a foundation for lifelong learning and discovery.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <CheckCircle2 size={32} />,
                title: "Safety First",
                desc: "All our products are non-toxic, child-safe, and meet international safety standards (CE/ASTM).",
                color: "text-emerald-500"
              },
              {
                icon: <Users size={32} />,
                title: "Expert Curated",
                desc: "Developed by educators and engineers with a focus on age-appropriate learning milestones.",
                color: "text-blue-500"
              },
              {
                icon: <Heart size={32} />,
                title: "Parent Approved",
                desc: "Trusted by thousands of families worldwide with an average 4.8-star satisfaction rating.",
                color: "text-rose-500"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center group">
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center ${item.color} mb-8 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[60px] p-8 md:p-20 text-slate-800 relative overflow-hidden border-2 border-slate-50 shadow-2xl shadow-slate-200/50">
             <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
               <div>
                  <MessageCircle size={64} className="text-primary opacity-20 mb-8" />
                  <p className="text-2xl md:text-4xl font-display font-medium leading-relaxed mb-10 italic text-slate-700">
                    "Every child is born a scientist. Our job is to give them the right laboratory to explore their wildest ideas."
                  </p>
                  <div>
                    <p className="text-xl font-black uppercase tracking-widest text-primary">MD Nasir Feroz</p>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Founder & CEO, SmartKids</p>
                  </div>
               </div>
               <div className="hidden lg:block relative">
                  <div className="aspect-square w-full max-w-md mx-auto rounded-[40px] overflow-hidden border-8 border-white relative shadow-xl">
                     <Image 
                       src="/images/demo/founder.png" 
                       alt="Founder" 
                       fill
                       className="object-cover"
                     />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full blur-3xl opacity-50"></div>
               </div>
             </div>
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-8">Ready to Start the <span className="text-primary">Journey?</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-12">Join thousands of families who are already building the future with SmartKids STEM kits.</p>
          <Link href="/shop" className="inline-block bg-slate-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-2xl shadow-slate-200">
            Visit Our Shop
          </Link>
        </div>
      </section>
    </div>
  );
}
