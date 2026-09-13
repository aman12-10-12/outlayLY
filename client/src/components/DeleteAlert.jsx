import React from "react";
import { FiAlertTriangle, FiTrash2 } from "react-icons/fi";

const dangerStyles = {
  low: {
    badgeBg: "bg-[#F0F8FF]",
    badgeShadow: "shadow-[3px_3px_8px_rgba(70,130,180,0.25),-3px_-3px_8px_rgba(255,255,255,0.9)]",
    icon: "text-blue-500",
    btn: "#3B82F6",
    btnActive: "rgba(29,78,216,0.4)",
  },
  medium: {
    badgeBg: "bg-[#FFF8EC]",
    badgeShadow: "shadow-[3px_3px_8px_rgba(217,155,40,0.25),-3px_-3px_8px_rgba(255,255,255,0.9)]",
    icon: "text-amber-500",
    btn: "#D97706",
    btnActive: "rgba(180,83,9,0.4)",
  },
  high: {
    badgeBg: "bg-[#FFF3F3]",
    badgeShadow: "shadow-[3px_3px_8px_rgba(220,38,38,0.25),-3px_-3px_8px_rgba(255,255,255,0.9)]",
    icon: "text-red-500",
    btn: "#DC2626",
    btnActive: "rgba(153,27,27,0.4)",
  },
};

const DeleteAlert = ({
  content,
  confirmText = "Delete",
  cancelText = "Cancel",
  onDelete,
  onCancel,
  dangerLevel = "medium",
}) => {
  const c = dangerStyles[dangerLevel] || dangerStyles.medium;

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-full ${c.badgeBg} ${c.badgeShadow} flex-shrink-0`}>
          <FiAlertTriangle className={`w-6 h-6 ${c.icon}`} />
        </div>
        <p className="text-sm text-[#4A6B84] pt-1">{content}</p>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-xl text-[#4682B4] bg-[#F0F8FF] shadow-[3px_3px_7px_rgba(70,130,180,0.25),-3px_-3px_7px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_6px_rgba(45,95,135,0.38),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-shadow"
          >
            {cancelText}
          </button>
        )}
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl text-white shadow-[3px_3px_8px_rgba(0,0,0,0.2)] active:shadow-[inset_3px_3px_6px_var(--active-shadow)] transition-shadow"
          style={{ backgroundColor: c.btn, "--active-shadow": c.btnActive }}
        >
          <FiTrash2 className="w-4 h-4" />
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
