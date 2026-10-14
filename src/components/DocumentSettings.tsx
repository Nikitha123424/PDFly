import React from 'react';
import { PDFSettings } from '../utils/pdfGenerator';
import { DEFAULT_FONTS, LINE_SPACING_OPTIONS } from '../utils/textFormatter';

interface DocumentSettingsProps {
  settings: PDFSettings;
  onChange: (settings: PDFSettings) => void;
  isDark: boolean;
}

export const DocumentSettings: React.FC<DocumentSettingsProps> = ({
  settings,
  onChange,
  isDark,
}) => {
  const handleChange = (key: keyof PDFSettings, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  const inputClasses = `w-full px-3 py-2 rounded-lg border transition-colors ${
    isDark
      ? 'bg-charcoal-900/50 border-primary-900/30 text-white focus:border-primary-600 focus:ring-1 focus:ring-primary-500'
      : 'bg-white border-primary-200 text-charcoal-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
  } focus:outline-none`;

  const selectClasses = `w-full px-3 py-2 rounded-lg border transition-colors ${
    isDark
      ? 'bg-charcoal-900/50 border-primary-900/30 text-white focus:border-primary-600 focus:ring-1 focus:ring-primary-500'
      : 'bg-white border-primary-200 text-charcoal-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
  } focus:outline-none`;

  return (
    <div className={`p-4 rounded-2xl space-y-4 border ${isDark ? 'bg-charcoal-800/50 border-primary-900/30' : 'bg-white/50 border-primary-100'}`}>
      <h3 className={`text-sm font-semibold font-poppins ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Document Settings
      </h3>

      {/* Title */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Document Title
        </label>
        <input
          type="text"
          value={settings.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., My Project Report"
          className={inputClasses}
        />
      </div>

      {/* Author */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Author
        </label>
        <input
          type="text"
          value={settings.author || ''}
          onChange={(e) => handleChange('author', e.target.value)}
          placeholder="Your name"
          className={inputClasses}
        />
      </div>

      {/* Footer */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Footer Text
        </label>
        <input
          type="text"
          value={settings.footerText || ''}
          onChange={(e) => handleChange('footerText', e.target.value)}
          placeholder="e.g., Generated using PDFly"
          className={inputClasses}
        />
      </div>

      {/* Page Size */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Page Size
        </label>
        <select
          value={settings.pageSize}
          onChange={(e) => handleChange('pageSize', e.target.value as 'a4' | 'letter')}
          className={selectClasses}
        >
          <option value="a4">A4</option>
          <option value="letter">Letter</option>
        </select>
      </div>

      {/* Orientation */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Orientation
        </label>
        <select
          value={settings.orientation}
          onChange={(e) => handleChange('orientation', e.target.value as 'portrait' | 'landscape')}
          className={selectClasses}
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>

      {/* Margins */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Margins
        </label>
        <select
          value={settings.margins}
          onChange={(e) => handleChange('margins', e.target.value as 'small' | 'normal' | 'large')}
          className={selectClasses}
        >
          <option value="small">Small (10mm)</option>
          <option value="normal">Normal (15mm)</option>
          <option value="large">Large (20mm)</option>
        </select>
      </div>

      {/* Font Family */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Font Family
        </label>
        <select
          value={settings.fontFamily}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
          className={selectClasses}
        >
          {DEFAULT_FONTS.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Font Size: {settings.fontSize}pt
        </label>
        <input
          type="range"
          min="8"
          max="24"
          value={settings.fontSize}
          onChange={(e) => handleChange('fontSize', Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Line Spacing */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Line Spacing
        </label>
        <select
          value={settings.lineSpacing}
          onChange={(e) => handleChange('lineSpacing', Number(e.target.value))}
          className={selectClasses}
        >
          {LINE_SPACING_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Text Alignment */}
      <div>
        <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Text Alignment
        </label>
        <select
          value={settings.textAlign}
          onChange={(e) => handleChange('textAlign', e.target.value as 'left' | 'center' | 'right' | 'justify')}
          className={selectClasses}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>

      {/* Page Numbers */}
      <div>
        <label className={`flex items-center gap-3 cursor-pointer`}>
          <input
            type="checkbox"
            checked={settings.includePageNumbers}
            onChange={(e) => handleChange('includePageNumbers', e.target.checked)}
            className="w-4 h-4 accent-primary-600"
          />
          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Include Page Numbers
          </span>
        </label>
      </div>
    </div>
  );
};
