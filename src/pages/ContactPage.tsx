import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Request submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const whatsappUrl = `https://wa.me/919XXXXXXXXX?text=${encodeURIComponent(
    "Hello, I would like to schedule a consultation."
  )}`;

  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="heading-xl mb-6">
              Let's <span className="text-gradient-gold">connect</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions? Want to discuss your financial goals? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 pb-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <GlassCard className="p-8" hover={false}>
              <h2 className="heading-md mb-6">Request a Call Back</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell us about your financial goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Request a Call Back
                    </>
                  )}
                </button>
              </form>
            </GlassCard>

            {/* Contact Info */}
            <div className="space-y-6">
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Ground Floor, Kakateeya Residency Apartment,<br />
                      Old HDFC Bank Building, Kappagal Road,<br />
                      Ballari - 583101
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+918088071633"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +91 8088071633
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:support@nifseninvestmentservices.in"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      support@nifseninvestmentservices.in
                    </a>
                  </div>
                </div>
              </GlassCard>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <GlassCard className="p-6 bg-[#25D366]/10 border-[#25D366]/30 hover:bg-[#25D366]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" fill="white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Chat on WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">
                        Get instant responses during business hours
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </a>

              {/* Map Placeholder */}
              <GlassCard className="p-6 aspect-video flex items-center justify-center" hover={false}>
                <span className="text-muted-foreground">Map placeholder</span>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
