export interface ReadyLogoItem {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  primaryColor: string;
  secondaryColor: string;
  emblemId: string;
  style: 'badge' | 'minimal' | 'emblem' | 'shield';
  dataUrl: string;
}

export interface LogoEmblemOption {
  id: string;
  label: string;
  svgInner: string;
}

export const LOGO_EMBLEMS: LogoEmblemOption[] = [
  {
    id: 'crown',
    label: 'Taji',
    svgInner: '<path d="M18 68 L14 28 L34 46 L50 20 L66 46 L86 28 L82 68 Z" fill="currentColor"/><rect x="18" y="72" width="64" height="8" rx="4" fill="currentColor"/>'
  },
  {
    id: 'star',
    label: 'Nyota',
    svgInner: '<polygon points="50,12 61,37 88,37 66,53 74,80 50,64 26,80 34,53 12,37 39,37" fill="currentColor"/>'
  },
  {
    id: 'bolt',
    label: 'Kasi',
    svgInner: '<path d="M56 12 L24 54 H48 L42 88 L76 44 H52 Z" fill="currentColor"/>'
  },
  {
    id: 'shield',
    label: 'Ngao',
    svgInner: '<path d="M50 12 L82 24 V50 C82 70 67 83 50 90 C33 83 18 70 18 50 V24 Z" fill="none" stroke="currentColor" stroke-width="8"/><path d="M36 50 L46 60 L66 38" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  {
    id: 'leaf',
    label: 'Mazingira',
    svgInner: '<path d="M20 82 C20 40 44 16 84 16 C84 58 58 82 20 82 Z" fill="currentColor"/><path d="M22 80 L64 36" stroke="#00000055" stroke-width="5" stroke-linecap="round"/>'
  },
  {
    id: 'chart',
    label: 'Takwimu',
    svgInner: '<rect x="18" y="52" width="14" height="30" rx="3" fill="currentColor"/><rect x="43" y="34" width="14" height="48" rx="3" fill="currentColor"/><rect x="68" y="18" width="14" height="64" rx="3" fill="currentColor"/>'
  },
  {
    id: 'globe',
    label: 'Habari/Dunia',
    svgInner: '<circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" stroke-width="7"/><ellipse cx="50" cy="50" rx="16" ry="34" fill="none" stroke="currentColor" stroke-width="5"/><line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" stroke-width="5"/>'
  },
  {
    id: 'mic',
    label: 'Habari/Media',
    svgInner: '<rect x="38" y="16" width="24" height="40" rx="12" fill="currentColor"/><path d="M26 48 A24 24 0 0 0 74 48" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><line x1="50" y1="72" x2="50" y2="86" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>'
  },
  {
    id: 'home',
    label: 'Majengo',
    svgInner: '<path d="M50 14 L86 46 H76 V84 H56 V58 H44 V84 H24 V46 H14 Z" fill="currentColor"/>'
  },
  {
    id: 'heart',
    label: 'Afya/Jamii',
    svgInner: '<path d="M50 84 C24 64 14 48 14 33 C14 21 23 14 34 14 C42 14 47 18 50 24 C53 18 58 14 66 14 C77 14 86 21 86 33 C86 48 76 64 50 84 Z" fill="currentColor"/>'
  },
  {
    id: 'cap',
    label: 'Elimu',
    svgInner: '<polygon points="50,20 88,38 50,56 12,38" fill="currentColor"/><path d="M26 48 L50 60 L74 48 V70 L50 82 L26 70 Z" fill="currentColor"/>'
  },
  {
    id: 'cup',
    label: 'Chakula/Tuzo',
    svgInner: '<path d="M26 18 H74 V42 C74 58 64 68 54 70 V82 H68 V88 H32 V82 H46 V70 C36 68 26 58 26 42 Z" fill="currentColor"/>'
  }
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildCustomLogoDataUrl(
  brandName: string,
  subtitle: string,
  emblemId: string,
  primaryColor: string,
  style: 'badge' | 'minimal' | 'emblem' | 'shield' = 'badge',
  secondaryColor: string = '#0f172a'
): string {
  const emblem = LOGO_EMBLEMS.find((e) => e.id === emblemId) || LOGO_EMBLEMS[0];
  const cleanTitle = escapeXml((brandName || 'MALOSHA').toUpperCase().slice(0, 18));
  const cleanSub = escapeXml((subtitle || 'STUDIO & DESIGN').toUpperCase().slice(0, 26));

  let svg = '';
  if (style === 'badge') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="140" viewBox="0 0 420 140">
      <rect x="4" y="4" width="412" height="132" rx="28" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="5"/>
      <circle cx="70" cy="70" r="42" fill="${primaryColor}" fill-opacity="0.16" stroke="${primaryColor}" stroke-width="3"/>
      <g transform="translate(30,30) scale(0.8)" color="${primaryColor}">${emblem.svgInner}</g>
      <text x="130" y="68" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="#ffffff" letter-spacing="1.5">${cleanTitle}</text>
      <text x="132" y="98" font-family="Arial, sans-serif" font-weight="700" font-size="14" fill="${primaryColor}" letter-spacing="3">${cleanSub}</text>
    </svg>`;
  } else if (style === 'shield') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <path d="M160 16 L284 58 V158 C284 228 230 276 160 304 C90 276 36 228 36 158 V58 Z" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="10"/>
      <g transform="translate(95,46) scale(1.3)" color="${primaryColor}">${emblem.svgInner}</g>
      <text x="160" y="216" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" letter-spacing="1.5">${cleanTitle}</text>
      <text x="160" y="246" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="${primaryColor}" letter-spacing="2.5">${cleanSub}</text>
    </svg>`;
  } else if (style === 'emblem') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <circle cx="160" cy="160" r="144" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="10"/>
      <circle cx="160" cy="160" r="126" fill="none" stroke="${primaryColor}" stroke-width="2" stroke-dasharray="8 6"/>
      <g transform="translate(100,48) scale(1.2)" color="${primaryColor}">${emblem.svgInner}</g>
      <text x="160" y="208" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" letter-spacing="2">${cleanTitle}</text>
      <text x="160" y="236" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="${primaryColor}" letter-spacing="3">${cleanSub}</text>
    </svg>`;
  } else {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="140" viewBox="0 0 420 140">
      <rect x="14" y="22" width="96" height="96" rx="24" fill="${primaryColor}"/>
      <g transform="translate(22,30) scale(0.8)" color="${secondaryColor}">${emblem.svgInner}</g>
      <text x="128" y="68" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#ffffff" letter-spacing="1.5">${cleanTitle}</text>
      <text x="130" y="98" font-family="Arial, sans-serif" font-weight="700" font-size="14" fill="${primaryColor}" letter-spacing="3">${cleanSub}</text>
    </svg>`;
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const rawLogos: Array<Omit<ReadyLogoItem, 'dataUrl'>> = [
  { id: 'logo_malosha_studio', name: 'MALOSHA STUDIO', category: 'Ubunifu', subtitle: 'POSTER & DESIGN', primaryColor: '#fbbf24', secondaryColor: '#0f172a', emblemId: 'crown', style: 'badge' },
  { id: 'logo_habari_tv', name: 'HABARI 24 TV', category: 'Habari', subtitle: 'BREAKING NEWS NETWORK', primaryColor: '#ef4444', secondaryColor: '#111827', emblemId: 'globe', style: 'badge' },
  { id: 'logo_dira_fm', name: 'DIRA MEDIA', category: 'Habari', subtitle: 'SAUTI YA JAMII', primaryColor: '#38bdf8', secondaryColor: '#020617', emblemId: 'mic', style: 'minimal' },
  { id: 'logo_simba_tech', name: 'KASI TECH', category: 'Teknolojia', subtitle: 'DIGITAL SOLUTIONS', primaryColor: '#22d3ee', secondaryColor: '#09090b', emblemId: 'bolt', style: 'minimal' },
  { id: 'logo_amani_realty', name: 'AMANI HOMES', category: 'Majengo', subtitle: 'REAL ESTATE TANZANIA', primaryColor: '#f59e0b', secondaryColor: '#1c1917', emblemId: 'home', style: 'shield' },
  { id: 'logo_kijani_eco', name: 'KIJANI FARM', category: 'Kilimo', subtitle: 'ORGANIC PRODUCE', primaryColor: '#10b981', secondaryColor: '#022c22', emblemId: 'leaf', style: 'emblem' },
  { id: 'logo_fedha_plus', name: 'FEDHA PLUS', category: 'Biashara', subtitle: 'MICROFINANCE & DATA', primaryColor: '#3b82f6', secondaryColor: '#0f172a', emblemId: 'chart', style: 'badge' },
  { id: 'logo_msafiri_express', name: 'MSAFIRI CARGO', category: 'Biashara', subtitle: 'FAST LOGISTICS', primaryColor: '#f97316', secondaryColor: '#18181b', emblemId: 'bolt', style: 'badge' },
  { id: 'logo_afya_care', name: 'AFYA KWANZA', category: 'Afya', subtitle: 'CLINIC & PHARMACY', primaryColor: '#14b8a6', secondaryColor: '#042f2e', emblemId: 'heart', style: 'shield' },
  { id: 'logo_elimu_academy', name: 'ELIMU BORA', category: 'Elimu', subtitle: 'HIGH SCHOOL & COLLEGE', primaryColor: '#60a5fa', secondaryColor: '#172554', emblemId: 'cap', style: 'shield' },
  { id: 'logo_taji_fashion', name: 'TAJI COUTURE', category: 'Mitindo', subtitle: 'LUXURY BOUTIQUE', primaryColor: '#facc15', secondaryColor: '#18181b', emblemId: 'crown', style: 'emblem' },
  { id: 'logo_nyota_fc', name: 'NYOTA UNITED', category: 'Michezo', subtitle: 'FOOTBALL CLUB', primaryColor: '#fbbf24', secondaryColor: '#7f1d1d', emblemId: 'star', style: 'shield' },
  { id: 'logo_tamasha_events', name: 'RAHA EVENTS', category: 'Sherehe', subtitle: 'WEDDINGS & CONCERTS', primaryColor: '#f472b6', secondaryColor: '#2e1065', emblemId: 'star', style: 'emblem' },
  { id: 'logo_jiko_tamu', name: 'JIKO TAMU', category: 'Chakula', subtitle: 'RESTAURANT & GRILL', primaryColor: '#f97316', secondaryColor: '#450a0a', emblemId: 'cup', style: 'emblem' },
  { id: 'logo_neema_church', name: 'NEEMA GOSPEL', category: 'Ibada', subtitle: 'MINISTRY & FELLOWSHIP', primaryColor: '#fde047', secondaryColor: '#3b0764', emblemId: 'crown', style: 'emblem' },
  { id: 'logo_uhakika_sec', name: 'UHAKIKA GUARD', category: 'Ulinzi', subtitle: 'SECURITY SERVICES', primaryColor: '#38bdf8', secondaryColor: '#0f172a', emblemId: 'shield', style: 'shield' },
  { id: 'logo_kilimanjaro_tours', name: 'KILI SAFARI', category: 'Utalii', subtitle: 'TOURS & EXPEDITIONS', primaryColor: '#84cc16', secondaryColor: '#14532d', emblemId: 'leaf', style: 'badge' },
  { id: 'logo_swahili_press', name: 'SWAHILI PRESS', category: 'Habari', subtitle: 'JARIDA LA KISWAHILI', primaryColor: '#fb7185', secondaryColor: '#0f172a', emblemId: 'globe', style: 'minimal' },
  { id: 'logo_bingwa_sports', name: 'BINGWA FITNESS', category: 'Michezo', subtitle: 'GYM & TRAINING', primaryColor: '#a3e635', secondaryColor: '#09090b', emblemId: 'bolt', style: 'badge' },
  { id: 'logo_dhahabu_capital', name: 'DHAHABU GROUP', category: 'Biashara', subtitle: 'INVESTMENT PARTNERS', primaryColor: '#fbbf24', secondaryColor: '#020617', emblemId: 'chart', style: 'emblem' },
  { id: 'logo_kipepeo_beauty', name: 'KIPEPEO SALON', category: 'Mitindo', subtitle: 'BEAUTY & SPA', primaryColor: '#e879f9', secondaryColor: '#4a044e', emblemId: 'heart', style: 'emblem' },
  { id: 'logo_maendeleo_ngo', name: 'JAMII YETU NGO', category: 'Jamii', subtitle: 'COMMUNITY IMPACT', primaryColor: '#2dd4bf', secondaryColor: '#0f172a', emblemId: 'heart', style: 'badge' },
  { id: 'logo_fahari_hotel', name: 'FAHARI RESORT', category: 'Utalii', subtitle: 'HOTEL & CONFERENCE', primaryColor: '#fcd34d', secondaryColor: '#1e1b4b', emblemId: 'crown', style: 'badge' },
  { id: 'logo_apex_data', name: 'APEX ANALYTICS', category: 'Teknolojia', subtitle: 'CHARTS & INSIGHTS', primaryColor: '#818cf8', secondaryColor: '#020617', emblemId: 'chart', style: 'minimal' }
];

export const READY_LOGOS: ReadyLogoItem[] = rawLogos.map((item) => ({
  ...item,
  dataUrl: buildCustomLogoDataUrl(
    item.name,
    item.subtitle,
    item.emblemId,
    item.primaryColor,
    item.style,
    item.secondaryColor
  )
}));
