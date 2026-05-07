"use client";

import React, { useState, useEffect } from "react";
import { 
  Layers, 
  Image as ImageIcon, 
  Globe, 
  Settings2, 
  Filter, 
  Send, 
  X, 
  Plus, 
  Trash2, 
  Zap, 
  Eye, 
  Save, 
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  LayoutGrid,
  BarChart3,
  Monitor,
  Smartphone,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const TABS = [
  { id: "basic", label: "Basic Info", icon: Info },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "seo", label: "SEO", icon: Globe },
  { id: "settings", label: "Settings", icon: Settings2 },
  { id: "filters", label: "Filters", icon: Filter },
  { id: "publish", label: "Publish", icon: Send },
];

export default function AddCategoryForm({ onClose, onSuccess, initialData }: { onClose: () => void; onSuccess?: (data: any) => void; initialData?: any }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialData || {
    // 1. Basic Info
    name: "",
    slug: "",
    parentCategory: "",
    shortDescription: "",
    fullDescription: "",
    // 2. Media
    thumbnail: null as File | null,
    banner: null as File | null,
    icon: null as File | null,
    mobileBanner: null as File | null,
    altText: "",
    // 3. SEO
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    seoUrl: "",
    canonicalUrl: "",
    // 4. Display
    status: "Active",
    featured: false,
    showOnHomepage: false,
    showInMenu: true,
    sortOrder: "0",
    // 5. Settings
    commissionRate: "",
    shippingType: "Flat Rate",
    taxClass: "Standard",
    returnPolicy: "",
    ageRestriction: "",
    // 6. Filters
    availableSizes: [] as string[],
    availableColors: [] as string[],
    brands: [] as string[],
    materials: [] as string[],
    priceRange: { min: "", max: "" },
    customAttributes: [] as { name: string, value: string }[],
    // 7. Vendor Controls
    allowVendorUpload: true,
    vendorApprovalRequired: true,
    maxProductLimit: "",
    // 8. Analytics
    categoryTags: "",
    trackingId: "",
    googleProductCategory: "",
  });

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name) {
      setFormData((prev: any) => ({
        ...prev,
        slug: prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  }, [formData.name]);

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
      toast.success(initialData ? "Category updated successfully!" : "Category created successfully!");
      onClose();
    }, 1500);
  };

  const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-slate-800 tracking-tight uppercase">{title}</h4>
      {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  const InputWrapper = ({ label, children, required }: any) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col h-[85vh] bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div>
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <Layers className="text-primary" /> New Category
          </h3>
          <p className="text-slate-400 text-xs font-medium">Define your catalog structure and filtering attributes.</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 border-r border-slate-100 bg-slate-50/50 p-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${
                activeTab === tab.id 
                  ? "bg-white text-primary shadow-sm ring-1 ring-slate-100" 
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "text-primary" : "text-slate-400 group-hover:text-slate-600"} />
              <span className={`text-xs font-black uppercase tracking-widest ${activeTab === tab.id ? "text-slate-800" : ""}`}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "basic" && (
                <div className="space-y-8 max-w-4xl">
                  <SectionTitle title="Basic Category Information" subtitle="Define the core identity of this category." />
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <InputWrapper label="Category Name" required>
                        <input 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. STEM Kits"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Category Slug (Auto)">
                        <input 
                          name="slug"
                          value={formData.slug}
                          readOnly
                          className="w-full px-5 py-3.5 bg-slate-100 border-none rounded-2xl text-sm font-bold text-slate-500 outline-none transition-all cursor-not-allowed"
                        />
                      </InputWrapper>
                    </div>

                    <InputWrapper label="Parent Category">
                      <select 
                        name="parentCategory"
                        value={formData.parentCategory}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                      >
                        <option value="">None (Top Level)</option>
                        <option>Electronics</option>
                        <option>Robotics</option>
                        <option>Toys</option>
                      </select>
                    </InputWrapper>

                    <InputWrapper label="Short Description">
                      <textarea 
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Brief summary for menu tooltips..."
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      />
                    </InputWrapper>

                    <InputWrapper label="Full Description">
                      <textarea 
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Detailed description for the category page header..."
                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </InputWrapper>
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Media & Visuals" subtitle="Visual assets for different display locations." />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      <InputWrapper label="Thumbnail Image *" required>
                        <div className="aspect-square rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
                          <ImageIcon size={24} className="text-slate-300" />
                          <p className="text-[9px] font-black text-slate-400 uppercase">Square Image</p>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      </InputWrapper>
                      <div className="col-span-2">
                        <InputWrapper label="Category Banner">
                          <div className="h-full aspect-[3/1] rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
                            <Monitor size={24} className="text-slate-300" />
                            <p className="text-[9px] font-black text-slate-400 uppercase">Desktop Banner (1920x400)</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                          </div>
                        </InputWrapper>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <InputWrapper label="Category Icon">
                      <div className="h-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
                        <LayoutGrid size={24} className="text-slate-300" />
                        <p className="text-[9px] font-black text-slate-400 uppercase">SVG or PNG Icon</p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </InputWrapper>
                    <InputWrapper label="Mobile Banner Image">
                      <div className="h-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
                        <Smartphone size={24} className="text-slate-300" />
                        <p className="text-[9px] font-black text-slate-400 uppercase">Mobile Banner (800x400)</p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </InputWrapper>
                  </div>

                  <InputWrapper label="Alt Text for SEO">
                    <input 
                      name="altText"
                      value={formData.altText}
                      onChange={handleInputChange}
                      placeholder="e.g. Science kits for young explorers"
                      className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </InputWrapper>
                </div>
              )}

              {activeTab === "seo" && (
                <div className="space-y-8 max-w-4xl">
                  <SectionTitle title="SEO Settings" subtitle="Optimize how search engines index this category." />
                  <div className="grid grid-cols-1 gap-6">
                    <InputWrapper label="Meta Title">
                      <input 
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleInputChange}
                        placeholder="SEO friendly title"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </InputWrapper>
                    <InputWrapper label="Meta Description">
                      <textarea 
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Search engine summary..."
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      />
                    </InputWrapper>
                    <div className="grid grid-cols-2 gap-6">
                      <InputWrapper label="SEO URL">
                        <input 
                          name="seoUrl"
                          value={formData.seoUrl}
                          onChange={handleInputChange}
                          placeholder="/category-name"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Canonical URL">
                        <input 
                          name="canonicalUrl"
                          value={formData.canonicalUrl}
                          onChange={handleInputChange}
                          placeholder="Original source URL"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                    </div>
                    <InputWrapper label="Meta Keywords">
                      <input 
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={handleInputChange}
                        placeholder="comma, separated, tags"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </InputWrapper>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Display & Visibility" subtitle="Control where and how the category appears." />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <InputWrapper label="Status">
                        <select 
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Sort Order">
                        <input 
                          name="sortOrder"
                          type="number"
                          value={formData.sortOrder}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                      </InputWrapper>
                      <div className="col-span-2 flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-500 uppercase px-2">Featured Category</span>
                        <label className="relative inline-flex items-center cursor-pointer scale-75">
                          <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Show on Homepage</span>
                        <label className="relative inline-flex items-center cursor-pointer scale-75">
                          <input type="checkbox" checked={formData.showOnHomepage} onChange={(e) => setFormData({...formData, showOnHomepage: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Show in Menu</span>
                        <label className="relative inline-flex items-center cursor-pointer scale-75">
                          <input type="checkbox" checked={formData.showInMenu} onChange={(e) => setFormData({...formData, showInMenu: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Business Rules" subtitle="Commission rates and policy assignments." />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <InputWrapper label="Commission Rate (%)">
                        <input 
                          name="commissionRate"
                          type="number"
                          value={formData.commissionRate}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Shipping Type">
                        <select 
                          name="shippingType"
                          value={formData.shippingType}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        >
                          <option>Flat Rate</option>
                          <option>Weight Based</option>
                          <option>Free Shipping</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Tax Class">
                        <select 
                          name="taxClass"
                          value={formData.taxClass}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        >
                          <option>Standard</option>
                          <option>Zero Rated</option>
                          <option>Reduced</option>
                        </select>
                      </InputWrapper>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "filters" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Filters & Attributes" subtitle="Define which attributes are used for product filtering." />
                    <div className="grid grid-cols-2 gap-8">
                      <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Standard Filters</p>
                        <div className="space-y-3">
                          {["Sizes", "Colors", "Brands", "Materials"].map((filter) => (
                            <label key={filter} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 cursor-pointer hover:border-primary/30 transition-all">
                              <span className="text-xs font-bold text-slate-600">{filter}</span>
                              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <InputWrapper label="Price Range Filter">
                          <div className="grid grid-cols-2 gap-4">
                            <input placeholder="Min Price" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                            <input placeholder="Max Price" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                          </div>
                        </InputWrapper>
                        <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Custom Attributes</p>
                           <button className="w-full py-3 bg-white border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2">
                             <Plus size={14} /> Add Attribute
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Vendor Controls" subtitle="Manage vendor interactions with this category." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="leading-tight">
                          <p className="text-xs font-black text-slate-800 uppercase">Allow Vendor Upload</p>
                          <p className="text-[10px] text-slate-400 font-medium">Allow vendors to add products here.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={formData.allowVendorUpload} onChange={(e) => setFormData({...formData, allowVendorUpload: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="leading-tight">
                          <p className="text-xs font-black text-slate-800 uppercase">Approval Required</p>
                          <p className="text-[10px] text-slate-400 font-medium">Verify products before they go live.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={formData.vendorApprovalRequired} onChange={(e) => setFormData({...formData, vendorApprovalRequired: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "publish" && (
                <div className="space-y-12 max-w-4xl">
                  <div className="bg-slate-50 rounded-[40px] p-12 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center text-primary mb-8 animate-bounce">
                      <Send size={32} />
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Ready to Expand Your Catalog?</h4>
                    <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">Review all your settings across the tabs before finalizing. Once published, vendors can begin listing products in this category.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-sm">
                      <button 
                        onClick={onClose}
                        className="py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                      >
                        Save as Draft
                      </button>
                      <button 
                        onClick={handleSubmit}
                        className="py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                      >
                        Finalize & Publish
                      </button>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Analytics & Tracking" subtitle="Assign tracking IDs for better data monitoring." />
                    <div className="grid grid-cols-2 gap-6">
                      <InputWrapper label="Tracking ID">
                        <input name="trackingId" value={formData.trackingId} onChange={handleInputChange} placeholder="GA-123456" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                      </InputWrapper>
                      <InputWrapper label="Google Product Category">
                        <input name="googleProductCategory" value={formData.googleProductCategory} onChange={handleInputChange} placeholder="567" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                      </InputWrapper>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-2">
          {TABS.map((tab, idx) => (
            <div 
              key={tab.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTab === tab.id ? "w-6 bg-primary" : idx < TABS.findIndex(t => t.id === activeTab) ? "bg-primary/40" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            disabled={activeTab === "basic"}
            onClick={() => setActiveTab(TABS[TABS.findIndex(t => t.id === activeTab) - 1].id)}
            className="px-6 py-2.5 text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:text-slate-800 disabled:opacity-0 transition-all"
          >
            Back
          </button>
          {activeTab !== "publish" && (
            <button 
              onClick={() => setActiveTab(TABS[TABS.findIndex(t => t.id === activeTab) + 1].id)}
              className="px-8 py-3 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-800 transition-all shadow-lg"
            >
              Continue to {TABS[TABS.findIndex(t => t.id === activeTab) + 1].label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
