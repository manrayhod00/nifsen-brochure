import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blogContent";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const blog = blogPosts.find((b) => b.id === slug);

  if (!blog) {
    return (
      <section className="py-20">
        <div className="section-container">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Blog Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link to="/knowledge?tab=blogs" className="btn-primary">
              Back to Blogs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Blog link has been copied to clipboard.",
      });
    }
  };

  // Get related blogs (same tag, different post)
  const relatedBlogs = blogPosts
    .filter((b) => b.tag === blog.tag && b.id !== blog.id)
    .slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="py-12 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Knowledge Hub
            </button>

            {/* Tag */}
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/20 text-primary mb-6">
              {blog.tag}
            </span>

            {/* Title */}
            <h1 className="heading-xl mb-6 animate-fade-up">{blog.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {blog.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {blog.readTime}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {blog.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-8 lg:p-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <article className="prose prose-invert prose-lg max-w-none">
                {/* Render markdown-like content */}
                {blog.content.split("\n").map((line, index) => {
                  const trimmedLine = line.trim();
                  
                  if (!trimmedLine) return <br key={index} />;
                  
                  // Headers
                  if (trimmedLine.startsWith("# ")) {
                    return (
                      <h1 key={index} className="text-2xl lg:text-3xl font-bold mt-8 mb-4 text-foreground">
                        {trimmedLine.slice(2)}
                      </h1>
                    );
                  }
                  if (trimmedLine.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-xl lg:text-2xl font-semibold mt-8 mb-4 text-foreground">
                        {trimmedLine.slice(3)}
                      </h2>
                    );
                  }
                  if (trimmedLine.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-lg lg:text-xl font-semibold mt-6 mb-3 text-foreground">
                        {trimmedLine.slice(4)}
                      </h3>
                    );
                  }
                  
                  // List items
                  if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
                    return (
                      <li key={index} className="text-foreground/80 ml-6 list-disc">
                        {trimmedLine.slice(2)}
                      </li>
                    );
                  }
                  
                  // Numbered list
                  if (/^\d+\.\s/.test(trimmedLine)) {
                    return (
                      <li key={index} className="text-foreground/80 ml-6 list-decimal">
                        {trimmedLine.replace(/^\d+\.\s/, "")}
                      </li>
                    );
                  }
                  
                  // Italic disclaimer
                  if (trimmedLine.startsWith("*") && trimmedLine.endsWith("*")) {
                    return (
                      <p key={index} className="text-sm text-muted-foreground italic mt-8 pt-6 border-t border-border">
                        {trimmedLine.slice(1, -1)}
                      </p>
                    );
                  }
                  
                  // Bold text patterns
                  if (trimmedLine.startsWith("**") && trimmedLine.includes("**:")) {
                    const [bold, rest] = trimmedLine.split("**:").map(s => s.replace(/\*\*/g, ""));
                    return (
                      <p key={index} className="text-foreground/80 mb-2">
                        <strong className="text-foreground">{bold}:</strong> {rest}
                      </p>
                    );
                  }
                  
                  // Emoji indicators (mistake/reality patterns)
                  if (trimmedLine.startsWith("❌") || trimmedLine.startsWith("✅")) {
                    return (
                      <p key={index} className="text-foreground/80 mb-2">
                        {trimmedLine}
                      </p>
                    );
                  }
                  
                  // Table row (simplified)
                  if (trimmedLine.startsWith("|") && trimmedLine.endsWith("|")) {
                    if (trimmedLine.includes("---")) return null;
                    const cells = trimmedLine.split("|").filter(Boolean).map(c => c.trim());
                    return (
                      <div key={index} className="grid grid-cols-5 gap-2 text-sm py-2 border-b border-border/50">
                        {cells.map((cell, i) => (
                          <span key={i} className={i === 0 ? "font-medium text-foreground" : "text-foreground/70"}>
                            {cell}
                          </span>
                        ))}
                      </div>
                    );
                  }
                  
                  // Regular paragraph
                  return (
                    <p key={index} className="text-foreground/80 mb-4 leading-relaxed">
                      {trimmedLine}
                    </p>
                  );
                })}
              </article>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 border-t border-border/30">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-md mb-8">Related Articles</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link key={relatedBlog.id} to={`/blog/${relatedBlog.id}`}>
                    <GlassCard className="p-6 h-full group" hover>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
                        {relatedBlog.tag}
                      </span>
                      <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <GlassCard className="p-8">
              <h2 className="heading-md mb-4">Need Personalized Advice?</h2>
              <p className="text-muted-foreground mb-6">
                Our experts can help you create a customized investment plan based on your goals.
              </p>
              <Link to="/contact" className="btn-primary">
                Book a Consultation
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
