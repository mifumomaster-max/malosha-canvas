import React, { useState, useEffect } from 'react';
import {
  X,
  FilePlus2,
  BookmarkPlus,
  Layers,
  Upload,
  ArrowUp,
  ArrowDown,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Type,
  Image as ImageIcon,
  Shapes,
  Award,
  QrCode,
  BarChart3,
  Check
} from 'lucide-react';
import {
  PosterBackground,
  PosterElement,
  PosterProject,
  TemplateCategory
} from '../types/poster';
import { CANVAS_PRESETS } from '../data/defaultTemplates';
import { processUploadedImageFile } from '../utils/imageUpload';

/* -------------------------------------------------------------------------- */
/* 1. NEW BLANK CANVAS STUDIO MODAL                                           */
/* -------------------------------------------------------------------------- */

interface NewCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBlankCanvas: (
    title: string,
    width: number,
    height: number,
    background: PosterBackground
  ) => void;
}

const BLANK_BG_OPTIONS: { label: string; preview: string; bg: PosterBackground }[] = [
  {
    label: 'Nyeupe Safi',
    preview: '#ffffff',
    bg: { type: 'color', color: '#ffffff' }
  },
  {
    label: 'Nyeusi Studio',
    preview: '#09090b',
    bg: { type: 'color', color: '#09090b' }
  },
  {
    label: 'Bahari Usiku',
    preview: '#0f172a',
    bg: { type: 'color', color: '#0f172a' }
  },
  {
    label: 'Krimu Cheti',
    preview: '#fffbeb',
    bg: { type: 'color', color: '#fffbeb' }
  },
  {
    label: 'Zambarau Gradient',
    preview: 'linear-gradient(135deg, #4c1d95, #090514)',
    bg: {
      type: 'gradient',
      gradient: {
        type: 'linear',
        angle: 135,
        stops: [
          { offset: 0, color: '#4c1d95' },
          { offset: 1, color: '#090514' }
        ]
      }
    }
  },
  {
    label: 'Moto & Dhahabu',
    preview: 'linear-gradient(145deg, #991b1b, #f59e0b)',
    bg: {
      type: 'gradient',
      gradient: {
        type: 'linear',
        angle: 145,
        stops: [
          { offset: 0, color: '#991b1b' },
          { offset: 1, color: '#f59e0b' }
        ]
      }
    }
  }
];

export const NewCanvasModal: React.FC<NewCanvasModalProps> = ({
  isOpen,
  onClose,
  onCreateBlankCanvas
}) => {
  const [title, setTitle] = useState('Ubunifu Mpya - Malosha');
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [selectedBgIdx, setSelectedBgIdx] = useState(0);
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('Ubunifu Mpya - Malosha');
      setCustomBgImage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const { dataUrl } = await processUploadedImageFile(file, 1600);
      setCustomBgImage(dataUrl);
    } catch {
      // Ignore error
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanW = Math.max(300, Math.min(3000, Math.round(width) || 1080));
    const cleanH = Math.max(300, Math.min(3000, Math.round(height) || 1080));
    const bg: PosterBackground = customBgImage
      ? { type: 'image', imageUrl: customBgImage, overlayOpacity: 0 }
      : BLANK_BG_OPTIONS[selectedBgIdx].bg;
    onCreateBlankCanvas(title.trim() || 'Ubunifu Mpya', cleanW, cleanH, bg);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 md:p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg max-h-[90dvh] flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FilePlus2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Anza Studio Mpya (Kutoka Mwanzo)</h2>
              <p className="text-[11px] text-neutral-400">
                Chagua ukubwa na rangi ya msingi uanze kutengeneza bango lako tupu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
              Jina la Bango / Kazi Yako
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mfano: Tangazo la Biashara..."
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <span className="text-xs font-semibold text-neutral-300 block mb-1.5">
              Chagua Ukubwa wa Canvas (au Weka Wako)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CANVAS_PRESETS.map((p) => {
                const active = width === p.width && height === p.height;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setWidth(p.width);
                      setHeight(p.height);
                    }}
                    className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                        : 'bg-neutral-800/70 border-neutral-700/80 text-neutral-200 hover:border-neutral-600'
                    }`}
                  >
                    <div className="text-[11px] font-bold truncate">{p.labelSwahili}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {p.width}×{p.height} ({p.ratioLabel})
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2.5">
              <label className="bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Upana (px):</span>
                <input
                  type="number"
                  min={300}
                  max={3000}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-20 bg-neutral-900 border border-neutral-700 rounded px-2 py-0.5 text-right text-white font-mono text-xs"
                />
              </label>
              <label className="bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Urefu (px):</span>
                <input
                  type="number"
                  min={300}
                  max={3000}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-20 bg-neutral-900 border border-neutral-700 rounded px-2 py-0.5 text-right text-white font-mono text-xs"
                />
              </label>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-neutral-300 block mb-1.5">
              Mandhari ya Kuanzia (Background)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {BLANK_BG_OPTIONS.map((opt, idx) => {
                const isSelected = !customBgImage && selectedBgIdx === idx;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      setCustomBgImage(null);
                      setSelectedBgIdx(idx);
                    }}
                    className={`p-1.5 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-neutral-700 bg-neutral-800/60 hover:border-neutral-600'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded border border-white/20 shrink-0"
                      style={{ background: opt.preview }}
                    />
                    <span className="text-[10px] font-semibold text-neutral-200 truncate">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="mt-2 w-full py-2 px-3 rounded-lg border border-dashed border-sky-400/50 hover:border-sky-400 bg-sky-500/10 text-sky-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>
                {customBgImage ? 'Picha ya Mandhari Imepakiwa ✓ (Badili)' : 'Au Pakia Picha ya Mandhari'}
              </span>
              <input type="file" accept="image/*" onChange={handleUploadBg} className="hidden" />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-800 cursor-pointer"
            >
              Ghairi
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-black flex items-center gap-1.5 cursor-pointer shadow"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>Unda Canvas Tupu &amp; Anza Kubuni</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. SAVE DESIGN AS REUSABLE TEMPLATE MODAL                                  */
/* -------------------------------------------------------------------------- */

interface SaveAsTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTitle: string;
  elementCount: number;
  width: number;
  height: number;
  onSaveTemplate: (titleSwahili: string, category: TemplateCategory, description: string) => void;
}

const TEMPLATE_CAT_CHOICES: { id: TemplateCategory; label: string }[] = [
  { id: 'breaking-news', label: 'Breaking News' },
  { id: 'nukuu', label: 'Nukuu & Social' },
  { id: 'business', label: 'Biashara & Matangazo' },
  { id: 'magazine', label: 'Magazine / Jarida' },
  { id: 'business-card', label: 'Business Card' },
  { id: 'id-card', label: 'ID Card / Kitambulisho' },
  { id: 'invitation', label: 'Kadi ya Mwaliko' },
  { id: 'certificate', label: 'Cheti cha Heshima' },
  { id: 'infographics', label: 'Grafu & Chati' },
  { id: 'church', label: 'Ibada & Kanisa' },
  { id: 'events', label: 'Matamasha & Sherehe' },
  { id: 'food', label: 'Chakula & Mgahawa' },
  { id: 'sports', label: 'Michezo' },
  { id: 'education', label: 'Elimu' },
  { id: 'realestate', label: 'Mali & Viwanja' }
];

export const SaveAsTemplateModal: React.FC<SaveAsTemplateModalProps> = ({
  isOpen,
  onClose,
  defaultTitle,
  elementCount,
  width,
  height,
  onSaveTemplate
}) => {
  const [title, setTitle] = useState(defaultTitle || 'Kiolezo Changu');
  const [category, setCategory] = useState<TemplateCategory>('business');
  const [description, setDescription] = useState('Kiolezo kilichotengenezwa kwenye studio.');

  useEffect(() => {
    if (isOpen) {
      setTitle(defaultTitle || 'Kiolezo Changu');
      setDescription('Kiolezo kilichotengenezwa kwenye studio.');
    }
  }, [isOpen, defaultTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveTemplate(
      title.trim() || 'Kiolezo Changu',
      category,
      description.trim() || 'Kiolezo maalum'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 md:p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BookmarkPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Hifadhi Kama Kiolezo (Template)</h2>
              <p className="text-[11px] text-neutral-400">
                Itaongezeka moja kwa moja kwenye orodha ya Violezo ({width}×{height} · tabaka {elementCount})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">
              Jina la Kiolezo
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mfano: Kiolezo Changu cha Habari..."
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">
              Kundi la Kiolezo (Category)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TemplateCategory)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              {TEMPLATE_CAT_CHOICES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">
              Maelezo Mafupi
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-800 cursor-pointer"
            >
              Ghairi
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Ongeza Kwenye Violezo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. STUDIO LAYERS INSPECTOR MODAL                                           */
/* -------------------------------------------------------------------------- */

interface LayersModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PosterProject;
  selectedId: string | null;
  onSelectElement: (id: string | null) => void;
  onBringForward: (id: string) => void;
  onSendBackward: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onDeleteElement: (id: string) => void;
  onDeleteMultiple?: (ids: string[]) => void;
  onClearAllElements?: () => void;
  onClearBackgroundImage?: () => void;
  onClearWatermark?: () => void;
  onClearColorEffect?: () => void;
}

function getElementSummary(el: PosterElement): { label: string; kind: string; icon: React.ReactNode } {
  if (el.type === 'text') {
    const t = el.text.replace(/\s+/g, ' ').trim();
    return {
      label: t || 'Maandishi',
      kind: 'Maandishi',
      icon: <Type className="w-3.5 h-3.5 text-amber-400" />
    };
  }
  if (el.type === 'image') {
    return {
      label: el.alt || 'Picha / Nembo',
      kind: 'Picha',
      icon: (
        <img
          src={el.src}
          alt=""
          className="w-full h-full object-cover rounded"
        />
      )
    };
  }
  if (el.type === 'shape') {
    return {
      label: el.shapeType === 'verified-badge' ? 'Verification Badge ✓' : `Umbo (${el.shapeType})`,
      kind: 'Umbo',
      icon: el.fillColor ? (
        <span
          className="w-4 h-4 rounded-sm border border-white/25 inline-block"
          style={{ backgroundColor: el.fillColor }}
        />
      ) : (
        <Shapes className="w-3.5 h-3.5 text-purple-400" />
      )
    };
  }
  if (el.type === 'badge') {
    return {
      label: el.text || 'Beji',
      kind: 'Beji',
      icon: <Award className="w-3.5 h-3.5 text-emerald-400" />
    };
  }
  if (el.type === 'qrcode') {
    return {
      label: el.label || el.data || 'QR Code',
      kind: 'QR Code',
      icon: <QrCode className="w-3.5 h-3.5 text-neutral-300" />
    };
  }
  return {
    label: el.title || `Grafu (${el.chartType})`,
    kind: 'Grafu',
    icon: <BarChart3 className="w-3.5 h-3.5 text-rose-400" />
  };
}

export const LayersModal: React.FC<LayersModalProps> = ({
  isOpen,
  onClose,
  project,
  selectedId,
  onSelectElement,
  onBringForward,
  onSendBackward,
  onToggleLock,
  onDuplicateElement,
  onDeleteElement,
  onDeleteMultiple,
  onClearAllElements,
  onClearBackgroundImage,
  onClearWatermark,
  onClearColorEffect
}) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCheckedIds([]);
      setConfirmClearAll(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const valid = new Set(project.elements.map((e) => e.id));
    setCheckedIds((prev) => prev.filter((id) => valid.has(id)));
  }, [project.elements]);

  if (!isOpen) return null;

  // Render topmost layer first (reverse array order)
  const reversed = [...project.elements].reverse();
  const hasBgImage = project.background.type === 'image';
  const hasWatermark = Boolean(project.watermark?.enabled && project.watermark.text?.trim());
  const hasColorEffect = Boolean(project.colorEffect && project.colorEffect !== 'none');

  const toggleChecked = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 md:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg max-h-[86dvh] flex flex-col overflow-hidden shadow-2xl"
      >
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Tabaka za Bango ({reversed.length})</h2>
              <p className="text-[11px] text-neutral-400">
                Chagua au futa kipengele chochote usichokitaka kwenye template
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Template Extras Cleanup Strip (Background photo, Watermark, Color Effect) */}
        {(hasBgImage || hasWatermark || hasColorEffect) && (
          <div className="px-3.5 py-2 bg-neutral-950/70 border-b border-neutral-800 flex flex-wrap items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
              Ziada za Template:
            </span>
            {hasBgImage && onClearBackgroundImage && (
              <button
                type="button"
                onClick={onClearBackgroundImage}
                className="px-2 py-1 rounded-lg bg-red-500/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/35 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Ondoa Picha ya Mandhari</span>
              </button>
            )}
            {hasWatermark && onClearWatermark && (
              <button
                type="button"
                onClick={onClearWatermark}
                className="px-2 py-1 rounded-lg bg-red-500/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/35 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Futa Watermark</span>
              </button>
            )}
            {hasColorEffect && onClearColorEffect && (
              <button
                type="button"
                onClick={onClearColorEffect}
                className="px-2 py-1 rounded-lg bg-red-500/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/35 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Ondoa Athari ya Rangi</span>
              </button>
            )}
          </div>
        )}

        <div className="p-3 overflow-y-auto flex-1 flex flex-col gap-1.5">
          {reversed.length === 0 ? (
            <div className="py-10 text-center text-xs text-neutral-400">
              Canvas bado ni tupu. Ongeza maandishi, picha, maumbo, au chati ili zionekane hapa.
            </div>
          ) : (
            reversed.map((el, revIdx) => {
              const info = getElementSummary(el);
              const isSelected = el.id === selectedId;
              const isChecked = checkedIds.includes(el.id);
              const isTop = revIdx === 0;
              const isBottom = revIdx === reversed.length - 1;
              return (
                <div
                  key={el.id}
                  onClick={() => {
                    onSelectElement(el.id);
                    onClose();
                  }}
                  className={`p-2 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-red-500/10 border-red-500/50 text-white'
                      : isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white'
                        : 'bg-neutral-800/70 border-neutral-800 hover:border-neutral-700 text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {onDeleteMultiple && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChecked(el.id);
                        }}
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-red-600 border-red-500 text-white'
                            : 'bg-neutral-900 border-neutral-600 hover:border-neutral-400 text-transparent'
                        }`}
                        title="Chagua kwa ajili ya kufuta"
                        aria-label="Chagua kipengele"
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </button>
                    )}

                    <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 overflow-hidden">
                      {info.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold truncate">{info.label}</div>
                      <div className="text-[10px] text-neutral-400">
                        {info.kind} · {Math.round(el.width)}×{Math.round(el.height)}
                        {el.isLocked ? ' · Imefungwa' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={isTop}
                      onClick={() => onBringForward(el.id)}
                      className="p-1.5 rounded hover:bg-neutral-700 disabled:opacity-30 text-neutral-300 cursor-pointer"
                      title="Pandisha Juu"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={isBottom}
                      onClick={() => onSendBackward(el.id)}
                      className="p-1.5 rounded hover:bg-neutral-700 disabled:opacity-30 text-neutral-300 cursor-pointer"
                      title="Shusha Chini"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleLock(el.id)}
                      className={`p-1.5 rounded hover:bg-neutral-700 cursor-pointer ${
                        el.isLocked ? 'text-amber-400' : 'text-neutral-400'
                      }`}
                      title={el.isLocked ? 'Fungua' : 'Funga (Lock)'}
                    >
                      {el.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDuplicateElement(el.id)}
                      className="p-1.5 rounded hover:bg-neutral-700 text-neutral-300 cursor-pointer hidden sm:inline-flex"
                      title="Nakili"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteElement(el.id)}
                      className="ml-0.5 px-2 py-1 rounded-lg bg-red-500/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/35 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Futa kipengele hiki"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Futa</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Bulk Action Footer */}
        {reversed.length > 0 && (
          <div className="p-3 border-t border-neutral-800 bg-neutral-950/70 flex items-center justify-between gap-2 shrink-0">
            {checkedIds.length > 0 && onDeleteMultiple ? (
              <>
                <button
                  type="button"
                  onClick={() => setCheckedIds([])}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer"
                >
                  Ghairi ({checkedIds.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteMultiple(checkedIds);
                    setCheckedIds([]);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Futa Zilizochaguliwa ({checkedIds.length})</span>
                </button>
              </>
            ) : (
              <>
                <span className="text-[11px] text-neutral-400">
                  Weka tiki pembeni kufuta vingi kwa pamoja
                </span>
                {onClearAllElements && (
                  confirmClearAll ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setConfirmClearAll(false)}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 text-[11px] font-semibold cursor-pointer"
                      >
                        Hapana
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClearAllElements();
                          setConfirmClearAll(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold cursor-pointer"
                      >
                        Thibitisha Futa Vyote
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClearAll(true)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-600 border border-red-500/40 text-red-300 hover:text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Safisha Vipengele Vyote</span>
                    </button>
                  )
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
