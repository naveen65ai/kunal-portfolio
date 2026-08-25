"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

class CrtStateManager {
  private active: boolean = false;
  private listeners: Set<(active: boolean) => void> = new Set();
  private initialized = false;

  private init() {
    if (this.initialized) return;
    this.initialized = true;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kunal_portfolio_crt");
      this.active = stored === "true";
    }
  }

  public isActive(): boolean {
    this.init();
    return this.active;
  }

  public toggle(): boolean {
    this.init();
    this.active = !this.active;
    if (typeof window !== "undefined") {
      localStorage.setItem("kunal_portfolio_crt", String(this.active));
    }
    this.listeners.forEach((fn) => fn(this.active));
    return this.active;
  }

  public subscribe(fn: (active: boolean) => void): () => void {
    this.init();
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

let _crtManager: CrtStateManager | null = null;
export function getCrtManager(): CrtStateManager {
  if (!_crtManager) _crtManager = new CrtStateManager();
  return _crtManager;
}

// Lazy singleton that defers localStorage access to first use
export const crtManager = {
  isActive: () => getCrtManager().isActive(),
  toggle: () => getCrtManager().toggle(),
  subscribe: (fn: (active: boolean) => void) => getCrtManager().subscribe(fn),
};

export function CrtScanlines() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(crtManager.isActive());
    return crtManager.subscribe(setActive);
  }, []);

  if (!active) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none",
        "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_100%)]",
        "animate-crt-flicker"
      )}
      aria-hidden="true"
    >
      {/* Scanline horizontal stripes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
      
      {/* Vignette CRT border curvature */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.45)]" />

      {/* Retro Status HUD tag */}
      <div className="fixed top-4 right-4 z-[10000] flex items-center gap-2 rounded-full border border-green-500/40 bg-black/80 px-3 py-1 text-[11px] font-mono font-bold text-green-400 backdrop-blur-md">
        <span className="size-2 rounded-full bg-green-500 animate-ping" />
        <span>CRT PHOSPHOR 60HZ</span>
      </div>
    </div>
  );
}
