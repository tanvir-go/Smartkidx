"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronDown,
  Building2,
  Plus
} from "lucide-react";

const sidebarItems = [
  { name: "Main Dashboard", icon: <LayoutDashboard size={20} />, href: "/vendor" },
  { name: "My Products", icon: <ShoppingBag size={20} />, href: "/vendor/products" },
  { name: "Sales Reports", icon: <BarChart3 size={20} />, href: "/vendor/reports" },
  { name: "Settings", icon: <Settings size={20} />, href: "/vendor/settings" },
];

const branches = [
  { id: 1, name: "Dhaka Branch", city: "Dhaka" },
  { id: 2, name: "Chittagong Branch", city: "Chittagong" },
  { id: 3, name: "Sylhet Branch", city: "Sylhet" },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white border-r border-slate-100 transition-all duration-300 flex flex-col fixed inset-y-0 z-50`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-50">
          <div className={`${!isSidebarOpen && "hidden"} transition-all`}>
            <Link href="/vendor">
              <span className="text-xl font-black tracking-tighter text-slate-800">SMART<span className="text-primary">KIDS</span></span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -mt-1">Vendor Portal</p>
            </Link>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Branch Selector */}
        {isSidebarOpen && (
          <div className="px-4 pt-6">
            <div className="relative">
              <button 
                onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Branch</p>
                    <p className="text-xs font-bold text-slate-800 mt-1">Select Branch</p>
                  </div>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isBranchDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isBranchDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-xl rounded-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                  {branches.map((branch) => (
                    <Link
                      key={branch.id}
                      href={`/vendor/branch/${branch.id}`}
                      onClick={() => setIsBranchDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">{branch.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{branch.city}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </Link>
                  ))}
                  <div className="h-px bg-slate-50 my-2"></div>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 transition-colors text-xs font-black uppercase tracking-widest">
                    <Plus size={14} /> Add Branch
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <nav className="flex-grow py-6 px-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span className={isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="text-sm font-bold uppercase tracking-wider">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all group"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-wider">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md h-20 border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-8 flex-grow">
            <div>
              <h1 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Vendor Console</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">Global Tech • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="relative w-full max-w-md hidden md:block">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products, orders..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Sales</p>
              <p className="text-xs font-black text-slate-800">৳ 95,500.00</p>
            </div>

            <button className="relative p-2.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-100"></div>

            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black text-slate-800 uppercase leading-none">Global Tech</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Verified Vendor</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-all">
                GT
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
