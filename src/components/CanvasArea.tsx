import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  PosterProject,
  PosterElement,
  TextElement,
  ShapeElement,
  ImageElement,
  BadgeElement,
  QrCodeElement,
  ChartElement
} from '../types/poster';
import { drawChart } from '../utils/canvasRenderer';

interface CanvasAreaProps {
  project: PosterProject;
  selectedId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (updated: Partial<PosterElement>) => void;
  zoom: number;
  showGrid: boolean;
}

type DragMode = 'move' | 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w' | 'rotate' | null;

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  project,
  selectedId,
  onSelectElement,
  onUpdateElement,
  zoom,
  showGrid
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  // Dragging / Resizing / Rotating state
  const [dragMode, setDragMode] = useState<DragMode>(null);
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    elemX: number;
    elemY: number;
    elemW: number;
    elemH: number;
    elemRot: number;
  }>({
    startX: 0,
    startY: 0,
    elemX: 0,
    elemY: 0,
    elemW: 0,
    elemH: 0,
    elemRot: 0
  });

  // Snapping guides
  const [snapX, setSnapX] = useState<number | null>(null);
  const [snapY, setSnapY] = useState<number | null>(null);

  const selectedElement = project.elements.find((el) => el.id === selectedId) || null;

  // Handle pointer down on element or handle
  const handlePointerDown = (
    e: React.PointerEvent,
    mode: DragMode,
    element: PosterElement
  ) => {
    if (element.isLocked && mode !== 'move') return;
    e.stopPropagation();
    onSelectElement(element.id);

    if (element.isLocked) return;

    setDragMode(mode);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elemX: element.x,
      elemY: element.y,
      elemW: element.width,
      elemH: element.height,
      elemRot: element.rotation || 0
    };

    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragMode || !selectedElement || selectedElement.isLocked) return;

    const dx = (e.clientX - dragStartRef.current.startX) / zoom;
    const dy = (e.clientY - dragStartRef.current.startY) / zoom;
    const { elemX, elemY, elemW, elemH, elemRot } = dragStartRef.current;

    if (dragMode === 'move') {
      let newX = elemX + dx;
      let newY = elemY + dy;

      // Smart Snapping to Canvas Center
      const centerX = newX + elemW / 2;
      const centerY = newY + elemH / 2;
      const targetCenterX = project.width / 2;
      const targetCenterY = project.height / 2;

      if (Math.abs(centerX - targetCenterX) < 8) {
        newX = targetCenterX - elemW / 2;
        setSnapX(targetCenterX);
      } else {
        setSnapX(null);
      }

      if (Math.abs(centerY - targetCenterY) < 8) {
        newY = targetCenterY - elemH / 2;
        setSnapY(targetCenterY);
      } else {
        setSnapY(null);
      }

      onUpdateElement({ x: Math.round(newX), y: Math.round(newY) });
    } else if (dragMode === 'se') {
      const newW = Math.max(30, elemW + dx);
      const newH = Math.max(20, elemH + dy);
      onUpdateElement({ width: Math.round(newW), height: Math.round(newH) });
    } else if (dragMode === 'sw') {
      const newW = Math.max(30, elemW - dx);
      const newH = Math.max(20, elemH + dy);
      onUpdateElement({ x: Math.round(elemX + dx), width: Math.round(newW), height: Math.round(newH) });
    } else if (dragMode === 'ne') {
      const newW = Math.max(30, elemW + dx);
      const newH = Math.max(20, elemH - dy);
      onUpdateElement({ y: Math.round(elemY + dy), width: Math.round(newW), height: Math.round(newH) });
    } else if (dragMode === 'nw') {
      const newW = Math.max(30, elemW - dx);
      const newH = Math.max(20, elemH - dy);
      onUpdateElement({
        x: Math.round(elemX + dx),
        y: Math.round(elemY + dy),
        width: Math.round(newW),
        height: Math.round(newH)
      });
    } else if (dragMode === 'e') {
      const newW = Math.max(30, elemW + dx);
      onUpdateElement({ width: Math.round(newW) });
    } else if (dragMode === 's') {
      const newH = Math.max(20, elemH + dy);
      onUpdateElement({ height: Math.round(newH) });
    } else if (dragMode === 'rotate') {
      // Calculate rotation angle relative to element center
      const elemCenterScreenX = (elemX + elemW / 2) * zoom;
      const elemCenterScreenY = (elemY + elemH / 2) * zoom;
      const radians = Math.atan2(e.clientY - elemCenterScreenY, e.clientX - elemCenterScreenX);
      let degrees = Math.round((radians * 180) / Math.PI) - 90;
      if (e.shiftKey) {
        // Snap to 15 degree increments
        degrees = Math.round(degrees / 15) * 15;
      }
      onUpdateElement({ rotation: degrees });
    }
  };

  const handlePointerUp = () => {
    setDragMode(null);
    setSnapX(null);
    setSnapY(null);
  };

  // Keyboard nudge & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingTextId || !selectedElement) return;

      if (e.key === 'Escape') {
        onSelectElement(null);
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        let newX = selectedElement.x;
        let newY = selectedElement.y;

        if (e.key === 'ArrowUp') newY -= step;
        if (e.key === 'ArrowDown') newY += step;
        if (e.key === 'ArrowLeft') newX -= step;
        if (e.key === 'ArrowRight') newX += step;

        onUpdateElement({ x: newX, y: newY });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, editingTextId, onSelectElement, onUpdateElement]);

  // Construct background styles
  const getCanvasBackgroundStyle = (): React.CSSProperties => {
    const bg = project.background;
    if (bg.type === 'color') {
      return { backgroundColor: bg.color || '#ffffff' };
    }
    if (bg.type === 'gradient' && bg.gradient) {
      const { angle = 180, stops } = bg.gradient;
      const stopStr = stops.map((s) => `${s.color} ${s.offset * 100}%`).join(', ');
      return {
        background: `linear-gradient(${angle}deg, ${stopStr})`
      };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return {
        backgroundImage: `url(${bg.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return { backgroundColor: '#ffffff' };
  };

  return (
    <div
      ref={containerRef}
      onClick={() => {
        onSelectElement(null);
        setEditingTextId(null);
      }}
      className="flex-1 bg-neutral-950 overflow-auto flex items-center justify-center p-8 relative select-none"
      style={{
        backgroundImage: showGrid
          ? 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
          : undefined,
        backgroundSize: '24px 24px'
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Scaled Poster Stage */}
      <div
        className="relative shadow-2xl transition-transform duration-75 origin-center shrink-0 border border-neutral-800"
        style={{
          width: project.width,
          height: project.height,
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          ...getCanvasBackgroundStyle()
        }}
      >
        {/* Background Overlay (if image has opacity) */}
        {project.background.type === 'image' &&
          project.background.overlayOpacity &&
          project.background.overlayOpacity > 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: project.background.overlayColor || '#000000',
                opacity: project.background.overlayOpacity
              }}
            />
          )}

        {/* Snapping Center Guidelines */}
        {snapX !== null && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-50 pointer-events-none shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            style={{ left: snapX }}
          />
        )}
        {snapY !== null && (
          <div
            className="absolute left-0 right-0 h-0.5 bg-amber-400 z-50 pointer-events-none shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            style={{ top: snapY }}
          />
        )}

        {/* Elements Stack */}
        {project.elements.map((el) => {
          const isSelected = el.id === selectedId;
          const isEditing = el.id === editingTextId;

          return (
            <div
              key={el.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement(el.id);
              }}
              onPointerDown={(e) => handlePointerDown(e, 'move', el)}
              className={`absolute group transition-shadow ${
                isSelected ? 'ring-2 ring-amber-400 z-40' : 'hover:ring-1 hover:ring-amber-400/50'
              } ${el.isLocked ? 'cursor-not-allowed' : 'cursor-move'}`}
              style={{
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
                transform: `rotate(${el.rotation || 0}deg)`,
                opacity: el.opacity ?? 1
              }}
            >
              {/* Element Rendering */}
              {el.type === 'text' && (
                <RenderTextElement
                  element={el as TextElement}
                  isEditing={isEditing}
                  onTextChange={(val) => onUpdateElement({ text: val })}
                  onDoubleClick={() => setEditingTextId(el.id)}
                  onBlur={() => setEditingTextId(null)}
                />
              )}

              {el.type === 'shape' && <RenderShapeElement element={el as ShapeElement} />}

              {el.type === 'image' && <RenderImageElement element={el as ImageElement} />}

              {el.type === 'badge' && <RenderBadgeElement element={el as BadgeElement} />}

              {el.type === 'qrcode' && <RenderQrCodeElement element={el as QrCodeElement} />}

              {el.type === 'chart' && <RenderChartElement element={el as ChartElement} />}

              {/* Selection Bounding Box & Transform Handles */}
              {isSelected && !el.isLocked && (
                <>
                  {/* Rotation handle */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'rotate', el)}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 border-2 border-black rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center shadow"
                    title="Zungusha (Rotate)"
                  >
                    <div className="w-1 h-1 bg-black rounded-full" />
                  </div>
                  <div className="absolute -top-3 left-1/2 w-0.5 h-3 bg-amber-400 -translate-x-1/2 pointer-events-none" />

                  {/* Corner Resize Handles */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'nw', el)}
                    className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-amber-500 rounded-sm cursor-nwse-resize shadow-sm"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'ne', el)}
                    className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-amber-500 rounded-sm cursor-nesw-resize shadow-sm"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'se', el)}
                    className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-amber-500 rounded-sm cursor-nwse-resize shadow-sm"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'sw', el)}
                    className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-amber-500 rounded-sm cursor-nesw-resize shadow-sm"
                  />

                  {/* Edge Resize Handles */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'e', el)}
                    className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-3 bg-white border border-amber-500 rounded-sm cursor-ew-resize shadow-sm"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 's', el)}
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-2.5 bg-white border border-amber-500 rounded-sm cursor-ns-resize shadow-sm"
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Sub-renderers
const RenderTextElement: React.FC<{
  element: TextElement;
  isEditing: boolean;
  onTextChange: (text: string) => void;
  onDoubleClick: () => void;
  onBlur: () => void;
}> = ({ element, isEditing, onTextChange, onDoubleClick, onBlur }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const style: React.CSSProperties = {
    fontFamily: `"${element.fontFamily || 'Plus Jakarta Sans'}", sans-serif`,
    fontSize: `${element.fontSize}px`,
    fontWeight: element.fontWeight || 'normal',
    fontStyle: element.fontStyle || 'normal',
    textDecoration: element.textDecoration || 'none',
    color: element.color || '#ffffff',
    textAlign: element.textAlign || 'left',
    lineHeight: element.lineHeight || 1.2,
    letterSpacing: `${element.letterSpacing || 0}px`,
    backgroundColor: element.backgroundColor || 'transparent',
    borderRadius: element.borderRadius ? `${element.borderRadius}px` : undefined,
    textShadow: element.shadowColor
      ? `${element.shadowOffsetX || 0}px ${element.shadowOffsetY || 4}px ${
          element.shadowBlur || 8
        }px ${element.shadowColor}`
      : undefined,
    WebkitTextStroke:
      element.strokeColor && element.strokeWidth
        ? `${element.strokeWidth}px ${element.strokeColor}`
        : undefined
  };

  if (isEditing) {
    return (
      <textarea
        ref={textareaRef}
        value={element.text}
        onChange={(e) => onTextChange(e.target.value)}
        onBlur={onBlur}
        className="w-full h-full bg-neutral-900/90 text-white p-1 border border-amber-400 rounded outline-none resize-none"
        style={style}
      />
    );
  }

  return (
    <div
      onDoubleClick={onDoubleClick}
      className="w-full h-full whitespace-pre-wrap select-none p-1 overflow-hidden"
      style={style}
      title="Bofya mara mbili kubadili maandishi"
    >
      {element.text}
    </div>
  );
};

const RenderShapeElement: React.FC<{ element: ShapeElement }> = ({ element }) => {
  const { shapeType, fillColor, strokeColor, strokeWidth = 0, borderRadius = 0 } = element;

  if (shapeType === 'circle') {
    return (
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: fillColor,
          borderColor: strokeColor,
          borderWidth: strokeWidth ? `${strokeWidth}px` : undefined,
          borderStyle: strokeWidth ? 'solid' : undefined
        }}
      />
    );
  }

  if (shapeType === 'triangle') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon
          points="50,0 100,100 0,100"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  if (shapeType === 'star') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon
          points="50,0 65,35 100,35 72,57 82,92 50,70 18,92 28,57 0,35 35,35"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  if (shapeType === 'heart') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 50,90 C 20,65 0,45 0,25 C 0,10 12,0 25,0 C 35,0 45,6 50,15 C 55,6 65,0 75,0 C 88,0 100,10 100,25 C 100,45 80,65 50,90 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  if (shapeType === 'arrow') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon
          points="0,35 60,35 60,10 100,50 60,90 60,65 0,65"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  // Rectangle / default
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: fillColor,
        borderColor: strokeColor,
        borderWidth: strokeWidth ? `${strokeWidth}px` : undefined,
        borderStyle: strokeWidth ? 'solid' : undefined,
        borderRadius: `${borderRadius}px`
      }}
    />
  );
};

const RenderImageElement: React.FC<{ element: ImageElement }> = ({ element }) => {
  const filterList: string[] = [];
  if (element.filterBrightness && element.filterBrightness !== 100)
    filterList.push(`brightness(${element.filterBrightness}%)`);
  if (element.filterContrast && element.filterContrast !== 100)
    filterList.push(`contrast(${element.filterContrast}%)`);
  if (element.filterSaturation && element.filterSaturation !== 100)
    filterList.push(`saturate(${element.filterSaturation}%)`);

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        borderRadius: `${element.borderRadius || 0}px`,
        borderColor: element.borderColor,
        borderWidth: element.borderWidth ? `${element.borderWidth}px` : undefined,
        borderStyle: element.borderWidth ? 'solid' : undefined
      }}
    >
      <img
        src={element.src}
        alt={element.alt || 'Poster Element'}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover pointer-events-none select-none"
        style={{ filter: filterList.join(' ') }}
      />
    </div>
  );
};

const RenderBadgeElement: React.FC<{ element: BadgeElement }> = ({ element }) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-2 text-center shadow-lg transition-transform ${
        element.badgeStyle === 'pill' ? 'rounded-full' : 'rounded-xl'
      }`}
      style={{
        backgroundColor: element.bgColor || '#dc2626',
        color: element.textColor || '#ffffff'
      }}
    >
      <span
        className="font-extrabold uppercase font-outfit tracking-wide leading-tight"
        style={{ fontSize: `${element.fontSize || 16}px` }}
      >
        {element.text}
      </span>
      {element.secondaryText && (
        <span
          className="font-semibold text-neutral-100 opacity-95 tracking-normal leading-tight mt-0.5"
          style={{ fontSize: `${Math.max(11, (element.fontSize || 16) * 0.72)}px` }}
        >
          {element.secondaryText}
        </span>
      )}
    </div>
  );
};

const RenderQrCodeElement: React.FC<{ element: QrCodeElement }> = ({ element }) => {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(element.data || 'https://google.com', {
      margin: 1,
      color: {
        dark: element.qrColor || '#000000',
        light: element.bgColor || '#ffffff'
      }
    }).then((url) => {
      if (isMounted) setQrUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [element.data, element.qrColor, element.bgColor]);

  return (
    <div
      className="w-full h-full rounded-xl p-2 flex flex-col items-center justify-center shadow-md select-none"
      style={{ backgroundColor: element.bgColor || '#ffffff' }}
    >
      {qrUrl ? (
        <img
          src={qrUrl}
          alt="QR Code"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain pointer-events-none"
        />
      ) : (
        <div className="w-full h-full bg-neutral-200 animate-pulse rounded" />
      )}
      {element.label && (
        <span
          className="text-[10px] font-bold text-center font-outfit leading-tight mt-0.5"
          style={{ color: element.qrColor || '#000000' }}
        >
          {element.label}
        </span>
      )}
    </div>
  );
};

const RenderChartElement: React.FC<{ element: ChartElement }> = ({ element }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 2;
    canvas.width = Math.round(element.width * dpr);
    canvas.height = Math.round(element.height * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, element.width, element.height);
    drawChart(ctx, element, 0, 0, element.width, element.height);
  }, [element]);

  return (
    <div className="w-full h-full relative pointer-events-none select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ width: `${element.width}px`, height: `${element.height}px` }}
      />
    </div>
  );
};
