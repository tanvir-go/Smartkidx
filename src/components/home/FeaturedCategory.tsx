"use client";

import Link from "next/link";
import ProductCard from "../product/ProductCard";

const products = [
  { id: 1, name: "Educational Robot Kit", category: "Robotics", price: 45.00, oldPrice: 55.00, discount: 18, image: "/images/robotics-kit.png", rating: 4.8 },
  { id: 2, name: "STEM Solar Car", category: "STEM", price: 24.99, image: "/images/solar-car.png", rating: 4.7 },
  { id: 3, name: "Arduino Uno Kit", category: "Electronics", price: 35.00, image: "https://placehold.co/400x400/png?text=Arduino", rating: 4.9 },
  { id: 4, name: "Coding Tablet", category: "Gadgets", price: 89.00, oldPrice: 110.00, discount: 19, image: "https://placehold.co/400x400/png?text=Tablet", rating: 4.5 },
  { id: 5, name: "3D Pen for Kids", category: "Arts", price: 29.00, image: "https://placehold.co/400x400/png?text=3D+Pen", rating: 4.6 },
  { id: 6, name: "Electronic Lab", category: "STEM", price: 59.00, image: "https://placehold.co/400x400/png?text=Lab", rating: 4.8 },
  { id: 7, name: "Smart Watch v2", category: "Gadgets", price: 42.00, image: "https://placehold.co/400x400/png?text=Watch", rating: 4.4 },
  { id: 8, name: "DIY Drone Kit", category: "Robotics", price: 120.00, image: "https://placehold.co/400x400/png?text=Drone", rating: 4.9 },
  { id: 9, name: "Microscope Set", category: "STEM", price: 55.00, image: "https://placehold.co/400x400/png?text=Microscope", rating: 4.7 },
  { id: 10, name: "Science Journal", category: "Books", price: 12.00, image: "https://placehold.co/400x400/png?text=Journal", rating: 5 },
];

export default function FeaturedCategory() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Electronics | Robotics | IOT</h2>
          <Link href="/shop" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Large Side Banner */}
          <div className="lg:w-1/4 relative rounded-[32px] overflow-hidden group min-h-[400px]">
             <img 
               src="https://placehold.co/600x1000/png?text=STEM+Innovation+Banner" 
               alt="Featured Category"
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 leading-none">Little Scientist<br/>STEM Projects</h3>
                <Link href="/shop" className="bg-primary text-white w-fit px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Shop Now
                </Link>
             </div>
          </div>

          {/* Product Grid (2x5 or 2x4 on smaller) */}
          <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
