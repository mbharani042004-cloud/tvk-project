import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../../assets/icons';
import './ServiceCard.css';

/* Reusable quick-service tile used on the homepage. */
export default function ServiceCard({ icon, title, description, actionLabel, to, tone = 'default' }) {
  return (
    <article className={`service-card service-card--${tone}`}>
      <span className="service-card__icon" aria-hidden="true">
        {icon}
      </span>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__text">{description}</p>
      <Link to={to} className="service-card__action">
        <span>{actionLabel}</span>
        <ChevronRightIcon />
      </Link>
    </article>
  );
}
