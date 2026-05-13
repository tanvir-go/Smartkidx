"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  RefreshCcw, 
  PackageX, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  X,
  FileText
} from "lucide-react";
import { toast } from "react-toastify";

type ReturnStatus = "Pending Review" | "Approved (Awaiting Item)" | "Item Received" | "Refunded" | "Rejected";

interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  productName: string;
  reason: string;
  details: string;
  dateRequested: string;
  status: ReturnStatus;
  hasImages: boolean;
}

const MOCK_RETURNS: ReturnRequest[] = [
  { id: "RET-10023", orderId: "#ORD-9930", customerName: "Arif Hossain", productName: "Advanced Robotics Kit V2", reason: "Damaged in transit", details: "The box was crushed and a motor is broken.", dateRequested: "Today, 09:30 AM", status: "Pending Review", hasImages: true },
  { id: "RET-10022", orderId: "#ORD-9844", customerName: "Sabrina Rahman", productName: "Beginner Electronics Set", reason: "Missing parts", details: "Did not include the 9V battery connector.", dateRequested: "Yesterday", status: "Approved (Awaiting Item)", hasImages: false },
  { id: "RET-10021", orderId: "#ORD-9801", customerName: "Kamrul Islam", productName: "Solar Powered Car Model", reason: "Changed mind", details: "No longer need it.", dateRequested: "Oct 24, 2023", status: "Rejected", hasImages: false },
  { id: "RET-10020", orderId: "#ORD-9755", customerName: "Nusrat Jahan", productName: "Chemistry Lab Starter Kit", reason: "Defective item", details: "One of the test tubes arrived shattered.", dateRequested: "Oct 22, 2023", status: "Refunded", hasImages: true },
];

export default function EmployeeReturnsPage() {
  const [returns, setReturns] = useState<ReturnRequest[]>(MOCK_RETURNS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<ReturnRequest | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredReturns = returns.filter(r => 
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: ReturnStatus) => {
    switch(status) {
      case "Pending Review": return <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Clock size={12} /> Pending</span>;
      case "Approved (Awaiting Item)": return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><PackageX size={12} /> Awaiting Item</span>;
      case "Item Received": return <span className="px-3 py-1 bg-purple-50 text-purple-600 border border-purple-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><CheckCircle2 size={12} /> Received</span>;
      case "Refunded": return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><RefreshCcw size={12} /> Refunded</span>;
      case "Rejected": return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><XCircle size={12} /> Rejected</span>;
    }
  };

  const handleAction = (action: "approve" | "reject") => {
    if (!selectedRequest) return;
    
    if (action === "reject" && !rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setReturns(returns.map(r => {
        if (r.id === selectedRequest.id) {
          return { ...r, status: action === "approve" ? "Approved (Awaiting Item)" : "Rejected" };
        }
        return r;
      }));
      
      toast.success(action === "approve" ? "RMA generated and customer notified." : "Return request rejected.");
      setIsProcessing(false);
      setSelectedRequest(null);
      setRejectionReason("");
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Return Requests</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Review and process RMA requests from customers.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by RMA, Order ID, or Customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
            />
          </div>
          <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm flex items-center gap-2">
            <Filter size={18} /> <span className="text-xs font-bold hidden sm:inline">Filter Status</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Request Info</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Product & Reason</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredReturns.length > 0 ? (
                filteredReturns.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${req.status === 'Pending Review' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                          <RefreshCcw size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{req.id}</p>
                          <p className="text-[11px] font-bold text-slate-500 mt-1">{req.customerName} • {req.orderId}</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-0.5">{req.dateRequested}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div>
                        <p className="text-sm font-bold text-slate-700">{req.productName}</p>
                        <p className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1">
                          <AlertTriangle size={12} /> {req.reason}
                        </p>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      {getStatusBadge(req.status)}
                    </td>

                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all inline-flex items-center gap-2 shadow-lg shadow-slate-900/10"
                      >
                        <FileText size={14} /> Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center">
                    <p className="text-sm font-bold text-slate-500">No return requests found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isProcessing && setSelectedRequest(null)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <RefreshCcw size={20} className="text-primary" /> Return Authorization
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">RMA: {selectedRequest.id}</p>
              </div>
              <button 
                onClick={() => !isProcessing && setSelectedRequest(null)}
                className="w-10 h-10 rounded-xl bg-white text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center border border-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</span>
                  <p className="text-sm font-bold text-slate-800 mt-1">{selectedRequest.orderId}</p>
                  <p className="text-xs font-medium text-slate-500">{selectedRequest.customerName}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</span>
                  <div className="mt-2">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Information</span>
                <div className="mt-2 p-4 border border-slate-100 rounded-2xl">
                  <p className="text-sm font-bold text-slate-800">{selectedRequest.productName}</p>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1 mb-2"><AlertTriangle size={12}/> Reason for Return</span>
                <p className="text-sm font-bold text-red-900">{selectedRequest.reason}</p>
                <p className="text-xs font-medium text-red-700 mt-2 italic">"{selectedRequest.details}"</p>
                
                {selectedRequest.hasImages && (
                  <div className="mt-4 pt-4 border-t border-red-100">
                    <button className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline">
                      <ImageIcon size={14} /> View Attached Evidence (2 Images)
                    </button>
                  </div>
                )}
              </div>

              {selectedRequest.status === "Pending Review" && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rejection Note (If Rejecting)</label>
                  <textarea 
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Provide a reason if rejecting this request..."
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none resize-none"
                    rows={2}
                  />
                </div>
              )}

            </div>

            {selectedRequest.status === "Pending Review" && (
              <div className="p-8 border-t border-slate-100 bg-white shrink-0 flex gap-4">
                <button 
                  onClick={() => handleAction("reject")}
                  disabled={isProcessing}
                  className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-red-100 transition-all disabled:opacity-50"
                >
                  Reject Request
                </button>
                <button 
                  onClick={() => handleAction("approve")}
                  disabled={isProcessing}
                  className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><CheckCircle2 size={16} /> Approve & Generate RMA</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
