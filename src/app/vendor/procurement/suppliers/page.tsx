"use client";

import React, { useState } from "react";
import { Truck, Plus, Search, Filter, MoreHorizontal, FileDown, X, User, Phone, MapPin, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import AddSupplierForm from "@/components/vendor/AddSupplierForm";

export default function VendorSuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([
    { supplierName: "Global Tech Solutions", phone: "+880 1612-345678", city: "Dhaka", status: "Active" },
    { supplierName: "RoboMaster Spares", phone: "+880 1712-445566", city: "Chittagong", status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);

  const handleAddSupplier = (data: any) => {
    if (editingSupplier) {
      setSuppliers(suppliers.map((s: any) => s.supplierName === editingSupplier.supplierName ? data : s));
    } else {
      setSuppliers([data, ...suppliers]);
    }
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleEdit = (supplier: any) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">Suppliers</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your supply chain partners.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit"
        >
          <Plus size={18} /> Add New Supplier
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative flex-grow max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search suppliers..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Supplier Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {suppliers.map((supplier: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors animate-in fade-in slide-in-from-top-1">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary font-black text-xs">
                        {supplier.supplierName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{supplier.supplierName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{supplier.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{supplier.phone}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">{supplier.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(supplier)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" 
                        title="Edit Supplier"
                      >
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setIsModalOpen(false); setEditingSupplier(null); }}></div>
          <div className="relative bg-white w-full max-w-6xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <AddSupplierForm 
              onClose={() => { setIsModalOpen(false); setEditingSupplier(null); }} 
              onSuccess={handleAddSupplier}
              initialData={editingSupplier}
            />
          </div>
        </div>
      )}
    </div>
  );
}
