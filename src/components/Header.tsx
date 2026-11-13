import React, { useState } from 'react';
import {
  Download,
  Cloud,
  FolderHeart,
  HelpCircle,
  Layers,
  Menu,
  X,
  Award,
  Image as ImageIcon,
  Sparkles,
  Stamp,
  FilePlus2,
  BookmarkPlus
} from 'lucide-react';
import type { SidebarTab } from './Sidebar';
import { PWAInstallButton } from './PWAInstallBanner';

interface HeaderProps {
  onOpenDownload: () => void;
  onOpenSavedProjects: () => void;
  onOpenFirebaseHosting: () => void;
  onOpenTemplatesTab: () => void;
  onOpenHelp: () => void;
  onOpenSidebarTool?: (tab: SidebarTab, subTab?: 'bg' | 'effects' | 'watermark') => void;
  onOpenNewBlankModal?: () => void;
  onOpenSaveAsTemplateModal?: () => void;
}

export const Header: React.FC<HeaderProps> = React.memo(({
  onOpenDownload,
  onOpenSavedProjects,
  onOpenFirebaseHosting,
  onOpenTemplatesTab,
  onOpenHelp,
  onOpenSidebarTool,
  onOpenNewBlankModal,
  onOpenSaveAsTemplateModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative h-14 bg-neutral-900 border-b border-neutral-800 px-3 md:px-6 flex items-center justify-between gap-3 md:gap-8 z-30 shrink-0">
      {/* Zone 1: Mobile menu button + Brand wordmark */}
      <div className="flex items-center gap-2 min-w-0 shrink">
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          aria-label="Fungua menyu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <span className="text-base md:text-lg font-bold tracking-tight text-white font-outfit whitespace-nowrap truncate select-none">
          Malosha Poster Studio
        </span>
      </div>

      {/* Zone 2: Desktop navigation links (single line, clean typography) */}
      <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-neutral-300">
        {onOpenNewBlankModal && (
          <button
            onClick={onOpenNewBlankModal}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs font-bold text-amber-400 cursor-pointer"
          >
            <FilePlus2 className="w-4 h-4" />
            <span>Anza Mpya</span>
          </button>
        )}
        <button
          onClick={onOpenTemplatesTab}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        >
          <Layers className="w-4 h-4 text-neutral-400" />
          <span>Violezo</span>
        </button>
        {onOpenSaveAsTemplateModal && (
          <button
            onClick={onOpenSaveAsTemplateModal}
            className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 cursor-pointer"
          >
            <BookmarkPlus className="w-4 h-4" />
            <span>+ Kiolezo Chako</span>
          </button>
        )}
        <button
          onClick={onOpenSavedProjects}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        >
          <FolderHeart className="w-4 h-4 text-neutral-400" />
          <span>Mabango Yangu</span>
        </button>
        <button
          onClick={onOpenFirebaseHosting}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 hidden lg:flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
        >
          <Cloud className="w-4 h-4" />
          <span>Hosting</span>
        </button>
        <button
          onClick={onOpenHelp}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 hidden xl:flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-neutral-400" />
          <span>Mwongozo</span>
        </button>
      </nav>

      {/* Zone 3: Install App + Primary Action */}
      <div className="flex items-center gap-2 shrink-0">
        <PWAInstallButton compact />
        <button
          onClick={onOpenDownload}
          className="min-h-[40px] md:min-h-0 px-3 md:px-4 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5 md:gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span className="sm:hidden">Pakua HD</span>
          <span className="hidden sm:inline">Pakua kwa Ubora wa Juu</span>
        </button>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-14 bg-black/60 backdrop-blur-xs z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-14 left-0 right-0 bg-neutral-900 border-b border-neutral-800 p-3 flex flex-col gap-1.5 z-50 md:hidden shadow-2xl max-h-[75dvh] overflow-y-auto">
            {(onOpenNewBlankModal || onOpenSaveAsTemplateModal) && (
              <div className="grid grid-cols-2 gap-1.5 pb-2 mb-1 border-b border-neutral-800">
                {onOpenNewBlankModal && (
                  <button
                    onClick={() => {
                      onOpenNewBlankModal();
                      setMobileMenuOpen(false);
                    }}
                    className="min-h-[42px] px-3 rounded-xl bg-amber-400/15 border border-amber-400/30 text-left text-xs font-bold text-amber-300 flex items-center gap-2 cursor-pointer"
                  >
                    <FilePlus2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">Anza Mpya (Blank)</span>
                  </button>
                )}
                {onOpenSaveAsTemplateModal && (
                  <button
                    onClick={() => {
                      onOpenSaveAsTemplateModal();
                      setMobileMenuOpen(false);
                    }}
                    className="min-h-[42px] px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-left text-xs font-bold text-emerald-300 flex items-center gap-2 cursor-pointer"
                  >
                    <BookmarkPlus className="w-4 h-4 shrink-0" />
                    <span className="truncate">+ Kwenye Violezo</span>
                  </button>
                )}
              </div>
            )}

            {onOpenSidebarTool && (
              <div className="grid grid-cols-2 gap-1.5 pb-2 mb-1 border-b border-neutral-800">
                <button
                  onClick={() => {
                    onOpenSidebarTool('logos');
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[42px] px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-left text-xs font-semibold text-neutral-100 flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Nembo &amp; Logo</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSidebarTool('photos');
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[42px] px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-left text-xs font-semibold text-neutral-100 flex items-center gap-2 cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Picha &amp; Pakia</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSidebarTool('background', 'effects');
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[42px] px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-left text-xs font-semibold text-neutral-100 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Athari za Rangi</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSidebarTool('background', 'watermark');
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[42px] px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-left text-xs font-semibold text-neutral-100 flex items-center gap-2 cursor-pointer"
                >
                  <Stamp className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Watermark</span>
                </button>
              </div>
            )}

            <button
              onClick={() => {
                onOpenTemplatesTab();
                setMobileMenuOpen(false);
              }}
              className="min-h-[44px] px-3 rounded-xl hover:bg-neutral-800 text-left text-sm font-semibold text-neutral-100 flex items-center gap-3 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Violezo 1,000 vya Kisasa</span>
            </button>
            <button
              onClick={() => {
                onOpenSavedProjects();
                setMobileMenuOpen(false);
              }}
              className="min-h-[44px] px-3 rounded-xl hover:bg-neutral-800 text-left text-sm font-semibold text-neutral-100 flex items-center gap-3 cursor-pointer"
            >
              <FolderHeart className="w-4 h-4 text-amber-400" />
              <span>Mabango Yangu</span>
            </button>
            <button
              onClick={() => {
                onOpenFirebaseHosting();
                setMobileMenuOpen(false);
              }}
              className="min-h-[44px] px-3 rounded-xl hover:bg-neutral-800 text-left text-sm font-semibold text-amber-400 flex items-center gap-3 cursor-pointer"
            >
              <Cloud className="w-4 h-4 text-amber-400" />
              <span>Firebase Hosting (Spark Plan)</span>
            </button>
            <button
              onClick={() => {
                onOpenHelp();
                setMobileMenuOpen(false);
              }}
              className="min-h-[44px] px-3 rounded-xl hover:bg-neutral-800 text-left text-sm font-semibold text-neutral-100 flex items-center gap-3 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-neutral-400" />
              <span>Mwongozo wa Ubora</span>
            </button>
          </div>
        </>
      )}
    </header>
  );
});
