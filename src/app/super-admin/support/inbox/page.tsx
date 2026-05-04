"use client";

import { 
  Mail, 
  Search, 
  Star, 
  Archive, 
  Trash2, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  User,
  Paperclip,
  Send
} from "lucide-react";
import { useState } from "react";

const messages = [
  { id: 1, user: "John Doe", subject: "Inquiry about Robotics Kit", preview: "Hi, I wanted to ask if the kit includes a battery pack...", time: "10:24 AM", unread: true, star: true },
  { id: 2, user: "Jane Smith", subject: "Order #9823 Delivery", preview: "My order hasn't arrived yet. Can you please check...", time: "9:15 AM", unread: true, star: false },
  { id: 3, user: "Global Tech", subject: "New Product Listing", preview: "We have uploaded 10 new items for the winter season...", time: "Yesterday", unread: false, star: false },
  { id: 4, user: "Mike J.", subject: "Payment Refund", preview: "I am writing to request a refund for my cancelled...", time: "2 days ago", unread: false, star: true },
  { id: 5, user: "Sara Ahmed", subject: "STEM Workshop", preview: "Thank you for the amazing workshop last weekend!", time: "Oct 24", unread: false, star: false },
];

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm flex h-[calc(100vh-160px)] overflow-hidden animate-in fade-in duration-500">
      {/* Sidebar - Message List */}
      <div className="w-[400px] border-r border-slate-50 flex flex-col">
        <div className="p-6 border-b border-slate-50">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => setSelectedId(msg.id)}
              className={`p-6 border-b border-slate-50 cursor-pointer transition-all hover:bg-slate-50 relative group ${
                selectedId === msg.id ? "bg-slate-50" : ""
              }`}
            >
              {msg.unread && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div>}
              <div className="flex items-center justify-between mb-2">
                <h4 className={`text-sm font-black uppercase tracking-tight ${msg.unread ? "text-slate-800" : "text-slate-500"}`}>{msg.user}</h4>
                <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
              </div>
              <p className={`text-xs font-bold truncate ${msg.unread ? "text-slate-800" : "text-slate-400"}`}>{msg.subject}</p>
              <p className="text-[11px] text-slate-400 truncate mt-1">{msg.preview}</p>
              <div className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Star size={14} className={msg.star ? "text-amber-500 fill-amber-500" : "text-slate-300"} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-grow flex flex-col bg-slate-50/30">
        <div className="p-6 bg-white border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">
              JD
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">John Doe</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">john@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"><Archive size={20} /></button>
            <button className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={20} /></button>
            <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"><MoreVertical size={20} /></button>
          </div>
        </div>

        <div className="flex-grow p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Inquiry about Robotics Kit</h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">10:24 AM (Today)</span>
            </div>
            
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm leading-relaxed text-slate-600 text-sm">
              <p>Hi Team,</p>
              <br />
              <p>I hope you are doing well. I am interested in purchasing the <strong>Robotics Starter Kit (SKU: RK-001)</strong> for my son's birthday.</p>
              <br />
              <p>I wanted to ask if the kit includes a battery pack or if I need to purchase it separately? Also, do you provide any tutorial videos for beginners?</p>
              <br />
              <p>Looking forward to your reply.</p>
              <br />
              <p>Best regards,<br />John Doe</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea 
                rows={3}
                placeholder="Write your reply..." 
                className="w-full pl-6 pr-16 py-4 bg-slate-50 border-none rounded-[24px] text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              ></textarea>
              <div className="absolute right-4 bottom-4 flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Paperclip size={20} /></button>
                <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
