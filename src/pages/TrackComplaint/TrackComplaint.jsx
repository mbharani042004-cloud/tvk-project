import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import ComplaintCard from '../../components/ComplaintCard/ComplaintCard';
import { AlertIcon, CheckCircleIcon, ClockIcon, SearchIcon, ShieldIcon } from '../../assets/icons';
import { findComplaintForTracking } from '../../services/complaintService';
import { formatDateTime, isValidMobile } from '../../services/validationService';
import './TrackComplaint.css';

export default function TrackComplaint() {
  const { t, translateField, language } = useLanguage();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({ id: '', mobile: '' });
  const [errors, setErrors] = useState({});
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const presetId = searchParams.get('id');
    if (presetId) setForm((prev) => ({ ...prev, id: presetId }));
  }, [searchParams]);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.id.trim()) nextErrors.id = t('track.idRequired');
    if (!isValidMobile(form.mobile)) nextErrors.mobile = t('track.mobileRequired');

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSearching(true);
    setResult(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));

      const response = findComplaintForTracking(form.id, form.mobile);
      if (!response.ok) {
        setErrors({
          form: response.reason === 'notFound' ? t('track.notFound') : t('track.mismatch'),
        });
      } else {
        setResult(response.complaint);
      }
    } finally {
      setSearching(false);
    }
  };

  const reset = () => {
    setForm({ id: '', mobile: '' });
    setResult(null);
    setErrors({});
  };

  const sortedHistory = result
    ? [...(result.statusHistory || [])].sort(
        (a, b) => new Date(a.at).getTime() - new Date(b.at).getTime()
      )
    : [];

  const latestEntry = sortedHistory[sortedHistory.length - 1];

  return (
    <div className="track">
      <header className="track-header">
        <div className="track-container">
          <h1 className="track-header__title">{t('track.title')}</h1>
          <p className="track-header__subtitle">{t('track.subtitle')}</p>
        </div>
      </header>

      <div className="track-container track-body">
        <form className="track-form" onSubmit={handleSubmit} noValidate>
          <h2 className="track-form__title">{t('track.formTitle')}</h2>

          <div className="track-form__fields">
            <Input
              id="track-id"
              label={t('track.idLabel')}
              required
              value={form.id}
              onChange={updateField('id')}
              error={errors.id}
              placeholder={t('track.idPlaceholder')}
              autoComplete="off"
            />

            <Input
              id="track-mobile"
              label={t('track.mobileLabel')}
              required
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.mobile}
              onChange={updateField('mobile')}
              error={errors.mobile}
              hint={t('track.mobileHelp')}
              autoComplete="tel"
            />
          </div>

          {errors.form && (
            <p className="track-form__error" role="alert">
              <AlertIcon />
              {errors.form}
            </p>
          )}

          <div className="track-form__actions">
            <Button type="submit" variant="primary" size="lg" loading={searching} icon={<SearchIcon />}>
              {searching ? t('track.searching') : t('track.submit')}
            </Button>
            {result && (
              <Button variant="ghost" onClick={reset} icon={<SearchIcon />}>
                {t('track.lookupAnother')}
              </Button>
            )}
          </div>

          <p className="track-form__demo">
            <ShieldIcon />
            {t('track.demoHint')}
          </p>
        </form>

        {result && (
          <section className="track-result" aria-live="polite">
            <h2 className="track-result__title">{t('track.resultTitle')}</h2>

            <ComplaintCard complaint={result} />

            <div className="track-latest">
              <span className="track-latest__icon" aria-hidden="true">
                <ClockIcon />
              </span>
              <div>
                <p className="track-latest__label">{t('track.latestUpdate')}</p>
                <p className="track-latest__text">
                  {latestEntry
                    ? latestEntry.note
                      ? translateField(latestEntry.note)
                      : t(`status.${latestEntry.status}`)
                    : t('track.noUpdate')}
                </p>
                {latestEntry && (
                  <p className="track-latest__date">{formatDateTime(latestEntry.at, language)}</p>
                )}
              </div>
            </div>

            <div className="track-history">
              <h3 className="track-history__title">{t('track.historyTitle')}</h3>
              <ol className="track-history__list">
                {sortedHistory.map((entry, index) => (
                  <li key={`${entry.status}-${entry.at}`} className="track-history__item">
                    <span
                      className={`track-history__marker track-history__marker--${entry.status}`}
                      aria-hidden="true"
                    >
                      <CheckCircleIcon />
                    </span>
                    <div className="track-history__content">
                      <p className="track-history__status">{t(`status.${entry.status}`)}</p>
                      <p className="track-history__date">{formatDateTime(entry.at, language)}</p>
                      {entry.note && (
                        <p className="track-history__note">{translateField(entry.note)}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
