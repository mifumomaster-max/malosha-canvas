import { ColorEffectPreset, ImageElement, WatermarkConfig } from '../types/poster';

export type ColorEffectCategory =
  | 'Zote'
  | 'Asili & Sinema'
  | 'Joto & Dhahabu'
  | 'Baridi & Bahari'
  | 'Zamani (Vintage)'
  | 'Neon & Usiku'
  | 'Nyeusi & Nyeupe'
  | 'Kifahari & Chapa';

export interface ColorEffectOption {
  id: ColorEffectPreset;
  label: string;
  category: Exclude<ColorEffectCategory, 'Zote'>;
  desc: string;
  swatch: string;
  cssFilter: string;
  overlayColor?: string;
  overlayBlend?: GlobalCompositeOperation;
  overlayAlpha?: number;
}

const BASE_COLOR_EFFECTS: ColorEffectOption[] = [
  {
    id: 'none',
    label: 'Kawaida (Asili)',
    category: 'Asili & Sinema',
    desc: 'Rangi halisi bila kichujio cha ziada',
    swatch: 'linear-gradient(135deg, #334155, #0f172a)',
    cssFilter: ''
  },
  {
    id: 'warm-sunset',
    label: 'Jua la Jioni',
    category: 'Joto & Dhahabu',
    desc: 'Joto la dhahabu na machungwa ya kuvutia',
    swatch: 'linear-gradient(135deg, #f97316, #be123c)',
    cssFilter: 'saturate(122%) contrast(106%) sepia(18%)',
    overlayColor: '#f97316',
    overlayBlend: 'soft-light',
    overlayAlpha: 0.22
  },
  {
    id: 'cool-cinema',
    label: 'Sinema Baridi',
    category: 'Baridi & Bahari',
    desc: 'Bluu ya kisasa yenye utofauti mkali',
    swatch: 'linear-gradient(135deg, #0284c7, #1e1b4b)',
    cssFilter: 'contrast(114%) saturate(95%) hue-rotate(8deg)',
    overlayColor: '#0284c7',
    overlayBlend: 'overlay',
    overlayAlpha: 0.16
  },
  {
    id: 'golden-hour',
    label: 'Dhahabu Kifahari',
    category: 'Joto & Dhahabu',
    desc: 'Mwanga wa kifahari kwa mialiko & vyeti',
    swatch: 'linear-gradient(135deg, #facc15, #b45309)',
    cssFilter: 'brightness(105%) saturate(118%) sepia(24%)',
    overlayColor: '#fbbf24',
    overlayBlend: 'soft-light',
    overlayAlpha: 0.2
  },
  {
    id: 'vintage-film',
    label: 'Zamani (Vintage)',
    category: 'Zamani (Vintage)',
    desc: 'Muonekano wa filamu ya zamani yenye hisia',
    swatch: 'linear-gradient(135deg, #d6d3d1, #78350f)',
    cssFilter: 'sepia(48%) contrast(94%) brightness(98%) saturate(85%)',
    overlayColor: '#92400e',
    overlayBlend: 'multiply',
    overlayAlpha: 0.14
  },
  {
    id: 'noir-bw',
    label: 'Nyeusi & Nyeupe',
    category: 'Nyeusi & Nyeupe',
    desc: 'Picha na bango la kifahari lisilo na rangi',
    swatch: 'linear-gradient(135deg, #ffffff, #171717)',
    cssFilter: 'grayscale(100%) contrast(120%)',
    overlayColor: '#000000',
    overlayBlend: 'soft-light',
    overlayAlpha: 0.12
  },
  {
    id: 'cyber-neon',
    label: 'Neon ya Usiku',
    category: 'Neon & Usiku',
    desc: 'Zambarau na samawati za klabu na muziki',
    swatch: 'linear-gradient(135deg, #d946ef, #06b6d4)',
    cssFilter: 'saturate(145%) contrast(116%) hue-rotate(-14deg)',
    overlayColor: '#a855f7',
    overlayBlend: 'screen',
    overlayAlpha: 0.16
  },
  {
    id: 'emerald-mint',
    label: 'Zumaridi Kijani',
    category: 'Kifahari & Chapa',
    desc: 'Kijani safi kwa afya, mazingira na fedha',
    swatch: 'linear-gradient(135deg, #10b981, #064e3b)',
    cssFilter: 'saturate(112%) contrast(106%)',
    overlayColor: '#10b981',
    overlayBlend: 'soft-light',
    overlayAlpha: 0.2
  },
  {
    id: 'royal-violet',
    label: 'Zambarau Kifalme',
    category: 'Kifahari & Chapa',
    desc: 'Mwanga wa heshima na ibada za kipekee',
    swatch: 'linear-gradient(135deg, #8b5cf6, #3b0764)',
    cssFilter: 'contrast(110%) saturate(118%)',
    overlayColor: '#7c3aed',
    overlayBlend: 'overlay',
    overlayAlpha: 0.18
  },
  {
    id: 'vivid-pop',
    label: 'Rangi Kali (Vivid)',
    category: 'Asili & Sinema',
    desc: 'Rangi angavu zinazong’aa kwa matangazo',
    swatch: 'linear-gradient(135deg, #f43f5e, #f59e0b)',
    cssFilter: 'saturate(145%) contrast(112%) brightness(103%)'
  }
];

interface FamilyBlueprint {
  category: Exclude<ColorEffectCategory, 'Zote'>;
  roots: string[];
  adjectives: string[];
  tints: [string, string][];
  blends: GlobalCompositeOperation[];
  baseFilter: (step: number) => string;
  alphaRange: [number, number];
}

const EFFECT_BLUEPRINTS: FamilyBlueprint[] = [
  {
    category: 'Asili & Sinema',
    roots: ['Sinema', 'Studio', 'Makala', 'Habari', 'Lensi', 'Kamera', 'Uhalisia', 'Picha', 'Ukumbi', 'Mwanga'],
    adjectives: ['Safi', 'Makini', 'Mpya', 'Angavu', 'Asili', 'Bora', 'Tambarare'],
    tints: [
      ['#0ea5e9', '#1e293b'],
      ['#f43f5e', '#18181b'],
      ['#38bdf8', '#0f172a'],
      ['#fb7185', '#312e81'],
      ['#e2e8f0', '#334155'],
      ['#22c55e', '#0f172a'],
      ['#eab308', '#1e293b']
    ],
    blends: ['soft-light', 'overlay'],
    baseFilter: (s) =>
      `contrast(${98 + (s % 26)}%) saturate(${92 + ((s * 7) % 45)}%) brightness(${96 + ((s * 3) % 14)}%)`,
    alphaRange: [0.06, 0.16]
  },
  {
    category: 'Joto & Dhahabu',
    roots: ['Dhahabu', 'Jua', 'Machweo', 'Asali', 'Moto', 'Serengeti', 'Jangwa', 'Mawio', 'Shaba', 'Kahawa'],
    adjectives: ['Moto', 'Angavu', 'Kifahari', 'Laini', 'Kung’aa', 'Tamu', 'Joto'],
    tints: [
      ['#f59e0b', '#78350f'],
      ['#f97316', '#9a3412'],
      ['#facc15', '#b45309'],
      ['#ef4444', '#f59e0b'],
      ['#fb923c', '#451a03'],
      ['#fde047', '#ca8a04'],
      ['#dc2626', '#7c2d12']
    ],
    blends: ['soft-light', 'overlay', 'screen'],
    baseFilter: (s) =>
      `brightness(${100 + (s % 12)}%) saturate(${110 + ((s * 5) % 40)}%) sepia(${12 + ((s * 3) % 28)}%) hue-rotate(${(s % 16) - 8}deg)`,
    alphaRange: [0.1, 0.24]
  },
  {
    category: 'Baridi & Bahari',
    roots: ['Bahari', 'Zanzibar', 'Barafu', 'Mawimbi', 'Samawati', 'Mbingu', 'Pepo', 'Ziwa', 'Ukungu', 'Breeze'],
    adjectives: ['Baridi', 'Safi', 'Tulivu', 'Kina', 'Angavu', 'Laini', 'Mpya'],
    tints: [
      ['#0284c7', '#0c4a6e'],
      ['#06b6d4', '#164e63'],
      ['#3b82f6', '#1e3a8a'],
      ['#38bdf8', '#0f172a'],
      ['#2dd4bf', '#134e4a'],
      ['#60a5fa', '#1e1b4b'],
      ['#0ea5e9', '#111827']
    ],
    blends: ['soft-light', 'overlay', 'multiply'],
    baseFilter: (s) =>
      `contrast(${102 + (s % 22)}%) saturate(${88 + ((s * 4) % 38)}%) hue-rotate(${6 + (s % 22)}deg) brightness(${97 + (s % 10)}%)`,
    alphaRange: [0.1, 0.22]
  },
  {
    category: 'Zamani (Vintage)',
    roots: ['Zamani', 'Filamu', 'Kumbukumbu', 'Nostalgia', 'Nyaraka', 'Historia', '1970s', '1980s', '1990s', 'Kodak'],
    adjectives: ['Fifia', 'Asili', 'Vumbi', 'Kikale', 'Kumbukwa', 'Laini', 'Moto'],
    tints: [
      ['#d6d3d1', '#78350f'],
      ['#fde68a', '#92400e'],
      ['#cbd5e1', '#57534e'],
      ['#fed7aa', '#7c2d12'],
      ['#e7e5e4', '#44403c'],
      ['#fef3c7', '#713f12'],
      ['#d4d4d8', '#3f3f46']
    ],
    blends: ['multiply', 'soft-light'],
    baseFilter: (s) =>
      `sepia(${28 + ((s * 4) % 58)}%) contrast(${88 + (s % 18)}%) brightness(${94 + (s % 12)}%) saturate(${70 + ((s * 3) % 30)}%)`,
    alphaRange: [0.08, 0.2]
  },
  {
    category: 'Neon & Usiku',
    roots: ['Neon', 'Usiku', 'Klabu', 'Elektroniki', 'Cyber', 'Laser', 'Disco', 'Muziki', 'Umeme', 'Vibe'],
    adjectives: ['Kali', 'Mwangaza', 'Ushindi', 'Kasi', 'Mpya', 'Anga', 'Moto'],
    tints: [
      ['#ec4899', '#06b6d4'],
      ['#a855f7', '#3b82f6'],
      ['#d946ef', '#14b8a6'],
      ['#f43f5e', '#8b5cf6'],
      ['#22d3ee', '#7c3aed'],
      ['#e879f9', '#0284c7'],
      ['#f472b6', '#4f46e5']
    ],
    blends: ['screen', 'overlay', 'soft-light'],
    baseFilter: (s) =>
      `saturate(${135 + ((s * 6) % 60)}%) contrast(${108 + (s % 24)}%) hue-rotate(${((s * 29) % 340) - 170}deg)`,
    alphaRange: [0.1, 0.22]
  },
  {
    category: 'Nyeusi & Nyeupe',
    roots: ['Noir', 'Monochrome', 'Kivuli', 'Chalk', 'Mkaa', 'Fedha', 'Grafiti', 'Nyeupe', 'Giza', 'Silueti'],
    adjectives: ['Kali', 'Laini', 'Safi', 'Nene', 'Fifia', 'Kifahari', 'Bora'],
    tints: [
      ['#ffffff', '#171717'],
      ['#e5e5e5', '#0a0a0a'],
      ['#d4d4d8', '#27272a'],
      ['#f8fafc', '#334155'],
      ['#a1a1aa', '#09090b'],
      ['#f4f4f5', '#404040'],
      ['#cbd5e1', '#18181b']
    ],
    blends: ['soft-light', 'multiply', 'overlay'],
    baseFilter: (s) =>
      `grayscale(${88 + (s % 13)}%) contrast(${96 + ((s * 5) % 48)}%) brightness(${90 + ((s * 3) % 22)}%)`,
    alphaRange: [0.06, 0.2]
  },
  {
    category: 'Kifahari & Chapa',
    roots: ['Kifalme', 'Zumaridi', 'Almasi', 'Chapa', 'Taji', 'Rasmi', 'VIP', 'Ikulu', 'Lulu', 'Hariri'],
    adjectives: ['Kuu', 'Bora', 'Maalum', 'Mpya', 'Tulivu', 'Nadhifu', 'Heshima'],
    tints: [
      ['#10b981', '#064e3b'],
      ['#8b5cf6', '#3b0764'],
      ['#be123c', '#4c0519'],
      ['#0d9488', '#134e4a'],
      ['#6366f1', '#1e1b4b'],
      ['#c026d3', '#4a044e'],
      ['#059669', '#0f172a']
    ],
    blends: ['soft-light', 'overlay'],
    baseFilter: (s) =>
      `contrast(${104 + (s % 18)}%) saturate(${105 + ((s * 5) % 35)}%) brightness(${98 + (s % 10)}%)`,
    alphaRange: [0.1, 0.22]
  }
];

function generate500ColorEffects(): ColorEffectOption[] {
  const list: ColorEffectOption[] = [...BASE_COLOR_EFFECTS];
  // 7 families x 70 presets = 490 + 10 base = 500 total color effects
  for (let fIdx = 0; fIdx < EFFECT_BLUEPRINTS.length; fIdx++) {
    const bp = EFFECT_BLUEPRINTS[fIdx];
    for (let i = 0; i < 70; i++) {
      const globalNum = list.length + 1;
      const root = bp.roots[i % bp.roots.length];
      const adj = bp.adjectives[Math.floor(i / bp.roots.length) % bp.adjectives.length];
      const [c1, c2] = bp.tints[(i + fIdx) % bp.tints.length];
      const blend = bp.blends[i % bp.blends.length];
      const alpha =
        Math.round(
          (bp.alphaRange[0] +
            ((i % 7) / 6) * (bp.alphaRange[1] - bp.alphaRange[0])) *
            100
        ) / 100;
      const angle = 115 + ((i * 19 + fIdx * 23) % 140);

      list.push({
        id: `fx_${String(globalNum).padStart(3, '0')}`,
        label: `${root} ${adj} #${i + 1}`,
        category: bp.category,
        desc: `Athari ya ${bp.category} · Kiwango ${Math.round(alpha * 100)}%`,
        swatch: `linear-gradient(${angle}deg, ${c1}, ${c2})`,
        cssFilter: bp.baseFilter(i + fIdx * 11),
        overlayColor: i % 2 === 0 ? c1 : c2,
        overlayBlend: blend,
        overlayAlpha: alpha
      });
    }
  }
  return list;
}

export const COLOR_EFFECT_PRESETS: ColorEffectOption[] = generate500ColorEffects();

export const COLOR_EFFECT_MAP: Record<string, ColorEffectOption> = Object.fromEntries(
  COLOR_EFFECT_PRESETS.map((p) => [p.id, p])
);

export interface ImageColorPreset {
  id: string;
  label: string;
  patch: Partial<ImageElement>;
}

export const IMAGE_COLOR_PRESETS: ImageColorPreset[] = [
  {
    id: 'normal',
    label: 'Asili',
    patch: {
      filterBrightness: 100,
      filterContrast: 100,
      filterSaturation: 100,
      filterGrayscale: 0,
      filterSepia: 0,
      filterHueRotate: 0,
      filterInvert: 0
    }
  },
  {
    id: 'vintage',
    label: 'Vintage',
    patch: {
      filterBrightness: 102,
      filterContrast: 94,
      filterSaturation: 82,
      filterGrayscale: 0,
      filterSepia: 60,
      filterHueRotate: 0,
      filterInvert: 0
    }
  },
  {
    id: 'cinema',
    label: 'Cinema',
    patch: {
      filterBrightness: 96,
      filterContrast: 124,
      filterSaturation: 112,
      filterGrayscale: 0,
      filterSepia: 10,
      filterHueRotate: 12,
      filterInvert: 0
    }
  },
  {
    id: 'noir',
    label: 'Noir B&W',
    patch: {
      filterBrightness: 100,
      filterContrast: 132,
      filterSaturation: 100,
      filterGrayscale: 100,
      filterSepia: 0,
      filterHueRotate: 0,
      filterInvert: 0
    }
  },
  {
    id: 'warm',
    label: 'Dhahabu',
    patch: {
      filterBrightness: 108,
      filterContrast: 108,
      filterSaturation: 125,
      filterGrayscale: 0,
      filterSepia: 32,
      filterHueRotate: 350,
      filterInvert: 0
    }
  },
  {
    id: 'cyber',
    label: 'Cyber Neon',
    patch: {
      filterBrightness: 105,
      filterContrast: 120,
      filterSaturation: 165,
      filterGrayscale: 0,
      filterSepia: 0,
      filterHueRotate: 280,
      filterInvert: 0
    }
  },
  {
    id: 'vivid',
    label: 'Vivid Pop',
    patch: {
      filterBrightness: 106,
      filterContrast: 118,
      filterSaturation: 155,
      filterGrayscale: 0,
      filterSepia: 0,
      filterHueRotate: 0,
      filterInvert: 0
    }
  },
  {
    id: 'invert',
    label: 'Geuza Rangi',
    patch: {
      filterBrightness: 100,
      filterContrast: 110,
      filterSaturation: 100,
      filterGrayscale: 0,
      filterSepia: 0,
      filterHueRotate: 0,
      filterInvert: 100
    }
  }
];

export const DEFAULT_WATERMARK: WatermarkConfig = {
  enabled: false,
  text: '© MALOSHA STUDIO',
  pattern: 'tiled-diagonal',
  color: '#ffffff',
  opacity: 0.22,
  fontSize: 28,
  angle: -28
};
