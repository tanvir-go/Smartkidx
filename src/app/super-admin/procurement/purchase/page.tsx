"use client";

import React, { useState } from "react";
import { 
  ScrollText, 
  Plus, 
  Search, 
  Filter, 
  FileDown, 
  MoreHorizontal, 
  X,
  Calendar,
  User,
  Package,
  Trash2,
  DollarSign,
  Printer,
  ChevronRight,
  Edit
} from "lucide-react";
import { toast } from "react-toastify";

export default function PurchaseGRNPage() {
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: "PO-8821", date: "Oct 21, 2023", supplier: "Innovation Labs", amount: 45000, status: "Received" },
    { id: "PO-8822", date: "Oct 22, 2023", supplier: "Global Tech", amount: 32000, status: "Pending" },
    { id: "PO-8823", date: "Oct 23, 2023", supplier: "RoboMaster", amount: 15500, status: "Pending" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPO, setEditingPO] = useState<any>(null);
  const [formData, setFormData] = useState({
    supplier: "Innovation Labs",
    date: new Date().toISOString().split('T')[0],
    items: [{ id: 1, product: "", quantity: 1, unitPrice: 0 }]
  });

  const handleOpenModal = (po?: any) => {
    if (po) {
      setEditingPO(po);
      // Simulating items for existing POs since the initial list doesn't have them
      setFormData({
        supplier: po.supplier,
        date: new Date(po.date).toISOString().split('T')[0],
        items: po.items || [{ id: 1, product: "Inventory Restock", quantity: 1, unitPrice: po.amount }]
      });
    } else {
      setEditingPO(null);
      setFormData({
        supplier: "Innovation Labs",
        date: new Date().toISOString().split('T')[0],
        items: [{ id: 1, product: "", quantity: 1, unitPrice: 0 }]
      });
    }
    setIsModalOpen(true);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), product: "", quantity: 1, unitPrice: 0 }]
    });
  };

  const removeItem = (id: number) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter(item => item.id !== id)
      });
    }
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.items.some(item => !item.product || item.unitPrice <= 0)) {
      toast.error("Please fill in all item details correctly");
      return;
    }

    if (editingPO) {
      setPurchaseOrders(purchaseOrders.map(po => 
        po.id === editingPO.id 
          ? { 
              ...po, 
              supplier: formData.supplier, 
              date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              amount: calculateTotal(),
              items: formData.items
            } 
          : po
      ));
      toast.success("Purchase Order updated successfully!");
    } else {
      const newPO = {
        id: `PO-${8824 + purchaseOrders.length}`,
        date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        supplier: formData.supplier,
        amount: calculateTotal(),
        status: "Pending",
        items: formData.items
      };
      setPurchaseOrders([newPO, ...purchaseOrders]);
      toast.success("Purchase Order created successfully!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Purchase & GRN</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Track purchase orders and Goods Received Notes.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> New Purchase Order
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative flex-grow max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search PO / GRN..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-200">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">PO ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Supplier</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">GRN Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-tighter group-hover:text-primary transition-colors">{po.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{po.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{po.supplier}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800 uppercase tracking-tighter">৳ {po.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      po.status === 'Received' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => window.print()}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
                        title="Print PO"
                      >
                        <Printer size={16} />
                      </button>
                      <button 
                        onClick={() => handleOpenModal(po)}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        title="Edit PO"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PO Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <ScrollText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
                    {editingPO ? `Update ${editingPO.id}` : "Generate Purchase Order"}
                  </h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Procurement System v2.1</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-100 rounded-2xl transition-colors group"
              >
                <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Supplier / Vendor</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      value={formData.supplier}
                      onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                    >
                      <option>Innovation Labs</option>
                      <option>Global Tech</option>
                      <option>RoboMaster</option>
                      <option>Learning Hub</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Order Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Order Items</h4>
                  <button 
                    type="button"
                    onClick={addItem}
                    className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <Plus size={14} /> Add Product
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-end bg-slate-50/50 p-4 rounded-[28px] border border-slate-100 group">
                      <div className="col-span-6 space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Details</label>
                        <div className="relative">
                          <Package size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            value={item.product}
                            onChange={(e) => updateItem(item.id, "product", e.target.value)}
                            placeholder="Search or enter product name..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Qty</label>
                        <input 
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 bg-white border-none rounded-xl text-xs font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      <div className="col-span-3 space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit Price (৳)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]">৳</span>
                          <input 
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, "unitPrice", parseInt(e.target.value))}
                            className="w-full pl-8 pr-4 py-2.5 bg-white border-none rounded-xl text-xs font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="col-span-1 pb-1">
                        <button 
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grand Total</p>
                  <h4 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">৳ {calculateTotal().toLocaleString()}</h4>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-10 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
                  >
                    {editingPO ? "Update Order" : "Generate PO"} <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
