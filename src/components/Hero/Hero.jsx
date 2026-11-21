import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button/Button';
import { AlertIcon, MegaphoneIcon, PinIcon } from '../../assets/icons';
import './Hero.css';

/* Abstract neighbourhood illustration — a generic locality motif, not a photo
   or a photograph of the ward. */
function LocalityArt() {
  return (
    <svg viewBox="0 0 420 340" className="hero__art" role="img" aria-label="">
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6e0" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="420" height="340" rx="28" fill="url(#heroSky)" />

      {/* Distant blocks */}
      <rect x="34" y="150" width="64" height="130" rx="8" fill="#e7c9ce" />
      <rect x="112" y="112" width="78" height="168" rx="8" fill="#c9868f" />
      <rect x="204" y="136" width="70" height="144" rx="8" fill="#e7c9ce" />
      <rect x="288" y="96" width="86" height="184" rx="8" fill="#a85560" />

      {/* Windows */}
      <g fill="#fdf6e0" opacity="0.9">
        <rect x="126" y="132" width="14" height="16" rx="3" />
        <rect x="152" y="132" width="14" height="16" rx="3" />
        <rect x="126" y="164" width="14" height="16" rx="3" />
        <rect x="152" y="164" width="14" height="16" rx="3" />
        <rect x="218" y="156" width="14" height="16" rx="3" />
        <rect x="242" y="156" width="14" height="16" rx="3" />
        <rect x="304" y="120" width="15" height="17" rx="3" />
        <rect x="330" y="120" width="15" height="17" rx="3" />
        <rect x="304" y="154" width="15" height="17" rx="3" />
        <rect x="330" y="154" width="15" height="17" rx="3" />
        <rect x="46" y="170" width="14" height="15" rx="3" />
        <rect x="70" y="170" width="14" height="15" rx="3" />
      </g>

      {/* Road */}
      <rect x="0" y="280" width="420" height="60" fill="#4a3a3d" />
      <g fill="#f2c230">
        <rect x="30" y="308" width="46" height="6" rx="3" />
        <rect x="110" y="308" width="46" height="6" rx="3" />
        <rect x="190" y="308" width="46" height="6" rx="3" />
        <rect x="270" y="308" width="46" height="6" rx="3" />
        <rect x="350" y="308" width="46" height="6" rx="3" />
      </g>

      {/* Location pin */}
      <g transform="translate(210 44)">
        <path
          d="M0 0c-26 0-47 20.5-47 46 0 19.4 12.6 36.6 30 44.5L0 108l17-17.5C34.4 82.6 47 65.4 47 46 47 20.5 26 0 0 0Z"
          fill="#8b1e2d"
        />
        <circle cx="0" cy="44" r="17" fill="#f2c230" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__badge">
            <PinIcon />
            {t('home.hero.badge')}
          </span>
          <h1 className="hero__title">{t('home.hero.title')}</h1>
          <p className="hero__tagline">{t('home.hero.tagline')}</p>
          <p className="hero__description">{t('home.hero.description')}</p>
          <div className="hero__actions">
            <Button
              as={Link}
              to="/complaints"
              variant="secondary"
              size="lg"
              icon={<AlertIcon />}
            >
              {t('home.hero.complaintBtn')}
            </Button>
            <Button
              as={Link}
              to="/local-updates"
              variant="outlineLight"
              size="lg"
              icon={<MegaphoneIcon />}
            >
              {t('home.hero.updatesBtn')}
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <LocalityArt />
        </div>
      </div>
    </section>
  );
}
