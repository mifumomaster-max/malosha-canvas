import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Download,
  FileImage,
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  Layers,
  Info
} from 'lucide-react';
import { PosterProject } from '../types/poster';
import { downloadPosterAsImage, downloadPosterAsPdf } from '../utils/canvasRenderer';

interface DownloadModalProps {
  project: PosterProject;
  isOpen: boolean;
  onClose: () => void;
}

type ExportFormat = 'png' | 'jpeg' | 'pdf' | 'json';

export const DownloadModal: React.FC<DownloadModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const [scale, setScale] = useState<number>(2); // Default to 2x (HD)
  const [format, setFormat] = useState<ExportFormat>('png');
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  const [quality, setQuality] = useState<number>(0.96);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const targetWidth = Math.round(project.width * scale);
  const targetHeight = Math.round(project.height * scale);
  const megaPixels = ((targetWidth * targetHeight) / 1000000).toFixed(1);

  const handleDownload = async () => {
    setIsExporting(true);
    setDownloadSuccess(false);

    try {
      if (format === 'json') {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute('href', dataStr);
        dlAnchor.setAttribute('download', `${project.title || 'bango_kiolezo'}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
      } else if (format === 'pdf') {
        await downloadPosterAsPdf(project, scale);
      } else {
        await downloadPosterAsImage(
          project,
          format,
          scale,
          quality,
          transparentBg && format === 'png'
        );
      }

      setDownloadSuccess(true);
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Failed to export high-res poster:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Download className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-outfit">
                Pakua Bango kwa Ubora wa Juu (High Resolution)
              </h2>
              <p className="text-xs text-neutral-400">
                Pata picha safi, angavu na yenye ubora unaofaa kuchapishwa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">
          {/* Format selector */}
          <div>
            <label className="text-xs font-bold text-neutral-300 block mb-2">
              1. Chagua Umbizo la Faili (File Format):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                {
                  id: 'png' as ExportFormat,
                  label: 'PNG',
                  desc: 'Ubora wa Juu Kabisa (Lossless)',
                  icon: FileImage
                },
                {
                  id: 'jpeg' as ExportFormat,
                  label: 'JPG',
                  desc: 'Inafaa kwa mitandao',
                  icon: FileImage
                },
                {
                  id: 'pdf' as ExportFormat,
                  label: 'PDF Print',
                  desc: 'Tayari kwa Uchapaji',
                  icon: Printer
                },
                {
                  id: 'json' as ExportFormat,
                  label: 'Mradi',
                  desc: 'Hifadhi Kiolezo',
                  icon: FileText
                }
              ].map((f) => {
                const Icon = f.icon;
                const isSelected = format === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                        : 'bg-neutral-800/60 border-neutral-700/80 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-amber-400' : 'text-neutral-400'}`} />
                    <div>
                      <span className="text-xs font-bold block">{f.label}</span>
                      <span className="text-[10px] text-neutral-400 leading-tight block mt-0.5">
                        {f.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resolution Multiplier */}
          {format !== 'json' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-300">
                  2. Kiwango cha Ubora (Resolution Multiplier):
                </label>
                <span className="text-xs font-mono text-amber-400 font-semibold tabular-nums">
                  {targetWidth} × {targetHeight} px ({megaPixels} MP)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    mult: 1,
                    title: '1x Kawaida',
                    badge: 'Web 72 DPI',
                    desc: 'Wepesi kwa simu & WhatsApp'
                  },
                  {
                    mult: 2,
                    title: '2x HD Bora',
                    badge: 'HD 150 DPI',
                    desc: 'Mkali sana mtandaoni'
                  },
                  {
                    mult: 3,
                    title: '3x Ultra 4K',
                    badge: 'UHD 220 DPI',
                    desc: 'Angavu kwenye skrini kubwa'
                  },
                  {
                    mult: 4,
                    title: '4x Kiwandani',
                    badge: 'Print 300 DPI',
                    desc: 'Ubora kamili wa kuchapisha!'
                  }
                ].map((tier) => {
                  const isSelected = scale === tier.mult;
                  return (
                    <button
                      key={tier.mult}
                      onClick={() => setScale(tier.mult)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-white ring-1 ring-amber-400/50 shadow'
                          : 'bg-neutral-800/60 border-neutral-700/80 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold">{tier.title}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-semibold block ${
                            isSelected ? 'text-amber-300' : 'text-neutral-400'
                          }`}
                        >
                          {tier.badge}
                        </span>
                        <span className="text-[10px] text-neutral-400 block mt-0.5 leading-tight">
                          {tier.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra options */}
          <div className="bg-neutral-950/60 rounded-xl p-3.5 border border-neutral-800 flex flex-col gap-2.5 text-xs text-neutral-300">
            {format === 'png' && (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={transparentBg}
                  onChange={(e) => setTransparentBg(e.target.checked)}
                  className="rounded border-neutral-700 text-amber-400 focus:ring-0 w-4 h-4 accent-amber-400"
                />
                <span>Mandhari Wazi (Transparent Background - ondoa rangi ya nyuma)</span>
              </label>
            )}

            {format === 'jpeg' && (
              <div className="flex items-center justify-between gap-4">
                <span>Ubora wa Picha (JPEG Quality):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0.7"
                    max="1"
                    step="0.02"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="accent-amber-400 w-28"
                  />
                  <span className="font-mono text-neutral-300 tabular-nums">
                    {Math.round(quality * 100)}%
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 text-neutral-400 text-[11px] leading-relaxed pt-1">
              <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <span>
                {scale >= 3
                  ? 'Ukubwa wa 3x/4x hutoa picha yenye mamilioni ya pixels (Megapixels nyingi) inayohakikisha mistari, maandishi na picha havipotezi ubora hata yakichapishwa kwenye bango kubwa la mtaani.'
                  : 'Ukubwa huu ni mzuri sana kwa machapisho ya haraka ya mitandao ya kijamii.'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Funga
          </button>

          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Inatengeneza Bango la Ubora wa Juu...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Limepakuliwa! Pakua Tena</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>
                  Pakua {format.toUpperCase()} ({scale}x - {targetWidth}×{targetHeight}px)
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
