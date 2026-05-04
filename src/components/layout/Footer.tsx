import Link from "next/link";
import Image from "next/image";
import { 
  Truck, 
  CreditCard, 
  Headphones, 
  ShieldCheck, 
  RotateCcw, 
  ChevronUp
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-0">
      {/* 1. Top Features Bar (Green) */}
      <div className="bg-[#58C27D] py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="flex items-center gap-4">
              <Truck size={40} strokeWidth={1} />
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-tight">Free Shipping</h4>
                <p className="text-[10px] text-white/80 font-medium">Carrier information.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CreditCard size={40} strokeWidth={1} />
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-tight">Online Payment</h4>
                <p className="text-[10px] text-white/80 font-medium">Payment methods.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Headphones size={40} strokeWidth={1} />
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-tight">24/7 Support</h4>
                <p className="text-[10px] text-white/80 font-medium">Unlimited help desk.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck size={40} strokeWidth={1} />
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-tight">100% Safe</h4>
                <p className="text-[10px] text-white/80 font-medium">View our benefits.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RotateCcw size={40} strokeWidth={1} />
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-tight">Free Returns</h4>
                <p className="text-[10px] text-white/80 font-medium">Track or cancel orders.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8">Our Categories</h4>
            <ul className="space-y-4">
              {["Electronics & Gadgets", "Robotics | IoT", "Kids Toys", "Stationary", "Kids Lifestyle", "Books"].map((cat) => (
                <li key={cat}>
                  <Link href="#" className="text-[11px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-tight">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8">Useful Links</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Returns", path: "/returns" },
                { name: "Terms & Conditions", path: "/terms-conditions" },
                { name: "Contact Us", path: "/contact" },
                { name: "Our Sitemap", path: "/sitemap" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-[11px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-tight">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Mascot */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-grow w-full max-w-xl">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2">Join Our Newsletter:</h4>
              <p className="text-[11px] text-slate-400 font-bold mb-6">Will be used in accordance with our Privacy Policy</p>
              <div className="flex gap-0 border-2 border-slate-100 rounded overflow-hidden">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-6 py-4 text-sm focus:outline-none bg-slate-50 italic"
                />
                <button className="bg-[#58C27D] text-white px-10 py-4 font-black text-xs uppercase hover:bg-[#4eaa6c] transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image 
                src="/smartkids_mascot.png" 
                alt="SmartKids Mascot" 
                width={300} 
                height={200}
                className="object-contain"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-slate-100 py-10 bg-slate-50/30">
        <div className="container mx-auto px-4 flex flex-col items-center gap-8">
          {/* Payment System */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Payment System:</p>
            <div className="w-full max-w-4xl opacity-80 hover:opacity-100 transition-opacity">
              <Image 
                src="/banglargonji-payment-methods.webp" 
                alt="Payment Methods" 
                width={800} 
                height={100} 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>


          <div className="w-full flex items-center justify-center">
            {/* Copyright */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              © 2026 Smartkidx.
            </p>

          </div>

        </div>
      </div>
    </footer>
  );
}
