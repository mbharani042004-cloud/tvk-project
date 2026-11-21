import './EmptyState.css';

export default function EmptyState({ icon = null, title, description = '', action = null }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        {icon || (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="7" y1="9" x2="17" y2="9" strokeLinecap="round" />
            <line x1="7" y1="13" x2="14" y2="13" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__text">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
