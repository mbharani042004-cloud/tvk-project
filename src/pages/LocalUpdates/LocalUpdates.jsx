import { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NewsCard from '../../components/NewsCard/NewsCard';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { MOCK_NEWS, UPDATE_CATEGORY_IDS } from '../../data/mockNews';
import { MegaphoneIcon, SearchIcon } from '../../assets/icons';
import './LocalUpdates.css';

function searchText(item) {
  const flatten = (value) => (typeof value === 'string' ? value : `${value.en || ''} ${value.ta || ''}`);
  return `${flatten(item.title)} ${flatten(item.description)}`.toLowerCase();
}

export default function LocalUpdates() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return MOCK_NEWS.filter((item) => category === 'all' || item.category === category)
      .filter((item) => (needle ? searchText(item).includes(needle) : true))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [query, category]);

  return (
    <div className="updates">
      <header className="updates-header">
        <div className="updates-container">
          <span className="updates-header__badge">
            <MegaphoneIcon />
            {t('common.demoBadge')}
          </span>
          <h1 className="updates-header__title">{t('updates.title')}</h1>
          <p className="updates-header__subtitle">{t('updates.subtitle')}</p>
        </div>
      </header>

      <div className="updates-container updates-body">
        <div className="updates-toolbar">
          <div className="updates-search">
            <SearchIcon />
            <input
              type="search"
              className="updates-search__input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('updates.searchPlaceholder')}
              aria-label={t('common.search')}
            />
          </div>

          <p className="updates-count" aria-live="polite">
            {results.length} {t('common.results')}
          </p>
        </div>

        <div className="updates-filters" role="group" aria-label={t('common.filter')}>
          <button
            type="button"
            className={`updates-filter${category === 'all' ? ' is-active' : ''}`}
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
          >
            {t('common.all')}
          </button>
          {UPDATE_CATEGORY_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`updates-filter${category === id ? ' is-active' : ''}`}
              onClick={() => setCategory(id)}
              aria-pressed={category === id}
            >
              {t(`categories.${id}`)}
            </button>
          ))}
        </div>

        {results.length > 0 ? (
          <div className="updates-grid">
            {results.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<SearchIcon />}
            title={t('updates.empty')}
            description={t('updates.emptyHint')}
            action={
              <button
                type="button"
                className="updates-reset"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                }}
              >
                {t('common.clear')}
              </button>
            }
          />
        )}

        <p className="updates-demo-note">{t('common.demoNotice')}</p>
      </div>
    </div>
  );
}
