/**
 * Full menu transcribed from the printed carta on loscompadres.cl (14 pages).
 * Prices in CLP. If the carta changes, this is the only file to update.
 */

export interface PriceOption {
  label: string;
  price: number;
}

export interface MenuItem {
  name: string;
  description?: string;
  /** Single price, or several sizes / variants. */
  price: number | readonly PriceOption[];
  tag?: string;
}

export interface MenuSection {
  title: string;
  note?: string;
  items: readonly MenuItem[];
}

export type World = 'sushi' | 'sanguche' | 'todos';

export interface MenuCategory {
  id: string;
  label: string;
  world: World;
  kicker: string;
  sections: readonly MenuSection[];
}

const roll = (name: string, description: string, price: number): MenuItem => ({ name, description, price });

const HAMBURGUESA: readonly PriceOption[] = [
  { label: 'Simple', price: 8990 },
  { label: 'Doble', price: 10990 },
];
const SANDWICH: readonly PriceOption[] = [
  { label: 'Churrasco', price: 8990 },
  { label: 'Mechada', price: 10990 },
];

export const MENU: readonly MenuCategory[] = [
  {
    id: 'entradas',
    label: 'Entradas',
    world: 'todos',
    kicker: 'Para comenzar',
    sections: [
      {
        title: 'Ceviches y para picar',
        items: [
          { name: 'Ceviche Compadre 1', description: 'Camarón, pulpo, salmón, pimentón, cebolla morada, cilantro y limón, en base de la casa.', price: 8990 },
          { name: 'Ceviche Compadre 2', description: 'Reineta, leche de tigre, papa camote, canchita, choclo peruano, cebolla morada y cilantro.', price: 8990 },
          { name: 'Tabla Mix', description: '5 empanadas de queso, 10 aros de cebolla y 4 bastones de pollo con papas fritas.', price: 9990, tag: 'Para compartir' },
          { name: 'Alitas de pollo', description: 'Crujientes, con salsa BBQ o con cebolla criolla y bañadas en salsa acevichada.', price: [{ label: '6 u.', price: 7990 }, { label: '12 u.', price: 15990 }] },
          { name: 'Sakanatataki', description: 'Mix de salmón, palta, cebollín y toques de aceite de sésamo.', price: 7990 },
          { name: 'Nuggets', price: [{ label: '8 u.', price: 4990 }, { label: '12 u.', price: 6990 }] },
          { name: 'Aros de cebolla', price: [{ label: '8 u.', price: 4990 }, { label: '16 u.', price: 6990 }] },
          { name: 'Empanadas', description: 'Rellenas con queso, acompañadas con salsa BBQ.', price: [{ label: '5 u.', price: 4500 }, { label: '10 u.', price: 6990 }] },
          { name: 'Burokanis', description: 'Bolitas apanadas rellenas con carne de jaiba, queso crema y cebollín. 5 u.', price: 4500 },
          { name: 'Bacon Ball', description: 'Bolitas apanadas rellenas con tocino, queso crema y cebollín. 5 u.', price: 3990 },
          { name: 'Eby Furay', description: 'Camarones apanados. 5 u.', price: 4500 },
          { name: 'Gyozas', description: 'Rellenas de pollo, camarón o cerdo. 5 u.', price: 3690 },
          { name: 'Bastones de pollo', description: '5 u.', price: 4990 },
          { name: 'Frescos cortes de pulpo', price: [{ label: '5 cortes', price: 5990 }, { label: '10 cortes', price: 8990 }] },
          { name: 'Frescos cortes de salmón', price: [{ label: '5 cortes', price: 5990 }, { label: '10 cortes', price: 8990 }] },
        ],
      },
      {
        title: 'Wantán',
        items: [
          { name: 'Dragón', description: 'Masa de wantán rellena de queso crema, cebollín y camarón.', price: 4990 },
          { name: 'Buda', description: 'Masa de wantán rellena de queso crema, cebollín y queso mozzarella.', price: 4990 },
          { name: 'Samurái', description: 'Masa de wantán rellena de queso crema, cebollín y pollo teriyaki.', price: 4990 },
        ],
      },
    ],
  },
  {
    id: 'rolls',
    label: 'Rolls',
    world: 'sushi',
    kicker: 'Elige tu roll y tu envoltura',
    sections: [
      {
        title: 'Rolls Americanos',
        note: 'Todos a $7.090 · elige tu envoltura',
        items: [
          roll('Tori', 'Pollo, queso crema y palta.', 7090),
          roll('Teri', 'Pollo, queso crema y cebollín.', 7090),
          roll('Shiitake', 'Pollo, queso crema y champiñón.', 7090),
          roll('Futo Maki', 'Pollo apanado, queso crema y palta.', 7090),
          roll('Niku', 'Carne, queso crema y cebollín.', 7090),
          roll('Teka', 'Carne, queso crema y champiñón.', 7090),
          roll('Ebi Furay', 'Camarón apanado, queso crema y palta.', 7090),
          roll('Ebi Maki', 'Camarón, queso crema y palta.', 7090),
          roll('Ebi Kani', 'Camarón, queso crema y kanikama.', 7090),
          roll('Edu', 'Salmón, queso crema y camarón.', 7090),
          roll('Tokio', 'Espárrago, queso crema y palmito.', 7090),
          roll('Toriyaki', 'Pollo teriyaki, queso crema y cebollín.', 7090),
          roll('Vegan', 'Palmito, cebollín, champiñón y pimentón.', 7090),
        ],
      },
      {
        title: 'Rolls Nikkei',
        note: 'Sorpréndete con la fusión',
        items: [
          roll('Flamel Cheese', 'Salmón, palta y cebollín. Envoltura de queso flameado con toques de salsa.', 7990),
          roll('Inka Rolls', 'Pollo apanado, queso crema, champiñón y cebolla morada. Envoltura de panko y topping de huancaína.', 7990),
          roll('Rolls Acevichado', 'Camarón apanado, queso crema y ciboulette. Envoltura de arroz, topping acevichado y ciboulette.', 9990),
          roll('Criollo Rolls', 'Pollo apanado, queso crema y palta. Envoltura de palta, cebolla criolla y salsa acevichada.', 10990),
          roll('Gratín Salmón', 'Camarón apanado, queso crema y palta. Envoltura de salmón flameado y topping de unagi.', 7990),
          roll('Rainbow Rolls', 'Camarón, queso crema y palta. Envoltura mixta de salmón, queso crema y topping de mango maracuyá.', 7490),
          roll('Tropical Rolls', 'Camarón apanado, queso crema y palta. Envoltura de queso crema flameada y topping de maracuyá.', 7490),
          roll('Abocado Rolls', 'Salmón, queso crema y palta. Envoltura de palta y topping de mango.', 7490),
          roll('Fusion Rolls', 'Pollo apanado, queso crema y palta. Envoltura de salmón en panko con topping de papa camote al hilo y salsa oriental.', 7990),
          roll('Sake Rolls', 'Salmón, queso crema y cebollín. Envoltura de queso flameado con spicy y salsa unagi.', 8990),
          roll('Salmón Criollo', 'Salmón apanado bañado en salsa acevichada y cebolla en pluma.', 12990),
          roll('Flama Rolls', 'Pollo apanado, queso crema y cebollín. Envoltura en panko con topping de salsa tari flameada.', 8990),
          roll('Ebi Cheese', 'Camarón, queso crema y queso mozzarella. Envoltura en panko con salsa unagui.', 7490),
          roll('Ebi Gratinado', 'Camarón apanado, queso crema y cebollín. Envoltura de queso flameado con salsa acevichada.', 7990),
          roll('Veggie Almendrado', 'Pimentón, cebolla morada, champiñón, cebollín y almendra.', 7990),
        ],
      },
      {
        title: 'Rolls Especiales · sin arroz',
        note: 'Todos a $7.890 · elige tu envoltura',
        items: [
          roll('Especial 1', 'Camarón apanado, queso crema, cebollín y palta.', 7890),
          roll('Especial 2', 'Pasta dinamita, queso crema, cebollín y champiñón.', 7890),
          roll('Especial 3', 'Salmón, queso crema, camarón y ciboulette.', 7890),
          roll('Especial 4', 'Pollo apanado, queso crema, ciboulette y palta.', 7890),
          roll('Especial 5', 'Pulpo, queso crema, pollo y ciboulette.', 7890),
        ],
      },
    ],
  },
  {
    id: 'fusion',
    label: 'Sushiburger & Hand Rolls',
    world: 'sushi',
    kicker: 'Lo más compadre del sushi',
    sections: [
      {
        title: 'Sushiburger',
        note: 'Envueltas en panko',
        items: [
          roll('Sushi Burger Tonkatzu', 'Pollo apanado, queso crema y palta. Con salsa de soya y teriyaki.', 8990),
          roll('Sushi Burger Dinamita', 'Pasta dinamita, queso crema y palta. Con toques de salsa de soya.', 8990),
          roll('Sushi Burger Marina', 'Camarón cocido, queso crema y cebolla acevichada. Con toques de acevichada.', 8990),
          roll('Sushi Burger Vegan', 'Palta, pimentón, palmitos y champiñón. Con soya o teriyaki.', 8990),
          { name: 'Sushi Burger Americana', description: 'Pollo, carne, queso crema y palta. Con salsa de soya y teriyaki.', price: 9990, tag: 'Premium' },
          { name: 'Sushi Burger Los Compadres', description: 'Camarón apanado, salmón, queso crema y cebollín. Con toques de salsa unagui.', price: 9990, tag: 'Premium' },
        ],
      },
      {
        title: 'Sushipletos',
        items: [
          roll('Acevichado', 'Camarón apanado, queso crema y topping de fusión acevichada y palta. Envuelto en panko.', 8990),
          roll('Tori', 'Pollo, queso crema, cebollín y palta. Envuelto en panko, con salsa acevichada.', 7990),
          roll('Tar Tar', 'Salmón tar tar, queso crema y palta. Envuelto en panko con soya o teriyaki.', 8990),
          { name: 'Los Compadres', description: 'Camarón apanado, salmón, queso crema y palta. Envuelto en panko con soya o teriyaki.', price: 9890, tag: 'De la casa' },
        ],
      },
      {
        title: 'Hand Rolls',
        note: 'Todos a $3.990',
        items: [
          roll('Hand Roll Tori', 'Pollo, queso crema y cebollín.', 3990),
          roll('Hand Roll Niku', 'Carne, queso crema y cebollín.', 3990),
          roll('Hand Roll Ebi', 'Camarón, queso crema y cebollín.', 3990),
          roll('Hand Roll Veg. Shiitake', 'Champiñón, pimentón y cebollín.', 3990),
        ],
      },
    ],
  },
  {
    id: 'sanguches',
    label: 'Hamburguesas & Sándwich',
    world: 'sanguche',
    kicker: 'Todas con papas fritas',
    sections: [
      {
        title: 'Hamburguesas',
        note: 'Simple $8.990 · Doble $10.990',
        items: [
          { name: 'Clásico', description: 'Tomate, queso cheddar, lechuga y mayonesa.', price: HAMBURGUESA },
          { name: 'Italiano', description: 'Tomate, palta y mayonesa.', price: HAMBURGUESA },
          { name: 'Acampao', description: 'Tocino, queso cheddar, tomate y aceituna.', price: HAMBURGUESA },
          { name: 'Tradicional', description: 'Queso cheddar, cebolla, pepinillo, tocino y ketchup.', price: HAMBURGUESA },
          { name: 'Griego', description: 'Cebolla a la plancha, champiñón, queso fundido y tocino.', price: HAMBURGUESA },
          { name: 'Espartana', description: 'Queso cheddar, tomate, lechuga, tocino y cebolla.', price: HAMBURGUESA },
          { name: 'Troyana', description: 'Queso cheddar, cebolla a la plancha, huevo y tocino.', price: HAMBURGUESA },
          { name: 'Gladiadora', description: 'Queso cheddar, salsa BBQ, aros de cebolla y tocino.', price: HAMBURGUESA },
          { name: 'Apolo', description: 'Queso cheddar, tomate, champiñón y tocino.', price: HAMBURGUESA },
          { name: 'Bacón', description: 'Queso cheddar, tocino, pimentón y cebolla a la plancha.', price: HAMBURGUESA },
          { name: 'Atenea', description: 'Queso gauda, cream cheese, champiñones, palta flameada y lechuga.', price: HAMBURGUESA },
        ],
      },
      {
        title: 'Sándwich',
        note: 'Pan ciabatta o pan frica · Churrasco $8.990 · Mechada $10.990',
        items: [
          { name: 'Palestino', description: 'Queso cheddar, cebolla morada, pepinillo y salsa BBQ.', price: SANDWICH },
          { name: 'Gladiador', description: 'Queso cheddar, aros de cebolla, tocino y salsa BBQ.', price: SANDWICH },
          { name: 'Barros Luco', description: 'Queso fundido.', price: SANDWICH },
          { name: 'Italiano', description: 'Palta, tomate y mayonesa.', price: SANDWICH },
          { name: 'Español', description: 'Lechuga, tomate, mayonesa y cebolla.', price: SANDWICH },
          { name: 'Suizo', description: 'Tomate, queso fundido y aceitunas.', price: SANDWICH },
          { name: 'Brasileño', description: 'Palta y queso fundido.', price: SANDWICH },
          { name: 'Chacarero', description: 'Porotos verdes, tomate, ají y mayonesa.', price: SANDWICH },
          { name: 'Griego', description: 'Cebolla, queso fundido, tocino y champiñón.', price: SANDWICH },
          { name: 'Romano', description: 'Cebolla a la plancha, queso, tocino y pimentón.', price: SANDWICH },
        ],
      },
      {
        title: 'Chicken Bread',
        note: 'Pechuga de pollo apanada',
        items: [
          { name: 'Chicken Italiana', description: 'Tomate, palta y mayonesa.', price: 6890 },
          { name: 'Chicken Bacon', description: 'Queso gauda, cebolla morada, tocino y salsa BBQ.', price: 7890 },
          { name: 'Chicken Classic', description: 'Tomate, lechuga, pepinillo y mayonesa.', price: 5990 },
        ],
      },
      {
        title: 'Veg Burger',
        note: 'Burger de soya',
        items: [
          { name: 'Veg Italiana', description: 'Proteína de soya, palta, tomate y mayonesa.', price: 6890 },
          { name: 'Veg Tradicional', description: 'Proteína de soya, queso cheddar, cebolla, pepinillos y ketchup.', price: 6890 },
          { name: 'Veg Griega', description: 'Proteína de soya, cebolla a la plancha, queso gauda y champiñón.', price: 6890 },
        ],
      },
    ],
  },
  {
    id: 'platos',
    label: 'Platos & Papas',
    world: 'todos',
    kicker: 'Chorrillana, lomo a lo pobre y…',
    sections: [
      {
        title: 'Para compartir',
        items: [
          { name: 'Lomo a lo pobre', description: 'Lomo vetado con papas fritas, cebolla a la plancha y huevos. O con ensalada.', price: 12490 },
          { name: 'Salmón', description: 'A la plancha o apanado, con papas fritas o ensalada.', price: 12490 },
          { name: 'Chorrillana Tradicional', description: 'Papas fritas, cebolla a la plancha, carne, longaniza y huevo.', price: 15990, tag: 'Para compartir' },
          { name: 'Chorrillana Mixta', description: 'Papas fritas, carne, pollo, longaniza, huevo y cebolla a la plancha.', price: 15990 },
          { name: 'Chorrillana de Mechada', description: 'Papas fritas, carne mechada, longaniza, huevo y queso gauda.', price: 15990 },
          { name: 'Papas Tex', description: 'Papas fritas, carne, tomate, cebolla morada, ciboulette y salsa cheddar.', price: 13990 },
          { name: 'Papas Crunch', description: 'Papas fritas, tocino, longaniza, ciboulette y salsa cheddar.', price: 8990 },
          { name: 'Papas Champiñón', description: 'Papas fritas, champiñón y queso gauda.', price: 8990 },
          { name: 'Bowl de papas', description: 'Queso cheddar con tocino, mechada queso o queso champiñón.', price: 6990 },
          { name: 'Papas fritas', price: [{ label: 'Mediana', price: 4990 }, { label: 'Grande', price: 6490 }] },
        ],
      },
      {
        title: 'Ensaladas',
        items: [
          { name: 'Ensalada Eby', description: 'Camarones sobre lechuga, espárragos, palmitos y palta con aderezo acevichado.', price: 11990 },
          { name: 'Ensalada de Salmón', description: 'Salmón a la plancha o apanado sobre lechuga, aceitunas, cebolla morada, palta y tomate.', price: 12490 },
          { name: 'Ensalada Los Compadres', description: 'Pechuga de pollo apanado sobre lechuga, aceituna, cebolla morada, palta y tomate con salsa acevichada.', price: 7990 },
          { name: 'Ensalada César', description: 'Pechuga de pollo a la plancha, lechuga, tomate, queso parmesano y crutones con aderezo césar.', price: 7990 },
          { name: 'Ensalada Chilena de la casa', description: 'Tomate y cebolla morada.', price: 1500 },
        ],
      },
      {
        title: 'Gohan',
        note: 'Base de arroz o lechuga',
        items: [
          { name: 'Gohan 1', description: 'Pollo, queso crema, palta, espárrago y palmito.', price: 6990 },
          { name: 'Gohan 2', description: 'Salmón, queso crema, palta, champiñón y ciboulette.', price: 8990 },
          { name: 'Gohan 3', description: 'Pollo teriyaki, queso crema y palta.', price: 7990 },
          { name: 'Gohan 4', description: 'Salmón apanado, palta, cebolla criolla y salsa acevichada.', price: 8990 },
          { name: 'Gohan 5', description: 'Camarón apanado, palta, cebolla criolla y salsa acevichada.', price: 7990 },
        ],
      },
    ],
  },
  {
    id: 'kids',
    label: 'Menú Kids',
    world: 'todos',
    kicker: 'Hasta los 11 años · con jugo y helado',
    sections: [
      {
        title: 'Menú Kids',
        note: 'Helado solo para consumo en el restaurante',
        items: [
          { name: 'Papas fritas con nuggets', description: '4 nuggets, caja de jugo y una porción de helado.', price: 6000 },
          { name: 'Mini sushi burger', description: 'Pollo o carne con queso crema y palta en panko. Caja de jugo y helado.', price: 6990 },
          { name: 'Salchipapa', description: 'Papas con salchichas doradas, caja de jugo y helado.', price: 5500 },
          { name: 'Papas fritas con bastón de pollo', description: 'Con caja de jugo y una porción de helado.', price: 6500 },
          { name: 'Hamburguesa con papas fritas', description: 'Pan frica, hamburguesa de vacuno y queso cheddar. Caja de jugo y helado.', price: 6990 },
        ],
      },
    ],
  },
  {
    id: 'bebestibles',
    label: 'Bebestibles & Postres',
    world: 'todos',
    kicker: 'Para cerrar como compadre',
    sections: [
      {
        title: 'Bebestibles',
        items: [
          { name: 'Bebida en lata', description: 'Coca Cola Normal, Coca Cola Zero, Fanta, Sprite.', price: 2000 },
          { name: 'Jugos naturales', description: 'Frambuesa, frutilla, piña, chirimoya, durazno, mango y maracuyá.', price: 3000 },
          { name: 'Agua mineral', description: 'Con o sin gas.', price: 1500 },
          { name: 'Limonada tradicional', price: 2500 },
          { name: 'Té o café', price: 1500 },
          { name: 'Capuchino', price: 2990 },
          { name: 'Café americano', price: 2990 },
          { name: 'Café expreso intenso', price: 2000 },
          { name: 'Agua de hierbas', price: 1800 },
          { name: 'Cerveza sin alcohol', price: 2990 },
        ],
      },
      {
        title: 'Postres',
        items: [
          { name: 'Helado artesanal', price: [{ label: '1 bolita', price: 1990 }, { label: '2 bolitas', price: 2790 }, { label: '3 bolitas', price: 3490 }] },
          { name: 'Copón de helado', description: '6 sabores de helado, crema, tu salsa favorita, moneditas de chocolate y frutos rojos o brownie.', price: 8990 },
          { name: 'Trozo de torta', price: 4500 },
          { name: 'Trozo pie de limón', price: 3500 },
          { name: 'Trozo cheesecake', price: 3990 },
          { name: 'Café helado', price: 3500 },
        ],
      },
    ],
  },
];

/* ---------- Roll builder data (pages 2 & 4 of the carta) ---------- */

export const ROLL_BASES = [
  { id: 'americano', label: 'Roll Americano', detail: 'Con arroz', price: 7090, fillings: MENU[1]?.sections[0]?.items ?? [] },
  { id: 'especial', label: 'Roll Especial', detail: 'Sin arroz', price: 7890, fillings: MENU[1]?.sections[2]?.items ?? [] },
] as const;

export const FREE_WRAPS = ['Panko frito', 'Sésamo', 'Ciboulette', 'Palta', 'Queso crema', 'Queso sésamo', 'Queso merkén', 'Queso ciboulette'] as const;

export const SPECIAL_WRAPS: readonly PriceOption[] = [
  { label: 'Salmón', price: 2990 },
  { label: 'Palta frita', price: 1490 },
  { label: 'Queso frito', price: 1090 },
  { label: 'Queso flameado', price: 1580 },
  { label: 'Salmón flameado', price: 3490 },
  { label: 'Mixta flameada (queso y salmón)', price: 3990 },
];

export const EXTRA_SAUCES: readonly PriceOption[] = [
  { label: 'Acevichada', price: 1990 },
  { label: 'Tari', price: 1490 },
  { label: 'Huancaína', price: 990 },
  { label: 'Spicy', price: 990 },
  { label: 'Mango', price: 990 },
  { label: 'Maracuyá', price: 990 },
  { label: 'Mango y maracuyá', price: 990 },
  { label: 'Oriental', price: 990 },
  { label: 'Soya', price: 990 },
  { label: 'Teriyaki', price: 990 },
];

export function countMenuItems(): number {
  return MENU.reduce((n, c) => n + c.sections.reduce((m, s) => m + s.items.length, 0), 0);
}
