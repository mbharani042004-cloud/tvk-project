import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button/Button';
import Input, { Select, Textarea } from '../../components/common/Input/Input';
import Modal from '../../components/common/Modal/Modal';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import {
  CameraIcon,
  CheckCircleIcon,
  CloseIcon,
  FlagIcon,
  SearchIcon,
  ShieldIcon,
  ThumbsUpIcon,
  UploadIcon,
  UsersIcon,
} from '../../assets/icons';
import { COMPLAINT_CATEGORIES } from '../../data/mockComplaints';
import { addPost, getPosts, reportPost, toggleLike } from '../../services/communityService';
import {
  formatDate,
  isRequired,
  minLength,
  readFileAsDataUrl,
  validateImageFile,
} from '../../services/validationService';
import './Community.css';

const EMPTY_FORM = { name: '', category: '', title: '', description: '' };

function postSearchText(post) {
  const flatten = (value) => (typeof value === 'string' ? value : `${value.en || ''} ${value.ta || ''}`);
  return `${post.name} ${flatten(post.title)} ${flatten(post.description)}`.toLowerCase();
}

export default function Community() {
  const { t, translateField, language } = useLanguage();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [posts, setPosts] = useState(() => getPosts());
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedPost, setSubmittedPost] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [reportTarget, setReportTarget] = useState(null);
  const [reportDone, setReportDone] = useState(false);

  const actorKey = user?.email || 'guest';

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({ ...prev, name: prev.name || user.name || '' }));
  }, [user]);

  const refresh = () => setPosts(getPosts());

  const categoryOptions = useMemo(
    () => COMPLAINT_CATEGORIES.map((item) => ({ value: item.id, label: t(item.labelKey) })),
    [t]
  );

  const publicPosts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts
      .filter((post) => post.status === 'approved')
      .filter((post) => category === 'all' || post.category === category)
      .filter((post) => (needle ? postSearchText(post).includes(needle) : true));
  }, [posts, query, category]);

  const myPosts = useMemo(
    () => (user ? posts.filter((post) => String(post.ownerEmail) === String(user.email)) : []),
    [posts, user]
  );

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileError = validateImageFile(file, t('community.validation'));
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
      setErrors((prev) => ({ ...prev, image: t('community.validation.imageType') }));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    const next = {};
    if (!isRequired(form.name)) next.name = t('community.validation.name');
    if (!isRequired(form.category)) next.category = t('community.validation.category');
    if (!minLength(form.title, 4)) next.title = t('community.validation.title');
    if (!minLength(form.description, 15)) next.description = t('community.validation.description');
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

      const record = addPost({
        ...form,
        ownerEmail: user?.email || null,
        image: image?.dataUrl || null,
      });

      setSubmittedPost(record);
      setForm({ ...EMPTY_FORM, name: user?.name || '' });
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      refresh();
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = (id) => {
    toggleLike(id, actorKey);
    refresh();
  };

  const confirmReport = () => {
    if (!reportTarget) return;
    reportPost(reportTarget.id, actorKey);
    setReportTarget(null);
    setReportDone(true);
    refresh();
  };

  const renderStatusBadge = (status) => (
    <span className={`community-post__status community-post__status--${status}`}>
      {t(`moderation.${status}`)}
    </span>
  );

  return (
    <div className="community">
      <header className="community-header">
        <div className="community-container">
          <span className="community-header__badge">
            <UsersIcon />
            {t('common.demoBadge')}
          </span>
          <h1 className="community-header__title">{t('community.title')}</h1>
          <p className="community-header__subtitle">{t('community.subtitle')}</p>
        </div>
      </header>

      <div className="community-container community-body">
        {submittedPost && (
          <div className="community-notice community-notice--success" role="status">
            <CheckCircleIcon />
            <div>
              <strong>{t('community.successTitle')}</strong>
              <p>{t('community.successBody')}</p>
            </div>
            <button
              type="button"
              className="community-notice__close"
              onClick={() => setSubmittedPost(null)}
              aria-label={t('common.close')}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {reportDone && (
          <div className="community-notice" role="status">
            <FlagIcon />
            <div>
              <p>{t('community.reportDone')}</p>
            </div>
            <button
              type="button"
              className="community-notice__close"
              onClick={() => setReportDone(false)}
              aria-label={t('common.close')}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {myPosts.length > 0 && (
          <section className="community-mine" aria-labelledby="community-mine-title">
            <h2 id="community-mine-title" className="community-section-title">
              {t('community.myPostsTitle')}
            </h2>
            <ul className="community-mine__list">
              {myPosts.map((post) => (
                <li key={post.id} className="community-mine__item">
                  <div>
                    <p className="community-mine__title">{translateField(post.title)}</p>
                    <p className="community-mine__meta">
                      {t(`categories.${post.category}`)} · {formatDate(post.createdAt, language)}
                    </p>
                  </div>
                  {renderStatusBadge(post.status)}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="community-layout">
          <section className="community-list" aria-labelledby="community-list-title">
            <div className="community-list__head">
              <h2 id="community-list-title" className="community-section-title">
                {t('community.title')}
              </h2>
              <p className="community-list__count">
                {publicPosts.length} {t('common.results')}
              </p>
            </div>

            <div className="community-toolbar">
              <div className="community-search">
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('community.searchPlaceholder')}
                  aria-label={t('common.search')}
                  className="community-search__input"
                />
              </div>
            </div>

            <div className="community-filters" role="group" aria-label={t('common.filter')}>
              <button
                type="button"
                className={`community-filter${category === 'all' ? ' is-active' : ''}`}
                onClick={() => setCategory('all')}
                aria-pressed={category === 'all'}
              >
                {t('common.all')}
              </button>
              {COMPLAINT_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`community-filter${category === item.id ? ' is-active' : ''}`}
                  onClick={() => setCategory(item.id)}
                  aria-pressed={category === item.id}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>

            {publicPosts.length > 0 ? (
              <div className="community-posts">
                {publicPosts.map((post) => {
                  const liked = (post.likedBy || []).includes(actorKey);
                  const reported = (post.reportedBy || []).includes(actorKey);
                  const isDemo = !post.ownerEmail;

                  return (
                    <article key={post.id} className="community-post">
                      <header className="community-post__head">
                        <div className="community-post__author">
                          <span className="community-post__avatar" aria-hidden="true">
                            {post.name.charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <p className="community-post__name">{post.name}</p>
                            <p className="community-post__meta">
                              {t(`categories.${post.category}`)} · {formatDate(post.createdAt, language)}
                            </p>
                          </div>
                        </div>
                        <div className="community-post__badges">
                          {isDemo && <span className="community-post__demo">{t('common.demoBadge')}</span>}
                          {renderStatusBadge(post.status)}
                        </div>
                      </header>

                      <h3 className="community-post__title">{translateField(post.title)}</h3>
                      <p className="community-post__text">{translateField(post.description)}</p>

                      {post.image && (
                        <img
                          className="community-post__image"
                          src={post.image}
                          alt={translateField(post.title)}
                          loading="lazy"
                        />
                      )}

                      <footer className="community-post__foot">
                        <button
                          type="button"
                          className={`community-post__action${liked ? ' is-active' : ''}`}
                          onClick={() => handleLike(post.id)}
                          aria-pressed={liked}
                        >
                          <ThumbsUpIcon />
                          {liked ? t('community.liked') : t('community.like')}
                          <span className="community-post__count">{post.likes || 0}</span>
                        </button>

                        <button
                          type="button"
                          className="community-post__action community-post__action--report"
                          onClick={() => setReportTarget(post)}
                          disabled={reported}
                        >
                          <FlagIcon />
                          {reported ? t('community.reported') : t('community.report')}
                        </button>
                      </footer>
                    </article>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={<UsersIcon />}
                title={t('community.empty')}
                description={t('community.emptyHint')}
              />
            )}
          </section>

          <aside className="community-form-wrap">
            <form className="community-form" onSubmit={handleSubmit} noValidate>
              <h2 className="community-form__title">{t('community.postTitle')}</h2>

              <p className="community-form__moderation">
                <ShieldIcon />
                {t('community.moderationNote')}
              </p>

              <Input
                id="community-name"
                label={t('community.name')}
                required
                value={form.name}
                onChange={updateField('name')}
                error={errors.name}
                maxLength={80}
              />

              <Select
                id="community-category"
                label={t('community.category')}
                required
                placeholder={t('complaints.selectCategory')}
                options={categoryOptions}
                value={form.category}
                onChange={updateField('category')}
                error={errors.category}
              />

              <Input
                id="community-title"
                label={t('community.title0')}
                required
                value={form.title}
                onChange={updateField('title')}
                error={errors.title}
                maxLength={120}
              />

              <Textarea
                id="community-description"
                label={t('community.description')}
                required
                rows={5}
                value={form.description}
                onChange={updateField('description')}
                error={errors.description}
                maxLength={1000}
              />

              <div className="community-upload">
                <span className="community-upload__label">{t('community.image')}</span>

                {image ? (
                  <div className="community-upload__preview">
                    <img src={image.dataUrl} alt={t('community.title0')} />
                    <button type="button" className="community-upload__remove" onClick={removeImage}>
                      <CloseIcon />
                      {t('complaints.removeImage')}
                    </button>
                  </div>
                ) : (
                  <label className="community-upload__drop" htmlFor="community-image">
                    <CameraIcon />
                    <span>{t('complaints.uploadCta')}</span>
                    <input
                      ref={fileInputRef}
                      id="community-image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="community-upload__input"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
                {errors.image && (
                  <p className="community-upload__error" role="alert">
                    {errors.image}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={submitting}
                icon={<UploadIcon />}
              >
                {submitting ? t('community.submitting') : t('community.submit')}
              </Button>
            </form>
          </aside>
        </div>
      </div>

      <Modal
        open={Boolean(reportTarget)}
        onClose={() => setReportTarget(null)}
        title={t('community.report')}
        closeLabel={t('common.close')}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReportTarget(null)}>
              {t('common.cancel')}
            </Button>
            <Button variant="danger" onClick={confirmReport} icon={<FlagIcon />}>
              {t('community.report')}
            </Button>
          </>
        }
      >
        <p>{t('community.reportConfirm')}</p>
      </Modal>
    </div>
  );
}
