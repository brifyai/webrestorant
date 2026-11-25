/** Promotions, pages 13–14 of the carta on loscompadres.cl. */

export interface Promo {
  number: number;
  world: 'sushi' | 'sanguche';
  headline: string;
  lines: readonly string[];
  price: number;
  /** For promos sold in several sizes (Promoción 9). */
  variants?: readonly { label: string; price: number }[];
}

export const PROMOS: readonly Promo[] = [
  { number: 1, world: 'sushi', headline: '40 piezas todos fritos', lines: ['Niku', 'Tori', 'Ebi Furay', 'Ebi Maki'], price: 23960 },
  { number: 2, world: 'sushi', headline: '20 piezas', lines: ['5 Tori en sésamo', '5 Tori en ciboulette', '10 Niku en palta'], price: 11990 },
  { number: 3, world: 'sushi', headline: '30 piezas a libre elección', lines: ['Rollos americanos', '+ 1 bebida 1½ L'], price: 19990 },
  { number: 4, world: 'sushi', headline: '40 piezas', lines: ['10 Toriyaki en panko', '5 Tori en sésamo', '5 Tori en ciboulette', '10 Tokio en queso', '10 Futo Maki en panko'], price: 23990 },
  { number: 5, world: 'sushi', headline: '50 piezas a libre elección', lines: ['Rollos americanos', '+ 1 bebida 1½ L'], price: 32500 },
  { number: 6, world: 'sushi', headline: '80 piezas a libre elección', lines: ['Rollos americanos', '+ 1 bebida 1½ L'], price: 52000 },
  { number: 7, world: 'sushi', headline: '43 piezas', lines: ['Elige las envolturas', 'Niku · Tori · Eby Furay', 'Hosomaki palta', 'Gyozas (pollo, camarón o cerdo)'], price: 25000 },
  { number: 8, world: 'sushi', headline: '40 piezas Nikkei', lines: ['Elige 4 rolls Nikkei + bebida', 'Fusión · Flamel Cheese · Gratín Salmón', 'Tropical · Rainbow · Sake · Abocado · Inka'], price: 34990 },
  {
    number: 9,
    world: 'sushi',
    headline: 'Hand rolls libre elección',
    lines: ['Arma tu combo de hand rolls'],
    price: 7000,
    variants: [
      { label: '2 hand rolls', price: 7000 },
      { label: '3 hand rolls', price: 10000 },
      { label: '4 hand rolls', price: 13000 },
    ],
  },
  { number: 10, world: 'sanguche', headline: '2 hamburguesas o churrascos', lines: ['Libre elección', 'Bebida 1½ L + papas fritas'], price: 19990 },
  { number: 11, world: 'sanguche', headline: '4 hamburguesas o churrascos', lines: ['Libre elección', 'Bebida 1½ L + papas fritas'], price: 34990 },
];
