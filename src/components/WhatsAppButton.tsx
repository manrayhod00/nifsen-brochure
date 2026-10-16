import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import motilalOswalLogo from "@/assets/motilal-oswal-logo.png";
import { contact, whatsappLink } from "@/config/contact";

/** Tooltip that slides in from the right when its button is hovered or focused */
const Tooltip = ({ children }: { children: ReactNode }) => (
  <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-lg border border-border/40 bg-card/90 px-3 py-2 text-sm text-foreground opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
    {children}
  </span>
);

/** A soft ring that keeps expanding outward from the button */
const PulseRing = ({ color, delay = 0, peak = 0.35 }: { color: string; delay?: number; peak?: number }) => {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.span
      className="pointer-events-none absolute inset-0 rounded-full"
      style={{ border: `2px solid ${color}` }}
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: [1, 1.6], opacity: [peak, 0] }}
      transition={{ duration: 2.8, delay, repeat: Infinity, repeatDelay: 0.6, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
};

const popIn = (delay: number) => ({
  initial: { opacity: 0, scale: 0.4, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 260, damping: 18, delay },
});

const WhatsAppButton = () => {
  const whatsappUrl = whatsappLink();
  const openAccountUrl = contact.openDematUrl;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Open Account Button */}
      <motion.a
        href={openAccountUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Open Account with Motilal Oswal"
        {...popIn(0.8)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <div className="relative">
          <Tooltip>Open Account</Tooltip>
          <PulseRing color="#1a3a8f" delay={1.4} peak={0.3} />
          <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-white border-2 border-[#1a3a8f] overflow-hidden p-1.5">
            <img src={motilalOswalLogo} alt="Motilal Oswal" className="w-full h-full object-contain" />
          </div>
        </div>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Chat on WhatsApp"
        {...popIn(1)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <div className="relative">
          <Tooltip>Chat on WhatsApp</Tooltip>
          <PulseRing color="#25D366" delay={1.2} peak={0.5} />
          <PulseRing color="#25D366" delay={2.6} peak={0.5} />
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center bg-[#25D366] shadow-[0_10px_24px_-8px_rgba(37,211,102,0.55)] transition-shadow duration-300 group-hover:shadow-[0_0_28px_rgba(37,211,102,0.6)]"
          >
            <MessageCircle className="w-7 h-7 text-white" fill="white" />
          </div>
        </div>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
