import { useLanguage } from '../../../context/LanguageContext';
import { LogoutIcon, MenuIcon } from '../../../assets/icons';
import './DashboardHeader.css';

function initialsOf(name) {
  return String(name || 'R')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export default function DashboardHeader({ user, sectionLabel, onOpenSidebar, onLogout }) {
  const { t } = useLanguage();

  return (
    <header className="dash-header">
      <button
        type="button"
        className="dash-header__menu"
        onClick={onOpenSidebar}
        aria-label={t('dashboard.nav.openMenu')}
      >
        <MenuIcon />
      </button>

      <div className="dash-header__titles">
        <p className="dash-header__section">{sectionLabel}</p>
        <p className="dash-header__welcome">
          {t('dashboard.welcome')}, <strong>{user?.name || t('dashboard.welcomeFallback')}</strong>
        </p>
      </div>

      <div className="dash-header__actions">
        <span className="dash-header__avatar" aria-hidden="true">
          {initialsOf(user?.name)}
        </span>
        <button type="button" className="dash-header__logout" onClick={onLogout}>
          <LogoutIcon />
          <span>{t('dashboard.nav.logout')}</span>
        </button>
      </div>
    </header>
  );
}
