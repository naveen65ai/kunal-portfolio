"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkle, Planet, Lightning, ArrowCounterClockwise, HandGrabbing } from "@phosphor-icons/react";
import { soundManager } from "@/components/ui/SoundEffects";

interface PhysicsObject {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type: "circle" | "box" | "star";
  rotation: number;
  vRot: number;
  label: string;
}

const PALETTE = ["#ffc62f", "#ff704f", "#1762dc", "#087947", "#fffaf2", "#e879f9"];
const LABELS = ["✦", "UI", "3D", "UX", "60FPS", "FIGMA", "BLENDER", "GLSL", "CODE", "SHADERS"];

export function TactilePhysicsSandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const objectsRef = useRef<PhysicsObject[]>([]);
  const isDraggingRef = useRef<PhysicsObject | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const [zeroGravity, setZeroGravity] = useState(false);
  const [objectCount, setObjectCount] = useState(6);
  const [collisions, setCollisions] = useState(0);

  const spawnObject = useCallback((customX?: number, customY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;

    const newObj: PhysicsObject = {
      id: Date.now() + Math.random(),
      x: customX ?? Math.random() * (width - 100) + 50,
      y: customY ?? Math.random() * 80 + 30,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 4,
      radius: Math.random() * 14 + 22,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      type: ["circle", "box", "star"][Math.floor(Math.random() * 3)] as PhysicsObject["type"],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.08,
      label: LABELS[Math.floor(Math.random() * LABELS.length)],
    };

    objectsRef.current.push(newObj);
    setObjectCount(objectsRef.current.length);
    soundManager.playTone(300 + Math.random() * 400, "triangle", 0.15);
  }, []);

  // Initialize starting objects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = 340;
    }

    objectsRef.current = [];
    for (let i = 0; i < 6; i++) {
      spawnObject(
        (canvas.width / 7) * (i + 1),
        Math.random() * 120 + 40
      );
    }
  }, [spawnObject]);

  // Main Physics Animation Loop
  useEffect(() => {
    let animId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gravity = zeroGravity ? 0 : 0.28;
    const friction = 0.985;
    const bounce = 0.72;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const objs = objectsRef.current;
      const dragging = isDraggingRef.current;

      objs.forEach((obj, idx) => {
        if (obj === dragging) {
          obj.x = mousePosRef.current.x;
          obj.y = mousePosRef.current.y;
          obj.vx = (mousePosRef.current.x - mousePosRef.current.lastX) * 0.8;
          obj.vy = (mousePosRef.current.y - mousePosRef.current.lastY) * 0.8;
        } else {
          obj.vy += gravity;
          obj.vx *= friction;
          obj.vy *= friction;
          obj.x += obj.vx;
          obj.y += obj.vy;
          obj.rotation += obj.vRot;

          // Floor and Wall Collision
          if (obj.y + obj.radius > canvas.height) {
            obj.y = canvas.height - obj.radius;
            obj.vy = -obj.vy * bounce;
            if (Math.abs(obj.vy) > 1.2) {
              setCollisions((c) => c + 1);
            }
          }
          if (obj.y - obj.radius < 0) {
            obj.y = obj.radius;
            obj.vy = -obj.vy * bounce;
          }
          if (obj.x + obj.radius > canvas.width) {
            obj.x = canvas.width - obj.radius;
            obj.vx = -obj.vx * bounce;
          }
          if (obj.x - obj.radius < 0) {
            obj.x = obj.radius;
            obj.vx = -obj.vx * bounce;
          }

          // Object-to-object collisions
          for (let j = idx + 1; j < objs.length; j++) {
            const other = objs[j];
            const dx = other.x - obj.x;
            const dy = other.y - obj.y;
            const dist = Math.hypot(dx, dy);
            const minDist = obj.radius + other.radius;

            if (dist < minDist && dist > 0) {
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = minDist - dist;

              obj.x -= nx * overlap * 0.5;
              obj.y -= ny * overlap * 0.5;
              other.x += nx * overlap * 0.5;
              other.y += ny * overlap * 0.5;

              const kx = obj.vx - other.vx;
              const ky = obj.vy - other.vy;
              const p = 2 * (nx * kx + ny * ky) / 2;

              obj.vx -= p * nx * 0.8;
              obj.vy -= p * ny * 0.8;
              other.vx += p * nx * 0.8;
              other.vy += p * ny * 0.8;
            }
          }
        }

        // Draw Object
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.rotation);

        // Brutalist Shadow
        ctx.fillStyle = "#171515";
        if (obj.type === "box") {
          ctx.fillRect(-obj.radius + 3, -obj.radius + 3, obj.radius * 2, obj.radius * 2);
        } else {
          ctx.beginPath();
          ctx.arc(3, 3, obj.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main Shape
        ctx.fillStyle = obj.color;
        ctx.strokeStyle = "#171515";
        ctx.lineWidth = 2.5;

        if (obj.type === "box") {
          ctx.beginPath();
          ctx.roundRect(-obj.radius, -obj.radius, obj.radius * 2, obj.radius * 2, 8);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, obj.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        // Label
        ctx.fillStyle = "#171515";
        ctx.font = `900 ${Math.max(10, obj.radius * 0.45)}px var(--font-display), sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(obj.label, 0, 1);

        ctx.restore();
      });

      mousePosRef.current.lastX = mousePosRef.current.x;
      mousePosRef.current.lastY = mousePosRef.current.y;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [zeroGravity]);

  // Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current.x = x;
    mousePosRef.current.y = y;
    mousePosRef.current.lastX = x;
    mousePosRef.current.lastY = y;

    // Check hit
    for (let i = objectsRef.current.length - 1; i >= 0; i--) {
      const obj = objectsRef.current[i];
      if (Math.hypot(obj.x - x, obj.y - y) <= obj.radius + 6) {
        isDraggingRef.current = obj;
        soundManager.playClick(1.2);
        return;
      }
    }

    // Otherwise click creates new orb
    spawnObject(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mousePosRef.current.x = e.clientX - rect.left;
    mousePosRef.current.y = e.clientY - rect.top;
  };

  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      soundManager.playTone(480, "sine", 0.2);
    }
    isDraggingRef.current = null;
  };

  const triggerShockwave = () => {
    soundManager.playPowerUp();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    objectsRef.current.forEach((obj) => {
      const dx = obj.x - cx;
      const dy = obj.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      obj.vx += (dx / dist) * (Math.random() * 12 + 8);
      obj.vy += (dy / dist) * (Math.random() * 12 + 8) - 6;
    });
  };

  const resetCanvas = () => {
    soundManager.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    objectsRef.current = [];
    for (let i = 0; i < 6; i++) {
      spawnObject((canvas.width / 7) * (i + 1), Math.random() * 100 + 40);
    }
    setCollisions(0);
  };

  return (
    <div className="physics-sandbox-card">
      {/* Header Info */}
      <div className="physics-header">
        <div>
          <div className="physics-title-row">
            <span className="physics-title-icon">
              <Planet size={18} weight="bold" />
            </span>
            <h3 className="physics-title">
              Kinetic Gravity & Matter Lab
            </h3>
          </div>
          <p className="physics-subtitle">
            Click anywhere to spawn shapes · Drag to toss with physics momentum
          </p>
        </div>

        {/* Live Metrics */}
        <div className="physics-metrics-row">
          <span className="physics-metric-badge">
            <Sparkle size={12} weight="fill" /> {objectCount} Matter Units
          </span>
          <span className="physics-metric-badge">
            {collisions} Impacts
          </span>
        </div>
      </div>

      {/* Physics Canvas Shell */}
      <div className="physics-canvas-shell">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="physics-canvas-element"
        />

        {/* Drag Hint Overlay */}
        <div className="physics-hint-overlay">
          <HandGrabbing size={13} weight="bold" /> Toss matter
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="physics-toolbar">
        <div className="physics-btn-group">
          <button
            type="button"
            onClick={() => spawnObject()}
            className="physics-btn-spawn"
          >
            ✦ Spawn Orb
          </button>
          <button
            type="button"
            onClick={() => {
              setZeroGravity(!zeroGravity);
              soundManager.playTone(zeroGravity ? 300 : 600, "sine", 0.2);
            }}
            className={`physics-btn-gravity ${zeroGravity ? "is-active" : ""}`}
          >
            <Planet size={14} weight="bold" />
            {zeroGravity ? "Zero-G Active" : "Normal Gravity"}
          </button>
          <button
            type="button"
            onClick={triggerShockwave}
            className="physics-btn-shockwave"
          >
            <Lightning size={14} weight="bold" /> Shockwave
          </button>
        </div>

        <button
          type="button"
          onClick={resetCanvas}
          aria-label="Reset physics canvas"
          className="physics-btn-reset"
        >
          <ArrowCounterClockwise size={14} weight="bold" /> Reset
        </button>
      </div>
    </div>
  );
}
