"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const armFrame = requestAnimationFrame(() => setEnabled(true));
    document.documentElement.classList.add("has-kk-cursor");

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px)`;
      }
      const labelled = (event.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(labelled ? labelled.getAttribute("data-cursor") ?? "" : "");
    };

    const animate = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    document.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(armFrame);
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-kk-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="kk-cursor-ring" aria-hidden="true">
        {label ? <span className="kk-cursor-label">{label}</span> : null}
      </div>
      <div ref={dotRef} className="kk-cursor-dot" aria-hidden="true" />
    </>
  );
}
