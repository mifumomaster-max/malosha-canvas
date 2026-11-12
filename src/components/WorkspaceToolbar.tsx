import React from 'react';
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Check
} from 'lucide-react';
import { CANVAS_PRESETS } from '../data/defaultTemplates';

interface WorkspaceToolbarProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  width: number;
  height: number;
  onDimensionChange: (w: number, h: number, name: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onFitToScreen: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  isSaved: boolean;
  onSaveToLocalStorage: () => void;
}

export const WorkspaceToolbar: React.FC<WorkspaceToolbarProps> = React.memo(({
  title,
  onTitleChange,
  width,
  height,
  onDimensionChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  zoom,
  onZoomChange,
  onFitToScreen,
  showGrid,
  onToggleGrid,
  isSaved,
  onSaveToLocalStorage
}) => {
  const handleDimSelect = (val: string) => {
    const [w, h] = val.split('x').map(Number);
    const found = CANVAS_PRESETS.find((p) => p.width === w && p.height === h);
    onDimensionChange(w, h, found ? found.name : 'Custom');
  };

  return (
    <div className="bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 px-2.5 md:px-4 py-1.5 md:py-0 md:h-12 flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 md:gap-3 text-xs text-neutral-300 z-20 shrink-0 w-full">
      {/* Row 1 (Mobile full width) / Left (Desktop): Title, Save, Undo, Redo */}
      <div className="flex items-center justify-between md:justify-start gap-1.5 md:gap-3 w-full md:w-auto min-w-0">
        <div className="flex items-center gap-1.5 md:gap-2 flex-1 md:flex-initial min-w-0">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="flex-1 min-w-0 md:flex-initial bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-800 text-white font-medium px-2.5 py-1.5 md:py-1 rounded border border-neutral-700/60 focus:border-amber-400 focus:outline-none text-xs md:w-56 truncate transition-colors"
            placeholder="Jina la Bango..."
          />
          <button
            onClick={onSaveToLocalStorage}
            className="min-h-[34px] md:min-h-0 flex items-center gap-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Hifadhi mradi huu kwenye kivinjari"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px] font-semibold">Imehifadhiwa</span>
              </>
            ) : (
              <span className="text-[11px] font-semibold">Hifadhi</span>
            )}
          </button>
        </div>

        <div className="h-4 w-px bg-neutral-800 hidden md:block" />

        {/* History actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`min-h-[34px] min-w-[34px] md:min-h-0 md:min-w-0 flex items-center justify-center p-1.5 rounded border border-neutral-800 md:border-transparent transition-colors ${
              canUndo
                ? 'text-neutral-200 hover:bg-neutral-800 cursor-pointer'
                : 'text-neutral-600 cursor-not-allowed'
            }`}
            title="Rudisha Nyuma (Undo Ctrl+Z)"
            aria-label="Rudisha Nyuma"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`min-h-[34px] min-w-[34px] md:min-h-0 md:min-w-0 flex items-center justify-center p-1.5 rounded border border-neutral-800 md:border-transparent transition-colors ${
              canRedo
                ? 'text-neutral-200 hover:bg-neutral-800 cursor-pointer'
                : 'text-neutral-600 cursor-not-allowed'
            }`}
            title="Mbele (Redo Ctrl+Y)"
            aria-label="Sogeza Mbele"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 2 (Mobile full width) / Center+Right (Desktop): Canvas Size, Grid, Zoom */}
      <div className="flex items-center justify-between md:justify-end gap-1.5 md:gap-3 w-full md:w-auto min-w-0">
        {/* Canvas Size Dropdown Selector */}
        <div className="flex items-center gap-2 flex-1 md:flex-initial min-w-0">
          <span className="text-neutral-400 hidden lg:inline shrink-0">Ukubwa wa Bango:</span>
          <select
            value={`${width}x${height}`}
            onChange={(e) => handleDimSelect(e.target.value)}
            className="w-full md:w-auto min-h-[34px] md:min-h-0 bg-neutral-800 border border-neutral-700 text-neutral-100 rounded px-2 md:px-2.5 py-1 text-[11px] md:text-xs focus:outline-none focus:border-amber-400 cursor-pointer font-medium truncate"
            aria-label="Ukubwa wa Bango"
          >
            {CANVAS_PRESETS.map((preset) => (
              <option key={preset.id} value={`${preset.width}x${preset.height}`}>
                {preset.labelSwahili} ({preset.width}×{preset.height})
              </option>
            ))}
          </select>
          <span className="font-mono text-neutral-400 hidden xl:inline text-[11px] tabular-nums shrink-0">
            {width} × {height} px
          </span>
        </div>

        {/* Grid & Zoom controls */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <button
            onClick={onToggleGrid}
            className={`min-h-[34px] min-w-[34px] md:min-h-0 md:min-w-0 flex items-center justify-center p-1.5 rounded border transition-colors cursor-pointer ${
              showGrid
                ? 'bg-amber-400/15 border-amber-400/50 text-amber-400'
                : 'border-neutral-800 md:border-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            title="Onyesha Gridi ya Mistari (Grid)"
            aria-label="Gridi ya Mistari"
          >
            <Grid className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-neutral-800 hidden md:block" />

          <div className="flex items-center gap-0.5 bg-neutral-800/80 rounded border border-neutral-700/60 p-0.5">
            <button
              onClick={() => onZoomChange(Math.max(0.2, zoom - 0.1))}
              className="min-h-[28px] min-w-[28px] md:min-h-0 md:min-w-0 flex items-center justify-center p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Punguza Ukubwa (Zoom Out)"
              aria-label="Punguza Ukubwa"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono text-[11px] px-1 text-neutral-300 tabular-nums min-w-9 text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={() => onZoomChange(Math.min(2.5, zoom + 0.1))}
              className="min-h-[28px] min-w-[28px] md:min-h-0 md:min-w-0 flex items-center justify-center p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Ongeza Ukubwa (Zoom In)"
              aria-label="Ongeza Ukubwa"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onFitToScreen}
              className="min-h-[28px] min-w-[28px] md:min-h-0 md:min-w-0 flex items-center justify-center p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Weka Ienee Kwenye Kioo (Fit to Screen)"
              aria-label="Eneza Kwenye Skrini"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
