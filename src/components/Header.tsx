import React from 'react';
import { Download, Cloud, FolderHeart, HelpCircle, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenDownload: () => void;
  onOpenSavedProjects: () => void;
  onOpenFirebaseHosting: () => void;
  onOpenTemplatesTab: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDownload,
  onOpenSavedProjects,
  onOpenFirebaseHosting,
  onOpenTemplatesTab,
  onOpenHelp
}) => {
  return (
    <header className="h-14 bg-neutral-900 border-b border-neutral-800 px-6 flex items-center justify-between gap-8 z-30 shrink-0">
      {/* Zone 1: Brand wordmark (single line, no descriptor) */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white font-outfit whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Malosha Poster Studio
        </a>
      </div>

      {/* Zone 2: Navigation links (single line, clean typography) */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
        <button
          onClick={onOpenTemplatesTab}
          className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 text-xs font-semibold"
        >
          <Layers className="w-4 h-4 text-neutral-400" />
          <span>Violezo vya Kisasa</span>
        </button>
        <button
          onClick={onOpenSavedProjects}
          className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 text-xs font-semibold"
        >
          <FolderHeart className="w-4 h-4 text-neutral-400" />
          <span>Mabango Yangu</span>
        </button>
        <button
          onClick={onOpenFirebaseHosting}
          className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
        >
          <Cloud className="w-4 h-4" />
          <span>Firebase Hosting</span>
        </button>
        <button
          onClick={onOpenHelp}
          className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 text-xs font-semibold"
        >
          <HelpCircle className="w-4 h-4 text-neutral-400" />
          <span>Mwongozo wa Ubora</span>
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenDownload}
          className="px-4 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Pakua kwa Ubora wa Juu</span>
        </button>
      </div>
    </header>
  );
};
