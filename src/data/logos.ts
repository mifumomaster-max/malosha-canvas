import { LOGO_PROFESSION_GROUPS } from './logosCatalog';

export type LogoStyle =
  | 'badge'
  | 'minimal'
  | 'emblem'
  | 'shield'
  | 'hexagon'
  | 'ribbon'
  | 'monogram'
  | 'split';

export interface ReadyLogoItem {
  id: string;
  name: string;
  category: string;
  profession: string;
  subtitle: string;
  primaryColor: string;
  secondaryColor: string;
  emblemId: string;
  style: LogoStyle;
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
    svgInner:
      '<path d="M18 68 L14 28 L34 46 L50 20 L66 46 L86 28 L82 68 Z" fill="currentColor"/><rect x="18" y="72" width="64" height="8" rx="4" fill="currentColor"/>'
  },
  {
    id: 'star',
    label: 'Nyota',
    svgInner:
      '<polygon points="50,12 61,37 88,37 66,53 74,80 50,64 26,80 34,53 12,37 39,37" fill="currentColor"/>'
  },
  {
    id: 'bolt',
    label: 'Kasi',
    svgInner: '<path d="M56 12 L24 54 H48 L42 88 L76 44 H52 Z" fill="currentColor"/>'
  },
  {
    id: 'shield',
    label: 'Ngao',
    svgInner:
      '<path d="M50 12 L82 24 V50 C82 70 67 83 50 90 C33 83 18 70 18 50 V24 Z" fill="none" stroke="currentColor" stroke-width="8"/><path d="M36 50 L46 60 L66 38" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  {
    id: 'leaf',
    label: 'Mazingira',
    svgInner:
      '<path d="M20 82 C20 40 44 16 84 16 C84 58 58 82 20 82 Z" fill="currentColor"/><path d="M22 80 L64 36" stroke="#000000" stroke-opacity="0.35" stroke-width="5" stroke-linecap="round"/>'
  },
  {
    id: 'chart',
    label: 'Takwimu',
    svgInner:
      '<rect x="18" y="52" width="14" height="30" rx="3" fill="currentColor"/><rect x="43" y="34" width="14" height="48" rx="3" fill="currentColor"/><rect x="68" y="18" width="14" height="64" rx="3" fill="currentColor"/>'
  },
  {
    id: 'globe',
    label: 'Habari/Dunia',
    svgInner:
      '<circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" stroke-width="7"/><ellipse cx="50" cy="50" rx="16" ry="34" fill="none" stroke="currentColor" stroke-width="5"/><line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" stroke-width="5"/>'
  },
  {
    id: 'mic',
    label: 'Redio/Media',
    svgInner:
      '<rect x="38" y="16" width="24" height="40" rx="12" fill="currentColor"/><path d="M26 48 A24 24 0 0 0 74 48" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><line x1="50" y1="72" x2="50" y2="86" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>'
  },
  {
    id: 'home',
    label: 'Majengo',
    svgInner:
      '<path d="M50 14 L86 46 H76 V84 H56 V58 H44 V84 H24 V46 H14 Z" fill="currentColor"/>'
  },
  {
    id: 'heart',
    label: 'Afya/Jamii',
    svgInner:
      '<path d="M50 84 C24 64 14 48 14 33 C14 21 23 14 34 14 C42 14 47 18 50 24 C53 18 58 14 66 14 C77 14 86 21 86 33 C86 48 76 64 50 84 Z" fill="currentColor"/>'
  },
  {
    id: 'cap',
    label: 'Elimu',
    svgInner:
      '<polygon points="50,20 88,38 50,56 12,38" fill="currentColor"/><path d="M26 48 L50 60 L74 48 V70 L50 82 L26 70 Z" fill="currentColor"/>'
  },
  {
    id: 'cup',
    label: 'Chakula/Tuzo',
    svgInner:
      '<path d="M26 18 H74 V42 C74 58 64 68 54 70 V82 H68 V88 H32 V82 H46 V70 C36 68 26 58 26 42 Z" fill="currentColor"/>'
  },
  {
    id: 'plane',
    label: 'Ndege/Anga',
    svgInner:
      '<path d="M50 12 L58 38 L86 52 V60 L58 53 L56 76 L68 84 V90 L50 86 L32 90 V84 L44 76 L42 53 L14 60 V52 L42 38 Z" fill="currentColor"/>'
  },
  {
    id: 'cross_med',
    label: 'Hospitali',
    svgInner:
      '<rect x="38" y="14" width="24" height="72" rx="6" fill="currentColor"/><rect x="14" y="38" width="72" height="24" rx="6" fill="currentColor"/>'
  },
  {
    id: 'church_cross',
    label: 'Kanisa',
    svgInner:
      '<rect x="42" y="12" width="16" height="76" rx="4" fill="currentColor"/><rect x="22" y="30" width="56" height="15" rx="4" fill="currentColor"/><circle cx="50" cy="38" r="32" fill="none" stroke="currentColor" stroke-width="4" stroke-opacity="0.45"/>'
  },
  {
    id: 'music_note',
    label: 'Muziki',
    svgInner:
      '<path d="M38 72 V24 L80 16 V64" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28" cy="74" r="12" fill="currentColor"/><circle cx="70" cy="66" r="12" fill="currentColor"/>'
  },
  {
    id: 'tree_pine',
    label: 'Misitu',
    svgInner:
      '<polygon points="50,10 74,40 60,40 80,64 62,64 84,82 16,82 38,64 20,64 40,40 26,40" fill="currentColor"/><rect x="44" y="80" width="12" height="12" rx="2" fill="currentColor"/>'
  },
  {
    id: 'code_chip',
    label: 'IT/Code',
    svgInner:
      '<polyline points="34,30 14,50 34,70" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><polyline points="66,30 86,50 66,70" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><line x1="56" y1="22" x2="44" y2="78" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>'
  },
  {
    id: 'book',
    label: 'Vitabu',
    svgInner:
      '<path d="M14 24 C28 18 42 20 50 28 C58 20 72 18 86 24 V78 C72 72 58 74 50 82 C42 74 28 72 14 78 Z" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="round"/><line x1="50" y1="28" x2="50" y2="82" stroke="currentColor" stroke-width="6"/>'
  },
  {
    id: 'pulse',
    label: 'Mapigo/Afya',
    svgInner:
      '<circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" stroke-width="6"/><polyline points="20,52 34,52 42,30 54,70 64,44 70,52 80,52" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  {
    id: 'camera',
    label: 'Kamera',
    svgInner:
      '<rect x="14" y="28" width="72" height="52" rx="10" fill="none" stroke="currentColor" stroke-width="7"/><path d="M34 28 L40 16 H60 L66 28" fill="currentColor"/><circle cx="50" cy="54" r="14" fill="none" stroke="currentColor" stroke-width="7"/>'
  },
  {
    id: 'building',
    label: 'Majengo/Biashara',
    svgInner:
      '<rect x="20" y="20" width="34" height="66" rx="4" fill="currentColor"/><rect x="58" y="38" width="22" height="48" rx="4" fill="currentColor" fill-opacity="0.75"/><rect x="28" y="30" width="7" height="7" fill="#000000" fill-opacity="0.35"/><rect x="39" y="30" width="7" height="7" fill="#000000" fill-opacity="0.35"/><rect x="28" y="44" width="7" height="7" fill="#000000" fill-opacity="0.35"/><rect x="39" y="44" width="7" height="7" fill="#000000" fill-opacity="0.35"/>'
  },
  {
    id: 'scales',
    label: 'Sheria',
    svgInner:
      '<line x1="50" y1="16" x2="50" y2="84" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><line x1="20" y1="28" x2="80" y2="28" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M14 54 H36 L25 28 Z" fill="currentColor"/><path d="M64 54 H86 L75 28 Z" fill="currentColor"/><rect x="34" y="80" width="32" height="8" rx="4" fill="currentColor"/>'
  },
  {
    id: 'truck',
    label: 'Usafiri',
    svgInner:
      '<rect x="12" y="28" width="48" height="38" rx="6" fill="currentColor"/><path d="M60 38 H78 L88 52 V66 H60 Z" fill="currentColor" fill-opacity="0.85"/><circle cx="28" cy="74" r="9" fill="currentColor"/><circle cx="72" cy="74" r="9" fill="currentColor"/>'
  },
  {
    id: 'ship',
    label: 'Bahari/Meli',
    svgInner:
      '<circle cx="50" cy="24" r="9" fill="none" stroke="currentColor" stroke-width="6"/><line x1="50" y1="33" x2="50" y2="80" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><line x1="34" y1="44" x2="66" y2="44" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M22 60 C22 76 35 84 50 84 C65 84 78 76 78 60" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>'
  },
  {
    id: 'sun_solar',
    label: 'Nishati/Jua',
    svgInner:
      '<circle cx="50" cy="50" r="18" fill="currentColor"/><g stroke="currentColor" stroke-width="7" stroke-linecap="round"><line x1="50" y1="12" x2="50" y2="22"/><line x1="50" y1="78" x2="50" y2="88"/><line x1="12" y1="50" x2="22" y2="50"/><line x1="78" y1="50" x2="88" y2="50"/><line x1="23" y1="23" x2="30" y2="30"/><line x1="70" y1="70" x2="77" y2="77"/><line x1="77" y1="23" x2="70" y2="30"/><line x1="30" y1="70" x2="23" y2="77"/></g>'
  },
  {
    id: 'coffee',
    label: 'Kahawa',
    svgInner:
      '<path d="M20 38 H66 V64 C66 76 56 84 43 84 C30 84 20 76 20 64 Z" fill="currentColor"/><path d="M66 44 H76 C82 44 84 56 76 62 H66" fill="none" stroke="currentColor" stroke-width="6"/><path d="M34 16 C30 24 38 26 34 32 M50 14 C46 22 54 24 50 30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'
  },
  {
    id: 'utensils',
    label: 'Mgahawa',
    svgInner:
      '<path d="M18 64 C18 40 32 28 50 28 C68 28 82 40 82 64 Z" fill="currentColor"/><circle cx="50" cy="21" r="6" fill="currentColor"/><rect x="14" y="70" width="72" height="10" rx="5" fill="currentColor"/>'
  },
  {
    id: 'soccer',
    label: 'Mpira',
    svgInner:
      '<circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="7"/><polygon points="50,30 66,42 60,60 40,60 34,42" fill="currentColor"/>'
  },
  {
    id: 'dumbbell',
    label: 'Gym/Mazoezi',
    svgInner:
      '<rect x="14" y="34" width="12" height="32" rx="4" fill="currentColor"/><rect x="28" y="26" width="10" height="48" rx="4" fill="currentColor"/><rect x="38" y="45" width="24" height="10" fill="currentColor"/><rect x="62" y="26" width="10" height="48" rx="4" fill="currentColor"/><rect x="74" y="34" width="12" height="32" rx="4" fill="currentColor"/>'
  },
  {
    id: 'diamond',
    label: 'Almasi/Vito',
    svgInner:
      '<polygon points="28,20 72,20 88,42 50,84 12,42" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="round"/><line x1="12" y1="42" x2="88" y2="42" stroke="currentColor" stroke-width="5"/><polyline points="28,20 50,42 72,20" fill="none" stroke="currentColor" stroke-width="5"/>'
  },
  {
    id: 'scissors',
    label: 'Saluni/Mitindo',
    svgInner:
      '<circle cx="28" cy="70" r="12" fill="none" stroke="currentColor" stroke-width="7"/><circle cx="72" cy="70" r="12" fill="none" stroke="currentColor" stroke-width="7"/><line x1="35" y1="60" x2="72" y2="18" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><line x1="65" y1="60" x2="28" y2="18" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>'
  },
  {
    id: 'wrench',
    label: 'Ufundi',
    svgInner:
      '<path d="M68 16 C56 16 48 24 48 34 C48 38 49 41 51 44 L22 73 C18 77 18 83 22 86 C26 90 32 89 35 85 L64 56 C67 58 70 59 74 59 C84 59 92 50 92 38 L78 44 L70 36 L76 22 C73 18 71 16 68 16 Z" fill="currentColor"/>'
  },
  {
    id: 'flask',
    label: 'Maabara',
    svgInner:
      '<path d="M38 16 H62 M42 16 V40 L18 78 C15 83 18 88 24 88 H76 C82 88 85 83 82 78 L58 40 V16" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 68 H73 L79 80 H21 Z" fill="currentColor"/>'
  },
  {
    id: 'sprout',
    label: 'Kilimo/Mche',
    svgInner:
      '<path d="M50 86 V42" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M50 52 C50 30 68 18 84 22 C84 42 68 54 50 52 Z" fill="currentColor"/><path d="M50 62 C50 42 32 30 16 34 C16 52 32 64 50 62 Z" fill="currentColor" fill-opacity="0.8"/>'
  },
  {
    id: 'wifi_signal',
    label: 'Mtandao',
    svgInner:
      '<path d="M16 40 C35 22 65 22 84 40" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M28 54 C40 42 60 42 72 54" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><circle cx="50" cy="72" r="8" fill="currentColor"/>'
  },
  {
    id: 'lock_cyber',
    label: 'Usalama',
    svgInner:
      '<rect x="22" y="42" width="56" height="42" rx="8" fill="currentColor"/><path d="M34 42 V30 C34 20 41 14 50 14 C59 14 66 20 66 30 V42" fill="none" stroke="currentColor" stroke-width="8"/>'
  },
  {
    id: 'crescent_star',
    label: 'Hilali',
    svgInner:
      '<path d="M58 18 C38 18 22 34 22 54 C22 72 38 86 58 86 C45 80 38 68 38 54 C38 38 46 25 58 18 Z" fill="currentColor"/><polygon points="72,28 76,37 85,37 78,42 80,51 72,46 64,51 66,42 59,37 68,37" fill="currentColor"/>'
  },
  {
    id: 'helmet_build',
    label: 'Kofia Ujenzi',
    svgInner:
      '<path d="M20 58 C20 36 33 22 50 22 C67 22 80 36 80 58 Z" fill="currentColor"/><rect x="12" y="58" width="76" height="12" rx="6" fill="currentColor"/><rect x="44" y="16" width="12" height="24" rx="4" fill="#000000" fill-opacity="0.28"/>'
  },
  {
    id: 'flame',
    label: 'Nishati/Moto',
    svgInner:
      '<path d="M54 14 C54 32 76 42 76 62 C76 77 64 88 50 88 C36 88 24 77 24 62 C24 46 36 36 42 26 C44 36 52 38 54 14 Z" fill="currentColor"/>'
  }
];

const LOGO_EMBLEM_MAP: Record<string, LogoEmblemOption> = Object.fromEntries(
  LOGO_EMBLEMS.map((e) => [e.id, e])
);

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isLightHex(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.72;
}

export function buildCustomLogoDataUrl(
  brandName: string,
  subtitle: string,
  emblemId: string,
  primaryColor: string,
  style: LogoStyle = 'badge',
  secondaryColor: string = '#0f172a'
): string {
  const emblem = LOGO_EMBLEM_MAP[emblemId] || LOGO_EMBLEMS[0];
  const cleanTitle = escapeXml((brandName || 'MALOSHA').toUpperCase().slice(0, 20));
  const cleanSub = escapeXml((subtitle || 'STUDIO & DESIGN').toUpperCase().slice(0, 28));
  const lightBg = isLightHex(secondaryColor);
  const titleFill = lightBg ? '#0f172a' : '#ffffff';
  const subFill = lightBg ? primaryColor : primaryColor;

  const hFontSize = cleanTitle.length <= 11 ? 28 : cleanTitle.length <= 15 ? 24 : 19;
  const sqFontSize = cleanTitle.length <= 10 ? 25 : cleanTitle.length <= 14 ? 21 : 16;

  let svg = '';

  if (style === 'badge') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="140" viewBox="0 0 420 140">
      <rect x="4" y="4" width="412" height="132" rx="28" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="5"/>
      <circle cx="70" cy="70" r="42" fill="${primaryColor}" fill-opacity="0.16" stroke="${primaryColor}" stroke-width="3"/>
      <g transform="translate(30,30) scale(0.8)" color="${primaryColor}">${emblem.svgInner}</g>
      <text x="128" y="67" font-family="Arial, sans-serif" font-weight="900" font-size="${hFontSize}" fill="${titleFill}" letter-spacing="1.2">${cleanTitle}</text>
      <text x="130" y="97" font-family="Arial, sans-serif" font-weight="700" font-size="13" fill="${subFill}" letter-spacing="2.4">${cleanSub}</text>
    </svg>`;
  } else if (style === 'shield') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <path d="M160 16 L284 58 V158 C284 228 230 276 160 304 C90 276 36 228 36 158 V58 Z" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="10"/>
      <g transform="translate(100,48) scale(1.2)" color="${primaryColor}">${emblem.svgInner}</g>
      <text x="160" y="212" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="${sqFontSize}" fill="${titleFill}" letter-spacing="1.2">${cleanTitle}</text>
      <text x="160" y="242" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="11" fill="${subFill}" letter-spacing="2">${cleanSub}</text>
    </svg>`;
  } else if (style === 'emblem') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <circle cx="160" cy="160" r="144" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="10"/>
      <circle cx="160" cy="160" r="126" fill="none" stroke="${primaryColor}" stroke-width="2" stroke-dasharray="8 6"/>
      <g transform="translate(100,48) scale(1.2)" color="${primaryColor}">${emblem.svgInner}</g>
      <text x="160" y="206" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="${sqFontSize}" fill="${titleFill}" letter-spacing="1.4">${cleanTitle}</text>
      <text x="160" y="234" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="11" fill="${subFill}" letter-spacing="2.2">${cleanSub}</text>
    </svg>`;
  } else if (style === 'hexagon') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <polygon points="160,16 286,88 286,232 160,304 34,232 34,88" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="10" stroke-linejoin="round"/>
      <polygon points="160,34 270,97 270,223 160,286 50,223 50,97" fill="none" stroke="${primaryColor}" stroke-opacity="0.35" stroke-width="2"/>
      <g transform="translate(104,54) scale(1.12)" color="${primaryColor}">${emblem.svgInner}</g>
      <text x="160" y="206" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="${sqFontSize}" fill="${titleFill}" letter-spacing="1">${cleanTitle}</text>
      <text x="160" y="232" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="11" fill="${subFill}" letter-spacing="2">${cleanSub}</text>
    </svg>`;
  } else if (style === 'monogram') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <rect x="20" y="20" width="280" height="280" rx="44" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="10"/>
      <rect x="36" y="36" width="248" height="248" rx="32" fill="none" stroke="${primaryColor}" stroke-opacity="0.4" stroke-width="2"/>
      <rect x="108" y="54" width="104" height="104" rx="28" fill="${primaryColor}" fill-opacity="0.16" stroke="${primaryColor}" stroke-width="3"/>
      <g transform="translate(115,61) scale(0.9)" color="${primaryColor}">${emblem.svgInner}</g>
      <text x="160" y="208" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="${sqFontSize}" fill="${titleFill}" letter-spacing="1.4">${cleanTitle}</text>
      <text x="160" y="236" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="11" fill="${subFill}" letter-spacing="2">${cleanSub}</text>
    </svg>`;
  } else if (style === 'ribbon') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="140" viewBox="0 0 420 140">
      <rect x="8" y="16" width="404" height="108" rx="18" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="4"/>
      <rect x="8" y="16" width="108" height="108" rx="16" fill="${primaryColor}"/>
      <g transform="translate(22,30) scale(0.8)" color="${lightBg ? '#ffffff' : secondaryColor}">${emblem.svgInner}</g>
      <text x="132" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="${hFontSize}" fill="${titleFill}" letter-spacing="1.2">${cleanTitle}</text>
      <rect x="132" y="74" width="120" height="4" rx="2" fill="${primaryColor}"/>
      <text x="132" y="99" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="${subFill}" letter-spacing="2.2">${cleanSub}</text>
    </svg>`;
  } else if (style === 'split') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="140" viewBox="0 0 420 140">
      <rect x="4" y="6" width="412" height="128" rx="20" fill="${secondaryColor}" stroke="${primaryColor}" stroke-opacity="0.45" stroke-width="3"/>
      <path d="M4 26 Q4 6 24 6 H126 L104 134 H24 Q4 134 4 114 Z" fill="${primaryColor}"/>
      <g transform="translate(18,30) scale(0.8)" color="${lightBg ? '#ffffff' : secondaryColor}">${emblem.svgInner}</g>
      <text x="132" y="67" font-family="Arial, sans-serif" font-weight="900" font-size="${hFontSize}" fill="${titleFill}" letter-spacing="1.2">${cleanTitle}</text>
      <text x="132" y="97" font-family="Arial, sans-serif" font-weight="700" font-size="13" fill="${subFill}" letter-spacing="2.4">${cleanSub}</text>
    </svg>`;
  } else {
    // minimal
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="140" viewBox="0 0 420 140">
      <rect x="14" y="22" width="96" height="96" rx="24" fill="${primaryColor}"/>
      <g transform="translate(22,30) scale(0.8)" color="${lightBg ? '#ffffff' : secondaryColor}">${emblem.svgInner}</g>
      <text x="128" y="68" font-family="Arial, sans-serif" font-weight="900" font-size="${hFontSize}" fill="${titleFill}" letter-spacing="1.4">${cleanTitle}</text>
      <text x="130" y="98" font-family="Arial, sans-serif" font-weight="700" font-size="13" fill="${subFill}" letter-spacing="2.5">${cleanSub}</text>
    </svg>`;
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// 24 flagship logos preserved at indices 0..23 for backward compatibility with templates1000.ts
const flagshipRawLogos: Array<Omit<ReadyLogoItem, 'dataUrl'>> = [
  { id: 'logo_malosha_studio', name: 'MALOSHA STUDIO', category: 'Ubunifu', profession: 'Uchapishaji & Matangazo (Printing)', subtitle: 'POSTER & DESIGN', primaryColor: '#fbbf24', secondaryColor: '#0f172a', emblemId: 'crown', style: 'badge' },
  { id: 'logo_habari_tv', name: 'HABARI 24 TV', category: 'Habari & Media', profession: 'Kituo cha Televisheni', subtitle: 'BREAKING NEWS NETWORK', primaryColor: '#ef4444', secondaryColor: '#111827', emblemId: 'globe', style: 'badge' },
  { id: 'logo_dira_fm', name: 'DIRA MEDIA', category: 'Habari & Media', profession: 'Redio & Podikasti', subtitle: 'SAUTI YA JAMII', primaryColor: '#38bdf8', secondaryColor: '#020617', emblemId: 'mic', style: 'minimal' },
  { id: 'logo_simba_tech', name: 'KASI TECH', category: 'IT & Teknolojia', profession: 'Uundaji wa Mifumo & Software', subtitle: 'DIGITAL SOLUTIONS', primaryColor: '#22d3ee', secondaryColor: '#09090b', emblemId: 'bolt', style: 'minimal' },
  { id: 'logo_amani_realty', name: 'AMANI HOMES', category: 'Ujenzi & Majengo', profession: 'Uuzaji wa Viwanja & Nyumba', subtitle: 'REAL ESTATE TANZANIA', primaryColor: '#f59e0b', secondaryColor: '#1c1917', emblemId: 'home', style: 'shield' },
  { id: 'logo_kijani_eco', name: 'KIJANI FARM', category: 'Kilimo & Mifugo', profession: 'Kilimo cha Kisasa & Umwagiliaji', subtitle: 'ORGANIC PRODUCE', primaryColor: '#10b981', secondaryColor: '#022c22', emblemId: 'leaf', style: 'emblem' },
  { id: 'logo_fedha_plus', name: 'FEDHA PLUS', category: 'Biashara & Fedha', profession: 'Benki & Mikopo', subtitle: 'MICROFINANCE & DATA', primaryColor: '#3b82f6', secondaryColor: '#0f172a', emblemId: 'chart', style: 'badge' },
  { id: 'logo_msafiri_express', name: 'MSAFIRI CARGO', category: 'Ndege & Usafiri', profession: 'Usafirishaji wa Mizigo Angani', subtitle: 'FAST LOGISTICS', primaryColor: '#f97316', secondaryColor: '#18181b', emblemId: 'truck', style: 'badge' },
  { id: 'logo_afya_care', name: 'AFYA KWANZA', category: 'Hospitali & Afya', profession: 'Hospitali Kuu & Rufaa', subtitle: 'CLINIC & PHARMACY', primaryColor: '#14b8a6', secondaryColor: '#042f2e', emblemId: 'cross_med', style: 'shield' },
  { id: 'logo_elimu_academy', name: 'ELIMU BORA', category: 'Elimu', profession: 'Shule ya Sekondari', subtitle: 'HIGH SCHOOL & COLLEGE', primaryColor: '#60a5fa', secondaryColor: '#172554', emblemId: 'cap', style: 'shield' },
  { id: 'logo_taji_fashion', name: 'TAJI COUTURE', category: 'Mitindo & Urembo', profession: 'Ubunifu wa Mavazi & Ushonaji', subtitle: 'LUXURY BOUTIQUE', primaryColor: '#facc15', secondaryColor: '#18181b', emblemId: 'crown', style: 'emblem' },
  { id: 'logo_nyota_fc', name: 'NYOTA UNITED', category: 'Michezo & Mazoezi', profession: 'Klabu ya Mpira wa Miguu', subtitle: 'FOOTBALL CLUB', primaryColor: '#fbbf24', secondaryColor: '#7f1d1d', emblemId: 'soccer', style: 'shield' },
  { id: 'logo_tamasha_events', name: 'RAHA EVENTS', category: 'Viwanda & Huduma', profession: 'Harusi & Mapambo ya Sherehe', subtitle: 'WEDDINGS & CONCERTS', primaryColor: '#f472b6', secondaryColor: '#2e1065', emblemId: 'star', style: 'emblem' },
  { id: 'logo_jiko_tamu', name: 'JIKO TAMU', category: 'Chakula & Ukarimu', profession: 'Mgahawa & Mapishi', subtitle: 'RESTAURANT & GRILL', primaryColor: '#f97316', secondaryColor: '#450a0a', emblemId: 'utensils', style: 'emblem' },
  { id: 'logo_neema_church', name: 'NEEMA GOSPEL', category: 'Makanisa & Imani', profession: 'Kanisa & Huduma ya Injili', subtitle: 'MINISTRY & FELLOWSHIP', primaryColor: '#fde047', secondaryColor: '#3b0764', emblemId: 'church_cross', style: 'emblem' },
  { id: 'logo_uhakika_sec', name: 'UHAKIKA GUARD', category: 'Sheria & Ulinzi', profession: 'Ulinzi Binafsi & Walinzi', subtitle: 'SECURITY SERVICES', primaryColor: '#38bdf8', secondaryColor: '#0f172a', emblemId: 'shield', style: 'shield' },
  { id: 'logo_kilimanjaro_tours', name: 'KILI SAFARI', category: 'Chakula & Ukarimu', profession: 'Utalii & Safari za Mbugani', subtitle: 'TOURS & EXPEDITIONS', primaryColor: '#84cc16', secondaryColor: '#14532d', emblemId: 'tree_pine', style: 'badge' },
  { id: 'logo_swahili_press', name: 'SWAHILI PRESS', category: 'Habari & Media', profession: 'Gazeti & Habari za Mtandaoni', subtitle: 'JARIDA LA KISWAHILI', primaryColor: '#fb7185', secondaryColor: '#0f172a', emblemId: 'globe', style: 'minimal' },
  { id: 'logo_bingwa_sports', name: 'BINGWA FITNESS', category: 'Michezo & Mazoezi', profession: 'Gym & Mazoezi ya Viungo', subtitle: 'GYM & TRAINING', primaryColor: '#a3e635', secondaryColor: '#09090b', emblemId: 'dumbbell', style: 'badge' },
  { id: 'logo_dhahabu_capital', name: 'DHAHABU GROUP', category: 'Biashara & Fedha', profession: 'Uwekezaji & Masoko ya Mitaji', subtitle: 'INVESTMENT PARTNERS', primaryColor: '#fbbf24', secondaryColor: '#020617', emblemId: 'chart', style: 'emblem' },
  { id: 'logo_kipepeo_beauty', name: 'KIPEPEO SALON', category: 'Mitindo & Urembo', profession: 'Saluni ya Nywele & Kucha', subtitle: 'BEAUTY & SPA', primaryColor: '#e879f9', secondaryColor: '#4a044e', emblemId: 'scissors', style: 'emblem' },
  { id: 'logo_maendeleo_ngo', name: 'JAMII YETU NGO', category: 'Sheria & Ulinzi', profession: 'Mashirika Yasiyo ya Kiserikali (NGO)', subtitle: 'COMMUNITY IMPACT', primaryColor: '#2dd4bf', secondaryColor: '#0f172a', emblemId: 'heart', style: 'badge' },
  { id: 'logo_fahari_hotel', name: 'FAHARI RESORT', category: 'Chakula & Ukarimu', profession: 'Hoteli & Risoti', subtitle: 'HOTEL & CONFERENCE', primaryColor: '#fcd34d', secondaryColor: '#1e1b4b', emblemId: 'crown', style: 'badge' },
  { id: 'logo_apex_data', name: 'APEX ANALYTICS', category: 'IT & Teknolojia', profession: 'Akili Mnemba & Takwimu (AI/Data)', subtitle: 'CHARTS & INSIGHTS', primaryColor: '#818cf8', secondaryColor: '#020617', emblemId: 'code_chip', style: 'minimal' }
];

const ALL_LOGO_STYLES: LogoStyle[] = [
  'badge',
  'split',
  'emblem',
  'shield',
  'hexagon',
  'ribbon',
  'monogram',
  'minimal'
];

function build1000RawLogos(): Array<Omit<ReadyLogoItem, 'dataUrl'>> {
  const result: Array<Omit<ReadyLogoItem, 'dataUrl'>> = [...flagshipRawLogos];
  const usedNames = new Set(flagshipRawLogos.map((l) => l.name.toUpperCase()));

  // First pass: take items 0..8 from each of the 105 professions (up to 9 each)
  // Second pass: take item 9 from groups until we reach exact 1,000 unique logos
  for (let pass = 0; pass < 2 && result.length < 1000; pass++) {
    const startIdx = pass === 0 ? 0 : 9;
    const endIdx = pass === 0 ? 9 : 10;

    for (let gIdx = 0; gIdx < LOGO_PROFESSION_GROUPS.length && result.length < 1000; gIdx++) {
      const group = LOGO_PROFESSION_GROUPS[gIdx];
      for (let i = startIdx; i < endIdx && i < group.items.length && result.length < 1000; i++) {
        const seed = group.items[i];
        const normalizedName = seed.name.trim().toUpperCase();
        if (usedNames.has(normalizedName)) continue;
        usedNames.add(normalizedName);

        const globalIndex = result.length;
        const palette = group.palettes[(gIdx + i) % group.palettes.length];
        const emblemId = group.emblems[(i + gIdx) % group.emblems.length];
        const style = ALL_LOGO_STYLES[(globalIndex + gIdx) % ALL_LOGO_STYLES.length];

        result.push({
          id: `logo_1k_${String(globalIndex + 1).padStart(4, '0')}`,
          name: normalizedName,
          category: group.category,
          profession: group.profession,
          subtitle: seed.subtitle,
          primaryColor: palette[0],
          secondaryColor: palette[1],
          emblemId,
          style
        });
      }
    }
  }

  return result;
}

const rawLogos = build1000RawLogos();

export const LOGO_CATEGORIES: string[] = [
  'Zote',
  ...Array.from(new Set(rawLogos.map((item) => item.category)))
];

export const LOGO_PROFESSIONS: string[] = [
  'Fani Zote (105+)',
  ...LOGO_PROFESSION_GROUPS.map((g) => g.profession)
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
