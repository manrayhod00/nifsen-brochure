import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contact, whatsappLink } from "@/config/contact";
import { useSEO } from "@/hooks/useSEO";

const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const ContactPage = () => {
  useSEO({
    title: "Contact Us",
    description: `Talk to ${contact.companyName} in Ballari. Phone, WhatsApp, email, and office location.`,
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
      // `leads` table is defined in supabase/migrations/0001_create_leads_table.sql
      // and is not in the generated Database types yet, so we cast around it.
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
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      {contact.address.line1}<br />
                      {contact.address.line2}<br />
                      {contact.address.line3}
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

              {/* Office Location Map */}
              <GlassCard className="p-2 overflow-hidden" hover={false}>
                <iframe
                  title="NIFSEN office location"
                  src={contact.mapEmbedUrl}
                  className="w-full aspect-video rounded-lg border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
