"use client";

import { 
  Boxes, 
  Search, 
  Filter, 
  ArrowUpDown, 
  AlertTriangle,
  Package,
  TrendingUp,
  History,
  MoreVertical,
  Download
} from "lucide-react";
import { exportToCSV } from "@/utils/export";

const inventory = [
  { id: 1, name: "Robotics Starter Kit", sku: "RK-001", stock: 150, committed: 12, available: 138, warehouse: "Primary", status: "In Stock" },
  { id: 2, name: "STEM Solar Car Kit", sku: "RK-002", stock: 8, committed: 5, available: 3, warehouse: "Dhaka", status: "Low Stock" },
  { id: 3, name: "Arduino Uno R3", sku: "RK-003", stock: 500, committed: 45, available: 455, warehouse: "Primary", status: "In Stock" },
  { id: 4, name: "Drone Propeller Set", sku: "RK-004", stock: 0, committed: 0, available: 0, warehouse: "Primary", status: "Out of Stock" },
  { id: 5, name: "Breadboard Large", sku: "RK-005", stock: 24, committed: 2, available: 22, warehouse: "Sylhet", status: "In Stock" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Inventory Management</h2>
          <p className="text-slate-500 text-sm mt-1">Global warehouse inventory and stock movement tracking.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              inventory, 
              ["ID", "Name", "SKU", "Stock", "Committed", "Available", "Warehouse", "Status"], 
              "Inventory_Export",
              (i) => [i.id, i.name, i.sku, i.stock, i.committed, i.available, i.warehouse, i.status]
            )}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <History size={16} /> Movement Log
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Stock Adjustment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
            <Package size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Units</p>
            <h3 className="text-2xl font-black text-slate-800 mt-2">18,500</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Across 4 Warehouses</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 border-l-4 border-l-orange-500">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <AlertTriangle size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Low Stock Alerts</p>
            <h3 className="text-2xl font-black text-orange-500 mt-2">12 Items</h3>
            <p className="text-[10px] font-bold text-orange-400 uppercase mt-1">Requires Immediate Attention</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <TrendingUp size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Stock Turnover</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-2">4.2x</h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">+0.5x from last month</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by SKU or name..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Information</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Level</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Warehouse</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{item.name}</p>
                </td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">{item.sku}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none">In Hand</p>
                      <p className="text-sm font-black text-slate-800 mt-1">{item.stock}</p>
                    </div>
                    <div className="h-6 w-px bg-slate-100"></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Available</p>
                      <p className="text-sm font-black text-primary mt-1">{item.available}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800 uppercase">{item.warehouse}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    item.status === "In Stock" ? "bg-emerald-50 text-emerald-500" : 
                    item.status === "Low Stock" ? "bg-orange-50 text-orange-500" : "bg-rose-50 text-rose-500"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
