import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Minus, Clock, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  isOpen?: boolean;
  currency?: string;
}

const fetchMarketData = async (): Promise<MarketData[]> => {
  try {
    console.log("Fetching live market data from backend...");
    
    const { data, error } = await supabase.functions.invoke("market-data");
    
    if (error) {
      console.error("Edge function error:", error);
      throw new Error(error.message);
    }
    
    if (data?.success && data?.data) {
      console.log("Live market data received:", data.data.length, "quotes");
      return data.data;
    }
    
    throw new Error(data?.error || "Failed to fetch market data");
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};

const MarketItem = ({ data }: { data: MarketData }) => {
  const isPositive = data.change > 0;
  const isNeutral = data.change === 0;
  const currency = data.currency || "₹";
  
  // Format price based on value
  const formatPrice = (price: number) => {
    if (price >= 10000) {
      return price.toLocaleString("en-IN", { maximumFractionDigits: 0 });
    }
    return price.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };
  
  return (
    <div className="flex items-center gap-2 px-4 py-1 whitespace-nowrap">
      <span className="font-semibold text-foreground/90">{data.symbol}</span>
      <span className="text-foreground">
        {currency}{formatPrice(data.price)}
      </span>
      <span
        className={`flex items-center gap-0.5 text-xs font-medium ${
          isPositive
            ? "text-green-400"
            : isNeutral
            ? "text-muted-foreground"
            : "text-red-400"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : isNeutral ? (
          <Minus className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {isPositive ? "+" : ""}
        {data.changePercent.toFixed(2)}%
      </span>
    </div>
  );
};

const MarketTicker = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [marketStatus, setMarketStatus] = useState<"open" | "closed">("closed");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const updateMarketData = async () => {
    try {
      setError(null);
      const data = await fetchMarketData();
      setMarketData(data);
      setLastUpdated(new Date());
      
      // Determine market status based on Indian market hours
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(now.getTime() + istOffset);
      const hours = istTime.getUTCHours();
      const minutes = istTime.getUTCMinutes();
      const day = istTime.getUTCDay();
      const timeInMinutes = hours * 60 + minutes;
      const isWeekday = day >= 1 && day <= 5;
      const isMarketHours = timeInMinutes >= 555 && timeInMinutes <= 930;
      
      // Also check if any quotes show as open
      const anyOpen = data.some((d) => d.isOpen);
      setMarketStatus(anyOpen || (isWeekday && isMarketHours) ? "open" : "closed");
    } catch (err) {
      console.error("Failed to update market data:", err);
      setError("Failed to load market data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateMarketData();
    
    // Update every 30 seconds
    const interval = setInterval(updateMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-background-secondary/90 backdrop-blur-sm border-b border-border/30 overflow-hidden">
        <div className="section-container py-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="w-3 h-3 animate-spin" />
            Loading live market data...
          </div>
        </div>
      </div>
    );
  }

  if (error || marketData.length === 0) {
    return (
      <div className="bg-background-secondary/90 backdrop-blur-sm border-b border-border/30 overflow-hidden">
        <div className="section-container py-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>{error || "Market data unavailable"}</span>
            <button 
              onClick={updateMarketData}
              className="text-accent hover:text-accent/80 underline"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-secondary/90 backdrop-blur-sm border-b border-border/30 overflow-hidden">
      <div className="relative">
        {/* Market Status Badge */}
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3 bg-gradient-to-r from-background-secondary via-background-secondary to-transparent pr-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                marketStatus === "open" ? "bg-green-400 animate-pulse" : "bg-red-400"
              }`}
            />
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
              {marketStatus === "open" ? "Market Open" : "Market Closed"}
            </span>
          </div>
        </div>

        {/* Scrolling Ticker */}
        <div className="overflow-hidden pl-24 sm:pl-32">
          <div
            ref={tickerRef}
            className="flex animate-marquee"
            style={{
              animation: "marquee 40s linear infinite",
            }}
          >
            {/* Duplicate content for seamless loop */}
            {[...marketData, ...marketData].map((item, index) => (
              <MarketItem key={`${item.symbol}-${index}`} data={item} />
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pr-3 bg-gradient-to-l from-background-secondary via-background-secondary to-transparent pl-8">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="hidden sm:inline">
              {lastUpdated.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;
