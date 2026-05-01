import { Link } from "react-router-dom";
import { TrendingUp, Shield, Target, RefreshCw, ArrowRight, CheckCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { useSEO } from "@/hooks/useSEO";

const services = [
  {
    id: "mutual-funds",
    icon: TrendingUp,
    title: "Mutual Fund Advisory",
    description: "Research-backed fund selection aligned with your goals and risk profile.",
    whoFor: "Investors looking for professional guidance on mutual fund selection and portfolio construction.",
    howWeHelp: [
      "Risk-profiling questionnaire and a documented investment plan",
      "Goal-tagged fund recommendations from our shortlist",
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
      "Honest preference for low-cost term and health cover over bundled products",
      "Side-by-side comparison of recommended policies before you buy",
      "Help with documentation at the time of a claim",
    ],
  },
  {
    id: "goals",
    icon: Target,
    title: "Goal Planning",
    description: "Structured plans for life's important milestones — home, education, retirement, and more.",
    whoFor: "Anyone with specific financial goals and a desire for disciplined savings.",
    howWeHelp: [
      "Goal quantification with a clear target amount and target date",
      "Exact monthly contribution required to reach the goal on time",
      "Goal-specific product mix (equity, debt, insurance, where appropriate)",
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

const ServicesPage = () => {
  useSEO({
    title: "Services — Mutual Funds, Insurance, Goal Planning",
    description:
      "Mutual fund advisory, insurance planning, goal-based investing, and quarterly portfolio reviews from NIFSEN Investment Services Limited.",
    canonicalPath: "/services",
  });

  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="heading-xl mb-6">
              Services designed around <span className="text-gradient-gold">your goals</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive financial guidance that puts your interests first. From mutual funds to insurance, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="section-container space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-24"
            >
              <GlassCard className="p-8 lg:p-12" hover={false}>
                <div
                  className={`grid lg:grid-cols-2 gap-8 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="space-y-6 animate-fade-up">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="heading-md">{service.title}</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {service.description}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">Who it's for</h4>
                      <p className="text-muted-foreground">{service.whoFor}</p>
                    </div>
                  </div>

                  <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                    <h4 className="font-semibold">How we help</h4>
                    <ul className="space-y-3">
                      {service.howWeHelp.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className="btn-primary inline-flex mt-4"
                    >
                      Talk to us
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container">
          <GlassCard className="p-12 text-center" hover={false}>
            <h2 className="heading-md mb-4">Not sure where to start?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Book a free consultation and we'll help you identify the right services for your needs.
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

export default ServicesPage;
