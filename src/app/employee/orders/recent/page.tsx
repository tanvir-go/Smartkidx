"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  ShoppingBag,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle2,
  Package,
  Truck,
  X
} from "lucide-react";
import { toast } from "react-toastify";
import { exportToCSV } from "@/utils/export";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  items: number;
  date: string;
  status: OrderStatus;
  payment: string;
  location: string;
}

const RECENT_ORDERS: Order[] = [
  { id: "#ORD-9925", customer: "Arif Hossain", email: "arif@example.com", amount: 4500, items: 3, date: "Today, 10:42 AM", status: "Pending", payment: "bKash", location: "Dhaka" },
  { id: "#ORD-9924", customer: "Sabrina Rahman", email: "sabrina@example.com", amount: 12500, items: 1, date: "Today, 09:15 AM", status: "Processing", payment: "Credit Card", location: "Chittagong" },
  { id: "#ORD-9923", customer: "Kamrul Islam", email: "kamrul@example.com", amount: 850, items: 2, date: "Today, 08:30 AM", status: "Shipped", payment: "Cash on Delivery", location: "Sylhet" },
  { id: "#ORD-9922", customer: "Nusrat Jahan", email: "nusrat@example.com", amount: 3200, items: 4, date: "Yesterday, 04:20 PM", status: "Delivered", payment: "Nagad", location: "Rajshahi" },
  { id: "#ORD-9921", customer: "Tanvir Ahmed", email: "tanvir@example.com", amount: 6700, items: 2, date: "Yesterday, 02:10 PM", status: "Processing", payment: "Credit Card", location: "Dhaka" },
  { id: "#ORD-9920", customer: "Sadia Islam", email: "sadia@example.com", amount: 1550, items: 1, date: "Yesterday, 11:05 AM", status: "Shipped", payment: "bKash", location: "Khulna" },
  { id: "#ORD-9919", customer: "Fahim Rahman", email: "fahim@example.com", amount: 9800, items: 5, date: "Oct 24, 05:40 PM", status: "Delivered", payment: "Cash on Delivery", location: "Barisal" },
];

export default function EmployeeRecentOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = RECENT_ORDERS.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    exportToCSV(
      filteredOrders, 
      ["Order ID", "Customer", "Amount", "Items", "Date", "Status", "Payment", "Location"], 
      "Recent_Orders_Export", 
      (item: Order) => [item.id, item.customer, `৳${item.amount}`, item.items.toString(), item.date, item.status, item.payment, item.location]
    );
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch(status) {
      case "Pending":
        return <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Clock size={12} /> Pending</span>;
      case "Processing":
        return <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Package size={12} /> Processing</span>;
      case "Shipped":
        return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Truck size={12} /> Shipped</span>;
      case "Delivered":
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><CheckCircle2 size={12} /> Delivered</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Recent Orders</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Monitor and track incoming e-commerce orders.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
            />
          </div>
          <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm flex items-center gap-2">
            <Filter size={18} /> <span className="text-xs font-bold hidden sm:inline">Filter Status</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Order Details</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    
                    <td className="px-8 py-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                          <ShoppingBag size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{order.id}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                            <Clock size={10} /> {order.date}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div>
                        <p className="text-sm font-bold text-slate-700">{order.customer}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin size={10} /> {order.location}
                        </p>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div>
                        <p className="text-sm font-black text-slate-800">৳ {order.amount.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                          <CreditCard size={10} /> {order.payment} ({order.items} items)
                        </p>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      {getStatusBadge(order.status)}
                    </td>

                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all inline-flex items-center gap-2"
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <div className="inline-flex w-16 h-16 bg-slate-50 rounded-full items-center justify-center text-slate-300 mb-4">
                      <Search size={24} />
                    </div>
                    <p className="text-sm font-bold text-slate-500">No orders found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Order Details</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{selectedOrder.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-3xl font-black text-slate-800 tracking-tight">৳ {selectedOrder.amount.toLocaleString()}</p>
                </div>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Customer Info</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Name</p>
                      <p className="text-sm font-bold text-slate-700">{selectedOrder.customer}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                      <p className="text-sm font-bold text-slate-700">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Shipping Location</p>
                      <p className="text-sm font-bold text-slate-700">{selectedOrder.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Order Info</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Date Placed</p>
                      <p className="text-sm font-bold text-slate-700">{selectedOrder.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Payment Method</p>
                      <p className="text-sm font-bold text-slate-700">{selectedOrder.payment}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total Items</p>
                      <p className="text-sm font-bold text-slate-700">{selectedOrder.items} Physical Products</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-1">System Note</p>
                <p className="text-xs font-bold text-amber-700/70">This is a read-only view. Order status modifications must be processed through the central ERP system by an authorized Vendor or Super Admin.</p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
