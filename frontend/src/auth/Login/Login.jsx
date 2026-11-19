import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import { AlertIcon, EyeIcon, EyeOffIcon, LoginIcon, PinIcon } from '../../assets/icons';
import { isRequired } from '../../services/validationService';
import './Login.css';

export default function Login() {
  const { t } = useLanguage();
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/dashboard';

  const [form, setForm] = useState({ identifier: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const updateField = (field) => (event) => {
    const value = field === 'remember' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = {};
    if (!isRequired(form.identifier)) nextErrors.identifier = t('auth.loginValidation.identifier');
    if (!isRequired(form.password)) nextErrors.password = t('auth.loginValidation.password');

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const result = signIn({
        identifier: form.identifier,
        password: form.password,
        remember: form.remember,
      });

      if (!result.ok) {
        setErrors({ form: t(result.messageKey) });
        return;
      }

      navigate(redirectTo, { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <aside className="login-aside">
        <span className="login-aside__mark" aria-hidden="true">
          <PinIcon />
        </span>
        <h2 className="login-aside__title">{t('app.ward')}</h2>
        <p className="login-aside__tagline">{t('app.tagline')}</p>
        <ul className="login-aside__list">
          <li>{t('home.services.report.title')}</li>
          <li>{t('home.services.track.title')}</li>
          <li>{t('home.services.enquiry.title')}</li>
        </ul>
      </aside>

      <div className="login-main">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h1 className="login-form__title">{t('auth.login.title')}</h1>
          <p className="login-form__subtitle">{t('auth.login.subtitle')}</p>

          <Input
            id="login-identifier"
            label={t('auth.login.identifier')}
            required
            value={form.identifier}
            onChange={updateField('identifier')}
            error={errors.identifier}
            placeholder={t('auth.login.identifierPlaceholder')}
            autoComplete="username"
          />

          <div className="login-password">
            <Input
              id="login-password"
              label={t('auth.login.password')}
              required
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={updateField('password')}
              error={errors.password}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-password__toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? t('auth.register.hidePassword') : t('auth.register.showPassword')}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input type="checkbox" checked={form.remember} onChange={updateField('remember')} />
              <span>{t('auth.login.remember')}</span>
            </label>

            <button
              type="button"
              className="login-forgot"
              onClick={() => setNotice(t('auth.login.forgotMessage'))}
            >
              {t('auth.login.forgot')}
            </button>
          </div>

          {errors.form && (
            <p className="login-error" role="alert">
              <AlertIcon />
              {errors.form}
            </p>
          )}

          {notice && (
            <p className="login-notice" role="status">
              {notice}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth loading={submitting} icon={<LoginIcon />}>
            {t('auth.login.submit')}
          </Button>

          <p className="login-demo">{t('auth.login.demoHint')}</p>

          <p className="login-register">
            {t('auth.login.noAccount')}{' '}
            <Link to="/register" className="login-register__link">
              {t('auth.login.registerLink')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
