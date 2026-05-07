"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Truck, 
  User, 
  Package, 
  CreditCard, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Search, 
  X, 
  Calendar,
  Building2,
  MapPin,
  ClipboardList,
  Info,
  DollarSign,
  Upload,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const TABS = [
  { id: "info", label: "Order Info", icon: Info },
  { id: "supplier", label: "Supplier & Location", icon: Building2 },
  { id: "products", label: "Product Items", icon: Package },
  { id: "summary", label: "Summary & Shipping", icon: ClipboardList },
  { id: "approval", label: "Docs & Approval", icon: ShieldCheck },
];

// Mock Products for selection
const MOCK_PRODUCTS = [
  { id: 1, name: "Arduino Uno R3", sku: "ARD-001", price: 1200 },
  { id: 2, name: "Raspberry Pi 4", sku: "RPI-004", price: 4500 },
  { id: 3, name: "Ultrasonic Sensor", sku: "SEN-012", price: 150 },
  { id: 4, name: "MG995 Servo Motor", sku: "MOT-045", price: 350 },
];

export default function AddPurchaseOrderForm({ onClose, onSuccess, initialData }: { onClose: () => void; onSuccess: (data: any) => void; initialData?: any }) {
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState(initialData || {
    // 1. PO Information
    poNumber: `PO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: "",
    referenceNumber: "",
    status: "Pending",
    // 2. Supplier Info
    supplierId: "",
    supplierName: "RoboMaster Spares", // Mock selected
    contactPerson: "Tanvir Ahmed",
    supplierPhone: "+880 1712-445566",
    supplierEmail: "sales@robomaster.com",
    supplierAddress: "Plot 12, Road 5, Block B, Banani, Dhaka",
    // 3. Warehouse
    warehouseId: "Primary Warehouse",
    deliveryAddress: "Shop 104, Level 4, Multiplan Center, Dhaka",
    receivingPerson: "Jamal Uddin",
    // 4. Product Info
    items: [
      { id: Date.now(), name: "Arduino Uno R3", sku: "ARD-001", variant: "Blue", qty: 10, unitPrice: 1200, discount: 0, tax: 5, subtotal: 12000 }
    ],
    // 5. Order Summary (Calculated)
    totalQty: 0,
    subtotal: 0,
    discountAmount: 0,
    shippingCost: 500,
    taxAmount: 0,
    grandTotal: 0,
    // 6. Payment
    paymentMethod: "Bank Transfer",
    paymentStatus: "Unpaid",
    paidAmount: 0,
    dueAmount: 0,
    transactionId: "",
    // 7. Shipping
    shippingMethod: "Courier",
    courierName: "Pathao Fast",
    trackingNumber: "",
    deliveryNotes: "",
    // 8. Documents (Mocks)
    // 9. Notes
    supplierNotes: "",
    adminNotes: "",
    terms: "Payment within 7 days of delivery.",
    // 10. Approval
    approvalStatus: "Pending",
    priority: "Normal",
  });

  // Calculate Totals
  useEffect(() => {
    let q = 0;
    let s = 0;
    let t = 0;
    
    formData.items.forEach(item => {
      q += Number(item.qty);
      const lineSub = item.qty * item.unitPrice;
      const lineTax = (lineSub * item.tax) / 100;
      s += lineSub;
      t += lineTax;
    });

    setFormData(prev => ({
      ...prev,
      totalQty: q,
      subtotal: s,
      taxAmount: t,
      grandTotal: s + t + Number(prev.shippingCost) - prev.discountAmount,
      dueAmount: s + t + Number(prev.shippingCost) - prev.discountAmount - prev.paidAmount
    }));
  }, [formData.items, formData.shippingCost, formData.discountAmount, formData.paidAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: "", sku: "", variant: "", qty: 1, unitPrice: 0, discount: 0, tax: 0, subtotal: 0 }]
    }));
  };

  const removeItem = (id: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(formData);
      toast.success("Purchase Order created successfully!");
      onClose();
    }, 1500);
  };

  const SectionTitle = ({ title, subtitle, icon: Icon }: any) => (
    <div className="mb-6 flex items-center gap-3">
      {Icon && <Icon size={20} className="text-primary" />}
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
    <div className="flex flex-col h-[90vh] bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">New Purchase Order</h3>
            <p className="text-slate-400 text-xs font-medium">Create and manage your procurement requests.</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
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
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "info" && (
                <div className="space-y-10 max-w-4xl">
                  <div className="grid grid-cols-2 gap-8">
                    <InputWrapper label="PO Number (Auto)" required icon={Info}>
                      <input name="poNumber" value={formData.poNumber} readOnly className="w-full px-5 py-3.5 bg-slate-100 border-none rounded-2xl text-sm font-bold text-slate-500 cursor-not-allowed" />
                    </InputWrapper>
                    <InputWrapper label="Order Date" required icon={Calendar}>
                      <input type="date" name="orderDate" value={formData.orderDate} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                    </InputWrapper>
                    <InputWrapper label="Expected Delivery" icon={Calendar}>
                      <input type="date" name="expectedDelivery" value={formData.expectedDelivery} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                    </InputWrapper>
                    <InputWrapper label="Reference Number" icon={ClipboardList}>
                      <input name="referenceNumber" value={formData.referenceNumber} onChange={handleInputChange} placeholder="e.g. REF-12345" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                    </InputWrapper>
                  </div>
                  <InputWrapper label="Purchase Status">
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                      <option>Pending</option>
                      <option>Ordered</option>
                      <option>Partial Received</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </InputWrapper>
                </div>
              )}

              {activeTab === "supplier" && (
                <div className="space-y-12 max-w-4xl">
                  <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-slate-100 -rotate-12 translate-x-4 -translate-y-4">
                      <Building2 size={120} />
                    </div>
                    <div className="relative z-10 grid grid-cols-2 gap-8">
                      <InputWrapper label="Supplier Selection" required icon={User}>
                        <select 
                          name="supplierId" 
                          value={formData.supplierId} 
                          onChange={(e) => setFormData({...formData, supplierId: e.target.value, supplierName: e.target.value})} 
                          className="w-full px-5 py-3.5 bg-white border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
                        >
                          <option value="">Search Supplier...</option>
                          <option>RoboMaster Spares</option>
                          <option>Global Tech Solutions</option>
                        </select>
                      </InputWrapper>
                      <div className="space-y-4 pt-4">
                        <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">{formData.supplierName}</p>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{formData.contactPerson}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{formData.supplierPhone}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{formData.supplierEmail}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <InputWrapper label="Warehouse Selection" required icon={Building2}>
                        <select name="warehouseId" value={formData.warehouseId} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                          <option>Primary Warehouse</option>
                          <option>Secondary Hub</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Receiving Person" icon={User}>
                        <input name="receivingPerson" value={formData.receivingPerson} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </InputWrapper>
                  </div>
                  <InputWrapper label="Delivery Address" icon={MapPin}>
                    <textarea name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} rows={2} className="w-full px-5 py-4 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                  </InputWrapper>
                </div>
              )}

              {activeTab === "products" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Order Items</h4>
                    <button onClick={addItem} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-100">
                      <Plus size={14} /> Add Product
                    </button>
                  </div>

                  <div className="bg-slate-50/50 rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100/50">
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Product Details</th>
                          <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Variant</th>
                          <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Qty</th>
                          <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                          <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Tax %</th>
                          <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Subtotal</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {formData.items.map((item) => (
                          <tr key={item.id} className="bg-white hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-5 min-w-[240px]">
                              <select 
                                value={item.name} 
                                onChange={(e) => {
                                  const prod = MOCK_PRODUCTS.find(p => p.name === e.target.value);
                                  if(prod) {
                                    updateItem(item.id, "name", prod.name);
                                    updateItem(item.id, "sku", prod.sku);
                                    updateItem(item.id, "unitPrice", prod.price);
                                  }
                                }}
                                className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-[11px] font-bold focus:ring-1 focus:ring-primary outline-none"
                              >
                                <option value="">Select Product...</option>
                                {MOCK_PRODUCTS.map(p => <option key={p.id}>{p.name}</option>)}
                              </select>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-2 ml-1">{item.sku || "NO SKU"}</p>
                            </td>
                            <td className="px-4 py-5">
                               <input value={item.variant} onChange={(e) => updateItem(item.id, "variant", e.target.value)} placeholder="e.g. XL" className="w-20 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-[11px] font-bold focus:ring-1 focus:ring-primary outline-none" />
                            </td>
                            <td className="px-4 py-5">
                               <input type="number" value={item.qty} onChange={(e) => updateItem(item.id, "qty", e.target.value)} className="w-20 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-[11px] font-bold text-center focus:ring-1 focus:ring-primary outline-none" />
                            </td>
                            <td className="px-4 py-5">
                               <input type="number" value={item.unitPrice} onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)} className="w-24 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-[11px] font-bold focus:ring-1 focus:ring-primary outline-none" />
                            </td>
                            <td className="px-4 py-5">
                               <input type="number" value={item.tax} onChange={(e) => updateItem(item.id, "tax", e.target.value)} className="w-16 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-[11px] font-bold focus:ring-1 focus:ring-primary outline-none" />
                            </td>
                            <td className="px-4 py-5 text-right font-black text-slate-800 text-[11px]">
                              ৳{(item.qty * item.unitPrice).toLocaleString()}
                            </td>
                            <td className="px-6 py-5 text-right">
                              <button onClick={() => removeItem(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "summary" && (
                <div className="space-y-12 max-w-4xl">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <SectionTitle title="Shipping & Logistics" icon={Truck} />
                       <div className="grid grid-cols-2 gap-6">
                        <InputWrapper label="Courier Name">
                          <input name="courierName" value={formData.courierName} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                        </InputWrapper>
                        <InputWrapper label="Shipping Cost">
                          <input type="number" name="shippingCost" value={formData.shippingCost} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                        </InputWrapper>
                       </div>
                       <InputWrapper label="Tracking Number">
                        <input name="trackingNumber" value={formData.trackingNumber} onChange={handleInputChange} placeholder="AWB-XXXXXX" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                       </InputWrapper>
                    </div>

                    <div className="bg-slate-50 rounded-[40px] p-10 space-y-4 border border-slate-100">
                      <div className="flex items-center justify-between py-2 border-b border-slate-200/50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Qty</span>
                        <span className="text-xs font-black text-slate-800">{formData.totalQty} Units</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</span>
                        <span className="text-xs font-bold text-slate-800">৳{formData.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax (VAT)</span>
                        <span className="text-xs font-bold text-slate-800">৳{formData.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipping</span>
                        <span className="text-xs font-bold text-slate-800">৳{Number(formData.shippingCost).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between py-4 mt-4 border-t-2 border-slate-200 border-dashed">
                        <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Grand Total</span>
                        <span className="text-lg font-black text-primary">৳{formData.grandTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <SectionTitle title="Payment Details" icon={CreditCard} />
                       <div className="grid grid-cols-2 gap-6">
                        <InputWrapper label="Payment Method">
                          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>Bank Transfer</option>
                            <option>Cash</option>
                            <option>Mobile Banking</option>
                          </select>
                        </InputWrapper>
                        <InputWrapper label="Payment Status">
                          <select name="paymentStatus" value={formData.paymentStatus} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>Unpaid</option>
                            <option>Partial</option>
                            <option>Paid</option>
                          </select>
                        </InputWrapper>
                       </div>
                    </div>
                    <div className="space-y-8 pt-8">
                       <InputWrapper label="Paid Amount">
                        <input type="number" name="paidAmount" value={formData.paidAmount} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-emerald-50 text-emerald-700 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-200 outline-none" />
                       </InputWrapper>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "approval" && (
                <div className="space-y-12 max-w-4xl">
                  <div>
                    <SectionTitle title="Documents & Attachments" icon={Upload} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {["Invoice", "Quotation", "Agreement", "Other Docs"].map(doc => (
                        <div key={doc} className="p-6 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all flex flex-col items-center justify-center text-center gap-3 group relative cursor-pointer">
                          <Upload size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{doc}</p>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <SectionTitle title="Workflow & Priority" icon={ShieldCheck} />
                      <InputWrapper label="Priority Level">
                        <div className="flex gap-4">
                          {["Low", "Normal", "High"].map(p => (
                            <button 
                              key={p} 
                              onClick={() => setFormData({...formData, priority: p})}
                              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                formData.priority === p ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </InputWrapper>
                    </div>
                    <div className="bg-primary/5 rounded-[40px] p-8 border border-primary/10">
                       <SectionTitle title="Order Terms" icon={ClipboardList} />
                       <textarea name="terms" value={formData.terms} onChange={handleInputChange} rows={3} className="w-full bg-transparent border-none p-0 text-xs font-medium text-slate-600 focus:ring-0 outline-none resize-none" />
                    </div>
                  </div>

                  <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm" />
                      <div>
                        <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">Approved By: Pending</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Workflow Status: Waiting for manager</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={onClose} className="px-8 py-4 bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
                       <button onClick={handleSubmit} className="px-12 py-4 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">Finalize Purchase Order</button>
                    </div>
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
            disabled={activeTab === "info"}
            onClick={() => setActiveTab(TABS[TABS.findIndex(t => t.id === activeTab) - 1].id)}
            className="px-6 py-3 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-800 disabled:opacity-0 transition-all"
          >
            Previous
          </button>
          {activeTab !== "approval" && (
            <button 
              onClick={() => setActiveTab(TABS[TABS.findIndex(t => t.id === activeTab) + 1].id)}
              className="px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 flex items-center gap-2 group"
            >
              Continue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
