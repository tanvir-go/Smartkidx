"use client";

import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  ShoppingBag, 
  AlertCircle,
  Truck,
  RotateCcw,
  MousePointer2,
  Package,
  Globe,
  MoreVertical,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { name: "TOTAL SALES", value: "$4,876", change: "+10.1%", trend: "up", icon: <ShoppingCart size={20} className="text-emerald-500" />, color: "bg-emerald-50" },
  { name: "TOTAL ORDERS", value: "1M", change: "-0.5%", trend: "down", icon: <ShoppingBag size={20} className="text-red-500" />, color: "bg-red-50" },
  { name: "TOTAL CUSTOMERS", value: "50,000", change: "+5.1%", trend: "up", icon: <Users size={20} className="text-emerald-500" />, color: "bg-emerald-50" },
  { name: "SHIPPING DELAYS", value: "500", change: "-5.1%", trend: "down", icon: <Truck size={20} className="text-red-500" />, color: "bg-red-50" },
  { name: "REFUND REQUESTS", value: "4,876", change: "+5.1%", trend: "up", icon: <RotateCcw size={20} className="text-emerald-500" />, color: "bg-emerald-50" },
  { name: "STOCK PRODUCTS", value: "4,876", change: "-0.5%", trend: "down", icon: <Package size={20} className="text-red-500" />, color: "bg-red-50" },
  { name: "ABANDONED CARTS", value: "4,876", change: "+5.1%", trend: "up", icon: <MousePointer2 size={20} className="text-emerald-500" />, color: "bg-emerald-50" },
  { name: "PAYMENT FAILURES", value: "4,876", change: "-0.5%", trend: "down", icon: <AlertCircle size={20} className="text-red-500" />, color: "bg-red-50" },
];

const countries = [
  { name: "Canada", code: "CA", sales: "2480k", trend: "up" },
  { name: "Korea", code: "KR", sales: "200k", trend: "down" },
  { name: "France", code: "FR", sales: "300k", trend: "up" },
  { name: "German", code: "DE", sales: "40000k", trend: "down" },
];

const fulfillment = [
  { name: "Shipped orders", count: 50, total: 100, color: "bg-blue-500" },
  { name: "Delivered", count: 40, total: 100, color: "bg-emerald-500" },
  { name: "Pending shipments", count: 20, total: 100, color: "bg-orange-500" },
  { name: "Stock orders", count: 10, total: 100, color: "bg-red-500" },
  { name: "Back Product", count: 2, total: 100, color: "bg-slate-800" },
];

const recentOrders = [
  { id: "#254830", customer: "John Doe", date: "12 Sept, 2027", product: "Wireless Mouse", amount: "$20", status: "PENDING" },
  { id: "#254831", customer: "Jane Smith", date: "12 Sept, 2027", product: "Gaming Keyboard", amount: "$40", status: "DELIVERED" },
  { id: "#254832", customer: "Mike Johnson", date: "12 Sept, 2027", product: "USB-C Hub", amount: "$60", status: "SHIPPED" },
  { id: "#254833", customer: "Sarah Williams", date: "12 Sept, 2027", product: "Monitor Stand", amount: "$80", status: "PENDING" },
  { id: "#254834", customer: "Alex Brown", date: "12 Sept, 2027", product: "Desk Lamp", amount: "$100", status: "DELIVERED" },
];

const stockUpdates = [
  { id: "#25453", name: "Product 1", category: "Cloth", stock: 3, status: "LOW STOCK", vendor: "G-Shop" },
  { id: "#23454", name: "Product 2", category: "Cloth", stock: 6, status: "IN STOCK", vendor: "G-Shop" },
  { id: "#25455", name: "Product 3", category: "Cloth", stock: 9, status: "LOW STOCK", vendor: "G-Shop" },
  { id: "#23456", name: "Product 4", category: "Cloth", stock: 12, status: "IN STOCK", vendor: "G-Shop" },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={stat.name} 
            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.name}</p>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                {stat.trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              <div className="h-10 w-24 relative opacity-40 group-hover:opacity-100 transition-opacity">
                {/* Mock Sparkline SVG */}
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <path 
                    d={stat.trend === "up" ? "M0 30 Q 25 10, 50 25 T 100 10" : "M0 10 Q 25 30, 50 15 T 100 35"} 
                    fill="none" 
                    stroke={stat.trend === "up" ? "#10b981" : "#ef4444"} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            {/* Background Accent */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.trend === "up" ? "bg-emerald-500" : "bg-red-500"} opacity-20`}></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Status Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Order Status</h3>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-all">
              <MoreVertical size={18} className="text-slate-400" />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            {/* Mock Donut Chart */}
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#F1F5F9" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#10b981" strokeWidth="3" strokeDasharray="60 40" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#3b82f6" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-60" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-80" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 95" strokeDashoffset="-90" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Status</p>
                <p className="text-3xl font-black text-slate-800">168</p>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {[
                { name: "New Shipment", count: 60, color: "bg-emerald-500" },
                { name: "Delivered", count: 14, color: "bg-blue-500" },
                { name: "Failed Delivery", count: 10, color: "bg-orange-500" },
                { name: "Returned", count: 16, color: "bg-red-500" },
                { name: "Stock orders", count: 24, color: "bg-slate-300" },
                { name: "Processing", count: 24, color: "bg-indigo-500" },
                { name: "Cancelled", count: 5, color: "bg-rose-500" },
                { name: "Pending shipments", count: 8, color: "bg-amber-400" },
                { name: "Refunded", count: 18, color: "bg-cyan-500" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span className="text-[11px] font-bold text-slate-500 truncate w-32">{item.name}</span>
                  <span className="text-[11px] font-black text-slate-800 ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Countries Card */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
          <div className="flex flex-col mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Top Countries By sales</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Sale 300M</p>
          </div>

          <div className="space-y-6">
            {countries.map((country) => (
              <div key={country.name} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center font-black text-[10px] text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                  {country.code}
                </div>
                <div className="flex-grow">
                  <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{country.name}</p>
                </div>
                <div className="w-16 h-6">
                  <svg viewBox="0 0 60 20" className="w-full h-full">
                    <path 
                      d={country.trend === "up" ? "M0 15 Q 15 5, 30 15 T 60 5" : "M0 5 Q 15 15, 30 5 T 60 15"} 
                      fill="none" 
                      stroke={country.trend === "up" ? "#10b981" : "#ef4444"} 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[11px] font-black text-slate-800 w-16 text-right">{country.sales}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Accommodation Revenue</h3>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">(+42%) than last year</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-all">
              <MoreVertical size={18} className="text-slate-400" />
            </button>
          </div>

          <div className="h-64 flex items-end gap-3 md:gap-4">
            {[35, 60, 42, 55, 40, 65, 75, 48, 45, 38, 44, 32].map((val, i) => (
              <div key={i} className="flex-grow flex flex-col items-center gap-2 group cursor-pointer">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${val * 2}px` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className={`w-full max-w-[40px] rounded-t-lg transition-all ${
                    val > 50 ? "bg-[#14B8A6]" : "bg-[#F59E0B]"
                  }`}
                ></motion.div>
                <span className="text-[9px] font-black text-slate-400 uppercase">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fulfillment Card */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm mb-10">Order Fulfillment Status</h3>
          
          <div className="space-y-8">
            {fulfillment.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{item.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.count} ({item.count}%)</p>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.count}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${item.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">ORDER ID</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">CUSTOMER</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">ORDER DATE</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">PRODUCT</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">AMOUNT</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">STATUS</th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-500">{order.id}</td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-800">{order.customer}</td>
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-500">{order.date}</td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-800">{order.product}</td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-800">{order.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-500" :
                      order.status === "PENDING" ? "bg-amber-50 text-amber-500" :
                      "bg-blue-50 text-blue-500"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="px-4 py-1.5 border border-rose-100 text-rose-500 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-rose-50 transition-all">CANCEL</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 flex items-center justify-center gap-2">
          <button className="p-2 text-slate-400 hover:text-primary"><ChevronDown className="rotate-90" size={16} /></button>
          <button className="w-8 h-8 rounded-full bg-primary text-white text-xs font-black">1</button>
          <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 text-xs font-black">2</button>
          <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 text-xs font-black">3</button>
          <button className="p-2 text-slate-400 hover:text-primary"><ChevronDown className="-rotate-90" size={16} /></button>
        </div>
      </div>

      {/* Stock Update Table */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Stock Update</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">PRODUCT NAME</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">CATEGORY</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">CURRENT STOCK</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">STATUS</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">VENDOR</th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stockUpdates.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-slate-800 uppercase leading-none">{item.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{item.category}</td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-800">{item.stock}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                      item.status === "LOW STOCK" ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{item.vendor}</td>
                  <td className="px-8 py-5 text-center">
                    <button className="bg-[#10B981] text-white text-[9px] font-black uppercase tracking-widest px-6 py-2 rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-200">ORDER NOW</button>
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
