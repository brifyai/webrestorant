import { useEffect, useRef, useState } from 'react';
import { REVIEWS } from '../data';
import { Fern } from './Fern';
import { Reveal, SplitHeading } from './ui';

const DESKTOP = '(min-width: 1024px)';

export function Reviews() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // On mobile the active card follows the horizontal scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      if (window.matchMedia(DESKTOP).matches) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slideRefs.current.forEach((s, i) => {
        if (!s) return;
        const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[i];
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section className="reviews">
      <Fern className="fern-tl" />
      <Fern className="fern-br" flip />
      <div className="container center">
        <SplitHeading className="display-lg text-cream" lines={['Loud reviews,', 'full mouths']} />
        <Reveal as="p" className="reviews-sub">
          4.9 stars from 2,400 regulars — and counting
        </Reveal>
      </div>
      <div className="review-track" ref={trackRef}>
        {REVIEWS.map((r, i) => (
          <div
            key={r.author}
            ref={(node) => {
              slideRefs.current[i] = node;
            }}
            className={`review-slide${active === i ? ' is-active' : ''}`}
            onMouseEnter={() => {
              if (window.matchMedia(DESKTOP).matches) setActive(i);
            }}
          >
            <figure className="review">
              <div className="stars" role="img" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>“{r.quote}”</blockquote>
              <figcaption className="mono">{r.author}</figcaption>
            </figure>
          </div>
        ))}
      </div>
      <div className="dots">
        {REVIEWS.map((r, i) => (
          <button
            key={r.author}
            type="button"
            aria-label={`Show review ${i + 1}`}
            className={active === i ? 'is-active' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
