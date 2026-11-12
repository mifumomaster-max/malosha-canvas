export type ElementType = 'text' | 'image' | 'shape' | 'badge' | 'qrcode' | 'chart';

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
  objectFit?: 'cover' | 'contain';
}

export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'star' | 'heart' | 'badge-ribbon' | 'line' | 'arrow';

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

export type ChartType = 'bar' | 'pie' | 'donut' | 'line' | 'progress-ring' | 'metric-kpi';

export interface ChartDataPoint {
  label: string;
  value: number;
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
  textColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  progressValue?: number; // 0 to 100 for progress-ring
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
  createdAt: number;
  updatedAt: number;
}

export interface PosterTemplate {
  id: string;
  title: string;
  titleSwahili: string;
  category:
    | 'business'
    | 'infographics'
    | 'events'
    | 'food'
    | 'sports'
    | 'church'
    | 'education'
    | 'realestate';
  categoryLabelSwahili: string;
  description: string;
  width: number;
  height: number;
  background: PosterBackground;
  elements: PosterElement[];
  thumbnailPreview?: string;
}
