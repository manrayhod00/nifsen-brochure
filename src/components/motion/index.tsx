import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Children, ReactNode, isValidElement, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Word by word headline reveal                                               */
/* -------------------------------------------------------------------------- */

interface WordRevealProps {
  /** Plain text, or an array mixing strings and highlighted nodes */
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Seconds between words */
  stagger?: number;
  /** Animate on mount instead of when scrolled into view */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const splitNode = (node: ReactNode): ReactNode[] => {
  if (typeof node === "string") {
    return node.split(/(\s+)/).filter((part) => part.length > 0);
  }
  return [node];
};

export const WordReveal = ({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
  as = "h2",
}: WordRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const show = immediate || inView;

  const parts = Children.toArray(children).flatMap(splitNode);
  let wordIndex = 0;

  const Tag = motion[as];

  return (
    <Tag ref={ref as never} className={className}>
      {parts.map((part, i) => {
        if (typeof part === "string" && /^\s+$/.test(part)) return part;
        if (isValidElement(part) && part.type === "br") return <br key={i} />;
        const index = wordIndex++;
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0, rotate: 4 }}
              animate={show ? { y: "0%", opacity: 1, rotate: 0 } : undefined}
              transition={{ duration: 0.9, delay: delay + index * stagger, ease: EASE_OUT }}
            >
              {part}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
};

/* -------------------------------------------------------------------------- */
/* Section heading: eyebrow chip, revealed title, subtitle                    */
/* -------------------------------------------------------------------------- */

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const centered = align === "center";

  return (
    <div ref={ref} className={cn("mb-14", centered && "text-center", className)}>
      {eyebrow && (
        <motion.span
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          {eyebrow}
        </motion.span>
      )}
      <WordReveal as="h2" className="heading-lg" delay={0.1}>
        {title}
      </WordReveal>
      <motion.div
        className={cn("mt-5 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent", centered && "mx-auto")}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 0.35, ease: EASE_OUT }}
      />
      {subtitle && (
        <motion.p
          className={cn("mt-5 text-muted-foreground max-w-2xl text-lg leading-relaxed", centered && "mx-auto")}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Infinite marquee                                                           */
/* -------------------------------------------------------------------------- */

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

export const Marquee = ({ children, duration = 40, reverse = false, className }: MarqueeProps) => (
  <div
    className={cn("marquee", reverse && "marquee-reverse", className)}
    style={{ ["--marquee-duration" as string]: `${duration}s` }}
  >
    <div className="marquee-track">{children}</div>
    <div className="marquee-track" aria-hidden="true">
      {children}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Counting number                                                            */
/* -------------------------------------------------------------------------- */

export const CountUp = ({
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Scroll progress bar                                                        */
/* -------------------------------------------------------------------------- */

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(262 83% 58%), hsl(285 70% 55%), hsl(45 90% 62%))",
        boxShadow: "0 0 12px hsla(45, 90%, 60%, 0.6)",
      }}
    />
  );
};

/* -------------------------------------------------------------------------- */
/* Parallax: moves its child at a different speed while scrolling             */
/* -------------------------------------------------------------------------- */

export const useParallax = (range = 120): [React.RefObject<HTMLDivElement>, MotionValue<number>] => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : range]);
  return [ref, y];
};

/* -------------------------------------------------------------------------- */
/* Magnetic wrapper: content leans towards the pointer                        */
/* -------------------------------------------------------------------------- */

export const Magnetic = ({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Drifting gold coins for hero areas                                         */
/* -------------------------------------------------------------------------- */

const COINS = [
  { left: "8%", size: 18, duration: 14, delay: 0 },
  { left: "22%", size: 12, duration: 18, delay: -6 },
  { left: "41%", size: 22, duration: 16, delay: -3 },
  { left: "57%", size: 14, duration: 20, delay: -11 },
  { left: "69%", size: 20, duration: 15, delay: -8 },
  { left: "83%", size: 11, duration: 19, delay: -2 },
  { left: "93%", size: 16, duration: 17, delay: -13 },
];

export const FloatingCoins = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {COINS.map((coin, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[-40px] rounded-full"
          style={{
            left: coin.left,
            width: coin.size,
            height: coin.size,
            background:
              "radial-gradient(circle at 35% 30%, hsl(48 100% 85%), hsl(43 85% 58%) 45%, hsl(36 70% 38%) 100%)",
            boxShadow: "0 0 18px hsla(45, 95%, 60%, 0.55)",
          }}
          animate={{ y: ["0vh", "-110vh"], x: [0, 24, -18, 10], rotateY: [0, 360], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: coin.duration,
            delay: coin.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.85, 1],
          }}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Stagger group: children rise in one after another                          */
/* -------------------------------------------------------------------------- */

export const Stagger = ({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {Children.map(children, (child) => (
        <motion.div
          className="h-full"
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.96 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.9, ease: EASE_OUT },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
