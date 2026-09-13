import React from "react";
import { getInitials } from "../../utils/helper";
import classNames from "classnames";

export const CharAvatar = ({
  fullName = "",
  size = "md",
  style = "",
  className = "",
  shadow = true,
  border = false,
  hoverEffect = true,
}) => {
  // Size presets
  const sizeClasses = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl",
  };

  const nameHash = fullName
    ? fullName.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0)
    : 0;

  const hue = Math.abs(nameHash) % 360;
  const bgColor = `hsl(${hue}, 70%, 45%)`;
  const textColor = `hsl(${hue}, 20%, 95%)`;

  const shadowDark = `hsla(${hue}, 65%, 35%, 0.4)`;
  const shadowLight = "rgba(255, 255, 255, 0.7)";

  return (
    <div
      className={classNames(
        "flex items-center justify-center rounded-full font-medium",
        "transition-all duration-300",
        {
          "border-2 border-white/40": border,
          "hover:scale-105 hover:brightness-110": hoverEffect,
          [sizeClasses[size]]: true,
          [className]: className,
        }
      )}
      style={{
        background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.35), transparent 60%), ${bgColor}`,
        color: textColor,
        boxShadow: shadow
          ? `6px 6px 12px ${shadowDark}, -6px -6px 12px ${shadowLight}`
          : "none",
        ...(style && typeof style === "object" ? style : {}),
      }}
      title={fullName}
    >
      <span className="select-none">{getInitials(fullName || "?")}</span>
    </div>
  );
};

export default CharAvatar;
