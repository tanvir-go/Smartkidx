"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Shield, 
  Mail,
  ChevronRight,
  Download,
  Edit,
  Trash2,
  X,
  User,
  Eye
} from "lucide-react";
import { exportToCSV } from "@/utils/export";
import { toast } from "react-toastify";

export default function UsersManagementPage() {
  const [userList, setUserList] = useState([
    { id: 1, name: "Admin User", role: "Super Admin", email: "admin@smartkids.com", status: "Active", joined: "Oct 20, 2023" },
    { id: 2, name: "Global Tech", role: "Seller", email: "sales@globaltech.com", status: "Active", joined: "Oct 21, 2023" },
    { id: 3, name: "John Smith", role: "Customer", email: "john@example.com", status: "Active", joined: "Oct 22, 2023" },
    { id: 4, name: "Jane Doe", role: "Support", email: "jane@smartkids.com", status: "Active", joined: "Oct 23, 2023" },
    { id: 5, name: "Old Seller", role: "Seller", email: "old@vendor.com", status: "Inactive", joined: "Sep 15, 2023" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Customer",
    status: "Active"
  });

  const handleOpenModal = (user?: any) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", role: "Customer", status: "Active" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }

    if (editingUser) {
      setUserList(userList.map(u => 
        u.id === editingUser.id ? { ...u, ...formData } : u
      ));
      toast.success("User profile synchronized!");
    } else {
      const id = userList.length + 1;
      const joined = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      setUserList([
        { ...formData, id, joined },
        ...userList
      ]);
      toast.success("User invitation deployed!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to terminate this user's access?")) {
      setUserList(userList.filter(u => u.id !== id));
      toast.success("User access revoked and account purged.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">System Users</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage permissions and accounts for all platform participants.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              userList, 
              ["ID", "Name", "Role", "Email", "Status", "Joined"], 
              "Users_Export",
              (u) => [u.id, u.name, u.role, u.email, u.status, u.joined]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
          >
            <PlusIcon size={18} className="group-hover:rotate-90 transition-transform" /> Invite User
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users by name, role or email..." 
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
          <Filter size={16} /> Roles
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">System Role</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Join Date</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {userList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in slide-in-from-top-1">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[18px] bg-slate-100 flex items-center justify-center text-primary font-black text-[10px] uppercase shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-black mt-2 flex items-center gap-2 uppercase tracking-widest lowercase">
                          <Mail size={12} className="text-slate-300" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                      user.role === "Super Admin" ? "border-slate-800 text-slate-800 bg-slate-50" : 
                      user.role === "Seller" ? "border-blue-100 text-blue-500 bg-blue-50" : "border-slate-100 text-slate-500 bg-white"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{user.joined}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      user.status === "Active" ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all" title="View Profile"><Eye size={18} /></button>
                      <button onClick={() => handleOpenModal(user)} className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Edit User"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(user.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Revoke Access"><Trash2 size={18} /></button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Security Settings"><Shield size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl border border-slate-100 p-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{editingUser ? "Sync User Profile" : "Deploy User Invitation"}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Platform Access Protocol</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity Name *</label>
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

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email Address *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@domain.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Super Admin</option>
                    <option>Seller</option>
                    <option>Customer</option>
                    <option>Support</option>
                    <option>Content Manager</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 mt-4 flex items-center justify-center gap-2"
              >
                {editingUser ? "Synchronize Identity" : "Deploy User Invitation"} <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PlusIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>;
}
