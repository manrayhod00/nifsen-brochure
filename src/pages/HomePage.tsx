import { Link } from "react-router-dom";
import { Target, TrendingUp, RefreshCw, Shield, FileText, Users, ArrowRight, CheckCircle, Quote } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import heroHomeBg from "@/assets/hero-home-bg.png";

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
            NIFSEN Groups helps you invest with a transparent process — aligned to your goals, your time horizon, and your comfort with risk.
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
    { icon: Shield, title: "Process-driven decisions" },
    { icon: Target, title: "Risk-aligned recommendations" },
    { icon: FileText, title: "Simple reporting" },
    { icon: Users, title: "Long-term discipline" },
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={index * 0.08}>
              <GlassCard className="p-6 text-center h-full">
                <reason.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                <h4 className="font-medium text-foreground/90">{reason.title}</h4>
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

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "I was always confused about where to invest my savings. NIFSEN team sat with me, understood my family situation, and suggested a simple plan. Now I invest every month without stress.",
      name: "Rajesh Sharma",
      location: "Bengaluru",
    },
    {
      quote: "After my father's retirement, we didn't know how to manage his corpus. The team helped us create a steady income plan. Very patient and supportive throughout.",
      name: "Priya Venkatesh",
      location: "Hyderabad",
    },
    {
      quote: "I've been investing for 3 years now. What I like most is they don't push products — they genuinely listen. My daughter's education fund is growing well.",
      name: "Anand Kumar",
      location: "Chennai",
    },
  ];

  return (
    <section className="py-20">
      <div className="section-container">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4">What clients say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building trust through consistent service and results.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <GlassCard className="p-8 h-full">
                <Quote className="w-8 h-8 text-accent/40 mb-4" />
                <p className="text-foreground/90 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="text-sm">
                  <span className="font-medium text-foreground">{testimonial.name}</span>
                  <span className="text-muted-foreground"> • {testimonial.location}</span>
                </div>
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
  return (
    <>
      <HeroSection />
      <WhatWeDoSection />
      <WhyNifsenSection />
      <ServicesSnapshotSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
