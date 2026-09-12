import React, { useId, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


const THEME = {
  blue: {
    inset: "shadow-[inset_4px_4px_9px_rgba(70,130,180,0.22),inset_-4px_-4px_9px_rgba(255,255,255,0.85)]",
    ring: "focus-within:ring-[#87CEEB]",
    icon: "text-[#4682B4]",
    iconMuted: "text-[#4682B4]/40",
    label: "text-[#2F5F82]",
  },
  teal: {
    inset: "shadow-[inset_4px_4px_9px_rgba(32,178,170,0.25),inset_-4px_-4px_9px_rgba(255,255,255,0.85)]",
    ring: "focus-within:ring-[#5FDDE5]",
    icon: "text-[#159089]",
    iconMuted: "text-[#159089]/40",
    label: "text-[#0F6E68]",
  },
  pink: {
    inset: "shadow-[inset_4px_4px_9px_rgba(255,105,180,0.25),inset_-4px_-4px_9px_rgba(255,255,255,0.85)]",
    ring: "focus-within:ring-[#FF9FC7]",
    icon: "text-[#E0177E]",
    iconMuted: "text-[#E0177E]/40",
    label: "text-[#8A1256]",
  },
  lavender: {
    inset: "shadow-[inset_4px_4px_9px_rgba(180,140,200,0.28),inset_-4px_-4px_9px_rgba(255,255,255,0.85)]",
    ring: "focus-within:ring-[#DDA0DD]",
    icon: "text-[#8B5FA8]",
    iconMuted: "text-[#8B5FA8]/40",
    label: "text-[#6B3FA0]",
  },
};

const Input = ({ id, value, onChange, label, type, placeholder, variant = "blue" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id || generatedId;
  const t = THEME[variant] || THEME.blue;

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div>
      <label htmlFor={inputId} className={`text-[13px] font-medium ${t.label}`}>
        {label}
      </label>

      <div
        className={`mt-1.5 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#F0F8FF] ${t.inset} transition-shadow focus-within:ring-2 ${t.ring} focus-within:ring-offset-2 focus-within:ring-offset-white`}
      >
        <input
          id={inputId}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[#274A63] placeholder-[#274A63]/30"
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="flex-shrink-0"
          >
            {showPassword ? (
              <FaRegEye size={20} className={t.icon} />
            ) : (
              <FaRegEyeSlash size={20} className={t.iconMuted} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
