import React from "react";
import { TrendingUp, ShieldCheck, Zap, BarChart3, Rocket, PieChart } from "lucide-react";

export default function InvestmentReturnPage() {
  const values = [
    { icon: <TrendingUp size={32} />, title: "Educational ROI", description: "Investing in STEM kits provides a lifetime of critical thinking and problem-solving skills for your child." },
    { icon: <ShieldCheck size={32} />, title: "Quality Assurance", description: "Every product is vetted by our team of educators and engineers to ensure maximum learning value." },
    { icon: <Zap size={32} />, title: "Future Ready", description: "We bridge the gap between classroom theory and real-world technology application." },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative bg-slate-900 py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 leading-tight">
            Invest in <span className="text-primary">Future Innovation</span>
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-medium italic leading-relaxed">
            At SmartKids, we believe every STEM kit is an investment in a child's future. Our Investment & Return policy ensures you get the highest educational value for your money.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                {v.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">{v.title}</h3>
              <p className="text-slate-500 font-bold leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-6">Return Policy</div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tight mb-8 leading-tight">
                7-Day Satisfaction <br/> Guarantee
              </h2>
              <p className="text-slate-600 font-bold text-lg mb-8 leading-relaxed italic">
                We are confident in our kits. If you're not satisfied with the educational quality, we'll make it right.
              </p>
              <ul className="space-y-4">
                {[
                  "Easy returns for damaged or missing parts",
                  "Full refund for unopened products within 7 days",
                  "Expert technical support before you decide to return",
                  "Store credit options for exchanges"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                    <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
                      <Zap size={10} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-12 rounded-[40px] shadow-xl border border-slate-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-8 rounded-3xl text-center">
                  <BarChart3 className="mx-auto text-primary mb-4" size={32} />
                  <p className="text-3xl font-black text-slate-800">98%</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Satisfaction</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl text-center">
                  <Rocket className="mx-auto text-primary mb-4" size={32} />
                  <p className="text-3xl font-black text-slate-800">10k+</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kits Sold</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl text-center">
                  <PieChart className="mx-auto text-primary mb-4" size={32} />
                  <p className="text-3xl font-black text-slate-800">85%</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Repeat Buyers</p>
                </div>
                <div className="bg-primary p-8 rounded-3xl text-center text-white">
                  <TrendingUp className="mx-auto text-white mb-4" size={32} />
                  <p className="text-xl font-black uppercase tracking-tight">Invest Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
