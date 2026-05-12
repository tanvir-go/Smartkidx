"use client";
import React, { useState } from "react";
import { Plus, Search, Filter, Eye, Edit, Trash2, Download, X, Save, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { exportToCSV } from "@/utils/export";

export default function EmployeeMonthlySalesPage() {
  const [data, setData] = useState([
  {
    "id": 1,
    "month": "October 2023",
    "revenue": "৳ 450,000",
    "growth": "+15%"
  }
]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({"month":"","revenue":"","growth":""});

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item.id);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({"month":"","revenue":"","growth":""});
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setData(data.map(d => d.id === editingItem ? { ...d, ...formData } : d));
      toast.success("Updated successfully!");
    } else {
      setData([{ id: Date.now(), ...formData }, ...data]);
      toast.success("Created successfully!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete this?")) {
      setData(data.filter(d => d.id !== id));
      toast.success("Deleted successfully!");
    }
  };

  const handleExport = () => {
    exportToCSV(data, ["Month","Revenue","Growth"], "Export", (item) => [item.month, item.revenue, item.growth]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Monthly Sales Report</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Aggregated revenue data.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button onClick={() => handleOpenModal()} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3">
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
          <div className="relative max-w-md w-full">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search..." className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[28px] text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" />
          </div>
          <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Month</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Revenue</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Growth</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">{item.month}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">{item.revenue}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">{item.growth}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden flex flex-col">
            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20"><FileText size={28} /></div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{editingItem ? "Edit Entry" : "Create New Entry"}</h3>
                  <p className="text-slate-400 text-xs font-medium mt-1">Fill out the details below.</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-slate-100 rounded-3xl transition-colors"><X size={24} className="text-slate-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Month</label>
                  <input type="text" value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Revenue</label>
                  <input type="text" value={formData.revenue} onChange={e => setFormData({...formData, revenue: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Growth</label>
                  <input type="text" value={formData.growth} onChange={e => setFormData({...formData, growth: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" required />
                </div>
                <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-slate-50 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-slate-100 transition-all">Cancel</button>
                  <button type="submit" className="px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2"><Save size={16} /> Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
