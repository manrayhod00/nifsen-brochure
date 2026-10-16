import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Target,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Users,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { FloatingCoins, Magnetic, Marquee, SectionHeading, WordReveal, useParallax } from "@/components/motion";
import { useSEO } from "@/hooks/useSEO";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    id: "mutual-funds",
    icon: TrendingUp,
    title: "Mutual Fund Advisory",
    description: "Research backed fund selection aligned with your goals and risk profile.",
    whoFor: "Investors looking for professional guidance on mutual fund selection and portfolio construction.",
    howWeHelp: [
      "Risk profiling questionnaire and a documented investment plan",
      "Goal tagged fund recommendations from our shortlist",
      "Quarterly performance summary by email",
      "Rebalancing suggestion when allocation drifts beyond your plan",
    ],
  },
  {
    id: "insurance",
    icon: Shield,
    title: "Insurance Planning",
    description: "Protection coverage that fits your life stage and family needs.",
    whoFor: "Individuals and families seeking adequate protection against life's uncertainties.",
    howWeHelp: [
      "Coverage gap analysis based on your income and dependants",
      "Honest preference for low cost term and health cover over bundled products",
      "Side by side comparison of recommended policies before you buy",
      "Help with documentation at the time of a claim",
    ],
  },
  {
    id: "goals",
    icon: Target,
    title: "Goal Planning",
    description: "Structured plans for life's important milestones: home, education, retirement, and more.",
    whoFor: "Anyone with specific financial goals and a desire for disciplined savings.",
    howWeHelp: [
      "Goal quantification with a clear target amount and target date",
      "Exact monthly contribution required to reach the goal on time",
      "Goal specific product mix (equity, debt, insurance, where appropriate)",
      "Annual progress review against your plan",
    ],
  },
  {
    id: "reviews",
    icon: RefreshCw,
    title: "Review & Rebalancing",
    description: "Regular portfolio health checks to keep you on track with your goals.",
    whoFor: "Existing investors who want professional oversight of their portfolios.",
    howWeHelp: [
      "Quarterly portfolio review with a written summary",
      "Rebalancing recommendation when allocation drifts beyond an agreed band",
      "Fund replacement when an existing scheme stops meeting our research criteria",
      "Single consolidated statement covering all your investments with us",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const HeroSection = () => {
  const [ref, orbY] = useParallax(120);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[78vh] flex items-center">
      {/* Ambient glowing orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true">
        <motion.div
          className="absolute -top-32 -left-24 h-[26rem] w-[26rem] max-w-[90vw] rounded-full bg-primary/35 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-24 h-[22rem] w-[22rem] max-w-[80vw] rounded-full bg-accent/25 blur-3xl"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.7, 0.4, 0.7] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="grid-floor opacity-60" aria-hidden="true" />
      <FloatingCoins className="opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />

      <div className="section-container relative z-10 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Our services
          </motion.span>

          <WordReveal as="h1" className="heading-xl !leading-[1.08]" immediate delay={0.3} stagger={0.08}>
            Services designed around <span className="text-shimmer-gold">your goals</span>
          </WordReveal>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
          >
            Comprehensive financial guidance that puts your interests first. From mutual funds to insurance, we've got
            you covered.
          </motion.p>

          {/* Quick jump chips to each service */}
          <div className="flex flex-wrap gap-3 justify-center">
            {services.map((service, index) => (
              <motion.a
                key={service.id}
                href={`#${service.id}`}
                className="trust-chip backdrop-blur-md group transition-colors hover:border-accent/50 hover:text-accent"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.12, ease: EASE_OUT }}
              >
                <service.icon className="w-4 h-4 mr-2 text-accent transition-transform duration-300 group-hover:scale-125" />
                {service.title}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
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
/* Moving band of service names                                               */
/* -------------------------------------------------------------------------- */

const ServicesBand = () => (
  <section className="relative py-8 border-y border-primary/15 bg-background/40 backdrop-blur-sm" aria-hidden="true">
    <Marquee duration={40}>
      {services.map((service) => (
        <span key={service.id} className="flex items-center gap-6 px-6 text-xl sm:text-2xl font-semibold whitespace-nowrap">
          <span className="text-foreground/80">{service.title}</span>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </span>
      ))}
    </Marquee>
  </section>
);

/* -------------------------------------------------------------------------- */
/* A single service panel                                                     */
/* -------------------------------------------------------------------------- */

type Service = (typeof services)[number];

const ServicePanel = ({
  service,
  index,
  spinning,
  onHover,
}: {
  service: Service;
  index: number;
  spinning: boolean;
  onHover: (id: string | null) => void;
}) => {
  const reversed = index % 2 === 1;
  const Icon = service.icon;

  return (
    <div id={service.id} className="scroll-mt-24">
      <ScrollReveal direction={reversed ? "left" : "right"} scale>
        <GlassCard
          className={`relative p-6 sm:p-8 lg:p-12 ${spinning ? "border-spin" : ""}`}
          hover={false}
          onMouseEnter={() => onHover(service.id)}
          onMouseLeave={() => onHover(null)}
        >
          {/* Decorative layer, clipped to the panel */}
          <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none" aria-hidden="true">
            <motion.div
              className={`absolute -top-24 ${reversed ? "-left-24" : "-right-24"} h-72 w-72 rounded-full bg-primary/30 blur-3xl`}
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute -bottom-28 ${reversed ? "-right-20" : "-left-20"} h-64 w-64 rounded-full bg-accent/15 blur-3xl`}
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
              transition={{ duration: 10 + index, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute ${reversed ? "left-6" : "right-6"} bottom-6 text-primary/[0.07]`}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <Icon className="w-40 h-40 lg:w-56 lg:h-56" />
            </motion.div>
            <span
              className={`absolute top-4 ${reversed ? "left-6" : "right-6"} text-6xl sm:text-7xl font-bold text-primary/10 select-none`}
            >
              0{index + 1}
            </span>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Overview */}
            <div className={`space-y-6 ${reversed ? "lg:order-2" : ""}`}>
              <div className="float-slow w-16 h-16">
                <motion.div
                  className="icon-orb w-16 h-16 rounded-2xl bg-primary/25 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
                >
                  <Icon className="w-8 h-8 text-accent" aria-hidden="true" />
                </motion.div>
              </div>

              <WordReveal as="h2" className="heading-md" delay={0.25}>
                {service.title}
              </WordReveal>

              <motion.p
                className="text-muted-foreground text-lg leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
              >
                {service.description}
              </motion.p>

              <motion.div
                className="rounded-2xl border border-primary/20 bg-primary/10 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT }}
              >
                <h3 className="flex items-center gap-2 font-semibold mb-2">
                  <Users className="w-4 h-4 text-accent" aria-hidden="true" />
                  Who it's for
                </h3>
                <p className="text-muted-foreground">{service.whoFor}</p>
              </motion.div>
            </div>

            {/* How we help */}
            <div className={`space-y-6 ${reversed ? "lg:order-1" : ""}`}>
              <h3 className="flex items-center gap-3 font-semibold text-lg">
                <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
                How we help
              </h3>
              <motion.ul
                className="space-y-3"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
              >
                {service.howWeHelp.map((item) => (
                  <motion.li
                    key={item}
                    className="group flex items-start gap-3 rounded-xl border border-transparent px-3 py-3 transition-colors duration-300 hover:border-primary/25 hover:bg-primary/10"
                    variants={{
                      hidden: { opacity: 0, x: reversed ? 32 : -32 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
                    }}
                  >
                    <motion.span
                      className="flex-shrink-0 mt-0.5"
                      variants={{
                        hidden: { scale: 0, rotate: -90 },
                        show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 14 } },
                      }}
                    >
                      <CheckCircle className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-125" />
                    </motion.span>
                    <span className="text-muted-foreground group-hover:text-foreground/90 transition-colors">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT }}
              >
                <Magnetic>
                  <Link to="/contact" className="btn-primary group inline-flex mt-2">
                    Talk to us
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Services list                                                              */
/* -------------------------------------------------------------------------- */

const ServicesListSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="What we offer"
          title={
            <>
              Four ways we <span className="text-shimmer-gold">help</span>
            </>
          }
        />
        <div className="space-y-12 lg:space-y-16">
          {services.map((service, index) => (
            <ServicePanel
              key={service.id}
              service={service}
              index={index}
              spinning={index === 0 || hovered === service.id}
              onHover={setHovered}
            />
          ))}
        </div>
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
              Not sure where to <span className="text-shimmer-gold">start?</span>
            </WordReveal>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Book a free consultation and we'll help you identify the right services for your needs.
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

const ServicesPage = () => {
  useSEO({
    title: "Services: Mutual Funds, Insurance, Goal Planning",
    description:
      "Mutual fund advisory, insurance planning, goal based investing, and quarterly portfolio reviews from NIFSEN Investment Services Limited.",
    canonicalPath: "/services",
  });

  return (
    <>
      <HeroSection />
      <ServicesBand />
      <ServicesListSection />
      <CTASection />
    </>
  );
};

export default ServicesPage;
