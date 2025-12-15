// Sitemap Generator for PDFConvert.tech
// This file generates the XML sitemap with all routes

import { tools } from "../config/pdfToolsConfig";

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const DOMAIN = "https://pdfconvert.tech";
const CURRENT_DATE = "2025-12-15";

// Define all static pages
const staticPages: SitemapUrl[] = [
  {
    loc: `${DOMAIN}/`,
    lastmod: CURRENT_DATE,
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    loc: `${DOMAIN}/blog`,
    lastmod: CURRENT_DATE,
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    loc: `${DOMAIN}/faq`,
    lastmod: CURRENT_DATE,
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    loc: `${DOMAIN}/contact`,
    lastmod: CURRENT_DATE,
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    loc: `${DOMAIN}/terms`,
    lastmod: CURRENT_DATE,
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    loc: `${DOMAIN}/privacy`,
    lastmod: CURRENT_DATE,
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    loc: `${DOMAIN}/cookies`,
    lastmod: CURRENT_DATE,
    changefreq: "yearly",
    priority: 0.5,
  },
];

// Generate tool pages dynamically
const toolPages: SitemapUrl[] = tools.map((tool) => ({
  loc: `${DOMAIN}${tool.route}`,
  lastmod: CURRENT_DATE,
  changefreq: "monthly",
  priority: 0.9,
}));

// Authentication pages (commented - not included in public sitemap)
// const authPages: SitemapUrl[] = [
  // {
  //   loc: `${DOMAIN}/login`,
  //   lastmod: CURRENT_DATE,
  //   changefreq: "yearly",
  //   priority: 0.5,
  // },
  // {
  //   loc: `${DOMAIN}/signup`,
  //   lastmod: CURRENT_DATE,
  //   changefreq: "yearly",
  //   priority: 0.5,
  // },
// ];

// Combine all URLs
export const getAllSitemapUrls = (): SitemapUrl[] => {
  return [...staticPages, ...toolPages];
};

// Generate XML sitemap
export const generateXmlSitemap = (): string => {
  const urls = getAllSitemapUrls();

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const sitemapNamespace = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';

  const urlElements = urls
    .map((url) => {
      return `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority}</priority>` : ""}
  </url>`;
    })
    .join("");

  return `${xmlHeader}
<urlset ${sitemapNamespace}>${urlElements}
</urlset>`;
};

// Escape special XML characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Generate robots.txt content
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /account
Disallow: /verify-email
Disallow: /verify-2fa
Disallow: /reset-password
Disallow: /forgot-password

# Sitemaps
Sitemap: https://pdfconvert.tech/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Request rate
Request-rate: 30/1m

# Comment: Allow all search engines to crawl public pages
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /
`;
};

// Generate JSON sitemap index (for reference)
export const generateJsonSitemap = () => {
  const urls = getAllSitemapUrls();
  return {
    siteUrl: DOMAIN,
    generatedDate: CURRENT_DATE,
    totalUrls: urls.length,
    urls: urls,
  };
};

// Get all available routes
export const getAllRoutes = () => {
  return {
    staticPages: staticPages.map((p) => p.loc.replace(DOMAIN, "")),
    toolPages: toolPages.map((p) => p.loc.replace(DOMAIN, "")),
    totalRoutes: staticPages.length + toolPages.length,
  };
};

