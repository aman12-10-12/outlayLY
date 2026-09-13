import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { CharAvatar } from "../Cards/CharAvatar";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] sticky top-[61px] z-20 bg-gradient-to-b from-[#F7FBFF] to-[#EAF3FB] border-r border-[#4682B4]/10 p-5 flex flex-col justify-between">
      {/* Profile Section */}
      <div>
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-6">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover shadow-[6px_6px_14px_rgba(70,130,180,0.25),-6px_-6px_14px_rgba(255,255,255,0.9)]"
              />
            ) : (
              <CharAvatar fullName={user?.fullName} size="2xl" />
            )}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-[2px_2px_5px_rgba(70,130,180,0.3)]">
              <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
            </div>
          </motion.div>
          <h5 className="text-[#22415A] font-semibold text-center leading-6 truncate max-w-[80%]">
            {user?.fullName || "User"}
          </h5>
          <p className="text-sm text-[#4A6B84] font-medium">
            Welcome to <span className="text-[#4682B4] font-bold">OutlayLY</span>
          </p>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {SIDE_MENU_DATA.map((item, index) => {
            const isActive = activeMenu === item.label;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 text-sm font-medium transition-all duration-200 py-3 px-5 rounded-xl ${
                  isActive
                    ? "text-white bg-[#4682B4] shadow-[4px_4px_10px_rgba(70,130,180,0.25),-4px_-4px_10px_rgba(255,255,255,0.85)]"
                    : "text-[#4A6B84] hover:bg-white/60"
                }`}
                onClick={() => handleClick(item.path)}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive ? "bg-white/20 text-white" : "bg-[#F0F8FF] text-[#4682B4] shadow-[2px_2px_5px_rgba(70,130,180,0.2),-2px_-2px_5px_rgba(255,255,255,0.85)]"
                  }`}
                >
                  <item.icon className="text-lg" />
                </div>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-1.5 h-5 bg-white/70 rounded-full ml-auto"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="w-full mt-4 flex items-center gap-3 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 py-3 px-5 rounded-xl transition-colors group"
      >
        <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
          <FiLogOut className="text-lg" />
        </div>
        <span>Sign Out</span>
      </motion.button>
    </div>
  );
};

export default SideMenu;
