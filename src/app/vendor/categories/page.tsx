"use client";

import React, { useState } from "react";
import { Layers, Plus, Search, MoreHorizontal, X, Tag, Settings2 } from "lucide-react";
import { toast } from "react-toastify";

export default function VendorCategoriesPage() {
  const [categories, setCategories] = useState([
    { name: "Electronics", count: 12 },
    { name: "Robotics", count: 8 },
    { name: "Kits", count: 15 }
  ]);

  const [attributes, setAttributes] = useState([
    { name: "Color", values: ["Red", "Green", "Blue"] },
    { name: "Size", values: ["Small", "Medium", "Large"] }
  ]);

  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isAttrModalOpen, setIsAttrModalOpen] = useState(false);
  
  const [newCatName, setNewCatName] = useState("");
  const [newAttr, setNewAttr] = useState({ name: "", values: "" });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    setCategories([...categories, { name: newCatName, count: 0 }]);
    setNewCatName("");
    setIsCatModalOpen(false);
    toast.success("New category added!");
  };

  const handleAddAttribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttr.name || !newAttr.values) return;
    const valuesArray = newAttr.values.split(",").map(v => v.trim());
    setAttributes([...attributes, { name: newAttr.name, values: valuesArray }]);
    setNewAttr({ name: "", values: "" });
    setIsAttrModalOpen(false);
    toast.success("New attribute configured!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">Categories & Attributes</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage your product categories and variations.</p>
        </div>
        <button 
          onClick={() => setIsCatModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">My Categories</h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] focus:ring-1 focus:ring-primary outline-none font-bold" />
            </div>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Products</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {categories.map((cat, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors animate-in fade-in slide-in-from-top-1">
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{cat.name}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 rounded-lg bg-slate-100 text-[10px] font-black text-slate-500">{cat.count}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attributes Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Global Attributes</h3>
            <button 
              onClick={() => setIsAttrModalOpen(true)}
              className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline"
            >
              + Add Attribute
            </button>
          </div>
          <div className="p-6 space-y-4">
            {attributes.map((attr, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{attr.name}</p>
                  <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><MoreHorizontal size={14} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attr.values.map((v, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm">{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCatModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[32px] shadow-2xl border border-slate-100 p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">New Category</h3>
              <button onClick={() => setIsCatModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category Name</label>
                <div className="relative">
                  <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Science Projects"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">Add Category</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Attribute Modal */}
      {isAttrModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAttrModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[32px] shadow-2xl border border-slate-100 p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Configure Attribute</h3>
              <button onClick={() => setIsAttrModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddAttribute} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Attribute Name</label>
                <div className="relative">
                  <Settings2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={newAttr.name}
                    onChange={(e) => setNewAttr({...newAttr, name: e.target.value})}
                    placeholder="e.g. Material"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Values (comma separated)</label>
                <input 
                  type="text" 
                  required
                  value={newAttr.values}
                  onChange={(e) => setNewAttr({...newAttr, values: e.target.value})}
                  placeholder="e.g. Plastic, Metal, Wood"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">Save Attribute</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
