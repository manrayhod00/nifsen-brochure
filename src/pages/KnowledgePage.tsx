import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const blogs = [
  {
    title: "Understanding SIP: A Beginner's Guide",
    excerpt: "Systematic Investment Plans are one of the most effective ways to build wealth over time. Learn how they work and why they're popular.",
    readTime: "5 min read",
    tag: "Basics",
    date: "Jan 15, 2026",
  },
  {
    title: "Equity vs Debt: Choosing the Right Mix",
    excerpt: "Asset allocation is crucial for risk-adjusted returns. Here's how to decide the right mix for your portfolio.",
    readTime: "7 min read",
    tag: "Strategy",
    date: "Jan 10, 2026",
  },
  {
    title: "Tax Planning with ELSS Funds",
    excerpt: "Save taxes while building wealth. Learn how Equity Linked Savings Schemes can help you achieve both goals.",
    readTime: "6 min read",
    tag: "Tax",
    date: "Jan 5, 2026",
  },
  {
    title: "Common Investment Mistakes to Avoid",
    excerpt: "From timing the market to ignoring inflation, here are the mistakes that can derail your financial goals.",
    readTime: "8 min read",
    tag: "Tips",
    date: "Dec 28, 2025",
  },
];

const news = [
  {
    title: "RBI Maintains Repo Rate at 6.5%",
    excerpt: "The central bank keeps interest rates unchanged, citing stable inflation outlook and growth considerations.",
    date: "Jan 20, 2026",
    source: "Economic Times",
  },
  {
    title: "SEBI Introduces New MF Categorization Rules",
    excerpt: "New regulations aim to bring more clarity and standardization to mutual fund classifications.",
    date: "Jan 18, 2026",
    source: "Mint",
  },
  {
    title: "Sensex Hits New All-Time High",
    excerpt: "Indian equity markets continue their bull run, with the benchmark index crossing new milestones.",
    date: "Jan 15, 2026",
    source: "Business Standard",
  },
];

const KnowledgePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "blogs";

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="heading-xl mb-6">Knowledge Hub</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay informed with our latest insights, market updates, and educational content.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8">
        <div className="section-container">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => handleTabChange("blogs")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "blogs"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              Blogs
            </button>
            <button
              onClick={() => handleTabChange("news")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "news"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              News
            </button>
          </div>

          {/* Blogs Grid */}
          {activeTab === "blogs" && (
            <div className="grid sm:grid-cols-2 gap-6">
              {blogs.map((blog, index) => (
                <GlassCard key={blog.title} className="p-6 group cursor-pointer">
                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {blog.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{blog.date}</span>
                      <span className="inline-flex items-center text-sm text-accent font-medium">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {/* News List */}
          {activeTab === "news" && (
            <div className="space-y-4">
              {news.map((item, index) => (
                <GlassCard key={item.title} className="p-6 group cursor-pointer" hover>
                  <div
                    className="animate-fade-up flex flex-col sm:flex-row sm:items-center gap-4"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 text-xs text-muted-foreground whitespace-nowrap">
                      <span>{item.date}</span>
                      <span className="px-2 py-1 rounded bg-muted/50">{item.source}</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default KnowledgePage;
