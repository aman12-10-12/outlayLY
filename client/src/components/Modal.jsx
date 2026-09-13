import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const Modal = ({ children, isOpen, onClose, title, size = "md" }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#22415A]/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full ${SIZES[size] || SIZES.md} max-h-full overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#F0F8FF] rounded-3xl shadow-[16px_16px_36px_rgba(70,130,180,0.3),-16px_-16px_36px_rgba(255,255,255,0.9)]">
              <div className="flex items-center justify-between p-5 border-b border-[#4682B4]/10">
                <h3 className="text-lg font-semibold text-[#22415A]">{title}</h3>

                <button
                  type="button"
                  className="text-[#4682B4] bg-[#F0F8FF] rounded-full w-8 h-8 inline-flex justify-center items-center shadow-[2px_2px_5px_rgba(70,130,180,0.25),-2px_-2px_5px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_4px_rgba(45,95,135,0.35)] transition-shadow cursor-pointer"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-5 space-y-4">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
