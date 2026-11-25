import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, asset } from '../data';
import { useCart } from '../cart';
import { Button, Logo } from './ui';

export function Header() {
  const { count, bumpKey } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(!openRef.current && y > lastY.current && y > 300);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${hidden ? ' is-hidden' : ''}`}>
      <div className="header-bar">
        <Logo label="Hibana Yakitori — home" />
        <nav className="desktop-nav" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a href="#menu" className="cart" aria-label={`Cart, ${count} items`}>
            <img src={asset.bag} alt="" />
            <span key={bumpKey} className={bumpKey > 0 ? 'bump' : undefined}>
              {count}
            </span>
          </a>
          <span className="desktop-only">
            <Button href="#visit" label="Book a table" variant="cream" size="sm" />
          </span>
          <button
            type="button"
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`mobile-nav${open ? ' is-open' : ''}`}>
        <nav>
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ transitionDelay: open ? `${60 + i * 50}ms` : '0ms' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="mobile-nav-cta">
            <Button href="#visit" label="Book a table" variant="cream" size="lg" />
          </div>
        </nav>
      </div>
    </header>
  );
}
