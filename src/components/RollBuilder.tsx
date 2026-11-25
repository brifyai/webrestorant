import { useState } from 'react';
import { EXTRA_SAUCES, FREE_WRAPS, ROLL_BASES, SPECIAL_WRAPS } from '../data/menu';
import { CROPS } from '../data/site';
import { clp, slug } from '../lib/format';
import { useOrder } from '../order';
import { CropImage, Reveal, SectionTitle } from './ui';

type BaseId = (typeof ROLL_BASES)[number]['id'];

/** Wrap choice: a free wrap by name, or a special one by index in SPECIAL_WRAPS. */
type Wrap = { kind: 'free'; name: string } | { kind: 'special'; index: number };

export function RollBuilder() {
  const { add } = useOrder();
  const [baseId, setBaseId] = useState<BaseId>('americano');
  const [filling, setFilling] = useState(0);
  const [wrap, setWrap] = useState<Wrap>({ kind: 'free', name: FREE_WRAPS[0] });
  const [sauces, setSauces] = useState<number[]>([]);

  const base = ROLL_BASES.find((b) => b.id === baseId) ?? ROLL_BASES[0];
  const fillingItem = base.fillings[filling] ?? base.fillings[0];
  const special = wrap.kind === 'special' ? SPECIAL_WRAPS[wrap.index] : undefined;
  const wrapLabel = wrap.kind === 'free' ? wrap.name : (special?.label ?? '');
  const sauceItems = sauces.map((i) => EXTRA_SAUCES[i]).filter((s) => s !== undefined);
  const total = base.price + (special?.price ?? 0) + sauceItems.reduce((n, s) => n + s.price, 0);

  const changeBase = (id: BaseId) => {
    setBaseId(id);
    setFilling(0);
  };

  const toggleSauce = (i: number) =>
    setSauces((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const addToOrder = () => {
    if (!fillingItem) return;
    const detail = [`envoltura ${wrapLabel.toLowerCase()}`, ...sauceItems.map((s) => `salsa ${s.label.toLowerCase()}`)].join(', ');
    add({
      key: slug(`roll-${base.id}-${fillingItem.name}-${wrapLabel}-${sauceItems.map((s) => s.label).join('-')}`),
      name: `${base.label} ${fillingItem.name}`,
      detail,
      unitPrice: total,
    });
  };

  return (
    <section className="builder" id="arma-tu-roll">
      <div className="wrap">
        <SectionTitle index="02" label="Arma tu roll" script="Tu roll, a tu manera" kicker="Base, relleno y envoltura: tres pasos y listo" />

        <div className="builder-grid">
          <Reveal className="builder-steps">
            <fieldset className="step">
              <legend>
                <b>1</b> Elige tu base
              </legend>
              <div className="base-cards">
                {ROLL_BASES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`base-card${baseId === b.id ? ' is-on' : ''}`}
                    aria-pressed={baseId === b.id}
                    onClick={() => changeBase(b.id)}
                  >
                    <span>{b.label}</span>
                    <small>{b.detail}</small>
                    <b>{clp(b.price)}</b>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="step">
              <legend>
                <b>2</b> Elige el relleno
              </legend>
              <div className="pills">
                {base.fillings.map((f, i) => (
                  <button
                    key={f.name}
                    type="button"
                    className={`pill${filling === i ? ' is-on' : ''}`}
                    aria-pressed={filling === i}
                    onClick={() => setFilling(i)}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
              {fillingItem?.description && <p className="step-hint">{fillingItem.description}</p>}
            </fieldset>

            <fieldset className="step">
              <legend>
                <b>3</b> Envoltura y salsas
              </legend>
              <p className="step-label">Incluidas</p>
              <div className="pills">
                {FREE_WRAPS.map((w) => {
                  const on = wrap.kind === 'free' && wrap.name === w;
                  return (
                    <button
                      key={w}
                      type="button"
                      className={`pill${on ? ' is-on' : ''}`}
                      aria-pressed={on}
                      onClick={() => setWrap({ kind: 'free', name: w })}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
              <p className="step-label">Especiales</p>
              <div className="pills">
                {SPECIAL_WRAPS.map((w, i) => {
                  const on = wrap.kind === 'special' && wrap.index === i;
                  return (
                    <button
                      key={w.label}
                      type="button"
                      className={`pill${on ? ' is-on' : ''}`}
                      aria-pressed={on}
                      onClick={() => setWrap({ kind: 'special', index: i })}
                    >
                      {w.label} <small>+{clp(w.price)}</small>
                    </button>
                  );
                })}
              </div>
              <p className="step-label">Salsas extra</p>
              <div className="pills">
                {EXTRA_SAUCES.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    className={`pill pill-sauce${sauces.includes(i) ? ' is-on' : ''}`}
                    aria-pressed={sauces.includes(i)}
                    onClick={() => toggleSauce(i)}
                  >
                    {s.label} <small>+{clp(s.price)}</small>
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          <Reveal className="ticket-wrap" delay={120}>
            <div className="ticket" aria-live="polite">
              <CropImage crop={CROPS.avocadoRoll} className="ticket-photo" />
              <p className="ticket-eyebrow">Tu roll</p>
              <p className="ticket-name">{fillingItem?.name ?? ''}</p>
              <ul className="ticket-lines">
                <li>
                  <span>{base.label}</span>
                  <span>{clp(base.price)}</span>
                </li>
                <li>
                  <span>Envoltura {wrapLabel.toLowerCase()}</span>
                  <span>{special ? `+${clp(special.price)}` : 'incluida'}</span>
                </li>
                {sauceItems.map((s) => (
                  <li key={s.label}>
                    <span>Salsa {s.label.toLowerCase()}</span>
                    <span>+{clp(s.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="ticket-total">
                <span>Total</span>
                <b>{clp(total)}</b>
              </div>
              <button type="button" className="btn btn-primary btn-block" onClick={addToOrder}>
                Agregar al pedido
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
