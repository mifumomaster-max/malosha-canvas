import React, { useState } from 'react';
import {
  LayoutTemplate,
  Type,
  Image as ImageIcon,
  Shapes,
  QrCode,
  Palette,
  BarChart3,
  TrendingUp,
  PieChart,
  Upload,
  Plus,
  Search,
  Check
} from 'lucide-react';
import {
  PosterTemplate,
  PosterBackground,
  PosterElement,
  TextElement,
  ShapeElement,
  ChartElement,
  ChartType,
  ShapeType
} from '../types/poster';
import { DEFAULT_TEMPLATES } from '../data/defaultTemplates';

export type SidebarTab =
  | 'templates'
  | 'text'
  | 'photos'
  | 'shapes'
  | 'charts'
  | 'qr'
  | 'background';

interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onSelectTemplate: (template: PosterTemplate) => void;
  onAddText: (
    text: string,
    fontSize: number,
    fontWeight: string | number,
    fontFamily: string,
    color: string,
    extra?: Partial<TextElement>
  ) => void;
  onAddShape: (shapeType: ShapeType, fill: string, stroke?: string) => void;
  onAddBadge: (
    text: string,
    secondaryText: string | undefined,
    bgColor: string,
    textColor: string
  ) => void;
  onAddImage: (src: string, width?: number, height?: number) => void;
  onAddQrCode: (data: string, label?: string, qrColor?: string, bgColor?: string) => void;
  onAddChart: (chartType: ChartType, title?: string) => void;
  currentBackground: PosterBackground;
  onChangeBackground: (bg: PosterBackground) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onSelectTemplate,
  onAddText,
  onAddShape,
  onAddBadge,
  onAddImage,
  onAddQrCode,
  onAddChart,
  currentBackground,
  onChangeBackground
}) => {
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCategory, setTemplateCategory] = useState<string>('all');
  const [qrInput, setQrInput] = useState('https://malosha.co.tz');
  const [qrLabel, setQrLabel] = useState('TEMBELEA TOVUTI');
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');

  // Filter templates
  const filteredTemplates = DEFAULT_TEMPLATES.filter((t) => {
    const matchCat = templateCategory === 'all' || t.category === templateCategory;
    const matchSearch =
      templateSearch === '' ||
      t.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
      t.titleSwahili.toLowerCase().includes(templateSearch.toLowerCase()) ||
      t.description.toLowerCase().includes(templateSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onAddImage(result, 400, 300);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const navItems: { id: SidebarTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'templates', label: 'Violezo', icon: LayoutTemplate },
    { id: 'charts', label: 'Grafu & Chati', icon: BarChart3 },
    { id: 'text', label: 'Maandishi', icon: Type },
    { id: 'photos', label: 'Picha', icon: ImageIcon },
    { id: 'shapes', label: 'Maumbo', icon: Shapes },
    { id: 'qr', label: 'QR Code', icon: QrCode },
    { id: 'background', label: 'Mandhari', icon: Palette }
  ];

  return (
    <div className="flex h-full bg-neutral-900 border-r border-neutral-800 z-10 shrink-0 select-none">
      {/* Icon Rail */}
      <div className="w-18 bg-neutral-950 border-r border-neutral-800 flex flex-col items-center py-3 gap-1 shrink-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                isActive
                  ? 'bg-neutral-800 text-amber-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5 stroke-[2]" />
              <span className="text-[10px] leading-tight text-center">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Flyout Drawer Content */}
      <div className="w-80 bg-neutral-900 h-full overflow-y-auto p-4 flex flex-col">
        {/* TAB 1: TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Maktaba ya Violezo</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Violezo 18+ vya kitaalamu vya biashara, ripoti za grafu, na matukio.
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tafuta bango au kiolezo..."
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
              {[
                { id: 'all', label: 'Zote' },
                { id: 'infographics', label: 'Grafu & Ripoti' },
                { id: 'business', label: 'Biashara' },
                { id: 'events', label: 'Sherehe' },
                { id: 'food', label: 'Chakula' },
                { id: 'sports', label: 'Michezo' },
                { id: 'church', label: 'Ibada' },
                { id: 'education', label: 'Elimu' },
                { id: 'realestate', label: 'Mali & Viwanja' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTemplateCategory(cat.id)}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    templateCategory === cat.id
                      ? 'bg-amber-400 text-black font-semibold'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 gap-3 mt-1">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => onSelectTemplate(template)}
                  className="group relative bg-neutral-800/80 border border-neutral-700/80 hover:border-amber-400 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                >
                  <div className="aspect-[3/4] w-full bg-neutral-950 overflow-hidden relative">
                    {template.thumbnailPreview ? (
                      <img
                        src={template.thumbnailPreview}
                        alt={template.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
                        <span className="text-xs font-bold text-neutral-100 mb-1">
                          {template.titleSwahili}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {template.categoryLabelSwahili}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3">
                      <span className="text-xs font-bold text-white leading-tight">
                        {template.titleSwahili}
                      </span>
                      <span className="text-[10px] text-amber-300 mt-0.5">
                        {template.categoryLabelSwahili}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CHARTS & GRAPHS */}
        {activeTab === 'charts' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Grafu & Chati (Charts)</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Ongeza grafu za takwimu, ripoti na viwango vya biashara kama Canva.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Bar Chart */}
              <button
                onClick={() => onAddChart('bar', 'Mauzo ya Robo Mwaka')}
                className="p-3 bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Chati ya Mihimili (Bar Chart)
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Linganisha vipengele, mauzo na mapato
                    </span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>

              {/* Donut Chart */}
              <button
                onClick={() => onAddChart('donut', 'Mgawanyo wa Masoko')}
                className="p-3 bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Chati ya Donati (Donut Chart)
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Inaonyesha asilimia na katikati namba kuu
                    </span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>

              {/* Pie Chart */}
              <button
                onClick={() => onAddChart('pie', 'Asilimia za Wateja')}
                className="p-3 bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Chati ya Duara (Pie Chart)
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Mgawanyo kamili wa asilimia na vitengo
                    </span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>

              {/* Line Chart */}
              <button
                onClick={() => onAddChart('line', 'Mwelekeo wa Ukuaji wa Kila Mwezi')}
                className="p-3 bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Mstari wa Mwenendo (Line Chart)
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Ukuaji wa mwezi hadi mwezi
                    </span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>

              {/* Progress Ring */}
              <button
                onClick={() => onAddChart('progress-ring', 'Kiwango cha Lengo')}
                className="p-3 bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <span className="font-bold text-xs">85%</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Mita ya Asilimia (Progress Ring)
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Inafaa kuonyesha mafanikio ya lengo
                    </span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>

              {/* Metric / KPI Card */}
              <button
                onClick={() => onAddChart('metric-kpi', 'Takwimu ya Mwaka')}
                className="p-3 bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-400 rounded-xl text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <span className="font-bold text-xs">+148%</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Kadi ya Takwimu (Metric / KPI)
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Namba kubwa yenye kiashiria cha ukuaji
                    </span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: TEXT */}
        {activeTab === 'text' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Ongeza Maandishi</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Bofya kuongeza maneno kwenye bango lako.</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  onAddText('KICHWA KIKUU CHA BANGO', 52, 900, 'Anton', '#ffffff', {
                    shadowColor: '#000000',
                    shadowBlur: 14
                  })
                }
                className="w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 rounded-xl text-left hover:border-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-lg font-black text-white font-anton">KICHWA KIKUU</span>
                  <p className="text-[11px] text-neutral-400">Herufi kubwa, sauti na nguvu (Anton)</p>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>

              <button
                onClick={() =>
                  onAddText('Kichwa Kidogo cha Ufafanuzi', 28, 700, 'Outfit', '#fcd34d')
                }
                className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 rounded-xl text-left hover:border-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-sm font-bold text-neutral-100 font-outfit">Kichwa Kidogo</span>
                  <p className="text-[11px] text-neutral-400">Inafaa tarehe na mada (Outfit)</p>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>

              <button
                onClick={() =>
                  onAddText(
                    'Andika maelezo ya kina ya tangazo lako hapa. Weka mahali, mawasiliano na maagizo.',
                    16,
                    400,
                    'Plus Jakarta Sans',
                    '#e2e8f0'
                  )
                }
                className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 rounded-xl text-left hover:border-amber-400 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs text-neutral-200">Maelezo ya Kawaida (Body Text)</span>
                  <p className="text-[11px] text-neutral-400">Usomaji safi (Plus Jakarta Sans)</p>
                </div>
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PHOTOS & UPLOADS */}
        {activeTab === 'photos' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Picha & Nembo (Uploads)</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Pakia picha yako kutoka kwenye simu/kompyuta au tumia picha zilizopo.
              </p>
            </div>

            <label className="w-full py-4 border-2 border-dashed border-neutral-700 hover:border-amber-400 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors group">
              <Upload className="w-5 h-5 text-neutral-400 group-hover:text-amber-400" />
              <span className="text-xs font-bold text-white">Pakia Picha au Nembo</span>
              <span className="text-[10px] text-neutral-400">PNG, JPG, au WebP</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            <div>
              <span className="text-xs font-semibold text-neutral-300">Picha za Mandhari Zilizopo:</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  {
                    title: 'Muziki & Tamasha',
                    url: '/src/assets/images/poster_music_concert_1794504649640.jpg'
                  },
                  {
                    title: 'Kongamano & Biashara',
                    url: '/src/assets/images/poster_business_summit_1794504649292.jpg'
                  },
                  {
                    title: 'Nyama Choma & Misosi',
                    url: '/src/assets/images/poster_food_bbq_1794504648737.jpg'
                  },
                  {
                    title: 'Riadha & Michezo',
                    url: '/src/assets/images/poster_fitness_sports_1794504648859.jpg'
                  }
                ].map((stock) => (
                  <div
                    key={stock.title}
                    onClick={() => onAddImage(stock.url, 400, 500)}
                    className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-neutral-700 hover:border-amber-400 cursor-pointer bg-neutral-950"
                  >
                    <img
                      src={stock.url}
                      alt={stock.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                      <span className="text-[10px] font-semibold text-white leading-tight">
                        {stock.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SHAPES & BADGES */}
        {activeTab === 'shapes' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Maumbo & Beji za Mauzo</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Vipengele vya kupamba na kuvuta macho ya wasomaji.
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-neutral-300">Maumbo ya Kijiometri:</span>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  { id: 'rectangle', label: 'Mstatili', shape: 'rectangle' as ShapeType },
                  { id: 'circle', label: 'Mduara', shape: 'circle' as ShapeType },
                  { id: 'triangle', label: 'Pembetatu', shape: 'triangle' as ShapeType },
                  { id: 'star', label: 'Nyota', shape: 'star' as ShapeType },
                  { id: 'heart', label: 'Moyo', shape: 'heart' as ShapeType },
                  { id: 'badge-ribbon', label: 'Riboni', shape: 'badge-ribbon' as ShapeType },
                  { id: 'line', label: 'Mstari', shape: 'line' as ShapeType },
                  { id: 'arrow', label: 'Mshale', shape: 'arrow' as ShapeType }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onAddShape(s.shape, '#f59e0b')}
                    className="aspect-square bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg flex flex-col items-center justify-center p-1 cursor-pointer transition-colors"
                    title={s.label}
                  >
                    <div className="w-6 h-6 bg-amber-400 rounded-sm mb-1" />
                    <span className="text-[10px] text-neutral-300">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800">
              <span className="text-xs font-semibold text-neutral-300">Beji za Matangazo & Ofa:</span>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {[
                  {
                    text: 'PUNGUZO 50% LEO',
                    sub: 'OFA YA HARAKA',
                    bg: '#dc2626',
                    textCol: '#ffffff'
                  },
                  {
                    text: 'KARIBU WOTE BILA KIINGILIO',
                    sub: 'HAKUNA MALIPO',
                    bg: '#16a34a',
                    textCol: '#ffffff'
                  },
                  {
                    text: 'TIKETI ZA VIP TSH 50,000',
                    sub: 'NAFASI CHACHE ZIMEBAKI',
                    bg: '#2563eb',
                    textCol: '#ffffff'
                  },
                  {
                    text: 'BIDHAA MPYA ZIMEWASILI',
                    sub: 'UBORA WA JUU',
                    bg: '#f59e0b',
                    textCol: '#000000'
                  }
                ].map((badge, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAddBadge(badge.text, badge.sub, badge.bg, badge.textCol)}
                    className="p-3 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 rounded-xl text-left cursor-pointer transition-colors"
                  >
                    <div
                      className="px-3 py-1.5 rounded-full inline-block text-center font-bold text-xs"
                      style={{ backgroundColor: badge.bg, color: badge.textCol }}
                    >
                      {badge.text}
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">{badge.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: QR CODE GENERATOR */}
        {activeTab === 'qr' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Tengeneza QR Code</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Ongeza QR Code ya tovuti, namba ya simu, malipo ya M-Pesa, au WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Tovuti', val: 'https://malosha.co.tz', lbl: 'TEMBELEA TOVUTI' },
                { label: 'Piga Simu', val: 'tel:+255755123456', lbl: 'PIGA SASA' },
                { label: 'WhatsApp', val: 'https://wa.me/255755123456', lbl: 'WHATSAPP YETU' },
                { label: 'M-Pesa Lipa', val: 'Lipa Namba: 554433', lbl: 'LIPA KWA M-PESA' }
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setQrInput(p.val);
                    setQrLabel(p.lbl);
                  }}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] rounded border border-neutral-700 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-400">Data / Link ya QR Code:</label>
              <input
                type="text"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                placeholder="https://... au namba ya simu"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-400">Maandishi ya Chini (Label):</label>
              <input
                type="text"
                value={qrLabel}
                onChange={(e) => setQrLabel(e.target.value)}
                placeholder="Mfano: SCAN KUJIUNGA"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-neutral-400">Rangi ya Mistari:</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-8 h-8 rounded border border-neutral-700 cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-xs text-neutral-300">{qrColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-400">Rangi ya Nyuma:</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-neutral-700 cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-xs text-neutral-300">{qrBgColor}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onAddQrCode(qrInput, qrLabel, qrColor, qrBgColor)}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Weka QR Code Kwenye Bango</span>
            </button>
          </div>
        )}

        {/* TAB 7: BACKGROUND */}
        {activeTab === 'background' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Rangi & Mandhari ya Bango</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Badilisha rangi ya nyuma au mchanganyiko (gradient).</p>
            </div>

            <div>
              <span className="text-xs font-semibold text-neutral-300">Rangi Nzito (Solid Colors):</span>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {[
                  '#0a0a0a',
                  '#0f172a',
                  '#1e112a',
                  '#172554',
                  '#14532d',
                  '#7f1d1d',
                  '#ffffff',
                  '#f8fafc',
                  '#facc15',
                  '#ea580c',
                  '#ec4899',
                  '#6366f1'
                ].map((col) => (
                  <button
                    key={col}
                    onClick={() => onChangeBackground({ type: 'color', color: col })}
                    className="aspect-square rounded-lg border border-neutral-700 hover:scale-105 transition-transform cursor-pointer relative"
                    style={{ backgroundColor: col }}
                    title={col}
                  >
                    {currentBackground.type === 'color' && currentBackground.color === col && (
                      <Check
                        className={`w-4 h-4 absolute inset-0 m-auto ${
                          col === '#ffffff' || col === '#f8fafc' || col === '#facc15'
                            ? 'text-black'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800">
              <span className="text-xs font-semibold text-neutral-300">Mchanganyiko wa Rangi (Gradients):</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  {
                    name: 'Royal Purple',
                    angle: 180,
                    stops: [
                      { offset: 0, color: '#2e1065' },
                      { offset: 1, color: '#090514' }
                    ]
                  },
                  {
                    name: 'Deep Midnight',
                    angle: 145,
                    stops: [
                      { offset: 0, color: '#1e293b' },
                      { offset: 1, color: '#020617' }
                    ]
                  },
                  {
                    name: 'Electric Neon',
                    angle: 135,
                    stops: [
                      { offset: 0, color: '#7c3aed' },
                      { offset: 0.5, color: '#4f46e5' },
                      { offset: 1, color: '#0f172a' }
                    ]
                  },
                  {
                    name: 'Sunset Flame',
                    angle: 135,
                    stops: [
                      { offset: 0, color: '#991b1b' },
                      { offset: 0.6, color: '#ea580c' },
                      { offset: 1, color: '#450a0a' }
                    ]
                  },
                  {
                    name: 'Emerald Luxury',
                    angle: 160,
                    stops: [
                      { offset: 0, color: '#064e3b' },
                      { offset: 1, color: '#022c22' }
                    ]
                  },
                  {
                    name: 'Corporate Ocean',
                    angle: 160,
                    stops: [
                      { offset: 0, color: '#0284c7' },
                      { offset: 0.7, color: '#0f172a' },
                      { offset: 1, color: '#020617' }
                    ]
                  }
                ].map((grad, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      onChangeBackground({
                        type: 'gradient',
                        gradient: {
                          type: 'linear',
                          angle: grad.angle,
                          stops: grad.stops
                        }
                      })
                    }
                    className="h-16 rounded-xl border border-neutral-700 hover:border-amber-400 p-2 flex items-end cursor-pointer transition-all hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(${grad.angle}deg, ${grad.stops[0].color}, ${grad.stops[grad.stops.length - 1].color})`
                    }}
                  >
                    <span className="text-[11px] font-bold text-white shadow-sm">{grad.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
