"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Building2, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  PackageSearch,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  User
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  category: string;
  rating: number;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  activeOrders: number;
  onTimeDelivery: string;
  defectRate: string;
}

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "SUP-001",
    name: "TechTron Electronics Ltd.",
    category: "Electronics Components",
    rating: 4.8,
    contactPerson: "Rahim Ali",
    phone: "+880 1711-001122",
    email: "sales@techtron.bd",
    address: "Mirpur 10, Dhaka",
    activeOrders: 3,
    onTimeDelivery: "98%",
    defectRate: "1.2%"
  },
  {
    id: "SUP-002",
    name: "Future Robotics Supply",
    category: "Robotics Kits",
    rating: 4.9,
    contactPerson: "Sadia Islam",
    phone: "+880 1822-112233",
    email: "contact@futurerobotics.bd",
    address: "Agrabad, Chittagong",
    activeOrders: 1,
    onTimeDelivery: "100%",
    defectRate: "0.5%"
  },
  {
    id: "SUP-003",
    name: "EduPlastics BD",
    category: "Plastic Enclosures",
    rating: 3.5,
    contactPerson: "Karim Uddin",
    phone: "+880 1933-223344",
    email: "info@eduplastics.bd",
    address: "Tongi Industrial Area",
    activeOrders: 0,
    onTimeDelivery: "85%",
    defectRate: "4.5%"
  }
];

export default function EmployeeSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Suppliers Directory</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Manage vendor relationships and track performance.</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Left Side: Supplier List */}
        <div className="w-full xl:w-1/2 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="relative w-full">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search suppliers by name or category..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
                />
              </div>
            </div>

            <div className="p-4 space-y-3">
              {filteredSuppliers.map(supplier => (
                <button
                  key={supplier.id}
                  onClick={() => setSelectedSupplier(supplier)}
                  className={`w-full text-left p-6 rounded-3xl transition-all border ${
                    selectedSupplier?.id === supplier.id 
                      ? "bg-primary/5 border-primary shadow-md shadow-primary/5" 
                      : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        selectedSupplier?.id === supplier.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-400"
                      }`}>
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-800 tracking-tight">{supplier.name}</h4>
                        <p className="text-[11px] font-bold text-slate-500 mt-1">{supplier.category}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                        <Star size={12} className="fill-current" /> {supplier.rating}
                      </span>
                      {supplier.activeOrders > 0 && (
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                          {supplier.activeOrders} Active POs
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Supplier Details (Scorecard) */}
        <div className="w-full xl:w-1/2 sticky top-28">
          {selectedSupplier ? (
            <div className="bg-slate-900 text-white rounded-[40px] shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="p-10 relative z-10 border-b border-slate-800">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{selectedSupplier.name}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-2">{selectedSupplier.id} • {selectedSupplier.category}</p>
                  </div>
                  <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Building2 size={28} className="text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                      <User size={16} className="text-slate-400" /> {selectedSupplier.contactPerson}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                      <Phone size={16} className="text-slate-400" /> {selectedSupplier.phone}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                      <Mail size={16} className="text-slate-400" /> {selectedSupplier.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                      <MapPin size={16} className="text-slate-400" /> {selectedSupplier.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 relative z-10 bg-slate-800/50">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" /> Vendor Scorecard
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2"><CheckCircle2 size={12}/> On-Time Delivery</span>
                    <span className={`text-2xl font-black ${parseFloat(selectedSupplier.onTimeDelivery) > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{selectedSupplier.onTimeDelivery}</span>
                  </div>
                  <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2"><AlertCircle size={12}/> Defect Rate</span>
                    <span className={`text-2xl font-black ${parseFloat(selectedSupplier.defectRate) < 2 ? 'text-emerald-400' : 'text-red-400'}`}>{selectedSupplier.defectRate}</span>
                  </div>
                  <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2"><PackageSearch size={12}/> Active POs</span>
                    <span className="text-2xl font-black text-white">{selectedSupplier.activeOrders}</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-700 flex gap-4">
                  <button className="flex-1 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-100 transition-all text-center">
                    View Purchase History
                  </button>
                  <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all text-center shadow-lg shadow-primary/20">
                    Create New PO
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 h-[600px] flex flex-col items-center justify-center text-slate-400 p-10 text-center">
              <Building2 size={48} className="mb-4 opacity-20" />
              <h3 className="text-lg font-black text-slate-600 tracking-tight">Select a Supplier</h3>
              <p className="text-sm font-medium mt-2">Click on any supplier from the list to view their full scorecard, contact details, and performance metrics.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
