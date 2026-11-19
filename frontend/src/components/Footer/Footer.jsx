import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import { ChatIcon, MailIcon, PhoneIcon, PinIcon, ShieldIcon } from '../../assets/icons';
import './Footer.css';

const QUICK_LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/local-updates', key: 'nav.updates' },
];

const COMMUNITY_LINKS = [
  { to: '/complaints', key: 'nav.complaints' },
  { to: '/enquiries', key: 'nav.enquiries' },
  { to: '/community', key: 'nav.community' },
  { to: '/track', key: 'nav.track' },
];

export default function Footer() {
  const { t } = useLanguage();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <div className="footer__brand">
              <span className="footer__mark" aria-hidden="true">
                <PinIcon />
              </span>
              <div>
                <p className="footer__brand-title">{t('app.ward')}</p>
                <p className="footer__brand-sub">{t('app.tagline')}</p>
              </div>
            </div>
            <p className="footer__text">{t('footer.aboutText')}</p>
          </div>

          <nav className="footer__col" aria-label={t('footer.quickLinks')}>
            <h2 className="footer__heading">{t('footer.quickLinks')}</h2>
            <ul className="footer__list">
              {QUICK_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="footer__link">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label={t('footer.communityLinks')}>
            <h2 className="footer__heading">{t('footer.communityLinks')}</h2>
            <ul className="footer__list">
              {COMMUNITY_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="footer__link">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__heading">{t('footer.contact')}</h2>
            <ul className="footer__list footer__list--contact">
              <li className="footer__contact-item">
                <PhoneIcon />
                <span>
                  <strong>{t('footer.phoneLabel')}:</strong> {t('footer.placeholder')}
                </span>
              </li>
              <li className="footer__contact-item">
                <MailIcon />
                <span>
                  <strong>{t('footer.emailLabel')}:</strong> {t('footer.placeholder')}
                </span>
              </li>
              <li className="footer__contact-item">
                <ChatIcon />
                <span>
                  <strong>{t('home.contact.whatsappLabel')}:</strong> {t('footer.placeholder')}
                </span>
              </li>
              <li className="footer__contact-item">
                <PinIcon />
                <span>
                  <strong>{t('footer.locality')}:</strong> {t('footer.localityValue')}
                </span>
              </li>
            </ul>
            <button type="button" className="footer__privacy" onClick={() => setPrivacyOpen(true)}>
              <ShieldIcon />
              <span>{t('footer.privacy')}</span>
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__bottom-text">
            © {year} {t('app.name')}. {t('footer.rights')}
          </p>
          <p className="footer__bottom-note">{t('footer.demoNote')}</p>
        </div>
      </div>

      <Modal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title={t('footer.privacy')}
        closeLabel={t('common.close')}
        size="md"
        footer={
          <Button variant="primary" onClick={() => setPrivacyOpen(false)}>
            {t('common.close')}
          </Button>
        }
      >
        <p className="footer__privacy-text">{t('footer.privacyText')}</p>
        <p className="footer__privacy-text">{t('common.demoNotice')}</p>
      </Modal>
    </footer>
  );
}
