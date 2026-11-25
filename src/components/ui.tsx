import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { CARTA_PAGES, PAGE_SIZE, type Crop } from '../data/site';

interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  children: ReactNode;
}

/** Lifts and unblurs its content when it scrolls into view. */
export function Reveal({ as: Tag = 'div', className = '', style, delay = 0, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}${inView ? ' is-in' : ''}`}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}

interface CropImageProps {
  crop: Crop;
  className?: string;
  style?: CSSProperties;
}

/**
 * Shows a rectangle cut out of one of the printed carta pages.
 * background-size/position are derived so the box maps exactly onto the page.
 */
export function CropImage({ crop, className = '', style }: CropImageProps) {
  const src = CARTA_PAGES[crop.page - 1];
  if (!src) throw new Error(`Carta page ${crop.page} does not exist`);
  const posX = crop.w >= 100 ? 0 : (crop.x / (100 - crop.w)) * 100;
  const posY = crop.h >= 100 ? 0 : (crop.y / (100 - crop.h)) * 100;
  return (
    <div
      role="img"
      aria-label={crop.alt}
      className={`crop ${className}`}
      style={{
        ...style,
        aspectRatio: `${crop.w * PAGE_SIZE.w} / ${crop.h * PAGE_SIZE.h}`,
        backgroundImage: `url("${src}")`,
        backgroundSize: `${(100 / crop.w) * 100}% auto`,
        backgroundPosition: `${posX}% ${posY}%`,
      }}
    />
  );
}

/**
 * Like CropImage, but fills its parent like `object-fit: cover`.
 * The parent must be position:relative with `container-type: size`.
 */
export function CoverCrop({ crop, className = '' }: { crop: Crop; className?: string }) {
  const src = CARTA_PAGES[crop.page - 1];
  if (!src) throw new Error(`Carta page ${crop.page} does not exist`);
  const ratio = (crop.w * PAGE_SIZE.w) / (crop.h * PAGE_SIZE.h);
  return (
    <div className={`cover-crop ${className}`} style={{ ['--ratio' as string]: ratio }}>
      <CropImage crop={crop} />
    </div>
  );
}

/** Hand-drawn chalk underline that "draws itself" when revealed. */
export function ChalkUnderline({ className = '' }: { className?: string }) {
  return (
    <svg className={`chalk-underline ${className}`} viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 16 C 60 6, 120 20, 180 10 S 270 8, 296 14" />
      <path d="M30 21 C 90 14, 170 22, 260 17" className="thin" />
    </svg>
  );
}

/** Curly chalk arrow used for margin notes. */
export function ChalkArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`chalk-arrow ${className}`} viewBox="0 0 120 80" aria-hidden="true">
      <path d="M6 10 C 40 0, 70 20, 60 40 S 40 70, 100 66" />
      <path d="M86 56 L 102 66 L 88 76" />
    </svg>
  );
}

/** Editorial section header: index + label rule, script title, one-line kicker. */
export function SectionTitle({
  index,
  label,
  script,
  kicker,
  align = 'left',
}: {
  index: string;
  label: string;
  script: string;
  kicker: string;
  align?: 'left' | 'center';
}) {
  return (
    <Reveal className={`section-title align-${align}`}>
      <p className="st-index">
        <b>{index}</b>
        <span className="st-rule" aria-hidden="true" />
        {label}
      </p>
      <h2 className="script-title">{script}</h2>
      <p className="kicker">{kicker}</p>
    </Reveal>
  );
}
