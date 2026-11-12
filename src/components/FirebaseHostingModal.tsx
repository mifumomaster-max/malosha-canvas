import React, { useState } from 'react';
import { X, Cloud, Terminal, CheckCircle2, Copy, Check, Globe, Sparkles } from 'lucide-react';

interface FirebaseHostingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseHostingModal: React.FC<FirebaseHostingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Cloud className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-outfit">
                Kupeleka Hewani: Firebase Hosting (Spark Plan)
              </h2>
              <p className="text-xs text-neutral-400">
                Mwongozo wa kuweka Malosha Poster Studio mtandaoni bure bila gharama
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
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto text-xs text-neutral-300">
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-emerald-400 block">
                Faili za Firebase Hosting Zimeshawekwa!
              </span>
              <p className="text-neutral-300 text-[11px] mt-0.5">
                Tumetengeneza faili la <code className="text-amber-300 bg-neutral-950 px-1 py-0.5 rounded">firebase.json</code> na <code className="text-amber-300 bg-neutral-950 px-1 py-0.5 rounded">.firebaserc</code>. Mfumo huu sasa ni wa kiwango cha mteja (Pure Client-side SPA) unaofanya kazi bila seva ya gharama (No Cloud Run / No App Hosting needed), hivyo ni 100% bure kwenye Firebase Spark Plan.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Hatua za Kupeleka Hewani (Deployment Steps):</span>
            </span>

            {/* Step 1 */}
            <div className="p-3 bg-neutral-800/70 border border-neutral-700/80 rounded-xl flex flex-col gap-1.5">
              <span className="font-bold text-white text-[11px]">
                1. Tengeneza faili za toleo la uzalishaji (Production Build):
              </span>
              <div className="flex items-center justify-between bg-neutral-950 px-3 py-2 rounded-lg font-mono text-[11px] text-amber-300">
                <code>npm run build</code>
                <button
                  onClick={() => copyToClipboard('npm run build', 'build')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {copiedCmd === 'build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[10px] text-neutral-400">
                Hii hutengeneza folda ya <code className="text-neutral-300">dist/</code> yenye faili zote zilizobanwa kwa kasi ya juu.
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-neutral-800/70 border border-neutral-700/80 rounded-xl flex flex-col gap-1.5">
              <span className="font-bold text-white text-[11px]">
                2. Ingia kwenye akaunti yako ya Firebase:
              </span>
              <div className="flex items-center justify-between bg-neutral-950 px-3 py-2 rounded-lg font-mono text-[11px] text-amber-300">
                <code>npx firebase-tools login</code>
                <button
                  onClick={() => copyToClipboard('npx firebase-tools login', 'login')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {copiedCmd === 'login' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-neutral-800/70 border border-neutral-700/80 rounded-xl flex flex-col gap-1.5">
              <span className="font-bold text-white text-[11px]">
                3. Peleka Hewani kwa amri moja:
              </span>
              <div className="flex items-center justify-between bg-neutral-950 px-3 py-2 rounded-lg font-mono text-[11px] text-amber-300">
                <code>npx firebase-tools deploy --only hosting</code>
                <button
                  onClick={() => copyToClipboard('npx firebase-tools deploy --only hosting', 'deploy')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {copiedCmd === 'deploy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[10px] text-neutral-400">
                Pia unaweza kutumia mkato wetu wa: <code className="text-amber-400">npm run deploy</code>
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-white font-bold text-xs">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>Faida za Firebase Hosting Kwenye Spark Plan:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-neutral-400 pl-2">
              <li>• Bure 100% bila kuhitaji kadi ya benki (Credit Card).</li>
              <li>• Cheti cha Bure cha Usalama (Free SSL / HTTPS).</li>
              <li>• Unaweza kuunganisha jina lako la tovuti bure (Custom Domain).</li>
              <li>• Kasi kubwa ya upakiaji kupitia Global CDN ya Google.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg cursor-pointer transition-colors"
          >
            Nimeelewa, Tayari
          </button>
        </div>
      </div>
    </div>
  );
};
