import { Link } from "react-router-dom";
import { Shield, Heart, Eye, BookOpen, Users, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import heroAboutBg from "@/assets/hero-about-bg.png";

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
                NIFSEN Financial Services was founded with a simple belief: financial planning should be goal-first, transparent, and accessible to everyone.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
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

      {/* Gallery - Reusing the same background with different positioning */}
      <section 
        id="gallery" 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${heroAboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.85) 50%, hsl(var(--background) / 0.95) 100%)',
          }}
        />

        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Glimpses of how we work with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Client Education & Awareness", description: "Regular workshops and sessions to help clients understand investment fundamentals." },
              { title: "Research and Portfolio Review", description: "In-depth analysis sessions to ensure your portfolio stays aligned with goals." },
              { title: "Goal Planning Sessions", description: "One-on-one consultations to map out your financial milestones." },
            ].map((item, index) => (
              <GlassCard
                key={item.title}
                className="p-6 overflow-hidden"
                hover
              >
                <div className="animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div 
                    className="aspect-video rounded-xl mb-6 relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${heroAboutBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: index === 0 ? 'center' : index === 1 ? 'right center' : 'left center',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
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
