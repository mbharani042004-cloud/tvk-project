import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { CloseIcon, GridIcon, LoginIcon, LogoutIcon, MenuIcon, PinIcon, UserPlusIcon } from '../../assets/icons';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/about', key: 'nav.about' },
  { to: '/local-updates', key: 'nav.updates' },
  { to: '/complaints', key: 'nav.complaints' },
  { to: '/enquiries', key: 'nav.enquiries' },
  { to: '/community', key: 'nav.community' },
  { to: '/track', key: 'nav.track' },
];

export default function Navbar() {
  const { t, language } = useLanguage();
  const { isAuthenticated, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  /* Close the mobile panel whenever the route changes. */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, language]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    signOut();
  };

  const linkClass = ({ isActive }) => `navbar__link${isActive ? ' is-active' : ''}`;

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand" aria-label={t('app.name')}>
          <span className="navbar__mark" aria-hidden="true">
            <PinIcon />
          </span>
          <span className="navbar__brand-text">
            <span className="navbar__brand-title">{t('app.shortWard')}</span>
            <span className="navbar__brand-sub">{t('app.tagline')}</span>
          </span>
        </Link>

        <nav className="navbar__nav" aria-label={t('app.name')}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar__cta navbar__cta--primary">
                <GridIcon />
                <span>{t('nav.dashboard')}</span>
              </Link>
              <button type="button" className="navbar__cta navbar__cta--outline" onClick={handleSignOut}>
                <LogoutIcon />
                <span>{t('nav.logout')}</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="navbar__cta navbar__cta--outline">
                <UserPlusIcon />
                <span>{t('nav.signup')}</span>
              </Link>
              <Link to="/login" className="navbar__cta navbar__cta--primary">
                <LoginIcon />
                <span>{t('nav.login')}</span>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`navbar__mobile${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <nav className="navbar__mobile-nav" aria-label={t('app.name')}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__mobile-actions">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar__cta navbar__cta--primary navbar__cta--block">
                <GridIcon />
                <span>{t('nav.dashboard')}</span>
              </Link>
              <button
                type="button"
                className="navbar__cta navbar__cta--outline navbar__cta--block"
                onClick={handleSignOut}
              >
                <LogoutIcon />
                <span>{t('nav.logout')}</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="navbar__cta navbar__cta--outline navbar__cta--block">
                <UserPlusIcon />
                <span>{t('nav.signup')}</span>
              </Link>
              <Link to="/login" className="navbar__cta navbar__cta--primary navbar__cta--block">
                <LoginIcon />
                <span>{t('nav.login')}</span>
              </Link>
            </>
          )}
        </div>

        <div className="navbar__mobile-lang">
          <LanguageSwitcher variant="dark" />
        </div>
      </div>
    </header>
  );
}
