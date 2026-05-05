"use client";

import React from "react";
import { Receipt, Search, MoreHorizontal } from "lucide-react";

export default function VendorPurchaseInvoicePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Purchase Invoices</h2>
        <p className="text-slate-500 text-sm mt-1">Manage invoices from your suppliers.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center py-20">
        <Receipt size={48} className="mx-auto text-slate-100 mb-4" />
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">No invoices yet</h3>
      </div>
    </div>
  );
}
