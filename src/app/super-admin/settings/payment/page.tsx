"use client";

import React, { useState } from "react";
import { 
  Code, 
  Save, 
  Key, 
  ShieldCheck, 
  Activity,
  Zap,
  Globe,
  RefreshCw,
  Copy,
  CheckCircle2
} from "lucide-react";
import { toast } from "react-toastify";

export default function PaymentAPIPage() {
  const [keys, setKeys] = useState({
    publicKey: "sk_live_51M682CSmartKidsX2023",
    secretKey: "****************************************",
    merchantId: "MKID-98234-SK",
    webhookUrl: "https://api.smartkids.com/v1/webhooks/payments"
  });

  const handleSave = () => {
    toast.success("Payment API configurations saved!");
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.info("Copied to clipboard!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Payment API</h2>
          <p className="text-slate-500 text-sm mt-1">Configure your payment gateway credentials and endpoints.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <RefreshCw size={18} /> Rotate Keys
          </button>
          <button 
            onClick={handleSave}
            className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Save size={18} /> Save Credentials
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-3">
              <Key size={16} className="text-primary" /> API Credentials
            </h4>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Public Key</label>
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly
                    value={keys.publicKey}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-mono text-slate-600 focus:ring-0 outline-none"
                  />
                  <button onClick={() => handleCopy(keys.publicKey)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-primary">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    readOnly
                    value={keys.secretKey}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-mono text-slate-600 focus:ring-0 outline-none"
                  />
                  <button onClick={() => handleCopy(keys.secretKey)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-primary">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Merchant ID</label>
                  <input 
                    type="text" 
                    value={keys.merchantId}
                    onChange={(e) => setKeys({...keys, merchantId: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Webhook Secret</label>
                  <input 
                    type="password" 
                    value="whsec_************************"
                    readOnly
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-3">
              <Globe size={16} className="text-primary" /> Webhook Endpoints
            </h4>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Endpoint URL</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={keys.webhookUrl}
                    onChange={(e) => setKeys({...keys, webhookUrl: e.target.value})}
                    className="flex-grow px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <button className="bg-slate-900 text-white px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Test URL</button>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Events</p>
                <div className="flex flex-wrap gap-2">
                  {['payment.succeeded', 'payment.failed', 'refund.created', 'payout.paid'].map(event => (
                    <span key={event} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-emerald-500" /> {event}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
              <Activity size={16} className="text-primary" /> API Health
            </h4>
            
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center p-8 bg-emerald-50 rounded-3xl border border-emerald-100 text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm mb-4">
                  <Zap size={32} className="animate-pulse" />
                </div>
                <h3 className="text-lg font-black text-emerald-800 uppercase tracking-tight">System Operational</h3>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-1">Uptime: 99.99%</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Latency</span>
                  <span className="text-xs font-black text-slate-800 tracking-tight">42ms</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-emerald-500 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Rate</span>
                  <span className="text-xs font-black text-slate-800 tracking-tight">98.5%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200">
            <div className="flex items-center gap-3 text-white mb-8">
              <ShieldCheck size={24} className="text-primary" />
              <p className="text-sm font-black uppercase tracking-widest">Environment</p>
            </div>
            
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                <p className="text-sm font-black text-white uppercase tracking-tight">Production Mode</p>
              </div>
              <p className="text-[10px] text-emerald-400/80 font-black uppercase tracking-widest mt-2">All transactions are live.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
