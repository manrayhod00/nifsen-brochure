import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Heart,
  Eye,
  BookOpen,
  Users,
  ArrowRight,
  GraduationCap,
  ClipboardCheck,
  Compass,
  MapPin,
  Phone,
  User,
  BadgeCheck,
  Landmark,
  Fingerprint,
  Building2,
  ChevronDown,
  Sparkles,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import {
  FloatingCoins,
  Magnetic,
  Marquee,
  SectionHeading,
  Stagger,
  WordReveal,
  useParallax,
} from "@/components/motion";
import heroAboutBg from "@/assets/hero-about-bg.png";
import { useSEO } from "@/hooks/useSEO";
import { branches, contact } from "@/config/contact";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const values = [
  { icon: Shield, title: "Transparency", description: "Clear communication about our process, fees, and recommendations." },
  { icon: Heart, title: "Integrity", description: "Your interests always come first. No hidden agendas." },
  { icon: Eye, title: "Long Term Focus", description: "Building wealth is a marathon, not a sprint." },
  { icon: BookOpen, title: "Research backed", description: "Every recommendation is grounded in thorough analysis." },
  { icon: Users, title: "Client Education", description: "We empower you to make informed decisions." },
];

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const heroFloatCards = [
  {
    icon: Building2,
    title: `${branches.length} offices`,
    text: "Karnataka, Telangana & West Bengal",
    className: "right-[8%] top-[24%]",
    float: "float-slow",
    delay: 1.1,
  },
  {
    icon: BadgeCheck,
    title: "ISIN activated",
    text: "Securities ready",
    className: "right-[26%] bottom-[18%]",
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
    <section ref={ref} className="relative min-h-[90vh] lg:min-h-screen overflow-hidden flex items-center">
      {/* Parallax art with a slow cinematic zoom */}
      <motion.div className="absolute inset-0 -top-[10%] h-[120%]" style={{ y: bgY }} aria-hidden="true">
        <div
          className="absolute inset-0 ken-burns"
          style={{
            backgroundImage: `url(${heroAboutBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>

      {/* Overlays: darker on the left for text, lighter on the right to reveal the image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 25%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.3) 75%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.85) 100%)",
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

      <motion.div className="section-container relative z-10" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="max-w-2xl lg:max-w-xl py-24 lg:py-0">
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30"
              initial={{ opacity: 0, y: -12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-medium text-foreground/90">Focused on India's growth 🇮🇳</span>
            </motion.div>

            {/* Headline */}
            <WordReveal as="h1" className="heading-xl !leading-[1.08]" immediate delay={0.3} stagger={0.07}>
              Partnering with you to build a <span className="text-shimmer-gold">stronger</span> Indian economy.
            </WordReveal>

            {/* Subtext */}
            <motion.p
              className="text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: EASE_OUT }}
            >
              NIFSEN Investment Services Limited was founded with a simple belief: financial planning should be goal
              first, transparent, and accessible to everyone.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
            >
              <Magnetic>
                <Link to="/services" className="btn-primary group">
                  Explore Our Services
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="btn-secondary">
                  Talk to Us
                </Link>
              </Magnetic>
            </motion.div>
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
/* Story                                                                      */
/* -------------------------------------------------------------------------- */

const StorySection = () => {
  const [ref, bgY] = useParallax(100);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <motion.div className="absolute inset-0 -top-[10%] h-[120%]" style={{ y: bgY }} aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroAboutBg})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
      {/* Heavy overlay so it feels like a continuation of the hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 20%, hsl(var(--background) / 0.92) 100%)",
        }}
      />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Our story"
          title={<>Calm and <span className="text-shimmer-gold">clarity</span> in investing</>}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <ScrollReveal direction="right" className="h-full">
            <GlassCard className="p-8 sm:p-10 h-full group relative overflow-hidden" tilt>
              <div className="absolute right-6 top-4 text-7xl font-bold text-primary/10 select-none" aria-hidden="true">
                01
              </div>
              <div className="icon-orb w-14 h-14 mb-6 rounded-2xl bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                <Lightbulb className="w-7 h-7 text-accent" aria-hidden="true" />
              </div>
              <h2 className="heading-md mb-5">Why NIFSEN Exists</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We noticed that many investors make decisions based on market noise, tips, or short term trends. This
                  often leads to poor outcomes and unnecessary stress.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  NIFSEN was created to bring calm and clarity to investing. We focus on understanding your goals first,
                  then building a strategy that aligns with your timeline and risk comfort.
                </p>
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15} className="h-full">
            <GlassCard className="border-spin p-8 sm:p-10 h-full group relative overflow-hidden" tilt>
              <div className="absolute right-6 top-4 text-7xl font-bold text-primary/10 select-none" aria-hidden="true">
                02
              </div>
              <div className="icon-orb w-14 h-14 mb-6 rounded-2xl bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <HeartHandshake className="w-7 h-7 text-accent" aria-hidden="true" />
              </div>
              <h2 className="heading-md mb-5">Client First Philosophy</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Every recommendation we make starts with one question:{" "}
                  <span className="font-semibold text-shimmer-gold">"Is this right for the client?"</span> Our process
                  is designed to eliminate conflicts of interest and ensure transparency.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in disciplined investing, regular reviews, and honest conversations. No jargon, no pressure.
                  Just straightforward guidance.
                </p>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Moving band of our values                                                  */
/* -------------------------------------------------------------------------- */

const ValuesBand = () => (
  <section className="relative py-8 border-y border-primary/15 bg-background/40" aria-hidden="true">
    <Marquee duration={40}>
      {values.map((value) => (
        <span key={value.title} className="flex items-center gap-6 px-6 text-xl sm:text-2xl font-semibold whitespace-nowrap">
          <span className="text-foreground/80">{value.title}</span>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </span>
      ))}
    </Marquee>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Corporate information                                                      */
/* -------------------------------------------------------------------------- */

const CorporateSection = () => {
  const items = [
    { icon: Fingerprint, label: "ISIN", value: contact.isin, hint: "International Securities Identification Number" },
    { icon: Landmark, label: "CIN", value: contact.cin, hint: "Corporate Identification Number" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center">
          <ScrollReveal scale>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/30 mb-6">
              <BadgeCheck className="w-4 h-4 text-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground/90">ISIN activated · Securities ready</span>
            </div>
          </ScrollReveal>
        </div>
        <SectionHeading
          title={<>Corporate <span className="text-shimmer-gold">Information</span></>}
          subtitle="NIFSEN Investment Services Limited is a registered public limited company with a securities ISIN activated with the depositories. It is a milestone in our journey toward transparent governance held to the standard of a listed company."
        />

        <Stagger className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6" stagger={0.15}>
          {items.map((item) => (
            <GlassCard key={item.label} className="border-spin p-7 h-full group" tilt>
              <div className="flex items-start gap-4">
                <div className="icon-orb w-12 h-12 rounded-xl bg-primary/25 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <item.icon className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent/90 mb-1">{item.label}</div>
                  <div className="font-semibold text-lg text-foreground break-words leading-snug font-mono">
                    {item.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground/80 mt-1">{item.hint}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </Stagger>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-xs text-muted-foreground/70 mt-8 max-w-2xl mx-auto break-words">
            Issuer: NIFSEN Investment Services Limited · ISIN {contact.isin} · CIN {contact.cin}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Values: bento grid                                                         */
/* -------------------------------------------------------------------------- */

const ValuesSection = () => {
  const [ref, bgY] = useParallax(100);
  const [first, ...rest] = values;

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <motion.div className="absolute inset-0 -top-[10%] h-[120%]" style={{ y: bgY }} aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroAboutBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.88) 50%, hsl(var(--background) / 0.92) 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="What we stand for"
          title={<>Our <span className="text-shimmer-gold">Values</span></>}
          subtitle="The principles that guide every decision we make."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ScrollReveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2" scale>
            <GlassCard className="border-spin p-10 h-full flex flex-col justify-between min-h-[300px]" tilt>
              <div>
                <div className="icon-orb w-16 h-16 mb-8 rounded-2xl bg-primary/25 flex items-center justify-center">
                  <first.icon className="w-8 h-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">{first.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{first.description}</p>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm text-accent font-medium">
                <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" aria-hidden="true" />
                Our foundation
              </div>
            </GlassCard>
          </ScrollReveal>

          {rest.map((value, index) => (
            <ScrollReveal key={value.title} delay={0.12 * (index + 1)} direction={index % 2 === 0 ? "left" : "up"}>
              <GlassCard className="p-7 h-full group" tilt>
                <div className="flex items-start gap-5">
                  <div className="icon-orb shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <value.icon className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground/95">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
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
/* How we work with clients: timeline that draws itself while scrolling       */
/* -------------------------------------------------------------------------- */

const steps = [
  {
    icon: Compass,
    title: "Discovery & goal mapping",
    description:
      "We start with a zero pressure conversation to understand your goals, time horizon, and comfort with risk before we recommend anything.",
  },
  {
    icon: ClipboardCheck,
    title: "Research & portfolio build",
    description:
      "Funds and products are shortlisted using documented research, not the latest trend or what's paying the highest commission.",
  },
  {
    icon: GraduationCap,
    title: "Reviews & education",
    description:
      "Quarterly check ins to rebalance and explain what's changed, so you stay in control of your money instead of guessing.",
  },
];

const HowWeWorkSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Our process"
          title={<>How we work with <span className="text-shimmer-gold">clients</span></>}
          subtitle="A simple, repeatable rhythm, from the first conversation to ongoing reviews."
        />

        <div ref={trackRef} className="relative">
          {/* Track and glowing fill: horizontal on desktop, vertical on mobile */}
          <div className="hidden md:block absolute top-[34px] left-[16.66%] right-[16.66%] h-0.5 bg-primary/15 rounded-full" aria-hidden="true" />
          <motion.div
            className="hidden md:block absolute top-[34px] left-[16.66%] right-[16.66%] h-0.5 origin-left rounded-full"
            style={{
              scaleX: progress,
              background: "linear-gradient(90deg, hsl(262 83% 58%), hsl(45 90% 62%))",
              boxShadow: "0 0 14px hsla(45, 90%, 60%, 0.7)",
            }}
            aria-hidden="true"
          />
          <div className="md:hidden absolute top-0 bottom-0 left-[34px] w-0.5 bg-primary/15 rounded-full" aria-hidden="true" />
          <motion.div
            className="md:hidden absolute top-0 bottom-0 left-[34px] w-0.5 origin-top rounded-full"
            style={{
              scaleY: progress,
              background: "linear-gradient(180deg, hsl(262 83% 58%), hsl(45 90% 62%))",
              boxShadow: "0 0 14px hsla(45, 90%, 60%, 0.7)",
            }}
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-3 gap-10 md:gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.15} className="relative flex md:block gap-5">
                <div className="relative z-10 shrink-0 md:mx-auto w-[70px] h-[70px] rounded-full glass-card border-spin flex items-center justify-center">
                  <span className="text-xl font-bold text-shimmer-gold">0{index + 1}</span>
                </div>
                <GlassCard className="md:mt-8 p-7 sm:p-8 flex-1 min-w-0 group" tilt>
                  <div className="icon-orb w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                    <step.icon className="w-7 h-7 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Where to find us                                                           */
/* -------------------------------------------------------------------------- */

const OfficesSection = () => (
  <section className="py-24">
    <div className="section-container">
      <SectionHeading
        eyebrow="Visit us"
        title={<>Where to <span className="text-shimmer-gold">find us</span></>}
        subtitle={`${branches.length} offices across Karnataka, Telangana and West Bengal. Drop in at the one closest to you.`}
      />

      <Stagger className="grid md:grid-cols-2 gap-6" stagger={0.12}>
        {branches.map((branch) => (
          <GlassCard key={branch.id} className="p-6 sm:p-7 h-full group" tilt>
            <div className="flex items-start gap-4">
              <div className="ping-dot w-12 h-12 rounded-full bg-primary/25 flex items-center justify-center flex-shrink-0">
                <MapPin
                  className="w-6 h-6 text-accent transition-transform duration-500 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">{branch.city}</h3>
                  {branch.isHeadOffice && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                      Head Office
                    </span>
                  )}
                  {branch.isRegionalOffice && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                      Regional Office
                    </span>
                  )}
                  {branch.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                      {branch.badge}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed break-words">
                  {branch.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                  {branch.pincode}, {branch.state}
                </p>
                <div className="mt-3 pt-3 border-t border-border/30 space-y-1.5 text-sm">
                  {branch.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {branch.phoneDisplay}
                      </a>
                    </div>
                  )}
                  {branch.manager && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground text-xs">
                        {branch.manager.role ?? "Branch Manager"}:{" "}
                        <span className="text-foreground/90">{branch.manager.name}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
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
            <WordReveal as="h2" className="heading-lg mb-5">
              Ready to get <span className="text-shimmer-gold">started?</span>
            </WordReveal>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Let's discuss your goals and build a plan together.
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

const AboutPage = () => {
  useSEO({
    title: "About NIFSEN",
    description:
      "Why NIFSEN exists, our client first philosophy, and the values that guide every recommendation we make.",
    canonicalPath: "/about",
  });

  return (
    <>
      <HeroSection />
      <StorySection />
      <ValuesBand />
      <CorporateSection />
      <ValuesSection />
      <HowWeWorkSection />
      <OfficesSection />
      <CTASection />
    </>
  );
};

export default AboutPage;
