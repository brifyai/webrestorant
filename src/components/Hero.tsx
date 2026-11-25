import type { Mode } from '../App';
import { CROPS, type Crop } from '../data/site';
import { CoverCrop, CropImage, Reveal } from './ui';

interface World {
  id: Mode;
  index: string;
  label: string;
  word: string;
  lead: string;
  from: string;
  cta: string;
  photo: Crop;
}

const WORLDS: readonly World[] = [
  {
    id: 'sushi',
    index: '01',
    label: 'Sushitería',
    word: 'Sushi',
    lead: 'Americanos, nikkei, especiales sin arroz, sushiburgers y hand rolls.',
    from: 'Rolls desde $7.090',
    cta: 'Ver rolls',
    photo: CROPS.avocadoRoll,
  },
  {
    id: 'sanguche',
    index: '02',
    label: 'Sandwichería',
    word: 'Sánguche',
    lead: 'Hamburguesas, churrasco y mechada, chorrillanas. Todo con papas fritas.',
    from: 'Sándwich desde $8.990',
    cta: 'Ver sánguches',
    photo: CROPS.burger,
  },
];

interface HeroProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

/** Full-bleed split hero: two worlds side by side, the hovered one takes the stage. */
export function Hero({ mode, onModeChange }: HeroProps) {
  return (
    <>
      <section className="split" id="top" aria-label="Los Compadres, sushitería y sandwichería">
        <h1 className="sr-only">Los Compadres · Sushitería &amp; Sandwichería</h1>
        {WORLDS.map((w) => (
          <a
            key={w.id}
            href="#carta"
            className={`world world-${w.id}${mode === w.id ? ' is-picked' : ''}`}
            onClick={() => onModeChange(w.id)}
            onMouseEnter={() => onModeChange(w.id)}
            onFocus={() => onModeChange(w.id)}
          >
            <CoverCrop crop={w.photo} className="world-photo" />
            <span className="world-shade" aria-hidden="true" />
            <span className="world-content">
              <span className="world-index">
                {w.index} <i aria-hidden="true" /> {w.label}
              </span>
              <span className="world-word">{w.word}</span>
              <span className="world-lead">{w.lead}</span>
              <span className="world-foot">
                <span className="world-from">{w.from}</span>
                <span className="world-cta">
                  {w.cta}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </span>
          </a>
        ))}

        <div className="seal" aria-hidden="true">
          <svg className="seal-ring" viewBox="0 0 200 200">
            <defs>
              <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              <textPath href="#seal-circle" textLength="488">
                SUSHITERÍA · SANDWICHERÍA · SUSHITERÍA · SANDWICHERÍA ·
              </textPath>
            </text>
          </svg>
          <CropImage crop={CROPS.logo} className="seal-logo" />
        </div>

        <a href="#manifiesto" className="scroll-cue" aria-label="Seguir bajando">
          <span />
        </a>
      </section>

      <section className="manifesto" id="manifiesto">
        <Reveal className="wrap">
          <p className="manifesto-text">
            Dos cocinas, <em>una sola mesa.</em> Rolls enrollados al momento con la envoltura que tú elijas, y
            sánguches de los que se comen <em>con las dos manos.</em>
          </p>
          <div className="manifesto-cta">
            <a href="#carta" className="btn btn-primary">
              Ver la carta completa
            </a>
            <a href="#promos" className="btn btn-ghost">
              Promociones
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
