import { HOURS, PHONE, asset } from '../data';
import { Fern } from './Fern';
import { Button, Kicker, Pill, Reveal, SplitHeading } from './ui';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=212+Gertrude+Street+Fitzroy+VIC';

export function Visit() {
  const today = new Date().getDay();

  return (
    <section id="visit" className="visit">
      <Fern className="fern-bl" />
      <div className="visit-copy">
        <SplitHeading className="display-lg text-cream" lines={['Stop by', 'the grill']} />
        <Kicker>Walk-ins welcome at the bar!</Kicker>
        <Reveal as="p" className="body-lg text-cream">
          No dress code, plenty of stools, and a grill that’s been lit since four. Walk-ins welcome at the bar — book
          ahead for groups.
        </Reveal>
        <div className="hours">
          {HOURS.map((h) => {
            const isToday = (h.days as readonly number[]).includes(today);
            return (
              <Reveal key={h.label} className={`hour-row${isToday ? ' is-today' : ''}`}>
                <span className="hr-fill" />
                <p className="hr-day">
                  {h.label}
                  {isToday && <span className="today">Today</span>}
                </p>
                <p className="hr-time">{h.time}</p>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <a href={`tel:${PHONE}`} className="address">
            <img src={asset.location} alt="" />
            <span className="ulink">212 Gertrude Street, Fitzroy · (03) 9417 2014</span>
          </a>
        </Reveal>
        <Reveal className="btn-row">
          <Button href={`tel:${PHONE}`} label="Book a table" variant="cream" />
          <Button href={MAPS_URL} label="Get directions" variant="maroon" external />
        </Reveal>
      </div>
      <div className="visit-photo">
        <img src={asset.stall} alt="Regulars laughing at the Hibana counter" />
        <Pill>Open tonight from 5pm</Pill>
      </div>
    </section>
  );
}
