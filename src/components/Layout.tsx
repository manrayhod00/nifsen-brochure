import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import BokehBackground from "./BokehBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen">
      <BokehBackground />
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
