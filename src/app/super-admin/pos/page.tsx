"use client";

import { 
  Monitor, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  CreditCard, 
  Banknote,
  ShoppingCart,
  Printer
} from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "Robotics Starter Kit", price: 2500, category: "Electronics" },
  { id: 2, name: "STEM Solar Car Kit", price: 1200, category: "Robotics" },
  { id: 3, name: "Arduino Uno R3", price: 850, category: "Electronics" },
  { id: 4, name: "DIY Drone Kit", price: 4500, category: "Robotics" },
  { id: 5, name: "Breadboard Large", price: 350, category: "Electronics" },
];

export default function POSPage() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="flex gap-8 h-[calc(100vh-160px)] animate-in fade-in duration-500">
      {/* Product Selection */}
      <div className="flex-grow space-y-6 overflow-y-auto pr-4 custom-scrollbar">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-0 z-10">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products by SKU, name or barcode..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {["All", "Electronics", "Robotics", "Kits", "Books"].map(cat => (
              <button key={cat} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                cat === "All" ? "bg-primary text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => addToCart(product)}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group active:scale-95"
            >
              <div className="w-full aspect-square bg-slate-50 rounded-2xl mb-4 flex items-center justify-center text-slate-200 group-hover:text-primary transition-colors">
                <ShoppingCart size={48} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight line-clamp-1">{product.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{product.category}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-black text-primary">৳ {product.price}</p>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                  <Plus size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Billing */}
      <div className="w-[400px] bg-white rounded-[40px] border border-slate-100 shadow-xl flex flex-col overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Current Cart</h3>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{cart.length} Items</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
            <User size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Select Customer</span>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-50">
              <ShoppingCart size={48} />
              <p className="text-xs font-black uppercase tracking-widest">Cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Monitor size={20} />
                </div>
                <div className="flex-grow overflow-hidden">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight truncate">{item.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">৳ {item.price} x {item.qty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 bg-slate-50 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Subtotal</span>
              <span>৳ {total}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Tax (5%)</span>
              <span>৳ {total * 0.05}</span>
            </div>
            <div className="h-px bg-slate-200 my-4"></div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Total Amount</span>
              <span className="text-2xl font-black text-primary">৳ {total * 1.05}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl hover:border-primary hover:text-primary transition-all">
              <Banknote size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Cash</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl hover:border-primary hover:text-primary transition-all">
              <CreditCard size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Card</span>
            </button>
          </div>

          <button 
            onClick={() => window.print()}
            className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Printer size={18} /> Complete Payment & Print
          </button>
        </div>
      </div>
    </div>
  );
}
