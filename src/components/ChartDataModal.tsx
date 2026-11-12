import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, BarChart3, Check, ArrowUpDown, FileSpreadsheet } from 'lucide-react';
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
  { name: 'Tanzanite Ocean', colors: ['#0ea5e9', '#2563eb', '#06b6d4', '#14b8a6', '#1e40af'] },
  { name: 'Gold Luxury', colors: ['#fbbf24', '#d97706', '#fde047', '#b45309', '#f59e0b'] },
  { name: 'Coral Mint', colors: ['#fb7185', '#2dd4bf', '#f472b6', '#34d399', '#fb923c'] },
  { name: 'Monochrome', colors: ['#f8fafc', '#cbd5e1', '#94a3b8', '#64748b', '#475569'] }
];

const CHART_TYPE_OPTIONS: { id: ChartType; label: string }[] = [
  { id: 'bar', label: 'Mihimili Wima' },
  { id: 'horizontal-bar', label: 'Mihimili Mlalo' },
  { id: 'stacked-bar', label: 'Mrundiko (Stacked)' },
  { id: 'pie', label: 'Duara (Pie)' },
  { id: 'donut', label: 'Donati (Donut)' },
  { id: 'semi-donut', label: 'Nusu Duara' },
  { id: 'line', label: 'Mistari (Line)' },
  { id: 'area', label: 'Eneo (Area)' },
  { id: 'spline', label: 'Mstari Mlaini' },
  { id: 'scatter', label: 'Mtawanyiko' },
  { id: 'radar', label: 'Rada (Radar)' },
  { id: 'funnel', label: 'Faneli (Funnel)' },
  { id: 'progress-ring', label: 'Mita Duara %' },
  { id: 'progress-bar', label: 'Upau wa %' },
  { id: 'metric-kpi', label: 'Kadi ya KPI' },
  { id: 'comparison-table', label: 'Jedwali (Table)' }
];

export const ChartDataModal: React.FC<ChartDataModalProps> = ({
  isOpen,
  onClose,
  chart,
  onSaveChart
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [colorPalette, setColorPalette] = useState<string[]>(PRESET_PALETTES[0].colors);
  const [showValues, setShowValues] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [showGridlines, setShowGridlines] = useState<boolean>(true);
  const [valuePrefix, setValuePrefix] = useState<string>('');
  const [valueSuffix, setValueSuffix] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('#0f172a');
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [progressValue, setProgressValue] = useState<number>(75);
  const [progressLabel, setProgressLabel] = useState<string>('Lengo Limekamilika');
  const [kpiValue, setKpiValue] = useState<string>('+148%');
  const [kpiLabel, setKpiLabel] = useState<string>('Ukuaji wa Mauzo');
  const [kpiTrend, setKpiTrend] = useState<'up' | 'down' | 'neutral'>('up');
  const [showCsvPaste, setShowCsvPaste] = useState<boolean>(false);
  const [csvText, setCsvText] = useState<string>('Jan, 45\nFeb, 72\nMar, 95\nApr, 128');

  useEffect(() => {
    if (!isOpen || !chart) return;
    setTitle(chart.title || '');
    setSubtitle(chart.subtitle || '');
    setChartType(chart.chartType);
    setData(
      chart.data?.length
        ? JSON.parse(JSON.stringify(chart.data))
        : [
            { label: 'Q1', value: 45 },
            { label: 'Q2', value: 72 },
            { label: 'Q3', value: 95 },
            { label: 'Q4', value: 128 }
          ]
    );
    setColorPalette(chart.colorPalette || PRESET_PALETTES[0].colors);
    setShowValues(chart.showValues ?? true);
    setShowLegend(chart.showLegend ?? true);
    setShowGridlines(chart.showGridlines ?? true);
    setValuePrefix(chart.valuePrefix || '');
    setValueSuffix(chart.valueSuffix || '');
    setBackgroundColor(chart.backgroundColor || '#0f172a');
    setTextColor(chart.textColor || '#ffffff');
    setProgressValue(chart.progressValue ?? 75);
    setProgressLabel(chart.progressLabel || 'Lengo Limekamilika');
    setKpiValue(chart.kpiValue || '+148%');
    setKpiLabel(chart.kpiLabel || 'Ukuaji wa Mauzo');
    setKpiTrend(chart.kpiTrend || 'up');
    setShowCsvPaste(false);
  }, [isOpen, chart]);

  if (!isOpen || !chart) return null;

  const handleAddRow = () => {
    setData([...data, { label: `Kipengele ${data.length + 1}`, value: 50, secondaryValue: 25 }]);
  };

  const handleUpdateRow = (
    index: number,
    field: 'label' | 'value' | 'secondaryValue',
    val: string
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: field === 'label' ? val : Number(val) || 0
    };
    setData(updated);
  };

  const handleDeleteRow = (index: number) => {
    if (data.length <= 1) return;
    setData(data.filter((_, i) => i !== index));
  };

  const handleSortDesc = () => {
    setData([...data].sort((a, b) => b.value - a.value));
  };

  const handleApplyCsv = () => {
    const lines = csvText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    const parsed: ChartDataPoint[] = [];
    lines.forEach((line) => {
      const parts = line.split(/[,;\t]+/).map((p) => p.trim());
      if (parts.length >= 2) {
        const val = parseFloat(parts[1]);
        const sec = parts[2] ? parseFloat(parts[2]) : undefined;
        if (!Number.isNaN(val)) {
          parsed.push({
            label: parts[0],
            value: val,
            secondaryValue: sec && !Number.isNaN(sec) ? sec : undefined
          });
        }
      }
    });
    if (parsed.length > 0) {
      setData(parsed);
      setShowCsvPaste(false);
    }
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
      showGridlines,
      valuePrefix,
      valueSuffix,
      backgroundColor,
      textColor,
      progressValue,
      progressLabel,
      kpiValue,
      kpiLabel,
      kpiTrend
    });
    onClose();
  };

  const isSingleMetric =
    chartType === 'progress-ring' || chartType === 'progress-bar' || chartType === 'metric-kpi';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <BarChart3 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-outfit">
                Kihariri cha Grafu &amp; Takwimu (16 Aina)
              </h2>
              <p className="text-xs text-neutral-400">
                Chagua aina ya grafu, weka namba au CSV, na panga rangi za chati yako
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
        <div className="p-5 flex flex-col gap-4 max-h-[72vh] overflow-y-auto overscroll-contain touch-pan-y text-xs text-neutral-300">
          {/* Chart Type Selector (16 types) */}
          <div>
            <label className="text-xs font-bold text-neutral-200 block mb-1.5">
              1. Chagua Aina ya Grafu ({CHART_TYPE_OPTIONS.length}):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {CHART_TYPE_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setChartType(t.id)}
                  className={`py-2 px-2 rounded-lg border text-center transition-colors cursor-pointer text-[11px] font-semibold truncate ${
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

          {/* Titles & Units */}
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

          {/* Special inputs for Progress Ring / Bar and Metric KPI */}
          {(chartType === 'progress-ring' || chartType === 'progress-bar') && (
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
                <span className="font-mono text-sm text-amber-400 font-bold w-12 text-right tabular-nums">
                  {progressValue}%
                </span>
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Lebo ya Maelezo:</label>
                <input
                  type="text"
                  value={progressLabel}
                  onChange={(e) => setProgressLabel(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          )}

          {chartType === 'metric-kpi' && (
            <div className="p-3.5 bg-neutral-800/80 rounded-xl border border-neutral-700 flex flex-col gap-2.5">
              <span className="font-bold text-white text-xs">Mpangilio wa Kadi ya Takwimu (KPI):</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Namba / Thamani:</label>
                  <input
                    type="text"
                    value={kpiValue}
                    onChange={(e) => setKpiValue(e.target.value)}
                    placeholder="Mfano: +148% au TSH 85M"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Maelezo:</label>
                  <input
                    type="text"
                    value={kpiLabel}
                    onChange={(e) => setKpiLabel(e.target.value)}
                    placeholder="Mfano: Ukuaji wa Mapato"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Mwelekeo (Trend):</label>
                  <select
                    value={kpiTrend}
                    onChange={(e) => setKpiTrend(e.target.value as 'up' | 'down' | 'neutral')}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="up">Inakua ▲</option>
                    <option value="down">Imeshuka ▼</option>
                    <option value="neutral">Thabiti ●</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Data Table & CSV Paste */}
          {!isSingleMetric && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <label className="text-xs font-bold text-neutral-200">
                  2. Jedwali la Takwimu (Data Rows):
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleSortDesc}
                    className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    title="Panga kutoka kubwa kwenda ndogo"
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    <span>Panga</span>
                  </button>
                  <button
                    onClick={() => setShowCsvPaste(!showCsvPaste)}
                    className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sky-400 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3 h-3" />
                    <span>Bandika CSV</span>
                  </button>
                  <button
                    onClick={handleAddRow}
                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-amber-400 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ongeza</span>
                  </button>
                </div>
              </div>

              {showCsvPaste && (
                <div className="mb-2 p-3 bg-neutral-950 border border-sky-500/40 rounded-xl flex flex-col gap-2">
                  <span className="text-[11px] text-neutral-300">
                    Bandika mistari kwa muundo wa <strong>Jina, Namba</strong> (mfano: <code>Jan, 45</code>):
                  </span>
                  <textarea
                    rows={4}
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowCsvPaste(false)}
                      className="px-3 py-1 text-[11px] text-neutral-400 hover:text-white cursor-pointer"
                    >
                      Ghairi
                    </button>
                    <button
                      onClick={handleApplyCsv}
                      className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded text-[11px] cursor-pointer"
                    >
                      Ingiza Takwimu
                    </button>
                  </div>
                </div>
              )}

              <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/60">
                <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-neutral-800/60 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  <span className="col-span-5">Jina / Lebo</span>
                  <span className="col-span-3 text-right">Thamani 1</span>
                  <span className="col-span-2 text-right">
                    {chartType === 'stacked-bar' ? 'Thamani 2' : ''}
                  </span>
                  <span className="col-span-2 text-center">Futa</span>
                </div>

                <div className="divide-y divide-neutral-800/80 max-h-44 overflow-y-auto overscroll-contain">
                  {data.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 px-3 py-1.5 items-center">
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={row.label}
                          onChange={(e) => handleUpdateRow(idx, 'label', e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          value={row.value}
                          onChange={(e) => handleUpdateRow(idx, 'value', e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white text-right font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="col-span-2">
                        {chartType === 'stacked-bar' && (
                          <input
                            type="number"
                            value={row.secondaryValue ?? Math.round(row.value * 0.45)}
                            onChange={(e) => handleUpdateRow(idx, 'secondaryValue', e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded px-1.5 py-1 text-xs text-white text-right font-mono focus:outline-none focus:border-amber-400"
                          />
                        )}
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

          {/* Formatting: Units, Card Theme, Toggles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Kiambishi Awali:
              </label>
              <input
                type="text"
                value={valuePrefix}
                onChange={(e) => setValuePrefix(e.target.value)}
                placeholder="Mf: $, TSH "
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Kipimo / Suffix:
              </label>
              <input
                type="text"
                value={valueSuffix}
                onChange={(e) => setValueSuffix(e.target.value)}
                placeholder="Mf: %, M, K"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Mandhari ya Kadi:
              </label>
              <select
                value={backgroundColor}
                onChange={(e) => {
                  const bg = e.target.value;
                  setBackgroundColor(bg);
                  if (bg === '#ffffff' || bg === '#f8fafc') setTextColor('#0f172a');
                  else setTextColor('#ffffff');
                }}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-2 py-1.5 text-xs text-white"
              >
                <option value="#0f172a">Giza (Slate Dark)</option>
                <option value="#171717">Nyeusi (Obsidian)</option>
                <option value="#ffffff">Nyeupe (Clean Light)</option>
                <option value="transparent">Uwazi (Transparent)</option>
              </select>
            </div>
            <div className="flex flex-col justify-end gap-1.5 pb-1">
              <label className="flex items-center gap-2 cursor-pointer text-[11px]">
                <input
                  type="checkbox"
                  checked={showValues}
                  onChange={(e) => setShowValues(e.target.checked)}
                  className="accent-amber-400"
                />
                <span>Onyesha Namba</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[11px]">
                <input
                  type="checkbox"
                  checked={showGridlines}
                  onChange={(e) => setShowGridlines(e.target.checked)}
                  className="accent-amber-400"
                />
                <span>Mistari ya Grid</span>
              </label>
            </div>
          </div>

          {/* Palette selector */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 block mb-1.5">
              3. Mchanganyiko wa Rangi (8 Palettes):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_PALETTES.map((pal) => (
                <button
                  key={pal.name}
                  onClick={() => setColorPalette(pal.colors)}
                  className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                    JSON.stringify(colorPalette) === JSON.stringify(pal.colors)
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-neutral-700 bg-neutral-800 hover:bg-neutral-750'
                  }`}
                >
                  <div className="flex -space-x-1">
                    {pal.colors.slice(0, 4).map((c, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-black/40"
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
        <div className="px-5 py-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
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
            <span>Hifadhi Mabadiliko</span>
          </button>
        </div>
      </div>
    </div>
  );
};
