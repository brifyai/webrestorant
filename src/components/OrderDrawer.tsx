import { useEffect, useRef, useState } from 'react';
import { SITE } from '../data/site';
import { clp } from '../lib/format';
import { orderToText, useOrder } from '../order';

type CopyState = 'idle' | 'copied' | 'failed';

export function OrderDrawer() {
  const { lines, total, isOpen, close, setQty, clear } = useOrder();
  const [copy, setCopy] = useState<CopyState>('idle');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setCopy('idle');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const text = orderToText(lines, total);
  const waUrl = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}` : null;

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopy('copied');
    } catch (err) {
      console.error('Could not copy the order to the clipboard', err);
      setCopy('failed');
    }
  };

  return (
    <div className={`drawer-layer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="drawer-backdrop" onClick={close} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Mi pedido">
        <div className="drawer-head">
          <p className="script-title sm">Mi pedido</p>
          <button ref={closeRef} type="button" className="icon-btn" onClick={close} aria-label="Cerrar pedido">
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Tu pedido está vacío.</p>
            <p>Toca cualquier precio de la carta para agregarlo.</p>
          </div>
        ) : (
          <>
            <ul className="drawer-lines">
              {lines.map((l) => (
                <li key={l.key}>
                  <div>
                    <p className="dl-name">{l.name}</p>
                    {l.detail && <p className="dl-detail">{l.detail}</p>}
                    <p className="dl-price">{clp(l.unitPrice * l.qty)}</p>
                  </div>
                  <div className="qty">
                    <button type="button" onClick={() => setQty(l.key, l.qty - 1)} aria-label={`Quitar uno de ${l.name}`}>
                      −
                    </button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => setQty(l.key, l.qty + 1)} aria-label={`Agregar uno de ${l.name}`}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="drawer-total">
                <span>Total</span>
                <b>{clp(total)}</b>
              </div>
              {waUrl ? (
                <a className="btn btn-primary btn-block" href={waUrl} target="_blank" rel="noopener">
                  Enviar pedido por WhatsApp
                </a>
              ) : (
                <button type="button" className="btn btn-primary btn-block" onClick={copyOrder}>
                  {copy === 'copied' ? '¡Pedido copiado!' : 'Copiar pedido'}
                </button>
              )}
              {copy === 'failed' && <p className="drawer-error">No pudimos copiar el pedido. Selecciónalo y cópialo a mano.</p>}
              <button type="button" className="link-btn" onClick={clear}>
                Vaciar pedido
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
