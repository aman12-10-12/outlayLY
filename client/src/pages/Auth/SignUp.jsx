import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import {
  FaWallet, FaShieldAlt, FaRocket, FaChartLine, FaFingerprint,
  FaLock, FaEnvelope, FaChevronRight, FaUser,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const RAISED =
  "shadow-[8px_8px_16px_rgba(70,130,180,0.28),-8px_-8px_16px_rgba(255,255,255,0.9)]";
const RAISED_SM =
  "shadow-[4px_4px_10px_rgba(70,130,180,0.25),-4px_-4px_10px_rgba(255,255,255,0.85)]";
const INSET =
  "shadow-[inset_5px_5px_10px_rgba(70,130,180,0.30),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]";
const PRESSED =
  "active:shadow-[inset_4px_4px_9px_rgba(45,95,135,0.4),inset_-4px_-4px_9px_rgba(255,255,255,0.6)]";

const premiumFeatures = [
  {
    icon: <FaChartLine size={16} />,
    title: "Spending insights",
    description: "Visual breakdowns of where your money goes every month",
  },
  {
    icon: <FaShieldAlt size={16} />,
    title: "Bank-grade security",
    description: "256-bit encryption keeps your financial data private",
  },
  {
    icon: <FaRocket size={16} />,
    title: "Instant sync",
    description: "Expenses update the moment you add them, everywhere",
  },
  {
    icon: <FaFingerprint size={16} />,
    title: "Biometric lock",
    description: "Unlock your dashboard with a fingerprint or face scan",
  },
];

const InputField = ({ id, label, type, value, onChange, icon, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-[#2F5F82] mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4682B4]/70">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className={`block w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F0F8FF] text-[#274A63] placeholder-[#4682B4]/40 border-none outline-none transition-shadow duration-200 ${INSET} focus:ring-2 focus:ring-[#87CEEB] focus:ring-offset-2 focus:ring-offset-[#F0F8FF]`}
      />
    </div>
  </div>
);

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        updateUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-x-hidden bg-gradient-to-br from-[#F7FBFF] to-[#DCEBF7]">
      {/* Left brand panel — mirrors Login.jsx */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`hidden lg:flex w-1/2 bg-[#F0F8FF] rounded-r-[48px] p-14 flex-col justify-between relative shadow-[18px_0_40px_rgba(70,130,180,0.22)]`}
      >
        <div>
          <div className={`w-14 h-14 rounded-2xl bg-[#F0F8FF] flex items-center justify-center text-[#4682B4] mb-6 ${RAISED_SM}`}>
            <FaWallet size={20} />
          </div>

          <h1 className="text-4xl font-bold text-[#22415A] leading-tight mb-2">
            Welcome to OutlayLY
          </h1>
          <p className="text-lg font-semibold text-[#4682B4] tracking-wide mb-5">
            Track. Understand. Spend Better.
          </p>
          <p className="text-[#4A6B84] text-lg max-w-sm leading-relaxed">
            Create your account and start turning scattered expenses into a
            clear, day to day picture of your spending.
          </p>
        </div>

        <div>
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className={`flex items-center gap-2 text-[#2F5F82] font-medium mb-6 px-5 py-3 rounded-2xl bg-[#F0F8FF] ${RAISED_SM} ${PRESSED} transition-shadow duration-150`}
          >
            <span>What you get</span>
            <motion.span animate={{ rotate: showFeatures ? 90 : 0 }} transition={{ duration: 0.25 }}>
              <FaChevronRight size={12} />
            </motion.span>
          </button>

          <AnimatePresence>
            {showFeatures && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className={`bg-[#F0F8FF] p-4 rounded-2xl ${RAISED_SM}`}>
                      <div className="w-8 h-8 rounded-xl bg-[#B0E0E6]/50 flex items-center justify-center text-[#4682B4] mb-2">
                        {feature.icon}
                      </div>
                      <h3 className="text-[#22415A] font-medium text-sm">{feature.title}</h3>
                      <p className="text-[#4A6B84] text-xs mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`flex items-center gap-4 p-4 rounded-2xl bg-[#F0F8FF] ${RAISED_SM}`}>
            <div className={`w-11 h-11 rounded-full bg-[#F0F8FF] flex items-center justify-center text-[#4682B4] ${RAISED_SM}`}>
              <FaShieldAlt size={16} />
            </div>
            <div>
              <p className="text-[#22415A] font-medium text-sm">Built for everyday spending</p>
              <p className="text-[#4A6B84] text-xs">Simple daily use, serious budgeting power</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right panel — signup card */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="lg:hidden flex flex-col items-center text-center mb-6">
          <div className={`w-12 h-12 rounded-2xl bg-[#F0F8FF] flex items-center justify-center text-[#4682B4] mb-3 ${RAISED_SM}`}>
            <FaWallet size={16} />
          </div>
          <p className="text-xl font-bold text-[#22415A]">Welcome to OutlayLY</p>
          <p className="text-sm text-[#4682B4] mt-1 tracking-wide">Track. Understand. Spend Better.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-md w-full bg-[#F0F8FF] rounded-[32px] p-8 sm:p-10 ${RAISED}`}
        >
          <div className="text-center">
            <div className={`mx-auto w-14 h-14 rounded-2xl bg-[#F0F8FF] flex items-center justify-center text-[#4682B4] mb-4 ${RAISED_SM}`}>
              <FaUser size={18} />
            </div>
            <h2 className="text-xl font-bold text-[#22415A] mb-1">Create your account</h2>
            <p className="text-sm text-[#4A6B84] mb-4">Join OutlayLY and start tracking today</p>

            <div className={`p-4 rounded-2xl bg-[#F0F8FF] text-sm text-[#2F5F82] text-left ${INSET}`}>
              <strong className="text-[#22415A]">Note:</strong> If registration
              fails, wait a moment and try again : the server can take a little
              time to wake up.
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 p-3.5 border border-red-200">
              <div className="flex items-center text-red-700 text-sm">
                <svg className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <form className="mt-6" onSubmit={handleSignUp}>
            <InputField
              id="fullName"
              label="Full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<FaUser size={16} />}
              placeholder="John Doe"
            />
            <InputField
              id="email"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<FaEnvelope size={16} />}
              placeholder="your@example.com"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FaLock size={16} />}
              placeholder="Min 8 characters"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex items-center justify-center py-3.5 px-4 mt-2 text-base font-semibold rounded-2xl text-white bg-[#4682B4] hover:bg-[#3E76A4] disabled:opacity-80 transition-all duration-150 ${RAISED_SM} ${PRESSED}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <FaChevronRight size={14} className="ml-2 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="pt-5 mt-5 border-t border-[#4682B4]/10 text-center">
            <p className="text-[#4A6B84] text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4682B4] hover:text-[#2F5F82] font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
