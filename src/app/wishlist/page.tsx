"use client";

import React from "react";
import Link from "next/link";
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  ArrowLeft,
  ShoppingBag
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart!`);
    router.push("/cart");
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center text-pink-300 mb-8">
          <Heart size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-4">Your Wishlist is Empty</h1>
        <p className="text-slate-500 mb-10 text-center max-w-md">Save your favorite innovations here to build your dream STEM project later!</p>
        <Link href="/shop" className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
          <ArrowLeft size={18} /> Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-4">
              <Heart className="text-red-500 fill-current" /> My Wishlist
            </h1>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{wishlist.length} Items Saved</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex gap-6 group"
                >
                  <div className="w-32 h-32 bg-slate-50 rounded-2xl border border-slate-100 p-2 shrink-0 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{item.category}</p>
                      <Link href={`/product/${item.id}`} className="text-base font-black text-slate-800 hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                        {item.name}
                      </Link>
                      <p className="text-lg font-black text-slate-900 mt-2">৳{item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="flex-grow bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/shop" className="text-sm font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-all flex items-center gap-3 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
