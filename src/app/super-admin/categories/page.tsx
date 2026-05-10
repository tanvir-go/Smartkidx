"use client";

import React, { useState } from "react";
import { 
  Layers, 
  Plus, 
  Search, 
  MoreVertical, 
  Image as ImageIcon,
  ChevronRight,
  Edit,
  Trash2,
  X,
  Link as LinkIcon,
  Tag,
  Download
} from "lucide-react";
import { exportToCSV } from "@/utils/export";
import { toast } from "react-toastify";

import AddCategoryForm from "@/components/vendor/AddCategoryForm";

export default function CategoriesPage() {
  const [categoryList, setCategoryList] = useState([
    { id: 1, name: "Robotics", slug: "robotics", items: 45, status: "Active", icon: "🤖" },
    { id: 2, name: "Electronics", slug: "electronics", items: 120, status: "Active", icon: "🔌" },
    { id: 3, name: "STEM Toys", slug: "stem-toys", items: 85, status: "Active", icon: "🧪" },
    { id: 4, name: "Programming Kits", slug: "programming", items: 32, status: "Active", icon: "💻" },
    { id: 5, name: "IoT Modules", slug: "iot", items: 28, status: "Inactive", icon: "🌐" },
    { id: 6, name: "Drones & RC", slug: "drones", items: 15, status: "Active", icon: "🚁" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleOpenModal = (category?: any) => {
    if (category) {
      setEditingCategory(category);
    } else {
      setEditingCategory(null);
    }
    setIsModalOpen(true);
  };

  const handleFormSuccess = (data: any) => {
    if (editingCategory) {
      setCategoryList(categoryList.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...data, id: editingCategory.id } 
          : c
      ));
    } else {
      const id = categoryList.length > 0 ? Math.max(...categoryList.map(c => c.id)) + 1 : 1;
      setCategoryList([
        { ...data, id, items: 0 },
        ...categoryList
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category? This will affect all linked products.")) {
      setCategoryList(categoryList.filter(c => c.id !== id));
      toast.success("Category deleted successfully.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">Categories & Attributes</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage product categories and their global attributes.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              categoryList, 
              ["ID", "Name", "Slug", "Items", "Status"], 
              "Categories_Export",
              (c) => [c.id, c.name, c.slug, c.items, c.status]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Category
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category Name</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Slug</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Items</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {categoryList.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in slide-in-from-top-1">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl group-hover:bg-primary group-hover:scale-110 transition-all shadow-sm">
                      {cat.icon || "📁"}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase leading-none">{cat.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">ID: CAT-00{cat.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500">/{cat.slug}</td>
                <td className="px-8 py-5 text-[11px] font-black text-slate-800">{cat.items} Products</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    cat.status === "Active" ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-400"
                  }`}>
                    {cat.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => handleOpenModal(cat)}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-6xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <AddCategoryForm 
              onClose={() => setIsModalOpen(false)}
              onSuccess={handleFormSuccess}
              initialData={editingCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
}
