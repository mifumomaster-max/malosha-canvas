import React, { useRef } from 'react';
import { X, FolderHeart, Upload, Trash2, ArrowRight, Clock, Plus } from 'lucide-react';
import { PosterProject } from '../types/poster';

interface SavedProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: PosterProject[];
  onLoadProject: (project: PosterProject) => void;
  onDeleteProject: (id: string) => void;
  onImportProject: (project: PosterProject) => void;
  onNewBlankProject: () => void;
}

export const SavedProjectsModal: React.FC<SavedProjectsModalProps> = ({
  isOpen,
  onClose,
  savedProjects,
  onLoadProject,
  onDeleteProject,
  onImportProject,
  onNewBlankProject
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.elements && parsed.width && parsed.height) {
          onImportProject(parsed);
          onClose();
        } else {
          alert('Faili hili halina muundo sahihi wa mradi wa bango.');
        }
      } catch (err) {
        alert('Kulitokea hitilafu wakati wa kusoma faili la JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FolderHeart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-outfit">Mabango Yangu (Miradi Iliyohifadhiwa)</h2>
              <p className="text-xs text-neutral-400">
                Fungua au dhibiti mabango uliyobuni kwenye kifaa hiki.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
          {/* Top Actions */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                onNewBlankProject();
                onClose();
              }}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Anzisha Bango Jipya Jeupe</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
            >
              <Upload className="w-4 h-4 text-neutral-400" />
              <span>Ingiza Kutoka Faili (.JSON)</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Saved Projects List */}
          {savedProjects.length === 0 ? (
            <div className="py-12 border border-dashed border-neutral-800 rounded-xl flex flex-col items-center justify-center text-center p-6">
              <FolderHeart className="w-10 h-10 text-neutral-600 mb-2" />
              <p className="text-sm font-semibold text-neutral-300">Hakuna bango lililohifadhiwa bado</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                Bofya kitufe cha "Hifadhi" juu ya studio ili kuhifadhi bango lako kwenye kivinjari uendelee baadaye.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {savedProjects.map((p) => {
                const dateStr = new Date(p.updatedAt || p.createdAt).toLocaleDateString('sw-TZ', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });
                return (
                  <div
                    key={p.id}
                    className="p-3.5 bg-neutral-800/60 border border-neutral-700/80 rounded-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-white truncate">{p.title || 'Bango Bila Jina'}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                        <span className="font-mono tabular-nums">{p.width}×{p.height}px</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          <span>{dateStr}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-700/60">
                      <button
                        onClick={() => onDeleteProject(p.id)}
                        className="text-neutral-400 hover:text-red-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Futa bango hili"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Futa</span>
                      </button>

                      <button
                        onClick={() => {
                          onLoadProject(p);
                          onClose();
                        }}
                        className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Fungua</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
