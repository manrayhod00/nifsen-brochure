import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Clock, ArrowRight, RefreshCw, ExternalLink } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { blogPosts } from "@/data/blogContent";
import { useStockNews } from "@/hooks/useStockNews";
import { Button } from "@/components/ui/button";

const KnowledgePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "blogs";
  const { news, isLoading, lastUpdated, refetch } = useStockNews();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
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
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-4">
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

            {activeTab === "news" && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>
                  Updated:{" "}
                  {lastUpdated.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-1.5"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            )}
          </div>

          {/* Blogs Grid */}
          {activeTab === "blogs" && (
            <div className="grid sm:grid-cols-2 gap-6">
              {blogPosts.map((blog, index) => (
                <Link key={blog.id} to={`/blog/${blog.id}`}>
                  <GlassCard className="p-6 group cursor-pointer h-full" hover>
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
                      <p className="text-sm text-muted-foreground mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {blog.date}
                        </span>
                        <span className="inline-flex items-center text-sm text-accent font-medium">
                          Read more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          )}

          {/* News List */}
          {activeTab === "news" && (
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <GlassCard key={index} className="p-6" hover={false}>
                    <div className="animate-pulse flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-muted/50 rounded w-3/4" />
                        <div className="h-4 bg-muted/30 rounded w-full" />
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-2">
                        <div className="h-4 bg-muted/30 rounded w-20" />
                        <div className="h-5 bg-muted/20 rounded w-24" />
                      </div>
                    </div>
                  </GlassCard>
                ))
              ) : (
                news.map((item, index) => (
                  <GlassCard
                    key={`${item.title}-${index}`}
                    className="p-6 group cursor-pointer"
                    hover
                  >
                    <a
                      href={item.link || "#"}
                      target={item.link ? "_blank" : undefined}
                      rel={item.link ? "noopener noreferrer" : undefined}
                      className="block"
                    >
                      <div
                        className="animate-fade-up flex flex-col sm:flex-row sm:items-center gap-4"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
                            {item.title}
                            {item.link && (
                              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.excerpt}
                          </p>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-2 text-xs text-muted-foreground whitespace-nowrap">
                          <span>{item.date}</span>
                          <span className="px-2 py-1 rounded bg-muted/50">
                            {item.source}
                          </span>
                        </div>
                      </div>
                    </a>
                  </GlassCard>
                ))
              )}

              {/* Auto-refresh notice */}
              <p className="text-center text-xs text-muted-foreground pt-4">
                News auto-refreshes every 10 minutes. Click refresh for latest updates.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default KnowledgePage;
