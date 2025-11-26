export type ToolId =
  | "merge"
  | "split"
  | "compress"
  | "image-to-pdf"
  | "pdf-to-text"
  | "docx-to-pdf"
  | "xlsx-to-pdf"
  | "pptx-to-pdf"
  | "html-to-pdf"
  | "protect-pdf"  
  | "pdf-spreadsheet"
  |  "coming-soon"
  {/*|  "PDF-PSD";*/}


export interface ToolConfig {
  id: ToolId;
  name: string;
  description: string;
  route: string;
  badge?: string;
  icon?:string;
}

export const tools: ToolConfig[] = [
  {
    id: "merge",
    name: "Merge PDF",
    description: "Combine multiple PDFs into a single file.",
    route: "/merge",
  },
  {
    id: "split",
    name: "Split PDF",
    description: "Split a PDF into separate pages or ranges.",
    route: "/split",
  },
  {
    id: "compress",
    name: "Compress PDF",
    description: "Reduce the size of your PDF while keeping quality.",
    route: "/compress",
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG/PNG images into a single PDF.",
    route: "/image-to-pdf",
  },
  {
    id: "pdf-to-text",
    name: "PDF → Text",
    description: "Extract text content from a PDF file.",
    route: "/pdf-to-text",
  },
  {
    id: "docx-to-pdf",
    name: "DOCX to PDF",
    description: "Convert Word documents into PDFs.",
    route: "/docx-to-pdf",
  },
  {
    id: "xlsx-to-pdf",
    name: "XLSX to PDF",
    description: "Turn spreadsheets into printable PDF files.",
    route: "/xlsx-to-pdf",
  },
  {
    id: "pptx-to-pdf",
    name: "PPTX to PDF",
    description: "Convert presentations directly into PDF.",
    route: "/pptx-to-pdf",
  },
  {
    id: "html-to-pdf",
    name: "HTML to PDF",
    description: "Convert web pages or HTML files into PDFs.",
    route: "/html-to-pdf",
  },
  {
    id: "protect-pdf",
    name: "PDF Password Protection",
    description: "Lock your PDF with a secure password.",
    route: "/protect-pdf",
  },
  {
  id: "pdf-spreadsheet",
  name: "PDF Spreadsheet",
  description: "Create a PDF that contains multiple images arranged in a grid layout.",
  route: "/pdf-spreadsheet",
  },
  {
  id: "coming-soon",
  name: "soon",
  description: "in this tol, you can upload and ues this tool for as loong as you want",
  route: "/cooming-soon",
  },

  /*
  {***THIS CN BE USED FOR OTHER TOOLS***
  id: "PDF-PSD",
  name: "PSD",
  description: "in this tol, you can upload and ues this tool for as loong as you want",
  route: "/pdf-psd",*/
  
];
