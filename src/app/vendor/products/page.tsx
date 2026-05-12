"use client";

import React, { useState } from "react";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  TrendingUp,
  AlertTriangle,
  X,
  Tag,
  DollarSign,
  Layers,
  Download
} from "lucide-react";
import { exportToCSV } from "@/utils/export";
import { toast } from "react-toastify";
import AddProductForm from "@/components/vendor/AddProductForm";
import DeleteModal from "@/components/vendor/DeleteModal";

export default function VendorProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Robotics Starter Kit", sku: "SK-V1-001", price: "৳ 2,500", stock: 124, sales: 342, status: "Active" },
    { id: 2, name: "STEM Solar Car", sku: "SK-V1-002", price: "৳ 1,200", stock: 12, sales: 85, status: "Low Stock" },
    { id: 3, name: "DIY Drone Kit", sku: "SK-V1-003", price: "৳ 4,500", stock: 5, sales: 24, status: "Active" },
    { id: 4, name: "Electronic Clock Kit", sku: "SK-V1-004", price: "৳ 950", stock: 0, sales: 156, status: "Out of Stock" },
    { id: 5, name: "Smart Lamp Project", sku: "SK-V1-005", price: "৳ 1,800", stock: 45, sales: 67, status: "Inactive" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [viewingProduct, setViewingProduct] = useState<any>(null);
  
  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: 0, name: "" });

  const handleAddProduct = (data: any) => {
    if (editingProduct) {
      setProducts(products.map((p: any) => p.id === editingProduct.id ? { 
        ...p, 
        name: data.name, 
        sku: data.sku, 
        price: `৳ ${parseInt(data.regularPrice).toLocaleString()}`,
        stock: parseInt(data.stockQuantity),
        status: parseInt(data.stockQuantity) > 0 ? "Active" : "Out of Stock"
      } : p));
    } else {
      const id = products.length + 1;
      setProducts([{
        id,
        name: data.name,
        sku: data.sku || `SK-V1-00${id}`,
        price: `৳ ${parseInt(data.regularPrice).toLocaleString()}`,
        stock: parseInt(data.stockQuantity),
        sales: 0,
        status: parseInt(data.stockQuantity) > 0 ? "Active" : "Out of Stock"
      }, ...products]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setViewingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct({
      name: product.name,
      sku: product.sku,
      regularPrice: product.price.replace(/[^\d]/g, ""),
      stockQuantity: product.stock.toString(),
      id: product.id
    });
    setIsModalOpen(true);
  };

  const handleView = (product: any) => {
    setViewingProduct({
      name: product.name,
      sku: product.sku,
      regularPrice: product.price.replace(/[^\d]/g, ""),
      stockQuantity: product.stock.toString(),
      id: product.id
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const confirmDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== deleteModal.id));
    toast.success(`Product "${deleteModal.name}" has been deleted.`);
    setDeleteModal({ isOpen: false, id: 0, name: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">My Products</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your inventory and product listings.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              products, 
              ["ID", "Name", "SKU", "Price", "Stock", "Sales", "Status"], 
              "Vendor_Products_Export",
              (p) => [p.id, p.name, p.sku, p.price, p.stock, p.sales, p.status]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Product
          </button>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary"><Package size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Products</p>
            <h3 className="text-xl font-black text-slate-800">{products.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500"><TrendingUp size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Sales</p>
            <h3 className="text-xl font-black text-slate-800">1,245</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500"><Layers size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Items</p>
            <h3 className="text-xl font-black text-slate-800">842</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500"><AlertTriangle size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Low Stock</p>
            <h3 className="text-xl font-black text-slate-800">3 Items</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-md w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by name, SKU or category..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-all">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Information</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Stock</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Sales</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all overflow-hidden">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{product.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800">{product.price}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs font-bold ${product.stock < 20 ? "text-red-500" : "text-slate-600"}`}>{product.stock}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-bold text-slate-600">{product.sales}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                      product.status === "Active" ? "bg-emerald-50 text-emerald-600" : 
                      product.status === "Low Stock" ? "bg-orange-50 text-orange-600" : 
                      product.status === "Out of Stock" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleView(product)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
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

      <DeleteModal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })} 
        onConfirm={confirmDelete} 
        itemName={deleteModal.name} 
        itemType="Product"
      />

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setIsModalOpen(false); setEditingProduct(null); setViewingProduct(null); }}></div>
          <div className="relative bg-white w-full max-w-6xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
                    {viewingProduct ? "Product Insights" : editingProduct ? "Update Product" : "Launch New Product"}
                  </h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Configuration Engine v1.0</p>
                </div>
              </div>
              <button 
                onClick={() => { setIsModalOpen(false); setEditingProduct(null); setViewingProduct(null); }}
                className="p-3 hover:bg-slate-100 rounded-2xl transition-colors group"
              >
                <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <AddProductForm onClose={() => setIsModalOpen(false)} onSuccess={handleAddProduct} 
                initialData={viewingProduct || editingProduct} 
                
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
