"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  X,
  User
} from "lucide-react";
import { toast } from "react-toastify";

export default function CustomersPage() {
  const [customerList, setCustomerList] = useState([
    { id: 1, name: "Tanvir Ahmed", email: "tanvir@example.com", phone: "+880 1711-223344", location: "Dhaka", orders: 12, spent: "৳ 15,400", status: "Active" },
    { id: 2, name: "Rahat Karim", email: "rahat@example.com", phone: "+880 1812-334455", location: "Chittagong", orders: 5, spent: "৳ 6,200", status: "Active" },
    { id: 3, name: "Sultana Razia", email: "razia@example.com", phone: "+880 1913-445566", location: "Sylhet", orders: 0, spent: "৳ 0", status: "New" },
    { id: 4, name: "Arif Hossain", email: "arif@example.com", phone: "+880 1614-556677", location: "Dhaka", orders: 28, spent: "৳ 42,800", status: "Active" },
    { id: 5, name: "Nusrat Jahan", email: "nusrat@example.com", phone: "+880 1515-667788", location: "Rajshahi", orders: 2, spent: "৳ 1,500", status: "Inactive" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", location: "Dhaka" });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) {
      toast.error("Please fill in required fields");
      return;
    }

    const id = customerList.length + 1;
    setCustomerList([
      { ...newCustomer, id, orders: 0, spent: "৳ 0", status: "New" },
      ...customerList
    ]);
    setIsModalOpen(false);
    setNewCustomer({ name: "", email: "", phone: "", location: "Dhaka" });
    toast.success("New customer registered successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">Customer Database</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage all registered customers and their purchase history.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Customer
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email or phone..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Details</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Order History</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customerList.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in slide-in-from-top-1">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-primary text-xs font-black group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">{customer.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">ID: CUS-00{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 leading-none">
                        <Mail size={12} className="text-slate-400" /> {customer.email}
                      </p>
                      <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-300" /> {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-widest leading-none">
                      <MapPin size={12} className="text-slate-400" /> {customer.location}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-black text-slate-800 leading-none">{customer.orders} Orders</p>
                      <p className="text-[11px] font-bold text-primary">{customer.spent} Total</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      customer.status === "Active" ? "bg-emerald-50 text-emerald-600" : 
                      customer.status === "New" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl border border-slate-100 p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-slate-800 uppercase tracking-tight">Register New Customer</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      placeholder="tanvir@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      placeholder="+880"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base City</label>
                <select 
                  value={newCustomer.location}
                  onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold appearance-none"
                >
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 mt-4"
              >
                Register Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
