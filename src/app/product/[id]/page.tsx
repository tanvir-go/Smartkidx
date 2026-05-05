"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Minus,
  Plus,
  Zap,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";

import { products, Product } from "@/data/products";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "react-toastify";

export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const id = parseInt(params.id);
  const product = products.find(p => p.id === id) || products[0]; 
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    setActiveImage(product.images[0]);
  }, [product]);

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
    router.push("/cart");
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-slate-800">{product.category}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-10 md:gap-20">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[40px] overflow-hidden bg-slate-50 border border-slate-100 group"
            >
              <img 
                src={activeImage} 
                alt={product.name}
                className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                {product.discount && (
                  <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg">
                    -{product.discount}% OFF
                  </span>
                )}
                {product.isHot && (
                  <span className="bg-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                    <Zap size={14} className="fill-current" /> BEST SELLER
                  </span>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-2xl border-2 transition-all p-2 bg-slate-50 ${
                    activeImage === img ? "border-primary shadow-lg shadow-primary/10" : "border-transparent hover:border-slate-200"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">{product.brand || "SmartKids"}</p>
              <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-4 tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-black text-slate-900">৳{product.price.toLocaleString()} BDT</span>
                {product.stock <= 0 ? (
                  <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-1 rounded-full uppercase">Sold out</span>
                ) : (
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-1 rounded-full uppercase">In stock</span>
                )}
              </div>
              
              <p className="text-[10px] font-bold text-slate-400 mb-8">
                <span className="underline cursor-pointer">Shipping</span> calculated at checkout.
              </p>

              <div className="space-y-6">
                {/* Quantity */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Quantity</label>
                  <div className="flex items-center w-32 bg-white rounded-lg border border-slate-200">
                    <button onClick={decrementQty} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="flex-grow text-center font-bold text-sm text-slate-800">{quantity}</span>
                    <button onClick={incrementQty} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="bg-primary text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                  >
                    <ShoppingCart size={16} />
                    Add to cart
                  </button>
                  <button 
                    onClick={handleWishlistToggle}
                    className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 border-2 ${
                      isInWishlist(id) 
                        ? "border-red-100 bg-red-50 text-red-500" 
                        : "border-slate-100 bg-white text-slate-400 hover:text-primary hover:border-primary/20"
                    }`}
                  >
                    <Heart size={16} className={isInWishlist(id) ? "fill-current" : ""} />
                    {isInWishlist(id) ? "In Wishlist" : "Wishlist"}
                  </button>
                </div>

                {/* Description */}
                <div className="pt-8 border-t border-slate-100">
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                {/* Share */}
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                  <Share2 size={12} />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-12 border-b border-slate-100 mb-12">
            {["Description", "Specification", "Reviews (124)"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                className={`pb-6 text-sm font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab.toLowerCase().split(' ')[0] ? "text-primary" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {activeTab === tab.toLowerCase().split(' ')[0] && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === "description" && (
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg">
                  Unleash your inner inventor with the Ultimate Arduino Uno R3 Starter Kit. Designed for both beginners and experienced makers, this kit provides a hands-on experience with the world's most popular microcontroller platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                  <div className="bg-slate-50 p-10 rounded-[32px]">
                    <h4 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">Why Choose This Kit?</h4>
                    <ul className="space-y-4">
                      {["Comprehensive learning experience", "High-quality original components", "Step-by-step PDF tutorials", "Unlimited community support"].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                          <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative rounded-[32px] overflow-hidden aspect-video md:aspect-square">
                    <img src="https://placehold.co/800x800/png?text=Arduino+Action" alt="Arduino in action" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specification" && (
              <div className="bg-slate-50 rounded-[32px] overflow-hidden">
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? "bg-white/50" : ""}>
                        <td className="py-5 px-8 text-xs font-black text-slate-400 uppercase tracking-widest w-1/3">{key}</td>
                        <td className="py-5 px-8 text-sm font-bold text-slate-800">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Related Innovations</h2>
            <Link href="/shop" className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline">View All Projects</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.filter(p => p.id !== product.id).slice(0, 5).map((p) => (
              <ProductCard key={p.id} {...p as any} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
