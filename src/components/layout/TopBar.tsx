import Link from "next/link";
import { Scale, Heart } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-white border-b border-slate-100 py-3 hidden lg:block">
      <div className="container mx-auto px-4 flex justify-between items-center text-[12px] text-slate-500 font-bold uppercase tracking-widest">
        <div className="flex items-center">
          <Link href="/newsletter" className="hover:text-primary transition-colors px-3">Newsletter</Link>
          <span className="text-slate-200">|</span>
          <Link href="/contact" className="hover:text-primary transition-colors px-3">Contact Us</Link>
          <span className="text-slate-200">|</span>
          <Link href="/faqs" className="hover:text-primary transition-colors px-3">FAQs</Link>
          <span className="text-slate-200">|</span>
          <Link href="/investment" className="hover:text-primary transition-colors px-3">Investment & Return</Link>
          <span className="text-slate-200">|</span>
          <Link href="/e-learning" className="hover:text-primary transition-colors px-3">E-learning</Link>
          <span className="text-slate-200">|</span>
          <Link href="/charity" className="hover:text-primary transition-colors px-3">Charity</Link>
        </div>
        <div className="flex items-center">
          <Link href="/compare" className="hover:text-primary transition-colors px-4 border-r border-slate-100 flex items-center gap-2">
            <Scale size={14} className="text-primary" /> Compare
            <span className="bg-primary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
          <Link href="/customer/wishlist" className="hover:text-primary transition-colors px-4 flex items-center gap-2">
            <Heart size={14} className="text-primary" /> Wishlist
            <span className="bg-primary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

