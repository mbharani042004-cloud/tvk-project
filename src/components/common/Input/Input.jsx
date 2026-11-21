import { useId } from 'react';
import './Input.css';

/* Accessible field shell shared by Input, Textarea and Select. */
function Field({
  id,
  label,
  required = false,
  optional = false,
  optionalLabel = '',
  error,
  hint,
  children,
}) {
  return (
    <div className={`field${error ? ' field--invalid' : ''}`}>
      {label && (
        <label className="field__label" htmlFor={id}>
          <span>{label}</span>
          {required && (
            <span className="field__required" aria-hidden="true">
              *
            </span>
          )}
          {optional && <span className="field__optional">({optionalLabel})</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p className="field__hint" id={`${id}-hint`}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export function Input({
  label,
  error,
  hint,
  required = false,
  optional = false,
  optionalLabel,
  id: providedId,
  type = 'text',
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const id = providedId || generatedId;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <Field
      id={id}
      label={label}
      required={required}
      optional={optional}
      optionalLabel={optionalLabel}
      error={error}
      hint={hint}
    >
      <input
        id={id}
        type={type}
        className={`input${error ? ' input--invalid' : ''}${className ? ` ${className}` : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        required={required}
        {...rest}
      />
    </Field>
  );
}

export function Textarea({
  label,
  error,
  hint,
  required = false,
  optional = false,
  optionalLabel,
  id: providedId,
  rows = 5,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const id = providedId || generatedId;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <Field
      id={id}
      label={label}
      required={required}
      optional={optional}
      optionalLabel={optionalLabel}
      error={error}
      hint={hint}
    >
      <textarea
        id={id}
        rows={rows}
        className={`input input--textarea${error ? ' input--invalid' : ''}${className ? ` ${className}` : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        required={required}
        {...rest}
      />
    </Field>
  );
}

export function Select({
  label,
  error,
  hint,
  required = false,
  optional = false,
  optionalLabel,
  id: providedId,
  options = [],
  placeholder,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const id = providedId || generatedId;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <Field
      id={id}
      label={label}
      required={required}
      optional={optional}
      optionalLabel={optionalLabel}
      error={error}
      hint={hint}
    >
      <select
        id={id}
        className={`input input--select${error ? ' input--invalid' : ''}${className ? ` ${className}` : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        required={required}
        {...rest}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export default Input;
