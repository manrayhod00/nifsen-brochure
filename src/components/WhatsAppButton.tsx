import { MessageCircle } from "lucide-react";
import motilalOswalLogo from "@/assets/motilal-oswal-logo.png";

const WhatsAppButton = () => {
  const phoneNumber = "+918088071633";
  const message = "Hello, I would like to know more about NIFSEN GROUP.";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  const openAccountUrl = "https://mosl.co/MOSWEB/kc1PWeQYgr";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Open Account Button */}
      <a
        href={openAccountUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        aria-label="Open Account with Motilal Oswal"
      >
        <div className="relative">
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-card text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Open Account
          </span>
          
          {/* Button */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 bg-white border-2 border-[#1a3a8f] overflow-hidden p-1.5">
            <img 
              src={motilalOswalLogo} 
              alt="Motilal Oswal" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-[#1a3a8f] animate-ping opacity-20" />
        </div>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-card text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat on WhatsApp
          </span>
          
          {/* Button */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 bg-[#25D366]">
            <MessageCircle className="w-7 h-7 text-white" fill="white" />
          </div>
          
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
