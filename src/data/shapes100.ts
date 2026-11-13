import { ShapeType } from '../types/poster';

export type ShapeCategory =
  | 'Msingi'
  | 'Nyota & Beji'
  | 'Mishale'
  | 'Fremu & Kadi'
  | 'Alama & Ikoni';

export interface ShapeDefinition {
  id: ShapeType;
  label: string;
  category: ShapeCategory;
  /** Normalized 0..100 SVG path used by DOM SVG, Sidebar thumbs, and Canvas2D Path2D export */
  pathData?: string;
  defaultWidth?: number;
  defaultHeight?: number;
}

const poly = (sides: number, rx = 47, ry = 47, offsetDeg = -90): string => {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = ((offsetDeg + (i * 360) / sides) * Math.PI) / 180;
    pts.push(`${(50 + Math.cos(a) * rx).toFixed(1)},${(50 + Math.sin(a) * ry).toFixed(1)}`);
  }
  return `M ${pts[0]} L ${pts.slice(1).join(' L ')} Z`;
};

const star = (points: number, outerR = 48, innerR = 21, offsetDeg = -90): string => {
  const pts: string[] = [];
  const step = Math.PI / points;
  let ang = (offsetDeg * Math.PI) / 180;
  for (let i = 0; i < points; i++) {
    pts.push(`${(50 + Math.cos(ang) * outerR).toFixed(1)},${(50 + Math.sin(ang) * outerR).toFixed(1)}`);
    ang += step;
    pts.push(`${(50 + Math.cos(ang) * innerR).toFixed(1)},${(50 + Math.sin(ang) * innerR).toFixed(1)}`);
    ang += step;
  }
  return `M ${pts[0]} L ${pts.slice(1).join(' L ')} Z`;
};

const gear = (teeth: number, outerR = 48, innerR = 37): string => {
  const pts: string[] = [];
  const step = (Math.PI * 2) / (teeth * 2);
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a1 = i * step - step * 0.25;
    const a2 = i * step + step * 0.25;
    pts.push(`${(50 + Math.cos(a1) * r).toFixed(1)},${(50 + Math.sin(a1) * r).toFixed(1)}`);
    pts.push(`${(50 + Math.cos(a2) * r).toFixed(1)},${(50 + Math.sin(a2) * r).toFixed(1)}`);
  }
  return `M ${pts[0]} L ${pts.slice(1).join(' L ')} Z`;
};

export const SHAPES_100: ShapeDefinition[] = [
  // ===================================================================
  // 1-20: MSINGI (Basic Geometry & Organic Blobs)
  // ===================================================================
  { id: 'rectangle', label: 'Mstatili', category: 'Msingi', pathData: 'M 4,4 H 96 V 96 H 4 Z' },
  { id: 'circle', label: 'Mduara', category: 'Msingi', pathData: 'M 50,3 A 47,47 0 1,1 49.9,3 Z' },
  { id: 'triangle', label: 'Pembetatu', category: 'Msingi', pathData: 'M 50,4 L 96,96 L 4,96 Z' },
  { id: 'diamond', label: 'Almasi', category: 'Msingi', pathData: 'M 50,3 L 97,50 L 50,97 L 3,50 Z' },
  { id: 'pentagon', label: 'Pembe 5', category: 'Msingi', pathData: poly(5) },
  { id: 'hexagon', label: 'Pembe 6', category: 'Msingi', pathData: poly(6) },
  { id: 'octagon', label: 'Pembe 8', category: 'Msingi', pathData: poly(8, 47, 47, -67.5) },
  { id: 'pill', label: 'Kapsuli', category: 'Msingi', pathData: 'M 25,18 H 75 A 32,32 0 0,1 75,82 H 25 A 32,32 0 0,1 25,18 Z', defaultWidth: 280, defaultHeight: 90 },
  { id: 'line', label: 'Mstari Mlalo', category: 'Msingi', pathData: 'M 2,42 H 98 V 58 H 2 Z', defaultWidth: 320, defaultHeight: 8 },
  { id: 'heptagon', label: 'Pembe 7', category: 'Msingi', pathData: poly(7) },
  { id: 'nonagon', label: 'Pembe 9', category: 'Msingi', pathData: poly(9) },
  { id: 'decagon', label: 'Pembe 10', category: 'Msingi', pathData: poly(10) },
  { id: 'dodecagon', label: 'Pembe 12', category: 'Msingi', pathData: poly(12) },
  { id: 'tri-down', label: 'Pembetatu Chini', category: 'Msingi', pathData: 'M 4,4 H 96 L 50,96 Z' },
  { id: 'tri-right', label: 'Pembetatu Kulia', category: 'Msingi', pathData: 'M 6,4 L 94,50 L 6,96 Z' },
  { id: 'tri-left', label: 'Pembetatu Kushoto', category: 'Msingi', pathData: 'M 94,4 L 94,96 L 6,50 Z' },
  { id: 'right-triangle', label: 'Pembe Mraba', category: 'Msingi', pathData: 'M 6,6 L 94,94 L 6,94 Z' },
  { id: 'parallelogram', label: 'Msambamba', category: 'Msingi', pathData: 'M 22,12 H 96 L 78,88 H 4 Z', defaultWidth: 280, defaultHeight: 160 },
  { id: 'trapezoid', label: 'Trapeza', category: 'Msingi', pathData: 'M 20,12 H 80 L 96,88 H 4 Z', defaultWidth: 280, defaultHeight: 160 },
  { id: 'ring-hollow', label: 'Pete / Ring', category: 'Msingi', pathData: 'M 50,4 A 46,46 0 1,0 50,96 A 46,46 0 1,0 50,4 Z M 50,22 A 28,28 0 1,1 50,78 A 28,28 0 1,1 50,22 Z' },

  // ===================================================================
  // 21-40: NYOTA & BEJI (Stars, Bursts, Seals & Ribbons)
  // ===================================================================
  { id: 'star', label: 'Nyota 5', category: 'Nyota & Beji', pathData: star(5, 48, 21) },
  { id: 'burst', label: 'Mlipuko 12', category: 'Nyota & Beji', pathData: star(12, 48, 34) },
  { id: 'badge-ribbon', label: 'Riboni', category: 'Nyota & Beji', pathData: 'M 2,14 H 98 L 82,50 L 98,86 H 2 L 18,50 Z', defaultWidth: 300, defaultHeight: 90 },
  { id: 'star-4', label: 'Nyota 4 (Sparkle)', category: 'Nyota & Beji', pathData: star(4, 48, 16) },
  { id: 'star-6', label: 'Nyota 6', category: 'Nyota & Beji', pathData: star(6, 48, 24) },
  { id: 'star-7', label: 'Nyota 7', category: 'Nyota & Beji', pathData: star(7, 48, 25) },
  { id: 'star-8', label: 'Nyota 8', category: 'Nyota & Beji', pathData: star(8, 48, 24) },
  { id: 'star-10', label: 'Nyota 10', category: 'Nyota & Beji', pathData: star(10, 48, 27) },
  { id: 'burst-16', label: 'Muhuri 16', category: 'Nyota & Beji', pathData: star(16, 48, 37) },
  { id: 'burst-20', label: 'Muhuri 20', category: 'Nyota & Beji', pathData: star(20, 48, 39) },
  { id: 'burst-24', label: 'Muhuri wa Cheti', category: 'Nyota & Beji', pathData: star(24, 48, 40) },
  { id: 'seal-gear', label: 'Gia / Gurudumu', category: 'Nyota & Beji', pathData: gear(8, 48, 36) },
  { id: 'badge-shield', label: 'Ngao Rasmi', category: 'Nyota & Beji', pathData: 'M 50,4 L 90,18 V 50 C 90,74 72,89 50,96 C 28,89 10,74 10,50 V 18 Z' },
  { id: 'badge-shield-cut', label: 'Ngao ya Kisasa', category: 'Nyota & Beji', pathData: 'M 14,6 H 86 V 54 L 50,96 L 14,54 Z' },
  { id: 'badge-tag', label: 'Lebo ya Bei', category: 'Nyota & Beji', pathData: 'M 6,28 L 28,12 H 94 V 88 H 28 L 6,72 Z', defaultWidth: 280, defaultHeight: 130 },
  { id: 'badge-bookmark', label: 'Alama ya Kitabu', category: 'Nyota & Beji', pathData: 'M 16,4 H 84 V 96 L 50,74 L 16,96 Z' },
  { id: 'ribbon-banner-left', label: 'Bango Pembe Kushoto', category: 'Nyota & Beji', pathData: 'M 4,14 H 96 L 82,86 H 4 Z', defaultWidth: 300, defaultHeight: 90 },
  { id: 'ribbon-chevron', label: 'Riboni Mshale', category: 'Nyota & Beji', pathData: 'M 4,16 H 82 L 96,50 L 82,84 H 4 L 18,50 Z', defaultWidth: 300, defaultHeight: 90 },
  { id: 'rosette-8', label: 'Ua la Beji', category: 'Nyota & Beji', pathData: star(8, 48, 35) },
  { id: 'crown', label: 'Taji la Mfalme', category: 'Nyota & Beji', pathData: 'M 8,82 L 4,24 L 30,50 L 50,14 L 70,50 L 96,24 L 92,82 Z' },

  // ===================================================================
  // 41-60: MISHALE (Arrows, Pointers & Directionals)
  // ===================================================================
  { id: 'arrow', label: 'Mshale Kulia', category: 'Mishale', pathData: 'M 2,34 H 58 V 10 L 98,50 L 58,90 V 66 H 2 Z', defaultWidth: 240, defaultHeight: 110 },
  { id: 'arrow-left', label: 'Mshale Kushoto', category: 'Mishale', pathData: 'M 98,34 H 42 V 10 L 2,50 L 42,90 V 66 H 98 Z', defaultWidth: 240, defaultHeight: 110 },
  { id: 'arrow-up', label: 'Mshale Juu', category: 'Mishale', pathData: 'M 34,98 V 42 H 10 L 50,2 L 90,42 H 66 V 98 Z', defaultWidth: 110, defaultHeight: 240 },
  { id: 'arrow-down', label: 'Mshale Chini', category: 'Mishale', pathData: 'M 34,2 V 58 H 10 L 50,98 L 90,58 H 66 V 2 Z', defaultWidth: 110, defaultHeight: 240 },
  { id: 'arrow-double-h', label: 'Mishale Miwili Mlalo', category: 'Mishale', pathData: 'M 2,50 L 28,18 V 36 H 72 V 18 L 98,50 L 72,82 V 64 H 28 V 82 Z', defaultWidth: 260, defaultHeight: 110 },
  { id: 'arrow-double-v', label: 'Mishale Miwili Wima', category: 'Mishale', pathData: 'M 50,2 L 82,28 H 64 V 72 H 82 L 50,98 L 18,72 H 36 V 28 H 18 Z', defaultWidth: 110, defaultHeight: 260 },
  { id: 'arrow-quad', label: 'Mishale 4', category: 'Mishale', pathData: 'M 50,2 L 66,22 H 56 V 44 H 78 V 34 L 98,50 L 78,66 V 56 H 56 V 78 H 66 L 50,98 L 34,78 H 44 V 56 H 22 V 66 L 2,50 L 22,34 V 44 H 44 V 22 H 34 Z' },
  { id: 'chevron-right', label: 'Shevroni Kulia', category: 'Mishale', pathData: 'M 14,8 H 48 L 86,50 L 48,92 H 14 L 52,50 Z' },
  { id: 'chevron-left', label: 'Shevroni Kushoto', category: 'Mishale', pathData: 'M 86,8 H 52 L 14,50 L 52,92 H 86 L 48,50 Z' },
  { id: 'chevron-up', label: 'Shevroni Juu', category: 'Mishale', pathData: 'M 8,86 V 52 L 50,14 L 92,52 V 86 L 50,48 Z' },
  { id: 'chevron-down', label: 'Shevroni Chini', category: 'Mishale', pathData: 'M 8,14 V 48 L 50,86 L 92,48 V 14 L 50,52 Z' },
  { id: 'arrow-notch-right', label: 'Mshale wa Mkia', category: 'Mishale', pathData: 'M 4,28 H 62 V 10 L 96,50 L 62,90 V 72 H 4 L 22,50 Z', defaultWidth: 250, defaultHeight: 110 },
  { id: 'arrow-bend-ne', label: 'Mshale Mkunjo Juu', category: 'Mishale', pathData: 'M 12,88 V 34 H 66 V 14 L 96,42 L 66,70 V 50 H 30 V 88 Z' },
  { id: 'arrow-bend-se', label: 'Mshale Mkunjo Chini', category: 'Mishale', pathData: 'M 12,12 V 66 H 66 V 86 L 96,58 L 66,30 V 50 H 30 V 12 Z' },
  { id: 'arrow-play', label: 'Kitufe Play', category: 'Mishale', pathData: 'M 18,10 L 90,50 L 18,90 Z' },
  { id: 'arrow-fast-forward', label: 'Mbele Haraka', category: 'Mishale', pathData: 'M 6,16 L 48,50 L 6,84 Z M 52,16 L 94,50 L 52,84 Z' },
  { id: 'arrow-pointer-up', label: 'Kielekezi Juu', category: 'Mishale', pathData: 'M 50,4 L 94,46 H 68 V 96 H 32 V 46 H 6 Z' },
  { id: 'arrow-pointer-right', label: 'Kielekezi Kulia', category: 'Mishale', pathData: 'M 4,22 H 64 L 96,50 L 64,78 H 4 Z', defaultWidth: 260, defaultHeight: 110 },
  { id: 'arrow-step-1', label: 'Hatua ya Mtiririko', category: 'Mishale', pathData: 'M 4,18 H 76 L 96,50 L 76,82 H 4 V 18 Z', defaultWidth: 260, defaultHeight: 110 },
  { id: 'arrow-cycle', label: 'Nusu Mshale', category: 'Mishale', pathData: 'M 10,70 C 10,30 40,14 68,26 L 80,12 L 92,48 L 54,48 L 64,36 C 44,28 24,38 24,70 Z' },

  // ===================================================================
  // 61-80: FREMU & KADI (Frames, Bubbles, Windows, Arches & Tickets)
  // ===================================================================
  { id: 'frame-border', label: 'Fremu Mraba', category: 'Fremu & Kadi', pathData: 'M 4,4 H 96 V 96 H 4 Z M 12,12 V 88 H 88 V 12 Z' },
  { id: 'speech-bubble', label: 'Puto la Maneno', category: 'Fremu & Kadi', pathData: 'M 12,4 H 88 Q 96,4 96,12 V 68 Q 96,76 88,76 H 42 L 22,96 L 26,76 H 12 Q 4,76 4,68 V 12 Q 4,4 12,4 Z' },
  { id: 'speech-bubble-right', label: 'Puto Kulia', category: 'Fremu & Kadi', pathData: 'M 12,4 H 88 Q 96,4 96,12 V 68 Q 96,76 88,76 H 74 L 78,96 L 58,76 H 12 Q 4,76 4,68 V 12 Q 4,4 12,4 Z' },
  { id: 'speech-oval', label: 'Puto la Duara', category: 'Fremu & Kadi', pathData: 'M 50,6 C 78,6 96,22 96,42 C 96,62 78,76 50,76 C 42,76 35,75 28,73 L 12,92 L 18,68 C 9,60 4,52 4,42 C 4,22 22,6 50,6 Z' },
  { id: 'arch-top', label: 'Tao la Mlango', category: 'Fremu & Kadi', pathData: 'M 10,96 V 46 A 40,40 0 0,1 90,46 V 96 Z' },
  { id: 'arch-frame', label: 'Fremu ya Tao', category: 'Fremu & Kadi', pathData: 'M 10,96 V 46 A 40,40 0 0,1 90,46 V 96 H 80 V 46 A 30,30 0 0,0 20,46 V 96 Z' },
  { id: 'ticket-notch', label: 'Kadi ya Tiketi', category: 'Fremu & Kadi', pathData: 'M 6,14 H 94 V 38 A 12,12 0 0,0 94,62 V 86 H 6 V 62 A 12,12 0 0,0 6,38 Z', defaultWidth: 280, defaultHeight: 150 },
  { id: 'chamfer-box', label: 'Kasha Pembe Zilizokatwa', category: 'Fremu & Kadi', pathData: 'M 18,6 H 82 L 94,18 V 82 L 82,94 H 18 L 6,82 V 18 Z' },
  { id: 'cut-corner-diag', label: 'Kadi Kona Mbili', category: 'Fremu & Kadi', pathData: 'M 22,6 H 94 V 78 L 78,94 H 6 V 22 Z' },
  { id: 'tab-folder', label: 'Kadi ya Faili', category: 'Fremu & Kadi', pathData: 'M 6,12 H 42 L 54,26 H 94 V 88 H 6 Z' },
  { id: 'double-frame', label: 'Fremu Pacha', category: 'Fremu & Kadi', pathData: 'M 4,4 H 96 V 96 H 4 Z M 10,10 V 90 H 90 V 10 Z M 16,16 H 84 V 84 H 16 Z M 20,20 V 80 H 80 V 20 Z' },
  { id: 'corner-brackets', label: 'Kona za Kamera', category: 'Fremu & Kadi', pathData: 'M 4,4 H 32 V 12 H 12 V 32 H 4 Z M 68,4 H 96 V 32 H 88 V 12 H 68 Z M 4,68 H 12 V 88 H 32 V 96 H 4 Z M 88,68 H 96 V 96 H 68 V 88 H 88 Z' },
  { id: 'plaque-ornate', label: 'Bamba la Cheti', category: 'Fremu & Kadi', pathData: 'M 16,6 Q 16,16 6,16 V 84 Q 16,84 16,94 H 84 Q 84,84 94,84 V 16 Q 84,16 84,6 Z' },
  { id: 'cloud-card', label: 'Wingu', category: 'Fremu & Kadi', pathData: 'M 24,80 H 78 A 18,18 0 0,0 82,45 A 22,22 0 0,0 42,26 A 20,20 0 0,0 14,48 A 16,16 0 0,0 24,80 Z' },
  { id: 'wave-bottom', label: 'Mawimbi Chini', category: 'Fremu & Kadi', pathData: 'M 0,0 H 100 V 74 Q 75,96 50,74 T 0,74 Z', defaultWidth: 320, defaultHeight: 160 },
  { id: 'wave-top', label: 'Mawimbi Juu', category: 'Fremu & Kadi', pathData: 'M 0,26 Q 25,4 50,26 T 100,26 V 100 H 0 Z', defaultWidth: 320, defaultHeight: 160 },
  { id: 'slash-panel', label: 'Kasha la Mshazari', category: 'Fremu & Kadi', pathData: 'M 0,0 H 100 L 82,100 H 0 Z', defaultWidth: 320, defaultHeight: 180 },
  { id: 'diagonal-slice', label: 'Kipande cha Mshazari', category: 'Fremu & Kadi', pathData: 'M 0,20 L 100,0 V 80 L 0,100 Z', defaultWidth: 320, defaultHeight: 160 },
  { id: 'semi-circle-top', label: 'Nusu Duara Juu', category: 'Fremu & Kadi', pathData: 'M 4,75 A 46,46 0 0,1 96,75 Z' },
  { id: 'quarter-circle', label: 'Robo Duara', category: 'Fremu & Kadi', pathData: 'M 6,6 H 94 A 88,88 0 0,1 6,94 Z' },

  // ===================================================================
  // 81-100: ALAMA & IKONI (Icons, Emblems, Crosses, Media & Accents)
  // ===================================================================
  { id: 'heart', label: 'Moyo', category: 'Alama & Ikoni', pathData: 'M 50,90 C 20,65 0,45 0,25 C 0,10 12,0 25,0 C 35,0 45,6 50,15 C 55,6 65,0 75,0 C 88,0 100,10 100,25 C 100,45 80,65 50,90 Z' },
  { id: 'cross-plus', label: 'Alama ya Jumlisha', category: 'Alama & Ikoni', pathData: 'M 36,6 H 64 V 36 H 94 V 64 H 64 V 94 H 36 V 64 H 6 V 36 H 36 Z' },
  { id: 'cross-x', label: 'Alama ya X', category: 'Alama & Ikoni', pathData: 'M 18,6 L 50,38 L 82,6 L 94,18 L 62,50 L 94,82 L 82,94 L 50,62 L 18,94 L 6,82 L 38,50 L 6,18 Z' },
  { id: 'checkmark', label: 'Alama ya Tiki (Vema)', category: 'Alama & Ikoni', pathData: 'M 10,54 L 38,82 L 90,22 L 78,12 L 37,60 L 22,44 Z' },
  { id: 'lightning', label: 'Radi / Kasi', category: 'Alama & Ikoni', pathData: 'M 56,4 L 18,54 H 46 L 38,96 L 82,42 H 54 Z' },
  { id: 'moon-crescent', label: 'Mwezi Mwandamo', category: 'Alama & Ikoni', pathData: 'M 64,8 C 36,8 14,30 14,52 C 14,76 36,94 64,94 C 46,84 40,68 40,52 C 40,34 46,18 64,8 Z' },
  { id: 'sun-rays', label: 'Jua', category: 'Alama & Ikoni', pathData: star(12, 48, 30) },
  { id: 'drop-water', label: 'Tone la Maji', category: 'Alama & Ikoni', pathData: 'M 50,4 C 50,4 86,44 86,66 A 36,36 0 1,1 14,66 C 14,44 50,4 50,4 Z' },
  { id: 'leaf-eco', label: 'Jani la Mazingira', category: 'Alama & Ikoni', pathData: 'M 14,88 C 14,40 42,10 90,10 C 90,58 62,88 14,88 Z' },
  { id: 'location-pin', label: 'Alama ya Eneo (GPS)', category: 'Alama & Ikoni', pathData: 'M 50,4 C 28,4 14,20 14,40 C 14,64 50,96 50,96 C 50,96 86,64 86,40 C 86,20 72,4 50,4 Z M 50,52 A 14,14 0 1,1 50,24 A 14,14 0 1,1 50,52 Z' },
  { id: 'trophy-cup', label: 'Kombe la Ushindi', category: 'Alama & Ikoni', pathData: 'M 22,8 H 78 V 36 C 78,56 66,68 54,70 V 84 H 72 V 94 H 28 V 84 H 46 V 70 C 34,68 22,56 22,36 Z' },
  { id: 'house-home', label: 'Nyumba (Real Estate)', category: 'Alama & Ikoni', pathData: 'M 50,8 L 94,46 H 82 V 92 H 58 V 62 H 42 V 92 H 18 V 46 H 6 Z' },
  { id: 'bell-alert', label: 'Kengele ya Habari', category: 'Alama & Ikoni', pathData: 'M 50,6 C 34,6 24,18 24,36 V 58 L 12,74 H 88 L 76,58 V 36 C 76,18 66,6 50,6 Z M 38,80 A 12,12 0 0,0 62,80 Z' },
  { id: 'megaphone', label: 'Kipaza Sauti', category: 'Alama & Ikoni', pathData: 'M 12,38 H 34 L 84,14 V 86 L 34,62 H 28 V 84 H 14 V 62 H 12 Z' },
  { id: 'camera-box', label: 'Kamera', category: 'Alama & Ikoni', pathData: 'M 8,24 H 28 L 36,12 H 64 L 72,24 H 92 V 86 H 8 Z M 50,72 A 18,18 0 1,0 50,36 A 18,18 0 1,0 50,72 Z' },
  { id: 'music-note', label: 'Muziki', category: 'Alama & Ikoni', pathData: 'M 38,14 L 88,6 V 68 A 14,14 0 1,1 74,54 V 28 L 48,32 V 76 A 14,14 0 1,1 34,62 V 14 Z' },
  { id: 'graduation-cap', label: 'Kofia ya Elimu', category: 'Alama & Ikoni', pathData: 'M 50,16 L 96,38 L 50,60 L 4,38 Z M 22,52 L 50,66 L 78,52 V 74 L 50,86 L 22,74 Z' },
  { id: 'book-open', label: 'Kitabu', category: 'Alama & Ikoni', pathData: 'M 6,18 C 24,12 38,16 48,24 V 88 C 38,80 24,76 6,82 Z M 94,18 C 76,12 62,16 52,24 V 88 C 62,80 76,76 94,82 Z' },
  { id: 'briefcase', label: 'Mkoba wa Kazi', category: 'Alama & Ikoni', pathData: 'M 34,12 H 66 V 26 H 92 V 88 H 8 V 26 H 34 Z M 42,18 V 26 H 58 V 18 Z' },
  { id: 'quote-mark', label: 'Alama za Nukuu', category: 'Alama & Ikoni', pathData: 'M 10,20 H 44 V 54 C 44,74 30,86 14,88 L 10,76 C 22,72 26,64 26,54 H 10 Z M 56,20 H 90 V 54 C 90,74 76,86 60,88 L 56,76 C 68,72 72,64 72,54 H 56 Z' },
  { id: 'verified-badge', label: 'Verified Badge ✓', category: 'Alama & Ikoni', pathData: star(10, 48, 39), defaultWidth: 64, defaultHeight: 64 }
];

export const SHAPES_100_MAP: Record<string, ShapeDefinition> = Object.fromEntries(
  SHAPES_100.map((s) => [s.id, s])
);
