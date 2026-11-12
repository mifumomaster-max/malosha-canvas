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

  return canvas;
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
      drawStarPath(ctx, x + w / 2, y + h / 2, 5, w / 2, w / 4);
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
    case 'line': {
      ctx.moveTo(x, y + h / 2);
      ctx.lineTo(x + w, y + h / 2);
      break;
    }
    case 'arrow': {
      drawArrowPath(ctx, x, y, w, h);
      break;
    }
    case 'rectangle':
    default: {
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
  if (r > 0) {
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, r);
    ctx.clip();
  }

  const filters: string[] = [];
  if (el.filterBrightness && el.filterBrightness !== 100)
    filters.push(`brightness(${el.filterBrightness}%)`);
  if (el.filterContrast && el.filterContrast !== 100)
    filters.push(`contrast(${el.filterContrast}%)`);
  if (el.filterSaturation && el.filterSaturation !== 100)
    filters.push(`saturate(${el.filterSaturation}%)`);
  if (el.filterGrayscale && el.filterGrayscale > 0)
    filters.push(`grayscale(${el.filterGrayscale}%)`);
  if (el.filterBlur && el.filterBlur > 0) filters.push(`blur(${el.filterBlur}px)`);

  if (filters.length > 0) {
    ctx.filter = filters.join(' ');
  }

  ctx.drawImage(img, x, y, w, h);
  ctx.filter = 'none';

  if (el.borderColor && el.borderWidth && el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor;
    ctx.lineWidth = el.borderWidth;
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, r);
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
// HIGH RESOLUTION CANVA-STYLE CHARTS & GRAPHS RENDERER
// -------------------------------------------------------------
export function drawChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  // Draw card background if present
  if (el.backgroundColor) {
    ctx.fillStyle = el.backgroundColor;
    const r = el.borderRadius || 16;
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();

    if (el.borderColor && el.borderWidth) {
      ctx.strokeStyle = el.borderColor;
      ctx.lineWidth = el.borderWidth;
      ctx.stroke();
    }
  }

  // Padding
  const pad = 16;
  const innerX = x + pad;
  let innerY = y + pad;
  const innerW = w - pad * 2;
  let innerH = h - pad * 2;

  // Title & Subtitle
  if (el.title) {
    ctx.fillStyle = el.textColor || '#ffffff';
    ctx.font = '700 15px "Outfit", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(el.title, innerX, innerY);
    innerY += 20;
    innerH -= 20;

    if (el.subtitle) {
      ctx.fillStyle = '#94a3b8';
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
      drawBarChart(ctx, el, innerX, innerY, innerW, innerH, palette);
      break;
    case 'pie':
      drawPieOrDonut(ctx, el, innerX, innerY, innerW, innerH, palette, false);
      break;
    case 'donut':
      drawPieOrDonut(ctx, el, innerX, innerY, innerW, innerH, palette, true);
      break;
    case 'line':
      drawLineChart(ctx, el, innerX, innerY, innerW, innerH, palette);
      break;
    case 'progress-ring':
      drawProgressRing(ctx, el, innerX, innerY, innerW, innerH, palette);
      break;
    case 'metric-kpi':
      drawMetricKpi(ctx, el, innerX, innerY, innerW, innerH, palette);
      break;
  }
}

function drawBarChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[]
) {
  const data = el.data || [];
  if (data.length === 0) return;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const bottomLabelH = 22;
  const topValueH = el.showValues ? 18 : 6;
  const chartH = h - bottomLabelH - topValueH;
  const barGap = 12;
  const barW = Math.max(12, (w - barGap * (data.length - 1)) / data.length);

  data.forEach((item, i) => {
    const barX = x + i * (barW + barGap);
    const itemHeight = (item.value / maxVal) * chartH;
    const barY = y + topValueH + (chartH - itemHeight);
    const color = item.color || palette[i % palette.length];

    // Background track
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    roundRect(ctx, barX, y + topValueH, barW, chartH, 6);
    ctx.fill();

    // Bar fill
    ctx.fillStyle = color;
    roundRect(ctx, barX, barY, barW, itemHeight, 6);
    ctx.fill();

    // Top value text
    if (el.showValues) {
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 11px "Outfit", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${item.value}`, barX + barW / 2, barY - 2);
    }

    // Bottom label text
    ctx.fillStyle = '#94a3b8';
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
  isDonut: boolean
) {
  const data = el.data || [];
  if (data.length === 0) return;

  const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
  const legendH = el.showLegend ? 32 : 0;
  const chartH = h - legendH;
  const radius = Math.min(w, chartH) / 2 - 8;
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
    ctx.strokeStyle = el.backgroundColor || '#0f172a';
    ctx.stroke();

    startAngle = endAngle;
  });

  // Donut inner cutout
  if (isDonut) {
    const innerRadius = radius * 0.58;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = el.backgroundColor || '#0f172a';
    ctx.fill();

    // Center text
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round((data[0]?.value / total) * 100)}%`, centerX, centerY - 4);

    ctx.font = '600 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('JUMLA', centerX, centerY + 12);
  }

  // Legend at bottom
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

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const pct = Math.round((item.value / total) * 100);
      ctx.fillText(`${item.label} (${pct}%)`, legX + 14, legendY + 6);
    });
  }
}

function drawLineChart(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[]
) {
  const data = el.data || [];
  if (data.length < 2) return;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const bottomLabelH = 20;
  const topValH = 16;
  const chartH = h - bottomLabelH - topValH;
  const stepX = (w - 20) / (data.length - 1);
  const startX = x + 10;
  const color = palette[0] || '#38bdf8';

  // Gridlines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  for (let g = 0; g <= 3; g++) {
    const gy = y + topValH + (chartH / 3) * g;
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
    ctx.stroke();
  }

  // Points coordinates
  const points = data.map((d, i) => ({
    x: startX + i * stepX,
    y: y + topValH + (chartH - (d.value / maxVal) * chartH),
    value: d.value,
    label: d.label
  }));

  // Area under curve
  ctx.beginPath();
  ctx.moveTo(points[0].x, y + topValH + chartH);
  points.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, y + topValH + chartH);
  ctx.closePath();

  const areaGrad = ctx.createLinearGradient(0, y + topValH, 0, y + topValH + chartH);
  areaGrad.addColorStop(0, `${color}44`);
  areaGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = areaGrad;
  ctx.fill();

  // Line stroke
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Points dots & labels
  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    if (el.showValues) {
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 10px "Outfit", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${p.value}`, p.x, p.y - 6);
    }

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(p.label, p.x, y + topValH + chartH + 4);
  });
}

function drawProgressRing(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[]
) {
  const pct = Math.min(100, Math.max(0, el.progressValue ?? 75));
  const radius = Math.min(w, h) / 2 - 12;
  const centerX = x + w / 2;
  const centerY = y + h / 2 - 6;
  const strokeW = Math.max(8, radius * 0.18);
  const color = palette[0] || '#10b981';

  // Background ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = strokeW;
  ctx.stroke();

  // Foreground active arc
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (pct / 100) * (Math.PI * 2);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeW;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Center percentage
  ctx.fillStyle = '#ffffff';
  ctx.font = `800 ${Math.round(radius * 0.55)}px "Outfit", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${pct}%`, centerX, centerY);

  // Bottom label
  if (el.progressLabel) {
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 11px "Outfit", sans-serif';
    ctx.fillText(el.progressLabel, centerX, y + h - 8);
  }
}

function drawMetricKpi(
  ctx: CanvasRenderingContext2D,
  el: ChartElement,
  x: number,
  y: number,
  w: number,
  h: number,
  palette: string[]
) {
  const value = el.kpiValue || '+148%';
  const label = el.kpiLabel || 'Ukuaji wa Mauzo ya Mwaka';
  const color = palette[0] || '#10b981';

  const centerY = y + h / 2;

  // Trend Badge
  ctx.fillStyle = `${color}25`;
  const badgeW = 90;
  const badgeH = 22;
  roundRect(ctx, x, y + 4, badgeW, badgeH, 6);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.font = '700 11px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('▲ INAKUA', x + badgeW / 2, y + 4 + badgeH / 2);

  // Big KPI figure
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 38px "Anton", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x, centerY + 6);

  // Subtitle
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(label, x, y + h - 8);
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
  const headW = h;
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
