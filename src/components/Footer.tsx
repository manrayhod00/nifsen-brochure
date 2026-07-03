import { Link } from "react-router-dom";
import nifsenLogo from "@/assets/nifsen-logo.png";
import { contact, branches } from "@/config/contact";

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/30">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={nifsenLogo} alt="NIFSEN" className="h-10 w-auto brightness-110 contrast-110" />
              <div>
                <div className="font-bold text-foreground">{contact.companyName}</div>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Goal-first investing with transparent process, disciplined reviews, and risk-fit guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Goals", href: "/goals" },
                { label: "Knowledge", href: "/knowledge" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={contact.openDematUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Open Demat ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2">
              {[
                { label: "SIP Calculator", href: "/calculators/sip" },
                { label: "Compounding Calculator", href: "/calculators/compounding" },
                { label: "Retirement Calculator", href: "/calculators/retirement" },
                { label: "EMI Calculator", href: "/calculators/emi" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <span className="block text-foreground/80 mb-2">Offices</span>
                <ul className="space-y-3">
                  {branches.map((branch) => (
                    <li key={branch.id} className="leading-snug">
                      <span className="block text-foreground/90 text-xs font-semibold uppercase tracking-wider">
                        {branch.city}
                        {branch.isHeadOffice && (
                          <span className="ml-1 text-accent normal-case font-medium">(Head Office)</span>
                        )}
                      </span>
                      <span className="block text-xs">
                        {branch.addressLines.map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                        {branch.pincode}, {branch.state}
                      </span>
                      <a
                        href={`tel:${branch.phone}`}
                        className="block text-xs text-foreground/80 hover:text-foreground transition-colors mt-1"
                      >
                        {branch.phoneDisplay}
                      </a>
                      {branch.manager && (
                        <span className="block text-[11px] text-muted-foreground/80">
                          {branch.manager.role ?? "Branch Manager"}: {branch.manager.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block text-foreground/80 mb-1">Phone</span>
                <a href={`tel:${contact.phone}`} className="hover:text-foreground transition-colors">
                  {contact.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="block text-foreground/80 mb-1">Email</span>
                <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="section-container py-6">
          {/* Regulatory */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
            <span>AMFI-registered Mutual Fund Distributor — ARN: {contact.arn}</span>
            <span>CIN: {contact.cin}</span>
            <span>ISIN: {contact.isin}</span>
            {/* TODO: replace with the actual SEBI RIA / RA registration number once issued */}
          </div>

          {/* Disclaimers */}
          <div className="text-xs text-muted-foreground/70 space-y-2">
            <p>
              Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
