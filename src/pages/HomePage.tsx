import { Link } from "react-router-dom";
import { Target, TrendingUp, RefreshCw, Shield, FileText, Users, ArrowRight, CheckCircle, Quote } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import heroHomeBg from "@/assets/hero-home-bg.png";

const HeroSection = () => (
  <section 
    className="relative min-h-screen lg:min-h-screen overflow-hidden flex items-center"
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

    <div className="section-container relative z-10">
      <div className="max-w-2xl lg:max-w-xl py-20 lg:py-0">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-up text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground/90">Goal-first investing · discipline · clarity</span>
          </div>

          {/* Headline */}
          <h1 className="heading-xl">
            Build wealth with{" "}
            <span className="text-gradient-gold">calm</span> strategy.
            <br />
            Stay <span className="text-gradient-gold">consistent</span>.
          </h1>

          {/* Subtext */}
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0">
            NIFSEN Financial Services helps you invest with a transparent process — aligned to your goals, your time horizon, and your comfort with risk.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link to="/contact" className="btn-primary">
              Book a Consultation
            </Link>
            <Link to="/services" className="btn-secondary">
              Explore Services
            </Link>
          </div>

          {/* Trust Chips */}
          <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
            {["Transparent process", "Integrity first", "Long-term focus"].map((chip) => (
              <span key={chip} className="trust-chip">
                <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                {chip}
              </span>
            ))}
          </div>
        </div>
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
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">What we do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three core areas — calm on the surface, strong in execution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlassCard
              key={service.title}
              className="p-8 text-center"
              hover
            >
              <div
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </GlassCard>
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
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Why NIFSEN</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our approach is built on principles that put your interests first.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <GlassCard key={reason.title} className="p-6 text-center">
              <div
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <reason.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                <h4 className="font-medium text-foreground/90">{reason.title}</h4>
              </div>
            </GlassCard>
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
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial guidance tailored to your needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link key={service.title} to={service.href}>
              <GlassCard className="p-6 h-full group">
                <div
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
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
                </div>
              </GlassCard>
            </Link>
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
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">How it works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple, structured approach to achieving your financial goals.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <GlassCard className="p-6 text-center relative z-10">
                  <div className="text-3xl font-bold text-gradient-gold mb-3">
                    {step.number}
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </GlassCard>
              </div>
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
      quote: "NIFSEN helped me understand my risk profile and build a portfolio I'm comfortable with. The reviews are thorough and insightful.",
      name: "Client",
      location: "Bengaluru",
    },
    {
      quote: "The goal-first approach made all the difference. I now have clarity on my retirement planning.",
      name: "Client",
      location: "Hyderabad",
    },
    {
      quote: "Professional, transparent, and always available. Highly recommend their services.",
      name: "Client",
      location: "Pune",
    },
  ];

  return (
    <section className="py-20">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">What clients say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building trust through consistent service and results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <GlassCard
              key={index}
              className="p-8"
            >
              <div
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Quote className="w-8 h-8 text-accent/40 mb-4" />
                <p className="text-foreground/90 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="text-sm">
                  <span className="font-medium text-foreground">{testimonial.name}</span>
                  <span className="text-muted-foreground"> • {testimonial.location}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20">
    <div className="section-container">
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
