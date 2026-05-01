import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
}

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const useSEO = ({ title, description, canonicalPath }: SEOOptions) => {
  useEffect(() => {
    const fullTitle = title.includes("NIFSEN") ? title : `${title} | NIFSEN Investment Services Limited`;
    document.title = fullTitle;

    if (description) {
      setMeta("description", description);
      setMeta("og:title", fullTitle, "property");
      setMeta("og:description", description, "property");
      setMeta("twitter:title", fullTitle);
      setMeta("twitter:description", description);
    }

    if (canonicalPath) {
      const url = `https://nifseninvestmentservices.in${canonicalPath}`;
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = url;
      setMeta("og:url", url, "property");
    }
  }, [title, description, canonicalPath]);
};
