import { Link } from "react-router-dom";
import { Target, TrendingUp, RefreshCw, Shield, FileText, Users, ArrowRight, CheckCircle, Lock, Compass, MessageSquare, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import heroHomeBg from "@/assets/hero-home-bg.png";
import { useSEO } from "@/hooks/useSEO";
import { branches } from "@/config/contact";

const HeroSection = () => (
  <section 
    className="relative min-h-[90vh] lg:min-h-screen overflow-hidden flex items-center"
    style={{
      backgroundImage: `url(${heroHomeBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center right',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Gradient overlay - darker on left for text, lighter on right to reveal image */}
    <div 
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 25%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.3) 75%, transparent 100%)',
      }}
    />
    
    {/* Mobile overlay - darker overall */}
    <div 
      className="absolute inset-0 lg:hidden"
      style={{
        background: 'linear-gradient(to bottom, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.85) 100%)',
      }}
    />

    <div className="hero-container relative z-10">
      <div className="max-w-2xl lg:max-w-2xl py-20 lg:py-0">
        {/* Left Content */}
        <motion.div 
          className="space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground/90">Goal-first investing · discipline · clarity</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="heading-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Build wealth with{" "}
            <span className="text-gradient-gold">calm</span> strategy.
            <br />
            Stay <span className="text-gradient-gold">consistent</span>.
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            NIFSEN Investment Services Limited helps you invest with a transparent process — aligned to your goals, your time horizon, and your comfort with risk.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/contact" className="btn-primary">
              Book a Consultation
            </Link>
            <Link to="/services" className="btn-secondary">
              Explore Services
            </Link>
          </motion.div>

          {/* Trust Chips */}
          <motion.div 
            className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {["Transparent process", "Integrity first", "Long-term focus"].map((chip, index) => (
              <motion.span 
                key={chip} 
                className="trust-chip"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const WhatWeDoSection = () => {
  const services = [
    {
      icon: Target,
      title: "Goal-first Planning",
      description: "Portfolios built around your outcomes, not market noise.",
    },
    {
      icon: TrendingUp,
      title: "Mutual Fund Research",
      description: "Shortlist built on risk-fit and consistency, not hype.",
    },
    {
      icon: RefreshCw,
      title: "Portfolio Reviews",
      description: "Monitoring and rebalancing at the right frequency.",
    },
  ];

  return (
    <section className="py-20">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4">What we do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three core areas — calm on the surface, strong in execution.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <GlassCard
                className="p-8 text-center h-full"
                hover
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyNifsenSection = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Process-driven decisions",
      description: "Every recommendation follows a documented framework — not gut feel or market noise.",
    },
    {
      icon: Target,
      title: "Risk-aligned recommendations",
      description: "Plans built around your comfort with volatility, not someone else's benchmark.",
    },
    {
      icon: FileText,
      title: "Simple reporting",
      description: "Clear, jargon-free statements so you always know how your money is doing.",
    },
    {
      icon: Users,
      title: "Long-term discipline",
      description: "Regular reviews and steady rebalancing instead of chasing the latest trend.",
    },
  ];

  return (
    <section className="py-20">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4">Why NIFSEN</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our approach is built on principles that put your interests first.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={index * 0.08}>
              <GlassCard className="p-6 h-full">
                <reason.icon className="w-10 h-10 mb-4 text-accent" />
                <h4 className="font-semibold mb-2 text-foreground/90">{reason.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSnapshotSection = () => {
  const services = [
    {
      title: "Mutual Funds",
      description: "Research-backed fund selection aligned with your goals.",
      href: "/services#mutual-funds",
    },
    {
      title: "Insurance Planning",
      description: "Protection coverage that fits your life stage.",
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
    <section className="py-20">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial guidance tailored to your needs.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <Link to={service.href}>
                <GlassCard className="p-6 h-full group">
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-accent font-medium">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    { number: "01", title: "Understand goals", description: "We listen to what matters most to you." },
    { number: "02", title: "Risk-fit plan", description: "Create a plan matching your comfort level." },
    { number: "03", title: "Start with shortlist", description: "Begin with carefully selected options." },
    { number: "04", title: "Monitor & rebalance", description: "Regular reviews keep you on track." },
  ];

  return (
    <section className="py-20">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4">How it works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple, structured approach to achieving your financial goals.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.12}>
                <GlassCard className="p-6 text-center relative z-10 h-full">
                  <div className="text-3xl font-bold text-gradient-gold mb-3">
                    {step.number}
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const OfficesSection = () => (
  <section className="py-20">
    <div className="section-container">
      <ScrollReveal className="text-center mb-12">
        <h2 className="heading-lg mb-4">Find us across Karnataka</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Three offices serving clients across north and central Karnataka.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-3 gap-6">
        {branches.map((branch, index) => (
          <ScrollReveal key={branch.id} delay={index * 0.1}>
            <Link to="/contact#branches" className="block h-full">
              <GlassCard className="p-6 text-center h-full group" hover>
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {branch.city}
                </h3>
                {branch.isHeadOffice ? (
                  <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                    Head Office
                  </span>
                ) : (
                  <span className="inline-block mt-2 text-xs text-muted-foreground">Branch office</span>
                )}
              </GlassCard>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const PromisesSection = () => {
  const promises = [
    {
      icon: Lock,
      title: "Transparent fee structure",
      description: "We disclose how we get paid up front. No surprise charges, no hidden commissions baked into recommendations.",
    },
    {
      icon: Compass,
      title: "Goal-first conversations",
      description: "We start by understanding what the money is for — a home, education, retirement — then build the plan backwards from there.",
    },
    {
      icon: MessageSquare,
      title: "Honest, no-pressure advice",
      description: "If a product isn't right for you, we say so. We'd rather you wait six months than buy something that doesn't fit.",
    },
  ];

  return (
    <section className="py-20">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4">What you can expect</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three commitments that shape every conversation we have with clients.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {promises.map((promise, index) => (
            <ScrollReveal key={promise.title} delay={index * 0.1}>
              <GlassCard className="p-8 h-full">
                <promise.icon className="w-10 h-10 text-accent mb-5" />
                <h3 className="text-xl font-semibold mb-3">{promise.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{promise.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20">
    <div className="section-container">
      <ScrollReveal>
        <GlassCard className="p-12 text-center" hover={false}>
          <h2 className="heading-md mb-4">Start your goal-first plan today</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Take the first step towards financial clarity. Book a free consultation with our team.
          </p>
          <Link to="/contact" className="btn-primary inline-flex">
            Book a Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </GlassCard>
      </ScrollReveal>
    </div>
  </section>
);

const HomePage = () => {
  useSEO({
    title: "NIFSEN Investment Services Limited | Goal-first Investing",
    description:
      "Mutual fund advisory, insurance planning and goal-based wealth management in Ballari, Karnataka. Transparent process, disciplined reviews, risk-fit guidance.",
    canonicalPath: "/",
  });

  return (
    <>
      <HeroSection />
      <WhatWeDoSection />
      <WhyNifsenSection />
      <ServicesSnapshotSection />
      <HowItWorksSection />
      <OfficesSection />
      <PromisesSection />
      <CTASection />
    </>
  );
};

export default HomePage;
