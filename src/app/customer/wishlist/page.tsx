"use client";

import { 
  Heart, 
  Trash2, 
  ArrowRight,
  ShoppingCart,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";
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
    toast.success(`${product.name} added to cart!`);
    router.push("/cart");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">My Wishlist</h2>
        <p className="text-slate-500 text-sm mt-1">Products you've saved for later.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnimatePresence>
          {wishlist.map((item) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 group"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-primary p-2 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight truncate">{item.name}</h3>
                  <p className="text-sm font-black text-primary mt-1">৳{item.price.toFixed(2)}</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">In Stock</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-3.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => handleMoveToCart(item)}
                  className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-lg shadow-slate-200"
                >
                  Add to Cart <ShoppingCart size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {wishlist.length === 0 && (
        <div className="bg-white border border-dashed border-slate-200 rounded-[40px] p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
            <Heart size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Wishlist is empty</h3>
          <p className="text-slate-500 text-sm mt-2 mb-8 max-w-xs mx-auto uppercase font-bold tracking-widest">Save items you like to buy them later.</p>
          <Link href="/shop" className="bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs inline-block shadow-xl shadow-primary/20">Explore Innovations</Link>
        </div>
      )}
    </div>
  );
}
