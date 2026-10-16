import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle, ChevronDown, Sparkles, Target } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { FloatingCoins, Magnetic, Marquee, SectionHeading, Stagger, WordReveal } from "@/components/motion";
import { useSEO } from "@/hooks/useSEO";

// Import goal images
import goalDreamHome from "@/assets/goal-dream-home.png";
import goalWealthCreation from "@/assets/goal-wealth-creation.png";
import goalRetirement from "@/assets/goal-retirement.png";
import goalEducation from "@/assets/goal-education.png";
import goalWedding from "@/assets/goal-wedding.png";
import goalEmergency from "@/assets/goal-emergency.png";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const goals = [
  {
    image: goalDreamHome,
    title: "Dream Home",
    subtitle: "Plan the down payment without overstretching",
    href: "/goals/dream-home",
  },
  {
    image: goalEducation,
    title: "Child's Education",
    subtitle: "Beat education cost inflation with an early start",
    href: "/goals/education",
  },
  {
    image: goalRetirement,
    title: "Retirement",
    subtitle: "Build an inflation adjusted income for life",
    href: "/goals/retirement",
  },
  {
    image: goalEmergency,
    title: "Financial Emergency",
    subtitle: "6 to 12 months of essentials, parked safely",
    href: "/goals/emergency",
  },
  {
    image: goalWedding,
    title: "Child's Wedding",
    subtitle: "Celebrate without disturbing other goals",
    href: "/goals/marriage",
  },
  {
    image: goalWealthCreation,
    title: "Wealth Creation",
    subtitle: "Long term compounding, with a clear plan",
    href: "/goals/wealth",
  },
];

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const HeroSection = () => (
  <section className="relative overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24">
    {/* Breathing orbs and floor grid */}
    <motion.div
      className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.75, 0.45] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
    <motion.div
      className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      animate={{ scale: [1.15, 1, 1.15], opacity: [0.6, 0.35, 0.6] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
    <div className="grid-floor opacity-50" aria-hidden="true" />
    <FloatingCoins className="opacity-70" />

    {/* Floating goal thumbnails on large screens */}
    <div className="hidden xl:block absolute inset-0 pointer-events-none" aria-hidden="true">
      {[
        { goal: goals[0], className: "right-[8%] top-[18%] w-40", float: "float-slow", delay: 1 },
        { goal: goals[2], className: "right-[22%] bottom-[14%] w-32", float: "float-slower", delay: 1.2 },
        { goal: goals[5], className: "right-[2%] bottom-[22%] w-28", float: "float-slow", delay: 1.4 },
      ].map(({ goal, className, float, delay }) => (
        <motion.div
          key={goal.title}
          className={`absolute ${className}`}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay, ease: EASE_OUT }}
        >
          <div className={`${float} glass-card border-spin overflow-hidden rounded-2xl p-1.5`}>
            <div className="aspect-square overflow-hidden rounded-xl">
              <img src={goal.image} alt="" className="h-full w-full object-cover ken-burns" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="section-container relative z-10">
      <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0 space-y-7">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
        >
          <Target className="w-3.5 h-3.5" />
          Goal based planning
        </motion.span>

        <WordReveal as="h1" className="heading-xl !leading-[1.08]" immediate delay={0.25} stagger={0.08}>
          Plan for what <span className="text-shimmer-gold">matters</span>
        </WordReveal>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE_OUT }}
        >
          Every financial goal deserves a dedicated strategy. Choose your goal and let's build a plan together.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE_OUT }}
        >
          <Magnetic>
            <a href="#goal-grid" className="btn-primary group">
              Explore Goals
              <ChevronDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <Link to="/contact" className="btn-secondary">
              Book a Consultation
            </Link>
          </Magnetic>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          {["Dedicated strategy per goal", "Clear time horizon", "Regular reviews"].map((chip, index) => (
            <motion.span
              key={chip}
              className="trust-chip backdrop-blur-md"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.12, ease: EASE_OUT }}
            >
              <CheckCircle className="w-4 h-4 mr-2 text-accent" />
              {chip}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Moving band of goal names                                                  */
/* -------------------------------------------------------------------------- */

const GoalsBand = () => (
  <section className="relative py-7 border-y border-primary/15 bg-background/40 backdrop-blur-sm">
    <Marquee duration={40}>
      {goals.map((goal) => (
        <span key={goal.title} className="flex items-center gap-6 px-6 text-xl sm:text-2xl font-semibold whitespace-nowrap">
          <span className="text-foreground/80">{goal.title}</span>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" aria-hidden="true" />
        </span>
      ))}
    </Marquee>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Goal card                                                                  */
/* -------------------------------------------------------------------------- */

const GoalCard = ({ goal, index }: { goal: (typeof goals)[number]; index: number }) => (
  <Link to={goal.href} className="block h-full group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
    <GlassCard
      tilt
      className="relative !p-0 overflow-hidden h-[320px] sm:h-[360px] lg:h-[400px] rounded-2xl group-hover:shadow-[0_20px_60px_-20px_hsla(45,90%,60%,0.45)]"
    >
      {/* Image: continuous slow ken burns, extra zoom on hover */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-110">
          <div
            className="absolute inset-0 ken-burns"
            style={{
              backgroundImage: `url(${goal.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              animationDelay: `${-index * 4}s`,
            }}
          />
        </div>
      </div>

      {/* Vignette overlay for cinematic blending */}
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%),
            linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 30%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Gold glowing edge on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px hsla(45, 90%, 62%, 0.55), inset 0 0 40px hsla(45, 90%, 60%, 0.18)",
        }}
        aria-hidden="true"
      />

      {/* Index badge */}
      <span
        className="absolute left-5 top-4 text-xs font-mono text-accent/80 px-2.5 py-1 rounded-full bg-background/50 backdrop-blur-md border border-accent/20"
        aria-hidden="true"
      >
        0{index + 1}
      </span>

      {/* Arrow chip */}
      <span
        className="absolute right-5 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-background/50 backdrop-blur-md text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-45 group-hover:scale-110"
        aria-hidden="true"
      >
        <ArrowUpRight className="w-4 h-4" />
      </span>

      {/* Glass strip with title, slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <div className="rounded-xl px-5 py-4 bg-background/70 backdrop-blur-md border border-accent/20 shadow-[0_4px_20px_hsla(0,0%,0%,0.3)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-accent/50">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
            {goal.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{goal.subtitle}</p>
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
            <div className="overflow-hidden">
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent">
                View the plan
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  </Link>
);

const GoalsGridSection = () => (
  <section id="goal-grid" className="py-24 scroll-mt-24">
    <div className="section-container">
      <SectionHeading
        eyebrow="Choose your goal"
        title={<>Six goals, <span className="text-shimmer-gold">one clear plan</span> each</>}
        subtitle="Pick the milestone that matters most to you and see how we approach it."
      />
      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.12}>
        {goals.map((goal, index) => (
          <GoalCard key={goal.title} goal={goal} index={index} />
        ))}
      </Stagger>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Closing call to action                                                     */
/* -------------------------------------------------------------------------- */

const CTASection = () => (
  <section className="py-24">
    <div className="section-container">
      <ScrollReveal scale>
        <div className="glass-card border-spin relative overflow-hidden rounded-[2rem] px-6 py-16 sm:p-20 text-center">
          <motion.div
            className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.7, 0.4, 0.7] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <FloatingCoins className="opacity-60" />

          <div className="relative">
            <span className="eyebrow mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Free consultation
            </span>
            <WordReveal as="h2" className="heading-lg mb-5">
              Not sure which goal to <span className="text-shimmer-gold">prioritize</span>?
            </WordReveal>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Book a free consultation and we'll help you create a personalized financial roadmap.
            </p>
            <Magnetic strength={0.35}>
              <Link to="/contact" className="btn-primary group text-lg px-8 py-4 animate-pulse-glow">
                Book a Consultation
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const GoalsPage = () => {
  useSEO({
    title: "Goal based Investment Planning",
    description:
      "Plan dedicated investment strategies for life goals: home, child's education, retirement, emergency fund, wedding and long term wealth creation.",
    canonicalPath: "/goals",
  });

  return (
    <>
      <HeroSection />
      <GoalsBand />
      <GoalsGridSection />
      <CTASection />
    </>
  );
};

export default GoalsPage;
