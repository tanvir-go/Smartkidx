"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Authentication Logic
    setTimeout(() => {
      if (username === "superadmin" && password === "admin123") {
        localStorage.setItem("userRole", "super-admin");
        router.push("/super-admin");
      } else if (username === "vendor" && password === "vendor123") {
        localStorage.setItem("userRole", "vendor");
        router.push("/vendor");
      } else if (username === "customer" && password === "customer123") {
        localStorage.setItem("userRole", "customer");
        router.push("/customer");
      } else {
        toast.error("Invalid credentials. Try superadmin/admin123, vendor/vendor123, or customer/customer123");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Image 
                src="/Smart-Kids-Logo.webp" 
                alt="SmartKids Logo" 
                width={180} 
                height={50} 
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-500 text-sm">Please enter your details to sign in.</p>
          </div>

          {/* Prominent Mock Credentials Callout */}
          <div className="mb-8 bg-slate-900 rounded-xl p-4 shadow-inner border border-slate-800">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 flex items-center justify-between">
              Quick Login (Dev Mode)
              <span className="text-slate-500 font-normal">Click to auto-fill</span>
            </p>
            <div className="space-y-2">
              <button 
                onClick={() => { setUsername("superadmin"); setPassword("admin123"); }}
                className="w-full flex justify-between text-[10px] font-bold group hover:text-primary transition-colors"
              >
                <span className="text-slate-400 group-hover:text-slate-300">SUPER ADMIN:</span>
                <span className="text-white">superadmin / admin123</span>
              </button>
              <button 
                onClick={() => { setUsername("vendor"); setPassword("vendor123"); }}
                className="w-full flex justify-between text-[10px] font-bold group hover:text-primary transition-colors"
              >
                <span className="text-slate-400 group-hover:text-slate-300">VENDOR:</span>
                <span className="text-white">vendor / vendor123</span>
              </button>
              <button 
                onClick={() => { setUsername("customer"); setPassword("customer123"); }}
                className="w-full flex justify-between text-[10px] font-bold group hover:text-primary transition-colors"
              >
                <span className="text-slate-400 group-hover:text-slate-300">CUSTOMER:</span>
                <span className="text-white">customer / customer123</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" />
                <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Remember me</span>
              </label>
              <Link href="#" className="font-bold text-primary hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link href="#" className="font-bold text-primary hover:underline">Create Account</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
