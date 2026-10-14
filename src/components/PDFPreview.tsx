import React from 'react';
import { PDFPage } from './PDFPage';
import { PDFSettings } from '../utils/pdfGenerator';

interface PDFPreviewProps {
  content: string;
  settings: PDFSettings;
  isDark: boolean;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({
  content,
  settings,
  isDark,
}) => {
  // Simple page calculation based on content length
  const estimatedLinesPerPage = 35;
  const contentLines = content.split('\n').length;
  const totalPages = Math.max(1, Math.ceil(contentLines / estimatedLinesPerPage));

  // Split content into pages for preview
  const linesPerPage = Math.ceil(content.split('\n').length / totalPages);
  const pages = [];
  let currentLine = 0;

  for (let i = 0; i < totalPages; i++) {
    const pageStart = currentLine;
    const pageEnd = Math.min(currentLine + linesPerPage, content.split('\n').length);
    const pageContent = content.split('\n').slice(pageStart, pageEnd).join('\n');
    pages.push(pageContent);
    currentLine = pageEnd;
  }

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto px-2 pb-4">
      <div>
        <h3 className={`text-sm font-semibold font-poppins mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          PDF Preview ({totalPages} page{totalPages !== 1 ? 's' : ''})
        </h3>
        {!content.trim() && (
          <div className={`p-8 text-center rounded-lg ${isDark ? 'bg-charcoal-800' : 'bg-gray-100'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Start typing to see PDF preview
            </p>
          </div>
        )}
      </div>

      {pages.map((pageContent, index) => (
        <PDFPage
          key={index}
          content={pageContent}
          settings={settings}
          pageNumber={index + 1}
          totalPages={totalPages}
          isDark={isDark}
        />
      ))}
    </div>
  );
};
