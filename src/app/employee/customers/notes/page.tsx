"use client";

import React, { useState } from "react";
import { 
  Search, 
  User, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShoppingBag, 
  Clock, 
  Plus,
  Send,
  CalendarDays
} from "lucide-react";
import { toast } from "react-toastify";

interface CustomerLog {
  id: string;
  type: "Call" | "Email" | "Order" | "Support";
  date: string;
  summary: string;
  employee: string;
}

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  lifetimeValue: string;
  joined: string;
  logs: CustomerLog[];
}

const MOCK_CUSTOMERS: CustomerProfile[] = [
  {
    id: "CUST-001",
    name: "Arif Hossain",
    email: "arif@example.com",
    phone: "+880 1711-223344",
    totalOrders: 12,
    lifetimeValue: "৳ 45,000",
    joined: "Jan 12, 2023",
    logs: [
      { id: "L1", type: "Call", date: "Today, 10:30 AM", summary: "Called to ask about pre-ordering the new Robotics Kit. Informed them it will be available next week.", employee: "Admin" },
      { id: "L2", type: "Order", date: "Oct 20, 2023", summary: "Placed Order #ORD-9844 for Beginner Electronics Set.", employee: "System" },
      { id: "L3", type: "Support", date: "Oct 15, 2023", summary: "Ticket TCK-8722: Issue with delivery address resolved.", employee: "Admin" }
    ]
  },
  {
    id: "CUST-002",
    name: "Sabrina Rahman",
    email: "sabrina@example.com",
    phone: "+880 1822-334455",
    totalOrders: 4,
    lifetimeValue: "৳ 12,500",
    joined: "Mar 05, 2023",
    logs: [
      { id: "L1", type: "Email", date: "Yesterday, 02:15 PM", summary: "Emailed asking for assembly instructions for Solar Car. Sent PDF guide.", employee: "Admin" },
      { id: "L2", type: "Order", date: "Oct 22, 2023", summary: "Placed Order #ORD-9811 for Solar Powered Car Model.", employee: "System" }
    ]
  }
];

export default function EmployeeCustomerNotesPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>(MOCK_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(MOCK_CUSTOMERS[0]);
  
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState<"Call" | "Email" | "Support">("Call");

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLogIcon = (type: string) => {
    switch(type) {
      case "Call": return <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><Phone size={14} /></div>;
      case "Email": return <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><Mail size={14} /></div>;
      case "Order": return <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><ShoppingBag size={14} /></div>;
      case "Support": return <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0"><MessageCircle size={14} /></div>;
      default: return <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><User size={14} /></div>;
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedCustomer) return;

    const log: CustomerLog = {
      id: `L${Date.now()}`,
      type: noteType,
      date: "Just now",
      summary: newNote,
      employee: "Admin (You)"
    };

    const updatedCustomers = customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return { ...c, logs: [log, ...c.logs] };
      }
      return c;
    });

    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomers.find(c => c.id === selectedCustomer.id) || null);
    setNewNote("");
    toast.success("Note added successfully.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 h-[calc(100vh-120px)] flex flex-col">
      
      {/* Header */}
      <div className="shrink-0">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Customer CRM & Notes</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Track interactions, logs, and internal notes for customers.</p>
      </div>

      {/* Main Container */}
      <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-0">
        
        {/* Left Sidebar: Customer Directory */}
        <div className="w-full md:w-80 border-r border-slate-100 flex flex-col shrink-0 bg-slate-50/50">
          <div className="p-6 border-b border-slate-100 shrink-0">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            {filteredCustomers.map(customer => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  selectedCustomer?.id === customer.id 
                    ? "bg-white border-primary shadow-md shadow-primary/5 ring-4 ring-primary/5" 
                    : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-none">{customer.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{customer.phone}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content: Customer Profile & Notes */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30">
          {selectedCustomer ? (
            <>
              {/* Profile Header */}
              <div className="p-8 border-b border-slate-100 bg-white shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-primary/20">
                      {selectedCustomer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{selectedCustomer.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {selectedCustomer.email}</span>
                        <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-400" /> {selectedCustomer.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex gap-6 text-right">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lifetime Value</p>
                      <p className="text-lg font-black text-emerald-600">{selectedCustomer.lifetimeValue}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Orders</p>
                      <p className="text-lg font-black text-slate-800">{selectedCustomer.totalOrders}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CRM Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-10 flex flex-col lg:flex-row gap-8">
                
                {/* Interaction Timeline */}
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Clock size={16} className="text-primary" /> Interaction History
                  </h4>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {selectedCustomer.logs.map((log, i) => (
                      <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-50 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          {getLogIcon(log.type)}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.type}</span>
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><CalendarDays size={12}/> {log.date}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed mb-3">{log.summary}</p>
                          <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Logged by</span>
                            <span className="text-[10px] font-bold text-slate-600">{log.employee}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Note Form */}
                <div className="lg:w-80 shrink-0">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-0">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Plus size={14} className="text-primary" /> Add New Log
                    </h4>
                    <form onSubmit={handleAddNote} className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Interaction Type</label>
                        <select 
                          value={noteType}
                          onChange={(e) => setNoteType(e.target.value as any)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 outline-none appearance-none"
                        >
                          <option value="Call">Phone Call</option>
                          <option value="Email">Email</option>
                          <option value="Support">Support Interaction</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Log Summary</label>
                        <textarea 
                          required
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          rows={4}
                          placeholder="What was discussed?"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 focus:ring-4 focus:ring-primary/5 outline-none resize-none custom-scrollbar"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                      >
                        <Send size={14} /> Save Log
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <User size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-bold">Select a customer to view CRM profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
