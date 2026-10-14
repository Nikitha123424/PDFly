import React from 'react';
import { CheckCircle, Zap, Shield } from 'lucide-react';

interface AboutPageProps {
  isDark: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isDark }) => {
  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-transparent'} px-4 py-20`}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className={`mb-4 text-sm font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
            About PDFly
          </p>
          <h1 className={`text-4xl font-bold tracking-tight md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            A refined workflow for clean, professional PDFs.
          </h1>
          <p className={`mx-auto mt-5 max-w-2xl text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Built for speed, clarity, and control—so turning text into polished documents feels effortless.
          </p>
        </div>

        <div className={`mb-12 rounded-[28px] border p-8 shadow-xl ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/85'}`}>
          <h2 className={`mb-4 text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            What is PDFly?
          </h2>
          <p className={`text-lg leading-8 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            PDFly is a simple, web-based text-to-PDF generator that helps you turn ideas into professional-looking documents in seconds. It keeps the process streamlined, local, and focused on quality output.
          </p>
        </div>

        <div className="mb-12">
          <h2 className={`mb-8 text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Key features
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: CheckCircle,
                title: 'Simple & intuitive',
                description: 'A clean editor and minimal workflow make document creation feel effortless.',
              },
              {
                icon: Zap,
                title: 'Fast generation',
                description: 'Generate PDFs quickly with a smooth browser-based experience.',
              },
              {
                icon: Shield,
                title: 'Private by design',
                description: 'Your content stays local and secure while you work.',
              },
              {
                icon: CheckCircle,
                title: 'Customizable output',
                description: 'Adjust formatting, margins, and document structure to meet your standards.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border p-6 shadow-sm ${
                    isDark
                      ? 'border-slate-800 bg-slate-900/60'
                      : 'border-slate-200 bg-white/80'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className={`mb-2 text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {feature.title}
                      </h3>
                      <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`rounded-[28px] border p-8 shadow-xl ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/85'}`}>
          <h2 className={`mb-5 text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Built with
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'jsPDF', 'Lucide React'].map((tech) => (
              <div
                key={tech}
                className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                  isDark
                    ? 'border-slate-700 bg-slate-950 text-indigo-300'
                    : 'border-indigo-200 bg-indigo-50 text-indigo-700'
                }`}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-12 rounded-2xl border p-6 text-center ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/85'}`}>
          <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            PDFly is open-source and constantly improving. Made for people who want better documents, faster.
          </p>
        </div>
      </div>
    </div>
  );
};
