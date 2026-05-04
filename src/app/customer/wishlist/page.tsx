"use client";

import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Plus,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const wishlistItems = [
  { id: 1, name: "Robotics Starter Kit", price: "৳ 2,500", stock: "In Stock" },
  { id: 2, name: "STEM Solar Car Kit", price: "৳ 1,200", stock: "Low Stock" },
  { id: 3, name: "Arduino Uno R3", price: "৳ 850", stock: "In Stock" },
];

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">My Wishlist</h2>
        <p className="text-slate-500 text-sm mt-1">Products you've saved for later.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary">
                <Heart size={24} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{item.name}</h3>
                <p className="text-sm font-black text-primary mt-1">{item.price}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">{item.stock}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                <Trash2 size={18} />
              </button>
              <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Add to Cart <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-16 text-center">
          <Heart size={48} className="text-slate-100 mx-auto mb-6" />
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Wishlist is empty</h3>
          <p className="text-slate-500 text-sm mt-2 mb-8">Save items you like to buy them later.</p>
          <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Explore Products</Link>
        </div>
      )}
    </div>
  );
}
