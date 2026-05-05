"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronDown,
  MapPin,
  CreditCard
} from "lucide-react";
import Image from "next/image";

const sidebarItems = [
  { name: "My Profile", icon: <User size={20} />, href: "/customer" },
  { name: "My Orders", icon: <ShoppingBag size={20} />, href: "/customer/orders" },
  { name: "Wishlist", icon: <Heart size={20} />, href: "/customer/wishlist" },
  { name: "Addresses", icon: <MapPin size={20} />, href: "/customer/addresses" },
  { name: "Payment Methods", icon: <CreditCard size={20} />, href: "/customer/payments" },
  { name: "Settings", icon: <Settings size={20} />, href: "/customer/settings" },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md h-20 border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-primary transition-colors"
          >
            <Menu size={24} />
          </button>
          <Link href="/">
            <Image 
              src="/Smart-Kids-Logo.webp" 
              alt="SmartKids Logo" 
              width={140} 
              height={40} 
              className="h-6 md:h-7 w-auto object-contain"
            />
          </Link>
          <div className="h-6 w-px bg-slate-100 hidden xl:block"></div>
          <div className="hidden sm:block">
            <h1 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">Customer Account</h1>
            <p className="text-[9px] text-primary font-bold uppercase tracking-tighter mt-1">SmartKids Member</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="relative hidden md:block w-48 lg:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          
          <button className="relative p-2.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black text-slate-800 uppercase leading-none">John Smith</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Premium</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary text-xs font-black shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
              JS
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-20 bottom-0 left-0 z-50 lg:z-30
          w-72 bg-white border-r border-slate-100 
          flex flex-col p-6 space-y-2
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <span className={isActive ? "text-white" : "text-slate-400 group-hover:text-primary"}>
                  {item.icon}
                </span>
                <span className="text-sm font-bold uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
          
          <div className="flex-grow"></div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-50 text-red-500 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">Sign Out</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
