"use client";

import React, { useState } from "react";
import { 
  Undo2, 
  Search, 
  Filter, 
  MoreHorizontal, 
  X,
  Edit,
  Trash2,
  ChevronRight,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { toast } from "react-toastify";

export default function PurchaseReturnsPage() {
  const [returns, setReturns] = useState([
    { id: "RET-001", date: "Dec 3, 2023", invoiceId: "INV-SUP-8821", reason: "Damaged during shipping", status: "Processing" },
    { id: "RET-002", date: "Dec 4, 2023", invoiceId: "INV-SUP-8822", reason: "Incorrect Item Received", status: "Refunded" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState<any>(null);
  const [formData, setFormData] = useState({
    invoiceId: "",
    reason: "",
    status: "Processing"
  });

  const handleOpenEdit = (ret: any) => {
    setEditingReturn(ret);
    setFormData({
      invoiceId: ret.invoiceId,
      reason: ret.reason,
      status: ret.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.invoiceId || !formData.reason) {
      toast.error("Please provide all required return details");
      return;
    }

    setReturns(returns.map(ret => 
      ret.id === editingReturn.id ? { ...ret, ...formData } : ret
    ));

    toast.success("Purchase return updated successfully!");
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this return record?")) {
      setReturns(returns.filter(ret => ret.id !== id));
      toast.success("Return record removed.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Purchase Returns</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage product returns and credit notes with suppliers.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative flex-grow max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search returns..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-200">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Return ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Original Invoice</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Refund Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {returns.map((ret) => (
                <tr key={ret.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-tighter group-hover:text-primary transition-colors">{ret.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{ret.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 uppercase tracking-tight">{ret.invoiceId}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{ret.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      ret.status === 'Refunded' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {ret.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleOpenEdit(ret)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
                        title="Edit Return"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(ret.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Return"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Return Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Undo2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Update Return Record</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">{editingReturn?.id}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Invoice Reference</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    required
                    value={formData.invoiceId}
                    onChange={(e) => setFormData({...formData, invoiceId: e.target.value})}
                    placeholder="e.g. INV-SUP-8821"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Return Reason</label>
                <div className="relative">
                  <AlertCircle size={16} className="absolute left-4 top-3 text-slate-400" />
                  <textarea 
                    required
                    rows={3}
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    placeholder="Describe why the items are being returned..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Refund Status</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Processing', 'Refunded', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({...formData, status})}
                      className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        formData.status === status 
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                      }`}
                    >
                      {status === 'Processing' && <Clock size={14} className="inline mr-1 mb-0.5" />}
                      {status === 'Refunded' && <CheckCircle2 size={14} className="inline mr-1 mb-0.5" />}
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 mt-4 flex items-center justify-center gap-2"
              >
                Save Return Updates <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
