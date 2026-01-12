import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { Annotation } from '../../pages/PdfEditor';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min?url';

// Set up PDF.js worker from local file
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PdfViewerProps {
  pdfUrl: string;
  currentTool: string;
  annotations: Annotation[];
  onAddAnnotation: (annotation: Omit<Annotation, 'id'>) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onTotalPagesChange: (total: number) => void;
  textStyle?: {
    bold: boolean;
    italic: boolean;
    fontSize: number;
    fontFamily: string;
    color: string;
  };
}

export default function PdfViewer({
  pdfUrl,
  currentTool,
  annotations,
  onAddAnnotation,
  currentPage,
  onPageChange,
  onTotalPagesChange,
  textStyle, // Used in drawAnnotations for text styling
}: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('#FFA500');
  const [loadError, setLoadError] = useState<string>('');
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [draggingAnnotationId, setDraggingAnnotationId] = useState<string | null>(null);

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

        case 'circle': {
          context.strokeStyle = annotation.color || '#FFA500';
          context.lineWidth = 2;
          const circleRadius = Math.sqrt((annotation.width || 0) ** 2 + (annotation.height || 0) ** 2) / 2;
          context.beginPath();
          context.arc(annotation.x, annotation.y, circleRadius, 0, 2 * Math.PI);
          context.stroke();
          break;
        }

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
          const fontSize = annotation.fontSize || 14;
          let fontStyle = '';
          if (annotation.italic) fontStyle += 'italic ';
          if (annotation.bold) fontStyle += 'bold ';
          const fontFamily = annotation.fontFamily || 'Arial';
          context.font = `${fontStyle}${fontSize}px ${fontFamily}`;
          context.fillText(annotation.content || '', annotation.x, annotation.y + fontSize);
          break;
      }

      context.restore();
    });
  };

  // Load PDF document
  useEffect(() => {
    if (!pdfUrl) {
      setLoadError('');
      setPdf(null);
      return;
    }

    const loadPdf = async () => {
      try {
        console.log('Loading PDF from:', pdfUrl);
        setLoadError('');

        // Load directly from S3 URL (no proxy needed)
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          withCredentials: false,
          rangeChunkSize: 65536,
        });

        const loadedPdf = await loadingTask.promise;
        console.log('PDF loaded successfully, pages:', loadedPdf.numPages);
        setPdf(loadedPdf);
        onTotalPagesChange(loadedPdf.numPages);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setLoadError(`Failed to load PDF: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setPdf(null);
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
      await page.render({ canvas, viewport }).promise;

      // Draw annotations
      drawAnnotations(context);
    };

    renderPage();
  }, [pdf, currentPage, scale, annotations, drawAnnotations, textStyle]);

  // Handle mouse events for annotations
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentTool === 'select') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Check if clicking on existing text annotation for dragging (future feature)
    if (currentTool === 'select') {
      const textAnnotations = annotations.filter(a => a.type === 'text' && a.page === currentPage);
      for (const ann of textAnnotations) {
        const fontSize = ann.fontSize || 14;
        const textWidth = (ann.content || '').length * (fontSize * 0.6);
        if (pos.x >= ann.x && pos.x <= ann.x + textWidth &&
            pos.y >= ann.y - fontSize && pos.y <= ann.y) {
          setDraggingAnnotationId(ann.id);
          return;
        }
      }
    }

    setIsDrawing(true);
    setStartPos(pos);

    if (currentTool === 'highlight') {
      setSelectionBox(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Handle dragging text (feature for future enhancement)
    if (draggingAnnotationId && !isDrawing) {
      // Dragging logic would go here - requires parent component state update
      return;
    }

    if (!isDrawing || currentTool === 'select') return;

    // Show selection box for highlight
    if (currentTool === 'highlight') {
      setSelectionBox({
        x: Math.min(startPos.x, currentPos.x),
        y: Math.min(startPos.y, currentPos.y),
        width: Math.abs(currentPos.x - startPos.x),
        height: Math.abs(currentPos.y - startPos.y),
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggingAnnotationId) {
      setDraggingAnnotationId(null);
      return;
    }

    if (!isDrawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const endPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const annotation: Omit<Annotation, 'id'> = {
      type: currentTool as 'text' | 'highlight' | 'circle' | 'line' | 'freehand',
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
    } else if (currentTool === 'highlight') {
      onAddAnnotation(annotation);
      setSelectionBox(null);
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
      {/* Error Display */}
      {loadError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4">
          <p className="font-semibold">Error loading PDF</p>
          <p className="text-sm">{loadError}</p>
        </div>
      )}

      {/* Loading State */}
      {!pdf && !loadError && (
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading PDF...</p>
          </div>
        </div>
      )}

      {/* Controls */}
      {pdf && (
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
      )}

      {/* Canvas Container */}
      {pdf && (
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex items-center justify-center p-4 bg-gray-100 relative"
      >
        <div className="relative">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              setIsDrawing(false);
              setSelectionBox(null);
            }}
            className={`bg-white shadow-lg rounded-lg ${
              currentTool !== 'select' ? 'cursor-crosshair' : 'cursor-grab'
            }`}
          />
          {/* Selection Box Overlay */}
          {selectionBox && currentTool === 'highlight' && (
            <div
              className="absolute border-2 border-orange-500 bg-orange-100 bg-opacity-30"
              style={{
                left: `${selectionBox.x}px`,
                top: `${selectionBox.y}px`,
                width: `${selectionBox.width}px`,
                height: `${selectionBox.height}px`,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </div>
      )}
    </div>
  );
}

