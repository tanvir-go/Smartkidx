"use client";

import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Shield, 
  Mail,
  ChevronRight,
  Download
} from "lucide-react";
import { exportToCSV } from "@/utils/export";

const allUsers = [
  { id: 1, name: "Admin User", role: "Super Admin", email: "admin@smartkids.com", status: "Active", joined: "Oct 20, 2023" },
  { id: 2, name: "Global Tech", role: "Seller", email: "sales@globaltech.com", status: "Active", joined: "Oct 21, 2023" },
  { id: 3, name: "John Smith", role: "Customer", email: "john@example.com", status: "Active", joined: "Oct 22, 2023" },
  { id: 4, name: "Jane Doe", role: "Support", email: "jane@smartkids.com", status: "Active", joined: "Oct 23, 2023" },
  { id: 5, name: "Old Seller", role: "Seller", email: "old@vendor.com", status: "Inactive", joined: "Sep 15, 2023" },
];

export default function UsersManagementPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">System Users</h2>
          <p className="text-slate-500 text-sm mt-1">Manage permissions and accounts for all platform participants.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(
              allUsers, 
              ["ID", "Name", "Role", "Email", "Status", "Joined"], 
              "Users_Export",
              (u) => [u.id, u.name, u.role, u.email, u.status, u.joined]
            )}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <Users size={18} /> Invite User
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users by name, role or email..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
          <Filter size={16} /> Roles
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">System Role</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Join Date</th>
              <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {allUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-black text-xs uppercase shadow-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">{user.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5 flex items-center gap-1 uppercase tracking-widest">
                        <Mail size={10} /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                    user.role === "Super Admin" ? "border-slate-800 text-slate-800 bg-slate-50" : 
                    user.role === "Seller" ? "border-blue-100 text-blue-500 bg-blue-50" : "border-slate-100 text-slate-500 bg-white"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">{user.joined}</td>
                <td className="px-8 py-5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    user.status === "Active" ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary transition-all"><Shield size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-800 transition-all"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
