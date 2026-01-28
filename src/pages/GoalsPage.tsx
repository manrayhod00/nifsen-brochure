import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import goal images
import dreamHomeImg from "@/assets/goals/dream-home.png";
import wealthCreationImg from "@/assets/goals/wealth-creation.png";
import retirementImg from "@/assets/goals/retirement.png";
import childEducationImg from "@/assets/goals/child-education.png";
import childWeddingImg from "@/assets/goals/child-wedding.png";
import emergencyFundImg from "@/assets/goals/emergency-fund.png";

const goals = [
  {
    title: "Dream Home",
    description: "Save for your perfect home with a structured investment plan.",
    href: "/goals/dream-home",
    image: dreamHomeImg,
  },
  {
    title: "Wealth Creation",
    description: "Grow your wealth with long-term disciplined investing.",
    href: "/goals/wealth",
    image: wealthCreationImg,
  },
  {
    title: "Retirement",
    description: "Build a comfortable corpus for your golden years.",
    href: "/goals/retirement",
    image: retirementImg,
  },
  {
    title: "Child's Education",
    description: "Secure your child's educational future with early planning.",
    href: "/goals/education",
    image: childEducationImg,
  },
  {
    title: "Child's Wedding",
    description: "Plan ahead for your child's special day.",
    href: "/goals/marriage",
    image: childWeddingImg,
  },
  {
    title: "Emergency Fund",
    description: "Create a safety net for unexpected life events.",
    href: "/goals/emergency",
    image: emergencyFundImg,
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
              <Link 
                key={goal.title} 
                to={goal.href}
                className="goal-card group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={goal.image} 
                  alt={goal.title}
                  className="goal-card-image"
                />
                <div className="goal-card-overlay" />
                <div className="goal-card-content">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {goal.description}
                  </p>
                  <span className="inline-flex items-center text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GoalsPage;
