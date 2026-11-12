import React from 'react';
import {
  PosterElement,
  TextElement,
  ShapeElement,
  ImageElement,
  BadgeElement,
  QrCodeElement,
  ChartElement
} from '../types/poster';
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
  Sliders,
  Sun,
  Contrast,
  RotateCw,
  Eye,
  Type,
  BarChart3,
  Edit3
} from 'lucide-react';

interface PropertyToolbarProps {
  selectedElement: PosterElement | null;
  onUpdateElement: (updated: Partial<PosterElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onBringForward: (id: string) => void;
  onSendBackward: (id: string) => void;
  onBringToFront: (id: string) => void;
  onSendToBack: (id: string) => void;
  onOpenChartModal?: () => void;
}

export const PropertyToolbar: React.FC<PropertyToolbarProps> = ({
  selectedElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onOpenChartModal
}) => {
  if (!selectedElement) {
    return (
      <div className="h-10 bg-neutral-900/60 border-b border-neutral-800/80 px-4 flex items-center justify-between text-xs text-neutral-500">
        <span>Chagua kipengele chochote kwenye bango kubadilisha rangi, herufi au mpangilio</span>
        <span className="font-mono text-[11px]">Bofya mara mbili kubadili maandishi moja kwa moja</span>
      </div>
    );
  }

  const isLocked = !!selectedElement.isLocked;

  return (
    <div className="h-11 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between gap-4 text-xs text-neutral-300 overflow-x-auto scrollbar-none z-20">
      {/* Left: Element specific controls */}
      <div className="flex items-center gap-2">
        {/* TEXT ELEMENT CONTROLS */}
        {selectedElement.type === 'text' && (
          <div className="flex items-center gap-1.5">
            {/* Font Family */}
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
                className="w-5 h-5 flex items-center justify-center hover:bg-neutral-700 rounded text-neutral-300"
              >
                -
              </button>
              <input
                type="number"
                value={(selectedElement as TextElement).fontSize || 32}
                onChange={(e) => onUpdateElement({ fontSize: Number(e.target.value) || 12 })}
                className="w-10 bg-transparent text-center text-white focus:outline-none font-mono text-xs"
              />
              <button
                onClick={() => {
                  const s = (selectedElement as TextElement).fontSize || 32;
                  onUpdateElement({ fontSize: Math.min(200, s + 2) });
                }}
                className="w-5 h-5 flex items-center justify-center hover:bg-neutral-700 rounded text-neutral-300"
              >
                +
              </button>
            </div>

            {/* Text Color */}
            <div className="flex items-center gap-1 bg-neutral-800 rounded border border-neutral-700 px-1.5 py-1">
              <input
                type="color"
                value={(selectedElement as TextElement).color || '#ffffff'}
                onChange={(e) => onUpdateElement({ color: e.target.value })}
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
              className={`p-1 rounded border transition-colors ${
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
              className={`p-1 rounded border transition-colors ${
                (selectedElement as TextElement).fontStyle === 'italic'
                  ? 'bg-amber-400 text-black border-amber-400'
                  : 'border-transparent text-neutral-300 hover:bg-neutral-800'
              }`}
              title="Mlalo (Italic)"
            >
              <Italic className="w-3.5 h-3.5" />
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
                    className={`p-1 rounded transition-colors ${
                      isAct ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
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
              className={`px-2 py-1 rounded border text-[11px] transition-colors ${
                (selectedElement as TextElement).shadowColor
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'
              }`}
              title="Weka Kivuli (Drop Shadow)"
            >
              Kivuli
            </button>
          </div>
        )}

        {/* SHAPE CONTROLS */}
        {selectedElement.type === 'shape' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
              <span className="text-[11px] text-neutral-400">Rangi ya Ndani:</span>
              <input
                type="color"
                value={(selectedElement as ShapeElement).fillColor || '#ffffff'}
                onChange={(e) => onUpdateElement({ fillColor: e.target.value })}
                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
              <span className="text-[11px] text-neutral-400">Rangi ya Ukingo:</span>
              <input
                type="color"
                value={(selectedElement as ShapeElement).strokeColor || '#000000'}
                onChange={(e) =>
                  onUpdateElement({
                    strokeColor: e.target.value,
                    strokeWidth: (selectedElement as ShapeElement).strokeWidth || 2
                  })
                }
                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
              />
            </div>

            {(selectedElement as ShapeElement).shapeType === 'rectangle' && (
              <div className="flex items-center gap-1.5 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
                <span className="text-[11px] text-neutral-400">Mviringo wa Pembe:</span>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={(selectedElement as ShapeElement).borderRadius || 0}
                  onChange={(e) => onUpdateElement({ borderRadius: Number(e.target.value) })}
                  className="w-20 accent-amber-400"
                />
              </div>
            )}
          </div>
        )}

        {/* IMAGE CONTROLS */}
        {selectedElement.type === 'image' && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[11px] text-neutral-400">Mwangaza:</span>
              <input
                type="range"
                min="50"
                max="150"
                value={(selectedElement as ImageElement).filterBrightness ?? 100}
                onChange={(e) => onUpdateElement({ filterBrightness: Number(e.target.value) })}
                className="w-16 accent-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <Contrast className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[11px] text-neutral-400">Utofauti (Contrast):</span>
              <input
                type="range"
                min="50"
                max="150"
                value={(selectedElement as ImageElement).filterContrast ?? 100}
                onChange={(e) => onUpdateElement({ filterContrast: Number(e.target.value) })}
                className="w-16 accent-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-neutral-400">Pembe:</span>
              <input
                type="range"
                min="0"
                max="60"
                value={(selectedElement as ImageElement).borderRadius ?? 0}
                onChange={(e) => onUpdateElement({ borderRadius: Number(e.target.value) })}
                className="w-16 accent-amber-400"
              />
            </div>
          </div>
        )}

        {/* BADGE CONTROLS */}
        {selectedElement.type === 'badge' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-neutral-800 rounded border border-neutral-700 px-2 py-1">
              <span className="text-[11px] text-neutral-400">Rangi:</span>
              <input
                type="color"
                value={(selectedElement as BadgeElement).bgColor || '#dc2626'}
                onChange={(e) => onUpdateElement({ bgColor: e.target.value })}
                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
              />
            </div>
            <input
              type="text"
              value={(selectedElement as BadgeElement).text}
              onChange={(e) => onUpdateElement({ text: e.target.value })}
              className="bg-neutral-800 border border-neutral-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400 w-36"
              placeholder="Maneno makuu"
            />
          </div>
        )}

        {/* QR CODE CONTROLS */}
        {selectedElement.type === 'qrcode' && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={(selectedElement as QrCodeElement).data}
              onChange={(e) => onUpdateElement({ data: e.target.value })}
              className="bg-neutral-800 border border-neutral-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400 w-44 font-mono"
              placeholder="Data ya QR..."
            />
          </div>
        )}

        {/* CHART CONTROLS */}
        {selectedElement.type === 'chart' && (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenChartModal}
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Fungua jedwali la kuhariri namba na majina ya chati"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Hariri Takwimu</span>
            </button>

            <select
              value={(selectedElement as ChartElement).chartType}
              onChange={(e) => onUpdateElement({ chartType: e.target.value as any })}
              className="bg-neutral-800 border border-neutral-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400 font-medium"
            >
              <option value="bar">Mihimili (Bar)</option>
              <option value="pie">Duara (Pie)</option>
              <option value="donut">Donati (Donut)</option>
              <option value="line">Mstari (Line)</option>
              <option value="progress-ring">Mita ya %</option>
              <option value="metric-kpi">Kadi ya KPI</option>
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
              Onyesha Namba
            </button>
          </div>
        )}
      </div>

      {/* Right: Universal Layer & Position Controls */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Opacity */}
        <div className="flex items-center gap-1 bg-neutral-800/80 rounded border border-neutral-700/60 px-2 py-0.5">
          <Eye className="w-3.5 h-3.5 text-neutral-400" />
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={selectedElement.opacity ?? 1}
            onChange={(e) => onUpdateElement({ opacity: parseFloat(e.target.value) })}
            className="w-14 accent-amber-400"
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
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors"
            title="Sogeza Mbele Tabaka (Bring Forward)"
          >
            <BringToFront className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSendBackward(selectedElement.id)}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors"
            title="Sogeza Nyuma Tabaka (Send Backward)"
          >
            <SendToBack className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lock / Unlock */}
        <button
          onClick={() => onUpdateElement({ isLocked: !isLocked })}
          className={`p-1.5 rounded border transition-colors ${
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
          className="p-1.5 rounded border border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          title="Nakili (Duplicate)"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDeleteElement(selectedElement.id)}
          className="p-1.5 rounded border border-neutral-700 text-red-400 hover:bg-red-950/60 hover:border-red-500 transition-colors"
          title="Futa (Delete)"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
