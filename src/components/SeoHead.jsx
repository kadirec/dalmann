import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSiteOrigin } from "../config/site";
import { BRAND_SAME_AS } from "../data/brandSocial";
import { getSeoForPath } from "../data/seoRoutes";

/**
 * @param {"name" | "property"} attr
 * @param {string} key örn. description, og:title, twitter:card
 */
function upsertMeta(attr, key, content) {
  const sel = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute("data-seo-managed", "true");
    document.head.appendChild(el);
  } else {
    el.setAttribute("data-seo-managed", "true");
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    el.setAttribute("data-seo-managed", "true");
    document.head.appendChild(el);
  } else {
    el.setAttribute("data-seo-managed", "true");
  }
  el.setAttribute("href", href);
}

function absoluteUrl(origin, pathOrUrl) {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${origin}${path}`;
}

/**
 * @param {string} origin
 * @param {string} canonical
 * @param {{ title: string; description: string }} seo
 */
function buildJsonLd(origin, canonical, seo) {
  const org = {
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: "Dalmann Jewellery",
    url: origin,
    logo: absoluteUrl(origin, "/logo.svg"),
    description:
      "Formun, ışığın ve anlamın kusursuz bir dengede buluştuğu zamansız mücevher tasarımı ve üretimi.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fatih",
      addressRegion: "İstanbul",
      streetAddress: "Çemberlitaş",
      addressCountry: "TR",
    },
  };
  if (BRAND_SAME_AS.length > 0) {
    org.sameAs = [...BRAND_SAME_AS];
  }

  const webpage = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": `${origin}/#website` },
    inLanguage: "tr-TR",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      org,
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: "Dalmann Jewellery",
        publisher: { "@id": `${origin}/#organization` },
        inLanguage: "tr-TR",
      },
      webpage,
    ],
  };
}

export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(pathname);
    const origin = getSiteOrigin();
    const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";
    const canonical = `${origin}${canonicalPath === "/" ? "/" : canonicalPath}`;
    const ogImage = absoluteUrl(origin, seo.ogImage ?? "/logo.svg");

    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", "index, follow");

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Dalmann Jewellery");
    upsertMeta("property", "og:locale", "tr_TR");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:image", ogImage);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", ogImage);

    upsertCanonical(canonical);

    const ld = buildJsonLd(origin, canonical, seo);
    let script = document.getElementById("seo-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "seo-jsonld";
      script.setAttribute("data-seo-managed", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }, [pathname]);

  return null;
}
