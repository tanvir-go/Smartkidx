"use client";

import React, { useState } from "react";
import { 
  Truck, 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  Package, 
  FileText, 
  Settings2, 
  X, 
  Plus, 
  Info,
  Mail,
  Globe,
  Building2,
  BadgeCheck,
  Upload,
  Calendar,
  Layers,
  Briefcase,
  ShieldAlert,
  StickyNote,
  Smartphone,
  Zap,
  Map as MapIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const TABS = [
  { id: "basic", label: "Basic Info", icon: Info },
  { id: "contact", label: "Contact & Address", icon: MapPin },
  { id: "business", label: "Business & Banking", icon: CreditCard },
  { id: "supply", label: "Supply & Logistics", icon: Truck },
  { id: "docs", label: "Docs & Settings", icon: FileText },
];

export default function AddSupplierForm({ onClose, onSuccess, initialData }: { onClose: () => void; onSuccess?: (data: any) => void; initialData?: any }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialData || {
    // 1. Basic Info
    supplierName: "",
    companyName: "",
    supplierCode: "",
    supplierType: "Manufacturer",
    businessCategory: "",
    websiteUrl: "",
    // 2. Contact Info
    contactPerson: "",
    email: "",
    phone: "",
    whatsapp: "",
    alternatePhone: "",
    fax: "",
    // 3. Address Info
    country: "Bangladesh",
    state: "",
    city: "",
    zipCode: "",
    fullAddress: "",
    mapLocation: "",
    // 4. Business Info
    tradeLicense: "",
    vatNumber: "",
    registrationNumber: "",
    businessType: "Private Limited",
    yearsInBusiness: "",
    // 5. Banking
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    iban: "",
    paymentMethod: "Bank Transfer",
    mobileBanking: "",
    // 6. Product & Supply
    productCategories: "",
    mainProducts: "",
    supplyCapacity: "",
    moq: "",
    deliveryTime: "",
    warehouseLocation: "",
    // 7. Shipping & Logistics
    shippingMethod: "Surface",
    shippingRegions: "",
    courierPartner: "",
    returnHandling: "Replace",
    packagingDetails: "",
    // 8. Documents (Mocks)
    // 9. Settings
    status: "Pending",
    featured: false,
    priorityLevel: "Normal",
    creditLimit: "",
    commissionRate: "",
    // 10. Notes
    adminNotes: "",
    supplierRemarks: "",
    internalTags: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess?.(formData);
      toast.success(initialData ? "Supplier updated successfully!" : "Supplier registered successfully!");
      onClose();
    }, 1500);
  };

  const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-6">
      <h4 className="text-lg font-black text-slate-800 tracking-tight uppercase">{title}</h4>
      {subtitle && <p className="text-slate-400 text-xs mt-1 font-medium">{subtitle}</p>}
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
    <div className="flex flex-col h-[90vh] bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Truck size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Supplier Registration</h3>
            <p className="text-slate-400 text-xs font-medium">Add a new supply chain partner to your procurement network.</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-slate-100 bg-slate-50/50 p-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all group ${
                activeTab === tab.id 
                  ? "bg-white text-primary shadow-lg shadow-slate-100 ring-1 ring-slate-100" 
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "text-primary" : "text-slate-400 group-hover:text-slate-600"} />
              <span className={`text-[11px] font-black uppercase tracking-widest ${activeTab === tab.id ? "text-slate-800" : ""}`}>{tab.label}</span>
            </button>
          ))}

          <div className="mt-8 p-4 bg-primary/5 rounded-3xl border border-primary/10">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Registration Tip</p>
            <p className="text-[10px] text-slate-500 leading-relaxed">Ensure all business documents are valid and scanned clearly before uploading.</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "basic" && (
                <div className="space-y-10 max-w-4xl">
                  <SectionTitle title="Basic Supplier Information" subtitle="General identity and branding of the supplier." />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputWrapper label="Supplier Name" required icon={User}>
                      <input 
                        name="supplierName"
                        value={formData.supplierName}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe / Sales Manager"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </InputWrapper>
                    <InputWrapper label="Company Name" icon={Building2}>
                      <input 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Global Tech Solutions Ltd."
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </InputWrapper>
                    <InputWrapper label="Supplier Code / ID" icon={BadgeCheck}>
                      <input 
                        name="supplierCode"
                        value={formData.supplierCode}
                        onChange={handleInputChange}
                        placeholder="e.g. SUP-2024-001"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </InputWrapper>
                    <InputWrapper label="Supplier Type" icon={Layers}>
                      <select 
                        name="supplierType"
                        value={formData.supplierType}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                      >
                        <option>Manufacturer</option>
                        <option>Wholesaler</option>
                        <option>Distributor</option>
                        <option>Importer</option>
                      </select>
                    </InputWrapper>
                    <InputWrapper label="Website URL" icon={Globe}>
                      <input 
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.example.com"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </InputWrapper>
                    <InputWrapper label="Supplier Logo">
                      <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all cursor-pointer relative">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-300">
                          <Upload size={20} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase">Upload PNG/JPG</span>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </InputWrapper>
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Contact Information" subtitle="Direct contact details for communication." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputWrapper label="Contact Person Name" required icon={User}>
                        <input name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} placeholder="Full Name" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Email Address" required icon={Mail}>
                        <input name="email" value={formData.email} onChange={handleInputChange} placeholder="email@company.com" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Phone Number" required icon={Phone}>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+880 1..." className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="WhatsApp Number" icon={Smartphone}>
                        <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="+880 1..." className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Address Information" subtitle="Physical location and warehouse address." />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <InputWrapper label="Country" required icon={Globe}>
                        <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                          <option>Bangladesh</option>
                          <option>China</option>
                          <option>USA</option>
                          <option>India</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="City" icon={Building2}>
                        <input name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g. Dhaka" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Zip Code" icon={MapPin}>
                        <input name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="1230" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                    </div>
                    <div className="mt-8">
                      <InputWrapper label="Full Address" icon={MapPin}>
                        <textarea name="fullAddress" value={formData.fullAddress} onChange={handleInputChange} rows={3} placeholder="House, Road, Block, Area..." className="w-full px-5 py-4 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                      </InputWrapper>
                    </div>
                    <div className="mt-8">
                       <InputWrapper label="Google Map Location" icon={MapIcon}>
                         <input name="mapLocation" value={formData.mapLocation} onChange={handleInputChange} placeholder="Paste Map Link or Coordinates" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                       </InputWrapper>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "business" && (
                <div className="space-y-12 max-w-4xl">
                   <div>
                    <SectionTitle title="Business Information" subtitle="Legal and registration details." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputWrapper label="Trade License Number" icon={FileText}>
                        <input name="tradeLicense" value={formData.tradeLicense} onChange={handleInputChange} placeholder="TL-XXXXXX" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="VAT / TAX Number" icon={FileText}>
                        <input name="vatNumber" value={formData.vatNumber} onChange={handleInputChange} placeholder="BIN-XXXXXX" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Business Type">
                        <select name="businessType" value={formData.businessType} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                          <option>Private Limited</option>
                          <option>Partnership</option>
                          <option>Sole Proprietorship</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Years in Business" icon={Calendar}>
                        <input name="yearsInBusiness" type="number" value={formData.yearsInBusiness} onChange={handleInputChange} placeholder="e.g. 5" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Banking & Payment Information" subtitle="Financial details for transactions." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputWrapper label="Bank Name" icon={Building2}>
                        <input name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="e.g. City Bank" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Account Holder Name" icon={User}>
                        <input name="accountHolder" value={formData.accountHolder} onChange={handleInputChange} placeholder="Exact Name on Account" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Account Number" icon={CreditCard}>
                        <input name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="XXXXXXXXXXXX" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Mobile Banking Number" icon={Smartphone}>
                        <input name="mobileBanking" value={formData.mobileBanking} onChange={handleInputChange} placeholder="bKash / Nagad" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "supply" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Product & Supply Information" subtitle="Capability and catalog details." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputWrapper label="Main Products" icon={Package}>
                        <input name="mainProducts" value={formData.mainProducts} onChange={handleInputChange} placeholder="e.g. Motors, Sensors, Arduino" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Supply Capacity" icon={Zap}>
                        <input name="supplyCapacity" value={formData.supplyCapacity} onChange={handleInputChange} placeholder="e.g. 5000 units / month" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Minimum Order Quantity (MOQ)" icon={Briefcase}>
                        <input name="moq" value={formData.moq} onChange={handleInputChange} placeholder="e.g. 50 units" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Warehouse Location" icon={MapPin}>
                        <input name="warehouseLocation" value={formData.warehouseLocation} onChange={handleInputChange} placeholder="City / Area" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Shipping & Logistics" subtitle="Delivery and courier preferences." />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <InputWrapper label="Shipping Method" icon={Truck}>
                        <select name="shippingMethod" value={formData.shippingMethod} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                          <option>Surface</option>
                          <option>Air Freight</option>
                          <option>Sea Freight</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Return Handling" icon={ShieldAlert}>
                        <select name="returnHandling" value={formData.returnHandling} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                          <option>Replace</option>
                          <option>Refund</option>
                          <option>Repair</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Courier Partner" icon={Truck}>
                        <input name="courierPartner" value={formData.courierPartner} onChange={handleInputChange} placeholder="e.g. Pathao / RedX" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "docs" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Documents Upload" subtitle="Official scans for verification." />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {["Trade License", "NID / Passport", "Tax Certificate", "Bank Document", "Agreement PDF"].map((doc) => (
                        <div key={doc} className="p-6 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all flex flex-col items-center justify-center text-center gap-3 group relative">
                          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors shadow-sm">
                            <Upload size={20} />
                          </div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight leading-tight">{doc}</p>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Supplier Settings" subtitle="System controls and priority." />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                       <InputWrapper label="Status">
                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                          <option>Pending</option>
                          <option>Active</option>
                          <option>Suspended</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Priority">
                        <select name="priorityLevel" value={formData.priorityLevel} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                          <option>Normal</option>
                          <option>High</option>
                          <option>Low</option>
                        </select>
                      </InputWrapper>
                      <div className="col-span-2 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Featured Supplier</span>
                        <label className="relative inline-flex items-center cursor-pointer scale-75">
                          <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Notes & Internal Tags" icon={StickyNote} />
                    <div className="space-y-6">
                      <InputWrapper label="Internal Remarks">
                        <textarea name="adminNotes" value={formData.adminNotes} onChange={handleInputChange} rows={3} placeholder="Add any private notes about this supplier..." className="w-full px-5 py-4 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                      </InputWrapper>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                    <button onClick={onClose} className="px-8 py-4 bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
                    <button onClick={handleSubmit} className="px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">Register Supplier</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-white sticky bottom-0">
        <div className="flex items-center gap-3">
          {TABS.map((tab, idx) => (
            <div 
              key={tab.id}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                activeTab === tab.id ? "w-10 bg-primary" : idx < TABS.findIndex(t => t.id === activeTab) ? "bg-primary/40" : "bg-slate-100"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            disabled={activeTab === "basic"}
            onClick={() => setActiveTab(TABS[TABS.findIndex(t => t.id === activeTab) - 1].id)}
            className="px-6 py-3 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-800 disabled:opacity-0 transition-all"
          >
            Previous
          </button>
          {activeTab !== "docs" && (
            <button 
              onClick={() => setActiveTab(TABS[TABS.findIndex(t => t.id === activeTab) + 1].id)}
              className="px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 flex items-center gap-2 group"
            >
              Next Step <X size={14} className="rotate-[-135deg] group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
