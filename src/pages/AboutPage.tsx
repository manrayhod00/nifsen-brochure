import { Link } from "react-router-dom";
import { Shield, Heart, Eye, BookOpen, Users, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const values = [
  { icon: Shield, title: "Transparency", description: "Clear communication about our process, fees, and recommendations." },
  { icon: Heart, title: "Integrity", description: "Your interests always come first. No hidden agendas." },
  { icon: Eye, title: "Long-term Focus", description: "Building wealth is a marathon, not a sprint." },
  { icon: BookOpen, title: "Research-backed", description: "Every recommendation is grounded in thorough analysis." },
  { icon: Users, title: "Client Education", description: "We empower you to make informed decisions." },
];

const galleryItems = [
  {
    title: "Client Education & Awareness",
    description: "Regular workshops and sessions to help clients understand investment fundamentals.",
  },
  {
    title: "Research and Portfolio Review",
    description: "In-depth analysis sessions to ensure your portfolio stays aligned with goals.",
  },
  {
    title: "Goal Planning Sessions",
    description: "One-on-one consultations to map out your financial milestones.",
  },
];

const AboutPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6 animate-fade-up">Our Story</h1>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
              NIFSEN Financial Services was founded with a simple belief: financial planning should be goal-first, transparent, and accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16">
        <div className="section-container">
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

      {/* Gallery */}
      <section id="gallery" className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Glimpses of how we work with our clients.
            </p>
          </div>

          <div className="space-y-8">
            {galleryItems.map((item, index) => (
              <GlassCard
                key={item.title}
                className={`p-8 ${index % 2 === 1 ? "lg:ml-auto lg:max-w-2xl" : "lg:max-w-2xl"}`}
                hover={false}
              >
                <div className="animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="aspect-video bg-muted/30 rounded-xl mb-6 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Image placeholder</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
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
