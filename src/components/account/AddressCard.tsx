'use client';

import React, { useState } from 'react';
import { MapPin, Phone, CheckCircle, Edit2, Trash2, Copy, MoreVertical, Plus } from 'lucide-react';
import AddAddressModal from './AddAddressModal';

export default function AddressCard() {
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addresses = [
    {
      id: '1',
      label: "Home",
      name: "Sarah Johnson",
      street: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
      icon: "🏠"
    },
    {
      id: '2',
      label: "Work",
      name: "Sarah Johnson",
      street: "456 Business Ave, Floor 12",
      city: "New York, NY 10022",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false,
      icon: "🏢"
    }
  ];

  return (
    <div className="w-full">
      <header className="mb-6">
        <h2 className="font-['Playfair_Display'] text-[24px] font-bold text-[#0D0D0D]">Saved Addresses</h2>
        <p className="text-[14px] text-[#9A9A9A] mt-1">Manage your delivery addresses</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div 
            key={address.id}
            className={`
              bg-white rounded-[14px] p-5 transition-all duration-200 relative
              ${address.isDefault 
                ? 'border-[1.5px] border-[#FF6B35] shadow-[0_0_0_3px_rgba(255,107,53,0.08)]' 
                : 'border-[1.5px] border-[#E8E8E8] hover:border-[#FF6B35]/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
              }
            `}
          >
            {/* CARD HEADER */}
            <div className="flex items-center justify-between mb-4">
              <div className={`
                flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[12px] font-bold
                ${address.isDefault ? 'bg-[#FFF0EB] border-[#FF6B35] text-[#FF6B35]' : 'bg-[#F5F5F5] border-[#E8E8E8] text-[#4B4B4B]'}
              `}>
                <span>{address.icon}</span>
                <span>{address.label}</span>
              </div>

              <div className="relative">
                <button 
                  onClick={() => setShowMenu(showMenu === address.id ? null : address.id)}
                  className="p-1 text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors"
                >
                  <MoreVertical size={16} />
                </button>

                {showMenu === address.id && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#E8E8E8] rounded-[10px] shadow-xl z-20 p-1 animate-in fade-in zoom-in-95 duration-150">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#1F1F1F] hover:bg-[#FAFAFA] rounded-md transition-colors">
                      <Edit2 size={14} /> Edit address
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#1F1F1F] hover:bg-[#FAFAFA] rounded-md transition-colors">
                      <Copy size={14} /> Duplicate
                    </button>
                    <div className="h-[1px] bg-[#F5F5F5] my-1" />
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#DC2626] hover:bg-[#FEF2F2] rounded-md transition-colors">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ADDRESS BODY */}
            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-bold text-[#0D0D0D]">{address.name}</span>
              
              <div className="flex items-start gap-1.5">
                <MapPin size={13} className="text-[#9A9A9A] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] text-[#4B4B4B]">{address.street}</span>
                  <span className="text-[13px] text-[#4B4B4B]">{address.city}, {address.country}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-[#9A9A9A]" />
                <span className="text-[13px] text-[#4B4B4B]">{address.phone}</span>
              </div>
            </div>

            {/* CARD FOOTER */}
            <div className="mt-4 pt-3.5 border-t border-[#F5F5F5] flex items-center justify-between">
              {address.isDefault ? (
                <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#16A34A]">
                  <CheckCircle size={13} />
                  <span>Default Address</span>
                </div>
              ) : (
                <button className="text-[12px] font-medium text-[#9A9A9A] hover:text-[#FF6B35] transition-colors">
                  Set as default
                </button>
              )}

              <button className="flex items-center gap-1.5 text-[12px] font-bold text-[#4B4B4B] hover:text-[#FF6B35] transition-colors">
                <Edit2 size={13} />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}

        {/* ADD NEW ADDRESS CARD */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white border-[1.5px] border-dashed border-[#E8E8E8] rounded-[14px] min-height-[180px] flex flex-col items-center justify-center p-6 group hover:border-[#FF6B35] hover:bg-[#FFF0EB]/30 transition-all duration-200"
        >
          <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex items-center justify-center group-hover:bg-[#FFF0EB] transition-colors">
            <Plus size={24} className="text-[#9A9A9A] group-hover:text-[#FF6B35] transition-colors" />
          </div>
          <span className="text-[14px] font-bold text-[#4B4B4B] mt-3 group-hover:text-[#FF6B35] transition-colors">
            Add New Address
          </span>
          <span className="text-[12px] text-[#9A9A9A] mt-1">Up to 5 addresses</span>
        </button>
      </div>

      <AddAddressModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}
