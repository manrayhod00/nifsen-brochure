import { Link } from "react-router-dom";
import nifsenLogo from "@/assets/nifsen-logo.png";

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
                <div className="font-bold text-foreground">NIFSEN Groups</div>
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
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="block text-foreground/80 mb-1">Address</span>
                Ground Floor, Kakateeya Residency Apartment,<br />
                Old HDFC Bank Building, Kappagal Road,<br />
                Ballari - 583101
              </li>
              <li>
                <span className="block text-foreground/80 mb-1">Phone</span>
                <a href="tel:+918088071633" className="hover:text-foreground transition-colors">
                  +91 8088071633
                </a>
              </li>
              <li>
                <span className="block text-foreground/80 mb-1">Email</span>
                <a href="mailto:support@nifsengroups.in" className="hover:text-foreground transition-colors">
                  support@nifsengroups.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="section-container py-6">
          {/* Regulatory */}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
            <span>ARN: 253725</span>
          </div>
          
          {/* Disclaimers */}
          <div className="text-xs text-muted-foreground/70 space-y-2">
            <p>
              Investments in security market is subject to market risks. Read all scheme-related documents carefully before investing.
            </p>
            <p>
              Past performance is not indicative of future results. The value of investments can go down as well as up.
            </p>
            <p>
              This website is for information purposes only and does not constitute investment advice or an offer to invest.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-border/20 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} NIFSEN Groups. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
