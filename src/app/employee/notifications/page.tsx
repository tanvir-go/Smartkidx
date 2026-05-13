"use client";

import React, { useState } from "react";
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Package, 
  Clock, 
  Check, 
  Trash2,
  Filter
} from "lucide-react";
import { toast } from "react-toastify";

type NotificationType = "system" | "order" | "inventory" | "success";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    type: "order",
    title: "New Express Order Received",
    message: "Order #ORD-8821 requires immediate processing for same-day delivery in Dhaka.",
    time: "2 mins ago",
    isRead: false
  },
  {
    id: "notif-2",
    type: "inventory",
    title: "Low Stock Alert",
    message: "The 'Advanced Robotics Kit V2' is running low on stock (Only 3 left in inventory).",
    time: "1 hour ago",
    isRead: false
  },
  {
    id: "notif-3",
    type: "system",
    title: "System Maintenance Scheduled",
    message: "The SmartKids ERP will undergo brief maintenance tonight at 2:00 AM.",
    time: "3 hours ago",
    isRead: true
  },
  {
    id: "notif-4",
    type: "success",
    title: "Daily Target Reached",
    message: "Congratulations! Your branch has successfully hit the daily sales target of ৳120,000.",
    time: "5 hours ago",
    isRead: true
  },
  {
    id: "notif-5",
    type: "order",
    title: "Return Request Pending",
    message: "Customer 'Sabrina Rahman' has requested a return for Order #ORD-8710. Please review.",
    time: "Yesterday",
    isRead: true
  }
];

export default function EmployeeNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read.");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.info("Notification dismissed.");
  };

  const filteredNotifications = notifications.filter(n => 
    filter === "all" ? true : !n.isRead
  );

  const getIconForType = (type: NotificationType) => {
    switch(type) {
      case "system": return <Info size={20} />;
      case "order": return <Package size={20} />;
      case "inventory": return <AlertTriangle size={20} />;
      case "success": return <CheckCircle2 size={20} />;
    }
  };

  const getColorForType = (type: NotificationType) => {
    switch(type) {
      case "system": return "bg-blue-50 text-blue-600 border-blue-100";
      case "order": return "bg-purple-50 text-purple-600 border-purple-100";
      case "inventory": return "bg-amber-50 text-amber-600 border-amber-100";
      case "success": return "bg-emerald-50 text-emerald-600 border-emerald-100";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[20px] bg-white border border-slate-100 shadow-sm flex items-center justify-center text-primary relative">
            <Bell size={28} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Notifications</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Stay updated with system alerts and order updates.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="bg-white border border-slate-100 rounded-2xl p-1 flex shadow-sm">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === "all" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === "unread" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
            >
              Unread
            </button>
          </div>
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm ${
              unreadCount > 0 
                ? "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Check size={16} /> Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Bell size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">You're all caught up!</h3>
            <p className="text-slate-400 text-sm mt-2 font-medium">No new notifications to display at this time.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`relative bg-white rounded-[24px] border ${notif.isRead ? 'border-slate-100' : 'border-primary/30 shadow-md shadow-primary/5'} p-6 transition-all duration-300 group`}
            >
              {/* Unread Indicator */}
              {!notif.isRead && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-r-full"></div>
              )}

              <div className="flex items-start gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${getColorForType(notif.type)}`}>
                  {getIconForType(notif.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h4 className={`text-base font-black truncate ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0 whitespace-nowrap">
                      <Clock size={12} /> {notif.time}
                    </span>
                  </div>
                  <p className={`text-sm ${notif.isRead ? 'text-slate-500' : 'text-slate-600 font-medium'} leading-relaxed pr-12`}>
                    {notif.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons (Visible on Hover) */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {!notif.isRead && (
                  <button 
                    onClick={() => markAsRead(notif.id)}
                    className="w-10 h-10 rounded-xl bg-slate-50 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                    title="Mark as read"
                  >
                    <Check size={18} />
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notif.id)}
                  className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
                  title="Dismiss"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
