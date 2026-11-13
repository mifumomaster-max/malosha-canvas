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
    previewBg: 'linear-gradient(150deg, #059669, #022c22)',
    effect: 'emerald-mint'
  },
  {
    name: 'Zambarau Kifalme',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 135, stops: [{ offset: 0, color: '#3b0764' }, { offset: 1, color: '#090514' }] } },
    accent: '#e879f9',
    accent2: '#fbbf24',
    textMain: '#ffffff',
    textMuted: '#f5d0fe',
    cardBg: '#2e1065',
    previewBg: 'linear-gradient(135deg, #6b21a8, #090514)',
    effect: 'royal-violet'
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
    previewBg: 'linear-gradient(135deg, #ea580c, #1c1917)',
    effect: 'warm-sunset'
  },
  {
    name: 'Neon ya Klabu',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 135, stops: [{ offset: 0, color: '#1e1b4b' }, { offset: 0.6, color: '#312e81' }, { offset: 1, color: '#09090b' }] } },
    accent: '#f43f5e',
    accent2: '#22d3ee',
    textMain: '#ffffff',
    textMuted: '#c7d2fe',
    cardBg: '#1e1b4b',
    previewBg: 'linear-gradient(135deg, #ec4899, #1e1b4b)',
    effect: 'cyber-neon'
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
  },
  {
    name: 'Bluu ya Kifahari',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 145, stops: [{ offset: 0, color: '#1e3a8a' }, { offset: 1, color: '#090d16' }] } },
    accent: '#fde047',
    accent2: '#60a5fa',
    textMain: '#ffffff',
    textMuted: '#bfdbfe',
    cardBg: '#172554',
    previewBg: 'linear-gradient(145deg, #1d4ed8, #090d16)',
    effect: 'cool-cinema'
  },
  {
    name: 'Waridi & Nyeusi',
    bg: { type: 'gradient', gradient: { type: 'linear', angle: 160, stops: [{ offset: 0, color: '#831843' }, { offset: 1, color: '#111827' }] } },
    accent: '#f472b6',
    accent2: '#fbbf24',
    textMain: '#ffffff',
    textMuted: '#fbcfe8',
    cardBg: '#500724',
    previewBg: 'linear-gradient(160deg, #be185d, #111827)'
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
  ['“Subira, bidii na maombi ni nguzo tatu zisizoshindwa kamwe.”', 'NENO LA MATUMAINI'],
  ['“Wekeza kwenye akili yako leo; kesho itakulipa mara elfu.”', 'UWEKEZAJI'],
  ['“Kushindwa ni shule bora kwa wale wanaothubutu kusimama tena.”', 'UJASIRI']
];

const NEWS_HEADLINES = [
  ['SERIKALI YAZINDUA MRADI MPYA WA TEHAMA NA VIWANDA', 'MUBASHARA'],
  ['UCHUMI WA AFRIKA MASHARIKI WAKUA KWA ASILIMIA 6.8', 'HABARI MPYA'],
  ['TIMU YA TAIFA YATINGA NUSU FAINALI KWA KISHINDO', 'MICHEZO LEO'],
  ['BEI ZA MAZAO SOKONI ZAPANDA KWA WAKULIMA WOTE', 'TAARIFA RASMI'],
  ['MVUA KUBWA ZATABIRIWA PWANI NA NYANDA ZA JUU', 'TAHADHARI'],
  ['BENKI KUU YATOA FURSA MPYA YA MIKOPO KWA VIJANA', 'UCHUMI'],
  ['WAJASIRIAMALI 5,000 WAPATA MAFUNZO YA BIASHARA YA MTANDAO', 'EXCLUSIVE'],
  ['TAMASHA LA MUZIKI LA KIMATAIFA KUANZA IJUMAA HII', 'BURUDANI'],
  ['TEKNOLOJIA MPYA YA NISHATI YA JUA YAFIKA VIJIJINI', 'UBUNIFU'],
  ['SHULE BORA ZA MWAKA ZATANGAZWA RASMI LEO ASUBUHI', 'ELIMU NEWS'],
  ['BANDARI YA DAR ES SALAAM YAVUNJA REKODI YA MIZIGO', 'BIASHARA'],
  ['BARABARA MPYA YA KISASA YAFUNGULIWA RASMI', 'MAENDELEO']
];

const MAGAZINE_TITLES = [
  ['MALOSHA', 'MAISHA & BIASHARA', 'SIRI 10 ZA KUKUZA KAMPUNI YAKO MWAKA 2026'],
  ['FAHARI', 'MITINDO & SANAA', 'UBUNIFU WA KISASA UNAOBADILISHA SOKO LA AFRIKA'],
  ['DIRA', 'TEKNOLOJIA LEO', 'JINSI BIASHARA NDOGO ZINAVYOTUMIA DATA KUSHINDA'],
  ['NYOTA', 'MICHEZO & BURUDANI', 'MAHOJIANO MAALUM NA MABINGWA WA LIGI KUU'],
  ['JIKO', 'LADHA & UTALII', 'VYAKULA BORA NA MAENEO YA KUVUTIA TANZANIA'],
  ['HEKIMA', 'UONGOZI & FEDHA', 'WEKEZA KWA AKILI: RAMANI YA UTAJIRI WA KUDUMU'],
  ['SAFARI', 'UTALII & URITHI', 'MAAJABU YA SERENGETI NA ZANZIBAR 2026']
];

const BIZ_CARD_PEOPLE = [
  ['JUMA H. MALOSHA', 'Mkurugenzi Mkuu (CEO)', 'MALOSHA STUDIO LTD', '+255 755 123 456', 'info@malosha.co.tz'],
  ['AMINA R. BAKARI', 'Meneja wa Masoko', 'DIRA CREATIVE AGENCY', '+255 712 889 900', 'amina@dira.co.tz'],
  ['BARAKA K. MASAWE', 'Mhandisi wa Mifumo', 'KASI DIGITAL LABS', '+255 784 332 211', 'baraka@kasitech.tz'],
  ['NEEMA J. KILONZO', 'Mshauri wa Fedha', 'FEDHA PLUS CAPITAL', '+255 765 445 566', 'neema@fedhaplus.tz'],
  ['DAVID S. MWANGI', 'Mkurugenzi wa Mauzo', 'AMANI REAL ESTATE', '+255 754 908 070', 'david@amanihomes.tz'],
  ['ZAINAB M. OMAR', 'Mpishi Mkuu & Mmiliki', 'JIKO TAMU CATERING', '+255 655 212 313', 'zainab@jikotamu.tz'],
  ['HASSAN T. KIPENGE', 'Mhasibu Mkuu (CPA)', 'DHAHABU AUDITORS', '+255 713 554 433', 'hassan@dhahabu.co.tz']
];

const ID_CARD_PEOPLE = [
  ['BARAKA J. KILONZO', 'AFISA TEHAMA MKUU', 'ID: MLS-2026-014', 'MALOSHA CORP'],
  ['FATUMA A. HASSAN', 'MHANDISI WA MIRADI', 'ID: MLS-2026-089', 'KASI ENGINEERING'],
  ['EMMANUEL P. JOHN', 'MWANDISHI WA HABARI', 'PRESS: DR-2026-41', 'DIRA MEDIA GROUP'],
  ['GRACE M. SHAYO', 'MWANAFUNZI · KIDATO IV', 'ADM: EL-2026-302', 'ELIMU ACADEMY'],
  ['MOHAMED K. SALIM', 'AFISA USALAMA MKUU', 'SEC: UH-2026-055', 'UHAKIKA GUARD'],
  ['ESTHER N. MWITA', 'MENEJA WA HAFLA (VIP)', 'PASS: VIP-2026-19', 'RAHA EVENTS TZ'],
  ['KELVIN D. MSANGI', 'DAKTARI MKUU', 'MED: AF-2026-77', 'AFYA KWANZA CLINIC']
];

const INVITATION_EVENTS = [
  ['MWALIKO WA HARUSI', 'Juma & Amina', 'Jumamosi, 24 Agosti 2026 · Saa 12:00 Jioni', 'Ukumbi wa Mlimani City Hall'],
  ['SHEREHE YA SEND-OFF', 'Neema M. Bakari', 'Ijumaa, 12 Septemba 2026 · Saa 11:00 Jioni', 'Serena Hotel Grand Ballroom'],
  ['HAPPY BIRTHDAY GALA', 'Baraka Turns 30!', 'Jumapili, 04 Oktoba 2026 · Saa 1:00 Usiku', 'Hyatt Regency Rooftop'],
  ['GRADUATION CELEBRATION', 'Hon. Aisha Kilonzo', 'Jumamosi, 15 Novemba 2026 · Saa 9:00 Mchana', 'Julius Nyerere Conv. Centre'],
  ['CORPORATE DINNER NIGHT', 'Tuzo za Wafanyakazi', 'Alhamisi, 20 Desemba 2026 · Saa 1:30 Usiku', 'Johari Rotana Hall'],
  ['BABY SHOWER BLESSING', 'Karibu Tusherehekee', 'Jumapili, 08 Novemba 2026 · Saa 10:00 Jioni', 'Coral Beach Resort'],
  ['KITCHEN PARTY MAALUM', 'Salma A. Omari', 'Jumamosi, 19 Septemba 2026 · Saa 10:00 Jioni', 'Golden Tulip Masaki']
];

const CERT_TITLES = [
  ['CHETI CHA HESHIMA', 'Amina Hassan Mwangi', 'Kwa mchango wake wa kipekee, ubunifu na uongozi bora katika mradi wa kidijitali wa mwaka 2026.'],
  ['CHETI CHA KUHITIMU', 'Baraka Joseph Kilonzo', 'Kwa kukamilisha kwa mafanikio makubwa mafunzo ya Ubunifu wa Picha na Takwimu (Pro Level).'],
  ['CHETI CHA SHUKRANI', 'Kampuni ya Dira Media', 'Kwa ushirikiano mzuri, udhamini na mchango mkubwa katika kuendeleza jamii yetu.'],
  ['CHETI CHA USHINDI', 'Neema Petro Massawe', 'Kwa kushika nafasi ya kwanza kitaifa katika maonyesho ya ujasiriamali na ubunifu 2026.'],
  ['CHETI CHA UTUMISHI BORA', 'David Simon Mushi', 'Kwa nidhamu, uaminifu na utendaji uliotukuka kwa kipindi chote cha mwaka wa fedha 2026.'],
  ['CHETI CHA USHIRIKI', 'Grace Eliud Shayo', 'Kwa kushiriki kikamilifu katika kongamano la kimataifa la ubunifu na biashara Dar es Salaam.']
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
  const layout = idx % 5;
  const w = layout === 4 ? 1080 : layout === 0 || layout === 2 ? 1080 : 800;
  const h = layout === 4 ? 1920 : layout === 0 || layout === 2 ? 1080 : 1100;
  const photo = STOCK_URLS[idx % STOCK_URLS.length];

  let elements: PosterElement[];

  if (layout === 1) {
    // Split Left Accent Bar + Bold Impact Typography
    elements = [
      { id: makeId('nq', idx, 'stripe'), type: 'shape', shapeType: 'rectangle', x: 0, y: 0, width: 42, height: h, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'qm'), type: 'shape', shapeType: 'quote-mark', x: 90, y: 140, width: 110, height: 86, fillColor: theme.accent, rotation: 0, opacity: 0.9 },
      { id: makeId('nq', idx, 'kicker'), type: 'text', text: quote[1], x: 90, y: 260, width: w - 160, height: 34, fontSize: 18, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'left', lineHeight: 1.2, letterSpacing: 4, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'body'), type: 'text', text: quote[0], x: 90, y: 330, width: w - 160, height: 420, fontSize: 48, fontFamily: 'Anton', fontWeight: 900, color: theme.textMain, textAlign: 'left', lineHeight: 1.18, letterSpacing: 0.5, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'badge'), type: 'badge', text: `MALOSHA HEKIMA #${idx + 1}`, badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 16, x: 90, y: h - 160, width: 320, height: 52, rotation: 0, opacity: 1 }
    ];
  } else if (layout === 2) {
    // Photo Spotlight + Frosted Floating Quote Card
    elements = [
      { id: makeId('nq', idx, 'bgimg'), type: 'image', src: photo, x: 0, y: 0, width: w, height: h, borderRadius: 0, filterBrightness: 55, filterBlur: 3, rotation: 0, opacity: 0.6 },
      { id: makeId('nq', idx, 'card'), type: 'shape', shapeType: 'rectangle', x: 110, y: 170, width: w - 220, height: h - 340, fillColor: '#09090b', strokeColor: theme.accent, strokeWidth: 4, borderRadius: 28, rotation: 0, opacity: 0.85 },
      { id: makeId('nq', idx, 'star'), type: 'shape', shapeType: 'star', x: w / 2 - 32, y: 225, width: 64, height: 64, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'body'), type: 'text', text: quote[0], x: 160, y: 330, width: w - 320, height: 360, fontSize: 42, fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 700, color: '#ffffff', textAlign: 'center', lineHeight: 1.3, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'author'), type: 'text', text: `— ${quote[1]} —`, x: 160, y: h - 245, width: w - 320, height: 40, fontSize: 18, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'center', lineHeight: 1.2, letterSpacing: 3, rotation: 0, opacity: 1 }
    ];
  } else if (layout === 3) {
    // Diagonal Geometric Slash + Center Typography
    elements = [
      { id: makeId('nq', idx, 'slash'), type: 'shape', shapeType: 'diagonal-slice', x: 0, y: Math.round(h * 0.25), width: w, height: Math.round(h * 0.5), fillColor: theme.accent, rotation: 0, opacity: 0.14 },
      { id: makeId('nq', idx, 'brackets'), type: 'shape', shapeType: 'corner-brackets', x: 54, y: 54, width: w - 108, height: h - 108, fillColor: theme.accent, rotation: 0, opacity: 0.85 },
      { id: makeId('nq', idx, 'kicker'), type: 'text', text: quote[1], x: 80, y: 170, width: w - 160, height: 34, fontSize: 18, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'center', lineHeight: 1.2, letterSpacing: 5, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'body'), type: 'text', text: quote[0], x: 90, y: 310, width: w - 180, height: 420, fontSize: 40, fontFamily: 'Outfit', fontWeight: 800, color: theme.textMain, textAlign: 'center', lineHeight: 1.28, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'author'), type: 'text', text: `@MALOSHA · #${idx + 1}`, x: 100, y: h - 150, width: w - 200, height: 32, fontSize: 16, fontFamily: 'Outfit', fontWeight: 700, color: theme.textMuted, textAlign: 'center', lineHeight: 1.2, letterSpacing: 3, rotation: 0, opacity: 0.9 }
    ];
  } else if (layout === 4) {
    // 9:16 Vertical WhatsApp/IG Story Quote
    elements = [
      { id: makeId('nq', idx, 'arch'), type: 'shape', shapeType: 'arch-frame', x: 70, y: 120, width: w - 140, height: h - 240, fillColor: theme.accent, rotation: 0, opacity: 0.6 },
      { id: makeId('nq', idx, 'qm'), type: 'shape', shapeType: 'quote-mark', x: w / 2 - 55, y: 340, width: 110, height: 85, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'body'), type: 'text', text: quote[0], x: 130, y: 520, width: w - 260, height: 640, fontSize: 54, fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 700, color: theme.textMain, textAlign: 'center', lineHeight: 1.32, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'pill'), type: 'badge', text: quote[1], badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 22, x: w / 2 - 220, y: h - 420, width: 440, height: 68, rotation: 0, opacity: 1 }
    ];
  } else {
    // Classic Ornate Double Frame
    elements = [
      { id: makeId('nq', idx, 'bgshape'), type: 'shape', shapeType: 'double-frame', x: 56, y: 56, width: w - 112, height: h - 112, fillColor: theme.accent, rotation: 0, opacity: 0.72 },
      { id: makeId('nq', idx, 'qmark'), type: 'shape', shapeType: 'quote-mark', x: Math.round(w / 2 - 48), y: 130, width: 96, height: 76, fillColor: theme.accent, rotation: 0, opacity: 0.9 },
      { id: makeId('nq', idx, 'kicker'), type: 'text', text: quote[1], x: 90, y: 235, width: w - 180, height: 36, fontSize: 18, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'center', lineHeight: 1.2, letterSpacing: 4, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'body'), type: 'text', text: quote[0], x: 95, y: Math.round(h * 0.34), width: w - 190, height: Math.round(h * 0.36), fontSize: 44, fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 700, color: theme.textMain, textAlign: 'center', lineHeight: 1.25, letterSpacing: 0.5, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'line'), type: 'shape', shapeType: 'line', x: Math.round(w / 2 - 90), y: h - 220, width: 180, height: 6, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('nq', idx, 'author'), type: 'text', text: `— MALOSHA HEKIMA #${idx + 1} —`, x: 100, y: h - 185, width: w - 200, height: 36, fontSize: 18, fontFamily: 'Outfit', fontWeight: 700, color: theme.textMuted, textAlign: 'center', lineHeight: 1.2, letterSpacing: 3, rotation: 0, opacity: 0.9 }
    ];
  }

  return {
    id: `tpl_nukuu_${idx + 1}`,
    title: `Quote Poster ${idx + 1}`,
    titleSwahili: `Nukuu: ${quote[1]} #${idx + 1}`,
    category: 'nukuu',
    categoryLabelSwahili: CATEGORY_LABELS.nukuu,
    description: `${theme.name} · ${w}×${h} · Muundo #${layout + 1}`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    colorEffect: theme.effect,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: layout === 4 ? 'STORY' : w === h ? '1:1' : '3:4'
  };
}

function buildBreakingNewsTemplate(idx: number): PosterTemplate {
  const theme = THEMES[(idx + 1) % THEMES.length];
  const news = NEWS_HEADLINES[idx % NEWS_HEADLINES.length];
  const layout = idx % 4;
  const w = layout === 0 || layout === 2 ? 1280 : layout === 3 ? 800 : 1080;
  const h = layout === 0 || layout === 2 ? 720 : layout === 3 ? 1100 : 1080;
  const photo = STOCK_URLS[idx % STOCK_URLS.length];
  const logo = READY_LOGOS[(idx % 2) + 1];

  let elements: PosterElement[];

  if (layout === 2) {
    // Split Left Panel Headline + Right Photo (16:9)
    elements = [
      { id: makeId('bn', idx, 'photo'), type: 'image', src: photo, x: 540, y: 0, width: w - 540, height: h - 56, borderRadius: 0, rotation: 0, opacity: 0.95 },
      { id: makeId('bn', idx, 'panel'), type: 'shape', shapeType: 'slash-panel', x: 0, y: 0, width: 650, height: h - 56, fillColor: '#09090b', rotation: 0, opacity: 0.98 },
      { id: makeId('bn', idx, 'live'), type: 'badge', text: `● ${news[1]}`, badgeStyle: 'pill', bgColor: '#dc2626', textColor: '#ffffff', fontSize: 18, x: 44, y: 52, width: 220, height: 44, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'headline'), type: 'text', text: news[0], x: 44, y: 140, width: 510, height: 340, fontSize: 44, fontFamily: 'Anton', fontWeight: 900, color: '#ffffff', textAlign: 'left', lineHeight: 1.15, letterSpacing: 0.5, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'logo'), type: 'image', src: logo.dataUrl, x: 44, y: h - 165, width: 220, height: 68, borderRadius: 8, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'ticker'), type: 'shape', shapeType: 'rectangle', x: 0, y: h - 56, width: w, height: 56, fillColor: '#facc15', rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'tickertxt'), type: 'text', text: `BREAKING NEWS #${idx + 1} · FUATILIA TAARIFA ZETU MUBASHARA`, x: 24, y: h - 42, width: w - 48, height: 30, fontSize: 18, fontFamily: 'Outfit', fontWeight: 900, color: '#000000', textAlign: 'left', lineHeight: 1.2, letterSpacing: 1.5, rotation: 0, opacity: 1 }
    ];
  } else if (layout === 3) {
    // Portrait Breaking Alert Poster (800x1100)
    elements = [
      { id: makeId('bn', idx, 'topred'), type: 'shape', shapeType: 'rectangle', x: 0, y: 0, width: w, height: 150, fillColor: '#b91c1c', rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'brk'), type: 'text', text: 'BREAKING NEWS', x: 40, y: 38, width: w - 80, height: 80, fontSize: 64, fontFamily: 'Anton', fontWeight: 900, color: '#facc15', textAlign: 'center', lineHeight: 1.05, letterSpacing: 3, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'photo'), type: 'image', src: photo, x: 44, y: 180, width: w - 88, height: 430, borderRadius: 20, borderColor: '#facc15', borderWidth: 4, rotation: 0, opacity: 0.95 },
      { id: makeId('bn', idx, 'headline'), type: 'text', text: news[0], x: 48, y: 650, width: w - 96, height: 240, fontSize: 44, fontFamily: 'Anton', fontWeight: 900, color: theme.textMain, textAlign: 'center', lineHeight: 1.15, letterSpacing: 0.5, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'logo'), type: 'image', src: logo.dataUrl, x: w / 2 - 125, y: h - 140, width: 250, height: 74, borderRadius: 8, rotation: 0, opacity: 1 }
    ];
  } else {
    // Full-Bleed Broadcast Lower Third (16:9 or 1:1)
    elements = [
      { id: makeId('bn', idx, 'photo'), type: 'image', src: photo, x: 0, y: 0, width: w, height: h - (layout === 0 ? 190 : 280), borderRadius: 0, filterContrast: 112, rotation: 0, opacity: 0.88 },
      { id: makeId('bn', idx, 'topstrip'), type: 'shape', shapeType: 'rectangle', x: 0, y: 0, width: w, height: 82, fillColor: '#b91c1c', rotation: 0, opacity: 0.96 },
      { id: makeId('bn', idx, 'livepill'), type: 'badge', text: `● ${news[1]}`, badgeStyle: 'pill', bgColor: '#facc15', textColor: '#000000', fontSize: 18, x: 36, y: 19, width: 220, height: 44, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'logo'), type: 'image', src: logo.dataUrl, x: w - 260, y: 12, width: 230, height: 58, borderRadius: 8, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'lowerpanel'), type: 'shape', shapeType: 'rectangle', x: 0, y: h - (layout === 0 ? 240 : 340), width: w, height: layout === 0 ? 240 : 340, fillColor: '#09090b', rotation: 0, opacity: 0.96 },
      { id: makeId('bn', idx, 'accentbar'), type: 'shape', shapeType: 'slash-panel', x: 36, y: h - (layout === 0 ? 265 : 370), width: 340, height: 56, fillColor: '#dc2626', rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'brktxt'), type: 'text', text: 'BREAKING NEWS', x: 46, y: h - (layout === 0 ? 256 : 361), width: 300, height: 40, fontSize: 28, fontFamily: 'Anton', fontWeight: 900, color: '#ffffff', textAlign: 'left', lineHeight: 1.1, letterSpacing: 2, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'headline'), type: 'text', text: news[0], x: 40, y: h - (layout === 0 ? 190 : 285), width: w - 80, height: layout === 0 ? 115 : 190, fontSize: layout === 0 ? 38 : 48, fontFamily: 'Anton', fontWeight: 900, color: '#ffffff', textAlign: 'left', lineHeight: 1.12, letterSpacing: 0.5, rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'tickerbg'), type: 'shape', shapeType: 'rectangle', x: 0, y: h - 56, width: w, height: 56, fillColor: '#facc15', rotation: 0, opacity: 1 },
      { id: makeId('bn', idx, 'tickertxt'), type: 'text', text: `TAARIFA YA HABARI #${idx + 1} · FUATILIA MUBASHARA KILA SAA · @HABARIMEDIA`, x: 24, y: h - 42, width: w - 48, height: 30, fontSize: 18, fontFamily: 'Outfit', fontWeight: 900, color: '#000000', textAlign: 'left', lineHeight: 1.2, letterSpacing: 1.5, rotation: 0, opacity: 1 }
    ];
  }

  return {
    id: `tpl_breaking_${idx + 1}`,
    title: `Breaking News ${idx + 1}`,
    titleSwahili: `Habari: ${news[0].slice(0, 30)}...`,
    category: 'breaking-news',
    categoryLabelSwahili: CATEGORY_LABELS['breaking-news'],
    description: `${w}×${h} · Muundo #${layout + 1} · Ticker + Live Badge`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: 'linear-gradient(145deg, #b91c1c, #09090b)',
    previewAccent: '#facc15',
    previewBadge: layout === 0 ? '16:9 TV' : layout === 2 ? 'SPLIT TV' : layout === 3 ? 'ALERT' : 'LIVE'
  };
}

function buildMagazineTemplate(idx: number): PosterTemplate {
  const theme = THEMES[(idx + 2) % THEMES.length];
  const mag = MAGAZINE_TITLES[idx % MAGAZINE_TITLES.length];
  const layout = idx % 4;
  const w = 850;
  const h = 1150;
  const photo = STOCK_URLS[(idx + 1) % STOCK_URLS.length];

  let elements: PosterElement[];
  if (layout === 1) {
    // Split Magazine Editorial: Left Story Column + Right Tall Cover Image
    elements = [
      { id: makeId('mag', idx, 'masthead'), type: 'text', text: mag[0], x: 40, y: 36, width: w - 80, height: 135, fontSize: 110, fontFamily: 'Anton', fontWeight: 900, color: theme.accent, textAlign: 'left', lineHeight: 1, letterSpacing: 6, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'photo'), type: 'image', src: photo, x: 370, y: 190, width: 440, height: 760, borderRadius: 20, borderColor: theme.accent, borderWidth: 3, rotation: 0, opacity: 0.95 },
      { id: makeId('mag', idx, 'story'), type: 'text', text: mag[2], x: 44, y: 230, width: 300, height: 320, fontSize: 34, fontFamily: 'Playfair Display', fontWeight: 800, color: theme.textMain, textAlign: 'left', lineHeight: 1.2, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'badge'), type: 'badge', text: mag[1], secondaryText: `TOLEO #${idx + 10}`, badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 15, x: 44, y: 580, width: 290, height: 70, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'qr'), type: 'qrcode', data: 'https://malosha.co.tz/jarida', label: 'SOMA ONLINE', qrColor: '#000000', bgColor: '#ffffff', x: 44, y: h - 180, width: 130, height: 130, rotation: 0, opacity: 1 }
    ];
  } else if (layout === 2) {
    // Framed Portrait Window + Bold Top Masthead
    elements = [
      { id: makeId('mag', idx, 'topband'), type: 'shape', shapeType: 'rectangle', x: 0, y: 0, width: w, height: 260, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'masthead'), type: 'text', text: mag[0], x: 40, y: 26, width: w - 80, height: 145, fontSize: 122, fontFamily: 'Playfair Display', fontWeight: 900, color: '#000000', textAlign: 'center', lineHeight: 1, letterSpacing: 6, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'sub'), type: 'text', text: `${mag[1]}  ·  TOLEO #${idx + 1}`, x: 50, y: 175, width: w - 100, height: 32, fontSize: 18, fontFamily: 'Outfit', fontWeight: 800, color: '#09090b', textAlign: 'center', lineHeight: 1.2, letterSpacing: 3, rotation: 0, opacity: 0.9 },
      { id: makeId('mag', idx, 'photo'), type: 'image', src: photo, x: 65, y: 235, width: w - 130, height: 590, borderRadius: 24, borderColor: '#ffffff', borderWidth: 6, rotation: 0, opacity: 0.95 },
      { id: makeId('mag', idx, 'coverstory'), type: 'text', text: mag[2], x: 65, y: 860, width: w - 130, height: 170, fontSize: 38, fontFamily: 'Outfit', fontWeight: 900, color: theme.textMain, textAlign: 'center', lineHeight: 1.15, letterSpacing: 0, rotation: 0, opacity: 1 }
    ];
  } else {
    // Classic Full-Bleed Cover + Starburst + QR
    elements = [
      { id: makeId('mag', idx, 'bgphoto'), type: 'image', src: photo, x: 0, y: 0, width: w, height: h, borderRadius: 0, filterBrightness: 76, filterContrast: 112, rotation: 0, opacity: 0.72 },
      { id: makeId('mag', idx, 'frame'), type: 'shape', shapeType: 'frame-border', x: 24, y: 24, width: w - 48, height: h - 48, fillColor: theme.accent, strokeWidth: 4, borderRadius: 0, rotation: 0, opacity: 0.75 },
      { id: makeId('mag', idx, 'masthead'), type: 'text', text: mag[0], x: 40, y: 44, width: w - 80, height: 150, fontSize: 120, fontFamily: layout === 0 ? 'Playfair Display' : 'Anton', fontWeight: 900, color: theme.accent, textAlign: 'center', lineHeight: 1, letterSpacing: 6, shadowColor: '#000000', shadowBlur: 20, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'issuebar'), type: 'text', text: `TOLEO #${idx + 10}  ·  ${mag[1]}  ·  TSH 5,000`, x: 50, y: 200, width: w - 100, height: 30, fontSize: 16, fontFamily: 'Outfit', fontWeight: 800, color: '#ffffff', textAlign: 'center', lineHeight: 1.2, letterSpacing: 3, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 6, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'seal'), type: 'shape', shapeType: 'burst-16', x: w - 210, y: 270, width: 150, height: 150, fillColor: theme.accent, rotation: 12, opacity: 0.95 },
      { id: makeId('mag', idx, 'sealtxt'), type: 'text', text: 'TOLEO\nMAALUM', x: w - 195, y: 315, width: 120, height: 70, fontSize: 22, fontFamily: 'Anton', fontWeight: 900, color: '#000000', textAlign: 'center', lineHeight: 1.1, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'coverstory'), type: 'text', text: mag[2], x: 55, y: h - 360, width: w - 110, height: 170, fontSize: 44, fontFamily: 'Outfit', fontWeight: 900, color: '#ffffff', textAlign: 'left', lineHeight: 1.12, letterSpacing: 0, shadowColor: '#000000', shadowBlur: 18, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'sub1'), type: 'badge', text: 'MAHOJIANO MAALUM UK. 14', secondaryText: 'WAJASIRIAMALI BORA WA MWAKA', badgeStyle: 'pill', bgColor: 'rgba(15,23,42,0.88)', textColor: theme.accent, fontSize: 15, x: 55, y: h - 160, width: 420, height: 66, rotation: 0, opacity: 1 },
      { id: makeId('mag', idx, 'qr'), type: 'qrcode', data: 'https://malosha.co.tz/jarida', label: 'SOMA MTANDAONI', qrColor: '#000000', bgColor: '#ffffff', x: w - 165, y: h - 175, width: 115, height: 115, rotation: 0, opacity: 1 }
    ];
  }

  return {
    id: `tpl_magazine_${idx + 1}`,
    title: `Magazine Cover ${idx + 1}`,
    titleSwahili: `Jarida: ${mag[0]} — ${mag[1]} #${idx + 1}`,
    category: 'magazine',
    categoryLabelSwahili: CATEGORY_LABELS.magazine,
    description: `850×1150 · Muundo #${layout + 1} · Jalada la jarida`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    colorEffect: theme.effect,
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
  const layout = idx % 4;

  let elements: PosterElement[];
  if (layout === 1) {
    // Centered Luxury Minimalist Business Card
    elements = [
      { id: makeId('bc', idx, 'frame'), type: 'shape', shapeType: 'frame-border', x: 26, y: 26, width: w - 52, height: h - 52, fillColor: theme.accent, strokeWidth: 5, borderRadius: 12, rotation: 0, opacity: 0.85 },
      { id: makeId('bc', idx, 'logo'), type: 'image', src: logo.dataUrl, x: w / 2 - 155, y: 60, width: 310, height: 100, borderRadius: 12, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'name'), type: 'text', text: person[0], x: 80, y: 200, width: w - 160, height: 55, fontSize: 46, fontFamily: 'Playfair Display', fontWeight: 900, color: theme.textMain, textAlign: 'center', lineHeight: 1.1, letterSpacing: 2, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'role'), type: 'text', text: person[1].toUpperCase(), x: 80, y: 265, width: w - 160, height: 34, fontSize: 18, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'center', lineHeight: 1.2, letterSpacing: 4, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'line'), type: 'shape', shapeType: 'line', x: w / 2 - 140, y: 320, width: 280, height: 5, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'contact'), type: 'text', text: `${person[3]}  ·  ${person[4]}\nwww.malosha.co.tz · Dar es Salaam`, x: 80, y: 360, width: w - 160, height: 120, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: theme.textMuted, textAlign: 'center', lineHeight: 1.6, letterSpacing: 0, rotation: 0, opacity: 1 }
    ];
  } else if (layout === 2) {
    // Dark/Accent Split Vertical Two-Column Card
    elements = [
      { id: makeId('bc', idx, 'rightbox'), type: 'shape', shapeType: 'rectangle', x: w - 340, y: 0, width: 340, height: h, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'qr'), type: 'qrcode', data: `tel:${person[3].replace(/\s+/g, '')}`, label: 'SCAN KWA SIMU', qrColor: '#000000', bgColor: '#ffffff', x: w - 265, y: 120, width: 190, height: 190, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'comp'), type: 'text', text: person[2], x: w - 320, y: 350, width: 300, height: 70, fontSize: 22, fontFamily: 'Outfit', fontWeight: 900, color: '#000000', textAlign: 'center', lineHeight: 1.2, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'logo'), type: 'image', src: logo.dataUrl, x: 54, y: 50, width: 280, height: 92, borderRadius: 10, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'name'), type: 'text', text: person[0], x: 56, y: 195, width: 610, height: 55, fontSize: 44, fontFamily: 'Outfit', fontWeight: 900, color: theme.textMain, textAlign: 'left', lineHeight: 1.1, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'role'), type: 'text', text: person[1], x: 56, y: 255, width: 610, height: 36, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: theme.accent, textAlign: 'left', lineHeight: 1.2, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'contact'), type: 'text', text: `Simu: ${person[3]}\nEmail: ${person[4]}\nDar es Salaam, Tanzania`, x: 56, y: 335, width: 610, height: 190, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: theme.textMuted, textAlign: 'left', lineHeight: 1.6, letterSpacing: 0, rotation: 0, opacity: 1 }
    ];
  } else {
    // Classic Diagonal / Wave Business Card
    elements = [
      { id: makeId('bc', idx, 'panel'), type: 'shape', shapeType: layout === 0 ? 'slash-panel' : 'wave-bottom', x: 0, y: 0, width: layout === 0 ? 440 : w, height: layout === 0 ? h : 220, fillColor: theme.accent, rotation: 0, opacity: 0.16 },
      { id: makeId('bc', idx, 'accentline'), type: 'shape', shapeType: 'line', x: 72, y: 280, width: 480, height: 6, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'logo'), type: 'image', src: logo.dataUrl, x: 70, y: 54, width: 290, height: 96, borderRadius: 12, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'name'), type: 'text', text: person[0], x: 72, y: 185, width: 620, height: 55, fontSize: 42, fontFamily: 'Outfit', fontWeight: 900, color: theme.textMain, textAlign: 'left', lineHeight: 1.1, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'role'), type: 'text', text: `${person[1]} · ${person[2]}`, x: 72, y: 238, width: 640, height: 36, fontSize: 20, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: theme.accent, textAlign: 'left', lineHeight: 1.2, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'contact'), type: 'text', text: `Simu: ${person[3]}\nBarua Pepe: ${person[4]}\nTovuti: www.malosha.co.tz\nDar es Salaam, Tanzania`, x: 72, y: 315, width: 580, height: 210, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: theme.textMuted, textAlign: 'left', lineHeight: 1.6, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId('bc', idx, 'qr'), type: 'qrcode', data: `tel:${person[3].replace(/\s+/g, '')}`, label: 'SCAN MAWASILIANO', qrColor: '#000000', bgColor: '#ffffff', x: w - 250, y: h - 255, width: 185, height: 185, rotation: 0, opacity: 1 }
    ];
  }

  return {
    id: `tpl_bizcard_${idx + 1}`,
    title: `Business Card ${idx + 1}`,
    titleSwahili: `Business Card: ${person[2]} #${idx + 1}`,
    category: 'business-card',
    categoryLabelSwahili: CATEGORY_LABELS['business-card'],
    description: `1050×600 · Muundo #${layout + 1} · Logo + QR`,
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
  const layout = idx % 3;

  let elements: PosterElement[];
  if (layout === 1) {
    // Left Stripe + Rounded Square Portrait + Clean White/Card Details
    elements = [
      { id: makeId('id', idx, 'leftbar'), type: 'shape', shapeType: 'rectangle', x: 0, y: 0, width: 70, height: h, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'punch'), type: 'shape', shapeType: 'pill', x: w / 2 - 55, y: 24, width: 110, height: 18, fillColor: theme.textMuted, rotation: 0, opacity: 0.5 },
      { id: makeId('id', idx, 'logo'), type: 'image', src: logo.dataUrl, x: 105, y: 65, width: 280, height: 86, borderRadius: 10, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'photo'), type: 'image', src: STOCK_URLS[idx % STOCK_URLS.length], x: 140, y: 185, width: 360, height: 320, borderRadius: 24, borderColor: theme.accent, borderWidth: 6, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'name'), type: 'text', text: person[0], x: 105, y: 535, width: 490, height: 48, fontSize: 34, fontFamily: 'Outfit', fontWeight: 900, color: theme.textMain, textAlign: 'left', lineHeight: 1.1, letterSpacing: 0.5, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'role'), type: 'text', text: person[1], x: 105, y: 590, width: 490, height: 34, fontSize: 20, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'left', lineHeight: 1.2, letterSpacing: 2, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'idnum'), type: 'text', text: `${person[2]}\n${person[3]}\nHALALI HADI 2027`, x: 105, y: 650, width: 320, height: 110, fontSize: 18, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: theme.textMuted, textAlign: 'left', lineHeight: 1.6, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'qr'), type: 'qrcode', data: `https://malosha.co.tz/verify/${person[2]}`, label: 'SCAN ID', qrColor: '#000000', bgColor: '#ffffff', x: 430, y: 680, width: 165, height: 165, rotation: 0, opacity: 1 }
    ];
  } else if (layout === 2) {
    // VIP / Press Event Badge Style
    elements = [
      { id: makeId('id', idx, 'top'), type: 'shape', shapeType: 'rectangle', x: 0, y: 0, width: w, height: 180, fillColor: '#dc2626', rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'passtype'), type: 'text', text: 'ALL ACCESS PASS', x: 40, y: 58, width: w - 80, height: 70, fontSize: 48, fontFamily: 'Anton', fontWeight: 900, color: '#ffffff', textAlign: 'center', lineHeight: 1.1, letterSpacing: 3, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'photo'), type: 'image', src: STOCK_URLS[idx % STOCK_URLS.length], x: w / 2 - 140, y: 215, width: 280, height: 280, borderRadius: 140, borderColor: '#facc15', borderWidth: 6, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'name'), type: 'text', text: person[0], x: 40, y: 530, width: w - 80, height: 48, fontSize: 36, fontFamily: 'Outfit', fontWeight: 900, color: theme.textMain, textAlign: 'center', lineHeight: 1.1, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'badge'), type: 'badge', text: person[1], badgeStyle: 'pill', bgColor: '#facc15', textColor: '#000000', fontSize: 18, x: 90, y: 595, width: w - 180, height: 50, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'qr'), type: 'qrcode', data: `https://malosha.co.tz/verify/${person[2]}`, label: person[2], qrColor: '#000000', bgColor: '#ffffff', x: w / 2 - 90, y: 685, width: 180, height: 180, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'org'), type: 'text', text: person[3], x: 40, y: 905, width: w - 80, height: 38, fontSize: 22, fontFamily: 'Outfit', fontWeight: 800, color: theme.textMuted, textAlign: 'center', lineHeight: 1.2, letterSpacing: 3, rotation: 0, opacity: 1 }
    ];
  } else {
    // Wave Top Classic Corporate ID
    elements = [
      { id: makeId('id', idx, 'topband'), type: 'shape', shapeType: 'wave-bottom', x: 0, y: 0, width: w, height: 270, fillColor: theme.accent, rotation: 0, opacity: 0.95 },
      { id: makeId('id', idx, 'punch'), type: 'shape', shapeType: 'pill', x: w / 2 - 60, y: 22, width: 120, height: 20, fillColor: '#020617', rotation: 0, opacity: 0.7 },
      { id: makeId('id', idx, 'orgname'), type: 'text', text: person[3], x: 40, y: 66, width: w - 80, height: 44, fontSize: 30, fontFamily: 'Outfit', fontWeight: 900, color: '#000000', textAlign: 'center', lineHeight: 1.1, letterSpacing: 2, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'idhead'), type: 'text', text: 'KITAMBULISHO RASMI · STAFF ID', x: 40, y: 112, width: w - 80, height: 28, fontSize: 15, fontFamily: 'Outfit', fontWeight: 800, color: '#0f172a', textAlign: 'center', lineHeight: 1.2, letterSpacing: 3, rotation: 0, opacity: 0.9 },
      { id: makeId('id', idx, 'photoframe'), type: 'shape', shapeType: 'circle', x: w / 2 - 125, y: 190, width: 250, height: 250, fillColor: theme.cardBg, strokeColor: theme.accent, strokeWidth: 8, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'photo'), type: 'image', src: STOCK_URLS[idx % STOCK_URLS.length], x: w / 2 - 110, y: 205, width: 220, height: 220, borderRadius: 110, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'name'), type: 'text', text: person[0], x: 40, y: 475, width: w - 80, height: 48, fontSize: 34, fontFamily: 'Outfit', fontWeight: 900, color: theme.textMain, textAlign: 'center', lineHeight: 1.15, letterSpacing: 0.5, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'rolebadge'), type: 'badge', text: person[1], badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 16, x: 110, y: 535, width: w - 220, height: 46, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'idnum'), type: 'text', text: `${person[2]}\nHALALI HADI: 31 DES 2027`, x: 60, y: 615, width: w - 120, height: 74, fontSize: 19, fontFamily: 'Outfit', fontWeight: 700, color: theme.textMuted, textAlign: 'center', lineHeight: 1.5, letterSpacing: 1.5, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'qr'), type: 'qrcode', data: `https://malosha.co.tz/verify/${person[2]}`, label: 'THIBITISHA ID', qrColor: '#000000', bgColor: '#ffffff', x: w / 2 - 80, y: 720, width: 160, height: 160, rotation: 0, opacity: 1 },
      { id: makeId('id', idx, 'logo'), type: 'image', src: logo.dataUrl, x: w / 2 - 110, y: 905, width: 220, height: 68, borderRadius: 8, rotation: 0, opacity: 0.95 }
    ];
  }

  return {
    id: `tpl_idcard_${idx + 1}`,
    title: `ID Card ${idx + 1}`,
    titleSwahili: `Kitambulisho: ${person[3]} #${idx + 1}`,
    category: 'id-card',
    categoryLabelSwahili: CATEGORY_LABELS['id-card'],
    description: `640×1000 · Muundo #${layout + 1} · Kitambulisho + QR`,
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
  const layout = idx % 3;
  const w = layout === 1 ? 1080 : 800;
  const h = layout === 1 ? 1080 : 1100;

  let elements: PosterElement[];
  if (layout === 1) {
    // Square Modern Party / Celebration Ticket Card
    elements = [
      { id: makeId('inv', idx, 'card'), type: 'shape', shapeType: 'ticket-notch', x: 54, y: 54, width: w - 108, height: h - 108, fillColor: theme.cardBg, strokeColor: theme.accent, strokeWidth: 4, rotation: 0, opacity: 0.95 },
      { id: makeId('inv', idx, 'star'), type: 'shape', shapeType: 'star-8', x: w / 2 - 45, y: 110, width: 90, height: 90, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'head'), type: 'text', text: ev[0], x: 100, y: 230, width: w - 200, height: 42, fontSize: 24, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'center', lineHeight: 1.2, letterSpacing: 4, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'names'), type: 'text', text: ev[1], x: 90, y: 310, width: w - 180, height: 170, fontSize: 68, fontFamily: 'Anton', fontWeight: 900, color: theme.textMain, textAlign: 'center', lineHeight: 1.1, letterSpacing: 2, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'pill'), type: 'badge', text: ev[2], secondaryText: ev[3], badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 20, x: 130, y: 540, width: w - 260, height: 96, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'qr'), type: 'qrcode', data: 'https://malosha.co.tz/rsvp', label: 'SCAN KWA RSVP', qrColor: '#000000', bgColor: '#ffffff', x: w / 2 - 80, y: 710, width: 160, height: 160, rotation: 0, opacity: 1 }
    ];
  } else {
    // Classic Gold Arch / Ornate Plaque Portrait
    elements = [
      { id: makeId('inv', idx, 'border'), type: 'shape', shapeType: layout === 0 ? 'arch-frame' : 'plaque-ornate', x: 44, y: 44, width: w - 88, height: h - 88, fillColor: theme.accent, rotation: 0, opacity: 0.45 },
      { id: makeId('inv', idx, 'crown'), type: 'shape', shapeType: layout === 0 ? 'crown' : 'heart', x: w / 2 - 44, y: 110, width: 88, height: 78, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'head'), type: 'text', text: ev[0], x: 80, y: 215, width: w - 160, height: 45, fontSize: 22, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'center', lineHeight: 1.2, letterSpacing: 4, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'names'), type: 'text', text: ev[1], x: 70, y: 295, width: w - 140, height: 180, fontSize: 64, fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 700, color: theme.textMain, textAlign: 'center', lineHeight: 1.15, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'welcome'), type: 'text', text: 'Kwa heshima na taadhima kubwa tunakualika kushiriki nasi katika siku hii ya furaha na baraka.', x: 110, y: 495, width: w - 220, height: 110, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 500, color: theme.textMuted, textAlign: 'center', lineHeight: 1.5, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'datepill'), type: 'badge', text: ev[2], secondaryText: ev[3], badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 18, x: 90, y: 650, width: w - 180, height: 92, rotation: 0, opacity: 1 },
      { id: makeId('inv', idx, 'dress'), type: 'text', text: 'VAZI RASMI: DHAHABU & NYEUSI · RSVP: 0755 123 456', x: 80, y: 785, width: w - 160, height: 40, fontSize: 16, fontFamily: 'Outfit', fontWeight: 700, color: theme.textMuted, textAlign: 'center', lineHeight: 1.3, letterSpacing: 2, rotation: 0, opacity: 0.9 },
      { id: makeId('inv', idx, 'qr'), type: 'qrcode', data: 'https://malosha.co.tz/rsvp', label: 'THIBITISHA KADI (RSVP)', qrColor: '#000000', bgColor: '#ffffff', x: w / 2 - 70, y: 855, width: 140, height: 140, rotation: 0, opacity: 1 }
    ];
  }

  return {
    id: `tpl_invite_${idx + 1}`,
    title: `Invitation Card ${idx + 1}`,
    titleSwahili: `Mwaliko: ${ev[1]} #${idx + 1}`,
    category: 'invitation',
    categoryLabelSwahili: CATEGORY_LABELS.invitation,
    description: `${w}×${h} · Muundo #${layout + 1} · Mwaliko + RSVP QR`,
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
  const layout = idx % 3;
  const theme = layout === 2 ? THEMES[0] : idx % 2 === 0 ? THEMES[6] : THEMES[idx % THEMES.length];
  const cert = CERT_TITLES[idx % CERT_TITLES.length];
  const logo = READY_LOGOS[(idx + 9) % READY_LOGOS.length];
  const w = 1120;
  const h = 800;

  let elements: PosterElement[];
  if (layout === 1) {
    // Left Ribbon Stripe Certificate
    elements = [
      { id: makeId('ct', idx, 'leftstripe'), type: 'shape', shapeType: 'rectangle', x: 0, y: 0, width: 170, height: h, fillColor: theme.accent, rotation: 0, opacity: 0.95 },
      { id: makeId('ct', idx, 'seal'), type: 'shape', shapeType: 'burst-24', x: 25, y: 80, width: 120, height: 120, fillColor: '#ffffff', rotation: 0, opacity: 0.95 },
      { id: makeId('ct', idx, 'sealstar'), type: 'shape', shapeType: 'crown', x: 52, y: 108, width: 66, height: 64, fillColor: theme.accent, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'logo'), type: 'image', src: logo.dataUrl, x: 230, y: 64, width: 260, height: 80, borderRadius: 10, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'title'), type: 'text', text: cert[0], x: 230, y: 175, width: 820, height: 76, fontSize: 54, fontFamily: 'Playfair Display', fontWeight: 900, color: theme.accent, textAlign: 'left', lineHeight: 1.1, letterSpacing: 3, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'recipient'), type: 'text', text: cert[1], x: 230, y: 310, width: 820, height: 82, fontSize: 54, fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 700, color: theme.textMain, textAlign: 'left', textDecoration: 'underline', lineHeight: 1.15, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'citation'), type: 'text', text: cert[2], x: 230, y: 420, width: 780, height: 110, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 500, color: theme.textMuted, textAlign: 'left', lineHeight: 1.5, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'sig1'), type: 'text', text: '______________________\nMKURUGENZI MKUU · 2026', x: 230, y: 630, width: 320, height: 70, fontSize: 16, fontFamily: 'Outfit', fontWeight: 700, color: theme.textMain, textAlign: 'left', lineHeight: 1.5, letterSpacing: 1.5, rotation: 0, opacity: 1 }
    ];
  } else {
    // Ornate Double Frame / Dark Award Certificate
    elements = [
      { id: makeId('ct', idx, 'outerframe'), type: 'shape', shapeType: layout === 2 ? 'corner-brackets' : 'double-frame', x: 28, y: 28, width: w - 56, height: h - 56, fillColor: theme.accent, rotation: 0, opacity: 0.85 },
      { id: makeId('ct', idx, 'logo'), type: 'image', src: logo.dataUrl, x: w / 2 - 125, y: 66, width: 250, height: 76, borderRadius: 10, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'title'), type: 'text', text: cert[0], x: 90, y: 168, width: w - 180, height: 76, fontSize: 54, fontFamily: 'Playfair Display', fontWeight: 900, color: theme.accent, textAlign: 'center', lineHeight: 1.1, letterSpacing: 4, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'sub'), type: 'text', text: 'KINATOLEWA KWA HESHIMA KUBWA KWA:', x: 120, y: 258, width: w - 240, height: 30, fontSize: 17, fontFamily: 'Outfit', fontWeight: 800, color: theme.textMuted, textAlign: 'center', lineHeight: 1.2, letterSpacing: 3, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'recipient'), type: 'text', text: cert[1], x: 100, y: 315, width: w - 200, height: 82, fontSize: 56, fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 700, color: theme.textMain, textAlign: 'center', textDecoration: 'underline', lineHeight: 1.15, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'citation'), type: 'text', text: cert[2], x: 150, y: 430, width: w - 300, height: 110, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 500, color: theme.textMuted, textAlign: 'center', lineHeight: 1.5, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'sig1'), type: 'text', text: '______________________\nMKURUGENZI MKUU', x: 120, y: 620, width: 280, height: 70, fontSize: 16, fontFamily: 'Outfit', fontWeight: 700, color: theme.textMain, textAlign: 'center', lineHeight: 1.5, letterSpacing: 1.5, rotation: 0, opacity: 1 },
      { id: makeId('ct', idx, 'seal'), type: 'shape', shapeType: 'burst-24', x: w / 2 - 62, y: 575, width: 124, height: 124, fillColor: theme.accent, rotation: 0, opacity: 0.95 },
      { id: makeId('ct', idx, 'sealstar'), type: 'shape', shapeType: 'star', x: w / 2 - 32, y: 605, width: 64, height: 64, fillColor: '#ffffff', rotation: 0, opacity: 0.95 },
      { id: makeId('ct', idx, 'sig2'), type: 'text', text: '______________________\nTAREHE: 2026', x: w - 400, y: 620, width: 280, height: 70, fontSize: 16, fontFamily: 'Outfit', fontWeight: 700, color: theme.textMain, textAlign: 'center', lineHeight: 1.5, letterSpacing: 1.5, rotation: 0, opacity: 1 }
    ];
  }

  return {
    id: `tpl_cert_${idx + 1}`,
    title: `Certificate ${idx + 1}`,
    titleSwahili: `Cheti: ${cert[0]} #${idx + 1}`,
    category: 'certificate',
    categoryLabelSwahili: CATEGORY_LABELS.certificate,
    description: `1120×800 · Muundo #${layout + 1} · Muhuri & Sahihi`,
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
  const isLandscape = idx % 3 === 1;
  const w = isLandscape ? 1280 : 800;
  const h = isLandscape ? 720 : 1100;
  const chartText = theme.textMain;
  const cardBg = theme.textMain === '#0f172a' || theme.textMain === '#1e293b' ? '#ffffff' : '#0f172a';

  const baseData1 = [
    { label: 'Q1', value: 45 + (idx % 20), secondaryValue: 22 },
    { label: 'Q2', value: 72 + (idx % 15), secondaryValue: 34 },
    { label: 'Q3', value: 94 + (idx % 18), secondaryValue: 48 },
    { label: 'Q4', value: 128 + (idx % 25), secondaryValue: 62 }
  ];
  const baseData2 = [
    { label: 'Ubora', value: 88 },
    { label: 'Kasi', value: 76 },
    { label: 'Huduma', value: 94 },
    { label: 'Bei', value: 70 },
    { label: 'Ubunifu', value: 90 }
  ];

  const elements: PosterElement[] = isLandscape
    ? [
        { id: makeId('inf', idx, 'title'), type: 'text', text: pair[2].toUpperCase(), x: 44, y: 34, width: w - 88, height: 55, fontSize: 38, fontFamily: 'Outfit', fontWeight: 900, color: theme.textMain, textAlign: 'left', lineHeight: 1.1, letterSpacing: 0, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'kpi'), type: 'chart', chartType: 'metric-kpi', data: [], x: 44, y: 112, width: 320, height: 245, kpiValue: `+${115 + (idx % 9) * 14}%`, kpiLabel: 'Ukuaji wa Mwaka', kpiTrend: 'up', colorPalette: [theme.accent, theme.accent2], textColor: chartText, backgroundColor: cardBg, borderColor: theme.accent, borderWidth: 1.5, borderRadius: 16, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'ring'), type: 'chart', chartType: 'progress-ring', data: [], x: 44, y: 380, width: 320, height: 295, progressValue: 74 + (idx % 24), progressLabel: 'Lengo Lililofikiwa', colorPalette: [theme.accent2, theme.accent], textColor: chartText, backgroundColor: cardBg, borderColor: '#334155', borderWidth: 1.5, borderRadius: 16, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'chart1'), type: 'chart', chartType: pair[0], title: 'Mchanganuo Mkuu', x: 390, y: 112, width: 425, height: 563, data: baseData1, colorPalette: [theme.accent, theme.accent2, '#10b981', '#ec4899'], showValues: true, showLegend: true, showGridlines: true, textColor: chartText, backgroundColor: cardBg, borderColor: '#334155', borderWidth: 1.5, borderRadius: 18, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'chart2'), type: 'chart', chartType: pair[1], title: 'Vigezo & Soko', x: 838, y: 112, width: 398, height: 563, data: baseData2, colorPalette: [theme.accent2, theme.accent, '#38bdf8', '#f43f5e', '#10b981'], showValues: true, showLegend: true, showGridlines: true, textColor: chartText, backgroundColor: cardBg, borderColor: '#334155', borderWidth: 1.5, borderRadius: 18, rotation: 0, opacity: 1 }
      ]
    : [
        { id: makeId('inf', idx, 'tag'), type: 'text', text: `RIPOTI YA TAKWIMU #${idx + 1} · 2026`, x: 50, y: 44, width: 700, height: 28, fontSize: 15, fontFamily: 'Outfit', fontWeight: 800, color: theme.accent, textAlign: 'left', lineHeight: 1.2, letterSpacing: 3, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'title'), type: 'text', text: pair[2].toUpperCase(), x: 50, y: 78, width: 700, height: 92, fontSize: 42, fontFamily: 'Outfit', fontWeight: 900, color: theme.textMain, textAlign: 'left', lineHeight: 1.1, letterSpacing: 0, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'kpi'), type: 'chart', chartType: 'metric-kpi', data: [], x: 50, y: 185, width: 340, height: 140, kpiValue: `+${115 + (idx % 9) * 14}%`, kpiLabel: 'Ukuaji wa Utendaji', kpiTrend: 'up', colorPalette: [theme.accent, theme.accent2], textColor: chartText, backgroundColor: cardBg, borderColor: theme.accent, borderWidth: 1.5, borderRadius: 16, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'ring'), type: 'chart', chartType: 'progress-ring', data: [], x: 410, y: 185, width: 340, height: 140, progressValue: 74 + (idx % 24), progressLabel: 'Lengo Lililofikiwa', colorPalette: [theme.accent2, theme.accent], textColor: chartText, backgroundColor: cardBg, borderColor: '#334155', borderWidth: 1.5, borderRadius: 16, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'chart1'), type: 'chart', chartType: pair[0], title: 'Mchanganuo wa Robo Mwaka', subtitle: 'Takwimu halisi kwa kategoria', x: 50, y: 348, width: 700, height: 325, data: baseData1, colorPalette: [theme.accent, theme.accent2, '#10b981', '#ec4899', '#8b5cf6'], showValues: true, showLegend: true, showGridlines: true, textColor: chartText, backgroundColor: cardBg, borderColor: '#334155', borderWidth: 1.5, borderRadius: 18, rotation: 0, opacity: 1 },
        { id: makeId('inf', idx, 'chart2'), type: 'chart', chartType: pair[1], title: 'Ulinganisho wa Vigezo Vikuu', subtitle: 'Muhtasari wa ubora na soko', x: 50, y: 695, width: 700, height: 320, data: baseData2, colorPalette: [theme.accent2, theme.accent, '#38bdf8', '#f43f5e', '#10b981'], showValues: true, showLegend: true, showGridlines: true, textColor: chartText, backgroundColor: cardBg, borderColor: '#334155', borderWidth: 1.5, borderRadius: 18, rotation: 0, opacity: 1 }
      ];

  return {
    id: `tpl_info_${idx + 1}`,
    title: `Chart Report ${idx + 1}`,
    titleSwahili: `Grafu: ${pair[2]} #${idx + 1}`,
    category: 'infographics',
    categoryLabelSwahili: CATEGORY_LABELS.infographics,
    description: `${w}×${h} · ${pair[0]} + ${pair[1]} + KPI`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: isLandscape ? 'DASHBOARD' : 'GRAFU'
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
    photoIdx: 3
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
    photoIdx: 0
  }
];

function buildGeneralCategoryTemplate(spec: GeneralCategorySpec, idx: number): PosterTemplate {
  const theme = THEMES[(idx + spec.photoIdx) % THEMES.length];
  const headline = spec.titles[idx % spec.titles.length];
  const subtitle = spec.subtitles[idx % spec.subtitles.length];
  const layout = idx % 4;
  const w = layout === 2 ? 1280 : layout === 1 ? 1080 : 800;
  const h = layout === 2 ? 720 : layout === 1 ? 1080 : 1100;
  const photo = STOCK_URLS[(spec.photoIdx + idx) % STOCK_URLS.length];
  const logo = READY_LOGOS[(idx + 5) % READY_LOGOS.length];

  let elements: PosterElement[];
  if (layout === 1) {
    // Full-Bleed Square Photo + Dark Scrim + Giant Overlay Text
    elements = [
      { id: makeId(spec.cat, idx, 'bg'), type: 'image', src: photo, x: 0, y: 0, width: w, height: h, borderRadius: 0, filterBrightness: 65, rotation: 0, opacity: 0.78 },
      { id: makeId(spec.cat, idx, 'logo'), type: 'image', src: logo.dataUrl, x: 56, y: 56, width: 250, height: 78, borderRadius: 10, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'burst'), type: 'shape', shapeType: 'burst-16', x: w - 220, y: 48, width: 170, height: 170, fillColor: theme.accent, rotation: 0, opacity: 0.95 },
      { id: makeId(spec.cat, idx, 'title'), type: 'text', text: headline, x: 64, y: 440, width: w - 128, height: 220, fontSize: 64, fontFamily: 'Anton', fontWeight: 900, color: '#ffffff', textAlign: 'left', lineHeight: 1.08, letterSpacing: 1, shadowColor: '#000000', shadowBlur: 18, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'sub'), type: 'text', text: subtitle, x: 64, y: 675, width: w - 128, height: 80, fontSize: 26, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: '#f1f5f9', textAlign: 'left', lineHeight: 1.35, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'badge'), type: 'badge', text: spec.badgeText, badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 20, x: 64, y: h - 155, width: 410, height: 72, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'qr'), type: 'qrcode', data: 'https://malosha.co.tz', label: 'SCAN', qrColor: '#000000', bgColor: '#ffffff', x: w - 190, y: h - 190, width: 130, height: 130, rotation: 0, opacity: 1 }
    ];
  } else if (layout === 2) {
    // 16:9 Wide Banner: Text Left + Photo Right
    elements = [
      { id: makeId(spec.cat, idx, 'photo'), type: 'image', src: photo, x: 620, y: 36, width: 620, height: h - 72, borderRadius: 24, borderColor: theme.accent, borderWidth: 4, rotation: 0, opacity: 0.95 },
      { id: makeId(spec.cat, idx, 'logo'), type: 'image', src: logo.dataUrl, x: 52, y: 48, width: 240, height: 74, borderRadius: 10, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'title'), type: 'text', text: headline, x: 52, y: 165, width: 530, height: 210, fontSize: 52, fontFamily: 'Anton', fontWeight: 900, color: theme.textMain, textAlign: 'left', lineHeight: 1.08, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'sub'), type: 'text', text: subtitle, x: 52, y: 390, width: 520, height: 90, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: theme.textMuted, textAlign: 'left', lineHeight: 1.4, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'badge'), type: 'badge', text: spec.badgeText, badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 18, x: 52, y: h - 150, width: 350, height: 68, rotation: 0, opacity: 1 }
    ];
  } else if (layout === 3) {
    // Circular Photo Frame + Bold Header Top
    elements = [
      { id: makeId(spec.cat, idx, 'title'), type: 'text', text: headline, x: 54, y: 68, width: w - 108, height: 150, fontSize: 52, fontFamily: 'Anton', fontWeight: 900, color: theme.accent, textAlign: 'center', lineHeight: 1.08, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'ring'), type: 'shape', shapeType: 'circle', x: w / 2 - 220, y: 240, width: 440, height: 440, fillColor: theme.accent, rotation: 0, opacity: 0.25 },
      { id: makeId(spec.cat, idx, 'photo'), type: 'image', src: photo, x: w / 2 - 200, y: 260, width: 400, height: 400, borderRadius: 200, borderColor: theme.accent, borderWidth: 6, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'sub'), type: 'text', text: subtitle, x: 70, y: 720, width: w - 140, height: 90, fontSize: 24, fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: theme.textMain, textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'badge'), type: 'badge', text: spec.badgeText, badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 18, x: 60, y: h - 170, width: 380, height: 74, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'qr'), type: 'qrcode', data: 'https://malosha.co.tz', label: 'SCAN HAPA', qrColor: '#000000', bgColor: '#ffffff', x: w - 190, y: h - 190, width: 130, height: 130, rotation: 0, opacity: 1 }
    ];
  } else {
    // Classic Top Hero Card + Overlapping Accent Shape
    elements = [
      { id: makeId(spec.cat, idx, 'photo'), type: 'image', src: photo, x: 40, y: 40, width: w - 80, height: Math.round(h * 0.44), borderRadius: 24, borderColor: theme.accent, borderWidth: 4, rotation: 0, opacity: 0.92 },
      { id: makeId(spec.cat, idx, 'shape'), type: 'shape', shapeType: spec.shapeAccent, x: w - 170, y: Math.round(h * 0.36), width: 130, height: 130, fillColor: theme.accent, rotation: 0, opacity: 0.9 },
      { id: makeId(spec.cat, idx, 'logo'), type: 'image', src: logo.dataUrl, x: 60, y: 60, width: 220, height: 68, borderRadius: 10, rotation: 0, opacity: 0.95 },
      { id: makeId(spec.cat, idx, 'title'), type: 'text', text: headline, x: 52, y: Math.round(h * 0.52), width: w - 104, height: 135, fontSize: 46, fontFamily: 'Anton', fontWeight: 900, color: theme.textMain, textAlign: 'left', lineHeight: 1.08, letterSpacing: 1, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'sub'), type: 'text', text: subtitle, x: 52, y: Math.round(h * 0.67), width: w - 104, height: 75, fontSize: 22, fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: theme.textMuted, textAlign: 'left', lineHeight: 1.35, letterSpacing: 0, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'badge'), type: 'badge', text: spec.badgeText, secondaryText: `TOLEO #${idx + 1}`, badgeStyle: 'pill', bgColor: theme.accent, textColor: '#000000', fontSize: 18, x: 52, y: h - 185, width: 390, height: 76, rotation: 0, opacity: 1 },
      { id: makeId(spec.cat, idx, 'qr'), type: 'qrcode', data: 'https://malosha.co.tz', label: 'MAWASILIANO', qrColor: '#000000', bgColor: '#ffffff', x: w - 180, y: h - 195, width: 128, height: 128, rotation: 0, opacity: 1 }
    ];
  }

  return {
    id: `tpl_${spec.cat}_${idx + 1}`,
    title: `${spec.cat} Poster ${idx + 1}`,
    titleSwahili: `${headline} #${idx + 1}`,
    category: spec.cat,
    categoryLabelSwahili: CATEGORY_LABELS[spec.cat],
    description: `${theme.name} · ${w}×${h} · Muundo #${layout + 1}`,
    width: w,
    height: h,
    background: theme.bg,
    elements,
    colorEffect: theme.effect,
    previewBg: theme.previewBg,
    previewAccent: theme.accent,
    previewBadge: layout === 2 ? '16:9' : layout === 1 ? '1:1' : '3:4'
  };
}

function generateAll1000Templates(): PosterTemplate[] {
  const buckets: PosterTemplate[][] = [];

  buckets.push(Array.from({ length: 90 }, (_, i) => buildNukuuTemplate(i)));
  buckets.push(Array.from({ length: 85 }, (_, i) => buildBreakingNewsTemplate(i)));
  buckets.push(Array.from({ length: 75 }, (_, i) => buildMagazineTemplate(i)));
  buckets.push(Array.from({ length: 75 }, (_, i) => buildBusinessCardTemplate(i)));
  buckets.push(Array.from({ length: 75 }, (_, i) => buildIdCardTemplate(i)));
  buckets.push(Array.from({ length: 75 }, (_, i) => buildInvitationTemplate(i)));
  buckets.push(Array.from({ length: 75 }, (_, i) => buildCertificateTemplate(i)));
  buckets.push(Array.from({ length: 85 }, (_, i) => buildInfographicTemplate(i)));

  for (const spec of GENERAL_SPECS) {
    buckets.push(Array.from({ length: spec.count }, (_, i) => buildGeneralCategoryTemplate(spec, i)));
  }

  // Round-robin interleave so browsing "Zote (1000)" shows varied categories & layouts immediately
  const interleaved: PosterTemplate[] = [...DEFAULT_TEMPLATES];
  const maxLen = Math.max(...buckets.map((b) => b.length));
  for (let i = 0; i < maxLen; i++) {
    for (const bucket of buckets) {
      if (i < bucket.length) {
        interleaved.push(bucket[i]);
      }
    }
  }

  return interleaved;
}

export const TEMPLATES_1000: PosterTemplate[] = generateAll1000Templates();

export const TEMPLATE_CATEGORY_FILTERS: Array<{ id: 'all' | 'featured-uploads' | 'custom' | TemplateCategory; label: string }> = [
  { id: 'all', label: 'Zote' },
  { id: 'featured-uploads', label: 'Violezo Maalum (Picha Zako)' },
  { id: 'custom', label: 'Violezo Vyangu' },
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
