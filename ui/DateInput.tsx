'use client';

import React from 'react';
import { resolveTheme, BaseInputProps } from '../theme';
import { neuPressed } from '../neumorphism';

interface DateInputProps extends BaseInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

function formatDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

export default function DateInput({
  label,
  labelStyle,
  labelClassName,
  error,
  errorStyle,
  errorClassName,
  disabled = false,
  required = false,
  helperText,
  helperClassName,
  helperStyle,
  value,
  onChange,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: DateInputProps) {
  const t = resolveTheme(themeOverride);

  return (
    <label className={`block mb-5 ${containerClassName ?? ''}`} style={containerStyle}>
      {label && (
        <span
          className={`block text-[12px] font-bold uppercase tracking-wide mb-2.5 pl-1 ${labelClassName ?? ''}`}
          style={{ color: t.textSecondary, ...labelStyle }}
        >
          {label}
          {required && <span style={{ color: t.danger }}> *</span>}
        </span>
      )}
      <div
        className="flex items-center rounded-2xl"
        style={neuPressed(t)}
      >
        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          value={value}
          placeholder="DD/MM/YYYY"
          disabled={disabled}
          required={required}
          className="flex-1 bg-transparent text-[15px] outline-none"
          style={{
            padding: '16px 24px',
            color: t.textPrimary,
            opacity: disabled ? 0.5 : 1,
          }}
          onChange={(e) => onChange?.(formatDate(e.target.value))}
        />
      </div>
      {error && (
        <span className={`block text-xs font-bold mt-1.5 ml-1 ${errorClassName ?? ''}`} style={{ color: t.danger, ...errorStyle }}>
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className={`block text-xs mt-1.5 ml-1 ${helperClassName ?? ''}`} style={{ color: t.textSecondary, ...helperStyle }}>
          {helperText}
        </span>
      )}
    </label>
  );
}
