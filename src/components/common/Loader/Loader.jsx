import './Loader.css';

export default function Loader({ label = '', size = 'md', inline = false }) {
  return (
    <div
      className={`loader${inline ? ' loader--inline' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={label || undefined}
    >
      <span className={`loader__spinner loader__spinner--${size}`} aria-hidden="true" />
      {label && <span className="loader__label">{label}</span>}
    </div>
  );
}

/* Full-section loading state used while a page resolves its data. */
export function PageLoader({ label }) {
  return (
    <div className="loader-page">
      <Loader label={label} size="lg" />
    </div>
  );
}
