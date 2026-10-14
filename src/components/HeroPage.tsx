import React from 'react';
import { ArrowRight, FileText, Zap, Lock, Settings2, Download, Copy, ArrowUpRight } from 'lucide-react';

interface HeroPageProps {
  isDark: boolean;
  onCreateClick: () => void;
}

export const HeroPage: React.FC<HeroPageProps> = ({ isDark, onCreateClick }) => {
  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-transparent'}`}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-indigo-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500">
                <FileText size={16} className="text-white" />
              </div>
              Professional document tools
            </div>

            <h1 className={`max-w-xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Turn plain text into
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent">
                polished PDFs
              </span>
            </h1>

            <p className={`mt-6 max-w-xl text-lg leading-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Create clean, client-side PDF documents in seconds with a premium workflow built for speed, privacy, and professional output.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={onCreateClick}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get started
                <ArrowRight size={18} />
              </button>
              <button
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-base font-semibold ${
                  isDark
                    ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600 hover:bg-slate-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                View features
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className={`mt-8 flex flex-wrap items-center gap-6 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-indigo-500" />
                Secure & private
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-indigo-500" />
                Instant output
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-indigo-500" />
                No watermarks
              </div>
            </div>
          </div>

          <div className={`rounded-[28px] border p-5 shadow-2xl ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white/90'}`}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Document preview
                  </p>
                  <h3 className={`mt-2 text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Quarterly Brief
                  </h3>
                </div>
                <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Ready
                </div>
              </div>

              <div className="space-y-4">
                <div className={`rounded-xl border p-4 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`text-xs font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Summary
                    </span>
                    <span className="text-xs text-indigo-500">12 pages</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 w-4/5 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="h-2.5 w-11/12 rounded-full bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Words', value: '1.8k' },
                    { label: 'Format', value: 'A4' },
                    { label: 'Style', value: 'Pro' },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-xl border p-3 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                      <div className={`text-[11px] uppercase tracking-[0.15em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {stat.label}
                      </div>
                      <div className={`mt-2 text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`rounded-xl border p-4 ${isDark ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-indigo-200 bg-indigo-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Final export quality
                    </span>
                    <span className="text-sm font-semibold text-indigo-600">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FileText,
              title: 'Easy to use',
              description: 'Create polished documents with a clean, focused editor built for speed.',
            },
            {
              icon: Zap,
              title: 'Lightning fast',
              description: 'Generate and export PDFs in moments without leaving the browser.',
            },
            {
              icon: Lock,
              title: 'Private by default',
              description: 'Everything runs locally, keeping your content secure and under control.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 shadow-sm ${
                isDark
                  ? 'border-slate-800 bg-slate-900/60'
                  : 'border-slate-200 bg-white/80'
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500">
                <feature.icon size={22} className="text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {feature.title}
              </h3>
              <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-20 rounded-[30px] border p-8 shadow-xl ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/80'}`}>
          <div className="mb-8 text-center">
            <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
              Why teams choose PDFly
            </p>
            <h2 className={`mt-3 text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Premium essentials for every document
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: Settings2, title: 'Full customization', desc: 'Fine-tune page size, spacing, and formatting for a more professional finish.' },
              { icon: Download, title: 'Multiple export options', desc: 'Generate ready-to-share PDFs with a fast, streamlined workflow.' },
              { icon: Copy, title: 'Template-ready workflow', desc: 'Build repeatable layouts and keep your document structure consistent.' },
              { icon: Zap, title: 'Optimized output', desc: 'Fast rendering and clean formatting make production-ready exports easy.' },
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/80">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <feature.icon size={20} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
