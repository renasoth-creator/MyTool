import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import PdfViewer from '../components/PdfEditor/PdfViewer';
import AnnotationToolbar from '../components/PdfEditor/AnnotationToolbar';
import { ChevronLeft, Save } from 'lucide-react';
import Popup from '../components/Popup';
import { BACKEND_URL } from '../config/backend';

export interface Annotation {
  id: string;
  type: 'text' | 'highlight' | 'circle' | 'line' | 'freehand';
  page: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  content?: string;
  path?: Array<{ x: number; y: number }>;
  opacity?: number;
}

export default function PdfEditor() {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentTool, setCurrentTool] = useState<'select' | 'text' | 'highlight' | 'circle' | 'line' | 'freehand'>('select');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error' | 'uploading'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle PDF file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('uploading');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BACKEND_URL}/pdf-editor/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setPdfUrl(data.url);
      setFileName(file.name);
      setAnnotations([]);
      setCurrentPage(1);
      setStatus('idle');
    } catch (err) {
      setErrorMsg('Failed to upload PDF. Please try again.');
      setStatus('error');
      console.error(err);
    }
  };

  // Save annotations to backend
  const handleSaveAnnotations = async () => {
    if (!pdfUrl) {
      setErrorMsg('No PDF loaded');
      setStatus('error');
      return;
    }

    setStatus('saving');
    try {
      const response = await fetch(`${BACKEND_URL}/pdf-editor/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfUrl,
          fileName,
          annotations,
        }),
      });

      if (!response.ok) throw new Error('Save failed');

      const data = await response.json();
      setStatus('saved');

      // Download the edited PDF
      setTimeout(() => {
        downloadFile(data.downloadUrl, `edited_${fileName}`);
        setStatus('idle');
      }, 1500);
    } catch (err) {
      setErrorMsg('Failed to save annotations. Please try again.');
      setStatus('error');
      console.error(err);
    }
  };

  // Download file helper
  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  // Add annotation
  const addAnnotation = (annotation: Omit<Annotation, 'id'>) => {
    const id = `ann_${Date.now()}_${Math.random()}`;
    setAnnotations([...annotations, { ...annotation, id }]);
  };

  // Clear all annotations
  const clearAnnotations = () => {
    setAnnotations([]);
  };

  return (
    <Layout>
      <Helmet>
        <title>PDF Editor – PDFConvert.tech</title>
        <meta name="description" content="Free online PDF editor. Edit, annotate, and modify PDF documents easily." />
      </Helmet>

      {/* Status Popups */}
      {status === 'saved' && (
        <Popup
          type="success"
          message="PDF saved successfully! Your download will start automatically."
          onClose={() => setStatus('idle')}
        />
      )}

      {status === 'error' && (
        <Popup
          type="error"
          message={errorMsg}
          onClose={() => setStatus('idle')}
        />
      )}

      {/* Header Navigation */}
      <div className="mb-8">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-4"
        >
          <ChevronLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* Main Editor Container */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-orange-100">

        {!pdfUrl ? (
          // Upload Section
          <div className="min-h-96 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-slate-50 to-gray-100">
            <div className="text-center space-y-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Upload PDF to Edit</h2>
                <p className="text-gray-600 max-w-md">Choose a PDF file to start editing. Add text, highlights, shapes, and annotations.</p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={status === 'uploading'}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'uploading' ? 'Uploading...' : 'Select PDF File'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          // Editor Section
          <div className="flex flex-col h-screen max-h-[calc(100vh-200px)]">
            {/* Editor Header */}
            <div className="bg-slate-900 text-white px-6 py-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{fileName}</h2>
                  <p className="text-sm text-gray-400">Page {currentPage} of {totalPages}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearAnnotations}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleSaveAnnotations}
                    disabled={annotations.length === 0 || status === 'saving'}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {status === 'saving' ? (
                      <>
                        <span className="inline-block animate-spin">⏳</span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save & Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Annotation Toolbar */}
            <AnnotationToolbar
              currentTool={currentTool}
              onToolChange={setCurrentTool}
              annotationCount={annotations.length}
            />

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-gray-100">
              <PdfViewer
                pdfUrl={pdfUrl}
                currentTool={currentTool}
                annotations={annotations}
                onAddAnnotation={addAnnotation}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onTotalPagesChange={setTotalPages}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

