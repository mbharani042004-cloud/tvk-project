import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import {
  BellIcon,
  ClipboardIcon,
  CloseIcon,
  FileTextIcon,
  GridIcon,
  LogoutIcon,
  MessageIcon,
  UsersIcon,
} from '../../../assets/icons';
import './DashboardSidebar.css';

export const DASHBOARD_SECTIONS = [
  { id: 'overview', labelKey: 'dashboard.nav.overview', icon: <GridIcon /> },
  { id: 'complaints', labelKey: 'dashboard.nav.complaints', icon: <ClipboardIcon /> },
  { id: 'enquiries', labelKey: 'dashboard.nav.enquiries', icon: <FileTextIcon /> },
  { id: 'posts', labelKey: 'dashboard.nav.posts', icon: <UsersIcon /> },
  { id: 'notifications', labelKey: 'dashboard.nav.notifications', icon: <BellIcon /> },
];

export default function DashboardSidebar({ activeSection, onSelect, onClose, isOpen }) {
  const { t } = useLanguage();

  return (
    <aside className={`dash-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="dash-sidebar__head">
        <p className="dash-sidebar__title">{t('dashboard.title')}</p>
        <button
          type="button"
          className="dash-sidebar__close"
          onClick={onClose}
          aria-label={t('common.close')}
        >
          <CloseIcon />
        </button>
      </div>

      <nav className="dash-sidebar__nav" aria-label={t('dashboard.title')}>
        {DASHBOARD_SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`dash-sidebar__item${activeSection === section.id ? ' is-active' : ''}`}
            onClick={() => onSelect(section.id)}
            aria-current={activeSection === section.id ? 'true' : undefined}
          >
            <span className="dash-sidebar__item-icon" aria-hidden="true">
              {section.icon}
            </span>
            <span>{t(section.labelKey)}</span>
          </button>
        ))}
      </nav>

      <div className="dash-sidebar__foot">
        <NavLink to="/complaints" className="dash-sidebar__cta">
          <ClipboardIcon />
          {t('dashboard.cta.newComplaint')}
        </NavLink>
        <NavLink to="/enquiries" className="dash-sidebar__cta">
          <MessageIcon />
          {t('dashboard.cta.newEnquiry')}
        </NavLink>

        <button type="button" className="dash-sidebar__logout" onClick={() => onSelect('logout')}>
          <LogoutIcon />
          {t('dashboard.nav.logout')}
        </button>
      </div>
    </aside>
  );
}
