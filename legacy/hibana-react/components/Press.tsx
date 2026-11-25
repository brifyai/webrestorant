import { PRESS } from '../data';
import { Reveal, SplitHeading } from './ui';

export function Press() {
  return (
    <section id="press" className="press">
      <SplitHeading as="p" className="press-title" lines={['As featured in']} />
      <div className="press-logos">
        {PRESS.map((p, i) => (
          <Reveal as="span" key={p.name} className={`pl ${p.style}`} delay={i * 60}>
            {p.name}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
