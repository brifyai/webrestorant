import { asset } from '../data';
import { Fern } from './Fern';
import { Button, Reveal, SplitHeading } from './ui';

export function Hero() {
  return (
    <section className="hero">
      <Fern className="fern-bl" />
      <div className="container hero-grid">
        <div>
          <SplitHeading as="h1" className="display-xl text-cream" lines={['Smoke, salt', 'and skewers', 'in Fitzroy']} />
          <Reveal as="p" className="hero-tag">
            Since 2014… still fanning the coals by hand.
          </Reveal>
          <Reveal className="btn-row">
            <Button href="#visit" label="Book a table" variant="cream" />
            <Button href="#menu" label="See the menu" variant="maroon" />
          </Reveal>
        </div>
        <Reveal className="hero-media">
          <div className="hero-photo">
            <img src={asset.heroB} alt="Glazed pork belly skewers fresh off the grill" />
            <img src={asset.heroA} alt="" className="hero-photo-alt" />
          </div>
          <div className="badge-wrap">
            <div className="badge">
              <img src={asset.award} alt="" />
              <span className="label-sm">Voted best</span>
              <span className="badge-big">Skewers</span>
              <span className="label-sm">Fitzroy 2025</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
