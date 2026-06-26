'use client';

import React, { useState } from 'react';
import { resolveTheme, BaseInputProps } from '../theme';
import { neuInput, neuInputFocused, neuInputIconPressed } from '../neumorphism';

interface InputProps extends BaseInputProps {
  type?: 'text' | 'password' | 'email' | 'tel' | 'number' | 'url' | 'search' | 'date';
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  autoComplete?: string;
}

export default function Input({
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
  type = 'text',
  value,
  placeholder,
  onChange,
  leftIcon,
  rightIcon,
  autoComplete,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: InputProps) {
  const t = resolveTheme(themeOverride);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
        style={isFocused ? neuInputFocused(t) : neuInput(t)}
      >
        {leftIcon && (
          <div
            className="ml-2 grid place-items-center flex-shrink-0"
            style={{ width: 40, height: 40, ...neuInputIconPressed(t) }}
          >
            {leftIcon}
          </div>
        )}
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent text-[15px] outline-none min-w-0"
          style={{
            padding: '16px 24px',
            color: t.textPrimary,
            opacity: disabled ? 0.5 : 1,
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onChange?.(e.target.value)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="mr-2 grid place-items-center flex-shrink-0"
            style={{ width: 40, height: 40, ...neuInputIconPressed(t) }}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M2 2l20 20" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
        {rightIcon && !isPassword && (
          <div
            className="mr-2 grid place-items-center flex-shrink-0"
            style={{ width: 40, height: 40, ...neuInputIconPressed(t) }}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span
          className={`block text-xs font-bold mt-1.5 ml-1 ${errorClassName ?? ''}`}
          style={{ color: t.danger, ...errorStyle }}
        >
          {error}
        </span>
      )}
      {!error && helperText && (
        <span
          className={`block text-xs mt-1.5 ml-1 ${helperClassName ?? ''}`}
          style={{ color: t.textSecondary, ...helperStyle }}
        >
          {helperText}
        </span>
      )}
    </label>
  );
}
