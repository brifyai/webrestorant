import { useState, type FormEvent } from 'react';
import { FOOTER_COLUMNS, PHONE, asset } from '../data';
import { useInView } from '../hooks/useInView';
import { Fern } from './Fern';
import { Button, Logo, Reveal } from './ui';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterState = { kind: 'idle' } | { kind: 'ok' } | { kind: 'error' };

export function Footer() {
  return (
    <footer className="footer">
      <Fern className="fern-tr" flip />
      <div className="container">
        <div className="footer-top">
          <Reveal className="footer-brand">
            <Logo className="logo-footer" label="Back to top" />
            <p>Skewers, sake and a very old pot of tare on Gertrude Street.</p>
          </Reveal>
          <Reveal className="footer-cols">
            {FOOTER_COLUMNS.map((col) => (
              <div className="fcol" key={col.title}>
                <p>{col.title}</p>
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} className="ulink">
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </Reveal>
          <Reveal className="newsletter">
            <Newsletter />
          </Reveal>
        </div>
        <div className="footer-legal mono">
          <p>© 2026 Hibana Yakitori Pty Ltd</p>
          <a href="#">Privacy · Terms</a>
          <p>Grilled in Fitzroy since 2014</p>
        </div>
        <GiantWord word="Hibana" />
      </div>
    </footer>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<NewsletterState>({ kind: 'idle' });

  // No backend yet: validate locally and confirm. Wire this to the real list provider before launch.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState({ kind: 'error' });
      return;
    }
    setState({ kind: 'ok' });
    setEmail('');
  };

  return (
    <>
      <p className="nl-title">Get the weekly specials</p>
      <form className="nl-form" noValidate onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="your@email.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" label="Sign up" variant="red" size="lg" />
      </form>
      <p className={`nl-msg${state.kind === 'error' ? ' is-error' : ''}`} aria-live="polite">
        {state.kind === 'ok' && 'You’re on the list — see you at the grill.'}
        {state.kind === 'error' && 'That email doesn’t look right.'}
      </p>
      <div className="socials">
        <a href="https://www.instagram.com/" aria-label="Instagram">
          <img src={asset.instagram} alt="" />
        </a>
        <a href="mailto:hello@hibana.com.au" aria-label="Email">
          <img src={asset.email} alt="" />
        </a>
        <a href={`tel:${PHONE}`} aria-label="Phone">
          <img src={asset.phone} alt="" />
        </a>
      </div>
    </>
  );
}

function GiantWord({ word }: { word: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`giant${inView ? ' is-in' : ''}`} aria-label={word} role="img">
      {[...word].map((ch, i) => (
        <span key={i} className="g-letter" aria-hidden="true" style={{ transitionDelay: `${i * 70}ms` }}>
          <span className="g-inner">{ch}</span>
        </span>
      ))}
    </div>
  );
}
