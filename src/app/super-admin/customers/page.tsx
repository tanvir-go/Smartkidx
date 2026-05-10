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
  User,
  Download,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { exportToCSV } from "@/utils/export";
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
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "Dhaka", status: "Active" });

  const handleOpenModal = (customer?: any) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        location: customer.location,
        status: customer.status
      });
    } else {
      setEditingCustomer(null);
      setFormData({ name: "", email: "", phone: "", location: "Dhaka", status: "New" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }

    if (editingCustomer) {
      setCustomerList(customerList.map(c => 
        c.id === editingCustomer.id ? { ...c, ...formData } : c
      ));
      toast.success("Customer profile updated!");
    } else {
      const id = customerList.length + 1;
      setCustomerList([
        { ...formData, id, orders: 0, spent: "৳ 0" },
        ...customerList
      ]);
      toast.success("New customer registered successfully!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to remove this customer from the database?")) {
      setCustomerList(customerList.filter(c => c.id !== id));
      toast.success("Customer record removed.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Customer Database</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage all registered customers and their purchase history.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              customerList, 
              ["ID", "Name", "Email", "Phone", "Location", "Orders", "Spent", "Status"], 
              "Customers_Export",
              (c) => [c.id, c.name, c.email, c.phone, c.location, c.orders, c.spent, c.status]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Customer
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email or phone..." 
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
          />
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Details</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Order History</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customerList.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in slide-in-from-top-1">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[18px] bg-slate-100 flex items-center justify-center text-primary text-[10px] font-black group-hover:bg-primary group-hover:text-white transition-all shadow-sm uppercase">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{customer.name}</p>
                        <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-widest">CUS-00{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-black text-slate-600 flex items-center gap-2 leading-none lowercase">
                        <Mail size={12} className="text-slate-300" /> {customer.email}
                      </p>
                      <p className="text-[11px] font-black text-slate-400 flex items-center gap-2">
                        <Phone size={12} className="text-slate-300" /> {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[11px] font-black text-slate-600 flex items-center gap-2 uppercase tracking-widest leading-none">
                      <MapPin size={12} className="text-slate-300" /> {customer.location}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-black text-slate-800 leading-none">{customer.orders} Orders</p>
                      <p className="text-[11px] font-black text-primary">{customer.spent} Total</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      customer.status === "Active" ? "bg-emerald-50 text-emerald-600" : 
                      customer.status === "New" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all" title="View Profile">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleOpenModal(customer)} className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Edit Customer">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(customer.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Remove Record">
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

      {/* Add/Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl border border-slate-100 p-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{editingCustomer ? "Update Customer" : "Register New Customer"}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Authorized Data Entry</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="tanvir@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all lowercase"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+880"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base City</label>
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>New</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 mt-4 flex items-center justify-center gap-2"
              >
                {editingCustomer ? "Update Customer Profile" : "Register Customer"} <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
