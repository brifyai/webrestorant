import { useEffect, useState } from 'react';
import { CROPS } from '../data/site';
import { useOrder } from '../order';
import { CropImage } from './ui';

const LINKS = [
  { href: '#carta', label: 'La carta' },
  { href: '#arma-tu-roll', label: 'Arma tu roll' },
  { href: '#promos', label: 'Promos' },
  { href: '#carta-impresa', label: 'Carta impresa' },
] as const;

export function Header() {
  const { count, bump, open } = useOrder();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
      <div className="header-inner">
        <a href="#top" className="brand" aria-label="Los Compadres, ir al inicio">
          <CropImage crop={CROPS.logo} className="brand-logo" />
        </a>
        <nav className="nav" aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button type="button" className="bag-btn" onClick={open} aria-label={`Ver mi pedido, ${count} productos`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span>Mi pedido</span>
            <b key={bump} className={bump > 0 ? 'pop' : undefined}>
              {count}
            </b>
          </button>
          <button
            type="button"
            className="burger"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
