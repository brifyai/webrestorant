import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { POLAROIDS, STATS } from '../data';
import { useInView } from '../hooks/useInView';
import { Kicker, Reveal, SplitHeading } from './ui';

const BOARD_W = 640;
const BOARD_H = 620;

export function Roots() {
  return (
    <section id="roots" className="roots">
      <div className="container roots-grid">
        <div>
          <Reveal as="p" className="eyebrow">
            Our roots
          </Reveal>
          <SplitHeading className="display-lg text-cream" lines={['Born at a', 'backyard grill']} />
          <Kicker>Same tare, same tongs, bigger grill</Kicker>
          <Reveal as="p" className="body-lg text-cream">
            Kenji and Mae started grilling skewers for neighbours on a borrowed hibachi in their Collingwood backyard.
            The queue got long, the council got curious, and in 2014 we moved the coals to Gertrude Street. Same tare,
            same tongs, bigger grill.
          </Reveal>
          <div className="stats">
            {STATS.map((s, i) => (
              <Reveal className="stat" key={s.label} delay={i * 80}>
                <CountUp to={s.to} from={s.from} suffix={s.suffix} />
                <p className="stat-label">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="polaroids">
          <Polaroids />
        </Reveal>
      </div>
    </section>
  );
}

function CountUp({ to, from, suffix }: { to: number; from: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLParagraphElement>(0.6);
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      setValue(Math.round(from + (to - from) * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, from, to]);

  return (
    <p ref={ref} className="stat-num">
      {value}
      {suffix}
    </p>
  );
}

interface Offset {
  dx: number;
  dy: number;
  z: number;
}

/** Fixed 640×620 board scaled to fit its column; cards can be dragged around. */
function Polaroids() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offsets, setOffsets] = useState<Offset[]>(() => POLAROIDS.map((_, i) => ({ dx: 0, dy: 0, z: i + 1 })));
  const [dragging, setDragging] = useState<number | null>(null);
  const drag = useRef({ startX: 0, startY: 0, baseX: 0, baseY: 0 });
  const topZ = useRef(POLAROIDS.length);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setScale(Math.min(1, entry.contentRect.width / BOARD_W));
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  const onDown = (i: number) => (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const current = offsets[i];
    if (!current) return;
    topZ.current += 1;
    drag.current = { startX: e.clientX / scale, startY: e.clientY / scale, baseX: current.dx, baseY: current.dy };
    setOffsets((prev) => prev.map((o, j) => (j === i ? { ...o, z: topZ.current } : o)));
    setDragging(i);
  };

  const onMove = (i: number) => (e: PointerEvent<HTMLDivElement>) => {
    if (dragging !== i) return;
    const { startX, startY, baseX, baseY } = drag.current;
    const dx = baseX + e.clientX / scale - startX;
    const dy = baseY + e.clientY / scale - startY;
    setOffsets((prev) => prev.map((o, j) => (j === i ? { ...o, dx, dy } : o)));
  };

  return (
    <div ref={wrapRef} style={{ height: BOARD_H * scale }}>
      <div className="polaroid-board" style={{ width: BOARD_W, height: BOARD_H, transform: `scale(${scale})` }}>
        {POLAROIDS.map((p, i) => {
          const o = offsets[i] ?? { dx: 0, dy: 0, z: i + 1 };
          return (
            <div
              key={p.caption}
              className={`polaroid${dragging === i ? ' is-dragging' : ''}`}
              style={{
                left: p.x,
                top: p.y,
                zIndex: o.z,
                transform: `translate(${o.dx}px, ${o.dy}px) rotate(var(--r))`,
                ['--r' as string]: `${p.rotate}deg`,
              }}
              onPointerDown={onDown(i)}
              onPointerMove={onMove(i)}
              onPointerUp={() => setDragging(null)}
              onPointerCancel={() => setDragging(null)}
            >
              <div className="polaroid-img" style={{ width: p.w, height: p.h }}>
                <img src={p.src} alt={p.alt} draggable={false} />
              </div>
              <p>{p.caption}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
