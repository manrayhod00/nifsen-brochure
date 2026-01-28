import { Link } from "react-router-dom";
import { Calculator, TrendingUp, Target, CreditCard, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const calculators = [
  {
    icon: TrendingUp,
    title: "SIP Calculator",
    description: "Calculate the future value of your Systematic Investment Plan.",
    href: "/calculators/sip",
  },
  {
    icon: Calculator,
    title: "Compounding Calculator",
    description: "See how your money grows with the power of compounding.",
    href: "/calculators/compounding",
  },
  {
    icon: Target,
    title: "Retirement Calculator",
    description: "Estimate how much you need to save for a comfortable retirement.",
    href: "/calculators/retirement",
  },
  {
    icon: CreditCard,
    title: "EMI Calculator",
    description: "Calculate your monthly EMI for loans and plan your finances.",
    href: "/calculators/emi",
  },
];

const CalculatorsPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="heading-xl mb-6">
              Simple calculators. <span className="text-gradient-gold">Clear decisions.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Use our free financial calculators to plan your investments and understand your options better.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 gap-6">
            {calculators.map((calc, index) => (
              <Link key={calc.title} to={calc.href}>
                <GlassCard className="p-8 h-full group">
                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                      <calc.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{calc.description}</p>
                    <span className="inline-flex items-center text-accent font-medium">
                      Open Calculator
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CalculatorsPage;
