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
  Plus,
  Package,
  Layers,
  Boxes,
  ShoppingCart,
  Monitor,
  FileText,
  Trash2,
  BadgeDollarSign,
  Truck,
  ScrollText,
  Receipt,
  Undo2,
  UserCircle
} from "lucide-react";

const sidebarGroups = [
  {
    title: "DASHBOARD",
    items: [
      { name: "Main Dashboard", icon: <LayoutDashboard size={18} />, href: "/vendor" },
    ]
  },
  {
    title: "PRODUCT MANAGEMENT",
    items: [
      { name: "Manage Product", icon: <Package size={18} />, href: "/vendor/products" },
      { name: "Categories & Attributes", icon: <Layers size={18} />, href: "/vendor/categories" },
      { name: "Manage Inventory", icon: <Boxes size={18} />, href: "/vendor/inventory" },
    ]
  },
  {
    title: "ORDER MANAGEMENT",
    items: [
      { name: "Orders", icon: <ShoppingCart size={18} />, href: "/vendor/orders" },
      { name: "e POS Billing", icon: <Monitor size={18} />, href: "/vendor/pos" },
      { name: "Invoices", icon: <FileText size={18} />, href: "/vendor/invoices" },
      { name: "Abandoned Cart", icon: <Trash2 size={18} />, href: "/vendor/abandoned" },
      { name: "Transactions", icon: <BadgeDollarSign size={18} />, href: "/vendor/transactions" },
    ]
  },
  {
    title: "PROCUREMENT",
    items: [
      { name: "Suppliers", icon: <Truck size={18} />, href: "/vendor/procurement/suppliers" },
      { name: "Purchase & GRN", icon: <ScrollText size={18} />, href: "/vendor/procurement/purchase" },
      { name: "Purchase Invoice", icon: <Receipt size={18} />, href: "/vendor/procurement/invoice" },
      { name: "Purchase Returns", icon: <Undo2 size={18} />, href: "/vendor/procurement/returns" },
    ]
  },
  {
    title: "USER MANAGEMENT",
    items: [
      { name: "Customer", icon: <UserCircle size={18} />, href: "/vendor/customers" },
    ]
  },
  {
    title: "OTHER",
    items: [
      { name: "Sales Reports", icon: <BarChart3 size={18} />, href: "/vendor/reports" },
      { name: "Settings", icon: <Settings size={18} />, href: "/vendor/settings" },
    ]
  },
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
    <div className="h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative top-0 bottom-0 left-0 z-50
          bg-white border-r border-slate-100 flex flex-col h-full
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-50">
          <div className={`${!isSidebarOpen && "lg:hidden"} transition-all`}>
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

        <div className="flex-grow overflow-y-auto px-4 py-6 custom-scrollbar space-y-6">
          {sidebarGroups.map((group) => (
            <div key={group.title}>
              {isSidebarOpen && (
                <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{group.title}</p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        if (window.innerWidth < 1024) setIsSidebarOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      <span className={isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"}>
                        {item.icon}
                      </span>
                      {isSidebarOpen && (
                        <span className="text-[13px] font-semibold">{item.name}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

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
      <main className="flex-grow flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md min-h-[80px] py-4 border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4 md:gap-8 flex-grow">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-primary transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-slate-800 uppercase tracking-widest leading-none">Vendor Console</h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tighter mt-1">Global Tech • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
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

          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden lg:flex flex-col items-end">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Sales</p>
              <p className="text-xs font-black text-slate-800">৳ 95,500.00</p>
            </div>

            <button className="relative p-2.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>

            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-semibold text-slate-800 uppercase leading-none">Global Tech</p>
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-1.5">Verified Vendor</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-all">
                GT
              </div>
            </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
