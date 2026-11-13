export type ElementType = 'text' | 'image' | 'shape' | 'badge' | 'qrcode' | 'chart';

export type BlendMode = 'source-over' | 'multiply' | 'screen' | 'overlay' | 'soft-light';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  isLocked?: boolean;
  flipX?: boolean;
  flipY?: boolean;
  blendMode?: BlendMode;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string | number;
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  color: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing: number;
  backgroundColor?: string;
  borderRadius?: number;
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  alt?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadowColor?: string;
  shadowBlur?: number;
  filterBrightness?: number; // 0 to 200, default 100
  filterContrast?: number;   // 0 to 200, default 100
  filterSaturation?: number; // 0 to 200, default 100
  filterGrayscale?: number;  // 0 to 100, default 0
  filterBlur?: number;       // 0 to 20, default 0
  filterSepia?: number;      // 0 to 100, default 0
  filterHueRotate?: number;  // 0 to 360, default 0
  filterInvert?: number;     // 0 to 100, default 0
  objectFit?: 'cover' | 'contain';
  cropRect?: { x: number; y: number; w: number; h: number };
}

export type BaseShapeType =
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'star'
  | 'heart'
  | 'badge-ribbon'
  | 'line'
  | 'arrow'
  | 'hexagon'
  | 'pentagon'
  | 'diamond'
  | 'octagon'
  | 'pill'
  | 'burst'
  | 'speech-bubble'
  | 'frame-border';

export type ShapeType = BaseShapeType | (string & {});

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: ShapeType;
  fillColor: string;
  strokeColor?: string;
  strokeWidth?: number;
  borderRadius?: number;
  shadowColor?: string;
  shadowBlur?: number;
}

export interface BadgeElement extends BaseElement {
  type: 'badge';
  text: string;
  badgeStyle: 'circle' | 'ribbon' | 'tag' | 'pill';
  bgColor: string;
  textColor: string;
  secondaryText?: string;
  fontSize: number;
}

export interface QrCodeElement extends BaseElement {
  type: 'qrcode';
  data: string;
  qrColor: string;
  bgColor: string;
  label?: string;
}

export type ChartType =
  | 'bar'
  | 'horizontal-bar'
  | 'stacked-bar'
  | 'pie'
  | 'donut'
  | 'semi-donut'
  | 'line'
  | 'area'
  | 'spline'
  | 'scatter'
  | 'radar'
  | 'funnel'
  | 'progress-ring'
  | 'progress-bar'
  | 'metric-kpi'
  | 'comparison-table';

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  color?: string;
}

export interface ChartElement extends BaseElement {
  type: 'chart';
  chartType: ChartType;
  title?: string;
  subtitle?: string;
  data: ChartDataPoint[];
  colorPalette: string[];
  showLegend?: boolean;
  showValues?: boolean;
  showGridlines?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  textColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  progressValue?: number; // 0 to 100 for progress-ring / progress-bar
  progressLabel?: string;
  kpiValue?: string;      // e.g. "+148%", "TSH 45M"
  kpiLabel?: string;
  kpiTrend?: 'up' | 'down' | 'neutral';
}

export type PosterElement =
  | TextElement
  | ImageElement
  | ShapeElement
  | BadgeElement
  | QrCodeElement
  | ChartElement;

export interface PosterBackground {
  type: 'color' | 'gradient' | 'image';
  color?: string;
  gradient?: {
    type: 'linear' | 'radial';
    angle?: number;
    stops: { offset: number; color: string }[];
  };
  imageUrl?: string;
  overlayOpacity?: number;
  overlayColor?: string;
}

export type ColorEffectPreset =
  | 'none'
  | 'warm-sunset'
  | 'cool-cinema'
  | 'golden-hour'
  | 'vintage-film'
  | 'noir-bw'
  | 'cyber-neon'
  | 'emerald-mint'
  | 'royal-violet'
  | 'vivid-pop'
  | (string & {});

export interface WatermarkConfig {
  enabled: boolean;
  text: string;
  pattern: 'single-center' | 'tiled-diagonal' | 'bottom-corner';
  color: string;
  opacity: number; // 0.05 to 0.7
  fontSize: number; // 14 to 72
  angle: number; // -45 to 45
}

export interface CanvasDimensions {
  id: string;
  name: string;
  labelSwahili: string;
  width: number;
  height: number;
  description: string;
  ratioLabel: string;
}

export interface PosterProject {
  id: string;
  title: string;
  width: number;
  height: number;
  background: PosterBackground;
  elements: PosterElement[];
  colorEffect?: ColorEffectPreset;
  colorEffectIntensity?: number;
  watermark?: WatermarkConfig;
  createdAt: number;
  updatedAt: number;
}

export type TemplateCategory =
  | 'nukuu'
  | 'breaking-news'
  | 'magazine'
  | 'business-card'
  | 'id-card'
  | 'invitation'
  | 'certificate'
  | 'infographics'
  | 'business'
  | 'events'
  | 'food'
  | 'sports'
  | 'church'
  | 'education'
  | 'realestate';

export interface PosterTemplate {
  id: string;
  title: string;
  titleSwahili: string;
  category: TemplateCategory;
  categoryLabelSwahili: string;
  description: string;
  width: number;
  height: number;
  background: PosterBackground;
  elements: PosterElement[];
  colorEffect?: ColorEffectPreset;
  watermark?: WatermarkConfig;
  thumbnailPreview?: string;
  previewAccent?: string;
  previewBg?: string;
  previewBadge?: string;
  isCustom?: boolean;
  isFeaturedUpload?: boolean;
}
