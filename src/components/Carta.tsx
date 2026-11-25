import { useMemo, useState } from 'react';
import type { Mode } from '../App';
import { MENU, countMenuItems, type MenuItem } from '../data/menu';
import { clp, slug } from '../lib/format';
import { useOrder } from '../order';
import { Reveal, SectionTitle } from './ui';
import { Fern } from './Fern';

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function Carta({ mode }: { mode: Mode }) {
  const [active, setActive] = useState<string>('todo');
  const [query, setQuery] = useState('');

  const q = normalize(query.trim());

  const categories = useMemo(() => {
    const visible = active === 'todo' ? MENU : MENU.filter((c) => c.id === active);
    if (!q) return visible;
    return visible
      .map((c) => ({
        ...c,
        sections: c.sections
          .map((s) => ({
            ...s,
            items: s.items.filter((i) => normalize(`${i.name} ${i.description ?? ''}`).includes(q)),
          }))
          .filter((s) => s.items.length > 0),
      }))
      .filter((c) => c.sections.length > 0);
  }, [active, q]);

  const sorted = useMemo(
    // the world picked in the hero goes first, the rest keep carta order
    () => [...categories].sort((a, b) => Number(b.world === mode) - Number(a.world === mode)),
    [categories, mode],
  );

  return (
    <section className="carta" id="carta">
      <Fern className="fern-tr" flip />
      <div className="wrap">
        <SectionTitle index="01" label="La carta" script="Todo lo que sale de la cocina" kicker={`${countMenuItems()} productos, con precio, listos para pedir`} />

        <Reveal className="carta-tools">
          <div className="chips" role="tablist" aria-label="Categorías">
            <button type="button" role="tab" aria-selected={active === 'todo'} onClick={() => setActive('todo')}>
              Todo
            </button>
            {MENU.map((c) => (
              <button key={c.id} type="button" role="tab" aria-selected={active === c.id} onClick={() => setActive(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <label className="search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Busca: salmón, palta, mechada…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar en la carta"
            />
          </label>
        </Reveal>

        {sorted.length === 0 && (
          <p className="empty">
            No encontramos “{query}” en la carta. Prueba con otro ingrediente, compadre.
          </p>
        )}

        {sorted.map((cat) => (
          <div className="carta-cat" key={cat.id} id={`cat-${cat.id}`}>
            <div className="cat-head">
              <h3 className="cat-title">{cat.label}</h3>
              <p className="cat-kicker">{cat.kicker}</p>
            </div>
            {cat.sections.map((section) => (
              <div className="carta-section" key={section.title}>
                <div className="sec-head">
                  <h4>{section.title}</h4>
                  {section.note && <span>{section.note}</span>}
                </div>
                <div className="items">
                  {section.items.map((item) => (
                    <ItemRow key={`${section.title}-${item.name}`} item={item} section={section.title} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ItemRow({ item, section }: { item: MenuItem; section: string }) {
  const { add } = useOrder();
  const options = typeof item.price === 'number' ? [{ label: '', price: item.price }] : item.price;
  const base = slug(`${section}-${item.name}`);

  return (
    <article className="item">
      <div className="item-text">
        <h5>
          {item.name}
          {item.tag && <em>{item.tag}</em>}
        </h5>
        {item.description && <p>{item.description}</p>}
      </div>
      <div className="item-prices">
        {options.map((o) => (
          <button
            key={o.label || 'unico'}
            type="button"
            className="price-chip"
            onClick={() =>
              add({ key: `${base}-${slug(o.label || 'unico')}`, name: item.name, detail: o.label || undefined, unitPrice: o.price })
            }
            aria-label={`Agregar ${item.name}${o.label ? ` ${o.label}` : ''} por ${clp(o.price)}`}
          >
            {o.label && <small>{o.label}</small>}
            <span className="pc-price">{clp(o.price)}</span>
            <span className="pc-plus" aria-hidden="true">
              +
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}
