"use client";

import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Navigation, 
  Truck, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Phone
} from "lucide-react";

interface Vehicle {
  id: string;
  driver: string;
  phone: string;
  status: "In Transit" | "Delivering" | "Delayed" | "Completed";
  currentLocation: string;
  destination: string;
  eta: string;
  progress: number; // 0-100
}

const MOCK_VEHICLES: Vehicle[] = [
  { id: "VAN-001", driver: "Kashem Ali", phone: "01711-223344", status: "In Transit", currentLocation: "Mirpur 10", destination: "Uttara Sector 7", eta: "45 mins", progress: 65 },
  { id: "VAN-002", driver: "Rafiqul Islam", phone: "01822-334455", status: "Delivering", currentLocation: "Gulshan 1", destination: "Banani Supermarket", eta: "10 mins", progress: 90 },
  { id: "MOTO-04", driver: "Hasan Tariq", phone: "01933-445566", status: "Delayed", currentLocation: "Mohakhali Flyover (Traffic)", destination: "Badda Link Road", eta: "1 hr 20 mins", progress: 30 },
  { id: "VAN-003", driver: "Shafiq Ahmed", phone: "01644-556677", status: "Completed", currentLocation: "Warehouse Hub", destination: "Warehouse Hub", eta: "-", progress: 100 },
];

export default function EmployeeShipmentTrackingPage() {
  const [vehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(MOCK_VEHICLES[0]);

  const filteredVehicles = vehicles.filter(v => 
    v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Vehicle['status']) => {
    switch(status) {
      case "In Transit": return "text-blue-500 bg-blue-50 border-blue-200";
      case "Delivering": return "text-emerald-500 bg-emerald-50 border-emerald-200";
      case "Delayed": return "text-red-500 bg-red-50 border-red-200";
      case "Completed": return "text-slate-500 bg-slate-100 border-slate-200";
    }
  };

  const getStatusIcon = (status: Vehicle['status']) => {
    switch(status) {
      case "In Transit": return <Truck size={14} />;
      case "Delivering": return <Navigation size={14} />;
      case "Delayed": return <AlertCircle size={14} />;
      case "Completed": return <CheckCircle2 size={14} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 h-[calc(100vh-120px)] flex flex-col">
      
      {/* Header */}
      <div className="shrink-0">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Live Fleet Tracking</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Monitor real-time delivery vehicle locations and ETA.</p>
      </div>

      <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col lg:flex-row min-h-0">
        
        {/* Left Panel: Vehicle List */}
        <div className="w-full lg:w-96 border-r border-slate-100 flex flex-col shrink-0 bg-slate-50/50">
          <div className="p-6 border-b border-slate-100 shrink-0">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search fleet, driver, destination..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            {filteredVehicles.map(vehicle => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  selectedVehicle?.id === vehicle.id 
                    ? "bg-white border-primary shadow-md shadow-primary/5 ring-4 ring-primary/5" 
                    : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5"><Truck size={12}/> {vehicle.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1 border ${getStatusColor(vehicle.status)}`}>
                    {getStatusIcon(vehicle.status)} {vehicle.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">{vehicle.driver}</h4>
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${vehicle.status === 'Delayed' ? 'bg-red-500' : vehicle.status === 'Completed' ? 'bg-slate-400' : 'bg-primary'}`} 
                    style={{ width: `${vehicle.progress}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel: Simulated Map View */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
          
          {/* Simulated Map Background Overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)`,
            backgroundSize: `24px 24px`
          }}></div>

          <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
             {/* Map Graphic Simulation */}
             <div className="w-full max-w-2xl h-96 border-2 border-dashed border-slate-300 rounded-[40px] relative">
               
               {selectedVehicle && selectedVehicle.status !== "Completed" && (
                 <>
                   {/* Start Point */}
                   <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-slate-800 rounded-full flex items-center justify-center shadow-lg -translate-x-1/2 -translate-y-1/2 z-10">
                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     <span className="absolute top-full mt-2 text-[10px] font-black text-slate-800 bg-white px-2 py-1 rounded shadow-sm w-max uppercase tracking-widest">Warehouse</span>
                   </div>
                   
                   {/* Destination Point */}
                   <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse">
                     <MapPin size={12} className="text-white" />
                     <span className="absolute top-full mt-2 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded shadow-sm w-max uppercase tracking-widest">{selectedVehicle.destination}</span>
                   </div>

                   {/* Path Line */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
                     <path 
                       d="M 25% 25% C 40% 25%, 60% 75%, 75% 75%" 
                       fill="none" 
                       stroke="#cbd5e1" 
                       strokeWidth="4" 
                       strokeDasharray="8 8"
                     />
                   </svg>

                   {/* Active Vehicle Marker on Path (Simulated based on progress) */}
                   <div 
                     className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30 z-20 transition-all duration-1000 -translate-x-1/2 -translate-y-1/2"
                     style={{ 
                       // Rough simulation of moving along the curve based on progress
                       left: `${25 + (50 * (selectedVehicle.progress / 100))}%`, 
                       top: `${25 + (50 * (selectedVehicle.progress / 100))}%` 
                     }}
                   >
                     <Navigation size={14} className="text-white" />
                     <span className="absolute bottom-full mb-2 text-[10px] font-black text-white bg-slate-900 px-2 py-1 rounded shadow-lg w-max uppercase tracking-widest">{selectedVehicle.id}</span>
                   </div>
                 </>
               )}

               {selectedVehicle?.status === "Completed" && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                    <CheckCircle2 size={48} className="mb-4 text-emerald-500 opacity-50" />
                    <p className="font-bold text-sm">Vehicle has returned to base.</p>
                 </div>
               )}

             </div>
          </div>

          {/* Floating Details Card */}
          {selectedVehicle && (
            <div className="mt-auto m-6 relative z-30">
              <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <Truck size={20} className="text-primary"/> {selectedVehicle.id}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-bold text-slate-600">{selectedVehicle.driver}</span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Phone size={12}/> {selectedVehicle.phone}</span>
                  </div>
                </div>

                <div className="flex gap-6 text-right">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Location</p>
                    <p className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1"><MapPin size={14} className="text-slate-400"/> {selectedVehicle.currentLocation}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Time</p>
                    <p className={`text-xl font-black ${selectedVehicle.status === 'Delayed' ? 'text-red-500' : 'text-primary'} flex items-center justify-end gap-1`}>
                      <Clock size={16} /> {selectedVehicle.eta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
