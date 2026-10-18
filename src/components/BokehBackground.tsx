import { useEffect, useRef } from "react";

/**
 * Site-wide ambient backdrop: drifting aurora light, two twinkling star
 * layers and a soft glow that trails the pointer. Everything is fixed behind
 * the content and only animates transform and opacity, so scrolling stays smooth.
 */
const BokehBackground = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const tick = () => {
      // Ease towards the pointer so the glow trails behind it
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      glow.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      // Stop the loop once the glow has caught up, so nothing runs while the pointer is still
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    glow.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
    glow.style.opacity = "1";

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>

      <div className="starfield" aria-hidden="true" />
      <div className="starfield starfield-2" aria-hidden="true" />

      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, hsla(262, 85%, 60%, 0.16) 0%, hsla(45, 90%, 60%, 0.06) 35%, transparent 65%)",
        }}
      />
    </>
  );
};

export default BokehBackground;
