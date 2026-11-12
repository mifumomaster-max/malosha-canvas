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
  ChartElement,
  WatermarkConfig
} from '../types/poster';
import { drawChart } from '../utils/canvasRenderer';
import { SHAPES_100_MAP } from '../data/shapes100';
import { COLOR_EFFECT_MAP } from '../data/colorEffects';

interface CanvasAreaProps {
  project: PosterProject;
  selectedId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (updated: Partial<PosterElement>, commit?: boolean) => void;
  onCommitEdit?: () => void;
  zoom: number;
  showGrid: boolean;
  editingTextId?: string | null;
  onEditingTextIdChange?: (id: string | null) => void;
}

type DragMode = 'move' | 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w' | 'rotate' | null;

export const CanvasArea: React.FC<CanvasAreaProps> = React.memo(({
  project,
  selectedId,
  onSelectElement,
  onUpdateElement,
  onCommitEdit,
  zoom,
  showGrid,
  editingTextId: controlledEditingTextId,
  onEditingTextIdChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [localEditingTextId, setLocalEditingTextId] = useState<string | null>(null);
  const rafMoveRef = useRef<number | null>(null);
  const didMutateDuringDragRef = useRef<boolean>(false);

  const editingTextId =
    controlledEditingTextId !== undefined ? controlledEditingTextId : localEditingTextId;
  const setEditingTextId = (id: string | null) => {
    if (onEditingTextIdChange) {
      onEditingTextIdChange(id);
    } else {
      setLocalEditingTextId(id);
    }
  };

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
    if (editingTextId === element.id && mode === 'move') return;
    if (element.isLocked && mode !== 'move') return;
    e.stopPropagation();
    onSelectElement(element.id);

    if (element.isLocked) return;

    didMutateDuringDragRef.current = false;
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

    const clientX = e.clientX;
    const clientY = e.clientY;
    const shiftKey = e.shiftKey;

    if (rafMoveRef.current !== null) {
      cancelAnimationFrame(rafMoveRef.current);
    }

    rafMoveRef.current = requestAnimationFrame(() => {
      rafMoveRef.current = null;
      const dx = (clientX - dragStartRef.current.startX) / zoom;
      const dy = (clientY - dragStartRef.current.startY) / zoom;
      const { elemX, elemY, elemW, elemH } = dragStartRef.current;

      didMutateDuringDragRef.current = true;

      if (dragMode === 'move') {
        let newX = elemX + dx;
        let newY = elemY + dy;

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

        onUpdateElement({ x: Math.round(newX), y: Math.round(newY) }, false);
      } else if (dragMode === 'se') {
        const newW = Math.max(30, elemW + dx);
        const newH = Math.max(20, elemH + dy);
        onUpdateElement({ width: Math.round(newW), height: Math.round(newH) }, false);
      } else if (dragMode === 'sw') {
        const newW = Math.max(30, elemW - dx);
        const newH = Math.max(20, elemH + dy);
        onUpdateElement({ x: Math.round(elemX + dx), width: Math.round(newW), height: Math.round(newH) }, false);
      } else if (dragMode === 'ne') {
        const newW = Math.max(30, elemW + dx);
        const newH = Math.max(20, elemH - dy);
        onUpdateElement({ y: Math.round(elemY + dy), width: Math.round(newW), height: Math.round(newH) }, false);
      } else if (dragMode === 'nw') {
        const newW = Math.max(30, elemW - dx);
        const newH = Math.max(20, elemH - dy);
        onUpdateElement(
          {
            x: Math.round(elemX + dx),
            y: Math.round(elemY + dy),
            width: Math.round(newW),
            height: Math.round(newH)
          },
          false
        );
      } else if (dragMode === 'e') {
        const newW = Math.max(30, elemW + dx);
        onUpdateElement({ width: Math.round(newW) }, false);
      } else if (dragMode === 's') {
        const newH = Math.max(20, elemH + dy);
        onUpdateElement({ height: Math.round(newH) }, false);
      } else if (dragMode === 'rotate') {
        const rect = stageRef.current?.getBoundingClientRect();
        const elemCenterScreenX = rect
          ? rect.left + (elemX + elemW / 2) * zoom
          : (elemX + elemW / 2) * zoom;
        const elemCenterScreenY = rect
          ? rect.top + (elemY + elemH / 2) * zoom
          : (elemY + elemH / 2) * zoom;
        const radians = Math.atan2(clientY - elemCenterScreenY, clientX - elemCenterScreenX);
        let degrees = Math.round((radians * 180) / Math.PI) + 90;
        if (shiftKey) {
          degrees = Math.round(degrees / 15) * 15;
        }
        onUpdateElement({ rotation: degrees }, false);
      }
    });
  };

  const handlePointerUp = () => {
    if (rafMoveRef.current !== null) {
      cancelAnimationFrame(rafMoveRef.current);
      rafMoveRef.current = null;
    }
    const hadDrag = dragMode !== null && didMutateDuringDragRef.current;
    didMutateDuringDragRef.current = false;
    setDragMode(null);
    setSnapX(null);
    setSnapY(null);
    if (hadDrag) {
      onCommitEdit?.();
    }
  };

  useEffect(() => {
    return () => {
      if (rafMoveRef.current !== null) {
        cancelAnimationFrame(rafMoveRef.current);
      }
    };
  }, []);

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
      className="flex-1 bg-neutral-950 overflow-auto overscroll-contain flex p-4 pb-24 md:p-8 relative select-none"
      style={{
        backgroundImage: showGrid
          ? 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
          : undefined,
        backgroundSize: '24px 24px'
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Exact-sized Scaled Wrapper to prevent false overflow/scrollbars */}
      <div
        className="relative shrink-0 m-auto"
        style={{
          width: project.width * zoom,
          height: project.height * zoom
        }}
      >
        {/* Scaled Poster Stage */}
        <div
          ref={stageRef}
          className={`relative shadow-2xl border border-neutral-800 overflow-hidden ${
            dragMode ? '' : 'transition-transform duration-75'
          }`}
          style={{
            width: project.width,
            height: project.height,
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            ...getCanvasBackgroundStyle(),
            filter:
              project.colorEffect && project.colorEffect !== 'none'
                ? COLOR_EFFECT_MAP[project.colorEffect]?.cssFilter || undefined
                : undefined
          }}
        >
        {/* Color Effect Tint Overlay */}
        {project.colorEffect &&
          project.colorEffect !== 'none' &&
          COLOR_EFFECT_MAP[project.colorEffect]?.overlayColor && (
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                backgroundColor: COLOR_EFFECT_MAP[project.colorEffect].overlayColor,
                opacity: COLOR_EFFECT_MAP[project.colorEffect].overlayAlpha ?? 0.18,
                mixBlendMode: (COLOR_EFFECT_MAP[project.colorEffect].overlayBlend ||
                  'soft-light') as React.CSSProperties['mixBlendMode']
              }}
            />
          )}

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

        {/* Rule of Thirds & Safe Margin Design Guides when Grid is active */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none z-30">
            <div className="absolute inset-8 border border-dashed border-amber-400/35 rounded-sm" />
            <div className="absolute top-0 bottom-0 left-1/3 w-px bg-sky-400/25" />
            <div className="absolute top-0 bottom-0 left-2/3 w-px bg-sky-400/25" />
            <div className="absolute left-0 right-0 top-1/3 h-px bg-sky-400/25" />
            <div className="absolute left-0 right-0 top-2/3 h-px bg-sky-400/25" />
          </div>
        )}

        {/* Elements Stack */}
        {project.elements.map((el) => {
          const isSelected = el.id === selectedId;
          const isEditing = el.id === editingTextId;
          const cssBlendMode =
            el.blendMode && el.blendMode !== 'source-over' ? el.blendMode : undefined;

          return (
            <div
              key={el.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement(el.id);
              }}
              onPointerDown={(e) => handlePointerDown(e, 'move', el)}
              className={`absolute group touch-none ${
                dragMode ? '' : 'transition-shadow'
              } ${
                isSelected ? 'ring-2 ring-amber-400 z-40' : 'hover:ring-1 hover:ring-amber-400/50'
              } ${el.isLocked ? 'cursor-not-allowed' : 'cursor-move'}`}
              style={{
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
                transform: `rotate(${el.rotation || 0}deg)`,
                opacity: el.opacity ?? 1,
                mixBlendMode: cssBlendMode as React.CSSProperties['mixBlendMode']
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  transform:
                    el.flipX || el.flipY
                      ? `scale(${el.flipX ? -1 : 1}, ${el.flipY ? -1 : 1})`
                      : undefined
                }}
              >
              {/* Element Rendering */}
              {el.type === 'text' && (
                <RenderTextElement
                  element={el as TextElement}
                  isEditing={isEditing}
                  onTextChange={(val) => onUpdateElement({ text: val }, false)}
                  onDoubleClick={() => setEditingTextId(el.id)}
                  onBlur={() => {
                    setEditingTextId(null);
                    onCommitEdit?.();
                  }}
                />
              )}

              {el.type === 'shape' && <RenderShapeElement element={el as ShapeElement} />}

              {el.type === 'image' && <RenderImageElement element={el as ImageElement} />}

              {el.type === 'badge' && <RenderBadgeElement element={el as BadgeElement} />}

              {el.type === 'qrcode' && <RenderQrCodeElement element={el as QrCodeElement} />}

              {el.type === 'chart' && <RenderChartElement element={el as ChartElement} />}
              </div>

              {/* Selection Bounding Box & Transform Handles */}
              {isSelected && !el.isLocked && (
                <>
                  {/* Rotation handle */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'rotate', el)}
                    className="absolute -top-8 md:-top-7 left-1/2 -translate-x-1/2 w-5 h-5 md:w-4 md:h-4 bg-amber-400 border-2 border-black rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center shadow touch-none"
                    title="Zungusha (Rotate)"
                  >
                    <div className="w-1 h-1 bg-black rounded-full" />
                  </div>
                  <div className="absolute -top-3 left-1/2 w-0.5 h-3 bg-amber-400 -translate-x-1/2 pointer-events-none" />

                  {/* Corner Resize Handles */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'nw', el)}
                    className="absolute -top-2 -left-2 md:-top-1.5 md:-left-1.5 w-4 h-4 md:w-3 md:h-3 bg-white border border-amber-500 rounded-sm cursor-nwse-resize shadow-sm touch-none"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'ne', el)}
                    className="absolute -top-2 -right-2 md:-top-1.5 md:-right-1.5 w-4 h-4 md:w-3 md:h-3 bg-white border border-amber-500 rounded-sm cursor-nesw-resize shadow-sm touch-none"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'se', el)}
                    className="absolute -bottom-2 -right-2 md:-bottom-1.5 md:-right-1.5 w-4 h-4 md:w-3 md:h-3 bg-white border border-amber-500 rounded-sm cursor-nwse-resize shadow-sm touch-none"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'sw', el)}
                    className="absolute -bottom-2 -left-2 md:-bottom-1.5 md:-left-1.5 w-4 h-4 md:w-3 md:h-3 bg-white border border-amber-500 rounded-sm cursor-nesw-resize shadow-sm touch-none"
                  />

                  {/* Edge Resize Handles */}
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 'e', el)}
                    className="absolute top-1/2 -right-2 md:-right-1.5 -translate-y-1/2 w-3 h-4 md:w-2.5 md:h-3 bg-white border border-amber-500 rounded-sm cursor-ew-resize shadow-sm touch-none"
                  />
                  <div
                    onPointerDown={(e) => handlePointerDown(e, 's', el)}
                    className="absolute -bottom-2 md:-bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-3 md:w-3 md:h-2.5 bg-white border border-amber-500 rounded-sm cursor-ns-resize shadow-sm touch-none"
                  />
                </>
              )}
            </div>
          );
        })}

        {/* Live Watermark Overlay */}
        {project.watermark?.enabled && project.watermark.text?.trim() && (
          <RenderWatermarkOverlay
            watermark={project.watermark}
            width={project.width}
            height={project.height}
          />
        )}
        </div>
      </div>
    </div>
  );
});

// Sub-renderers
const RenderTextElement = React.memo<{
  element: TextElement;
  isEditing: boolean;
  onTextChange: (text: string) => void;
  onDoubleClick: () => void;
  onBlur: () => void;
}>(({ element, isEditing, onTextChange, onDoubleClick, onBlur }) => {
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
});

const buildPolygonPoints = (sides: number): string => {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI * 2) / sides;
    const x = 50 + Math.cos(ang) * 48;
    const y = 50 + Math.sin(ang) * 48;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(' ');
};

const buildStarPoints = (spikes: number, innerR: number): string => {
  const pts: string[] = [];
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  for (let i = 0; i < spikes; i++) {
    pts.push(`${(50 + Math.cos(rot) * 49).toFixed(1)},${(50 + Math.sin(rot) * 49).toFixed(1)}`);
    rot += step;
    pts.push(`${(50 + Math.cos(rot) * innerR).toFixed(1)},${(50 + Math.sin(rot) * innerR).toFixed(1)}`);
    rot += step;
  }
  return pts.join(' ');
};

const RenderShapeElement = React.memo<{ element: ShapeElement }>(({ element }) => {
  const { shapeType, fillColor, strokeColor, strokeWidth = 0, borderRadius = 0, shadowColor, shadowBlur } =
    element;

  const dropShadow = shadowColor && shadowBlur ? `drop-shadow(0 4px ${shadowBlur}px ${shadowColor})` : undefined;

  if (shapeType === 'frame-border') {
    return (
      <div
        className="w-full h-full"
        style={{
          borderColor: fillColor || '#fbbf24',
          borderWidth: `${Math.max(4, strokeWidth || 8)}px`,
          borderStyle: 'solid',
          borderRadius: `${borderRadius}px`,
          filter: dropShadow
        }}
      />
    );
  }

  if (shapeType === 'line') {
    return (
      <div className="w-full h-full flex items-center">
        <div
          className="w-full rounded-full"
          style={{
            height: `${Math.max(2, element.height)}px`,
            backgroundColor: fillColor || '#ffffff',
            filter: dropShadow
          }}
        />
      </div>
    );
  }

  if (shapeType === 'circle') {
    return (
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: fillColor,
          borderColor: strokeColor,
          borderWidth: strokeWidth ? `${strokeWidth}px` : undefined,
          borderStyle: strokeWidth ? 'solid' : undefined,
          filter: dropShadow
        }}
      />
    );
  }

  if (shapeType === 'pill') {
    return (
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: fillColor,
          borderColor: strokeColor,
          borderWidth: strokeWidth ? `${strokeWidth}px` : undefined,
          borderStyle: strokeWidth ? 'solid' : undefined,
          filter: dropShadow
        }}
      />
    );
  }

  if (shapeType === 'triangle') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <polygon points="50,2 98,98 2,98" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  if (shapeType === 'diamond') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <polygon points="50,2 98,50 50,98 2,50" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  if (shapeType === 'pentagon' || shapeType === 'hexagon' || shapeType === 'octagon') {
    const sides = shapeType === 'pentagon' ? 5 : shapeType === 'hexagon' ? 6 : 8;
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <polygon points={buildPolygonPoints(sides)} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  if (shapeType === 'star') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <polygon points={buildStarPoints(5, 22)} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  if (shapeType === 'burst') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <polygon points={buildStarPoints(12, 34)} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  if (shapeType === 'heart') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <path
          d="M 50,90 C 20,65 0,45 0,25 C 0,10 12,0 25,0 C 35,0 45,6 50,15 C 55,6 65,0 75,0 C 88,0 100,10 100,25 C 100,45 80,65 50,90 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  if (shapeType === 'badge-ribbon') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <polygon
          points="0,0 100,0 82,50 100,100 0,100 18,50"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  if (shapeType === 'speech-bubble') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <path
          d="M 12,4 H 88 Q 96,4 96,12 V 68 Q 96,76 88,76 H 42 L 22,96 L 26,76 H 12 Q 4,76 4,68 V 12 Q 4,4 12,4 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  if (shapeType === 'arrow') {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: dropShadow }}>
        <polygon
          points="0,35 60,35 60,10 100,50 60,90 60,65 0,65"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  // Look up any of the 100 vector shapes via SVG pathData
  const shapeDef = shapeType !== 'rectangle' ? SHAPES_100_MAP[shapeType] : undefined;
  if (shapeDef?.pathData) {
    return (
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ filter: dropShadow }}
      >
        <path
          d={shapeDef.pathData}
          fill={fillColor}
          fillRule="evenodd"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
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
        borderRadius: `${borderRadius}px`,
        filter: dropShadow
      }}
    />
  );
});

const RenderImageElement = React.memo<{ element: ImageElement }>(({ element }) => {
  const filterList: string[] = [];
  if (element.filterBrightness !== undefined && element.filterBrightness !== 100)
    filterList.push(`brightness(${element.filterBrightness}%)`);
  if (element.filterContrast !== undefined && element.filterContrast !== 100)
    filterList.push(`contrast(${element.filterContrast}%)`);
  if (element.filterSaturation !== undefined && element.filterSaturation !== 100)
    filterList.push(`saturate(${element.filterSaturation}%)`);
  if (element.filterGrayscale && element.filterGrayscale > 0)
    filterList.push(`grayscale(${element.filterGrayscale}%)`);
  if (element.filterSepia && element.filterSepia > 0)
    filterList.push(`sepia(${element.filterSepia}%)`);
  if (element.filterHueRotate && element.filterHueRotate > 0)
    filterList.push(`hue-rotate(${element.filterHueRotate}deg)`);
  if (element.filterInvert && element.filterInvert > 0)
    filterList.push(`invert(${element.filterInvert}%)`);
  if (element.filterBlur && element.filterBlur > 0)
    filterList.push(`blur(${element.filterBlur}px)`);

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
        decoding="async"
        className="w-full h-full object-cover pointer-events-none select-none"
        style={{ filter: filterList.join(' ') }}
      />
    </div>
  );
});

const RenderBadgeElement = React.memo<{ element: BadgeElement }>(({ element }) => {
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
});

const RenderQrCodeElement = React.memo<{ element: QrCodeElement }>(({ element }) => {
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
});

const RenderChartElement = React.memo<{ element: ChartElement }>(({ element }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 2, 2);
    const targetW = Math.round(element.width * dpr);
    const targetH = Math.round(element.height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, element.width, element.height);
    drawChart(ctx, element, 0, 0, element.width, element.height);
  }, [
    element.width,
    element.height,
    element.chartType,
    element.title,
    element.subtitle,
    element.data,
    element.colorPalette,
    element.showValues,
    element.showLegend,
    element.showGridlines,
    element.valuePrefix,
    element.valueSuffix,
    element.backgroundColor,
    element.textColor,
    element.borderRadius,
    element.borderColor,
    element.borderWidth,
    element.progressValue,
    element.progressLabel,
    element.kpiValue,
    element.kpiLabel,
    element.kpiTrend
  ]);

  return (
    <div className="w-full h-full relative pointer-events-none select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ width: `${element.width}px`, height: `${element.height}px` }}
      />
    </div>
  );
});

const RenderWatermarkOverlay = React.memo<{
  watermark: WatermarkConfig;
  width: number;
  height: number;
}>(({ watermark, width, height }) => {
  const text = watermark.text.trim();
  const fontSize = Math.max(12, Math.min(96, watermark.fontSize || 28));
  const angle = watermark.angle ?? -28;
  const opacity = Math.max(0.04, Math.min(0.85, watermark.opacity ?? 0.22));
  const color = watermark.color || '#ffffff';

  if (watermark.pattern === 'single-center') {
    return (
      <div
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden z-25"
        style={{ opacity }}
      >
        <span
          className="font-outfit font-black whitespace-nowrap"
          style={{
            color,
            fontSize: `${Math.round(fontSize * 1.6)}px`,
            transform: `rotate(${angle}deg)`
          }}
        >
          {text}
        </span>
      </div>
    );
  }

  if (watermark.pattern === 'bottom-corner') {
    return (
      <div
        className="absolute bottom-5 right-7 pointer-events-none select-none z-25"
        style={{ opacity }}
      >
        <span
          className="font-outfit font-extrabold whitespace-nowrap"
          style={{
            color,
            fontSize: `${Math.max(14, Math.round(fontSize * 0.8))}px`
          }}
        >
          {text}
        </span>
      </div>
    );
  }

  const cols = Math.max(2, Math.ceil(width / 260) + 1);
  const rows = Math.max(3, Math.ceil(height / 180) + 2);
  const items = Array.from({ length: cols * rows });

  return (
    <div
      className="absolute -inset-24 pointer-events-none select-none z-25 flex flex-wrap items-center justify-center content-center gap-x-20 gap-y-24 overflow-hidden"
      style={{
        opacity,
        transform: `rotate(${angle}deg)`
      }}
    >
      {items.map((_, i) => (
        <span
          key={i}
          className="font-outfit font-extrabold whitespace-nowrap"
          style={{ color, fontSize: `${fontSize}px` }}
        >
          {text}
        </span>
      ))}
    </div>
  );
});
