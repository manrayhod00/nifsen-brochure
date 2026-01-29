import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "+918088071633";
  const message = "Hello, I would like to know more about NIFSEN Groups.";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
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
  );
};

export default WhatsAppButton;
