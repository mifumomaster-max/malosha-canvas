import musicConcertImg from '../assets/images/poster_music_concert_1794504649640.jpg';
import businessSummitImg from '../assets/images/poster_business_summit_1794504649292.jpg';
import foodBbqImg from '../assets/images/poster_food_bbq_1794504648737.jpg';
import fitnessSportsImg from '../assets/images/poster_fitness_sports_1794504648859.jpg';

const svgBackdrop = (svgBody: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">${svgBody}</svg>`
  )}`;

const goldSpotlightBackdrop = svgBackdrop(
  `<defs><radialGradient id="g1" cx="50%" cy="32%" r="65%"><stop offset="0%" stop-color="#f59e0b" stop-opacity="0.72"/><stop offset="55%" stop-color="#78350f" stop-opacity="0.35"/><stop offset="100%" stop-color="#09090b"/></radialGradient></defs><rect width="800" height="1000" fill="#09090b"/><rect width="800" height="1000" fill="url(#g1)"/><circle cx="180" cy="210" r="90" fill="#fde68a" opacity="0.1"/><circle cx="640" cy="760" r="140" fill="#fbbf24" opacity="0.08"/>`
);

const neonCyberBackdrop = svgBackdrop(
  `<defs><linearGradient id="n1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4c1d95"/><stop offset="50%" stop-color="#0f172a"/><stop offset="100%" stop-color="#06b6d4" stop-opacity="0.5"/></linearGradient></defs><rect width="800" height="1000" fill="#020617"/><rect width="800" height="1000" fill="url(#n1)"/><path d="M0 720 L800 540 L800 1000 L0 1000 Z" fill="#22d3ee" opacity="0.14"/><circle cx="620" cy="240" r="180" fill="#ec4899" opacity="0.22"/>`
);

const studioCrimsonBackdrop = svgBackdrop(
  `<defs><radialGradient id="c1" cx="50%" cy="45%" r="60%"><stop offset="0%" stop-color="#dc2626" stop-opacity="0.65"/><stop offset="100%" stop-color="#180404"/></radialGradient></defs><rect width="800" height="1000" fill="#180404"/><rect width="800" height="1000" fill="url(#c1)"/><polygon points="0,0 800,0 800,260 0,420" fill="#ffffff" opacity="0.04"/>`
);

const emeraldWaveBackdrop = svgBackdrop(
  `<defs><linearGradient id="e1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#065f46"/><stop offset="100%" stop-color="#022c22"/></linearGradient></defs><rect width="800" height="1000" fill="url(#e1)"/><path d="M0 640 Q260 520 520 660 T800 590 L800 1000 L0 1000 Z" fill="#10b981" opacity="0.22"/><circle cx="150" cy="220" r="130" fill="#34d399" opacity="0.12"/>`
);

export const STOCK_POSTER_IMAGES = {
  musicConcert: musicConcertImg,
  businessSummit: businessSummitImg,
  foodBbq: foodBbqImg,
  fitnessSports: fitnessSportsImg
};

export const STOCK_PHOTO_ITEMS = [
  {
    title: 'Muziki & Tamasha',
    url: musicConcertImg
  },
  {
    title: 'Kongamano & Biashara',
    url: businessSummitImg
  },
  {
    title: 'Nyama Choma & Misosi',
    url: foodBbqImg
  },
  {
    title: 'Riadha & Michezo',
    url: fitnessSportsImg
  },
  {
    title: 'Mwanga wa Dhahabu',
    url: goldSpotlightBackdrop
  },
  {
    title: 'Neon Studio Blur',
    url: neonCyberBackdrop
  },
  {
    title: 'Studio Nyekundu',
    url: studioCrimsonBackdrop
  },
  {
    title: 'Mawimbi ya Zumaridi',
    url: emeraldWaveBackdrop
  }
];
