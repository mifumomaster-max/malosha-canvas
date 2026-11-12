import React, { useState, useEffect } from 'react';
import {
  PosterElement,
  TextElement,
  ShapeElement,
  ImageElement,
  BadgeElement,
  QrCodeElement,
  ChartElement,
  BlendMode,
  ChartType
} from '../types/poster';
import { IMAGE_COLOR_PRESETS } from '../data/colorEffects';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  BringToFront,
  SendToBack,
  Copy,
  Trash2,
  Lock,
  Unlock,
  Sun,
  Contrast,
  Eye,
  Edit3,
  FlipHorizontal2,
  FlipVertical2,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  Grid,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface PropertyToolbarProps {
  selectedElement: PosterElement | null;
  canvasWidth: number;
  canvasHeight: number;
  onUpdateElement: (updated: Partial<PosterElement>, commit?: boolean) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onBringForward: (id: string) => void;
  onSendBackward: (id: string) => void;
  onBringToFront: (id: string) => void;
  onSendToBack: (id: string) => void;
  onOpenChartModal?: () => void;
  onRequestEditText?: (id: string) => void;
}

export const PropertyToolbar: React.FC<PropertyToolbarProps> = React.memo(({
  selectedElement,
  canvasWidth,
  canvasHeight,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onOpenChartModal,
  onRequestEditText
}) => {
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);

  useEffect(() => {
    if (!selectedElement) {
      setMobileInspectorOpen(false);
    }
  }, [selectedElement]);

  if (!selectedElement) {
    return (
      <div className="h-9 md:h-10 bg-neutral-900/60 border-b border-neutral-800/80 px-3 md:px-4 flex items-center justify-between text-[11px] md:text-xs text-neutral-500 shrink-0">
        <span className="truncate">
          Gusa kipengele kwenye bango kuhariri rangi, grafu, au mpangilio
        </span>
        <span className="hidden md:inline font-mono text-[11px] shrink-0">
          Bofya mara mbili kubadili maandishi moja kwa moja
        </span>
      </div>
    );
  }

  const isLocked = !!selectedElement.isLocked;

  const centerHorizontal = () => {
    onUpdateElement({ x: Math.round((canvasWidth - selectedElement.width) / 2) });
  };

  const centerVertical = () => {
    onUpdateElement({ y: Math.round((canvasHeight - selectedElement.height) / 2) });
  };

  const elementTypeLabel =
    selectedElement.type === 'text'
      ? 'Maandishi'
      : selectedElement.type === 'chart'
        ? 'Grafu / Chati'
        : selectedElement.type === 'shape'
          ? 'Umbo'
          : selectedElement.type === 'image'
            ? 'Picha'
            : selectedElement.type === 'badge'
              ? 'Beji'
              : 'QR Code';

  return (
    <>
      {/* MOBILE CONTEXTUAL QUICK BAR (Fits 100% inside mobile screen, zero cutoff) */}
      <div className="flex md:hidden items-center justify-between gap-1.5 px-2.5 py-1.5 bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-200 z-20 shrink-0 w-full">
        <div className="flex items-center gap-1.5 min-w-0">
          {selectedElement.type === 'text' && onRequestEditText && (
            <button
              onClick={() => onRequestEditText(selectedElement.id)}
              className="min-h-[34px] px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Andika</span>
            </button>
          )}
          {selectedElement.type === 'chart' && onOpenChartModal && (
            <button
              onClick={onOpenChartModal}
              className="min-h-[34px] px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Takwimu</span>
            </button>
          )}

          <button
            onClick={() => setMobileInspectorOpen((prev) => !prev)}
            className={`min-h-[34px] px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 ${
              mobileInspectorOpen
                ? 'bg-amber-400 text-black border-amber-400 font-bold'
                : 'bg-neutral-800 text-neutral-100 border-neutral-700'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sifa ({elementTypeLabel})</span>
          </button>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onUpdateElement({ isLocked: !isLocked })}
            className={`min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg border cursor-pointer ${
              isLocked
                ? 'bg-amber-400 text-black border-amber-400'
                : 'bg-neutral-800 border-neutral-700 text-neutral-300'
            }`}
            aria-label={isLocked ? 'Fungua' : 'Funga'}
          >
            {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDuplicateElement(selectedElement.id)}
            className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 cursor-pointer"
            aria-label="Nakili"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeleteElement(selectedElement.id)}
            className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg bg-neutral-800 border border-red-900/60 text-red-400 cursor-pointer"
            aria-label="Futa"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MOBILE WRAPPING INSPECTOR SHEET (Zero horizontal overflow, thumb-friendly grids) */}
      {mobileInspectorOpen && (
        <div
          className="md:hidden fixed inset-0 bottom-16 z-35 flex flex-col justify-end overscroll-none"
          onClick={() => setMobileInspectorOpen(false)}
        >
          <div className="flex-1 bg-black/50 backdrop-blur-xs" />
          <div
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="bg-neutral-900 border-t border-neutral-800 rounded-t-3xl shadow-2xl max-h-[60dvh] flex flex-col overflow-hidden overscroll-contain"
          >
            <div className="px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Hariri {elementTypeLabel}</span>
              </div>
              <button
                onClick={() => setMobileInspectorOpen(false)}
                className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                aria-label="Funga Sifa"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className="p-4 pb-6 overflow-y-auto overscroll-contain touch-pan-y flex flex-col gap-3.5 text-xs text-neutral-200"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Mobile Text Inspector */}
              {selectedElement.type === 'text' && (
                <div className="flex flex-col gap-2.5 p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-neutral-400 block mb-1">Aina ya Fonti</span>
                      <select
                        value={(selectedElement as TextElement).fontFamily || 'Plus Jakarta Sans'}
                        onChange={(e) => onUpdateElement({ fontFamily: e.target.value })}
                        className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-2 py-2 text-xs"
                      >
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                        <option value="Outfit">Outfit (Kisasa)</option>
                        <option value="Anton">Anton (Herufi Nzito)</option>
                        <option value="Bebas Neue">Bebas Neue (Bango)</option>
                        <option value="Playfair Display">Playfair (Kifahari)</option>
                        <option value="Bricolage Grotesque">Bricolage</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block mb-1">Ukubwa &amp; Rangi</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={(selectedElement as TextElement).fontSize || 32}
                          onChange={(e) =>
                            onUpdateElement({ fontSize: Number(e.target.value) || 12 }, false)
                          }
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-2 py-2 text-xs text-white font-mono text-center"
                        />
                        <input
                          type="color"
                          value={(selectedElement as TextElement).color || '#ffffff'}
                          onChange={(e) => onUpdateElement({ color: e.target.value }, false)}
                          className="w-9 h-9 rounded-lg cursor-pointer bg-neutral-800 border border-neutral-700 p-0.5 shrink-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5">
                    <button
                      onClick={() => {
                        const cur = (selectedElement as TextElement).fontWeight;
                        onUpdateElement({ fontWeight: cur === 900 || cur === 'bold' ? 400 : 900 });
                      }}
                      className={`py-2 rounded-lg border flex items-center justify-center ${
                        (selectedElement as TextElement).fontWeight === 900 ||
                        (selectedElement as TextElement).fontWeight === 'bold'
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const cur = (selectedElement as TextElement).fontStyle;
                        onUpdateElement({ fontStyle: cur === 'italic' ? 'normal' : 'italic' });
                      }}
                      className={`py-2 rounded-lg border flex items-center justify-center ${
                        (selectedElement as TextElement).fontStyle === 'italic'
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const cur = (selectedElement as TextElement).textDecoration;
                        onUpdateElement({
                          textDecoration: cur === 'underline' ? 'none' : 'underline'
                        });
                      }}
                      className={`py-2 rounded-lg border flex items-center justify-center ${
                        (selectedElement as TextElement).textDecoration === 'underline'
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                    {(['left', 'center', 'right'] as const).map((align) => {
                      const Icon =
                        align === 'left'
                          ? AlignLeft
                          : align === 'center'
                            ? AlignCenter
                            : AlignRight;
                      const isAct = (selectedElement as TextElement).textAlign === align;
                      return (
                        <button
                          key={align}
                          onClick={() => onUpdateElement({ textAlign: align })}
                          className={`py-2 rounded-lg border flex items-center justify-center ${
                            isAct
                              ? 'bg-amber-400 text-black border-amber-400'
                              : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => {
                        const hasShadow = !!(selectedElement as TextElement).shadowColor;
                        onUpdateElement({
                          shadowColor: hasShadow ? undefined : '#000000',
                          shadowBlur: hasShadow ? 0 : 16,
                          shadowOffsetY: hasShadow ? 0 : 4
                        });
                      }}
                      className={`py-2 rounded-lg border text-[11px] font-semibold ${
                        (selectedElement as TextElement).shadowColor
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      Kivuli
                    </button>
                    <button
                      onClick={() => {
                        const hasStroke = !!(selectedElement as TextElement).strokeWidth;
                        onUpdateElement({
                          strokeColor: hasStroke ? undefined : '#000000',
                          strokeWidth: hasStroke ? 0 : 2
                        });
                      }}
                      className={`py-2 rounded-lg border text-[11px] font-semibold ${
                        (selectedElement as TextElement).strokeWidth
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      Ukingo
                    </button>
                    <button
                      onClick={() => {
                        const hasBg = !!(selectedElement as TextElement).backgroundColor;
                        onUpdateElement({
                          backgroundColor: hasBg ? undefined : 'rgba(15, 23, 42, 0.85)',
                          borderRadius: hasBg ? 0 : 10
                        });
                      }}
                      className={`py-2 rounded-lg border text-[11px] font-semibold ${
                        (selectedElement as TextElement).backgroundColor
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      Kasha
                    </button>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[11px] text-neutral-400 shrink-0">Nafasi Herufi:</span>
                    <input
                      type="range"
                      min="-2"
                      max="16"
                      value={(selectedElement as TextElement).letterSpacing || 0}
                      onChange={(e) =>
                        onUpdateElement({ letterSpacing: Number(e.target.value) }, false)
                      }
                      className="w-full accent-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Shape Inspector */}
              {selectedElement.type === 'shape' && (
                <div className="flex flex-col gap-2.5 p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-2">
                      <span className="text-[11px] text-neutral-300">Rangi Ndani</span>
                      <input
                        type="color"
                        value={(selectedElement as ShapeElement).fillColor || '#ffffff'}
                        onChange={(e) => onUpdateElement({ fillColor: e.target.value }, false)}
                        className="w-6 h-6 rounded bg-transparent border-0"
                      />
                    </label>
                    <label className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-2">
                      <span className="text-[11px] text-neutral-300">Rangi Ukingo</span>
                      <input
                        type="color"
                        value={(selectedElement as ShapeElement).strokeColor || '#000000'}
                        onChange={(e) =>
                          onUpdateElement(
                            {
                              strokeColor: e.target.value,
                              strokeWidth: (selectedElement as ShapeElement).strokeWidth || 3
                            },
                            false
                          )
                        }
                        className="w-6 h-6 rounded bg-transparent border-0"
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-neutral-400 w-24 shrink-0">Unene Ukingo:</span>
                    <input
                      type="range"
                      min="0"
                      max="16"
                      value={(selectedElement as ShapeElement).strokeWidth || 0}
                      onChange={(e) =>
                        onUpdateElement({ strokeWidth: Number(e.target.value) }, false)
                      }
                      className="w-full accent-amber-400"
                    />
                  </div>
                  {((selectedElement as ShapeElement).shapeType === 'rectangle' ||
                    (selectedElement as ShapeElement).shapeType === 'frame-border') && (
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-neutral-400 w-24 shrink-0">Mviringo Pembe:</span>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        value={(selectedElement as ShapeElement).borderRadius || 0}
                        onChange={(e) =>
                          onUpdateElement({ borderRadius: Number(e.target.value) }, false)
                        }
                        className="w-full accent-amber-400"
                      />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      const hasShadow = !!(selectedElement as ShapeElement).shadowColor;
                      onUpdateElement({
                        shadowColor: hasShadow ? undefined : 'rgba(0,0,0,0.45)',
                        shadowBlur: hasShadow ? 0 : 18
                      });
                    }}
                    className={`py-2 rounded-lg border text-xs font-semibold ${
                      (selectedElement as ShapeElement).shadowColor
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                    }`}
                  >
                    Weka / Ondoa Kivuli
                  </button>
                </div>
              )}

              {/* Mobile Image Inspector */}
              {selectedElement.type === 'image' && (
                <div className="flex flex-col gap-2.5 p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                  <div>
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
                      Athari za Rangi ya Picha (1-Tap):
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {IMAGE_COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => onUpdateElement(preset.patch)}
                          className="py-1.5 px-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-400 rounded-lg text-[10px] font-semibold text-neutral-200 truncate cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {[
                    {
                      label: 'Mwangaza',
                      min: 50,
                      max: 150,
                      val: (selectedElement as ImageElement).filterBrightness ?? 100,
                      key: 'filterBrightness'
                    },
                    {
                      label: 'Utofauti',
                      min: 50,
                      max: 150,
                      val: (selectedElement as ImageElement).filterContrast ?? 100,
                      key: 'filterContrast'
                    },
                    {
                      label: 'Rangi (Sat)',
                      min: 0,
                      max: 200,
                      val: (selectedElement as ImageElement).filterSaturation ?? 100,
                      key: 'filterSaturation'
                    },
                    {
                      label: 'Zamani (Sepia)',
                      min: 0,
                      max: 100,
                      val: (selectedElement as ImageElement).filterSepia ?? 0,
                      key: 'filterSepia'
                    },
                    {
                      label: 'Geuza Hue',
                      min: 0,
                      max: 360,
                      val: (selectedElement as ImageElement).filterHueRotate ?? 0,
                      key: 'filterHueRotate'
                    },
                    {
                      label: 'Ukungu (Blur)',
                      min: 0,
                      max: 12,
                      val: (selectedElement as ImageElement).filterBlur ?? 0,
                      key: 'filterBlur'
                    },
                    {
                      label: 'Pembe',
                      min: 0,
                      max: 80,
                      val: (selectedElement as ImageElement).borderRadius ?? 0,
                      key: 'borderRadius'
                    }
                  ].map((f) => (
                    <div key={f.key} className="flex items-center gap-3">
                      <span className="text-[11px] text-neutral-400 w-24 shrink-0">{f.label}:</span>
                      <input
                        type="range"
                        min={f.min}
                        max={f.max}
                        value={f.val}
                        onChange={(e) =>
                          onUpdateElement({ [f.key]: Number(e.target.value) }, false)
                        }
                        className="w-full accent-amber-400"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const isBw = ((selectedElement as ImageElement).filterGrayscale ?? 0) > 0;
                      onUpdateElement({ filterGrayscale: isBw ? 0 : 100 });
                    }}
                    className={`py-2 rounded-lg border text-xs font-semibold ${
                      ((selectedElement as ImageElement).filterGrayscale ?? 0) > 0
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                    }`}
                  >
                    Kichujio: Nyeusi &amp; Nyeupe (B&amp;W)
                  </button>
                </div>
              )}

              {/* Mobile Badge & QR Quick Editors */}
              {selectedElement.type === 'badge' && (
                <div className="flex flex-col gap-2 p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={(selectedElement as BadgeElement).bgColor || '#dc2626'}
                      onChange={(e) => onUpdateElement({ bgColor: e.target.value }, false)}
                      className="w-9 h-9 rounded-lg bg-neutral-800 border border-neutral-700 p-0.5 shrink-0"
                    />
                    <input
                      type="text"
                      value={(selectedElement as BadgeElement).text}
                      onChange={(e) => onUpdateElement({ text: e.target.value }, false)}
                      className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-2.5 py-2 text-xs"
                      placeholder="Maneno ya beji..."
                    />
                  </div>
                </div>
              )}

              {selectedElement.type === 'qrcode' && (
                <div className="flex flex-col gap-2 p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                  <span className="text-[11px] text-neutral-400">Link / Namba ya QR Code:</span>
                  <input
                    type="text"
                    value={(selectedElement as QrCodeElement).data}
                    onChange={(e) => onUpdateElement({ data: e.target.value }, false)}
                    className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-2.5 py-2 text-xs font-mono"
                    placeholder="https://..."
                  />
                </div>
              )}

              {/* Mobile Chart Quick Inspector */}
              {selectedElement.type === 'chart' && (
                <div className="flex flex-col gap-2.5 p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                  <select
                    value={(selectedElement as ChartElement).chartType}
                    onChange={(e) => onUpdateElement({ chartType: e.target.value as ChartType })}
                    className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-2.5 py-2 text-xs font-medium"
                  >
                    <option value="bar">Mihimili Wima (Bar)</option>
                    <option value="horizontal-bar">Mihimili Mlalo</option>
                    <option value="stacked-bar">Mrundiko (Stacked)</option>
                    <option value="pie">Duara (Pie)</option>
                    <option value="donut">Donati (Donut)</option>
                    <option value="semi-donut">Nusu Duara</option>
                    <option value="line">Mistari (Line)</option>
                    <option value="area">Eneo (Area)</option>
                    <option value="spline">Mstari Mlaini</option>
                    <option value="scatter">Mtawanyiko</option>
                    <option value="radar">Rada (Radar)</option>
                    <option value="funnel">Faneli (Funnel)</option>
                    <option value="progress-ring">Mita Duara %</option>
                    <option value="progress-bar">Upau wa %</option>
                    <option value="metric-kpi">Kadi ya KPI</option>
                    <option value="comparison-table">Jedwali (Table)</option>
                  </select>

                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() =>
                        onUpdateElement({
                          showValues: !(selectedElement as ChartElement).showValues
                        })
                      }
                      className={`py-2 rounded-lg border text-[11px] font-semibold ${
                        (selectedElement as ChartElement).showValues
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      Namba
                    </button>
                    <button
                      onClick={() =>
                        onUpdateElement({
                          showGridlines: (selectedElement as ChartElement).showGridlines === false
                        })
                      }
                      className={`py-2 rounded-lg border text-[11px] font-semibold ${
                        (selectedElement as ChartElement).showGridlines !== false
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => {
                        const isTrans =
                          (selectedElement as ChartElement).backgroundColor === 'transparent';
                        onUpdateElement({
                          backgroundColor: isTrans ? '#0f172a' : 'transparent',
                          borderWidth: isTrans ? 1.5 : 0
                        });
                      }}
                      className={`py-2 rounded-lg border text-[11px] font-semibold ${
                        (selectedElement as ChartElement).backgroundColor === 'transparent'
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      Uwazi Kadi
                    </button>
                  </div>
                </div>
              )}

              {/* Universal Mobile Controls: Alignment, Flip, Blend, Opacity, Layers */}
              <div className="flex flex-col gap-2.5 p-3 bg-neutral-800/40 rounded-xl border border-neutral-800">
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={centerHorizontal}
                    className="py-2 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center gap-1 text-[11px]"
                  >
                    <AlignHorizontalJustifyCenter className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kati X</span>
                  </button>
                  <button
                    onClick={centerVertical}
                    className="py-2 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center gap-1 text-[11px]"
                  >
                    <AlignVerticalJustifyCenter className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kati Y</span>
                  </button>
                  <button
                    onClick={() => onUpdateElement({ flipX: !selectedElement.flipX })}
                    className={`py-2 border rounded-lg flex items-center justify-center gap-1 text-[11px] ${
                      selectedElement.flipX
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-neutral-800 border-neutral-700'
                    }`}
                  >
                    <FlipHorizontal2 className="w-3.5 h-3.5" />
                    <span>Geuza</span>
                  </button>
                  <button
                    onClick={() => onUpdateElement({ flipY: !selectedElement.flipY })}
                    className={`py-2 border rounded-lg flex items-center justify-center gap-1 text-[11px] ${
                      selectedElement.flipY
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-neutral-800 border-neutral-700'
                    }`}
                  >
                    <FlipVertical2 className="w-3.5 h-3.5" />
                    <span>Pindua</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 items-center">
                  <select
                    value={selectedElement.blendMode || 'source-over'}
                    onChange={(e) => onUpdateElement({ blendMode: e.target.value as BlendMode })}
                    className="w-full bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg px-2 py-2 text-xs"
                  >
                    <option value="source-over">Blend: Kawaida</option>
                    <option value="multiply">Multiply</option>
                    <option value="screen">Screen</option>
                    <option value="overlay">Overlay</option>
                    <option value="soft-light">Soft Light</option>
                  </select>

                  <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-2">
                    <Eye className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={selectedElement.opacity ?? 1}
                      onChange={(e) =>
                        onUpdateElement({ opacity: parseFloat(e.target.value) }, false)
                      }
                      className="w-full accent-amber-400"
                    />
                    <span className="font-mono text-[10px] tabular-nums shrink-0">
                      {Math.round((selectedElement.opacity ?? 1) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => onBringToFront(selectedElement.id)}
                    className="py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-[11px] font-semibold"
                  >
                    Juu Kabisa
                  </button>
                  <button
                    onClick={() => onBringForward(selectedElement.id)}
                    className="py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-[11px] font-semibold"
                  >
                    Mbele +1
                  </button>
                  <button
                    onClick={() => onSendBackward(selectedElement.id)}
                    className="py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-[11px] font-semibold"
                  >
                    Nyuma -1
                  </button>
                  <button
                    onClick={() => onSendToBack(selectedElement.id)}
                    className="py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-[11px] font-semibold"
                  >
                    Chini Kabisa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP CONTEXTUAL PROPERTY TOOLBAR */}
      <div className="hidden md:flex h-11 bg-neutral-900 border-b border-neutral-800 px-4 items-center justify-between gap-4 text-xs text-neutral-300 overflow-x-auto scrollbar-none z-20 shrink-0">
        {/* Left: Element specific controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* TEXT ELEMENT CONTROLS */}
          {selectedElement.type === 'text' && (
            <div className="flex items-center gap-1.5 shrink-0">
              {onRequestEditText && (
                <button
                  onClick={() => onRequestEditText(selectedElement.id)}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Hariri maandishi"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Andika</span>
                </button>
              )}
              <select
                value={(selectedElement as TextElement).fontFamily || 'Plus Jakarta Sans'}
                onChange={(e) => onUpdateElement({ fontFamily: e.target.value })}
                className="bg-neutral-800 border border-neutral-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400 max-w-36 font-medium"
              >
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                <option value="Outfit">Outfit (Kisasa)</option>
                <option value="Anton">Anton (Herufi Nzito)</option>
                <option value="Bebas Neue">Bebas Neue (Bango)</option>
                <option value="Playfair Display">Playfair (Kifahari)</option>
                <option value="Bricolage Grotesque">Bricolage</option>
              </select>

              {/* Font Size */}
              <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-1 py-0.5">
                <button
                  onClick={() => {
                    const s = (selectedElement as TextElement).fontSize || 32;
                    onUpdateElement({ fontSize: Math.max(8, s - 2) });
                  }}
                  className="w-5 h-5 flex items-center justify-center hover:bg-neutral-700 rounded text-neutral-300 cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  value={(selectedElement as TextElement).fontSize || 32}
                  onChange={(e) =>
                    onUpdateElement({ fontSize: Number(e.target.value) || 12 }, false)
                  }
                  className="w-10 bg-transparent text-center text-white focus:outline-none font-mono text-xs"
                />
                <button
                  onClick={() => {
                    const s = (selectedElement as TextElement).fontSize || 32;
                    onUpdateElement({ fontSize: Math.min(200, s + 2) });
                  }}
                  className="w-5 h-5 flex items-center justify-center hover:bg-neutral-700 rounded text-neutral-300 cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Text Color */}
              <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-1.5 py-1">
                <input
                  type="color"
                  value={(selectedElement as TextElement).color || '#ffffff'}
                  onChange={(e) => onUpdateElement({ color: e.target.value }, false)}
                  className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                  title="Rangi ya Maandishi"
                />
                <span className="font-mono text-[10px] text-neutral-300">
                  {(selectedElement as TextElement).color}
                </span>
              </div>

              {/* Bold */}
              <button
                onClick={() => {
                  const cur = (selectedElement as TextElement).fontWeight;
                  onUpdateElement({ fontWeight: cur === 900 || cur === 'bold' ? 400 : 900 });
                }}
                className={`p-1 rounded border transition-colors cursor-pointer ${
                  (selectedElement as TextElement).fontWeight === 900 ||
                  (selectedElement as TextElement).fontWeight === 'bold'
                    ? 'bg-amber-400 text-black border-amber-400 font-bold'
                    : 'border-transparent text-neutral-300 hover:bg-neutral-800'
                }`}
                title="Herufi Nzito (Bold)"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>

              {/* Italic */}
              <button
                onClick={() => {
                  const cur = (selectedElement as TextElement).fontStyle;
                  onUpdateElement({ fontStyle: cur === 'italic' ? 'normal' : 'italic' });
                }}
                className={`p-1 rounded border transition-colors cursor-pointer ${
                  (selectedElement as TextElement).fontStyle === 'italic'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'border-transparent text-neutral-300 hover:bg-neutral-800'
                }`}
                title="Mlalo (Italic)"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>

              {/* Underline */}
              <button
                onClick={() => {
                  const cur = (selectedElement as TextElement).textDecoration;
                  onUpdateElement({ textDecoration: cur === 'underline' ? 'none' : 'underline' });
                }}
                className={`p-1 rounded border transition-colors cursor-pointer ${
                  (selectedElement as TextElement).textDecoration === 'underline'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'border-transparent text-neutral-300 hover:bg-neutral-800'
                }`}
                title="Pigia Mstari (Underline)"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>

              {/* Alignment */}
              <div className="flex items-center bg-neutral-800 rounded border border-neutral-700 p-0.5">
                {(['left', 'center', 'right'] as const).map((align) => {
                  const Icon =
                    align === 'left' ? AlignLeft : align === 'center' ? AlignCenter : AlignRight;
                  const isAct = (selectedElement as TextElement).textAlign === align;
                  return (
                    <button
                      key={align}
                      onClick={() => onUpdateElement({ textAlign: align })}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        isAct ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>

              {/* Letter Spacing */}
              <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <span className="text-[10px] text-neutral-400">Nafasi:</span>
                <input
                  type="range"
                  min="-2"
                  max="16"
                  value={(selectedElement as TextElement).letterSpacing || 0}
                  onChange={(e) =>
                    onUpdateElement({ letterSpacing: Number(e.target.value) }, false)
                  }
                  className="w-14 accent-amber-400"
                  title="Letter Spacing"
                />
              </div>

              {/* Text Shadow */}
              <button
                onClick={() => {
                  const hasShadow = !!(selectedElement as TextElement).shadowColor;
                  onUpdateElement({
                    shadowColor: hasShadow ? undefined : '#000000',
                    shadowBlur: hasShadow ? 0 : 16,
                    shadowOffsetY: hasShadow ? 0 : 4
                  });
                }}
                className={`px-2 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  (selectedElement as TextElement).shadowColor
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'
                }`}
                title="Weka Kivuli (Drop Shadow)"
              >
                Kivuli
              </button>

              {/* Text Outline / Stroke */}
              <button
                onClick={() => {
                  const hasStroke = !!(selectedElement as TextElement).strokeWidth;
                  onUpdateElement({
                    strokeColor: hasStroke ? undefined : '#000000',
                    strokeWidth: hasStroke ? 0 : 2
                  });
                }}
                className={`px-2 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  (selectedElement as TextElement).strokeWidth
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'
                }`}
                title="Weka Mstari wa Nje wa Herufi (Text Outline)"
              >
                Ukingo
              </button>

              {/* Text Highlight Background */}
              <button
                onClick={() => {
                  const hasBg = !!(selectedElement as TextElement).backgroundColor;
                  onUpdateElement({
                    backgroundColor: hasBg ? undefined : 'rgba(15, 23, 42, 0.85)',
                    borderRadius: hasBg ? 0 : 10
                  });
                }}
                className={`px-2 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  (selectedElement as TextElement).backgroundColor
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'
                }`}
                title="Weka Kasha Nyuma ya Maandishi"
              >
                Kasha
              </button>
            </div>
          )}

          {/* SHAPE CONTROLS */}
          {selectedElement.type === 'shape' && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <span className="text-[11px] text-neutral-400">Ndani:</span>
                <input
                  type="color"
                  value={(selectedElement as ShapeElement).fillColor || '#ffffff'}
                  onChange={(e) => onUpdateElement({ fillColor: e.target.value }, false)}
                  className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <span className="text-[11px] text-neutral-400">Ukingo:</span>
                <input
                  type="color"
                  value={(selectedElement as ShapeElement).strokeColor || '#000000'}
                  onChange={(e) =>
                    onUpdateElement(
                      {
                        strokeColor: e.target.value,
                        strokeWidth: (selectedElement as ShapeElement).strokeWidth || 3
                      },
                      false
                    )
                  }
                  className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="range"
                  min="0"
                  max="16"
                  value={(selectedElement as ShapeElement).strokeWidth || 0}
                  onChange={(e) => onUpdateElement({ strokeWidth: Number(e.target.value) }, false)}
                  className="w-14 accent-amber-400"
                  title="Unene wa Ukingo"
                />
              </div>

              {((selectedElement as ShapeElement).shapeType === 'rectangle' ||
                (selectedElement as ShapeElement).shapeType === 'frame-border') && (
                <div className="flex items-center gap-1.5 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                  <span className="text-[11px] text-neutral-400">Pembe:</span>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={(selectedElement as ShapeElement).borderRadius || 0}
                    onChange={(e) =>
                      onUpdateElement({ borderRadius: Number(e.target.value) }, false)
                    }
                    className="w-16 accent-amber-400"
                  />
                </div>
              )}

              <button
                onClick={() => {
                  const hasShadow = !!(selectedElement as ShapeElement).shadowColor;
                  onUpdateElement({
                    shadowColor: hasShadow ? undefined : 'rgba(0,0,0,0.45)',
                    shadowBlur: hasShadow ? 0 : 18
                  });
                }}
                className={`px-2 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  (selectedElement as ShapeElement).shadowColor
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                Kivuli
              </button>
            </div>
          )}

          {/* IMAGE CONTROLS */}
          {selectedElement.type === 'image' && (
            <div className="flex items-center gap-2 shrink-0">
              <select
                value=""
                onChange={(e) => {
                  const found = IMAGE_COLOR_PRESETS.find((p) => p.id === e.target.value);
                  if (found) onUpdateElement(found.patch);
                }}
                className="bg-neutral-800 border border-neutral-700 text-amber-300 rounded px-2 py-1 text-[11px] font-semibold focus:outline-none focus:border-amber-400"
                title="Athari za Rangi ya Picha (Color Effect)"
              >
                <option value="" disabled>
                  Athari Rangi...
                </option>
                {IMAGE_COLOR_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <Sun className="w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={(selectedElement as ImageElement).filterBrightness ?? 100}
                  onChange={(e) =>
                    onUpdateElement({ filterBrightness: Number(e.target.value) }, false)
                  }
                  className="w-12 accent-amber-400"
                  title="Mwangaza (Brightness)"
                />
              </div>

              <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <Contrast className="w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={(selectedElement as ImageElement).filterContrast ?? 100}
                  onChange={(e) =>
                    onUpdateElement({ filterContrast: Number(e.target.value) }, false)
                  }
                  className="w-12 accent-amber-400"
                  title="Utofauti (Contrast)"
                />
              </div>

              <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <span className="text-[10px] text-neutral-400">Rangi:</span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={(selectedElement as ImageElement).filterSaturation ?? 100}
                  onChange={(e) =>
                    onUpdateElement({ filterSaturation: Number(e.target.value) }, false)
                  }
                  className="w-12 accent-amber-400"
                  title="Saturation"
                />
              </div>

              <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <span className="text-[10px] text-neutral-400">Hue:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={(selectedElement as ImageElement).filterHueRotate ?? 0}
                  onChange={(e) =>
                    onUpdateElement({ filterHueRotate: Number(e.target.value) }, false)
                  }
                  className="w-12 accent-amber-400"
                  title="Hue Rotate"
                />
              </div>

              <button
                onClick={() => {
                  const isBw = ((selectedElement as ImageElement).filterGrayscale ?? 0) > 0;
                  onUpdateElement({ filterGrayscale: isBw ? 0 : 100 });
                }}
                className={`px-2 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  ((selectedElement as ImageElement).filterGrayscale ?? 0) > 0
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'
                }`}
                title="Picha ya Nyeusi na Nyeupe (B&W Filter)"
              >
                B&amp;W
              </button>

              <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <span className="text-[10px] text-neutral-400">Pembe:</span>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={(selectedElement as ImageElement).borderRadius ?? 0}
                  onChange={(e) =>
                    onUpdateElement({ borderRadius: Number(e.target.value) }, false)
                  }
                  className="w-12 accent-amber-400"
                />
              </div>
            </div>
          )}

          {/* BADGE CONTROLS */}
          {selectedElement.type === 'badge' && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <span className="text-[11px] text-neutral-400">Rangi:</span>
                <input
                  type="color"
                  value={(selectedElement as BadgeElement).bgColor || '#dc2626'}
                  onChange={(e) => onUpdateElement({ bgColor: e.target.value }, false)}
                  className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                />
              </div>
              <input
                type="text"
                value={(selectedElement as BadgeElement).text}
                onChange={(e) => onUpdateElement({ text: e.target.value }, false)}
                className="bg-neutral-800 border border-neutral-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400 w-36"
                placeholder="Maneno makuu"
              />
            </div>
          )}

          {/* QR CODE CONTROLS */}
          {selectedElement.type === 'qrcode' && (
            <div className="flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={(selectedElement as QrCodeElement).data}
                onChange={(e) => onUpdateElement({ data: e.target.value }, false)}
                className="bg-neutral-800 border border-neutral-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400 w-44 font-mono"
                placeholder="Data ya QR..."
              />
            </div>
          )}

          {/* CHART CONTROLS */}
          {selectedElement.type === 'chart' && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={onOpenChartModal}
                className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                title="Fungua jedwali la kuhariri namba, CSV, na rangi za chati"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Hariri Takwimu</span>
              </button>

              <select
                value={(selectedElement as ChartElement).chartType}
                onChange={(e) => onUpdateElement({ chartType: e.target.value as ChartType })}
                className="bg-neutral-800 border border-neutral-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400 font-medium"
              >
                <option value="bar">Mihimili Wima</option>
                <option value="horizontal-bar">Mihimili Mlalo</option>
                <option value="stacked-bar">Mrundiko (Stacked)</option>
                <option value="pie">Duara (Pie)</option>
                <option value="donut">Donati (Donut)</option>
                <option value="semi-donut">Nusu Duara</option>
                <option value="line">Mistari (Line)</option>
                <option value="area">Eneo (Area)</option>
                <option value="spline">Mstari Mlaini</option>
                <option value="scatter">Mtawanyiko</option>
                <option value="radar">Rada (Radar)</option>
                <option value="funnel">Faneli (Funnel)</option>
                <option value="progress-ring">Mita Duara %</option>
                <option value="progress-bar">Upau wa %</option>
                <option value="metric-kpi">Kadi ya KPI</option>
                <option value="comparison-table">Jedwali (Table)</option>
              </select>

              <button
                onClick={() =>
                  onUpdateElement({
                    showValues: !(selectedElement as ChartElement).showValues
                  })
                }
                className={`px-2 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  (selectedElement as ChartElement).showValues
                    ? 'bg-neutral-700 text-amber-300 border-amber-400/50'
                    : 'border-neutral-700 text-neutral-400'
                }`}
              >
                Namba
              </button>

              <button
                onClick={() =>
                  onUpdateElement({
                    showGridlines: (selectedElement as ChartElement).showGridlines === false
                  })
                }
                className={`px-2 py-1 rounded border text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                  (selectedElement as ChartElement).showGridlines !== false
                    ? 'bg-neutral-700 text-amber-300 border-amber-400/50'
                    : 'border-neutral-700 text-neutral-400'
                }`}
                title="Washa au Zima Mistari ya Grid kwenye Grafu"
              >
                <Grid className="w-3 h-3" />
                <span>Grid</span>
              </button>

              <button
                onClick={() => {
                  const isTrans =
                    (selectedElement as ChartElement).backgroundColor === 'transparent';
                  onUpdateElement({
                    backgroundColor: isTrans ? '#0f172a' : 'transparent',
                    borderWidth: isTrans ? 1.5 : 0
                  });
                }}
                className={`px-2 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  (selectedElement as ChartElement).backgroundColor === 'transparent'
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                    : 'border-neutral-700 text-neutral-400'
                }`}
                title="Kadi ya Uwazi (Transparent Background)"
              >
                Uwazi Kadi
              </button>
            </div>
          )}
        </div>

        {/* Right: Universal Design Alignment, Flip, Blend, Layer & Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Canvas Center Alignment */}
          <div className="flex items-center bg-neutral-800 rounded border border-neutral-700 p-0.5">
            <button
              onClick={centerHorizontal}
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Katikati Mlalo (Center X)"
            >
              <AlignHorizontalJustifyCenter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={centerVertical}
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Katikati Wima (Center Y)"
            >
              <AlignVerticalJustifyCenter className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Flip Horizontal / Vertical */}
          <div className="flex items-center bg-neutral-800 rounded border border-neutral-700 p-0.5">
            <button
              onClick={() => onUpdateElement({ flipX: !selectedElement.flipX })}
              className={`p-1 rounded transition-colors cursor-pointer ${
                selectedElement.flipX
                  ? 'bg-amber-400 text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
              }`}
              title="Geuza Mlalo (Flip Horizontal)"
            >
              <FlipHorizontal2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onUpdateElement({ flipY: !selectedElement.flipY })}
              className={`p-1 rounded transition-colors cursor-pointer ${
                selectedElement.flipY
                  ? 'bg-amber-400 text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
              }`}
              title="Geuza Wima (Flip Vertical)"
            >
              <FlipVertical2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Blend Mode */}
          <select
            value={selectedElement.blendMode || 'source-over'}
            onChange={(e) => onUpdateElement({ blendMode: e.target.value as BlendMode })}
            className="bg-neutral-800 border border-neutral-700 text-neutral-200 rounded px-1.5 py-1 text-[11px] focus:outline-none focus:border-amber-400"
            title="Mchanganyiko wa Tabaka (Blend Mode)"
          >
            <option value="source-over">Blend: Kawaida</option>
            <option value="multiply">Multiply</option>
            <option value="screen">Screen</option>
            <option value="overlay">Overlay</option>
            <option value="soft-light">Soft Light</option>
          </select>

          {/* Opacity */}
          <div className="flex items-center gap-1 bg-neutral-800/80 rounded border border-neutral-700/60 px-2 py-0.5">
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={selectedElement.opacity ?? 1}
              onChange={(e) => onUpdateElement({ opacity: parseFloat(e.target.value) }, false)}
              className="w-12 accent-amber-400"
              title="Uwazi (Opacity)"
            />
            <span className="font-mono text-[10px] text-neutral-300 w-7 text-right tabular-nums">
              {Math.round((selectedElement.opacity ?? 1) * 100)}%
            </span>
          </div>

          {/* Layer stack actions */}
          <div className="flex items-center bg-neutral-800 rounded border border-neutral-700 p-0.5">
            <button
              onClick={() => onBringForward(selectedElement.id)}
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Sogeza Mbele Tabaka (Bring Forward)"
            >
              <BringToFront className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSendBackward(selectedElement.id)}
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Sogeza Nyuma Tabaka (Send Backward)"
            >
              <SendToBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onBringToFront(selectedElement.id)}
              className="px-1.5 py-0.5 text-[10px] font-bold text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Leta Juu Kabisa (Bring to Front)"
            >
              Juu
            </button>
            <button
              onClick={() => onSendToBack(selectedElement.id)}
              className="px-1.5 py-0.5 text-[10px] font-bold text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Peleka Chini Kabisa (Send to Back)"
            >
              Chini
            </button>
          </div>

          {/* Lock / Unlock */}
          <button
            onClick={() => onUpdateElement({ isLocked: !isLocked })}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              isLocked
                ? 'bg-amber-400 text-black border-amber-400'
                : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title={isLocked ? 'Fungua Kipengele (Unlock)' : 'Funga Kisisonge (Lock)'}
          >
            {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </button>

          {/* Duplicate */}
          <button
            onClick={() => onDuplicateElement(selectedElement.id)}
            className="p-1.5 rounded border border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
            title="Nakili (Duplicate)"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDeleteElement(selectedElement.id)}
            className="p-1.5 rounded border border-neutral-700 text-red-400 hover:bg-red-950/60 hover:border-red-500 transition-colors cursor-pointer"
            title="Futa (Delete)"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
});
