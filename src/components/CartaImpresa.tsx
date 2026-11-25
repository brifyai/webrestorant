import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { CARTA_PAGES } from '../data/site';
import { Reveal, SectionTitle } from './ui';

const TITLES = [
  'Entradas',
  'Rollos Americanos',
  'Rollos Nikkei',
  'Rollos Especiales',
  'Sushiburger',
  'Sushipletos & Hand Rolls',
  'Ensaladas & Gohan',
  'Hamburguesas',
  'Chicken Bread & Veg Burger',
  'Sándwich',
  'Chorrillanas & Menú Kids',
  'Bebestibles & Postres',
  'Promociones Sushi',
  'Promociones Hamburguesas',
] as const;

const TOTAL = CARTA_PAGES.length;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Transform for a page `offset` positions away from the active one.
 * The active page sits centred and lifted; the rest open in an arc,
 * smaller, darker and further back the further they are.
 */
function fanStyle(offset: number): CSSProperties {
  const d = Math.abs(offset);
  const side = Math.sign(offset);
  // spacing shrinks with distance so the outer pages tuck in like a hand of cards
  const x = side * (d === 0 ? 0 : 150 + (d - 1) * 58);
  const y = d === 0 ? -18 : 22 + d * d * 4;
  const rotate = side * Math.min(d * 7, 42);
  const scale = d === 0 ? 1.08 : Math.max(0.62, 0.9 - d * 0.045);
  return {
    transform: `translateX(calc(${x} * var(--fan-unit))) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
    zIndex: 100 - d,
    ['--dim' as string]: d === 0 ? 1 : Math.max(0.35, 0.8 - d * 0.07),
    ['--hide' as string]: d > 6 ? 0 : 1,
  };
}

/** The printed carta as an interactive fan of pages, with a full-screen reader. */
export function CartaImpresa() {
  const [active, setActive] = useState(0);
  const [openAt, setOpenAt] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ x: number; moved: boolean } | null>(null);

  const go = useCallback((dir: 1 | -1) => setActive((i) => Math.min(TOTAL - 1, Math.max(0, i + dir))), []);
  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenAt((i) => (i === null ? null : (i + dir + TOTAL) % TOTAL)),
    [],
  );
  const isOpen = openAt !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [isOpen, close, step]);

  // touch swipe on the fan (mouse users get hover + arrows)
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return;
    swipe.current = { x: e.clientX, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = swipe.current;
    if (!s || s.moved) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40) {
      s.moved = true;
      go(dx < 0 ? 1 : -1);
    }
  };
  const onPointerUp = () => {
    // keep the flag until the click that follows a swipe has been ignored
    window.setTimeout(() => {
      swipe.current = null;
    }, 0);
  };

  const openPage = (i: number) => {
    if (swipe.current?.moved) return;
    if (i !== active) {
      setActive(i);
      return;
    }
    setOpenAt(i);
  };

  return (
    <section className="impresa" id="carta-impresa">
      <div className="wrap">
        <SectionTitle
          index="04"
          label="Carta impresa"
          script="La carta de siempre"
          kicker="Las 14 páginas, tal cual están en el local"
          align="center"
        />
      </div>

      <Reveal className="fan-stage">
        <div
          className="fan"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Páginas de la carta impresa"
        >
          {CARTA_PAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`fan-page${i === active ? ' is-active' : ''}`}
              style={fanStyle(i - active)}
              onFocus={() => setActive(i)}
              onClick={() => openPage(i)}
              aria-label={
                i === active
                  ? `Página ${i + 1} de ${TOTAL}: ${TITLES[i] ?? ''}. Abrir en grande`
                  : `Ir a la página ${i + 1}: ${TITLES[i] ?? ''}`
              }
              aria-current={i === active}
            >
              <img src={src} alt="" loading="lazy" draggable={false} />
              <span className="fan-zoom" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m20 20-4.2-4.2M11 8v6M8 11h6" />
                </svg>
                Ver en grande
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="fan-controls">
        <button type="button" className="fan-arrow" onClick={() => go(-1)} disabled={active === 0} aria-label="Página anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="fan-caption" aria-live="polite">
          <span className="fan-count">
            <b>{pad(active + 1)}</b> / {pad(TOTAL)}
          </span>
          <span className="fan-title" key={active}>
            {TITLES[active]}
          </span>
        </div>
        <button type="button" className="fan-arrow" onClick={() => go(1)} disabled={active === TOTAL - 1} aria-label="Página siguiente">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="fan-progress" aria-hidden="true">
        <span style={{ width: `${((active + 1) / TOTAL) * 100}%` }} />
      </div>

      {openAt !== null && (
        <div
          className="reader"
          role="dialog"
          aria-modal="true"
          aria-label={`Carta impresa, página ${openAt + 1} de ${TOTAL}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button ref={closeRef} type="button" className="reader-close" onClick={close} aria-label="Cerrar">
            ✕
          </button>
          <button type="button" className="reader-nav prev" onClick={() => step(-1)} aria-label="Página anterior">
            ‹
          </button>
          <figure className="reader-page">
            <img src={CARTA_PAGES[openAt]} alt={`Carta Los Compadres, página ${openAt + 1}: ${TITLES[openAt] ?? ''}`} />
            <figcaption>
              {pad(openAt + 1)} / {pad(TOTAL)} · {TITLES[openAt]}
            </figcaption>
          </figure>
          <button type="button" className="reader-nav next" onClick={() => step(1)} aria-label="Página siguiente">
            ›
          </button>
        </div>
      )}
    </section>
  );
}
