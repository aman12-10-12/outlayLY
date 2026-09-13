import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  };

  return (
    <div className="mb-6 relative inline-block">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-[#F0F8FF] text-[#4682B4] rounded-xl shadow-[3px_3px_8px_rgba(70,130,180,0.25),-3px_-3px_8px_rgba(255,255,255,0.9)] overflow-hidden">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12 object-cover" />
          ) : (
            <LuImage />
          )}
        </div>
        <p className="text-sm font-medium text-[#2F5F82]">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 z-50 p-2 rounded-2xl bg-[#F0F8FF] shadow-[10px_10px_24px_rgba(70,130,180,0.28),-10px_-10px_24px_rgba(255,255,255,0.9)]"
            >
              <button
                className="w-7 h-7 flex items-center justify-center bg-[#F0F8FF] text-[#4682B4] rounded-full absolute -top-2 -right-2 cursor-pointer shadow-[2px_2px_5px_rgba(70,130,180,0.3),-2px_-2px_5px_rgba(255,255,255,0.9)]"
                onClick={() => setIsOpen(false)}
                aria-label="Close emoji picker"
              >
                <LuX size={14} />
              </button>

              <EmojiPicker open={isOpen} onEmojiClick={handleEmojiSelect} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiPickerPopup;
