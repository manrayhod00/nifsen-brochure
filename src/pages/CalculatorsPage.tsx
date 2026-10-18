import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Target, CreditCard, ArrowRight, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { FloatingCoins, Marquee, Stagger, WordReveal, useParallax } from "@/components/motion";
import { useSEO } from "@/hooks/useSEO";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const calculators = [
  {
    icon: TrendingUp,
    title: "SIP Calculator",
    description: "Calculate the future value of your Systematic Investment Plan.",
    href: "/calculators/sip",
  },
  {
    icon: Calculator,
    title: "Compounding Calculator",
    description: "See how your money grows with the power of compounding.",
    href: "/calculators/compounding",
  },
  {
    icon: Target,
    title: "Retirement Calculator",
    description: "Estimate how much you need to save for a comfortable retirement.",
    href: "/calculators/retirement",
  },
  {
    icon: CreditCard,
    title: "EMI Calculator",
    description: "Calculate your monthly EMI for loans and plan your finances.",
    href: "/calculators/emi",
  },
];

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const HeroSection = () => {
  const [ref, orbY] = useParallax(120);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-28">
      {/* Ambient backdrop */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: orbY }} aria-hidden="true">
        <motion.div
          className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/35 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 right-[-6rem] h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.6, 0.35, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="grid-floor opacity-60" aria-hidden="true" />
      <FloatingCoins className="opacity-70" />

      {/* Floating calculator glyphs on wide screens */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {calculators.slice(0, 3).map((calc, index) => (
          <motion.div
            key={calc.title}
            className={`absolute ${["right-[10%] top-[22%]", "right-[24%] bottom-[18%]", "right-[4%] bottom-[30%]"][index]}`}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 + index * 0.2, ease: EASE_OUT }}
          >
            <div
              className={`${index % 2 === 0 ? "float-slow" : "float-slower"} glass-card border-spin flex h-16 w-16 items-center justify-center rounded-2xl`}
            >
              <calc.icon className="h-7 w-7 text-accent" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          <motion.span
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Free calculators
          </motion.span>

          <WordReveal as="h1" className="heading-xl mb-6 !leading-[1.08]" immediate delay={0.25} stagger={0.08}>
            Simple calculators. <span className="text-shimmer-gold">Clear</span>{" "}
            <span className="text-shimmer-gold">decisions.</span>
          </WordReveal>

          <motion.p
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE_OUT }}
          >
            Use our free financial calculators to plan your investments and understand your options better.
          </motion.p>

          <motion.div
            className="mt-6 h-px w-32 origin-left bg-gradient-to-r from-accent via-accent/60 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.1, ease: EASE_OUT }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Moving band of calculator names                                            */
/* -------------------------------------------------------------------------- */

const CalculatorsBand = () => (
  <section className="relative py-6 border-y border-primary/15 bg-background/40" aria-hidden="true">
    <Marquee duration={35}>
      {calculators.map((calc) => (
        <span key={calc.title} className="flex items-center gap-6 px-6 text-lg sm:text-xl font-semibold whitespace-nowrap">
          <span className="text-foreground/80">{calc.title}</span>
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
        </span>
      ))}
    </Marquee>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Calculator grid                                                            */
/* -------------------------------------------------------------------------- */

const CalculatorGrid = () => (
  <section className="py-20">
    <div className="section-container">
      <Stagger className="grid sm:grid-cols-2 gap-6" stagger={0.12}>
        {calculators.map((calc, index) => (
          <Link key={calc.title} to={calc.href} className="block h-full rounded-2xl">
            <GlassCard className="p-8 h-full group flex flex-col" tilt>
              {/* Spinning border that lights up on hover */}
              <span
                className="border-spin pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span
                className="absolute right-6 top-4 text-6xl font-bold text-primary/10 select-none transition-colors duration-500 group-hover:text-accent/15"
                aria-hidden="true"
              >
                0{index + 1}
              </span>

              <div className="icon-orb w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                <calc.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">{calc.title}</h3>
              <p className="text-muted-foreground mb-6 flex-1">{calc.description}</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium">
                Open Calculator
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </span>
            </GlassCard>
          </Link>
        ))}
      </Stagger>
    </div>
  </section>
);

const CalculatorsPage = () => {
  useSEO({
    title: "Free Financial Calculators: SIP, EMI, Retirement",
    description:
      "Free SIP, compounding, retirement and EMI calculators to plan your investments and loans.",
    canonicalPath: "/calculators",
  });

  return (
    <>
      <HeroSection />
      <CalculatorsBand />
      <CalculatorGrid />
    </>
  );
};

export default CalculatorsPage;
