"use client";

import { 
  LifeBuoy, 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  User,
  MoreVertical,
  ChevronRight
} from "lucide-react";

const tickets = [
  { id: "#TKT-001", subject: "Payment Failed for Order #9823", user: "John Doe", priority: "High", status: "Open", date: "2 hours ago" },
  { id: "#TKT-002", subject: "Return Request: Robotics Kit", user: "Jane Smith", priority: "Medium", status: "Resolved", date: "1 day ago" },
  { id: "#TKT-003", subject: "How to setup Arduino IDE?", user: "Mike Johnson", priority: "Low", status: "Pending", date: "3 hours ago" },
  { id: "#TKT-004", subject: "Bulk Order Discount Inquiry", user: "Global Tech", priority: "High", status: "Open", date: "30 mins ago" },
  { id: "#TKT-005", subject: "Damaged packaging on arrival", user: "Sarah Williams", priority: "High", status: "Closed", date: "5 days ago" },
];

export default function SupportTicketsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Support & Tickets</h2>
          <p className="text-slate-500 text-sm mt-1">Manage customer inquiries and support requests.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <MessageSquare size={18} /> New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Tickets", value: "156", color: "text-slate-800", bg: "bg-white" },
          { label: "Open Tickets", value: "24", color: "text-rose-500", bg: "bg-rose-50" },
          { label: "Pending", value: "12", color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Resolved", value: "120", color: "text-emerald-500", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-3xl border border-slate-100 shadow-sm`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            <h3 className={`text-2xl font-black mt-3 ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ticket ID or subject..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Info</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Requested By</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight line-clamp-1">{ticket.subject}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ticket ID: {ticket.id}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary text-[10px] font-black">
                        {ticket.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-bold text-slate-600">{ticket.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                      ticket.priority === "High" ? "border-rose-100 text-rose-500 bg-rose-50" : 
                      ticket.priority === "Medium" ? "border-amber-100 text-amber-500 bg-amber-50" : "border-blue-100 text-blue-500 bg-blue-50"
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {ticket.status === "Open" && <AlertCircle size={14} className="text-rose-500" />}
                      {ticket.status === "Resolved" && <CheckCircle2 size={14} className="text-emerald-500" />}
                      {ticket.status === "Pending" && <Clock size={14} className="text-amber-500" />}
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        ticket.status === "Open" ? "text-rose-500" : 
                        ticket.status === "Resolved" ? "text-emerald-500" : "text-amber-500"
                      }`}>{ticket.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-400">{ticket.date}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
