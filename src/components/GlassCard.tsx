import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  /** Tilt the card in 3D towards the pointer */
  tilt?: boolean;
}

const MAX_TILT = 6; // degrees

export const GlassCard = ({
  children,
  className,
  hover = true,
  tilt = false,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el && e.pointerType === "mouse") {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--spot", "1");
      if (tilt) {
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * MAX_TILT}deg) rotateY(${(px - 0.5) * MAX_TILT}deg) translateY(-4px)`;
      }
    }
    onPointerMove?.(e);
  };

  const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      el.style.setProperty("--spot", "0");
      if (tilt) el.style.transform = "";
    }
    onPointerLeave?.(e);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        "glass-card p-6 transition-[transform,box-shadow] duration-300 ease-out",
        hover && !tilt && "hover:-translate-y-1 hover:shadow-glass-hover",
        hover && tilt && "hover:shadow-glass-hover",
        className
      )}
      {...props}
    >
      <span className="glass-edge" aria-hidden="true" />
      {children}
    </div>
  );
};

export default GlassCard;
