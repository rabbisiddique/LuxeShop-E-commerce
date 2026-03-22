'use client';

import React, { useState } from 'react';
import { X, MapPin, Phone, Home, Briefcase, Globe, Save, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAddressModal({ isOpen, onClose }: AddAddressModalProps) {
  const [formData, setFormData] = useState({
    label: 'Home',
    name: '',
    street: '',
    city: '',
    country: 'United States',
    phone: '',
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the address here
    console.log('Adding address:', formData);
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
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E8E8E8] flex items-center justify-between bg-[#FAFAFA]">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0D0D0D]">Add New Address</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#E8E8E8] rounded-full transition-colors"
              >
                <X size={20} className="text-[#9A9A9A]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Address Type Selection */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#4B4B4B]">Address Type</label>
                <div className="flex gap-3">
                  {[
                    { id: 'Home', icon: Home },
                    { id: 'Work', icon: Briefcase },
                    { id: 'Other', icon: MapPin },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, label: type.id })}
                      className={`flex-1 h-11 rounded-xl border flex items-center justify-center gap-2 text-[13px] font-bold transition-all ${
                        formData.label === type.id
                          ? 'bg-[#FFF0EB] border-[#FF6B35] text-[#FF6B35]'
                          : 'bg-white border-[#E8E8E8] text-[#4B4B4B] hover:border-[#FF6B35]/40'
                      }`}
                    >
                      <type.icon size={16} />
                      {type.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#4B4B4B]">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[14px] focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all"
                  placeholder="e.g. Sarah Johnson"
                  required
                />
              </div>

              {/* Street Address */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#4B4B4B]">Street Address</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[14px] focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all"
                  placeholder="e.g. 123 Main Street, Apt 4B"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#4B4B4B]">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[14px] focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all"
                    placeholder="e.g. New York"
                    required
                  />
                </div>
                {/* Country */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#4B4B4B] flex items-center gap-1.5">
                    <Globe size={14} /> Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[14px] focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all appearance-none"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#4B4B4B] flex items-center gap-1.5">
                  <Phone size={14} /> Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 px-4 bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl text-[14px] focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all"
                  placeholder="e.g. +1 (555) 000-0000"
                  required
                />
              </div>

              {/* Default Address Toggle */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-10 h-5 rounded-full transition-colors ${formData.isDefault ? 'bg-[#FF6B35]' : 'bg-[#E8E8E8]'}`} />
                  <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.isDefault ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
                <span className="text-[13px] font-medium text-[#4B4B4B] group-hover:text-[#0D0D0D]">Set as default delivery address</span>
              </label>

              {/* Footer Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-12 rounded-xl border border-[#E8E8E8] text-[14px] font-bold text-[#4B4B4B] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 bg-[#FF6B35] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#E55A25] shadow-lg shadow-[#FF6B35]/20 transition-all"
                >
                  <Plus size={18} />
                  Add Address
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
