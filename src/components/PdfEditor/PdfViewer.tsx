import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { Annotation } from '../../pages/PdfEditor';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfUrl: string;
  currentTool: string;
  annotations: Annotation[];
  onAddAnnotation: (annotation: Omit<Annotation, 'id'>) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onTotalPagesChange: (total: number) => void;
}

export default function PdfViewer({
  pdfUrl,
  currentTool,
  annotations,
  onAddAnnotation,
  currentPage,
  onPageChange,
  onTotalPagesChange,
}: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [scale, setScale] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('#FFA500');

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        setPdf(pdf);
        onTotalPagesChange(pdf.numPages);
      } catch (err) {
        console.error('Error loading PDF:', err);
      }
    };

    loadPdf();
  }, [pdfUrl, onTotalPagesChange]);

  // Render page with annotations
  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    const renderPage = async () => {
      const page = await pdf.getPage(currentPage);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext('2d')!;
      await page.render({ canvasContext: context, viewport }).promise;

      // Draw annotations
      drawAnnotations(context);
    };

    renderPage();
  }, [pdf, currentPage, scale, annotations]);

  // Draw annotations on canvas
  const drawAnnotations = (context: CanvasRenderingContext2D) => {
    const pageAnnotations = annotations.filter(a => a.page === currentPage);

    pageAnnotations.forEach(annotation => {
      context.save();

      switch (annotation.type) {
        case 'highlight':
          context.fillStyle = annotation.color || 'rgba(255, 200, 0, 0.3)';
          context.fillRect(annotation.x, annotation.y, annotation.width || 100, annotation.height || 30);
          break;

        case 'circle':
          context.strokeStyle = annotation.color || '#FFA500';
          context.lineWidth = 2;
          const radius = Math.sqrt((annotation.width || 0) ** 2 + (annotation.height || 0) ** 2) / 2;
          context.beginPath();
          context.arc(annotation.x, annotation.y, radius, 0, 2 * Math.PI);
          context.stroke();
          break;

        case 'line':
          context.strokeStyle = annotation.color || '#FFA500';
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(annotation.x, annotation.y);
          context.lineTo(annotation.width || annotation.x, annotation.height || annotation.y);
          context.stroke();
          break;

        case 'freehand':
          if (annotation.path && annotation.path.length > 0) {
            context.strokeStyle = annotation.color || '#FFA500';
            context.lineWidth = 2;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.beginPath();
            context.moveTo(annotation.path[0].x, annotation.path[0].y);
            annotation.path.forEach((point: { x: number; y: number }) => context.lineTo(point.x, point.y));
            context.stroke();
          }
          break;

        case 'text':
          context.fillStyle = annotation.color || '#000000';
          context.font = '14px Arial';
          context.fillText(annotation.content || '', annotation.x, annotation.y);
          break;
      }

      context.restore();
    });
  };

  // Handle mouse events for annotations
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentTool === 'select') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDrawing(true);
    setStartPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = () => {
    if (!isDrawing || currentTool === 'select') return;

    // Real-time preview would go here
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const endPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const annotation: Omit<Annotation, 'id'> = {
      type: currentTool as any,
      page: currentPage,
      x: Math.min(startPos.x, endPos.x),
      y: Math.min(startPos.y, endPos.y),
      width: currentTool !== 'text' ? Math.abs(endPos.x - startPos.x) : undefined,
      height: currentTool !== 'text' ? Math.abs(endPos.y - startPos.y) : undefined,
      color,
    };

    if (currentTool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        annotation.content = text;
        onAddAnnotation(annotation);
      }
    } else if (currentTool === 'freehand') {
      annotation.path = [startPos, endPos];
      onAddAnnotation(annotation);
    } else {
      onAddAnnotation(annotation);
    }

    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border-2 border-gray-200"
            title="Annotation color"
          />
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Zoom:</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-600 w-12">{Math.round(scale * 100)}%</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 text-sm font-medium"
          >
            Previous
          </button>
          <input
            type="number"
            min="1"
            value={currentPage}
            onChange={(e) => onPageChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 px-2 py-2 border border-gray-200 rounded text-center"
          />
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex items-center justify-center p-4 bg-gray-100"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDrawing(false)}
          className={`bg-white shadow-lg rounded-lg ${
            currentTool !== 'select' ? 'cursor-crosshair' : 'cursor-default'
          }`}
        />
      </div>
    </div>
  );
}

