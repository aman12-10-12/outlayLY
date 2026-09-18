import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// One accent from each brand palette, so the scatter feels like it belongs
// to the app rather than a random effect bolted on top.
const COLORS = ["#4682B4", "#159089", "#E0177E", "#8B5FA8"];

let idCounter = 0;

const RupeeCursorTrail = () => {
  const [particles, setParticles] = useState([]);
  const lastSpawnRef = useRef(0);

  const spawnParticle = useCallback((x, y) => {
    const id = idCounter++;
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 70;

    const particle = {
      id,
      x,
      y,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 14 + Math.random() * 16,
      rotate: (Math.random() - 0.5) * 200,
      dx: Math.cos(angle) * distance,
      // slight upward bias so it reads as "popping up" rather than just drifting
      dy: Math.sin(angle) * distance - 30,
    };

    // Cap concurrent particles so a long, fast mouse sweep can't pile up
    // hundreds of animating elements at once.
    setParticles((prev) => [...prev.slice(-39), particle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 900);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = performance.now();
      // Throttle spawns — raw mousemove fires far too often to spawn on
      // every event without flooding the DOM.
      if (now - lastSpawnRef.current < 60) return;
      lastSpawnRef.current = now;
      spawnParticle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [spawnParticle]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0.9, scale: 0.6, x: p.x, y: p.y, rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 1.1,
              x: p.x + p.dx,
              y: p.y + p.dy,
              rotate: p.rotate,
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              fontSize: p.size,
              fontWeight: 700,
              color: p.color,
              willChange: "transform, opacity",
            }}
          >
            ₹
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RupeeCursorTrail;
