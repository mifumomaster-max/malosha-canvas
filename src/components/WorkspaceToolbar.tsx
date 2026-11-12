import React from 'react';
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Check,
  Smartphone,
  Square,
  FileText,
  Monitor
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

export const WorkspaceToolbar: React.FC<WorkspaceToolbarProps> = ({
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
  return (
    <div className="h-12 bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-800 px-4 flex items-center justify-between text-xs text-neutral-300 z-20 shrink-0">
      {/* Left: Project title and quick save */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-800 text-white font-medium px-2.5 py-1 rounded border border-neutral-700/60 focus:border-amber-400 focus:outline-none text-xs w-48 sm:w-60 truncate transition-colors"
            placeholder="Jina la Bango..."
          />
          <button
            onClick={onSaveToLocalStorage}
            className="flex items-center gap-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 transition-colors cursor-pointer"
            title="Hifadhi mradi huu kwenye kivinjari"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-emerald-400">Imehifadhiwa</span>
              </>
            ) : (
              <span>Hifadhi</span>
            )}
          </button>
        </div>

        <div className="h-4 w-px bg-neutral-800 hidden md:block" />

        {/* History actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded transition-colors ${
              canUndo
                ? 'text-neutral-200 hover:bg-neutral-800 cursor-pointer'
                : 'text-neutral-600 cursor-not-allowed'
            }`}
            title="Rudisha Nyuma (Undo Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded transition-colors ${
              canRedo
                ? 'text-neutral-200 hover:bg-neutral-800 cursor-pointer'
                : 'text-neutral-600 cursor-not-allowed'
            }`}
            title="Mbele (Redo Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center: Canvas Size Dropdown Selector */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-400 hidden lg:inline">Ukubwa wa Bango:</span>
        <div className="relative group">
          <select
            value={`${width}x${height}`}
            onChange={(e) => {
              const [w, h] = e.target.value.split('x').map(Number);
              const found = CANVAS_PRESETS.find((p) => p.width === w && p.height === h);
              onDimensionChange(w, h, found ? found.name : 'Custom');
            }}
            className="bg-neutral-800 border border-neutral-700 text-neutral-100 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-amber-400 cursor-pointer font-medium"
          >
            {CANVAS_PRESETS.map((preset) => (
              <option key={preset.id} value={`${preset.width}x${preset.height}`}>
                {preset.labelSwahili} ({preset.width}×{preset.height}px)
              </option>
            ))}
          </select>
        </div>
        <span className="font-mono text-neutral-400 hidden xl:inline text-[11px] tabular-nums">
          {width} × {height} px
        </span>
      </div>

      {/* Right: Zoom and Grid toggles */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleGrid}
          className={`p-1.5 rounded border transition-colors cursor-pointer ${
            showGrid
              ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
              : 'border-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white'
          }`}
          title="Onyesha Gridi ya Mistari (Grid)"
        >
          <Grid className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-neutral-800" />

        <div className="flex items-center gap-1 bg-neutral-800/80 rounded border border-neutral-700/60 p-0.5">
          <button
            onClick={() => onZoomChange(Math.max(0.25, zoom - 0.1))}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
            title="Punguza Ukubwa (Zoom Out)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-[11px] px-1.5 text-neutral-300 tabular-nums min-w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={() => onZoomChange(Math.min(2.5, zoom + 0.1))}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer"
            title="Ongeza Ukubwa (Zoom In)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onFitToScreen}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors cursor-pointer ml-0.5"
            title="Weka Ienee Kwenye Kioo (Fit to Screen)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
