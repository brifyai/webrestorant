import { asset } from '../data';

interface MarqueeProps {
  phrases: readonly string[];
  tone: 'white' | 'cream';
  reverse?: boolean;
}

/** Infinite ticker: four copies of the phrase set, the track slides by one copy (25%). */
export function Marquee({ phrases, tone, reverse = false }: MarqueeProps) {
  return (
    <section className={`marquee marquee-${tone}`} data-reverse={reverse ? '' : undefined}>
      <div className="marquee-track">
        {[0, 1, 2, 3].map((g) => (
          <div className="marquee-group" key={g} aria-hidden={g > 0}>
            {phrases.map((p) => (
              <span className="marquee-item" key={p}>
                <span>{p}</span>
                <img src={asset.flame} alt="" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
