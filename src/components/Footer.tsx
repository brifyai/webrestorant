import { SITE, CROPS } from '../data/site';
import { CropImage, Reveal } from './ui';
import { Fern } from './Fern';

/**
 * Closing block. Contact details render only once they exist in SITE
 * (loscompadres.cl does not publish address, phone or hours).
 */
export function Footer() {
  const hasContact = Boolean(SITE.address || SITE.phone || SITE.whatsapp || SITE.instagram || SITE.hours);

  return (
    <footer className="footer" id="visitanos">
      <Fern className="fern-tl" />
      <div className="wrap">
        <Reveal className="footer-cta">
          <p className="script-title">¿Pasamos a la mesa, compadre?</p>
          <p className="kicker">Arma tu pedido desde la carta y llévalo listo</p>
          <div className="hero-ctas center">
            <a href="#carta" className="btn btn-primary">
              Ver la carta
            </a>
            {SITE.whatsapp && (
              <a href={`https://wa.me/${SITE.whatsapp}`} className="btn btn-ghost" target="_blank" rel="noopener">
                Escríbenos por WhatsApp
              </a>
            )}
          </div>
        </Reveal>

        {hasContact && (
          <div className="contact-grid">
            {SITE.address && (
              <div>
                <h3>Dónde</h3>
                {SITE.mapsUrl ? (
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener">
                    {SITE.address}
                  </a>
                ) : (
                  <p>{SITE.address}</p>
                )}
              </div>
            )}
            {SITE.hours && (
              <div>
                <h3>Horario</h3>
                {SITE.hours.map((h) => (
                  <p key={h.days}>
                    {h.days} · {h.time}
                  </p>
                ))}
              </div>
            )}
            {(SITE.phone || SITE.instagram) && (
              <div>
                <h3>Contacto</h3>
                {SITE.phone && <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>}
                {SITE.instagram && (
                  <a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener">
                    @{SITE.instagram}
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <div className="footer-bottom">
          <CropImage crop={CROPS.logo} className="footer-logo" />
          <p>
            {SITE.name} · {SITE.tagline}
          </p>
          <p>Precios en pesos chilenos, según carta vigente.</p>
        </div>
      </div>
      <p className="footer-giant" aria-hidden="true">
        Los Compadres
      </p>
    </footer>
  );
}
