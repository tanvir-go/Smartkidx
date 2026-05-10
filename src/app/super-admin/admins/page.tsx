"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  MoreVertical, 
  Lock, 
  UserCircle, 
  CheckCircle2,
  Mail,
  Shield,
  X,
  User,
  ShieldAlert,
  Download
} from "lucide-react";
import { exportToCSV } from "@/utils/export";
import { toast } from "react-toastify";

export default function AdminsManagementPage() {
  const [staff, setStaff] = useState([
    { id: 1, name: "Super Admin", role: "Owner", email: "admin@smartkids.com", status: "Active", access: "Full Control" },
    { id: 2, name: "Management One", role: "Manager", email: "m1@smartkids.com", status: "Active", access: "Sales & Products" },
    { id: 3, name: "Support Lead", role: "Support", email: "support@smartkids.com", status: "Active", access: "Helpdesk Only" },
    { id: 4, name: "Finance Officer", role: "Finance", email: "finance@smartkids.com", status: "Active", access: "Billing & Reports" },
    { id: 5, name: "Dev Mode", role: "Developer", email: "dev@smartkids.com", status: "Suspended", access: "System Settings" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", role: "Manager", access: "Limited Access" });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) {
      toast.error("Please fill in the required fields");
      return;
    }

    const id = staff.length + 1;
    setStaff([
      { ...newStaff, id, status: "Active" },
      ...staff
    ]);
    setIsModalOpen(false);
    setNewStaff({ name: "", email: "", role: "Manager", access: "Limited Access" });
    toast.success("New staff member registered successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">Administrative Staff</h2>
          <p className="text-slate-500 text-sm mt-1">Manage internal team roles and system access permissions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              staff, 
              ["ID", "Name", "Role", "Email", "Status", "Access"], 
              "Admins_Export",
              (a) => [a.id, a.name, a.role, a.email, a.status, a.access]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
          >
            <Plus size={18} /> Add Staff Member
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or role..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrator</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Scope</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {staff.map((admin) => (
              <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in slide-in-from-top-1">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                      {admin.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">{admin.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5 flex items-center gap-1">
                        <Mail size={10} /> {admin.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-primary" />
                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{admin.role}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">{admin.access}</td>
                <td className="px-8 py-5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    admin.status === "Active" ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                  }`}>
                    {admin.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-all"><Lock size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl border border-slate-100 p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-slate-800 uppercase tracking-tight">Add Staff Member</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    placeholder="sarah@smartkids.com"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role</label>
                  <select 
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option>Manager</option>
                    <option>Support</option>
                    <option>Finance</option>
                    <option>Developer</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Scope</label>
                  <select 
                    value={newStaff.access}
                    onChange={(e) => setNewStaff({...newStaff, access: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option>Limited Access</option>
                    <option>Full Control</option>
                    <option>Sales Only</option>
                    <option>Billing Only</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 mt-4"
              >
                Register Staff
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
