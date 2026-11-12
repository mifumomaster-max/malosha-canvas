import { ColorEffectPreset, ImageElement, WatermarkConfig } from '../types/poster';

export interface ColorEffectOption {
  id: ColorEffectPreset;
  label: string;
  desc: string;
  swatch: string;
  cssFilter: string;
  overlayColor?: string;
  overlayBlend?: GlobalCompositeOperation;
  overlayAlpha?: number;
}

export const COLOR_EFFECT_PRESETS: ColorEffectOption[] = [
  {
    id: 'none',
    label: 'Kawaida (Asili)',
    desc: 'Rangi halisi bila kichujio cha ziada',
    swatch: 'linear-gradient(135deg, #334155, #0f172a)',
    cssFilter: ''
  },
  {
    id: 'warm-sunset',
    label: 'Jua la Jioni',
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
    desc: 'Rangi angavu zinazong’aa kwa matangazo',
    swatch: 'linear-gradient(135deg, #f43f5e, #f59e0b)',
    cssFilter: 'saturate(145%) contrast(112%) brightness(103%)'
  }
];

export const COLOR_EFFECT_MAP: Record<ColorEffectPreset, ColorEffectOption> = Object.fromEntries(
  COLOR_EFFECT_PRESETS.map((p) => [p.id, p])
) as Record<ColorEffectPreset, ColorEffectOption>;

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
