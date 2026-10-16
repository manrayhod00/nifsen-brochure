import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import nifsenLogo from "@/assets/nifsen-logo.png";
import MarketTicker from "./MarketTicker";
import { contact } from "@/config/contact";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "Our Story", href: "/about" },
      { label: "Gallery", href: "/about#gallery" },
    ],
  },
  { label: "Services", href: "/services" },
  {
    label: "Calculators",
    href: "/calculators",
    dropdown: [
      { label: "SIP Calculator", href: "/calculators/sip" },
      { label: "Compounding Calculator", href: "/calculators/compounding" },
      { label: "Retirement Calculator", href: "/calculators/retirement" },
      { label: "EMI Calculator", href: "/calculators/emi" },
    ],
  },
  {
    label: "Goals",
    href: "/goals",
    dropdown: [
      { label: "Dream Home", href: "/goals/dream-home" },
      { label: "Child's Education", href: "/goals/education" },
      { label: "Retirement", href: "/goals/retirement" },
      { label: "Emergency Fund", href: "/goals/emergency" },
      { label: "Child's Marriage", href: "/goals/marriage" },
      { label: "Wealth Creation", href: "/goals/wealth" },
    ],
  },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Contact Us", href: "/contact" },
  { label: "Open Demat", href: contact.openDematUrl, isExternal: true },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const DropdownMenu = ({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="dropdown-menu"
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.98 }}
        transition={{ duration: 0.22, ease: EASE_OUT }}
        style={{ transformOrigin: "top left" }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.03 * i + 0.05 }}
          >
            <Link to={item.href} className="dropdown-item">
              {item.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

/** Glowing pill that slides between nav items to mark the current page */
const ActivePill = () => (
  <motion.span
    layoutId="nav-active-pill"
    className="absolute inset-0 -z-10 rounded-full"
    style={{
      background: "linear-gradient(135deg, hsla(262, 83%, 58%, 0.35), hsla(285, 70%, 50%, 0.25))",
      boxShadow: "inset 0 0 0 1px hsla(262, 80%, 70%, 0.35), 0 0 18px hsla(262, 83%, 58%, 0.35)",
    }}
    transition={{ type: "spring", stiffness: 380, damping: 32 }}
  />
);

const navLinkClass = (active: boolean) =>
  `relative isolate flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-full hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-200 ${
    active ? "text-foreground" : "text-foreground/75"
  }`;

const NavItemComponent = ({ item, active }: { item: NavItem; active: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      if (e.key !== "Enter") e.preventDefault();
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  if (item.dropdown) {
    return (
      <div
        className="relative"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        <Link to={item.href} aria-haspopup="menu" aria-expanded={isOpen} className={navLinkClass(active)}>
          {active && <ActivePill />}
          {item.label}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </Link>
        <DropdownMenu items={item.dropdown} isOpen={isOpen} />
      </div>
    );
  }

  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative ml-2 overflow-hidden px-4 py-2 text-sm font-semibold bg-gradient-gold text-accent-foreground rounded-full shadow-gold-glow hover:scale-105 transition-transform duration-200 btn-sheen"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link to={item.href} className={navLinkClass(active)}>
      {active && <ActivePill />}
      {item.label}
    </Link>
  );
};

const MobileNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-card/95 backdrop-blur-xl border-l border-primary/20 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
          >
            <div className="p-4 flex justify-end">
              <button onClick={onClose} className="p-2 text-foreground rounded-full hover:bg-primary/20 transition-colors" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-4 pb-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="border-b border-border/50"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.1, ease: EASE_OUT, duration: 0.5 }}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex items-center justify-between w-full py-4 text-foreground"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            openDropdowns.includes(item.label) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openDropdowns.includes(item.label) && (
                          <motion.div
                            className="pl-4 space-y-2 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE_OUT }}
                          >
                            <div className="pb-4 space-y-2">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href}
                                  onClick={onClose}
                                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="block py-4 text-accent font-medium"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} onClick={onClose} className="block py-4 text-foreground">
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Market Ticker */}
      <MarketTicker />

      {/* Main Navbar: a floating glass pill once you scroll */}
      <header className="sticky top-0 z-40 pt-2">
        <div className="section-container">
          <div
            className={`flex items-center justify-between rounded-full border px-3 sm:px-5 transition-all duration-500 ${
              scrolled
                ? "py-1.5 border-primary/25 bg-background/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_hsla(262,83%,40%,0.55)]"
                : "py-2.5 border-transparent bg-transparent"
            }`}
          >
            {/* Logo */}
            <Link to="/" aria-label={contact.companyName} className="flex items-center gap-3 min-w-0">
              <motion.img
                src={nifsenLogo}
                alt="NIFSEN"
                className={`w-auto brightness-110 contrast-110 flex-shrink-0 transition-[height] duration-500 ${
                  scrolled ? "h-9 sm:h-10" : "h-10 sm:h-12"
                }`}
                whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
                transition={{ duration: 0.6 }}
              />
              <div className="min-w-0">
                <div className="hidden sm:block text-lg font-bold text-foreground">{contact.companyName}</div>
                <div className="sm:hidden text-base font-bold text-foreground truncate">{contact.shortName}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground truncate">{contact.tagline}</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <NavItemComponent
                  key={item.label}
                  item={item}
                  active={!item.isExternal && isActivePath(pathname, item.href)}
                />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 text-foreground rounded-full hover:bg-primary/20 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
};

export default Header;
