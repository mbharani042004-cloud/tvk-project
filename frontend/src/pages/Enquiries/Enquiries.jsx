import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button/Button';
import Input, { Select, Textarea } from '../../components/common/Input/Input';
import { CheckCircleIcon, MessageIcon, SearchIcon, ShieldIcon, UploadIcon } from '../../assets/icons';
import { ENQUIRY_CATEGORIES } from '../../data/mockComplaints';
import { addEnquiry } from '../../services/enquiryService';
import { isRequired, isValidEmail, isValidMobile, minLength } from '../../services/validationService';
import './Enquiries.css';

const EMPTY_FORM = {
  name: '',
  mobile: '',
  email: '',
  category: '',
  subject: '',
  message: '',
};

export default function Enquiries() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const presetType = searchParams.get('type') || '';

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    if (!presetType) return;
    setForm((prev) => ({ ...prev, category: prev.category || presetType }));
  }, [presetType]);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.name || '',
      mobile: prev.mobile || user.mobile || '',
      email: prev.email || user.email || '',
    }));
  }, [user]);

  const categoryOptions = useMemo(
    () => ENQUIRY_CATEGORIES.map((item) => ({ value: item.id, label: t(item.labelKey) })),
    [t]
  );

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = () => {
    const next = {};

    if (!isRequired(form.name)) next.name = t('enquiries.validation.name');
    if (!isValidMobile(form.mobile)) next.mobile = t('enquiries.validation.mobile');
    if (form.email && !isValidEmail(form.email)) next.email = t('enquiries.validation.email');
    if (!isRequired(form.category)) next.category = t('enquiries.validation.category');
    if (!minLength(form.subject, 4)) next.subject = t('enquiries.validation.subject');
    if (!minLength(form.message, 15)) next.message = t('enquiries.validation.message');

    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`enquiry-${firstKey}`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      /* Brief pause so the loading feedback is visible in this demo. */
      await new Promise((resolve) => setTimeout(resolve, 400));

      const record = addEnquiry(form);
      setSubmitted(record);
      setForm(EMPTY_FORM);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setErrors({ form: t('enquiries.validation.message') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="enquiries">
      <header className="enquiries-header">
        <div className="enquiries-container">
          <h1 className="enquiries-header__title">{t('enquiries.title')}</h1>
          <p className="enquiries-header__subtitle">{t('enquiries.subtitle')}</p>
        </div>
      </header>

      <div className="enquiries-container enquiries-body">
        {submitted ? (
          <section className="enquiries-success" aria-live="polite">
            <span className="enquiries-success__icon" aria-hidden="true">
              <CheckCircleIcon />
            </span>
            <h2 className="enquiries-success__title">{t('enquiries.successTitle')}</h2>
            <p className="enquiries-success__text">{t('enquiries.successBody')}</p>

            <div className="enquiries-success__ref">
              <span className="enquiries-success__ref-label">{t('enquiries.reference')}</span>
              <strong className="enquiries-success__ref-value">{submitted.id}</strong>
            </div>

            <div className="enquiries-success__actions">
              <Button variant="primary" onClick={() => setSubmitted(null)} icon={<MessageIcon />}>
                {t('enquiries.another')}
              </Button>
              <Button as={Link} to="/local-updates" variant="outline" icon={<SearchIcon />}>
                {t('common.viewAll')}
              </Button>
            </div>
          </section>
        ) : (
          <div className="enquiries-layout">
            <form className="enquiries-form" onSubmit={handleSubmit} noValidate>
              <h2 className="enquiries-form__title">{t('enquiries.formTitle')}</h2>

              <div className="enquiries-form__grid">
                <Input
                  id="enquiry-name"
                  label={t('enquiries.name')}
                  required
                  value={form.name}
                  onChange={updateField('name')}
                  error={errors.name}
                  autoComplete="name"
                  maxLength={80}
                />

                <Input
                  id="enquiry-mobile"
                  label={t('enquiries.mobile')}
                  required
                  type="tel"
                  inputMode="numeric"
                  value={form.mobile}
                  onChange={updateField('mobile')}
                  error={errors.mobile}
                  autoComplete="tel"
                  maxLength={10}
                />

                <Input
                  id="enquiry-email"
                  label={t('enquiries.email')}
                  optional
                  optionalLabel={t('common.optional')}
                  type="email"
                  value={form.email}
                  onChange={updateField('email')}
                  error={errors.email}
                  autoComplete="email"
                />

                <Select
                  id="enquiry-category"
                  label={t('enquiries.category')}
                  required
                  placeholder={t('enquiries.selectCategory')}
                  options={categoryOptions}
                  value={form.category}
                  onChange={updateField('category')}
                  error={errors.category}
                />

                <div className="enquiries-form__full">
                  <Input
                    id="enquiry-subject"
                    label={t('enquiries.subject')}
                    required
                    value={form.subject}
                    onChange={updateField('subject')}
                    error={errors.subject}
                    maxLength={120}
                  />
                </div>
              </div>

              <Textarea
                id="enquiry-message"
                label={t('enquiries.message')}
                required
                rows={6}
                value={form.message}
                onChange={updateField('message')}
                error={errors.message}
                maxLength={1200}
              />

              <p className="enquiries-form__privacy">
                <ShieldIcon />
                {t('common.demoNotice')}
              </p>

              <div className="enquiries-form__actions">
                <Button type="submit" variant="primary" size="lg" loading={submitting} icon={<UploadIcon />}>
                  {submitting ? t('enquiries.submitting') : t('enquiries.submit')}
                </Button>
              </div>
            </form>

            <aside className="enquiries-aside">
              <h2 className="enquiries-aside__title">{t('home.services.assistance.title')}</h2>
              <p className="enquiries-aside__text">{t('home.services.assistance.desc')}</p>
              <ul className="enquiries-aside__list">
                <li>{t('home.services.report.desc')}</li>
                <li>{t('home.services.track.desc')}</li>
              </ul>
              <Button as={Link} to="/community" variant="outline" icon={<MessageIcon />}>
                {t('nav.community')}
              </Button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
