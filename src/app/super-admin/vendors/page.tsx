"use client";

import React, { useState } from "react";
import { 
  Store, 
  MapPin, 
  Package, 
  Clock, 
  ChevronRight,
  MoreVertical,
  Search,
  Filter,
  Plus,
  X,
  Building,
  Tag
} from "lucide-react";
import { toast } from "react-toastify";

export default function VendorsPage() {
  const [vendorList, setVendorList] = useState([
    { id: 1, name: "Global Tech", category: "Electronics", city: "Dhaka", branches: 3, products: 255, status: "Active", joined: "Oct 12, 2023" },
    { id: 2, name: "RoboMaster", category: "Robotics", city: "Chittagong", branches: 1, products: 45, status: "Pending", joined: "Nov 05, 2023" },
    { id: 3, name: "Kids Planet", category: "Toys", city: "Sylhet", branches: 2, products: 120, status: "Active", joined: "Sep 20, 2023" },
    { id: 4, name: "Learning Hub", category: "Books", city: "Dhaka", branches: 5, products: 890, status: "Active", joined: "Aug 15, 2023" },
    { id: 5, name: "STEM Solutions", category: "Education", city: "Rajshahi", branches: 1, products: 32, status: "Suspended", joined: "Oct 30, 2023" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: "", city: "Dhaka", category: "Electronics" });

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name) {
      toast.error("Vendor name is required");
      return;
    }

    const id = vendorList.length + 1;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    
    setVendorList([
      { ...newVendor, id, branches: 1, products: 0, status: "Active", joined: today },
      ...vendorList
    ]);
    setIsModalOpen(false);
    setNewVendor({ name: "", city: "Dhaka", category: "Electronics" });
    toast.success("New vendor onboarded successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">Vendor Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage and monitor all registered vendors on the platform.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Vendor
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search vendors by name, ID or city..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Vendors List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendor Info</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Stats</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined Date</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {vendorList.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in slide-in-from-top-1">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <Store size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{vendor.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                          <MapPin size={10} /> {vendor.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-lg">{vendor.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-600 flex items-center gap-1.5 font-bold uppercase tracking-tight">
                        <Store size={12} className="text-slate-400" /> {vendor.branches} Branches
                      </p>
                      <p className="text-[10px] text-slate-600 flex items-center gap-1.5 font-bold uppercase tracking-tight">
                        <Package size={12} className="text-slate-400" /> {vendor.products} Products
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase">
                    {vendor.joined}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      vendor.status === "Active" ? "bg-emerald-50 text-emerald-600" : 
                      vendor.status === "Pending" ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                    }`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all">
                        <ChevronRight size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vendor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl border border-slate-100 p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-slate-800 uppercase tracking-tight">Onboard New Vendor</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddVendor} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vendor/Business Name *</label>
                <div className="relative">
                  <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={newVendor.name}
                    onChange={(e) => setNewVendor({...newVendor, name: e.target.value})}
                    placeholder="e.g. Dhaka Robotics Hub"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base City</label>
                  <select 
                    value={newVendor.city}
                    onChange={(e) => setNewVendor({...newVendor, city: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Category</label>
                  <select 
                    value={newVendor.category}
                    onChange={(e) => setNewVendor({...newVendor, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Electronics</option>
                    <option>Robotics</option>
                    <option>Toys</option>
                    <option>Books</option>
                    <option>Education</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 mt-4"
              >
                Complete Onboarding
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
