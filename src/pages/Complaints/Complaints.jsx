import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button/Button';
import Input, { Select, Textarea } from '../../components/common/Input/Input';
import {
  CameraIcon,
  CheckCircleIcon,
  ClipboardIcon,
  CloseIcon,
  LifeBuoyIcon,
  SearchIcon,
  ShieldIcon,
  UploadIcon,
} from '../../assets/icons';
import { COMPLAINT_CATEGORIES, PRIORITY_LEVELS } from '../../data/mockComplaints';
import { addComplaint } from '../../services/complaintService';
import {
  isRequired,
  isValidEmail,
  isValidMobile,
  minLength,
  readFileAsDataUrl,
  validateImageFile,
} from '../../services/validationService';
import './Complaints.css';

const EMPTY_FORM = {
  residentName: '',
  mobile: '',
  email: '',
  category: '',
  street: '',
  landmark: '',
  description: '',
  priority: '',
};

export default function Complaints() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef(null);

  const presetCategory = searchParams.get('category') || '';

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  /* Prefill from ?category= and from the signed-in resident, if any. */
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      category: presetCategory || prev.category,
    }));
  }, [presetCategory]);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      residentName: prev.residentName || user.name || '',
      mobile: prev.mobile || user.mobile || '',
      email: prev.email || user.email || '',
      street: prev.street || user.street || '',
    }));
  }, [user]);

  const categoryOptions = useMemo(
    () => COMPLAINT_CATEGORIES.map((item) => ({ value: item.id, label: t(item.labelKey) })),
    [t]
  );

  const priorityOptions = useMemo(
    () => PRIORITY_LEVELS.map((item) => ({ value: item.id, label: t(item.labelKey) })),
    [t]
  );

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileError = validateImageFile(file, t('complaints.validation'));
    if (fileError) {
      setErrors((prev) => ({ ...prev, image: fileError }));
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setImage({ dataUrl, name: file.name });
      setErrors((prev) => ({ ...prev, image: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, image: t('complaints.validation.imageType') }));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    const next = {};

    if (!isRequired(form.residentName)) next.residentName = t('complaints.validation.name');
    else if (!minLength(form.residentName, 3)) next.residentName = t('complaints.validation.nameShort');

    if (!isValidMobile(form.mobile)) next.mobile = t('complaints.validation.mobile');
    if (form.email && !isValidEmail(form.email)) next.email = t('complaints.validation.email');
    if (!isRequired(form.category)) next.category = t('complaints.validation.category');
    if (!isRequired(form.street)) next.street = t('complaints.validation.street');
    if (!minLength(form.description, 15)) next.description = t('complaints.validation.description');
    if (!isRequired(form.priority)) next.priority = t('complaints.validation.priority');

    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`complaint-${firstKey}`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      /* Brief pause so the loading feedback is visible in this demo. */
      await new Promise((resolve) => setTimeout(resolve, 400));

      const record = addComplaint({
        ...form,
        image: image?.dataUrl || null,
      });

      setSubmitted(record);
      setForm(EMPTY_FORM);
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setErrors({ form: t('complaints.validation.description') });
    } finally {
      setSubmitting(false);
    }
  };

  const startAnother = () => {
    setSubmitted(null);
    setErrors({});
  };

  return (
    <div className="complaints">
      <header className="complaints-header">
        <div className="complaints-container">
          <h1 className="complaints-header__title">{t('complaints.title')}</h1>
          <p className="complaints-header__subtitle">{t('complaints.subtitle')}</p>
        </div>
      </header>

      <div className="complaints-container complaints-body">
        {submitted ? (
          <section className="complaints-success" aria-live="polite">
            <span className="complaints-success__icon" aria-hidden="true">
              <CheckCircleIcon />
            </span>
            <h2 className="complaints-success__title">{t('complaints.successTitle')}</h2>
            <p className="complaints-success__text">{t('complaints.successBody')}</p>

            <div className="complaints-success__id">
              <span className="complaints-success__id-label">{t('complaints.complaintId')}</span>
              <strong className="complaints-success__id-value">{submitted.id}</strong>
            </div>

            <div className="complaints-success__actions">
              <Button
                as={Link}
                to={`/track?id=${submitted.id}`}
                variant="primary"
                icon={<SearchIcon />}
              >
                {t('complaints.trackNow')}
              </Button>
              <Button variant="outline" onClick={startAnother} icon={<ClipboardIcon />}>
                {t('complaints.newComplaint')}
              </Button>
            </div>

            <p className="complaints-success__note">{t('complaints.privacyNote')}</p>
          </section>
        ) : (
          <div className="complaints-layout">
            <form className="complaints-form" onSubmit={handleSubmit} noValidate>
              <h2 className="complaints-form__title">{t('complaints.formTitle')}</h2>

              <div className="complaints-form__grid">
                <Input
                  id="complaint-residentName"
                  label={t('complaints.residentName')}
                  required
                  value={form.residentName}
                  onChange={updateField('residentName')}
                  error={errors.residentName}
                  autoComplete="name"
                  maxLength={80}
                />

                <Input
                  id="complaint-mobile"
                  label={t('complaints.mobile')}
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
                  id="complaint-email"
                  label={t('complaints.email')}
                  optional
                  optionalLabel={t('common.optional')}
                  type="email"
                  value={form.email}
                  onChange={updateField('email')}
                  error={errors.email}
                  autoComplete="email"
                />

                <Select
                  id="complaint-category"
                  label={t('complaints.category')}
                  required
                  placeholder={t('complaints.selectCategory')}
                  options={categoryOptions}
                  value={form.category}
                  onChange={updateField('category')}
                  error={errors.category}
                />

                <Input
                  id="complaint-street"
                  label={t('complaints.street')}
                  required
                  value={form.street}
                  onChange={updateField('street')}
                  error={errors.street}
                  maxLength={100}
                />

                <Input
                  id="complaint-landmark"
                  label={t('complaints.landmark')}
                  optional
                  optionalLabel={t('common.optional')}
                  value={form.landmark}
                  onChange={updateField('landmark')}
                  maxLength={100}
                />

                <Select
                  id="complaint-priority"
                  label={t('complaints.priority')}
                  required
                  placeholder={t('complaints.selectPriority')}
                  options={priorityOptions}
                  value={form.priority}
                  onChange={updateField('priority')}
                  error={errors.priority}
                />
              </div>

              <Textarea
                id="complaint-description"
                label={t('complaints.description')}
                required
                rows={6}
                value={form.description}
                onChange={updateField('description')}
                error={errors.description}
                maxLength={1200}
              />

              <div className="complaints-upload">
                <span className="complaints-upload__label">{t('complaints.image')}</span>

                {image ? (
                  <div className="complaints-upload__preview">
                    <img src={image.dataUrl} alt={t('complaints.previewAlt')} />
                    <div className="complaints-upload__preview-info">
                      <span className="complaints-upload__filename">{image.name}</span>
                      <button type="button" className="complaints-upload__remove" onClick={removeImage}>
                        <CloseIcon />
                        {t('complaints.removeImage')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="complaints-upload__drop" htmlFor="complaint-image">
                    <CameraIcon />
                    <span className="complaints-upload__cta">{t('complaints.uploadCta')}</span>
                    <span className="complaints-upload__help">{t('complaints.uploadHelp')}</span>
                    <input
                      ref={fileInputRef}
                      id="complaint-image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="complaints-upload__input"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
                {errors.image && (
                  <p className="complaints-upload__error" role="alert">
                    {errors.image}
                  </p>
                )}
              </div>

              <p className="complaints-form__privacy">
                <ShieldIcon />
                {t('complaints.privacyNote')}
              </p>

              <div className="complaints-form__actions">
                <Button type="submit" variant="primary" size="lg" loading={submitting} icon={<UploadIcon />}>
                  {submitting ? t('complaints.submitting') : t('complaints.submit')}
                </Button>
              </div>
            </form>

            <aside className="complaints-aside">
              <div className="complaints-aside__card">
                <h2 className="complaints-aside__title">{t('home.services.track.title')}</h2>
                <p className="complaints-aside__text">{t('home.services.track.desc')}</p>
                <Button as={Link} to="/track" variant="outline" icon={<SearchIcon />}>
                  {t('home.services.track.cta')}
                </Button>
              </div>

              <div className="complaints-aside__card complaints-aside__card--accent">
                <h2 className="complaints-aside__title">{t('home.services.assistance.title')}</h2>
                <p className="complaints-aside__text">{t('home.services.assistance.desc')}</p>
                <Button
                  as={Link}
                  to="/enquiries?type=assistance"
                  variant="secondary"
                  icon={<LifeBuoyIcon />}
                >
                  {t('home.services.assistance.cta')}
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
