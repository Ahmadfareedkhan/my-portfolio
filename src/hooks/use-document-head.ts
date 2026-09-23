import { useEffect } from "react";

export const SITE_URL = "https://ahmadfareedkhan.tech";

type Head = {
  /** Page title. The site name is appended automatically. */
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/work/jadoc-v3". */
  path: string;
  /** Absolute or site-relative image for link previews. */
  image?: string;
  /** Structured data for this page, serialised into a JSON-LD script tag. */
  jsonLd?: Record<string, unknown>;
};

const SITE_NAME = "Ahmad Fareed Khan";
const JSON_LD_ID = "page-jsonld";

/** Create or update a <meta>/<link> in <head>, matched by an attribute pair. */
function upsert(tag: "meta" | "link", match: [string, string], set: [string, string]) {
  const [matchKey, matchValue] = match;
  const selector = `${tag}[${matchKey}="${matchValue}"]`;
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(matchKey, matchValue);
    document.head.appendChild(el);
  }
  el.setAttribute(set[0], set[1]);
}

/**
 * Sets the per-page title, description, link-preview tags and structured data.
 *
 * A client-rendered SPA otherwise serves one <title> and one description for
 * every route, which costs both search ranking and link previews. The build
 * also prerenders each route to static HTML, so what this sets ends up in the
 * served markup rather than only after hydration.
 */
export function useDocumentHead({ title, description, path, image, jsonLd }: Head) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;
    const imageUrl = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`
      : `${SITE_URL}/og-image.jpg`;

    document.title = fullTitle;

    upsert("meta", ["name", "description"], ["content", description]);
    upsert("link", ["rel", "canonical"], ["href", url]);

    upsert("meta", ["property", "og:title"], ["content", fullTitle]);
    upsert("meta", ["property", "og:description"], ["content", description]);
    upsert("meta", ["property", "og:url"], ["content", url]);
    upsert("meta", ["property", "og:image"], ["content", imageUrl]);

    upsert("meta", ["name", "twitter:title"], ["content", fullTitle]);
    upsert("meta", ["name", "twitter:description"], ["content", description]);
    upsert("meta", ["name", "twitter:image"], ["content", imageUrl]);

    // Replace rather than append, or navigating between case studies would
    // leave several conflicting JSON-LD blocks in the document.
    document.getElementById(JSON_LD_ID)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = JSON_LD_ID;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, jsonLd]);
}
