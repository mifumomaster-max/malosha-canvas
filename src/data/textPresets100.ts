import { TextElement } from '../types/poster';

export type TextPresetCategory =
  | 'Zote'
  | 'Vichwa Vikuu'
  | 'Breaking News'
  | 'Biashara & Ofa'
  | 'Nukuu & Ibada'
  | 'Sherehe & Kadi'
  | 'Cheti & ID'
  | 'Takwimu & Neon';

export interface TextPresetItem {
  id: string;
  label: string;
  category: Exclude<TextPresetCategory, 'Zote'>;
  text: string;
  fontSize: number;
  fontWeight: string | number;
  fontFamily: string;
  color: string;
  extra?: Partial<TextElement>;
}

const seedList: Array<{
  cat: Exclude<TextPresetCategory, 'Zote'>;
  items: Array<[string, string, number, string | number, string, string, Partial<TextElement>?]>;
}> = [
  {
    cat: 'Vichwa Vikuu',
    items: [
      ['Kichwa Kikuu Anton', 'KICHWA KIKUU CHA BANGO', 54, 900, 'Anton', '#ffffff', { shadowColor: '#000000', shadowBlur: 14, shadowOffsetY: 4 }],
      ['Kichwa cha Dhahabu', 'TANGAZO MAALUM', 52, 900, 'Anton', '#fbbf24', { strokeColor: '#000000', strokeWidth: 3 }],
      ['Kichwa Outfit Nzito', 'UBUNIFU WA KISASA', 46, 800, 'Outfit', '#ffffff', { letterSpacing: 1 }],
      ['Bebas Neue Refu', 'TAMASHA KUBWA LA MWAKA', 56, 700, 'Bebas Neue', '#f8fafc', { letterSpacing: 3 }],
      ['Kichwa Kidogo Safi', 'Maelezo Muhimu ya Tukio Lako', 28, 700, 'Outfit', '#fcd34d'],
      ['Kichwa Chenye Mstari', 'FUNGUA BIASHARA YAKO', 38, 800, 'Outfit', '#38bdf8', { textDecoration: 'underline' }],
      ['Kichwa cha Kijani', 'HUDUMA BORA KWA WOTE', 44, 900, 'Outfit', '#34d399', { shadowColor: '#022c22', shadowBlur: 10 }],
      ['Kichwa cha Moto', 'USIKOSE FURSA HII', 50, 900, 'Anton', '#fb7185', { strokeColor: '#4c0519', strokeWidth: 2 }],
      ['Bricolage Kichwa', 'KARIBU MALOSHA STUDIO', 42, 800, 'Bricolage Grotesque', '#ffffff'],
      ['Lebo ya Juu (Kicker)', 'RASMI · TOLEO LA 2026', 16, 800, 'Outfit', '#fbbf24', { letterSpacing: 4 }],
      ['Kichwa Nyuma Nyeusi', 'TANGAZO LA MUHIMU', 36, 900, 'Outfit', '#ffffff', { backgroundColor: '#0f172a', borderRadius: 10 }],
      ['Kichwa Kasha Dhahabu', 'MPYA KABISA DUKANI', 32, 900, 'Outfit', '#000000', { backgroundColor: '#fbbf24', borderRadius: 10 }],
      ['Kichwa Nusu Uwazi', 'KARIBU UJIONEE', 40, 800, 'Outfit', '#e2e8f0', { backgroundColor: 'rgba(15,23,42,0.7)', borderRadius: 12 }],
      ['Aya ya Maelezo', 'Andika maelezo ya kina hapa. Weka mahali, saa, tarehe na namba za mawasiliano.', 18, 400, 'Plus Jakarta Sans', '#e2e8f0'],
      ['Mstari wa Mawasiliano', 'Piga Simu: +255 755 000 000 · Dar es Salaam', 18, 700, 'Outfit', '#94a3b8']
    ]
  },
  {
    cat: 'Breaking News',
    items: [
      ['BREAKING NEWS Nyekundu', 'BREAKING NEWS', 48, 900, 'Anton', '#ffffff', { backgroundColor: '#dc2626', borderRadius: 6, letterSpacing: 2 }],
      ['HABARI MPYA SASA', 'HABARI ZILIZOTUFIKIA HIVI PUNDE', 28, 900, 'Outfit', '#000000', { backgroundColor: '#facc15', borderRadius: 4, letterSpacing: 1 }],
      ['LIVE MUBASHARA', '● MUBASHARA SASA', 20, 800, 'Outfit', '#ffffff', { backgroundColor: '#b91c1c', borderRadius: 99, letterSpacing: 2 }],
      ['TAARIFA KWA UMMA', 'TAARIFA RASMI KWA UMMA', 34, 900, 'Outfit', '#ffffff', { backgroundColor: '#1e3a8a', borderRadius: 6 }],
      ['Kichwa cha Habari', 'MABADILIKO MAKUBWA YATANGAZWA LEO ASUBUHI', 42, 900, 'Anton', '#ffffff', { shadowColor: '#000000', shadowBlur: 12 }],
      ['Ticker ya Chini', 'FUATILIA HABARI ZETU KILA SAA · @MALOSHATV', 16, 700, 'Outfit', '#facc15', { backgroundColor: '#09090b', letterSpacing: 1.5 }],
      ['EXCLUSIVE Habari', 'HABARI YA KIPEKEE (EXCLUSIVE)', 24, 900, 'Outfit', '#ffffff', { backgroundColor: '#7c3aed', borderRadius: 6, letterSpacing: 2 }],
      ['ALERT Tahadhari', 'TAHADHARI YA HALI YA HEWA', 36, 900, 'Anton', '#facc15', { backgroundColor: '#991b1b', borderRadius: 8 }],
      ['Ripota & Chanzo', 'Na Mwandishi Wetu · Dar es Salaam', 16, 600, 'Plus Jakarta Sans', '#cbd5e1', { fontStyle: 'italic' }],
      ['HABARI ZA MICHEZO', 'MICHEZO & LIGI KUU LEO', 32, 900, 'Outfit', '#ffffff', { backgroundColor: '#15803d', borderRadius: 6 }],
      ['MAGAZINE Cover Masthead', 'MALOSHA JARIDA', 62, 900, 'Playfair Display', '#ffffff', { letterSpacing: 3, shadowColor: '#000000', shadowBlur: 16 }],
      ['TOLEO LA MWEZI', 'TOLEO #42 · MEI 2026 · TSH 5,000', 15, 800, 'Outfit', '#fbbf24', { letterSpacing: 2 }],
      ['Makala Kuu Jarida', 'SIRI 10 ZA MAFANIKIO YA BIASHARA AFRIKA', 34, 800, 'Playfair Display', '#f8fafc'],
      ['Kichwa Cha Jarida Bluu', 'TEKNOLOJIA & UBUNIFU', 44, 900, 'Bebas Neue', '#38bdf8', { letterSpacing: 3 }],
      ['Hadithi Ndani ya Jarida', 'UKURASA WA 14: MAHOJIANO MAALUM', 18, 700, 'Outfit', '#e2e8f0', { backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 6 }]
    ]
  },
  {
    cat: 'Biashara & Ofa',
    items: [
      ['OFA KUBWA 50%', 'PUNGUZO LA 50% LEO!', 52, 900, 'Anton', '#fbbf24', { strokeColor: '#000000', strokeWidth: 4, shadowColor: '#000000', shadowBlur: 10 }],
      ['NUNUA 1 PATA 1', 'NUNUA 1 PATA 1 BURE', 36, 900, 'Outfit', '#ffffff', { backgroundColor: '#e11d48', borderRadius: 12 }],
      ['BEI YA OFA TSH', 'TSH 25,000/= TU', 46, 900, 'Anton', '#10b981', { shadowColor: '#000000', shadowBlur: 12 }],
      ['TUNAPATIKANA', 'TUNAPATIKANA KARIAKOO & MTANDAONI', 20, 700, 'Outfit', '#f8fafc', { backgroundColor: '#1e293b', borderRadius: 8 }],
      ['WEKA ODA SASA', 'AGIZA SASA · TUNAKULETEA POPOTE', 24, 800, 'Outfit', '#000000', { backgroundColor: '#22c55e', borderRadius: 99 }],
      ['LIPA KWA M-PESA', 'LIPA NAMBA: 554433 (MALOSHA)', 22, 800, 'Outfit', '#ffffff', { backgroundColor: '#dc2626', borderRadius: 10 }],
      ['BIDHAA MPYA', 'MZIGO MPYA UMEWASILI!', 42, 900, 'Outfit', '#facc15', { strokeColor: '#000000', strokeWidth: 2 }],
      ['HUDUMA 24/7', 'TUNAFUNGUA SAA 24 KILA SIKU', 20, 700, 'Outfit', '#38bdf8', { letterSpacing: 1.5 }],
      ['DELIVERY BURE', 'USAFIRI NI BURE NDANI YA MJI', 24, 800, 'Outfit', '#000000', { backgroundColor: '#fbbf24', borderRadius: 8 }],
      ['DHAMANA 100%', 'UBORA WA KIMATAIFA · WARRANTY MWAKA 1', 18, 800, 'Outfit', '#a7f3d0', { letterSpacing: 1 }],
      ['TUNAAJIRI (HIRING)', 'NAFASI ZA KAZI ZINAPATIKANA', 38, 900, 'Anton', '#38bdf8', { shadowColor: '#0f172a', shadowBlur: 10 }],
      ['BLACK FRIDAY SALE', 'MSIMU WA PUNGUZO KUBWA', 46, 900, 'Bebas Neue', '#fbbf24', { backgroundColor: '#000000', borderRadius: 8, letterSpacing: 3 }],
      ['JINA LA KAMPUNI', 'MALOSHA ENTERPRISES LTD', 32, 900, 'Outfit', '#ffffff', { letterSpacing: 2 }],
      ['Nafasi Kwenye Business Card', 'Mkurugenzi Mkuu / Designer', 18, 600, 'Plus Jakarta Sans', '#fbbf24'],
      ['Anwani Business Card', 'Barua Pepe: info@malosha.co.tz\nTovuti: www.malosha.co.tz\nSimu: +255 712 345 678', 16, 500, 'Plus Jakarta Sans', '#cbd5e1', { textAlign: 'left' }]
    ]
  },
  {
    cat: 'Nukuu & Ibada',
    items: [
      ['Nukuu ya Kifahari', '“Mafanikio ni matokeo ya nidhamu ya kila siku.”', 30, 600, 'Playfair Display', '#f8fafc', { fontStyle: 'italic' }],
      ['Nukuu ya Dhahabu', '“Anza ulipo, tumia ulichonacho, fanya uwezavyo.”', 28, 700, 'Playfair Display', '#fcd34d', { fontStyle: 'italic' }],
      ['Nukuu Nzito (Impact)', 'USIKATE TAMAA.\nKESHO YAKO NI KUBWA.', 44, 900, 'Anton', '#ffffff', { lineHeight: 1.15 }],
      ['Msemaji wa Nukuu', '— HEKIMA YA LEO —', 16, 800, 'Outfit', '#fbbf24', { letterSpacing: 4 }],
      ['Nukuu Nyeusi kwenye Nyeupe', '“Kila hatua ndogo inakupeleka kileleni.”', 28, 700, 'Playfair Display', '#0f172a', { fontStyle: 'italic' }],
      ['Kichwa cha Ibada', 'MKUTANO MKUU WA INJILI', 48, 900, 'Anton', '#fbbf24', { shadowColor: '#000000', shadowBlur: 14 }],
      ['Mada ya Mahubiri', 'NGUVU YA MAOMBI & USHINDI', 32, 800, 'Playfair Display', '#ffffff'],
      ['Aya ya Biblia / Quran', '“Bwana ndiye mchungaji wangu, sitapungukiwa na kitu.”', 22, 600, 'Playfair Display', '#fde68a', { fontStyle: 'italic' }],
      ['Ratiba ya Ibada', 'JUMAPILI · SAA 3:00 ASUBUHI', 22, 800, 'Outfit', '#ffffff', { backgroundColor: '#7c3aed', borderRadius: 99 }],
      ['Mchungaji / Mnenaji', 'Mnenaji: Mch. / Askofu Mgeni', 22, 700, 'Outfit', '#e2e8f0'],
      ['Wito wa Kiroho', 'KARIBU UPATE BARAKA & UPONYAJI', 24, 800, 'Outfit', '#34d399'],
      ['Ramadhan / Eid Kareem', 'EID MUBARAK · AMANI NA BARAKA', 40, 800, 'Playfair Display', '#fbbf24'],
      ['Krismasi Njema', 'HERI YA KRISMASI & MWAKA MPYA', 38, 800, 'Playfair Display', '#fef08a'],
      ['Rambirambi / Kumbukumbu', 'TUNAOMBOLEZA PAMOJA NANYI', 28, 700, 'Playfair Display', '#e2e8f0', { fontStyle: 'italic' }],
      ['Nukuu ya Motisha Biashara', '“UBORA HAUJIFICHI — UNAJIONYESHA WENYEWE.”', 26, 800, 'Outfit', '#38bdf8', { letterSpacing: 1 }]
    ]
  },
  {
    cat: 'Sherehe & Kadi',
    items: [
      ['MWALIKO WA HARUSI', 'MWALIKO RASMI WA HARUSI', 38, 700, 'Playfair Display', '#fbbf24', { letterSpacing: 2 }],
      ['Majina ya Maharusi', 'Juma & Amina', 52, 700, 'Playfair Display', '#ffffff', { fontStyle: 'italic' }],
      ['Tarehe ya Sherehe', 'JUMAMOSI, 24 AGOSTI 2026 · SAA 12 JIONI', 20, 700, 'Outfit', '#fde68a', { letterSpacing: 2 }],
      ['Ukumbi wa Sherehe', 'UKUMBI WA MLIMANI CITY HALL', 22, 800, 'Outfit', '#f8fafc'],
      ['RSVP Mawasiliano', 'Thibitisha Ushiriki (RSVP): 0755 123 456', 16, 600, 'Plus Jakarta Sans', '#cbd5e1'],
      ['HAPPY BIRTHDAY!', 'HERI YA SIKU YA KUZALIWA!', 46, 900, 'Outfit', '#f472b6', { shadowColor: '#000000', shadowBlur: 12 }],
      ['SEND-OFF / KITCHEN PARTY', 'SHEREHE YA SEND-OFF', 42, 800, 'Playfair Display', '#fcd34d'],
      ['GRADUATION PARTY', 'PONGEZI KWA KUHITIMU!', 40, 900, 'Anton', '#fbbf24'],
      ['TAMASHA LA MUZIKI', 'USIKU WA BURUDANI & LIVE BAND', 44, 900, 'Anton', '#f43f5e', { strokeColor: '#ffffff', strokeWidth: 2 }],
      ['KIINGILIO VIP / KAWAIDA', 'VIP: TSH 50,000 | KAWAIDA: TSH 20,000', 22, 800, 'Outfit', '#000000', { backgroundColor: '#fbbf24', borderRadius: 10 }],
      ['KADI YA MSHINDI', 'HONGERA KWA USHINDI MKUBWA!', 34, 900, 'Outfit', '#10b981'],
      ['DRESS CODE', 'VAZI RASMI: DHAHABU & NYEUSI', 16, 700, 'Outfit', '#fde68a', { letterSpacing: 2 }],
      ['BABY SHOWER', 'KARIBU BABY SHOWER', 40, 700, 'Playfair Display', '#fbcfe8', { fontStyle: 'italic' }],
      ['MWALIKO WA DINNER', 'CHAKULA CHA JIONI CHA HESHIMA', 30, 700, 'Playfair Display', '#ffffff'],
      ['TIKETI NAMBA', 'TIKETI #001 · KITI CHA MBELE', 18, 800, 'Outfit', '#ffffff', { backgroundColor: '#2563eb', borderRadius: 6 }]
    ]
  },
  {
    cat: 'Cheti & ID',
    items: [
      ['CHETI CHA HESHIMA', 'CHETI CHA HESHIMA', 48, 800, 'Playfair Display', '#fbbf24', { letterSpacing: 4 }],
      ['Certificate of Appreciation', 'CHETI CHA SHUKRANI', 44, 800, 'Playfair Display', '#0f172a', { letterSpacing: 3 }],
      ['Cheti Kinatolewa Kwa', 'KINATOLEWA KWA HESHIMA KUBWA KWA:', 16, 700, 'Outfit', '#64748b', { letterSpacing: 3 }],
      ['Jina Kwenye Cheti', 'AMINA HASSAN MWANGI', 44, 700, 'Playfair Display', '#1e293b', { textDecoration: 'underline', fontStyle: 'italic' }],
      ['Maelezo ya Cheti', 'Kwa kutambua mchango wake mkubwa, ubunifu na ufanisi katika mafunzo ya mwaka 2026.', 18, 500, 'Plus Jakarta Sans', '#334155'],
      ['Sahihi ya Mkuu', '____________________\nMkurugenzi Mkuu', 15, 600, 'Plus Jakarta Sans', '#475569'],
      ['Sahihi ya Mlezi', '____________________\nMeneja wa Programu', 15, 600, 'Plus Jakarta Sans', '#475569'],
      ['KITAMBULISHO (STAFF ID)', 'KITAMBULISHO CHA KAZI', 24, 900, 'Outfit', '#ffffff', { letterSpacing: 2 }],
      ['Jina Kwenye ID Card', 'BARAKA J. KILONZO', 30, 800, 'Outfit', '#0f172a'],
      ['Cheo Kwenye ID Card', 'AFISA TEHAMA MKUU', 18, 800, 'Outfit', '#0284c7', { letterSpacing: 1.5 }],
      ['Namba ya Kitambulisho', 'ID NO: MLS-2026-084', 16, 700, 'Outfit', '#334155', { backgroundColor: '#e2e8f0', borderRadius: 6 }],
      ['Kitambulisho cha Mwanafunzi', 'MWANAFUNZI · SHULE YA SEKONDARI', 18, 800, 'Outfit', '#ffffff', { backgroundColor: '#1d4ed8', borderRadius: 8 }],
      ['ID Valid Until', 'HALALI HADI: DESEMBA 2027', 14, 700, 'Outfit', '#64748b', { letterSpacing: 1 }],
      ['PRESS / MEDIA PASS', 'PRESS · MWANDISHI WA HABARI', 24, 900, 'Anton', '#ffffff', { backgroundColor: '#dc2626', borderRadius: 6, letterSpacing: 2 }],
      ['VIP ALL ACCESS', 'VIP · ALL ACCESS PASS', 26, 900, 'Anton', '#000000', { backgroundColor: '#fbbf24', borderRadius: 8, letterSpacing: 2 }]
    ]
  },
  {
    cat: 'Takwimu & Neon',
    items: [
      ['Namba Kubwa +148%', '+148%', 64, 900, 'Anton', '#10b981', { shadowColor: 'rgba(16,185,129,0.5)', shadowBlur: 18 }],
      ['Namba Kubwa 98.5%', '98.5%', 64, 900, 'Anton', '#38bdf8'],
      ['Kiasi TSH 450M', 'TSH 450M+', 54, 900, 'Anton', '#fbbf24'],
      ['Mwaka 2026', '2026', 68, 900, 'Bebas Neue', '#ffffff', { letterSpacing: 4 }],
      ['NEON Cyan', 'TEKNOLOJIA YA KESHO', 42, 900, 'Outfit', '#22d3ee', { shadowColor: '#06b6d4', shadowBlur: 22 }],
      ['NEON Pink', 'USIKU WA VIP PARTY', 44, 900, 'Outfit', '#f472b6', { shadowColor: '#ec4899', shadowBlur: 24 }],
      ['NEON Lime', 'KASI · UBORA · USHINDI', 40, 900, 'Outfit', '#a3e635', { shadowColor: '#84cc16', shadowBlur: 20 }],
      ['NEON Gold', 'TOLEO LA DHAHABU', 42, 900, 'Outfit', '#fde047', { shadowColor: '#eab308', shadowBlur: 20 }],
      ['Chanzo cha Takwimu', 'Chanzo: Ripoti ya Takwimu za Ndani 2026', 14, 500, 'Plus Jakarta Sans', '#94a3b8'],
      ['HATUA 01 · 02 · 03', 'HATUA YA 01: MIPANGO', 26, 800, 'Outfit', '#38bdf8', { backgroundColor: '#0f172a', borderRadius: 8 }]
    ]
  }
];

export const TEXT_PRESETS_100: TextPresetItem[] = seedList.flatMap((group, gIdx) =>
  group.items.map((item, iIdx) => ({
    id: `txt_preset_${gIdx + 1}_${iIdx + 1}`,
    label: item[0],
    category: group.cat,
    text: item[1],
    fontSize: item[2],
    fontWeight: item[3],
    fontFamily: item[4],
    color: item[5],
    extra: item[6]
  }))
);
