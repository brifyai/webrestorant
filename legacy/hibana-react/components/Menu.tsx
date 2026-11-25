import { useEffect, useRef, useState } from 'react';
import { MENU, asset } from '../data';
import { Fern } from './Fern';
import { Button, DishRow, Kicker, Pill, Reveal, SplitHeading } from './ui';

function getGrill() {
  const group = MENU.find((g) => g.id === 'grill');
  if (!group) throw new Error('MENU is missing the "grill" group');
  return group;
}
const grill = getGrill();

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <section id="menu" className="menu">
      <Fern className="fern-tr" flip />
      <Fern className="fern-bl" />
      <div className="container">
        <div className="menu-head">
          <div>
            <SplitHeading className="display-lg text-red" lines={['The skewer', 'list']} />
            <Kicker>Straight off the coals!</Kicker>
          </div>
          <div className="menu-intro">
            <Reveal as="p" className="body-lg">
              Sold by the stick, two minimum. Order a few, then a few more — the grill runs until midnight on weekends.
            </Reveal>
            <Reveal className="btn-row">
              <Button label="See the full menu" variant="maroon" onClick={() => setOpen(true)} />
            </Reveal>
          </div>
        </div>
        <div className="menu-body">
          <Reveal className="menu-photo-wrap">
            <div className="menu-photo">
              <img src={asset.menu} alt="Chicken skewers glazed with tare" />
              <Pill>Hot off the coals</Pill>
            </div>
          </Reveal>
          <div className="menu-list">
            {grill.items.map((dish, i) => (
              <Reveal key={dish.name} delay={(i % 2) * 80}>
                <DishRow dish={dish} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <FullMenu open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function FullMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={`modal${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Full menu"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <div className="modal-top">
          <p className="modal-title">Full menu</p>
          <button ref={closeRef} type="button" className="modal-close" aria-label="Close full menu" onClick={onClose}>
            ✕
          </button>
        </div>
        <p className="modal-sub">Skewers are sold by the stick, two minimum. Tap a price to add two to your bag.</p>
        {MENU.map((group) => (
          <div className="menu-group" key={group.id}>
            <Pill>{group.label}</Pill>
            <div className="menu-group-grid">
              {group.items.map((dish) => (
                <DishRow key={dish.name} dish={dish} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
