import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

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
    href: "/goals/dream-home",
  },
  {
    image: goalEducation,
    title: "Child's Education",
    href: "/goals/education",
  },
  {
    image: goalRetirement,
    title: "Retirement",
    href: "/goals/retirement",
  },
  {
    image: goalEmergency,
    title: "Financial Emergency",
    href: "/goals/emergency",
  },
  {
    image: goalWedding,
    title: "Child's Wedding",
    href: "/goals/marriage",
  },
  {
    image: goalWealthCreation,
    title: "Wealth Creation",
    href: "/goals/wealth",
  },
];

const GoalsPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="section-container">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="heading-xl mb-6">
                Plan for what <span className="text-gradient-gold">matters</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Every financial goal deserves a dedicated strategy. Choose your goal and let's build a plan together.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => (
              <ScrollReveal key={goal.title} delay={index * 0.1}>
                <Link to={goal.href} className="block group">
                  <div
                    className="relative h-[320px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl"
                    style={{
                      backgroundImage: `url(${goal.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {/* Vignette overlay for cinematic blending */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                      style={{
                        background: `
                          radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%),
                          linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 30%, transparent 60%)
                        `,
                      }}
                    />
                    
                    {/* Additional hover darkening */}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                    
                    {/* Subtle border glow on hover */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 0 1px hsla(var(--accent), 0.3), 0 0 30px hsla(var(--accent), 0.15)',
                      }}
                    />
                    
                    {/* Glass strip with title at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div 
                        className="inline-block px-5 py-3 rounded-xl backdrop-blur-md transition-all duration-300 group-hover:backdrop-blur-lg"
                        style={{
                          background: 'hsla(var(--background), 0.7)',
                          border: '1px solid hsla(var(--accent), 0.2)',
                          boxShadow: '0 4px 20px hsla(0, 0%, 0%, 0.3)',
                        }}
                      >
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                          {goal.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="section-container">
          <ScrollReveal>
            <div 
              className="glass-card p-8 sm:p-12 text-center relative overflow-hidden"
              style={{
                background: 'var(--glass-bg)',
              }}
            >
              <h2 className="heading-md mb-4">
                Not sure which goal to <span className="text-gradient-gold">prioritize</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Book a free consultation and we'll help you create a personalized financial roadmap.
              </p>
              <Link to="/contact" className="btn-primary">
                Book a Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default GoalsPage;
