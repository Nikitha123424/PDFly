import React from 'react';
import { PDFSettings } from '../utils/pdfGenerator';

interface PDFPageProps {
  content: string;
  settings: PDFSettings;
  pageNumber: number;
  totalPages: number;
  isDark: boolean;
}

export const PDFPage: React.FC<PDFPageProps> = ({
  content,
  settings,
  pageNumber,
  totalPages,
  isDark,
}) => {
  const pageAspectRatio = settings.orientation === 'portrait' 
    ? settings.pageSize === 'a4' ? 210 / 297 : 215.9 / 279.4
    : settings.pageSize === 'a4' ? 297 / 210 : 279.4 / 215.9;

  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden border ${isDark ? 'bg-charcoal-800 border-primary-900/30' : 'bg-white border-primary-100'}`}
      style={{
        aspectRatio: 1 / pageAspectRatio,
        maxWidth: '100%',
      }}
    >
      <div className="w-full h-full relative p-8 bg-white text-charcoal-900 text-sm leading-relaxed overflow-hidden flex flex-col">
        {/* Content Area */}
        <div className="flex-1 overflow-hidden text-xs line-clamp-[40]">
          <div className="whitespace-pre-wrap break-words">{content}</div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
          <span>{settings.footerText}</span>
          {settings.includePageNumbers && (
            <span>{pageNumber} / {totalPages}</span>
          )}
        </div>
      </div>
    </div>
  );
};
