import React from 'react';
import { FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onThemeToggle,
  onNavigate,
  currentPage,
}) => {
  return (
    <nav
      className={`${
        isDark
          ? 'border-slate-800/80 bg-slate-950/80'
          : 'border-slate-200/80 bg-white/80'
      } sticky top-0 z-50 border-b backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => onNavigate('home')}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 shadow-lg shadow-indigo-500/20">
            <FileText size={22} className="text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text">
              PDFly
            </span>
          </div>
        </div>

        <div
          className={`hidden items-center gap-2 rounded-full border px-2 py-2 md:flex ${
            isDark
              ? 'border-slate-800 bg-slate-900/70'
              : 'border-slate-200 bg-slate-50/90'
          }`}
        >
          {[
            { name: 'Home', id: 'home' },
            { name: 'Create PDF', id: 'create' },
            { name: 'About', id: 'about' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                currentPage === item.id
                  ? isDark
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
      </div>
    </nav>
  );
};
