const WORDS = [
  'Rolls americanos',
  'Nikkei',
  'Sushiburger',
  'Hand rolls',
  'Hamburguesas',
  'Churrasco & mechada',
  'Chorrillanas',
  'Gohan',
  'Wantán',
  'Menú kids',
] as const;

/** Tilted mustard tape that scrolls forever, like a strip stuck across the board. */
export function Ticker() {
  return (
    <div className="ticker-clip" aria-hidden="true">
      <div className="ticker">
      <div className="ticker-track">
        {[0, 1].map((g) => (
          <div className="ticker-group" key={g}>
            {WORDS.map((w) => (
              <span key={w}>
                {w}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
