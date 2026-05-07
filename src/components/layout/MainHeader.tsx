"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  ShoppingCart, 
  ShoppingBag,
  Heart,
  PhoneCall, 
  ChevronDown, 
  Menu, 
  User, 
  Info,
  ChevronRight, 
  Facebook, 
  Instagram, 
  Youtube,
  Cpu,
  Microscope,
  Gamepad2,
  Palette,
  Baby,
  BookOpen,
  Zap,
  Camera,
  Loader2,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { categories } from "@/data/navigation";

export default function MainHeader() {
  const [isSticky, setIsSticky] = useState(false);
  const { cartCount, cartTotal } = useCart();
  const { wishlistCount } = useWishlist();
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isImageSearchLoading, setIsImageSearchLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [foundProducts, setFoundProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const sampleProducts = [
    { id: 1, name: "Arduino Uno R3 Starter Kit", price: 45.00, image: "https://placehold.co/100x100/png?text=Arduino", category: "Robotics" },
    { id: 3, name: "STEM Solar Robot Kit", price: 24.99, image: "https://placehold.co/100x100/png?text=Solar+Robot", category: "Robotics" },
    { id: 6, name: "Walkie Talkies for Kids", price: 28.00, image: "https://placehold.co/100x100/png?text=Walkie+Talkie", category: "Electronics" }
  ];

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, [pathname]);

  const getPortalHref = () => {
    switch (userRole) {
      case "super-admin": return "/super-admin";
      case "vendor": return "/vendor";
      case "customer": return "/customer";
      default: return "/login";
    }
  };

  const PortalLink = () => (
    <Link href={getPortalHref()} className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
        <User size={20} />
      </div>
      <span className="text-[11px] font-black text-slate-800 group-hover:text-primary transition-colors uppercase">
        {userRole ? "My Portal" : "Login / Register"}
      </span>
    </Link>
  );

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${isSticky ? "fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white animate-in slide-in-from-top duration-300" : "relative z-[40] bg-white"}`}>
      <div className="container mx-auto px-4">
        {/* Middle Row: Logo, Menu, Socials, Login */}
        <div className="flex items-center py-2 relative">
          {/* Logo (Left side) - Hidden on Mobile */}
          <div className="flex-1 hidden lg:flex justify-start">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/Smart-Kids-Logo.webp" 
                alt="SmartKids Logo" 
                width={200} 
                height={60} 
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation Menu (Centered) */}
          <nav className="hidden lg:flex items-center">
            <Link href="/shop" className="text-[11px] font-black text-slate-800 hover:text-primary transition-colors uppercase tracking-tight px-5">Shop</Link>
            
            <div className="w-px h-3 bg-slate-100"></div>
            
            {/* Mega Menu: Our Categories */}
            <div className="group relative py-3 px-5">
              <Link href="/categories" className="text-[11px] font-black text-slate-800 hover:text-primary transition-colors uppercase tracking-tight flex items-center gap-1">
                Our Categories <ChevronDown size={12} className="text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              
              {/* Mega Menu Content (unchanged) */}
              <div className="absolute top-full -left-48 w-[900px] bg-white border border-slate-100 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] rounded-b-2xl">
                <div className="grid grid-cols-3 gap-10">
                  {/* Column 1: Electronics & Gadgets */}
                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">Electronics & Gadgets</h3>
                    <ul className="space-y-3">
                      {[
                        { name: "Learning Tablets", slug: "tablets" },
                        { name: "Smartwatches", slug: "smartwatches" },
                        { name: "Digital Cameras", slug: "cameras" },
                        { name: "Gaming Consoles", slug: "gaming" }
                      ].map((sub, i) => (
                        <li key={i}>
                          <Link href={`/category/electronics/${sub.slug}`} className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-tight flex items-center gap-2 group/item">
                            <span className="w-1 h-1 rounded-full bg-slate-200 group-hover/item:bg-primary transition-colors"></span>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Robotics | IoT */}
                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">Robotics | IoT</h3>
                    <ul className="space-y-3">
                      {[
                        { name: "Coding & Programming Kits", slug: "coding-kits" },
                        { name: "DIY Robotics Kits", slug: "diy-robotics" },
                        { name: "Sensors & Modules", slug: "sensors" },
                        { name: "Drones & RC", slug: "drones" }
                      ].map((sub, i) => (
                        <li key={i}>
                          <Link href={`/category/robotics/${sub.slug}`} className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-tight flex items-center gap-2 group/item">
                            <span className="w-1 h-1 rounded-full bg-slate-200 group-hover/item:bg-primary transition-colors"></span>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: STEM Kits */}
                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">STEM Kits</h3>
                    <ul className="space-y-3">
                      {[
                        { name: "Science Kits", slug: "science-kits" },
                        { name: "Engineering Kits", slug: "engineering-kits" },
                        { name: "Physics Experiments", slug: "physics" },
                        { name: "Chemistry Sets", slug: "chemistry" }
                      ].map((sub, i) => (
                        <li key={i}>
                          <Link href={`/category/stem-kits/${sub.slug}`} className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-tight flex items-center gap-2 group/item">
                            <span className="w-1 h-1 rounded-full bg-slate-200 group-hover/item:bg-primary transition-colors"></span>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Featured Promo in Mega Menu */}
                    <div className="mt-8 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-[10px] font-black text-primary uppercase mb-1">New Arrival</p>
                      <p className="text-xs font-black text-slate-800 uppercase leading-tight mb-2">Solar Master Kit</p>
                      <button className="text-[10px] font-black text-white bg-primary px-3 py-1.5 rounded uppercase hover:bg-primary/90 transition-all">Explore</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="w-px h-3 bg-slate-100"></div>

            <Link href="/about" className="text-[11px] font-black text-slate-800 hover:text-primary transition-colors uppercase tracking-tight px-5">About us</Link>
            
            <div className="w-px h-3 bg-slate-100"></div>

            {/* Mega Menu: SmartKids */}
            <div className="group relative py-3 px-5">
              <Link href="/smartkids" className="text-[11px] font-black text-slate-800 hover:text-primary transition-colors uppercase tracking-tight flex items-center gap-1">
                SmartKids <ChevronDown size={12} className="text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              
              {/* Mega Menu Content */}
              <div className="absolute top-full -right-48 w-[800px] bg-white border border-slate-100 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] rounded-b-2xl">
                <div className="grid grid-cols-3 gap-10">
                  {/* Column 1: Investment & Returns */}
                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">Investment & Returns</h3>
                    <ul className="space-y-3">
                      {[
                        "Investment & Return Policy", "How to Invest", "Invest Now"
                      ].map((item, i) => (
                        <li key={i}>
                          <Link href="#" className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-tight flex items-center gap-2 group/item">
                            <span className="w-1 h-1 rounded-full bg-slate-200 group-hover/item:bg-primary transition-colors"></span>
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Charity */}
                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">Charity</h3>
                    <ul className="space-y-3">
                      {[
                        "About SmartKids Charity", "SmartKids Charity Process", "Donate Now"
                      ].map((item, i) => (
                        <li key={i}>
                          <Link href="#" className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-tight flex items-center gap-2 group/item">
                            <span className="w-1 h-1 rounded-full bg-slate-200 group-hover/item:bg-primary transition-colors"></span>
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: E-Learning Platform */}
                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">E-Learning Platform</h3>
                    <ul className="space-y-3">
                      {[
                        "About E-Learning Platform", "How You Will be Benefited", "Explore E-Learning Platform"
                      ].map((item, i) => (
                        <li key={i}>
                          <Link href="#" className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-tight flex items-center gap-2 group/item">
                            <span className="w-1 h-1 rounded-full bg-slate-200 group-hover/item:bg-primary transition-colors"></span>
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>



          {/* Right Section (Right side) */}
          <div className="flex-1 hidden lg:flex items-center justify-end gap-6">
            <div className="flex items-center gap-2 pr-6 border-r border-slate-100">
              <Link href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                <Facebook size={14} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                <Instagram size={14} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                <Youtube size={14} />
              </Link>
            </div>
            
            <Link href="/become-affiliate" className="text-[11px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-tight">Become an Affiliate</Link>
            
            <PortalLink />
          </div>
        </div>

        {/* Bottom Row: Browse Categories & Search */}
        {!isSticky && (
          <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-12 gap-6 lg:gap-8 items-stretch border-t border-slate-100">
            {/* Browse Categories (Green Block) */}
            <div className="lg:col-span-1 xl:col-span-3">
              <div className="relative group h-full">
                <button className="w-full h-full flex items-center justify-between bg-primary text-white px-6 py-4 font-bold text-sm transition-colors hover:bg-primary/95">
                <div className="flex items-center gap-3">
                  <Menu size={20} />
                  BROWSE CATEGORIES
                </div>
                <ChevronDown size={18} className={`transition-transform duration-300 ${isHome ? "rotate-0" : "group-hover:rotate-180"}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 w-full bg-white border border-slate-100 transition-all duration-300 z-50 flex flex-col 
                ${isHome ? "opacity-100 visible h-[584px]" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible h-auto py-2"}`}>
                <nav className="py-2 flex-grow">
                  {categories.map((cat, index) => (
                    <div key={index} className="relative group/category">
                      <Link 
                        href={cat.href}
                        className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 hover:text-primary transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 group-hover/category:text-primary transition-colors">
                            {cat.icon}
                          </span>
                          <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                        </div>
                        {cat.subcategories ? (
                          <ChevronRight size={14} className="text-slate-300 group-hover/category:text-primary transition-transform" />
                        ) : (
                          <ChevronRight size={14} className="text-slate-300 group-hover/category:text-primary" />
                        )}
                      </Link>

                      {/* Sub-menu Dropdown */}
                      {cat.subcategories && (
                        <div className="absolute top-0 left-full w-72 bg-white shadow-2xl border border-slate-100 py-2 opacity-0 invisible group-hover/category:opacity-100 group-hover/category:visible transition-all duration-300 z-[100] rounded-r-xl -ml-px">
                          {cat.subcategories.map((sub: any, subIdx: number) => (
                            <Link 
                              key={subIdx} 
                              href={`/category/${cat.slug}/${sub.slug}`}
                              className="block px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-all border-b border-slate-50 last:border-0"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                  <div className="bg-white rounded-lg p-4 text-center border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">New Arrivals</p>
                    <p className="text-xs font-black text-slate-800 mb-3 uppercase">Robotics Masterclass</p>
                    <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Shop Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Area */}
          <div className="lg:col-span-3 xl:col-span-6 flex items-center py-2">
              <div className="flex-grow flex items-center border border-slate-200 rounded relative">
                <input 
                  type="text" 
                  placeholder="Search for products" 
                  className="flex-grow px-6 py-3 text-sm focus:outline-none text-black italic rounded-l"
                />
                
                {/* Image Search Button */}
                <div className="relative flex items-center px-4 border-l border-slate-100 group/image-search">
                  <input 
                    type="file" 
                    id="imageSearchInput" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setIsImageSearchLoading(true);
                        setFoundProducts([]);
                        setSelectedImage(URL.createObjectURL(file));
                        // Simulate Image Search Processing with "Intelligence"
                        setTimeout(() => {
                          setIsImageSearchLoading(false);
                          // Select 2 random products from sample list
                          const shuffled = [...sampleProducts].sort(() => 0.5 - Math.random());
                          setFoundProducts(shuffled.slice(0, 2));
                        }, 3500);
                      }
                    }}
                  />
                  <label 
                    htmlFor="imageSearchInput"
                    className="cursor-pointer text-slate-400 hover:text-primary transition-colors p-2"
                    title="Search by image"
                  >
                    {isImageSearchLoading ? (
                      <Loader2 size={20} className="animate-spin text-primary" />
                    ) : (
                      <Camera size={20} />
                    )}
                  </label>

                  {/* Image Search Preview Overlay */}
                  <AnimatePresence>
                    {(isImageSearchLoading || selectedImage) && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute top-full right-0 mt-4 w-80 bg-white border border-slate-100 rounded-[32px] p-6 z-[60]"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">AI Visual Search</p>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedImage(null);
                              setFoundProducts([]);
                            }}
                            className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 mb-6 group/preview">
                          {selectedImage && (
                            <Image 
                              src={selectedImage} 
                              alt="Search Preview" 
                              fill 
                              className={`object-cover transition-all duration-700 ${isImageSearchLoading ? "opacity-50 scale-110 blur-[2px]" : "opacity-100 scale-100"}`}
                            />
                          )}
                          {isImageSearchLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              {/* Scanning Animation Line */}
                              <motion.div 
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(88,194,125,0.8)] z-10"
                              ></motion.div>
                              
                              <Loader2 size={32} className="animate-spin text-primary mb-3 relative z-20" />
                              <p className="text-[11px] font-black text-white uppercase tracking-widest relative z-20">Analyzing Image...</p>
                            </div>
                          )}
                        </div>
                        
                        {!isImageSearchLoading && foundProducts.length > 0 ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Matches Found ({foundProducts.length})</p>
                              <div className="flex gap-1">
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[9px] font-bold text-slate-500 uppercase">Robotics</span>
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[9px] font-bold text-slate-500 uppercase">STEM</span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {foundProducts.map((product) => (
                                <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  key={product.id}
                                  className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-lg transition-all group/item"
                                >
                                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 shadow-sm border border-slate-100">
                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-tighter mb-0.5">{product.category}</p>
                                    <h4 className="text-[11px] font-black text-slate-800 uppercase leading-tight truncate">{product.name}</h4>
                                    <p className="text-xs font-black text-slate-900 mt-1">৳ {product.price.toFixed(2)}</p>
                                  </div>
                                  <ChevronRight size={16} className="text-slate-300 group-hover/item:text-primary transition-colors" />
                                </motion.div>
                              ))}
                            </div>

                            <button 
                              className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200 mt-2"
                              onClick={() => setSelectedImage(null)}
                            >
                              See All Matches
                            </button>
                          </div>
                        ) : !isImageSearchLoading && (
                          <div className="text-center py-4">
                            <p className="text-xs font-bold text-slate-400 italic uppercase">Processing completed.</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative h-full">
                  <div 
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="h-full px-6 border-l border-slate-100 flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-tight cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap min-w-[160px]"
                  >
                    <span className={selectedCategory !== "Select Category" ? "text-primary" : ""}>
                      {selectedCategory}
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`} />
                  </div>

                  {/* Category Dropdown */}
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <>
                        {/* Backdrop to close dropdown */}
                        <div 
                          className="fixed inset-0 z-[55]" 
                          onClick={() => setIsCategoryOpen(false)}
                        ></div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl py-3 z-[60] overflow-hidden"
                        >
                          <div className="px-4 py-2 border-b border-slate-50 mb-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter by Category</p>
                          </div>
                          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            <button
                              onClick={() => {
                                setSelectedCategory("Select Category");
                                setIsCategoryOpen(false);
                              }}
                              className="w-full text-left px-6 py-3 text-[11px] font-bold text-slate-500 hover:text-primary hover:bg-slate-50 transition-all uppercase tracking-tight flex items-center gap-3"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                              All Categories
                            </button>
                            {categories.map((cat, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedCategory(cat.name);
                                  setIsCategoryOpen(false);
                                }}
                                className={`w-full text-left px-6 py-3 text-[11px] font-bold transition-all uppercase tracking-tight flex items-center gap-3
                                  ${selectedCategory === cat.name ? "text-primary bg-primary/5" : "text-slate-500 hover:text-primary hover:bg-slate-50"}`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat.name ? "bg-primary" : "bg-slate-200"}`}></span>
                                {cat.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                <button className="bg-primary text-white p-3 hover:bg-primary/90 transition-colors rounded-r">
                  <Search size={22} />
                </button>
              </div>
            </div>

            {/* Support & Cart */}
            <div className="hidden xl:flex xl:col-span-3 items-center justify-end gap-6">
              <div className="flex items-center gap-6 text-primary">
                <PhoneCall size={28} strokeWidth={1} />
                <div className="leading-tight">
                  <p className="text-[10px] font-black uppercase tracking-tight text-slate-400">24/7 Support</p>
                  <p className="text-xs font-black">+8809614556655</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-slate-100 pl-6 py-2">
                <Link href="/wishlist" className="relative p-2 text-slate-700 hover:text-primary transition-all group">
                  <div className="relative">
                    <Heart size={20} strokeWidth={2.5} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                </Link>

                <Link href="/cart" className="relative p-2 text-slate-700 hover:text-primary transition-all group">
                  <div className="relative">
                    <ShoppingCart size={20} strokeWidth={2.5} />
                    <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                      {cartCount}
                    </span>
                  </div>
                </Link>
                <div className="leading-tight">
                  <p className="text-xs font-black text-slate-800">৳ {cartTotal.toFixed(2)}</p>
                  <p className="text-[9px] text-slate-400 font-bold">{cartCount} items</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Header - Refined */}
        <div className="lg:hidden py-3 flex items-center justify-between">
          {/* Drawer Menu (Left) */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-600 hover:bg-primary/10 hover:text-primary transition-all"
          >
            <Menu size={24} />
          </button>

          {/* Logo (Right) */}
          <Link href="/">
            <Image 
              src="/Smart-Kids-Logo.webp" 
              alt="SmartKids Logo" 
              width={120} 
              height={32} 
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Mobile Search Bar (Expandable) */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-slate-100 py-4"
            >
              <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
                <Search size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="bg-transparent border-none focus:ring-0 text-sm px-3 py-1 flex-grow italic"
                />
                <button className="text-slate-400 p-1">
                  <Camera size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            
            {/* Drawer Content */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[400px] bg-white z-[101] lg:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <Image src="/Smart-Kids-Logo.webp" alt="Logo" width={120} height={32} className="h-7 w-auto" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Scroll Area */}
              <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* Search Bar in Drawer */}
                <div className="relative">
                  <div className="flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 focus-within:border-primary/30 transition-all">
                    <Search size={18} className="text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      className="bg-transparent border-none focus:ring-0 text-sm px-3 flex-grow font-medium"
                    />
                  </div>
                </div>

                {/* Main Navigation */}
                <nav className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Navigation</p>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-800 font-bold uppercase text-sm tracking-tight transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all"><Menu size={18} /></div>
                    Home
                  </Link>
                  <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-800 font-bold uppercase text-sm tracking-tight transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all"><ShoppingBag size={18} /></div>
                    Shop
                  </Link>
                  <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-800 font-bold uppercase text-sm tracking-tight transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all relative">
                      <Heart size={18} />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                    My Wishlist
                  </Link>
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-800 font-bold uppercase text-sm tracking-tight transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all"><Info size={18} /></div>
                    About Us
                  </Link>
                </nav>

                {/* Categories Accordion */}
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Our Categories</p>
                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((cat, idx) => (
                      <Link 
                        key={idx}
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-primary">{cat.icon}</div>
                          <span className="text-sm font-bold text-slate-700">{cat.name}</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Links */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <Link href="/become-affiliate" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors">Become an Affiliate</Link>
                  <Link href="/newsletter" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors">Newsletter</Link>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors">Contact Us</Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Need Help?</p>
                  <p className="text-sm font-black text-primary">+8809614556655</p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1877F2] transition-all"><Facebook size={18} /></Link>
                  <Link href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E4405F] transition-all"><Instagram size={18} /></Link>
                  <Link href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#FF0000] transition-all"><Youtube size={18} /></Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 z-[90] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <Link href="/" className={`flex flex-col items-center gap-1 transition-all ${pathname === "/" ? "text-primary" : "text-slate-400"}`}>
            <motion.div whileTap={{ scale: 0.9 }}>
              <div className={`p-1 ${pathname === "/" ? "bg-primary/10 rounded-xl" : ""}`}>
                <Menu size={20} />
              </div>
            </motion.div>
            <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
          </Link>
          
          <Link href="/shop" className={`flex flex-col items-center gap-1 transition-all ${pathname === "/shop" ? "text-primary" : "text-slate-400"}`}>
            <motion.div whileTap={{ scale: 0.9 }}>
              <div className={`p-1 ${pathname === "/shop" ? "bg-primary/10 rounded-xl" : ""}`}>
                <ShoppingBag size={20} />
              </div>
            </motion.div>
            <span className="text-[9px] font-black uppercase tracking-widest">Shop</span>
          </Link>
          
          <Link href="/cart" className={`flex flex-col items-center gap-1 transition-all ${pathname === "/cart" ? "text-primary" : "text-slate-400"}`}>
            <motion.div whileTap={{ scale: 0.9 }} className="relative">
              <div className={`p-1 ${pathname === "/cart" ? "bg-primary/10 rounded-xl" : ""}`}>
                <ShoppingCart size={20} />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </motion.div>
            <span className="text-[9px] font-black uppercase tracking-widest">Cart</span>
          </Link>
          
          <Link href={getPortalHref()} className={`flex flex-col items-center gap-1 transition-all ${pathname.startsWith("/vendor") || pathname.startsWith("/customer") || pathname.startsWith("/super-admin") ? "text-primary" : "text-slate-400"}`}>
            <motion.div whileTap={{ scale: 0.9 }}>
              <div className={`p-1 ${pathname.startsWith("/vendor") || pathname.startsWith("/customer") || pathname.startsWith("/super-admin") ? "bg-primary/10 rounded-xl" : ""}`}>
                <User size={20} />
              </div>
            </motion.div>
            <span className="text-[9px] font-black uppercase tracking-widest">Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
