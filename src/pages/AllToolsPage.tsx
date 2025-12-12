import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { tools } from "../config/pdfToolsConfig";
import type { ToolId } from "../config/pdfToolsConfig";
import { Helmet } from "react-helmet";
import * as Icons from "lucide-react";

// Tool details with comprehensive explanations
const toolDetails: Record<ToolId, {
  overview: string;
  frontendProcess: string;
  backendProcess: string;
  useCases: string[];
  features: string[];
}> = {
  merge: {
    overview: "Combine multiple PDF files into a single document seamlessly. Perfect for organizing scattered documents into one comprehensive file.",
    frontendProcess: "Upload multiple PDF files through the browser interface. Files are displayed in a queue showing file names and sizes. Click 'Start Processing' to begin merging. The frontend compresses and validates each file before sending.",
    backendProcess: "The backend receives uploaded PDFs, validates their integrity, and merges them using PyPDF2 or similar libraries. Pages are combined sequentially, maintaining original formatting and metadata. The merged file is optimized and made available for download.",
    useCases: ["Combine report sections", "Merge multiple document drafts", "Consolidate contracts", "Create complete presentations"],
    features: ["Preserve formatting", "Maintain bookmarks", "Fast processing", "No file size limits"]
  },
  split: {
    overview: "Extract specific pages from a PDF or split it into individual pages. Ideal for separating multi-page documents.",
    frontendProcess: "Upload a PDF file and specify the page range or individual pages to extract (e.g., 1-5, 10, 15-20). The frontend validates input and sends the PDF along with page specifications to the backend.",
    backendProcess: "The backend uses PyPDF2 to read the PDF and extract specified pages. Each page is processed individually, maintaining quality and formatting. Pages are saved as separate PDFs or bundled as a ZIP file.",
    useCases: ["Extract specific chapters", "Separate different documents", "Remove unwanted pages", "Create single-page files"],
    features: ["Page range selection", "Batch processing", "Quality preservation", "Multiple output formats"]
  },
  compress: {
    overview: "Reduce PDF file size while maintaining quality. Compress images, remove redundant data, and optimize file structure.",
    frontendProcess: "Upload a PDF file and optionally select compression level (low, medium, high). The frontend validates the file and sends compression preferences to the backend.",
    backendProcess: "The backend uses libraries like ghostscript or pikepdf to compress the PDF. Images are resampled, fonts are subsetted, and unnecessary data is removed. Compression level determines the balance between size and quality.",
    useCases: ["Email large PDFs", "Reduce storage costs", "Optimize web PDFs", "Archive documents"],
    features: ["Adjustable compression", "Quality control", "Batch processing", "Metadata preservation"]
  },
  "image-to-pdf": {
    overview: "Convert JPG, PNG, and other image formats into a single PDF document. Perfect for scanning and archiving.",
    frontendProcess: "Upload multiple image files (JPG, PNG, WebP, etc.). Images are previewed in order and can be reordered. Click 'Create PDF' to process.",
    backendProcess: "The backend receives images, validates formats, and converts them to PDF. Images are arranged sequentially, maintaining aspect ratios. Quality settings are applied and the final PDF is generated.",
    useCases: ["Scan document archival", "Create photo albums", "Convert screenshots", "Combine digital documents"],
    features: ["Multiple formats", "Custom ordering", "Quality settings", "Batch conversion"]
  },
  "pdf-to-text": {
    overview: "Extract all text content from a PDF document. Get searchable, editable text for easy content reuse.",
    frontendProcess: "Upload a PDF file. The frontend sends it to the backend and waits for text extraction. Results are displayed in a text area with copy-to-clipboard functionality.",
    backendProcess: "The backend uses PyPDF2 or pdfplumber to extract text from each page. For scanned PDFs, OCR (Tesseract) is applied. Extracted text is cleaned and returned with line breaks and formatting preserved.",
    useCases: ["Content extraction", "Data analysis", "Text reuse", "Document digitization"],
    features: ["Fast extraction", "OCR support", "Format preservation", "Batch processing"]
  },
  "docx-pdf": {
    overview: "Convert Word documents (DOCX) to PDF format with perfect formatting preservation. Maintain all styles and layouts.",
    frontendProcess: "Upload a DOCX file. The frontend validates the file and sends it to the backend. Processing happens server-side with real-time status updates.",
    backendProcess: "LibreOffice or similar tools convert DOCX to PDF server-side. All formatting, images, and fonts are preserved. The conversion is done in a headless environment for reliability.",
    useCases: ["Professional document sharing", "Archive formatting", "Ensure compatibility", "Create print-ready documents"],
    features: ["Perfect formatting", "Image preservation", "Font support", "Fast conversion"]
  },
  "xlsx-pdf": {
    overview: "Convert Excel spreadsheets to PDF while preserving all data, formulas results, and formatting.",
    frontendProcess: "Upload an XLSX file. The frontend sends the spreadsheet to the backend for conversion. PDF generation includes all sheets and formatting.",
    backendProcess: "LibreOffice converts XLSX to PDF with full formatting. All sheets are converted, formulas are evaluated and results displayed. Tables and charts are preserved as images.",
    useCases: ["Financial reports", "Data sharing", "Print preparation", "Archive records"],
    features: ["Multi-sheet support", "Chart preservation", "Formula evaluation", "Professional output"]
  },
  "pptx-pdf": {
    overview: "Convert PowerPoint presentations to PDF. Perfect for sharing slides without compatibility issues.",
    frontendProcess: "Upload a PPTX file. The frontend sends it for backend processing. All slides are converted with animations removed and static layout preserved.",
    backendProcess: "LibreOffice converts each slide to PDF. Animations are removed, transitions are eliminated. Final PDF contains all slide content in a static format.",
    useCases: ["Share presentations", "Archive slides", "Create print versions", "Ensure compatibility"],
    features: ["All slides included", "Layout preserved", "Image quality", "Fast conversion"]
  },
  "html-to-pdf": {
    overview: "Convert web pages or HTML content to PDF. Capture web content in a portable format.",
    frontendProcess: "Upload an HTML file or provide HTML content. The frontend sends the HTML to the backend for PDF generation with styling preserved.",
    backendProcess: "Puppeteer or similar tools render HTML in a headless browser and generate PDF. CSS is applied, JavaScript is executed (if needed), and the final visual output is captured as PDF.",
    useCases: ["Web page archival", "Report generation", "Invoice creation", "Email HTML conversion"],
    features: ["CSS support", "Image rendering", "Link preservation", "Custom sizing"]
  },
  "protect-pdf": {
    overview: "Add password protection to PDF files. Restrict access with user and owner passwords for document security.",
    frontendProcess: "Upload a PDF and set a password. The frontend validates password strength and sends the encrypted PDF to the backend.",
    backendProcess: "PyPDF2 or pikepdf adds 256-bit encryption. User password restricts opening, owner password restricts editing. The protected PDF is returned for download.",
    useCases: ["Secure confidential documents", "Restrict editing", "Control access", "Compliance requirements"],
    features: ["256-bit encryption", "User/owner passwords", "Permission control", "Easy removal of protection"]
  },
  "pdf-spreadsheet": {
    overview: "Create a PDF from multiple images arranged in a grid layout. Perfect for creating contact sheets or image catalogs.",
    frontendProcess: "Upload multiple images. Arrange them in grid layout preview. Customize grid size, spacing, and margins. Click 'Create PDF' to generate.",
    backendProcess: "The backend receives image files and grid specifications. Images are loaded and arranged according to grid layout. The final PDF is generated with proper spacing and pagination.",
    useCases: ["Image catalogs", "Contact sheets", "Photo albums", "Portfolio creation"],
    features: ["Grid customization", "Auto-pagination", "Quality preservation", "Batch processing"]
  },
  "pdf-docx": {
    overview: "Convert PDF files to editable Word documents (DOCX). Perfect for editing PDF content in Microsoft Word.",
    frontendProcess: "Upload a PDF file. The frontend sends it for backend conversion to DOCX with editable content.",
    backendProcess: "Python libraries extract PDF content and convert to DOCX format. Tables are preserved, text is editable, images are embedded. Layout is approximated based on PDF structure.",
    useCases: ["Edit PDF content", "Reuse content", "Convert forms", "Share with MS Office users"],
    features: ["Editable content", "Format approximation", "Image preservation", "Fast conversion"]
  },
  "pdf-to-images": {
    overview: "Convert each PDF page into separate image files (PNG/JPG). Perfect for sharing individual pages or creating thumbnails.",
    frontendProcess: "Upload a PDF file. Select output format (PNG or JPG) and quality settings. Click 'Convert' to generate images.",
    backendProcess: "The backend uses pdf2image (ghostscript) to render each PDF page as an image. Images are generated at specified quality and resolution. All images are zipped and available for download.",
    useCases: ["Create thumbnails", "Page preview", "Image sharing", "Web optimization"],
    features: ["Format selection", "Quality control", "Batch processing", "High resolution"]
  },
  "extract-images": {
    overview: "Extract all embedded images from a PDF file. Save images individually or as a ZIP archive.",
    frontendProcess: "Upload a PDF containing images. Click 'Extract' to process. The frontend displays extraction progress.",
    backendProcess: "Python libraries scan the PDF for embedded images. Each image is extracted and saved in its original format or converted as needed. All extracted images are zipped for download.",
    useCases: ["Recover images", "Extract graphics", "Content reuse", "Media management"],
    features: ["Batch extraction", "Format preservation", "Original quality", "ZIP packaging"]
  },
  "pdf-to-pptx": {
    overview: "Convert PDF pages into PowerPoint slides. Perfect for repurposing PDF content as presentations.",
    frontendProcess: "Upload a PDF file. Each page will become a slide. Click 'Convert to PowerPoint' to process.",
    backendProcess: "The backend converts each PDF page to an image and embeds it in PowerPoint slides. Pages are sized appropriately for presentation format. Final PPTX is editable and ready for content addition.",
    useCases: ["Convert reports to slides", "Create presentations", "Repurpose content", "Add speaker notes"],
    features: ["Page-to-slide conversion", "Editable format", "Original layout", "Fast processing"]
  },
  "pdf-to-excel": {
    overview: "Extract tables from PDF files and convert them to Excel spreadsheets. Perfect for data extraction.",
    frontendProcess: "Upload a PDF containing tables. The frontend sends it for backend table detection and extraction.",
    backendProcess: "Python libraries detect tables in the PDF using cell grid detection. Extracted data is organized into Excel format. Multiple tables become multiple sheets. Data integrity is maintained.",
    useCases: ["Data extraction", "Table conversion", "Report analysis", "Data migration"],
    features: ["Table detection", "Multi-sheet support", "Data preservation", "Formula support"]
  },
  "pdf-remove-pages": {
    overview: "Remove specific pages from a PDF document. Keep only the pages you need.",
    frontendProcess: "Upload a PDF and specify pages to remove (e.g., 2,4,7 or 1-3). The frontend validates input and processes the request.",
    backendProcess: "PyPDF2 reads the PDF and removes specified pages. Remaining pages are merged sequentially. The modified PDF maintains original formatting and quality.",
    useCases: ["Clean up documents", "Remove sensitive pages", "Reduce file size", "Create versions"],
    features: ["Range selection", "Preview capability", "Quality preservation", "Quick processing"]
  },
  "pdf-reorder-pages": {
    overview: "Reorder PDF pages in any sequence you want. Reorganize document structure easily.",
    frontendProcess: "Upload a PDF and specify new page order (e.g., 3,1,2,5,4). The frontend validates and sends the reordering request.",
    backendProcess: "PyPDF2 extracts all pages and reorders them according to specifications. Pages are reassembled maintaining quality and all document properties.",
    useCases: ["Reorganize documents", "Fix page order", "Create custom layouts", "Prepare for binding"],
    features: ["Custom ordering", "Batch operations", "Quality preservation", "Instant processing"]
  },
  "pdf-watermark": {
    overview: "Add text or image watermarks to every page of a PDF. Perfect for branding and copyright protection.",
    frontendProcess: "Upload a PDF and enter watermark text. Customize position, opacity, and rotation. Click 'Add Watermark' to process.",
    backendProcess: "PyPDF2 or reportlab adds watermark text/image to each page. Position and styling are applied uniformly across all pages. The watermarked PDF is generated and ready for download.",
    useCases: ["Brand documents", "Copyright protection", "Confidentiality marking", "Version control"],
    features: ["Text watermarks", "Custom positioning", "Opacity control", "Batch processing"]
  },
  "pdf-ocr": {
    overview: "Recognize text from scanned PDFs using advanced OCR technology. Convert scanned documents to searchable text.",
    frontendProcess: "Upload a scanned PDF. The frontend sends it for OCR processing. Progress updates are shown as pages are processed.",
    backendProcess: "Tesseract OCR engine scans each PDF page for text. Language detection is automatic. Results are embedded in the PDF making it searchable. High accuracy with multiple language support.",
    useCases: ["Digitize scans", "Make searchable", "Extract text", "Archive documents"],
    features: ["Multi-language", "High accuracy", "Searchable output", "Original layout"]
  },
  "pdf/to-html": {
    overview: "Convert PDF documents to clean HTML format. Perfect for web publishing and content management.",
    frontendProcess: "Upload a PDF file. The frontend processes the file and sends it for HTML conversion.",
    backendProcess: "PDF libraries extract content and structure. Content is converted to semantic HTML5. CSS is generated for styling. Links and formatting are preserved. Output is clean and web-ready.",
    useCases: ["Web publishing", "CMS integration", "Content reuse", "Digital publishing"],
    features: ["Semantic HTML", "CSS generation", "Link preservation", "Clean output"]
  }
};

interface ToolDetailProps {
  toolId: ToolId;
  onBack: () => void;
}

function ToolDetailModal({ toolId, onBack }: ToolDetailProps) {
  const tool = tools.find((t) => t.id === toolId);
  const details = toolDetails[toolId];

  if (!tool || !details) return null;

  const getIcon = () => {
    const icon = (tool.icon as string);
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<any>>)[icon];
    return IconComponent ? <IconComponent size={40} /> : null;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-t-3xl text-white">
          <button
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all mb-4 inline-block"
          >
            ← Back
          </button>
          <div className="flex items-center gap-4 mt-2">
            <div className="text-orange-100">{getIcon()}</div>
            <div>
              <h2 className="text-3xl font-bold">{tool.name}</h2>
              <p className="text-orange-100 mt-1">{tool.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 max-h-96 overflow-y-auto">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{details.overview}</p>
          </div>

          {/* Frontend Process */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-xl">🖥️</span> Frontend Process
            </h3>
            <p className="text-gray-700 leading-relaxed">{details.frontendProcess}</p>
          </div>

          {/* Backend Process */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-xl">⚙️</span> Backend Process
            </h3>
            <p className="text-gray-700 leading-relaxed">{details.backendProcess}</p>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span> Use Cases
            </h3>
            <ul className="space-y-2">
              {details.useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-500 font-bold mt-1">•</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-xl">✨</span> Key Features
            </h3>
            <ul className="space-y-2">
              {details.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer with CTA */}
        <div className="border-t border-gray-200 p-8 bg-gray-50 rounded-b-3xl flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition-all"
          >
            Close
          </button>
          <Link
            to={tool.route}
            onClick={() => window.scrollTo(0, 0)}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all text-center"
          >
            Try Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

const AllToolsPage: React.FC = () => {
  const [selectedTool, setSelectedTool] = React.useState<ToolId | null>(null);

  return (
    <Layout>
      <Helmet>
        <title>All PDF Tools - Complete Guide | PDFConvert.tech</title>
        <meta name="description" content="Explore all 20+ PDF tools with detailed explanations of how they work on frontend and backend." />
      </Helmet>

      {/* Header */}
      <div className="mb-12">
        <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
          All PDF Tools Explained
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore our complete suite of 20+ PDF tools. Learn how each tool works, what it does, and how it processes your files on both frontend and backend.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const getIcon = () => {
            const icon = (tool.icon as string);
            const IconComponent = (Icons as unknown as Record<string, React.ComponentType<any>>)[icon];
            return IconComponent ? <IconComponent size={32} /> : null;
          };

          return (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool.id as ToolId)}
              className="group bg-white rounded-2xl p-6 border-2 border-orange-100 hover:border-orange-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all mb-4">
                {getIcon()}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {tool.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-4 transition-all">
                <span>Learn More</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedTool && (
        <ToolDetailModal
          toolId={selectedTool}
          onBack={() => setSelectedTool(null)}
        />
      )}
    </Layout>
  );
};

export default AllToolsPage;

