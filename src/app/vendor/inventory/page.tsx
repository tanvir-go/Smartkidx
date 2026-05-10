"use client";

import React from "react";
import { Boxes, Search, Filter, AlertCircle, ArrowUpRight, Download } from "lucide-react";
import { exportToCSV } from "@/utils/export";

const inventoryData = [
  { id: 1, name: "STEM Robotic Arm Kit 1", sku: "SK-ROB-001", quantity: 45, price: "৳ 2,500", status: "In Stock" },
  { id: 2, name: "STEM Robotic Arm Kit 2", sku: "SK-ROB-002", quantity: 3, price: "৳ 2,500", status: "Low Stock" },
  { id: 3, name: "STEM Robotic Arm Kit 3", sku: "SK-ROB-003", quantity: 45, price: "৳ 2,500", status: "In Stock" },
  { id: 4, name: "STEM Robotic Arm Kit 4", sku: "SK-ROB-004", quantity: 45, price: "৳ 2,500", status: "In Stock" },
];

export default function VendorInventoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Manage Inventory</h2>
          <p className="text-slate-500 text-sm mt-1">Monitor stock levels and manage product availability.</p>
        </div>
        <button 
          onClick={() => exportToCSV(
            inventoryData, 
            ["ID", "Product", "SKU", "Quantity", "Price", "Status"], 
            "Vendor_Inventory_Export",
            (i) => [i.id, i.name, i.sku, i.quantity, i.price, i.status]
          )}
          className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stock</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-800">1,284</h3>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-red-100 shadow-sm">
          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Low Stock</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-red-600">8</h3>
            <AlertCircle size={20} className="text-red-400" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Out of Stock</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-400">2</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Critical</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-sm w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search inventory..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <button className="p-2.5 text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-slate-200">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inventoryData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 shrink-0"></div>
                      <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.sku}</td>
                  <td className="px-6 py-4">
                    <span className={`font-black text-sm ${item.status === 'Low Stock' ? 'text-red-500' : 'text-slate-800'}`}>
                      {item.status === 'Low Stock' ? `${item.quantity} Left` : `${item.quantity} Units`}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800">{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status === 'Low Stock' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ml-auto">
                      Restock <ArrowUpRight size={14} />
                    </button>
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
