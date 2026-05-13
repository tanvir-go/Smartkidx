"use client";

import React, { useState, useEffect } from "react";
import { Clock, Download, CheckCircle, XCircle, Filter, Search, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "react-toastify";
import { exportToCSV } from "@/utils/export";
import { motion } from "framer-motion";

interface AttendanceRecord {
  id: number | string;
  date: string;
  in: string | null;
  out: string | null;
  duration: string | null;
  status: "Present" | "Absent" | "Half Day" | "In Progress";
}

export default function EmployeeAttendancePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentShiftStart, setCurrentShiftStart] = useState<Date | null>(null);
  
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { id: 1, date: "2023-10-26", in: "09:05 AM", out: "06:10 PM", duration: "9h 5m", status: "Present" },
    { id: 2, date: "2023-10-25", in: "08:55 AM", out: "06:00 PM", duration: "9h 5m", status: "Present" },
    { id: 3, date: "2023-10-24", in: "09:15 AM", out: "02:30 PM", duration: "5h 15m", status: "Half Day" },
    { id: 4, date: "2023-10-23", in: null, out: null, duration: null, status: "Absent" },
  ]);

  // Real-time clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleCheckInOut = () => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (!isCheckedIn) {
      // Check In
      setIsCheckedIn(true);
      setCurrentShiftStart(now);
      
      const newRecord: AttendanceRecord = {
        id: Date.now(),
        date: todayStr,
        in: timeStr,
        out: null,
        duration: null,
        status: "In Progress"
      };
      
      setRecords([newRecord, ...records]);
      toast.success("Successfully Checked In at " + timeStr);
    } else {
      // Check Out
      setIsCheckedIn(false);
      
      setRecords(prev => prev.map(rec => {
        if (rec.date === todayStr && rec.status === "In Progress") {
          // Calculate duration
          let durationStr = "Unknown";
          if (currentShiftStart) {
            const diffMs = now.getTime() - currentShiftStart.getTime();
            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            durationStr = `${diffHrs}h ${diffMins}m`;
          }
          
          return {
            ...rec,
            out: timeStr,
            duration: durationStr,
            status: "Present" // Could be Half Day if < 4 hours, but kept simple
          };
        }
        return rec;
      }));
      
      setCurrentShiftStart(null);
      toast.success("Successfully Checked Out at " + timeStr);
    }
  };

  const handleExport = () => {
    exportToCSV(
      records, 
      ["Date", "Check In", "Check Out", "Duration", "Status"], 
      "My_Attendance_Export", 
      (item: AttendanceRecord) => [item.date, item.in || "-", item.out || "-", item.duration || "-", item.status]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Time & Attendance</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Track your daily work hours.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Check In Widget */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
            {/* Background design */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">{formatDate(currentTime)}</p>
                <h3 className="text-5xl font-black tracking-tighter tabular-nums">{formatTime(currentTime)}</h3>
              </div>
              
              <div className="w-full pt-6 border-t border-white/10">
                <p className="text-xs font-medium text-slate-300 mb-6">
                  {isCheckedIn 
                    ? "You are currently checked in. Don't forget to check out before leaving."
                    : "You are not checked in yet. Click below to start your shift."
                  }
                </p>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckInOut}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
                    isCheckedIn 
                      ? "bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30" 
                      : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  }`}
                >
                  {isCheckedIn ? (
                    <><XCircle size={20} /> Check Out</>
                  ) : (
                    <><CheckCircle size={20} /> Check In</>
                  )}
                </motion.button>
              </div>
              
              {isCheckedIn && currentShiftStart && (
                <div className="animate-in fade-in zoom-in duration-300">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Shift Active</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/20">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Recent Activity</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <CalendarIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select className="pl-10 pr-8 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 outline-none appearance-none shadow-sm cursor-pointer">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/30">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Check In</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Check Out</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Duration</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
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
              {records.length === 0 && (
                <div className="p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <Clock size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-500">No attendance records found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
