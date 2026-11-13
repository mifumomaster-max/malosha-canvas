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
  Stamp,
  BadgeCheck,
  FilePlus2,
  BookmarkPlus,
  Trash2,
  Layers
} from 'lucide-react';
import { processUploadedImageFile } from '../utils/imageUpload';
import {
  PosterTemplate,
  PosterBackground,
  TextElement,
  ShapeElement,
  BadgeElement,
  ImageElement,
  ChartElement,
  ChartType,
  ShapeType,
  ColorEffectPreset,
  WatermarkConfig
} from '../types/poster';
import { TEMPLATES_1000, TEMPLATE_CATEGORY_FILTERS } from '../data/templates1000';
import { SHAPES_100, SHAPES_100_MAP, ShapeCategory } from '../data/shapes100';
import { TEXT_PRESETS_100, TextPresetCategory } from '../data/textPresets100';
import {
  READY_LOGOS,
  LOGO_EMBLEMS,
  LOGO_CATEGORIES,
  LOGO_PROFESSIONS,
  LogoStyle,
  buildCustomLogoDataUrl
} from '../data/logos';
import {
  COLOR_EFFECT_PRESETS,
  COLOR_EFFECT_MAP,
  ColorEffectCategory,
  DEFAULT_WATERMARK
} from '../data/colorEffects';
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
  appearanceSubTab?: 'bg' | 'effects' | 'watermark';
  onAppearanceSubTabChange?: (sub: 'bg' | 'effects' | 'watermark') => void;
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
  onAddImage: (src: string, width?: number, height?: number, extra?: Partial<ImageElement>) => void;
  onAddTextCard?: (opts: {
    title: string;
    body: string;
    cardBg: string;
    textColor: string;
    accentColor: string;
    borderRadius: number;
    hasAccentBar?: boolean;
  }) => void;
  onAddQrCode: (data: string, label?: string, qrColor?: string, bgColor?: string) => void;
  onAddChart: (chartType: ChartType, title?: string) => void;
  onToggleGrid?: () => void;
  currentBackground: PosterBackground;
  onChangeBackground: (bg: PosterBackground) => void;
  currentColorEffect: ColorEffectPreset;
  onChangeColorEffect: (effect: ColorEffectPreset) => void;
  currentWatermark: WatermarkConfig;
  onChangeWatermark: (wm: WatermarkConfig, commit?: boolean) => void;
  hasSelectedImageOrShape?: boolean;
  onReplaceSelectedWithPhoto?: (src: string, asCircle?: boolean) => void;
  onAddVerifiedBadge?: (color?: string) => void;
  customTemplates?: PosterTemplate[];
  onOpenNewBlankModal?: () => void;
  onOpenSaveAsTemplateModal?: () => void;
  onDeleteCustomTemplate?: (id: string) => void;
  onOpenLayersModal?: () => void;
}

const TEMPLATES_PAGE_SIZE = 24;

export const Sidebar: React.FC<SidebarProps> = React.memo(({
  activeTab,
  onTabChange,
  appearanceSubTab: propAppearanceSubTab,
  onAppearanceSubTabChange,
  isMobileDrawerOpen,
  onOpenMobileDrawer,
  onCloseMobileDrawer,
  onSelectTemplate,
  onAddText,
  onAddShape,
  onAddBadge,
  onAddImage,
  onAddTextCard,
  onAddQrCode,
  onAddChart,
  onToggleGrid,
  currentBackground,
  onChangeBackground,
  currentColorEffect,
  onChangeColorEffect,
  currentWatermark,
  onChangeWatermark,
  hasSelectedImageOrShape,
  onReplaceSelectedWithPhoto,
  onAddVerifiedBadge,
  customTemplates = [],
  onOpenNewBlankModal,
  onOpenSaveAsTemplateModal,
  onDeleteCustomTemplate,
  onOpenLayersModal
}) => {
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCategory, setTemplateCategory] = useState<string>('all');
  const [templateVisibleCount, setTemplateVisibleCount] = useState<number>(TEMPLATES_PAGE_SIZE);

  const [textSearch, setTextSearch] = useState('');
  const [textCategory, setTextCategory] = useState<TextPresetCategory>('Zote');

  // Text Card Builder state
  const [cardBuilderOpen, setCardBuilderOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState('TAARIFA MUHIMU');
  const [cardBody, setCardBody] = useState(
    'Andika ujumbe wako, nukuu au tangazo hapa. Kadi hii inaweza kuhaririwa maneno na rangi moja kwa moja.'
  );
  const [cardBg, setCardBg] = useState('#ffffff');
  const [cardTextColor, setCardTextColor] = useState('#0f172a');
  const [cardAccentColor, setCardAccentColor] = useState('#f59e0b');
  const [cardRadius, setCardRadius] = useState(24);
  const [cardHasAccentBar, setCardHasAccentBar] = useState(true);

  // Photo Upload Shape Mode (Kawaida / Pembe Laini / Duara)
  const [uploadPhotoShape, setUploadPhotoShape] = useState<'rect' | 'rounded' | 'circle'>('rect');

  // 500 Color Effects Filter & Pagination state
  const [effectSearch, setEffectSearch] = useState('');
  const [effectCategory, setEffectCategory] = useState<ColorEffectCategory>('Zote');
  const [effectVisibleCount, setEffectVisibleCount] = useState(40);

  const [shapeSearch, setShapeSearch] = useState('');
  const [shapeCategory, setShapeCategory] = useState<'Zote' | ShapeCategory>('Zote');

  const [conceptSearch, setConceptSearch] = useState('');

  // Custom Brand Logo Builder state + 1,000 Ready Logos filter & pagination
  const [logoBrandName, setLogoBrandName] = useState('MALOSHA');
  const [logoSubtitle, setLogoSubtitle] = useState('POSTER & DESIGN');
  const [logoEmblemId, setLogoEmblemId] = useState('crown');
  const [logoColor, setLogoColor] = useState('#fbbf24');
  const [logoSecondaryColor, setLogoSecondaryColor] = useState('#0f172a');
  const [logoStyle, setLogoStyle] = useState<LogoStyle>('badge');
  const [logoSearch, setLogoSearch] = useState('');
  const [logoCategory, setLogoCategory] = useState<string>('Zote');
  const [logoProfession, setLogoProfession] = useState<string>('Fani Zote (105+)');
  const [logoVisibleCount, setLogoVisibleCount] = useState(30);

  // Background / Color Effect / Watermark sub-tab (supports controlled or local state)
  const [localAppearanceSubTab, setLocalAppearanceSubTab] = useState<'bg' | 'effects' | 'watermark'>('bg');
  const appearanceSubTab = propAppearanceSubTab ?? localAppearanceSubTab;
  const setAppearanceSubTab = (sub: 'bg' | 'effects' | 'watermark') => {
    setLocalAppearanceSubTab(sub);
    onAppearanceSubTabChange?.(sub);
  };

  const [qrInput, setQrInput] = useState('https://malosha.co.tz');
  const [qrLabel, setQrLabel] = useState('TEMBELEA TOVUTI');
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');

  // Reset pagination when template filter/search changes
  useEffect(() => {
    setTemplateVisibleCount(TEMPLATES_PAGE_SIZE);
  }, [templateCategory, templateSearch]);

  // Separate dedicated collection of the 6 user-provided image templates
  const featuredUploadTemplates = useMemo(
    () => TEMPLATES_1000.filter((t) => Boolean(t.isFeaturedUpload)),
    []
  );

  // Merge user-created templates first + built-in 1,000 templates
  const allTemplates = useMemo(
    () => [...customTemplates, ...TEMPLATES_1000],
    [customTemplates]
  );

  const isSplitFeaturedMode = templateCategory === 'all' && templateSearch.trim() === '';

  // Filter templates (memoized + paginated)
  const filteredTemplates = useMemo(() => {
    const q = templateSearch.trim().toLowerCase();
    return allTemplates.filter((t) => {
      // When in default "Zote" view without search, exclude featured uploads from the general grid
      // because they are already showcased in their own dedicated section at the top.
      if (isSplitFeaturedMode && t.isFeaturedUpload) return false;

      const matchCat =
        templateCategory === 'all' ||
        (templateCategory === 'featured-uploads'
          ? Boolean(t.isFeaturedUpload)
          : templateCategory === 'custom'
            ? Boolean(t.isCustom)
            : t.category === templateCategory);
      const matchSearch =
        q === '' ||
        t.title.toLowerCase().includes(q) ||
        t.titleSwahili.toLowerCase().includes(q) ||
        t.categoryLabelSwahili.toLowerCase().includes(q) ||
        (t.previewBadge?.toLowerCase().includes(q) ?? false) ||
        t.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [allTemplates, templateCategory, templateSearch, isSplitFeaturedMode]);

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

  useEffect(() => {
    setEffectVisibleCount(40);
  }, [effectCategory, effectSearch]);

  const filteredEffects = useMemo(() => {
    const q = effectSearch.trim().toLowerCase();
    return COLOR_EFFECT_PRESETS.filter((eff) => {
      const matchCat = effectCategory === 'Zote' || eff.category === effectCategory;
      const matchQ =
        q === '' ||
        eff.label.toLowerCase().includes(q) ||
        eff.category.toLowerCase().includes(q) ||
        eff.desc.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [effectCategory, effectSearch]);

  const visibleEffects = useMemo(
    () => filteredEffects.slice(0, effectVisibleCount),
    [filteredEffects, effectVisibleCount]
  );

  useEffect(() => {
    setLogoVisibleCount(30);
  }, [logoCategory, logoProfession, logoSearch]);

  const filteredLogos = useMemo(() => {
    const q = logoSearch.trim().toLowerCase();
    return READY_LOGOS.filter((logo) => {
      const matchCat = logoCategory === 'Zote' || logo.category === logoCategory;
      const matchProf =
        logoProfession === 'Fani Zote (105+)' || logo.profession === logoProfession;
      const matchQ =
        q === '' ||
        logo.name.toLowerCase().includes(q) ||
        logo.subtitle.toLowerCase().includes(q) ||
        logo.profession.toLowerCase().includes(q) ||
        logo.category.toLowerCase().includes(q);
      return matchCat && matchProf && matchQ;
    });
  }, [logoCategory, logoProfession, logoSearch]);

  const visibleLogos = useMemo(
    () => filteredLogos.slice(0, logoVisibleCount),
    [filteredLogos, logoVisibleCount]
  );

  const customLogoPreviewUrl = useMemo(
    () =>
      buildCustomLogoDataUrl(
        logoBrandName,
        logoSubtitle,
        logoEmblemId,
        logoColor,
        logoStyle,
        logoSecondaryColor
      ),
    [logoBrandName, logoSubtitle, logoEmblemId, logoColor, logoStyle, logoSecondaryColor]
  );

  const addImageWithShape = (
    dataUrl: string,
    natW: number,
    natH: number,
    shapeMode: 'rect' | 'rounded' | 'circle'
  ) => {
    if (shapeMode === 'circle') {
      const circleSize = 260;
      onAddImage(dataUrl, circleSize, circleSize, {
        borderRadius: 999,
        borderColor: '#ffffff',
        borderWidth: 3
      });
    } else {
      const displayW = Math.min(460, natW || 400);
      const displayH = Math.max(
        120,
        Math.round((displayW / (natW || 400)) * (natH || 300))
      );
      onAddImage(dataUrl, displayW, displayH, {
        borderRadius: shapeMode === 'rounded' ? 28 : 8
      });
    }
    onCloseMobileDrawer();
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    shapeOverride?: 'rect' | 'rounded' | 'circle'
  ) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const { dataUrl, width, height } = await processUploadedImageFile(file, 1500);
      addImageWithShape(dataUrl, width, height, shapeOverride ?? uploadPhotoShape);
    } catch {
      // Ignore upload failure gracefully
    }
  };

  const handleReplacePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    asCircle?: boolean
  ) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !onReplaceSelectedWithPhoto) return;
    try {
      const { dataUrl } = await processUploadedImageFile(file, 1500);
      onReplaceSelectedWithPhoto(dataUrl, asCircle);
      onCloseMobileDrawer();
    } catch {
      // Ignore upload failure gracefully
    }
  };

  const handleBgPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const { dataUrl } = await processUploadedImageFile(file, 1600);
      onChangeBackground({
        type: 'image',
        imageUrl: dataUrl,
        overlayOpacity: 0
      });
      onCloseMobileDrawer();
    } catch {
      // Ignore upload failure gracefully
    }
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

  const activeNavLabel =
    activeTab === 'background'
      ? appearanceSubTab === 'watermark'
        ? 'Watermark ya Bango'
        : appearanceSubTab === 'effects'
          ? 'Athari za Rangi'
          : 'Rangi & Mandhari'
      : navItems.find((n) => n.id === activeTab)?.label || '';

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

          {/* Studio Action Strip: Start From Scratch or Save Current Design to List */}
          {(onOpenNewBlankModal || onOpenSaveAsTemplateModal) && (
            <div className="grid grid-cols-2 gap-2">
              {onOpenNewBlankModal && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenNewBlankModal();
                    onCloseMobileDrawer();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <FilePlus2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Anza Upya (Blank)</span>
                </button>
              )}
              {onOpenSaveAsTemplateModal && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenSaveAsTemplateModal();
                    onCloseMobileDrawer();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">+ Hifadhi Kiolezo</span>
                </button>
              )}
            </div>
          )}

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
                    : cat.id === 'featured-uploads'
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/40 hover:bg-sky-500/25'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {cat.id === 'custom'
                  ? `${cat.label} (${customTemplates.length})`
                  : cat.id === 'featured-uploads'
                    ? `${cat.label} (${featuredUploadTemplates.length})`
                    : cat.label}
              </button>
            ))}
          </div>

          {/* Dedicated Separated Section for User-Provided Image Templates (never mixed with 1,000 general ones) */}
          {isSplitFeaturedMode && featuredUploadTemplates.length > 0 && (
            <div className="p-2.5 rounded-2xl bg-gradient-to-b from-amber-500/10 to-neutral-900/90 border border-amber-400/35 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wide flex items-center gap-1">
                    ★ Violezo Maalum (Ulizotuma Kwa Picha)
                  </span>
                  <span className="text-[10px] text-neutral-400 block">
                    Vimetengwa hapa ili uvifikie haraka bila kuchanganyika.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setTemplateCategory('featured-uploads')}
                  className="px-2 py-1 rounded-md bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-[10px] font-bold whitespace-nowrap cursor-pointer"
                >
                  Zote ({featuredUploadTemplates.length})
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {featuredUploadTemplates.map((template) => (
                  <div
                    key={`sec_${template.id}`}
                    onClick={() => {
                      onSelectTemplate(template);
                      onCloseMobileDrawer();
                    }}
                    className="group relative bg-neutral-900 border border-amber-400/40 hover:border-amber-300 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                  >
                    <div className="aspect-[3/4] w-full bg-neutral-950 overflow-hidden relative">
                      <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded bg-amber-400 text-black text-[8px] font-extrabold shadow pointer-events-none">
                        {template.previewBadge || 'MAALUM'}
                      </span>
                      {template.thumbnailPreview ? (
                        <div className="w-full h-full bg-neutral-950 p-1 pb-6 flex items-center justify-center">
                          <img
                            src={template.thumbnailPreview}
                            alt={template.title}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain rounded group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <TemplateMiniPreview template={template} />
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-2 pointer-events-none">
                        <span className="text-[10px] font-bold text-white leading-tight line-clamp-1 block">
                          {template.titleSwahili}
                        </span>
                        <span className="text-[9px] text-amber-300 block truncate">
                          Violezo Maalum · {template.width}×{template.height}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isSplitFeaturedMode && (
            <div className="flex items-center justify-between pt-1 border-t border-neutral-800">
              <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">
                Violezo Vingine vya Studio ({filteredTemplates.length})
              </span>
            </div>
          )}

          {templateCategory === 'featured-uploads' && (
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-sky-300">
                ★ Violezo Maalum Ulizotuma Kwa Picha ({filteredTemplates.length})
              </span>
            </div>
          )}

          {templateCategory === 'custom' && customTemplates.length === 0 && (
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/80 text-center flex flex-col items-center gap-2">
              <p className="text-xs text-neutral-300">
                Bado hujaongeza kiolezo chako mwenyewe. Buni bango kutoka mwanzo au hariri lolote kisha gusa{' '}
                <strong className="text-emerald-300">+ Hifadhi Kiolezo</strong>.
              </p>
            </div>
          )}

          {/* Paginated Template Grid with True Layout Miniatures */}
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
                  {template.isFeaturedUpload && !template.isCustom && (
                    <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded bg-amber-400 text-black text-[8px] font-extrabold shadow pointer-events-none">
                      {template.previewBadge || 'MAALUM'}
                    </span>
                  )}
                  {template.isCustom && (
                    <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between z-10 pointer-events-none">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-extrabold shadow">
                        CHAKO
                      </span>
                      {onDeleteCustomTemplate && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteCustomTemplate(template.id);
                          }}
                          className="pointer-events-auto p-1 rounded bg-black/80 hover:bg-red-600 text-red-300 hover:text-white border border-white/15 cursor-pointer"
                          title="Futa kiolezo hiki"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {template.thumbnailPreview ? (
                    <div className="w-full h-full bg-neutral-950 p-1 pb-6 flex items-center justify-center">
                      <img
                        src={template.thumbnailPreview}
                        alt={template.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain rounded group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <TemplateMiniPreview template={template} />
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-2 pointer-events-none">
                    <span className="text-[10px] font-bold text-white leading-tight line-clamp-1 block">
                      {template.titleSwahili}
                    </span>
                    <span className="text-[9px] text-amber-300 block truncate">
                      {template.isFeaturedUpload ? 'Violezo Maalum' : template.categoryLabelSwahili} · {template.width}×{template.height}
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

          {(onOpenNewBlankModal || onOpenLayersModal) && (
            <div className="grid grid-cols-2 gap-1.5">
              {onOpenNewBlankModal && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenNewBlankModal();
                    onCloseMobileDrawer();
                  }}
                  className="py-2 px-2.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FilePlus2 className="w-3.5 h-3.5" />
                  <span>Canvas Tupu</span>
                </button>
              )}
              {onOpenLayersModal && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenLayersModal();
                    onCloseMobileDrawer();
                  }}
                  className="py-2 px-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tabaka (Layers)</span>
                </button>
              )}
            </div>
          )}

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
              <h2 className="text-sm font-bold text-white tracking-tight">Maandishi &amp; Kadi 100</h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Ongeza maandishi kwa ukubwa unaotaka au chagua kadi na mitindo 100.
              </p>
            </div>
            <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md shrink-0">
              {filteredTextPresets.length}
            </span>
          </div>

          {/* Ongeza Maandishi Haraka kwa Ukubwa (Habari, Matangazo, Maelezo) */}
          <div className="p-2.5 rounded-xl bg-neutral-800/60 border border-neutral-700/80 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Ongeza Maandishi kwa Ukubwa:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                {
                  label: 'Habari Kuu (72px)',
                  text: 'KICHWA CHA HABARI',
                  size: 72,
                  weight: 900,
                  font: 'Anton',
                  h: 105
                },
                {
                  label: 'Tangazo Kubwa (56px)',
                  text: 'OFA MAALUM LEO',
                  size: 56,
                  weight: 800,
                  font: 'Outfit',
                  h: 84
                },
                {
                  label: 'Kichwa cha Kati (36px)',
                  text: 'Taarifa Muhimu Kwa Umma',
                  size: 36,
                  weight: 700,
                  font: 'Outfit',
                  h: 58
                },
                {
                  label: 'Maelezo / Ndogo (18px)',
                  text: 'Andika maelezo mafupi au tarehe na mahali hapa...',
                  size: 18,
                  weight: 500,
                  font: 'Plus Jakarta Sans',
                  h: 42
                }
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    onAddText(item.text, item.size, item.weight, item.font, '#ffffff', {
                      height: item.h,
                      width: item.size >= 56 ? 680 : 540
                    });
                    onCloseMobileDrawer();
                  }}
                  className="px-2.5 py-2 rounded-lg bg-neutral-900/90 hover:bg-amber-400 hover:text-black border border-neutral-700 hover:border-amber-400 text-left text-[11px] font-bold text-neutral-100 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Kadi yenye Maneno (Text Card Studio) */}
          {onAddTextCard && (
            <div className="p-3 rounded-xl bg-neutral-800/80 border border-amber-400/40 flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-300 block">
                    Tengeneza Kadi yenye Maneno (Card)
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Kadi ya nukuu, taarifa, au habari yenye mandhari &amp; maandishi
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCardBuilderOpen((p) => !p)}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold cursor-pointer shrink-0"
                >
                  {cardBuilderOpen ? 'Funga' : 'Tengeneza'}
                </button>
              </div>

              {/* 4 Quick 1-Tap Text Cards */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  {
                    label: 'Kadi Nyeupe (Nukuu)',
                    title: 'NUKUU YA LEO',
                    body: 'Mafanikio makubwa huanza na hatua moja ndogo unayoichukua leo.',
                    cardBg: '#ffffff',
                    textColor: '#0f172a',
                    accentColor: '#f59e0b',
                    borderRadius: 24,
                    hasAccentBar: true
                  },
                  {
                    label: 'Kadi ya Habari (Breaking)',
                    title: 'HABARI KUU SASA',
                    body: 'Andika kichwa chako cha habari muhimu au tangazo rasmi hapa.',
                    cardBg: '#ffffff',
                    textColor: '#0f172a',
                    accentColor: '#dc2626',
                    borderRadius: 14,
                    hasAccentBar: true
                  },
                  {
                    label: 'Kadi Meusi (Dark Studio)',
                    title: 'TAARIFA RASMI',
                    body: 'Ujumbe wa kitaalamu wenye muonekano wa kisasa na mvuto mkubwa.',
                    cardBg: '#0f172a',
                    textColor: '#ffffff',
                    accentColor: '#38bdf8',
                    borderRadius: 22,
                    hasAccentBar: true
                  },
                  {
                    label: 'Kadi ya Dhahabu / Ofa',
                    title: 'OFA MAALUM 50%',
                    body: 'Pata huduma na bidhaa zetu bora kwa bei nafuu wiki hii yote.',
                    cardBg: '#fffbeb',
                    textColor: '#78350f',
                    accentColor: '#d97706',
                    borderRadius: 20,
                    hasAccentBar: true
                  }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      onAddTextCard({
                        title: preset.title,
                        body: preset.body,
                        cardBg: preset.cardBg,
                        textColor: preset.textColor,
                        accentColor: preset.accentColor,
                        borderRadius: preset.borderRadius,
                        hasAccentBar: preset.hasAccentBar
                      });
                      onCloseMobileDrawer();
                    }}
                    className="p-2 rounded-lg border border-neutral-700 hover:border-amber-400 text-left flex items-center gap-2 bg-neutral-900/70 cursor-pointer transition-colors"
                  >
                    <span
                      className="w-4 h-7 rounded-sm shrink-0 border border-white/15"
                      style={{
                        backgroundColor: preset.cardBg,
                        borderLeft: `4px solid ${preset.accentColor}`
                      }}
                    />
                    <span className="text-[10px] font-bold text-neutral-100 leading-tight">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>

              {cardBuilderOpen && (
                <div className="flex flex-col gap-2 pt-2 border-t border-neutral-700/70">
                  <input
                    type="text"
                    value={cardTitle}
                    onChange={(e) => setCardTitle(e.target.value)}
                    placeholder="Kichwa cha Kadi..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <textarea
                    rows={3}
                    value={cardBody}
                    onChange={(e) => setCardBody(e.target.value)}
                    placeholder="Andika maneno ya ndani ya kadi..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                  <div className="grid grid-cols-3 gap-1.5">
                    <label className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 flex items-center justify-between text-[10px] text-neutral-300">
                      <span>Kadi</span>
                      <input
                        type="color"
                        value={cardBg}
                        onChange={(e) => setCardBg(e.target.value)}
                        className="w-5 h-4 bg-transparent border-0 cursor-pointer"
                      />
                    </label>
                    <label className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 flex items-center justify-between text-[10px] text-neutral-300">
                      <span>Maneno</span>
                      <input
                        type="color"
                        value={cardTextColor}
                        onChange={(e) => setCardTextColor(e.target.value)}
                        className="w-5 h-4 bg-transparent border-0 cursor-pointer"
                      />
                    </label>
                    <label className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 flex items-center justify-between text-[10px] text-neutral-300">
                      <span>Mstari</span>
                      <input
                        type="color"
                        value={cardAccentColor}
                        onChange={(e) => setCardAccentColor(e.target.value)}
                        className="w-5 h-4 bg-transparent border-0 cursor-pointer"
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[10px] text-neutral-300">
                    <span>Mviringo: {cardRadius}px</span>
                    <input
                      type="range"
                      min={0}
                      max={48}
                      value={cardRadius}
                      onChange={(e) => setCardRadius(Number(e.target.value))}
                      className="w-24 accent-amber-400"
                    />
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cardHasAccentBar}
                        onChange={(e) => setCardHasAccentBar(e.target.checked)}
                        className="accent-amber-400"
                      />
                      <span>Mstari</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onAddTextCard({
                        title: cardTitle,
                        body: cardBody,
                        cardBg,
                        textColor: cardTextColor,
                        accentColor: cardAccentColor,
                        borderRadius: cardRadius,
                        hasAccentBar: cardHasAccentBar
                      });
                      onCloseMobileDrawer();
                    }}
                    className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Weka Kadi yenye Maneno Kwenye Bango</span>
                  </button>
                </div>
              )}
            </div>
          )}

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

          {hasSelectedImageOrShape && onReplaceSelectedWithPhoto && (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/60 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-amber-300 text-center">
                Badili Picha / Umbo Lililochaguliwa:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <label className="py-2 px-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 shrink-0" />
                  <span>Kawaida</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleReplacePhotoUpload(e, false)}
                    className="hidden"
                  />
                </label>
                <label className="py-2 px-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-400/70 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 shrink-0" />
                  <span>Duara (◯)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleReplacePhotoUpload(e, true)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Direct 2-button Upload: Normal vs Circle Avatar */}
          <div className="grid grid-cols-2 gap-2">
            <label className="py-3 px-2 border-2 border-dashed border-neutral-700 hover:border-amber-400 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group text-center">
              <Upload className="w-5 h-5 text-neutral-300 group-hover:text-amber-400" />
              <span className="text-[11px] font-bold text-white leading-tight">
                Pakia Picha ya Kawaida
              </span>
              <span className="text-[9px] text-neutral-400">Umbo la Mstatili</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'rect')}
                className="hidden"
              />
            </label>

            <label className="py-3 px-2 border-2 border-dashed border-amber-400/60 hover:border-amber-400 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group text-center">
              <div className="w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-[11px] font-bold text-amber-300 leading-tight">
                Pakia Picha ya Duara (◯)
              </span>
              <span className="text-[9px] text-neutral-300">Avatar / Profaili</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'circle')}
                className="hidden"
              />
            </label>
          </div>

          <label className="w-full py-2.5 px-3 border border-neutral-700 hover:border-sky-400 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 flex items-center justify-center gap-2 cursor-pointer transition-colors">
            <ImageIcon className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-xs font-semibold text-neutral-200">
              Weka Kama Picha ya Mandhari (Background)
            </span>
            <input type="file" accept="image/*" onChange={handleBgPhotoUpload} className="hidden" />
          </label>

          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-neutral-300">Picha Zilizopo:</span>
              <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-lg border border-neutral-700">
                {(
                  [
                    { id: 'rect', label: 'Kawaida' },
                    { id: 'rounded', label: 'Laini' },
                    { id: 'circle', label: 'Duara ◯' }
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setUploadPhotoShape(mode.id)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      uploadPhotoShape === mode.id
                        ? 'bg-amber-400 text-black'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {STOCK_PHOTO_ITEMS.map((stock) => (
                <div
                  key={stock.title}
                  onClick={() => {
                    addImageWithShape(stock.url, 400, 500, uploadPhotoShape);
                  }}
                  className="group relative aspect-[3/4] min-h-[140px] w-full rounded-lg overflow-hidden border border-neutral-700 hover:border-amber-400 cursor-pointer bg-neutral-950"
                >
                  <img
                    src={stock.url}
                    alt={stock.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover block group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-1.5 right-1.5 flex gap-1 z-10">
                    {hasSelectedImageOrShape && onReplaceSelectedWithPhoto && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onReplaceSelectedWithPhoto(stock.url, uploadPhotoShape === 'circle');
                          onCloseMobileDrawer();
                        }}
                        className="px-1.5 py-0.5 rounded bg-amber-400 hover:bg-amber-300 text-black text-[9px] font-bold shadow cursor-pointer"
                        title="Weka picha hii ndani ya nafasi uliyoichagua"
                      >
                        Badili
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeBackground({
                          type: 'image',
                          imageUrl: stock.url,
                          overlayOpacity: 0.15
                        });
                        onCloseMobileDrawer();
                      }}
                      className="px-1.5 py-0.5 rounded bg-black/80 hover:bg-sky-600 text-white border border-white/20 text-[9px] font-semibold shadow cursor-pointer"
                      title="Weka kama picha ya nyuma (Background)"
                    >
                      Kama BG
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-1.5">
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

          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                <BadgeCheck className="w-4 h-4 shrink-0" />
                <span>Verification Badge ✓</span>
              </div>
              <p className="text-[10px] text-neutral-400 truncate">Gusa rangi kuongeza alama ya uthibitisho</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {['#1d9bf0', '#ec4899', '#eab308', '#22c55e', '#0f172a'].map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => {
                    if (onAddVerifiedBadge) {
                      onAddVerifiedBadge(col);
                    } else {
                      onAddShape('verified-badge', col);
                    }
                    onCloseMobileDrawer();
                  }}
                  className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-[10px] font-bold text-white cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: col }}
                  title={`Ongeza Verified Badge (${col})`}
                >
                  ✓
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {filteredShapes.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onAddShape(
                    s.id,
                    s.id === 'verified-badge' ? '#1d9bf0' : '#f59e0b',
                    s.id === 'frame-border' ? '#fbbf24' : undefined
                  );
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

      {/* TAB: LOGOS (CUSTOM LOGO BUILDER + 1,000 UNIQUE LOGOS ACROSS 105+ PROFESSIONS) */}
      {activeTab === 'logos' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Nembo &amp; Logo Studio</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Unda nembo yako au chagua kati ya nembo <strong className="text-amber-400">1,000</strong> za fani <strong className="text-white">105+</strong>.
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold shrink-0">
              1,000
            </span>
          </div>

          {/* Quick Verification Badges */}
          <div className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
              <BadgeCheck className="w-4 h-4 shrink-0" />
              <span>Alama za Uthibitisho (Verification Badges ✓)</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'Bluu', col: '#1d9bf0' },
                { label: 'Pink', col: '#ec4899' },
                { label: 'Dhahabu', col: '#eab308' },
                { label: 'Kijani', col: '#22c55e' }
              ].map((b) => (
                <button
                  key={b.col}
                  type="button"
                  onClick={() => {
                    if (onAddVerifiedBadge) {
                      onAddVerifiedBadge(b.col);
                    } else {
                      onAddShape('verified-badge', b.col);
                    }
                    onCloseMobileDrawer();
                  }}
                  className="py-1.5 px-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white cursor-pointer transition-colors"
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                    style={{ backgroundColor: b.col }}
                  >
                    ✓
                  </span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Brand Logo Maker */}
          <div className="p-3 bg-neutral-800/70 border border-neutral-700 rounded-xl flex flex-col gap-2.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Unda / Badilisha Nembo Yako:
            </span>

            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-2 flex items-center justify-center min-h-[84px] w-full overflow-hidden">
              <img
                src={customLogoPreviewUrl}
                alt="Hakiki ya Nembo"
                className="w-full h-20 object-contain block"
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

            <div className="grid grid-cols-3 gap-1.5">
              <select
                value={logoStyle}
                onChange={(e) => setLogoStyle(e.target.value as LogoStyle)}
                className="col-span-3 sm:col-span-1 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1.5 text-xs text-white"
              >
                <option value="badge">Beji Mlalo</option>
                <option value="minimal">Kisasa (Minimal)</option>
                <option value="emblem">Muhuri Duara</option>
                <option value="shield">Ngao Rasmi</option>
                <option value="hexagon">Heksagoni Tech</option>
                <option value="ribbon">Utepe Rasmi</option>
                <option value="monogram">Monogramu</option>
                <option value="split">Mstari wa Chapa</option>
              </select>
              <label className="flex items-center justify-between bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1.5 text-[11px] text-neutral-300">
                <span>Rangi 1</span>
                <input
                  type="color"
                  value={logoColor}
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="w-5 h-5 bg-transparent border-0 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1.5 text-[11px] text-neutral-300">
                <span>Rangi 2</span>
                <input
                  type="color"
                  value={logoSecondaryColor}
                  onChange={(e) => setLogoSecondaryColor(e.target.value)}
                  className="w-5 h-5 bg-transparent border-0 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-neutral-900/50 rounded-lg border border-neutral-800">
              {LOGO_EMBLEMS.map((em) => (
                <button
                  key={em.id}
                  type="button"
                  onClick={() => setLogoEmblemId(em.id)}
                  className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer ${
                    logoEmblemId === em.id
                      ? 'bg-amber-400 text-black'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  {em.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                const isSquare = ['emblem', 'shield', 'hexagon', 'monogram'].includes(logoStyle);
                onAddImage(customLogoPreviewUrl, isSquare ? 240 : 340, isSquare ? 240 : 114);
                onCloseMobileDrawer();
              }}
              className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Weka Nembo Yako Kwenye Bango</span>
            </button>
          </div>

          {/* 1,000 Ready Logos Across 105+ Professions */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                Nembo 1,000 za Fani 105+
              </span>
              <span className="text-[11px] text-neutral-400">
                Zimepatikana: <strong className="text-amber-400">{filteredLogos.length}</strong>
              </span>
            </div>

            {/* Search Logos */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={logoSearch}
                onChange={(e) => setLogoSearch(e.target.value)}
                placeholder="Tafuta: hospitali, shule, kanisa, ndege, IT, muziki, misitu..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-8 pr-8 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
              />
              {logoSearch && (
                <button
                  type="button"
                  onClick={() => setLogoSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Profession Dropdown (105+ Fani) */}
            <select
              value={logoProfession}
              onChange={(e) => {
                setLogoProfession(e.target.value);
                if (e.target.value !== 'Fani Zote (105+)') {
                  setLogoCategory('Zote');
                }
              }}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {LOGO_PROFESSIONS.map((prof) => (
                <option key={prof} value={prof}>
                  Fani: {prof}
                </option>
              ))}
            </select>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {LOGO_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setLogoCategory(cat);
                    setLogoProfession('Fani Zote (105+)');
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    logoCategory === cat
                      ? 'bg-amber-400 text-black'
                      : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Logos Grid (Paginated 30 at a time for zero lag) */}
            {visibleLogos.length === 0 ? (
              <div className="p-4 text-center bg-neutral-800/40 border border-neutral-800 rounded-xl text-xs text-neutral-400">
                Hakuna nembo iliyopatikana kwa utafutaji huu. Jaribu neno jingine.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {visibleLogos.map((logo) => {
                  const isSq = ['emblem', 'shield', 'hexagon', 'monogram'].includes(logo.style);
                  return (
                    <div
                      key={logo.id}
                      className="p-2 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-400 rounded-xl flex flex-col gap-1.5 transition-colors group"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onAddImage(logo.dataUrl, isSq ? 220 : 320, isSq ? 220 : 108);
                          onCloseMobileDrawer();
                        }}
                        className="w-full flex flex-col items-center gap-1 cursor-pointer text-left"
                      >
                        <div className="w-full h-14 flex items-center justify-center bg-neutral-950 rounded-lg p-1.5 overflow-hidden">
                          <img
                            src={logo.dataUrl}
                            alt={logo.name}
                            loading="lazy"
                            className="w-full h-full object-contain block"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-neutral-100 truncate w-full text-center">
                          {logo.name}
                        </span>
                      </button>
                      <div className="flex items-center justify-between gap-1 pt-0.5 border-t border-neutral-700/60">
                        <span className="text-[9px] text-neutral-400 truncate">
                          {logo.profession}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setLogoBrandName(logo.name);
                            setLogoSubtitle(logo.subtitle);
                            setLogoEmblemId(logo.emblemId);
                            setLogoColor(logo.primaryColor);
                            setLogoSecondaryColor(logo.secondaryColor);
                            setLogoStyle(logo.style);
                          }}
                          className="text-[9px] font-bold text-amber-400 hover:text-amber-300 shrink-0 cursor-pointer"
                          title="Hariri jina au rangi ya nembo hii"
                        >
                          Hariri
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {visibleLogos.length < filteredLogos.length && (
              <button
                type="button"
                onClick={() => setLogoVisibleCount((c) => c + 30)}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-amber-400 font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                Onyesha Nembo Zingine (+{Math.min(30, filteredLogos.length - visibleLogos.length)} kati ya {filteredLogos.length - visibleLogos.length})
              </button>
            )}
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
                  Pakia picha ya mandhari au badilisha rangi ya nyuma (solid/gradient).
                </p>
              </div>

              {/* Background Photo Upload & Overlay Control */}
              <div className="p-3 bg-neutral-800/60 border border-neutral-700 rounded-xl flex flex-col gap-2.5">
                <span className="text-xs font-semibold text-neutral-200">
                  Picha ya Mandhari (Background Photo):
                </span>
                <label className="w-full py-2.5 px-3 border border-dashed border-sky-400/60 hover:border-sky-400 rounded-lg bg-sky-500/10 hover:bg-sky-500/15 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-xs font-bold text-sky-300">
                    {currentBackground.type === 'image'
                      ? 'Badili Picha ya Mandhari'
                      : 'Pakia Picha ya Mandhari'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleBgPhotoUpload} className="hidden" />
                </label>
                {currentBackground.type === 'image' && (
                  <div className="flex flex-col gap-2 pt-1">
                    <label className="flex items-center justify-between gap-2 text-[11px] text-neutral-300">
                      <span>Giza la Mandhari (Overlay)</span>
                      <input
                        type="range"
                        min={0}
                        max={0.85}
                        step={0.05}
                        value={currentBackground.overlayOpacity ?? 0}
                        onChange={(e) =>
                          onChangeBackground({
                            ...currentBackground,
                            overlayOpacity: Number(e.target.value)
                          })
                        }
                        className="w-28 accent-amber-400 cursor-pointer"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => onChangeBackground({ type: 'color', color: '#0f172a' })}
                      className="w-full py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-semibold cursor-pointer"
                    >
                      Ondoa Picha Nyuma
                    </button>
                  </div>
                )}
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
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    Athari 500 za Rangi
                  </h2>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Badilisha mwanga na hisia za bango zima hadi kwenye 4K Download.
                  </p>
                </div>
                <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md shrink-0">
                  {filteredEffects.length}
                </span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Tafuta athari (mf: Dhahabu, Neon, Noir, Vintage)..."
                  value={effectSearch}
                  onChange={(e) => setEffectSearch(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    'Zote',
                    'Asili & Sinema',
                    'Joto & Dhahabu',
                    'Baridi & Bahari',
                    'Zamani (Vintage)',
                    'Neon & Usiku',
                    'Nyeusi & Nyeupe',
                    'Kifahari & Chapa'
                  ] as ColorEffectCategory[]
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setEffectCategory(cat)}
                    className={`px-2 py-1 rounded-md text-[10px] font-semibold cursor-pointer transition-colors ${
                      effectCategory === cat
                        ? 'bg-amber-400 text-black'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {visibleEffects.map((eff) => {
                  const isActive = (currentColorEffect || 'none') === eff.id;
                  return (
                    <button
                      key={eff.id}
                      onClick={() => onChangeColorEffect(eff.id)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        isActive
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-neutral-700 bg-neutral-800/80 hover:border-neutral-500'
                      }`}
                    >
                      <div
                        className="w-full h-7 rounded-lg flex items-center justify-end px-1.5"
                        style={{ background: eff.swatch }}
                      >
                        {isActive && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                      </div>
                      <span className="text-[11px] font-bold text-white leading-tight truncate">
                        {eff.label}
                      </span>
                      <span className="text-[9px] text-neutral-400 leading-tight line-clamp-1">
                        {eff.category}
                      </span>
                    </button>
                  );
                })}
              </div>

              {effectVisibleCount < filteredEffects.length && (
                <button
                  type="button"
                  onClick={() => setEffectVisibleCount((prev) => prev + 40)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-bold text-amber-300 cursor-pointer transition-colors"
                >
                  Onyesha Athari Zingine (+{Math.min(40, filteredEffects.length - effectVisibleCount)} kati ya{' '}
                  {filteredEffects.length - effectVisibleCount})
                </button>
              )}
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

      {/* MOBILE VIEW: Bottom Sheet Drawer (kept mounted to preserve scroll position) + 2-Row 10-Tool Bottom Dock */}
      <div
        className={`md:hidden fixed inset-0 bottom-[104px] z-30 flex-col justify-end overscroll-none ${
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
          className="bg-neutral-900 border-t border-neutral-800 rounded-t-3xl shadow-2xl max-h-[60dvh] flex flex-col overflow-hidden overscroll-contain"
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

          {/* Mobile Quick Tool Switcher inside add-element tabs */}
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

      {/* Mobile Bottom Tool Dock: 2 Rows × 5 Columns — 100% of studio tools visible without scrolling */}
      <nav
        aria-label="Zana Zote za Bango"
        className="md:hidden fixed bottom-0 left-0 right-0 h-[104px] bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 z-40 grid grid-cols-5 grid-rows-2 items-center px-1 py-1 gap-0.5 pb-[env(safe-area-inset-bottom)]"
      >
        {[
          {
            key: 'templates',
            id: 'templates' as SidebarTab,
            label: 'Violezo',
            icon: LayoutTemplate,
            isActive: isMobileDrawerOpen && activeTab === 'templates'
          },
          {
            key: 'text',
            id: 'text' as SidebarTab,
            label: 'Maneno',
            icon: Type,
            isActive: isMobileDrawerOpen && activeTab === 'text'
          },
          {
            key: 'shapes',
            id: 'shapes' as SidebarTab,
            label: 'Maumbo',
            icon: Shapes,
            isActive: isMobileDrawerOpen && activeTab === 'shapes'
          },
          {
            key: 'photos',
            id: 'photos' as SidebarTab,
            label: 'Picha',
            icon: ImageIcon,
            isActive: isMobileDrawerOpen && activeTab === 'photos'
          },
          {
            key: 'logos',
            id: 'logos' as SidebarTab,
            label: 'Nembo',
            icon: Award,
            isActive: isMobileDrawerOpen && activeTab === 'logos'
          },
          {
            key: 'charts',
            id: 'charts' as SidebarTab,
            label: 'Grafu 16',
            icon: BarChart3,
            isActive: isMobileDrawerOpen && activeTab === 'charts'
          },
          {
            key: 'concepts50',
            id: 'concepts50' as SidebarTab,
            label: 'Dhana 50',
            icon: LayoutGrid,
            isActive: isMobileDrawerOpen && activeTab === 'concepts50'
          },
          {
            key: 'qr',
            id: 'qr' as SidebarTab,
            label: 'QR Code',
            icon: QrCode,
            isActive: isMobileDrawerOpen && activeTab === 'qr'
          },
          {
            key: 'effects',
            id: 'background' as SidebarTab,
            subTab: 'effects' as const,
            label: 'Athari',
            icon: Sparkles,
            isActive:
              isMobileDrawerOpen &&
              activeTab === 'background' &&
              (appearanceSubTab === 'effects' || appearanceSubTab === 'bg')
          },
          {
            key: 'watermark',
            id: 'background' as SidebarTab,
            subTab: 'watermark' as const,
            label: 'Watermark',
            icon: Stamp,
            isActive:
              isMobileDrawerOpen &&
              activeTab === 'background' &&
              appearanceSubTab === 'watermark'
          }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => {
                if (tab.isActive) {
                  onCloseMobileDrawer();
                } else {
                  if (tab.subTab) {
                    setAppearanceSubTab(tab.subTab);
                  }
                  onOpenMobileDrawer(tab.id);
                }
              }}
              className={`h-full w-full py-1 px-0.5 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer touch-manipulation ${
                tab.isActive
                  ? 'bg-neutral-800 text-amber-400 font-bold'
                  : 'text-neutral-300 hover:text-white active:bg-neutral-900'
              }`}
            >
              <Icon className="w-4 h-4 stroke-[2.2]" />
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
        <path
          d={def.pathData}
          fill={shape === 'verified-badge' ? '#1d9bf0' : '#fbbf24'}
          fillRule="evenodd"
        />
        {shape === 'verified-badge' && (
          <path
            d="M 30,52 L 44,66 L 71,35"
            fill="none"
            stroke="#ffffff"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  }
  return <div className="w-6 h-6 bg-amber-400 rounded-sm" />;
});

const TemplateMiniPreview = React.memo<{ template: PosterTemplate }>(({ template }) => {
  const { width: W, height: H, background, elements, colorEffect } = template;

  const bgStyle: React.CSSProperties =
    background.type === 'color'
      ? { backgroundColor: background.color || '#0f172a' }
      : background.type === 'gradient' && background.gradient
        ? {
            background: `linear-gradient(${background.gradient.angle ?? 160}deg, ${background.gradient.stops
              .map((s) => `${s.color} ${Math.round(s.offset * 100)}%`)
              .join(', ')})`
          }
        : background.type === 'image' && background.imageUrl
          ? {
              backgroundImage: `url(${background.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : { backgroundColor: '#0f172a' };

  const effectDef = colorEffect && colorEffect !== 'none' ? COLOR_EFFECT_MAP[colorEffect] : undefined;
  const visibleElements = elements.slice(0, 12);

  return (
    <div className="w-full h-full bg-neutral-950 p-1.5 pb-6 flex items-center justify-center relative overflow-hidden">
      {/* Aspect-Ratio Accurate Miniature Stage */}
      <div
        className="relative overflow-hidden rounded shadow-md border border-white/10 group-hover:scale-[1.03] transition-transform duration-300"
        style={{
          aspectRatio: `${W} / ${H}`,
          width: W >= H ? '100%' : 'auto',
          height: H > W ? '100%' : 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          ...bgStyle
        }}
      >
        {background.type === 'image' && background.overlayOpacity && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: '#000000', opacity: background.overlayOpacity }}
          />
        )}

        {visibleElements.map((el) => {
          const left = `${(el.x / W) * 100}%`;
          const top = `${(el.y / H) * 100}%`;
          const width = `${(el.width / W) * 100}%`;
          const height = `${(el.height / H) * 100}%`;
          const transform = el.rotation ? `rotate(${el.rotation}deg)` : undefined;
          const opacity = el.opacity ?? 1;

          if (el.type === 'shape') {
            const se = el as ShapeElement;
            if (se.shapeType === 'frame-border') {
              return (
                <div
                  key={el.id}
                  className="absolute pointer-events-none"
                  style={{
                    left,
                    top,
                    width,
                    height,
                    transform,
                    opacity,
                    border: `1.5px solid ${se.strokeColor || se.fillColor || '#fbbf24'}`
                  }}
                />
              );
            }
            const shapeDef = SHAPES_100_MAP[se.shapeType];
            if (shapeDef?.pathData && se.shapeType !== 'rectangle') {
              return (
                <svg
                  key={el.id}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute pointer-events-none"
                  style={{ left, top, width, height, transform, opacity }}
                >
                  <path
                    d={shapeDef.pathData}
                    fill={se.fillColor || (se.shapeType === 'verified-badge' ? '#1d9bf0' : '#fbbf24')}
                    fillRule="evenodd"
                  />
                  {se.shapeType === 'verified-badge' && (
                    <path
                      d="M 30,52 L 44,66 L 71,35"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              );
            }
            return (
              <div
                key={el.id}
                className="absolute pointer-events-none"
                style={{
                  left,
                  top,
                  width,
                  height,
                  transform,
                  opacity,
                  backgroundColor: se.fillColor === 'transparent' ? 'transparent' : se.fillColor,
                  borderRadius: se.borderRadius ? '3px' : undefined,
                  border: se.strokeColor ? `1px solid ${se.strokeColor}` : undefined
                }}
              />
            );
          }

          if (el.type === 'image') {
            const ie = el as ImageElement;
            const br = ie.borderRadius ? `${Math.min(999, Math.round(ie.borderRadius / 8))}px` : undefined;
            if (ie.cropRect) {
              const c = ie.cropRect;
              return (
                <div
                  key={el.id}
                  className="absolute overflow-hidden pointer-events-none"
                  style={{ left, top, width, height, transform, opacity, borderRadius: br }}
                >
                  <img
                    src={ie.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-w-none max-h-none pointer-events-none"
                    style={{
                      position: 'absolute',
                      width: `${(100 / c.w).toFixed(2)}%`,
                      height: `${(100 / c.h).toFixed(2)}%`,
                      left: `${(-(c.x / c.w) * 100).toFixed(2)}%`,
                      top: `${(-(c.y / c.h) * 100).toFixed(2)}%`,
                      objectFit: 'fill'
                    }}
                  />
                </div>
              );
            }
            return (
              <img
                key={el.id}
                src={ie.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute object-cover pointer-events-none"
                style={{
                  left,
                  top,
                  width,
                  height,
                  transform,
                  opacity,
                  borderRadius: br
                }}
              />
            );
          }

          if (el.type === 'text') {
            const te = el as TextElement;
            const scaledFont = Math.max(4.5, Math.min(13, (te.fontSize / H) * 145));
            return (
              <div
                key={el.id}
                className="absolute overflow-hidden pointer-events-none leading-[1.08]"
                style={{
                  left,
                  top,
                  width,
                  height,
                  transform,
                  opacity,
                  color: te.color,
                  fontSize: `${scaledFont}px`,
                  fontWeight: te.fontWeight,
                  fontStyle: te.fontStyle,
                  fontFamily: `"${te.fontFamily}", sans-serif`,
                  textAlign: te.textAlign,
                  backgroundColor: te.backgroundColor,
                  borderRadius: te.backgroundColor ? '2px' : undefined,
                  padding: te.backgroundColor ? '1px 2px' : undefined
                }}
              >
                {te.text}
              </div>
            );
          }

          if (el.type === 'badge') {
            const be = el as BadgeElement;
            return (
              <div
                key={el.id}
                className="absolute rounded-full flex items-center justify-center px-1 overflow-hidden pointer-events-none font-bold"
                style={{
                  left,
                  top,
                  width,
                  height,
                  transform,
                  opacity,
                  backgroundColor: be.bgColor,
                  color: be.textColor,
                  fontSize: '5.5px'
                }}
              >
                <span className="truncate">{be.text}</span>
              </div>
            );
          }

          if (el.type === 'chart') {
            const ce = el as ChartElement;
            const accent = ce.data?.[0]?.color || ce.colorPalette?.[0] || '#fbbf24';
            const accent2 = ce.data?.[1]?.color || ce.colorPalette?.[1] || '#38bdf8';
            const isRound =
              ce.chartType === 'pie' ||
              ce.chartType === 'donut' ||
              ce.chartType === 'semi-donut' ||
              ce.chartType === 'progress-ring' ||
              ce.chartType === 'radar';

            return (
              <div
                key={el.id}
                className="absolute rounded p-1 flex flex-col justify-between overflow-hidden pointer-events-none"
                style={{
                  left,
                  top,
                  width,
                  height,
                  transform,
                  opacity,
                  backgroundColor:
                    ce.backgroundColor === 'transparent'
                      ? 'rgba(15,23,42,0.55)'
                      : ce.backgroundColor || 'rgba(15,23,42,0.85)',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              >
                <div
                  className="h-1 w-2/3 rounded-full"
                  style={{ backgroundColor: ce.textColor || '#ffffff', opacity: 0.75 }}
                />
                {isRound ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div
                      className="w-6 h-6 rounded-full border-[3px]"
                      style={{
                        borderColor: accent,
                        borderRightColor: accent2,
                        borderBottomColor: '#22c55e'
                      }}
                    />
                  </div>
                ) : ce.chartType === 'line' || ce.chartType === 'area' || ce.chartType === 'spline' ? (
                  <svg viewBox="0 0 60 28" className="w-full flex-1">
                    <polyline
                      fill="none"
                      stroke={accent}
                      strokeWidth="3"
                      points="2,24 16,15 30,19 44,8 58,4"
                    />
                  </svg>
                ) : (
                  <div className="flex items-end gap-0.5 flex-1 pt-1">
                    <div className="flex-1 rounded-t-xs h-[45%]" style={{ backgroundColor: accent }} />
                    <div className="flex-1 rounded-t-xs h-[78%]" style={{ backgroundColor: accent2 }} />
                    <div className="flex-1 rounded-t-xs h-[60%]" style={{ backgroundColor: accent }} />
                    <div className="flex-1 rounded-t-xs h-[95%]" style={{ backgroundColor: '#22c55e' }} />
                  </div>
                )}
              </div>
            );
          }

          if (el.type === 'qrcode') {
            return (
              <div
                key={el.id}
                className="absolute bg-white p-0.5 rounded-xs grid grid-cols-3 gap-[1px] pointer-events-none"
                style={{ left, top, width, height, transform, opacity }}
              >
                {[1, 1, 1, 1, 0, 1, 1, 1, 0].map((v, i) => (
                  <div key={i} className={v ? 'bg-black' : 'bg-white'} />
                ))}
              </div>
            );
          }

          return null;
        })}

        {effectDef?.overlayColor && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: effectDef.overlayColor,
              opacity: effectDef.overlayAlpha ?? 0.16,
              mixBlendMode: (effectDef.overlayBlend || 'soft-light') as React.CSSProperties['mixBlendMode']
            }}
          />
        )}
      </div>

      {/* Top-right category tag */}
      <span
        className="absolute top-1.5 right-1.5 text-[8px] font-extrabold px-1.5 py-0.5 rounded text-black uppercase tracking-wider shadow pointer-events-none"
        style={{ backgroundColor: template.previewAccent || '#fbbf24' }}
      >
        {template.previewBadge || template.categoryLabelSwahili.slice(0, 7)}
      </span>
    </div>
  );
});

