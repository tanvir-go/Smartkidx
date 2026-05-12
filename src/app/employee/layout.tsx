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
  UserCircle,
  Users,
  CheckSquare,
  TrendingUp,
  PlusCircle,
  RefreshCw,
  ClipboardList,
  Edit,
  Headphones,
  Notebook,
  Gift,
  FileSpreadsheet,
  MapPin,
  Box,
  Send,
  PieChart,
  Activity,
  UserCheck,
  Key,
  History,
  Clock,
  CreditCard
} from "lucide-react";

const sidebarGroups = [
  {
    title: "DASHBOARD",
    items: [
      { name: "Overview", icon: <LayoutDashboard size={18} />, href: "/employee" },
      { name: "Today Sales", icon: <BadgeDollarSign size={18} />, href: "/employee/sales/today" },
      { name: "Assigned Tasks", icon: <CheckSquare size={18} />, href: "/employee/tasks" },
      { name: "Notifications", icon: <Bell size={18} />, href: "/employee/notifications" },
      { name: "Recent Orders", icon: <ShoppingCart size={18} />, href: "/employee/orders/recent" },
      { name: "Performance Summary", icon: <TrendingUp size={18} />, href: "/employee/performance" },
    ]
  },
  {
    title: "SALES & ORDERS",
    items: [
      { name: "Manage Orders", icon: <Package size={18} />, href: "/employee/orders" },
      { name: "Create Orders", icon: <PlusCircle size={18} />, href: "/employee/orders/create" },
      { name: "POS Billing", icon: <Monitor size={18} />, href: "/employee/pos" },
      { name: "Invoices", icon: <FileText size={18} />, href: "/employee/invoices" },
      { name: "Transactions", icon: <CreditCard size={18} />, href: "/employee/transactions" },
      { name: "Order Status Update", icon: <RefreshCw size={18} />, href: "/employee/orders/status" },
      { name: "Return Requests", icon: <Undo2 size={18} />, href: "/employee/returns" },
    ]
  },
  {
    title: "PRODUCT ACCESS",
    items: [
      { name: "View Products", icon: <Boxes size={18} />, href: "/employee/products" },
      { name: "Product Stock View", icon: <Layers size={18} />, href: "/employee/inventory" },
      { name: "Inventory Requests", icon: <ClipboardList size={18} />, href: "/employee/inventory/requests" },
    ]
  },
  {
    title: "CUSTOMER MANAGEMENT",
    items: [
      { name: "Customers List", icon: <Users size={18} />, href: "/employee/customers" },
      { name: "Customer Support", icon: <Headphones size={18} />, href: "/employee/support" },
      { name: "Customer Notes", icon: <Notebook size={18} />, href: "/employee/customers/notes" },
      { name: "Loyalty / Rewards View", icon: <Gift size={18} />, href: "/employee/rewards" },
    ]
  },
  {
    title: "PROCUREMENT ACCESS",
    items: [
      { name: "Suppliers View", icon: <Truck size={18} />, href: "/employee/procurement/suppliers" },
      { name: "Purchase Requests", icon: <FileSpreadsheet size={18} />, href: "/employee/procurement/requests" },
      { name: "GRN Access", icon: <ScrollText size={18} />, href: "/employee/procurement/grn" },
      { name: "Purchase Invoice View", icon: <Receipt size={18} />, href: "/employee/procurement/invoice" },
      { name: "Purchase Returns", icon: <Undo2 size={18} />, href: "/employee/procurement/returns" },
    ]
  },
  {
    title: "DELIVERY / OPERATIONS",
    items: [
      { name: "Shipment Tracking", icon: <MapPin size={18} />, href: "/employee/delivery/tracking" },
      { name: "Delivery Status", icon: <Truck size={18} />, href: "/employee/delivery/status" },
      { name: "Packaging Queue", icon: <Box size={18} />, href: "/employee/delivery/packaging" },
      { name: "Dispatch Orders", icon: <Send size={18} />, href: "/employee/delivery/dispatch" },
    ]
  },
  {
    title: "REPORTS",
    items: [
      { name: "Daily Sales Report", icon: <BarChart3 size={18} />, href: "/employee/reports/daily" },
      { name: "Monthly Sales", icon: <PieChart size={18} />, href: "/employee/reports/monthly" },
      { name: "Product Performance", icon: <Activity size={18} />, href: "/employee/reports/products" },
      { name: "Employee Performance", icon: <UserCheck size={18} />, href: "/employee/reports/employee" },
    ]
  },
  {
    title: "ACCOUNT & PROFILE",
    items: [
      { name: "My Profile", icon: <UserCircle size={18} />, href: "/employee/profile" },
      { name: "Change Password", icon: <Key size={18} />, href: "/employee/settings/password" },
      { name: "Attendance", icon: <Clock size={18} />, href: "/employee/attendance" },
      { name: "Activity Logs", icon: <History size={18} />, href: "/employee/activity" },
    ]
  }
];

const branches = [
  { id: 1, name: "Dhaka Branch", city: "Dhaka" },
  { id: 2, name: "Chittagong Branch", city: "Chittagong" },
  { id: 3, name: "Sylhet Branch", city: "Sylhet" },
];

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [activeRole, setActiveRole] = useState("Admin Employee"); // For testing RBAC
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const getFilteredSidebarGroups = () => {
    if (activeRole === "Admin Employee") return sidebarGroups;

    return sidebarGroups.map(group => {
      let isGroupVisible = false;
      
      if (activeRole === "Manager") {
        isGroupVisible = true;
      } else if (activeRole === "Sales Executive") {
        isGroupVisible = ["SALES & ORDERS", "CUSTOMER MANAGEMENT", "DASHBOARD", "REPORTS", "ACCOUNT & PROFILE"].includes(group.title);
      } else if (activeRole === "Inventory Manager") {
        isGroupVisible = ["PRODUCT ACCESS", "DASHBOARD", "REPORTS", "ACCOUNT & PROFILE"].includes(group.title);
      } else if (activeRole === "Procurement Officer") {
        isGroupVisible = ["PROCUREMENT ACCESS", "DASHBOARD", "REPORTS", "ACCOUNT & PROFILE"].includes(group.title);
      } else if (activeRole === "Delivery Staff") {
        isGroupVisible = ["DELIVERY / OPERATIONS", "DASHBOARD", "ACCOUNT & PROFILE"].includes(group.title);
      } else {
        isGroupVisible = ["DASHBOARD", "ACCOUNT & PROFILE"].includes(group.title);
      }

      if (!isGroupVisible) return null;

      const filteredItems = group.items.filter(item => {
        if (item.name === "Performance Summary" && activeRole !== "Manager") return false;
        if (["Invoices", "Transactions", "Return Requests"].includes(item.name) && activeRole !== "Manager") return false;
        if (["Add Products", "Edit Products", "Inventory Requests"].includes(item.name) && !["Inventory Manager", "Manager"].includes(activeRole)) return false;
        if (["Customer Support", "Customer Notes", "Loyalty / Rewards View"].includes(item.name) && activeRole !== "Manager") return false;
        if (["Monthly Sales", "Product Performance", "Employee Performance"].includes(item.name) && activeRole !== "Manager") return false;
        if (item.name === "Activity Logs" && activeRole !== "Manager") return false;
        return true;
      });

      if (filteredItems.length === 0) return null;

      return {
        ...group,
        items: filteredItems
      };
    }).filter(Boolean) as typeof sidebarGroups;
  };

  const filteredSidebarGroups = getFilteredSidebarGroups();

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
            <Link href="/employee">
              <span className="text-xl font-black tracking-tighter text-slate-800">SMART<span className="text-primary">KIDS</span></span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -mt-1">Employee Portal</p>
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
                      href={`/employee/branch/${branch.id}`}
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
          {filteredSidebarGroups.map((group) => (
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
              <h1 className="text-sm font-semibold text-slate-800 uppercase tracking-widest leading-none">Employee Console</h1>
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
                <select 
                  value={activeRole} 
                  onChange={(e) => setActiveRole(e.target.value)}
                  className="text-[11px] font-semibold text-slate-800 uppercase leading-none bg-transparent outline-none cursor-pointer hover:text-primary transition-colors appearance-none"
                >
                  <option value="Admin Employee">Admin Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="Inventory Manager">Inventory Manager</option>
                  <option value="Procurement Officer">Procurement Officer</option>
                  <option value="Delivery Staff">Delivery Staff</option>
                </select>
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center justify-end gap-1">Simulate Role <ChevronDown size={10}/></p>
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
