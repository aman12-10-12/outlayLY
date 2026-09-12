import React from "react";
import { LuTrendingUpDown, LuWalletMinimal } from "react-icons/lu";

import CARD_2 from "../../assets/images/card2.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-screen md:w-[60vw] px-12 pt-8 pb-12 bg-gradient-to-br from-[#F7FBFF] to-[#DCEBF7]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#F0F8FF] flex items-center justify-center text-[#4682B4] shadow-[3px_3px_7px_rgba(70,130,180,0.25),-3px_-3px_7px_rgba(255,255,255,0.9)]">
            <LuWalletMinimal size={16} />
          </div>
          <h2 className="text-lg font-semibold text-[#22415A]">OutlayLY</h2>
        </div>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] bg-[#F0F8FF] overflow-hidden p-8 relative">
        <div className="w-56 h-56 rounded-full bg-[#87CEEB]/25 blur-3xl absolute -top-10 -left-10" />
        <div className="w-64 h-64 rounded-full bg-[#00CED1]/20 blur-3xl absolute top-[35%] -right-16" />
        <div className="w-56 h-56 rounded-full bg-[#4682B4]/15 blur-3xl absolute -bottom-10 -left-10" />

        <div className="grid grid-cols-1 z-20 relative">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
          />
        </div>

        <img
          src={CARD_2}
          alt="Expense tracking overview illustration"
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-[0_20px_40px_rgba(70,130,180,0.25)] rounded-2xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex gap-5 bg-[#F0F8FF] p-4 rounded-2xl shadow-[6px_6px_16px_rgba(70,130,180,0.25),-6px_-6px_16px_rgba(255,255,255,0.9)] relative z-10">
      <div className="w-12 h-12 flex items-center justify-center text-[22px] text-white rounded-2xl shadow-[3px_3px_8px_rgba(70,130,180,0.3)] flex-shrink-0"
        style={{ backgroundColor: "#4682B4" }}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-[#4A6B84] mb-1">{label}</h6>
        <span className="text-[20px] font-semibold text-[#22415A]">₹{value}</span>
      </div>
    </div>
  );
};
