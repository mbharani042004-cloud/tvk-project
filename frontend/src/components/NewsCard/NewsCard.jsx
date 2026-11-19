import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import { CalendarIcon, CategoryIcon, MegaphoneIcon, UsersIcon } from '../../assets/icons';
import { formatDate } from '../../services/validationService';
import './NewsCard.css';

/* Update / notice card. Opens a detail modal with the full text so the same
   component works on the homepage and the Local Updates page. */
export default function NewsCard({ item }) {
  const { t, translateField, language } = useLanguage();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const isWard = item.source === 'ward';
  const title = translateField(item.title);

  return (
    <article className="news-card">
      <div className="news-card__media">
        {item.image ? (
          <img src={item.image} alt={title} className="news-card__img" loading="lazy" />
        ) : (
          <span className="news-card__placeholder" aria-hidden="true">
            <CategoryIcon category={item.category} />
          </span>
        )}
      </div>

      <div className="news-card__body">
        <div className="news-card__meta">
          <span className="news-card__category">{t(`categories.${item.category}`)}</span>
          <span className={`news-card__source news-card__source--${isWard ? 'ward' : 'resident'}`}>
            {isWard ? <MegaphoneIcon /> : <UsersIcon />}
            {isWard ? t('home.happening.adminBadge') : t('home.happening.residentBadge')}
          </span>
        </div>

        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{translateField(item.description)}</p>

        <div className="news-card__footer">
          <span className="news-card__date">
            <CalendarIcon />
            {formatDate(item.publishedAt, language)}
          </span>
          <button type="button" className="news-card__more" onClick={() => setDetailsOpen(true)}>
            {t('common.readMore')}
          </button>
        </div>
      </div>

      <Modal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={t('updates.detailsTitle')}
        closeLabel={t('common.close')}
        size="md"
        footer={
          <Button variant="primary" onClick={() => setDetailsOpen(false)}>
            {t('common.close')}
          </Button>
        }
      >
        <h4 className="news-card__modal-title">{title}</h4>
        <ul className="news-card__modal-meta">
          <li>
            <strong>{t('common.category')}:</strong> {t(`categories.${item.category}`)}
          </li>
          <li>
            <strong>{t('updates.sourceLabel')}:</strong>{' '}
            {isWard ? t('updates.sourceWard') : t('updates.sourceResident')}
          </li>
          <li>
            <strong>{t('updates.publishedOn')}:</strong> {formatDate(item.publishedAt, language)}
          </li>
        </ul>
        <p className="news-card__modal-text">{translateField(item.description)}</p>
        <p className="news-card__modal-note">{t('common.demoNotice')}</p>
      </Modal>
    </article>
  );
}
