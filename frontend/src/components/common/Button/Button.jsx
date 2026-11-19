import './Button.css';

/* Shared button used across the whole app. Renders a <button> by default, or any
   component passed via `as` (e.g. a react-router <Link>). */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon = null,
  className = '',
  children,
  disabled = false,
  type = 'button',
  ...rest
}) {
  const isNativeButton = Component === 'button';
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--block' : '',
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={classes}
      aria-busy={loading || undefined}
      disabled={isNativeButton ? disabled || loading : undefined}
      type={isNativeButton ? type : undefined}
      {...rest}
    >
      {loading ? (
        <span className="btn__spinner" aria-hidden="true" />
      ) : (
        icon && (
          <span className="btn__icon" aria-hidden="true">
            {icon}
          </span>
        )
      )}
      <span className="btn__label">{children}</span>
    </Component>
  );
}
