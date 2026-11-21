import { useLanguage } from '../../context/LanguageContext';
import './LanguageSwitcher.css';

/* Segmented English / Tamil toggle. `variant` lets the navbar style it against
   both the light desktop bar and the dark mobile panel. */
export default function LanguageSwitcher({ variant = 'light' }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`lang-switch lang-switch--${variant}`} role="group" aria-label={t('lang.label')}>
      <button
        type="button"
        className={`lang-switch__option${language === 'en' ? ' is-active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={`lang-switch__option${language === 'ta' ? ' is-active' : ''}`}
        onClick={() => setLanguage('ta')}
        aria-pressed={language === 'ta'}
        lang="ta"
      >
        தமிழ்
      </button>
    </div>
  );
}
