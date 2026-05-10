"use client";

import React, { useState, useEffect } from "react";
import { 
  X, User, MapPin, Package, ShoppingCart, CreditCard, Truck, 
  Tag, FileText, CheckCircle2, Plus, Trash2, Search, Smartphone, 
  Globe, Mail, Phone, Calendar, Hash, DollarSign, Percent, 
  ShieldCheck, AlertCircle, Upload, Save, Link, Barcode, HelpCircle
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "order", label: "Order Info", icon: Hash },
  { id: "customer", label: "Customer", icon: User },
  { id: "address", label: "Address", icon: MapPin },
  { id: "products", label: "Products", icon: Package },
  { id: "summary", label: "Summary", icon: CalculatorIcon },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "docs", label: "Documents", icon: Upload },
  { id: "approval", label: "Approval", icon: ShieldCheck },
];

export default function CreateOrderModal({ isOpen, onClose, onSave, initialData }: any) {
  const [activeTab, setActiveTab] = useState("order");
  
  const generateOrderId = () => `ORD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const [formData, setFormData] = useState<any>({
    // 1. Order Info
    orderNumber: generateOrderId(),
    orderDate: new Date().toISOString().split('T')[0],
    orderStatus: "Pending",
    // 2. Customer Info
    customerType: "existing",
    customerName: "",
    phoneNumber: "",
    email: "",
    customerNotes: "",
    // 3. Billing Address
    billingCountry: "Bangladesh",
    billingState: "",
    billingCity: "",
    billingZip: "",
    billingAddress: "",
    // 4. Shipping Address
    shippingSame: true,
    shippingCountry: "Bangladesh",
    shippingState: "",
    shippingCity: "",
    shippingZip: "",
    shippingAddress: "",
    // 5. Products
    products: [
      { name: "", sku: "", variant: "", qty: 1, unitPrice: 0, discount: 0, tax: 0, subtotal: 0 }
    ],
    // 7. Payment
    paymentMethod: "COD",
    paymentStatus: "Unpaid",
    paidAmount: 0,
    dueAmount: 0,
    transactionId: "",
    // 8. Shipping & Delivery
    deliveryMethod: "Courier",
    courierPartner: "",
    trackingNumber: "",
    deliveryCharge: 0,
    estDeliveryDate: "",
    // 9. Coupons
    couponCode: "",
    promoDiscount: 0,
    loyaltyPoints: 0,
    // 10. Notes
    adminNotes: "",
    deliveryInstructions: "",
    // 12. Approval
    verificationStatus: "Unverified",
    assignedStaff: "",
    priority: "Medium"
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        // Ensure defaults if fields are missing in basic raw data
        products: initialData.products || [{ name: "", sku: "", variant: "", qty: 1, unitPrice: 0, discount: 0, tax: 0, subtotal: 0 }]
      });
    } else {
      setFormData({
        orderNumber: generateOrderId(),
        orderDate: new Date().toISOString().split('T')[0],
        orderStatus: "Pending",
        customerType: "existing",
        customerName: "",
        phoneNumber: "",
        email: "",
        customerNotes: "",
        billingCountry: "Bangladesh",
        billingState: "",
        billingCity: "",
        billingZip: "",
        billingAddress: "",
        shippingSame: true,
        shippingCountry: "Bangladesh",
        shippingState: "",
        shippingCity: "",
        shippingZip: "",
        shippingAddress: "",
        products: [{ name: "", sku: "", variant: "", qty: 1, unitPrice: 0, discount: 0, tax: 0, subtotal: 0 }],
        paymentMethod: "COD",
        paymentStatus: "Unpaid",
        paidAmount: 0,
        dueAmount: 0,
        transactionId: "",
        deliveryMethod: "Courier",
        courierPartner: "",
        trackingNumber: "",
        deliveryCharge: 0,
        estDeliveryDate: "",
        couponCode: "",
        promoDiscount: 0,
        loyaltyPoints: 0,
        adminNotes: "",
        deliveryInstructions: "",
        verificationStatus: "Unverified",
        assignedStaff: "",
        priority: "Medium"
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Product Row Logic
  const addProductRow = () => {
    setFormData((prev: any) => ({
      ...prev,
      products: [...prev.products, { name: "", sku: "", variant: "", qty: 1, unitPrice: 0, discount: 0, tax: 0, subtotal: 0 }]
    }));
  };

  const removeProductRow = (index: number) => {
    if (formData.products.length === 1) return;
    const newProducts = [...formData.products];
    newProducts.splice(index, 1);
    setFormData((prev: any) => ({ ...prev, products: newProducts }));
  };

  const updateProductRow = (index: number, field: string, value: any) => {
    const newProducts = [...formData.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    
    // Calc Subtotal
    const qty = parseFloat(newProducts[index].qty) || 0;
    const price = parseFloat(newProducts[index].unitPrice) || 0;
    const disc = parseFloat(newProducts[index].discount) || 0;
    const tax = parseFloat(newProducts[index].tax) || 0;
    newProducts[index].subtotal = (qty * price) - disc + tax;
    
    setFormData((prev: any) => ({ ...prev, products: newProducts }));
  };

  // Calculations
  const subtotal = formData.products.reduce((acc: number, p: any) => acc + (p.subtotal || 0), 0);
  const grandTotal = subtotal + parseFloat(formData.deliveryCharge || 0) - parseFloat(formData.promoDiscount || 0);

  const SectionTitle = ({ title, icon: Icon }: any) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={20} />
      </div>
      <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">{title}</h4>
    </div>
  );

  const InputField = ({ label, name, type = "text", placeholder, options, required }: any) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select name={name} value={formData[name]} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
          {options.map((opt: any) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          name={name} 
          value={formData[name]} 
          onChange={handleInputChange} 
          placeholder={placeholder} 
          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none placeholder:text-slate-300" 
        />
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-7xl h-[90vh] rounded-[48px] shadow-2xl overflow-hidden flex flex-col border border-white/20"
          >
            {/* Header */}
            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
               <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-3xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                     <ShoppingCart size={30} />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Genesis Order Engine</h3>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 italic">Authorized Admin Protocol</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="hidden lg:flex flex-col items-end px-6 border-r border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol ID</p>
                     <p className="text-sm font-black text-primary">{formData.orderNumber}</p>
                  </div>
                  <button onClick={onClose} className="p-4 hover:bg-slate-50 rounded-3xl transition-colors group">
                     <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform" />
                  </button>
               </div>
            </div>

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 overflow-hidden">
               {/* Sidebar Tabs */}
               <div className="w-72 bg-slate-50/50 border-r border-slate-100 p-6 space-y-1 overflow-y-auto custom-scrollbar shrink-0">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-[22px] transition-all group ${
                        activeTab === section.id 
                          ? "bg-white text-primary shadow-xl shadow-slate-200/50 ring-1 ring-slate-100" 
                          : "text-slate-400 hover:bg-white/50 hover:text-slate-600"
                      }`}
                    >
                      <section.icon size={18} className={activeTab === section.id ? "text-primary" : "text-slate-300 group-hover:text-slate-500"} />
                      <span className={`text-[11px] font-black uppercase tracking-widest ${activeTab === section.id ? "text-slate-800" : ""}`}>{section.label}</span>
                    </button>
                  ))}
               </div>

               {/* Content Area */}
               <div className="flex-1 overflow-y-auto p-12 bg-white custom-scrollbar">
                  <div className="max-w-5xl mx-auto">
                    {activeTab === "order" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="1. Order Information" icon={Hash} />
                        <div className="grid grid-cols-2 gap-8">
                           <InputField label="Order Number (Auto)" name="orderNumber" required />
                           <InputField label="Order Date" name="orderDate" type="date" required />
                           <InputField 
                             label="Order Status" 
                             name="orderStatus" 
                             options={["Pending", "Processing", "Confirmed", "Shipped", "Delivered", "Cancelled", "Returned"]} 
                           />
                        </div>
                      </div>
                    )}

                    {activeTab === "customer" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="2. Customer Information" icon={User} />
                        <div className="flex gap-4 mb-8">
                           <button 
                             onClick={() => setFormData({...formData, customerType: 'existing'})}
                             className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.customerType === 'existing' ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                           >Select Existing Customer</button>
                           <button 
                             onClick={() => setFormData({...formData, customerType: 'new'})}
                             className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.customerType === 'new' ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                           >Create New Customer</button>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                           <InputField label="Customer Name" name="customerName" required placeholder="Full Name" />
                           <InputField label="Phone Number" name="phoneNumber" required placeholder="+880 1..." />
                           <InputField label="Email Address" name="email" type="email" placeholder="email@domain.com" />
                           <div className="col-span-2">
                             <InputField label="Customer Notes" name="customerNotes" placeholder="Any special requests or details..." />
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "address" && (
                      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
                        <div className="space-y-8">
                           <SectionTitle title="3. Billing Address" icon={MapPin} />
                           <div className="grid grid-cols-2 gap-8">
                              <InputField label="Country" name="billingCountry" placeholder="Bangladesh" />
                              <InputField label="State / Division" name="billingState" placeholder="e.g. Dhaka" />
                              <InputField label="City" name="billingCity" placeholder="City Name" />
                              <InputField label="Zip Code" name="billingZip" placeholder="1212" />
                              <div className="col-span-2">
                                <InputField label="Full Address" name="billingAddress" placeholder="Street, House, Area..." />
                              </div>
                           </div>
                        </div>

                        <div className="pt-10 border-t border-slate-100">
                           <div className="flex items-center justify-between mb-8">
                              <SectionTitle title="4. Shipping Address" icon={Truck} />
                              <label className="flex items-center gap-3 cursor-pointer group">
                                 <input type="checkbox" name="shippingSame" checked={formData.shippingSame} onChange={handleInputChange} className="w-6 h-6 rounded-lg border-slate-200 text-primary focus:ring-primary transition-all" />
                                 <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest group-hover:text-primary transition-colors">Same as Billing Address</span>
                              </label>
                           </div>
                           
                           {!formData.shippingSame && (
                             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid grid-cols-2 gap-8 overflow-hidden">
                                <InputField label="Shipping Country" name="shippingCountry" placeholder="Bangladesh" />
                                <InputField label="Shipping State" name="shippingState" />
                                <InputField label="Shipping City" name="shippingCity" />
                                <InputField label="Shipping Zip Code" name="shippingZip" />
                                <div className="col-span-2">
                                  <InputField label="Shipping Address" name="shippingAddress" />
                                </div>
                             </motion.div>
                           )}
                        </div>
                      </div>
                    )}

                    {activeTab === "products" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center justify-between mb-4">
                           <SectionTitle title="5. Product Information" icon={Package} />
                           <div className="flex gap-3">
                              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all">
                                 <Barcode size={14} /> Scanner
                              </button>
                              <button onClick={addProductRow} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all">
                                 <Plus size={14} /> Add Row
                              </button>
                           </div>
                        </div>

                        <div className="bg-slate-50/50 rounded-[32px] border border-slate-100 overflow-hidden">
                           <table className="w-full text-left">
                              <thead>
                                 <tr className="bg-slate-100/50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Product Details</th>
                                    <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Qty</th>
                                    <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Price</th>
                                    <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Disc/Tax</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Subtotal</th>
                                    <th className="px-6 py-4"></th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                 {formData.products.map((p: any, i: number) => (
                                    <tr key={i} className="bg-white">
                                       <td className="px-6 py-5 min-w-[300px]">
                                          <div className="space-y-2">
                                             <div className="relative">
                                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                                <input value={p.name} onChange={(e) => updateProductRow(i, 'name', e.target.value)} placeholder="Search product..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none" />
                                             </div>
                                             <div className="flex gap-2">
                                                <input value={p.sku} onChange={(e) => updateProductRow(i, 'sku', e.target.value)} placeholder="SKU" className="w-1/2 px-3 py-1.5 bg-slate-50/50 border-none rounded-lg text-[10px] font-bold outline-none" />
                                                <input value={p.variant} onChange={(e) => updateProductRow(i, 'variant', e.target.value)} placeholder="Variant" className="w-1/2 px-3 py-1.5 bg-slate-50/50 border-none rounded-lg text-[10px] font-bold outline-none" />
                                             </div>
                                          </div>
                                       </td>
                                       <td className="px-4 py-5 w-24">
                                          <input type="number" value={p.qty} onChange={(e) => updateProductRow(i, 'qty', e.target.value)} className="w-full text-center px-2 py-2 bg-slate-50 border-none rounded-xl text-xs font-black outline-none" />
                                       </td>
                                       <td className="px-4 py-5 w-32">
                                          <input type="number" value={p.unitPrice} onChange={(e) => updateProductRow(i, 'unitPrice', e.target.value)} className="w-full text-right px-3 py-2 bg-slate-50 border-none rounded-xl text-xs font-black outline-none" />
                                       </td>
                                       <td className="px-4 py-5 w-40">
                                          <div className="space-y-1">
                                             <div className="relative">
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">D:</span>
                                                <input type="number" value={p.discount} onChange={(e) => updateProductRow(i, 'discount', e.target.value)} className="w-full text-right pl-6 pr-2 py-1.5 bg-slate-50 border-none rounded-lg text-[10px] font-black outline-none" />
                                             </div>
                                             <div className="relative">
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">T:</span>
                                                <input type="number" value={p.tax} onChange={(e) => updateProductRow(i, 'tax', e.target.value)} className="w-full text-right pl-6 pr-2 py-1.5 bg-slate-50 border-none rounded-lg text-[10px] font-black outline-none" />
                                             </div>
                                          </div>
                                       </td>
                                       <td className="px-6 py-5 text-right text-xs font-black text-slate-800">৳ {p.subtotal.toLocaleString()}</td>
                                       <td className="px-6 py-5 text-right">
                                          <button onClick={() => removeProductRow(i)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
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
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="6. Order Summary" icon={DollarSign} />
                        <div className="grid grid-cols-2 gap-12">
                           <div className="space-y-6">
                              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 flex items-center justify-between">
                                 <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Quantity</p>
                                    <h4 className="text-2xl font-black text-slate-800 mt-1">{formData.products.reduce((acc: number, p: any) => acc + (parseFloat(p.qty) || 0), 0)} Units</h4>
                                 </div>
                                 <Package size={40} className="text-slate-200" />
                              </div>
                              <div className="p-8 rounded-[40px] bg-primary/5 border border-primary/10 flex items-center justify-between">
                                 <div>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Subtotal Balance</p>
                                    <h4 className="text-2xl font-black text-primary mt-1">৳ {subtotal.toLocaleString()}</h4>
                                 </div>
                                 <ShoppingCart size={40} className="text-primary/10" />
                              </div>
                           </div>
                           <div className="space-y-4 bg-slate-50/50 p-10 rounded-[48px] border border-slate-100">
                              <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                 <span>Cart Subtotal</span>
                                 <span>৳ {subtotal.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                 <span>Shipping Charge</span>
                                 <input type="number" name="deliveryCharge" value={formData.deliveryCharge} onChange={handleInputChange} className="w-24 text-right bg-transparent border-b border-slate-200 outline-none text-slate-800 font-black" />
                              </div>
                              <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                 <span>Promo Discount</span>
                                 <span className="text-red-500 font-black">- ৳ {formData.promoDiscount}</span>
                              </div>
                              <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-center">
                                 <span className="text-lg font-black text-slate-800 uppercase tracking-tighter">Grand Total</span>
                                 <span className="text-4xl font-black text-slate-900 tracking-tighter animate-pulse">৳ {grandTotal.toLocaleString()}</span>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "payment" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="7. Payment Information" icon={CreditCard} />
                        <div className="grid grid-cols-2 gap-8">
                           <InputField label="Payment Method" name="paymentMethod" options={["Cash", "Card", "Bank Transfer", "Mobile Banking", "COD"]} />
                           <InputField label="Payment Status" name="paymentStatus" options={["Paid", "Partial Paid", "Unpaid"]} />
                           <InputField label="Paid Amount" name="paidAmount" type="number" />
                           <div className="p-8 rounded-[32px] bg-amber-50 border border-amber-100 flex items-center justify-between">
                              <div>
                                 <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Due Amount</p>
                                 <h4 className="text-2xl font-black text-amber-800 mt-1">৳ {(grandTotal - parseFloat(formData.paidAmount || 0)).toLocaleString()}</h4>
                              </div>
                              <AlertCircle size={32} className="text-amber-200" />
                           </div>
                           <div className="col-span-2">
                              <InputField label="Transaction ID" name="transactionId" placeholder="MFS or Bank Ref ID" />
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "shipping" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="8. Shipping & Delivery" icon={Truck} />
                        <div className="grid grid-cols-2 gap-8">
                           <InputField label="Delivery Method" name="deliveryMethod" options={["Courier", "Home Delivery", "Store Pickup"]} />
                           <InputField label="Courier Partner" name="courierPartner" placeholder="Pathao, Steadfast, RedX..." />
                           <InputField label="Tracking Number" name="trackingNumber" placeholder="CN-XXXXX..." />
                           <InputField label="Est. Delivery Date" name="estDeliveryDate" type="date" />
                        </div>
                      </div>
                    )}

                    {activeTab === "coupons" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="9. Coupons & Promotions" icon={Tag} />
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Coupon Code</label>
                              <div className="relative">
                                 <input name="couponCode" value={formData.couponCode} onChange={handleInputChange} className="w-full pl-6 pr-24 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" placeholder="DISCOUNT20" />
                                 <button className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all">Apply</button>
                              </div>
                           </div>
                           <InputField label="Promotional Discount" name="promoDiscount" type="number" />
                           <InputField label="Loyalty Point Redemption" name="loyaltyPoints" type="number" />
                        </div>
                      </div>
                    )}

                    {activeTab === "notes" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="10. Notes & Instructions" icon={FileText} />
                        <div className="space-y-8">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Notes (Internal)</label>
                              <textarea name="adminNotes" value={formData.adminNotes} onChange={handleInputChange} rows={4} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none" placeholder="Internal communication only..." />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Delivery Instructions</label>
                              <textarea name="deliveryInstructions" value={formData.deliveryInstructions} onChange={handleInputChange} rows={4} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none" placeholder="Gate code, specific time, etc..." />
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "docs" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="11. Documents & Attachments" icon={Upload} />
                        <div className="grid grid-cols-3 gap-6">
                           {["Invoice PDF", "Prescription/File", "Custom Document"].map(doc => (
                              <div key={doc} className="p-10 rounded-[40px] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center gap-4 group cursor-pointer hover:border-primary transition-all relative overflow-hidden">
                                 <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:scale-110 transition-all">
                                    <Upload size={24} />
                                 </div>
                                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{doc}</p>
                                 <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                              </div>
                           ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "approval" && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                        <SectionTitle title="12. Approval & Verification" icon={ShieldCheck} />
                        <div className="grid grid-cols-2 gap-8">
                           <InputField label="Order Verification Status" name="verificationStatus" options={["Unverified", "Phone Verified", "System Verified", "Fraud Alert"]} />
                           <InputField label="Assigned Staff" name="assignedRep" placeholder="Select Admin/Staff Member" />
                           <InputField label="Priority Level" name="priority" options={["Low", "Medium", "High"]} />
                        </div>
                      </div>
                    )}
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grand Total Payload</p>
                     <p className="text-2xl font-black text-slate-800 tracking-tighter">৳ {grandTotal.toLocaleString()}</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network Secure</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button onClick={onClose} className="px-12 py-4 bg-white border border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-50 transition-all shadow-sm">Discard Draft</button>
                  <button onClick={() => { toast.success("Genesis Order Protocol Initiated!"); onSave(formData); }} className="px-16 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-[24px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3">
                     <Save size={18} /> Deploy Order Protocol
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CalculatorIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>;
}
