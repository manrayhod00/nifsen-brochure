import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, Phone } from "lucide-react";
import nifsenLogo from "@/assets/nifsen-logo.png";
import { contact, branches } from "@/config/contact";
import { Magnetic, Stagger } from "@/components/motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Goals", href: "/goals" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Contact Us", href: "/contact" },
];

const calculatorLinks = [
  { label: "SIP Calculator", href: "/calculators/sip" },
  { label: "Compounding Calculator", href: "/calculators/compounding" },
  { label: "Retirement Calculator", href: "/calculators/retirement" },
  { label: "EMI Calculator", href: "/calculators/emi" },
];

/** Underline that grows in from the left on hover / focus */
const underline =
  "relative inline-block after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-accent after:to-primary after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100";

const linkClass = `${underline} text-muted-foreground hover:text-foreground text-sm transition-colors duration-300`;

const ColumnTitle = ({ children }: { children: ReactNode }) => (
  <h4 className="flex items-center gap-2 text-foreground font-semibold mb-5">
    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
    {children}
  </h4>
);

/** Glowing gradient line with a highlight that keeps sweeping across */
const ShimmerLine = () => {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-x-0 top-0 h-px overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      {!reduce && (
        <motion.div
          className="absolute top-0 h-px w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(45 95% 65%), hsl(48 100% 85%), hsl(45 95% 65%), transparent)",
            boxShadow: "0 0 16px 2px hsla(45, 95%, 60%, 0.7)",
          }}
          initial={{ left: "-35%" }}
          animate={{ left: "105%" }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
        />
      )}
    </div>
  );
};

const Footer = () => {
  const reduce = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      <ShimmerLine />
      {/* Soft glow below the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "radial-gradient(60% 100% at 50% 0%, hsla(262, 83%, 58%, 0.18), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Main Footer */}
      <div className="section-container relative py-16">
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" stagger={0.12}>
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="group flex items-center gap-3 w-fit">
              <img
                src={nifsenLogo}
                alt="NIFSEN"
                className="h-10 w-auto brightness-110 contrast-110 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="font-bold text-foreground">{contact.companyName}</div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Goal first investing with a transparent process, disciplined reviews, and guidance that fits your risk.
            </p>
            <Magnetic strength={0.35}>
              <button
                type="button"
                onClick={scrollToTop}
                className="group glass-card border-spin inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/90 hover:text-foreground transition-colors"
                aria-label="Back to top"
              >
                <span className="icon-orb flex h-7 w-7 items-center justify-center rounded-full bg-primary/30">
                  <ArrowUp className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5" />
                </span>
                Back to top
              </button>
            </Magnetic>
          </div>

          {/* Quick Links */}
          <div>
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={contact.openDematUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} group inline-flex items-center gap-1`}
                >
                  Open Demat
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <ColumnTitle>Calculators</ColumnTitle>
            <ul className="space-y-2.5">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <div className="space-y-5 text-sm text-muted-foreground">
              <div>
                <span className="block text-foreground/80 mb-3">Offices</span>
                <ul className="space-y-4">
                  {branches.map((branch, i) => (
                    <motion.li
                      key={branch.id}
                      className="relative pl-5 leading-snug"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: EASE_OUT }}
                    >
                      <span
                        className="ping-dot absolute left-0 top-1 h-2 w-2 rounded-full bg-accent"
                        style={{ animationDelay: `${i * 0.4}s` }}
                        aria-hidden="true"
                      />
                      <span className="block text-foreground/90 text-xs font-semibold uppercase tracking-wider">
                        {branch.city}
                        {branch.isHeadOffice && (
                          <span className="ml-1 text-accent normal-case font-medium">(Head Office)</span>
                        )}
                        {branch.isRegionalOffice && (
                          <span className="ml-1 text-accent normal-case font-medium">(Regional Office)</span>
                        )}
                        {branch.badge && (
                          <span className="ml-1 text-accent normal-case font-medium">({branch.badge})</span>
                        )}
                      </span>
                      <span className="block text-xs">
                        {branch.addressLines.map((line, j) => (
                          <span key={j}>
                            {line}
                            <br />
                          </span>
                        ))}
                        {branch.pincode}, {branch.state}
                      </span>
                      {branch.phone && (
                        <a
                          href={`tel:${branch.phone}`}
                          className={`${underline} text-xs text-foreground/80 hover:text-foreground transition-colors mt-1`}
                        >
                          {branch.phoneDisplay}
                        </a>
                      )}
                      {branch.manager && (
                        <span className="block text-[11px] text-muted-foreground/80">
                          {branch.manager.role ?? "Branch Manager"}: {branch.manager.name}
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block text-foreground/80 mb-1">Phone</span>
                <a href={`tel:${contact.phone}`} className={`${underline} inline-flex items-center gap-2 hover:text-foreground transition-colors`}>
                  <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {contact.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="block text-foreground/80 mb-1">Email</span>
                <a
                  href={`mailto:${contact.email}`}
                  className={`${underline} inline-flex items-center gap-2 break-all hover:text-foreground transition-colors`}
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </Stagger>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-border/30">
        {/* Large faint wordmark with a slow shine */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden select-none"
          aria-hidden="true"
        >
          <span
            className="text-shimmer-gold font-black leading-none tracking-tighter opacity-[0.07] translate-y-[18%]"
            style={{ fontSize: "clamp(5rem, 22vw, 18rem)", animationDuration: "12s" }}
          >
            NIFSEN
          </span>
        </div>

        <motion.div
          className="section-container relative py-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          {/* Regulatory */}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-5">
            <span className="rounded-full border border-border/40 bg-card/40 px-3 py-1">
              AMFI registered Mutual Fund Distributor · ARN: {contact.arn}
            </span>
            <span className="rounded-full border border-border/40 bg-card/40 px-3 py-1">CIN: {contact.cin}</span>
            <span className="rounded-full border border-border/40 bg-card/40 px-3 py-1">ISIN: {contact.isin}</span>
            {/* TODO: replace with the actual SEBI RIA / RA registration number once issued */}
          </div>

          {/* Disclaimers */}
          <div className="text-xs text-muted-foreground/70 space-y-2 max-w-4xl">
            <p>
              Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
            </p>
            <p>
              Past performance is not indicative of future results. The value of investments can go down as well as up.
            </p>
            <p>
              This website is for information purposes only and does not constitute investment advice or a solicitation
              to buy or sell any financial product. Please consult our team before making investment decisions.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-border/20 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {contact.companyName}. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
