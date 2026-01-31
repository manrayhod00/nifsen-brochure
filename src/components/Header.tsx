import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import nifsenLogo from "@/assets/nifsen-logo.png";
import MarketTicker from "./MarketTicker";

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
  {
    label: "Knowledge",
    href: "/knowledge",
    dropdown: [
      { label: "Blogs", href: "/knowledge?tab=blogs" },
      { label: "News", href: "/knowledge?tab=news" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
  { label: "Open Demat", href: "https://mosl.co/MOSWEB/kc1PWeQYgr", isExternal: true },
];

const DropdownMenu = ({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="dropdown-menu">
      {items.map((item) => (
        <Link key={item.href} to={item.href} className="dropdown-item">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const NavItemComponent = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  if (item.dropdown) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={item.href}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
        >
          {item.label}
          <ChevronDown className="w-4 h-4" />
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
        className="px-3 py-2 text-sm font-medium bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
    >
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-card border-l border-border animate-slide-in-right overflow-y-auto">
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="p-2 text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-4 pb-8">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-border/50">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between w-full py-4 text-foreground"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openDropdowns.includes(item.label) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdowns.includes(item.label) && (
                    <div className="pl-4 pb-4 space-y-2">
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
                  )}
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
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block py-4 text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Market Ticker */}
      <MarketTicker />

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md shadow-glass"
            : "bg-transparent"
        }`}
      >
        <div className="section-container py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={nifsenLogo} alt="NIFSEN" className="h-12 w-auto brightness-110 contrast-110" />
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-foreground">NIFSEN GROUP</div>
                <div className="text-xs text-muted-foreground">Mutual Funds • Insurance • Wealth Management</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavItemComponent key={item.label} item={item} />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 text-foreground"
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
