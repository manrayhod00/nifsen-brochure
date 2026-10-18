import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  TrendingUp,
  RefreshCw,
  Shield,
  FileText,
  Users,
  ArrowRight,
  CheckCircle,
  Lock,
  Compass,
  MessageSquare,
  MapPin,
  Sparkles,
  Building2,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import {
  CountUp,
  FloatingCoins,
  Magnetic,
  Marquee,
  SectionHeading,
  Stagger,
  WordReveal,
  useParallax,
} from "@/components/motion";
import heroHomeBg from "@/assets/hero-home-bg.png";
import { useSEO } from "@/hooks/useSEO";
import { branches } from "@/config/contact";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const heroFloatCards = [
  {
    icon: Building2,
    title: `${branches.length} offices`,
    text: "Karnataka, Telangana & West Bengal",
    className: "right-[6%] top-[22%]",
    float: "float-slow",
    delay: 1.1,
  },
  {
    icon: BadgeCheck,
    title: "AMFI registered",
    text: "Mutual Fund Distributor",
    className: "right-[30%] bottom-[16%]",
    float: "float-slower",
    delay: 1.3,
  },
];

const HeroSection = () => {
  const [ref, bgY] = useParallax(160);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} className="relative min-h-[92vh] lg:min-h-screen overflow-hidden flex items-center">
      {/* Parallax art with a slow cinematic zoom */}
      <motion.div className="absolute inset-0 -top-[10%] h-[120%]" style={{ y: bgY }} aria-hidden="true">
        <div
          className="absolute inset-0 ken-burns"
          style={{
            backgroundImage: `url(${heroHomeBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>

      {/* Overlays: darker on the left for the text, lighter on the right for the art */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 25%, hsl(var(--background) / 0.65) 50%, hsl(var(--background) / 0.2) 75%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.9) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="grid-floor opacity-60" aria-hidden="true" />
      <FloatingCoins className="opacity-80" />

      {/* Floating glass info cards over the artwork */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {heroFloatCards.map((card) => (
          <motion.div
            key={card.title}
            className={`absolute ${card.className}`}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: card.delay, ease: EASE_OUT }}
          >
            <div className={`${card.float} glass-card border-spin flex items-center gap-3 rounded-2xl px-4 py-3`}>
              <div className="icon-orb w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center">
                <card.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{card.title}</div>
                <div className="text-xs text-muted-foreground">{card.text}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="hero-container relative z-10" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="max-w-2xl py-24 lg:py-0">
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30"
              initial={{ opacity: 0, y: -12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-medium text-foreground/90">Goal first investing · discipline · clarity</span>
            </motion.div>

            {/* Headline */}
            <WordReveal as="h1" className="heading-xl !leading-[1.08]" immediate delay={0.3} stagger={0.08}>
              Build wealth with <span className="text-shimmer-gold">calm</span> strategy.
              <br />
              Stay <span className="text-shimmer-gold">consistent</span>.
            </WordReveal>

            {/* Subtext */}
            <motion.p
              className="text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: EASE_OUT }}
            >
              NIFSEN Investment Services Limited helps you invest with a transparent process, aligned to your goals,
              your time horizon and your comfort with risk.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
            >
              <Magnetic>
                <Link to="/contact" className="btn-primary group">
                  Book a Consultation
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/services" className="btn-secondary">
                  Explore Services
                </Link>
              </Magnetic>
            </motion.div>

            {/* Trust Chips */}
            <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
              {["Transparent process", "Integrity first", "Long term focus"].map((chip, index) => (
                <motion.span
                  key={chip}
                  className="trust-chip"
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.12, ease: EASE_OUT }}
                >
                  <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-hidden="true"
      >
        <span className="tracking-[0.25em] uppercase text-[10px]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.span>
      </motion.div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Moving band of what we cover                                               */
/* -------------------------------------------------------------------------- */

const bandItems = [
  "Mutual Funds",
  "SIP Planning",
  "Insurance",
  "Retirement",
  "Child's Education",
  "Portfolio Reviews",
  "Wealth Creation",
  "Emergency Fund",
  "Dream Home",
];

const ServicesBand = () => (
  <section className="relative py-8 border-y border-primary/15 bg-background/40">
    <Marquee duration={45}>
      {bandItems.map((item) => (
        <span key={item} className="flex items-center gap-6 px-6 text-xl sm:text-2xl font-semibold whitespace-nowrap">
          <span className="text-foreground/80">{item}</span>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </span>
      ))}
    </Marquee>
  </section>
);

/* -------------------------------------------------------------------------- */
/* What we do                                                                 */
/* -------------------------------------------------------------------------- */

const WhatWeDoSection = () => {
  const services = [
    {
      icon: Target,
      title: "Goal First Planning",
      description: "Portfolios built around your outcomes, not market noise.",
    },
    {
      icon: TrendingUp,
      title: "Mutual Fund Research",
      description: "Shortlists built on risk fit and consistency, not hype.",
    },
    {
      icon: RefreshCw,
      title: "Portfolio Reviews",
      description: "Monitoring and rebalancing at the right frequency.",
    },
  ];

  return (
    <section className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="What we do"
          title={<>Three core areas, <span className="text-shimmer-gold">done well</span></>}
          subtitle="Calm on the surface, strong in execution."
        />

        <Stagger className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlassCard key={service.title} className="p-8 text-center h-full group" tilt>
              <div className="absolute right-6 top-4 text-6xl font-bold text-primary/10 select-none" aria-hidden="true">
                0{index + 1}
              </div>
              <div className="icon-orb w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </GlassCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Why NIFSEN: bento grid                                                     */
/* -------------------------------------------------------------------------- */

const WhyNifsenSection = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Process driven decisions",
      description: "Every recommendation follows a documented framework, never gut feel or market noise.",
    },
    {
      icon: Target,
      title: "Risk aligned recommendations",
      description: "Plans built around your comfort with volatility, not someone else's benchmark.",
    },
    {
      icon: FileText,
      title: "Simple reporting",
      description: "Clear statements, free of jargon, so you always know how your money is doing.",
    },
    {
      icon: Users,
      title: "Long term discipline",
      description: "Regular reviews and steady rebalancing instead of chasing the latest trend.",
    },
  ];

  const [first, ...rest] = reasons;

  return (
    <section className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Why NIFSEN"
          title={<>Principles that put <span className="text-shimmer-gold">you first</span></>}
          subtitle="Our approach is built on a few simple rules we never bend."
        />

        <div className="grid lg:grid-cols-3 gap-5">
          <ScrollReveal className="lg:row-span-2" scale>
            <GlassCard className="border-spin p-10 h-full flex flex-col justify-between min-h-[320px]" tilt>
              <div>
                <div className="icon-orb w-16 h-16 mb-8 rounded-2xl bg-primary/25 flex items-center justify-center">
                  <first.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">{first.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{first.description}</p>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm text-accent font-medium">
                <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
                Our foundation
              </div>
            </GlassCard>
          </ScrollReveal>

          {rest.map((reason, index) => (
            <ScrollReveal
              key={reason.title}
              delay={0.12 * (index + 1)}
              direction={index % 2 === 0 ? "left" : "up"}
              className={index === 2 ? "lg:col-span-2" : ""}
            >
              <GlassCard className="p-7 h-full group" tilt>
                <div className="flex items-start gap-5">
                  <div className="icon-orb shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:-rotate-6">
                    <reason.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground/95">{reason.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Numbers strip                                                              */
/* -------------------------------------------------------------------------- */

const NumbersSection = () => {
  const stats = [
    { value: branches.length, label: "Offices" },
    { value: new Set(branches.map((b) => b.state)).size, label: "States served" },
    { value: 6, label: "Life goals we plan for" },
    { value: 4, label: "Free calculators" },
  ];

  return (
    <section className="py-12">
      <div className="section-container">
        <ScrollReveal scale>
          <div className="glass-card border-spin rounded-3xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-primary/15">
            {stats.map((stat) => (
              <div key={stat.label} className="p-8 text-center">
                <CountUp to={stat.value} className="block text-5xl sm:text-6xl font-bold text-shimmer-gold" />
                <div className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Services snapshot                                                          */
/* -------------------------------------------------------------------------- */

const ServicesSnapshotSection = () => {
  const services = [
    {
      title: "Mutual Funds",
      description: "Research backed fund selection aligned with your goals.",
      href: "/services#mutual-funds",
    },
    {
      title: "Insurance Planning",
      description: "Protection coverage that fits your stage of life.",
      href: "/services#insurance",
    },
    {
      title: "Goal Planning",
      description: "Structured plans for life's important milestones.",
      href: "/goals",
    },
    {
      title: "Reviews & Rebalancing",
      description: "Regular portfolio health checks and adjustments.",
      href: "/services#reviews",
    },
  ];

  return (
    <section className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Our services"
          title={<>Guidance for every <span className="text-shimmer-gold">milestone</span></>}
          subtitle="Comprehensive financial guidance tailored to your needs."
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.12}>
          {services.map((service, index) => (
            <Link key={service.title} to={service.href} className="block h-full">
              <GlassCard className="p-7 h-full group flex flex-col" tilt>
                <span className="text-xs font-mono text-accent/70 mb-6">0{index + 1}</span>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm text-accent font-medium">
                  Learn more
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </span>
              </GlassCard>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* How it works: timeline that draws itself as you scroll                     */
/* -------------------------------------------------------------------------- */

const HowItWorksSection = () => {
  const steps = [
    { number: "01", title: "Understand goals", description: "We listen to what matters most to you." },
    { number: "02", title: "Risk fit plan", description: "Create a plan that matches your comfort level." },
    { number: "03", title: "Start with a shortlist", description: "Begin with carefully selected options." },
    { number: "04", title: "Monitor & rebalance", description: "Regular reviews keep you on track." },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="How it works"
          title={<>Four calm steps to <span className="text-shimmer-gold">clarity</span></>}
          subtitle="A simple, structured approach to reaching your financial goals."
        />

        <div ref={trackRef} className="relative">
          {/* Track and its glowing fill (horizontal on desktop, vertical on mobile) */}
          <div className="hidden lg:block absolute top-[34px] left-[12.5%] right-[12.5%] h-0.5 bg-primary/15 rounded-full" />
          <motion.div
            className="hidden lg:block absolute top-[34px] left-[12.5%] right-[12.5%] h-0.5 origin-left rounded-full"
            style={{
              scaleX: progress,
              background: "linear-gradient(90deg, hsl(262 83% 58%), hsl(45 90% 62%))",
              boxShadow: "0 0 14px hsla(45, 90%, 60%, 0.7)",
            }}
          />
          <div className="lg:hidden absolute top-0 bottom-0 left-[34px] w-0.5 bg-primary/15 rounded-full" />
          <motion.div
            className="lg:hidden absolute top-0 bottom-0 left-[34px] w-0.5 origin-top rounded-full"
            style={{
              scaleY: progress,
              background: "linear-gradient(180deg, hsl(262 83% 58%), hsl(45 90% 62%))",
              boxShadow: "0 0 14px hsla(45, 90%, 60%, 0.7)",
            }}
          />

          <div className="grid lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.15} className="relative flex lg:block gap-6">
                <div className="relative z-10 shrink-0 lg:mx-auto w-[70px] h-[70px] rounded-full glass-card border-spin flex items-center justify-center">
                  <span className="text-xl font-bold text-shimmer-gold">{step.number}</span>
                </div>
                <div className="lg:text-center lg:mt-6 pt-3 lg:pt-0">
                  <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Offices                                                                    */
/* -------------------------------------------------------------------------- */

const OfficesSection = () => (
  <section className="py-24">
    <div className="section-container">
      <SectionHeading
        eyebrow="Visit us"
        title={<>Find us across <span className="text-shimmer-gold">Karnataka, Telangana &amp; West Bengal</span></>}
        subtitle={`${branches.length} offices serving clients across Karnataka, Telangana and West Bengal, including our Research and Development Hub in Kolkata.`}
      />

      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {branches.map((branch) => (
          <Link key={branch.id} to="/contact#branches" className="block h-full">
            <GlassCard className="p-7 text-center h-full group" tilt>
              <div className="ping-dot w-14 h-14 mx-auto mb-5 rounded-full bg-primary/25 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-accent transition-transform duration-500 group-hover:-translate-y-1" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{branch.city}</h3>
              <div className="text-xs text-muted-foreground mt-1">{branch.state}</div>
              {branch.isHeadOffice || branch.isRegionalOffice || branch.badge ? (
                <span className="inline-block mt-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
                  {branch.isHeadOffice ? "Head Office" : branch.isRegionalOffice ? "Regional Office" : branch.badge}
                </span>
              ) : (
                <span className="inline-block mt-3 text-xs text-muted-foreground px-2.5 py-1 rounded-full border border-border/50">
                  Branch office
                </span>
              )}
            </GlassCard>
          </Link>
        ))}
      </Stagger>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Promises                                                                   */
/* -------------------------------------------------------------------------- */

const PromisesSection = () => {
  const promises = [
    {
      icon: Lock,
      title: "Transparent fee structure",
      description:
        "We disclose how we get paid up front. No surprise charges, no hidden commissions baked into recommendations.",
    },
    {
      icon: Compass,
      title: "Goal first conversations",
      description:
        "We start by understanding what the money is for: a home, education, retirement. Then we build the plan backwards from there.",
    },
    {
      icon: MessageSquare,
      title: "Honest advice, zero pressure",
      description:
        "If a product isn't right for you, we say so. We'd rather you wait six months than buy something that doesn't fit.",
    },
  ];

  return (
    <section className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Our promise"
          title={<>What you can <span className="text-shimmer-gold">expect</span></>}
          subtitle="Three commitments that shape every conversation we have with clients."
        />

        <Stagger className="grid md:grid-cols-3 gap-6" stagger={0.15}>
          {promises.map((promise) => (
            <GlassCard key={promise.title} className="p-8 h-full group" tilt>
              <div className="icon-orb w-14 h-14 mb-6 rounded-2xl bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <promise.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{promise.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{promise.description}</p>
            </GlassCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Closing call to action                                                     */
/* -------------------------------------------------------------------------- */

const CTASection = () => (
  <section className="py-24">
    <div className="section-container">
      <ScrollReveal scale>
        <div className="glass-card border-spin relative overflow-hidden rounded-[2rem] px-6 py-16 sm:p-20 text-center">
          {/* Breathing orbs behind the content */}
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
              Start your <span className="text-shimmer-gold">goal first</span> plan today
            </WordReveal>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Take the first step towards financial clarity. Book a free consultation with our team.
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

const HomePage = () => {
  useSEO({
    title: "NIFSEN Investment Services Limited | Goal First Investing",
    description:
      "Mutual fund advisory, insurance planning and goal based wealth management across Karnataka, Telangana and West Bengal. A transparent process, disciplined reviews and guidance that fits your risk.",
    canonicalPath: "/",
  });

  return (
    <>
      <HeroSection />
      <ServicesBand />
      <WhatWeDoSection />
      <WhyNifsenSection />
      <NumbersSection />
      <ServicesSnapshotSection />
      <HowItWorksSection />
      <OfficesSection />
      <PromisesSection />
      <CTASection />
    </>
  );
};

export default HomePage;
