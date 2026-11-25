import { useState, type PointerEvent } from 'react';
import { asset } from '../data';
import { useCart } from '../cart';
import { Button, Kicker, Reveal, SplitHeading } from './ui';

interface Tilt {
  x: number;
  y: number;
}

export function Tare() {
  const { add } = useCart();
  const [tilt, setTilt] = useState<Tilt | null>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const bottleStyle = tilt
    ? { transform: `rotateY(${tilt.x * 24}deg) rotateX(${-tilt.y * 14}deg) rotate(${tilt.x * 4}deg)` }
    : undefined;
  const wordStyle = (dir: 1 | -1) => (tilt ? { transform: `translateY(${tilt.y * 60 * dir}px)` } : undefined);

  return (
    <section id="tare" className="tare">
      <div className="tare-visual" onPointerMove={onMove} onPointerLeave={() => setTilt(null)}>
        <p className="tare-word tare-word-left" style={wordStyle(-1)}>
          Smoky
        </p>
        <p className="tare-word tare-word-right" style={wordStyle(1)}>
          Sweet
        </p>
        <div className="bottle-stage">
          <div className="bottle" style={bottleStyle}>
            <img src={asset.tare} alt="Hibana house tare, 250ml bottle" className="bottle-img" />
            <div className="bottle-label">
              <img src={asset.flame} alt="" />
              <span className="bl-name">Hibana</span>
              <span className="label-sm text-maroon">House tare · est. 2014</span>
              <span className="bl-rule" />
              <span className="bl-flavour">Sweet &amp; smoky</span>
              <span className="label-sm text-maroon">250ml</span>
            </div>
          </div>
        </div>
      </div>
      <div className="tare-copy">
        <SplitHeading className="display-lg text-red" lines={['The tare that', 'built Hibana']} />
        <Kicker>Our house sauce, now bottled</Kicker>
        <Reveal as="p" className="body-lg">
          We’ve topped up the same pot of soy, mirin and charred chicken bones since opening night. Now there’s
          finally enough to bottle — so your backyard grill can taste like our counter.
        </Reveal>
        <Reveal className="btn-row align-center">
          <Button label="Shop the tare" variant="red" onClick={() => add('Hibana tare', 1)} />
          <p className="mono">$18 · ships Australia-wide</p>
        </Reveal>
      </div>
    </section>
  );
}
