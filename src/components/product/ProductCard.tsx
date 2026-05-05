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
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 h-full flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {discount && (
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
              -{discount}%
            </span>
          )}
          {isNew && (
            <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
              NEW
            </span>
          )}
          {isHot && (
            <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
              <Zap size={10} className="fill-current" /> HOT
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300 ${
            isInWishlist(id) ? "text-red-500 bg-white" : "text-slate-400 hover:text-red-500 hover:bg-white"
          }`}
        >
          <Heart size={16} className={isInWishlist(id) ? "fill-current" : ""} />
        </button>

        {/* Product Image */}
        <Link href={`/product/${id}`} className="block w-full h-full">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/20 to-transparent flex gap-2">
          <button 
            onClick={handleAddToCart}
            className="flex-grow bg-white text-slate-900 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg"
          >
            <ShoppingCart size={16} /> ADD TO CART
          </button>
          <Link href={`/product/${id}`} className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg">
            <Eye size={18} />
          </Link>
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{category}</p>
        <Link href={`/product/${id}`} className="block text-sm md:text-base font-bold text-slate-800 hover:text-primary transition-colors line-clamp-2 mb-2 h-10 md:h-12 leading-snug">
          {name}
        </Link>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(rating) ? "fill-accent text-accent" : "text-slate-200"} 
              />
            ))}
          </div>
          <span className="text-sm text-slate-400 font-bold">({reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-xl font-black text-slate-900">৳{price.toFixed(2)}</span>
            {oldPrice && (
              <span className="text-xs text-slate-400 line-through">৳{oldPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="md:hidden">
            <button 
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
