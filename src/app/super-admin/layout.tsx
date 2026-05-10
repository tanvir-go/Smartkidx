"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Boxes, 
  ShoppingCart, 
  Monitor, 
  FileText, 
  Trash2, 
  BadgeDollarSign,
  Users,
  ShieldCheck,
  Store,
  UserCircle,
  BarChart3,
  LineChart,
  Trophy,
  Wallet,
  ArrowDownCircle,
  Undo2,
  Receipt,
  TicketPercent,
  Zap,
  Star,
  Tags,
  HelpCircle,
  Lock,
  ScrollText,
  Mail,
  LifeBuoy,
  Settings,
  Globe,
  Code,
  Wrench,
  CreditCard,
  Puzzle,
  Share2,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Plus,
  LogOut,
  Truck
} from "lucide-react";
import { toast } from "react-toastify";
import CreateOrderModal from "@/components/super-admin/CreateOrderForm";

const sidebarGroups = [
  {
    title: "PRODUCT MANAGEMENT",
    items: [
      { name: "Manage Product", icon: <Package size={18} />, href: "/super-admin/products" },
      { name: "Categories & Attributes", icon: <Layers size={18} />, href: "/super-admin/categories" },
      { name: "Manage Inventory", icon: <Boxes size={18} />, href: "/super-admin/inventory" },
    ]
  },
  {
    title: "PROCUREMENT",
    items: [
      { name: "Suppliers", icon: <Truck size={18} />, href: "/super-admin/procurement/suppliers" },
      { name: "Purchase & GRN", icon: <ScrollText size={18} />, href: "/super-admin/procurement/purchase" },
      { name: "Purchase Invoice", icon: <Receipt size={18} />, href: "/super-admin/procurement/invoice" },
      { name: "Purchase Returns", icon: <Undo2 size={18} />, href: "/super-admin/procurement/returns" },
    ]
  },
  {
    title: "ORDER MANAGEMENT",
    items: [
      { name: "Orders", icon: <ShoppingCart size={18} />, href: "/super-admin/orders" },
      { name: "e POS Billing", icon: <Monitor size={18} />, href: "/super-admin/pos" },
      { name: "Invoices", icon: <FileText size={18} />, href: "/super-admin/invoices" },
      { name: "Abandoned Cart", icon: <Trash2 size={18} />, href: "/super-admin/abandoned" },
      { name: "Transactions", icon: <BadgeDollarSign size={18} />, href: "/super-admin/transactions" },
    ]
  },
  {
    title: "USER MANAGEMENT",
    items: [
      { name: "Users", icon: <Users size={18} />, href: "/super-admin/users" },
      { name: "Admin", icon: <ShieldCheck size={18} />, href: "/super-admin/admins" },
      { name: "Sellers", icon: <Store size={18} />, href: "/super-admin/sellers" },
      { name: "Customer", icon: <UserCircle size={18} />, href: "/super-admin/customers" },
    ]
  },
  {
    title: "REPORTS & ANALYTICS",
    items: [
      { name: "Sales reports", icon: <BarChart3 size={18} />, href: "/super-admin/reports/sales" },
      { name: "Seller performance", icon: <LineChart size={18} />, href: "/super-admin/reports/sellers" },
      { name: "Top products", icon: <Trophy size={18} />, href: "/super-admin/reports/products" },
    ]
  },
  {
    title: "FINANCE MANAGEMENT",
    items: [
      { name: "Earning", icon: <Wallet size={18} />, href: "/super-admin/finance/earning" },
      { name: "Withdraws", icon: <ArrowDownCircle size={18} />, href: "/super-admin/finance/withdraws" },
      { name: "Refunds", icon: <Undo2 size={18} />, href: "/super-admin/finance/refunds" },
      { name: "Tax", icon: <Receipt size={18} />, href: "/super-admin/finance/tax" },
    ]
  },
  {
    title: "PROMOTIONAL DEALS",
    items: [
      { name: "Coupon", icon: <TicketPercent size={18} />, href: "/super-admin/deals/coupons" },
      { name: "Flash Sales", icon: <Zap size={18} />, href: "/super-admin/deals/flash" },
      { name: "Featured Deal", icon: <Star size={18} />, href: "/super-admin/deals/featured" },
      { name: "Clearance Deal", icon: <Tags size={18} />, href: "/super-admin/deals/clearance" },
    ]
  },
  {
    title: "CONTENT MANAGEMENT",
    items: [
      { name: "FAQ", icon: <HelpCircle size={18} />, href: "/super-admin/content/faq" },
      { name: "Privacy Policy", icon: <Lock size={18} />, href: "/super-admin/content/privacy" },
      { name: "Terms & Condition", icon: <ScrollText size={18} />, href: "/super-admin/content/terms" },
    ]
  },
  {
    title: "HELP & SUPPORT",
    items: [
      { name: "Inbox", icon: <Mail size={18} />, href: "/super-admin/support/inbox" },
      { name: "Support & Ticket", icon: <LifeBuoy size={18} />, href: "/super-admin/support/tickets" },
    ]
  },
  {
    title: "SETTINGS",
    items: [
      { name: "General Settings", icon: <Settings size={18} />, href: "/super-admin/settings" },
      { name: "Shop Settings", icon: <Store size={18} />, href: "/super-admin/settings/shop" },
      { name: "SEO Settings", icon: <Globe size={18} />, href: "/super-admin/settings/seo" },
      { name: "Payment API", icon: <Code size={18} />, href: "/super-admin/settings/payment" },
      { name: "Maintains Settings", icon: <Wrench size={18} />, href: "/super-admin/settings/maintains" },
    ]
  },
  {
    title: "3RD PARTY SETUP",
    items: [
      { name: "Payment method", icon: <CreditCard size={18} />, href: "/super-admin/setup/payments" },
      { name: "API Integration", icon: <Puzzle size={18} />, href: "/super-admin/setup/api" },
      { name: "Marketing Tools", icon: <Share2 size={18} />, href: "/super-admin/setup/marketing" },
    ]
  },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <div className="h-screen bg-[#F8F9FD] flex flex-col lg:flex-row overflow-hidden">
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
          ${isSidebarOpen ? "w-[260px] translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`${!isSidebarOpen && "lg:hidden"} transition-all`}>
            <Link href="/super-admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black">S</div>
              <span className="text-xl font-black tracking-tight text-slate-800">SmartKids</span>
            </Link>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-4 py-2 custom-scrollbar">
          <div className="mb-4">
            <Link
              href="/super-admin"
              onClick={() => {
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${
                pathname === "/super-admin" 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <LayoutDashboard size={18} />
              {isSidebarOpen && <span className="text-[13px] font-semibold">Dashboard</span>}
            </Link>
          </div>

          {sidebarGroups.map((group) => (
            <div key={group.title} className="mb-6">
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
          <div className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-50 mb-3 ${!isSidebarOpen && "justify-center"}`}>
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">SA</div>
            {isSidebarOpen && (
              <div className="flex-grow overflow-hidden">
                <p className="text-xs font-black text-slate-800 truncate">Admin User</p>
                <p className="text-[10px] text-slate-400 font-bold truncate">admin@smartkids.com</p>
              </div>
            )}
            {isSidebarOpen && (
              <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors">
                <LogOut size={16} />
              </button>
            )}
          </div>
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
              <h1 className="text-sm font-semibold text-slate-800 uppercase tracking-widest leading-none">Super Admin</h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tighter mt-1">SmartKids Network • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="relative w-full max-w-md hidden md:block">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <button 
              onClick={() => setIsCreateOrderOpen(true)}
              className="bg-primary text-white px-3 md:px-5 py-2 rounded-lg font-semibold uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Plus size={16} /> <span className="hidden sm:inline">New Order</span>
            </button>

            <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>

            <button className="relative p-2.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-2 group cursor-pointer border-l border-slate-100 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-semibold text-slate-800 uppercase leading-none">John Doe</p>
                <button onClick={handleLogout} className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-1 hover:text-red-500 transition-colors">Sign Out</button>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary text-xs font-black group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                JD
              </div>
            </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </div>

        <CreateOrderModal 
          isOpen={isCreateOrderOpen} 
          onClose={() => setIsCreateOrderOpen(false)}
          onSave={(data: any) => {
            console.log("Order Data:", data);
            setIsCreateOrderOpen(false);
          }}
        />
      </main>
    </div>
  );
}
