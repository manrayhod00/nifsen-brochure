import { Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  ChevronDown,
  Clock,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import { CountUp, FloatingCoins, Magnetic, SectionHeading, Stagger, WordReveal, useParallax } from "@/components/motion";
import { useSEO } from "@/hooks/useSEO";

// Import goal images
import goalDreamHome from "@/assets/goal-dream-home.png";
import goalWealthCreation from "@/assets/goal-wealth-creation.png";
import goalRetirement from "@/assets/goal-retirement.png";
import goalEducation from "@/assets/goal-education.png";
import goalWedding from "@/assets/goal-wedding.png";
import goalEmergency from "@/assets/goal-emergency.png";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type GoalType = "dream-home" | "education" | "retirement" | "emergency" | "marriage" | "wealth";

interface GoalDetail {
  title: string;
  image: string;
  description: string;
  timeHorizon: string;
  approach: string[];
  considerations: string[];
}

const goalDetails: Record<GoalType, GoalDetail> = {
  "dream-home": {
    title: "Dream Home",
    image: goalDreamHome,
    description:
      "Owning a home is one of life's biggest milestones. With proper planning and disciplined savings, you can make this dream a reality without overextending your finances.",
    timeHorizon: "5 to 10 years",
    approach: [
      "Assess your budget and preferred location",
      "Calculate down payment requirements (typically 20%)",
      "Build a dedicated investment corpus",
      "Consider both SIP and lump sum investments",
    ],
    considerations: [
      "Factor in registration, stamp duty, and interior costs",
      "Plan for ongoing EMI payments within your budget",
      "Keep 6 months of EMI as emergency reserve",
    ],
  },
  education: {
    title: "Child's Education",
    image: goalEducation,
    description:
      "Education costs are rising faster than general inflation. Starting early gives you the advantage of compounding and reduces the burden when the time comes.",
    timeHorizon: "10 to 18 years",
    approach: [
      "Estimate future education costs with inflation",
      "Start SIPs as early as possible",
      "Choose equity oriented funds for long horizons",
      "Gradually shift to safer instruments as goal approaches",
    ],
    considerations: [
      "Consider both domestic and international education options",
      "Factor in living expenses, not just tuition",
      "Plan for entrance coaching and test fees",
    ],
  },
  retirement: {
    title: "Retirement",
    image: goalRetirement,
    description:
      "Retirement may seem far away, but the earlier you start, the easier it becomes. A well planned retirement fund ensures you maintain your lifestyle without compromise.",
    timeHorizon: "20 to 30 years",
    approach: [
      "Calculate your retirement corpus using current expenses",
      "Account for inflation and healthcare costs",
      "Maximize equity exposure in early years",
      "Build multiple income streams for after retirement",
    ],
    considerations: [
      "Don't rely solely on EPF/PPF",
      "Plan for 25 to 30 years of life after retirement",
      "Consider increasing allocation with salary increments",
    ],
  },
  emergency: {
    title: "Financial Emergency",
    image: goalEmergency,
    description:
      "An emergency fund is your financial safety net. It protects you from taking on debt or liquidating investments during unexpected situations.",
    timeHorizon: "6 to 12 months",
    approach: [
      "Target 6 to 12 months of essential expenses",
      "Keep funds highly liquid (savings/liquid funds)",
      "Separate from regular savings accounts",
      "Replenish immediately after any withdrawal",
    ],
    considerations: [
      "Don't invest emergency funds in volatile assets",
      "Review and update annually with lifestyle changes",
      "Consider health insurance to reduce emergency needs",
    ],
  },
  marriage: {
    title: "Child's Wedding",
    image: goalWedding,
    description:
      "A child's wedding is a significant family event. Planning ahead helps you celebrate without financial stress and gives you flexibility in your choices.",
    timeHorizon: "15 to 25 years",
    approach: [
      "Start early to leverage compounding",
      "Estimate costs based on your preferences",
      "Use equity funds for long term growth",
      "Shift to debt instruments 2 to 3 years before the event",
    ],
    considerations: [
      "Costs vary significantly based on preferences",
      "Don't compromise retirement savings for this goal",
      "Consider involving your child in financial planning",
    ],
  },
  wealth: {
    title: "Wealth Creation",
    image: goalWealthCreation,
    description:
      "Long term wealth creation is about disciplined investing over time. It's not about timing the market, but time in the market.",
    timeHorizon: "10+ years",
    approach: [
      "Define clear, measurable financial goals",
      "Invest consistently regardless of market conditions",
      "Diversify across asset classes and geographies",
      "Review and rebalance portfolio annually",
    ],
    considerations: [
      "Stay invested during market volatility",
      "Increase investments with income growth",
      "Avoid emotional decision making",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* Hero: parallax goal image with a slow cinematic zoom                       */
/* -------------------------------------------------------------------------- */

const HeroSection = ({ goal }: { goal: GoalDetail }) => {
  const [ref, bgY] = useParallax(140);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden">
      <motion.div className="absolute inset-0 -top-[10%] h-[120%]" style={{ y: bgY }} aria-hidden="true">
        <div
          className="absolute inset-0 ken-burns"
          style={{
            backgroundImage: `url(${goal.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>

      {/* Gradient overlay, darker at the bottom for text */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 30%, hsl(var(--background) / 0.3) 60%, transparent 100%),
            radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.5) 100%)
          `,
        }}
        aria-hidden="true"
      />
      <div className="grid-floor opacity-40" aria-hidden="true" />
      <FloatingCoins className="opacity-70" />

      <motion.div className="relative z-10 hero-container pb-14 sm:pb-20 pt-28 w-full" style={{ y: contentY }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
        >
          <Link
            to="/goals"
            className="group inline-flex items-center px-4 py-2 rounded-full bg-background/40 backdrop-blur-md border border-primary/30 text-sm text-muted-foreground hover:text-foreground hover:border-accent/40 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Goals
          </Link>
        </motion.div>

        <motion.span
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
        >
          <Target className="w-3.5 h-3.5" />
          Goal plan
        </motion.span>

        <WordReveal as="h1" className="heading-xl mb-5 !leading-[1.08]" immediate delay={0.3} stagger={0.1}>
          <span className="text-shimmer-gold">{goal.title}</span>
        </WordReveal>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT }}
        >
          {goal.description}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: EASE_OUT }}
        >
          <span className="trust-chip backdrop-blur-md">
            <Clock className="w-4 h-4 mr-2 text-accent" />
            {goal.timeHorizon}
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden="true"
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.span>
      </motion.div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* At a glance strip                                                          */
/* -------------------------------------------------------------------------- */

const GlanceStrip = ({ goal }: { goal: GoalDetail }) => (
  <section className="py-12">
    <div className="section-container">
      <ScrollReveal scale>
        <div className="glass-card border-spin rounded-3xl grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-primary/15">
          <div className="p-8 text-center">
            <motion.div
              className="icon-orb w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/25 flex items-center justify-center"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <Clock className="w-6 h-6 text-accent" />
            </motion.div>
            <div className="text-3xl sm:text-4xl font-bold text-shimmer-gold">{goal.timeHorizon}</div>
            <div className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">Time horizon</div>
          </div>
          <div className="p-8 text-center">
            <div className="icon-orb w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/25 flex items-center justify-center float-slow" aria-hidden="true">
              <ListChecks className="w-6 h-6 text-accent" />
            </div>
            <CountUp to={goal.approach.length} className="block text-3xl sm:text-4xl font-bold text-shimmer-gold" />
            <div className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">Steps in the approach</div>
          </div>
          <div className="p-8 text-center">
            <div className="icon-orb w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/25 flex items-center justify-center float-slower" aria-hidden="true">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <CountUp to={goal.considerations.length} className="block text-3xl sm:text-4xl font-bold text-shimmer-gold" />
            <div className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">Key considerations</div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Suggested approach: numbered steps                                         */
/* -------------------------------------------------------------------------- */

const ApproachSection = ({ goal }: { goal: GoalDetail }) => (
  <section className="py-20">
    <div className="section-container">
      <SectionHeading
        eyebrow="Suggested approach"
        title={<>How we would <span className="text-shimmer-gold">plan it</span></>}
        subtitle={`A step by step path for your ${goal.title.toLowerCase()} goal.`}
      />
      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.12}>
        {goal.approach.map((item, index) => (
          <GlassCard key={item} className="p-7 h-full group" tilt>
            <div className="absolute right-5 top-3 text-6xl font-bold text-primary/10 select-none" aria-hidden="true">
              0{index + 1}
            </div>
            <div className="icon-orb w-12 h-12 mb-6 rounded-xl bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
              <CheckCircle className="w-6 h-6 text-accent" aria-hidden="true" />
            </div>
            <p className="text-foreground/90 leading-relaxed">{item}</p>
          </GlassCard>
        ))}
      </Stagger>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Key considerations: tips sliding in                                        */
/* -------------------------------------------------------------------------- */

const ConsiderationsSection = ({ goal }: { goal: GoalDetail }) => (
  <section className="py-20">
    <div className="section-container">
      <div className="grid lg:grid-cols-5 gap-10 items-center">
        <ScrollReveal direction="right" className="lg:col-span-2">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="glass-card border-spin rounded-3xl p-2 float-slow">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                <img src={goal.image} alt={`${goal.title} goal illustration`} className="h-full w-full object-cover ken-burns" />
              </div>
            </div>
            <motion.div
              className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-accent/25 blur-3xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>

        <div className="lg:col-span-3">
          <SectionHeading
            align="left"
            eyebrow="Keep in mind"
            title={<>Key <span className="text-shimmer-gold">considerations</span></>}
            className="mb-10"
          />
          <ul className="space-y-4">
            {goal.considerations.map((item, index) => (
              <li key={item}>
                <ScrollReveal direction="left" delay={index * 0.12}>
                  <GlassCard className="p-5 group" tilt>
                    <div className="flex items-start gap-4">
                      <div className="icon-orb shrink-0 w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:-rotate-6">
                        <Lightbulb className="w-5 h-5 text-accent" aria-hidden="true" />
                      </div>
                      <span className="pt-2 text-muted-foreground group-hover:text-foreground/90 transition-colors">
                        {item}
                      </span>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Other goals                                                                */
/* -------------------------------------------------------------------------- */

const OtherGoalsSection = ({ current }: { current: GoalType }) => {
  const others = (Object.keys(goalDetails) as GoalType[]).filter((key) => key !== current);

  return (
    <section className="py-20">
      <div className="section-container">
        <SectionHeading
          eyebrow="Explore more"
          title={<>Other goals to <span className="text-shimmer-gold">plan for</span></>}
        />
        <Stagger className="grid grid-cols-2 lg:grid-cols-5 gap-4" stagger={0.08}>
          {others.map((key) => {
            const other = goalDetails[key];
            return (
              <Link key={key} to={`/goals/${key}`} className="block h-full group rounded-2xl">
                <GlassCard tilt className="relative !p-0 overflow-hidden h-44 sm:h-52 rounded-2xl">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-110" aria-hidden="true">
                    <div
                      className="absolute inset-0 ken-burns"
                      style={{
                        backgroundImage: `url(${other.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.6) 45%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 1px hsla(45, 90%, 62%, 0.55), inset 0 0 30px hsla(45, 90%, 60%, 0.18)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-background/50 backdrop-blur-md text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-45"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="absolute bottom-0 inset-x-0 p-4 transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                      {other.title}
                    </h3>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Closing call to action                                                     */
/* -------------------------------------------------------------------------- */

const CTASection = ({ goal }: { goal: GoalDetail }) => (
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
              Ready to start <span className="text-shimmer-gold">planning</span>?
            </WordReveal>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Book a consultation and let's create a personalized plan for your {goal.title.toLowerCase()} goal.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Magnetic strength={0.35}>
                <Link to="/contact" className="btn-primary group text-lg px-8 py-4 animate-pulse-glow">
                  Book a Consultation
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/goals" className="btn-secondary text-lg px-8 py-4">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Goals
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const GoalDetailPage = () => {
  const { type } = useParams<{ type: GoalType }>();
  const goal = goalDetails[type as GoalType];

  useSEO({
    title: goal ? `${goal.title} | Goal Planning` : "Goal Planning",
    description: goal ? goal.description : "Goal based investment planning by NIFSEN.",
    canonicalPath: `/goals/${type ?? ""}`,
  });

  if (!goal) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="heading-lg mb-4">Goal not found</h1>
        <Link to="/goals" className="text-accent hover:underline">
          Back to Goals
        </Link>
      </div>
    );
  }

  return (
    <Fragment key={type}>
      <HeroSection goal={goal} />
      <GlanceStrip goal={goal} />
      <ApproachSection goal={goal} />
      <ConsiderationsSection goal={goal} />
      <OtherGoalsSection current={type as GoalType} />
      <CTASection goal={goal} />
    </Fragment>
  );
};

export default GoalDetailPage;
