"use client";

import React from "react";
import { ScrollText, Plus, Search, MoreHorizontal, X, Pencil } from "lucide-react";
import AddPurchaseOrderForm from "@/components/vendor/AddPurchaseOrderForm";

export default function EmployeePurchaseGRNPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingPO, setEditingPO] = React.useState<any>(null);
  const [purchaseOrders, setPurchaseOrders] = React.useState<any[]>([
    {
      poNumber: "PO-2024-8842",
      orderDate: "2024-05-01",
      supplierName: "RoboMaster Spares",
      totalQty: 25,
      grandTotal: 15400,
      status: "Ordered",
      paymentStatus: "Partial",
      items: [{ id: 1, name: "Arduino Uno R3", sku: "ARD-001", variant: "Blue", qty: 10, unitPrice: 1200, discount: 0, tax: 5, subtotal: 12000 }]
    }
  ]);

  const handleAddPO = (data: any) => {
    if (editingPO) {
      setPurchaseOrders(purchaseOrders.map((po: any) => po.poNumber === editingPO.poNumber ? data : po));
    } else {
      setPurchaseOrders([data, ...purchaseOrders]);
    }
    setIsModalOpen(false);
    setEditingPO(null);
  };

  const handleEdit = (po: any) => {
    setEditingPO(po);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Purchase & GRN</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Track your procurement history and inventory inflows.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> New Purchase Order
        </button>
      </div>

      {purchaseOrders.length === 0 ? (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center py-20 bg-slate-50/20">
          <ScrollText size={48} className="mx-auto text-slate-200 mb-4 animate-pulse" />
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">No procurement data found</h3>
          <p className="text-xs text-slate-400 mt-2 font-medium">Start by creating your first purchase order to stock up your warehouse.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Purchase Orders</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search PO..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none font-bold" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">PO Number</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Supplier</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {purchaseOrders.map((po: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="text-[11px] font-black text-slate-800 uppercase">{po.poNumber}</span>
                    </td>
                    <td className="px-6 py-5 text-[11px] font-bold text-slate-500">{po.orderDate}</td>
                    <td className="px-6 py-5">
                      <p className="text-[11px] font-black text-slate-700 uppercase">{po.supplierName}</p>
                    </td>
                    <td className="px-6 py-5 text-[11px] font-bold text-slate-500">{po.totalQty}</td>
                    <td className="px-6 py-5">
                      <span className="text-[11px] font-black text-primary">৳{po.grandTotal.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        po.status === "Completed" ? "bg-emerald-50 text-emerald-600" : 
                        po.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-600"
                      }`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(po)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" 
                          title="Edit Order"
                        >
                          <Pencil size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add PO Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setIsModalOpen(false); setEditingPO(null); }}></div>
          <div className="relative bg-white w-full max-w-6xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <AddPurchaseOrderForm 
              onClose={() => { setIsModalOpen(false); setEditingPO(null); }} 
              onSuccess={handleAddPO} 
              initialData={editingPO}
            />
          </div>
        </div>
      )}
    </div>
  );
}
