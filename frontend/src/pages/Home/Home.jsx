import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Hero from '../../components/Hero/Hero';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import NewsCard from '../../components/NewsCard/NewsCard';
import Button from '../../components/common/Button/Button';
import { MOCK_NEWS } from '../../data/mockNews';
import { COMPLAINT_CATEGORIES } from '../../data/mockComplaints';
import { getPublicPosts } from '../../services/communityService';
import { formatDate } from '../../services/validationService';
import {
  AlertIcon,
  CalendarIcon,
  CategoryIcon,
  ChatIcon,
  LifeBuoyIcon,
  MailIcon,
  MessageIcon,
  MegaphoneIcon,
  PhoneIcon,
  PinIcon,
  SearchIcon,
  UsersIcon,
} from '../../assets/icons';
import './Home.css';

const SERVICE_ITEMS = [
  { key: 'report', to: '/complaints', icon: <AlertIcon />, tone: 'default' },
  { key: 'enquiry', to: '/enquiries', icon: <MessageIcon />, tone: 'default' },
  { key: 'assistance', to: '/enquiries?type=assistance', icon: <LifeBuoyIcon />, tone: 'default' },
  { key: 'track', to: '/track', icon: <SearchIcon />, tone: 'accent' },
];

export default function Home() {
  const { t, translateField, language } = useLanguage();

  /* A small combined feed for "What's Happening": ward notices first, then
     resident board posts, so the two sources are visually distinguished. */
  const happening = useMemo(() => {
    const notices = MOCK_NEWS.slice(0, 3).map((item) => ({
      id: item.id,
      source: item.source,
      category: item.category,
      title: item.title,
      description: item.description,
      date: item.publishedAt,
    }));

    const posts = getPublicPosts()
      .slice(0, 2)
      .map((post) => ({
        id: post.id,
        source: 'resident',
        category: post.category,
        title: post.title,
        description: post.description,
        date: post.createdAt,
      }));

    return [...notices, ...posts];
  }, []);

  const latestUpdates = useMemo(() => MOCK_NEWS.slice(0, 3), []);

  return (
    <div className="home">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Quick services */}
      <section className="home-section" aria-labelledby="home-services-title">
        <div className="home-container">
          <header className="home-heading">
            <h2 id="home-services-title" className="home-heading__title">
              {t('home.services.title')}
            </h2>
            <p className="home-heading__subtitle">{t('home.services.subtitle')}</p>
          </header>

          <div className="home-services">
            {SERVICE_ITEMS.map((item) => (
              <ServiceCard
                key={item.key}
                icon={item.icon}
                tone={item.tone}
                title={t(`home.services.${item.key}.title`)}
                description={t(`home.services.${item.key}.desc`)}
                actionLabel={t(`home.services.${item.key}.cta`)}
                to={item.to}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Complaint categories */}
      <section className="home-section home-section--tinted" aria-labelledby="home-categories-title">
        <div className="home-container">
          <header className="home-heading">
            <h2 id="home-categories-title" className="home-heading__title">
              {t('home.categories.title')}
            </h2>
            <p className="home-heading__subtitle">{t('home.categories.subtitle')}</p>
          </header>

          <div className="home-categories">
            {COMPLAINT_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/complaints?category=${category.id}`}
                className="home-category"
              >
                <span className="home-category__icon" aria-hidden="true">
                  <CategoryIcon category={category.id} />
                </span>
                <span className="home-category__label">{t(category.labelKey)}</span>
              </Link>
            ))}
          </div>

          <p className="home-note">{t('home.categories.hint')}</p>
        </div>
      </section>

      {/* 4. What's happening */}
      <section className="home-section" aria-labelledby="home-happening-title">
        <div className="home-container">
          <header className="home-heading">
            <h2 id="home-happening-title" className="home-heading__title">
              {t('home.happening.title')}
            </h2>
            <p className="home-heading__subtitle">{t('home.happening.subtitle')}</p>
          </header>

          <div className="home-happening">
            {happening.map((entry) => {
              const isWard = entry.source === 'ward';
              return (
                <article key={entry.id} className="home-happening__card">
                  <div className="home-happening__meta">
                    <span
                      className={`home-happening__source home-happening__source--${
                        isWard ? 'ward' : 'resident'
                      }`}
                    >
                      {isWard ? <MegaphoneIcon /> : <UsersIcon />}
                      {isWard ? t('home.happening.adminBadge') : t('home.happening.residentBadge')}
                    </span>
                    <span className="home-happening__date">
                      <CalendarIcon />
                      {formatDate(entry.date, language)}
                    </span>
                  </div>
                  <h3 className="home-happening__title">{translateField(entry.title)}</h3>
                  <p className="home-happening__text">{translateField(entry.description)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Latest local updates */}
      <section className="home-section home-section--tinted" aria-labelledby="home-updates-title">
        <div className="home-container">
          <header className="home-heading home-heading--row">
            <div>
              <h2 id="home-updates-title" className="home-heading__title">
                {t('home.updates.title')}
              </h2>
              <p className="home-heading__subtitle">{t('home.updates.subtitle')}</p>
            </div>
            <Link to="/local-updates" className="home-viewall">
              {t('common.viewAll')}
            </Link>
          </header>

          <div className="home-updates">
            {latestUpdates.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. How it works */}
      <section className="home-section" aria-labelledby="home-how-title">
        <div className="home-container">
          <header className="home-heading">
            <h2 id="home-how-title" className="home-heading__title">
              {t('home.how.title')}
            </h2>
            <p className="home-heading__subtitle">{t('home.how.subtitle')}</p>
          </header>

          <ol className="home-steps">
            {[0, 1, 2].map((index) => (
              <li key={index} className="home-step">
                <span className="home-step__number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="home-step__title">{t(`home.how.steps.${index}.title`)}</h3>
                <p className="home-step__text">{t(`home.how.steps.${index}.desc`)}</p>
              </li>
            ))}
          </ol>

          <p className="home-note home-note--center">{t('home.how.note')}</p>
        </div>
      </section>

      {/* 7. About the portal */}
      <section className="home-section home-section--tinted" aria-labelledby="home-about-title">
        <div className="home-container">
          <div className="home-about">
            <div className="home-about__content">
              <h2 id="home-about-title" className="home-heading__title">
                {t('home.about.title')}
              </h2>
              <p className="home-about__text">{t('home.about.p1')}</p>
              <p className="home-about__text">{t('home.about.p2')}</p>
              <Button as={Link} to="/about" variant="primary" size="md">
                {t('home.about.cta')}
              </Button>
            </div>

            <ul className="home-about__list">
              {[0, 1, 2, 3].map((index) => (
                <li key={index} className="home-about__item">
                  <span className="home-about__bullet" aria-hidden="true">
                    <PinIcon />
                  </span>
                  {t(`home.about.bullets.${index}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Contact */}
      <section className="home-section" aria-labelledby="home-contact-title">
        <div className="home-container">
          <header className="home-heading">
            <h2 id="home-contact-title" className="home-heading__title">
              {t('home.contact.title')}
            </h2>
            <p className="home-heading__subtitle">{t('home.contact.subtitle')}</p>
          </header>

          <div className="home-contact">
            <div className="home-contact__card">
              <span className="home-contact__icon" aria-hidden="true">
                <PhoneIcon />
              </span>
              <p className="home-contact__label">{t('home.contact.phoneLabel')}</p>
              <p className="home-contact__value">{t('home.contact.phoneValue')}</p>
            </div>
            <div className="home-contact__card">
              <span className="home-contact__icon" aria-hidden="true">
                <MailIcon />
              </span>
              <p className="home-contact__label">{t('home.contact.emailLabel')}</p>
              <p className="home-contact__value">{t('home.contact.emailValue')}</p>
            </div>
            <div className="home-contact__card">
              <span className="home-contact__icon" aria-hidden="true">
                <ChatIcon />
              </span>
              <p className="home-contact__label">{t('home.contact.whatsappLabel')}</p>
              <p className="home-contact__value">{t('home.contact.whatsappValue')}</p>
            </div>
            <div className="home-contact__card">
              <span className="home-contact__icon" aria-hidden="true">
                <PinIcon />
              </span>
              <p className="home-contact__label">{t('home.contact.localityLabel')}</p>
              <p className="home-contact__value home-contact__value--locality">
                {t('app.locality')}
              </p>
            </div>
          </div>

          <p className="home-note home-note--center">{t('home.contact.note')}</p>
        </div>
      </section>
    </div>
  );
}
