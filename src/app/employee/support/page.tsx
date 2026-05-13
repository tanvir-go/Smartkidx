"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, 
  Filter,
  Send,
  User,
  Paperclip,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from "lucide-react";
import { toast } from "react-toastify";

type TicketPriority = "High" | "Normal" | "Low";
type TicketStatus = "Open" | "In Progress" | "Resolved";

interface TicketMessage {
  id: string;
  sender: "Customer" | "Agent";
  text: string;
  timestamp: string;
}

interface SupportTicket {
  id: string;
  customerName: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  lastUpdated: string;
  messages: TicketMessage[];
}

const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "TCK-8812",
    customerName: "Arif Hossain",
    subject: "Missing part in Robotics Kit",
    priority: "High",
    status: "Open",
    lastUpdated: "10 mins ago",
    messages: [
      { id: "m1", sender: "Customer", text: "Hello, I just received my Advanced Robotics Kit V2 (Order #9930) but it seems to be missing the servo motor. Can you help?", timestamp: "Today, 10:15 AM" }
    ]
  },
  {
    id: "TCK-8811",
    customerName: "Sabrina Rahman",
    subject: "How to assemble the Solar Car?",
    priority: "Normal",
    status: "In Progress",
    lastUpdated: "1 hour ago",
    messages: [
      { id: "m1", sender: "Customer", text: "I am having trouble assembling the wheels on the solar car model.", timestamp: "Yesterday, 04:00 PM" },
      { id: "m2", sender: "Agent", text: "Hi Sabrina! I'd be happy to help. Have you checked page 4 of the manual? The axle needs to click firmly into place.", timestamp: "Yesterday, 04:30 PM" },
      { id: "m3", sender: "Customer", text: "Oh I see. Let me try that now.", timestamp: "Yesterday, 04:45 PM" }
    ]
  },
  {
    id: "TCK-8810",
    customerName: "Nusrat Jahan",
    subject: "Return accepted?",
    priority: "Low",
    status: "Resolved",
    lastUpdated: "2 days ago",
    messages: [
      { id: "m1", sender: "Customer", text: "Has my return been processed yet?", timestamp: "Oct 22, 11:00 AM" },
      { id: "m2", sender: "Agent", text: "Hi Nusrat, yes your return was processed and refunded today.", timestamp: "Oct 22, 02:00 PM" }
    ]
  }
];

export default function EmployeeSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(MOCK_TICKETS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket?.messages]);

  const filteredTickets = tickets.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;

    const newMessage: TicketMessage = {
      id: `m${Date.now()}`,
      sender: "Agent",
      text: replyText,
      timestamp: "Just now"
    };

    const updatedTickets = tickets.map(t => {
      if (t.id === activeTicket.id) {
        return {
          ...t,
          status: "In Progress" as TicketStatus,
          lastUpdated: "Just now",
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    setActiveTicket(updatedTickets.find(t => t.id === activeTicket.id) || null);
    setReplyText("");
    toast.success("Reply sent successfully.");
  };

  const handleResolveTicket = () => {
    if (!activeTicket) return;

    const updatedTickets = tickets.map(t => {
      if (t.id === activeTicket.id) {
        return { ...t, status: "Resolved" as TicketStatus, lastUpdated: "Just now" };
      }
      return t;
    });

    setTickets(updatedTickets);
    setActiveTicket(updatedTickets.find(t => t.id === activeTicket.id) || null);
    toast.success("Ticket marked as resolved.");
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch(priority) {
      case "High": return "text-red-500 bg-red-50";
      case "Normal": return "text-blue-500 bg-blue-50";
      case "Low": return "text-slate-500 bg-slate-100";
    }
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch(status) {
      case "Open": return <AlertCircle size={14} className="text-amber-500" />;
      case "In Progress": return <Clock size={14} className="text-blue-500" />;
      case "Resolved": return <CheckCircle2 size={14} className="text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 h-[calc(100vh-120px)] flex flex-col">
      
      {/* Header */}
      <div className="shrink-0">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Customer Support</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Manage and reply to customer inquiries.</p>
      </div>

      {/* Main App Layout */}
      <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-0">
        
        {/* Left Sidebar: Ticket List */}
        <div className="w-full md:w-80 border-r border-slate-100 flex flex-col shrink-0 bg-slate-50/50">
          
          <div className="p-6 border-b border-slate-100 shrink-0">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tickets..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold shadow-sm" 
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50">Open</button>
              <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50">Resolved</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            {filteredTickets.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => setActiveTicket(ticket)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  activeTicket?.id === ticket.id 
                    ? "bg-white border-primary shadow-md shadow-primary/5 ring-4 ring-primary/5" 
                    : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ticket.id}</span>
                  <span className="text-[10px] font-bold text-slate-400">{ticket.lastUpdated}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">{ticket.subject}</h4>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mb-3">
                  <User size={12} /> {ticket.customerName}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority} Priority
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    {getStatusIcon(ticket.status)} {ticket.status}
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* Right Content: Chat Interface */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {activeTicket ? (
            <>
              {/* Chat Header */}
              <div className="p-6 md:px-10 py-6 border-b border-slate-100 shrink-0 flex items-center justify-between bg-white z-10">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">{activeTicket.subject}</h3>
                  <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-2">
                    <User size={14} /> {activeTicket.customerName} • 
                    <span className="text-slate-400 font-medium">Ticket ID: {activeTicket.id}</span>
                  </p>
                </div>
                
                {activeTicket.status !== "Resolved" && (
                  <button 
                    onClick={handleResolveTicket}
                    className="hidden sm:flex px-4 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all items-center gap-2"
                  >
                    <CheckCircle2 size={14} /> Mark Resolved
                  </button>
                )}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-6 bg-slate-50/30">
                {activeTicket.messages.map((msg, i) => {
                  const isAgent = msg.sender === "Agent";
                  return (
                    <div key={msg.id} className={`flex flex-col max-w-[80%] ${isAgent ? "ml-auto items-end" : "mr-auto items-start"}`}>
                      <div className={`flex items-center gap-2 mb-1.5 ${isAgent ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isAgent ? "bg-primary text-white" : "bg-slate-200 text-slate-500"}`}>
                          {isAgent ? <MessageSquare size={10} /> : <User size={10} />}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{msg.sender}</span>
                        <span className="text-[10px] font-bold text-slate-300">•</span>
                        <span className="text-[10px] font-bold text-slate-400">{msg.timestamp}</span>
                      </div>
                      
                      <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                        isAgent 
                          ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20" 
                          : "bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              {activeTicket.status !== "Resolved" ? (
                <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                  <form onSubmit={handleSendReply} className="relative flex items-end gap-4">
                    <button type="button" className="p-4 text-slate-400 hover:text-primary transition-colors shrink-0 bg-slate-50 rounded-2xl">
                      <Paperclip size={20} />
                    </button>
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none resize-none max-h-32 min-h-[56px] custom-scrollbar"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendReply(e);
                        }
                      }}
                    />
                    <button 
                      type="submit"
                      disabled={!replyText.trim()}
                      className="p-4 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                    >
                      <Send size={20} className={replyText.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
                    </button>
                  </form>
                  <p className="text-[10px] font-bold text-slate-400 text-center mt-3 uppercase tracking-widest">Press Enter to send, Shift + Enter for new line</p>
                </div>
              ) : (
                <div className="p-8 bg-slate-50 border-t border-slate-100 shrink-0 text-center">
                  <p className="text-sm font-bold text-slate-500 flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> This ticket has been resolved and closed.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-bold">Select a ticket to view conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
