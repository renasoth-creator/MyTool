
// The ToolID Route must be same as ToolCinfig Rout

export type ToolId =
  | "merge"
  | "split"
  | "compress"
  | "image-to-pdf"
  | "pdf-to-text"
  | "docx-pdf"
  | "xlsx-pdf"
  | "pptx-pdf"
  | "html-to-pdf"
  | "protect-pdf"  
  | "pdf-spreadsheet"
  | "pdf-docx"
  //More_Tools_below
  | "pdf-to-images"
  | "extract-images"
  | "pdf-to-pptx" 
  | "pdf-to-excel"
  | "pdf-remove-pages"
  | "pdf-reorder-pages"
  | "pdf-watermark"
  | "pdf-ocr"
  | "pdf/to-html"



export interface ToolConfig {
  id: ToolId;
  name: string;
  description: string;
  route: string;
  badge?: string;
  icon?:string;
}
// The toolsCongig Route must be same as ToolID
export const tools: ToolConfig[] = [
  {
    id: "merge",
    name: "Merge PDF",
    description: "Combine multiple PDFs into a single file.",
    route: "/merge",
    icon: "Combine",
  },
  {
    id: "split",
    name: "Split PDF",
    description: "Split a PDF into separate pages or ranges.",
    route: "/split",
    icon: "Scissors",
  },
  {
    id: "compress",
    name: "Compress PDF",
    description: "Reduce the size of your PDF while keeping quality.",
    route: "/compress",
    icon: "Zap",
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG/PNG images into a single PDF.",
    route: "/image-to-pdf",
    icon: "Image",
  },
  {
    id: "pdf-to-text",
    name: "PDF → Text",
    description: "Extract text content from a PDF file.",
    route: "/pdf-to-text",
    icon: "FileText",
  },
  {
    id: "docx-pdf",
    name: "DOCX to PDF",
    description: "Convert Word documents into PDFs.",
    route: "docx-pdf",
    icon: "File",
  },
  {
    id: "xlsx-pdf",
    name: "XLSX to PDF",
    description: "Turn spreadsheets into printable PDF files.",
    route: "xlsx-pdf",
    icon: "Table",
  },
  {
    id: "pptx-pdf",
    name: "PPTX to PDF",
    description: "Convert presentations directly into PDF.",
    route: "pptx-pdf",
    icon: "Presentation",
  },
  {
    id: "html-to-pdf",
    name: "HTML to PDF",
    description: "Convert web pages or HTML files into PDFs.",
    route: "/html-to-pdf",
    icon: "Globe",
  },
  {
    id: "protect-pdf",
    name: "PDF Password Protection",
    description: "Lock your PDF with a secure password.",
    route: "/protect-pdf",
    icon: "Lock",
  },
  {
  id: "pdf-spreadsheet",
  name: "PDF Spreadsheet",
  description: "Create a PDF that contains multiple images arranged in a grid layout.",
  route: "/pdf-spreadsheet",
  icon: "Grid",
  },
  {
  id: "pdf-docx",
  name: "PDF to Word",
  description: "Convert PDF to DOCX with the highest processing and conversion",
  route: "/pdf-docx",
  icon: "FileText",
  },



  /*
  {***THIS CN BE USED FOR OTHER TOOLS***
  id: "PDF-PSD",
  name: "PSD",
  description: "in this tol, you can upload and ues this tool for as loong as you want",
  route: "/pdf-psd",*/





  {
  id: "pdf-to-images",
  name: "PDF → Images",
  description: "Convert each PDF page into PNG/JPG images.",
  route: "/pdf-to-images",
  icon: "Image",
},
{
  id: "extract-images",
  name: "Extract Images",
  description: "Extract all embedded images from a PDF.",
  route: "/extract-images",
  icon: "Copy",
},
{
  id: "pdf-to-pptx",
  name: "PDF → PowerPoint",
  description: "Convert PDF pages into PPTX slides.",
  route: "/pdf-to-pptx",
  icon: "Presentation",
},
{
  id: "pdf-to-excel",
  name: "PDF → Excel",
  description: "Convert PDF tables into XLSX spreadsheets.",
  route: "/pdf-to-excel",
  icon: "Table",
},
{
  id: "pdf-remove-pages",
  name: "Remove PDF Pages",
  description: "Remove specific pages from your PDF.",
  route: "/pdf-remove-pages",
  icon: "Trash2",
},
{
  id: "pdf-reorder-pages",
  name: "Reorder PDF Pages",
  description: "Change the order of pages in a PDF.",
  route: "/pdf-reorder-pages",
  icon: "ArrowUpDown",
},
{
  id: "pdf-watermark",
  name: "Add Watermark",
  description: "Add a text watermark to each page of your PDF.",
  route: "/pdf-watermark",
  icon: "Droplet",
},
{
  id: "pdf-ocr",
  name: "PDF OCR (Scan to Text)",
  description: "Recognize text from scanned PDFs using OCR.",
  route: "/pdf-ocr",
  icon: "Scan",
},
{
  id: "pdf/to-html",
  name: "PDF → HTML",
  description: "Convert PDF to clean HTML.",
  route: "/pdf/to-html",
  icon: "Code",
},


  
];
