"use client";

import React, { useState } from "react";
import { 
  Package, 
  Tag, 
  DollarSign, 
  Layers, 
  Image as ImageIcon, 
  Truck, 
  Search, 
  Plus, 
  Trash2, 
  Zap, 
  Eye, 
  Save, 
  ArrowRight,
  ChevronDown,
  Globe,
  ShieldCheck,
  Download,
  Video,
  Box,
  LayoutGrid,
  FileText,
  Settings,
  HelpCircle,
  X,
  GripVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

interface Variant {
  id: string;
  name: string;
  price: string;
  stock: string;
  sku: string;
  image: string;
}

const TABS = [
  { id: "basic", label: "Basic Info", icon: Package },
  { id: "pricing", label: "Pricing & Stock", icon: DollarSign },
  { id: "media", label: "Images & Media", icon: ImageIcon },
  { id: "variants", label: "Variants", icon: LayoutGrid },
  { id: "shipping", label: "Shipping & SEO", icon: Truck },
  { id: "advanced", label: "Advanced", icon: Settings },
];

export default function AddProductForm({ onClose, onSuccess, initialData }: { onClose: () => void; onSuccess?: (data: any) => void; initialData?: any }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState(initialData || {
    // 1. Basic Info
    name: "",
    shortDescription: "",
    fullDescription: "",
    sku: "",
    brand: "",
    category: "",
    subCategory: "",
    tags: "",
    // 2. Pricing
    regularPrice: "",
    salePrice: "",
    discountPercentage: "",
    costPrice: "",
    tax: "",
    currency: "BDT (৳)",
    // 3. Inventory
    stockQuantity: "",
    lowStockAlert: "",
    stockStatus: "In Stock",
    barcode: "",
    // 4. Media
    featuredImage: null as File | null,
    galleryImages: [] as File[],
    videoUrl: "",
    view360: "",
    // 6. Shipping
    weight: "",
    length: "",
    width: "",
    height: "",
    shippingCost: "",
    freeShipping: false,
    deliveryTime: "",
    // 7. SEO
    seoTitle: "",
    metaDescription: "",
    metaKeywords: "",
    slug: "",
    // 8. Visibility
    status: "Published",
    featured: false,
    visibility: "Public",
    // 9. Warranty
    warrantyPeriod: "",
    returnPolicy: "",
    replacementPolicy: "",
    supportContact: "",
    // 10. Digital
    isDigital: false,
    downloadFile: null as File | null,
    licenseKey: "",
    downloadLimit: "",
    expiryDays: "",
  });

  const [variants, setVariants] = useState<Variant[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const addVariant = () => {
    const newVariant: Variant = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      price: formData.regularPrice,
      stock: "0",
      sku: `${formData.sku}-VAR-${variants.length + 1}`,
      image: ""
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const updateVariant = (id: string, field: keyof Variant, value: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const generateAIDescription = async () => {
    if (!formData.name) {
      toast.error("Please enter a product name first");
      return;
    }
    setAiGenerating("description");
    // Mock AI delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFormData(prev => ({
      ...prev,
      fullDescription: `Introducing the premium ${prev.name}. Designed for high performance and durability, this product features state-of-the-art technology. Ideal for hobbyists and professionals alike, it offers unparalleled quality in its category. Key features include an ergonomic design, energy-efficient operation, and seamless integration with existing systems.`
    }));
    setAiGenerating(null);
    toast.success("AI Description generated!");
  };

  const generateAISEO = async () => {
    if (!formData.name) {
      toast.error("Please enter a product name first");
      return;
    }
    setAiGenerating("seo");
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormData(prev => ({
      ...prev,
      seoTitle: `Buy ${prev.name} | Best Price in Bangladesh`,
      metaDescription: `Get the original ${prev.name} at SmartKids. High quality, authentic brand, and fast delivery across Bangladesh. Order now for the best deal!`,
      slug: prev.name.toLowerCase().replace(/ /g, "-")
    }));
    setAiGenerating(null);
    toast.success("SEO Meta generated!");
  };

  const handleSubmit = (status: "Draft" | "Published") => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess?.({...formData, status});
      toast.success(initialData ? "Product updated successfully!" : (status === "Published" ? "Product published successfully!" : "Product saved as draft!"));
      onClose();
    }, 1500);
  };

  const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-slate-800 tracking-tight uppercase">{title}</h4>
      {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  const InputWrapper = ({ label, children, required, error }: any) => (
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
            <Package className="text-primary" /> Create New Listing
          </h3>
          <p className="text-slate-400 text-xs font-medium">Follow the steps to showcase your product to thousands of buyers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSubmit("Draft")}
            disabled={loading}
            className="px-6 py-2.5 text-slate-600 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 rounded-xl transition-all border border-slate-200 flex items-center gap-2"
          >
            <Save size={16} /> Save as Draft
          </button>
          <button 
            onClick={() => handleSubmit("Published")}
            disabled={loading}
            className="px-8 py-3 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            {loading ? "Publishing..." : <>Publish Product <ArrowRight size={16} /></>}
          </button>
        </div>
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
          
          <div className="mt-8 pt-8 border-t border-slate-200/60 px-4">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Support & Help</p>
            <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-xs font-bold mb-3">
              <HelpCircle size={14} /> Seller Guidelines
            </button>
            <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-xs font-bold">
              <Video size={14} /> Listing Tutorial
            </button>
          </div>
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
              {/* BASIC INFO */}
              {activeTab === "basic" && (
                <div className="space-y-8 max-w-4xl">
                  <SectionTitle title="Basic Information" subtitle="Provide the fundamental details of your product." />
                  
                  <div className="grid grid-cols-1 gap-6">
                    <InputWrapper label="Product Name" required>
                      <input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Robotics Starter Kit for Beginners"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400/60"
                      />
                    </InputWrapper>

                    <div className="grid grid-cols-2 gap-4">
                      <InputWrapper label="Product SKU">
                        <input 
                          name="sku"
                          value={formData.sku}
                          onChange={handleInputChange}
                          placeholder="SKU-12345"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Brand">
                        <input 
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          placeholder="e.g. SmartKids, LEGO"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InputWrapper label="Category" required>
                        <select 
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        >
                          <option value="">Select Category</option>
                          <option>Electronics</option>
                          <option>Robotics</option>
                          <option>STEM Kits</option>
                          <option>Educational Toys</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Sub Category">
                        <select 
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        >
                          <option value="">Select Sub Category</option>
                          <option>Arduino</option>
                          <option>Raspberry Pi</option>
                          <option>DIY Kits</option>
                        </select>
                      </InputWrapper>
                    </div>

                    <InputWrapper label="Short Description">
                      <textarea 
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="A brief summary (max 150 chars)"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      />
                    </InputWrapper>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Description / Details</label>
                        <button 
                          onClick={generateAIDescription}
                          disabled={aiGenerating === "description"}
                          className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all border border-primary/20"
                        >
                          <Zap size={12} className={aiGenerating === "description" ? "animate-pulse" : ""} /> 
                          {aiGenerating === "description" ? "AI Generating..." : "AI Generate Description"}
                        </button>
                      </div>
                      <textarea 
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleInputChange}
                        rows={8}
                        placeholder="Detailed information about features, benefits, and specifications..."
                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all leading-relaxed"
                      />
                    </div>

                    <InputWrapper label="Tags / Keywords">
                      <input 
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="robotics, stem, kit, learning (comma separated)"
                        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </InputWrapper>
                  </div>
                </div>
              )}

              {/* PRICING & INVENTORY */}
              {activeTab === "pricing" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Pricing Strategy" subtitle="Set your selling price and discounts." />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <InputWrapper label="Regular Price (৳)" required>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                          <input 
                            name="regularPrice"
                            type="number"
                            value={formData.regularPrice}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            className="w-full pl-10 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </InputWrapper>
                      <InputWrapper label="Sale Price (৳)">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                          <input 
                            name="salePrice"
                            type="number"
                            value={formData.salePrice}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            className="w-full pl-10 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </InputWrapper>
                      <InputWrapper label="Discount (%)">
                        <input 
                          name="discountPercentage"
                          type="number"
                          value={formData.discountPercentage}
                          onChange={handleInputChange}
                          placeholder="0"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all text-emerald-600"
                        />
                      </InputWrapper>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <InputWrapper label="Cost Price (Vendor Only)" error="Hidden from customers">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                          <input 
                            name="costPrice"
                            type="number"
                            value={formData.costPrice}
                            onChange={handleInputChange}
                            placeholder="What you paid"
                            className="w-full pl-10 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </InputWrapper>
                      <InputWrapper label="Tax / VAT (%)">
                        <input 
                          name="tax"
                          type="number"
                          value={formData.tax}
                          onChange={handleInputChange}
                          placeholder="0"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Inventory & Stock" subtitle="Track your stock levels and availability." />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <InputWrapper label="Stock Quantity" required>
                        <input 
                          name="stockQuantity"
                          type="number"
                          value={formData.stockQuantity}
                          onChange={handleInputChange}
                          placeholder="0"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Low Stock Alert">
                        <input 
                          name="lowStockAlert"
                          type="number"
                          value={formData.lowStockAlert}
                          onChange={handleInputChange}
                          placeholder="5"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all text-orange-600"
                        />
                      </InputWrapper>
                      <InputWrapper label="Stock Status">
                        <select 
                          name="stockStatus"
                          value={formData.stockStatus}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        >
                          <option>In Stock</option>
                          <option>Out of Stock</option>
                          <option>Pre Order</option>
                        </select>
                      </InputWrapper>
                    </div>
                    <div className="mt-6">
                      <InputWrapper label="Barcode / ISBN">
                        <input 
                          name="barcode"
                          value={formData.barcode}
                          onChange={handleInputChange}
                          placeholder="UPC-A, EAN-13, etc."
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                    </div>
                  </div>
                </div>
              )}

              {/* IMAGES & MEDIA */}
              {activeTab === "media" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Product Imagery" subtitle="High-quality images increase sales by up to 80%." />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-1">
                        <InputWrapper label="Featured Image" required>
                          <div className="mt-2 aspect-square rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-3 group hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer overflow-hidden relative">
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                              <ImageIcon size={24} />
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Main Product View</p>
                              <p className="text-[9px] text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                          </div>
                        </InputWrapper>
                      </div>

                      <div className="md:col-span-2">
                        <InputWrapper label="Gallery Images">
                          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group relative">
                                <Plus size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple />
                              </div>
                            ))}
                          </div>
                          <p className="text-[9px] text-slate-400 mt-4 uppercase tracking-widest font-black text-center">Drag & drop to reorder images</p>
                        </InputWrapper>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Video & Interactive" subtitle="Add more depth to your product presentation." />
                    <div className="grid grid-cols-2 gap-6">
                      <InputWrapper label="Product Video URL">
                        <div className="relative">
                          <Video size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleInputChange}
                            placeholder="YouTube or Vimeo link"
                            className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </InputWrapper>
                      <InputWrapper label="360° View Link (Optional)">
                        <div className="relative">
                          <LayoutGrid size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            name="view360"
                            value={formData.view360}
                            onChange={handleInputChange}
                            placeholder="Interactive 360 link"
                            className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </InputWrapper>
                    </div>
                  </div>
                </div>
              )}

              {/* VARIANTS */}
              {activeTab === "variants" && (
                <div className="space-y-8 max-w-5xl">
                  <div className="flex items-center justify-between">
                    <SectionTitle title="Product Variants" subtitle="Create multiple versions of your product (Size, Color, etc.)." />
                    <button 
                      onClick={addVariant}
                      className="px-5 py-2.5 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
                    >
                      <Plus size={16} /> Add New Variant
                    </button>
                  </div>

                  {variants.length === 0 ? (
                    <div className="py-20 rounded-[40px] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center bg-slate-50/50">
                      <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center text-slate-200 mb-6">
                        <LayoutGrid size={32} />
                      </div>
                      <h5 className="text-lg font-bold text-slate-700 tracking-tight uppercase">No Variants Yet</h5>
                      <p className="text-slate-400 text-xs mt-2 max-w-xs">Does your product come in different sizes, colors, or configurations? Add them here.</p>
                      <button 
                        onClick={addVariant}
                        className="mt-8 px-8 py-3.5 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                      >
                        Create My First Variant
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {variants.map((variant, index) => (
                        <div key={variant.id} className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm flex items-center gap-6 animate-in slide-in-from-right-4">
                          <div className="text-slate-300">
                            <GripVertical size={20} />
                          </div>
                          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 relative group overflow-hidden cursor-pointer">
                            <ImageIcon size={20} />
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                          </div>
                          <div className="flex-1 grid grid-cols-4 gap-4">
                            <InputWrapper label="Variant Name">
                              <input 
                                value={variant.name}
                                onChange={(e) => updateVariant(variant.id, "name", e.target.value)}
                                placeholder="e.g. Large / Red"
                                className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              />
                            </InputWrapper>
                            <InputWrapper label="Price (৳)">
                              <input 
                                type="number"
                                value={variant.price}
                                onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              />
                            </InputWrapper>
                            <InputWrapper label="Stock">
                              <input 
                                type="number"
                                value={variant.stock}
                                onChange={(e) => updateVariant(variant.id, "stock", e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              />
                            </InputWrapper>
                            <InputWrapper label="SKU">
                              <input 
                                value={variant.sku}
                                onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              />
                            </InputWrapper>
                          </div>
                          <button 
                            onClick={() => removeVariant(variant.id)}
                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SHIPPING & SEO */}
              {activeTab === "shipping" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Shipping Logistics" subtitle="Define physical dimensions for accurate shipping cost." />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <InputWrapper label="Weight (kg)">
                        <input 
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          placeholder="0.5"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Length (cm)">
                        <input 
                          name="length"
                          value={formData.length}
                          onChange={handleInputChange}
                          placeholder="20"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Width (cm)">
                        <input 
                          name="width"
                          value={formData.width}
                          onChange={handleInputChange}
                          placeholder="15"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Height (cm)">
                        <input 
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          placeholder="10"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                    </div>
                    <div className="mt-8 flex items-center justify-between p-6 bg-slate-50 rounded-[28px] border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                          <Truck size={24} />
                        </div>
                        <div>
                          <h6 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Free Shipping</h6>
                          <p className="text-[10px] text-slate-400 font-medium">Offer free shipping to attract more customers.</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.freeShipping} onChange={(e) => setFormData({...formData, freeShipping: e.target.checked})} className="sr-only peer" />
                        <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight uppercase">Search Engine Optimization</h4>
                        <p className="text-slate-400 text-xs mt-1">Control how your product appears in Google search results.</p>
                      </div>
                      <button 
                        onClick={generateAISEO}
                        disabled={aiGenerating === "seo"}
                        className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all border border-primary/20"
                      >
                        <Globe size={12} className={aiGenerating === "seo" ? "animate-pulse" : ""} /> 
                        {aiGenerating === "seo" ? "Auto SEO" : "Auto Generate SEO"}
                      </button>
                    </div>

                    <div className="space-y-6">
                      <InputWrapper label="SEO Meta Title">
                        <input 
                          name="seoTitle"
                          value={formData.seoTitle}
                          onChange={handleInputChange}
                          placeholder="e.g. Buy Arduino Uno R4 - SmartKids"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                      <InputWrapper label="Meta Description">
                        <textarea 
                          name="metaDescription"
                          value={formData.metaDescription}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Brief summary for search results (150-160 chars)"
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        />
                      </InputWrapper>
                      <div className="grid grid-cols-2 gap-6">
                        <InputWrapper label="Product URL Slug">
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-[10px]">smartkidx.com/p/</span>
                            <input 
                              name="slug"
                              value={formData.slug}
                              onChange={handleInputChange}
                              placeholder="arduino-uno-r4"
                              className="w-full pl-32 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                          </div>
                        </InputWrapper>
                        <InputWrapper label="Meta Keywords">
                          <input 
                            name="metaKeywords"
                            value={formData.metaKeywords}
                            onChange={handleInputChange}
                            placeholder="comma separated"
                            className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </InputWrapper>
                      </div>
                    </div>

                    {/* SEO Preview */}
                    <div className="mt-8 p-6 bg-[#f8f9fa] rounded-3xl border border-slate-100 max-w-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Google Search Preview</p>
                      <h5 className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer truncate">
                        {formData.seoTitle || (formData.name ? `${formData.name} - SmartKids` : "Product Title Preview")}
                      </h5>
                      <p className="text-[#006621] text-sm mt-1">smartkidx.com/product/{formData.slug || "url-slug"}</p>
                      <p className="text-[#4d5156] text-xs mt-1 leading-relaxed line-clamp-2">
                        {formData.metaDescription || "Start writing your meta description to see how your product will appear in search results. A good description increases click-through rates."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Visibility & Status" subtitle="Control when and how your product is seen." />
                    <div className="grid grid-cols-2 gap-6">
                      <InputWrapper label="Product Status">
                        <select 
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        >
                          <option>Published</option>
                          <option>Draft</option>
                          <option>Scheduled</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Visibility">
                        <select 
                          name="visibility"
                          value={formData.visibility}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        >
                          <option>Public</option>
                          <option>Private</option>
                          <option>Hidden</option>
                        </select>
                      </InputWrapper>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Warranty & Support" subtitle="Build trust with your customers." />
                    <div className="grid grid-cols-2 gap-6">
                      <InputWrapper label="Warranty Period">
                        <div className="relative">
                          <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            name="warrantyPeriod"
                            value={formData.warrantyPeriod}
                            onChange={handleInputChange}
                            placeholder="e.g. 1 Year Brand Warranty"
                            className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </InputWrapper>
                      <InputWrapper label="Support Contact">
                        <input 
                          name="supportContact"
                          value={formData.supportContact}
                          onChange={handleInputChange}
                          placeholder="Phone or Email"
                          className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </InputWrapper>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <InputWrapper label="Return Policy">
                        <textarea 
                          name="returnPolicy"
                          value={formData.returnPolicy}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Standard 7 days return policy..."
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        />
                      </InputWrapper>
                      <InputWrapper label="Replacement Policy">
                        <textarea 
                          name="replacementPolicy"
                          value={formData.replacementPolicy}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Conditions for replacement..."
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        />
                      </InputWrapper>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight uppercase">Digital Product Settings</h4>
                        <p className="text-slate-400 text-xs mt-1">Configure downloads and licensing for digital goods.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.isDigital} onChange={(e) => setFormData({...formData, isDigital: e.target.checked})} className="sr-only peer" />
                        <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                      </label>
                    </div>

                    {formData.isDigital && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="grid grid-cols-2 gap-6 overflow-hidden"
                      >
                        <InputWrapper label="Download File">
                          <div className="mt-2 h-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer relative">
                            <Download size={20} className="text-slate-400" />
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Upload Zip, PDF, etc.</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                          </div>
                        </InputWrapper>
                        <div className="space-y-4">
                          <InputWrapper label="License Key (Optional)">
                            <input 
                              name="licenseKey"
                              value={formData.licenseKey}
                              onChange={handleInputChange}
                              placeholder="Auto-generated if empty"
                              className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                          </InputWrapper>
                          <div className="grid grid-cols-2 gap-4">
                            <InputWrapper label="Download Limit">
                              <input 
                                type="number"
                                name="downloadLimit"
                                value={formData.downloadLimit}
                                onChange={handleInputChange}
                                placeholder="Unlimited"
                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              />
                            </InputWrapper>
                            <InputWrapper label="Expiry Days">
                              <input 
                                type="number"
                                name="expiryDays"
                                value={formData.expiryDays}
                                onChange={handleInputChange}
                                placeholder="No expiry"
                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              />
                            </InputWrapper>
                          </div>
                        </div>
                      </motion.div>
                    )}
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
          {activeTab !== "advanced" ? (
            <button 
              onClick={() => setActiveTab(TABS[TABS.findIndex(t => t.id === activeTab) + 1].id)}
              className="px-8 py-3 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-800 transition-all shadow-lg"
            >
              Continue to {TABS[TABS.findIndex(t => t.id === activeTab) + 1].label}
            </button>
          ) : (
             <button 
              onClick={() => handleSubmit("Published")}
              className="px-8 py-3 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Finalize & Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
