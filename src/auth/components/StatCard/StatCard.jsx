import './StatCard.css';

/* Small metric tile used in the dashboard overview. */
export default function StatCard({ icon, label, value, tone = 'primary' }) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <span className="stat-card__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="stat-card__content">
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__label">{label}</p>
      </div>
    </article>
  );
}
