import { Link } from "react-router-dom";
import { Shield, Heart, Eye, BookOpen, Users, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import aboutHeroBg from "@/assets/about-hero-bg.jpg";
import aboutStoryBg from "@/assets/about-story-bg.jpg";

const values = [
  { icon: Shield, title: "Transparency", description: "Clear communication about our process, fees, and recommendations." },
  { icon: Heart, title: "Integrity", description: "Your interests always come first. No hidden agendas." },
  { icon: Eye, title: "Long-term Focus", description: "Building wealth is a marathon, not a sprint." },
  { icon: BookOpen, title: "Research-backed", description: "Every recommendation is grounded in thorough analysis." },
  { icon: Users, title: "Client Education", description: "We empower you to make informed decisions." },
];

const AboutPage = () => {
  return (
    <>
      {/* Cinematic Hero */}
      <section 
        className="hero-cinematic"
        style={{ backgroundImage: `url(${aboutHeroBg})` }}
      >
        <div className="hero-cinematic-content h-full min-h-screen flex items-center">
          <div className="section-container py-20">
            <div className="max-w-2xl space-y-8 animate-fade-up">
              {/* Pill chip */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                <span className="text-xl">🇮🇳</span>
                <span className="text-sm font-medium text-foreground/90">Focused on India's growth</span>
              </div>

              {/* Headline */}
              <h1 className="heading-xl">
                Partnering with <span className="text-gradient-gold">you</span> to build a{" "}
                <span className="text-gradient-gold">stronger</span> Indian economy.
              </h1>

              {/* Subtext */}
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                At NIFSEN Investment Services, we empower you to achieve your financial goals. With our expert guidance and investing solutions, we contribute to building a brighter future for India's economy.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link to="/services" className="btn-primary">
                  Explore Our Services
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Meet Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Panel - Cinematic */}
      <section 
        className="cinematic-panel"
        style={{ backgroundImage: `url(${aboutStoryBg})` }}
      >
        <div className="cinematic-panel-content h-full min-h-[80vh] flex items-center">
          <div className="section-container py-20">
            <div className="max-w-2xl space-y-8 animate-fade-up">
              <h2 className="heading-lg">Our Story</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-accent mb-3">Why NIFSEN Exists</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We noticed that many investors make decisions based on market noise, tips, or short-term trends. This often leads to poor outcomes and unnecessary stress.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-accent mb-3">Client-first Philosophy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    NIFSEN was created to bring calm and clarity to investing. We focus on understanding your goals first, then building a strategy that aligns with your timeline and risk comfort.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-accent mb-3">Our Promise</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every recommendation we make starts with one question: "Is this right for the client?" Our process is designed to eliminate conflicts of interest and ensure transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="section-container">
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

      {/* What We Do */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">What We Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Glimpses of how we work with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8">
              <div className="animate-fade-up">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client Education & Awareness</h3>
                <p className="text-muted-foreground">
                  Regular workshops and sessions to help clients understand investment fundamentals and make informed decisions.
                </p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-8">
              <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Research and Portfolio Review</h3>
                <p className="text-muted-foreground">
                  In-depth analysis sessions to ensure your portfolio stays aligned with your goals and market conditions.
                </p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-8">
              <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Goal Planning Sessions</h3>
                <p className="text-muted-foreground">
                  One-on-one consultations to map out your financial milestones and create actionable investment strategies.
                </p>
              </div>
            </GlassCard>
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
