import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button/Button';
import { HomeIcon, PinIcon } from '../../assets/icons';
import './NotFound.css';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="notfound">
      <div className="notfound__card">
        <span className="notfound__icon" aria-hidden="true">
          <PinIcon />
        </span>
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">{t('notFound.title')}</h1>
        <p className="notfound__text">{t('notFound.message')}</p>
        <Button as={Link} to="/" variant="primary" size="lg" icon={<HomeIcon />}>
          {t('notFound.cta')}
        </Button>
      </div>
    </div>
  );
}
