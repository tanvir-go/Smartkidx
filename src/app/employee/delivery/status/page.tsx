"use client";

import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Phone,
  AlertCircle,
  Truck,
  RotateCcw,
  User,
  CalendarDays,
  X,
  XCircle
} from "lucide-react";
import { toast } from "react-toastify";

type DeliveryStatus = "Out for Delivery" | "Attempted" | "Rescheduled" | "Delivered" | "Failed";

interface DeliveryOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  driverId: string;
  status: DeliveryStatus;
  attempts: number;
  lastUpdated: string;
  notes: string;
}

const MOCK_DELIVERIES: DeliveryOrder[] = [
  { id: "ORD-9930", customerName: "Arif Hossain", phone: "01711-223344", address: "House 12, Road 5, Block C, Banani, Dhaka", driverId: "VAN-001", status: "Out for Delivery", attempts: 0, lastUpdated: "Today, 09:00 AM", notes: "Please call upon arrival." },
  { id: "ORD-9844", customerName: "Sabrina Rahman", phone: "01822-334455", address: "Apt 4B, Green Tower, Gulshan 1, Dhaka", driverId: "VAN-002", status: "Attempted", attempts: 1, lastUpdated: "Today, 01:30 PM", notes: "Customer was not home. Gate guard refused package." },
  { id: "ORD-9801", customerName: "Kamrul Islam", phone: "01933-445566", address: "Zindabazar, Sylhet", driverId: "3RD-PARTY", status: "Rescheduled", attempts: 1, lastUpdated: "Yesterday, 04:00 PM", notes: "Customer requested delivery on weekend." },
  { id: "ORD-9755", customerName: "Nusrat Jahan", phone: "01644-556677", address: "Shaheb Bazar, Rajshahi", driverId: "3RD-PARTY", status: "Delivered", attempts: 1, lastUpdated: "Oct 22, 02:15 PM", notes: "Left at front desk." },
];

export default function EmployeeDeliveryStatusPage() {
  const [deliveries, setDeliveries] = useState<DeliveryOrder[]>(MOCK_DELIVERIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOrder | null>(null);

  // Update Form State
  const [newStatus, setNewStatus] = useState<DeliveryStatus>("Out for Delivery");
  const [updateNote, setUpdateNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredDeliveries = deliveries.filter(d => 
    d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.driverId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openUpdateModal = (delivery: DeliveryOrder) => {
    setSelectedDelivery(delivery);
    setNewStatus(delivery.status);
    setUpdateNote("");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDelivery) return;

    setIsUpdating(true);

    setTimeout(() => {
      setDeliveries(deliveries.map(d => {
        if (d.id === selectedDelivery.id) {
          return {
            ...d,
            status: newStatus,
            attempts: newStatus === "Attempted" ? d.attempts + 1 : d.attempts,
            lastUpdated: "Just now",
            notes: updateNote || d.notes
          };
        }
        return d;
      }));

      toast.success(`Delivery status updated to ${newStatus}`);
      setIsUpdating(false);
      setSelectedDelivery(null);
    }, 1000);
  };

  const getStatusBadge = (status: DeliveryStatus) => {
    switch(status) {
      case "Out for Delivery": return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><Truck size={12} /> Out for Delivery</span>;
      case "Attempted": return <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><AlertCircle size={12} /> Attempted</span>;
      case "Rescheduled": return <span className="px-3 py-1 bg-purple-50 text-purple-600 border border-purple-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><CalendarDays size={12} /> Rescheduled</span>;
      case "Delivered": return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><CheckCircle2 size={12} /> Delivered</span>;
      case "Failed": return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-max"><XCircle size={12} /> Failed</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Last-Mile Delivery Status</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Manage final delivery attempts and driver updates.</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Driver (e.g. VAN-001)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
            />
          </div>
        </div>

        {/* Data Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-slate-50/30">
          {filteredDeliveries.map(delivery => (
            <div key={delivery.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-sm font-black text-slate-800 tracking-tight">{delivery.id}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5"><Truck size={12}/> Driver: {delivery.driverId}</p>
                </div>
                {getStatusBadge(delivery.status)}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <User size={14} className="text-slate-400" /> 
                  <span className="font-bold text-slate-800">{delivery.customerName}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <Phone size={14} className="text-slate-400" /> {delivery.phone}
                </div>
                <div className="flex items-start gap-3 text-sm font-medium text-slate-600">
                  <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" /> 
                  <span className="line-clamp-2">{delivery.address}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Notes</span>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock size={10}/> {delivery.lastUpdated}</span>
                </div>
                <p className="text-xs font-medium text-slate-600 italic">"{delivery.notes}"</p>
                {delivery.attempts > 0 && (
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-2 bg-amber-50 px-2 py-1 rounded w-max">
                    {delivery.attempts} Previous Attempt{delivery.attempts > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <button 
                onClick={() => openUpdateModal(delivery)}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
              >
                Update Status
              </button>
            </div>
          ))}

          {filteredDeliveries.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <Truck size={48} className="mx-auto text-slate-300 mb-4 opacity-50" />
              <p className="text-sm font-bold text-slate-500">No deliveries found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Update Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isUpdating && setSelectedDelivery(null)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
            
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <RotateCcw size={20} className="text-primary" /> Update Driver Status
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Order: {selectedDelivery.id}</p>
              </div>
              <button 
                onClick={() => !isUpdating && setSelectedDelivery(null)}
                className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <form onSubmit={handleUpdate} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Delivery Status *</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as DeliveryStatus)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Attempted">Attempted (Customer Unavailable)</option>
                    <option value="Rescheduled">Rescheduled</option>
                    <option value="Delivered">Successfully Delivered</option>
                    <option value="Failed">Failed / Returned to Base</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Driver Notes / Reason</label>
                  <textarea 
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    rows={4}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all resize-none"
                    placeholder="Enter reason for failure, rescheduling details, or safe drop location..."
                  />
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <button 
                    type="submit" 
                    disabled={isUpdating}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                  >
                    {isUpdating ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Confirm Status Update"
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
