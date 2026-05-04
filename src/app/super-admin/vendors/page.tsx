"use client";

import { 
  Store, 
  MapPin, 
  Package, 
  Clock, 
  ChevronRight,
  MoreVertical,
  Search,
  Filter
} from "lucide-react";

const vendors = [
  { id: 1, name: "Global Tech", category: "Electronics", city: "Dhaka", branches: 3, products: 255, status: "Active", joined: "Oct 12, 2023" },
  { id: 2, name: "RoboMaster", category: "Robotics", city: "Chittagong", branches: 1, products: 45, status: "Pending", joined: "Nov 05, 2023" },
  { id: 3, name: "Kids Planet", category: "Toys", city: "Sylhet", branches: 2, products: 120, status: "Active", joined: "Sep 20, 2023" },
  { id: 4, name: "Learning Hub", category: "Books", city: "Dhaka", branches: 5, products: 890, status: "Active", joined: "Aug 15, 2023" },
  { id: 5, name: "STEM Solutions", category: "Education", city: "Rajshahi", branches: 1, products: 32, status: "Suspended", joined: "Oct 30, 2023" },
];

export default function VendorsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Vendor Management</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and monitor all registered vendors on the platform.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          Add New Vendor
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
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
            <Filter size={16} /> Filters
          </button>
          <select className="px-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors outline-none border-none">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Robotics</option>
            <option>Toys</option>
          </select>
        </div>
      </div>

      {/* Vendors List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Store size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{vendor.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                          <MapPin size={10} /> {vendor.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600 px-3 py-1 bg-slate-100 rounded-lg">{vendor.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                        <Store size={12} className="text-slate-400" /> {vendor.branches} Branches
                      </p>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                        <Package size={12} className="text-slate-400" /> {vendor.products} Products
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      <Clock size={12} className="text-slate-400" /> {vendor.joined}
                    </p>
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
                    <div className="flex items-center justify-end gap-2">
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
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Showing 1 to 5 of 48 Vendors</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
