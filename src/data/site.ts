/**
 * Business details. Everything that is `null` was NOT found on loscompadres.cl
 * (the site only publishes the menu). Fill these in with the client before launch —
 * the UI hides each block until its value exists, so nothing fake is ever shown.
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  /** International format without "+" or spaces, e.g. "56912345678". */
  whatsapp: string | null;
  phone: string | null;
  address: string | null;
  mapsUrl: string | null;
  instagram: string | null;
  hours: readonly { days: string; time: string }[] | null;
}

export const SITE: SiteConfig = {
  name: 'Los Compadres',
  tagline: 'Sushitería & Sandwichería',
  whatsapp: null,
  phone: null,
  address: null,
  mapsUrl: null,
  instagram: null,
  hours: null,
};

const ORIGIN = 'https://www.loscompadres.cl/assets/menu';

/** The 14 printed menu pages published on loscompadres.cl. */
export const CARTA_PAGES = Array.from({ length: 14 }, (_, i) => `${ORIGIN}/page-${i + 1}.webp`);

/** Native size of every carta page, used to cut food photos out of them. */
export const PAGE_SIZE = { w: 1652, h: 2339 } as const;

export interface Crop {
  page: number;
  /** Box in % of the page: left, top, width, height. */
  x: number;
  y: number;
  w: number;
  h: number;
  alt: string;
}

/** Food photography cropped from the carta pages (no extra assets needed). */
export const CROPS = {
  logo: { page: 1, x: 3, y: 2.5, w: 26, h: 11, alt: 'Logo Los Compadres, Sushitería y Sandwichería' },
  sushiPlatter: { page: 1, x: 38, y: 0, w: 62, h: 16.5, alt: 'Tabla de rolls variados' },
  sushiBottom: { page: 13, x: 0, y: 86, w: 100, h: 14, alt: 'Rolls fritos y envueltos en salmón' },
  avocadoRoll: { page: 3, x: 60, y: 76.5, w: 36, h: 23.5, alt: 'Roll envuelto en palta con topping' },
  sushiburger: { page: 5, x: 64, y: 66, w: 36, h: 17, alt: 'Sushi burger apanada' },
  handroll: { page: 6, x: 66, y: 72, w: 34, h: 18, alt: 'Hand roll apanado' },
  burger: { page: 8, x: 48, y: 52, w: 52, h: 42, alt: 'Hamburguesa con tocino y tomate' },
  sandwich: { page: 10, x: 50, y: 61, w: 50, h: 22, alt: 'Sándwich de churrasco en pan frica' },
  chorrillana: { page: 11, x: 36, y: 88.6, w: 56, h: 11.4, alt: 'Chorrillana con huevo frito' },
  salad: { page: 7, x: 52, y: 34, w: 48, h: 20, alt: 'Ensalada con camarones' },
} satisfies Record<string, Crop>;
