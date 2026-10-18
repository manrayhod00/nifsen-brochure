import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Compass,
  Lightbulb,
  Receipt,
  Shield,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { CountUp, FloatingCoins, Marquee, WordReveal, useParallax } from "@/components/motion";
import { blogPosts, type BlogPost } from "@/data/blogContent";
import { useSEO } from "@/hooks/useSEO";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const TAG_ICONS: Record<string, LucideIcon> = {
  Basics: BookOpen,
  Strategy: Compass,
  Tax: Receipt,
  Tips: Lightbulb,
  Insurance: Shield,
  Goals: Target,
};

const iconFor = (tag: string): LucideIcon => TAG_ICONS[tag] ?? Sparkles;

const minutesOf = (readTime: string) => {
  const n = parseInt(readTime, 10);
  return Number.isFinite(n) ? n : 0;
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const HeroSection = ({ topics }: { topics: string[] }) => {
  const [ref, orbY] = useParallax(120);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const totalMinutes = blogPosts.reduce((sum, post) => sum + minutesOf(post.readTime), 0);
  const stats = [
    { value: blogPosts.length, label: "Articles" },
    { value: topics.length, label: "Topics" },
    ...(totalMinutes > 0 ? [{ value: totalMinutes, label: "Minutes of reading" }] : []),
  ];

  const previewPosts = blogPosts.slice(0, 3);
  const previewPlacement = [
    { className: "right-[4%] top-[18%]", float: "float-slow", delay: 1 },
    { className: "right-[16%] top-[46%]", float: "float-slower", delay: 1.2 },
    { className: "right-[6%] bottom-[14%]", float: "float-slow", delay: 1.4 },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
      {/* Breathing orbs drifting with the scroll */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true">
        <motion.div
          className="absolute -top-24 left-[10%] h-80 w-80 rounded-full bg-primary/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-[5%] h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.6, 0.35, 0.6] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="grid-floor opacity-60" aria-hidden="true" />
      <FloatingCoins className="opacity-60" />

      {/* Floating previews of the first few articles */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {previewPosts.map((post, index) => {
          const Icon = iconFor(post.tag);
          const place = previewPlacement[index];
          return (
            <motion.div
              key={post.id}
              className={`absolute ${place.className}`}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: place.delay, ease: EASE_OUT }}
            >
              <div className={`${place.float} glass-card border-spin flex items-center gap-3 rounded-2xl px-4 py-3 w-72`}>
                <div className="icon-orb shrink-0 w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{post.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {post.tag} · {post.readTime}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div className="section-container relative z-10" style={{ y: contentY }}>
        <div className="max-w-3xl xl:max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
          <motion.span
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Articles and guides
          </motion.span>

          <WordReveal as="h1" className="heading-xl !leading-[1.08] mb-6" immediate delay={0.25} stagger={0.1}>
            Knowledge <span className="text-shimmer-gold">Hub</span>
          </WordReveal>

          <motion.p
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT }}
          >
            In depth articles on investing, insurance, taxes and goal planning. Written for Indian investors, with
            the math and the tradeoffs spelled out.
          </motion.p>

          {/* Quick numbers */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card rounded-2xl px-5 py-3 flex items-baseline gap-2"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.12, ease: EASE_OUT }}
              >
                <CountUp to={stat.value} className="text-2xl font-bold text-shimmer-gold" />
                <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Moving band of article titles                                              */
/* -------------------------------------------------------------------------- */

const TitlesBand = () => (
  <section className="relative py-6 border-y border-primary/15 bg-background/40">
    <Marquee duration={60}>
      {blogPosts.map((post) => (
        <Link
          key={post.id}
          to={`/blog/${post.id}`}
          className="flex items-center gap-6 px-6 text-lg sm:text-xl font-semibold whitespace-nowrap text-foreground/75 hover:text-accent transition-colors"
          tabIndex={-1}
        >
          {post.title}
          <Sparkles className="w-4 h-4 text-accent animate-pulse" aria-hidden="true" />
        </Link>
      ))}
    </Marquee>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Article card                                                               */
/* -------------------------------------------------------------------------- */

const ArticleCard = ({ blog, index, featured }: { blog: BlogPost; index: number; featured: boolean }) => {
  const Icon = iconFor(blog.tag);

  return (
    <Link to={`/blog/${blog.id}`} className="block h-full group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      <GlassCard
        className={`h-full flex flex-col ${featured ? "border-spin p-8 lg:p-10" : "p-6 lg:p-7"}`}
        tilt
      >
        {/* Faint index number */}
        <div
          className={`absolute right-6 top-4 font-bold text-primary/10 select-none ${featured ? "text-8xl" : "text-6xl"}`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/25">
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            {blog.tag}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {blog.readTime}
          </span>
        </div>

        <h3
          className={`relative font-semibold mb-3 group-hover:text-accent transition-colors ${
            featured ? "text-2xl lg:text-3xl leading-tight" : "text-lg"
          }`}
        >
          {blog.title}
        </h3>
        <p className={`relative text-muted-foreground mb-6 flex-1 ${featured ? "text-base line-clamp-4" : "text-sm line-clamp-3"}`}>
          {blog.excerpt}
        </p>

        <div className="relative flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">{blog.date}</span>
          <span className="inline-flex items-center gap-2 text-sm text-accent font-medium">
            Read more
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-1 group-hover:shadow-[0_0_18px_hsla(45,90%,60%,0.55)]">
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </span>
        </div>

        {/* Gold edge that draws itself on hover */}
        <span
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
          aria-hidden="true"
        />
      </GlassCard>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/* Topic filter and grid                                                      */
/* -------------------------------------------------------------------------- */

const ALL = "All";

const ArticlesSection = ({ topics }: { topics: string[] }) => {
  const [active, setActive] = useState(ALL);

  const visible = active === ALL ? blogPosts : blogPosts.filter((post) => post.tag === active);
  const filters = [ALL, ...topics];

  return (
    <section className="py-16 pb-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <span className="eyebrow mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Browse by topic
              </span>
              <WordReveal as="h2" className="heading-lg">
                Read, learn, <span className="text-shimmer-gold">invest better</span>
              </WordReveal>
            </div>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Showing {visible.length} of {blogPosts.length} articles
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter articles by topic">
            {filters.map((topic) => {
              const isActive = topic === active;
              const count = topic === ALL ? blogPosts.length : blogPosts.filter((p) => p.tag === topic).length;
              const Icon = topic === ALL ? Sparkles : iconFor(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setActive(topic)}
                  aria-pressed={isActive}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "border-accent/50 text-accent-foreground"
                      : "border-primary/25 text-muted-foreground hover:text-foreground hover:border-accent/40 bg-background/30"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="knowledge-topic-pill"
                      className="absolute inset-0 rounded-full bg-accent shadow-[0_0_20px_hsla(45,90%,60%,0.45)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  <Icon className="relative w-4 h-4" aria-hidden="true" />
                  <span className="relative">{topic}</span>
                  <span
                    className={`relative text-[10px] font-semibold rounded-full px-1.5 py-0.5 ${
                      isActive ? "bg-background/20" : "bg-primary/20"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((blog, index) => {
              const featured = active === ALL && index === 0;
              return (
                <motion.div
                  key={blog.id}
                  layout
                  className={`h-full ${featured ? "sm:col-span-2" : ""}`}
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: EASE_OUT }}
                >
                  <ArticleCard blog={blog} index={blogPosts.indexOf(blog)} featured={featured} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const KnowledgePage = () => {
  useSEO({
    title: "Knowledge Hub | Investing and Financial Planning Articles",
    description:
      "In depth articles on SIPs, asset allocation, tax planning, insurance and goal based investing, written by the NIFSEN research team.",
    canonicalPath: "/knowledge",
  });

  const topics = useMemo(() => Array.from(new Set(blogPosts.map((post) => post.tag))), []);

  return (
    <>
      <HeroSection topics={topics} />
      <TitlesBand />
      <ArticlesSection topics={topics} />
    </>
  );
};

export default KnowledgePage;
