import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import BokehBackground from "./BokehBackground";
import { ScrollProgress } from "./motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname, hash } = useLocation();

  // New page: start at the top, or at the linked section when there is a #hash
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    const timer = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  // Pause the ambient CSS animations while the tab is in the background
  useEffect(() => {
    const onVisibility = () => {
      document.documentElement.classList.toggle("motion-paused", document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <BokehBackground />
      <ScrollProgress />
      <div className="relative z-10">
        <Header />
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
