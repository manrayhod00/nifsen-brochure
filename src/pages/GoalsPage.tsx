import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

// Import goal images
import goalDreamHome from "@/assets/goal-dream-home.png";
import goalWealthCreation from "@/assets/goal-wealth-creation.png";
import goalRetirement from "@/assets/goal-retirement.png";
import goalEducation from "@/assets/goal-education.png";
import goalWedding from "@/assets/goal-wedding.png";
import goalEmergency from "@/assets/goal-emergency.png";

const goals = [
  {
    image: goalDreamHome,
    title: "Dream Home",
    description: "Save for your perfect home with a structured investment plan.",
    href: "/goals/dream-home",
  },
  {
    image: goalEducation,
    title: "Child's Education",
    description: "Secure your child's educational future with early planning.",
    href: "/goals/education",
  },
  {
    image: goalRetirement,
    title: "Retirement",
    description: "Build a comfortable corpus for your golden years.",
    href: "/goals/retirement",
  },
  {
    image: goalEmergency,
    title: "Emergency Fund",
    description: "Create a safety net for unexpected life events.",
    href: "/goals/emergency",
  },
  {
    image: goalWedding,
    title: "Child's Marriage",
    description: "Plan ahead for your child's special day.",
    href: "/goals/marriage",
  },
  {
    image: goalWealthCreation,
    title: "Wealth Creation",
    description: "Grow your wealth with long-term disciplined investing.",
    href: "/goals/wealth",
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
                <GlassCard className="p-0 h-full group overflow-hidden">
                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image container */}
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={goal.image} 
                        alt={goal.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 -mt-16 relative z-10">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                        {goal.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{goal.description}</p>
                      <span className="inline-flex items-center text-accent font-medium text-sm">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
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
