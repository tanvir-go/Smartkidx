"use client";

import { useState } from "react";
import ProductCard from "../product/ProductCard";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Arduino Uno R3 Ultimate Starter Kit for Kids",
    category: "Robotics | IoT",
    price: 45.00,
    oldPrice: 55.00,
    discount: 18,
    image: "/images/demo/hero1.png",
    rating: 4.9,
    reviews: 124,
    isHot: true
  },
  {
    id: 2,
    name: "Magnetic Building Blocks Set - 120 Pieces",
    category: "Kids Toys",
    price: 32.50,
    image: "/images/demo/hero2.png",
    rating: 4.7,
    reviews: 86,
    isNew: true
  },
  {
    id: 3,
    name: "STEM Solar Robot Kit 12-in-1 Educational Toy",
    category: "Robotics | IoT",
    price: 24.99,
    oldPrice: 29.99,
    discount: 16,
    image: "/images/demo/hero3.png",
    rating: 4.8,
    reviews: 210
  },
  {
    id: 4,
    name: "3D Drawing Pen for Creative Kids with Refills",
    category: "Stationary",
    price: 39.00,
    oldPrice: 49.00,
    discount: 20,
    image: "/images/demo/3d_pen.png",
    rating: 4.5,
    reviews: 54
  },
  {
    id: 5,
    name: "Human Anatomy Model for Kids - 15 Pieces",
    category: "STEM Kits",
    price: 19.50,
    image: "/images/demo/anatomy_model.png",
    rating: 4.9,
    reviews: 42
  },
  {
    id: 6,
    name: "Walkie Talkies for Kids - 3 Mile Range",
    category: "Electronics & Gadgets",
    price: 28.00,
    oldPrice: 35.00,
    discount: 20,
    image: "/images/demo/walkie_talkies.png",
    rating: 4.6,
    reviews: 112,
    isNew: true
  },
  {
    id: 7,
    name: "Learning Python for Kids - Interactive Book",
    category: "Books",
    price: 25.00,
    image: "/images/demo/hero3.png",
    rating: 5.0,
    reviews: 45
  }
];

const categories = ["ALL", "ROBOTICS", "TOYS", "BOOKS"];

export default function MostPopular() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredProducts = products.filter(product => {
    if (activeTab === "ALL") return true;
    if (activeTab === "ROBOTICS") return product.category.toLowerCase().includes("robotics");
    if (activeTab === "TOYS") return product.category.toLowerCase().includes("toys");
    if (activeTab === "BOOKS") return product.category.toLowerCase().includes("books");
    return true;
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-display font-black text-slate-900 mb-2 uppercase tracking-tight">Most Popular Products</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
          <div className="flex gap-4">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-xs font-black transition-all pb-1 border-b-2 uppercase tracking-widest ${
                  activeTab === cat 
                    ? "text-primary border-primary" 
                    : "text-slate-400 border-transparent hover:text-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <Link href="/shop">
            <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-primary transition-all shadow-xl shadow-slate-200">
              VIEW ALL PRODUCTS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
