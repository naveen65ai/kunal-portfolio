"use client";

import { useEffect } from "react";

const CONFETTI_EVENT = "kk-confetti";

export function fireConfetti(originX?: number, originY?: number) {
  window.dispatchEvent(
    new CustomEvent(CONFETTI_EVENT, {
      detail: {
        x: originX ?? window.innerWidth / 2,
        y: originY ?? window.innerHeight / 3,
      },
    }),
  );
}

const COLORS = ["#ffc62f", "#ff704f", "#1762dc", "#087947", "#fffaf2"];

type Particle = {
  node: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
};

export function ConfettiLayer() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    const particles: Particle[] = [];
    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    layer.setAttribute("aria-hidden", "true");

    const spawn = (x: number, y: number) => {
      for (let i = 0; i < 28; i += 1) {
        const angle = (Math.PI * 2 * i) / 28 + Math.random() * 0.4;
        const speed = 5 + Math.random() * 7;
        const node = document.createElement("span");
        node.className = "confetti-piece";
        node.style.background = COLORS[i % COLORS.length];
        node.style.width = i % 3 === 0 ? "0.55rem" : "0.4rem";
        node.style.height = i % 4 === 0 ? "0.75rem" : "0.45rem";
        node.style.borderRadius = i % 5 === 0 ? "50%" : "1px";
        layer.appendChild(node);
        particles.push({
          node,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          rotation: Math.random() * 360,
          vr: (Math.random() - 0.5) * 24,
        });
      }
      document.body.appendChild(layer);
    };

    const tick = () => {
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.vx *= 0.99;
        p.rotation += p.vr;
        p.node.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
        if (p.y > window.innerHeight + 60) {
          p.node.remove();
          particles.splice(i, 1);
        }
      }
      if (particles.length > 0) {
        frame = requestAnimationFrame(tick);
      } else {
        layer.remove();
      }
    };

    const onConfetti = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
      cancelAnimationFrame(frame);
      spawn(x, y);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener(CONFETTI_EVENT, onConfetti);
    return () => {
      window.removeEventListener(CONFETTI_EVENT, onConfetti);
      cancelAnimationFrame(frame);
      layer.remove();
    };
  }, []);

  return null;
}
