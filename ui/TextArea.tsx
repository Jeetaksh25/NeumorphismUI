'use client';

import React, { useEffect, useRef } from 'react';
import { resolveTheme, BaseInputProps } from '../theme';
import { neuPressed } from '../neumorphism';

interface TextAreaProps extends BaseInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  minHeight?: number;
  autoGrow?: boolean;
  maxLength?: number;
}

export default function TextArea({
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
  placeholder,
  onChange,
  minHeight = 120,
  autoGrow = false,
  maxLength,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: TextAreaProps) {
  const t = resolveTheme(themeOverride);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoGrow]);

  const currentLength = value?.length ?? 0;

  return (
    <div className={`${containerClassName ?? ''}`} style={containerStyle}>
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
        className="bg-[var(--bg)] rounded-2xl"
        style={{ ...neuPressed(t), minHeight }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          className="block w-full bg-transparent text-[15px] outline-none resize-none"
          style={{
            padding: '16px 24px',
            minHeight,
            color: t.textPrimary,
            opacity: disabled ? 0.5 : 1,
          }}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
      <div className="flex justify-between mt-1.5 ml-1">
        {helperText && (
          <span
            className={`text-xs ${helperClassName ?? ''}`}
            style={{ color: t.textSecondary, ...helperStyle }}
          >
            {helperText}
          </span>
        )}
        {maxLength != null && (
          <span className="text-xs" style={{ color: t.textSecondary }}>
            {currentLength}/{maxLength}
          </span>
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
    </div>
  );
}
