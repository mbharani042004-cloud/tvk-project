import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import { AlertIcon, CheckCircleIcon, EyeIcon, EyeOffIcon, PinIcon, UserPlusIcon } from '../../assets/icons';
import { isRequired, isValidEmail, isValidMobile, minLength, normaliseMobile } from '../../services/validationService';
import './Register.css';

const EMPTY_FORM = {
  name: '',
  mobile: '',
  email: '',
  street: '',
  password: '',
  confirm: '',
  terms: false,
};

const DUPLICATE_FIELDS = {
  'auth.register.validation.duplicateEmail': 'email',
  'auth.register.validation.duplicateMobile': 'mobile',
};

export default function Register() {
  const { t } = useLanguage();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateField = (field) => (event) => {
    const value = field === 'terms' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
  };

  const validate = () => {
    const next = {};

    if (!isRequired(form.name)) next.name = t('auth.register.validation.name');
    else if (!minLength(form.name, 3)) next.name = t('auth.register.validation.nameShort');

    if (!isValidMobile(form.mobile)) next.mobile = t('auth.register.validation.mobile');
    if (!isValidEmail(form.email)) next.email = t('auth.register.validation.email');
    if (!isRequired(form.street)) next.street = t('auth.register.validation.street');
    if (String(form.password).length < 6) next.password = t('auth.register.validation.password');
    if (form.password !== form.confirm) next.confirm = t('auth.register.validation.confirm');
    if (!form.terms) next.terms = t('auth.register.validation.terms');

    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const result = signUp({
        name: form.name,
        mobile: normaliseMobile(form.mobile),
        email: form.email,
        street: form.street,
        password: form.password,
      });

      if (!result.ok) {
        const field = DUPLICATE_FIELDS[result.messageKey];
        setErrors(field ? { [field]: t(result.messageKey) } : { form: t(result.messageKey) });
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 1400);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="register-success">
        <div className="register-success__card" role="status">
          <span className="register-success__icon" aria-hidden="true">
            <CheckCircleIcon />
          </span>
          <h1 className="register-success__title">{t('auth.register.successTitle')}</h1>
          <p className="register-success__text">{t('auth.register.successBody')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="register">
      <aside className="register-aside">
        <span className="register-aside__mark" aria-hidden="true">
          <PinIcon />
        </span>
        <h2 className="register-aside__title">{t('app.ward')}</h2>
        <p className="register-aside__tagline">{t('app.tagline')}</p>
        <p className="register-aside__note">{t('common.demoNotice')}</p>
      </aside>

      <div className="register-main">
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <h1 className="register-form__title">{t('auth.register.title')}</h1>
          <p className="register-form__subtitle">{t('auth.register.subtitle')}</p>

          <div className="register-form__grid">
            <div className="register-form__full">
              <Input
                id="register-name"
                label={t('auth.register.name')}
                required
                value={form.name}
                onChange={updateField('name')}
                error={errors.name}
                autoComplete="name"
                maxLength={80}
              />
            </div>

            <Input
              id="register-mobile"
              label={t('auth.register.mobile')}
              required
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.mobile}
              onChange={updateField('mobile')}
              error={errors.mobile}
              autoComplete="tel"
            />

            <Input
              id="register-email"
              label={t('auth.register.email')}
              required
              type="email"
              value={form.email}
              onChange={updateField('email')}
              error={errors.email}
              autoComplete="email"
            />

            <div className="register-form__full">
              <Input
                id="register-street"
                label={t('auth.register.street')}
                required
                value={form.street}
                onChange={updateField('street')}
                error={errors.street}
                autoComplete="address-line1"
                maxLength={100}
              />
            </div>

            <div className="register-password">
              <Input
                id="register-password"
                label={t('auth.register.password')}
                required
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={updateField('password')}
                error={errors.password}
                hint={t('auth.register.passwordHint')}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="register-password__toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? t('auth.register.hidePassword') : t('auth.register.showPassword')}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            <Input
              id="register-confirm"
              label={t('auth.register.confirm')}
              required
              type={showPassword ? 'text' : 'password'}
              value={form.confirm}
              onChange={updateField('confirm')}
              error={errors.confirm}
              autoComplete="new-password"
            />
          </div>

          <label className="register-terms">
            <input type="checkbox" checked={form.terms} onChange={updateField('terms')} />
            <span>{t('auth.register.terms')}</span>
          </label>
          {errors.terms && (
            <p className="register-terms__error" role="alert">
              {errors.terms}
            </p>
          )}

          {errors.form && (
            <p className="register-error" role="alert">
              <AlertIcon />
              {errors.form}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={submitting}
            icon={<UserPlusIcon />}
          >
            {t('auth.register.submit')}
          </Button>

          <p className="register-login">
            {t('auth.register.haveAccount')}{' '}
            <Link to="/login" className="register-login__link">
              {t('auth.register.loginLink')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
