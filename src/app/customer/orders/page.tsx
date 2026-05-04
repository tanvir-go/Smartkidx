"use client";

import { 
  ShoppingBag, 
  ChevronRight, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const orders = [
  { id: "#SK-9823", date: "Oct 24, 2023", items: 3, total: "৳ 4,500", status: "In Transit", icon: <Truck size={20} className="text-blue-500" />, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "#SK-9712", date: "Oct 12, 2023", items: 1, total: "৳ 1,200", status: "Delivered", icon: <CheckCircle2 size={20} className="text-emerald-500" />, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "#SK-9645", date: "Sep 28, 2023", items: 5, total: "৳ 8,950", status: "Delivered", icon: <CheckCircle2 size={20} className="text-emerald-500" />, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "#SK-9588", date: "Sep 15, 2023", items: 2, total: "৳ 2,100", status: "Cancelled", icon: <Clock size={20} className="text-slate-400" />, color: "text-slate-400", bg: "bg-slate-50" },
];

export default function CustomerOrdersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">My Orders</h2>
          <p className="text-slate-500 text-sm mt-1">Check the status of your orders and view order history.</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${order.bg} flex items-center justify-center`}>
                  {order.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-black text-slate-800">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.bg} ${order.color}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Placed on {order.date} • {order.items} Items</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
                <div className="text-left md:text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                  <p className="text-lg font-black text-slate-800 mt-0.5">{order.total}</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                    Details
                  </button>
                  <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                    Track <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Order Progress Mini-View */}
            {order.status === "In Transit" && (
              <div className="mt-8 pt-6 border-t border-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Order Progress</p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Arriving tomorrow</p>
                </div>
                <div className="relative h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">Order Placed</span>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">Shipped</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Out for Delivery</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Delivered</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State Mock */}
      {orders.length === 0 && (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-16 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">No orders yet</h3>
          <p className="text-slate-500 text-sm mt-2 mb-8">Start exploring our amazing Robotics & STEM kits today!</p>
          <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
