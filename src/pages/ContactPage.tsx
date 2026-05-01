import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2, User } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contact, whatsappLink, branches, headOffice, type Branch } from "@/config/contact";
import { useSEO } from "@/hooks/useSEO";

const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const BranchCard = ({ branch }: { branch: Branch }) => (
  <GlassCard className="p-6" hover={false}>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
        <MapPin className="w-6 h-6 text-accent" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="font-semibold">{branch.city}</h3>
          {branch.isHeadOffice && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
              Head Office
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {branch.addressLines.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
          {branch.pincode}, {branch.state}
        </p>
        <div className="mt-3 pt-3 border-t border-border/30 space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-accent flex-shrink-0" />
            <a
              href={`tel:${branch.phone}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {branch.phoneDisplay}
            </a>
          </div>
          {branch.manager && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-muted-foreground">
                {branch.manager.role ?? "Branch Manager"}: {" "}
                <span className="text-foreground/90">{branch.manager.name}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </GlassCard>
);

const ContactPage = () => {
  useSEO({
    title: "Contact Us — Ballari, Bidar & Gangavathi",
    description: `Talk to ${contact.companyName}. Offices in Ballari (Head Office), Bidar, and Gangavathi, Karnataka.`,
    canonicalPath: "/contact",
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeBranchId, setActiveBranchId] = useState<Branch["id"]>(headOffice.id);

  const activeBranch = branches.find((b) => b.id === activeBranchId) ?? headOffice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!formData.name.trim()) next.name = "Please enter your name";
    if (!phoneRegex.test(formData.phone.trim())) next.phone = "Enter a valid 10-15 digit phone number";
    if (!emailRegex.test(formData.email.trim())) next.email = "Enter a valid email address";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await (supabase.from("leads" as never) as unknown as {
        insert: (row: Record<string, unknown>) => Promise<{ error: unknown }>;
      }).insert({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim() || null,
        source: "contact_form",
      });

      if (error) throw error;

      toast({
        title: "Request submitted",
        description: "Thanks — we'll get back to you within 24 hours.",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast({
        title: "Couldn't submit your request",
        description: `Please try WhatsApp or call ${contact.phoneDisplay} instead.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = whatsappLink(contact.whatsappConsultMessage);

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
              Have questions? Want to discuss your financial goals? We're here to help — across our
              offices in Ballari, Bidar, and Gangavathi.
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
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                    aria-invalid={!!errors.name}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
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
                    aria-invalid={!!errors.phone}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
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
                    aria-invalid={!!errors.email}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
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
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
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
              {/* Branches */}
              <div id="branches" className="space-y-4 scroll-mt-24">
                <h2 className="heading-md">Our Offices</h2>
                {branches.map((branch) => (
                  <BranchCard key={branch.id} branch={branch} />
                ))}
              </div>

              <GlassCard className="p-6" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {contact.phoneDisplay}
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
                      href={`mailto:${contact.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {contact.email}
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

              {/* Office Location Map with branch switcher */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Office location">
                  {branches.map((branch) => {
                    const isActive = branch.id === activeBranchId;
                    return (
                      <button
                        key={branch.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveBranchId(branch.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {branch.city}
                        {branch.isHeadOffice && " · HO"}
                      </button>
                    );
                  })}
                </div>
                <GlassCard className="p-2 overflow-hidden" hover={false}>
                  <iframe
                    key={activeBranch.id}
                    title={`${activeBranch.city} office location`}
                    src={activeBranch.mapEmbedUrl}
                    className="w-full aspect-video rounded-lg border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
