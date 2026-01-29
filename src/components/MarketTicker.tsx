import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Minus, Clock } from "lucide-react";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  isOpen?: boolean;
}

// Mock data generator for realistic market simulation
const generateMockData = (): MarketData[] => {
  const baseData = [
    { symbol: "NIFTY", name: "Nifty 50", basePrice: 24850, volatility: 0.8 },
    { symbol: "SENSEX", name: "Sensex", basePrice: 81500, volatility: 0.75 },
    { symbol: "BANKNIFTY", name: "Bank Nifty", basePrice: 52300, volatility: 1.2 },
    { symbol: "NASDAQ", name: "Nasdaq", basePrice: 19850, volatility: 0.9 },
    { symbol: "DOW", name: "Dow Jones", basePrice: 43200, volatility: 0.6 },
    { symbol: "GOLD", name: "Gold", basePrice: 78500, volatility: 0.4 },
    { symbol: "SILVER", name: "Silver", basePrice: 89200, volatility: 0.7 },
    { symbol: "CRUDE", name: "Crude Oil", basePrice: 6150, volatility: 1.5 },
  ];

  return baseData.map((item) => {
    const changePercent = (Math.random() - 0.5) * item.volatility * 2;
    const change = (item.basePrice * changePercent) / 100;
    const price = item.basePrice + change;
    
    return {
      symbol: item.symbol,
      name: item.name,
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      isOpen: true,
    };
  });
};

// Try to fetch real data from free APIs
const fetchRealMarketData = async (): Promise<MarketData[] | null> => {
  try {
    // Using Yahoo Finance API through a CORS proxy alternative
    // Note: Free APIs have limitations, we'll use mock data as fallback
    const response = await fetch(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=^NSEI,^BSESN,^NSEBANK,^IXIC,^DJI,GC=F,SI=F,CL=F",
      { mode: "cors" }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const quotes = data?.quoteResponse?.result;
    
    if (!quotes || quotes.length === 0) return null;
    
    const symbolMap: Record<string, { symbol: string; name: string }> = {
      "^NSEI": { symbol: "NIFTY", name: "Nifty 50" },
      "^BSESN": { symbol: "SENSEX", name: "Sensex" },
      "^NSEBANK": { symbol: "BANKNIFTY", name: "Bank Nifty" },
      "^IXIC": { symbol: "NASDAQ", name: "Nasdaq" },
      "^DJI": { symbol: "DOW", name: "Dow Jones" },
      "GC=F": { symbol: "GOLD", name: "Gold" },
      "SI=F": { symbol: "SILVER", name: "Silver" },
      "CL=F": { symbol: "CRUDE", name: "Crude Oil" },
    };
    
    return quotes.map((quote: any) => ({
      symbol: symbolMap[quote.symbol]?.symbol || quote.symbol,
      name: symbolMap[quote.symbol]?.name || quote.shortName,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      isOpen: quote.marketState === "REGULAR",
    }));
  } catch (error) {
    console.log("Using mock market data (API unavailable)");
    return null;
  }
};

const MarketItem = ({ data }: { data: MarketData }) => {
  const isPositive = data.change > 0;
  const isNeutral = data.change === 0;
  
  return (
    <div className="flex items-center gap-2 px-4 py-1 whitespace-nowrap">
      <span className="font-semibold text-foreground/90">{data.symbol}</span>
      <span className="text-foreground">₹{data.price.toLocaleString("en-IN")}</span>
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
  const tickerRef = useRef<HTMLDivElement>(null);

  const updateMarketData = async () => {
    const realData = await fetchRealMarketData();
    if (realData) {
      setMarketData(realData);
    } else {
      setMarketData(generateMockData());
    }
    setLastUpdated(new Date());
    
    // Check if Indian market is open (9:15 AM - 3:30 PM IST, Mon-Fri)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const hours = istTime.getUTCHours();
    const minutes = istTime.getUTCMinutes();
    const day = istTime.getUTCDay();
    const timeInMinutes = hours * 60 + minutes;
    const isWeekday = day >= 1 && day <= 5;
    const isMarketHours = timeInMinutes >= 555 && timeInMinutes <= 930; // 9:15 to 15:30
    
    setMarketStatus(isWeekday && isMarketHours ? "open" : "closed");
  };

  useEffect(() => {
    updateMarketData();
    
    // Update every 30 seconds
    const interval = setInterval(updateMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (marketData.length === 0) {
    return (
      <div className="bg-background-secondary/90 backdrop-blur-sm border-b border-border/30 overflow-hidden">
        <div className="section-container py-1.5">
          <div className="flex items-center justify-center text-xs text-muted-foreground">
            Loading market data...
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
