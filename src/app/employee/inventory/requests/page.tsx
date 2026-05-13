"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ArrowRightLeft, 
  PackagePlus, 
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Plus,
  Box,
  X,
  Send
} from "lucide-react";
import { toast } from "react-toastify";

type RequestStatus = "Pending" | "Approved" | "In Transit" | "Completed" | "Rejected";

interface InventoryRequest {
  id: string;
  item: string;
  quantity: number;
  requestingBranch: string;
  sourceLocation: string;
  priority: "High" | "Normal";
  date: string;
  status: RequestStatus;
}

const MOCK_REQUESTS: InventoryRequest[] = [
  { id: "REQ-4099", item: "Advanced Robotics Kit V2", quantity: 15, requestingBranch: "Dhaka Outlet", sourceLocation: "Main Warehouse", priority: "High", date: "Today, 10:00 AM", status: "Pending" },
  { id: "REQ-4098", item: "Beginner Electronics Set", quantity: 50, requestingBranch: "Chittagong Outlet", sourceLocation: "Main Warehouse", priority: "Normal", date: "Yesterday", status: "In Transit" },
  { id: "REQ-4097", item: "Solar Powered Car Model", quantity: 10, requestingBranch: "Sylhet Outlet", sourceLocation: "Main Warehouse", priority: "Normal", date: "Oct 22, 2023", status: "Completed" },
  { id: "REQ-4096", item: "Chemistry Lab Starter Kit", quantity: 5, requestingBranch: "Dhaka Outlet", sourceLocation: "Main Warehouse", priority: "High", date: "Oct 20, 2023", status: "Rejected" },
];

export default function EmployeeInventoryRequestsPage() {
  const [requests, setRequests] = useState<InventoryRequest[]>(MOCK_REQUESTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Request Form State
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("10");
  const [newPriority, setNewPriority] = useState<"High" | "Normal">("Normal");

  const filteredRequests = requests.filter(r => 
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.requestingBranch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: RequestStatus) => {
    switch(status) {
      case "Pending": return <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Clock size={12} /> Pending</span>;
      case "Approved": return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><CheckCircle2 size={12} /> Approved</span>;
      case "In Transit": return <span className="px-3 py-1 bg-purple-50 text-purple-600 border border-purple-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><ArrowRightLeft size={12} /> In Transit</span>;
      case "Completed": return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><CheckCircle2 size={12} /> Completed</span>;
      case "Rejected": return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><XCircle size={12} /> Rejected</span>;
    }
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newRequest: InventoryRequest = {
        id: `REQ-${Math.floor(Math.random() * 1000) + 5000}`,
        item: newItem,
        quantity: parseInt(newQuantity),
        requestingBranch: "My Branch", // Simulated
        sourceLocation: "Main Warehouse",
        priority: newPriority,
        date: "Just now",
        status: "Pending"
      };

      setRequests([newRequest, ...requests]);
      toast.success("Stock transfer request submitted to warehouse.");
      setIsSubmitting(false);
      setIsModalOpen(false);
      setNewItem("");
      setNewQuantity("10");
      setNewPriority("Normal");
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Inventory Requests</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Request stock transfers from the main warehouse.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 w-max"
        >
          <PackagePlus size={16} /> New Stock Request
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search items or locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
            />
          </div>
          <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm flex items-center gap-2">
            <Filter size={18} /> <span className="text-xs font-bold hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Request ID & Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Item & Quantity</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Routing</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 border border-slate-100">
                          <Box size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{req.id}</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1">{req.date}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div>
                        <p className="text-sm font-bold text-slate-700">{req.item}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-black text-slate-500">Qty: {req.quantity}</span>
                          {req.priority === "High" && (
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-[9px] font-black uppercase tracking-widest">Urgent</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">From</span>
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1"><Building2 size={10} className="text-slate-400"/> {req.sourceLocation}</span>
                        </div>
                        <ArrowRightLeft size={14} className="text-slate-300 mx-2" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">To</span>
                          <span className="text-xs font-bold text-primary flex items-center gap-1"><Building2 size={10} className="text-primary/50"/> {req.requestingBranch}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      {getStatusBadge(req.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center">
                    <p className="text-sm font-bold text-slate-500">No inventory requests found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
            
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <PackagePlus size={20} className="text-primary" /> Request Stock Transfer
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">From Main Warehouse</p>
              </div>
              <button 
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <form onSubmit={handleCreateRequest} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name / SKU *</label>
                  <input 
                    type="text" 
                    required
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all"
                    placeholder="e.g. Advanced Robotics Kit V2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quantity Needed *</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                    <select 
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as "High" | "Normal")}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all appearance-none"
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">Urgent / High</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !newItem}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-900/10"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={16} /> Submit Request
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
