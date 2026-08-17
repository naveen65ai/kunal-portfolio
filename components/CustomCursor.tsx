"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    if (!finePointer.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (el) setCursorText(el.getAttribute("data-cursor") || "");
    };

    const onLeave = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (el) setCursorText("");
    };

    const onLeaveWindow = () => setVisible(false);
    const onEnterWindow = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y - 12}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "var(--ivory)",
          pointerEvents: "none",
          zIndex: 190,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          mixBlendMode: "difference",
        }}
      />
      <AnimatePresence>
        {cursorText && visible && (
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 190,
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
              color: "var(--paper)",
              background: "var(--ink)",
              padding: "6px 14px",
              borderRadius: "9999px",
            }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
