"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Star, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "react-toastify";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isHot?: boolean;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  oldPrice,
  discount,
  image,
  rating,
  reviews,
  isNew,
  isHot
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, category, price, oldPrice, discount, image, rating, reviews, isNew, isHot } as any);
    toast.success(`${name} added to cart!`);
    router.push("/cart");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast.info(`${name} removed from wishlist`);
    } else {
      addToWishlist({ id, name, category, price, oldPrice, discount, image, rating, reviews, isNew, isHot } as any);
      toast.success(`${name} added to wishlist!`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 h-full flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-50/50">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
          <span className="bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded-sm uppercase tracking-widest shadow-sm">
            Hardware
          </span>
          {discount && (
            <span className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-sm uppercase tracking-widest shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100 duration-300 ${
            isInWishlist(id) ? "text-red-500 bg-white" : "text-slate-400 hover:text-red-500 hover:bg-white"
          }`}
        >
          <Heart size={14} className={isInWishlist(id) ? "fill-current" : ""} />
        </button>

        {/* Product Image */}
        <Link href={`/product/${id}`} className="block w-full h-full p-6">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
          />
        </Link>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-grow">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{category.split('|')[0]}</p>
          <div className="flex items-center gap-0.5">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-black text-slate-400">{rating}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/product/${id}`} className="block text-xs md:text-sm font-black text-slate-800 hover:text-primary transition-colors line-clamp-2 mb-3 leading-tight min-h-[32px]">
          {name}
        </Link>
        
        {/* Price and Cart Row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-black text-slate-900 leading-none mb-1">৳{price.toLocaleString()}</span>
            {oldPrice && (
              <span className="text-[10px] text-slate-300 line-through font-bold">৳{oldPrice.toLocaleString()}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-900 text-white hover:bg-primary transition-all shadow-lg shadow-slate-200"
          >
            <ShoppingCart size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
