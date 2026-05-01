import { Link } from "react-router-dom";
import { Shield, Heart, Eye, BookOpen, Users, ArrowRight, GraduationCap, ClipboardCheck, Compass, MapPin } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import heroAboutBg from "@/assets/hero-about-bg.png";
import { useSEO } from "@/hooks/useSEO";
import { branches } from "@/config/contact";

const values = [
  { icon: Shield, title: "Transparency", description: "Clear communication about our process, fees, and recommendations." },
  { icon: Heart, title: "Integrity", description: "Your interests always come first. No hidden agendas." },
  { icon: Eye, title: "Long-term Focus", description: "Building wealth is a marathon, not a sprint." },
  { icon: BookOpen, title: "Research-backed", description: "Every recommendation is grounded in thorough analysis." },
  { icon: Users, title: "Client Education", description: "We empower you to make informed decisions." },
];

const AboutPage = () => {
  useSEO({
    title: "About NIFSEN",
    description:
      "Why NIFSEN exists, our client-first philosophy, and the values that guide every recommendation we make.",
    canonicalPath: "/about",
  });

  return (
    <>
      {/* Hero - Cinematic Background */}
      <section 
        className="relative min-h-[90vh] lg:min-h-screen overflow-hidden flex items-center"
        style={{
          backgroundImage: `url(${heroAboutBg})`,
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
            <div className="space-y-8 animate-fade-up text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
                <span className="text-sm font-medium text-foreground/90">Focused on India's growth 🇮🇳</span>
              </div>

              {/* Headline */}
              <h1 className="heading-xl">
                Partnering with you to build a{" "}
                <span className="text-gradient-gold">stronger</span> Indian economy.
              </h1>

              {/* Subtext */}
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0">
                NIFSEN Investment Services Limited was founded with a simple belief: financial planning should be goal-first, transparent, and accessible to everyone.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/services" className="btn-primary">
                  Explore Our Services
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content - Blends with the same background feel */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${heroAboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Heavy overlay to make it feel like a continuation */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 20%, hsl(var(--background) / 0.92) 100%)',
          }}
        />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fade-up">
              <h2 className="heading-md">Why NIFSEN Exists</h2>
              <p className="text-muted-foreground leading-relaxed">
                We noticed that many investors make decisions based on market noise, tips, or short-term trends. This often leads to poor outcomes and unnecessary stress.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                NIFSEN was created to bring calm and clarity to investing. We focus on understanding your goals first, then building a strategy that aligns with your timeline and risk comfort.
              </p>
            </div>

            <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <h2 className="heading-md">Client-first Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every recommendation we make starts with one question: "Is this right for the client?" Our process is designed to eliminate conflicts of interest and ensure transparency.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in disciplined investing, regular reviews, and honest conversations. No jargon, no pressure — just straightforward guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Continuing the blended look */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${heroAboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.88) 50%, hsl(var(--background) / 0.92) 100%)',
          }}
        />

        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <GlassCard key={value.title} className="p-6">
                <div className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <value.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How we work with clients */}
      <section
        id="gallery"
        className="relative py-20 overflow-hidden"
      >
        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">How we work with clients</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, repeatable rhythm — from the first conversation to ongoing reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                title: "Discovery & goal mapping",
                description: "We start with a no-pressure conversation to understand your goals, time horizon, and comfort with risk before we recommend anything.",
              },
              {
                icon: ClipboardCheck,
                title: "Research & portfolio build",
                description: "Funds and products are shortlisted using documented research — not the latest trend or what's paying the highest commission.",
              },
              {
                icon: GraduationCap,
                title: "Reviews & education",
                description: "Quarterly check-ins to rebalance and explain what's changed, so you stay in control of your money instead of guessing.",
              },
            ].map((item, index) => (
              <GlassCard key={item.title} className="p-8" hover>
                <div className="animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-5">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Where to find us */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Where to find us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three offices across Karnataka — drop in at the one closest to you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <GlassCard key={branch.id} className="p-6 h-full" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold">{branch.city}</h3>
                      {branch.isHeadOffice && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                          Head Office
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {branch.addressLines.map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                      {branch.pincode}, {branch.state}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container">
          <GlassCard className="p-12 text-center" hover={false}>
            <h2 className="heading-md mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss your goals and build a plan together.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              Book a Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </GlassCard>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
