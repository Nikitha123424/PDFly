import React from 'react';
import { Trash2 } from 'lucide-react';
import { TextStats, getTextStats, formatNumber } from '../utils/textFormatter';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onClear: () => void;
  isDark: boolean;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  content,
  onChange,
  onClear,
  isDark,
}) => {
  const stats: TextStats = getTextStats(content);

  const handleClear = () => {
    if (content.trim() && confirm('Are you sure you want to clear all content? This cannot be undone.')) {
      onClear();
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Stats */}
      <div className={`grid grid-cols-4 gap-2 p-4 rounded-2xl border ${isDark ? 'bg-charcoal-800/50 border-primary-900/30' : 'bg-primary-50 border-primary-100'}`}>
        <div className="text-center">
          <div className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            CHARACTERS
          </div>
          <div className={`text-2xl font-bold font-poppins text-primary-600`}>
            {formatNumber(stats.characters)}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            WORDS
          </div>
          <div className={`text-2xl font-bold font-poppins text-primary-600`}>
            {formatNumber(stats.words)}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            PARAGRAPHS
          </div>
          <div className={`text-2xl font-bold font-poppins text-primary-600`}>
            {formatNumber(stats.paragraphs)}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            LINES
          </div>
          <div className={`text-2xl font-bold font-poppins text-primary-600`}>
            {formatNumber(stats.lines)}
          </div>
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste or type your content here..."
        className={`flex-1 p-6 rounded-xl border-2 resize-none focus:outline-none transition-all font-inter text-base leading-relaxed ${
          isDark
            ? 'bg-charcoal-800/50 text-white placeholder-gray-500 border-primary-900/30 focus:border-primary-600 focus:ring-1 focus:ring-primary-500'
            : 'bg-white text-charcoal-900 placeholder-gray-400 border-primary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
        }`}
      />

      {/* Clear Button */}
      <button
        onClick={handleClear}
        disabled={!content.trim()}
        className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
          content.trim()
            ? isDark
              ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900/30'
              : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
            : isDark
            ? 'bg-gray-800/30 text-gray-500 border border-gray-700/30'
            : 'bg-gray-100 text-gray-400 border border-gray-200'
        }`}
      >
        <Trash2 size={18} />
        Clear Content
      </button>
    </div>
  );
};
