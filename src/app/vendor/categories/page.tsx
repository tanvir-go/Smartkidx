"use client";

import React, { useState } from "react";
import { Layers, Plus, Search, MoreHorizontal, X, Tag, Settings2, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import AddCategoryForm from "@/components/vendor/AddCategoryForm";
import DeleteModal from "@/components/vendor/DeleteModal";

export default function VendorCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([
    { name: "Electronics", count: 12 },
    { name: "Robotics", count: 8 },
    { name: "Kits", count: 15 }
  ]);

  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<any>(null);
  
  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, name: "", type: "" as "Category" | "Attribute" });

  const handleAddCategory = (data: any) => {
    if (editingCat) {
      setCategories(categories.map((c: any) => c.name === editingCat.name ? { ...data, count: c.count } : c));
    } else {
      setCategories([...categories, { ...data, count: 0 }]);
    }
    setIsCatModalOpen(false);
    setEditingCat(null);
  };

  const handleEditCat = (cat: any) => {
    setEditingCat(cat);
    setIsCatModalOpen(true);
  };

  const handleDeleteCat = (name: string) => {
    setDeleteModal({ isOpen: true, name, type: "Category" });
  };

  const [attributes, setAttributes] = useState([
    { name: "Color", values: ["Red", "Green", "Blue"] },
    { name: "Size", values: ["Small", "Medium", "Large"] }
  ]);

  const [isAttrModalOpen, setIsAttrModalOpen] = useState(false);
  const [newAttr, setNewAttr] = useState({ name: "", values: "" });

  const handleAddAttribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttr.name || !newAttr.values) return;
    const valuesArray = newAttr.values.split(",").map(v => v.trim());
    setAttributes([...attributes, { name: newAttr.name, values: valuesArray }]);
    setNewAttr({ name: "", values: "" });
    setIsAttrModalOpen(false);
    toast.success("New attribute configured!");
  };

  const handleDeleteAttr = (name: string) => {
    setDeleteModal({ isOpen: true, name, type: "Attribute" });
  };

  const confirmDelete = () => {
    if (deleteModal.type === "Category") {
      setCategories(prev => prev.filter(c => c.name !== deleteModal.name));
      toast.success(`Category "${deleteModal.name}" deleted.`);
    } else {
      setAttributes(prev => prev.filter(a => a.name !== deleteModal.name));
      toast.success(`Attribute "${deleteModal.name}" deleted.`);
    }
    setDeleteModal({ isOpen: false, name: "", type: "Category" });
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
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {categories.map((cat: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors animate-in fade-in slide-in-from-top-1">
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{cat.name}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 rounded-lg bg-slate-100 text-[10px] font-black text-slate-500">{cat.count}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditCat(cat)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" 
                          title="Edit Category"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCat(cat.name)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" 
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
              className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <Plus size={14} /> New Attribute
            </button>
          </div>
          <div className="p-6 space-y-4">
            {attributes.map((attr: any, i: number) => (
              <div key={i} className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                    <Tag size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{attr.name}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {attr.values.map((v: string, idx: number) => (
                        <span key={idx} className="text-[9px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100">{v}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteAttr(attr.name)}
                  className="p-2 text-slate-200 group-hover:text-red-400 hover:text-red-500 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DeleteModal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })} 
        onConfirm={confirmDelete} 
        itemName={deleteModal.name} 
        itemType={deleteModal.type}
      />

      {/* Category Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCatModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Layers size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">{editingCat ? "Modify Hierarchy" : "New Category Group"}</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Classification Engine</p>
                </div>
              </div>
              <button onClick={() => setIsCatModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors group">
                <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            <div className="p-8">
              <AddCategoryForm onSubmit={handleAddCategory} initialData={editingCat} />
            </div>
          </div>
        </div>
      )}

      {/* Attribute Modal */}
      {isAttrModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAttrModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200 p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Settings2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Configure Attribute</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Variation Parameters</p>
              </div>
            </div>
            <form onSubmit={handleAddAttribute} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Attribute Name</label>
                <input 
                  type="text" 
                  value={newAttr.name}
                  onChange={(e) => setNewAttr({ ...newAttr, name: e.target.value })}
                  placeholder="e.g. Material" 
                  className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Values (Comma Separated)</label>
                <input 
                  type="text" 
                  value={newAttr.values}
                  onChange={(e) => setNewAttr({ ...newAttr, values: e.target.value })}
                  placeholder="e.g. Plastic, Metal, Wood" 
                  className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" 
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsAttrModalOpen(false)} className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3.5 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Save Attribute</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
