"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Send,
  X,
  CreditCard
} from "lucide-react";
import { toast } from "react-toastify";

type PRStatus = "Pending Approval" | "Approved" | "Ordered" | "Rejected";

interface PurchaseRequest {
  id: string;
  item: string;
  category: string;
  estimatedCost: number;
  quantity: number;
  requestedBy: string;
  date: string;
  status: PRStatus;
}

const MOCK_PRS: PurchaseRequest[] = [
  { id: "PR-2041", item: "Printer Ink Cartridges (Black & Color)", category: "Office Supplies", estimatedCost: 4500, quantity: 2, requestedBy: "Admin Branch 1", date: "Today", status: "Pending Approval" },
  { id: "PR-2040", item: "Arduino Uno R3 Boards", category: "Component Restock", estimatedCost: 25000, quantity: 50, requestedBy: "Inventory Team", date: "Yesterday", status: "Approved" },
  { id: "PR-2039", item: "Packaging Boxes (Medium)", category: "Logistics", estimatedCost: 12000, quantity: 1000, requestedBy: "Dispatch Team", date: "Oct 22, 2023", status: "Ordered" },
  { id: "PR-2038", item: "New Office Chairs", category: "Furniture", estimatedCost: 35000, quantity: 5, requestedBy: "Admin Branch 2", date: "Oct 20, 2023", status: "Rejected" },
];

export default function EmployeePurchaseRequestsPage() {
  const [prs, setPrs] = useState<PurchaseRequest[]>(MOCK_PRS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New PR Form
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("Component Restock");
  const [quantity, setQuantity] = useState("1");
  const [estimatedCost, setEstimatedCost] = useState("");

  const filteredPrs = prs.filter(pr => 
    pr.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pr.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pr.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: PRStatus) => {
    switch(status) {
      case "Pending Approval": return <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Clock size={12} /> Pending</span>;
      case "Approved": return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><CheckCircle2 size={12} /> Approved</span>;
      case "Ordered": return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><FileSpreadsheet size={12} /> Ordered</span>;
      case "Rejected": return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><XCircle size={12} /> Rejected</span>;
    }
  };

  const handleSubmitPR = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newPR: PurchaseRequest = {
        id: `PR-${Math.floor(Math.random() * 1000) + 3000}`,
        item,
        category,
        estimatedCost: parseInt(estimatedCost || "0"),
        quantity: parseInt(quantity),
        requestedBy: "My Department",
        date: "Just now",
        status: "Pending Approval"
      };

      setPrs([newPR, ...prs]);
      toast.success("Purchase Request submitted for management approval.");
      setIsSubmitting(false);
      setIsModalOpen(false);
      setItem("");
      setEstimatedCost("");
      setQuantity("1");
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Purchase Requests (PR)</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Submit and track procurement requests.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 w-max"
        >
          <Plus size={16} /> New Purchase Request
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search PR by ID, Item, or Requester..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">PR Details</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Item & Cost</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Department</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPrs.length > 0 ? (
                filteredPrs.map((pr) => (
                  <tr key={pr.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 border border-slate-100">
                          <FileSpreadsheet size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{pr.id}</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1">{pr.date}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div>
                        <p className="text-sm font-bold text-slate-700">{pr.item}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] font-black text-slate-500">Qty: {pr.quantity}</span>
                          <span className="text-[10px] font-bold text-slate-300">•</span>
                          <span className="text-[11px] font-black text-emerald-600">Est. ৳ {pr.estimatedCost.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div>
                        <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><Building2 size={12} className="text-slate-400"/> {pr.requestedBy}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{pr.category}</p>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      {getStatusBadge(pr.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center">
                    <p className="text-sm font-bold text-slate-500">No purchase requests found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New PR Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
            
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <FileSpreadsheet size={20} className="text-primary" /> Create PR
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Submit for approval</p>
              </div>
              <button 
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmitPR} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Item Description *</label>
                  <input 
                    type="text" 
                    required
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all"
                    placeholder="What do you need?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="Component Restock">Component Restock</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Logistics">Logistics / Packaging</option>
                    <option value="Furniture">Furniture & Fixtures</option>
                    <option value="IT Equipment">IT Equipment</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quantity *</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1"><CreditCard size={10}/> Est. Cost (Total) *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                      <input 
                        type="number" 
                        required
                        min="0"
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(e.target.value)}
                        className="w-full pl-8 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !item}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-900/10"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={16} /> Submit to Management
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
