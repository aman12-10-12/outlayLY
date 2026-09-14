import React, { useRef } from "react";

const CHROME = {
  blue: {
    bg: "bg-[#F0F8FF]",
    inset: "shadow-[inset_4px_4px_10px_rgba(70,130,180,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.75)]",
    chipShadow: "4px 4px 9px rgba(70,130,180,0.22), -4px -4px 9px rgba(255,255,255,0.85)",
    arrowShadow: "shadow-[3px_3px_7px_rgba(70,130,180,0.25),-3px_-3px_7px_rgba(255,255,255,0.9)]",
    arrowText: "text-[#4682B4]",
    label: "text-[#2F5F82]",
    badge: "text-[#4682B4]",
  },
  teal: {
    bg: "bg-[#E0FFFF]",
    inset: "shadow-[inset_4px_4px_10px_rgba(32,178,170,0.2),inset_-4px_-4px_10px_rgba(255,255,255,0.75)]",
    chipShadow: "4px 4px 9px rgba(32,178,170,0.25), -4px -4px 9px rgba(255,255,255,0.85)",
    arrowShadow: "shadow-[3px_3px_7px_rgba(32,178,170,0.28),-3px_-3px_7px_rgba(255,255,255,0.9)]",
    arrowText: "text-[#159089]",
    label: "text-[#0F6E68]",
    badge: "text-[#159089]",
  },
  pink: {
    bg: "bg-[#FFF0F5]",
    inset: "shadow-[inset_4px_4px_10px_rgba(255,105,180,0.2),inset_-4px_-4px_10px_rgba(255,255,255,0.75)]",
    chipShadow: "4px 4px 9px rgba(255,105,180,0.25), -4px -4px 9px rgba(255,255,255,0.85)",
    arrowShadow: "shadow-[3px_3px_7px_rgba(255,105,180,0.28),-3px_-3px_7px_rgba(255,255,255,0.9)]",
    arrowText: "text-[#E0177E]",
    label: "text-[#C2185B]",
    badge: "text-[#E0177E]",
  },
  lavender: {
    bg: "bg-[#F1EEFB]",
    inset: "shadow-[inset_4px_4px_10px_rgba(180,140,200,0.22),inset_-4px_-4px_10px_rgba(255,255,255,0.75)]",
    chipShadow: "4px 4px 9px rgba(180,140,200,0.28), -4px -4px 9px rgba(255,255,255,0.85)",
    arrowShadow: "shadow-[3px_3px_7px_rgba(180,140,200,0.3),-3px_-3px_7px_rgba(255,255,255,0.9)]",
    arrowText: "text-[#8B5FA8]",
    label: "text-[#6B3FA0]",
    badge: "text-[#8B5FA8]",
  },
};

const CustomLegend = ({ payload = [], variant = "blue" }) => {
  const scrollRef = useRef();
  const c = CHROME[variant] || CHROME.blue;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

  if (!payload.length) return null;

  return (
    <div className={`relative group w-full py-5 px-4 ${c.bg} rounded-2xl ${c.inset}`}>
      <button
        onClick={scrollLeft}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 ${c.bg} ${c.arrowText} rounded-full ${c.arrowShadow} hover:brightness-105 transition hidden group-hover:flex`}
      >
        ◀
      </button>
      <button
        onClick={scrollRight}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 ${c.bg} ${c.arrowText} rounded-full ${c.arrowShadow} hover:brightness-105 transition hidden group-hover:flex`}
      >
        ▶
      </button>
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto px-2 no-scrollbar"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {payload.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className={`relative group/legend flex items-center gap-2 px-4 py-2 ${c.bg} rounded-xl transition-all duration-300 ease-out whitespace-nowrap hover:scale-[1.03]`}
            style={{ boxShadow: c.chipShadow }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                backgroundColor: entry.color,
                boxShadow: `${entry.color} 0 0 0 1px, rgba(0,0,0,0.08) 0 1px 3px 0, rgba(255,255,255,0.4) 0 1px 0 inset`,
              }}
            />

            {/* Label with tooltip */}
            <span className={`text-sm font-medium ${c.label} truncate max-w-[120px] relative`}>
              <span className="group-hover/legend:underline decoration-dotted cursor-help">
                {entry.value}
              </span>
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#22415A] text-white text-xs px-2 py-1 rounded opacity-0 group-hover/legend:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                {entry.value}
              </span>
            </span>

            {/* Count badge */}
            {entry.payload?.count && (
              <span className={`text-xs font-medium ${c.badge} bg-white/60 px-2 py-0.5 rounded ml-1`}>
                {entry.payload.count}
              </span>
            )}
          </div>
        ))}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default CustomLegend;
