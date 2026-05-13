"use client";

import React, { useState } from "react";
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Truck,
  FileText,
  Save,
  CheckCircle2,
  Box
} from "lucide-react";
import { toast } from "react-toastify";

// Mock Products Database
const MOCK_PRODUCTS = [
  { id: "P1", name: "Advanced Robotics Kit V2", price: 4500, stock: 15 },
  { id: "P2", name: "Beginner Electronics Set", price: 1250, stock: 42 },
  { id: "P3", name: "Solar Powered Car Model", price: 850, stock: 8 },
  { id: "P4", name: "Smart Coding Robot", price: 6700, stock: 5 },
  { id: "P5", name: "Chemistry Lab Starter Kit", price: 2100, stock: 24 },
];

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function EmployeeCreateOrdersPage() {
  // Form State
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [address, setAddress] = useState({ street: "", city: "", zip: "" });
  
  // Order State
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express" | "pickup">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "card">("cod");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived State
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !cart.some(item => item.id === p.id) // Hide products already in cart
  );

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === "express" ? 150 : shippingMethod === "standard" ? 60 : 0;
  const tax = subtotal * 0.05; // 5% simulated tax
  const grandTotal = subtotal + shippingCost + tax;

  // Handlers
  const addToCart = (product: typeof MOCK_PRODUCTS[0]) => {
    setCart([...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }]);
    setSearchQuery("");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error("Please add at least one product to the order.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Order created successfully!");
      
      // Reset form
      setCustomer({ name: "", email: "", phone: "" });
      setAddress({ street: "", city: "", zip: "" });
      setCart([]);
      setNotes("");
      setShippingMethod("standard");
      setPaymentMethod("cod");
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Create Order</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Manual entry portal for phone, email, or in-person orders.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Form Sections */}
        <div className="flex-1 space-y-6">
          
          {/* Section 1: Customer Details */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2">
              <User size={20} className="text-primary" /> Customer Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all" placeholder="John Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number *</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="tel" required value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all" placeholder="+880 1..." />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address (Optional)</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all" placeholder="customer@example.com" />
                </div>
              </div>
            </div>

            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Shipping Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address *</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all" placeholder="House 12, Road 5..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City *</label>
                <input type="text" required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all" placeholder="Dhaka" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Postal Code</label>
                <input type="text" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all" placeholder="1205" />
              </div>
            </div>
          </div>

          {/* Section 2: Order Items */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2">
              <Box size={20} className="text-primary" /> Order Items
            </h3>

            {/* Product Search */}
            <div className="relative mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all" 
                placeholder="Search products to add..." 
              />
              
              {/* Search Results Dropdown */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden z-20 max-h-60 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <button 
                        key={product.id}
                        type="button"
                        onClick={() => addToCart(product)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-50 transition-colors text-left"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800">{product.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">{product.stock} in stock</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-black text-slate-800">৳ {product.price.toLocaleString()}</span>
                          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <Plus size={16} />
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-6 text-center text-slate-500 text-sm font-bold">No products found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Cart List */}
            {cart.length > 0 ? (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">{item.name}</p>
                      <p className="text-[11px] font-black text-slate-400">৳ {item.price.toLocaleString()} / unit</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-1">
                        <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-black w-4 text-center text-slate-800">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="w-24 text-right">
                        <span className="text-sm font-black text-slate-800">৳ {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                      
                      <button type="button" onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center">
                <Box size={32} className="text-slate-300 mb-3" />
                <p className="text-sm font-bold text-slate-500">No items added to order</p>
                <p className="text-[11px] font-bold text-slate-400 mt-1">Search and select products above</p>
              </div>
            )}
          </div>

          {/* Section 3: Fulfillment & Payment Options */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                <Truck size={16} className="text-primary" /> Shipping Method
              </h3>
              <div className="space-y-2">
                {[
                  { id: "standard", label: "Standard Delivery (3-5 Days)", price: "৳ 60" },
                  { id: "express", label: "Express Delivery (Next Day)", price: "৳ 150" },
                  { id: "pickup", label: "In-Store Pickup", price: "Free" }
                ].map(method => (
                  <label key={method.id} className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-colors ${shippingMethod === method.id ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${shippingMethod === method.id ? 'border-primary' : 'border-slate-300'}`}>
                        {shippingMethod === method.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{method.label}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-500">{method.price}</span>
                    <input type="radio" name="shipping" value={method.id} checked={shippingMethod === method.id} onChange={(e) => setShippingMethod(e.target.value as any)} className="hidden" />
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                <CreditCard size={16} className="text-primary" /> Payment Method
              </h3>
              <div className="space-y-2">
                {[
                  { id: "cod", label: "Cash on Delivery" },
                  { id: "bkash", label: "bKash Mobile Money" },
                  { id: "card", label: "Credit/Debit Card" }
                ].map(method => (
                  <label key={method.id} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary' : 'border-slate-300'}`}>
                      {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{method.label}</span>
                    <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value as any)} className="hidden" />
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-2 mt-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Order Notes (Optional)</label>
              <textarea 
                rows={3} 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all resize-none" 
                placeholder="Any special instructions for delivery..." 
              />
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Order Summary */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-xl shadow-slate-900/10 sticky top-28 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2 relative z-10">
              <FileText size={20} className="text-primary" /> Order Summary
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-400">Subtotal ({cart.length} items)</span>
                <span className="font-black">৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-400">Shipping</span>
                <span className="font-black">৳ {shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-700 pb-4">
                <span className="font-bold text-slate-400">Estimated Tax (5%)</span>
                <span className="font-black">৳ {tax.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-end pt-2 mb-8">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grand Total</span>
                <span className="text-3xl font-black text-white tracking-tighter">৳ {grandTotal.toLocaleString()}</span>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={18} /> Place Order
                  </>
                )}
              </button>

              <div className="text-center mt-4 flex items-center justify-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 py-2 rounded-xl">
                <CheckCircle2 size={12} /> Secure Internal Processing
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
