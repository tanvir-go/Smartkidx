"use client";

import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag,
  MoreVertical,
  Search,
  Filter,
  UserCheck
} from "lucide-react";

const customers = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "+880 1711-223344", city: "Dhaka", orders: 12, spent: "৳ 14,500", status: "Active" },
  { id: 2, name: "Sara Ahmed", email: "sara@example.com", phone: "+880 1822-334455", city: "Chittagong", orders: 5, spent: "৳ 8,200", status: "Active" },
  { id: 3, name: "Rahat Kabir", email: "rahat@example.com", phone: "+880 1933-445566", city: "Sylhet", orders: 1, spent: "৳ 1,500", status: "New" },
  { id: 4, name: "Mina Begum", email: "mina@example.com", phone: "+880 1744-556677", city: "Dhaka", orders: 24, spent: "৳ 45,000", status: "VIP" },
  { id: 5, name: "Tariq Aziz", email: "tariq@example.com", phone: "+880 1655-667788", city: "Khulna", orders: 0, spent: "৳ 0", status: "Inactive" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Customer Management</h2>
          <p className="text-slate-500 text-sm mt-1">View and manage all registered customers on the platform.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-100 text-slate-800 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 transition-all">
            Export List
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Add New Customer
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Customers", value: "2,450", color: "text-slate-800" },
          { label: "New this Month", value: "185", color: "text-primary" },
          { label: "Active Users", value: "1,890", color: "text-emerald-600" },
          { label: "Churn Rate", value: "2.4%", color: "text-red-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search customers by name, email or phone..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Orders/Spent</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all font-black text-xs">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{customer.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: #C-{customer.id}00{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium hover:text-primary transition-colors cursor-pointer">
                        <Mail size={12} className="text-slate-400" /> {customer.email}
                      </p>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                        <Phone size={12} className="text-slate-400" /> {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      <MapPin size={12} className="text-slate-400" /> {customer.city}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-800 font-bold flex items-center gap-1.5">
                        <ShoppingBag size={12} className="text-slate-400" /> {customer.orders} Orders
                      </p>
                      <p className="text-xs text-primary font-black uppercase tracking-widest">{customer.spent}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      customer.status === "VIP" ? "bg-purple-50 text-purple-600" : 
                      customer.status === "Active" ? "bg-emerald-50 text-emerald-600" : 
                      customer.status === "New" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                      <MoreVertical size={18} />
                    </button>
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
