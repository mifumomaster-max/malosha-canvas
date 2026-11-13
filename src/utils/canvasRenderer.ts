import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import {
  PosterProject,
  PosterElement,
  TextElement,
  ImageElement,
  ShapeElement,
  BadgeElement,
  QrCodeElement,
  ChartElement
} from '../types/poster';
import { SHAPES_100_MAP } from '../data/shapes100';
import { COLOR_EFFECT_MAP } from '../data/colorEffects';

// Cache for loaded images so re-rendering is instantaneous
const imageCache = new Map<string, HTMLImageElement>();

export function preloadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => {
      // Fallback
      const fallback = new Image();
      fallback.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      fallback.onload = () => resolve(fallback);
    };
    img.src = src;
  });
}

export async function renderPosterToCanvas(
  project: PosterProject,
  scale: number = 1,
  transparentBg: boolean = false
): Promise<HTMLCanvasElement> {
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {}
  }

  // Preload all element images & background
  const imagesToLoad: string[] = [];
  if (project.background.type === 'image' && project.background.imageUrl) {
    imagesToLoad.push(project.background.imageUrl);
  }
  project.elements.forEach((el) => {
    if (el.type === 'image' && el.src) {
      imagesToLoad.push(el.src);
    }
  });
  await Promise.all(imagesToLoad.map(preloadImage));

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(project.width * scale);
  canvas.height = Math.round(project.height * scale);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.scale(scale, scale);

  // 1. Draw Background
  if (!transparentBg) {
    drawBackground(ctx, project);
  }

  // 2. Draw Elements in order
  for (const element of project.elements) {
    ctx.save();
    try {
      await drawElement(ctx, element);
    } catch (err) {
      console.error(`Error rendering element ${element.id}:`, err);
    }
    ctx.restore();
  }

  // 3. Whole-poster Color Effect (if active)
  let outputCanvas = canvas;
  const effect = project.colorEffect ? COLOR_EFFECT_MAP[project.colorEffect] : undefined;
  if (effect && effect.id !== 'none' && !transparentBg) {
    const graded = document.createElement('canvas');
    graded.width = canvas.width;
    graded.height = canvas.height;
    const gctx = graded.getContext('2d');
    if (gctx) {
      if (effect.cssFilter) {
        gctx.filter = effect.cssFilter;
      }
      gctx.drawImage(canvas, 0, 0);
      gctx.filter = 'none';

      if (effect.overlayColor && effect.overlayAlpha) {
        gctx.save();
        gctx.globalCompositeOperation = effect.overlayBlend || 'soft-light';
        gctx.globalAlpha = effect.overlayAlpha;
        gctx.fillStyle = effect.overlayColor;
        gctx.fillRect(0, 0, graded.width, graded.height);
        gctx.restore();
      }
      outputCanvas = graded;
    }
  }

  // 4. Watermark Overlay (if enabled)
  if (project.watermark?.enabled && project.watermark.text?.trim()) {
    const wctx = outputCanvas.getContext('2d');
    if (wctx) {
      wctx.save();
      wctx.scale(scale, scale);
      drawWatermark(wctx, project);
      wctx.restore();
    }
  }

  return outputCanvas;
}

function drawBackground(ctx: CanvasRenderingContext2D, project: PosterProject) {
  const { width, height, background } = project;

  if (background.type === 'color') {
    ctx.fillStyle = background.color || '#ffffff';
    ctx.fillRect(0, 0, width, height);
  } else if (background.type === 'gradient' && background.gradient) {
    const { angle = 180, stops } = background.gradient;
    const rad = (angle * Math.PI) / 180;
    const x2 = Math.cos(rad) * width;
    const y2 = Math.sin(rad) * height;

    const grad = ctx.createLinearGradient(0, 0, Math.abs(x2), Math.abs(y2));
    stops.forEach((s) => grad.addColorStop(s.offset, s.color));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (background.type === 'image' && background.imageUrl) {
    const img = imageCache.get(background.imageUrl);
    if (img && img.width > 0) {
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let drawW = width;
      let drawH = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawW = height * imgRatio;
        offsetX = (width - drawW) / 2;
      } else {
        drawH = width / imgRatio;
        offsetY = (height - drawH) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
    }

    if (background.overlayOpacity && background.overlayOpacity > 0) {
      ctx.fillStyle = background.overlayColor || '#000000';
      ctx.globalAlpha = background.overlayOpacity;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;
    }
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }
}

async function drawElement(ctx: CanvasRenderingContext2D, el: PosterElement) {
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;

  ctx.translate(cx, cy);
  if (el.rotation) {
    ctx.rotate((el.rotation * Math.PI) / 180);
  }
  if (el.flipX || el.flipY) {
    ctx.scale(el.flipX ? -1 : 1, el.flipY ? -1 : 1);
  }
  if (el.blendMode && el.blendMode !== 'source-over') {
    ctx.globalCompositeOperation = el.blendMode;
  }
  ctx.globalAlpha = el.opacity ?? 1;

  const x = -el.width / 2;
  const y = -el.height / 2;
  const w = el.width;
  const h = el.height;

  switch (el.type) {
    case 'text':
      drawText(ctx, el as TextElement, x, y, w, h);
      break;
    case 'shape':
      drawShape(ctx, el as ShapeElement, x, y, w, h);
      break;
    case 'image':
      drawImage(ctx, el as ImageElement, x, y, w, h);
      break;
    case 'badge':
      drawBadge(ctx, el as BadgeElement, x, y, w, h);
      break;
    case 'qrcode':
      await drawQrCode(ctx, el as QrCodeElement, x, y, w, h);
      break;
    case 'chart':
      drawChart(ctx, el as ChartElement, x, y, w, h);
      break;
  }
}

function drawText(
  ctx: CanvasRenderingContext2D,
  el: TextElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  if (el.backgroundColor) {
    ctx.fillStyle = el.backgroundColor;
    const r = el.borderRadius || 0;
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();
  }

  const style = el.fontStyle || 'normal';
  const weight = el.fontWeight || 'normal';
  const size = el.fontSize || 32;
  const family = el.fontFamily || 'Plus Jakarta Sans';
  ctx.font = `${style} ${weight} ${size}px "${family}", sans-serif`;
  ctx.textBaseline = 'top';

  if ('letterSpacing' in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = `${el.letterSpacing || 0}px`;
  }

  if (el.shadowColor && el.shadowBlur) {
    ctx.shadowColor = el.shadowColor;
    ctx.shadowBlur = el.shadowBlur;
    ctx.shadowOffsetX = el.shadowOffsetX || 0;
    ctx.shadowOffsetY = el.shadowOffsetY || 0;
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  const lines = (el.text || '').split('\n');
  const lineH = size * (el.lineHeight || 1.2);

  lines.forEach((line, index) => {
    const lineY = y + index * lineH;
    let lineX = x;

    if (el.textAlign === 'center') {
      ctx.textAlign = 'center';
      lineX = x + w / 2;
    } else if (el.textAlign === 'right') {
      ctx.textAlign = 'right';
      lineX = x + w;
    } else {
      ctx.textAlign = 'left';
      lineX = x;
    }

    if (el.strokeColor && el.strokeWidth && el.strokeWidth > 0) {
      ctx.strokeStyle = el.strokeColor;
      ctx.lineWidth = el.strokeWidth;
      ctx.lineJoin = 'round';
      ctx.strokeText(line, lineX, lineY);
    }

    ctx.fillStyle = el.color || '#ffffff';
    ctx.fillText(line, lineX, lineY);

    if (el.textDecoration === 'underline') {
      const metrics = ctx.measureText(line);
      const startX =
        el.textAlign === 'center'
          ? lineX - metrics.width / 2
          : el.textAlign === 'right'
            ? lineX - metrics.width
            : lineX;
      ctx.fillRect(startX, lineY + size + 2, metrics.width, Math.max(1, size / 16));
    }
  });
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  el: ShapeElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  if (el.shadowColor && el.shadowBlur) {
    ctx.shadowColor = el.shadowColor;
    ctx.shadowBlur = el.shadowBlur;
    ctx.shadowOffsetY = 4;
  }

  if (el.shapeType === 'frame-border') {
    const bw = Math.max(4, el.strokeWidth || 8);
    ctx.strokeStyle = el.fillColor || '#fbbf24';
    ctx.lineWidth = bw;
    roundRect(ctx, x + bw / 2, y + bw / 2, Math.max(4, w - bw), Math.max(4, h - bw), el.borderRadius || 12);
    ctx.stroke();
    return;
  }

  if (el.shapeType === 'line') {
    ctx.strokeStyle = el.fillColor || '#ffffff';
    ctx.lineWidth = Math.max(2, h);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y + h / 2);
    ctx.lineTo(x + w, y + h / 2);
    ctx.stroke();
    return;
  }

  ctx.fillStyle = el.fillColor || '#ffffff';
  ctx.beginPath();

  switch (el.shapeType) {
    case 'circle': {
      const rx = w / 2;
      const ry = h / 2;
      ctx.ellipse(x + rx, y + ry, rx, ry, 0, 0, Math.PI * 2);
      break;
    }
    case 'triangle': {
      ctx.moveTo(x + w / 2, y);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.closePath();
      break;
    }
    case 'star': {
      drawStarPath(ctx, x + w / 2, y + h / 2, 5, Math.min(w, h) / 2, Math.min(w, h) / 4);
      break;
    }
    case 'burst': {
      drawStarPath(ctx, x + w / 2, y + h / 2, 12, Math.min(w, h) / 2, Math.min(w, h) * 0.36);
      break;
    }
    case 'hexagon': {
      drawPolygonPath(ctx, x, y, w, h, 6);
      break;
    }
    case 'pentagon': {
      drawPolygonPath(ctx, x, y, w, h, 5);
      break;
    }
    case 'octagon': {
      drawPolygonPath(ctx, x, y, w, h, 8);
      break;
    }
    case 'diamond': {
      ctx.moveTo(x + w / 2, y);
      ctx.lineTo(x + w, y + h / 2);
      ctx.lineTo(x + w / 2, y + h);
      ctx.lineTo(x, y + h / 2);
      ctx.closePath();
      break;
    }
    case 'pill': {
      roundRect(ctx, x, y, w, h, Math.min(w, h) / 2);
      break;
    }
    case 'speech-bubble': {
      drawSpeechBubblePath(ctx, x, y, w, h);
      break;
    }
    case 'heart': {
      drawHeartPath(ctx, x, y, w, h);
      break;
    }
    case 'badge-ribbon': {
      drawRibbonPath(ctx, x, y, w, h);
      break;
    }
    case 'arrow': {
      drawArrowPath(ctx, x, y, w, h);
      break;
    }
    case 'rectangle': {
      const r = el.borderRadius || 0;
      roundRect(ctx, x, y, w, h, r);
      break;
    }
    default: {
      const def = SHAPES_100_MAP[el.shapeType];
      if (def?.pathData && typeof Path2D !== 'undefined') {
        const rawPath = new Path2D(def.pathData);
        if (typeof DOMMatrix !== 'undefined') {
          const scaledPath = new Path2D();
          scaledPath.addPath(rawPath, new DOMMatrix().translate(x, y).scale(w / 100, h / 100));
          ctx.fill(scaledPath, 'evenodd');
          if (el.strokeColor && el.strokeWidth && el.strokeWidth > 0) {
            ctx.strokeStyle = el.strokeColor;
            ctx.lineWidth = el.strokeWidth;
            ctx.stroke(scaledPath);
          }
        } else {
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(w / 100, h / 100);
          ctx.fill(rawPath, 'evenodd');
          ctx.restore();
        }
        if (el.shapeType === 'verified-badge') {
          ctx.save();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = Math.max(2, Math.min(w, h) * 0.11);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(x + w * 0.30, y + h * 0.52);
          ctx.lineTo(x + w * 0.44, y + h * 0.66);
          ctx.lineTo(x + w * 0.71, y + h * 0.35);
          ctx.stroke();
          ctx.restore();
        }
        return;
      }
      const r = el.borderRadius || 0;
      roundRect(ctx, x, y, w, h, r);
      break;
    }
  }

  ctx.fill();

  if (el.strokeColor && el.strokeWidth && el.strokeWidth > 0) {
    ctx.strokeStyle = el.strokeColor;
    ctx.lineWidth = el.strokeWidth;
    ctx.stroke();
  }
}

function drawImage(
  ctx: CanvasRenderingContext2D,
  el: ImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const img = imageCache.get(el.src);
  if (!img) return;

  if (el.shadowColor && el.shadowBlur) {
    ctx.shadowColor = el.shadowColor;
    ctx.shadowBlur = el.shadowBlur;
    ctx.shadowOffsetY = 4;
  }

  const r = el.borderRadius || 0;
  ctx.save();
  if (r > 0) {
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, Math.min(r, Math.min(w, h) / 2));
    ctx.clip();
  }

  const filters: string[] = [];
  if (el.filterBrightness !== undefined && el.filterBrightness !== 100)
    filters.push(`brightness(${el.filterBrightness}%)`);
  if (el.filterContrast !== undefined && el.filterContrast !== 100)
    filters.push(`contrast(${el.filterContrast}%)`);
  if (el.filterSaturation !== undefined && el.filterSaturation !== 100)
    filters.push(`saturate(${el.filterSaturation}%)`);
  if (el.filterGrayscale && el.filterGrayscale > 0)
    filters.push(`grayscale(${el.filterGrayscale}%)`);
  if (el.filterSepia && el.filterSepia > 0)
    filters.push(`sepia(${el.filterSepia}%)`);
  if (el.filterHueRotate && el.filterHueRotate > 0)
    filters.push(`hue-rotate(${el.filterHueRotate}deg)`);
  if (el.filterInvert && el.filterInvert > 0)
    filters.push(`invert(${el.filterInvert}%)`);
  if (el.filterBlur && el.filterBlur > 0) filters.push(`blur(${el.filterBlur}px)`);

  if (filters.length > 0) {
    ctx.filter = filters.join(' ');
  }

  if (el.cropRect) {
    const sx = Math.max(0, el.cropRect.x * img.width);
    const sy = Math.max(0, el.cropRect.y * img.height);
    const sw = Math.max(1, el.cropRect.w * img.width);
    const sh = Math.max(1, el.cropRect.h * img.height);
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  } else if (el.objectFit === 'contain') {
    const imgRatio = img.width / Math.max(1, img.height);
    const boxRatio = w / Math.max(1, h);
    let dw = w;
    let dh = h;
    let dx = x;
    let dy = y;
    if (imgRatio > boxRatio) {
      dh = w / imgRatio;
      dy = y + (h - dh) / 2;
    } else {
      dw = h * imgRatio;
      dx = x + (w - dw) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  } else {
    // Center object-cover crop so circle avatars and portraits never stretch
    const imgRatio = img.width / Math.max(1, img.height);
    const boxRatio = w / Math.max(1, h);
    let sx = 0;
    let sy = 0;
    let sw = img.width;
    let sh = img.height;
    if (imgRatio > boxRatio) {
      sw = img.height * boxRatio;
      sx = (img.width - sw) / 2;
    } else if (imgRatio < boxRatio) {
      sh = img.width / boxRatio;
      sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
  ctx.filter = 'none';
  ctx.restore();

  if (el.borderColor && el.borderWidth && el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor;
    ctx.lineWidth = el.borderWidth;
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, Math.min(r, Math.min(w, h) / 2));
    ctx.stroke();
  }
}

function drawBadge(
  ctx: CanvasRenderingContext2D,
  el: BadgeElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.fillStyle = el.bgColor || '#dc2626';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 3;

  const r = el.badgeStyle === 'pill' ? h / 2 : 12;
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  ctx.fillStyle = el.textColor || '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const fSize = el.fontSize || 16;
  if (el.secondaryText) {
    ctx.font = `800 ${fSize}px "Outfit", sans-serif`;
    ctx.fillText(el.text, x + w / 2, y + h / 2 - fSize * 0.45);
    ctx.font = `600 ${Math.max(11, fSize * 0.72)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(el.secondaryText, x + w / 2, y + h / 2 + fSize * 0.55);
  } else {
    ctx.font = `800 ${fSize}px "Outfit", sans-serif`;
    ctx.fillText(el.text, x + w / 2, y + h / 2);
  }
}

async function drawQrCode(
  ctx: CanvasRenderingContext2D,
  el: QrCodeElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const qrSize = Math.min(w, h) - (el.label ? 24 : 8);
  const qrDataUrl = await QRCode.toDataURL(el.data || 'https://google.com', {
    color: {
      dark: el.qrColor || '#000000',
      light: el.bgColor || '#ffffff'
    },
    margin: 1,
    width: Math.round(qrSize * 2)
  });

  const qrImg = await preloadImage(qrDataUrl);

  ctx.fillStyle = el.bgColor || '#ffffff';
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 12;
  roundRect(ctx, x, y, w, h, 12);
  ctx.fill();

  const qrX = x + (w - qrSize) / 2;
  const qrY = x + (el.label ? 8 : (h - qrSize) / 2);
  ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

  if (el.label) {
    ctx.fillStyle = el.qrColor || '#000000';
    ctx.font = `700 11px "Outfit", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(el.label, x + w / 2, y + h - 6);
  }
}

// -------------------------------------------------------------
// HIGH RESOLUTION CANVA-STYLE CHARTS & GRAPHS RENDERER (16 TYPES)
// -------------------------------------------------------------
function formatChartVal(el: ChartElement, val: number): string {
  return `${el.valuePrefix || ''}${val}${el.valueSuffix || ''}`;
}

function getMutedTextColor(textColor?: string): string {
  if (!textColor) return '#94a3b8';
  const low = textColor.toLowerCase();
  if (low === '#000000' || low === '#0f172a' || low === '#1e293b' || low === '#171717') {
    return '#475569';
  }
  return '#94a3b8';
}

export function drawChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  // Draw card background if present and not transparent
  if (el.backgroundColor && el.backgroundColor !== 'transparent') {
    ctx.fillStyle = el.backgroundColor;
    const r = el.borderRadius ?? 16;
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();

    if (el.borderColor && el.borderWidth) {
      ctx.strokeStyle = el.borderColor;
      ctx.lineWidth = el.borderWidth;
      ctx.stroke();
    }
  }

  const primaryText = el.textColor || '#ffffff';
  const mutedText = getMutedTextColor(primaryText);

  // Padding
  const pad = 16;
  const innerX = x + pad;
  let innerY = y + pad;
  const innerW = Math.max(40, w - pad * 2);
  let innerH = Math.max(40, h - pad * 2);

  // Title & Subtitle
  if (el.title) {
    ctx.fillStyle = primaryText;
    ctx.font = '700 15px "Outfit", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(el.title, innerX, innerY);
    innerY += 20;
    innerH -= 20;

    if (el.subtitle) {
      ctx.fillStyle = mutedText;
      ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(el.subtitle, innerX, innerY);
      innerY += 16;
      innerH -= 16;
    }
  }

  const palette = el.colorPalette?.length
    ? el.colorPalette
    : ['#38bdf8', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#f97316'];

  switch (el.chartType) {
    case 'bar':
      drawBarChart(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'horizontal-bar':
      drawHorizontalBarChart(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'stacked-bar':
      drawStackedBarChart(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'pie':
      drawPieOrDonut(ctx, el, innerX, innerY, innerW, innerH, palette, false, primaryText, mutedText);
      break;
    case 'donut':
      drawPieOrDonut(ctx, el, innerX, innerY, innerW, innerH, palette, true, primaryText, mutedText);
      break;
    case 'semi-donut':
      drawSemiDonut(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'line':
      drawLineOrAreaChart(ctx, el, innerX, innerY, innerW, innerH, palette, 'line', primaryText, mutedText);
      break;
    case 'area':
      drawLineOrAreaChart(ctx, el, innerX, innerY, innerW, innerH, palette, 'area', primaryText, mutedText);
      break;
    case 'spline':
      drawLineOrAreaChart(ctx, el, innerX, innerY, innerW, innerH, palette, 'spline', primaryText, mutedText);
      break;
    case 'scatter':
      drawScatterChart(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'radar':
      drawRadarChart(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'funnel':
      drawFunnelChart(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText);
      break;
    case 'progress-ring':
      drawProgressRing(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'progress-bar':
      drawProgressBar(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'metric-kpi':
      drawMetricKpi(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
    case 'comparison-table':
      drawComparisonTable(ctx, el, innerX, innerY, innerW, innerH, palette, primaryText, mutedText);
      break;
  }
}

function drawGridlines(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  rows: number = 3
) {
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
  ctx.lineWidth = 1;
  for (let g = 0; g <= rows; g++) {
    const gy = y + (h / rows) * g;
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
    ctx.stroke();
  }
}

function drawBarChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  if (data.length === 0) return;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const bottomLabelH = 22;
  const topValueH = el.showValues ? 18 : 6;
  const chartH = Math.max(20, h - bottomLabelH - topValueH);
  const barGap = 12;
  const barW = Math.max(12, (w - barGap * (data.length - 1)) / data.length);

  if (el.showGridlines !== false) {
    drawGridlines(ctx, x, y + topValueH, w, chartH, 3);
  }

  data.forEach((item, i) => {
    const barX = x + i * (barW + barGap);
    const itemHeight = (item.value / maxVal) * chartH;
    const barY = y + topValueH + (chartH - itemHeight);
    const color = item.color || palette[i % palette.length];

    ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
    roundRect(ctx, barX, y + topValueH, barW, chartH, 6);
    ctx.fill();

    ctx.fillStyle = color;
    roundRect(ctx, barX, barY, barW, itemHeight, 6);
    ctx.fill();

    if (el.showValues) {
      ctx.fillStyle = primaryText;
      ctx.font = '700 11px "Outfit", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(formatChartVal(el, item.value), barX + barW / 2, barY - 2);
    }

    ctx.fillStyle = mutedText;
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const cleanLabel = item.label.length > 8 ? item.label.slice(0, 7) + '..' : item.label;
    ctx.fillText(cleanLabel, barX + barW / 2, y + topValueH + chartH + 4);
  });
}

function drawHorizontalBarChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  if (data.length === 0) return;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const labelW = Math.min(95, w * 0.28);
  const valW = el.showValues ? 46 : 8;
  const barAreaW = Math.max(40, w - labelW - valW - 12);
  const rowGap = 8;
  const rowH = Math.max(14, (h - rowGap * (data.length - 1)) / data.length);

  data.forEach((item, i) => {
    const rowY = y + i * (rowH + rowGap);
    const barW = (item.value / maxVal) * barAreaW;
    const color = item.color || palette[i % palette.length];

    ctx.fillStyle = mutedText;
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const cleanLabel = item.label.length > 11 ? item.label.slice(0, 10) + '..' : item.label;
    ctx.fillText(cleanLabel, x, rowY + rowH / 2);

    const trackX = x + labelW + 6;
    ctx.fillStyle = 'rgba(148, 163, 184, 0.1)';
    roundRect(ctx, trackX, rowY + 2, barAreaW, Math.max(8, rowH - 4), 6);
    ctx.fill();

    ctx.fillStyle = color;
    roundRect(ctx, trackX, rowY + 2, Math.max(6, barW), Math.max(8, rowH - 4), 6);
    ctx.fill();

    if (el.showValues) {
      ctx.fillStyle = primaryText;
      ctx.font = '700 11px "Outfit", monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatChartVal(el, item.value), x + w, rowY + rowH / 2);
    }
  });
}

function drawStackedBarChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  if (data.length === 0) return;

  const totals = data.map((d) => d.value + (d.secondaryValue ?? Math.round(d.value * 0.45)));
  const maxTotal = Math.max(...totals, 1);
  const bottomLabelH = 22;
  const topValueH = el.showValues ? 18 : 6;
  const chartH = Math.max(20, h - bottomLabelH - topValueH);
  const barGap = 12;
  const barW = Math.max(14, (w - barGap * (data.length - 1)) / data.length);

  if (el.showGridlines !== false) {
    drawGridlines(ctx, x, y + topValueH, w, chartH, 3);
  }

  data.forEach((item, i) => {
    const sec = item.secondaryValue ?? Math.round(item.value * 0.45);
    const total = item.value + sec;
    const barX = x + i * (barW + barGap);
    const h1 = (item.value / maxTotal) * chartH;
    const h2 = (sec / maxTotal) * chartH;
    const y1 = y + topValueH + (chartH - h1);
    const y2 = y1 - h2;

    ctx.fillStyle = palette[0] || '#38bdf8';
    roundRect(ctx, barX, y1, barW, h1, 4);
    ctx.fill();

    ctx.fillStyle = palette[1] || '#f59e0b';
    roundRect(ctx, barX, y2, barW, Math.max(4, h2 - 2), 4);
    ctx.fill();

    if (el.showValues) {
      ctx.fillStyle = primaryText;
      ctx.font = '700 10px "Outfit", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(formatChartVal(el, total), barX + barW / 2, y2 - 2);
    }

    ctx.fillStyle = mutedText;
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const cleanLabel = item.label.length > 8 ? item.label.slice(0, 7) + '..' : item.label;
    ctx.fillText(cleanLabel, barX + barW / 2, y + topValueH + chartH + 4);
  });
}

function drawPieOrDonut(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  isDonut: boolean,
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  if (data.length === 0) return;

  const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
  const legendH = el.showLegend ? 30 : 0;
  const chartH = Math.max(40, h - legendH);
  const radius = Math.max(16, Math.min(w, chartH) / 2 - 8);
  const centerX = x + w / 2;
  const centerY = y + chartH / 2;

  let startAngle = -Math.PI / 2;

  data.forEach((item, i) => {
    const sliceAngle = (item.value / total) * (Math.PI * 2);
    const endAngle = startAngle + sliceAngle;
    const color = item.color || palette[i % palette.length];

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle =
      el.backgroundColor && el.backgroundColor !== 'transparent' ? el.backgroundColor : '#0f172a';
    ctx.stroke();

    startAngle = endAngle;
  });

  if (isDonut) {
    const innerRadius = radius * 0.58;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle =
      el.backgroundColor && el.backgroundColor !== 'transparent' ? el.backgroundColor : '#0f172a';
    ctx.fill();

    ctx.fillStyle = primaryText;
    ctx.font = '800 18px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round((data[0]?.value / total) * 100)}%`, centerX, centerY - 4);

    ctx.font = '600 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = mutedText;
    ctx.fillText('JUMLA', centerX, centerY + 12);
  }

  if (el.showLegend) {
    const legendY = y + chartH + 8;
    const itemW = w / Math.min(data.length, 3);
    data.slice(0, 3).forEach((item, i) => {
      const legX = x + i * itemW;
      const color = item.color || palette[i % palette.length];
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(legX + 6, legendY + 6, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = mutedText;
      ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const pct = Math.round((item.value / total) * 100);
      ctx.fillText(`${item.label.slice(0, 8)} (${pct}%)`, legX + 14, legendY + 6);
    });
  }
}

function drawSemiDonut(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  if (data.length === 0) return;
  const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
  const legendH = el.showLegend ? 24 : 0;
  const availH = h - legendH;
  const radius = Math.max(20, Math.min(w / 2 - 12, availH - 12));
  const strokeW = Math.max(12, radius * 0.28);
  const centerX = x + w / 2;
  const centerY = y + availH - 10;

  let startAngle = Math.PI;
  data.forEach((item, i) => {
    const slice = (item.value / total) * Math.PI;
    const endAngle = startAngle + slice;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - strokeW / 2, startAngle, endAngle);
    ctx.strokeStyle = item.color || palette[i % palette.length];
    ctx.lineWidth = strokeW;
    ctx.stroke();
    startAngle = endAngle;
  });

  ctx.fillStyle = primaryText;
  ctx.font = '800 22px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(formatChartVal(el, total), centerX, centerY - 12);

  ctx.fillStyle = mutedText;
  ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('JUMLA KUU', centerX, centerY);

  if (el.showLegend) {
    const legY = y + availH + 6;
    const itemW = w / Math.min(data.length, 3);
    data.slice(0, 3).forEach((item, i) => {
      const legX = x + i * itemW;
      ctx.fillStyle = item.color || palette[i % palette.length];
      ctx.fillRect(legX, legY + 2, 8, 8);
      ctx.fillStyle = mutedText;
      ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(item.label.slice(0, 9), legX + 12, legY);
    });
  }
}

function drawLineOrAreaChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  mode: 'line' | 'area' | 'spline',
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  if (data.length < 2) return;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const bottomLabelH = 20;
  const topValH = 16;
  const chartH = Math.max(20, h - bottomLabelH - topValH);
  const stepX = (w - 20) / (data.length - 1);
  const startX = x + 10;
  const color = palette[0] || '#38bdf8';

  if (el.showGridlines !== false) {
    drawGridlines(ctx, x, y + topValH, w, chartH, 3);
  }

  const points = data.map((d, i) => ({
    x: startX + i * stepX,
    y: y + topValH + (chartH - (d.value / maxVal) * chartH),
    value: d.value,
    label: d.label
  }));

  const tracePath = () => {
    ctx.moveTo(points[0].x, points[0].y);
    if (mode === 'spline' && points.length > 2) {
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    } else {
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
    }
  };

  // Area under curve
  if (mode === 'area' || mode === 'line' || mode === 'spline') {
    ctx.beginPath();
    ctx.moveTo(points[0].x, y + topValH + chartH);
    ctx.lineTo(points[0].x, points[0].y);
    if (mode === 'spline' && points.length > 2) {
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    } else {
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
    }
    ctx.lineTo(points[points.length - 1].x, y + topValH + chartH);
    ctx.closePath();

    const areaGrad = ctx.createLinearGradient(0, y + topValH, 0, y + topValH + chartH);
    areaGrad.addColorStop(0, mode === 'area' ? `${color}88` : `${color}3a`);
    areaGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = areaGrad;
    ctx.fill();
  }

  ctx.beginPath();
  tracePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    if (el.showValues) {
      ctx.fillStyle = primaryText;
      ctx.font = '700 10px "Outfit", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(formatChartVal(el, p.value), p.x, p.y - 6);
    }

    ctx.fillStyle = mutedText;
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(p.label.slice(0, 7), p.x, y + topValH + chartH + 4);
  });
}

function drawScatterChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  if (data.length === 0) return;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const bottomLabelH = 20;
  const topValH = 16;
  const chartH = Math.max(20, h - bottomLabelH - topValH);
  const stepX = data.length > 1 ? (w - 30) / (data.length - 1) : 0;
  const startX = x + 15;

  if (el.showGridlines !== false) {
    drawGridlines(ctx, x, y + topValH, w, chartH, 4);
  }

  data.forEach((d, i) => {
    const px = data.length > 1 ? startX + i * stepX : x + w / 2;
    const py = y + topValH + (chartH - (d.value / maxVal) * chartH);
    const color = d.color || palette[i % palette.length];
    const dotR = 6 + (i % 3) * 2;

    ctx.beginPath();
    ctx.arc(px, py, dotR, 0, Math.PI * 2);
    ctx.fillStyle = `${color}cc`;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (el.showValues) {
      ctx.fillStyle = primaryText;
      ctx.font = '700 10px "Outfit", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(formatChartVal(el, d.value), px, py - dotR - 2);
    }

    ctx.fillStyle = mutedText;
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(d.label.slice(0, 7), px, y + topValH + chartH + 4);
  });
}

function drawRadarChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  const count = data.length;
  if (count < 3) {
    drawBarChart(ctx, el, x, y, w, h, palette, primaryText, mutedText);
    return;
  }

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const cx = x + w / 2;
  const cy = y + h / 2;
  const radius = Math.max(24, Math.min(w, h) / 2 - 22);
  const color = palette[0] || '#38bdf8';

  // Concentric radar rings
  for (let ring = 1; ring <= 3; ring++) {
    const r = (radius / 3) * ring;
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const ang = -Math.PI / 2 + (i * Math.PI * 2) / count;
      const px = cx + Math.cos(ang) * r;
      const py = cy + Math.sin(ang) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Axis lines & labels
  data.forEach((d, i) => {
    const ang = -Math.PI / 2 + (i * Math.PI * 2) / count;
    const px = cx + Math.cos(ang) * radius;
    const py = cy + Math.sin(ang) * radius;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.stroke();

    const lx = cx + Math.cos(ang) * (radius + 12);
    const ly = cy + Math.sin(ang) * (radius + 12);
    ctx.fillStyle = mutedText;
    ctx.font = '600 9px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(d.label.slice(0, 8), lx, ly);
  });

  // Data polygon
  ctx.beginPath();
  data.forEach((d, i) => {
    const ang = -Math.PI / 2 + (i * Math.PI * 2) / count;
    const r = (d.value / maxVal) * radius;
    const px = cx + Math.cos(ang) * r;
    const py = cy + Math.sin(ang) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fillStyle = `${color}55`;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

function drawFunnelChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string
) {
  const data = el.data || [];
  if (data.length === 0) return;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const gap = 4;
  const stageH = Math.max(16, (h - gap * (data.length - 1)) / data.length);
  const cx = x + w / 2;

  data.forEach((item, i) => {
    const sy = y + i * (stageH + gap);
    const topW = Math.max(w * 0.25, (item.value / maxVal) * w);
    const nextVal = data[i + 1]?.value ?? item.value * 0.72;
    const botW = Math.max(w * 0.2, (nextVal / maxVal) * w);
    const color = item.color || palette[i % palette.length];

    ctx.beginPath();
    ctx.moveTo(cx - topW / 2, sy);
    ctx.lineTo(cx + topW / 2, sy);
    ctx.lineTo(cx + botW / 2, sy + stageH);
    ctx.lineTo(cx - botW / 2, sy + stageH);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.fillStyle = primaryText;
    ctx.font = '700 11px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const text = el.showValues
      ? `${item.label}: ${formatChartVal(el, item.value)}`
      : item.label;
    ctx.fillText(text, cx, sy + stageH / 2);
  });
}

function drawProgressRing(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const pct = Math.min(100, Math.max(0, el.progressValue ?? 75));
  const radius = Math.max(18, Math.min(w, h) / 2 - 12);
  const centerX = x + w / 2;
  const centerY = y + h / 2 - 6;
  const strokeW = Math.max(8, radius * 0.18);
  const color = palette[0] || '#10b981';

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
  ctx.lineWidth = strokeW;
  ctx.stroke();

  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (pct / 100) * (Math.PI * 2);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeW;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.fillStyle = primaryText;
  ctx.font = `800 ${Math.round(radius * 0.55)}px "Outfit", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${pct}%`, centerX, centerY);

  if (el.progressLabel) {
    ctx.fillStyle = mutedText;
    ctx.font = '700 11px "Outfit", sans-serif';
    ctx.fillText(el.progressLabel, centerX, y + h - 8);
  }
}

function drawProgressBar(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const pct = Math.min(100, Math.max(0, el.progressValue ?? 75));
  const color = palette[0] || '#10b981';
  const barH = Math.min(28, Math.max(14, h * 0.22));
  const centerY = y + h / 2;

  ctx.fillStyle = primaryText;
  ctx.font = '800 26px "Outfit", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`${pct}%`, x, centerY - 6);

  if (el.progressLabel) {
    ctx.fillStyle = mutedText;
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(el.progressLabel, x + w, centerY - 8);
  }

  ctx.fillStyle = 'rgba(148, 163, 184, 0.16)';
  roundRect(ctx, x, centerY, w, barH, barH / 2);
  ctx.fill();

  ctx.fillStyle = color;
  roundRect(ctx, x, centerY, Math.max(barH, (pct / 100) * w), barH, barH / 2);
  ctx.fill();
}

function drawMetricKpi(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const value = el.kpiValue || '+148%';
  const label = el.kpiLabel || 'Ukuaji wa Mauzo ya Mwaka';
  const trend = el.kpiTrend || 'up';
  const color =
    trend === 'down' ? '#ef4444' : trend === 'neutral' ? '#f59e0b' : palette[0] || '#10b981';
  const badgeText = trend === 'down' ? '▼ IMESHUKA' : trend === 'neutral' ? '● THABITI' : '▲ INAKUA';

  const centerY = y + h / 2;

  ctx.fillStyle = `${color}25`;
  const badgeW = 98;
  const badgeH = 22;
  roundRect(ctx, x, y + 4, badgeW, badgeH, 6);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.font = '700 11px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, x + badgeW / 2, y + 4 + badgeH / 2);

  ctx.fillStyle = primaryText;
  ctx.font = '900 38px "Anton", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x, centerY + 6);

  ctx.fillStyle = mutedText;
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(label, x, y + h - 8);
}

function drawComparisonTable(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[],
  primaryText: string,
  mutedText: string
) {
  const data = el.data || [];
  if (data.length === 0) return;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const rowH = Math.max(20, Math.min(34, h / data.length));

  data.forEach((item, i) => {
    const ry = y + i * rowH;
    if (ry + rowH > y + h + 4) return;

    if (i % 2 === 0) {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
      roundRect(ctx, x, ry, w, rowH - 2, 6);
      ctx.fill();
    }

    const color = item.color || palette[i % palette.length];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + 12, ry + (rowH - 2) / 2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = primaryText;
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.label.slice(0, 18), x + 24, ry + (rowH - 2) / 2);

    // Mini proportional bar
    const miniW = Math.min(80, w * 0.26);
    const miniX = x + w - miniW - 58;
    if (miniW > 24) {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.14)';
      roundRect(ctx, miniX, ry + (rowH - 8) / 2, miniW, 6, 3);
      ctx.fill();
      ctx.fillStyle = color;
      roundRect(ctx, miniX, ry + (rowH - 8) / 2, (item.value / maxVal) * miniW, 6, 3);
      ctx.fill();
    }

    ctx.fillStyle = mutedText;
    ctx.font = '700 11px "Outfit", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(formatChartVal(el, item.value), x + w - 8, ry + (rowH - 2) / 2);
  });
}

// Helpers for shapes
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number = 0
) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawStarPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;

  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    let x = cx + Math.cos(rot) * outerRadius;
    let y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
}

function drawHeartPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const topCurveHeight = h * 0.3;
  ctx.moveTo(x + w / 2, y + h);
  ctx.bezierCurveTo(x, y + h * 0.7, x, y + topCurveHeight, x + w / 4, y);
  ctx.bezierCurveTo(x + w / 2, y, x + w / 2, y + topCurveHeight, x + w / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x + w / 2, y + topCurveHeight, x + w / 2, y, x + (w * 3) / 4, y);
  ctx.bezierCurveTo(x + w, y + topCurveHeight, x + w, y + h * 0.7, x + w / 2, y + h);
  ctx.closePath();
}

function drawRibbonPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const indent = h * 0.3;
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w - indent, y + h / 2);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + indent, y + h / 2);
  ctx.closePath();
}

function drawArrowPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const headW = Math.min(w * 0.45, h);
  const stemH = h * 0.4;
  ctx.moveTo(x, y + (h - stemH) / 2);
  ctx.lineTo(x + w - headW, y + (h - stemH) / 2);
  ctx.lineTo(x + w - headW, y);
  ctx.lineTo(x + w, y + h / 2);
  ctx.lineTo(x + w - headW, y + h);
  ctx.lineTo(x + w - headW, y + (h + stemH) / 2);
  ctx.lineTo(x, y + (h + stemH) / 2);
  ctx.closePath();
}

function drawPolygonPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  sides: number
) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = w / 2;
  const ry = h / 2;
  for (let i = 0; i < sides; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / sides;
    const px = cx + Math.cos(angle) * rx;
    const py = cy + Math.sin(angle) * ry;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function drawSpeechBubblePath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const bodyH = h * 0.78;
  const r = Math.min(18, w * 0.15, bodyH * 0.35);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + bodyH - r);
  ctx.quadraticCurveTo(x + w, y + bodyH, x + w - r, y + bodyH);
  ctx.lineTo(x + w * 0.42, y + bodyH);
  ctx.lineTo(x + w * 0.22, y + h);
  ctx.lineTo(x + w * 0.25, y + bodyH);
  ctx.lineTo(x + r, y + bodyH);
  ctx.quadraticCurveTo(x, y + bodyH, x, y + bodyH - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawWatermark(ctx: CanvasRenderingContext2D, project: PosterProject) {
  const wm = project.watermark;
  if (!wm || !wm.enabled || !wm.text?.trim()) return;

  const { width, height } = project;
  const text = wm.text.trim();
  const fontSize = Math.max(12, Math.min(96, wm.fontSize || 28));
  const rad = ((wm.angle ?? -28) * Math.PI) / 180;

  ctx.save();
  ctx.globalAlpha = Math.max(0.04, Math.min(0.85, wm.opacity ?? 0.22));
  ctx.fillStyle = wm.color || '#ffffff';
  ctx.font = `800 ${fontSize}px "Outfit", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (wm.pattern === 'single-center') {
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rad);
    ctx.font = `900 ${Math.round(fontSize * 1.6)}px "Outfit", sans-serif`;
    ctx.fillText(text, 0, 0);
  } else if (wm.pattern === 'bottom-corner') {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.font = `800 ${Math.max(14, Math.round(fontSize * 0.8))}px "Outfit", sans-serif`;
    ctx.fillText(text, width - 28, height - 22);
  } else {
    // tiled-diagonal
    const metrics = ctx.measureText(text);
    const stepX = Math.max(220, metrics.width + 90);
    const stepY = Math.max(140, fontSize * 4.5);

    ctx.translate(width / 2, height / 2);
    ctx.rotate(rad);
    const span = Math.hypot(width, height);
    for (let y = -span; y <= span; y += stepY) {
      for (let x = -span; x <= span; x += stepX) {
        ctx.fillText(text, x, y);
      }
    }
  }

  ctx.restore();
}

// High Quality Downloader Functions
export async function downloadPosterAsImage(
  project: PosterProject,
  format: 'png' | 'jpeg',
  scale: number = 2,
  quality: number = 0.95,
  transparentBg: boolean = false
): Promise<void> {
  const canvas = await renderPosterToCanvas(project, scale, transparentBg);

  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const dataUrl = canvas.toDataURL(mimeType, quality);

  const cleanTitle = (project.title || 'malosha_poster')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_');
  const filename = `${cleanTitle}_${scale}x_${Date.now()}.${format}`;

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadPosterAsPdf(
  project: PosterProject,
  scale: number = 2
): Promise<void> {
  const canvas = await renderPosterToCanvas(project, scale, false);
  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  const isLandscape = project.width > project.height;
  const pdf = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'pt',
    format: [project.width, project.height]
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, project.width, project.height);

  const cleanTitle = (project.title || 'malosha_poster')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_');
  pdf.save(`${cleanTitle}_print_${Date.now()}.pdf`);
}
