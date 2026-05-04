"use client";

import { 
  Layers, 
  Plus, 
  Search, 
  MoreVertical, 
  Image as ImageIcon,
  ChevronRight,
  Edit,
  Trash2
} from "lucide-react";

const categories = [
  { id: 1, name: "Robotics", slug: "robotics", items: 45, status: "Active", icon: "🤖" },
  { id: 2, name: "Electronics", slug: "electronics", items: 120, status: "Active", icon: "🔌" },
  { id: 3, name: "STEM Toys", slug: "stem-toys", items: 85, status: "Active", icon: "🧪" },
  { id: 4, name: "Programming Kits", slug: "programming", items: 32, status: "Active", icon: "💻" },
  { id: 5, name: "IoT Modules", slug: "iot", items: 28, status: "Inactive", icon: "🌐" },
  { id: 6, name: "Drones & RC", slug: "drones", items: 15, status: "Active", icon: "🚁" },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Categories & Attributes</h2>
          <p className="text-slate-500 text-sm mt-1">Manage product categories and their global attributes.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus size={18} /> Add Category
        </button>
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
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl group-hover:bg-primary group-hover:scale-110 transition-all">
                      {cat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase">{cat.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: CAT-00{cat.id}</p>
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
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"><Edit size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
