"use client";

import React, { useState } from "react";
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
  Download,
  ArrowLeftRight,
  Warehouse,
  Ship,
  X,
  ChevronRight,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import { exportToCSV } from "@/utils/export";
import { toast } from "react-toastify";

export default function InventoryPage() {
  const [inventoryList, setInventoryList] = useState([
    { id: 1, name: "Robotics Starter Kit", sku: "RK-001", stock: 150, committed: 12, available: 138, warehouse: "Primary", status: "In Stock" },
    { id: 2, name: "STEM Solar Car Kit", sku: "RK-002", stock: 8, committed: 5, available: 3, warehouse: "Dhaka", status: "Low Stock" },
    { id: 3, name: "Arduino Uno R3", sku: "RK-003", stock: 500, committed: 45, available: 455, warehouse: "Primary", status: "In Stock" },
    { id: 4, name: "Drone Propeller Set", sku: "RK-004", stock: 0, committed: 0, available: 0, warehouse: "Primary", status: "Out of Stock" },
    { id: 5, name: "Breadboard Large", sku: "RK-005", stock: 24, committed: 2, available: 22, warehouse: "Sylhet", status: "In Stock" },
  ]);

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferData, setTransferData] = useState({
    productId: "",
    fromWarehouse: "Primary",
    toWarehouse: "Dhaka",
    quantity: 1
  });

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const product = inventoryList.find(p => p.id === parseInt(transferData.productId));
    
    if (!product) {
      toast.error("Please select a valid product");
      return;
    }

    if (transferData.fromWarehouse === transferData.toWarehouse) {
      toast.error("Source and destination warehouses must be different");
      return;
    }

    if (product.available < transferData.quantity) {
      toast.error(`Insufficient stock in ${transferData.fromWarehouse}. Available: ${product.available}`);
      return;
    }

    // Logic: Reduce from source, check if destination exists or create new entry
    const newInventory = [...inventoryList];
    
    // Update source
    const sourceIndex = newInventory.findIndex(p => p.id === product.id);
    newInventory[sourceIndex].stock -= transferData.quantity;
    newInventory[sourceIndex].available -= transferData.quantity;

    // Check destination
    const destIndex = newInventory.findIndex(p => p.name === product.name && p.warehouse === transferData.toWarehouse);
    
    if (destIndex !== -1) {
      newInventory[destIndex].stock += transferData.quantity;
      newInventory[destIndex].available += transferData.quantity;
    } else {
      newInventory.push({
        ...product,
        id: Date.now(),
        stock: transferData.quantity,
        committed: 0,
        available: transferData.quantity,
        warehouse: transferData.toWarehouse,
        status: "In Stock"
      });
    }

    setInventoryList(newInventory);
    toast.success(`Successfully transferred ${transferData.quantity} units to ${transferData.toWarehouse}`);
    setIsTransferModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Inventory Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Global warehouse inventory and stock movement tracking.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              inventoryList, 
              ["ID", "Name", "SKU", "Stock", "Committed", "Available", "Warehouse", "Status"], 
              "Inventory_Export",
              (i) => [i.id, i.name, i.sku, i.stock, i.committed, i.available, i.warehouse, i.status]
            )}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Download size={16} /> Export CSV
          </button>
          <button 
            onClick={() => setIsTransferModalOpen(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
          >
            <ArrowLeftRight size={18} /> Transfer Stock
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Stock Adjustment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-primary/20 transition-all">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <Package size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Units</p>
            <h3 className="text-3xl font-black text-slate-800 mt-3 tabular-nums">18,500</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-tighter flex items-center gap-2">
              <Warehouse size={12} /> Across 4 Warehouses
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 border-l-4 border-l-orange-500">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <AlertTriangle size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Low Stock Alerts</p>
            <h3 className="text-3xl font-black text-orange-500 mt-3 tabular-nums">12 Items</h3>
            <p className="text-[10px] font-black text-orange-400 uppercase mt-2 tracking-tighter">Requires Immediate Attention</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <TrendingUp size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Stock Turnover</p>
            <h3 className="text-3xl font-black text-emerald-600 mt-3 tabular-nums">4.2x</h3>
            <p className="text-[10px] font-black text-emerald-500 uppercase mt-2 tracking-tighter">+0.5x from last month</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by SKU or name..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
              <Filter size={16} /> Filter Hubs
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Information</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Level</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Warehouse</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inventoryList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Package size={16} />
                      </div>
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight group-hover:text-primary transition-colors">{item.name}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.sku}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase leading-none tracking-widest">In Hand</p>
                        <p className="text-sm font-black text-slate-800 mt-2">{item.stock}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-100"></div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase leading-none tracking-widest">Available</p>
                        <p className="text-sm font-black text-primary mt-2">{item.available}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Warehouse size={14} className="text-slate-300" />
                      <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{item.warehouse}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      item.status === "In Stock" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                      item.status === "Low Stock" ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => {
                          setTransferData({...transferData, productId: item.id.toString(), fromWarehouse: item.warehouse});
                          setIsTransferModalOpen(true);
                        }}
                        className="p-2.5 text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all" 
                        title="Transfer Stock"
                      >
                        <ArrowLeftRight size={18} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm rounded-xl transition-all"><History size={18} /></button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm rounded-xl transition-all"><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsTransferModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl border border-slate-100 p-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                  <ArrowLeftRight size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Stock Transfer Protocol</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Inter-Warehouse Movement</p>
                </div>
              </div>
              <button onClick={() => setIsTransferModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleTransfer} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Product to Move</label>
                <div className="relative">
                  <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select 
                    required
                    value={transferData.productId}
                    onChange={(e) => {
                      const p = inventoryList.find(x => x.id === parseInt(e.target.value));
                      setTransferData({...transferData, productId: e.target.value, fromWarehouse: p?.warehouse || "Primary"});
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="">Select Target Inventory...</option>
                    {inventoryList.filter(p => p.available > 0).map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.sku}) - {p.warehouse}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 items-center">
                <div className="space-y-2 text-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Source Hub</label>
                  <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{transferData.fromWarehouse}</p>
                </div>
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ArrowRight size={20} />
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Warehouse</label>
                  <div className="relative">
                    <Warehouse size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      value={transferData.toWarehouse}
                      onChange={(e) => setTransferData({...transferData, toWarehouse: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                    >
                      <option>Primary</option>
                      <option>Dhaka</option>
                      <option>Sylhet</option>
                      <option>Chittagong</option>
                      <option>Khulna</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transfer Quantity</label>
                <div className="relative">
                  <RefreshCw size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={transferData.quantity}
                    onChange={(e) => setTransferData({...transferData, quantity: parseInt(e.target.value)})}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Units</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 mt-6 flex items-center justify-center gap-3"
              >
                Execute Movement Protocol <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
