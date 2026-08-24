import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
  opacity?: number;
}

export function RetroGrid({
  className,
  angle = 65,
  opacity = 0.45,
}: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Grid wrapper */}
      <div className="absolute inset-0 [transform-origin:100%_0_0]">
        <div
          className={cn(
            "animate-retro-grid",
            "absolute -inset-[100%] h-[300%] w-[300%]",
            "bg-[linear-gradient(to_right,rgba(23,21,21,0.12)_1px,transparent_0),linear-gradient(to_bottom,rgba(23,21,21,0.12)_1px,transparent_0)]",
            "bg-[size:44px_44px]",
            "[transform:rotateX(var(--grid-angle))] origin-top"
          )}
          style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
        />
      </div>

      {/* Horizon radial gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[var(--paper)] to-[var(--paper)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
    </div>
  );
}
