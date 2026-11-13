export interface ProfessionLogoSeed {
  name: string;
  subtitle: string;
}

export interface ProfessionLogoGroup {
  category: string;
  profession: string;
  emblems: string[];
  palettes: Array<[string, string]>; // [primaryColor, secondaryColor]
  items: ProfessionLogoSeed[];
}

export const LOGO_PROFESSION_GROUPS: ProfessionLogoGroup[] = [
  // ======================== 1. ELIMU (7 Fani) ========================
  {
    category: 'Elimu',
    profession: 'Shule ya Awali & Chekechea',
    emblems: ['sprout', 'star', 'book'],
    palettes: [
      ['#f59e0b', '#1e1b4b'],
      ['#fb7185', '#0f172a'],
      ['#10b981', '#ffffff']
    ],
    items: [
      { name: 'NYOTA DAYCARE', subtitle: 'NURSERY & KINDERGARTEN' },
      { name: 'MCHE MDOGO', subtitle: 'EARLY CHILDHOOD ACADEMY' },
      { name: 'TUMAINI KIDS', subtitle: 'MONTESSORI LEARNING' },
      { name: 'JUA ANGAVU', subtitle: 'PRE-SCHOOL & CRECHE' },
      { name: 'UPINDO NURSERY', subtitle: 'PLAYGROUP & CARE' },
      { name: 'BARAKA TOTS', subtitle: 'BRIGHT START CENTER' },
      { name: 'KIPEPEO PRE', subtitle: 'CREATIVE KIDS SCHOOL' },
      { name: 'FURAHA NEST', subtitle: 'KINDERGARTEN & CARE' },
      { name: 'AMANI BLOOM', subtitle: 'FOUNDATION PRESCHOOL' },
      { name: 'TABASAMU KIDS', subtitle: 'LEARNING GARDEN' }
    ]
  },
  {
    category: 'Elimu',
    profession: 'Shule ya Msingi',
    emblems: ['book', 'cap', 'shield'],
    palettes: [
      ['#3b82f6', '#0f172a'],
      ['#fbbf24', '#172554'],
      ['#1d4ed8', '#ffffff']
    ],
    items: [
      { name: 'MWANGA PRIMARY', subtitle: 'ENGLISH MEDIUM SCHOOL' },
      { name: 'AZIMIO JUNIOR', subtitle: 'EXCELLENCE IN LEARNING' },
      { name: 'UJENZI PRIMARY', subtitle: 'KNOWLEDGE & DISCIPLINE' },
      { name: 'HAZINA SCHOOL', subtitle: 'PRIMARY EDUCATION' },
      { name: 'KILIMA PRIMARY', subtitle: 'FUTURE LEADERS ACADEMY' },
      { name: 'BUSARA JUNIOR', subtitle: 'NURTURING YOUNG MINDS' },
      { name: 'MAARIFA SCHOOL', subtitle: 'ENGLISH MEDIUM' },
      { name: 'UHURU PRIMARY', subtitle: 'FOUNDATION STUDIES' },
      { name: 'SHUJAA ACADEMY', subtitle: 'JUNIOR PREPARATORY' },
      { name: 'TANGA HILLSIDE', subtitle: 'PRIMARY PREPARATORY' }
    ]
  },
  {
    category: 'Elimu',
    profession: 'Shule ya Sekondari',
    emblems: ['shield', 'cap', 'book'],
    palettes: [
      ['#eab308', '#1e3a8a'],
      ['#38bdf8', '#020617'],
      ['#b91c1c', '#ffffff']
    ],
    items: [
      { name: 'VICTORIA HIGH', subtitle: 'SECONDARY & A-LEVEL' },
      { name: 'KIBO SEMINARY', subtitle: 'MORAL & ACADEMIC HONOR' },
      { name: 'RUFIJI COLLEGE', subtitle: 'O-LEVEL & A-LEVEL' },
      { name: 'MWENGE HIGH', subtitle: 'SCIENCE & ARTS SCHOOL' },
      { name: 'SONGEA BOYS', subtitle: 'DISCIPLINE & MERIT' },
      { name: 'MERU GIRLS HIGH', subtitle: 'EMPOWERING SCHOLARS' },
      { name: 'DODOMA HIGH', subtitle: 'BOARDING SECONDARY' },
      { name: 'ARUSHA SUMMIT', subtitle: 'CAMBRIDGE HIGH SCHOOL' },
      { name: 'TABORA SCHOLARS', subtitle: 'SECONDARY ACADEMY' },
      { name: 'KARAGWE HIGH', subtitle: 'EXCELLENCE & INTEGRITY' }
    ]
  },
  {
    category: 'Elimu',
    profession: 'Chuo Kikuu',
    emblems: ['cap', 'shield', 'globe'],
    palettes: [
      ['#fbbf24', '#1e1b4b'],
      ['#0284c7', '#0f172a'],
      ['#7c2d12', '#fffbeb']
    ],
    items: [
      { name: 'CHUO CHA PWANI', subtitle: 'RESEARCH & INNOVATION' },
      { name: 'EAST AFRICA UNI', subtitle: 'HIGHER EDUCATION' },
      { name: 'SWAHILI VARSITY', subtitle: 'FACULTY OF SCIENCES' },
      { name: 'KIGAMBONI UNI', subtitle: 'GRADUATE INSTITUTE' },
      { name: 'SAVANNAH VARSITY', subtitle: 'GLOBAL SCHOLARS' },
      { name: 'TANZANIA POLY', subtitle: 'UNIVERSITY OF SCIENCE' },
      { name: 'MLIMANI INSTITUTE', subtitle: 'ACADEMIC EXCELLENCE' },
      { name: 'NYANZA UNIVERSITY', subtitle: 'KNOWLEDGE FOR SERVICE' },
      { name: 'GREAT LAKES UNI', subtitle: 'ARTS & ENGINEERING' },
      { name: 'TANGANYIKA UNI', subtitle: 'DOCTORAL & DEGREE' }
    ]
  },
  {
    category: 'Elimu',
    profession: 'Chuo cha Ufundi (VETA)',
    emblems: ['wrench', 'helmet_build', 'cap'],
    palettes: [
      ['#f97316', '#18181b'],
      ['#38bdf8', '#0f172a'],
      ['#15803d', '#ffffff']
    ],
    items: [
      { name: 'UFUNDI STADI', subtitle: 'VOCATIONAL TRAINING' },
      { name: 'KAZI MIKONO', subtitle: 'TECHNICAL POLYTECHNIC' },
      { name: 'STADI INSTITUTE', subtitle: 'SKILLS & ENGINEERING' },
      { name: 'VIJANA VOCATIONAL', subtitle: 'ARTISAN COLLEGE' },
      { name: 'MBEYA TECH VETA', subtitle: 'TRADE & CRAFT CENTER' },
      { name: 'MOROGORO SKILLS', subtitle: 'PRACTICAL TRAINING' },
      { name: 'CHUO CHA UJENZI', subtitle: 'MASONRY & ELECTRICAL' },
      { name: 'UWEZO TECHNICAL', subtitle: 'CAREER WORKSHOPS' },
      { name: 'MAARIFA VETA', subtitle: 'AUTO & WELDING SCHOOL' },
      { name: 'MWANZA ARTISANS', subtitle: 'INDUSTRIAL SKILLS' }
    ]
  },
  {
    category: 'Elimu',
    profession: 'Mafunzo ya Kompyuta & Lugha',
    emblems: ['code_chip', 'globe', 'book'],
    palettes: [
      ['#06b6d4', '#09090b'],
      ['#818cf8', '#0f172a'],
      ['#0f766e', '#ffffff']
    ],
    items: [
      { name: 'KISWAHILI HUB', subtitle: 'LANGUAGE & CULTURE' },
      { name: 'DIGITAL CAMPUS', subtitle: 'IT BOOTCAMP & OFFICE' },
      { name: 'POLYGLOT SCHOOL', subtitle: 'FRENCH, ENGLISH, SWAHILI' },
      { name: 'CODELAB ACADEMY', subtitle: 'CODING FOR ALL' },
      { name: 'LUGHA CENTER', subtitle: 'FLUENCY & TRANSLATION' },
      { name: 'SMART SKILLS', subtitle: 'COMPUTER LITERACY' },
      { name: 'BRAINWAVE TECH', subtitle: 'DIGITAL CERTIFICATION' },
      { name: 'SPEAKGLOBAL', subtitle: 'LANGUAGE INSTITUTE' },
      { name: 'DATA SCHOLARS', subtitle: 'EXCEL & ANALYTICS' },
      { name: 'KARIAKOO IT HUB', subtitle: 'PRACTICAL COMPUTING' }
    ]
  },
  {
    category: 'Elimu',
    profession: 'Maktaba & Uchapishaji wa Vitabu',
    emblems: ['book', 'star', 'crown'],
    palettes: [
      ['#d97706', '#1c1917'],
      ['#3b82f6', '#0f172a'],
      ['#4c1d95', '#ffffff']
    ],
    items: [
      { name: 'MAKTABA KUU', subtitle: 'PUBLIC & DIGITAL LIBRARY' },
      { name: 'CHAPISHO BORA', subtitle: 'EDUCATIONAL PUBLISHERS' },
      { name: 'KURASA PRESS', subtitle: 'TEXTBOOKS & NOVELS' },
      { name: 'KALAMU BOOKS', subtitle: 'AFRICAN LITERATURE' },
      { name: 'DIWANI PUBLISH', subtitle: 'ACADEMIC JOURNALS' },
      { name: 'RIWAYA HOUSE', subtitle: 'SWAHILI BOOKSTORE' },
      { name: 'ELIMU PRESS', subtitle: 'CURRICULUM BOOKS' },
      { name: 'SOMO LIBRARY', subtitle: 'STUDY & ARCHIVES' },
      { name: 'WINO PUBLISHERS', subtitle: 'PRINT & E-BOOKS' },
      { name: 'FASIHI ARCHIVE', subtitle: 'HERITAGE READING ROOM' }
    ]
  },

  // ======================== 2. HOSPITALI & AFYA (8 Fani) ========================
  {
    category: 'Hospitali & Afya',
    profession: 'Hospitali Kuu & Rufaa',
    emblems: ['cross_med', 'heart', 'pulse'],
    palettes: [
      ['#0ea5e9', '#0f172a'],
      ['#ef4444', '#ffffff'],
      ['#14b8a6', '#042f2e']
    ],
    items: [
      { name: 'TUMAINI HOSPITAL', subtitle: 'SPECIALIZED REFERRAL' },
      { name: 'UHAI MEDCENTER', subtitle: '24/7 EMERGENCY CARE' },
      { name: 'AMANI MEDICAL', subtitle: 'SURGERY & INPATIENT' },
      { name: 'ST. LUKE HEALTH', subtitle: 'COMPASSIONATE HOSPITAL' },
      { name: 'DAR MEDIPLUS', subtitle: 'MULTI-SPECIALTY HOSPITAL' },
      { name: 'MBEZI REGIONAL', subtitle: 'MODERN MEDICAL CENTER' },
      { name: 'FARAJA GENERAL', subtitle: 'TRUSTED HEALTHCARE' },
      { name: 'KILIMA HOSPITAL', subtitle: 'CARDIAC & TRAUMA CARE' },
      { name: 'SALAMA REFERRAL', subtitle: 'MEDICAL EXCELLENCE' },
      { name: 'UPENDO HOSPITAL', subtitle: 'FAMILY & SURGICAL CARE' }
    ]
  },
  {
    category: 'Hospitali & Afya',
    profession: 'Kliniki & Zahanati',
    emblems: ['cross_med', 'pulse', 'shield'],
    palettes: [
      ['#10b981', '#022c22'],
      ['#0284c7', '#ffffff'],
      ['#38bdf8', '#0f172a']
    ],
    items: [
      { name: 'ZAHANATI BORA', subtitle: 'PRIMARY HEALTH CLINIC' },
      { name: 'MAISHA POLYCLINIC', subtitle: 'OUTPATIENT & CONSULT' },
      { name: 'NEEMA HEALTHHUB', subtitle: 'COMMUNITY DISPENSARY' },
      { name: 'TABIBU CLINIC', subtitle: 'FAMILY PHYSICIANS' },
      { name: 'MBEZI CARE POINT', subtitle: 'WALK-IN MEDICAL' },
      { name: 'KIGOGO CLINIC', subtitle: 'URGENT & GENERAL CARE' },
      { name: 'SIHA POLYCLINIC', subtitle: 'DOCTOR CONSULTATION' },
      { name: 'SINZA MEDPOINT', subtitle: '24H CLINIC SERVICES' },
      { name: 'BONDENI HEALTH', subtitle: 'RURAL & URBAN CLINIC' },
      { name: 'RAHA WELLCARE', subtitle: 'DAILY MEDICAL CHECKUP' }
    ]
  },
  {
    category: 'Hospitali & Afya',
    profession: 'Duka la Dawa (Famasi)',
    emblems: ['cross_med', 'flask', 'leaf'],
    palettes: [
      ['#22c55e', '#052e16'],
      ['#16a34a', '#ffffff'],
      ['#2dd4bf', '#0f172a']
    ],
    items: [
      { name: 'FAMASI KWANZA', subtitle: 'LICENSED PHARMACY' },
      { name: 'DAWA SALAMA', subtitle: 'PRESCRIPTION & CARE' },
      { name: 'TIBA CHEMIST', subtitle: '24H PHARMACY STORE' },
      { name: 'UZIMA PHARMA', subtitle: 'WHOLESALE & RETAIL MEDS' },
      { name: 'KIJANI PHARMACY', subtitle: 'WELLNESS & SUPPLEMENTS' },
      { name: 'HAKI DRUGSTORE', subtitle: 'GENUINE MEDICINES' },
      { name: 'MSASANI PHARMA', subtitle: 'CLINICAL PHARMACISTS' },
      { name: 'ARUSHA CHEMIST', subtitle: 'DISPENSING & ADVICE' },
      { name: 'KISUTU MEDS', subtitle: 'RAPID PRESCRIPTION' },
      { name: 'AFYA PHARMACARE', subtitle: 'MEDICAL SUPPLIES' }
    ]
  },
  {
    category: 'Hospitali & Afya',
    profession: 'Kliniki ya Meno',
    emblems: ['star', 'cross_med', 'shield'],
    palettes: [
      ['#38bdf8', '#0c4a6e'],
      ['#06b6d4', '#ffffff'],
      ['#a7f3d0', '#064e3b']
    ],
    items: [
      { name: 'TABASAMU DENTAL', subtitle: 'ORTHODONTICS & IMPLANTS' },
      { name: 'LULU SMILES', subtitle: 'COSMETIC DENTISTRY' },
      { name: 'MENO SAFI CLINIC', subtitle: 'PAINLESS DENTAL CARE' },
      { name: 'NURU ORAL CARE', subtitle: 'BRACES & WHITENING' },
      { name: 'PEARL DENTISTRY', subtitle: 'FAMILY DENTAL STUDIO' },
      { name: 'WHITECREST DENTAL', subtitle: 'ENDODONTIC SPECIALISTS' },
      { name: 'SIMBA SMILES', subtitle: 'KIDS & ADULT DENTAL' },
      { name: 'KIBO DENTAL HUB', subtitle: 'DIGITAL X-RAY & CARE' },
      { name: 'BRIGHTBITE', subtitle: 'ORAL SURGERY CLINIC' },
      { name: 'SAFARI DENTALS', subtitle: 'MODERN HYGIENE CLINIC' }
    ]
  },
  {
    category: 'Hospitali & Afya',
    profession: 'Kliniki ya Macho',
    emblems: ['camera', 'cross_med', 'globe'],
    palettes: [
      ['#6366f1', '#0f172a'],
      ['#0284c7', '#ffffff'],
      ['#22d3ee', '#1e1b4b']
    ],
    items: [
      { name: 'UONO BORA', subtitle: 'OPTOMETRY & EYE SURGERY' },
      { name: 'MWANGA OPTICS', subtitle: 'DESIGNER FRAMES & LENS' },
      { name: 'MACHO SALAMA', subtitle: 'GLAUCOMA & CATARACT' },
      { name: 'CLEARVIEW OPTIC', subtitle: 'PRECISION EYE EXAMS' },
      { name: 'TASWIRA VISION', subtitle: 'CONTACT LENS CENTER' },
      { name: 'SHAMSA OPTICIANS', subtitle: 'PRESCRIPTION GLASSES' },
      { name: 'KIGOMA EYE CARE', subtitle: 'COMMUNITY OPHTHALMOLOGY' },
      { name: 'FOCUS OPTOMETRY', subtitle: 'DIGITAL RETINA SCAN' },
      { name: 'IRIS EYE HOSPITAL', subtitle: 'LASIK & VISION CARE' },
      { name: 'DAR EYEWEAR', subtitle: 'OPTICAL BOUTIQUE' }
    ]
  },
  {
    category: 'Hospitali & Afya',
    profession: 'Maabara ya Uchunguzi',
    emblems: ['flask', 'pulse', 'cross_med'],
    palettes: [
      ['#06b6d4', '#083344'],
      ['#7c3aed', '#ffffff'],
      ['#3b82f6', '#020617']
    ],
    items: [
      { name: 'VIPIMO HARAKA', subtitle: 'DIAGNOSTIC PATHOLOGY' },
      { name: 'BIOLAB TANZANIA', subtitle: 'BLOOD, DNA & MICROBIOLOGY' },
      { name: 'PRECISION LABS', subtitle: 'MRI, CT & ULTRASOUND' },
      { name: 'UCHUNGUZI MEDLAB', subtitle: 'ACCURATE TEST RESULTS' },
      { name: 'CORE DIAGNOSTICS', subtitle: 'CLINICAL BIOCHEMISTRY' },
      { name: 'ALPHA RADIOLOGY', subtitle: 'DIGITAL IMAGING CENTER' },
      { name: 'SEROLOGY LAB', subtitle: 'IMMUNOLOGY & SCREENING' },
      { name: 'VERITAS MEDLAB', subtitle: 'ISO CERTIFIED LAB' },
      { name: 'HEALTHSCAN TZ', subtitle: 'FULL BODY CHECKUP' },
      { name: 'NILE PATHOLOGY', subtitle: 'SPECIMEN ANALYSIS' }
    ]
  },
  {
    category: 'Hospitali & Afya',
    profession: 'Afya ya Mama & Mtoto',
    emblems: ['heart', 'sprout', 'cross_med'],
    palettes: [
      ['#f472b6', '#4a044e'],
      ['#ec4899', '#ffffff'],
      ['#fb7185', '#1e1b4b']
    ],
    items: [
      { name: 'MAMA CARE', subtitle: 'MATERNITY & OBSTETRICS' },
      { name: 'MALAIKA PEDIATRIC', subtitle: 'CHILDREN HEALTH CENTER' },
      { name: 'UZAZI SALAMA', subtitle: 'ANTENATAL & DELIVERY' },
      { name: 'KIZAZI CLINIC', subtitle: 'NEONATAL INTENSIVE CARE' },
      { name: 'BINTI WELLNESS', subtitle: 'GYNECOLOGY SPECIALISTS' },
      { name: 'MTOTO SHUPAVU', subtitle: 'IMMUNIZATION & GROWTH' },
      { name: 'WEMA MATERNITY', subtitle: 'SAFE BIRTH HOSPITAL' },
      { name: 'TOTO MEDICARE', subtitle: 'PEDIATRIC DOCTORS' },
      { name: 'HAZINA YA MAMA', subtitle: 'MOTHER & BABY UNIT' },
      { name: 'AMARA FERTILITY', subtitle: 'WOMEN & REPRODUCTIVE' }
    ]
  },
  {
    category: 'Hospitali & Afya',
    profession: 'Tiba Asili & Lishe',
    emblems: ['leaf', 'sprout', 'heart'],
    palettes: [
      ['#84cc16', '#14532d'],
      ['#059669', '#ffffff'],
      ['#f59e0b', '#064e3b']
    ],
    items: [
      { name: 'LISHE BORA', subtitle: 'CLINICAL NUTRITIONISTS' },
      { name: 'MIZIZI HERBALS', subtitle: 'NATURAL BOTANICAL CARE' },
      { name: 'ASILI WELLNESS', subtitle: 'HOLISTIC THERAPY' },
      { name: 'VYAKULA TIBA', subtitle: 'DIET & WEIGHT CLINIC' },
      { name: 'KIGAMBONI DETOX', subtitle: 'ORGANIC HEALTH SPA' },
      { name: 'PHYTO VITALITY', subtitle: 'HERBAL FORMULATIONS' },
      { name: 'MORINGA CARE', subtitle: 'SUPERFOOD SUPPLEMENTS' },
      { name: 'CHAKULA AFYA', subtitle: 'DIABETES & HEART DIET' },
      { name: 'MIMEA TIBA', subtitle: 'CERTIFIED BOTANICALS' },
      { name: 'BALANCE CLINIC', subtitle: 'PHYSIOTHERAPY & DIET' }
    ]
  },

  // ======================== 3. MAKANISA & IMANI (6 Fani) ========================
  {
    category: 'Makanisa & Imani',
    profession: 'Kanisa & Huduma ya Injili',
    emblems: ['church_cross', 'crown', 'heart'],
    palettes: [
      ['#fbbf24', '#3b0764'],
      ['#eab308', '#1e1b4b'],
      ['#7e22ce', '#ffffff']
    ],
    items: [
      { name: 'SAYUNI CHAPEL', subtitle: 'HOUSE OF PRAYER' },
      { name: 'MWANGA WA INJILI', subtitle: 'APOSTOLIC MINISTRY' },
      { name: 'BETHELI CHURCH', subtitle: 'WORD, FAITH & GRACE' },
      { name: 'SHALOM TABERNACLE', subtitle: 'INTERNATIONAL CHURCH' },
      { name: 'KANAANI REVIVAL', subtitle: 'HEALING & DELIVERANCE' },
      { name: 'UPENDO CATHEDRAL', subtitle: 'CHRISTIAN FELLOWSHIP' },
      { name: 'MAVUNO CHAPEL', subtitle: 'KINGDOM HARVESTERS' },
      { name: 'SALVATION ROCK', subtitle: 'SUNDAY WORSHIP CENTER' },
      { name: 'ZION GLORY CHURCH', subtitle: 'SPIRIT & TRUTH' },
      { name: 'AGAPE SANCTUARY', subtitle: 'PENTECOSTAL ASSEMBLY' }
    ]
  },
  {
    category: 'Makanisa & Imani',
    profession: 'Kwaya & Sifa (Worship)',
    emblems: ['music_note', 'church_cross', 'star'],
    palettes: [
      ['#f59e0b', '#2e1065'],
      ['#f43f5e', '#1e1b4b'],
      ['#b45309', '#ffffff']
    ],
    items: [
      { name: 'SAUTI YA SIFA', subtitle: 'GOSPEL MASS CHOIR' },
      { name: 'ZABURI WORSHIP', subtitle: 'PRAISE & ADORATION' },
      { name: 'HOSANA SINGERS', subtitle: 'LIVE GOSPEL RECORDING' },
      { name: 'ALELUYA VOICES', subtitle: 'SACRED HARMONY CHOIR' },
      { name: 'KWAYA YA UMOJA', subtitle: 'CATHOLIC & LUTHERAN' },
      { name: 'HEAVENLY CHORDS', subtitle: 'WORSHIP TEAM MINISTRIES' },
      { name: 'TARUMBETA CHOIR', subtitle: 'SOUND OF REVIVAL' },
      { name: 'SHUKRANI PRAISE', subtitle: 'GOSPEL CONCERTS' },
      { name: 'IMANI CHORALE', subtitle: 'CLASSICAL HYMNS' },
      { name: 'GLORY MELODIES', subtitle: 'YOUTH PRAISE BAND' }
    ]
  },
  {
    category: 'Makanisa & Imani',
    profession: 'Mkutano & Kongamano la Kiroho',
    emblems: ['church_cross', 'globe', 'bolt'],
    palettes: [
      ['#ef4444', '#18181b'],
      ['#fbbf24', '#450a0a'],
      ['#1d4ed8', '#ffffff']
    ],
    items: [
      { name: 'KONGAMANO KUU', subtitle: 'NATIONAL CRUSADE' },
      { name: 'UAMSHO FIRE', subtitle: 'GOSPEL REVIVAL SUMMIT' },
      { name: 'MAOMBI YA TAIFA', subtitle: 'INTERCESSORS CONFERENCE' },
      { name: 'BARAKA CRUSADE', subtitle: 'MIRACLES & WORD' },
      { name: 'PASAKA GATHERING', subtitle: 'ANNUAL FAITH CONVENTION' },
      { name: 'NGUVU YA ROHO', subtitle: 'PENTECOST CONFERENCE' },
      { name: 'NURU CONVENING', subtitle: 'PASTORS & LEADERS' },
      { name: 'REJEO SUMMIT', subtitle: 'SPIRITUAL RENEWAL' },
      { name: 'EAST AFRICA PRAY', subtitle: 'ALL NIGHT VIGIL' },
      { name: 'UKOMBOZI RALLY', subtitle: 'OPEN AIR GOSPEL' }
    ]
  },
  {
    category: 'Makanisa & Imani',
    profession: 'Redio & TV ya Kikristo',
    emblems: ['mic', 'church_cross', 'wifi_signal'],
    palettes: [
      ['#38bdf8', '#172554'],
      ['#fbbf24', '#0f172a'],
      ['#2563eb', '#ffffff']
    ],
    items: [
      { name: 'INJILI TV', subtitle: '24/7 CHRISTIAN BROADCAST' },
      { name: 'SAUTI YA MATUMAINI', subtitle: 'GOSPEL RADIO 98.5 FM' },
      { name: 'NENO MEDIA', subtitle: 'FAITH STREAMING NETWORK' },
      { name: 'BARAKA FM', subtitle: 'SERMONS & GOSPEL HITS' },
      { name: 'SHALOM BROADCAST', subtitle: 'FAMILY CHRISTIAN TV' },
      { name: 'AGAPE RADIO', subtitle: 'THE VOICE OF GRACE' },
      { name: 'HABARI NJEMA TV', subtitle: 'SATELLITE MINISTRY' },
      { name: 'PRAISEWAVE FM', subtitle: 'NON-STOP WORSHIP' },
      { name: 'TRUTH TELEVISION', subtitle: 'TEACHING & DOCUMENTARY' },
      { name: 'TUMIA MEDIA', subtitle: 'DIGITAL EVANGELISM' }
    ]
  },
  {
    category: 'Makanisa & Imani',
    profession: 'Msikiti & Elimu ya Dini',
    emblems: ['crescent_star', 'book', 'crown'],
    palettes: [
      ['#10b981', '#022c22'],
      ['#fbbf24', '#064e3b'],
      ['#047857', '#ffffff']
    ],
    items: [
      { name: 'MSIKITI AL-NOOR', subtitle: 'ISLAMIC COMMUNITY CENTER' },
      { name: 'MADRASA TAQWA', subtitle: 'QURAN & ARABIC STUDIES' },
      { name: 'ZANZIBAR HILAL', subtitle: 'ISLAMIC HERITAGE & CHARITY' },
      { name: 'AL-HIDAYAH CENTER', subtitle: 'PRAYER & SCHOLARSHIP' },
      { name: 'MASJID RAHMA', subtitle: 'JUMMAH & EDUCATION' },
      { name: 'SALAAM FOUNDATION', subtitle: 'ZAKAT & WAQF CARE' },
      { name: 'QUBA ACADEMY', subtitle: 'HIFDH & ISLAMIC ETHICS' },
      { name: 'NURUL ISLAM', subtitle: 'UMMAH FELLOWSHIP' },
      { name: 'DARUSSALAM MOSQUE', subtitle: 'FAITH & BROTHERHOOD' },
      { name: 'AL-FALAH TRUST', subtitle: 'RAMADAN RELIEF FUND' }
    ]
  },
  {
    category: 'Makanisa & Imani',
    profession: 'Huduma za Vijana & Familia',
    emblems: ['heart', 'star', 'church_cross'],
    palettes: [
      ['#a855f7', '#0f172a'],
      ['#f97316', '#1e1b4b'],
      ['#0d9488', '#ffffff']
    ],
    items: [
      { name: 'VIJANA KWA KRISTO', subtitle: 'YOUTH EMPOWERMENT' },
      { name: 'FAMILIA TAKATIFU', subtitle: 'MARRIAGE & COUNSELING' },
      { name: 'KIZAZI KIPYA', subtitle: 'CAMPUS MINISTRY' },
      { name: 'NDOA NA AMANI', subtitle: 'COUPLES RETREAT' },
      { name: 'DADA & KAKA FAITH', subtitle: 'TEENS BIBLE FELLOWSHIP' },
      { name: 'WATOTO WA UFALME', subtitle: 'SUNDAY SCHOOL NETWORK' },
      { name: 'NYUMBA YA BARAKA', subtitle: 'HOME CELL GROUPS' },
      { name: 'ANCHOR YOUTH', subtitle: 'MENTORSHIP & PURPOSE' },
      { name: 'WANAWAKE WA IMANI', subtitle: 'WOMEN OF VIRTUE' },
      { name: 'WANAUME IMARA', subtitle: 'BROTHERHOOD & PRAYER' }
    ]
  },

  // ======================== 4. IT & TEKNOLOJIA (8 Fani) ========================
  {
    category: 'IT & Teknolojia',
    profession: 'Uundaji wa Mifumo & Software',
    emblems: ['code_chip', 'bolt', 'shield'],
    palettes: [
      ['#38bdf8', '#09090b'],
      ['#6366f1', '#020617'],
      ['#1d4ed8', '#ffffff']
    ],
    items: [
      { name: 'BUNIFU SOFT', subtitle: 'ENTERPRISE ERP SYSTEMS' },
      { name: 'SWAHILICODE', subtitle: 'CUSTOM SOFTWARE LAB' },
      { name: 'TANZADEV LABS', subtitle: 'FULLSTACK ENGINEERING' },
      { name: 'KILITECH SYSTEMS', subtitle: 'POS & BILLING SUITES' },
      { name: 'NEXUS AFRIKA', subtitle: 'API & FINTECH ARCHITECTS' },
      { name: 'UBUNIFU CODE', subtitle: 'AGILE SOFTWARE HOUSE' },
      { name: 'COREBYTE TECH', subtitle: 'SCALABLE BACKENDS' },
      { name: 'SIMBASYSTEMS', subtitle: 'SCHOOL & HOSPITAL ERP' },
      { name: 'DEVFORGE TZ', subtitle: 'MODERN WEB PLATFORMS' },
      { name: 'PIXELCRAFT CODE', subtitle: 'SAAS PRODUCT STUDIO' }
    ]
  },
  {
    category: 'IT & Teknolojia',
    profession: 'Tovuti & Programu za Simu',
    emblems: ['wifi_signal', 'code_chip', 'globe'],
    palettes: [
      ['#22d3ee', '#0f172a'],
      ['#ec4899', '#18181b'],
      ['#0284c7', '#ffffff']
    ],
    items: [
      { name: 'APPCRAFT TZ', subtitle: 'IOS & ANDROID STUDIO' },
      { name: 'TOVUTI HARAKA', subtitle: 'WEB DESIGN & SEO' },
      { name: 'SIMU APPS', subtitle: 'MOBILE FIRST SOLUTIONS' },
      { name: 'UX DAR ES SALAAM', subtitle: 'UI/UX PRODUCT DESIGN' },
      { name: 'FLUTTER WORKS', subtitle: 'CROSS-PLATFORM APPS' },
      { name: 'WEBSPARK STUDIO', subtitle: 'E-COMMERCE WEBSITES' },
      { name: 'TAP & PAY APPS', subtitle: 'MOBILE WALLET INTERFACES' },
      { name: 'NETWEAVE DIGITAL', subtitle: 'RESPONSIVE WEB PORTALS' },
      { name: 'KIPAJI APPS', subtitle: 'NATIVE MOBILE BUILDERS' },
      { name: 'MOBISTUDIO PRO', subtitle: 'PWA & APP DEVELOPMENT' }
    ]
  },
  {
    category: 'IT & Teknolojia',
    profession: 'Usalama wa Mtandao (Cybersecurity)',
    emblems: ['lock_cyber', 'shield', 'code_chip'],
    palettes: [
      ['#10b981', '#020617'],
      ['#ef4444', '#09090b'],
      ['#0f172a', '#ffffff']
    ],
    items: [
      { name: 'NGOME CYBER', subtitle: 'SOC & PENETRATION TEST' },
      { name: 'ULINZI DIGITAL', subtitle: 'ZERO TRUST SECURITY' },
      { name: 'CIPHER SHIELD', subtitle: 'BANK & DATA PROTECTION' },
      { name: 'FIREWALL AFRIKA', subtitle: 'NETWORK DEFENSE PRO' },
      { name: 'AEGIS CYBERSEC', subtitle: 'THREAT INTELLIGENCE' },
      { name: 'BOMA INFOSAFE', subtitle: 'COMPLIANCE & AUDIT' },
      { name: 'SENTINEL NODE', subtitle: 'CLOUD SECURITY OPS' },
      { name: 'VAULTGUARD IT', subtitle: 'ENCRYPTION & BACKUP' },
      { name: 'REDTEAM LABS', subtitle: 'ETHICAL HACKING GROUP' },
      { name: 'SECUREPULSE', subtitle: 'ENDPOINT PROTECTION' }
    ]
  },
  {
    category: 'IT & Teknolojia',
    profession: 'Akili Mnemba & Takwimu (AI/Data)',
    emblems: ['chart', 'code_chip', 'star'],
    palettes: [
      ['#a855f7', '#020617'],
      ['#22d3ee', '#1e1b4b'],
      ['#4f46e5', '#ffffff']
    ],
    items: [
      { name: 'AKILI DATA', subtitle: 'MACHINE LEARNING LAB' },
      { name: 'TAKWIMU LABS', subtitle: 'BI DASHBOARDS & AI' },
      { name: 'NEURAL SWAHILI', subtitle: 'NLP & VOICE MODELS' },
      { name: 'PREDICTIVE TZ', subtitle: 'BIG DATA FORECASTING' },
      { name: 'VECTOR MIND', subtitle: 'AUTOMATION & VISION' },
      { name: 'QUANTUM INSIGHT', subtitle: 'DECISION ANALYTICS' },
      { name: 'METRIC PULSE', subtitle: 'REALTIME TELEMETRY' },
      { name: 'SYNAPSE STUDIO', subtitle: 'AI AGENTS & WORKFLOW' },
      { name: 'DATAFLOW AFRICA', subtitle: 'WAREHOUSE & ETL' },
      { name: 'SMARTGRAPHICS AI', subtitle: 'COMPUTER VISION TOOLS' }
    ]
  },
  {
    category: 'IT & Teknolojia',
    profession: 'Wingu & Seva (Cloud Hosting)',
    emblems: ['globe', 'wifi_signal', 'code_chip'],
    palettes: [
      ['#0ea5e9', '#0f172a'],
      ['#f97316', '#09090b'],
      ['#0369a1', '#ffffff']
    ],
    items: [
      { name: 'MAWINGU CLOUD', subtitle: 'EAST AFRICA DATA CENTER' },
      { name: 'SEVA HOSTING', subtitle: 'VPS & .CO.TZ DOMAINS' },
      { name: 'KASI SERVERS', subtitle: 'NVME CLOUD CLUSTERS' },
      { name: 'SAFARI CLOUD', subtitle: 'KUBERNETES & DEVOPS' },
      { name: 'TANZAHOST PRO', subtitle: '99.99% UPTIME HOSTING' },
      { name: 'NODEGRID TZ', subtitle: 'EDGE CDN NETWORK' },
      { name: 'STACKVAULT', subtitle: 'MANAGED DATABASE CLOUD' },
      { name: 'RACKAFRIKA', subtitle: 'COLOCATION & SERVERS' },
      { name: 'SKYLINE HOST', subtitle: 'BUSINESS EMAIL & WEB' },
      { name: 'DOCKERWORKS', subtitle: 'CLOUD NATIVE INFRA' }
    ]
  },
  {
    category: 'IT & Teknolojia',
    profession: 'Mawasiliano & Mtandao (ISP)',
    emblems: ['wifi_signal', 'bolt', 'globe'],
    palettes: [
      ['#facc15', '#0f172a'],
      ['#06b6d4', '#172554'],
      ['#dc2626', '#ffffff']
    ],
    items: [
      { name: 'FIBER KASI', subtitle: 'UNLIMITED HOME INTERNET' },
      { name: 'NYOTA TELECOM', subtitle: '5G & FIBER OPTICS' },
      { name: 'UNGANISHA NET', subtitle: 'CORPORATE ISP LINKS' },
      { name: 'WIMBI WIRELESS', subtitle: 'SATELLITE & RURAL NET' },
      { name: 'PWANI BROADBAND', subtitle: 'ULTRA-FAST FTTH' },
      { name: 'TANGA TELECOM', subtitle: 'VOIP & DATA CARRIER' },
      { name: 'SAFARI LINK ISP', subtitle: 'DEDICATED BANDWIDTH' },
      { name: 'MIKROTIK PRO TZ', subtitle: 'HOTSPOT & ROUTING' },
      { name: 'GIGABIT AFRICA', subtitle: 'METRO FIBER BACKBONE' },
      { name: 'AIRWAVE FIBER', subtitle: 'SEAMLESS CONNECTIVITY' }
    ]
  },
  {
    category: 'IT & Teknolojia',
    profession: 'Ukarabati wa Kompyuta & Simu',
    emblems: ['wrench', 'code_chip', 'bolt'],
    palettes: [
      ['#f97316', '#18181b'],
      ['#38bdf8', '#09090b'],
      ['#334155', '#ffffff']
    ],
    items: [
      { name: 'FUNDI LAPTOP', subtitle: 'MOTHERBOARD & SCREEN' },
      { name: 'SIMU DOCTORS', subtitle: 'EXPRESS PHONE REPAIR' },
      { name: 'CHIPFIX PRO', subtitle: 'MICRO-SOLDERING LAB' },
      { name: 'KARIAKOO GADGETS', subtitle: 'SPARE PARTS & TECH' },
      { name: 'MACBOOK CLINIC', subtitle: 'APPLE & PC SERVICE' },
      { name: 'HARDDRIVE RESCUE', subtitle: 'DATA RECOVERY PRO' },
      { name: 'TECHCARE POINT', subtitle: 'PRINTER & PC REPAIR' },
      { name: 'UPGRADE HUB', subtitle: 'SSD, RAM & CUSTOM PCS' },
      { name: 'BATTERY & SCREEN', subtitle: 'ORIGINAL SPARES' },
      { name: 'GIZMO FIXERS', subtitle: 'CERTIFIED HARDWARE TECH' }
    ]
  },
  {
    category: 'IT & Teknolojia',
    profession: 'Michezo ya Kidijitali (Gaming)',
    emblems: ['bolt', 'crown', 'star'],
    palettes: [
      ['#a855f7', '#09090b'],
      ['#22c55e', '#020617'],
      ['#ef4444', '#18181b']
    ],
    items: [
      { name: 'BONGO ESPORTS', subtitle: 'PRO GAMING ARENA' },
      { name: 'SIMBA GAMERS', subtitle: 'TOURNAMENT LEAGUE' },
      { name: 'ARCADE LABS', subtitle: '3D & MOBILE GAMES' },
      { name: 'PIXEL STRIKERS', subtitle: 'VR & CONSOLE LOUNGE' },
      { name: 'NEON PLAYGROUND', subtitle: 'CYBER GAMING CAFE' },
      { name: 'TANGA CLAN', subtitle: 'COMPETITIVE ESPORTS' },
      { name: 'NEXUS QUEST', subtitle: 'GAME ART & ENGINES' },
      { name: 'SAVANNAH STUDIO', subtitle: 'INDIE GAME DEVELOPERS' },
      { name: 'CYBER ARENA TZ', subtitle: 'PS5 & PC BATTLES' },
      { name: 'LEVELUP LOUNGE', subtitle: 'STREAMERS & CREATORS' }
    ]
  },

  // ======================== 5. MASHIRIKA YA NDEGE & USAFIRI (7 Fani) ========================
  {
    category: 'Ndege & Usafiri',
    profession: 'Shirika la Ndege (Airlines)',
    emblems: ['plane', 'globe', 'crown'],
    palettes: [
      ['#38bdf8', '#0c4a6e'],
      ['#fbbf24', '#0f172a'],
      ['#0284c7', '#ffffff']
    ],
    items: [
      { name: 'KILIMANJARO AIR', subtitle: 'FLY THE ROOF OF AFRICA' },
      { name: 'SERENGETI WINGS', subtitle: 'DOMESTIC & REGIONAL' },
      { name: 'ZANZIBAR SKYWAYS', subtitle: 'ISLAND & COASTAL FLIGHTS' },
      { name: 'MAWINGU AIRWAYS', subtitle: 'PRECISION & COMFORT' },
      { name: 'TANZANIA JET', subtitle: 'INTERNATIONAL CARRIER' },
      { name: 'VICTORIA AIRLINES', subtitle: 'GREAT LAKES CONNECTOR' },
      { name: 'SWAHILI AIRLINE', subtitle: 'WARM AFRICAN HOSPITALITY' },
      { name: 'RUAHA SKYLINE', subtitle: 'SAFARI & CITY ROUTES' },
      { name: 'NYOTA AIRWAYS', subtitle: 'FIRST CLASS AVIATION' },
      { name: 'INDIGO COAST AIR', subtitle: 'INDIAN OCEAN FLIGHTS' }
    ]
  },
  {
    category: 'Ndege & Usafiri',
    profession: 'Ndege za Kukodi (Charter)',
    emblems: ['plane', 'star', 'shield'],
    palettes: [
      ['#f59e0b', '#18181b'],
      ['#0ea5e9', '#020617'],
      ['#1e293b', '#ffffff']
    ],
    items: [
      { name: 'BUSHWINGS CHARTER', subtitle: 'AIRSTRIP TO AIRSTRIP' },
      { name: 'VIP SKY CHARTER', subtitle: 'PRIVATE EXECUTIVE JETS' },
      { name: 'NGORONGORO FLY', subtitle: 'SCENIC HELICOPTER TOURS' },
      { name: 'AMBULANCE WINGS', subtitle: 'AIR MEDEVAC & RESCUE' },
      { name: 'SELOUS AIRTAXI', subtitle: 'ON-DEMAND BUSH FLIGHTS' },
      { name: 'PEMBA PRIVATE AIR', subtitle: 'LUXURY ISLAND TRANSFERS' },
      { name: 'APEX AVIATION', subtitle: 'CORPORATE CHARTERS' },
      { name: 'HORIZON CHOPPERS', subtitle: 'HELICOPTER SERVICES' },
      { name: 'SAFARI AIRCRAFT', subtitle: 'CESSNA & CARAVAN FLEET' },
      { name: 'AERO PRESTIGE', subtitle: 'BESPOKE FLIGHT OPS' }
    ]
  },
  {
    category: 'Ndege & Usafiri',
    profession: 'Usafirishaji wa Mizigo Angani',
    emblems: ['plane', 'truck', 'bolt'],
    palettes: [
      ['#f97316', '#0f172a'],
      ['#eab308', '#1c1917'],
      ['#0369a1', '#ffffff']
    ],
    items: [
      { name: 'ANGA CARGO', subtitle: 'EXPRESS AIR FREIGHT' },
      { name: 'KASI AIRLOGISTICS', subtitle: 'SAME-DAY PARCEL FLY' },
      { name: 'JNIA AIRFREIGHT', subtitle: 'CUSTOMS & COLD CHAIN' },
      { name: 'SKYBOX COURIER', subtitle: 'DUBAI & CHINA TO DAR' },
      { name: 'GLOBAL WINGS CARGO', subtitle: 'HEAVY AIR TRANSPORT' },
      { name: 'HARAKA EXPRESS', subtitle: 'DOOR TO AIRPORT CARGO' },
      { name: 'AEROCHAIN TZ', subtitle: 'PERISHABLE EXPORTS' },
      { name: 'SWIFTJET PARCELS', subtitle: 'TRACKED AIR MAIL' },
      { name: 'EASTBOUND FREIGHT', subtitle: 'CHARTERED CARGO PLANES' },
      { name: 'FLYCARE LOGISTICS', subtitle: 'PHARMA & HIGH-VALUE' }
    ]
  },
  {
    category: 'Ndege & Usafiri',
    profession: 'Usafiri wa Mabasi & Treni',
    emblems: ['truck', 'bolt', 'shield'],
    palettes: [
      ['#ef4444', '#18181b'],
      ['#22c55e', '#052e16'],
      ['#1d4ed8', '#ffffff']
    ],
    items: [
      { name: 'SHABIBY LUXURY', subtitle: 'EXECUTIVE COACH LINES' },
      { name: 'RELI YA KISASA', subtitle: 'HIGH-SPEED SGR TRANSIT' },
      { name: 'SAFARI COACHES', subtitle: 'UPCOUNTRY BUS LINES' },
      { name: 'MKOANI EXPRESS', subtitle: 'DAILY INTERCITY COACH' },
      { name: 'MWENDOKASI TRANS', subtitle: 'RAPID CITY BUSES' },
      { name: 'NORTHERN COACH', subtitle: 'ARUSHA - DAR LUXURY' },
      { name: 'SOUTHERN HIGHLAND', subtitle: 'SAFE ROAD TRAVEL' },
      { name: 'TANGA ROYAL BUS', subtitle: 'VIP SLEEPER COACHES' },
      { name: 'KILIMO RAILWAYS', subtitle: 'FREIGHT & PASSENGER' },
      { name: 'LAKEZONE EXPRESS', subtitle: 'MWANZA & KAGERA LINES' }
    ]
  },
  {
    category: 'Ndege & Usafiri',
    profession: 'Usafirishaji wa Baharini (Shipping)',
    emblems: ['ship', 'globe', 'shield'],
    palettes: [
      ['#0284c7', '#082f49'],
      ['#14b8a6', '#0f172a'],
      ['#1e3a8a', '#ffffff']
    ],
    items: [
      { name: 'BANDARI SHIPPING', subtitle: 'CLEARING & FORWARDING' },
      { name: 'BAHARI KUU LINES', subtitle: 'CONTAINER VESSELS' },
      { name: 'ZANZIBAR FERRIES', subtitle: 'FAST SEA CATAMARANS' },
      { name: 'INDIAN OCEAN SHIP', subtitle: 'MARITIME FREIGHT' },
      { name: 'DAR PORT LOGISTICS', subtitle: 'INLAND & SEA TRANSIT' },
      { name: 'BLUEWAVE MARINE', subtitle: 'BULK CARGO CARRIERS' },
      { name: 'TANGANYIKA VESSEL', subtitle: 'LAKE PORT SHIPPING' },
      { name: 'ANCHOR CLEARING', subtitle: 'CUSTOMS BROKERAGE' },
      { name: 'MAFIA SEA TAXI', subtitle: 'COASTAL BOAT CHARTER' },
      { name: 'NAUTICA AFRIKA', subtitle: 'MARINE ENGINEERING' }
    ]
  },
  {
    category: 'Ndege & Usafiri',
    profession: 'Huduma za Teksi & Ujumbe',
    emblems: ['bolt', 'truck', 'star'],
    palettes: [
      ['#facc15', '#09090b'],
      ['#10b981', '#064e3b'],
      ['#ea580c', '#ffffff']
    ],
    items: [
      { name: 'TWENDE RIDE', subtitle: 'SMART CAB & BODABODA' },
      { name: 'PELEKA COURIER', subtitle: 'MOTORCYCLE DELIVERY' },
      { name: 'CITY CAB DAR', subtitle: 'AIRPORT TAXI 24/7' },
      { name: 'BODAKASI APP', subtitle: 'INSTANT PARCEL DROP' },
      { name: 'SAFARICAB VIP', subtitle: 'CHAUFFEUR TRANSFERS' },
      { name: 'FIKA MAPEMA', subtitle: 'FOOD & SHOP DELIVERY' },
      { name: 'MWENDO RIDES', subtitle: 'CLEAN ELECTRIC CABS' },
      { name: 'MASHARIKI DISPATCH', subtitle: 'URBAN COURIER FLEET' },
      { name: 'TUKTUK EXPRESS', subtitle: 'LAST MILE TRANSPORT' },
      { name: 'GO FAST PARCELS', subtitle: 'SAME-HOUR PICKUP' }
    ]
  },
  {
    category: 'Ndege & Usafiri',
    profession: 'Magari & Gereji (Automotive)',
    emblems: ['wrench', 'shield', 'bolt'],
    palettes: [
      ['#dc2626', '#09090b'],
      ['#f59e0b', '#18181b'],
      ['#0f172a', '#ffffff']
    ],
    items: [
      { name: 'MAGARI BORA', subtitle: 'JAPAN & UK IMPORTS' },
      { name: 'GEREJI YA KISASA', subtitle: 'COMPUTER DIAGNOSTICS' },
      { name: 'SIMBA MOTORS', subtitle: '4X4 & SAFARI VEHICLES' },
      { name: 'VIPURI HALISI', subtitle: 'GENUINE AUTO SPARES' },
      { name: 'DAR AUTOHAUS', subtitle: 'BODYWORK & SPRAY' },
      { name: 'TAIRE & ALIGNMENT', subtitle: 'WHEEL BALANCING PRO' },
      { name: 'SHOWROOM YETU', subtitle: 'CERTIFIED USED CARS' },
      { name: 'DIESEL MASTERS', subtitle: 'TRUCK & ENGINE REPAIR' },
      { name: 'CARWASH ROYAL', subtitle: 'CERAMIC & DETAILING' },
      { name: 'KIBO OFFROAD', subtitle: 'SUSPENSION & WINCHES' }
    ]
  },

  // ======================== 6. MUZIKI & SANAA (7 Fani) ========================
  {
    category: 'Muziki & Sanaa',
    profession: 'Studio ya Kurekodi Muziki',
    emblems: ['music_note', 'mic', 'bolt'],
    palettes: [
      ['#ec4899', '#18181b'],
      ['#f59e0b', '#09090b'],
      ['#7c3aed', '#ffffff']
    ],
    items: [
      { name: 'BONGO BEATS', subtitle: 'RECORDING & MASTERING' },
      { name: 'SAUTI RECORDS', subtitle: 'AFROBEAT & BONGO FLAVA' },
      { name: 'MIDUNDO STUDIO', subtitle: 'MIXING & PRODUCTION' },
      { name: 'TARIME SOUNDLAB', subtitle: 'VOCAL & LIVE TRACKING' },
      { name: 'GOLDWAVE RECORDS', subtitle: 'HIT MUSIC FACTORY' },
      { name: 'KIGAMBONI BEATS', subtitle: 'ACOUSTIC & DIGITAL' },
      { name: 'ECHOES OF AFRICA', subtitle: 'WORLD MUSIC LABEL' },
      { name: 'NGOMA PRO STUDIO', subtitle: 'BEATMAKING & MASTER' },
      { name: 'SWAHILI GROOVE', subtitle: 'ARTIST MANAGEMENT' },
      { name: 'MELODI HOUSE', subtitle: 'ANALOG & DOLBY MIX' }
    ]
  },
  {
    category: 'Muziki & Sanaa',
    profession: 'Bendi & Wanamuziki',
    emblems: ['music_note', 'star', 'crown'],
    palettes: [
      ['#fbbf24', '#450a0a'],
      ['#f43f5e', '#0f172a'],
      ['#9333ea', '#ffffff']
    ],
    items: [
      { name: 'TWANGA LIVE BAND', subtitle: 'DANCE & RHUMBA SHOWS' },
      { name: 'ZANZIBAR TAARAB', subtitle: 'COASTAL HERITAGE BAND' },
      { name: 'KILIMA JAZZ', subtitle: 'LIVE ACOUSTIC ENSEMBLE' },
      { name: 'AMAPIAANO KINGS', subtitle: 'FESTIVAL HEADLINERS' },
      { name: 'MSONDO VIBES', subtitle: 'CLASSIC TANZANIA BAND' },
      { name: 'DAR AFRO FUSION', subtitle: 'CORPORATE LIVE MUSIC' },
      { name: 'NYOTA SINGERS', subtitle: 'VOCAL QUARTET GROUP' },
      { name: 'SERENADE BRASS', subtitle: 'PARADE & WEDDING BAND' },
      { name: 'BAGAMOYO DRUMS', subtitle: 'TRADITIONAL PERCUSSION' },
      { name: 'MWAMBA COLLECTIVE', subtitle: 'SOUL & RNB LIVE' }
    ]
  },
  {
    category: 'Muziki & Sanaa',
    profession: 'DJ & Burudani ya Usiku',
    emblems: ['bolt', 'music_note', 'crown'],
    palettes: [
      ['#22d3ee', '#020617'],
      ['#d946ef', '#09090b'],
      ['#eab308', '#18181b']
    ],
    items: [
      { name: 'DJ MASHARIKI', subtitle: 'CLUB, RADIO & EVENTS' },
      { name: 'SPINNER DECKS', subtitle: 'PRO DJ ACADEMY' },
      { name: 'NIGHTPULSE ENT', subtitle: 'CONCERTS & AFTERPARTIES' },
      { name: 'BASSLINE CREW', subtitle: 'CLUB SOUND & LIGHTS' },
      { name: 'ZANZIBAR SUNSET', subtitle: 'BEACH PARTY DJS' },
      { name: 'TURNTABLE PRO', subtitle: 'SCRATCH & REMIX HUB' },
      { name: 'HYPEMASTER ENT', subtitle: 'MC & PARTY HOSTS' },
      { name: 'AFROCLUB VIBE', subtitle: 'WEEKEND LOUNGE DJS' },
      { name: 'LASERBEAM ENT', subtitle: 'STAGE & LED SHOWS' },
      { name: 'VIBRANT SOUNDS', subtitle: 'SILENT DISCO & SHOWS' }
    ]
  },
  {
    category: 'Muziki & Sanaa',
    profession: 'Ala za Muziki & Sauti',
    emblems: ['music_note', 'mic', 'wifi_signal'],
    palettes: [
      ['#f97316', '#0f172a'],
      ['#38bdf8', '#18181b'],
      ['#1e293b', '#ffffff']
    ],
    items: [
      { name: 'VYOMBO VYA MUZIKI', subtitle: 'GUITARS, KEYS & DRUMS' },
      { name: 'PA SOUND RENTALS', subtitle: 'LINE ARRAY & MIXERS' },
      { name: 'DECIBEL PRO AUDIO', subtitle: 'STAGE SPEAKERS & MICS' },
      { name: 'VINANDA SHOP', subtitle: 'YAMAHA & ROLAND STORE' },
      { name: 'ACOUSTIC WORLD', subtitle: 'STUDIO MONITORS & GEAR' },
      { name: 'MEGAWATT STAGE', subtitle: 'CONCERT RIGGING & AUDIO' },
      { name: 'HARMONY STORES', subtitle: 'CHURCH SOUND SYSTEMS' },
      { name: 'SONIC RIGS TZ', subtitle: 'PRO AUDIO ENGINEERING' },
      { name: 'PIANO & STRINGS', subtitle: 'CLASSIC INSTRUMENTS' },
      { name: 'MICROPHONE HUB', subtitle: 'BROADCAST EQUIPMENT' }
    ]
  },
  {
    category: 'Muziki & Sanaa',
    profession: 'Filamu & Sinema',
    emblems: ['camera', 'star', 'crown'],
    palettes: [
      ['#ef4444', '#09090b'],
      ['#fbbf24', '#18181b'],
      ['#111827', '#ffffff']
    ],
    items: [
      { name: 'BONGO FILMS', subtitle: 'MOTION PICTURES STUDIO' },
      { name: 'SINEMA AFRIKA', subtitle: 'FEATURE & DOCUMENTARY' },
      { name: 'CINEWAVE PRO', subtitle: '4K COMMERCIAL VIDEO' },
      { name: 'KIWANDA CHA FILAMU', subtitle: 'DRAMA & SERIES PROD' },
      { name: 'REEL TANZANIA', subtitle: 'CINEMATOGRAPHY & VFX' },
      { name: 'JICHO LA SINEMA', subtitle: 'FILM FESTIVAL & HOUSE' },
      { name: 'DIRECTORS GUILD', subtitle: 'SCRIPT TO SCREEN' },
      { name: 'KARAFUU PICTURES', subtitle: 'STORYTELLING IN 4K' },
      { name: 'DRAMA KINGS TZ', subtitle: 'CASTING & PRODUCTION' },
      { name: 'LENSWORKS CINE', subtitle: 'DRONE & STEADICAM' }
    ]
  },
  {
    category: 'Muziki & Sanaa',
    profession: 'Upigaji Picha & Video',
    emblems: ['camera', 'star', 'heart'],
    palettes: [
      ['#38bdf8', '#09090b'],
      ['#fbbf24', '#1c1917'],
      ['#0f172a', '#ffffff']
    ],
    items: [
      { name: 'LENZI KALI', subtitle: 'PORTRAIT & STUDIO PHOTO' },
      { name: 'KUMBUKUMBU PIX', subtitle: 'WEDDING PHOTOGRAPHY' },
      { name: 'SHUTTER AFRICA', subtitle: 'FASHION & EDITORIAL' },
      { name: 'SNAPSHOT STUDIO', subtitle: 'EVENTS & GRADUATION' },
      { name: 'GOLDEN HOUR PIX', subtitle: 'NATURAL LIGHT SHOOTS' },
      { name: 'APERTURE ART', subtitle: 'COMMERCIAL PRODUCT PIX' },
      { name: 'DRONE EYE TZ', subtitle: 'AERIAL PHOTO & VIDEO' },
      { name: 'STUDIO MWANGA', subtitle: 'PASSPORT & CORPORATE' },
      { name: 'FRAME PERFECT', subtitle: 'RETOUCHING & PRINTS' },
      { name: 'SAFARI LENS', subtitle: 'WILDLIFE PHOTOGRAPHY' }
    ]
  },
  {
    category: 'Muziki & Sanaa',
    profession: 'Uchoraji & Sanaa za Mikono',
    emblems: ['crown', 'diamond', 'leaf'],
    palettes: [
      ['#f97316', '#292524'],
      ['#a855f7', '#0f172a'],
      ['#b45309', '#fffbeb']
    ],
    items: [
      { name: 'TINGATINGA ART', subtitle: 'TANZANIAN FINE PAINTINGS' },
      { name: 'SANAA YA MKONO', subtitle: 'SCULPTURE & CARVINGS' },
      { name: 'BRASHI GALLERY', subtitle: 'CONTEMPORARY CANVAS' },
      { name: 'MAKUTI CRAFTS', subtitle: 'HANDWOVEN & CERAMICS' },
      { name: 'MWENGE CARVERS', subtitle: 'EBONY WOOD ARTISTRY' },
      { name: 'UBUNIFU GALLERY', subtitle: 'EXHIBITION & MURALS' },
      { name: 'RANGI STUDIO', subtitle: 'ACRYLIC & PORTRAIT ART' },
      { name: 'ZANZIBAR MOSAIC', subtitle: 'ARTISAN HOME DECOR' },
      { name: 'KAOLIN POTTERY', subtitle: 'HANDMADE CLAYWARE' },
      { name: 'MAASAI BEADWORK', subtitle: 'HERITAGE JEWEL CRAFTS' }
    ]
  },

  // ======================== 7. MISITU & MAZINGIRA (6 Fani) ========================
  {
    category: 'Misitu & Mazingira',
    profession: 'Uhifadhi wa Misitu',
    emblems: ['tree_pine', 'leaf', 'shield'],
    palettes: [
      ['#22c55e', '#052e16'],
      ['#10b981', '#022c22'],
      ['#15803d', '#ffffff']
    ],
    items: [
      { name: 'MISITU YETU', subtitle: 'FOREST CONSERVATION TZ' },
      { name: 'USAMBARA FORESTS', subtitle: 'BIODIVERSITY RESERVE' },
      { name: 'MIOMBO CANOPY', subtitle: 'CARBON & REFORESTATION' },
      { name: 'KILOMBERO GREEN', subtitle: 'WATERSHED PROTECTION' },
      { name: 'UDZUNGWA TREES', subtitle: 'ENDEMIC FOREST TRUST' },
      { name: 'PANDA MITI ORG', subtitle: 'MILLION TREES CAMPAIGN' },
      { name: 'KIVULI FORESTRY', subtitle: 'AGROFORESTRY & CLIMATE' },
      { name: 'MANGROVE SHIELD', subtitle: 'COASTAL FOREST RESTORE' },
      { name: 'RUNGWE WOODLAND', subtitle: 'RANGER PATROL & CARE' },
      { name: 'KILWA ECOFOREST', subtitle: 'SUSTAINABLE CARBON HUB' }
    ]
  },
  {
    category: 'Misitu & Mazingira',
    profession: 'Mbao & Useremala wa Kisasa',
    emblems: ['tree_pine', 'wrench', 'home'],
    palettes: [
      ['#d97706', '#1c1917'],
      ['#84cc16', '#14532d'],
      ['#78350f', '#ffffff']
    ],
    items: [
      { name: 'MBAO SAFI', subtitle: 'TREATED TIMBER & POLES' },
      { name: 'IRINGA FORESTWOOD', subtitle: 'PINE & CYPRESS LUMBER' },
      { name: 'SEREMALA PRO', subtitle: 'CUSTOM HARDWOOD DOORS' },
      { name: 'MKINGA TIMBER', subtitle: 'FSC CERTIFIED SAWMILL' },
      { name: 'FURNITURE YA ASILI', subtitle: 'TEAK & MAHOGANY CRAFT' },
      { name: 'NJOMBE WOODS', subtitle: 'ROOFING TRUSSES & PLY' },
      { name: 'MKUU CARPENTRY', subtitle: 'KITCHEN & OFFICE WOOD' },
      { name: 'KILOLO TIMBER', subtitle: 'KILN DRIED LUMBER' },
      { name: 'MNINGA ARTISANS', subtitle: 'BESPOKE WOOD INTERIORS' },
      { name: 'FORESTMILL TZ', subtitle: 'CONSTRUCTION TIMBER' }
    ]
  },
  {
    category: 'Misitu & Mazingira',
    profession: 'Vitalu vya Miti & Bustani',
    emblems: ['sprout', 'leaf', 'tree_pine'],
    palettes: [
      ['#4ade80', '#064e3b'],
      ['#16a34a', '#ffffff'],
      ['#a3e635', '#14532d']
    ],
    items: [
      { name: 'KITALU KIJANI', subtitle: 'FRUIT & SHADE SEEDLINGS' },
      { name: 'BUSTANI YA EDENI', subtitle: 'LANDSCAPING & LAWNS' },
      { name: 'MICHE BORA', subtitle: 'AVOCADO & TIMBER SEED' },
      { name: 'MAUA & MITI', subtitle: 'BOTANICAL NURSERIES' },
      { name: 'GREENSCAPE DAR', subtitle: 'GARDEN DESIGN & CARE' },
      { name: 'TROPICAL PALMS', subtitle: 'ORNAMENTAL TREES' },
      { name: 'ARUSHA FLORA', subtitle: 'OUTDOOR & INDOOR PLANTS' },
      { name: 'ROOT & BLOOM', subtitle: 'PARK & VILLA GARDENS' },
      { name: 'SHAMBA LA MITI', subtitle: 'GRAFTED FRUIT TREES' },
      { name: 'EVERGREEN LAWNS', subtitle: 'TURF & IRRIGATION' }
    ]
  },
  {
    category: 'Misitu & Mazingira',
    profession: 'Hifadhi ya Wanyamapori',
    emblems: ['tree_pine', 'shield', 'globe'],
    palettes: [
      ['#84cc16', '#1a2e05'],
      ['#f59e0b', '#1c1917'],
      ['#166534', '#ffffff']
    ],
    items: [
      { name: 'WANYAMAPORI TZ', subtitle: 'WILDLIFE CONSERVATION' },
      { name: 'TEMBO SHIELD', subtitle: 'ANTI-POACHING CORPS' },
      { name: 'TARANGIRE TRUST', subtitle: 'ELEPHANT CORRIDORS' },
      { name: 'SERENGETI GUARD', subtitle: 'SAVANNAH RESEARCH' },
      { name: 'KATAVI WILD', subtitle: 'ECOSYSTEM PROTECTION' },
      { name: 'LIONHEART FUND', subtitle: 'BIG CAT CONSERVATION' },
      { name: 'GOMBE RESEARCH', subtitle: 'PRIMATE SANCTUARY' },
      { name: 'MIKUMI RANGERS', subtitle: 'HABITAT PRESERVATION' },
      { name: 'WILDLIFE HERITAGE', subtitle: 'EDUCATION & PATROL' },
      { name: 'SAVANNAH WATCH', subtitle: 'GPS WILDLIFE TRACKING' }
    ]
  },
  {
    category: 'Misitu & Mazingira',
    profession: 'Usafi & Urejelezaji (Recycling)',
    emblems: ['leaf', 'globe', 'sprout'],
    palettes: [
      ['#10b981', '#042f2e'],
      ['#06b6d4', '#083344'],
      ['#059669', '#ffffff']
    ],
    items: [
      { name: 'TAKA NI MALI', subtitle: 'PLASTIC & METAL RECYCLE' },
      { name: 'JIJI SAFI', subtitle: 'GREEN WASTE COLLECTION' },
      { name: 'RECYCLE AFRIKA', subtitle: 'CIRCULAR ECONOMY HUB' },
      { name: 'ECOBOTTLE TZ', subtitle: 'PET FLAKES & PACKAGING' },
      { name: 'COMPOST PLUS', subtitle: 'ORGANIC FERTILIZER' },
      { name: 'SAFICITY CLEAN', subtitle: 'MUNICIPAL WASTE PRO' },
      { name: 'ZERO WASTE HUB', subtitle: 'UPCYCLING WORKSHOPS' },
      { name: 'BLUEPLANET TZ', subtitle: 'BEACH & OCEAN CLEANUP' },
      { name: 'PAPERBACK RECYCLE', subtitle: 'PULP & CARTON MILL' },
      { name: 'E-WASTE RESCUE', subtitle: 'SAFE TECH RECYCLING' }
    ]
  },
  {
    category: 'Misitu & Mazingira',
    profession: 'Nishati Jadidifu & Jua (Solar)',
    emblems: ['sun_solar', 'bolt', 'leaf'],
    palettes: [
      ['#fbbf24', '#0f172a'],
      ['#f97316', '#18181b'],
      ['#0284c7', '#ffffff']
    ],
    items: [
      { name: 'JUA POWER', subtitle: 'SOLAR PANELS & INVERTERS' },
      { name: 'MWANGA SOLAR', subtitle: 'RURAL MINI-GRID ENERGY' },
      { name: 'HELIO TANZANIA', subtitle: 'LITHIUM BACKUP SYSTEMS' },
      { name: 'SUNSPARK ENERGY', subtitle: 'SOLAR WATER PUMPS' },
      { name: 'KILIMANJARO SOLAR', subtitle: 'COMMERCIAL ROOFTOPS' },
      { name: 'NISHATI SAFI', subtitle: 'CLEAN COOKING & BIOGAS' },
      { name: 'RAYTECH SOLAR', subtitle: 'STREETLIGHTS & BATTERIES' },
      { name: 'VOLTAIRE GREEN', subtitle: 'HYBRID WIND & SOLAR' },
      { name: 'UMEME JUA', subtitle: 'PAY-AS-YOU-GO SOLAR' },
      { name: 'SUNGOLD GRID', subtitle: 'ZERO BILL ELECTRICITY' }
    ]
  },

  // ======================== 8. HABARI & MAWASILIANO (5 Fani) ========================
  {
    category: 'Habari & Media',
    profession: 'Kituo cha Televisheni',
    emblems: ['globe', 'camera', 'bolt'],
    palettes: [
      ['#ef4444', '#0f172a'],
      ['#38bdf8', '#020617'],
      ['#dc2626', '#ffffff']
    ],
    items: [
      { name: 'TANZANIA 24 TV', subtitle: 'BREAKING NEWS & LIVE' },
      { name: 'AFRIKA TV PLUS', subtitle: 'HD SATELLITE NETWORK' },
      { name: 'MWANANCHI VISION', subtitle: 'CURRENT AFFAIRS TV' },
      { name: 'TAIFA BROADCAST', subtitle: 'NATIONAL TELEVISION' },
      { name: 'CHANNEL KUU', subtitle: 'NEWS, SPORTS & DRAMA' },
      { name: 'PWANI TELEVISION', subtitle: 'COASTAL DIGITAL TV' },
      { name: 'AZANIA MEDIA', subtitle: '24H NEWSROOM LIVE' },
      { name: 'DIRECT TV STUDIO', subtitle: 'HD CABLE NETWORK' },
      { name: 'UWEZO TV', subtitle: 'BUSINESS & YOUTH SHOWS' },
      { name: 'SWAHILI SKY TV', subtitle: 'EAST AFRICA STREAM' }
    ]
  },
  {
    category: 'Habari & Media',
    profession: 'Redio & Podikasti',
    emblems: ['mic', 'wifi_signal', 'music_note'],
    palettes: [
      ['#f97316', '#09090b'],
      ['#22d3ee', '#0f172a'],
      ['#7c3aed', '#ffffff']
    ],
    items: [
      { name: 'MAISHA 101 FM', subtitle: 'YOUR CITY SOUNDTRACK' },
      { name: 'SAUTI PODCAST', subtitle: 'STORIES & INTERVIEWS' },
      { name: 'KIJIJI FM 94.2', subtitle: 'COMMUNITY RADIO VOICE' },
      { name: 'BONGO TALK FM', subtitle: 'MORNING SHOW & SPORTS' },
      { name: 'ZANZIBAR WAVE FM', subtitle: 'ISLAND MUSIC & NEWS' },
      { name: 'MICDROP PODCAST', subtitle: 'TECH & CULTURE TALKS' },
      { name: 'ARUSHA 99.8 FM', subtitle: 'NORTHERN ZONE RADIO' },
      { name: 'MWANZA BEAT FM', subtitle: 'LAKEZONE HITS' },
      { name: 'ON-AIR STUDIO', subtitle: 'LIVE DIGITAL PODCASTS' },
      { name: 'FREQUENCY 104', subtitle: 'NEWS & ENTERTAINMENT' }
    ]
  },
  {
    category: 'Habari & Media',
    profession: 'Gazeti & Habari za Mtandaoni',
    emblems: ['globe', 'book', 'bolt'],
    palettes: [
      ['#dc2626', '#111827'],
      ['#0284c7', '#ffffff'],
      ['#f59e0b', '#0f172a']
    ],
    items: [
      { name: 'GAZETI LA LEO', subtitle: 'DAILY VERIFIED NEWS' },
      { name: 'DAR DAILY POST', subtitle: 'ONLINE BREAKING PORTAL' },
      { name: 'UWAZI PRESS', subtitle: 'INVESTIGATIVE REPORTS' },
      { name: 'UCHUMI TIMES', subtitle: 'MARKETS & FINANCE NEWS' },
      { name: 'MICHEZO GAZETI', subtitle: 'FOOTBALL & TRANSFER NEWS' },
      { name: 'MWANGAZA ONLINE', subtitle: 'CITIZEN JOURNALISM' },
      { name: 'FLASH NEWS HUB', subtitle: 'INSTANT MOBILE UPDATES' },
      { name: 'EAST AFRICA WIRE', subtitle: 'REGIONAL DISPATCH' },
      { name: 'SWAHILI CHRONICLE', subtitle: 'POLITICS & SOCIETY' },
      { name: 'DODOMA GAZETTE', subtitle: 'PARLIAMENT & POLICY' }
    ]
  },
  {
    category: 'Habari & Media',
    profession: 'Jarida & Uchapishaji',
    emblems: ['crown', 'book', 'star'],
    palettes: [
      ['#fbbf24', '#18181b'],
      ['#e11d48', '#ffffff'],
      ['#334155', '#020617']
    ],
    items: [
      { name: 'FAHARI MAGAZINE', subtitle: 'LIFESTYLE & BUSINESS' },
      { name: 'UBORA JOURNAL', subtitle: 'QUARTERLY DESIGN REVIEW' },
      { name: 'VOGUE AFRICA', subtitle: 'FASHION & RUNWAY' },
      { name: 'SAFARI QUARTERLY', subtitle: 'TRAVEL & PHOTOGRAPHY' },
      { name: 'JARIDA LA NYUMBA', subtitle: 'ARCHITECTURE & LIVING' },
      { name: 'BIASHARA DIGEST', subtitle: 'LEADERS & STARTUPS' },
      { name: 'TAJIRI EDITION', subtitle: 'LUXURY & MOTORING' },
      { name: 'AFYA MAGAZETI', subtitle: 'WELLNESS QUARTERLY' },
      { name: 'KIPAJI ZINE', subtitle: 'YOUTH ART & CULTURE' },
      { name: 'MALKIA MAGAZINE', subtitle: 'WOMEN IN LEADERSHIP' }
    ]
  },
  {
    category: 'Habari & Media',
    profession: 'Mahusiano ya Umma (PR)',
    emblems: ['mic', 'star', 'chart'],
    palettes: [
      ['#a855f7', '#0f172a'],
      ['#f97316', '#18181b'],
      ['#0f172a', '#ffffff']
    ],
    items: [
      { name: 'CHAPA KOMUNIKESH', subtitle: 'PR & BRAND STRATEGY' },
      { name: 'KILIMA CAMPAIGNS', subtitle: 'DIGITAL ADS & MEDIA BUY' },
      { name: 'SAUTI AGENCY', subtitle: 'INFLUENCER MARKETING' },
      { name: 'PRESTIGE PUBLICS', subtitle: 'CRISIS & CORPORATE PR' },
      { name: 'SPARK ADHOUSE', subtitle: 'BILLBOARDS & TV ADS' },
      { name: 'DAR CREATIVE LAB', subtitle: '360 BRAND LAUNCHES' },
      { name: 'VIRAL SWAHILI', subtitle: 'SOCIAL MEDIA GROWTH' },
      { name: 'VISTABRIDGE PR', subtitle: 'PRESS CONFERENCES' },
      { name: 'APEX ADWORKS', subtitle: 'MEDIA PLANNING' },
      { name: 'MAWASILIANO PRO', subtitle: 'PUBLIC AFFAIRS' }
    ]
  },

  // ======================== 9. BIASHARA & FEDHA (7 Fani) ========================
  {
    category: 'Biashara & Fedha',
    profession: 'Benki & Mikopo',
    emblems: ['building', 'shield', 'chart'],
    palettes: [
      ['#0ea5e9', '#0c4a6e'],
      ['#fbbf24', '#0f172a'],
      ['#15803d', '#ffffff']
    ],
    items: [
      { name: 'BENKI YA TAIFA', subtitle: 'SAVINGS & CORPORATE BANK' },
      { name: 'WEZESHA SACCOS', subtitle: 'MEMBER LOANS & CREDIT' },
      { name: 'MAENDELEO BANK', subtitle: 'SME & AGRI FINANCE' },
      { name: 'AKIBA MICROFINANCE', subtitle: 'INSTANT BUSINESS LOANS' },
      { name: 'SWAHILI TRUST BANK', subtitle: 'DIGITAL BANKING 24/7' },
      { name: 'VIKOBANI PLUS', subtitle: 'GROUP SAVINGS PLATFORM' },
      { name: 'HARAKA CREDIT', subtitle: 'MOBILE ASSET LOANS' },
      { name: 'MWANGA COMMERCIAL', subtitle: 'TREASURY & TRADE' },
      { name: 'HAZINA BANCORP', subtitle: 'MORTGAGE & WEALTH' },
      { name: 'KILIMANJARO BANK', subtitle: 'TRUSTED SINCE 1998' }
    ]
  },
  {
    category: 'Biashara & Fedha',
    profession: 'Bima & Kinga',
    emblems: ['shield', 'heart', 'building'],
    palettes: [
      ['#3b82f6', '#0f172a'],
      ['#10b981', '#022c22'],
      ['#1d4ed8', '#ffffff']
    ],
    items: [
      { name: 'BIMA SALAMA', subtitle: 'MOTOR, HEALTH & FIRE' },
      { name: 'KINGA ASSURANCE', subtitle: 'LIFE & PENSION PLANS' },
      { name: 'NGAO INSURANCE', subtitle: 'COMPREHENSIVE COVER' },
      { name: 'UHAKIKA UNDERWRITE', subtitle: 'MARINE & CARGO BIMA' },
      { name: 'FAMILIA SHIELD', subtitle: 'EDUCATION & LIFE COVER' },
      { name: 'SAFEGUARD BROKERS', subtitle: 'CLAIMS & RISK EXPERTS' },
      { name: 'TUMAINI ASSURE', subtitle: 'TRAVEL & MEDICAL BIMA' },
      { name: 'BONGO COVER', subtitle: 'INSTANT DIGITAL STICKER' },
      { name: 'SHIELDMAX TZ', subtitle: 'CORPORATE LIABILITY' },
      { name: 'RELIANCE BIMA', subtitle: 'FAST CLAIM SETTLEMENT' }
    ]
  },
  {
    category: 'Biashara & Fedha',
    profession: 'Uhasibu & Ukaguzi (Audit)',
    emblems: ['chart', 'scales', 'building'],
    palettes: [
      ['#38bdf8', '#0f172a'],
      ['#6366f1', '#1e1b4b'],
      ['#1e293b', '#ffffff']
    ],
    items: [
      { name: 'HESABU PRO CPA', subtitle: 'AUDIT & TAX ADVISORY' },
      { name: 'KODI & SHERIA', subtitle: 'TRA COMPLIANCE EXPERTS' },
      { name: 'LEDGER AFRIKA', subtitle: 'BOOKKEEPING & PAYROLL' },
      { name: 'SUMMIT AUDITORS', subtitle: 'CERTIFIED ACCOUNTANTS' },
      { name: 'AKILI FINADVISORY', subtitle: 'VALUATION & DUE DILIGENCE' },
      { name: 'CLEARBOOKS TZ', subtitle: 'CLOUD ACCOUNTING' },
      { name: 'TANZA AUDIT GROUP', subtitle: 'FORENSIC ACCOUNTING' },
      { name: 'BALANCED SHEET', subtitle: 'CORPORATE TAX FILING' },
      { name: 'PRECISION CPA', subtitle: 'NGO & DONOR AUDITS' },
      { name: 'FISCAL PARTNERS', subtitle: 'CFO ON DEMAND' }
    ]
  },
  {
    category: 'Biashara & Fedha',
    profession: 'Uwekezaji & Masoko ya Mitaji',
    emblems: ['chart', 'crown', 'globe'],
    palettes: [
      ['#fbbf24', '#020617'],
      ['#10b981', '#09090b'],
      ['#0f172a', '#ffffff']
    ],
    items: [
      { name: 'MITAJI VENTURES', subtitle: 'ANGEL & SEED CAPITAL' },
      { name: 'DSE BROKERS PRO', subtitle: 'STOCKS & TREASURY BONDS' },
      { name: 'TAJIRI ASSET MGT', subtitle: 'UNIT TRUSTS & FUNDS' },
      { name: 'SAVANNAH EQUITY', subtitle: 'PRIVATE EQUITY AFRICA' },
      { name: 'KILIMA CAPITAL', subtitle: 'REAL ESTATE & INFRA' },
      { name: 'UWEKEZAJI FUND', subtitle: 'RETIREMENT PORTFOLIOS' },
      { name: 'APEX SECURITIES', subtitle: 'FOREX & COMMODITIES' },
      { name: 'GOLDCREST WEALTH', subtitle: 'FAMILY OFFICE ADVISORY' },
      { name: 'GROWTH HORIZON', subtitle: 'GREEN BONDS & ESG' },
      { name: 'CRESTLINE INVEST', subtitle: 'PORTFOLIO MANAGEMENT' }
    ]
  },
  {
    category: 'Biashara & Fedha',
    profession: 'Biashara ya Mtandaoni (E-Commerce)',
    emblems: ['bolt', 'globe', 'star'],
    palettes: [
      ['#f97316', '#0f172a'],
      ['#ec4899', '#18181b'],
      ['#ea580c', '#ffffff']
    ],
    items: [
      { name: 'SOKO KUU ONLINE', subtitle: 'SHOP ANYTHING IN TZ' },
      { name: 'NUNUA FAST', subtitle: 'ELECTRONICS & HOME' },
      { name: 'KARIAKOO CLICK', subtitle: 'WHOLESALE E-COMMERCE' },
      { name: 'DUKA MTANDAONI', subtitle: 'PAY ON DELIVERY' },
      { name: 'BEI POA DEALS', subtitle: 'FLASH SALES MARKET' },
      { name: 'ZANZIBAR CART', subtitle: 'SPICES & CRAFTS ONLINE' },
      { name: 'MALL AFRIKA TZ', subtitle: 'VERIFIED MERCHANTS' },
      { name: 'KIKAPU EXPRESS', subtitle: 'GROCERIES TO YOUR DOOR' },
      { name: 'FLASHBUY PRO', subtitle: '24H ONLINE STOREFRONT' },
      { name: 'SWAHILI BAZAAR', subtitle: 'MARKETPLACE FOR ALL' }
    ]
  },
  {
    category: 'Biashara & Fedha',
    profession: 'Duka Kuu (Supermarket)',
    emblems: ['cup', 'star', 'home'],
    palettes: [
      ['#22c55e', '#052e16'],
      ['#ef4444', '#ffffff'],
      ['#f59e0b', '#18181b']
    ],
    items: [
      { name: 'FAMILIA MART', subtitle: 'FRESH FOODS & HOUSEHOLD' },
      { name: 'MIKOCHENI FRESH', subtitle: 'HYPERMARKET & BAKERY' },
      { name: 'BEI NAFUU STORE', subtitle: 'EVERYDAY LOW PRICES' },
      { name: 'MASAKI GROCER', subtitle: 'GOURMET & IMPORTS' },
      { name: 'ARUSHA SUPERSTORE', subtitle: 'WHOLESALE & RETAIL' },
      { name: 'CITY BASKET', subtitle: '24H CONVENIENCE MART' },
      { name: 'KIKAPU SUPER', subtitle: 'PRODUCE & DAIRY AISLE' },
      { name: 'DODOMA PLAZA MART', subtitle: 'FAMILY SHOPPING HUB' },
      { name: 'SAVEWAY TANZANIA', subtitle: 'BUDGET SUPERMARKET' },
      { name: 'GOLDEN AISLE', subtitle: 'QUALITY GROCERIES' }
    ]
  },
  {
    category: 'Biashara & Fedha',
    profession: 'Ushauri wa Biashara',
    emblems: ['chart', 'crown', 'shield'],
    palettes: [
      ['#818cf8', '#09090b'],
      ['#fbbf24', '#0f172a'],
      ['#1e293b', '#ffffff']
    ],
    items: [
      { name: 'DIRA CONSULT', subtitle: 'STRATEGY & OPERATIONS' },
      { name: 'KILIMA ADVISORY', subtitle: 'HR, STRATEGY & GROWTH' },
      { name: 'NEXTLEVEL BIZ', subtitle: 'STARTUP INCUBATOR' },
      { name: 'USHAURI PRO', subtitle: 'SME TURNAROUND EXPERTS' },
      { name: 'MASHARIKI GROUP', subtitle: 'MARKET ENTRY AFRICA' },
      { name: 'PINNACLE CORP', subtitle: 'BOARD & GOVERNANCE' },
      { name: 'CATALYST BIZ', subtitle: 'ISO & QUALITY SYSTEMS' },
      { name: 'MAJUKUMU HR', subtitle: 'TALENT & RECRUITMENT' },
      { name: 'VENTURE BRIDGE', subtitle: 'BUSINESS PLANS & GRANTS' },
      { name: 'STRATEGIXX TZ', subtitle: 'EXECUTIVE COACHING' }
    ]
  },

  // ======================== 10. UJENZI & MAJENGO (6 Fani) ========================
  {
    category: 'Ujenzi & Majengo',
    profession: 'Usanifu wa Majengo (Architecture)',
    emblems: ['building', 'home', 'crown'],
    palettes: [
      ['#fbbf24', '#09090b'],
      ['#38bdf8', '#0f172a'],
      ['#18181b', '#ffffff']
    ],
    items: [
      { name: 'RAMANI STUDIO', subtitle: 'MODERN ARCHITECTURE' },
      { name: 'ARCHILINE TZ', subtitle: '3D RENDERS & BLUEPRINTS' },
      { name: 'KILIMA ARCHITECTS', subtitle: 'SUSTAINABLE TOWERS' },
      { name: 'SKYLINES DESIGN', subtitle: 'RESIDENTIAL & VILLAS' },
      { name: 'MODULAR STUDIO', subtitle: 'URBAN PLANNING & CAD' },
      { name: 'SWAHILI ARCH', subtitle: 'COASTAL RESORT DESIGN' },
      { name: 'STUDIO GHOROFA', subtitle: 'COMMERCIAL COMPLEXES' },
      { name: 'CUBIC FORMA', subtitle: 'MINIMALIST STRUCTURES' },
      { name: 'DRAWING BOARD', subtitle: 'STRUCTURAL & MEP' },
      { name: 'URBAN CANVAS TZ', subtitle: 'SMART CITY CONCEPTS' }
    ]
  },
  {
    category: 'Ujenzi & Majengo',
    profession: 'Ujenzi & Makandarasi',
    emblems: ['helmet_build', 'building', 'wrench'],
    palettes: [
      ['#f97316', '#18181b'],
      ['#eab308', '#0f172a'],
      ['#b45309', '#ffffff']
    ],
    items: [
      { name: 'KANDARASI BORA', subtitle: 'CIVIL & ROAD WORKS' },
      { name: 'SIMBA BUILDERS', subtitle: 'TURNKEY CONSTRUCTION' },
      { name: 'UJENZI IMARA', subtitle: 'BRIDGES & HIGHRISES' },
      { name: 'MWAMBA CIVIL', subtitle: 'WATER & INFRASTRUCTURE' },
      { name: 'DAR CONTRACTORS', subtitle: 'CLASS ONE BUILDERS' },
      { name: 'STEEL & CONCRETE', subtitle: 'WAREHOUSE CONSTRUCTION' },
      { name: 'SOLIDBASE ENG', subtitle: 'FOUNDATION & PILING' },
      { name: 'CRANEFORCE TZ', subtitle: 'HEAVY CIVIL WORKS' },
      { name: 'MSINGI BUILDERS', subtitle: 'QUALITY RESIDENTIAL' },
      { name: 'MEGASTRUCT ENG', subtitle: 'INDUSTRIAL PLANTS' }
    ]
  },
  {
    category: 'Ujenzi & Majengo',
    profession: 'Uuzaji wa Viwanja & Nyumba',
    emblems: ['home', 'building', 'shield'],
    palettes: [
      ['#f59e0b', '#1c1917'],
      ['#10b981', '#022c22'],
      ['#1d4ed8', '#ffffff']
    ],
    items: [
      { name: 'VIWANJA HALISI', subtitle: 'SURVEYED PLOTS & TITLES' },
      { name: 'NYUMBA ZETU', subtitle: 'BUY, RENT & MANAGE' },
      { name: 'KIGAMBONI ESTATES', subtitle: 'BEACHFRONT PROPERTIES' },
      { name: 'DODOMA REALTY', subtitle: 'CAPITAL CITY PLOTS' },
      { name: 'MSASANI VILLAS', subtitle: 'LUXURY APARTMENTS' },
      { name: 'ARDHI TRUST', subtitle: 'TITLE DEED SPECIALISTS' },
      { name: 'BAGAMOYO HOMES', subtitle: 'GATED COMMUNITIES' },
      { name: 'PRIMEKEYS TZ', subtitle: 'COMMERCIAL LEASING' },
      { name: 'MADALE ESTATES', subtitle: 'INSTALLMENT PLOTS' },
      { name: 'DALALI PRO', subtitle: 'VERIFIED REAL ESTATE' }
    ]
  },
  {
    category: 'Ujenzi & Majengo',
    profession: 'Mapambo ya Ndani (Interior Design)',
    emblems: ['home', 'crown', 'diamond'],
    palettes: [
      ['#eab308', '#18181b'],
      ['#f472b6', '#2e1065'],
      ['#475569', '#ffffff']
    ],
    items: [
      { name: 'PAMBO LA NDANI', subtitle: 'BESPOKE INTERIORS' },
      { name: 'SOFA & GYPSUM', subtitle: 'CEILINGS & LIGHTING' },
      { name: 'MAVAZI YA NYUMBA', subtitle: 'CURTAINS, RUGS & WALLS' },
      { name: 'KISASA INTERIORS', subtitle: 'OFFICE FIT-OUTS' },
      { name: 'VELVET LIVING', subtitle: 'LUXURY HOME STAGING' },
      { name: 'AMBIENCE DESIGN', subtitle: 'KITCHEN & WARDROBES' },
      { name: 'CHIC SPACES TZ', subtitle: 'BOHO & MODERN DECOR' },
      { name: 'GOLDLINE DECOR', subtitle: 'HOTEL SUITE STYLING' },
      { name: 'ARTISAN ROOMS', subtitle: 'CUSTOM CABINETRY' },
      { name: 'PALAZZO DESIGN', subtitle: 'TILES & MARBLE WALLS' }
    ]
  },
  {
    category: 'Ujenzi & Majengo',
    profession: 'Vifaa vya Ujenzi (Hardware)',
    emblems: ['wrench', 'helmet_build', 'home'],
    palettes: [
      ['#ef4444', '#18181b'],
      ['#f97316', '#0f172a'],
      ['#0369a1', '#ffffff']
    ],
    items: [
      { name: 'SARUJI & NONDO', subtitle: 'CEMENT & STEEL DEPOT' },
      { name: 'MABATI IMARA', subtitle: 'ROOFING SHEETS & GUTTERS' },
      { name: 'RANGI NGUVU', subtitle: 'WEATHERGUARD PAINTS' },
      { name: 'TILES GALAXY', subtitle: 'PORCELAIN & CERAMICS' },
      { name: 'KARIAKOO HARDWARE', subtitle: 'TOOLS & PLUMBING' },
      { name: 'ALUMINIUM PRO', subtitle: 'GLASS & SLIDING DOORS' },
      { name: 'BOLT & NUT DEPOT', subtitle: 'INDUSTRIAL FASTENERS' },
      { name: 'TANGA CEMENT HUB', subtitle: 'BULK BUILDING SUPPLIES' },
      { name: 'PLUMBING WORLD', subtitle: 'PIPES, TAPS & SANITARY' },
      { name: 'PAVING BLOCKS TZ', subtitle: 'CONCRETE & PRECAST' }
    ]
  },
  {
    category: 'Ujenzi & Majengo',
    profession: 'Upimaji wa Ardhi (Surveyors)',
    emblems: ['globe', 'building', 'shield'],
    palettes: [
      ['#22c55e', '#09090b'],
      ['#38bdf8', '#0f172a'],
      ['#0f766e', '#ffffff']
    ],
    items: [
      { name: 'UPIMAJI ARDHI', subtitle: 'CADASTRAL & TOPOGRAPHY' },
      { name: 'GEOGRID SURVEYS', subtitle: 'RTK GPS & DRONE MAPPING' },
      { name: 'RAMANI GIS LABS', subtitle: 'URBAN ZONING & PLANS' },
      { name: 'BEACON MASTERS', subtitle: 'LAND SUBDIVISION' },
      { name: 'TERRA SURVEY TZ', subtitle: 'MINING & ROAD SURVEY' },
      { name: 'KIPIMO ARDHI', subtitle: 'LICENSED SURVEYORS' },
      { name: 'SATMAP AFRIKA', subtitle: 'REMOTE SENSING & GIS' },
      { name: 'VALUATION PRO', subtitle: 'PROPERTY APPRAISALS' },
      { name: 'BOUNDARY CHECK', subtitle: 'TITLE DEED SURVEYS' },
      { name: 'CONTOUR EXPERTS', subtitle: 'HYDROGRAPHIC MAPPING' }
    ]
  },

  // ======================== 11. KILIMO & MIFUGO (6 Fani) ========================
  {
    category: 'Kilimo & Mifugo',
    profession: 'Kilimo cha Kisasa & Umwagiliaji',
    emblems: ['sprout', 'leaf', 'sun_solar'],
    palettes: [
      ['#22c55e', '#052e16'],
      ['#84cc16', '#14532d'],
      ['#15803d', '#ffffff']
    ],
    items: [
      { name: 'KILIMO KWANZA', subtitle: 'DRIP IRRIGATION & FARMS' },
      { name: 'SHAMBA SMART', subtitle: 'GREENHOUSE VEGETABLES' },
      { name: 'RUVU AGRIBUSINESS', subtitle: 'RICE & MAIZE ESTATES' },
      { name: 'NJOMBE AVOCADO', subtitle: 'EXPORT HORTICULTURE' },
      { name: 'UMWAGILIAJI PRO', subtitle: 'SOLAR DRIP SYSTEMS' },
      { name: 'MAVUNO TELE', subtitle: 'HIGH-YIELD FARMING' },
      { name: 'MOROGORO FARMS', subtitle: 'SUNFLOWER & SOYA' },
      { name: 'AGROTECH SHAMBA', subtitle: 'DRONE SPRAYING & SOIL' },
      { name: 'KILIMA COFFEE', subtitle: 'HIGHLAND ARABICA' },
      { name: 'MWANZA COTTON', subtitle: 'COMMERCIAL FARMING' }
    ]
  },
  {
    category: 'Kilimo & Mifugo',
    profession: 'Ufugaji & Maziwa',
    emblems: ['sprout', 'home', 'heart'],
    palettes: [
      ['#38bdf8', '#0c4a6e'],
      ['#10b981', '#022c22'],
      ['#1e3a8a', '#ffffff']
    ],
    items: [
      { name: 'MAZIWA FRESH', subtitle: 'DAIRY FARM & YOGHURT' },
      { name: 'KUKU WA NYAMA', subtitle: 'BROILERS & LAYERS FARM' },
      { name: 'NGOMBE BORA', subtitle: 'BEEF & DAIRY RANCH' },
      { name: 'TANGA DAIRY', subtitle: 'PASTEURIZED MILK' },
      { name: 'MBUZI & KONDOO', subtitle: 'MODERN LIVESTOCK' },
      { name: 'CHICKS HATCHERY', subtitle: 'DAY-OLD CHICKS & FEED' },
      { name: 'RANCH YA KISASA', subtitle: 'PASTURE & SILAGE' },
      { name: 'UZALISHAJI BORA', subtitle: 'ARTIFICIAL INSEMINATION' },
      { name: 'MAYAI HALISI', subtitle: 'COMMERCIAL POULTRY' },
      { name: 'ARUSHA CREAMERY', subtitle: 'CHEESE, BUTTER & GHEE' }
    ]
  },
  {
    category: 'Kilimo & Mifugo',
    profession: 'Tiba ya Mifugo (Veterinary)',
    emblems: ['cross_med', 'heart', 'sprout'],
    palettes: [
      ['#14b8a6', '#042f2e'],
      ['#f59e0b', '#1c1917'],
      ['#0f766e', '#ffffff']
    ],
    items: [
      { name: 'DAKTARI WA MIFUGO', subtitle: 'VET CLINIC & VACCINES' },
      { name: 'AFYA YA WANYAMA', subtitle: 'FARM & PET MEDICINE' },
      { name: 'VETCARE TANZANIA', subtitle: 'DIAGNOSTICS & SURGERY' },
      { name: 'PAWS & HOOVES', subtitle: 'DOG, CAT & CATTLE CARE' },
      { name: 'CHANJO HARAKA', subtitle: 'POULTRY VACCINATION' },
      { name: 'DAWA ZA MIFUGO', subtitle: 'DEWORMERS & DIPS' },
      { name: 'ANIMAL WELLNESS', subtitle: '24H MOBILE VET' },
      { name: 'SERENGETI VET', subtitle: 'LIVESTOCK HEALTH HUB' },
      { name: 'PETFRIEND CLINIC', subtitle: 'GROOMING & VET CARE' },
      { name: 'LIVESTOCK SHIELD', subtitle: 'HERD HEALTH PLANS' }
    ]
  },
  {
    category: 'Kilimo & Mifugo',
    profession: 'Uvuvi & Mazao ya Bahari',
    emblems: ['ship', 'globe', 'sprout'],
    palettes: [
      ['#06b6d4', '#083344'],
      ['#3b82f6', '#0f172a'],
      ['#0369a1', '#ffffff']
    ],
    items: [
      { name: 'SAMAKI FRESH', subtitle: 'CAGE AQUACULTURE' },
      { name: 'VICTORIA TILAPIA', subtitle: 'SATO & SANGARA EXPORT' },
      { name: 'PWANI SEAFOOD', subtitle: 'PRAWNS, CRAB & OCTOPUS' },
      { name: 'BWAA LA SAMAKI', subtitle: 'CATFISH & TILAPIA PONDS' },
      { name: 'AQUAFARM TZ', subtitle: 'FISH FEED & FINGERLINGS' },
      { name: 'MAFIA FISHERIES', subtitle: 'DEEP SEA TUNA CATCH' },
      { name: 'KIGOMA DAGAA', subtitle: 'HYGIENIC SOLAR DRIED' },
      { name: 'COLDCHAIN FISH', subtitle: 'REFRIGERATED SEAFOOD' },
      { name: 'MWANI ZANZIBAR', subtitle: 'SEAWEED FARMING CO-OP' },
      { name: 'MARICULTURE PRO', subtitle: 'SUSTAINABLE OCEANS' }
    ]
  },
  {
    category: 'Kilimo & Mifugo',
    profession: 'Ufugaji wa Nyuki & Asali',
    emblems: ['sprout', 'sun_solar', 'crown'],
    palettes: [
      ['#f59e0b', '#271300'],
      ['#eab308', '#1c1917'],
      ['#b45309', '#fffbeb']
    ],
    items: [
      { name: 'ASALI YA TABORA', subtitle: 'PURE RAW FOREST HONEY' },
      { name: 'MIZINGA YA KISASA', subtitle: 'BEEKEEPING EQUIPMENT' },
      { name: 'NYUKI GOLD', subtitle: 'ORGANIC HONEY & WAX' },
      { name: 'SINGIDA APIARIES', subtitle: 'STINGLESS BEE HONEY' },
      { name: 'ROYAL NECTAR TZ', subtitle: 'PROPOLIS & ROYAL JELLY' },
      { name: 'MIOMBO HONEY', subtitle: 'WILDFLOWER HARVEST' },
      { name: 'ASALI SAFI CO', subtitle: 'EXPORT GRADE BOTTLING' },
      { name: 'BEEHIVE ACADEMY', subtitle: 'MODERN APIARY TRAINING' },
      { name: 'GOLDEN COMB', subtitle: 'RAW BEESWAX & BALMS' },
      { name: 'RUKWA NECTAR', subtitle: 'HIGHLAND APIARIES' }
    ]
  },
  {
    category: 'Kilimo & Mifugo',
    profession: 'Pembejeo & Mbegu Bora',
    emblems: ['sprout', 'leaf', 'flask'],
    palettes: [
      ['#16a34a', '#052e16'],
      ['#84cc16', '#0f172a'],
      ['#15803d', '#ffffff']
    ],
    items: [
      { name: 'MBEGU HALISI', subtitle: 'CERTIFIED HYBRID SEEDS' },
      { name: 'MBOLEA PLUS', subtitle: 'NPK & ORGANIC BOOSTERS' },
      { name: 'AGROVET SHOPS', subtitle: 'CROP PROTECTION & TOOLS' },
      { name: 'TRAKTA & JEMBE', subtitle: 'FARM MACHINERY RENTALS' },
      { name: 'MAVUNO INPUTS', subtitle: 'DROUGHT TOLERANT SEEDS' },
      { name: 'RUTUBA SOIL LAB', subtitle: 'SOIL TESTING & LIME' },
      { name: 'KILIMO DEPOT', subtitle: 'WHOLESALE AGRO-DEALER' },
      { name: 'GREENHARVEST SEED', subtitle: 'HORTICULTURE PACKS' },
      { name: 'PESTSHIELD AGRO', subtitle: 'SAFE BIOPESTICIDES' },
      { name: 'MBEYA AGROSTORE', subtitle: 'FARMERS ONE-STOP HUB' }
    ]
  },

  // ======================== 12. CHAKULA & UKARIMU (6 Fani) ========================
  {
    category: 'Chakula & Ukarimu',
    profession: 'Mgahawa & Mapishi',
    emblems: ['utensils', 'cup', 'crown'],
    palettes: [
      ['#f97316', '#450a0a'],
      ['#ef4444', '#18181b'],
      ['#b91c1c', '#ffffff']
    ],
    items: [
      { name: 'JIKO LA MAMA', subtitle: 'AUTHENTIC SWAHILI DISHES' },
      { name: 'NYAMA CHOMA SPOT', subtitle: 'GRILL, MISHKAKI & BBQ' },
      { name: 'BIRIANI PALACE', subtitle: 'SPICED COASTAL CUISINE' },
      { name: 'SAMAKI GRILL', subtitle: 'SEAFOOD RESTAURANT' },
      { name: 'BISTRO KARIBU', subtitle: 'FINE DINING & LOUNGE' },
      { name: 'PILAU HOUSE', subtitle: 'TRADITIONAL LUNCHES' },
      { name: 'SERENGETI STEAK', subtitle: 'PRIME CUTS & WINE' },
      { name: 'CHAKULA KITAMU', subtitle: 'FAST CASUAL KITCHEN' },
      { name: 'MBEZI TERRACE', subtitle: 'ROOFTOP DINING' },
      { name: 'SPICE ISLAND KITCHEN', subtitle: 'ZANZIBAR FLAVORS' }
    ]
  },
  {
    category: 'Chakula & Ukarimu',
    profession: 'Keki & Mikate (Bakery)',
    emblems: ['utensils', 'crown', 'heart'],
    palettes: [
      ['#f472b6', '#4a044e'],
      ['#f59e0b', '#271300'],
      ['#db2777', '#ffffff']
    ],
    items: [
      { name: 'KEKI TAMU', subtitle: 'WEDDING & BIRTHDAY CAKES' },
      { name: 'MIKATE MOTO', subtitle: 'ARTISAN BREAD & SCONES' },
      { name: 'SUKARI PASTRY', subtitle: 'CROISSANTS & DONUTS' },
      { name: 'MAANDAZI EXPRESS', subtitle: 'FRESH MORNING BAKERY' },
      { name: 'SWEETCRUMB STUDIO', subtitle: 'CUSTOM FONDANT CAKES' },
      { name: 'VANILLA BEAN', subtitle: 'CUPCAKES & MACARONS' },
      { name: 'GOLDEN CRUST', subtitle: 'WHOLEWHEAT & BRIOCHE' },
      { name: 'ROYAL CONFECTION', subtitle: 'DESSERTS & GELATO' },
      { name: 'KARAFUU BAKERY', subtitle: 'SPICED TEA BISCUITS' },
      { name: 'DELIGHT BAKES', subtitle: 'PASTRY ACADEMY & SHOP' }
    ]
  },
  {
    category: 'Chakula & Ukarimu',
    profession: 'Kahawa & Vinywaji (Cafe)',
    emblems: ['coffee', 'cup', 'leaf'],
    palettes: [
      ['#d97706', '#1c1917'],
      ['#10b981', '#022c22'],
      ['#78350f', '#fffbeb']
    ],
    items: [
      { name: 'KAHAWA HOUSE', subtitle: 'KILIMANJARO ROASTERY' },
      { name: 'CHAI & KAHAWA', subtitle: 'SPICED TEA & ESPRESSO' },
      { name: 'JUICE BAR FRESH', subtitle: 'COLD PRESSED SMOOTHIES' },
      { name: 'ARABICA LOUNGE', subtitle: 'SPECIALTY COFFEE SHOP' },
      { name: 'ZANZIBAR MOCHA', subtitle: 'SINGLE ORIGIN BEANS' },
      { name: 'TROPICAL SIPS', subtitle: 'PASSION, MANGO & GINGER' },
      { name: 'LATTE CORNER', subtitle: 'COWORKING COFFEE CAFE' },
      { name: 'BUNI ROASTERS', subtitle: 'WHOLE BEAN & GROUND' },
      { name: 'OASIS SMOOTHIE', subtitle: 'NATURAL FRUIT SHAKES' },
      { name: 'MORNING BREW', subtitle: 'BREAKFAST & CROISSANTS' }
    ]
  },
  {
    category: 'Chakula & Ukarimu',
    profession: 'Huduma ya Chakula (Catering)',
    emblems: ['utensils', 'star', 'crown'],
    palettes: [
      ['#fbbf24', '#1e1b4b'],
      ['#ea580c', '#18181b'],
      ['#0f172a', '#ffffff']
    ],
    items: [
      { name: 'SHEREHE CATERING', subtitle: 'WEDDINGS & BANQUETS' },
      { name: 'ROYAL BUFFET TZ', subtitle: 'CORPORATE LUNCHEONS' },
      { name: 'MPISHI MKUU', subtitle: 'OUTDOOR EVENT CHEFS' },
      { name: 'CHAKULA KWA WOTE', subtitle: 'SEMINAR & GALA MEALS' },
      { name: 'SILVER PLATTER', subtitle: 'VIP TABLE SERVICE' },
      { name: 'FEAST AFRIKA', subtitle: '5000+ GUEST CATERING' },
      { name: 'TAJ MAHAL BUFFET', subtitle: 'FUSION EVENT MENUS' },
      { name: 'KARIBU DINNERS', subtitle: 'PRIVATE CHEF HIRE' },
      { name: 'SWAHILI BANQUET', subtitle: 'BUFFET & DRINKS SETUP' },
      { name: 'CLASSIC TRAYS', subtitle: 'OFFICE SNACK BOXES' }
    ]
  },
  {
    category: 'Chakula & Ukarimu',
    profession: 'Hoteli & Risoti',
    emblems: ['crown', 'building', 'star'],
    palettes: [
      ['#fcd34d', '#1e1b4b'],
      ['#0ea5e9', '#082f49'],
      ['#1e293b', '#ffffff']
    ],
    items: [
      { name: 'BAHARI RESORT', subtitle: '5-STAR BEACH HOTEL' },
      { name: 'SERENA PALMS', subtitle: 'LUXURY SUITES & SPA' },
      { name: 'DODOMA GRAND HOTEL', subtitle: 'CONFERENCE & SUITES' },
      { name: 'NUNGWI PARADISE', subtitle: 'OCEANFRONT VILLAS' },
      { name: 'KIBO CREST LODGE', subtitle: 'MOUNTAIN VIEW HOTEL' },
      { name: 'MSASANI BAY INN', subtitle: 'BOUTIQUE BUSINESS STAY' },
      { name: 'ZANZIBAR ROYALE', subtitle: 'HONEYMOON RESORT' },
      { name: 'LAKESIDE HOTEL', subtitle: 'MWANZA WATERFRONT' },
      { name: 'ARUSHA OASIS', subtitle: 'GARDEN COTTAGES' },
      { name: 'CROWN PLAZA TZ', subtitle: 'HOSPITALITY & EVENTS' }
    ]
  },
  {
    category: 'Chakula & Ukarimu',
    profession: 'Utalii & Safari za Mbugani',
    emblems: ['tree_pine', 'globe', 'camera'],
    palettes: [
      ['#84cc16', '#14532d'],
      ['#f59e0b', '#1c1917'],
      ['#065f46', '#ffffff']
    ],
    items: [
      { name: 'TWIGA EXPEDITIONS', subtitle: 'SERENGETI & NGORONGORO' },
      { name: 'KIBO TREKKERS', subtitle: 'MT KILIMANJARO GUIDES' },
      { name: 'MAASAI TRAILS', subtitle: 'CULTURAL & WILDLIFE' },
      { name: 'GREAT MIGRATION', subtitle: 'LUXURY TENTED CAMPS' },
      { name: 'KARIBU SAFARIS', subtitle: 'TAILOR-MADE TOURS' },
      { name: 'STONE TOWN WALKS', subtitle: 'ZANZIBAR HERITAGE TOURS' },
      { name: 'RUAHA EXPLORERS', subtitle: 'SOUTHERN CIRCUIT SAFARI' },
      { name: 'BUSH & BEACH TZ', subtitle: 'SAFARI TO ISLANDS' },
      { name: 'TEMBO TOURS', subtitle: '4X4 LANDCRUISER SAFARI' },
      { name: 'NYERERE SAFARI', subtitle: 'RIVER BOAT & GAME DRIVE' }
    ]
  },

  // ======================== 13. SHERIA, ULINZI & UTAWALA (6 Fani) ========================
  {
    category: 'Sheria & Ulinzi',
    profession: 'Kampuni ya Mawakili (Law Firm)',
    emblems: ['scales', 'shield', 'book'],
    palettes: [
      ['#fbbf24', '#0f172a'],
      ['#94a3b8', '#020617'],
      ['#1e293b', '#ffffff']
    ],
    items: [
      { name: 'HAKI ADVOCATES', subtitle: 'CORPORATE & LITIGATION' },
      { name: 'SHERIA CHAMBERS', subtitle: 'BARRISTERS & SOLICITORS' },
      { name: 'MIZANI LAW FIRM', subtitle: 'COMMERCIAL ARBITRATION' },
      { name: 'KISUTU ATTORNEYS', subtitle: 'BANKING & ENERGY LAW' },
      { name: 'APEX LEGAL GROUP', subtitle: 'NOTARY & CONVEYANCING' },
      { name: 'TANGANYIKA LAW', subtitle: 'INTELLECTUAL PROPERTY' },
      { name: 'VERITAS COUNSEL', subtitle: 'TAX & LABOR LAWYERS' },
      { name: 'SOVEREIGN LEGAL', subtitle: 'MERGERS & COMPLIANCE' },
      { name: 'JUSTITIA PARTNERS', subtitle: 'HIGH COURT ADVOCATES' },
      { name: 'BOMA LAWYERS', subtitle: 'LAND & CONTRACT LAW' }
    ]
  },
  {
    category: 'Sheria & Ulinzi',
    profession: 'Usuluhishi & Haki',
    emblems: ['scales', 'heart', 'shield'],
    palettes: [
      ['#38bdf8', '#0f172a'],
      ['#14b8a6', '#042f2e'],
      ['#1e40af', '#ffffff']
    ],
    items: [
      { name: 'USULUHISHI CENTER', subtitle: 'MEDIATION & PEACE' },
      { name: 'MSAADA WA SHERIA', subtitle: 'FREE LEGAL AID CLINIC' },
      { name: 'HAKI ZA BINADAMU', subtitle: 'HUMAN RIGHTS ADVOCACY' },
      { name: 'SHERIA KWA WOTE', subtitle: 'CITIZEN JUSTICE NETWORK' },
      { name: 'AMANI ARBITRATORS', subtitle: 'WORKPLACE DISPUTES' },
      { name: 'WEMA LEGAL TRUST', subtitle: 'WOMEN & CHILD RIGHTS' },
      { name: 'DIALOGUE FORUM', subtitle: 'CONFLICT RESOLUTION' },
      { name: 'EQUAL JUSTICE TZ', subtitle: 'CIVIC EDUCATION' },
      { name: 'ACCORD MEDIATORS', subtitle: 'COMMERCIAL SETTLEMENT' },
      { name: 'HOPE ADVOCACY', subtitle: 'COMMUNITY PARALEGALS' }
    ]
  },
  {
    category: 'Sheria & Ulinzi',
    profession: 'Ulinzi Binafsi & Walinzi',
    emblems: ['shield', 'star', 'crown'],
    palettes: [
      ['#38bdf8', '#020617'],
      ['#fbbf24', '#18181b'],
      ['#0f172a', '#ffffff']
    ],
    items: [
      { name: 'MLINZI IMARA', subtitle: 'ARMED & K9 PATROL' },
      { name: 'TAI SECURITY', subtitle: '24/7 CORPORATE GUARDS' },
      { name: 'CHUI FORCE', subtitle: 'CASH IN TRANSIT OPS' },
      { name: 'ULINZI SHUPAVU', subtitle: 'EVENT CROWD SECURITY' },
      { name: 'BOMA PATROL', subtitle: 'RESIDENTIAL WATCHMEN' },
      { name: 'VIP ESCORT TZ', subtitle: 'EXECUTIVE CLOSE PROTECT' },
      { name: 'WATCHTOWER SEC', subtitle: 'RAPID RESPONSE SQUAD' },
      { name: 'IRONCLAD GUARDS', subtitle: 'MINE & PORT SECURITY' },
      { name: 'EAGLE EYE GUARD', subtitle: 'TRAINED SECURITY CORPS' },
      { name: 'NGOME SECURITY', subtitle: 'EMBASSY & BANK GUARDS' }
    ]
  },
  {
    category: 'Sheria & Ulinzi',
    profession: 'Kamera za CCTV & Kengele',
    emblems: ['camera', 'lock_cyber', 'shield'],
    palettes: [
      ['#06b6d4', '#09090b'],
      ['#ef4444', '#0f172a'],
      ['#1e293b', '#ffffff']
    ],
    items: [
      { name: 'JICHO CCTV', subtitle: '4K NIGHT VISION CAMERAS' },
      { name: 'SMARTGATE ACCESS', subtitle: 'BIOMETRIC & RFID LOCKS' },
      { name: 'KENGELE PRO', subtitle: 'INTRUSION & ELECTRIC FENCE' },
      { name: 'VISIONGUARD TZ', subtitle: 'REMOTE PHONE VIEWING' },
      { name: 'BIOMETRICS LAB', subtitle: 'FINGERPRINT & TIME CLOCK' },
      { name: 'SENTINEL CAM', subtitle: 'SOLAR OUTDOOR CCTV' },
      { name: 'SAFEHOME TECH', subtitle: 'VIDEO INTERCOM & ALARMS' },
      { name: 'ANPR SECURITY', subtitle: 'PLATE NUMBER CAMERAS' },
      { name: 'CONTROL ROOM', subtitle: '24H ALARM MONITORING' },
      { name: 'FENCEWIRE PRO', subtitle: 'RAZOR & ELECTRIC FENCING' }
    ]
  },
  {
    category: 'Sheria & Ulinzi',
    profession: 'Zimamoto & Uokoaji',
    emblems: ['shield', 'bolt', 'cross_med'],
    palettes: [
      ['#ef4444', '#18181b'],
      ['#f97316', '#0f172a'],
      ['#dc2626', '#ffffff']
    ],
    items: [
      { name: 'ZIMAMOTO PRO', subtitle: 'EXTINGUISHERS & HYDRANTS' },
      { name: 'USALAMA KAZINI', subtitle: 'OSHA & PPE GEAR' },
      { name: 'OKOA RESCUE', subtitle: 'EMERGENCY AMBULANCE' },
      { name: 'FIRESHIELD TZ', subtitle: 'SPRINKLERS & SMOKE SENSORS' },
      { name: 'HAZMAT SAFETY', subtitle: 'INDUSTRIAL FIRE TRAINING' },
      { name: 'REDGUARD FIRE', subtitle: 'SUPPRESSION SYSTEMS' },
      { name: 'LIFEBOAT RESCUE', subtitle: 'MARINE SAFETY EQUIPMENT' },
      { name: 'FIRSTAID CORPS', subtitle: 'WORKPLACE CPR & SAFETY' },
      { name: 'ALERT ALARM CO', subtitle: 'FIRE PANELS & SIRENS' },
      { name: 'SAFEWORK AFRICA', subtitle: 'HELMETS, BOOTS & HARNESS' }
    ]
  },
  {
    category: 'Sheria & Ulinzi',
    profession: 'Mashirika Yasiyo ya Kiserikali (NGO)',
    emblems: ['heart', 'globe', 'sprout'],
    palettes: [
      ['#2dd4bf', '#042f2e'],
      ['#3b82f6', '#0f172a'],
      ['#0d9488', '#ffffff']
    ],
    items: [
      { name: 'TUSONGE PAMOJA', subtitle: 'RURAL EMPOWERMENT NGO' },
      { name: 'NURISHA MTOTO', subtitle: 'CHILD NUTRITION CHARITY' },
      { name: 'ELIMU KWA BINTI', subtitle: 'GIRLS SCHOLARSHIP FUND' },
      { name: 'MAJI SAFI AFRICA', subtitle: 'BOREHOLES & SANITATION' },
      { name: 'WEZESHA MAMA', subtitle: 'WOMEN MICRO-GRANTS' },
      { name: 'UMOJA RELIEF', subtitle: 'DISASTER & FOOD AID' },
      { name: 'HOPE BRIDGE TZ', subtitle: 'YOUTH SKILLS & JOBS' },
      { name: 'MATUMAINI TRUST', subtitle: 'ORPHANAGE & CARE' },
      { name: 'JAMII IMPACT', subtitle: 'COMMUNITY DEVELOPMENT' },
      { name: 'CLEANWELL ORG', subtitle: 'HYGIENE & WATER ACCESS' }
    ]
  },

  // ======================== 14. MITINDO & UREMBO (6 Fani) ========================
  {
    category: 'Mitindo & Urembo',
    profession: 'Ubunifu wa Mavazi & Ushonaji',
    emblems: ['scissors', 'crown', 'diamond'],
    palettes: [
      ['#f472b6', '#2e1065'],
      ['#fbbf24', '#18181b'],
      ['#9d174d', '#ffffff']
    ],
    items: [
      { name: 'VITENGE ROYAL', subtitle: 'BESPOKE AFRICAN WEAR' },
      { name: 'MSHONAJI PRO', subtitle: 'BESPOKE SUITS & GOWNS' },
      { name: 'KANGA COUTURE', subtitle: 'RUNWAY & BRIDAL DRESS' },
      { name: 'ZANZIBAR THREADS', subtitle: 'LINEN & RESORT WEAR' },
      { name: 'STITCH & STYLE', subtitle: 'UNIFORMS & TAILORING' },
      { name: 'BONGO STREETWEAR', subtitle: 'HOODIES, TEES & CAPS' },
      { name: 'MAVAZI YA HARUSI', subtitle: 'CUSTOM TUXEDOS & VEILS' },
      { name: 'KILIMA APPAREL', subtitle: 'ACTIVEWEAR & DENIM' },
      { name: 'DAR ATELIER', subtitle: 'LUXURY READY-TO-WEAR' },
      { name: 'BATIKI HUB', subtitle: 'HAND-DYED TEXTILES' }
    ]
  },
  {
    category: 'Mitindo & Urembo',
    profession: 'Saluni ya Nywele & Kucha',
    emblems: ['scissors', 'heart', 'diamond'],
    palettes: [
      ['#e879f9', '#4a044e'],
      ['#fb7185', '#18181b'],
      ['#be185d', '#ffffff']
    ],
    items: [
      { name: 'REMBO SALON', subtitle: 'BRAIDS, WIGS & NAILS' },
      { name: 'GLAMOUR TOUCH', subtitle: 'BRIDAL MAKEUP & HAIR' },
      { name: 'NYWELE ASILI', subtitle: 'NATURAL HAIR & LOCS' },
      { name: 'KUCHA STUDIO', subtitle: 'ACRYLICS, GEL & MANICURE' },
      { name: 'MALAIKA BEAUTY', subtitle: 'LASHES & BROWS BAR' },
      { name: 'CURLS & CROWN', subtitle: 'HAIR TREATMENT & SILK' },
      { name: 'DIVA MAKEOVER', subtitle: 'RED CARPET STYLING' },
      { name: 'ZURI NAIL LOUNGE', subtitle: 'PEDICURE & NAIL ART' },
      { name: 'SHINING TRESSES', subtitle: 'WIG INSTALLATION PRO' },
      { name: 'MSASANI GLAM', subtitle: 'FULL BEAUTY PARLOUR' }
    ]
  },
  {
    category: 'Mitindo & Urembo',
    profession: 'Kinyozi cha Kisasa (Barbershop)',
    emblems: ['scissors', 'crown', 'star'],
    palettes: [
      ['#fbbf24', '#09090b'],
      ['#38bdf8', '#18181b'],
      ['#111827', '#ffffff']
    ],
    items: [
      { name: 'KINYOZI ROYAL', subtitle: 'SHARP FADES & BEARD' },
      { name: 'GENTS GROOMING', subtitle: 'HOT TOWEL SHAVE & CUT' },
      { name: 'EXECUTIVE FADES', subtitle: 'VIP BARBER LOUNGE' },
      { name: 'BLADE & CROWN', subtitle: 'CLASSIC MEN CUTS' },
      { name: 'BONGO BARBERS', subtitle: 'DREADS, DYE & TRIM' },
      { name: 'SHARP EDGE STUDIO', subtitle: 'PRECISION HAIRLINES' },
      { name: 'KINGSMAN CUTS', subtitle: 'GROOMS & MEN SPA' },
      { name: 'RAZOR CRAFT', subtitle: 'BEARD OIL & STYLING' },
      { name: 'URBAN CLIPPERS', subtitle: 'WALK-IN BARBERSHOP' },
      { name: 'DREADLOCK TEMPLE', subtitle: 'TWISTS & BARBERING' }
    ]
  },
  {
    category: 'Mitindo & Urembo',
    profession: 'Spa & Masaji',
    emblems: ['leaf', 'heart', 'diamond'],
    palettes: [
      ['#2dd4bf', '#042f2e'],
      ['#c084fc', '#2e1065'],
      ['#0f766e', '#ffffff']
    ],
    items: [
      { name: 'AMANI WELLNESS SPA', subtitle: 'MASSAGE & STEAM BATH' },
      { name: 'ZANZIBAR SERENITY', subtitle: 'SPICE SCRUBS & FACIALS' },
      { name: 'RELAXING HANDS', subtitle: 'DEEP TISSUE & AROMA' },
      { name: 'LOTUS SANCTUARY', subtitle: 'SAUNA & HYDROTHERAPY' },
      { name: 'OCEAN BREEZE SPA', subtitle: 'COUPLES RETREAT DAY' },
      { name: 'KILIMA THERMAL', subtitle: 'HOT STONE THERAPY' },
      { name: 'GLOW FACIAL BAR', subtitle: 'SKINCARE & PEELS' },
      { name: 'ZEN GARDEN SPA', subtitle: 'REFLEXOLOGY & RELAX' },
      { name: 'PURE ESSENCE', subtitle: 'MOROCCAN HAMMAM' },
      { name: 'HARMONY BODY', subtitle: 'SPORTS RECOVERY SPA' }
    ]
  },
  {
    category: 'Mitindo & Urembo',
    profession: 'Vito vya Thamani & Saa',
    emblems: ['diamond', 'crown', 'star'],
    palettes: [
      ['#fcd34d', '#020617'],
      ['#38bdf8', '#09090b'],
      ['#0f172a', '#ffffff']
    ],
    items: [
      { name: 'TANZANITE ROYALE', subtitle: 'GENUINE GEMS & RINGS' },
      { name: 'ALMASI JEWELERS', subtitle: 'DIAMOND & GOLD STUDIO' },
      { name: 'SAA ZA THAMANI', subtitle: 'LUXURY WATCH BOUTIQUE' },
      { name: 'DHAHABU HOUSE', subtitle: '24K WEDDING BANDS' },
      { name: 'MERERANI GEMS', subtitle: 'CERTIFIED TANZANITE' },
      { name: 'CARAT & CROWN', subtitle: 'ENGAGEMENT RINGS' },
      { name: 'GOLDCREST JEWELS', subtitle: 'NECKLACES & BRACELETS' },
      { name: 'OPAL & PEARL', subtitle: 'COASTAL FINE JEWELRY' },
      { name: 'HOROLOGY TZ', subtitle: 'SWISS WATCH REPAIR' },
      { name: 'LULU FINE GEMS', subtitle: 'CUSTOM GOLDSMITHS' }
    ]
  },
  {
    category: 'Mitindo & Urembo',
    profession: 'Vipodozi & Manukato',
    emblems: ['diamond', 'heart', 'sprout'],
    palettes: [
      ['#f43f5e', '#18181b'],
      ['#fbbf24', '#2e1065'],
      ['#be185d', '#ffffff']
    ],
    items: [
      { name: 'HARUFU NZURI', subtitle: 'OUD & SIGNATURE PERFUMES' },
      { name: 'NGOZI LAINI', subtitle: 'SHEA & BOTANICAL SKINCARE' },
      { name: 'MAFUTA YA KARAFUU', subtitle: 'ZANZIBAR ESSENTIAL OILS' },
      { name: 'GLOW COSMETICS', subtitle: 'FOUNDATION & LIPGLOSS' },
      { name: 'ALOE & HONEY', subtitle: 'NATURAL BODY LOTIONS' },
      { name: 'SCENT ISLAND', subtitle: 'FRAGRANCE DIFFUSERS' },
      { name: 'RADIANCE LABS', subtitle: 'SERUMS & VITAMIN C' },
      { name: 'SWAHILI SCENTS', subtitle: 'INCENSE & PERFUME OIL' },
      { name: 'PURE SHEA CARE', subtitle: 'SOAPS & BODY BUTTERS' },
      { name: 'VELVET COSMETIC', subtitle: 'CRUELTY-FREE MAKEUP' }
    ]
  },

  // ======================== 15. MICHEZO & MAZOEZI (6 Fani) ========================
  {
    category: 'Michezo & Mazoezi',
    profession: 'Klabu ya Mpira wa Miguu',
    emblems: ['soccer', 'shield', 'star'],
    palettes: [
      ['#ef4444', '#09090b'],
      ['#22c55e', '#14532d'],
      ['#facc15', '#0f172a']
    ],
    items: [
      { name: 'SIMBA VIJANA FC', subtitle: 'YOUTH FOOTBALL ACADEMY' },
      { name: 'MWANZA ROVERS', subtitle: 'PREMIER LEAGUE CLUB' },
      { name: 'KIGOMA RANGERS', subtitle: 'STRENGTH & VICTORY' },
      { name: 'PWANI WARRIORS FC', subtitle: 'COASTAL FOOTBALL CLUB' },
      { name: 'TAIFA STARS CUP', subtitle: 'GRASSROOTS TOURNAMENT' },
      { name: 'DODOMA ATHLETIC', subtitle: 'CHAMPIONS ACADEMY' },
      { name: 'TANGA TIGERS FC', subtitle: 'PASSION ON THE PITCH' },
      { name: 'ARUSHA PANTHERS', subtitle: 'PRO SOCCER CLUB' },
      { name: 'ZANZIBAR HEROES', subtitle: 'ISLAND PREMIER FC' },
      { name: 'MBEYA STRIKERS', subtitle: 'UNITED FOR GLORY' }
    ]
  },
  {
    category: 'Michezo & Mazoezi',
    profession: 'Kikapu, Riadha & Michezo',
    emblems: ['star', 'bolt', 'cup'],
    palettes: [
      ['#f97316', '#0f172a'],
      ['#38bdf8', '#172554'],
      ['#ea580c', '#ffffff']
    ],
    items: [
      { name: 'KIKAPU KINGS', subtitle: 'BASKETBALL LEAGUE TZ' },
      { name: 'KILIMANJARO RUN', subtitle: 'FULL & HALF MARATHON' },
      { name: 'RIADHA ELITE', subtitle: 'TRACK & FIELD CLUB' },
      { name: 'NETBALL QUEENS', subtitle: 'NATIONAL SPORTS TEAM' },
      { name: 'VOLLEYBALL PRO', subtitle: 'BEACH & INDOOR COURTS' },
      { name: 'DAR HOOPS', subtitle: 'YOUTH BASKETBALL CAMP' },
      { name: 'TENNIS PALMS', subtitle: 'CLAY COURTS & COACHING' },
      { name: 'SERENGETI RUNNERS', subtitle: 'ENDURANCE ATHLETICS' },
      { name: 'RUGBY LIONS TZ', subtitle: 'SEVENS & FIFTEENS' },
      { name: 'KICKOFF ARENA', subtitle: 'MULTI-SPORT COMPLEX' }
    ]
  },
  {
    category: 'Michezo & Mazoezi',
    profession: 'Gym & Mazoezi ya Viungo',
    emblems: ['dumbbell', 'bolt', 'heart'],
    palettes: [
      ['#a3e635', '#09090b'],
      ['#ef4444', '#18181b'],
      ['#f97316', '#0f172a']
    ],
    items: [
      { name: 'NGUVU GYM', subtitle: 'STRENGTH & BODYBUILDING' },
      { name: 'MWILI IMARA', subtitle: 'CROSSFIT & CARDIO HUB' },
      { name: 'IRONWORKS FIT', subtitle: '24/7 WEIGHTS & COACH' },
      { name: 'FITZANZIBAR', subtitle: 'BEACH BOOTCAMP & YOGA' },
      { name: 'PULSE AEROBICS', subtitle: 'ZUMBA & FAT BURN' },
      { name: 'TITAN FITNESS', subtitle: 'PRO POWERLIFTING' },
      { name: 'CORE & FLEX', subtitle: 'PILATES & MOBILITY' },
      { name: 'APEX ATHLETIX', subtitle: 'PERSONAL TRAINING' },
      { name: 'SWEAT HOUSE DAR', subtitle: 'HIIT & SPINNING STUDIO' },
      { name: 'MUSCLE FACTORY', subtitle: 'PROTEIN BAR & GYM' }
    ]
  },
  {
    category: 'Michezo & Mazoezi',
    profession: 'Sanaa za Kujihami (Martial Arts)',
    emblems: ['shield', 'bolt', 'star'],
    palettes: [
      ['#dc2626', '#09090b'],
      ['#fbbf24', '#18181b'],
      ['#111827', '#ffffff']
    ],
    items: [
      { name: 'NGUMI ZA CHUMA', subtitle: 'BOXING & KICKBOXING' },
      { name: 'SHINOBI KARATE', subtitle: 'SHOTOKAN DOJO TZ' },
      { name: 'TAEKWONDO CLUB', subtitle: 'OLYMPIC MARTIAL ARTS' },
      { name: 'KRAV MAGA DAR', subtitle: 'SELF DEFENSE ACADEMY' },
      { name: 'JUDO TANZANIA', subtitle: 'DISCIPLINE & HONOR' },
      { name: 'WARRIOR MMA', subtitle: 'JIU-JITSU & MUAY THAI' },
      { name: 'BLACKBELT YOUTH', subtitle: 'KIDS KARATE CLASSES' },
      { name: 'SAMURAI DOJO', subtitle: 'TRADITIONAL KUNG FU' },
      { name: 'KNOCKOUT GYM', subtitle: 'AMATEUR & PRO BOXING' },
      { name: 'IRON FIST ACADEMY', subtitle: 'SPARRING & FITNESS' }
    ]
  },
  {
    category: 'Michezo & Mazoezi',
    profession: 'Kuogelea & Michezo ya Maji',
    emblems: ['ship', 'bolt', 'star'],
    palettes: [
      ['#06b6d4', '#083344'],
      ['#38bdf8', '#0f172a'],
      ['#0284c7', '#ffffff']
    ],
    items: [
      { name: 'PAPA SWIMMERS', subtitle: 'OLYMPIC SWIM ACADEMY' },
      { name: 'KIGAMBONI SURF', subtitle: 'KITESURF & PADDLEBOARD' },
      { name: 'MAJI BLUE DIVING', subtitle: 'SCUBA & CORAL TOURS' },
      { name: 'DOLPHIN KIDS SWIM', subtitle: 'LEARN TO SWIM SAFELY' },
      { name: 'PAJE KITE SCHOOL', subtitle: 'ZANZIBAR WIND SPORTS' },
      { name: 'AQUA FITNESS TZ', subtitle: 'POOL AEROBICS & LAP' },
      { name: 'ROWING CLUB DAR', subtitle: 'KAYAK & CANOE RACING' },
      { name: 'REEF SNORKELERS', subtitle: 'MARINE ADVENTURES' },
      { name: 'SHARK AQUATICS', subtitle: 'COMPETITIVE SWIMMING' },
      { name: 'JETSKI BAY', subtitle: 'COASTAL WATER SPORTS' }
    ]
  },
  {
    category: 'Michezo & Mazoezi',
    profession: 'Baiskeli & Mbio za Nje',
    emblems: ['bolt', 'tree_pine', 'globe'],
    palettes: [
      ['#84cc16', '#09090b'],
      ['#f97316', '#18181b'],
      ['#059669', '#ffffff']
    ],
    items: [
      { name: 'BAISKELI CLUB', subtitle: 'ROAD & MOUNTAIN CYCLING' },
      { name: 'KIBO MTB TRAILS', subtitle: 'OFF-ROAD BIKE TOURS' },
      { name: 'ARUSHA TRAIL RUN', subtitle: 'ULTRA & MOUNTAIN RACES' },
      { name: 'PEDAL POWER TZ', subtitle: 'BIKE SHOP & SERVICE' },
      { name: 'MOROGORO HIKERS', subtitle: 'ULUGURU CAMPING CLUB' },
      { name: 'TWENDE PEDALS', subtitle: 'SUNDAY GROUP RIDES' },
      { name: 'GRAVEL EXPLORERS', subtitle: 'CROSS-COUNTRY BIKING' },
      { name: 'SUMMIT CLIMBERS', subtitle: 'ROCK & BOULDERING' },
      { name: 'OUTDOOR ADVENTURE', subtitle: 'ZIP-LINE & TREKKING' },
      { name: 'SPINNERS CYCLING', subtitle: 'E-BIKES & RACING GEAR' }
    ]
  },

  // ======================== 16. VIWANDA, NISHATI & HUDUMA (8 Fani) ========================
  {
    category: 'Viwanda & Huduma',
    profession: 'Madini & Jiolojia',
    emblems: ['diamond', 'helmet_build', 'shield'],
    palettes: [
      ['#fbbf24', '#09090b'],
      ['#38bdf8', '#18181b'],
      ['#92400e', '#ffffff']
    ],
    items: [
      { name: 'MADINI GOLD', subtitle: 'EXPLORATION & MINING' },
      { name: 'JIOLOJIA LABS', subtitle: 'CORE DRILLING & ASSAY' },
      { name: 'GEITA MINERAL', subtitle: 'GOLD PROCESSING PLANT' },
      { name: 'KAHAMA QUARRY', subtitle: 'AGGREGATES & BLASTING' },
      { name: 'MERERANI MINING', subtitle: 'GEMSTONE EXTRACTION' },
      { name: 'SHINYANGA MINES', subtitle: 'DIAMOND & RESOURCES' },
      { name: 'ROCKCORE SURVEY', subtitle: 'GEOPHYSICAL MAPPING' },
      { name: 'EARTHDIGGERS TZ', subtitle: 'HEAVY EXCAVATION' },
      { name: 'CRUSH & SIFT', subtitle: 'ORE CONCENTRATION' },
      { name: 'TANGA LIMESTONE', subtitle: 'INDUSTRIAL MINERALS' }
    ]
  },
  {
    category: 'Viwanda & Huduma',
    profession: 'Mafuta & Gesi Asilia',
    emblems: ['bolt', 'flame', 'shield'],
    palettes: [
      ['#f97316', '#09090b'],
      ['#eab308', '#0f172a'],
      ['#b91c1c', '#ffffff']
    ],
    items: [
      { name: 'GESI ASILIA TZ', subtitle: 'NATURAL GAS PIPELINES' },
      { name: 'MTWARA LNG', subtitle: 'OFFSHORE PETROLEUM' },
      { name: 'MAFUTA EXPRESS', subtitle: 'FUEL STATIONS & DEPOT' },
      { name: 'SONGO ENERGY', subtitle: 'GAS-TO-POWER PLANTS' },
      { name: 'LUBRICANTS PRO', subtitle: 'SYNTHETIC ENGINE OILS' },
      { name: 'COOKGAS HOME', subtitle: 'LPG CYLINDERS & REFILL' },
      { name: 'PETROAFRIKA', subtitle: 'REFINED FUELS & FLEET' },
      { name: 'TANZAPETROL', subtitle: 'DIESEL & JET-A1 SUPPLY' },
      { name: 'UPSTREAM TECH', subtitle: 'DRILLING & WELLHEADS' },
      { name: 'BLUEFLAME GAS', subtitle: 'CLEAN INDUSTRIAL FUEL' }
    ]
  },
  {
    category: 'Viwanda & Huduma',
    profession: 'Umeme & Mafundi',
    emblems: ['bolt', 'wrench', 'helmet_build'],
    palettes: [
      ['#facc15', '#0f172a'],
      ['#38bdf8', '#18181b'],
      ['#ea580c', '#ffffff']
    ],
    items: [
      { name: 'UMEME SALAMA', subtitle: 'HOUSE & FACTORY WIRING' },
      { name: 'AC & FRIDGE TECH', subtitle: 'HVAC & COLD ROOMS' },
      { name: 'FUNDI BOMBA PRO', subtitle: '24H PLUMBING & PUMPS' },
      { name: 'GENERATOR HUB', subtitle: 'DIESEL GENSET SERVICE' },
      { name: 'HIGHVOLT ENG', subtitle: 'TRANSFORMERS & PANELS' },
      { name: 'BRIGHTSPARK TZ', subtitle: 'LED & STREET LIGHTING' },
      { name: 'AUTOMATIC GATE', subtitle: 'MOTORS & ELECTRIC REPAIR' },
      { name: 'CHILLMASTER HVAC', subtitle: 'COMMERCIAL AIRCON' },
      { name: 'SAFEWIRE CONTRACT', subtitle: 'EARTHING & LIGHTNING' },
      { name: 'BOREHOLE PUMPS', subtitle: 'SUBMERSIBLE INSTALL' }
    ]
  },
  {
    category: 'Viwanda & Huduma',
    profession: 'Uchapishaji & Matangazo (Printing)',
    emblems: ['camera', 'star', 'crown'],
    palettes: [
      ['#ec4899', '#09090b'],
      ['#06b6d4', '#0f172a'],
      ['#1e293b', '#ffffff']
    ],
    items: [
      { name: 'CHAPA HARAKA', subtitle: 'BANNERS, FLYERS & CARDS' },
      { name: 'LARGE FORMAT PRO', subtitle: 'BILLBOARDS & VEHICLE WRAP' },
      { name: 'TSHIRT PRINTING', subtitle: 'DTF, EMBROIDERY & CAPS' },
      { name: 'OFFSET PRESS TZ', subtitle: 'BOOKS, BOXES & LABELS' },
      { name: 'LASER ENGRAVE', subtitle: 'TROPHIES & NAMEPLATES' },
      { name: 'NEON SIGNAGE', subtitle: '3D ACRYLIC & LED SIGNS' },
      { name: 'PACKAGING MILL', subtitle: 'CORRUGATED CARTONS' },
      { name: 'CALENDAR & DIARY', subtitle: 'CORPORATE MERCHANDISE' },
      { name: 'SCREENPRINT HUB', subtitle: 'PROMOTIONAL BAGS' },
      { name: 'CMYK GRAPHICS', subtitle: 'PRO DIGITAL PRESS' }
    ]
  },
  {
    category: 'Viwanda & Huduma',
    profession: 'Harusi & Mapambo ya Sherehe',
    emblems: ['heart', 'crown', 'star'],
    palettes: [
      ['#f472b6', '#2e1065'],
      ['#fbbf24', '#1c1917'],
      ['#be185d', '#ffffff']
    ],
    items: [
      { name: 'HARUSI YA KIFAHARI', subtitle: 'LUXURY WEDDING PLANNERS' },
      { name: 'UKUMBI ROYAL', subtitle: 'TENTS, CHAIRS & DECOR' },
      { name: 'MAUA YA UPENDO', subtitle: 'FLORAL ARCHES & BOUQUETS' },
      { name: 'MC & BURUDANI', subtitle: 'CEREMONY COORDINATION' },
      { name: 'SEND-OFF QUEENS', subtitle: 'TRADITIONAL DECOR PRO' },
      { name: 'GALA LIGHTING', subtitle: 'CHANDELIERS & DANCEFLOOR' },
      { name: 'KADI ZA HARUSI', subtitle: 'FOIL INVITATIONS & RSVP' },
      { name: 'HONEYMOON & VOWS', subtitle: 'DESTINATION WEDDINGS' },
      { name: 'WHITE DOVE EVENTS', subtitle: 'CORPORATE GALA SETUP' },
      { name: 'SPARKLE DECOR', subtitle: 'BALLOONS & STAGE PRO' }
    ]
  },
  {
    category: 'Viwanda & Huduma',
    profession: 'Huduma za Usafi (Cleaning)',
    emblems: ['sprout', 'star', 'shield'],
    palettes: [
      ['#06b6d4', '#083344'],
      ['#10b981', '#022c22'],
      ['#0284c7', '#ffffff']
    ],
    items: [
      { name: 'USAFI KAMILI', subtitle: 'OFFICE & HOME CLEANING' },
      { name: 'DOBI EXPRESS', subtitle: 'DRY CLEANING & LAUNDRY' },
      { name: 'FUMIGATION PRO', subtitle: 'PEST & TERMITE CONTROL' },
      { name: 'SOFA & CARPET', subtitle: 'STEAM DEEP CLEANING' },
      { name: 'HIGHRISE GLASS', subtitle: 'EXTERIOR WINDOW WASH' },
      { name: 'SPARKLE MAIDS', subtitle: 'TRAINED HOUSEKEEPING' },
      { name: 'HOSPITAL SANITIZE', subtitle: 'DISINFECTION SERVICES' },
      { name: 'PUREWASH LAUNDRY', subtitle: 'HOTEL LINEN SERVICE' },
      { name: 'TANK & DRAIN', subtitle: 'WATER TANK SANITATION' },
      { name: 'POST-BUILD CLEAN', subtitle: 'AFTER CONSTRUCTION CLEAN' }
    ]
  },
  {
    category: 'Viwanda & Huduma',
    profession: 'Kulea Watoto (Daycare)',
    emblems: ['heart', 'star', 'home'],
    palettes: [
      ['#fbbf24', '#1e1b4b'],
      ['#f472b6', '#0f172a'],
      ['#0ea5e9', '#ffffff']
    ],
    items: [
      { name: 'NYUMBA YA WATOTO', subtitle: 'SAFE INFANT & TODDLER' },
      { name: 'ALEZIA DAYCARE', subtitle: 'PLAY, NAP & NUTRITIOUS' },
      { name: 'NANNY CARE PRO', subtitle: 'VETTED HOME CAREGIVERS' },
      { name: 'SUNSHINE CRECHE', subtitle: 'WORKING PARENTS CARE' },
      { name: 'BABYSTEPS HUB', subtitle: 'SENSORY PLAY & SAFETY' },
      { name: 'TINY HANDS CARE', subtitle: 'AFTER-SCHOOL HOMEWORK' },
      { name: 'MALAIKA CRECHE', subtitle: 'FIRST AID TRAINED STAFF' },
      { name: 'HAPPYCUBS CENTER', subtitle: 'INDOOR PLAYGROUND' },
      { name: 'GENTLE NEST', subtitle: 'INFANT DAY NURSERY' },
      { name: 'RAINBOW BABIES', subtitle: 'CREATIVE DAYCARE' }
    ]
  },
  {
    category: 'Viwanda & Huduma',
    profession: 'Sayansi & Maabara ya Kemikali',
    emblems: ['flask', 'code_chip', 'shield'],
    palettes: [
      ['#a855f7', '#020617'],
      ['#22d3ee', '#0f172a'],
      ['#4338ca', '#ffffff']
    ],
    items: [
      { name: 'KEMIKALI LABS', subtitle: 'WATER & FOOD TESTING' },
      { name: 'SAYANSI AFRIKA', subtitle: 'BIOTECH & RESEARCH' },
      { name: 'REAGENT SUPPLIES', subtitle: 'SCHOOL & IND LAB GEAR' },
      { name: 'ALCHEMIST TZ', subtitle: 'INDUSTRIAL DETERGENTS' },
      { name: 'PHARMA QUALITY', subtitle: 'DRUG PURITY ASSURANCE' },
      { name: 'ECO-TEST LAB', subtitle: 'EFFLUENT & AIR QUALITY' },
      { name: 'MICROBE SCREEN', subtitle: 'FOOD SAFETY AUDITS' },
      { name: 'ISOTOPE ANALYTIC', subtitle: 'SPECTROMETRY LABS' },
      { name: 'POLYMER WORKS', subtitle: 'MATERIALS ENGINEERING' },
      { name: 'BIOFUTURE LAB', subtitle: 'GENETICS & AGRI-SCIENCE' }
    ]
  }
];
