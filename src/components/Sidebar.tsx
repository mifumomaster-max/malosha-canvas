import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutTemplate,
  Type,
  Image as ImageIcon,
  Shapes,
  QrCode,
  Palette,
  BarChart3,
  Upload,
  Plus,
  Search,
  Check,
  X,
  LayoutGrid,
  Award,
  Sparkles,
  Stamp
} from 'lucide-react';
import {
  PosterTemplate,
  PosterBackground,
  TextElement,
  ChartType,
  ShapeType,
  ColorEffectPreset,
  WatermarkConfig
} from '../types/poster';
import { TEMPLATES_1000, TEMPLATE_CATEGORY_FILTERS } from '../data/templates1000';
import { SHAPES_100, SHAPES_100_MAP, ShapeCategory } from '../data/shapes100';
import { TEXT_PRESETS_100, TextPresetCategory } from '../data/textPresets100';
import { READY_LOGOS, LOGO_EMBLEMS, buildCustomLogoDataUrl } from '../data/logos';
import { COLOR_EFFECT_PRESETS, DEFAULT_WATERMARK } from '../data/colorEffects';
import { STOCK_PHOTO_ITEMS } from '../data/stockImages';

export type SidebarTab =
  | 'templates'
  | 'charts'
  | 'text'
  | 'photos'
  | 'shapes'
  | 'logos'
  | 'qr'
  | 'background'
  | 'concepts50';

interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  isMobileDrawerOpen: boolean;
  onOpenMobileDrawer: (tab: SidebarTab) => void;
  onCloseMobileDrawer: () => void;
  onSelectTemplate: (template: PosterTemplate) => void;
  onAddText: (
    text: string,
    fontSize: number,
    fontWeight: string | number,
    fontFamily: string,
    color: string,
    extra?: Partial<TextElement>
  ) => void;
  onAddShape: (shapeType: ShapeType, fill: string, stroke?: string) => void;
  onAddBadge: (
    text: string,
    secondaryText: string | undefined,
    bgColor: string,
    textColor: string
  ) => void;
  onAddImage: (src: string, width?: number, height?: number) => void;
  onAddQrCode: (data: string, label?: string, qrColor?: string, bgColor?: string) => void;
  onAddChart: (chartType: ChartType, title?: string) => void;
  onToggleGrid?: () => void;
  currentBackground: PosterBackground;
  onChangeBackground: (bg: PosterBackground) => void;
  currentColorEffect: ColorEffectPreset;
  onChangeColorEffect: (effect: ColorEffectPreset) => void;
  currentWatermark: WatermarkConfig;
  onChangeWatermark: (wm: WatermarkConfig, commit?: boolean) => void;
}

const TEMPLATES_PAGE_SIZE = 24;

export const Sidebar: React.FC<SidebarProps> = React.memo(({
  activeTab,
  onTabChange,
  isMobileDrawerOpen,
  onOpenMobileDrawer,
  onCloseMobileDrawer,
  onSelectTemplate,
  onAddText,
  onAddShape,
  onAddBadge,
  onAddImage,
  onAddQrCode,
  onAddChart,
  onToggleGrid,
  currentBackground,
  onChangeBackground,
  currentColorEffect,
  onChangeColorEffect,
  currentWatermark,
  onChangeWatermark
}) => {
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCategory, setTemplateCategory] = useState<string>('all');
  const [templateVisibleCount, setTemplateVisibleCount] = useState<number>(TEMPLATES_PAGE_SIZE);

  const [textSearch, setTextSearch] = useState('');
  const [textCategory, setTextCategory] = useState<TextPresetCategory>('Zote');

  const [shapeSearch, setShapeSearch] = useState('');
  const [shapeCategory, setShapeCategory] = useState<'Zote' | ShapeCategory>('Zote');

  const [conceptSearch, setConceptSearch] = useState('');

  // Custom Brand Logo Builder state
  const [logoBrandName, setLogoBrandName] = useState('MALOSHA');
  const [logoSubtitle, setLogoSubtitle] = useState('POSTER & DESIGN');
  const [logoEmblemId, setLogoEmblemId] = useState('crown');
  const [logoColor, setLogoColor] = useState('#fbbf24');
  const [logoStyle, setLogoStyle] = useState<'badge' | 'minimal' | 'emblem' | 'shield'>('badge');

  // Background / Color Effect / Watermark sub-tab
  const [appearanceSubTab, setAppearanceSubTab] = useState<'bg' | 'effects' | 'watermark'>('bg');

  const [qrInput, setQrInput] = useState('https://malosha.co.tz');
  const [qrLabel, setQrLabel] = useState('TEMBELEA TOVUTI');
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');

  // Reset pagination when template filter/search changes
  useEffect(() => {
    setTemplateVisibleCount(TEMPLATES_PAGE_SIZE);
  }, [templateCategory, templateSearch]);

  // Filter 1,000 templates (memoized + paginated)
  const filteredTemplates = useMemo(() => {
    const q = templateSearch.trim().toLowerCase();
    return TEMPLATES_1000.filter((t) => {
      const matchCat = templateCategory === 'all' || t.category === templateCategory;
      const matchSearch =
        q === '' ||
        t.title.toLowerCase().includes(q) ||
        t.titleSwahili.toLowerCase().includes(q) ||
        t.categoryLabelSwahili.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [templateCategory, templateSearch]);

  const visibleTemplates = useMemo(
    () => filteredTemplates.slice(0, templateVisibleCount),
    [filteredTemplates, templateVisibleCount]
  );

  // Filter 100 text presets
  const filteredTextPresets = useMemo(() => {
    const q = textSearch.trim().toLowerCase();
    return TEXT_PRESETS_100.filter((item) => {
      const matchCat = textCategory === 'Zote' || item.category === textCategory;
      const matchQ =
        q === '' ||
        item.label.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [textCategory, textSearch]);

  // Filter 100 vector shapes
  const filteredShapes = useMemo(() => {
    const q = shapeSearch.trim().toLowerCase();
    return SHAPES_100.filter((s) => {
      const matchCat = shapeCategory === 'Zote' || s.category === shapeCategory;
      const matchQ =
        q === '' ||
        s.label.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [shapeCategory, shapeSearch]);

  const customLogoPreviewUrl = useMemo(
    () => buildCustomLogoDataUrl(logoBrandName, logoSubtitle, logoEmblemId, logoColor, logoStyle),
    [logoBrandName, logoSubtitle, logoEmblemId, logoColor, logoStyle]
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const maxDim = 1500;
      let targetW = img.naturalWidth || 800;
      let targetH = img.naturalHeight || 600;
      if (targetW > maxDim || targetH > maxDim) {
        const ratio = Math.min(maxDim / targetW, maxDim / targetH);
        targetW = Math.round(targetW * ratio);
        targetH = Math.round(targetH * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      let dataUrl = '';
      if (ctx) {
        ctx.drawImage(img, 0, 0, targetW, targetH);
        const keepAlpha = file.type === 'image/png' || file.type === 'image/webp';
        dataUrl = keepAlpha
          ? canvas.toDataURL('image/webp', 0.88)
          : canvas.toDataURL('image/jpeg', 0.86);
      }
      URL.revokeObjectURL(objectUrl);

      if (dataUrl) {
        const displayW = Math.min(460, targetW);
        const displayH = Math.max(120, Math.round((displayW / targetW) * targetH));
        onAddImage(dataUrl, displayW, displayH);
        onCloseMobileDrawer();
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onAddImage(result, 400, 300);
          onCloseMobileDrawer();
        }
      };
      reader.readAsDataURL(file);
    };
    img.src = objectUrl;
    e.target.value = '';
  };

  const navItems: {
    id: SidebarTab;
    label: string;
    shortLabel: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'templates', label: 'Violezo 1000', shortLabel: 'Violezo', icon: LayoutTemplate },
    { id: 'charts', label: 'Grafu 16', shortLabel: 'Grafu', icon: BarChart3 },
    { id: 'concepts50', label: 'Dhana 50', shortLabel: 'Dhana 50', icon: LayoutGrid },
    { id: 'text', label: 'Maneno 100', shortLabel: 'Maneno', icon: Type },
    { id: 'shapes', label: 'Maumbo 100', shortLabel: 'Maumbo', icon: Shapes },
    { id: 'logos', label: 'Nembo', shortLabel: 'Nembo', icon: Award },
    { id: 'photos', label: 'Picha', shortLabel: 'Picha', icon: ImageIcon },
    { id: 'qr', label: 'QR Code', shortLabel: 'QR', icon: QrCode },
    { id: 'background', label: 'Rangi/Athari', shortLabel: 'Athari', icon: Palette }
  ];

  const activeNavLabel = navItems.find((n) => n.id === activeTab)?.label || '';

  const chartCatalog: { type: ChartType; title: string; label: string; desc: string; tag: string }[] = [
    { type: 'bar', title: 'Mauzo ya Robo Mwaka', label: 'Mihimili Wima (Bar)', desc: 'Linganisha vipengele na mauzo', tag: 'BAR' },
    { type: 'horizontal-bar', title: 'Orodha ya Utendaji', label: 'Mihimili Mlalo (H-Bar)', desc: 'Bora kwa majina marefu na viwango', tag: 'H-BAR' },
    { type: 'stacked-bar', title: 'Mapato vs Matumizi', label: 'Mrundiko (Stacked Bar)', desc: 'Linganisha seti mbili za namba', tag: 'STACK' },
    { type: 'pie', title: 'Asilimia za Wateja', label: 'Chati ya Duara (Pie)', desc: 'Mgawanyo kamili wa asilimia', tag: 'PIE' },
    { type: 'donut', title: 'Mgawanyo wa Masoko', label: 'Chati ya Donati (Donut)', desc: 'Namba kuu katikati + asilimia', tag: 'DONUT' },
    { type: 'semi-donut', title: 'Kipimo cha Bajeti', label: 'Nusu Duara (Gauge)', desc: 'Muonekano wa spidi/kipimo', tag: 'GAUGE' },
    { type: 'line', title: 'Mwelekeo wa Ukuaji', label: 'Mstari wa Mwenendo (Line)', desc: 'Ukuaji wa mwezi hadi mwezi', tag: 'LINE' },
    { type: 'area', title: 'Kiwango cha Mapato', label: 'Grafu ya Eneo (Area)', desc: 'Eneo lenye rangi chini ya mstari', tag: 'AREA' },
    { type: 'spline', title: 'Mwenendo Mlaini', label: 'Mstari Mlaini (Spline)', desc: 'Mkunjo laini wa takwimu', tag: 'CURVE' },
    { type: 'scatter', title: 'Mtawanyiko wa Data', label: 'Nukta (Scatter Plot)', desc: 'Uhusiano wa pointi mbalimbali', tag: 'DOTS' },
    { type: 'radar', title: 'Tathmini ya Ubora', label: 'Grafu ya Rada (Spider)', desc: 'Linganisha vigezo 4+ kwa pamoja', tag: 'RADAR' },
    { type: 'funnel', title: 'Hatua za Wateja', label: 'Faneli ya Mauzo (Funnel)', desc: 'Kutoka wageni hadi wanunuzi', tag: 'FUNNEL' },
    { type: 'progress-ring', title: 'Kiwango cha Lengo', label: 'Mita Duara ya Asilimia', desc: 'Mafanikio ya lengo (0-100%)', tag: '85%' },
    { type: 'progress-bar', title: 'Hatua ya Mradi', label: 'Upau wa Asilimia (Bar)', desc: 'Mstari mlalo wa maendeleo', tag: 'BAR %' },
    { type: 'metric-kpi', title: 'Takwimu ya Mwaka', label: 'Kadi ya Takwimu (KPI)', desc: 'Namba kubwa + mwelekeo ▲/▼', tag: 'KPI' },
    { type: 'comparison-table', title: 'Jedwali la Takwimu', label: 'Jedwali la Ulinganisho', desc: 'Safu za data zenye pau ndogo', tag: 'TABLE' }
  ];

  const concepts50List = useMemo<{
    num: number;
    title: string;
    group: 'Grafu' | 'Takwimu' | 'Maumbo' | 'Ubunifu';
    hint: string;
    run: () => void;
  }[]>(() => [
    ...chartCatalog.map((c, idx) => ({
      num: idx + 1,
      title: c.label,
      group: 'Grafu' as const,
      hint: c.desc,
      run: () => {
        onAddChart(c.type, c.title);
        onCloseMobileDrawer();
      }
    })),
    {
      num: 17,
      title: 'Jedwali & CSV Import',
      group: 'Takwimu',
      hint: 'Ingiza data nyingi kwa kubandika CSV (100% Spark Plan)',
      run: () => {
        onAddChart('bar', 'Data za CSV');
        onCloseMobileDrawer();
      }
    },
    {
      num: 18,
      title: 'Mistari ya Grid (Gridlines)',
      group: 'Takwimu',
      hint: 'Mistari ya usawa nyuma ya grafu kwa usomaji sahihi',
      run: () => {
        onAddChart('line', 'Grafu yenye Gridlines');
        onCloseMobileDrawer();
      }
    },
    {
      num: 19,
      title: 'Lebo za Namba (Data Labels)',
      group: 'Takwimu',
      hint: 'Onyesha thamani halisi juu ya kila nguzo au nukta',
      run: () => {
        onAddChart('bar', 'Takwimu zenye Namba');
        onCloseMobileDrawer();
      }
    },
    {
      num: 20,
      title: 'Maelezo ya Rangi (Legend)',
      group: 'Takwimu',
      hint: 'Ufafanuzi wa vipengele chini ya chati ya duara/donati',
      run: () => {
        onAddChart('donut', 'Mgawanyo wa Masoko');
        onCloseMobileDrawer();
      }
    },
    {
      num: 21,
      title: 'Vipimo vya Fedha/Asilimia (Units)',
      group: 'Takwimu',
      hint: 'Ongeza TSH, $, %, au M kupitia Hariri Takwimu',
      run: () => {
        onAddChart('metric-kpi', 'Mapato ya Mwezi');
        onCloseMobileDrawer();
      }
    },
    {
      num: 22,
      title: 'Kadi ya Uwazi (Transparent Chart)',
      group: 'Takwimu',
      hint: 'Weka grafu bila boksi ili iendane na mandhari ya bango',
      run: () => {
        onAddChart('area', 'Mwenendo (Uwazi)');
        onCloseMobileDrawer();
      }
    },
    {
      num: 23,
      title: 'Upangaji wa Data (Auto-Sort)',
      group: 'Takwimu',
      hint: 'Panga data kutoka kubwa kwenda ndogo kwenye Chart Editor',
      run: () => {
        onAddChart('horizontal-bar', 'Orodha Iliyopangwa');
        onCloseMobileDrawer();
      }
    },
    {
      num: 24,
      title: 'Mwelekeo wa KPI (Trend ▲/▼)',
      group: 'Takwimu',
      hint: 'Viashiria vya kupanda ▲, kushuka ▼, au thabiti ●',
      run: () => {
        onAddChart('metric-kpi', 'Ukuaji wa Biashara');
        onCloseMobileDrawer();
      }
    },
    ...SHAPES_100.slice(0, 16).map((s, idx) => ({
      num: 25 + idx,
      title: `Umbo: ${s.label}`,
      group: 'Maumbo' as const,
      hint: `Weka umbo la ${s.label} lenye rangi na ukingo`,
      run: () => {
        onAddShape(s.id, '#f59e0b', s.id === 'frame-border' ? '#fbbf24' : undefined);
        onCloseMobileDrawer();
      }
    })),
    {
      num: 41,
      title: 'Beji ya Ofa (Sales Badge)',
      group: 'Ubunifu',
      hint: 'Beji ya kuvuta macho yenye punguzo au bei',
      run: () => {
        onAddBadge('PUNGUZO 50% LEO', 'OFA YA HARAKA', '#dc2626', '#ffffff');
        onCloseMobileDrawer();
      }
    },
    {
      num: 42,
      title: 'Maandishi yenye Ukingo (Outline)',
      group: 'Ubunifu',
      hint: 'Herufi kubwa zenye mstari wa nje na kivuli kizito',
      run: () => {
        onAddText('OFA KUBWA', 56, 900, 'Anton', '#fbbf24', {
          strokeColor: '#000000',
          strokeWidth: 4,
          shadowColor: '#000000',
          shadowBlur: 12
        });
        onCloseMobileDrawer();
      }
    },
    {
      num: 43,
      title: 'Kasha la Tangazo (Text Highlight)',
      group: 'Ubunifu',
      hint: 'Maandishi yenye boksi zuri nyuma kwa msisitizo',
      run: () => {
        onAddText('JIUNGE NASI LEO', 26, 800, 'Outfit', '#000000', {
          backgroundColor: '#fbbf24',
          borderRadius: 12
        });
        onCloseMobileDrawer();
      }
    },
    {
      num: 44,
      title: 'Nukuu ya Kifahari (Editorial Serif)',
      group: 'Ubunifu',
      hint: 'Mtindo wa magazeti na mabango ya heshima',
      run: () => {
        onAddText('“Ubora wa kipekee unaoonekana kwa kila mtazamo.”', 26, 600, 'Playfair Display', '#f8fafc', {
          fontStyle: 'italic'
        });
        onCloseMobileDrawer();
      }
    },
    {
      num: 45,
      title: 'Rule of Thirds & Safe Margins',
      group: 'Ubunifu',
      hint: 'Washa/zima mistari ya ulinganifu na mipaka salama',
      run: () => {
        onToggleGrid?.();
        onCloseMobileDrawer();
      }
    },
    {
      num: 46,
      title: 'Athari za Rangi (Color Grading)',
      group: 'Ubunifu',
      hint: 'Badili mwanga wa bango zima (Sinema, Vintage, Neon, Dhahabu)',
      run: () => {
        setAppearanceSubTab('effects');
        onTabChange('background');
      }
    },
    {
      num: 47,
      title: 'QR Code ya Malipo / Mawasiliano',
      group: 'Ubunifu',
      hint: 'QR Code inayochanganuliwa na simu moja kwa moja',
      run: () => {
        onAddQrCode('https://malosha.co.tz', 'SCAN KWA MAELEZO', '#000000', '#ffffff');
        onCloseMobileDrawer();
      }
    },
    {
      num: 48,
      title: 'Watermark ya Hakimiliki',
      group: 'Ubunifu',
      hint: 'Weka alama ya jina au chapa yako kwenye bango lote',
      run: () => {
        setAppearanceSubTab('watermark');
        onTabChange('background');
      }
    },
    {
      num: 49,
      title: 'Nembo ya Kampuni (Logo Builder)',
      group: 'Ubunifu',
      hint: 'Tengeneza au chagua nembo ya vekta papo hapo',
      run: () => {
        onTabChange('logos');
      }
    },
    {
      num: 50,
      title: 'Kichwa cha Bango (Golden Ratio)',
      group: 'Ubunifu',
      hint: 'Herufi nzito zenye kivuli cha kitaalamu',
      run: () => {
        onAddText('MALOSHA STUDIO', 54, 900, 'Anton', '#ffffff', {
          shadowColor: 'rgba(0,0,0,0.8)',
          shadowBlur: 18,
          shadowOffsetY: 6
        });
        onCloseMobileDrawer();
      }
    }
  ], [onAddChart, onAddShape, onAddBadge, onAddText, onToggleGrid, onAddQrCode, onTabChange, onCloseMobileDrawer]);

  const filteredConcepts = useMemo(() => {
    const q = conceptSearch.trim().toLowerCase();
    return concepts50List.filter(
      (c) =>
        q === '' ||
        c.title.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [concepts50List, conceptSearch]);

  const wm = currentWatermark || DEFAULT_WATERMARK;

  const renderDrawerBody = () => (
    <>
      {/* TAB 1: TEMPLATES (1,000 VARIED TEMPLATES) */}
      {activeTab === 'templates' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Violezo 1,000</h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Nukuu, Breaking News, Jarida, Kadi, ID, Cheti &amp; Grafu.
              </p>
            </div>
            <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md shrink-0">
              {filteredTemplates.length}
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tafuta kiolezo (mf: Breaking, Cheti, ID, Nukuu)..."
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Wrapping Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 pb-1 text-xs">
            {TEMPLATE_CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setTemplateCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  templateCategory === cat.id
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Paginated Template Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2.5 mt-1">
            {visibleTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  onSelectTemplate(template);
                  onCloseMobileDrawer();
                }}
                className="group relative bg-neutral-800/80 border border-neutral-700/80 hover:border-amber-400 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="aspect-[3/4] w-full bg-neutral-950 overflow-hidden relative">
                  {template.thumbnailPreview ? (
                    <img
                      src={template.thumbnailPreview}
                      alt={template.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col justify-between p-2.5 text-left relative"
                      style={{
                        background:
                          template.previewBg ||
                          'linear-gradient(150deg, #1e1b4b, #0f172a, #020617)'
                      }}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-black uppercase tracking-wider"
                          style={{ backgroundColor: template.previewAccent || '#fbbf24' }}
                        >
                          {template.previewBadge || template.categoryLabelSwahili.slice(0, 8)}
                        </span>
                        <span className="text-[9px] font-mono text-white/60">
                          {template.width}×{template.height}
                        </span>
                      </div>

                      {/* Mini structural visual lines hinting at layout */}
                      <div className="my-auto flex flex-col gap-1.5 opacity-85">
                        <div
                          className="h-1.5 w-10 rounded-full"
                          style={{ backgroundColor: template.previewAccent || '#fbbf24' }}
                        />
                        <div className="text-[11px] font-bold text-white leading-tight line-clamp-3 drop-shadow">
                          {template.titleSwahili}
                        </div>
                      </div>

                      <div className="h-1 w-full rounded bg-white/15 overflow-hidden">
                        <div
                          className="h-full w-2/3"
                          style={{ backgroundColor: template.previewAccent || '#fbbf24' }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-2">
                    <span className="text-[10px] font-bold text-white leading-tight line-clamp-1 block">
                      {template.titleSwahili}
                    </span>
                    <span className="text-[9px] text-amber-300 block truncate">
                      {template.categoryLabelSwahili}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleTemplates.length < filteredTemplates.length && (
            <button
              onClick={() => setTemplateVisibleCount((c) => c + TEMPLATES_PAGE_SIZE)}
              className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-400 text-amber-300 font-bold text-xs rounded-xl cursor-pointer transition-colors"
            >
              Onyesha Zaidi ({filteredTemplates.length - visibleTemplates.length} zimebaki)
            </button>
          )}
        </div>
      )}

      {/* TAB 2: CHARTS & GRAPHS (16 TYPES) */}
      {activeTab === 'charts' && (
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Grafu &amp; Chati 16 (Spark Plan)
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Chagua aina yoyote kati ya grafu 16 za takwimu, faneli, rada na KPI.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {chartCatalog.map((item) => (
              <button
                key={item.type}
                onClick={() => {
                  onAddChart(item.type, item.title);
                  onCloseMobileDrawer();
                }}
                className="p-2.5 bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-mono text-[10px] font-bold">
                    {item.tag}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate">{item.label}</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5 truncate">
                      {item.desc}
                    </span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB: DHANA 50 ZA GRAFU NA UBUNIFU */}
      {activeTab === 'concepts50' && (
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Dhana 50 za Grafu &amp; Ubunifu
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Zote zinafanya kazi 100% bila malipo (Firebase Spark Plan). Gusa yoyote kutumia.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tafuta dhana (mf: Radar, Funnel, Watermark)..."
              value={conceptSearch}
              onChange={(e) => setConceptSearch(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            {filteredConcepts.map((c) => (
              <button
                key={c.num}
                onClick={c.run}
                className="w-full p-2.5 bg-neutral-800/75 hover:bg-neutral-800 border border-neutral-700/80 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="font-mono tabular-nums text-[11px] font-bold text-amber-400 w-6 shrink-0 pt-0.5">
                    {String(c.num).padStart(2, '0')}.
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <span className="truncate">{c.title}</span>
                      <span className="text-[10px] font-normal text-neutral-400 shrink-0">
                        · {c.group}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">{c.hint}</p>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 100 TEXT & TYPOGRAPHY PRESETS */}
      {activeTab === 'text' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Maandishi 100</h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Mitindo 100 ya vichwa vikuu, habari, nukuu, cheti &amp; ofa.
              </p>
            </div>
            <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md shrink-0">
              {filteredTextPresets.length}
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tafuta mtindo (mf: Breaking, Nukuu, Cheti)..."
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(
              [
                'Zote',
                'Vichwa Vikuu',
                'Breaking News',
                'Biashara & Ofa',
                'Nukuu & Ibada',
                'Sherehe & Kadi',
                'Cheti & ID',
                'Takwimu & Neon'
              ] as TextPresetCategory[]
            ).map((cat) => (
              <button
                key={cat}
                onClick={() => setTextCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors ${
                  textCategory === cat
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {filteredTextPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  onAddText(
                    preset.text,
                    preset.fontSize,
                    preset.fontWeight,
                    preset.fontFamily,
                    preset.color,
                    preset.extra
                  );
                  onCloseMobileDrawer();
                }}
                className="w-full py-2.5 px-3 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="min-w-0">
                  <span
                    className="text-sm block truncate leading-snug px-1.5 py-0.5 rounded"
                    style={{
                      fontFamily: `"${preset.fontFamily}", sans-serif`,
                      fontWeight: preset.fontWeight,
                      fontStyle: preset.extra?.fontStyle || 'normal',
                      color:
                        preset.color === '#0f172a' || preset.color === '#1e293b' || preset.color === '#000000'
                          ? preset.extra?.backgroundColor
                            ? preset.color
                            : '#f8fafc'
                          : preset.color,
                      backgroundColor: preset.extra?.backgroundColor
                    }}
                  >
                    {preset.label}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-0.5 block truncate px-1.5">
                    {preset.category} · {preset.fontFamily} ({preset.fontSize}px)
                  </span>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PHOTOS & UPLOADS */}
      {activeTab === 'photos' && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Picha &amp; Pakia</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Pakia picha yako kutoka kwenye simu/kompyuta au tumia picha zilizopo.
            </p>
          </div>

          <label className="w-full py-4 border-2 border-dashed border-neutral-700 hover:border-amber-400 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors group">
            <Upload className="w-5 h-5 text-neutral-400 group-hover:text-amber-400" />
            <span className="text-xs font-bold text-white">Pakia Picha au Nembo</span>
            <span className="text-[10px] text-neutral-400">PNG, JPG, au WebP</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <div>
            <span className="text-xs font-semibold text-neutral-300">Picha za Mandhari Zilizopo:</span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {STOCK_PHOTO_ITEMS.map((stock) => (
                <div
                  key={stock.title}
                  onClick={() => {
                    onAddImage(stock.url, 400, 500);
                    onCloseMobileDrawer();
                  }}
                  className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-neutral-700 hover:border-amber-400 cursor-pointer bg-neutral-950"
                >
                  <img
                    src={stock.url}
                    alt={stock.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] font-semibold text-white leading-tight">
                      {stock.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 100 VECTOR SHAPES & BADGES */}
      {activeTab === 'shapes' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Maumbo 100 &amp; Beji</h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Maumbo 100 ya vekta zinazong’aa kwa ubora wa 4K.
              </p>
            </div>
            <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md shrink-0">
              {filteredShapes.length}
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tafuta umbo (mf: Nyota, Mshale, Fremu, Taji)..."
              value={shapeSearch}
              onChange={(e) => setShapeSearch(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['Zote', 'Msingi', 'Nyota & Beji', 'Mishale', 'Fremu & Kadi', 'Alama & Ikoni'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setShapeCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors ${
                    shapeCategory === cat
                      ? 'bg-amber-400 text-black font-semibold'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {filteredShapes.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onAddShape(s.id, '#f59e0b', s.id === 'frame-border' ? '#fbbf24' : undefined);
                  onCloseMobileDrawer();
                }}
                className="aspect-square bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-400 rounded-lg flex flex-col items-center justify-center p-1 cursor-pointer transition-colors"
                title={s.label}
              >
                <ShapeThumb shape={s.id} />
                <span className="text-[9px] text-neutral-300 mt-1 truncate max-w-full">
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800">
            <span className="text-xs font-semibold text-neutral-300">Beji za Matangazo &amp; Ofa:</span>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {[
                { text: 'PUNGUZO 50% LEO', sub: 'OFA YA HARAKA', bg: '#dc2626', textCol: '#ffffff' },
                { text: 'KARIBU WOTE BILA KIINGILIO', sub: 'HAKUNA MALIPO', bg: '#16a34a', textCol: '#ffffff' },
                { text: 'TIKETI ZA VIP TSH 50,000', sub: 'NAFASI CHACHE ZIMEBAKI', bg: '#2563eb', textCol: '#ffffff' },
                { text: 'BIDHAA MPYA ZIMEWASILI', sub: 'UBORA WA JUU', bg: '#f59e0b', textCol: '#000000' }
              ].map((badge, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onAddBadge(badge.text, badge.sub, badge.bg, badge.textCol);
                    onCloseMobileDrawer();
                  }}
                  className="p-2.5 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 rounded-xl text-left cursor-pointer transition-colors"
                >
                  <div
                    className="px-3 py-1 rounded-full inline-block text-center font-bold text-[11px]"
                    style={{ backgroundColor: badge.bg, color: badge.textCol }}
                  >
                    {badge.text}
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">{badge.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEW TAB: LOGOS (CUSTOM LOGO BUILDER + 24 READY LOGOS) */}
      {activeTab === 'logos' && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Nembo &amp; Logo Studio</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Unda nembo ya jina la biashara yako au chagua kati ya nembo 24 zilizo tayari.
            </p>
          </div>

          {/* Custom Brand Logo Maker */}
          <div className="p-3 bg-neutral-800/70 border border-neutral-700 rounded-xl flex flex-col gap-2.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Unda Nembo Yako Papo Hapo:
            </span>

            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-2 flex items-center justify-center min-h-[84px]">
              <img
                src={customLogoPreviewUrl}
                alt="Hakiki ya Nembo"
                className="max-h-20 object-contain"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={logoBrandName}
                onChange={(e) => setLogoBrandName(e.target.value)}
                placeholder="Jina la Chapa..."
                className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <input
                type="text"
                value={logoSubtitle}
                onChange={(e) => setLogoSubtitle(e.target.value)}
                placeholder="Kauli Mbiu..."
                className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={logoStyle}
                onChange={(e) =>
                  setLogoStyle(e.target.value as 'badge' | 'minimal' | 'emblem' | 'shield')
                }
                className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1.5 text-xs text-white"
              >
                <option value="badge">Mtindo: Beji Mlalo</option>
                <option value="minimal">Mtindo: Kisasa (Minimal)</option>
                <option value="emblem">Mtindo: Muhuri Duara</option>
                <option value="shield">Mtindo: Ngao Rasmi</option>
              </select>
              <label className="flex items-center justify-between bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-300">
                <span>Rangi Kuu:</span>
                <input
                  type="color"
                  value={logoColor}
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="w-6 h-5 bg-transparent border-0 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-1">
              {LOGO_EMBLEMS.map((em) => (
                <button
                  key={em.id}
                  onClick={() => setLogoEmblemId(em.id)}
                  className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer ${
                    logoEmblemId === em.id
                      ? 'bg-amber-400 text-black'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-700'
                  }`}
                >
                  {em.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const isSquare = logoStyle === 'emblem' || logoStyle === 'shield';
                onAddImage(customLogoPreviewUrl, isSquare ? 240 : 340, isSquare ? 240 : 114);
                onCloseMobileDrawer();
              }}
              className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Weka Nembo Yako Kwenye Bango</span>
            </button>
          </div>

          {/* 24 Ready Logos */}
          <div>
            <span className="text-xs font-semibold text-neutral-300">
              Nembo 24 Zilizopo Tayari (Gusa Kuweka):
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {READY_LOGOS.map((logo) => {
                const isSq = logo.style === 'emblem' || logo.style === 'shield';
                return (
                  <button
                    key={logo.id}
                    onClick={() => {
                      onAddImage(logo.dataUrl, isSq ? 220 : 320, isSq ? 220 : 108);
                      onCloseMobileDrawer();
                    }}
                    className="p-2 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-400 rounded-xl flex flex-col items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <div className="w-full h-14 flex items-center justify-center bg-neutral-950 rounded-lg p-1.5">
                      <img
                        src={logo.dataUrl}
                        alt={logo.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-neutral-200 truncate max-w-full">
                      {logo.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: QR CODE GENERATOR */}
      {activeTab === 'qr' && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Tengeneza QR Code</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Ongeza QR Code ya tovuti, namba ya simu, malipo ya M-Pesa, au WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'Tovuti', val: 'https://malosha.co.tz', lbl: 'TEMBELEA TOVUTI' },
              { label: 'Piga Simu', val: 'tel:+255755123456', lbl: 'PIGA SASA' },
              { label: 'WhatsApp', val: 'https://wa.me/255755123456', lbl: 'WHATSAPP YETU' },
              { label: 'M-Pesa Lipa', val: 'Lipa Namba: 554433', lbl: 'LIPA KWA M-PESA' }
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setQrInput(p.val);
                  setQrLabel(p.lbl);
                }}
                className="px-2.5 py-1.5 md:py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] rounded border border-neutral-700 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div>
            <label className="text-[11px] font-medium text-neutral-400">Data / Link ya QR Code:</label>
            <input
              type="text"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              placeholder="https://... au namba ya simu"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-neutral-400">Maandishi ya Chini (Label):</label>
            <input
              type="text"
              value={qrLabel}
              onChange={(e) => setQrLabel(e.target.value)}
              placeholder="Mfano: SCAN KUJIUNGA"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-neutral-400">Rangi ya Mistari:</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-8 h-8 rounded border border-neutral-700 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-300">{qrColor}</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-400">Rangi ya Nyuma:</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={qrBgColor}
                  onChange={(e) => setQrBgColor(e.target.value)}
                  className="w-8 h-8 rounded border border-neutral-700 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-300">{qrBgColor}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onAddQrCode(qrInput, qrLabel, qrColor, qrBgColor);
              onCloseMobileDrawer();
            }}
            className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Weka QR Code Kwenye Bango</span>
          </button>
        </div>
      )}

      {/* TAB 7: MANDHARI, ATHARI ZA RANGI & WATERMARK */}
      {activeTab === 'background' && (
        <div className="flex flex-col gap-4">
          {/* 3-way sub-tabs */}
          <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            {[
              { id: 'bg' as const, label: 'Mandhari', icon: Palette },
              { id: 'effects' as const, label: 'Athari Rangi', icon: Sparkles },
              { id: 'watermark' as const, label: 'Watermark', icon: Stamp }
            ].map((st) => {
              const SubIcon = st.icon;
              const isAct = appearanceSubTab === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setAppearanceSubTab(st.id)}
                  className={`py-1.5 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                    isAct
                      ? 'bg-amber-400 text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <SubIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{st.label}</span>
                </button>
              );
            })}
          </div>

          {appearanceSubTab === 'bg' && (
            <>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight">Rangi &amp; Mandhari</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Badilisha rangi ya nyuma au mchanganyiko (gradient).
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-neutral-300">Rangi Nzito (Solid Colors):</span>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {[
                    '#0a0a0a',
                    '#0f172a',
                    '#1e112a',
                    '#172554',
                    '#14532d',
                    '#7f1d1d',
                    '#ffffff',
                    '#f8fafc',
                    '#facc15',
                    '#ea580c',
                    '#ec4899',
                    '#6366f1'
                  ].map((col) => (
                    <button
                      key={col}
                      onClick={() => onChangeBackground({ type: 'color', color: col })}
                      className="aspect-square rounded-lg border border-neutral-700 hover:scale-105 transition-transform cursor-pointer relative"
                      style={{ backgroundColor: col }}
                      title={col}
                    >
                      {currentBackground.type === 'color' && currentBackground.color === col && (
                        <Check
                          className={`w-4 h-4 absolute inset-0 m-auto ${
                            col === '#ffffff' || col === '#f8fafc' || col === '#facc15'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <span className="text-xs font-semibold text-neutral-300">
                  Mchanganyiko wa Rangi (Gradients):
                </span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    {
                      name: 'Royal Purple',
                      angle: 180,
                      stops: [
                        { offset: 0, color: '#2e1065' },
                        { offset: 1, color: '#090514' }
                      ]
                    },
                    {
                      name: 'Deep Midnight',
                      angle: 145,
                      stops: [
                        { offset: 0, color: '#1e293b' },
                        { offset: 1, color: '#020617' }
                      ]
                    },
                    {
                      name: 'Electric Neon',
                      angle: 135,
                      stops: [
                        { offset: 0, color: '#7c3aed' },
                        { offset: 0.5, color: '#4f46e5' },
                        { offset: 1, color: '#0f172a' }
                      ]
                    },
                    {
                      name: 'Sunset Flame',
                      angle: 135,
                      stops: [
                        { offset: 0, color: '#991b1b' },
                        { offset: 0.6, color: '#ea580c' },
                        { offset: 1, color: '#450a0a' }
                      ]
                    },
                    {
                      name: 'Emerald Luxury',
                      angle: 160,
                      stops: [
                        { offset: 0, color: '#064e3b' },
                        { offset: 1, color: '#022c22' }
                      ]
                    },
                    {
                      name: 'Corporate Ocean',
                      angle: 160,
                      stops: [
                        { offset: 0, color: '#0284c7' },
                        { offset: 0.7, color: '#0f172a' },
                        { offset: 1, color: '#020617' }
                      ]
                    }
                  ].map((grad, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        onChangeBackground({
                          type: 'gradient',
                          gradient: {
                            type: 'linear',
                            angle: grad.angle,
                            stops: grad.stops
                          }
                        })
                      }
                      className="h-16 rounded-xl border border-neutral-700 hover:border-amber-400 p-2 flex items-end cursor-pointer transition-all hover:scale-[1.02]"
                      style={{
                        background: `linear-gradient(${grad.angle}deg, ${grad.stops[0].color}, ${grad.stops[grad.stops.length - 1].color})`
                      }}
                    >
                      <span className="text-[11px] font-bold text-white shadow-sm">{grad.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {appearanceSubTab === 'effects' && (
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight">
                  Athari za Rangi ya Bango Zima
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Badilisha mwanga na hisia za bango zima papo hapo (inaonekana hadi kwenye 4K Download).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {COLOR_EFFECT_PRESETS.map((eff) => {
                  const isActive = (currentColorEffect || 'none') === eff.id;
                  return (
                    <button
                      key={eff.id}
                      onClick={() => onChangeColorEffect(eff.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isActive
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-neutral-700 bg-neutral-800/80 hover:border-neutral-500'
                      }`}
                    >
                      <div
                        className="w-full h-8 rounded-lg flex items-center justify-end px-2"
                        style={{ background: eff.swatch }}
                      >
                        {isActive && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </div>
                      <span className="text-xs font-bold text-white leading-tight">{eff.label}</span>
                      <span className="text-[10px] text-neutral-400 leading-tight line-clamp-2">
                        {eff.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {appearanceSubTab === 'watermark' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">Watermark ya Bango</h2>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Linda kazi yako kwa jina au chapa yako kwenye bango.
                  </p>
                </div>
                <button
                  onClick={() => onChangeWatermark({ ...wm, enabled: !wm.enabled })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    wm.enabled
                      ? 'bg-amber-400 text-black'
                      : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                  }`}
                >
                  {wm.enabled ? 'IMEWASHWA' : 'IMEZIMWA'}
                </button>
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-400">Maandishi ya Watermark:</label>
                <input
                  type="text"
                  value={wm.text}
                  onChange={(e) =>
                    onChangeWatermark({ ...wm, enabled: true, text: e.target.value }, false)
                  }
                  placeholder="Mfano: © MALOSHA STUDIO"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-amber-400"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['© MALOSHA STUDIO', 'NAKALA (DRAFT)', 'RASMI 2026', 'USINAKILI'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => onChangeWatermark({ ...wm, enabled: true, text: preset })}
                      className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-[10px] text-neutral-300 cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-400 block mb-1">
                  Mpangilio (Pattern):
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'tiled-diagonal' as const, label: 'Mshazari Wingi' },
                    { id: 'single-center' as const, label: 'Katikati Kuu' },
                    { id: 'bottom-corner' as const, label: 'Kona Chini' }
                  ].map((pat) => (
                    <button
                      key={pat.id}
                      onClick={() => onChangeWatermark({ ...wm, enabled: true, pattern: pat.id })}
                      className={`py-2 px-1 rounded-lg border text-[11px] font-semibold cursor-pointer ${
                        wm.pattern === pat.id
                          ? 'bg-amber-400 text-black border-amber-400 font-bold'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      }`}
                    >
                      {pat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2">
                <span className="text-xs text-neutral-300">Rangi ya Watermark:</span>
                <input
                  type="color"
                  value={wm.color}
                  onChange={(e) => onChangeWatermark({ ...wm, color: e.target.value }, false)}
                  className="w-7 h-7 bg-transparent border-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-400 w-20 shrink-0">Uwazi:</span>
                <input
                  type="range"
                  min="0.06"
                  max="0.7"
                  step="0.02"
                  value={wm.opacity}
                  onChange={(e) =>
                    onChangeWatermark({ ...wm, opacity: parseFloat(e.target.value) }, false)
                  }
                  className="w-full accent-amber-400"
                />
                <span className="font-mono text-[10px] w-9 text-right">
                  {Math.round(wm.opacity * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-400 w-20 shrink-0">Ukubwa:</span>
                <input
                  type="range"
                  min="14"
                  max="68"
                  value={wm.fontSize}
                  onChange={(e) =>
                    onChangeWatermark({ ...wm, fontSize: Number(e.target.value) }, false)
                  }
                  className="w-full accent-amber-400"
                />
                <span className="font-mono text-[10px] w-9 text-right">{wm.fontSize}px</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-400 w-20 shrink-0">Mwinamo:</span>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={wm.angle}
                  onChange={(e) =>
                    onChangeWatermark({ ...wm, angle: Number(e.target.value) }, false)
                  }
                  className="w-full accent-amber-400"
                />
                <span className="font-mono text-[10px] w-9 text-right">{wm.angle}°</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      {/* DESKTOP VIEW: Left Icon Rail + Flyout Drawer */}
      <div className="hidden md:flex h-full bg-neutral-900 border-r border-neutral-800 z-10 shrink-0 select-none">
        {/* Icon Rail */}
        <div className="w-18 bg-neutral-950 border-r border-neutral-800 flex flex-col items-center py-2 gap-1 shrink-0 overflow-y-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-14 py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-neutral-800 text-amber-400 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
                <span className="text-[10px] leading-tight text-center px-0.5">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Flyout Drawer Content */}
        <div className="w-72 lg:w-80 bg-neutral-900 h-full overflow-y-auto overscroll-contain touch-pan-y p-4 flex flex-col">
          {renderDrawerBody()}
        </div>
      </div>

      {/* MOBILE VIEW: Bottom Sheet Drawer (kept mounted to preserve scroll position) + Fixed Bottom Tool Dock */}
      <div
        className={`md:hidden fixed inset-0 bottom-16 z-30 flex-col justify-end overscroll-none ${
          isMobileDrawerOpen ? 'flex' : 'hidden pointer-events-none'
        }`}
        aria-hidden={!isMobileDrawerOpen}
      >
        {/* Backdrop */}
        <div className="flex-1 bg-black/55 backdrop-blur-xs" onClick={onCloseMobileDrawer} />
        {/* Bottom Sheet */}
        <div
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="bg-neutral-900 border-t border-neutral-800 rounded-t-3xl shadow-2xl max-h-[68dvh] flex flex-col overflow-hidden overscroll-contain"
        >
          {/* Drag handle + header */}
          <div className="px-4 pt-2.5 pb-2 border-b border-neutral-800/80 flex items-center justify-between shrink-0">
            <div className="w-9" />
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-1 rounded-full bg-neutral-700" />
              <span className="text-xs font-bold text-white">{activeNavLabel}</span>
            </div>
            <button
              onClick={onCloseMobileDrawer}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              aria-label="Funga"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile "+ Ongeza" 5-tool Switcher (Maneno · Maumbo · Nembo · Picha · QR) */}
          {['text', 'shapes', 'logos', 'photos', 'qr'].includes(activeTab) && (
            <div className="grid grid-cols-5 gap-1 px-3 pt-2.5 pb-1 shrink-0 bg-neutral-900">
              {[
                { id: 'text' as SidebarTab, label: 'Maneno', icon: Type },
                { id: 'shapes' as SidebarTab, label: 'Maumbo', icon: Shapes },
                { id: 'logos' as SidebarTab, label: 'Nembo', icon: Award },
                { id: 'photos' as SidebarTab, label: 'Picha', icon: ImageIcon },
                { id: 'qr' as SidebarTab, label: 'QR', icon: QrCode }
              ].map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = activeTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => onTabChange(sub.id)}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                      isSubActive
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700/80'
                    }`}
                  >
                    <SubIcon className="w-4 h-4" />
                    <span className="truncate max-w-full">{sub.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Scrollable Body */}
          <div
            className="p-4 pb-6 overflow-y-auto overscroll-contain touch-pan-y flex-1"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {renderDrawerBody()}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tool Bar (5-column native app tab bar, 0 horizontal clipping) */}
      <nav
        aria-label="Zana za Bango"
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 z-40 grid grid-cols-5 items-center px-1 gap-0.5 pb-[env(safe-area-inset-bottom)]"
      >
        {[
          {
            id: 'templates' as SidebarTab,
            label: 'Violezo',
            icon: LayoutTemplate,
            isActive: isMobileDrawerOpen && activeTab === 'templates'
          },
          {
            id: 'charts' as SidebarTab,
            label: 'Grafu 16',
            icon: BarChart3,
            isActive: isMobileDrawerOpen && activeTab === 'charts'
          },
          {
            id: (['text', 'shapes', 'logos', 'photos', 'qr'].includes(activeTab)
              ? activeTab
              : 'text') as SidebarTab,
            label: 'Ongeza',
            icon: Plus,
            isActive:
              isMobileDrawerOpen &&
              ['text', 'shapes', 'logos', 'photos', 'qr'].includes(activeTab),
            isPrimaryAdd: true
          },
          {
            id: 'concepts50' as SidebarTab,
            label: 'Dhana 50',
            icon: LayoutGrid,
            isActive: isMobileDrawerOpen && activeTab === 'concepts50'
          },
          {
            id: 'background' as SidebarTab,
            label: 'Athari',
            icon: Palette,
            isActive: isMobileDrawerOpen && activeTab === 'background'
          }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              onClick={() => {
                if (tab.isActive) {
                  onCloseMobileDrawer();
                } else {
                  onOpenMobileDrawer(tab.id);
                }
              }}
              className={`min-h-[48px] py-1 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer touch-manipulation ${
                tab.isActive
                  ? 'bg-neutral-800 text-amber-400 font-semibold'
                  : tab.isPrimaryAdd
                    ? 'text-amber-400 hover:bg-neutral-900'
                    : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight truncate max-w-full">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
});

const ShapeThumb = React.memo<{ shape: ShapeType }>(({ shape }) => {
  if (shape === 'frame-border') {
    return <div className="w-6 h-6 rounded-sm border-2 border-amber-400" />;
  }
  const def = SHAPES_100_MAP[shape];
  if (def?.pathData) {
    return (
      <svg className="w-6 h-6" viewBox="0 0 100 100">
        <path d={def.pathData} fill="#fbbf24" fillRule="evenodd" />
      </svg>
    );
  }
  return <div className="w-6 h-6 bg-amber-400 rounded-sm" />;
});
