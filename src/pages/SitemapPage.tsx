// Sitemap Route Handler (not needed - sitemap.xml is served statically)
// This file is kept for future reference if dynamic sitemap generation is needed

import { useEffect } from "react";
import { generateXmlSitemap } from "../utils/generateSitemap";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SitemapPage = () => {
  useEffect(() => {
    // Set content type to XML
    const xmlContent = generateXmlSitemap();

    // Create a blob with XML content
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    // Trigger download or display
    // For browser display, we can use window.location
    if (navigator.userAgent.indexOf("Firefox") > -1) {
      // Firefox handles XML better
      window.location.href = url;
    }
  }, []);

  return null;
};

export default SitemapPage;

