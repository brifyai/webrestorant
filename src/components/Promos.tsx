import { useState } from 'react';
import { PROMOS, type Promo } from '../data/promos';
import { clp } from '../lib/format';
import { useOrder } from '../order';
import { Reveal, SectionTitle } from './ui';

type Filter = 'todas' | Promo['world'];

export function Promos() {
  const [filter, setFilter] = useState<Filter>('todas');
  const list = filter === 'todas' ? PROMOS : PROMOS.filter((p) => p.world === filter);

  return (
    <section className="promos" id="promos">
      <div className="wrap">
        <SectionTitle index="03" label="Promociones" script="Para la mesa entera" kicker="Combos de sushi, hamburguesas y churrascos" align="center" />
        <div className="promo-filter" role="tablist" aria-label="Filtrar promociones">
          {(
            [
              ['todas', 'Todas'],
              ['sushi', 'Sushi'],
              ['sanguche', 'Hamburguesas y churrascos'],
            ] as const
          ).map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={filter === id} onClick={() => setFilter(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="coupons">
          {list.map((p, i) => (
            <Reveal key={p.number} delay={(i % 3) * 90} className="coupon-wrap">
              <Coupon promo={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coupon({ promo }: { promo: Promo }) {
  const { add } = useOrder();
  const [variant, setVariant] = useState(0);
  const current = promo.variants?.[variant];
  const price = current?.price ?? promo.price;

  return (
    <article className={`coupon coupon-${promo.world}`}>
      <div className="coupon-stub">
        <span>Promo</span>
        <b>{promo.number}</b>
      </div>
      <div className="coupon-body">
        <h3>{promo.headline}</h3>
        <ul>
          {promo.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        {promo.variants && (
          <div className="coupon-variants">
            {promo.variants.map((v, i) => (
              <button key={v.label} type="button" aria-pressed={i === variant} onClick={() => setVariant(i)}>
                {v.label}
              </button>
            ))}
          </div>
        )}
        <div className="coupon-foot">
          <span className="coupon-price">{clp(price)}</span>
          <button
            type="button"
            className="coupon-add"
            onClick={() =>
              add({
                key: `promo-${promo.number}-${variant}`,
                name: `Promoción ${promo.number}`,
                detail: current ? current.label : promo.headline,
                unitPrice: price,
              })
            }
          >
            Lo quiero
          </button>
        </div>
      </div>
    </article>
  );
}
