"use client";

import React, { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  MoreVertical, 
  X, 
  User, 
  Pencil, 
  Trash2, 
  ShieldAlert,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Download,
  Settings
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function VendorEmployeesPage() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Tanvir Ahmed", email: "tanvir@globaltech.com", role: "Sales Manager", status: "Active", permissions: ["Orders", "Customers", "Reports"], joined: "Jan 12, 2024" },
    { id: 2, name: "Sarah Kabir", email: "sarah@globaltech.com", role: "Inventory Lead", status: "Active", permissions: ["Products", "Inventory", "Procurement"], joined: "Feb 05, 2024" },
    { id: 3, name: "Kamal Hossain", email: "kamal@globaltech.com", role: "Sales Associate", status: "Inactive", permissions: ["Orders"], joined: "Mar 20, 2024" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<any>(null);
  
  const allModules = ["Products", "Inventory", "Orders", "POS", "Invoices", "Procurement", "Customers", "Reports", "Settings"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Sales Associate",
    status: "Active",
    permissions: ["Orders"] as string[]
  });

  const handleOpenModal = (emp?: any) => {
    if (emp) {
      setEditingEmp(emp);
      setFormData({ ...emp });
    } else {
      setEditingEmp(null);
      setFormData({ name: "", email: "", role: "Sales Associate", status: "Active", permissions: ["Orders"] });
    }
    setIsModalOpen(true);
  };

  const togglePermission = (module: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(module) 
        ? prev.permissions.filter(p => p !== module)
        : [...prev.permissions, module]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmp) {
      setEmployees(employees.map(emp => emp.id === editingEmp.id ? { ...emp, ...formData } : emp));
      toast.success("Staff access permissions updated!");
    } else {
      setEmployees([{ ...formData, id: Date.now(), joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) }, ...employees]);
      toast.success("New staff member invited to the team!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this employee? They will lose all access immediately.")) {
      setEmployees(employees.filter(emp => emp.id !== id));
      toast.error("Employee access revoked.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Staff Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage internal vendor staff and their granular module access.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-slate-900 text-white px-8 py-4 rounded-[24px] font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Invite New Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-500">
            <Users size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Staff</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{employees.length}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Shield size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Access</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{employees.filter(e => e.status === 'Active').length}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center text-rose-500">
            <Lock size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Restricted</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{employees.filter(e => e.permissions.length < 3).length}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative w-96">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search staff by name or role..." className="w-full pl-14 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
          </div>
          <button className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-primary transition-all shadow-sm">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff Identity</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Scope</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[18px] bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-slate-200 group-hover:scale-105 transition-all">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{emp.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 lowercase flex items-center gap-1.5"><Mail size={12} className="text-slate-300" /> {emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{emp.role}</span>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Joined {emp.joined}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                      {emp.permissions.map(p => (
                        <span key={p} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[8px] font-black uppercase tracking-tighter">{p}</span>
                      ))}
                      {emp.permissions.length === 0 && <span className="text-[9px] font-black text-rose-500 uppercase">No Access</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      emp.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleOpenModal(emp)} className="p-2.5 text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Edit Permissions"><ShieldAlert size={18} /></button>
                      <button onClick={() => handleDelete(emp.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-xl transition-all" title="Revoke Access"><Trash2 size={18} /></button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm rounded-xl transition-all"><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Management Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-[48px] shadow-2xl border border-slate-100 p-12 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-3xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{editingEmp ? "Configure Access Control" : "Invite Team Member"}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Role-Based Access Management (RBAC)</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-slate-50 rounded-3xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="e.g. Asif Mahmud" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="name@company.com" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Designated Role</label>
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                      <option>Sales Associate</option>
                      <option>Sales Manager</option>
                      <option>Inventory Clerk</option>
                      <option>Inventory Lead</option>
                      <option>Procurement Officer</option>
                      <option>Accountant</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Module Permissions</h4>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Reduce Access Control</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {allModules.map(module => {
                      const isSelected = formData.permissions.includes(module);
                      return (
                        <button
                          key={module}
                          type="button"
                          onClick={() => togglePermission(module)}
                          className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all group ${
                            isSelected 
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm" 
                              : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                          }`}
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest">{module}</span>
                          {isSelected ? <Eye size={14} /> : <EyeOff size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-10 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-slate-50 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-3xl hover:bg-slate-100 transition-all">Discard Changes</button>
                  <button type="submit" className="flex-[2] py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-3xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                    {editingEmp ? "Synchronize Access" : "Deploy Invitation"} <ChevronRight size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
