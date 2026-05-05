"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle2,
  Home,
  Briefcase,
  Users,
  MoreVertical,
  Search,
  Building2,
  X,
  Phone,
  User
} from "lucide-react";
import { toast } from "react-toastify";

export default function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123 Green Road, Dhanmondi", city: "Dhaka", phone: "+880 1711-223344", isDefault: true, type: "Home" },
    { id: 2, label: "Office", address: "Level 4, BDBL Bhaban, Karwan Bazar", city: "Dhaka", phone: "+880 1822-334455", isDefault: false, type: "Work" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", address: "", city: "Dhaka", phone: "", type: "Home" });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.label || !newAddress.address) {
      toast.error("Please fill in required fields");
      return;
    }

    const id = addresses.length + 1;
    setAddresses([
      ...addresses,
      { ...newAddress, id, isDefault: false }
    ]);
    setIsModalOpen(false);
    setNewAddress({ label: "", address: "", city: "Dhaka", phone: "", type: "Home" });
    toast.success("New address saved to your profile!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight leading-none">My Addresses</h2>
          <p className="text-slate-500 text-sm mt-3 font-medium">Manage your shipping and billing locations for faster checkout.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3.5 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group w-fit"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  {addr.type === "Home" ? <Home size={20} /> : <Building2 size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-800 uppercase tracking-tight">{addr.label}</h3>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest">Default</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Delivery Address</p>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-slate-300 shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-slate-600 leading-relaxed">{addr.address}, {addr.city}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-slate-300 shrink-0" />
                <p className="text-sm font-black text-slate-500">{addr.phone}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex gap-3">
              <button className="flex-grow py-3 rounded-2xl bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Edit Details</button>
              {!addr.isDefault && (
                <button className="flex-grow py-3 rounded-2xl bg-white border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">Set as Default</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl border border-slate-100 p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-slate-800 uppercase tracking-tight leading-none">New Delivery Address</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Label</label>
                  <input 
                    type="text" 
                    required
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                    placeholder="e.g. Home, Office"
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                  <select 
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Address *</label>
                <textarea 
                  required
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  placeholder="Street address, apartment, suite, etc."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                  <select 
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Phone *</label>
                  <input 
                    type="text" 
                    required
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                    placeholder="+880"
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 mt-4"
              >
                Save Delivery Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
