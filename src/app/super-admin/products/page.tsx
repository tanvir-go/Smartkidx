"use client";

import { 
  Package, 
  Store, 
  Tag, 
  ChevronRight,
  MoreVertical,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

const products = [
  { id: 1, name: "Robotics Starter Kit", vendor: "Global Tech", category: "Electronics", price: "৳ 2,500", stock: 124, status: "Published" },
  { id: 2, name: "STEM Solar Car", vendor: "RoboMaster", category: "Robotics", price: "৳ 1,200", stock: 12, status: "Published" },
  { id: 3, name: "Coding for Kids Book", vendor: "Learning Hub", category: "Books", price: "৳ 800", stock: 450, status: "Draft" },
  { id: 4, name: "DIY Drone Kit", vendor: "Global Tech", category: "Robotics", price: "৳ 4,500", stock: 5, status: "Out of Stock" },
  { id: 5, name: "Smart Watch for Kids", vendor: "TechToys", category: "Electronics", price: "৳ 3,200", stock: 86, status: "Pending" },
  { id: 6, name: "Science Experiment Set", vendor: "STEM Solutions", category: "Education", price: "৳ 1,800", stock: 32, status: "Published" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Global Products</h2>
          <p className="text-slate-500 text-sm mt-1">Monitor and manage all products across all vendors.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus size={18} /> Add Global Product
        </button>
      </div>

      {/* Product Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products by name, vendor or SKU..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
            <Filter size={16} /> Filters
          </button>
          <select className="px-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors outline-none border-none">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Details</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendor</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Price/Stock</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{product.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">SKU: SK-{product.id}00{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                      <Store size={12} className="text-slate-400" /> {product.vendor}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 py-1 bg-slate-100 rounded">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-800">{product.price}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${
                        product.stock <= 10 ? "text-red-500" : "text-slate-400"
                      }`}>{product.stock} in stock</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      product.status === "Published" ? "bg-emerald-50 text-emerald-600" : 
                      product.status === "Pending" ? "bg-orange-50 text-orange-600" : 
                      product.status === "Out of Stock" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
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
