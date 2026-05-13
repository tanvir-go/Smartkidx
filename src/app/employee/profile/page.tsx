"use client";

import React, { useState } from "react";
import { UserCircle, Key, Mail, Phone, MapPin, Building, Briefcase, Calendar, Save, Camera, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

export default function EmployeeMyProfilePage() {
  const [activeTab, setActiveTab] = useState<"personal" | "work" | "security">("personal");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Mock Data
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Arif",
    lastName: "Hossain",
    email: "arif.hossain@smartkids.com",
    phone: "+880 1711 223344",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    bio: "Passionate sales executive with 5 years of experience in e-commerce and retail management."
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePersonalInfoUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Personal information updated successfully!");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header Banner */}
      <div className="relative rounded-[40px] bg-white border border-slate-100 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative p-10 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="avatar-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setAvatarUrl(url);
                  toast.success("Profile picture updated successfully!");
                }
              }}
            />
            <label htmlFor="avatar-upload" className="block cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-slate-50 border-4 border-white flex items-center justify-center text-5xl font-black text-primary shadow-xl overflow-hidden relative z-10">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300" />
                ) : (
                  <span className="group-hover:opacity-0 transition-opacity duration-300">AH</span>
                )}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera size={32} className="text-white" />
                </div>
              </div>
            </label>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white rounded-full z-20 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-white" />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1 mt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Employee</span>
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Arif Hossain</h1>
            <p className="text-slate-500 font-medium text-lg flex items-center justify-center md:justify-start gap-2">
              <Briefcase size={18} className="text-primary" /> Sales Executive
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm sticky top-28">
            <nav className="flex flex-col gap-1">
              <button 
                onClick={() => setActiveTab("personal")}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
                  activeTab === "personal" 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <UserCircle size={20} /> Personal Info
              </button>
              <button 
                onClick={() => setActiveTab("work")}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
                  activeTab === "work" 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Briefcase size={20} /> Work Details
              </button>
              <button 
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
                  activeTab === "security" 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Key size={20} /> Change Password
              </button>
            </nav>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
            
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="p-8 md:p-10 border-b border-slate-50 bg-slate-50/30">
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Personal Information</h3>
                  <p className="text-slate-400 text-sm mt-1 font-medium">Update your contact details and basic information.</p>
                </div>
                
                <form onSubmit={handlePersonalInfoUpdate} className="p-8 md:p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                      <input 
                        type="text" 
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                      <input 
                        type="text" 
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="email" 
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="tel" 
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Home Address</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-6 top-6 text-slate-400" />
                      <textarea 
                        value={personalInfo.address}
                        onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                        rows={3}
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all resize-none" 
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button type="submit" className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-xl shadow-primary/20">
                      <Save size={16} /> Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Work Details Tab */}
            {activeTab === "work" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                <div className="p-8 md:p-10 border-b border-slate-50 bg-slate-50/30">
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Work Details</h3>
                  <p className="text-slate-400 text-sm mt-1 font-medium">Read-only employment information configured by HR.</p>
                </div>
                
                <div className="p-8 md:p-10 space-y-8 flex-1 bg-slate-50/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-5 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Job Title / Role</p>
                        <p className="text-lg font-black text-slate-800">Sales Executive</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-5 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <Building size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Department</p>
                        <p className="text-lg font-black text-slate-800">Retail & Operations</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-5 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Join Date</p>
                        <p className="text-lg font-black text-slate-800">October 15, 2021</p>
                        <p className="text-xs font-bold text-slate-400 mt-1">2 Years, 1 Month</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-5 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Branch / Location</p>
                        <p className="text-lg font-black text-slate-800">Dhaka HQ</p>
                      </div>
                    </div>

                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 mt-8">
                    <p className="text-sm font-bold text-amber-800">
                      <span className="font-black uppercase tracking-widest text-[10px] block mb-1">Note</span>
                      To request changes to your official work details, please contact your vendor administrator or HR department directly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="p-8 md:p-10 border-b border-slate-50 bg-slate-50/30">
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Security & Password</h3>
                  <p className="text-slate-400 text-sm mt-1 font-medium">Ensure your account uses a strong and secure password.</p>
                </div>
                
                <form onSubmit={handlePasswordUpdate} className="p-8 md:p-10 space-y-8 max-w-2xl">
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="password" 
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          placeholder="Enter your current password"
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900/20 outline-none transition-all" 
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                        <div className="relative">
                          <Key size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" />
                          <input 
                            type="password" 
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                            placeholder="Enter new password"
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all" 
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                        <div className="relative">
                          <CheckCircle2 size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" />
                          <input 
                            type="password" 
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                            placeholder="Re-type new password"
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all" 
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button type="submit" className="px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/20">
                      <Key size={16} /> Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
        
      </div>
    </div>
  );
}
