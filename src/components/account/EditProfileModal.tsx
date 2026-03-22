'use client';

import React, { useState } from 'react';
import { X, Camera, Save, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export default function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the data here
    console.log('Saving profile:', formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E8E8E8] flex items-center justify-between bg-[#FAFAFA]">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0D0D0D]">Edit Profile</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#E8E8E8] rounded-full transition-colors"
              >
                <X size={20} className="text-[#9A9A9A]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E55A25] flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="font-['Playfair_Display'] text-[32px] font-bold text-white">
                      {user.avatar}
                    </span>
                  </div>
                  <button 
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-[#0D0D0D] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-[#FF6B35] transition-colors"
                  >
                    <Camera size={14} />
                  </button>
                </div>
                <p className="text-[12px] text-[#9A9A9A]">Click the camera to change photo</p>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#4B4B4B] flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[14px] focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#4B4B4B] flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[14px] focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-11 rounded-xl border border-[#E8E8E8] text-[14px] font-bold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#E55A25] shadow-lg shadow-[#FF6B35]/20 transition-all"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
