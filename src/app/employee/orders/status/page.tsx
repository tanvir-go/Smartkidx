"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Package, 
  Truck, 
  RefreshCw,
  X,
  Save,
  FileText,
  AlertCircle
} from "lucide-react";
import { toast } from "react-toastify";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Returned";

interface TrackingLog {
  status: OrderStatus;
  date: string;
  note: string;
}

interface LogisticsOrder {
  id: string;
  customer: string;
  location: string;
  courier: string;
  trackingId: string;
  currentStatus: OrderStatus;
  itemsCount: number;
  lastUpdated: string;
  history: TrackingLog[];
}

const MOCK_ORDERS: LogisticsOrder[] = [
  { 
    id: "#ORD-9930", customer: "Arif Hossain", location: "Dhaka", courier: "Steadfast", trackingId: "SF-88992211", currentStatus: "Processing", itemsCount: 3, lastUpdated: "Today, 10:45 AM",
    history: [
      { status: "Pending", date: "Today, 09:15 AM", note: "Order placed successfully." },
      { status: "Processing", date: "Today, 10:45 AM", note: "Items packed and ready for courier pickup." }
    ]
  },
  { 
    id: "#ORD-9929", customer: "Sabrina Rahman", location: "Chittagong", courier: "Pathao", trackingId: "PT-9988223", currentStatus: "Shipped", itemsCount: 1, lastUpdated: "Yesterday, 04:20 PM",
    history: [
      { status: "Pending", date: "Yesterday, 10:00 AM", note: "Order placed." },
      { status: "Processing", date: "Yesterday, 01:30 PM", note: "Handed over to Pathao courier." },
      { status: "Shipped", date: "Yesterday, 04:20 PM", note: "In transit to Chittagong hub." }
    ]
  },
  { 
    id: "#ORD-9928", customer: "Kamrul Islam", location: "Sylhet", courier: "RedX", trackingId: "RX-5544332", currentStatus: "Pending", itemsCount: 4, lastUpdated: "Today, 11:30 AM",
    history: [
      { status: "Pending", date: "Today, 11:30 AM", note: "Order awaiting inventory confirmation." }
    ]
  },
  { 
    id: "#ORD-9927", customer: "Nusrat Jahan", location: "Rajshahi", courier: "Steadfast", trackingId: "SF-1122334", currentStatus: "Delivered", itemsCount: 2, lastUpdated: "Oct 24, 02:15 PM",
    history: [
      { status: "Pending", date: "Oct 22, 09:00 AM", note: "Order placed." },
      { status: "Processing", date: "Oct 22, 11:30 AM", note: "Packed." },
      { status: "Shipped", date: "Oct 23, 10:00 AM", note: "In transit." },
      { status: "Delivered", date: "Oct 24, 02:15 PM", note: "Successfully delivered to customer." }
    ]
  },
];

const STATUS_OPTIONS: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Returned"];

export default function EmployeeOrderStatusPage() {
  const [orders, setOrders] = useState<LogisticsOrder[]>(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<LogisticsOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for Modal
  const [newStatus, setNewStatus] = useState<OrderStatus>("Processing");
  const [trackingId, setTrackingId] = useState("");
  const [updateNote, setUpdateNote] = useState("");

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.trackingId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openUpdateModal = (order: LogisticsOrder) => {
    setSelectedOrder(order);
    setNewStatus(order.currentStatus);
    setTrackingId(order.trackingId);
    setUpdateNote("");
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      const newLog: TrackingLog = {
        status: newStatus,
        date: "Just now",
        note: updateNote || `Status updated to ${newStatus}.`
      };

      const updatedOrders = orders.map(o => {
        if (o.id === selectedOrder.id) {
          return {
            ...o,
            currentStatus: newStatus,
            trackingId: trackingId,
            lastUpdated: "Just now",
            history: [...o.history, newLog]
          };
        }
        return o;
      });

      setOrders(updatedOrders);
      setIsSubmitting(false);
      setSelectedOrder(null);
      toast.success(`Order ${selectedOrder.id} status updated to ${newStatus}!`);
    }, 1000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch(status) {
      case "Pending": return <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Clock size={12} /> Pending</span>;
      case "Processing": return <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Package size={12} /> Processing</span>;
      case "Shipped": return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Truck size={12} /> Shipped</span>;
      case "Delivered": return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><CheckCircle2 size={12} /> Delivered</span>;
      case "Returned": return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><RefreshCw size={12} /> Returned</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Order Status Update</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Manage logistics, couriers, and tracking timelines.</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Customer, or Tracking..." 
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
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Order & Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Logistics Info</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Current Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Last Updated</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    
                    <td className="px-8 py-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Package size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{order.id}</p>
                          <p className="text-[11px] font-bold text-slate-500 mt-1">{order.customer}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                          <Truck size={14} className="text-slate-400" /> {order.courier}
                        </p>
                        {order.trackingId ? (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-black tracking-widest">{order.trackingId}</span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1"><AlertCircle size={10} /> No Tracking ID</span>
                        )}
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      {getStatusBadge(order.currentStatus)}
                    </td>

                    <td className="px-8 py-5">
                      <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" /> {order.lastUpdated}
                      </p>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => openUpdateModal(order)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all inline-flex items-center gap-2 shadow-lg shadow-slate-900/10"
                      >
                        <RefreshCw size={14} /> Update
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <div className="inline-flex w-16 h-16 bg-slate-50 rounded-full items-center justify-center text-slate-300 mb-4">
                      <Search size={24} />
                    </div>
                    <p className="text-sm font-bold text-slate-500">No active orders found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isSubmitting && setSelectedOrder(null)}></div>
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left Side: Order Context & Timeline */}
            <div className="md:w-1/2 bg-slate-50 p-8 border-r border-slate-100 overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Order Timeline</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{selectedOrder.id}</p>
                </div>
                {getStatusBadge(selectedOrder.currentStatus)}
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-8 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</span>
                  <span className="text-sm font-bold text-slate-700">{selectedOrder.customer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</span>
                  <span className="text-sm font-bold text-slate-700 flex items-center gap-1"><MapPin size={12} className="text-primary"/> {selectedOrder.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Courier</span>
                  <span className="text-sm font-bold text-slate-700">{selectedOrder.courier}</span>
                </div>
              </div>

              <div className="relative pl-4 space-y-6">
                {/* Timeline vertical line */}
                <div className="absolute top-2 bottom-2 left-[21px] w-0.5 bg-slate-200"></div>
                
                {selectedOrder.history.map((log, index) => (
                  <div key={index} className="relative flex items-start gap-4 z-10">
                    <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-slate-50 mt-1 shrink-0"></div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">{log.status}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5 mb-1 flex items-center gap-1"><Clock size={10} /> {log.date}</p>
                      <p className="text-xs font-medium text-slate-600 bg-white p-2 rounded-lg border border-slate-100">{log.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Update Form */}
            <div className="md:w-1/2 p-8 overflow-y-auto custom-scrollbar bg-white flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <RefreshCw size={20} className="text-primary" /> Log New Update
                </h3>
                <button 
                  onClick={() => !isSubmitting && setSelectedOrder(null)}
                  className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateStatus} className="flex-1 flex flex-col space-y-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Order Status *</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tracking ID (If applicable)</label>
                  <div className="relative">
                    <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={trackingId}
                      onChange={e => setTrackingId(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all" 
                      placeholder="e.g. SF-12345678" 
                    />
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Note / Comment</label>
                  <textarea 
                    rows={4} 
                    value={updateNote}
                    onChange={e => setUpdateNote(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all resize-none h-full" 
                    placeholder="Briefly describe the status update..." 
                  />
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Save size={18} /> Confirm Update
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
