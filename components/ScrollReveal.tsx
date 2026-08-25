"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  const dirMap = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
  };

  const offset = dirMap[direction];

  return (
    <motion.div
      className={className}
      initial={
        reduce ? false : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
