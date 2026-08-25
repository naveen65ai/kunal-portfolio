"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticlesBackgroundProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
}

export function ParticlesBackground({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  color = "#ffc62f",
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<
    {
      x: number;
      y: number;
      translateX: number;
      translateY: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      dx: number;
      dy: number;
      magnetism: number;
    }[]
  >([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dprRef = useRef(1);
  const rafRef = useRef<number>(0);
  const isVisible = useRef(true);

  const onMouseMove = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      const x = clientX - rect.left - canvasSize.current.w / 2;
      const y = clientY - rect.top - canvasSize.current.h / 2;
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dprRef.current;
      canvasRef.current.height = canvasSize.current.h * dprRef.current;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dprRef.current, dprRef.current);
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2.5) + 1.2;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.4 + 0.1).toFixed(2));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism };
  };

  const drawCircle = (circle: { x: number; y: number; translateX: number; translateY: number; size: number; alpha: number }, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = color;
      context.current.globalAlpha = alpha;
      context.current.fill();
      context.current.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);

      if (!update) {
        circles.current.push(circle as typeof circles.current[number]);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (value: number, start1: number, stop1: number, start2: number, stop2: number): number => {
    const rel = (value - start1) / (stop1 - start1);
    return start2 + rel * (stop2 - start2);
  };

  const animate = () => {
    if (!isVisible.current) return;

    clearContext();
    circles.current.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapLogarithm = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
      if (remapLogarithm > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapLogarithm;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      } else {
        drawCircle(
          { ...circle, x: circle.x, y: circle.y, translateX: circle.translateX, translateY: circle.translateY, alpha: circle.alpha },
          true
        );
      }
    });
    rafRef.current = requestAnimationFrame(animate);
  };

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  useEffect(() => {
    dprRef.current = Math.min(window.devicePixelRatio || 1, 2);

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    const container = canvasContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0]?.isIntersecting ?? false;
        if (isVisible.current) {
          animate();
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    initCanvas();

    window.addEventListener("resize", initCanvas);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("mousemove", onMouseMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
