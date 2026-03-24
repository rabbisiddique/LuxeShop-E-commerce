// src/components/ui/ConfirmDialog.tsx

"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm mx-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Top danger stripe */}
              <div className="h-1.5 w-full bg-gradient-to-r from-rose-400 via-rose-500 to-red-500" />

              {/* Content */}
              <div className="p-6">
                {/* Close button */}
                <button
                  onClick={onCancel}
                  className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    {/* Outer ring */}
                    <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center">
                      {/* Inner ring */}
                      <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center">
                        <Trash2 className="w-6 h-6 text-rose-500" />
                      </div>
                    </div>
                    {/* Alert badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                      <AlertTriangle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-neutral-950 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Warning note */}
                <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <p className="text-xs text-rose-600 font-medium">
                    This action is permanent and cannot be reversed.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  {/* Cancel */}
                  <button
                    onClick={onCancel}
                    disabled={isLoading}
                    className="flex-1 py-3 text-sm font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-2xl transition-all disabled:opacity-50"
                  >
                    {cancelLabel}
                  </button>

                  {/* Confirm */}
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 py-3 text-sm font-bold text-white rounded-2xl transition-all disabled:opacity-60 relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, #f43f5e, #e11d48)",
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />

                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Deleting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        {confirmLabel}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
