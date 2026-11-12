import React from 'react';
import { X, HelpCircle, CheckCircle, Sparkles, Printer, Layers } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <HelpCircle className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-outfit">
                Mwongozo wa Kutengeneza Mabango ya Ubora wa Juu
              </h2>
              <p className="text-xs text-neutral-400">
                Jinsi ya kutumia Malosha Poster Studio kupata bango lenye muonekano wa kiwango cha juu
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
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto overscroll-contain touch-pan-y text-xs text-neutral-300 leading-relaxed">
          <div className="p-4 bg-neutral-800/60 rounded-xl border border-neutral-700/80 flex flex-col gap-2">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>1. Kuchagua na Kubadili Kiolezo (Templates)</span>
            </h3>
            <p>
              Bofya kichupo cha <strong>"Violezo"</strong> kushoto kuchagua sampuli unayoipenda (Biashara, Sherehe, Chakula, Michezo, Elimu au Ibada). Kila kiolezo kimeundwa kikiwa na uwiano sahihi na mpangilio wa kisasa wa herufi.
            </p>
            <p>
              Bofya mara mbili (double click) kwenye maandishi yoyote ili kuandika maneno yako moja kwa moja.
            </p>
          </div>

          <div className="p-4 bg-neutral-800/60 rounded-xl border border-neutral-700/80 flex flex-col gap-2">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Printer className="w-4 h-4" />
              <span>2. Kudownload katika Ubora wa Hali ya Juu (High Resolution)</span>
            </h3>
            <p>
              Wakati unapakua bango lako kwa kitufe cha juu <strong>"Pakua kwa Ubora wa Juu"</strong>:
            </p>
            <ul className="space-y-1.5 pl-2">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>2x (HD)</strong>: Inafaa sana kwa machapisho ya Instagram, Facebook na status ya WhatsApp.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>3x / 4x (Ultra HD & Print 300 DPI)</strong>: Huongeza idadi ya pixels hadi zaidi ya Megapixels 14, kuhakikisha bango likichapishwa kwenye mashine za viwandani au print shops halipotezi ukali wala kuwa na ukungu!</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>PDF Print</strong>: Huandaa faili kamili la PDF lenye picha ya juu ya kielektroniki tayari kwa printa.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-neutral-800/60 rounded-xl border border-neutral-700/80 flex flex-col gap-2">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>3. Njia za Mkato za Kibodi (Keyboard Shortcuts)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                <span className="text-amber-300">Ctrl + Z</span>: Rudisha Nyuma (Undo)
              </div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                <span className="text-amber-300">Ctrl + Y</span>: Sogeza Mbele (Redo)
              </div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                <span className="text-amber-300">Delete / Backspace</span>: Futa Kipengele
              </div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                <span className="text-amber-300">Mishale (Arrows)</span>: Sogea kwa 1px
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg cursor-pointer transition-colors"
          >
            Nimeelewa, Asante!
          </button>
        </div>
      </div>
    </div>
  );
};
