"use client";

import { useState } from "react";
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Save,
  Trash2,
  Pencil
} from "lucide-react";
import { toast } from "react-toastify";

export default function CustomerSettingsPage() {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [formData, setFormData] = useState({
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+880 1711-223344",
    dob: "1992-05-15"
  });

  const tabs = [
    { name: "My Profile", icon: <User size={18} /> },
    { name: "Security", icon: <Lock size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
    { name: "Privacy", icon: <Shield size={18} /> },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deletion requested.");
    }
  };

  const handleImageEdit = () => {
    toast.info("Profile picture update feature coming soon!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 uppercase tracking-tight">Account Settings</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage your personal information and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((item) => (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold uppercase tracking-widest transition-all ${
                activeTab === item.name 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-500 hover:bg-white hover:text-slate-800"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "My Profile" ? (
              <form onSubmit={handleSave} className="space-y-8">
                {/* Profile Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-sm flex items-center justify-center text-primary text-2xl font-black relative group">
                    JS
                    <button 
                      type="button"
                      onClick={handleImageEdit}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 uppercase tracking-tight">John Smith</h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase mt-1">Member since October 2023</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-semibold uppercase rounded-full">Premium</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-semibold uppercase rounded-full">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName} 
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                    <input 
                      type="date" 
                      value={formData.dob} 
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button 
                    type="button"
                    onClick={handleDeleteAccount}
                    className="text-[10px] font-semibold text-red-400 uppercase tracking-widest hover:text-red-600 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 size={16} /> Delete Account
                  </button>
                  <button 
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                  {tabs.find(t => t.name === activeTab)?.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 uppercase tracking-tight">{activeTab} Settings</h3>
                <p className="text-slate-400 text-sm font-medium">This section is currently under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
