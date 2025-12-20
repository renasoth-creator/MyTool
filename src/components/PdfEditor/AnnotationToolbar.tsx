import { Type, Highlighter, Circle, Minus, PenTool, Pointer } from 'lucide-react';

interface AnnotationToolbarProps {
  currentTool: 'select' | 'text' | 'highlight' | 'circle' | 'line' | 'freehand';
  onToolChange: (tool: 'select' | 'text' | 'highlight' | 'circle' | 'line' | 'freehand') => void;
  annotationCount: number;
}

export default function AnnotationToolbar({
  currentTool,
  onToolChange,
  annotationCount,
}: AnnotationToolbarProps) {
  const tools = [
    { id: 'select', label: 'Select', icon: Pointer, color: 'gray' },
    { id: 'text', label: 'Text', icon: Type, color: 'blue' },
    { id: 'highlight', label: 'Highlight', icon: Highlighter, color: 'yellow' },
    { id: 'circle', label: 'Circle', icon: Circle, color: 'orange' },
    { id: 'line', label: 'Line', icon: Minus, color: 'red' },
    { id: 'freehand', label: 'Draw', icon: PenTool, color: 'purple' },
  ] as const;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = currentTool === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => onToolChange(tool.id as 'select' | 'text' | 'highlight' | 'circle' | 'line' | 'freehand')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={tool.label}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{tool.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
          Annotations: <span className="font-bold text-orange-600">{annotationCount}</span>
        </div>
      </div>
    </div>
  );
}

