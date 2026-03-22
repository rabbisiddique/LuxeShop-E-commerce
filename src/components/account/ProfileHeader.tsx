import React, { useState } from 'react';
import { Calendar, Crown, Edit3 } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

export default function ProfileHeader() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Hardcoded data
  const user = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "SJ",
    memberSince: "March 2023",
    totalOrders: 24,
    totalSpent: "$1,847",
    loyaltyPoints: 2340,
    tier: "Gold Member",
    progress: 78 // (2340/3000)
  };

  return (
    <div className="bg-[#0D0D0D] rounded-[16px] overflow-hidden relative mb-6">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{ 
          backgroundImage: 'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#FF6B35]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, #FFFFFF 0, #FFFFFF 1px, transparent 0, transparent 50%)',
          backgroundSize: '10px 10px'
        }} 
      />

      <div className="relative z-10 p-6 lg:p-8">
        {/* TOP ROW */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          {/* Left — Avatar + Basic Info */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E55A25] flex items-center justify-center border-[3px] border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                <span className="font-['Playfair_Display'] text-[28px] font-bold text-white leading-none">
                  {user.avatar}
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#16A34A] rounded-full border-2 border-[#0D0D0D]" />
            </div>

            <div>
              <h1 className="font-['Playfair_Display'] text-2xl font-bold text-white leading-tight">
                {user.name}
              </h1>
              <p className="text-[14px] text-[#9A9A9A] mt-1">{user.email}</p>
              <div className="flex items-center gap-1.5 text-[12px] text-[#9A9A9A] mt-1.5">
                <Calendar size={12} />
                <span>Member since {user.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Right — Tier Badge + Edit */}
          <div className="flex flex-col items-end gap-3 self-end sm:self-start">
            <div className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-[0_4px_12px_rgba(217,119,6,0.4)]">
              <Crown size={14} className="text-white" />
              <span className="text-[12px] font-bold text-white uppercase tracking-wider">
                {user.tier}
              </span>
            </div>

            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-all"
            >
              <Edit3 size={14} />
              <span className="text-[13px] font-medium">Edit Profile</span>
            </button>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="mt-7 pt-6 border-t border-white/10 grid grid-cols-3 gap-0">
          <div className="flex flex-col items-center px-4 border-right border-white/10">
            <div className="text-[28px] font-bold text-white animate-in fade-in slide-in-from-bottom-2 duration-700">
              {user.totalOrders}
            </div>
            <div className="text-[12px] text-[#9A9A9A] mt-1 uppercase tracking-[0.6px] font-medium">
              Orders Placed
            </div>
          </div>

          <div className="flex flex-col items-center px-4 border-x border-white/10">
            <div className="text-[28px] font-bold text-white animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
              {user.totalSpent}
            </div>
            <div className="text-[12px] text-[#9A9A9A] mt-1 uppercase tracking-[0.6px] font-medium">
              Total Spent
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="text-[28px] font-bold text-[#FF6B35] flex items-center animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
              <span className="text-[20px] mr-1">+</span>{user.loyaltyPoints}
              <span className="text-[14px] ml-1 font-medium">pts</span>
            </div>
            <div className="text-[12px] text-[#9A9A9A] mt-1 uppercase tracking-[0.6px] font-medium">
              Loyalty Points
            </div>
          </div>
        </div>

        {/* LOYALTY PROGRESS BAR */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] font-semibold text-[#D97706]">{user.tier}</span>
            <span className="text-[12px] text-[#9A9A9A]">660 pts to Platinum</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${user.progress}%` }}
            />
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={user}
      />
    </div>
  );
}
