import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import DashboardSidebar, { DASHBOARD_SECTIONS } from '../components/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import StatCard from '../components/StatCard/StatCard';
import ComplaintCard from '../../components/ComplaintCard/ComplaintCard';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Button from '../../components/common/Button/Button';
import {
  BellIcon,
  ClipboardIcon,
  ClockIcon,
  FileTextIcon,
  MailIcon,
  MessageIcon,
  PhoneIcon,
  PinIcon,
  ShieldIcon,
  UsersIcon,
} from '../../assets/icons';
import { getComplaintsForUser, getComplaintStats } from '../../services/complaintService';
import { getEnquiriesForUser } from '../../services/enquiryService';
import { getPostsForUser } from '../../services/communityService';
import { ENQUIRY_CATEGORIES } from '../../data/mockComplaints';
import { formatDate, formatDateTime, normaliseMobile } from '../../services/validationService';
import './Dashboard.css';

/* Resolve the translation key that labels an enquiry category. */
function enquiryLabelKey(category) {
  return (
    ENQUIRY_CATEGORIES.find((item) => item.id === category)?.labelKey ?? 'categories.other'
  );
}

export default function Dashboard() {
  const { t, translateField, language } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const complaints = useMemo(() => getComplaintsForUser(user), [user]);
  const enquiries = useMemo(() => getEnquiriesForUser(user), [user]);
  const posts = useMemo(() => getPostsForUser(user), [user]);
  const stats = useMemo(() => getComplaintStats(complaints), [complaints]);

  const notifications = useMemo(() => {
    const items = [];

    complaints.forEach((complaint) => {
      const history = complaint.statusHistory || [];
      const latest = history[history.length - 1];
      if (latest) {
        items.push({
          id: `${complaint.id}-${latest.at}`,
          reference: complaint.id,
          text: `${t('dashboard.notif.statusChanged')}: ${t(`status.${latest.status}`)}`,
          date: latest.at,
        });
      }
    });

    enquiries.forEach((enquiry) => {
      items.push({
        id: enquiry.id,
        reference: enquiry.id,
        text: t('dashboard.notif.submitted'),
        date: enquiry.createdAt,
      });
    });

    return items
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [complaints, enquiries, t]);

  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const handleSelect = (sectionId) => {
    setSidebarOpen(false);
    if (sectionId === 'logout') {
      signOut();
      navigate('/');
      return;
    }
    setActiveSection(sectionId);
  };

  const activeLabel =
    DASHBOARD_SECTIONS.find((section) => section.id === activeSection)?.labelKey
      ? t(DASHBOARD_SECTIONS.find((section) => section.id === activeSection).labelKey)
      : t('dashboard.nav.overview');

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar-slot">
        <DashboardSidebar
          activeSection={activeSection}
          onSelect={handleSelect}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="dashboard__scrim"
          onClick={() => setSidebarOpen(false)}
          aria-label={t('common.close')}
        />
      )}

      <div className="dashboard__content">
        <DashboardHeader
          user={user}
          sectionLabel={activeLabel}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={() => handleSelect('logout')}
        />

        <div className="dashboard__body">
          {activeSection === 'overview' && (
            <>
              <section className="dashboard__section" aria-labelledby="dash-profile-title">
                <h2 id="dash-profile-title" className="dashboard__section-title">
                  {t('dashboard.profileTitle')}
                </h2>
                <div className="dashboard-profile">
                  <span className="dashboard-profile__avatar" aria-hidden="true">
                    {String(user?.name || 'R').charAt(0).toUpperCase()}
                  </span>
                  <div className="dashboard-profile__info">
                    <p className="dashboard-profile__name">{user?.name}</p>
                    <ul className="dashboard-profile__list">
                      <li>
                        <PhoneIcon />
                        {normaliseMobile(user?.mobile) || t('common.none')}
                      </li>
                      <li>
                        <MailIcon />
                        {user?.email || t('common.none')}
                      </li>
                      <li>
                        <PinIcon />
                        {user?.street || t('common.none')}
                      </li>
                      <li>
                        <ClockIcon />
                        {t('dashboard.memberSince')}: {formatDate(user?.createdAt, language)}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="dashboard__section" aria-labelledby="dash-stats-title">
                <h2 id="dash-stats-title" className="dashboard__section-title">
                  {t('dashboard.statsTitle')}
                </h2>
                <div className="dashboard__stats">
                  <StatCard
                    icon={<ClipboardIcon />}
                    label={t('dashboard.stats.total')}
                    value={stats.total}
                    tone="primary"
                  />
                  <StatCard
                    icon={<ClockIcon />}
                    label={t('dashboard.stats.pending')}
                    value={stats.pending}
                    tone="warning"
                  />
                  <StatCard
                    icon={<ShieldIcon />}
                    label={t('dashboard.stats.resolved')}
                    value={stats.resolved}
                    tone="success"
                  />
                  <StatCard
                    icon={<FileTextIcon />}
                    label={t('dashboard.stats.enquiries')}
                    value={enquiries.length}
                    tone="info"
                  />
                  <StatCard
                    icon={<UsersIcon />}
                    label={t('dashboard.stats.posts')}
                    value={posts.length}
                    tone="accent"
                  />
                </div>
              </section>

              <section className="dashboard__section" aria-labelledby="dash-recent-title">
                <div className="dashboard__section-head">
                  <h2 id="dash-recent-title" className="dashboard__section-title">
                    {t('dashboard.sections.complaints')}
                  </h2>
                  <button
                    type="button"
                    className="dashboard__link"
                    onClick={() => setActiveSection('complaints')}
                  >
                    {t('common.viewAll')}
                  </button>
                </div>

                {complaints.length > 0 ? (
                  <div className="dashboard__complaints">
                    {complaints.slice(0, 3).map((complaint) => (
                      <ComplaintCard key={complaint.id} complaint={complaint} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<ClipboardIcon />}
                    title={t('dashboard.empty.complaints')}
                    action={
                      <Button as={Link} to="/complaints" variant="primary" icon={<ClipboardIcon />}>
                        {t('dashboard.cta.newComplaint')}
                      </Button>
                    }
                  />
                )}
              </section>
            </>
          )}

          {activeSection === 'complaints' && (
            <section className="dashboard__section" aria-labelledby="dash-my-complaints">
              <h2 id="dash-my-complaints" className="dashboard__section-title">
                {t('dashboard.sections.complaints')}
              </h2>
              {complaints.length > 0 ? (
                <div className="dashboard__complaints">
                  {complaints.map((complaint) => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<ClipboardIcon />}
                  title={t('dashboard.empty.complaints')}
                  action={
                    <Button as={Link} to="/complaints" variant="primary" icon={<ClipboardIcon />}>
                      {t('dashboard.cta.newComplaint')}
                    </Button>
                  }
                />
              )}
            </section>
          )}

          {activeSection === 'enquiries' && (
            <section className="dashboard__section" aria-labelledby="dash-my-enquiries">
              <h2 id="dash-my-enquiries" className="dashboard__section-title">
                {t('dashboard.sections.enquiries')}
              </h2>
              {enquiries.length > 0 ? (
                <div className="dashboard__rows">
                  {enquiries.map((enquiry) => (
                    <article key={enquiry.id} className="dashboard-row">
                      <div className="dashboard-row__head">
                        <span className="dashboard-row__ref">{enquiry.id}</span>
                        <span className="dashboard-row__badge">{t(enquiryLabelKey(enquiry.category))}</span>
                      </div>
                      <h3 className="dashboard-row__title">{translateField(enquiry.subject) || enquiry.subject}</h3>
                      <p className="dashboard-row__text">{translateField(enquiry.message)}</p>
                      <p className="dashboard-row__date">{formatDateTime(enquiry.createdAt, language)}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<FileTextIcon />}
                  title={t('dashboard.empty.enquiries')}
                  action={
                    <Button as={Link} to="/enquiries" variant="primary" icon={<MessageIcon />}>
                      {t('dashboard.cta.newEnquiry')}
                    </Button>
                  }
                />
              )}
            </section>
          )}

          {activeSection === 'posts' && (
            <section className="dashboard__section" aria-labelledby="dash-my-posts">
              <h2 id="dash-my-posts" className="dashboard__section-title">
                {t('dashboard.sections.posts')}
              </h2>
              {posts.length > 0 ? (
                <div className="dashboard__rows">
                  {posts.map((post) => (
                    <article key={post.id} className="dashboard-row">
                      <div className="dashboard-row__head">
                        <span className="dashboard-row__ref">{post.id}</span>
                        <span className={`dashboard-row__badge dashboard-row__badge--${post.status}`}>
                          {t(`moderation.${post.status}`)}
                        </span>
                      </div>
                      <h3 className="dashboard-row__title">{translateField(post.title)}</h3>
                      <p className="dashboard-row__text">{translateField(post.description)}</p>
                      <p className="dashboard-row__date">
                        {t(`categories.${post.category}`)} · {formatDate(post.createdAt, language)}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<UsersIcon />}
                  title={t('dashboard.empty.posts')}
                  action={
                    <Button as={Link} to="/community" variant="primary" icon={<UsersIcon />}>
                      {t('dashboard.cta.newPost')}
                    </Button>
                  }
                />
              )}
            </section>
          )}

          {activeSection === 'notifications' && (
            <section className="dashboard__section" aria-labelledby="dash-notifications">
              <h2 id="dash-notifications" className="dashboard__section-title">
                {t('dashboard.sections.notifications')}
              </h2>
              {notifications.length > 0 ? (
                <ul className="dashboard-notifs">
                  {notifications.map((item) => (
                    <li key={item.id} className="dashboard-notif">
                      <span className="dashboard-notif__icon" aria-hidden="true">
                        <BellIcon />
                      </span>
                      <div>
                        <p className="dashboard-notif__text">{item.text}</p>
                        <p className="dashboard-notif__meta">
                          {item.reference} · {formatDateTime(item.date, language)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState icon={<BellIcon />} title={t('dashboard.empty.notifications')} />
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
