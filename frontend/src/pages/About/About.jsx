import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button/Button';
import { CheckCircleIcon, MegaphoneIcon, ShieldIcon, UsersIcon } from '../../assets/icons';
import './About.css';

const USE_ITEM_KEYS = [0, 1, 2, 3, 4];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="about">
      <header className="about-header">
        <div className="about-container">
          <span className="about-header__badge">
            <ShieldIcon />
            {t('app.name')}
          </span>
          <h1 className="about-header__title">{t('about.title')}</h1>
          <p className="about-header__subtitle">{t('about.subtitle')}</p>
        </div>
      </header>

      <div className="about-container about-body">
        <section className="about-block">
          <span className="about-block__icon" aria-hidden="true">
            <MegaphoneIcon />
          </span>
          <div>
            <h2 className="about-block__title">{t('about.why.title')}</h2>
            <p className="about-block__text">{t('about.why.text')}</p>
          </div>
        </section>

        <section className="about-block">
          <span className="about-block__icon" aria-hidden="true">
            <ShieldIcon />
          </span>
          <div>
            <h2 className="about-block__title">{t('about.purpose.title')}</h2>
            <p className="about-block__text">{t('about.purpose.text')}</p>
          </div>
        </section>

        <section className="about-block">
          <span className="about-block__icon" aria-hidden="true">
            <CheckCircleIcon />
          </span>
          <div>
            <h2 className="about-block__title">{t('about.use.title')}</h2>
            <ul className="about-list">
              {USE_ITEM_KEYS.map((index) => (
                <li key={index} className="about-list__item">
                  <CheckCircleIcon />
                  <span>{t(`about.use.items.${index}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about-block">
          <span className="about-block__icon" aria-hidden="true">
            <UsersIcon />
          </span>
          <div>
            <h2 className="about-block__title">{t('about.handling.title')}</h2>
            <p className="about-block__text">{t('about.handling.text')}</p>
          </div>
        </section>

        <section className="about-block">
          <span className="about-block__icon" aria-hidden="true">
            <UsersIcon />
          </span>
          <div>
            <h2 className="about-block__title">{t('about.participation.title')}</h2>
            <p className="about-block__text">{t('about.participation.text')}</p>
          </div>
        </section>

        <aside className="about-cta">
          <p className="about-cta__text">{t('common.demoNotice')}</p>
          <Button as={Link} to="/local-updates" variant="primary" size="md" icon={<MegaphoneIcon />}>
            {t('about.cta')}
          </Button>
        </aside>
      </div>
    </div>
  );
}
