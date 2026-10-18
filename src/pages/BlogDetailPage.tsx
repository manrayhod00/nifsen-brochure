import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Lightbulb,
  ListTree,
  Receipt,
  Share2,
  Shield,
  Sparkles,
  Target,
  User,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blogContent";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { FloatingCoins, Magnetic, Stagger, WordReveal, useParallax } from "@/components/motion";
import { useToast } from "@/hooks/use-toast";
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

/* -------------------------------------------------------------------------- */
/* Lightweight markdown parsing into blocks                                   */
/* -------------------------------------------------------------------------- */

type HeadingBlock = { kind: "h1" | "h2" | "h3"; text: string; id: string };

type Block =
  | HeadingBlock
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: { num: string; text: string }[] }
  | { kind: "table"; rows: string[][] }
  | { kind: "check"; text: string; good: boolean }
  | { kind: "disclaimer"; text: string }
  | { kind: "note"; text: string };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 60);

const parseContent = (content: string, title: string): Block[] => {
  const blocks: Block[] = [];
  const usedIds = new Set<string>();
  const makeId = (text: string) => {
    const base = `section_${slugify(text) || "part"}`;
    let id = base;
    let n = 2;
    while (usedIds.has(id)) id = `${base}_${n++}`;
    usedIds.add(id);
    return id;
  };

  for (const raw of content.split("\n")) {
    const line = raw.trim();
    const last = blocks[blocks.length - 1];

    if (!line) {
      // A blank line closes any open list or table
      blocks.push({ kind: "p", text: "" });
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4);
      blocks.push({ kind: "h3", text, id: makeId(text) });
    } else if (line.startsWith("## ")) {
      const text = line.slice(3);
      blocks.push({ kind: "h2", text, id: makeId(text) });
    } else if (line.startsWith("# ")) {
      const text = line.slice(2);
      // The page hero already shows the title, so skip an identical top heading
      if (text.trim() !== title.trim()) blocks.push({ kind: "h1", text, id: makeId(text) });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const text = line.slice(2);
      if (last?.kind === "ul") last.items.push(text);
      else blocks.push({ kind: "ul", items: [text] });
    } else if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)?.[1] ?? "";
      const text = line.replace(/^\d+\.\s/, "");
      if (last?.kind === "ol") last.items.push({ num, text });
      else blocks.push({ kind: "ol", items: [{ num, text }] });
    } else if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      const isDivider = cells.every((c) => /^:?-{2,}:?$/.test(c));
      if (isDivider) continue;
      if (last?.kind === "table") last.rows.push(cells);
      else blocks.push({ kind: "table", rows: [cells] });
    } else if (line.startsWith("❌") || line.startsWith("✅")) {
      blocks.push({ kind: "check", good: line.startsWith("✅"), text: line.slice(1).trim() });
    } else if (line.startsWith("*") && !line.startsWith("**") && line.endsWith("*") && line.length > 2) {
      blocks.push({ kind: "disclaimer", text: line.slice(1, -1) });
    } else if (line.startsWith("*") && !line.startsWith("**")) {
      blocks.push({ kind: "note", text: line.slice(1) });
    } else {
      blocks.push({ kind: "p", text: line });
    }
  }

  // Drop the blank markers now that grouping is done
  return blocks.filter((b) => !(b.kind === "p" && b.text === ""));
};

/** Renders **bold** spans inside a line of text */
const renderInline = (text: string): ReactNode =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );

/** Small reveal used for body copy: rises once and stays */
const Rise = ({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
    transition={{ duration: 0.7, delay, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

const BlockView = ({ block }: { block: Block }) => {
  switch (block.kind) {
    case "h1":
    case "h2":
      return (
        <div id={block.id} className="scroll-mt-28 mt-14 first:mt-0 mb-5">
          <WordReveal as="h2" className="text-2xl lg:text-3xl font-bold text-foreground leading-tight" stagger={0.04}>
            {block.text}
          </WordReveal>
          <motion.div
            className="mt-3 h-px w-20 origin-left bg-gradient-to-r from-accent via-accent/60 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25, ease: EASE_OUT }}
            aria-hidden="true"
          />
        </div>
      );
    case "h3":
      return (
        <ScrollReveal direction="right" className="mt-10 mb-3">
          <h3 id={block.id} className="scroll-mt-28 flex items-center gap-3 text-lg lg:text-xl font-semibold text-foreground">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_hsla(45,90%,60%,0.7)]" aria-hidden="true" />
            {block.text}
          </h3>
        </ScrollReveal>
      );
    case "ul":
      return (
        <ul className="my-5 space-y-3">
          {block.items.map((item, i) => (
            <motion.li
              key={i}
              className="relative pl-7 text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -30px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_OUT }}
            >
              <span
                className="absolute left-1 top-[0.6em] h-2 w-2 rotate-45 rounded-[2px] bg-gradient-to-br from-accent to-primary"
                aria-hidden="true"
              />
              {renderInline(item)}
            </motion.li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-6 space-y-4">
          {block.items.map((item, i) => (
            <motion.li
              key={i}
              className="flex gap-4 text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -30px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
            >
              <span
                className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full glass-card border-spin text-sm font-bold text-shimmer-gold"
                aria-hidden="true"
              >
                {item.num}
              </span>
              <span className="pt-1">{renderInline(item.text)}</span>
            </motion.li>
          ))}
        </ol>
      );
    case "table": {
      const [head, ...body] = block.rows;
      return (
        <Rise className="my-8 overflow-x-auto rounded-2xl border border-primary/20 bg-background/30">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="bg-primary/15">
                {head.map((cell, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`px-4 py-3 text-left font-semibold ${i === 0 ? "text-foreground" : "text-accent"}`}
                  >
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={r} className="border-t border-border/40 transition-colors hover:bg-primary/10">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 text-left font-medium text-foreground">
                        {renderInline(cell)}
                      </th>
                    ) : (
                      <td key={i} className="px-4 py-3 text-foreground/75">
                        {renderInline(cell)}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Rise>
      );
    }
    case "check": {
      const Icon = block.good ? CheckCircle2 : XCircle;
      return (
        <Rise
          className={`my-2 flex items-start gap-3 rounded-xl border px-4 py-3 ${
            block.good ? "border-accent/30 bg-accent/5" : "border-primary/30 bg-primary/10"
          }`}
        >
          <Icon
            className={`w-5 h-5 mt-0.5 shrink-0 ${block.good ? "text-accent" : "text-muted-foreground"}`}
            aria-label={block.good ? "Reality" : "Myth"}
          />
          <span className="text-foreground/85">{renderInline(block.text)}</span>
        </Rise>
      );
    }
    case "disclaimer":
      return (
        <Rise className="mt-12 rounded-2xl border border-border/50 bg-background/40 px-5 py-4">
          <p className="text-sm text-muted-foreground italic leading-relaxed">{renderInline(block.text)}</p>
        </Rise>
      );
    case "note":
      return <p className="-mt-4 mb-6 text-xs text-muted-foreground italic">* {renderInline(block.text)}</p>;
    case "p":
    default:
      return (
        <Rise>
          <p className="text-foreground/80 mb-5 leading-[1.85] text-[1.05rem]">{renderInline(block.text)}</p>
        </Rise>
      );
  }
};

/* -------------------------------------------------------------------------- */
/* Article view                                                               */
/* -------------------------------------------------------------------------- */

const ArticleView = ({ blog }: { blog: BlogPost }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const TagIcon = iconFor(blog.tag);

  const blocks = useMemo(() => parseContent(blog.content, blog.title), [blog.content, blog.title]);
  const toc = useMemo(
    () => blocks.filter((b): b is HeadingBlock => b.kind === "h2" || b.kind === "h1"),
    [blocks]
  );

  const [heroRef, orbY] = useParallax(120);
  const articleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start 35%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const percent = useTransform(progress, (v) => `${Math.round(Math.min(1, Math.max(0, v)) * 100)}%`);

  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);

  // New article: start at the top
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [blog.id]);

  // Track which section is being read
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, text: blog.excerpt, url });
      } catch {
        // User cancelled or sharing failed
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Blog link has been copied to clipboard.",
      });
    }
  };

  // Related blogs: same tag, different post
  const relatedBlogs = blogPosts.filter((b) => b.tag === blog.tag && b.id !== blog.id).slice(0, 2);

  const meta = [
    { icon: User, text: blog.author },
    { icon: Calendar, text: blog.date },
    { icon: Clock, text: blog.readTime },
  ];

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true">
          <motion.div
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[min(640px,90vw)] rounded-full bg-primary/30 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-[8%] h-56 w-56 rounded-full bg-accent/20 blur-3xl"
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.6, 0.3, 0.6] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="grid-floor opacity-50" aria-hidden="true" />
        <FloatingCoins className="opacity-50" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Back */}
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/30 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors mb-10"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Knowledge Hub
            </motion.button>

            {/* Tag */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            >
              <span className="eyebrow">
                <TagIcon className="w-3.5 h-3.5" aria-hidden="true" />
                {blog.tag}
              </span>
            </motion.div>

            {/* Title */}
            <WordReveal as="h1" className="heading-xl !leading-[1.1] mb-8" immediate delay={0.2} stagger={0.05}>
              {blog.title}
            </WordReveal>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-8">
              {meta.map((item, index) => (
                <motion.span
                  key={item.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/30 px-3 py-1.5"
                  initial={{ opacity: 0, y: 14, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1, ease: EASE_OUT }}
                >
                  <item.icon className="w-4 h-4 text-accent" aria-hidden="true" />
                  {item.text}
                </motion.span>
              ))}
              <motion.button
                type="button"
                onClick={handleShare}
                className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-3 py-1.5 text-accent hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1, ease: EASE_OUT }}
                whileTap={{ scale: 0.94 }}
              >
                <Share2 className="w-4 h-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
                Share
              </motion.button>
            </div>

            {/* Excerpt */}
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed border-l-2 border-accent/60 pl-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: EASE_OUT }}
            >
              {blog.excerpt}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content with a reading rail on large screens */}
      <section className="pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl lg:max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
            <motion.div
              ref={articleRef}
              className="min-w-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT }}
            >
              <GlassCard className="p-6 sm:p-8 lg:p-12" hover={false}>
                <article className="relative max-w-none">
                  {blocks.map((block, index) => (
                    <BlockView key={index} block={block} />
                  ))}
                </article>
              </GlassCard>
            </motion.div>

            {/* Reading rail */}
            <aside className="hidden lg:block" aria-label="Article navigation">
              <motion.div
                className="sticky top-28"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
              >
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="eyebrow">
                      <ListTree className="w-3.5 h-3.5" aria-hidden="true" />
                      In this article
                    </span>
                    <motion.span className="text-sm font-bold text-shimmer-gold tabular-nums" aria-hidden="true">
                      {percent}
                    </motion.span>
                  </div>

                  <div className="flex gap-4">
                    {/* Local progress track */}
                    <div className="relative w-0.5 shrink-0 rounded-full bg-primary/15" aria-hidden="true">
                      <motion.div
                        className="absolute inset-0 origin-top rounded-full"
                        style={{
                          scaleY: progress,
                          background: "linear-gradient(180deg, hsl(262 83% 58%), hsl(45 90% 62%))",
                          boxShadow: "0 0 12px hsla(45, 90%, 60%, 0.7)",
                        }}
                      />
                    </div>

                    {toc.length > 0 ? (
                      <ol className="space-y-1 text-sm min-w-0">
                        {toc.map((item) => {
                          const isActive = item.id === activeId;
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                onClick={() => scrollToSection(item.id)}
                                aria-current={isActive ? "true" : undefined}
                                className={`relative w-full text-left rounded-lg px-2 py-1.5 leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                                  isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {isActive && (
                                  <motion.span
                                    layoutId="blog-toc-active"
                                    className="absolute inset-0 rounded-lg bg-primary/15"
                                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    aria-hidden="true"
                                  />
                                )}
                                <span className="relative">{item.text}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p className="text-sm text-muted-foreground py-1">{blog.readTime}</p>
                    )}
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleShare}
                  className="mt-4 w-full glass-card rounded-2xl px-5 py-3 flex items-center justify-center gap-2 text-sm text-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  Share
                </motion.button>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 border-t border-border/30">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <span className="eyebrow mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Keep reading
                </span>
              </ScrollReveal>
              <WordReveal as="h2" className="heading-md mb-8">
                Related <span className="text-shimmer-gold">Articles</span>
              </WordReveal>
              <Stagger className="grid sm:grid-cols-2 gap-6" stagger={0.12}>
                {relatedBlogs.map((relatedBlog) => {
                  const Icon = iconFor(relatedBlog.tag);
                  return (
                    <Link
                      key={relatedBlog.id}
                      to={`/blog/${relatedBlog.id}`}
                      className="block h-full group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <GlassCard className="p-6 h-full flex flex-col" tilt>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/25">
                            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                            {relatedBlog.tag}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {relatedBlog.readTime}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-5 flex-1">{relatedBlog.excerpt}</p>
                        <span className="inline-flex items-center gap-2 text-sm text-accent font-medium">
                          Read more
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-1">
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </span>
                        </span>
                        <span
                          className="pointer-events-none absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
                          aria-hidden="true"
                        />
                      </GlassCard>
                    </Link>
                  );
                })}
              </Stagger>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal scale>
              <div className="glass-card border-spin relative overflow-hidden rounded-[2rem] px-6 py-14 sm:p-16 text-center">
                <motion.div
                  className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-primary/40 blur-3xl"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute -bottom-20 -right-16 h-60 w-60 rounded-full bg-accent/30 blur-3xl"
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.7, 0.4, 0.7] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <FloatingCoins className="opacity-50" />

                <div className="relative">
                  <WordReveal as="h2" className="heading-md mb-4">
                    Need <span className="text-shimmer-gold">Personalized</span> Advice?
                  </WordReveal>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Our experts can help you create a customized investment plan based on your goals.
                  </p>
                  <Magnetic strength={0.35}>
                    <Link to="/contact" className="btn-primary group animate-pulse-glow">
                      Book a Consultation
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogPosts.find((b) => b.id === slug);

  useSEO({
    title: blog ? blog.title : "Article not found",
    description: blog ? blog.excerpt : "Article not found.",
    canonicalPath: `/blog/${slug ?? ""}`,
  });

  if (!blog) {
    return (
      <section className="relative overflow-hidden py-24">
        <div className="grid-floor opacity-50" aria-hidden="true" />
        <div className="section-container relative">
          <div className="text-center max-w-xl mx-auto">
            <motion.div
              className="icon-orb w-16 h-16 mx-auto mb-8 rounded-2xl bg-primary/25 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <BookOpen className="w-8 h-8 text-accent" aria-hidden="true" />
            </motion.div>
            <WordReveal as="h1" className="heading-lg mb-4" immediate delay={0.15}>
              Blog <span className="text-shimmer-gold">Not Found</span>
            </WordReveal>
            <motion.p
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
            >
              The blog post you're looking for doesn't exist.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT }}
            >
              <Magnetic>
                <Link to="/knowledge?tab=blogs" className="btn-primary group">
                  Back to Blogs
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return <ArticleView key={blog.id} blog={blog} />;
};

export default BlogDetailPage;
