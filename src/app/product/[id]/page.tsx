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

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
            <div className="mb-8">
              <p className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight mb-6">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < 4 ? "fill-accent text-accent" : "text-slate-200"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-800">{product.rating}</span>
                  <span className="text-sm text-slate-400 font-medium">({product.reviews} customer reviews)</span>
                </div>
                <div className="h-4 w-px bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">{product.stock} in stock</span>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-black text-slate-900">৳{product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-xl text-slate-400 line-through font-bold">৳{product.oldPrice.toFixed(2)}</span>
                )}
              </div>

              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              <ul className="space-y-3 mb-10">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Plus size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-6 mt-auto">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200">
                  <button onClick={decrementQty} className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-primary transition-colors">
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-black text-lg text-slate-800">{quantity}</span>
                  <button onClick={incrementQty} className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-primary transition-colors">
                    <Plus size={20} />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-grow bg-primary text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group"
                >
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>

                <button 
                  onClick={handleWishlistToggle}
                  className={`w-16 h-16 rounded-2xl border-2 transition-all flex items-center justify-center ${
                    isInWishlist(id) ? "border-red-100 text-red-500 bg-red-50/30" : "border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100"
                  }`}
                >
                  <Heart size={24} className={isInWishlist(id) ? "fill-current" : ""} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Truck size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Shipping</p>
                    <p className="text-xs font-bold text-slate-800">Free Worldwide</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <RotateCcw size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Returns</p>
                    <p className="text-xs font-bold text-slate-800">30-Day Policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Secure</p>
                    <p className="text-xs font-bold text-slate-800">100% Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard key={p.id} {...p as any} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
