"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Trash2 } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType?: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, itemName, itemType = "item" }: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden border border-white/20 p-10 text-center"
          >
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6 shadow-inner">
              <AlertTriangle size={40} />
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Confirm Deletion</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
              Are you sure you want to permanently remove <span className="text-slate-800 font-black italic">"{itemName}"</span> from your {itemType} database? This action cannot be reversed.
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={onConfirm}
                className="w-full py-4 bg-red-500 text-white font-black uppercase tracking-widest text-[11px] rounded-[20px] hover:bg-red-600 transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-2 group"
              >
                <Trash2 size={16} className="group-hover:rotate-12 transition-transform" />
                Proceed with Deletion
              </button>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[11px] rounded-[20px] hover:bg-slate-100 transition-all"
              >
                Cancel Action
              </button>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
