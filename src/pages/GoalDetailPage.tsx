import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Target, CheckCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";

type GoalType = "dream-home" | "education" | "retirement" | "emergency" | "marriage" | "wealth";

const goalDetails: Record<GoalType, {
  title: string;
  description: string;
  timeHorizon: string;
  approach: string[];
  considerations: string[];
}> = {
  "dream-home": {
    title: "Dream Home",
    description: "Owning a home is one of life's biggest milestones. With proper planning and disciplined savings, you can make this dream a reality without overextending your finances.",
    timeHorizon: "5-10 years",
    approach: [
      "Assess your budget and preferred location",
      "Calculate down payment requirements (typically 20%)",
      "Build a dedicated investment corpus",
      "Consider both SIP and lump sum investments",
    ],
    considerations: [
      "Factor in registration, stamp duty, and interior costs",
      "Plan for ongoing EMI payments within your budget",
      "Keep 6 months of EMI as emergency reserve",
    ],
  },
  education: {
    title: "Child's Education",
    description: "Education costs are rising faster than general inflation. Starting early gives you the advantage of compounding and reduces the burden when the time comes.",
    timeHorizon: "10-18 years",
    approach: [
      "Estimate future education costs with inflation",
      "Start SIPs as early as possible",
      "Choose equity-oriented funds for long horizons",
      "Gradually shift to safer instruments as goal approaches",
    ],
    considerations: [
      "Consider both domestic and international education options",
      "Factor in living expenses, not just tuition",
      "Plan for entrance coaching and test fees",
    ],
  },
  retirement: {
    title: "Retirement Planning",
    description: "Retirement may seem far away, but the earlier you start, the easier it becomes. A well-planned retirement fund ensures you maintain your lifestyle without compromise.",
    timeHorizon: "20-30 years",
    approach: [
      "Calculate your retirement corpus using current expenses",
      "Account for inflation and healthcare costs",
      "Maximize equity exposure in early years",
      "Build multiple income streams for post-retirement",
    ],
    considerations: [
      "Don't rely solely on EPF/PPF",
      "Plan for 25-30 years of post-retirement life",
      "Consider increasing allocation with salary increments",
    ],
  },
  emergency: {
    title: "Emergency Fund",
    description: "An emergency fund is your financial safety net. It protects you from taking on debt or liquidating investments during unexpected situations.",
    timeHorizon: "6-12 months",
    approach: [
      "Target 6-12 months of essential expenses",
      "Keep funds highly liquid (savings/liquid funds)",
      "Separate from regular savings accounts",
      "Replenish immediately after any withdrawal",
    ],
    considerations: [
      "Don't invest emergency funds in volatile assets",
      "Review and update annually with lifestyle changes",
      "Consider health insurance to reduce emergency needs",
    ],
  },
  marriage: {
    title: "Child's Marriage",
    description: "A child's marriage is a significant family event. Planning ahead helps you celebrate without financial stress and gives you flexibility in your choices.",
    timeHorizon: "15-25 years",
    approach: [
      "Start early to leverage compounding",
      "Estimate costs based on your preferences",
      "Use equity funds for long-term growth",
      "Shift to debt instruments 2-3 years before the event",
    ],
    considerations: [
      "Costs vary significantly based on preferences",
      "Don't compromise retirement savings for this goal",
      "Consider involving your child in financial planning",
    ],
  },
  wealth: {
    title: "Wealth Creation",
    description: "Long-term wealth creation is about disciplined investing over time. It's not about timing the market, but time in the market.",
    timeHorizon: "10+ years",
    approach: [
      "Define clear, measurable financial goals",
      "Invest consistently regardless of market conditions",
      "Diversify across asset classes and geographies",
      "Review and rebalance portfolio annually",
    ],
    considerations: [
      "Stay invested during market volatility",
      "Increase investments with income growth",
      "Avoid emotional decision-making",
    ],
  },
};

const GoalDetailPage = () => {
  const { type } = useParams<{ type: GoalType }>();
  const goal = goalDetails[type as GoalType];

  if (!goal) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="heading-lg mb-4">Goal not found</h1>
        <Link to="/goals" className="text-accent hover:underline">
          Back to Goals
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="py-12">
        <div className="section-container">
          <Link
            to="/goals"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Goals
          </Link>

          <div className="max-w-3xl animate-fade-up">
            <h1 className="heading-xl mb-6">{goal.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {goal.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Time Horizon */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-accent" />
                <h3 className="font-semibold">Time Horizon</h3>
              </div>
              <p className="text-2xl font-bold text-gradient-gold">{goal.timeHorizon}</p>
            </GlassCard>

            {/* Approach */}
            <GlassCard className="p-6 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-accent" />
                <h3 className="font-semibold">Suggested Approach</h3>
              </div>
              <ul className="space-y-3">
                {goal.approach.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Considerations */}
          <GlassCard className="p-6 mt-6" hover={false}>
            <h3 className="font-semibold mb-4">Key Considerations</h3>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {goal.considerations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* CTA */}
          <GlassCard className="p-8 mt-8 text-center" hover={false}>
            <h3 className="heading-md mb-4">Ready to start planning?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Book a consultation and let's create a personalized plan for your {goal.title.toLowerCase()} goal.
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

export default GoalDetailPage;
