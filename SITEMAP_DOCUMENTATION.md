# PDFConvert.tech Sitemap Documentation

## What is a Sitemap?
A sitemap is an XML file that lists all the pages on your website. It helps search engines (Google, Bing, etc.) discover, crawl, and index your content more efficiently.

## Your Sitemap Details

### Sitemap URL
```
https://pdfconvert.tech/sitemap.xml
```

### How to Access Your Sitemap

1. **Direct URL Access:**
   - Open your browser and go to: `https://pdfconvert.tech/sitemap.xml`
   - You'll see the XML structure with all URLs

2. **In Source Code:**
   - Location: `/public/sitemap.xml`
   - Static file that gets served automatically with your React app

3. **In Google Search Console:**
   - Go to: https://search.google.com/search-console
   - Select your property: pdfconvert.tech
   - Click "Sitemaps" in the left menu
   - Submit: `https://pdfconvert.tech/sitemap.xml`

4. **In Bing Webmaster Tools:**
   - Go to: https://www.bing.com/webmasters/
   - Select your site
   - Click "Sitemaps"
   - Submit: `https://pdfconvert.tech/sitemap.xml`

---

## Sitemap Statistics

### Total URLs: 31

#### Homepage & Main Pages (2 URLs)
- `/` (Homepage) - Priority: 1.0
- `/blog` - Priority: 0.9
- `/faq` - Priority: 0.8
- `/contact` - Priority: 0.7

#### PDF Merging & Splitting (2 URLs)
- `/merge` - Merge PDF
- `/split` - Split PDF

#### Compression & Optimization (1 URL)
- `/compress` - Compress PDF

#### Image Conversion (3 URLs)
- `/image-to-pdf` - Image to PDF
- `/pdf-to-images` - PDF to Images
- `/extract-images` - Extract Images

#### Text Extraction & OCR (2 URLs)
- `/pdf-to-text` - PDF to Text
- `/pdf-ocr` - PDF OCR (Scan to Text)

#### Word Document Conversion (2 URLs)
- `/docx-pdf` - DOCX to PDF
- `/pdf-docx` - PDF to Word

#### Excel Conversion (3 URLs)
- `/xlsx-pdf` - XLSX to PDF
- `/pdf-to-excel` - PDF to Excel
- `/pdf-spreadsheet` - PDF Spreadsheet

#### PowerPoint Conversion (2 URLs)
- `/pptx-pdf` - PPTX to PDF
- `/pdf-to-pptx` - PDF to PowerPoint

#### HTML Conversion (2 URLs)
- `/html-to-pdf` - HTML to PDF
- `/pdf/to-html` - PDF to HTML

#### PDF Security & Manipulation (4 URLs)
- `/protect-pdf` - PDF Password Protection
- `/pdf-remove-pages` - Remove PDF Pages
- `/pdf-reorder-pages` - Reorder PDF Pages
- `/pdf-watermark` - Add Watermark

#### Policy Pages (3 URLs)
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/cookies` - Cookie Policy

#### Authentication Pages (2 URLs)
- `/login` - Login
- `/signup` - Sign Up

---

## Robots.txt

### Robots.txt URL
```
https://pdfconvert.tech/robots.txt
```

### Location
- File: `/public/robots.txt`
- Also served automatically with your React app

### What It Does
- Controls which pages search engines can crawl
- Specifies the sitemap location
- Manages crawl rate
- Blocks bad bots

### Key Rules
```
Allow: /                          # Allow all public pages
Disallow: /dashboard             # Hide user dashboard
Disallow: /account               # Hide account pages
Disallow: /verify-*              # Hide auth pages
Sitemap: https://pdfconvert.tech/sitemap.xml
```

---

## XML Sitemap Structure

Each URL entry in your sitemap includes:

```xml
<url>
  <loc>https://pdfconvert.tech/merge</loc>
  <lastmod>2025-12-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

### Explanation
- **loc**: The full URL of the page
- **lastmod**: Last modification date (helps Google know when to recrawl)
- **changefreq**: How often the page changes (weekly, monthly, yearly, etc.)
- **priority**: Importance relative to other pages (0.0 - 1.0, where 1.0 is highest)

### Priority Levels Used
- **1.0**: Homepage (most important)
- **0.9**: Main tool pages & blog (very important for conversion)
- **0.8**: Secondary tools & FAQ (important)
- **0.7**: Contact page
- **0.6**: Policy pages
- **0.5**: Authentication pages (hidden from most visitors)

---

## How to Submit to Search Engines

### Google Search Console

1. Go to: https://search.google.com/search-console
2. Sign in with your Google account
3. Select your property: `pdfconvert.tech`
4. Left sidebar → "Sitemaps"
5. Click "Add/test sitemap"
6. Enter: `https://pdfconvert.tech/sitemap.xml`
7. Click "Submit"

### Bing Webmaster Tools

1. Go to: https://www.bing.com/webmasters/
2. Sign in with your Microsoft account
3. Select your site: `pdfconvert.tech`
4. Left sidebar → "Sitemaps"
5. Click "Submit sitemap"
6. Enter: `https://pdfconvert.tech/sitemap.xml`

---

## SEO Benefits

Your sitemap provides these SEO advantages:

✅ **Faster Indexing**: Search engines discover all pages quickly
✅ **Better Coverage**: Ensures no pages are missed
✅ **Fresh Content**: `lastmod` dates show when pages are updated
✅ **Priority Hints**: Helps Google understand page importance
✅ **Mobile Friendly**: Includes all responsive pages
✅ **Global Reach**: Helps international search engines

---

## Dynamic Sitemap Updates

Your sitemap is **static** (manually created), but you have a utility file to generate it dynamically if needed:

**File**: `src/utils/generateSitemap.ts`

This includes functions to:
- Generate XML sitemap
- Generate robots.txt
- Get all routes
- Format for JSON (API reference)

**Usage in future:**
```typescript
import { generateXmlSitemap } from '@/utils/generateSitemap';

const xmlContent = generateXmlSitemap();
// Use this content to serve dynamic sitemap
```

---

## Maintenance

### When to Update

1. **New pages added**: Add URL entry to `sitemap.xml`
2. **Page deleted**: Remove URL from `sitemap.xml`
3. **Priority changes**: Update `<priority>` values
4. **Content updates**: Update `<lastmod>` date
5. **Routing changes**: Update `<loc>` URLs

### Current Update Schedule
- **Last Updated**: December 15, 2025
- **Recommended**: Update monthly or when major changes occur
- **Critical**: Update when adding/removing tools

---

## Testing Your Sitemap

### Online Sitemap Validators

1. **Google Structured Data Testing Tool**
   - URL: https://search.google.com/structured-data/testing-tool
   - Upload or enter your sitemap XML

2. **XML Sitemap Validator**
   - URL: https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Validates sitemap structure

3. **Screaming Frog SEO Spider**
   - URL: https://www.screamingfrog.co.uk/seo-spider/
   - Download and scan your sitemap

---

## Mobile & Accessibility

✅ **Mobile Friendly**: All tool pages are responsive
✅ **Accessible**: All pages follow WCAG guidelines
✅ **Fast Loading**: Pages optimized for performance
✅ **No JavaScript Required**: Sitemap is XML (no JS needed)

---

## Monitoring

### Monitor Sitemap Performance

1. **Google Search Console**
   - Coverage report
   - Sitemap processing
   - Indexing issues

2. **Bing Webmaster Tools**
   - Crawl stats
   - Index health
   - Traffic insights

3. **Analytics**
   - Organic traffic growth
   - Keyword rankings
   - Search click-through rate

---

## Advanced Features

### Sitemap Generator Utility

The `src/utils/generateSitemap.ts` file provides:

```typescript
// Get all routes
const routes = getAllRoutes();

// Generate XML sitemap
const xml = generateXmlSitemap();

// Generate robots.txt
const robots = generateRobotsTxt();

// Get JSON sitemap
const json = generateJsonSitemap();
```

---

## Summary

- **Sitemap URL**: `https://pdfconvert.tech/sitemap.xml`
- **Robots.txt URL**: `https://pdfconvert.tech/robots.txt`
- **Total URLs**: 31 pages
- **Update Frequency**: Monthly or as needed
- **Search Console**: Submit immediately for faster indexing

Your sitemap is now ready to improve your site's search visibility! 🚀

---

**Created**: December 15, 2025
**Last Updated**: December 15, 2025
**Version**: 1.0

