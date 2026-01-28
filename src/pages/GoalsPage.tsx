import { Link } from "react-router-dom";
import { Home, GraduationCap, Umbrella, PiggyBank, Heart, TrendingUp, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const goals = [
  {
    icon: Home,
    title: "Dream Home",
    description: "Save for your perfect home with a structured investment plan.",
    href: "/goals/dream-home",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: GraduationCap,
    title: "Child's Education",
    description: "Secure your child's educational future with early planning.",
    href: "/goals/education",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Umbrella,
    title: "Retirement",
    description: "Build a comfortable corpus for your golden years.",
    href: "/goals/retirement",
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    icon: PiggyBank,
    title: "Emergency Fund",
    description: "Create a safety net for unexpected life events.",
    href: "/goals/emergency",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Heart,
    title: "Child's Marriage",
    description: "Plan ahead for your child's special day.",
    href: "/goals/marriage",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: TrendingUp,
    title: "Wealth Creation",
    description: "Grow your wealth with long-term disciplined investing.",
    href: "/goals/wealth",
    color: "from-amber-500/20 to-orange-500/20",
  },
];

const GoalsPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="heading-xl mb-6">
              Plan for what <span className="text-gradient-gold">matters</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every financial goal deserves a dedicated strategy. Choose your goal and let's build a plan together.
            </p>
          </div>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => (
              <Link key={goal.title} to={goal.href}>
                <GlassCard className="p-8 h-full group">
                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-6`}>
                      <goal.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                      {goal.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{goal.description}</p>
                    <span className="inline-flex items-center text-accent font-medium">
                      Learn more
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

export default GoalsPage;
