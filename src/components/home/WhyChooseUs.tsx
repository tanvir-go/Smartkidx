import { Truck, ShieldCheck, Headphones, RotateCcw, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Truck size={32} />,
    title: "Free Shipping",
    desc: "On orders over ৳50",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "100% Safe",
    desc: "Secure transactions",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: <Headphones size={32} />,
    title: "24/7 Support",
    desc: "Always here to help",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: <RotateCcw size={32} />,
    title: "Free Returns",
    desc: "30-day money back",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: <CreditCard size={32} />,
    title: "Online Payment",
    desc: "All cards accepted",
    color: "bg-pink-50 text-pink-600"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-20 bg-slate-900 text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-white/5`}>
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
