import { useLanguage } from '../../context/LanguageContext';
import { CalendarIcon, CategoryIcon } from '../../assets/icons';
import { formatDate } from '../../services/validationService';
import './ComplaintCard.css';

/* Summary card for a single complaint. Used on the dashboard and the tracking
   result so complaint presentation stays identical everywhere. */
export default function ComplaintCard({ complaint, showImage = true }) {
  const { t, translateField, language } = useLanguage();

  return (
    <article className="complaint-card">
      <header className="complaint-card__header">
        <div className="complaint-card__identity">
          <span className="complaint-card__icon" aria-hidden="true">
            <CategoryIcon category={complaint.category} />
          </span>
          <div>
            <p className="complaint-card__ref">{complaint.id}</p>
            <p className="complaint-card__category">{t(`categories.${complaint.category}`)}</p>
          </div>
        </div>
        <span className={`complaint-card__status complaint-card__status--${complaint.status}`}>
          {t(`status.${complaint.status}`)}
        </span>
      </header>

      <dl className="complaint-card__meta">
        <div className="complaint-card__meta-item">
          <dt>{t('complaints.street')}</dt>
          <dd>{complaint.street}</dd>
        </div>
        {complaint.landmark && (
          <div className="complaint-card__meta-item">
            <dt>{t('complaints.landmark')}</dt>
            <dd>{complaint.landmark}</dd>
          </div>
        )}
        <div className="complaint-card__meta-item">
          <dt>{t('common.priority')}</dt>
          <dd>{t(`priority.${complaint.priority}`)}</dd>
        </div>
        <div className="complaint-card__meta-item">
          <dt>{t('common.date')}</dt>
          <dd>
            <CalendarIcon />
            {formatDate(complaint.createdAt, language)}
          </dd>
        </div>
      </dl>

      <p className="complaint-card__text">{translateField(complaint.description)}</p>

      {showImage && complaint.image && (
        <img
          className="complaint-card__image"
          src={complaint.image}
          alt={t('complaints.previewAlt')}
          loading="lazy"
        />
      )}
    </article>
  );
}
