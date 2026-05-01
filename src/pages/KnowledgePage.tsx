import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { blogPosts } from "@/data/blogContent";
import { useSEO } from "@/hooks/useSEO";

const KnowledgePage = () => {
  useSEO({
    title: "Knowledge Hub — Investing & Financial Planning Articles",
    description:
      "Long-form articles on SIPs, asset allocation, tax planning, insurance, and goal-based investing — written by the NIFSEN research team.",
    canonicalPath: "/knowledge",
  });

  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="heading-xl mb-6">Knowledge Hub</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Long-form articles on investing, insurance, taxes, and goal planning. Written for
              Indian investors, with the math and trade-offs spelled out.
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-8 pb-20">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 gap-6">
            {blogPosts.map((blog, index) => (
              <Link key={blog.id} to={`/blog/${blog.id}`}>
                <GlassCard className="p-6 group cursor-pointer h-full" hover>
                  <div className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
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
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{blog.date}</span>
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
        </div>
      </section>
    </>
  );
};

export default KnowledgePage;
