"use client";

import React, { useState } from "react";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Download,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  Plus,
  X,
  User,
  DollarSign,
  Edit,
  Trash2,
  Printer
} from "lucide-react";
import { toast } from "react-toastify";
import CreateOrderModal from "@/components/super-admin/CreateOrderForm";
import { exportToCSV } from "@/utils/export";

export default function OrdersPage() {
  const [orderList, setOrderList] = useState([
    { 
      id: "#ORD-9823", 
      customer: "John Doe", 
      items: 3, 
      total: "৳ 150.00", 
      status: "Delivered", 
      date: "Oct 24, 2023", 
      payment: "Paid",
      raw_data: { 
        orderNumber: "#ORD-9823",
        customerName: "John Doe",
        orderStatus: "Delivered",
        orderDate: "2023-10-24",
        paymentStatus: "Paid",
        products: [
          { name: "STEM Robot Kit", qty: 2, unitPrice: 50, subtotal: 100 },
          { name: "Coding Card Game", qty: 1, unitPrice: 50, subtotal: 50 }
        ]
      }
    },
    { id: "#ORD-9712", customer: "Jane Smith", items: 1, total: "৳ 45.00", status: "Pending", date: "Oct 25, 2023", payment: "Unpaid" },
    { id: "#ORD-9645", customer: "Mike Johnson", items: 5, total: "৳ 280.00", status: "Shipped", date: "Oct 25, 2023", payment: "Paid" },
    { id: "#ORD-9588", customer: "Sarah Williams", items: 2, total: "৳ 85.00", status: "Processing", date: "Oct 26, 2023", payment: "Paid" },
    { id: "#ORD-9511", customer: "Alex Brown", items: 1, total: "৳ 12.00", status: "Cancelled", date: "Oct 26, 2023", payment: "Refunded" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const handleOpenModal = (order?: any) => {
    if (order) {
      setEditingOrder(order.raw_data || {
        orderNumber: order.id,
        customerName: order.customer,
        orderStatus: order.status,
        orderDate: new Date(order.date).toISOString().split('T')[0],
        paymentStatus: order.payment === 'Paid' ? 'Paid' : 'Unpaid',
        products: [{ name: "General Product", qty: order.items, unitPrice: parseFloat(order.total.replace('৳ ', '').replace(',', '')) / order.items, subtotal: parseFloat(order.total.replace('৳ ', '').replace(',', '')) }]
      });
    } else {
      setEditingOrder(null);
    }
    setIsModalOpen(true);
  };

  const handleSaveOrder = (formData: any) => {
    const processedEntry = {
      id: formData.orderNumber,
      customer: formData.customerName || "Walk-in Customer",
      items: formData.products.reduce((acc: number, p: any) => acc + (parseInt(p.qty) || 0), 0),
      total: `৳ ${(formData.products.reduce((acc: number, p: any) => acc + (p.subtotal || 0), 0) + parseFloat(formData.deliveryCharge || 0) - parseFloat(formData.promoDiscount || 0)).toLocaleString()}`,
      status: formData.orderStatus,
      date: new Date(formData.orderDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      payment: formData.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid',
      raw_data: formData
    };

    if (orderList.some(o => o.id === formData.orderNumber)) {
      setOrderList(orderList.map(o => o.id === formData.orderNumber ? processedEntry : o));
      toast.success("Order protocol updated!");
    } else {
      setOrderList([processedEntry, ...orderList]);
      toast.success("New order deployed!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to terminate this order record?")) {
      setOrderList(orderList.filter(o => o.id !== id));
      toast.success("Order record purged.");
    }
  };

  const handleExport = () => {
    exportToCSV(
      orderList,
      ["Order ID", "Customer", "Date", "Items", "Total Amount", "Payment Status", "Order Status"],
      "Orders_Export",
      (order) => [order.id, order.customer, order.date, order.items, order.total, order.payment, order.status]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Order Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Track, process and manage customer orders globally.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={16} /> Export CSV
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-2 group"
          >
            <div className="p-1 bg-white/20 rounded-lg group-hover:rotate-90 transition-transform">
               <Plus size={18} />
            </div>
            Create Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "All Orders", count: 1250, active: true },
          { label: "Pending", count: 45, active: false },
          { label: "Processing", count: 12, active: false },
          { label: "Shipped", count: 85, active: false },
          { label: "Delivered", count: 980, active: false },
        ].map((filter) => (
          <button 
            key={filter.label}
            onClick={() => toast.info(`Filtering by ${filter.label}`)}
            className={`p-6 rounded-[28px] border transition-all text-left group ${
              filter.active 
                ? "bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-200" 
                : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <p className={`text-[10px] font-black uppercase tracking-widest ${filter.active ? "opacity-70" : "text-slate-400"}`}>{filter.label}</p>
            <h3 className="text-2xl font-black mt-2 tracking-tighter group-hover:scale-105 transition-transform">{filter.count}</h3>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-50">
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</th>
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
              <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orderList.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div>
                    <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{order.id}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{order.items} Items</p>
                  </div>
                </td>
                <td className="px-8 py-6 text-[11px] font-black text-slate-800 uppercase">{order.customer}</td>
                <td className="px-8 py-6 text-[11px] font-bold text-slate-500">{order.date}</td>
                <td className="px-8 py-6 text-[11px] font-black text-slate-800">{order.total}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    order.payment === "Paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : order.payment === "Refunded" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-amber-50 text-amber-600 border-amber-100"
                  }`}>
                    {order.payment}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {order.status === "Delivered" && <CheckCircle2 size={14} className="text-emerald-500" />}
                    {order.status === "Pending" && <Clock size={14} className="text-amber-500" />}
                    {order.status === "Shipped" && <Truck size={14} className="text-blue-500" />}
                    {order.status === "Cancelled" && <XCircle size={14} className="text-rose-500" />}
                    {order.status === "Processing" && <Clock size={14} className="text-amber-500" />}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      order.status === "Delivered" ? "text-emerald-500" :
                      order.status === "Cancelled" ? "text-rose-500" :
                      order.status === "Shipped" ? "text-blue-500" : "text-amber-500"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => toast.info(`Viewing details for ${order.id}`)} className="p-2.5 text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm rounded-xl border border-transparent hover:border-slate-100 transition-all" title="View Details"><Eye size={18} /></button>
                    <button onClick={() => handleOpenModal(order)} className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-white hover:shadow-sm rounded-xl border border-transparent hover:border-slate-100 transition-all" title="Edit Order"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(order.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-xl border border-transparent hover:border-slate-100 transition-all" title="Delete Record"><Trash2 size={18} /></button>
                    <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm rounded-xl border border-transparent hover:border-slate-100 transition-all"><MoreVertical size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveOrder}
        initialData={editingOrder}
      />
    </div>
  );
}
