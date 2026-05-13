"use client";

import React, { useState } from "react";
import { 
  Search, 
  Truck,
  Box,
  MapPin,
  CheckCircle2,
  FileText,
  Send,
  PackageSearch
} from "lucide-react";
import { toast } from "react-toastify";

interface DispatchOrder {
  id: string;
  customerName: string;
  address: string;
  city: string;
  weight: string;
  codAmount: number;
}

const MOCK_READY_ORDERS: DispatchOrder[] = [
  { id: "ORD-9948", customerName: "Kamrul Islam", address: "Zindabazar", city: "Sylhet", weight: "2.5 kg", codAmount: 4500 },
  { id: "ORD-9945", customerName: "Rafiq Ahmed", address: "Agrabad", city: "Chittagong", weight: "1.2 kg", codAmount: 0 },
  { id: "ORD-9942", customerName: "Nusrat Jahan", address: "Mirpur 10", city: "Dhaka", weight: "0.8 kg", codAmount: 1250 },
  { id: "ORD-9940", customerName: "Tariq Hasan", address: "Uttara Sector 7", city: "Dhaka", weight: "3.1 kg", codAmount: 8500 },
  { id: "ORD-9939", customerName: "Sabrina Rahman", address: "Gulshan 1", city: "Dhaka", weight: "0.5 kg", codAmount: 0 },
];

export default function EmployeeDispatchPage() {
  const [orders, setOrders] = useState<DispatchOrder[]>(MOCK_READY_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [selectedCourier, setSelectedCourier] = useState<string>("Pathao");
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOrderSelection = (id: string) => {
    const newSet = new Set(selectedOrders);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedOrders(newSet);
  };

  const selectAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      setSelectedOrders(newSet => {
         filteredOrders.forEach(o => newSet.delete(o.id));
         return new Set(newSet);
      });
    } else {
      setSelectedOrders(newSet => {
         filteredOrders.forEach(o => newSet.add(o.id));
         return new Set(newSet);
      });
    }
  };

  const handleGenerateManifest = () => {
    if (selectedOrders.size === 0) return;
    setIsGenerating(true);

    setTimeout(() => {
      // Remove dispatched orders
      setOrders(orders.filter(o => !selectedOrders.has(o.id)));
      setSelectedOrders(new Set());
      setIsGenerating(false);
      toast.success(`Manifest generated for ${selectedCourier}! Orders handed over.`);
    }, 1500);
  };

  const totalCod = Array.from(selectedOrders).reduce((sum, id) => {
    const order = orders.find(o => o.id === id);
    return sum + (order?.codAmount || 0);
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 h-[calc(100vh-120px)] flex flex-col">
      
      {/* Header */}
      <div className="shrink-0">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Dispatch & Manifests</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Assign packed orders to couriers and generate handover manifests.</p>
      </div>

      <div className="flex-1 flex flex-col xl:flex-row gap-8 min-h-0">
        
        {/* Left Side: Packed Orders List */}
        <div className="flex-1 flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-0">
          
          <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/30 shrink-0 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative w-full max-w-md">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by Order ID or City..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
              />
            </div>
            
            <button 
              onClick={selectAll}
              className="text-xs font-black text-primary hover:text-primary/80 uppercase tracking-widest px-4 py-2 bg-primary/5 rounded-xl transition-colors shrink-0"
            >
              {selectedOrders.size === filteredOrders.length && filteredOrders.length > 0 ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOrders.map(order => {
                const isSelected = selectedOrders.has(order.id);
                return (
                  <div 
                    key={order.id}
                    onClick={() => toggleOrderSelection(order.id)}
                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-primary/5 border-primary shadow-md' 
                        : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-primary border-primary text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle2 size={14} />}
                        </div>
                        <h4 className="text-sm font-black text-slate-800">{order.id}</h4>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                        <Box size={10}/> {order.weight}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600">{order.customerName}</p>
                      <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5"><MapPin size={12} className="text-slate-400"/> {order.address}, <span className="font-bold text-slate-700">{order.city}</span></p>
                      {order.codAmount > 0 ? (
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mt-2 bg-amber-50 px-2 py-1 rounded w-max">COD: ৳ {order.codAmount.toLocaleString()}</p>
                      ) : (
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-2 bg-emerald-50 px-2 py-1 rounded w-max">Prepaid</p>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredOrders.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <PackageSearch size={48} className="mx-auto text-slate-300 mb-4 opacity-50" />
                  <p className="text-sm font-bold text-slate-500">No packed orders ready for dispatch.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Manifest Generation Panel */}
        <div className="w-full xl:w-96 shrink-0 flex flex-col gap-6">
          
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Truck size={18} className="text-primary"/> Select Courier
            </h3>
            <div className="space-y-3">
              {["Pathao", "Steadfast", "RedX", "In-House Delivery"].map(courier => (
                <label key={courier} className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-colors ${selectedCourier === courier ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                  <span className="text-sm font-bold text-slate-700">{courier}</span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedCourier === courier ? 'border-primary' : 'border-slate-300'}`}>
                    {selectedCourier === courier && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <input type="radio" name="courier" value={courier} checked={selectedCourier === courier} onChange={(e) => setSelectedCourier(e.target.value)} className="hidden" />
                </label>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-[40px] shadow-2xl p-8 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Manifest Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-slate-300">Selected Orders</span>
                  <span className="text-2xl font-black text-white">{selectedOrders.size}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-slate-300">Courier Assigned</span>
                  <span className="text-sm font-bold text-primary">{selectedCourier}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Total COD Collectible</span>
                  <span className="text-lg font-black text-amber-400">৳ {totalCod.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerateManifest}
              disabled={selectedOrders.size === 0 || isGenerating}
              className={`relative z-10 w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2 shadow-xl ${
                selectedOrders.size > 0
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <FileText size={16} /> Generate Manifest
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
