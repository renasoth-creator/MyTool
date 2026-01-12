import { Bold, Italic, Type } from 'lucide-react';

interface TextStyle {
  bold: boolean;
  italic: boolean;
  fontSize: number;
  fontFamily: string;
  color: string;
}

interface TextToolbarProps {
  isVisible: boolean;
  textStyle: TextStyle;
  onStyleChange: (style: Partial<TextStyle>) => void;
}

export default function TextToolbar({
  isVisible,
  textStyle,
  onStyleChange,
}: TextToolbarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-40">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {/* Bold Button */}
        <button
          onClick={() => onStyleChange({ bold: !textStyle.bold })}
          className={`p-2 rounded transition-all ${
            textStyle.bold
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>

        {/* Italic Button */}
        <button
          onClick={() => onStyleChange({ italic: !textStyle.italic })}
          className={`p-2 rounded transition-all ${
            textStyle.italic
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>

        {/* Font Size */}
        <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
          <Type size={18} className="text-gray-600" />
          <input
            type="range"
            min="8"
            max="32"
            value={textStyle.fontSize}
            onChange={(e) => onStyleChange({ fontSize: parseInt(e.target.value) })}
            className="w-24"
            title="Font size"
          />
          <span className="text-sm font-medium text-gray-600 w-8">{textStyle.fontSize}px</span>
        </div>

        {/* Font Family */}
        <select
          value={textStyle.fontFamily}
          onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          title="Font family"
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Color Picker */}
        <div className="border-l border-gray-300 pl-3">
          <input
            type="color"
            value={textStyle.color}
            onChange={(e) => onStyleChange({ color: e.target.value })}
            className="w-10 h-10 rounded cursor-pointer border-2 border-gray-300"
            title="Text color"
          />
        </div>
      </div>
    </div>
  );
}

