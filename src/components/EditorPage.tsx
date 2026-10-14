import React, { useState, useRef } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { TextEditor } from './TextEditor';
import { FormattingToolbar } from './FormattingToolbar';
import { DocumentSettings } from './DocumentSettings';
import { PDFPreview } from './PDFPreview';
import { ActionButtons } from './ActionButtons';
import { PDFSettings, generatePDF } from '../utils/pdfGenerator';
import { getTextStats } from '../utils/textFormatter';

interface EditorPageProps {
  isDark: boolean;
}

export const EditorPage: React.FC<EditorPageProps> = ({ isDark }) => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const [settings, setSettings] = useState<PDFSettings>({
    pageSize: 'a4',
    orientation: 'portrait',
    margins: 'normal',
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineSpacing: 1.5,
    textAlign: 'left',
    title: '',
    author: '',
    includePageNumbers: true,
    footerText: '',
  });

  const handleGeneratePDF = async () => {
    if (!content.trim()) {
      setError('Please enter some content before generating your PDF.');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      generatePDF(content, settings);
    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    if (!content.trim()) return;
    window.print();
  };

  const handleReset = () => {
    if (content.trim() && confirm('Are you sure you want to clear all content and settings?')) {
      setContent('');
      setSettings({
        pageSize: 'a4',
        orientation: 'portrait',
        margins: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineSpacing: 1.5,
        textAlign: 'left',
        title: '',
        author: '',
        includePageNumbers: true,
        footerText: '',
      });
      setError(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(txt|md)$/)) {
      setError('Please upload a .txt or .md file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        setContent(text);
        setError(null);
      } catch (err) {
        setError('Failed to read file. Please try again.');
      }
    };
    reader.readAsText(file);
  };

  const stats = getTextStats(content);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-transparent'} px-4 py-8`}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`mb-2 text-sm font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
              Workspace
            </p>
            <h1 className={`text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Create Your PDF
            </h1>
          </div>
          <p className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Write or paste your content below and customize it to your liking.
          </p>
        </div>

        {error && (
          <div className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 ${
            isDark
              ? 'border-red-800/70 bg-red-950/40 text-red-200'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}>
            <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className={`mb-8 cursor-pointer rounded-2xl border border-dashed p-8 transition-all ${
            isDark
              ? 'border-slate-700 bg-slate-900/60 hover:border-indigo-500/70 hover:bg-slate-900'
              : 'border-indigo-200 bg-indigo-50/80 hover:border-indigo-400 hover:bg-indigo-100'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-indigo-300 dark:ring-slate-700">
              <Upload size={22} />
            </div>
            <div>
              <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Upload a file or drag and drop
              </p>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Supported formats: .txt, .md
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <div className="h-96">
              <TextEditor
                content={content}
                onChange={setContent}
                onClear={() => setContent('')}
                isDark={isDark}
              />
            </div>

            <FormattingToolbar isDark={isDark} />

            <DocumentSettings
              settings={settings}
              onChange={setSettings}
              isDark={isDark}
            />
          </div>

          <div className="h-full lg:col-span-2">
            <div className="mb-4 lg:hidden">
              <button
                onClick={() => setShowMobilePreview(!showMobilePreview)}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:shadow-xl"
              >
                {showMobilePreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>

            {(showMobilePreview || true) && (
              <div className={`overflow-y-auto rounded-[24px] border p-6 shadow-xl ${
                isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/90'
              } lg:max-h-none`}>
                <PDFPreview
                  content={content}
                  settings={settings}
                  isDark={isDark}
                />
              </div>
            )}
          </div>
        </div>

        <ActionButtons
          onGeneratePDF={handleGeneratePDF}
          onPrint={handlePrint}
          onReset={handleReset}
          isDark={isDark}
          hasContent={content.trim().length > 0}
          isGenerating={isGenerating}
        />

        {content.trim() && (
          <div className={`mt-8 rounded-2xl border p-5 ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'}`}>
            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Document Summary: {stats.words} words • {stats.characters} characters • {stats.paragraphs} paragraphs
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
