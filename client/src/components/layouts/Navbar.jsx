import React, { useState, useEffect, useRef } from "react";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineQuestionMarkCircle,
  HiOutlineMail,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlinePaperAirplane
} from "react-icons/hi";
import { LuWalletMinimal } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import SideMenu from "./SideMenu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: ''
  });
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const modalVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.98 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post(API_PATHS.SUPPORT.SUBMIT_REPORT, formData);
      setReportSubmitted(true);
      resetTimeoutRef.current = setTimeout(() => {
        setFormData({ name: '', email: '', issue: '' });
        setReportSubmitted(false);
        setShowReportForm(false);
        setOpenSupport(false);
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send report. Please try again.");
    }
  };

  const handleReportClick = () => {
    setShowReportForm(true);
  };

  const handleBackToSupport = () => {
    setShowReportForm(false);
  };

  const closeSupport = () => {
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    setOpenSupport(false);
    setShowReportForm(false);
    setReportSubmitted(false);
  };

  return (
    <>
      {/* Navbar */}
      <header
        className={`sticky top-0 z-[1000] transition-all duration-300 bg-[#F7FBFF] ${
          scrolled
            ? "shadow-[0_4px_14px_rgba(70,130,180,0.15)]"
            : "border-b border-[#4682B4]/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#F0F8FF] flex items-center justify-center text-[#4682B4] shadow-[3px_3px_7px_rgba(70,130,180,0.25),-3px_-3px_7px_rgba(255,255,255,0.9)]">
                <LuWalletMinimal size={18} />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-[#22415A]">
                OutlayLY
              </h2>
            </motion.div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                className="p-2.5 rounded-full bg-[#F0F8FF] text-[#4682B4] shadow-[3px_3px_7px_rgba(70,130,180,0.25),-3px_-3px_7px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_6px_rgba(45,95,135,0.38),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-shadow"
                onClick={() => setOpenSupport(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Contact Support"
              >
                <HiOutlineQuestionMarkCircle className="text-2xl" />
              </motion.button>

              <motion.button
                className="block lg:hidden p-2.5 rounded-full bg-[#F0F8FF] text-[#4682B4] shadow-[3px_3px_7px_rgba(70,130,180,0.25),-3px_-3px_7px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_6px_rgba(45,95,135,0.38),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-shadow"
                onClick={() => setOpenSideMenu(!openSideMenu)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Menu"
              >
                {openSideMenu ? (
                  <HiOutlineX className="text-2xl" />
                ) : (
                  <HiOutlineMenu className="text-2xl" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {openSideMenu && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 right-0 bottom-0 w-72 shadow-[-8px_0_24px_rgba(70,130,180,0.15)] z-[999] lg:hidden"
            >
              <SideMenu activeMenu={activeMenu} onClose={() => setOpenSideMenu(false)} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#22415A]/30 z-[900] lg:hidden"
              onClick={() => setOpenSideMenu(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {openSupport && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1001] bg-[#22415A]/30 backdrop-blur-sm"
              onClick={closeSupport}
            />
            <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative overflow-hidden rounded-3xl bg-[#F0F8FF] shadow-[12px_12px_28px_rgba(70,130,180,0.28),-12px_-12px_28px_rgba(255,255,255,0.9)]">
                  <div className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <HiOutlineQuestionMarkCircle className="absolute top-6 right-6 h-6 w-6 text-[#4682B4] opacity-20" />
                        {!showReportForm ? (
                          <>
                            <h3 className="text-2xl font-semibold text-[#22415A]">How can we help?</h3>
                            <p className="mt-1 text-[#4A6B84]">We're here to assist you</p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-2xl font-semibold text-[#22415A]">Report an Issue</h3>
                            <p className="mt-1 text-[#4A6B84]">Please provide details about your issue</p>
                          </>
                        )}
                      </div>
                      <button
                        onClick={closeSupport}
                        className="p-1.5 rounded-full text-[#4682B4] bg-[#F0F8FF] shadow-[2px_2px_5px_rgba(70,130,180,0.25),-2px_-2px_5px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_4px_rgba(45,95,135,0.35)] h-fit"
                      >
                        <HiOutlineX className="h-5 w-5" />
                      </button>
                    </div>

                    {reportSubmitted ? (
                      <div className="mt-6 text-center py-8">
                        <div className="flex justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#F0F8FF] flex items-center justify-center shadow-[4px_4px_10px_rgba(70,130,180,0.25),-4px_-4px_10px_rgba(255,255,255,0.9)]">
                            <HiOutlineCheckCircle className="h-9 w-9 text-emerald-500" />
                          </div>
                        </div>
                        <h4 className="mt-4 text-xl font-medium text-[#22415A]">Report Submitted Successfully!</h4>
                        <p className="mt-2 text-[#4A6B84]">We'll get back to you soon.</p>
                      </div>
                    ) : showReportForm ? (
                      <form onSubmit={handleReportSubmit} className="mt-6 space-y-4">
                        <div className="space-y-4">
                          <div className="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#F0F8FF] shadow-[inset_4px_4px_9px_rgba(70,130,180,0.22),inset_-4px_-4px_9px_rgba(255,255,255,0.85)] focus-within:ring-2 focus-within:ring-[#87CEEB]">
                            <HiOutlineUser className="h-5 w-5 text-[#4682B4]/60 flex-shrink-0" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full bg-transparent outline-none text-[#274A63] placeholder-[#274A63]/30"
                              placeholder="Your Name"
                              required
                            />
                          </div>
                          <div className="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#F0F8FF] shadow-[inset_4px_4px_9px_rgba(70,130,180,0.22),inset_-4px_-4px_9px_rgba(255,255,255,0.85)] focus-within:ring-2 focus-within:ring-[#87CEEB]">
                            <HiOutlineMail className="h-5 w-5 text-[#4682B4]/60 flex-shrink-0" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full bg-transparent outline-none text-[#274A63] placeholder-[#274A63]/30"
                              placeholder="Your Email"
                              required
                            />
                          </div>
                          <div className="px-4 py-3 rounded-2xl bg-[#F0F8FF] shadow-[inset_4px_4px_9px_rgba(70,130,180,0.22),inset_-4px_-4px_9px_rgba(255,255,255,0.85)] focus-within:ring-2 focus-within:ring-[#87CEEB]">
                            <textarea
                              name="issue"
                              value={formData.issue}
                              onChange={handleInputChange}
                              rows="4"
                              className="w-full bg-transparent outline-none text-[#274A63] placeholder-[#274A63]/30 resize-none"
                              placeholder="Describe your issue..."
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <button
                            type="button"
                            onClick={handleBackToSupport}
                            className="px-4 py-2 text-sm font-medium text-[#4A6B84] hover:text-[#22415A]"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2.5 text-white rounded-xl flex items-center gap-2 shadow-[4px_4px_10px_rgba(70,130,180,0.28),-4px_-4px_10px_rgba(255,255,255,0.85)] active:shadow-[inset_3px_3px_7px_rgba(45,95,135,0.4),inset_-3px_-3px_7px_rgba(255,255,255,0.6)] transition-shadow"
                            style={{ backgroundColor: "#4682B4" }}
                          >
                            <HiOutlinePaperAirplane className="h-5 w-5" />
                            Send Report
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="mt-6 space-y-3">
                          <SupportOption
                            icon={<HiOutlineMail className="h-5 w-5" />}
                            title="Email Support"
                            subtitle="amanpersonaluse1@gmail.com"
                            onClick={() =>
                              (window.location.href = "mailto:amanpersonaluse1@gmail.com")
                            }
                          />
                          <SupportOption
                            icon={<HiOutlineExclamationCircle className="h-5 w-5" />}
                            title="Report an Issue"
                            subtitle="Let us know about problems"
                            onClick={handleReportClick}
                          />
                        </div>
                        <p className="mt-6 pt-6 border-t border-[#4682B4]/10 text-center text-sm text-[#4A6B84]">
                          Typically respond within 24 hours
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SupportOption = ({ icon, title, subtitle, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group w-full flex items-center gap-3 p-4 rounded-2xl bg-[#F0F8FF] shadow-[4px_4px_10px_rgba(70,130,180,0.22),-4px_-4px_10px_rgba(255,255,255,0.85)] active:shadow-[inset_3px_3px_7px_rgba(45,95,135,0.35),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] transition-shadow"
  >
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#F0F8FF] text-[#4682B4] shadow-[2px_2px_5px_rgba(70,130,180,0.2),-2px_-2px_5px_rgba(255,255,255,0.85)]">
      {icon}
    </div>
    <div className="text-left">
      <h4 className="font-medium text-[#22415A]">{title}</h4>
      <p className="text-sm text-[#4A6B84]">{subtitle}</p>
    </div>
  </motion.button>
);

export default Navbar;
