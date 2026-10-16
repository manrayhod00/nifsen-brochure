import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Home } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { FloatingCoins, Magnetic, WordReveal } from "@/components/motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const DIGITS = ["4", "0", "4"];

const NotFound = () => {
  useSEO({ title: "Page not found" });
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Ambient layers */}
      <div className="grid-floor opacity-40" aria-hidden="true" />
      <FloatingCoins className="opacity-70" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, hsla(262, 83%, 58%, 0.28), transparent 65%)" }}
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative text-center space-y-6">
        <h1 className="flex justify-center gap-1 sm:gap-3 text-8xl sm:text-9xl font-black leading-none" aria-label="404">
          {DIGITS.map((digit, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 60, rotateX: -80, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: EASE_OUT }}
              aria-hidden="true"
            >
              <motion.span
                className="inline-block text-shimmer-gold"
                style={{ filter: "drop-shadow(0 0 24px hsla(45, 95%, 60%, 0.35))" }}
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 4, delay: 1.2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {digit}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
          aria-hidden="true"
        />

        <WordReveal as="h2" className="heading-md" delay={0.5} immediate>
          Page not found
        </WordReveal>

        <motion.p
          className="text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE_OUT }}
        >
          <Magnetic strength={0.3}>
            <Link to="/" className="btn-primary group inline-flex">
              <Home className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Back to Home
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
