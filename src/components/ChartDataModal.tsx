import React, { useState } from 'react';
import { X, Plus, Trash2, BarChart3, PieChart, TrendingUp, Check, Palette } from 'lucide-react';
import { ChartElement, ChartDataPoint, ChartType } from '../types/poster';

interface ChartDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  chart: ChartElement | null;
  onSaveChart: (updated: Partial<ChartElement>) => void;
}

const PRESET_PALETTES = [
  { name: 'Sky & Amber', colors: ['#38bdf8', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'] },
  { name: 'Emerald Growth', colors: ['#10b981', '#059669', '#34d399', '#6ee7b7', '#047857'] },
  { name: 'Sunset Flame', colors: ['#f97316', '#ef4444', '#f59e0b', '#fbbf24', '#b91c1c'] },
  { name: 'Royal Purple', colors: ['#8b5cf6', '#a855f7', '#6366f1', '#d946ef', '#4338ca'] },
  { name: 'Monochrome Silver', colors: ['#f8fafc', '#cbd5e1', '#94a3b8', '#64748b', '#475569'] }
];

export const ChartDataModal: React.FC<ChartDataModalProps> = ({
  isOpen,
  onClose,
  chart,
  onSaveChart
}) => {
  if (!isOpen || !chart) return null;

  const [title, setTitle] = useState(chart.title || '');
  const [subtitle, setSubtitle] = useState(chart.subtitle || '');
  const [chartType, setChartType] = useState<ChartType>(chart.chartType);
  const [data, setData] = useState<ChartDataPoint[]>(
    chart.data?.length
      ? JSON.parse(JSON.stringify(chart.data))
      : [
          { label: 'Jan', value: 45 },
          { label: 'Feb', value: 72 },
          { label: 'Mar', value: 95 }
        ]
  );
  const [colorPalette, setColorPalette] = useState<string[]>(
    chart.colorPalette || PRESET_PALETTES[0].colors
  );
  const [showValues, setShowValues] = useState<boolean>(chart.showValues ?? true);
  const [showLegend, setShowLegend] = useState<boolean>(chart.showLegend ?? true);
  const [progressValue, setProgressValue] = useState<number>(chart.progressValue ?? 75);
  const [progressLabel, setProgressLabel] = useState<string>(
    chart.progressLabel || 'Lengo Limekamilika'
  );
  const [kpiValue, setKpiValue] = useState<string>(chart.kpiValue || '+148%');
  const [kpiLabel, setKpiLabel] = useState<string>(chart.kpiLabel || 'Ukuaji wa Mauzo');

  const handleAddRow = () => {
    setData([...data, { label: `Kipengele ${data.length + 1}`, value: 50 }]);
  };

  const handleUpdateRow = (index: number, field: 'label' | 'value', val: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: field === 'value' ? Number(val) || 0 : val };
    setData(updated);
  };

  const handleDeleteRow = (index: number) => {
    if (data.length <= 1) return;
    setData(data.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSaveChart({
      title,
      subtitle,
      chartType,
      data,
      colorPalette,
      showValues,
      showLegend,
      progressValue,
      progressLabel,
      kpiValue,
      kpiLabel
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <BarChart3 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-outfit">
                Hariri Takwimu & Grafu (Chart Editor)
              </h2>
              <p className="text-xs text-neutral-400">
                Weka namba, majina ya vipengele na rangi za chati yako
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
          {/* Chart Type Selector */}
          <div>
            <label className="text-xs font-bold text-neutral-200 block mb-1.5">
              Aina ya Chati (Chart Type):
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {[
                { id: 'bar', label: 'Mihimili' },
                { id: 'pie', label: 'Duara' },
                { id: 'donut', label: 'Donati' },
                { id: 'line', label: 'Mistari' },
                { id: 'progress-ring', label: 'Mita ya %' },
                { id: 'metric-kpi', label: 'Kadi ya KPI' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setChartType(t.id as ChartType)}
                  className={`py-2 px-2 rounded-lg border text-center transition-colors cursor-pointer text-xs font-semibold ${
                    chartType === t.id
                      ? 'bg-amber-400 text-black border-amber-400 font-bold'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Kichwa cha Grafu (Title):
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Mfano: Mauzo ya Kila Mwezi"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Kichwa Kidogo (Subtitle):
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Mfano: Mwezi 1 hadi Mwezi 6"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Special inputs for Progress Ring and Metric KPI */}
          {chartType === 'progress-ring' && (
            <div className="p-3.5 bg-neutral-800/80 rounded-xl border border-neutral-700 flex flex-col gap-2.5">
              <span className="font-bold text-white text-xs">Mpangilio wa Mita ya Asilimia:</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-400">Asilimia:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressValue}
                  onChange={(e) => setProgressValue(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <span className="font-mono text-sm text-amber-400 font-bold w-12 text-right">
                  {progressValue}%
                </span>
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Lebo ya Chini:</label>
                <input
                  type="text"
                  value={progressLabel}
                  onChange={(e) => setProgressLabel(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white"
                />
              </div>
            </div>
          )}

          {chartType === 'metric-kpi' && (
            <div className="p-3.5 bg-neutral-800/80 rounded-xl border border-neutral-700 flex flex-col gap-2.5">
              <span className="font-bold text-white text-xs">Mpangilio wa Kadi ya Takwimu:</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Namba / Thamani:</label>
                  <input
                    type="text"
                    value={kpiValue}
                    onChange={(e) => setKpiValue(e.target.value)}
                    placeholder="Mfano: +148% au TSH 85M"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Maelezo:</label>
                  <input
                    type="text"
                    value={kpiLabel}
                    onChange={(e) => setKpiLabel(e.target.value)}
                    placeholder="Mfano: Ukuaji wa Mapato"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Data Table for Bar, Pie, Donut, Line */}
          {chartType !== 'progress-ring' && chartType !== 'metric-kpi' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-200">
                  Jedwali la Takwimu (Data Rows):
                </label>
                <button
                  onClick={handleAddRow}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-amber-400 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ongeza Mstari</span>
                </button>
              </div>

              <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/60">
                <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-neutral-800/60 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  <span className="col-span-6">Jina / Lebo</span>
                  <span className="col-span-4 text-right">Thamani (Namba)</span>
                  <span className="col-span-2 text-center">Futa</span>
                </div>

                <div className="divide-y divide-neutral-800/80 max-h-48 overflow-y-auto">
                  {data.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 px-3 py-1.5 items-center">
                      <div className="col-span-6">
                        <input
                          type="text"
                          value={row.label}
                          onChange={(e) => handleUpdateRow(idx, 'label', e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="col-span-4">
                        <input
                          type="number"
                          value={row.value}
                          onChange={(e) => handleUpdateRow(idx, 'value', e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white text-right font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <button
                          onClick={() => handleDeleteRow(idx)}
                          disabled={data.length <= 1}
                          className="p-1 text-neutral-500 hover:text-red-400 disabled:opacity-30 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Palette selector */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 block mb-1.5">
              Mchanganyiko wa Rangi (Palette):
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_PALETTES.map((pal) => (
                <button
                  key={pal.name}
                  onClick={() => setColorPalette(pal.colors)}
                  className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                    colorPalette === pal.colors
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-neutral-700 bg-neutral-800 hover:bg-neutral-750'
                  }`}
                >
                  <div className="flex -space-x-1">
                    {pal.colors.slice(0, 4).map((c, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/40"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-300 font-medium">{pal.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Ghairi
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Hifadhi Mabadiliko ya Chati</span>
          </button>
        </div>
      </div>
    </div>
  );
};
