import React, { useState, useEffect } from 'react';
import {
  MonitorSmartphone,
  Download,
  X,
  Share,
  PlusSquare,
  MoreVertical,
  WifiOff,
  CheckCircle2,
  Monitor
} from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

const DISMISS_SESSION_KEY = 'malosha_pwa_banner_dismissed';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS: boolean;
  isMobile: boolean;
  isMac: boolean;
  isSafari: boolean;
  isInIframe: boolean;
  isInstallable: boolean;
  onTriggerNativeInstall: () => Promise<boolean>;
}

const InstallGuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  isIOS,
  isMobile,
  isMac,
  isSafari,
  isInIframe,
  isInstallable,
  onTriggerNativeInstall
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-neutral-900 border border-amber-400/35 p-5 shadow-2xl text-white"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/pwa-192x192.png"
              alt="Malosha App Icon"
              className="w-12 h-12 rounded-xl border border-amber-400/40 shadow-md shrink-0"
            />
            <div>
              <h3 className="text-sm font-extrabold text-white">
                Sakinisha Malosha Poster Studio
              </h3>
              <p className="text-[11px] text-neutral-400">
                {isMobile
                  ? 'Tumia kama Mobile App halisi kwenye simu yako'
                  : 'Tumia kama Programu kamili (Desktop App) kwenye kompyuta yako'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Funga"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-2.5 text-xs text-neutral-200">
          {isInstallable ? (
            <button
              type="button"
              onClick={async () => {
                const ok = await onTriggerNativeInstall();
                if (ok) onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>
                {isMobile ? 'Sakinisha App Kwenye Simu' : 'Sakinisha App Kwenye Kompyuta'}
              </span>
            </button>
          ) : isIOS ? (
            <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="leading-relaxed">
                  Gusa alama ya{' '}
                  <strong className="text-amber-300 inline-flex items-center gap-1">
                    <Share className="w-3.5 h-3.5 inline" /> Share
                  </strong>{' '}
                  chini au juu kwenye kivinjari cha <strong>Safari</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="leading-relaxed">
                  Shuka chini kisha chagua{' '}
                  <strong className="text-amber-300 inline-flex items-center gap-1">
                    <PlusSquare className="w-3.5 h-3.5 inline" /> Add to Home Screen
                  </strong>
                  , kisha bonyeza <strong>Add</strong>.
                </p>
              </div>
            </div>
          ) : !isMobile && isMac && isSafari ? (
            <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="leading-relaxed">
                  Kwenye <strong>Safari (Mac)</strong>, bonyeza menyu ya juu{' '}
                  <strong className="text-amber-300">File</strong> (au alama ya Share).
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="leading-relaxed">
                  Chagua <strong className="text-amber-300">Add to Dock...</strong> — ikoni ya{' '}
                  <strong>Malosha</strong> itakaa moja kwa moja kwenye Dock ya Mac yako!
                </p>
              </div>
            </div>
          ) : !isMobile ? (
            <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="leading-relaxed">
                  Kwenye <strong>Google Chrome</strong> au <strong>Microsoft Edge</strong>, tazama
                  upande wa kulia wa sehemu ya anwani (Address Bar) na ubofye ikoni ya{' '}
                  <strong className="text-amber-300 inline-flex items-center gap-1">
                    <Monitor className="w-3.5 h-3.5 inline" /> Install App
                  </strong>
                  .
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="leading-relaxed">
                  Au bofya nukta tatu{' '}
                  <strong className="text-amber-300 inline-flex items-center gap-0.5">
                    <MoreVertical className="w-3.5 h-3.5 inline" /> (Menu)
                  </strong>{' '}
                  → <strong className="text-amber-300">Cast, save, and share</strong> (au{' '}
                  <strong>Apps</strong>) →{' '}
                  <strong className="text-amber-300">Install Malosha Poster Studio</strong>.
                </p>
              </div>
              {isInIframe && (
                <p className="text-[11px] text-amber-300/90 bg-amber-400/10 border border-amber-400/25 rounded-lg p-2 leading-relaxed">
                  Kidokezo: Ukiwa ndani ya dirisha la hakikisho (Preview), fungua link yako kwenye
                  tab mpya au tovuti ya Firebase Hosting ili kitufe cha kuinstall moja kwa moja
                  kitokee.
                </p>
              )}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="leading-relaxed">
                  Gusa nukta tatu{' '}
                  <strong className="text-amber-300 inline-flex items-center gap-0.5">
                    <MoreVertical className="w-3.5 h-3.5 inline" /> (Menu)
                  </strong>{' '}
                  kona ya juu kulia mwa kivinjari chako (Chrome / Edge).
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="leading-relaxed">
                  Chagua <strong className="text-amber-300">Install app</strong> au{' '}
                  <strong className="text-amber-300">Add to Home screen</strong> — ikoni ya Malosha
                  itakaa moja kwa moja kwenye simu yako!
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Inafanya kazi pia bila mtandao (Offline) &amp; haina matangazo.</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs cursor-pointer"
        >
          Nimeelewa / Funga
        </button>
      </div>
    </div>
  );
};

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, isMobile, isMac, isSafari, isInIframe, install } =
    usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        setShowGuide(true);
      }
      return;
    }
    setShowGuide(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center gap-1.5 rounded-lg border border-amber-400/50 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 font-bold transition-colors cursor-pointer shrink-0 ${
          compact ? 'min-h-[40px] px-2.5 py-1.5 text-[11px]' : 'px-3 py-1.5 text-xs'
        }`}
        title="Sakinisha kama App kwenye Kompyuta au Simu"
      >
        <MonitorSmartphone className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">Sakinisha App</span>
        <span className="sm:hidden">App</span>
      </button>

      <InstallGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        isIOS={isIOS}
        isMobile={isMobile}
        isMac={isMac}
        isSafari={isSafari}
        isInIframe={isInIframe}
        isInstallable={isInstallable}
        onTriggerNativeInstall={install}
      />
    </>
  );
};

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isMobile, isMac, isSafari, isInIframe, install } =
    usePWAInstall();
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(DISMISS_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [visible, setVisible] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Auto-show install notification on BOTH Computer & Mobile shortly after opening the link
  useEffect(() => {
    if (isInstalled || dismissed) {
      setVisible(false);
      return;
    }
    const delay = isInstallable ? 450 : 950;
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isInstalled, dismissed, isInstallable]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_SESSION_KEY, '1');
    } catch {
      // Ignore storage error
    }
  };

  const handleInstallNow = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        setVisible(false);
        return;
      }
    }
    setShowGuide(true);
  };

  if (isInstalled || (!visible && !showGuide)) {
    return null;
  }

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-label="Arifa ya kusakinisha app kwenye kompyuta au simu"
          className="fixed top-16 right-3 left-3 sm:left-auto sm:right-4 sm:w-[395px] z-[60] animate-in fade-in slide-in-from-top-3 duration-300"
        >
          <div className="bg-neutral-900/95 backdrop-blur-md border border-amber-400/60 rounded-2xl p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.75)] flex items-center gap-3">
            <img
              src="/pwa-192x192.png"
              alt="Malosha Poster Studio Icon"
              className="w-12 h-12 rounded-xl border border-amber-400/40 shadow-md shrink-0 object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-extrabold text-white truncate">
                  Sakinisha Malosha App
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black text-[9px] font-black uppercase">
                  {isMobile ? 'SIMU' : 'KOMPYUTA'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-snug mt-0.5">
                {isMobile
                  ? 'Weka ikoni ya studio kwenye simu yako ufungue haraka kama app halisi!'
                  : 'Weka app kwenye kompyuta yako (Desktop) ifunguke kwenye dirisha lake kama programu kamili!'}
              </p>
              <div className="flex items-center gap-2 mt-2.5">
                <button
                  type="button"
                  onClick={handleInstallNow}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-extrabold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>
                    {isInstallable
                      ? 'Sakinisha Sasa'
                      : isIOS
                        ? 'Sakinisha (iPhone)'
                        : isMobile
                          ? 'Weka Kwenye Simu'
                          : 'Weka Kwenye Kompyuta'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-semibold cursor-pointer"
                >
                  Baadaye
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 self-start cursor-pointer"
              aria-label="Funga arifa"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <InstallGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        isIOS={isIOS}
        isMobile={isMobile}
        isMac={isMac}
        isSafari={isSafari}
        isInIframe={isInIframe}
        isInstallable={isInstallable}
        onTriggerNativeInstall={install}
      />
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-3 z-50 flex items-center gap-2 rounded-xl bg-amber-500 px-3 py-1.5 text-[11px] font-bold text-black shadow-xl">
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>Hali ya Offline — Studio inaendelea kufanya kazi!</span>
    </div>
  );
};
