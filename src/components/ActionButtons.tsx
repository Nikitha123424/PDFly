import React from 'react';
import { Download, Printer, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onGeneratePDF: () => void;
  onPrint: () => void;
  onReset: () => void;
  isDark: boolean;
  hasContent: boolean;
  isGenerating: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGeneratePDF,
  onPrint,
  onReset,
  isDark,
  hasContent,
  isGenerating,
}) => {
  const buttonBase = `py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`;
  
  const primaryButton = `${buttonBase} bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-button disabled:hover:shadow-none active:scale-95`;

  const secondaryButton = `${buttonBase} ${
    isDark
      ? 'bg-charcoal-800 text-gray-200 hover:bg-charcoal-700 disabled:hover:bg-charcoal-800'
      : 'bg-gray-100 text-charcoal-900 hover:bg-gray-200 disabled:hover:bg-gray-100'
  }`;

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        onClick={onGeneratePDF}
        disabled={!hasContent || isGenerating}
        className={`${primaryButton} col-span-2 md:col-span-1`}
      >
        <Download size={20} />
        {isGenerating ? 'Generating...' : 'Generate PDF'}
      </button>

      <button
        onClick={onPrint}
        disabled={!hasContent}
        className={secondaryButton}
      >
        <Printer size={20} />
        Print
      </button>

      <button
        onClick={onReset}
        disabled={!hasContent}
        className={`${secondaryButton} col-span-2 md:col-span-1`}
      >
        <RotateCcw size={20} />
        Reset
      </button>
    </div>
  );
};
