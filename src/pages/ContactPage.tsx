import { useState, type ReactNode } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Loader2,
  User,
  Sparkles,
  ArrowRight,
  Building2,
  PenLine,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { FloatingCoins, Magnetic, Marquee, SectionHeading, Stagger, WordReveal, useParallax } from "@/components/motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contact, whatsappLink, branches, headOffice, type Branch } from "@/config/contact";
import { useSEO } from "@/hooks/useSEO";

const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

/* -------------------------------------------------------------------------- */
/* Form field shell: label with icon, glowing focus ring, animated underline  */
/* -------------------------------------------------------------------------- */

const inputClass =
  "peer w-full px-4 py-3.5 rounded-xl bg-muted/40 border border-border/50 text-foreground placeholder:text-muted-foreground/70 " +
  "transition-all duration-300 focus:outline-none focus:bg-muted/60 focus:border-accent/60 focus:ring-4 focus:ring-accent/15 " +
  "focus:shadow-[0_0_28px_hsla(45,90%,60%,0.22)] hover:border-primary/50 aria-[invalid=true]:border-destructive/70 aria-[invalid=true]:ring-destructive/20";

const Field = ({
  id,
  label,
  icon: Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon: typeof User;
  error?: string;
  children: ReactNode;
}) => (
  <div className="group/field">
    <label
      htmlFor={id}
      className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground/85 transition-colors group-focus-within/field:text-accent"
    >
      <Icon className="h-4 w-4 text-accent/80 transition-transform duration-300 group-focus-within/field:scale-110 group-focus-within/field:-rotate-6" />
      {label}
    </label>
    <div className="relative">
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 peer-focus:scale-x-100"
      />
    </div>
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-destructive"
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Office card                                                                */
/* -------------------------------------------------------------------------- */

const BranchCard = ({ branch }: { branch: Branch }) => (
  <GlassCard className="p-6 h-full group" tilt>
    <div className="flex items-start gap-4">
      <div className="ping-dot w-12 h-12 rounded-full bg-primary/25 flex items-center justify-center flex-shrink-0">
        <MapPin className="w-6 h-6 text-accent transition-transform duration-500 group-hover:-translate-y-1" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{branch.city}</h3>
          {branch.isHeadOffice && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
              Head Office
            </span>
          )}
          {branch.isRegionalOffice && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
              Regional Office
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed break-words">
          {branch.addressLines.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
          {branch.pincode}, {branch.state}
        </p>
        <div className="mt-4 pt-4 border-t border-border/30 space-y-2 text-sm">
          {branch.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent flex-shrink-0" />
              <a
                href={`tel:${branch.phone}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {branch.phoneDisplay}
              </a>
            </div>
          )}
          {branch.manager && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
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

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const HeroSection = () => {
  const [ref, orbY] = useParallax(140);

  const chips = [
    { icon: Phone, label: "Call us", href: `tel:${contact.phone}` },
    { icon: Mail, label: "Email us", href: `mailto:${contact.email}` },
    { icon: Building2, label: "Visit an office", href: "#branches" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24">
      {/* Breathing orbs drifting with scroll */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true">
        <motion.div
          className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/35 blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 right-[-6rem] h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.35, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="grid-floor opacity-60" aria-hidden="true" />
      <FloatingCoins className="opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />

      {/* Floating pin cards, desktop only */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {[
          { city: headOffice.city, tag: "Head Office", className: "right-[8%] top-[28%]", float: "float-slow", delay: 1.1 },
          {
            city: branches.find((b) => b.isRegionalOffice)?.city ?? "",
            tag: "Regional Office",
            className: "right-[24%] bottom-[18%]",
            float: "float-slower",
            delay: 1.3,
          },
        ]
          .filter((card) => card.city)
          .map((card) => (
            <motion.div
              key={card.tag}
              className={`absolute ${card.className}`}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: card.delay, ease: EASE_OUT }}
            >
              <div className={`${card.float} glass-card border-spin flex items-center gap-3 rounded-2xl px-4 py-3`}>
                <div className="ping-dot w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{card.city}</div>
                  <div className="text-xs text-muted-foreground">{card.tag}</div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl space-y-7 text-center lg:text-left mx-auto lg:mx-0">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Get in touch
          </motion.span>

          <WordReveal as="h1" className="heading-xl !leading-[1.08]" immediate delay={0.3} stagger={0.1}>
            Let's <span className="text-shimmer-gold">connect</span>
          </WordReveal>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT }}
          >
            Have questions? Want to discuss your financial goals? We're here to help, across our offices in
            Ballari, Hyderabad, Bidar, and Gangavathi.
          </motion.p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {chips.map((chip, index) => (
              <motion.a
                key={chip.label}
                href={chip.href}
                className="trust-chip backdrop-blur-md group hover:border-accent/50 transition-colors"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.12, ease: EASE_OUT }}
              >
                <chip.icon className="w-4 h-4 mr-2 text-accent transition-transform duration-300 group-hover:scale-110" />
                {chip.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* City band                                                                  */
/* -------------------------------------------------------------------------- */

const CityBand = () => (
  <section className="relative py-6 border-y border-primary/15 bg-background/40 backdrop-blur-sm" aria-hidden="true">
    <Marquee duration={35}>
      {[...branches, ...branches].map((branch, i) => (
        <span key={`${branch.id}-${i}`} className="flex items-center gap-6 px-6 text-xl sm:text-2xl font-semibold whitespace-nowrap">
          <span className="text-foreground/80">{branch.city}</span>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </span>
      ))}
    </Marquee>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

const ContactPage = () => {
  useSEO({
    title: "Contact Us | Ballari, Hyderabad, Bidar & Gangavathi",
    description: `Talk to ${contact.companyName}. Offices in Ballari (Head Office), Hyderabad (Regional Office), Bidar, and Gangavathi.`,
    canonicalPath: "/contact",
  });

  const reduceMotion = useReducedMotion();
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
    if (!phoneRegex.test(formData.phone.trim())) next.phone = "Enter a valid phone number of 10 to 15 digits";
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
        description: "Thanks, we'll get back to you within 24 hours.",
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

  const quickContacts = [
    { icon: Phone, title: "Phone", text: contact.phoneDisplay, href: `tel:${contact.phone}` },
    { icon: Mail, title: "Email", text: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <>
      <HeroSection />
      <CityBand />

      {/* Form and quick contact */}
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Form */}
            <ScrollReveal scale direction="right">
              <div className="glass-card border-spin relative overflow-hidden rounded-3xl p-6 sm:p-10">
                <motion.div
                  className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl pointer-events-none"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <span className="eyebrow mb-5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Free consultation
                  </span>
                  <WordReveal as="h2" className="heading-md mb-8">
                    Request a <span className="text-shimmer-gold">Call Back</span>
                  </WordReveal>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <Field id="name" label="Full Name" icon={User} error={errors.name}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={inputClass}
                        placeholder="Your full name"
                      />
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field id="phone" label="Phone Number" icon={Phone} error={errors.phone}>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={inputClass}
                          placeholder="+91 98765 43210"
                        />
                      </Field>

                      <Field id="email" label="Email Address" icon={Mail} error={errors.email}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={inputClass}
                          placeholder="you@example.com"
                        />
                      </Field>
                    </div>

                    <Field id="message" label="Message (Optional)" icon={PenLine}>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your financial goals..."
                      />
                    </Field>

                    <Magnetic className="w-full" strength={0.15}>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileTap={isSubmitting ? undefined : { scale: 0.97 }}
                        className="btn-primary group relative w-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center py-4"
                      >
                        {!reduceMotion && !isSubmitting && (
                          <motion.span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            animate={{ x: ["0%", "450%"] }}
                            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
                          />
                        )}
                        <AnimatePresence mode="wait" initial={false}>
                          {isSubmitting ? (
                            <motion.span
                              key="loading"
                              className="relative inline-flex items-center"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Submitting...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              className="relative inline-flex items-center"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Send className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-12" />
                              Request a Call Back
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </Magnetic>
                  </form>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick contact, WhatsApp and map */}
            <div className="space-y-6 min-w-0">
              <Stagger className="grid sm:grid-cols-2 gap-5" stagger={0.12}>
                {quickContacts.map((item) => (
                  <GlassCard key={item.title} className="p-6 h-full group" tilt>
                    <div className="flex items-start gap-4">
                      <div className="icon-orb w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <item.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <a
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                        >
                          {item.text}
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </Stagger>

              {/* WhatsApp CTA with a gentle pulsing glow */}
              <ScrollReveal delay={0.15}>
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0px hsla(145, 63%, 49%, 0)",
                            "0 0 36px hsla(145, 63%, 49%, 0.35)",
                            "0 0 0px hsla(145, 63%, 49%, 0)",
                          ],
                        }
                  }
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GlassCard className="p-6 bg-[#25D366]/10 border-[#25D366]/30 hover:bg-[#25D366]/20 group" tilt>
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <span className="absolute inset-0 rounded-xl bg-[#25D366]/60 animate-ping" aria-hidden="true" />
                        <div className="relative w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold mb-1">Chat on WhatsApp</h3>
                        <p className="text-sm text-muted-foreground">Get instant responses during business hours</p>
                      </div>
                      <span className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#25D366]/50 text-[#25D366] transition-all duration-300 group-hover:bg-[#25D366] group-hover:text-white group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </GlassCard>
                </motion.a>
              </ScrollReveal>

              {/* Office Location Map with branch switcher */}
              <ScrollReveal delay={0.25} scale>
                <div className="space-y-3">
                  <div
                    className="flex flex-wrap gap-2 rounded-3xl sm:rounded-full p-1.5 bg-muted/30 border border-border/40 backdrop-blur-md w-full sm:w-fit"
                    role="tablist"
                    aria-label="Office location"
                  >
                    {branches.map((branch) => {
                      const isActive = branch.id === activeBranchId;
                      return (
                        <button
                          key={branch.id}
                          id={`office-tab-${branch.id}`}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-controls="office-map-panel"
                          onClick={() => setActiveBranchId(branch.id)}
                          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                            isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="office-tab-pill"
                              className="absolute inset-0 rounded-full bg-primary shadow-[0_0_20px_hsla(262,83%,58%,0.55)]"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              aria-hidden="true"
                            />
                          )}
                          <span className="relative z-10">
                            {branch.city}
                            {branch.isHeadOffice && " · HO"}
                            {branch.isRegionalOffice && " · RO"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <GlassCard className="border-spin p-2 overflow-hidden" hover={false}>
                    <div
                      id="office-map-panel"
                      role="tabpanel"
                      aria-labelledby={`office-tab-${activeBranch.id}`}
                      className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted/30"
                    >
                      <AnimatePresence initial={false}>
                        <motion.iframe
                          key={activeBranch.id}
                          title={`${activeBranch.city} office location`}
                          src={activeBranch.mapEmbedUrl}
                          className="absolute inset-0 w-full h-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          allowFullScreen
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: EASE_OUT }}
                        />
                      </AnimatePresence>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={activeBranch.id}
                          className="pointer-events-none absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-full glass-card px-3 py-1.5 text-xs font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.35, ease: EASE_OUT }}
                          aria-hidden="true"
                        >
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          {activeBranch.city}, {activeBranch.state}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </GlassCard>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section id="branches" className="pb-24 scroll-mt-24">
        <div className="section-container">
          <SectionHeading
            eyebrow="Visit us"
            title={<>Our <span className="text-shimmer-gold">Offices</span></>}
            subtitle={`${branches.length} offices serving clients across Karnataka and Telangana.`}
          />
          <Stagger className="grid md:grid-cols-2 xl:grid-cols-4 gap-6" stagger={0.12}>
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
