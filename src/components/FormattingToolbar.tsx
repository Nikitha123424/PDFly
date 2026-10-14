import React from 'react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react';

interface FormattingToolbarProps {
  isDark: boolean;
}

export const FormattingToolbar: React.FC<FormattingToolbarProps> = ({ isDark }) => {
  const textStyles = [
    { icon: Bold, label: 'Bold', shortcut: 'Ctrl+B' },
    { icon: Italic, label: 'Italic', shortcut: 'Ctrl+I' },
    { icon: Underline, label: 'Underline', shortcut: 'Ctrl+U' },
  ];

  const alignments = [
    { icon: AlignLeft, label: 'Left', value: 'left' },
    { icon: AlignCenter, label: 'Center', value: 'center' },
    { icon: AlignRight, label: 'Right', value: 'right' },
    { icon: AlignJustify, label: 'Justify', value: 'justify' },
  ];

  return (
    <div className={`p-4 rounded-2xl border ${isDark ? 'bg-charcoal-800/50 border-primary-900/30' : 'bg-white/50 border-primary-100'}`}>
      <h3 className={`text-sm font-semibold font-poppins mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Text Formatting
      </h3>
      
      {/* Text Styles */}
      <div className="flex gap-2 mb-4">
        {textStyles.map(({ icon: Icon, label }) => (
          <button
            key={label}
            title={label}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              isDark
                ? 'bg-charcoal-900/50 text-gray-400 hover:text-primary-400 hover:bg-primary-900/20'
                : 'bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50'
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      {/* Alignment */}
      <div className="flex gap-2">
        {alignments.map(({ icon: Icon, label, value }) => (
          <button
            key={value}
            title={label}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              isDark
                ? 'bg-charcoal-900/50 text-gray-400 hover:text-primary-400 hover:bg-primary-900/20'
                : 'bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50'
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </div>
  );
};
