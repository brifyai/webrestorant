import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { asset, type Dish } from '../data';
import { useCart } from '../cart';

type Variant = 'cream' | 'maroon' | 'red';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  variant: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  external?: boolean;
}

/** Pill button with a left-to-right fill wipe and a rolling label on hover. */
export function Button({ label, variant, size = 'md', href, onClick, type = 'button', external }: ButtonProps) {
  const className = `btn btn-${variant}${size === 'md' ? '' : ` btn-${size}`}`;
  const inner = (
    <>
      <span className="btn-fill" />
      <span className="btn-text">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={className} onClick={onClick}>
      {inner}
    </button>
  );
}

interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  children: ReactNode;
}

/** Fades, unblurs and lifts its content in when scrolled into view. */
export function Reveal({ as: Tag = 'div', className = '', style, delay = 0, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={`${className}${inView ? ' is-in' : ''}`}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}

interface SplitHeadingProps {
  as?: 'h1' | 'h2' | 'p';
  lines: readonly string[];
  className?: string;
}

/** Heading whose words rise in one after another. */
export function SplitHeading({ as: Tag = 'h2', lines, className = '' }: SplitHeadingProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>();
  let index = 0;
  return (
    <Tag ref={ref} className={`${className}${inView ? ' is-in' : ''}`} aria-label={lines.join(' ')}>
      {lines.map((line) => (
        <span className="line" aria-hidden="true" key={line}>
          {line.split(' ').map((word, i) => {
            const delay = index++ * 70;
            return (
              <span key={`${word}-${i}`}>
                {i > 0 && ' '}
                <span className="word" style={{ transitionDelay: `${delay}ms` }}>
                  {word}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Uppercase extra-bold line under a script title ("PARA COMENZAR!" in the carta). */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <Reveal as="p" className="kicker">
      {children}
    </Reveal>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="pill">
      <img src={asset.flame} alt="" />
      {children}
    </span>
  );
}

/** One menu line; the price button flips to "+2" on hover and adds two to the bag. */
export function DishRow({ dish }: { dish: Dish }) {
  const { add } = useCart();
  return (
    <div className="dish">
      <div className="dish-top">
        <p className="dish-name">{dish.name}</p>
        <button
          type="button"
          className="price"
          aria-label={`Add two ${dish.name} to the bag ($${dish.price} each)`}
          onClick={() => add(dish.name, 2)}
        >
          <span className="price-inner">
            <span>${dish.price}</span>
            <span>+2</span>
          </span>
        </button>
      </div>
      <p className="dish-desc">{dish.description}</p>
    </div>
  );
}

interface LogoProps {
  className?: string;
  label: string;
}

export function Logo({ className = '', label }: LogoProps) {
  return (
    <a href="#top" className={`logo ${className}`} aria-label={label}>
      <img src={asset.logo} alt="" className="logo-flame" />
      <span className="logo-name">Hibana</span>
      <span className="logo-sub">Yakitori · Fitzroy</span>
    </a>
  );
}
