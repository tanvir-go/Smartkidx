"use client";

import React, { useState } from "react";
import { 
  UserCircle, Plus, Search, Filter, Mail, Phone, MoreHorizontal, X, User, Pencil, Save, 
  MapPin, ShieldCheck, Globe, CreditCard, FileText, Tags, Award, Building2, Upload, 
  MessageSquare, Layout, CheckCircle2, ChevronRight, Globe2, Briefcase, Languages, 
  Wallet, FileCheck, Users, Link2, Bell, Trash2, Download
} from "lucide-react";
import { exportToCSV } from "@/utils/export";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import DeleteModal from "@/components/vendor/DeleteModal";

const TABS = [
  { id: "basic", label: "Basic Info", icon: User },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "address", label: "Address", icon: MapPin },
  { id: "account", label: "Account", icon: ShieldCheck },
  { id: "business", label: "Business", icon: Building2 },
  { id: "preferences", label: "Preferences", icon: Layout },
  { id: "financial", label: "Financial", icon: CreditCard },
  { id: "documents", label: "Documents", icon: Upload },
  { id: "crm", label: "CRM & Notes", icon: Tags },
  { id: "marketing", label: "Marketing", icon: Award },
];

export default function EmployeeCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([
    { 
      id: "CUST-2024-1001", 
      name: "John Smith", 
      email: "john@example.com", 
      phone: "+880 1712-345678", 
      type: "VIP",
      orders: 12,
      status: "Active",
      points: 450,
      customerGroup: "Premium",
      city: "Dhaka"
    },
    { 
      id: "CUST-2024-1002", 
      name: "Alice Brown", 
      email: "alice@example.com", 
      phone: "+880 1812-345678", 
      type: "Wholesale",
      orders: 5,
      status: "Active",
      points: 120,
      customerGroup: "B2B",
      city: "Chittagong"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", name: "" });

  const generateId = () => `CUST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const initialFormState = {
    // 1. Basic Info
    name: "",
    customerId: "",
    profilePicture: "",
    customerType: "Regular",
    companyName: "",
    // 2. Contact
    email: "",
    phone: "",
    whatsapp: "",
    alternatePhone: "",
    website: "",
    // 3. Address
    billingCountry: "Bangladesh",
    billingState: "",
    billingCity: "",
    billingZip: "",
    billingFull: "",
    shippingSame: true,
    shippingCountry: "Bangladesh",
    shippingState: "",
    shippingCity: "",
    shippingFull: "",
    // 4. Account
    username: "",
    password: "",
    confirmPassword: "",
    accountStatus: "Active",
    verificationStatus: "Unverified",
    // 5. Business
    businessName: "",
    tradeLicense: "",
    vatTax: "",
    businessType: "",
    // 6. Preferences
    language: "English",
    currency: "BDT (৳)",
    commPreference: "Email",
    newsletter: true,
    // 7. Financial
    creditLimit: 0,
    customerGroup: "General",
    discountPercent: 0,
    paymentTerms: "Net 30",
    // 8. Documents (Mock)
    // 9. CRM
    internalNotes: "",
    tags: "",
    leadSource: "Direct",
    assignedRep: "Admin",
    // 10. Loyalty
    loyaltyPoints: 0,
    referralCode: "",
    membershipLevel: "Bronze",
    couponEligible: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (customer?: any) => {
    if (customer) {
      setEditingId(customer.id);
      setFormData({ ...initialFormState, ...customer, customerId: customer.id });
    } else {
      setEditingId(null);
      setFormData({ ...initialFormState, customerId: generateId() });
    }
    setActiveTab("basic");
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in the required basic fields");
      return;
    }
    
    if (editingId) {
      setCustomers((prev: any[]) => prev.map((c: any) => 
        c.id === editingId ? { ...c, ...formData, id: editingId, type: formData.customerType, status: formData.accountStatus, points: formData.loyaltyPoints } : c
      ));
      toast.success("Customer profile updated successfully!");
    } else {
      setCustomers((prev: any[]) => [
        { ...formData, id: formData.customerId, orders: 0, type: formData.customerType, status: formData.accountStatus, points: formData.loyaltyPoints },
        ...prev
      ]);
      toast.success("New customer registered successfully!");
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const confirmDelete = () => {
    setCustomers((prev: any[]) => prev.filter((c: any) => c.id !== deleteModal.id));
    toast.success(`${deleteModal.name} has been removed from your database.`);
    setDeleteModal({ isOpen: false, id: "", name: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const SectionTitle = ({ title, subtitle, icon: Icon }: any) => (
    <div className="mb-6 flex items-center gap-3">
      {Icon && <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><Icon size={20} /></div>}
      <div>
        <h4 className="text-lg font-black text-slate-800 tracking-tight uppercase">{title}</h4>
        {subtitle && <p className="text-slate-400 text-xs mt-1 font-medium">{subtitle}</p>}
      </div>
    </div>
  );

  const InputWrapper = ({ label, children, required, icon: Icon }: any) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
        {Icon && <Icon size={12} className="text-slate-400" />}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Customer List</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Manage complex profiles, loyalty and B2B relations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              customers, 
              ["ID", "Name", "Email", "Phone", "Type", "Orders", "Status", "Points", "Group", "City"], 
              "Employee_Customers_Export",
              (c) => [c.id, c.name, c.email, c.phone, c.type, c.orders, c.status, c.points, c.customerGroup, c.city]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-[24px] font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-slate-900 text-white px-8 py-4 rounded-[24px] font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3 group"
          >
            <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform">
              <Plus size={16} />
            </div> 
            Add New Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-inner">
            <Users size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Active</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{customers.length}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner">
            <Award size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loyalty Pool</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">8,450</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary shadow-inner">
            <Wallet size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Credit</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">৳ 45.8k</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-500 shadow-inner">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">92%</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
          <div className="relative max-w-md w-full">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by name, email or ID..." className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[28px] text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm">
              <Filter size={20} />
            </button>
            <div className="px-5 py-3 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-sm">
               <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Live Sync</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Customer Profiles</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Segment & Policy</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-center">Loyalty</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-3xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-slate-200 group-hover:scale-105 transition-transform duration-500">
                        {customer.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{customer.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{customer.id}</p>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5"><Mail size={12} className="text-slate-300" /> {customer.email}</span>
                           <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5"><Phone size={12} className="text-slate-300" /> {customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest w-fit ${
                        customer.type === "VIP" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                        customer.type === "Wholesale" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-slate-100 text-slate-600"
                      }`}>
                        {customer.type}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${customer.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{customer.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="inline-flex flex-col items-center">
                      <p className="text-sm font-black text-slate-800">{customer.points || 0}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Points</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(customer)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all shadow-sm border border-slate-100 hover:border-primary/20" 
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id, customer.name)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all shadow-sm border border-slate-100 hover:border-red-100" 
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })} 
        onConfirm={confirmDelete} 
        itemName={deleteModal.name} 
        itemType="Customer"
      />

      {/* Expanded Multi-Tab Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-6xl h-[90vh] rounded-[48px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col border border-white/20"
            >
              {/* Modal Header */}
              <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                    <UserCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
                      {editingId ? "Modify Infrastructure" : "Establish New Relation"}
                    </h3>
                    <p className="text-slate-400 text-xs font-medium mt-1">Configure deep-level data parameters across 10 management domains.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end px-6 border-r border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol ID</p>
                    <p className="text-sm font-black text-primary">{formData.customerId}</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-slate-100 rounded-3xl transition-colors group">
                    <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Nav */}
                <div className="w-72 border-r border-slate-100 bg-slate-50/30 p-6 space-y-1 overflow-y-auto shrink-0 custom-scrollbar">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3.5 px-5 py-4 rounded-[24px] transition-all group ${
                        activeTab === tab.id 
                          ? "bg-white text-primary shadow-xl shadow-slate-100 ring-1 ring-slate-100" 
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <tab.icon size={18} className={activeTab === tab.id ? "text-primary" : "text-slate-400 group-hover:text-slate-700 transition-colors"} />
                      <span className={`text-[11px] font-black uppercase tracking-widest ${activeTab === tab.id ? "text-slate-800" : ""}`}>{tab.label}</span>
                      {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white">
                  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12">
                    
                    {activeTab === "basic" && (
                      <div className="space-y-10">
                        <SectionTitle title="Basic Customer Information" icon={User} subtitle="Primary identification and customer categorization." />
                        <div className="grid grid-cols-2 gap-8">
                          <InputWrapper label="Customer Name" required icon={User}>
                            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Robert Fox" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Customer Type" icon={Layout}>
                            <select name="customerType" value={formData.customerType} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                              <option>Regular</option>
                              <option>Wholesale</option>
                              <option>VIP</option>
                              <option>Corporate</option>
                            </select>
                          </InputWrapper>
                          <InputWrapper label="Company Name (Optional)" icon={Building2}>
                            <input name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Meta Dynamics Ltd." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <div className="col-span-2 p-10 rounded-[32px] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center gap-4">
                             <Upload size={32} className="text-slate-300" />
                             <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Upload Profile Picture</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "contact" && (
                      <div className="space-y-10">
                        <SectionTitle title="Contact Information" icon={Phone} subtitle="Multi-channel communication data points." />
                        <div className="grid grid-cols-2 gap-8">
                          <InputWrapper label="Email Address" required icon={Mail}>
                            <input name="email" value={formData.email} onChange={handleInputChange} placeholder="contact@domain.com" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Phone Number" required icon={Phone}>
                            <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+880 1xxx..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="WhatsApp Number" icon={MessageSquare}>
                            <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Alternate Phone" icon={Phone}>
                            <input name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <div className="col-span-2">
                            <InputWrapper label="Official Website (Optional)" icon={Link2}>
                              <input name="website" value={formData.website} onChange={handleInputChange} placeholder="https://..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                            </InputWrapper>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "address" && (
                      <div className="space-y-12">
                        <div className="space-y-8">
                          <SectionTitle title="Address Information" icon={MapPin} />
                          <div className="grid grid-cols-2 gap-8">
                            <InputWrapper label="Country" required icon={Globe2}>
                              <input name="billingCountry" value={formData.billingCountry} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                            </InputWrapper>
                            <InputWrapper label="State / Division" icon={MapPin}>
                              <input name="billingState" value={formData.billingState} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                            </InputWrapper>
                            <InputWrapper label="City" icon={MapPin}>
                              <input name="billingCity" value={formData.billingCity} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                            </InputWrapper>
                            <InputWrapper label="Zip / Postal Code" icon={MapPin}>
                              <input name="billingZip" value={formData.billingZip} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                            </InputWrapper>
                            <div className="col-span-2">
                              <InputWrapper label="Full Billing Address" icon={MapPin}>
                                <textarea name="billingFull" value={formData.billingFull} onChange={handleInputChange} rows={3} className="w-full px-6 py-4 bg-slate-50 border-none rounded-[28px] text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none resize-none" />
                              </InputWrapper>
                            </div>
                          </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                          <div className="flex items-center justify-between mb-8">
                             <SectionTitle title="Shipping Address" icon={Truck} />
                             <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" name="shippingSame" checked={formData.shippingSame} onChange={handleInputChange} className="w-6 h-6 rounded-lg border-slate-200 text-primary focus:ring-primary transition-all" />
                                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest group-hover:text-primary transition-colors">Same as Billing Address</span>
                             </label>
                          </div>
                          
                          {!formData.shippingSame && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid grid-cols-2 gap-8 overflow-hidden">
                              <InputWrapper label="Shipping Country" icon={Globe2}>
                                <input name="shippingCountry" value={formData.shippingCountry} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                              </InputWrapper>
                              <InputWrapper label="Shipping City" icon={MapPin}>
                                <input name="shippingCity" value={formData.shippingCity} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                              </InputWrapper>
                              <div className="col-span-2">
                                <InputWrapper label="Full Shipping Address" icon={MapPin}>
                                  <textarea name="shippingFull" value={formData.shippingFull} onChange={handleInputChange} rows={3} className="w-full px-6 py-4 bg-slate-50 border-none rounded-[28px] text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none resize-none" />
                                </InputWrapper>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === "account" && (
                      <div className="space-y-10">
                        <SectionTitle title="Account Information" icon={ShieldCheck} subtitle="Control account access and validation status." />
                        <div className="grid grid-cols-2 gap-8">
                          <InputWrapper label="Username" icon={User}>
                            <input name="username" value={formData.username} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Account Status" icon={Layout}>
                            <select name="accountStatus" value={formData.accountStatus} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                              <option>Active</option>
                              <option>Inactive</option>
                              <option>Blocked</option>
                            </select>
                          </InputWrapper>
                          <InputWrapper label="Password" icon={Lock}>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Confirm Password" icon={Lock}>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                        </div>
                      </div>
                    )}

                    {activeTab === "business" && (
                      <div className="space-y-10">
                        <SectionTitle title="Business Information (Optional)" icon={Briefcase} subtitle="Commercial registration and tax compliance." />
                        <div className="grid grid-cols-2 gap-8">
                          <InputWrapper label="Business Name" icon={Building2}>
                            <input name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Business Type" icon={Layout}>
                            <input name="businessType" value={formData.businessType} onChange={handleInputChange} placeholder="e.g. Partnership" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Trade License Number" icon={FileCheck}>
                            <input name="tradeLicense" value={formData.tradeLicense} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="VAT / TAX Number" icon={FileText}>
                            <input name="vatTax" value={formData.vatTax} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                        </div>
                      </div>
                    )}

                    {activeTab === "preferences" && (
                      <div className="space-y-10">
                        <SectionTitle title="Customer Preferences" icon={Languages} subtitle="Personalized localization and communication triggers." />
                        <div className="grid grid-cols-2 gap-8">
                          <InputWrapper label="Preferred Language" icon={Globe}>
                            <select name="language" value={formData.language} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                              <option>English</option>
                              <option>Bengali</option>
                              <option>Spanish</option>
                            </select>
                          </InputWrapper>
                          <InputWrapper label="Preferred Currency" icon={Wallet}>
                            <select name="currency" value={formData.currency} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                              <option>BDT (৳)</option>
                              <option>USD ($)</option>
                              <option>EUR (€)</option>
                            </select>
                          </InputWrapper>
                          <InputWrapper label="Communication Preference" icon={Bell}>
                            <select name="commPreference" value={formData.commPreference} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                              <option>Email</option>
                              <option>SMS</option>
                              <option>WhatsApp</option>
                            </select>
                          </InputWrapper>
                          <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl self-end">
                             <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleInputChange} className="w-6 h-6 rounded-lg text-primary" />
                             <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">Newsletter Subscription</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "financial" && (
                      <div className="space-y-10">
                        <SectionTitle title="Financial Information" icon={CreditCard} subtitle="Financial risk assessment and payment terms." />
                        <div className="grid grid-cols-3 gap-6">
                          <InputWrapper label="Credit Limit" icon={Wallet}>
                            <input type="number" name="creditLimit" value={formData.creditLimit} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Discount Percentage" icon={Layout}>
                            <input type="number" name="discountPercent" value={formData.discountPercent} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Payment Terms" icon={FileText}>
                            <select name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                              <option>Due on Receipt</option>
                              <option>Net 15</option>
                              <option>Net 30</option>
                              <option>Net 60</option>
                            </select>
                          </InputWrapper>
                        </div>
                      </div>
                    )}

                    {activeTab === "documents" && (
                      <div className="space-y-10">
                        <SectionTitle title="Documents Upload" icon={Upload} subtitle="Upload and manage verification documents." />
                        <div className="grid grid-cols-2 gap-8">
                          {["NID / Passport", "Trade License", "Customer Agreement", "Other Documents"].map(doc => (
                            <div key={doc} className="p-10 rounded-[32px] bg-slate-50 border-2 border-dashed border-slate-200 hover:border-primary transition-all flex flex-col items-center gap-4 group cursor-pointer relative">
                              <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-300 group-hover:text-primary transition-colors">
                                <Upload size={24} />
                              </div>
                              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{doc}</p>
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "crm" && (
                      <div className="space-y-10">
                        <SectionTitle title="Notes & CRM Information" icon={Tags} subtitle="Internal notes and lead tracking systems." />
                        <div className="grid grid-cols-2 gap-8">
                          <InputWrapper label="Customer Tags" icon={Tags}>
                            <input name="tags" value={formData.tags} onChange={handleInputChange} placeholder="e.g. VIP, High Value" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Assigned Sales Representative" icon={Users}>
                            <select name="assignedRep" value={formData.assignedRep} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                              <option>Admin</option>
                              <option>Sales Team A</option>
                              <option>Key Account Manager</option>
                            </select>
                          </InputWrapper>
                          <div className="col-span-2">
                            <InputWrapper label="Internal Notes" icon={FileText}>
                              <textarea name="internalNotes" value={formData.internalNotes} onChange={handleInputChange} rows={5} className="w-full px-6 py-5 bg-slate-50 border-none rounded-[32px] text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none resize-none" />
                            </InputWrapper>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "marketing" && (
                      <div className="space-y-10">
                        <SectionTitle title="Loyalty & Marketing" icon={Award} subtitle="Membership levels and referral incentives." />
                        <div className="grid grid-cols-2 gap-8">
                          <InputWrapper label="Loyalty Points" icon={Award}>
                            <input type="number" name="loyaltyPoints" value={formData.loyaltyPoints} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Referral Code" icon={Link2}>
                            <input name="referralCode" value={formData.referralCode} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none" />
                          </InputWrapper>
                          <InputWrapper label="Membership Level" icon={Layout}>
                            <select name="membershipLevel" value={formData.membershipLevel} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                              <option>Bronze</option>
                              <option>Silver</option>
                              <option>Gold</option>
                              <option>Platinum</option>
                            </select>
                          </InputWrapper>
                          <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl self-end">
                             <input type="checkbox" name="couponEligible" checked={formData.couponEligible} onChange={handleInputChange} className="w-6 h-6 rounded-lg text-primary" />
                             <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">Coupon Eligibility</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </form>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />)}
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Security protocols enabled</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-10 py-4 bg-white border border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-50 transition-all">Discard</button>
                  <button onClick={handleSubmit} className="px-14 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-2">
                    {editingId ? <Save size={16} /> : <FileCheck size={16} />}
                    {editingId ? "Finalize Updates" : "Create New Profile"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Icons for the tabs
function Truck(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-2.035-2.544A1 1 0 0 0 17.138 10H14v8Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
}

function Lock(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
}
