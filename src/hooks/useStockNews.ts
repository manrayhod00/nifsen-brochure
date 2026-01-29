import { useState, useEffect, useCallback } from "react";

export interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  source: string;
  link?: string;
}

// Free RSS feeds for Indian stock market news
const RSS_FEEDS = [
  {
    url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
    source: "Economic Times",
  },
  {
    url: "https://www.moneycontrol.com/rss/marketreports.xml",
    source: "Moneycontrol",
  },
  {
    url: "https://www.livemint.com/rss/markets",
    source: "Mint",
  },
];

// CORS proxy for client-side RSS fetching
const CORS_PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
];

const parseRSSFeed = (xmlText: string, source: string): NewsItem[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const items = xmlDoc.querySelectorAll("item");
    
    const newsItems: NewsItem[] = [];
    items.forEach((item, index) => {
      if (index >= 5) return; // Limit to 5 items per source
      
      const title = item.querySelector("title")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const link = item.querySelector("link")?.textContent || "";
      
      // Clean up description (remove HTML tags)
      const cleanDescription = description.replace(/<[^>]*>/g, "").slice(0, 150);
      
      // Format date
      const date = pubDate ? new Date(pubDate).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) : new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      
      if (title) {
        newsItems.push({
          title: title.trim(),
          excerpt: cleanDescription.trim() || title.slice(0, 100),
          date,
          source,
          link,
        });
      }
    });
    
    return newsItems;
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
    return [];
  }
};

const fetchWithProxy = async (url: string, source: string): Promise<NewsItem[]> => {
  for (const proxy of CORS_PROXIES) {
    try {
      const response = await fetch(`${proxy}${encodeURIComponent(url)}`, {
        signal: AbortSignal.timeout(10000),
      });
      
      if (response.ok) {
        const text = await response.text();
        return parseRSSFeed(text, source);
      }
    } catch (error) {
      console.log(`Proxy ${proxy} failed for ${source}`);
    }
  }
  return [];
};

// Fallback static news data
const fallbackNews: NewsItem[] = [
  {
    title: "Markets Rally on Strong FII Inflows, Nifty Eyes New Highs",
    excerpt: "Indian markets surged as foreign institutional investors continued their buying spree, pushing benchmark indices to fresh highs.",
    date: "Jan 29, 2026",
    source: "Market Watch",
  },
  {
    title: "RBI Maintains Repo Rate at 6.5%, Focuses on Inflation",
    excerpt: "The central bank keeps interest rates unchanged, citing stable inflation outlook and maintaining growth-focused stance.",
    date: "Jan 28, 2026",
    source: "Economic Times",
  },
  {
    title: "Banking Stocks Lead Market Rally, Bank Nifty Surges 2%",
    excerpt: "Financial sector stocks outperform as credit growth picks up and asset quality improves across major lenders.",
    date: "Jan 27, 2026",
    source: "Moneycontrol",
  },
  {
    title: "IT Sector Shows Signs of Recovery Amid Global Demand",
    excerpt: "Technology stocks gain momentum as major IT companies report better-than-expected deal wins for the quarter.",
    date: "Jan 26, 2026",
    source: "Mint",
  },
  {
    title: "Gold Prices Touch Record High Amid Global Uncertainty",
    excerpt: "Yellow metal continues its upward trajectory as investors seek safe-haven assets amid geopolitical tensions.",
    date: "Jan 25, 2026",
    source: "Business Standard",
  },
  {
    title: "SEBI Introduces New MF Categorization Guidelines",
    excerpt: "New regulations aim to bring more clarity and standardization to mutual fund classifications and disclosures.",
    date: "Jan 24, 2026",
    source: "Economic Times",
  },
];

export const useStockNews = (refreshInterval = 10 * 60 * 1000) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Try to fetch from RSS feeds
      const allNewsPromises = RSS_FEEDS.map((feed) =>
        fetchWithProxy(feed.url, feed.source)
      );

      const results = await Promise.allSettled(allNewsPromises);
      const allNews: NewsItem[] = [];

      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value.length > 0) {
          allNews.push(...result.value);
        }
      });

      if (allNews.length > 0) {
        // Sort by date (newest first) and deduplicate
        const uniqueNews = allNews.reduce((acc: NewsItem[], item) => {
          const exists = acc.some(
            (n) => n.title.toLowerCase() === item.title.toLowerCase()
          );
          if (!exists) acc.push(item);
          return acc;
        }, []);

        setNews(uniqueNews.slice(0, 10));
      } else {
        // Use fallback if all feeds fail
        console.log("Using fallback news data");
        setNews(fallbackNews);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setNews(fallbackNews);
      setError("Using cached news data");
    } finally {
      setIsLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  useEffect(() => {
    fetchNews();

    // Set up auto-refresh
    const interval = setInterval(fetchNews, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchNews, refreshInterval]);

  return { news, isLoading, lastUpdated, error, refetch: fetchNews };
};
