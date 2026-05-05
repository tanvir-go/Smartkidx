"use client";

import React, { useState } from "react";
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
  Trash2,
  X,
  DollarSign,
  Layers
} from "lucide-react";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const [productList, setProductList] = useState([
    { id: 1, name: "Robotics Starter Kit", vendor: "Global Tech", category: "Electronics", price: "৳ 2,500", stock: 124, status: "Published" },
    { id: 2, name: "STEM Solar Car", vendor: "RoboMaster", category: "Robotics", price: "৳ 1,200", stock: 12, status: "Published" },
    { id: 3, name: "Coding for Kids Book", vendor: "Learning Hub", category: "Books", price: "৳ 800", stock: 450, status: "Draft" },
    { id: 4, name: "DIY Drone Kit", vendor: "Global Tech", category: "Robotics", price: "৳ 4,500", stock: 5, status: "Out of Stock" },
    { id: 5, name: "Smart Watch for Kids", vendor: "TechToys", category: "Electronics", price: "৳ 3,200", stock: 86, status: "Pending" },
    { id: 6, name: "Science Experiment Set", vendor: "STEM Solutions", category: "Education", price: "৳ 1,800", stock: 32, status: "Published" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    vendor: "SmartKids Official", 
    category: "Electronics", 
    price: "", 
    stock: "" 
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.error("Please fill in all required fields");
      return;
    }

    const id = productList.length + 1;
    const productToAdd = {
      ...newProduct,
      id,
      price: `৳ ${parseInt(newProduct.price).toLocaleString()}`,
      stock: parseInt(newProduct.stock),
      status: "Published"
    };

    setProductList([productToAdd, ...productList]);
    setIsModalOpen(false);
    setNewProduct({ name: "", vendor: "SmartKids Official", category: "Electronics", price: "", stock: "" });
    toast.success("Global product added successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">Global Products</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Monitor and manage all products across all vendors.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Global Product
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
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
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
              {productList.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in slide-in-from-top-1">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
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
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 py-1 bg-slate-100 rounded-lg">
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

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl border border-slate-100 p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-slate-800 uppercase tracking-tight">Add Global Product</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name *</label>
                <div className="relative">
                  <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g. SmartKids Explorer Drone"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (৳) *</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="number" 
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="2500"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Stock *</label>
                  <div className="relative">
                    <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="number" 
                      required
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      placeholder="100"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vendor</label>
                  <select 
                    value={newProduct.vendor}
                    onChange={(e) => setNewProduct({...newProduct, vendor: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>SmartKids Official</option>
                    <option>Global Tech</option>
                    <option>RoboMaster</option>
                    <option>Learning Hub</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Electronics</option>
                    <option>Robotics</option>
                    <option>STEM Kits</option>
                    <option>Books</option>
                    <option>Education</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 mt-4"
              >
                Create Global Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
