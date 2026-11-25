const CDN = 'https://cdn.jiro.build/hibana';

export const asset = {
  logo: `${CDN}/all-svg/logo-flame.svg`,
  bag: `${CDN}/all-svg/icon-bag.svg`,
  award: `${CDN}/all-svg/icon-award.svg`,
  flame: `${CDN}/all-svg/icon-flame.svg`,
  star: `${CDN}/all-svg/icon-star.svg`,
  location: `${CDN}/all-svg/icon-location.svg`,
  instagram: `${CDN}/all-svg/icon-instagram.svg`,
  email: `${CDN}/all-svg/icon-email.svg`,
  phone: `${CDN}/all-svg/icon-phone.svg`,
  heroA: `${CDN}/all-images/hero-a.webp`,
  heroB: `${CDN}/all-images/hero-b.webp`,
  tare: `${CDN}/all-images/tare-bottle.webp`,
  menu: `${CDN}/all-images/menu.webp`,
  roots1: `${CDN}/all-images/roots-1.webp`,
  roots2: `${CDN}/all-images/roots-2.webp`,
  roots3: `${CDN}/all-images/roots-3.webp`,
  stall: `${CDN}/all-images/stall.webp`,
} as const;

export const PHONE = '+61394172014';

export const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#tare', label: 'The tare' },
  { href: '#roots', label: 'Our roots' },
  { href: '#visit', label: 'Visit' },
  { href: '#press', label: 'Press' },
] as const;

export interface Dish {
  name: string;
  price: number;
  description: string;
}

export interface MenuGroup {
  id: 'grill' | 'plates' | 'drinks';
  label: string;
  items: Dish[];
}

export const MENU: MenuGroup[] = [
  {
    id: 'grill',
    label: 'From the grill',
    items: [
      { name: 'Tsukune & yolk', price: 14, description: 'Hand-chopped chicken, glossy tare, a cured yolk for dunking.' },
      { name: 'Negima', price: 11, description: 'Thigh and spring onion, salt and a squeeze of lemon.' },
      { name: 'Pork belly', price: 13, description: 'Brined for a day, crisped over the hottest coals.' },
      { name: 'Chicken hearts', price: 9, description: 'Peppery, charred, gone in two bites.' },
      { name: 'Wagyu rump', price: 22, description: 'Pink in the middle, wasabi and smoked salt.' },
      { name: 'King oyster', price: 10, description: 'Thick mushroom, white miso butter, shiso.' },
      { name: 'Ocean trout', price: 16, description: 'Skin blistered, salt and lemon only.' },
      { name: 'Corn & butter', price: 8, description: 'Sweetcorn ribs brushed with soy butter.' },
    ],
  },
  {
    id: 'plates',
    label: 'Small plates',
    items: [
      { name: 'Smashed cucumber', price: 9, description: 'Sesame, chilli oil, rice vinegar.' },
      { name: 'Karaage', price: 15, description: 'Twice-fried thigh, kewpie, lemon.' },
      { name: 'Yaki onigiri', price: 8, description: 'Grilled rice ball brushed with tare.' },
      { name: 'Pickles', price: 6, description: 'House pickles, changes weekly.' },
    ],
  },
  {
    id: 'drinks',
    label: 'To drink',
    items: [
      { name: 'Highball', price: 14, description: 'Japanese whisky, soda, lemon peel.' },
      { name: 'Draft lager', price: 10, description: 'Ice-cold, in a frosted glass.' },
      { name: 'Sake flight', price: 22, description: 'Three pours, from crisp to cloudy.' },
      { name: 'Yuzu soda', price: 7, description: 'House-made, not too sweet.' },
    ],
  },
];

export const PRESS = [
  { name: 'The Long Table', style: 'pl-anton-lg' },
  { name: 'Broth Weekly', style: 'pl-sans' },
  { name: 'Night Plate', style: 'pl-anton-sm' },
  { name: 'Salt/Ash', style: 'pl-anton-lg' },
  { name: 'Gourmand', style: 'pl-sans' },
  { name: 'Fitzroy Local', style: 'pl-anton-sm' },
] as const;

export const STATS = [
  { to: 2014, from: 1990, suffix: '', label: 'first night on Gertrude St' },
  { to: 40, from: 0, suffix: 'k', label: 'skewers grilled a month' },
  { to: 1, from: 0, suffix: '', label: 'pot of tare, never emptied' },
] as const;

export const POLAROIDS = [
  { src: asset.roots1, alt: 'Friends grilling skewers at a backyard barbecue', caption: 'Collingwood, 2011', x: 10, y: 11, rotate: -5, w: 300, h: 230 },
  { src: asset.roots2, alt: 'Mae turning skewers over the coals', caption: 'Mae on the coals', x: 324, y: 10, rotate: 4, w: 260, h: 300 },
  { src: asset.roots3, alt: 'A paper bag of skewers handed over the counter', caption: 'Skewers to go', x: 10, y: 300, rotate: 2, w: 300, h: 220 },
] as const;

export const REVIEWS = [
  { quote: 'Best skewers this side of the river. The tare should honestly be illegal.', author: 'Dani Okafor · Collingwood' },
  { quote: 'We came for one round and stayed for six. The chicken hearts converted my dad.', author: 'Lou Brennan · Northcote' },
  { quote: 'Bought two bottles of tare on the way out. My backyard barbecue is ruined for anything else.', author: 'Sam Whitfield · Brunswick' },
] as const;

/** Days use Date#getDay(): 0 = Sunday … 6 = Saturday. */
export const HOURS = [
  { label: 'Tue – Thu', time: '5pm – 11pm', days: [2, 3, 4] },
  { label: 'Fri – Sat', time: '5pm – midnight', days: [5, 6] },
  { label: 'Sunday', time: 'Noon – 9pm', days: [0] },
  { label: 'Monday', time: 'Coals resting', days: [1] },
] as const;

export const FOOTER_COLUMNS = [
  { title: 'Eat', links: [['Skewer list', '#menu'], ['Drinks', '#menu'], ['Book a table', '#visit'], ['Gift cards', '#']] },
  { title: 'Shop', links: [['The tare', '#tare'], ['Merch', '#'], ['Stockists', '#']] },
  { title: 'Hello', links: [['Our roots', '#roots'], ['Press', '#press'], ['Jobs', 'mailto:hello@hibana.com.au?subject=Jobs'], ['Contact', `tel:${PHONE}`]] },
] as const;
