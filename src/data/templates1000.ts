import {
  PosterTemplate,
  PosterElement,
  PosterBackground,
  TemplateCategory,
  ChartType,
  ColorEffectPreset
} from '../types/poster';
import { DEFAULT_TEMPLATES } from './defaultTemplates';
import { STOCK_POSTER_IMAGES } from './stockImages';
import { READY_LOGOS } from './logos';

interface PaletteTheme {
  name: string;
  bg: PosterBackground;
  accent: string;
  accent2: string;
  textMain: string;
  textMuted: string;
  cardBg: string;
  previewBg: string;
  effect?: ColorEffectPreset;
}

const THEMES: PaletteTheme[] = [
  {
    name: 'Usiku wa Dhahabu',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 155, stops: [{ offset: 0, color: '#0f172a' }, { offset: 1, color: '#020617' }] } },
    accent: '#fbbf24',
    accent2: '#f59e0b',
    textMain: '#ffffff',
    textMuted: '#cbd5e1',
    cardBg: '#1e293b',
    previewBg: 'linear-gradient(155deg, #0f172a, #020617)'
  },
  {
    name: 'Habari Nyekundu',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 145, stops: [{ offset: 0, color: '#7f1d1d' }, { offset: 0.6, color: '#18181b' }, { offset: 1, color: '#09090b' }] } },
    accent: '#ef4444',
    accent2: '#facc15',
    textMain: '#ffffff',
    textMuted: '#fca5a5',
    cardBg: '#27272a',
    previewBg: 'linear-gradient(145deg, #991b1b, #09090b)'
  },
  {
    name: 'Bahari ya Biashara',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 160, stops: [{ offset: 0, color: '#0c4a6e' }, { offset: 1, color: '#020617' }] } },
    accent: '#38bdf8',
    accent2: '#22d3ee',
    textMain: '#ffffff',
    textMuted: '#bae6fd',
    cardBg: '#0f172a',
    previewBg: 'linear-gradient(160deg, #0284c7, #020617)'
  },
  {
    name: 'Zumaridi Kijani',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 150, stops: [{ offset: 0, color: '#064e3b' }, { offset: 1, color: '#022c22' }] } },
    accent: '#34d399',
    accent2: '#a3e635',
    textMain: '#ffffff',
    textMuted: '#a7f3d0',
    cardBg: '#065f46',
    previewBg: 'linear-gradient(150deg, #059669, #022c22)'
  },
  {
    name: 'Zambarau Kifalme',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 135, stops: [{ offset: 0, color: '#3b0764' }, { offset: 1, color: '#090514' }] } },
    accent: '#e879f9',
    accent2: '#fbbf24',
    textMain: '#ffffff',
    textMuted: '#f5d0fe',
    cardBg: '#2e1065',
    previewBg: 'linear-gradient(135deg, #6b21a8, #090514)'
  },
  {
    name: 'Kifahari Nyeupe',
    bg: { type: 'color', color: '#f8fafc' },
    accent: '#0f172a',
    accent2: '#d97706',
    textMain: '#0f172a',
    textMuted: '#475569',
    cardBg: '#e2e8f0',
    previewBg: 'linear-gradient(155deg, #ffffff, #e2e8f0)'
  },
  {
    name: 'Krimu ya Cheti',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 140, stops: [{ offset: 0, color: '#fffbeb' }, { offset: 1, color: '#fef3c7' }] } },
    accent: '#b45309',
    accent2: '#1e293b',
    textMain: '#1e293b',
    textMuted: '#78350f',
    cardBg: '#fde68a',
    previewBg: 'linear-gradient(140deg, #fffbeb, #fde68a)'
  },
  {
    name: 'Machungwa Moto',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 135, stops: [{ offset: 0, color: '#7c2d12' }, { offset: 1, color: '#1c1917' }] } },
    accent: '#fb923c',
    accent2: '#fde047',
    textMain: '#ffffff',
    textMuted: '#fed7aa',
    cardBg: '#292524',
    previewBg: 'linear-gradient(135deg, #ea580c, #1c1917)'
  },
  {
    name: 'Neon ya Klabu',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 135, stops: [{ offset: 0, color: '#1e1b4b' }, { offset: 0.6, color: '#312e81' }, { offset: 1, color: '#09090b' }] } },
    accent: '#f43f5e',
    accent2: '#22d3ee',
    textMain: '#ffffff',
    textMuted: '#c7d2fe',
    cardBg: '#1e1b4b',
    previewBg: 'linear-gradient(135deg, #ec4899, #1e1b4b)'
  },
  {
    name: 'Mkaa Safi (Carbon)',
    bg: { type: 'color', color: '#111827' },
    accent: '#10b981',
    accent2: '#38bdf8',
    textMain: '#f9fafb',
    textMuted: '#9ca3af',
    cardBg: '#1f2937',
    previewBg: 'linear-gradient(155deg, #1f2937, #030712)'
  }
];

const STOCK_URLS = [
  STOCK_POSTER_IMAGES.businessSummit,
  STOCK_POSTER_IMAGES.fitnessSports,
  STOCK_POSTER_IMAGES.foodBbq,
  STOCK_POSTER_IMAGES.musicConcert
];

const QUOTE_TEXTS = [
  ['“Mafanikio hayaji kwa kusubiri; yanajengwa kwa hatua ndogo za kila siku.”', 'HEKIMA YA BIASHARA'],
  ['“Anza ulipo, tumia ulichonacho, na fanya kila kitu kwa ubora wa hali ya juu.”', 'MOTISHA YA LEO'],
  ['“Ndoto kubwa inahitaji nidhamu kubwa zaidi ya visingizio.”', 'UONGOZI & DIRA'],
  ['“Usipojenga ndoto zako mwenyewe, mtu mwingine atakuajiri kujenga zake.”', 'UJASIRIAMALI 2026'],
  ['“Kila asubuhi ni nafasi mpya ya kuandika ukurasa bora wa maisha yako.”', 'TAFAKARI YA ASUBUHI'],
  ['“Elimu na ubunifu ni funguo mbili zinazofungua milango yote duniani.”', 'MAARIFA & KASI'],
  ['“Usiogope kuanza upya; wakati mwingine huo ndio mwanzo wa ushindi wako.”', 'MOYO WA SHUJAA'],
  ['“Thamani yako haipimwi kwa maneno, bali kwa matokeo ya kazi yako.”', 'UBORA KWANZA'],
  ['“Ukiamini inawezekana, tayari umeshashinda nusu ya safari.”', 'NGUVU YA IMANI'],
  ['“Subira, bidii na maombi ni nguzo tatu zisizoshindwa kamwe.”', 'NENO LA MATUMAINI']
];

const NEWS_HEADLINES = [
  ['SERIKALI YAZINDUA MRADI MPYA WA TEHAMA NA VIWANDA', 'MUBASHARA'],
  ['UCHUMI WA AFRIKA MASHARIKI WAKUA KWA ASILIMIA 6.8', 'HABARI MPYA'],
  ['TIMU YA TAIFA YATINGA NUSU FAINALI KWA KISHINDO', 'MICHEZO LEO'],
  ['BEI ZA MAZAO SOKONI ZAPANDA KWA WAKULIMA WOTE', 'TAARIFA RASMI'],
  ['MVUA KUBWA ZATABIRIWA PWANI NA NYANDA ZA JUU', 'TAHADHARI'],
  ['BENKI KUU YATOA FURA MPYA YA MIKOPO KWA VIJANA', 'UCHUMI'],
  ['WAJASIRIAMALI 5,000 WAPATA MAFUNZO YA BIASHARA YA MTANDAO', 'EXCLUSIVE'],
  ['TAMASHA LA MUZIKI LA KIMATAIFA KUANZA IJUMAA HII', 'BURUDANI'],
  ['TEKNOLOJIA MPYA YA NISHATI YA JUA YAFIKA VIJIJINI', 'UBUNIFU'],
  ['SHULE BORA ZA MWAKA ZATANGAZWA RASMI LEO ASUBUHI', 'ELIMU NEWS']
];

const MAGAZINE_TITLES = [
  ['MALOSHA', 'MAISHA & BIASHARA', 'SIRI 10 ZA KUKUZA KAMPUNI YAKO MWAKA 2026'],
  ['FAHARI', 'MITINDO & SANAA', 'UBUNIFU WA KISASA UNAOBADILISHA SOKO LA AFRIKA'],
  ['DIRA', 'TEKNOLOJIA LEO', 'JINSI BIASHARA NDOGO ZINAVYOTUMIA DATA KUSHINDA'],
  ['NYOTA', 'MICHEZO & BURUDANI', 'MAHOJIANO MAALUM NA MABINGWA WA LIGI KUU'],
  ['JIKO', 'LADHA & UTALII', 'VYAKULA BORA NA MAENEO YA KUVUTIA TANZANIA'],
  ['HEKIMA', 'UONGOZI & FEDHA', 'WEKEZA KWA AKILI: RAMANI YA UTAJIRI WA KUDUMU']
];

const BIZ_CARD_PEOPLE = [
  ['JUMA H. MALOSHA', 'Mkurugenzi Mkuu (CEO)', 'MALOSHA STUDIO LTD', '+255 755 123 456', 'info@malosha.co.tz'],
  ['AMINA R. BAKARI', 'Meneja wa Masoko', 'DIRA CREATIVE AGENCY', '+255 712 889 900', 'amina@dira.co.tz'],
  ['BARAKA K. MASAWE', 'Mhandisi wa Mifumo', 'KASI DIGITAL LABS', '+255 784 332 211', 'baraka@kasitech.tz'],
  ['NEEMA J. KILONZO', 'Mshauri wa Fedha', 'FEDHA PLUS CAPITAL', '+255 765 445 566', 'neema@fedhaplus.tz'],
  ['DAVID S. MWANGI', 'Mkurugenzi wa Mauzo', 'AMANI REAL ESTATE', '+255 754 908 070', 'david@amanihomes.tz'],
  ['ZAINAB M. OMAR', 'Mpishi Mkuu & Mmiliki', 'JIKO TAMU CATERING', '+255 655 212 313', 'zainab@jikotamu.tz']
];

const ID_CARD_PEOPLE = [
  ['BARAKA J. KILONZO', 'AFISA TEHAMA MKUU', 'ID: MLS-2026-014', 'MALOSHA CORP'],
  ['FATUMA A. HASSAN', 'MHANDISI WA MIRADI', 'ID: MLS-2026-089', 'KASI ENGINEERING'],
  ['EMMANUEL P. JOHN', 'MWANDISHI WA HABARI', 'PRESS: DR-2026-41', 'DIRA MEDIA GROUP'],
  ['GRACE M. SHAYO', 'MWANAFUNZI · KIDATO IV', 'ADM: EL-2026-302', 'ELIMU ACADEMY'],
  ['MOHAMED K. SALIM', 'AFISA USALAMA MKUU', 'SEC: UH-2026-055', 'UHAKIKA GUARD'],
  ['ESTHER N. MWITA', 'MENEJA WA HAFLA (VIP)', 'PASS: VIP-2026-19', 'RAHA EVENTS TZ']
];

const INVITATION_EVENTS = [
  ['MWALIKO WA HARUSI', 'Juma & Amina', 'Jumamosi, 24 Agosti 2026 · Saa 12:00 Jioni', 'Ukumbi wa Mlimani City Hall'],
  ['SHEREHE YA SEND-OFF', 'Neema M. Bakari', 'Ijumaa, 12 Septemba 2026 · Saa 11:00 Jioni', 'Serena Hotel Grand Ballroom'],
  ['HAPPY BIRTHDAY GALA', 'Baraka Turns 30!', 'Jumapili, 04 Oktoba 2026 · Saa 1:00 Usiku', 'Hyatt Regency Rooftop'],
  ['GRADUATION CELEBRATION', 'Hon. Aisha Kilonzo', 'Jumamosi, 15 Novemba 2026 · Saa 9:00 Mchana', 'Julius Nyerere Conv. Centre'],
  ['CORPORATE DINNER NIGHT', 'Tuzo za Wafanyakazi', 'Alhamisi, 20 Desemba 2026 · Saa 1:30 Usiku', 'Johari Rotana Hall'],
  ['BABY SHOWER BLESSING', 'Karibu Tusherehekee', 'Jumapili, 08 Novemba 2026 · Saa 10:00 Jioni', 'Coral Beach Resort']
];

const CERT_TITLES = [
  ['CHETI CHA HESHIMA', 'Amina Hassan Mwangi', 'Kwa mchango wake wa kipekee, ubunifu na uongozi bora katika mradi wa kidijitali wa mwaka 2026.'],
  ['CHETI CHA KUHITIMU', 'Baraka Joseph Kilonzo', 'Kwa kukamilisha kwa mafanikio makubwa mafunzo ya Ubunifu wa Picha na Takwimu (Pro Level).'],
  ['CHETI CHA SHUKRANI', 'Kampuni ya Dira Media', 'Kwa ushirikiano mzuri, udhamini na mchango mkubwa katika kuendeleza jamii yetu.'],
  ['CHETI CHA USHINDI (MASHINDANO)', 'Neema Petro Massawe', 'Kwa kushika nafasi ya kwanza kitaifa katika maonyesho ya ujasiriamali na ubunifu 2026.'],
  ['CHETI CHA UTUMISHI BORA', 'David Simon Mushi', 'Kwa nidhamu, uaminifu na utendaji uliotukuka kwa kipindi chote cha mwaka wa fedha 2026.']
];

const CHART_PAIRS: Array<[ChartType, ChartType, string]> = [
  ['bar', 'donut', 'Ripoti ya Mauzo & Soko'],
  ['line', 'metric-kpi', 'Mwenendo wa Mapato & KPI'],
  ['horizontal-bar', 'semi-donut', 'Viwango vya Utendaji'],
  ['funnel', 'comparison-table', 'Faneli ya Wateja & Jedwali'],
  ['radar', 'progress-ring', 'Tathmini ya Ubora (Rada)'],
  ['area', 'progress-bar', 'Ukuaji wa Mtaji & Lengo'],
  ['stacked-bar', 'pie', 'Mapato vs Matumizi'],
  ['spline', 'scatter', 'Uchambuzi wa Mwenendo']
];

const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  nukuu: 'Nukuu & Motisha',
  'breaking-news': 'Breaking News',
  magazine: 'Magazine / Jarida',
  'business-card': 'Business Card',
  'id-card': 'Kitambulisho (ID)',
  invitation: 'Kadi ya Mwaliko',
  certificate: 'Cheti / Certificate',
  infographics: 'Grafu & Chati',
  business: 'Biashara & Ofa',
  events: 'Sherehe & Matamasha',
  church: 'Ibada & Mikutano',
  food: 'Chakula & Migahawa',
  sports: 'Michezo & Mazoezi',
  education: 'Elimu & Mafunzo',
  realestate: 'Mali & Viwanja'
};

function makeId(prefix: string, n: number, sub: string): string {
  return `tpl_${prefix}_${n}_${sub}`;
}

function buildNukuuTemplate(idx: number): PosterTemplate {
  const theme = THEMES[idx % THEMES.length];
  const quote = QUOTE_TEXTS[idx % QUOTE_TEXTS.length];
  const isSquare = idx % 2 === 0;
  const w = isSquare ? 1080 : 800;
  const h = isSquare ? 1080 : 1100;
  const variant = idx % 4;

  const elements: PosterElement[] = [
    {
      id: makeId('nq', idx, 'bgshape'),
      type: 'shape',
      shapeType: variant === 0 ? 'frame-border' : variant === 1 ? 'double-frame' : variant === 2 ? 'corner-brackets' : 'arch-frame',
      x: 56,
      y: 56,
      width: w - 112,
      height: h - 112,
      fillColor: theme.accent,
      strokeWidth: 6,
      borderRadius: 16,
      rotation: 0,
      opacity: 0.72
    },
    {
      id: makeId('nq', idx, 'qmark'),
      type: 'shape',
      shapeType: 'quote-mark',
      x: Math.round(w / 2 - 48),
      y: 130,
      width: 96,
      height: 76,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 0.9
    },
    {
      id: makeId('nq', idx, 'kicker'),
      type: 'text',
      text: quote[1],
      x: 90,
      y: 235,
      width: w - 180,
      height: 36,
      fontSize: 18,
      fontFamily: 'Outfit',
      fontWeight: 800,
      color: theme.accent,
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 4,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('nq', idx, 'body'),
      type: 'text',
      text: quote[0],
      x: 95,
      y: Math.round(h * 0.34),
      width: w - 190,
      height: Math.round(h * 0.36),
      fontSize: isSquare ? 46 : 42,
      fontFamily: idx % 3 === 0 ? 'Playfair Display' : idx % 3 === 1 ? 'Outfit' : 'Anton',
      fontStyle: idx % 3 === 0 ? 'italic' : 'normal',
      fontWeight: idx % 3 === 0 ? 700 : 900,
      color: theme.textMain,
      textAlign: 'center',
      lineHeight: 1.25,
      letterSpacing: 0.5,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('nq', idx, 'line'),
      type: 'shape',
      shapeType: 'line',
      x: Math.round(w / 2 - 90),
      y: h - 220,
      width: 180,
      height: 6,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('nq', idx, 'author'),
      type: 'text',
      text: `— MALOSHA HEKIMA #${idx + 1} —`,
      x: 100,
      y: h - 185,
      width: w - 200,
      height: 36,
      fontSize: 18,
      fontFamily: 'Outfit',
      fontWeight: 700,
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 3,
      rotation: 0,
      opacity: 0.9
    }
  ];

  return {
    id: `tpl_nukuu_${idx + 1}`,
    title: `Quote Poster ${idx + 1}`,
    titleSwahili: `Nukuu: ${quote[1]} #${idx + 1}`,
    category: 'nukuu',
    categoryLabelSwahili: CATEGORY_LABELS.nukuu,
    description: `${theme.name} · ${isSquare ? '1:1' : '3:4'} · Fremu za nukuu`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    colorEffect: theme.effect,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: isSquare ? '1:1' : '3:4'
  };
}

function buildBreakingNewsTemplate(idx: number): PosterTemplate {
  const theme = THEMES[(idx + 1) % THEMES.length];
  const news = NEWS_HEADLINES[idx % NEWS_HEADLINES.length];
  const isWide = idx % 3 === 0;
  const w = isWide ? 1280 : 1080;
  const h = isWide ? 720 : 1080;
  const photo = STOCK_URLS[idx % STOCK_URLS.length];
  const logo = READY_LOGOS[(idx % 2) + 1];

  const elements: PosterElement[] = [
    {
      id: makeId('bn', idx, 'photo'),
      type: 'image',
      src: photo,
      x: 0,
      y: 0,
      width: w,
      height: h - (isWide ? 190 : 280),
      borderRadius: 0,
      filterContrast: 112,
      rotation: 0,
      opacity: 0.85
    },
    {
      id: makeId('bn', idx, 'topstrip'),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: 0,
      width: w,
      height: 82,
      fillColor: '#b91c1c',
      rotation: 0,
      opacity: 0.96
    },
    {
      id: makeId('bn', idx, 'livepill'),
      type: 'badge',
      text: `● ${news[1]}`,
      badgeStyle: 'pill',
      bgColor: '#facc15',
      textColor: '#000000',
      fontSize: 18,
      x: 36,
      y: 19,
      width: 220,
      height: 44,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bn', idx, 'logo'),
      type: 'image',
      src: logo.dataUrl,
      x: w - 260,
      y: 12,
      width: 230,
      height: 58,
      borderRadius: 8,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bn', idx, 'lowerpanel'),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: h - (isWide ? 240 : 340),
      width: w,
      height: isWide ? 240 : 340,
      fillColor: '#09090b',
      rotation: 0,
      opacity: 0.96
    },
    {
      id: makeId('bn', idx, 'accentbar'),
      type: 'shape',
      shapeType: 'slash-panel',
      x: 36,
      y: h - (isWide ? 265 : 370),
      width: 340,
      height: 56,
      fillColor: '#dc2626',
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bn', idx, 'brktxt'),
      type: 'text',
      text: 'BREAKING NEWS',
      x: 46,
      y: h - (isWide ? 256 : 361),
      width: 300,
      height: 40,
      fontSize: 28,
      fontFamily: 'Anton',
      fontWeight: 900,
      color: '#ffffff',
      textAlign: 'left',
      lineHeight: 1.1,
      letterSpacing: 2,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bn', idx, 'headline'),
      type: 'text',
      text: news[0],
      x: 40,
      y: h - (isWide ? 190 : 285),
      width: w - 80,
      height: isWide ? 115 : 190,
      fontSize: isWide ? 38 : 48,
      fontFamily: 'Anton',
      fontWeight: 900,
      color: '#ffffff',
      textAlign: 'left',
      lineHeight: 1.12,
      letterSpacing: 0.5,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bn', idx, 'tickerbg'),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: h - 56,
      width: w,
      height: 56,
      fillColor: '#facc15',
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bn', idx, 'tickertxt'),
      type: 'text',
      text: `TAARIFA YA HABARI #${idx + 1}  ·  FUATILIA MUBASHARA KILA SAA  ·  @HABARIMEDIA`,
      x: 24,
      y: h - 42,
      width: w - 48,
      height: 30,
      fontSize: 18,
      fontFamily: 'Outfit',
      fontWeight: 900,
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 1.5,
      rotation: 0,
      opacity: 1
    }
  ];

  return {
    id: `tpl_breaking_${idx + 1}`,
    title: `Breaking News ${idx + 1}`,
    titleSwahili: `Habari: ${news[0].slice(0, 32)}...`,
    category: 'breaking-news',
    categoryLabelSwahili: CATEGORY_LABELS['breaking-news'],
    description: `${isWide ? '16:9 TV Banner' : '1:1 Habari Post'} · Ticker + Live Badge`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: 'linear-gradient(145deg, #b91c1c, #09090b)',
    previewAccent: '#facc15',
    previewBadge: isWide ? '16:9 TV' : 'LIVE'
  };
}

function buildMagazineTemplate(idx: number): PosterTemplate {
  const theme = THEMES[(idx + 2) % THEMES.length];
  const mag = MAGAZINE_TITLES[idx % MAGAZINE_TITLES.length];
  const w = 850;
  const h = 1150;
  const photo = STOCK_URLS[(idx + 1) % STOCK_URLS.length];

  const elements: PosterElement[] = [
    {
      id: makeId('mag', idx, 'bgphoto'),
      type: 'image',
      src: photo,
      x: 0,
      y: 0,
      width: w,
      height: h,
      borderRadius: 0,
      filterBrightness: 78,
      filterContrast: 112,
      rotation: 0,
      opacity: 0.72
    },
    {
      id: makeId('mag', idx, 'frame'),
      type: 'shape',
      shapeType: 'frame-border',
      x: 24,
      y: 24,
      width: w - 48,
      height: h - 48,
      fillColor: theme.accent,
      strokeWidth: 4,
      borderRadius: 0,
      rotation: 0,
      opacity: 0.75
    },
    {
      id: makeId('mag', idx, 'masthead'),
      type: 'text',
      text: mag[0],
      x: 40,
      y: 44,
      width: w - 80,
      height: 150,
      fontSize: 120,
      fontFamily: idx % 2 === 0 ? 'Playfair Display' : 'Anton',
      fontWeight: 900,
      color: theme.accent,
      textAlign: 'center',
      lineHeight: 1,
      letterSpacing: 6,
      shadowColor: '#000000',
      shadowBlur: 20,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('mag', idx, 'issuebar'),
      type: 'text',
      text: `TOLEO #${idx + 10}  ·  ${mag[1]}  ·  TSH 5,000`,
      x: 50,
      y: 200,
      width: w - 100,
      height: 30,
      fontSize: 16,
      fontFamily: 'Outfit',
      fontWeight: 800,
      color: '#ffffff',
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 3,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 6,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('mag', idx, 'seal'),
      type: 'shape',
      shapeType: 'burst-16',
      x: w - 210,
      y: 270,
      width: 150,
      height: 150,
      fillColor: theme.accent,
      rotation: 12,
      opacity: 0.95
    },
    {
      id: makeId('mag', idx, 'sealtxt'),
      type: 'text',
      text: 'TOLEO\nMAALUM',
      x: w - 195,
      y: 315,
      width: 120,
      height: 70,
      fontSize: 22,
      fontFamily: 'Anton',
      fontWeight: 900,
      color: '#000000',
      textAlign: 'center',
      lineHeight: 1.1,
      letterSpacing: 1,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('mag', idx, 'coverstory'),
      type: 'text',
      text: mag[2],
      x: 55,
      y: h - 360,
      width: w - 110,
      height: 170,
      fontSize: 44,
      fontFamily: 'Outfit',
      fontWeight: 900,
      color: '#ffffff',
      textAlign: 'left',
      lineHeight: 1.12,
      letterSpacing: 0,
      shadowColor: '#000000',
      shadowBlur: 18,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('mag', idx, 'sub1'),
      type: 'badge',
      text: 'MAHOJIANO MAALUM UK. 14',
      secondaryText: 'WAJASIRIAMALI BORA WA MWAKA',
      badgeStyle: 'pill',
      bgColor: 'rgba(15,23,42,0.88)',
      textColor: theme.accent,
      fontSize: 15,
      x: 55,
      y: h - 160,
      width: 420,
      height: 66,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('mag', idx, 'qr'),
      type: 'qrcode',
      data: 'https://malosha.co.tz/jarida',
      label: 'SOMA MTANDAONI',
      qrColor: '#000000',
      bgColor: '#ffffff',
      x: w - 165,
      y: h - 175,
      width: 115,
      height: 115,
      rotation: 0,
      opacity: 1
    }
  ];

  return {
    id: `tpl_magazine_${idx + 1}`,
    title: `Magazine Cover ${idx + 1}`,
    titleSwahili: `Jarida: ${mag[0]} — ${mag[1]} #${idx + 1}`,
    category: 'magazine',
    categoryLabelSwahili: CATEGORY_LABELS.magazine,
    description: '850×1150 · Jalada la jarida lenye picha, seal & QR',
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: 'JARIDA'
  };
}

function buildBusinessCardTemplate(idx: number): PosterTemplate {
  const theme = THEMES[idx % THEMES.length];
  const person = BIZ_CARD_PEOPLE[idx % BIZ_CARD_PEOPLE.length];
  const logo = READY_LOGOS[idx % READY_LOGOS.length];
  const w = 1050;
  const h = 600;
  const variant = idx % 3;

  const elements: PosterElement[] = [
    {
      id: makeId('bc', idx, 'panel'),
      type: 'shape',
      shapeType: variant === 0 ? 'slash-panel' : variant === 1 ? 'wave-bottom' : 'rectangle',
      x: variant === 0 ? 0 : variant === 1 ? 0 : 0,
      y: 0,
      width: variant === 0 ? 440 : variant === 1 ? w : 36,
      height: variant === 0 ? h : variant === 1 ? 220 : h,
      fillColor: theme.accent,
      rotation: 0,
      opacity: variant === 2 ? 1 : 0.16
    },
    {
      id: makeId('bc', idx, 'accentline'),
      type: 'shape',
      shapeType: 'line',
      x: 72,
      y: 280,
      width: 480,
      height: 6,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bc', idx, 'logo'),
      type: 'image',
      src: logo.dataUrl,
      x: 70,
      y: 54,
      width: 290,
      height: 96,
      borderRadius: 12,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bc', idx, 'name'),
      type: 'text',
      text: person[0],
      x: 72,
      y: 185,
      width: 620,
      height: 55,
      fontSize: 42,
      fontFamily: 'Outfit',
      fontWeight: 900,
      color: theme.textMain,
      textAlign: 'left',
      lineHeight: 1.1,
      letterSpacing: 1,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bc', idx, 'role'),
      type: 'text',
      text: `${person[1]}  ·  ${person[2]}`,
      x: 72,
      y: 238,
      width: 640,
      height: 36,
      fontSize: 20,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 700,
      color: theme.accent,
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 1,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bc', idx, 'contact'),
      type: 'text',
      text: `Simu: ${person[3]}\nBarua Pepe: ${person[4]}\nTovuti: www.malosha.co.tz\nDar es Salaam, Tanzania`,
      x: 72,
      y: 315,
      width: 580,
      height: 210,
      fontSize: 22,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 600,
      color: theme.textMuted,
      textAlign: 'left',
      lineHeight: 1.6,
      letterSpacing: 0,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('bc', idx, 'qr'),
      type: 'qrcode',
      data: `tel:${person[3].replace(/\s+/g, '')}`,
      label: 'SCAN MAWASILIANO',
      qrColor: '#000000',
      bgColor: '#ffffff',
      x: w - 250,
      y: h - 255,
      width: 185,
      height: 185,
      rotation: 0,
      opacity: 1
    }
  ];

  return {
    id: `tpl_bizcard_${idx + 1}`,
    title: `Business Card ${idx + 1}`,
    titleSwahili: `Business Card: ${person[2]} #${idx + 1}`,
    category: 'business-card',
    categoryLabelSwahili: CATEGORY_LABELS['business-card'],
    description: '1050×600 · Kadi ya Biashara + Logo + QR',
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: '7:4 KADI'
  };
}

function buildIdCardTemplate(idx: number): PosterTemplate {
  const theme = THEMES[(idx + 3) % THEMES.length];
  const person = ID_CARD_PEOPLE[idx % ID_CARD_PEOPLE.length];
  const logo = READY_LOGOS[(idx + 4) % READY_LOGOS.length];
  const w = 640;
  const h = 1000;

  const elements: PosterElement[] = [
    {
      id: makeId('id', idx, 'topband'),
      type: 'shape',
      shapeType: 'wave-bottom',
      x: 0,
      y: 0,
      width: w,
      height: 270,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 0.95
    },
    {
      id: makeId('id', idx, 'punch'),
      type: 'shape',
      shapeType: 'pill',
      x: w / 2 - 60,
      y: 22,
      width: 120,
      height: 20,
      fillColor: '#020617',
      rotation: 0,
      opacity: 0.7
    },
    {
      id: makeId('id', idx, 'orgname'),
      type: 'text',
      text: person[3],
      x: 40,
      y: 66,
      width: w - 80,
      height: 44,
      fontSize: 30,
      fontFamily: 'Outfit',
      fontWeight: 900,
      color: '#000000',
      textAlign: 'center',
      lineHeight: 1.1,
      letterSpacing: 2,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('id', idx, 'idhead'),
      type: 'text',
      text: 'KITAMBULISHO RASMI · STAFF ID',
      x: 40,
      y: 112,
      width: w - 80,
      height: 28,
      fontSize: 15,
      fontFamily: 'Outfit',
      fontWeight: 800,
      color: '#0f172a',
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 3,
      rotation: 0,
      opacity: 0.9
    },
    {
      id: makeId('id', idx, 'photoframe'),
      type: 'shape',
      shapeType: 'circle',
      x: w / 2 - 125,
      y: 190,
      width: 250,
      height: 250,
      fillColor: theme.cardBg,
      strokeColor: theme.accent,
      strokeWidth: 8,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('id', idx, 'photo'),
      type: 'image',
      src: STOCK_URLS[idx % STOCK_URLS.length],
      x: w / 2 - 110,
      y: 205,
      width: 220,
      height: 220,
      borderRadius: 110,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('id', idx, 'name'),
      type: 'text',
      text: person[0],
      x: 40,
      y: 475,
      width: w - 80,
      height: 48,
      fontSize: 34,
      fontFamily: 'Outfit',
      fontWeight: 900,
      color: theme.textMain,
      textAlign: 'center',
      lineHeight: 1.15,
      letterSpacing: 0.5,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('id', idx, 'rolebadge'),
      type: 'badge',
      text: person[1],
      badgeStyle: 'pill',
      bgColor: theme.accent,
      textColor: '#000000',
      fontSize: 16,
      x: 110,
      y: 535,
      width: w - 220,
      height: 46,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('id', idx, 'idnum'),
      type: 'text',
      text: `${person[2]}\nHALALI HADI: 31 DES 2027`,
      x: 60,
      y: 615,
      width: w - 120,
      height: 74,
      fontSize: 19,
      fontFamily: 'Outfit',
      fontWeight: 700,
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: 1.5,
      letterSpacing: 1.5,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('id', idx, 'qr'),
      type: 'qrcode',
      data: `https://malosha.co.tz/verify/${person[2]}`,
      label: 'THIBITISHA ID',
      qrColor: '#000000',
      bgColor: '#ffffff',
      x: w / 2 - 80,
      y: 720,
      width: 160,
      height: 160,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('id', idx, 'logo'),
      type: 'image',
      src: logo.dataUrl,
      x: w / 2 - 110,
      y: 905,
      width: 220,
      height: 68,
      borderRadius: 8,
      rotation: 0,
      opacity: 0.95
    }
  ];

  return {
    id: `tpl_idcard_${idx + 1}`,
    title: `ID Card ${idx + 1}`,
    titleSwahili: `Kitambulisho: ${person[3]} #${idx + 1}`,
    category: 'id-card',
    categoryLabelSwahili: CATEGORY_LABELS['id-card'],
    description: '640×1000 · Picha ya duara, namba ya ID & QR ya uthibitisho',
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: 'ID CARD'
  };
}

function buildInvitationTemplate(idx: number): PosterTemplate {
  const theme = THEMES[(idx + 4) % THEMES.length];
  const ev = INVITATION_EVENTS[idx % INVITATION_EVENTS.length];
  const w = 800;
  const h = 1100;

  const elements: PosterElement[] = [
    {
      id: makeId('inv', idx, 'border'),
      type: 'shape',
      shapeType: idx % 2 === 0 ? 'arch-frame' : 'plaque-ornate',
      x: 44,
      y: 44,
      width: w - 88,
      height: h - 88,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 0.45
    },
    {
      id: makeId('inv', idx, 'crown'),
      type: 'shape',
      shapeType: idx % 2 === 0 ? 'crown' : 'heart',
      x: w / 2 - 44,
      y: 110,
      width: 88,
      height: 78,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inv', idx, 'head'),
      type: 'text',
      text: ev[0],
      x: 80,
      y: 215,
      width: w - 160,
      height: 45,
      fontSize: 22,
      fontFamily: 'Outfit',
      fontWeight: 800,
      color: theme.accent,
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 4,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inv', idx, 'names'),
      type: 'text',
      text: ev[1],
      x: 70,
      y: 295,
      width: w - 140,
      height: 180,
      fontSize: 64,
      fontFamily: 'Playfair Display',
      fontStyle: 'italic',
      fontWeight: 700,
      color: theme.textMain,
      textAlign: 'center',
      lineHeight: 1.15,
      letterSpacing: 1,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inv', idx, 'welcome'),
      type: 'text',
      text: 'Kwa heshima na taadhima kubwa tunakualika kushiriki nasi katika siku hii ya furaha na baraka.',
      x: 110,
      y: 495,
      width: w - 220,
      height: 110,
      fontSize: 22,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 500,
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: 1.5,
      letterSpacing: 0,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inv', idx, 'datepill'),
      type: 'badge',
      text: ev[2],
      secondaryText: ev[3],
      badgeStyle: 'pill',
      bgColor: theme.accent,
      textColor: '#000000',
      fontSize: 18,
      x: 90,
      y: 650,
      width: w - 180,
      height: 92,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inv', idx, 'dress'),
      type: 'text',
      text: 'VAZI RASMI: DHAHABU & NYEUSI  ·  RSVP: 0755 123 456',
      x: 80,
      y: 785,
      width: w - 160,
      height: 40,
      fontSize: 16,
      fontFamily: 'Outfit',
      fontWeight: 700,
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: 1.3,
      letterSpacing: 2,
      rotation: 0,
      opacity: 0.9
    },
    {
      id: makeId('inv', idx, 'qr'),
      type: 'qrcode',
      data: 'https://malosha.co.tz/rsvp',
      label: 'THIBITISHA KADI (RSVP)',
      qrColor: '#000000',
      bgColor: '#ffffff',
      x: w / 2 - 70,
      y: 855,
      width: 140,
      height: 140,
      rotation: 0,
      opacity: 1
    }
  ];

  return {
    id: `tpl_invite_${idx + 1}`,
    title: `Invitation Card ${idx + 1}`,
    titleSwahili: `Mwaliko: ${ev[1]} #${idx + 1}`,
    category: 'invitation',
    categoryLabelSwahili: CATEGORY_LABELS.invitation,
    description: '800×1100 · Kadi ya harusi/hafla yenye tarehe, ukumbi & RSVP QR',
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: 'MWALIKO'
  };
}

function buildCertificateTemplate(idx: number): PosterTemplate {
  const theme = idx % 2 === 0 ? THEMES[6] : THEMES[idx % THEMES.length];
  const cert = CERT_TITLES[idx % CERT_TITLES.length];
  const logo = READY_LOGOS[(idx + 9) % READY_LOGOS.length];
  const w = 1120;
  const h = 800;

  const elements: PosterElement[] = [
    {
      id: makeId('ct', idx, 'outerframe'),
      type: 'shape',
      shapeType: 'double-frame',
      x: 28,
      y: 28,
      width: w - 56,
      height: h - 56,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 0.85
    },
    {
      id: makeId('ct', idx, 'logo'),
      type: 'image',
      src: logo.dataUrl,
      x: w / 2 - 125,
      y: 66,
      width: 250,
      height: 76,
      borderRadius: 10,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('ct', idx, 'title'),
      type: 'text',
      text: cert[0],
      x: 90,
      y: 168,
      width: w - 180,
      height: 76,
      fontSize: 54,
      fontFamily: 'Playfair Display',
      fontWeight: 900,
      color: theme.accent,
      textAlign: 'center',
      lineHeight: 1.1,
      letterSpacing: 4,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('ct', idx, 'sub'),
      type: 'text',
      text: 'KINATOLEWA KWA HESHIMA KUBWA KWA:',
      x: 120,
      y: 258,
      width: w - 240,
      height: 30,
      fontSize: 17,
      fontFamily: 'Outfit',
      fontWeight: 800,
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 3,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('ct', idx, 'recipient'),
      type: 'text',
      text: cert[1],
      x: 100,
      y: 315,
      width: w - 200,
      height: 82,
      fontSize: 56,
      fontFamily: 'Playfair Display',
      fontStyle: 'italic',
      fontWeight: 700,
      color: theme.textMain,
      textAlign: 'center',
      textDecoration: 'underline',
      lineHeight: 1.15,
      letterSpacing: 1,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('ct', idx, 'citation'),
      type: 'text',
      text: cert[2],
      x: 150,
      y: 430,
      width: w - 300,
      height: 110,
      fontSize: 22,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 500,
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: 1.5,
      letterSpacing: 0,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('ct', idx, 'sig1'),
      type: 'text',
      text: '______________________\nMKURUGENZI MKUU',
      x: 120,
      y: 620,
      width: 280,
      height: 70,
      fontSize: 16,
      fontFamily: 'Outfit',
      fontWeight: 700,
      color: theme.textMain,
      textAlign: 'center',
      lineHeight: 1.5,
      letterSpacing: 1.5,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('ct', idx, 'seal'),
      type: 'shape',
      shapeType: 'burst-24',
      x: w / 2 - 62,
      y: 575,
      width: 124,
      height: 124,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 0.95
    },
    {
      id: makeId('ct', idx, 'sealstar'),
      type: 'shape',
      shapeType: 'star',
      x: w / 2 - 32,
      y: 605,
      width: 64,
      height: 64,
      fillColor: '#ffffff',
      rotation: 0,
      opacity: 0.95
    },
    {
      id: makeId('ct', idx, 'sig2'),
      type: 'text',
      text: '______________________\nTAREHE: 2026',
      x: w - 400,
      y: 620,
      width: 280,
      height: 70,
      fontSize: 16,
      fontFamily: 'Outfit',
      fontWeight: 700,
      color: theme.textMain,
      textAlign: 'center',
      lineHeight: 1.5,
      letterSpacing: 1.5,
      rotation: 0,
      opacity: 1
    }
  ];

  return {
    id: `tpl_cert_${idx + 1}`,
    title: `Certificate ${idx + 1}`,
    titleSwahili: `Cheti: ${cert[0]} #${idx + 1}`,
    category: 'certificate',
    categoryLabelSwahili: CATEGORY_LABELS.certificate,
    description: '1120×800 · Fremu pacha, muhuri wa dhahabu & nafasi za sahihi',
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: 'CHETI'
  };
}

function buildInfographicTemplate(idx: number): PosterTemplate {
  const theme = THEMES[idx % THEMES.length];
  const pair = CHART_PAIRS[idx % CHART_PAIRS.length];
  const w = 800;
  const h = 1100;
  const chartText = theme.textMain;
  const cardBg = theme.textMain === '#0f172a' ? '#ffffff' : '#0f172a';

  const elements: PosterElement[] = [
    {
      id: makeId('inf', idx, 'tag'),
      type: 'text',
      text: `RIPOTI YA TAKWIMU #${idx + 1}  ·  2026`,
      x: 50,
      y: 44,
      width: 700,
      height: 28,
      fontSize: 15,
      fontFamily: 'Outfit',
      fontWeight: 800,
      color: theme.accent,
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 3,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inf', idx, 'title'),
      type: 'text',
      text: pair[2].toUpperCase(),
      x: 50,
      y: 78,
      width: 700,
      height: 92,
      fontSize: 42,
      fontFamily: 'Outfit',
      fontWeight: 900,
      color: theme.textMain,
      textAlign: 'left',
      lineHeight: 1.1,
      letterSpacing: 0,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inf', idx, 'kpi'),
      type: 'chart',
      chartType: 'metric-kpi',
      data: [],
      x: 50,
      y: 185,
      width: 340,
      height: 140,
      kpiValue: `+${115 + (idx % 9) * 14}%`,
      kpiLabel: 'Ukuaji wa Utendaji',
      kpiTrend: 'up',
      colorPalette: [theme.accent, theme.accent2],
      textColor: chartText,
      backgroundColor: cardBg,
      borderColor: theme.accent,
      borderWidth: 1.5,
      borderRadius: 16,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inf', idx, 'ring'),
      type: 'chart',
      chartType: 'progress-ring',
      data: [],
      x: 410,
      y: 185,
      width: 340,
      height: 140,
      progressValue: 74 + (idx % 24),
      progressLabel: 'Lengo Lililofikiwa',
      colorPalette: [theme.accent2, theme.accent],
      textColor: chartText,
      backgroundColor: cardBg,
      borderColor: '#334155',
      borderWidth: 1.5,
      borderRadius: 16,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inf', idx, 'chart1'),
      type: 'chart',
      chartType: pair[0],
      title: 'Mchanganuo wa Robo Mwaka',
      subtitle: 'Takwimu halisi kwa kategoria',
      x: 50,
      y: 348,
      width: 700,
      height: 325,
      data: [
        { label: 'Q1', value: 45 + (idx % 20), secondaryValue: 22 },
        { label: 'Q2', value: 72 + (idx % 15), secondaryValue: 34 },
        { label: 'Q3', value: 94 + (idx % 18), secondaryValue: 48 },
        { label: 'Q4', value: 128 + (idx % 25), secondaryValue: 62 }
      ],
      colorPalette: [theme.accent, theme.accent2, '#10b981', '#ec4899', '#8b5cf6'],
      showValues: true,
      showLegend: true,
      showGridlines: true,
      textColor: chartText,
      backgroundColor: cardBg,
      borderColor: '#334155',
      borderWidth: 1.5,
      borderRadius: 18,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inf', idx, 'chart2'),
      type: 'chart',
      chartType: pair[1],
      title: 'Ulinganisho wa Vigezo Vikuu',
      subtitle: 'Muhtasari wa ubora na soko',
      x: 50,
      y: 695,
      width: 700,
      height: 320,
      data: [
        { label: 'Ubora', value: 88 },
        { label: 'Kasi', value: 76 },
        { label: 'Huduma', value: 94 },
        { label: 'Bei', value: 70 },
        { label: 'Ubunifu', value: 90 }
      ],
      colorPalette: [theme.accent2, theme.accent, '#38bdf8', '#f43f5e', '#10b981'],
      showValues: true,
      showLegend: true,
      showGridlines: true,
      textColor: chartText,
      backgroundColor: cardBg,
      borderColor: '#334155',
      borderWidth: 1.5,
      borderRadius: 18,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId('inf', idx, 'footer'),
      type: 'text',
      text: 'Chanzo: Malosha Analytics Hub · Spark Plan Ready',
      x: 50,
      y: 1038,
      width: 700,
      height: 28,
      fontSize: 13,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 600,
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 1,
      rotation: 0,
      opacity: 0.85
    }
  ];

  return {
    id: `tpl_info_${idx + 1}`,
    title: `Chart Report ${idx + 1}`,
    titleSwahili: `Grafu: ${pair[2]} #${idx + 1}`,
    category: 'infographics',
    categoryLabelSwahili: CATEGORY_LABELS.infographics,
    description: `800×1100 · ${pair[0]} + ${pair[1]} + KPI Cards`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: 'GRAFU'
  };
}

interface GeneralCategorySpec {
  cat: TemplateCategory;
  count: number;
  titles: string[];
  subtitles: string[];
  badgeText: string;
  shapeAccent: string;
  photoIdx: number;
}

const GENERAL_SPECS: GeneralCategorySpec[] = [
  {
    cat: 'business',
    count: 70,
    titles: ['OFA KUBWA YA BIASHARA', 'SOKO LA KISASA 2026', 'BIDHAA MPYA ZIMEWASILI', 'HUDUMA BORA ZA KAMPUNI'],
    subtitles: ['Punguzo Hadi 50% · Ubora wa Kimataifa', 'Agiza Mtandaoni Tukuletee Popote'],
    badgeText: 'PUNGUZO 50% LEO',
    shapeAccent: 'slash-panel',
    photoIdx: 0
  },
  {
    cat: 'events',
    count: 60,
    titles: ['TAMASHA KUBWA LA USIKU', 'LIVE MUSIC FESTIVAL', 'VIP CONCERT NIGHT', 'MKUTANO WA VIJANA'],
    subtitles: ['Muziki, Burudani & Wageni Waalikwa', 'Tiketi Zinapatikana Sasa'],
    badgeText: 'VIP TSH 50,000',
    shapeAccent: 'ticket-notch',
    photoIdx: 0
  },
  {
    cat: 'church',
    count: 55,
    titles: ['MKUTANO MKUU WA INJILI', 'IBADA YA SHUKRANI', 'KESHA LA MAOMBI & USHINDI', 'KONGAMANO LA VIJANA'],
    subtitles: ['Karibu Upokee Baraka na Uponyaji', 'Jumapili · Saa 3:00 Asubuhi'],
    badgeText: 'KARIBU WOTE BURE',
    shapeAccent: 'arch-frame',
    photoIdx: 0
  },
  {
    cat: 'food',
    count: 55,
    titles: ['MENU MAALUM YA LEO', 'CHAKULA KITAMU CHA MOTO', 'GRILL & NYAMA CHOMA', 'DELIVERY BURE NDANI YA MJI'],
    subtitles: ['Ladha Halisi ya Nyumbani · Piga Simu Kuagiza', 'Ofa ya Chakula cha Mchana'],
    badgeText: 'TSH 12,000/= TU',
    shapeAccent: 'wave-top',
    photoIdx: 2
  },
  {
    cat: 'sports',
    count: 55,
    titles: ['MECHI YA KUKATA NA SHOKA', 'MASHINDANO YA RIADHA', 'GYM & FITNESS CHALLENGE', 'LIGI KUU: FAINALI'],
    subtitles: ['Njoo Ushangilie Ushindi Uwanjani', 'Saa 10:00 Jioni · Uwanja Mkuu'],
    badgeText: 'KIINGILIO TSH 10,000',
    shapeAccent: 'diagonal-slice',
    photoIdx: 1
  },
  {
    cat: 'education',
    count: 30,
    titles: ['UDAKTARI & UHANDISI 2026', 'KOZI MPYA ZA KOMPYUTA', 'KUJIUNGA KIDATO CHA 1 - 5', 'WARSHA YA UBUNIFU'],
    subtitles: ['Jisajili Sasa Nafasi Chache Zimebaki', 'Ubora wa Elimu kwa Maisha Bora'],
    badgeText: 'USAJILI UNAENDELEA',
    shapeAccent: 'badge-shield',
    photoIdx: 0
  },
  {
    cat: 'realestate',
    count: 28,
    titles: ['VIWANJA VILIVYOPIMWA', 'NYUMBA ZA KISASA ZINAUZWA', 'FREMU & OFISI ZA KUKODI', 'MRADI MPYA WA MAKAZI'],
    subtitles: ['Hati Miliki Mkononi · Lipa kwa Awamu', 'Tembelea Eneo Bila Malipo'],
    badgeText: 'LIPA KWA AWAMU',
    shapeAccent: 'house-home',
    photoIdx: 3
  }
];

function buildGeneralCategoryTemplate(spec: GeneralCategorySpec, idx: number): PosterTemplate {
  const theme = THEMES[(idx + spec.photoIdx) % THEMES.length];
  const headline = spec.titles[idx % spec.titles.length];
  const subtitle = spec.subtitles[idx % spec.subtitles.length];
  const isSquare = idx % 3 === 1;
  const w = isSquare ? 1080 : 800;
  const h = isSquare ? 1080 : 1100;
  const photo = STOCK_URLS[(spec.photoIdx + idx) % STOCK_URLS.length];
  const logo = READY_LOGOS[(idx + 5) % READY_LOGOS.length];

  const elements: PosterElement[] = [
    {
      id: makeId(spec.cat, idx, 'photo'),
      type: 'image',
      src: photo,
      x: 40,
      y: 40,
      width: w - 80,
      height: Math.round(h * 0.44),
      borderRadius: 24,
      borderColor: theme.accent,
      borderWidth: 4,
      rotation: 0,
      opacity: 0.92
    },
    {
      id: makeId(spec.cat, idx, 'shape'),
      type: 'shape',
      shapeType: spec.shapeAccent,
      x: w - 170,
      y: Math.round(h * 0.36),
      width: 130,
      height: 130,
      fillColor: theme.accent,
      rotation: 0,
      opacity: 0.9
    },
    {
      id: makeId(spec.cat, idx, 'logo'),
      type: 'image',
      src: logo.dataUrl,
      x: 60,
      y: 60,
      width: 220,
      height: 68,
      borderRadius: 10,
      rotation: 0,
      opacity: 0.95
    },
    {
      id: makeId(spec.cat, idx, 'title'),
      type: 'text',
      text: headline,
      x: 52,
      y: Math.round(h * 0.52),
      width: w - 104,
      height: 135,
      fontSize: isSquare ? 52 : 46,
      fontFamily: 'Anton',
      fontWeight: 900,
      color: theme.textMain,
      textAlign: 'left',
      lineHeight: 1.08,
      letterSpacing: 1,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId(spec.cat, idx, 'sub'),
      type: 'text',
      text: subtitle,
      x: 52,
      y: Math.round(h * 0.67),
      width: w - 104,
      height: 75,
      fontSize: 22,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 600,
      color: theme.textMuted,
      textAlign: 'left',
      lineHeight: 1.35,
      letterSpacing: 0,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId(spec.cat, idx, 'badge'),
      type: 'badge',
      text: spec.badgeText,
      secondaryText: `TOLEO #${idx + 1}`,
      badgeStyle: 'pill',
      bgColor: theme.accent,
      textColor: '#000000',
      fontSize: 18,
      x: 52,
      y: h - 185,
      width: 390,
      height: 76,
      rotation: 0,
      opacity: 1
    },
    {
      id: makeId(spec.cat, idx, 'qr'),
      type: 'qrcode',
      data: 'https://malosha.co.tz',
      label: 'MAWASILIANO',
      qrColor: '#000000',
      bgColor: '#ffffff',
      x: w - 180,
      y: h - 195,
      width: 128,
      height: 128,
      rotation: 0,
      opacity: 1
    }
  ];

  return {
    id: `tpl_${spec.cat}_${idx + 1}`,
    title: `${spec.cat} Poster ${idx + 1}`,
    titleSwahili: `${headline} #${idx + 1}`,
    category: spec.cat,
    categoryLabelSwahili: CATEGORY_LABELS[spec.cat],
    description: `${theme.name} · ${isSquare ? '1:1' : '3:4'} · Picha + Beji + QR`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: isSquare ? '1:1' : '3:4'
  };
}

function generateAll1000Templates(): PosterTemplate[] {
  const list: PosterTemplate[] = [...DEFAULT_TEMPLATES];

  for (let i = 0; i < 90; i++) list.push(buildNukuuTemplate(i));
  for (let i = 0; i < 85; i++) list.push(buildBreakingNewsTemplate(i));
  for (let i = 0; i < 75; i++) list.push(buildMagazineTemplate(i));
  for (let i = 0; i < 75; i++) list.push(buildBusinessCardTemplate(i));
  for (let i = 0; i < 75; i++) list.push(buildIdCardTemplate(i));
  for (let i = 0; i < 75; i++) list.push(buildInvitationTemplate(i));
  for (let i = 0; i < 75; i++) list.push(buildCertificateTemplate(i));
  for (let i = 0; i < 85; i++) list.push(buildInfographicTemplate(i));

  for (const spec of GENERAL_SPECS) {
    for (let i = 0; i < spec.count; i++) {
      list.push(buildGeneralCategoryTemplate(spec, i));
    }
  }

  return list;
}

export const TEMPLATES_1000: PosterTemplate[] = generateAll1000Templates();

export const TEMPLATE_CATEGORY_FILTERS: Array<{ id: 'all' | TemplateCategory; label: string }> = [
  { id: 'all', label: 'Zote (1000)' },
  { id: 'nukuu', label: 'Nukuu' },
  { id: 'breaking-news', label: 'Breaking News' },
  { id: 'magazine', label: 'Magazine' },
  { id: 'business-card', label: 'Business Card' },
  { id: 'id-card', label: 'ID Card' },
  { id: 'invitation', label: 'Mwaliko' },
  { id: 'certificate', label: 'Cheti' },
  { id: 'infographics', label: 'Grafu & Chati' },
  { id: 'business', label: 'Biashara' },
  { id: 'events', label: 'Sherehe' },
  { id: 'church', label: 'Ibada' },
  { id: 'food', label: 'Chakula' },
  { id: 'sports', label: 'Michezo' },
  { id: 'education', label: 'Elimu' },
  { id: 'realestate', label: 'Mali & Viwanja' }
];
