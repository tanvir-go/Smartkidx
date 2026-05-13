"use client";

import React, { useState } from "react";
import { Search, Filter, Download, UserCheck, Clock, CheckCircle, XCircle } from "lucide-react";
import { exportToCSV } from "@/utils/export";

interface VendorAttendanceRecord {
  id: number;
  employeeName: string;
  role: string;
  date: string;
  in: string | null;
  out: string | null;
  duration: string | null;
  status: "Present" | "Absent" | "Half Day" | "In Progress";
}

export default function VendorAttendancePage() {
  const [records, setRecords] = useState<VendorAttendanceRecord[]>([
    { id: 1, employeeName: "Arif Hossain", role: "Sales Executive", date: "2023-10-26", in: "09:05 AM", out: "06:10 PM", duration: "9h 5m", status: "Present" },
    { id: 2, employeeName: "Jahid Hasan", role: "Inventory Manager", date: "2023-10-26", in: "08:55 AM", out: "06:00 PM", duration: "9h 5m", status: "Present" },
    { id: 3, employeeName: "Sumi Akter", role: "Customer Support", date: "2023-10-26", in: "09:15 AM", out: "02:30 PM", duration: "5h 15m", status: "Half Day" },
    { id: 4, employeeName: "Kamrul Islam", role: "Delivery Staff", date: "2023-10-26", in: "10:00 AM", out: null, duration: null, status: "In Progress" },
    { id: 5, employeeName: "Nasir Uddin", role: "Sales Executive", date: "2023-10-26", in: null, out: null, duration: null, status: "Absent" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = records.filter(rec => 
    rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rec.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    exportToCSV(
      filteredRecords, 
      ["Employee Name", "Role", "Date", "Check In", "Check Out", "Duration", "Status"], 
      "Vendor_Staff_Attendance_Export", 
      (item: VendorAttendanceRecord) => [item.employeeName, item.role, item.date, item.in || "-", item.out || "-", item.duration || "-", item.status]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Staff Attendance</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Monitor your employees' daily work hours.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500"><UserCheck size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Staff</p>
            <h3 className="text-2xl font-black text-slate-800">12</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500"><CheckCircle size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Present Today</p>
            <h3 className="text-2xl font-black text-slate-800">8</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500"><XCircle size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Absent Today</p>
            <h3 className="text-2xl font-black text-slate-800">1</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500"><Clock size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Late / Half Day</p>
            <h3 className="text-2xl font-black text-slate-800">3</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/20">
          <div className="relative max-w-md w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by employee name or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold shadow-sm" 
            />
          </div>
          <div className="flex gap-3">
            <input type="date" className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 outline-none shadow-sm cursor-pointer" defaultValue="2023-10-26" />
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Employee Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Check In</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Check Out</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Duration</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/40 transition-colors group">
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.employeeName}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{item.role}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-700">{item.date}</td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600">{item.in || <span className="text-slate-300">-</span>}</td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600">{item.out || <span className="text-slate-300">-</span>}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-800">{item.duration || <span className="text-slate-300">-</span>}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      item.status === "Present" ? "bg-emerald-50 text-emerald-600" :
                      item.status === "Half Day" ? "bg-amber-50 text-amber-600" :
                      item.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                      "bg-rose-50 text-rose-600"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRecords.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <Search size={24} />
              </div>
              <p className="text-sm font-bold text-slate-500">No records found for your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
