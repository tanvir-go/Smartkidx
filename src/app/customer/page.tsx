"use client";

import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard,
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Clock,
  Zap,
  Gift,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { name: "REWARD POINTS", value: "2,450", change: "+150", trend: "up", icon: <Gift size={20} className="text-primary" />, color: "bg-primary/10" },
  { name: "ACTIVE ORDERS", value: "02", change: "On Time", trend: "up", icon: <Truck size={20} className="text-blue-500" />, color: "bg-blue-50" },
  { name: "WISHLIST ITEMS", value: "15", change: "+3", trend: "up", icon: <Heart size={20} className="text-rose-500" />, color: "bg-rose-50" },
  { name: "TOTAL SAVINGS", value: "৳ 1,200", change: "This Year", trend: "up", icon: <Zap size={20} className="text-amber-500" />, color: "bg-amber-50" },
];

const purchaseHistory = [
  { id: "#SK-9823", date: "Oct 24, 2023", product: "Arduino Uno R3", amount: "৳ 1,200", status: "SHIPPED", icon: <Package size={18} className="text-blue-500" /> },
  { id: "#SK-9712", date: "Oct 12, 2023", product: "Magnetic Blocks", amount: "৳ 2,400", status: "DELIVERED", icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
  { id: "#SK-9645", date: "Sept 28, 2023", product: "STEM Solar Robot", amount: "৳ 1,500", status: "DELIVERED", icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
];

const mockAddresses = [
  { id: 1, label: "Home", name: "John Smith", address: "House 24, Road 12, Block E, Banani, Dhaka - 1213", phone: "+880 1712 345678", isDefault: true },
  { id: 2, label: "Office", name: "John Smith", address: "Plot 16, Level 4, Sector 7, Uttara, Dhaka - 1230", phone: "+880 1712 345678", isDefault: false },
  { id: 3, label: "Parents' House", name: "John Smith", address: "Road 5, House 12, Agrabad C/A, Chittagong - 4100", phone: "+880 1712 345678", isDefault: false },
];

const mockPaymentMethods = [
  { id: 1, type: "VISA", number: "•••• •••• •••• 4242", expiry: "12/25", holder: "John Smith", color: "bg-slate-800", isPrimary: true },
  { id: 2, type: "MASTERCARD", number: "•••• •••• •••• 5555", expiry: "08/26", holder: "John Smith", color: "bg-indigo-900", isPrimary: false },
  { id: 3, type: "BKASH", number: "01712 ••• 678", expiry: "Mobile Wallet", holder: "John Smith", color: "bg-[#D12053]", isPrimary: false },
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">My Profile</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Welcome back! Here's what's happening with your account.</p>
        </div>
        <Link href="/shop">
          <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] hover:bg-primary transition-all shadow-xl shadow-slate-200 group">
            Continue Shopping <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const card = (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={stat.name} 
              className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.name}</p>
                <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-amber-500"}`}>
                  <span className="opacity-70">{stat.change}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                  {stat.icon}
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-primary opacity-10 group-hover:opacity-30 transition-opacity`}></div>
            </motion.div>
          );

          if (stat.name === "WISHLIST ITEMS") {
            return (
              <Link href="/customer/wishlist" key={stat.name} className="block">
                {card}
              </Link>
            );
          }

          if (stat.name === "ACTIVE ORDERS") {
            return (
              <Link href="/customer/orders" key={stat.name} className="block">
                {card}
              </Link>
            );
          }

          return card;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Tracking Timeline */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Active Order Tracking</h3>
            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Order #SK-9823</span>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-5 left-4 right-4 h-0.5 bg-slate-100"></div>
            
            <div className="relative flex justify-between">
              {[
                { name: "Order Placed", date: "Oct 24", icon: <ShoppingBag size={14} />, status: "completed" },
                { name: "Processing", date: "Oct 25", icon: <Package size={14} />, status: "completed" },
                { name: "Shipped", date: "Oct 26", icon: <Truck size={14} />, status: "active" },
                { name: "Delivered", date: "Expected Oct 28", icon: <CheckCircle2 size={14} />, status: "pending" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3 relative z-10 bg-white px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.status === "completed" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" :
                    step.status === "active" ? "bg-blue-500 text-white shadow-lg shadow-blue-200 animate-pulse" :
                    "bg-slate-50 text-slate-300"
                  }`}>
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <p className={`text-[10px] font-black uppercase tracking-tight ${
                      step.status === "pending" ? "text-slate-400" : "text-slate-800"
                    }`}>{step.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase leading-none">Estimated Delivery</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Tomorrow, by 6:00 PM</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-800 uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm">
              Track Detailed
            </button>
          </div>
        </div>

        {/* Spending Analysis */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm mb-10">Spending by Category</h3>
          
          <div className="flex flex-col items-center">
            {/* Mock Donut */}
            <div className="relative w-48 h-48 mb-8">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#F1F5F9" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#58C27D" strokeWidth="4" strokeDasharray="50 50" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-50" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-80" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Spent</p>
                <p className="text-xl font-black text-slate-800 mt-1">৳ 5.2k</p>
              </div>
            </div>

            <div className="w-full space-y-4">
              {[
                { name: "Robotics", percent: 50, color: "bg-primary" },
                { name: "STEM Kits", percent: 30, color: "bg-blue-500" },
                { name: "Kids Toys", percent: 20, color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-800">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Account Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-3">
              <MapPin size={20} className="text-primary" /> Saved Addresses
            </h3>
            <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">Manage All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar h-full">
            {mockAddresses.map((addr) => (
              <div 
                key={addr.id} 
                className={`min-w-[280px] p-6 rounded-2xl border transition-all relative group cursor-pointer h-full flex flex-col justify-between ${
                  addr.isDefault ? "bg-white border-primary shadow-xl shadow-primary/5" : "bg-slate-50 border-slate-100 hover:bg-white hover:shadow-lg"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      addr.isDefault ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      {addr.label}
                    </span>
                    {addr.isDefault && <CheckCircle2 size={16} className="text-primary" />}
                  </div>
                  <p className="text-sm font-black text-slate-800">{addr.name}</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed italic">
                    {addr.address}
                  </p>
                </div>
                <p className="text-xs font-black text-slate-800 mt-4">{addr.phone}</p>
              </div>
            ))}
            <button className="min-w-[150px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:border-primary hover:text-primary transition-all group">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-all">
                <Plus size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Add New</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-3">
              <CreditCard size={20} className="text-primary" /> Payment Methods
            </h3>
            <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">Manage All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar h-full">
            {mockPaymentMethods.map((pm) => (
              <div 
                key={pm.id} 
                className={`min-w-[280px] p-6 rounded-2xl shadow-xl transition-all relative overflow-hidden group cursor-pointer h-full flex flex-col justify-between ${pm.color} ${
                  pm.isPrimary ? "shadow-slate-300" : "opacity-80 hover:opacity-100"
                }`}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-7 bg-white/20 rounded flex items-center justify-center text-[10px] text-white font-bold italic tracking-tighter">
                      {pm.type}
                    </div>
                    {pm.isPrimary ? (
                      <Zap size={20} className="text-amber-400" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    )}
                  </div>
                  <p className="text-white text-lg font-black tracking-widest">{pm.number}</p>
                </div>
                
                <div className="relative z-10 flex justify-between items-end mt-8">
                  <div>
                    <p className="text-white/40 text-[8px] font-black uppercase tracking-widest">Expiry</p>
                    <p className="text-white text-[10px] font-black">{pm.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[8px] font-black uppercase tracking-widest">Card Holder</p>
                    <p className="text-white text-[10px] font-black uppercase">{pm.holder}</p>
                  </div>
                </div>
                
                {/* Design accents */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
                <div className="absolute -left-4 -top-4 w-16 h-16 bg-black/10 rounded-full blur-xl group-hover:bg-black/5 transition-all"></div>
              </div>
            ))}
            <button className="min-w-[150px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:border-primary hover:text-primary transition-all group">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-all">
                <Plus size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Add New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Purchase History Table */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Purchase History</h3>
          <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Download All Receipts</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ORDER ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">PRODUCT</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">DATE</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">AMOUNT</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">STATUS</th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {purchaseHistory.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-500">{order.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                        {order.icon}
                      </div>
                      <span className="text-[11px] font-black text-slate-800 uppercase">{order.product}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-500">{order.date}</td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-900">{order.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-500" : "bg-blue-50 text-blue-500"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="px-4 py-1.5 border border-slate-200 text-slate-800 text-[9px] font-black uppercase tracking-widest rounded-lg hover:border-primary hover:text-primary transition-all shadow-sm">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
