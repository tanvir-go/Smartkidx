"use client";

import React, { useState } from "react";
import { 
  Search, 
  PackageSearch,
  CheckCircle2,
  AlertCircle,
  Box,
  QrCode,
  ArrowRight,
  ShieldCheck,
  X
} from "lucide-react";
import { toast } from "react-toastify";

interface PackItem {
  id: string;
  name: string;
  qty: number;
  packed: boolean;
}

interface PackOrder {
  id: string;
  customerName: string;
  items: PackItem[];
  priority: "High" | "Normal";
  status: "Pending" | "Packing" | "Ready";
  date: string;
  suggestedBox: "Small Mailer" | "Medium Box" | "Large Carton";
}

const MOCK_QUEUE: PackOrder[] = [
  {
    id: "ORD-9950",
    customerName: "Arif Hossain",
    priority: "High",
    status: "Pending",
    date: "10 mins ago",
    suggestedBox: "Medium Box",
    items: [
      { id: "P1", name: "Advanced Robotics Kit V2", qty: 1, packed: false },
      { id: "P2", name: "Extra Servo Motor", qty: 2, packed: false }
    ]
  },
  {
    id: "ORD-9949",
    customerName: "Sabrina Rahman",
    priority: "Normal",
    status: "Pending",
    date: "25 mins ago",
    suggestedBox: "Small Mailer",
    items: [
      { id: "P3", name: "Beginner Electronics Set", qty: 1, packed: false }
    ]
  },
  {
    id: "ORD-9948",
    customerName: "Kamrul Islam",
    priority: "High",
    status: "Packing",
    date: "1 hour ago",
    suggestedBox: "Large Carton",
    items: [
      { id: "P4", name: "Solar Powered Car Model", qty: 5, packed: true },
      { id: "P5", name: "Chemistry Lab Starter Kit", qty: 2, packed: false }
    ]
  }
];

export default function EmployeePackagingQueuePage() {
  const [queue, setQueue] = useState<PackOrder[]>(MOCK_QUEUE);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOrder, setActiveOrder] = useState<PackOrder | null>(null);

  const pendingOrders = queue.filter(q => q.status !== "Ready" && (
    q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  const readyCount = queue.filter(q => q.status === "Ready").length;

  const startPacking = (order: PackOrder) => {
    setActiveOrder(order);
    if (order.status === "Pending") {
      setQueue(queue.map(q => q.id === order.id ? { ...q, status: "Packing" } : q));
    }
  };

  const toggleItemPacked = (itemId: string) => {
    if (!activeOrder) return;
    setActiveOrder({
      ...activeOrder,
      items: activeOrder.items.map(i => i.id === itemId ? { ...i, packed: !i.packed } : i)
    });
  };

  const finalizePacking = () => {
    if (!activeOrder) return;
    
    const allPacked = activeOrder.items.every(i => i.packed);
    if (!allPacked) {
      toast.error("Please pack all items before finalizing!");
      return;
    }

    setQueue(queue.map(q => q.id === activeOrder.id ? { ...q, status: "Ready" } : q));
    toast.success(`Order ${activeOrder.id} is packed and ready for dispatch!`);
    setActiveOrder(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 h-[calc(100vh-120px)] flex flex-col">
      
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Packaging Queue</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Warehouse fulfillment and packing verification.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">{readyCount} Orders Ready for Dispatch</span>
        </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        
        {/* Left Side: Queue */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden shrink-0">
          <div className="p-6 border-b border-slate-100 shrink-0 bg-slate-50/50">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Scan or search Order ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 bg-slate-50/30">
            {pendingOrders.map(order => (
              <div key={order.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-black text-slate-800 tracking-tight">{order.id}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{order.customerName}</p>
                  </div>
                  {order.priority === "High" && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[9px] font-black uppercase tracking-widest">Urgent</span>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <PackageSearch size={14} className="text-slate-400" /> {order.items.length} Items
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Box size={14} className="text-slate-400" /> {order.suggestedBox}
                  </div>
                </div>

                <button 
                  onClick={() => startPacking(order)}
                  className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${
                    order.status === 'Packing' 
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10'
                  }`}
                >
                  {order.status === 'Packing' ? 'Resume Packing' : 'Start Packing'} <ArrowRight size={14} />
                </button>
              </div>
            ))}

            {pendingOrders.length === 0 && (
              <div className="py-20 text-center">
                <CheckCircle2 size={48} className="mx-auto text-emerald-300 mb-4 opacity-50" />
                <p className="text-sm font-bold text-slate-500">Queue is clear! All orders packed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Packing Station */}
        <div className="hidden lg:flex flex-1 flex-col bg-slate-900 rounded-[40px] shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          {activeOrder ? (
            <>
              <div className="p-8 md:p-10 border-b border-slate-800 shrink-0 flex justify-between items-center relative z-10">
                <div>
                  <h3 className="text-3xl font-black tracking-tight mb-2">Packing: {activeOrder.id}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">Customer: {activeOrder.customerName}</span>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20 flex items-center gap-1.5"><Box size={14}/> Use: {activeOrder.suggestedBox}</span>
                  </div>
                </div>
                <button onClick={() => setActiveOrder(null)} className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-md">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10 space-y-4 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Item Verification Checklist</span>
                  <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-lg">
                    <QrCode size={14} /> Scan Barcodes to Verify
                  </span>
                </div>

                {activeOrder.items.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleItemPacked(item.id)}
                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                      item.packed 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-slate-800/50 border-slate-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.packed ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-500 group-hover:border-primary'
                      }`}>
                        {item.packed && <CheckCircle2 size={16} />}
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold transition-colors ${item.packed ? 'text-emerald-50' : 'text-slate-200'}`}>{item.name}</h4>
                        <p className={`text-xs font-bold mt-1 ${item.packed ? 'text-emerald-500' : 'text-slate-500'}`}>SKU: {item.id}</p>
                      </div>
                    </div>
                    <span className={`text-2xl font-black ${item.packed ? 'text-emerald-400' : 'text-white'}`}>x{item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 md:p-10 border-t border-slate-800 shrink-0 bg-slate-900 relative z-10">
                <button 
                  onClick={finalizePacking}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl flex items-center justify-center gap-3 ${
                    activeOrder.items.every(i => i.packed)
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 size={20} /> Mark Order as Ready to Ship
                </button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-10 text-center">
              <Box size={64} className="mb-6 opacity-20" />
              <h3 className="text-2xl font-black text-slate-400 tracking-tight">Packing Station Idle</h3>
              <p className="text-sm font-medium mt-2 max-w-sm">Select an order from the queue on the left to begin packing and verification.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
