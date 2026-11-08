import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  helper?: React.ReactNode;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  helper,
  required,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="form-required" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`form-input ${hasError ? 'error' : ''}`}
        aria-invalid={hasError}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="form-error" role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={`${inputId}-hint`} className="form-hint">
          {hint}
        </span>
      )}
      {helper}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  helper?: React.ReactNode;
  required?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  hint,
  helper,
  required,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
          {required && <span className="form-required" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`form-textarea ${hasError ? 'error' : ''}`}
        aria-invalid={hasError}
        aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
        {...props}
      />
      {error && (
        <span id={`${textareaId}-error`} className="form-error" role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={`${textareaId}-hint`} className="form-hint">
          {hint}
        </span>
      )}
      {helper}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  hint,
  options,
  placeholder,
  required,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="form-required" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="select-wrapper">
        <select
          id={selectId}
          className={`form-select ${hasError ? 'error' : ''}`}
          aria-invalid={hasError}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="select-arrow"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {error && (
        <span id={`${selectId}-error`} className="form-error" role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={`${selectId}-hint`} className="form-hint">
          {hint}
        </span>
      )}
    </div>
  );
};

export default Input;
