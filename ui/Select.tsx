'use client';

import React, { useState, useRef, useEffect } from 'react';
import { resolveTheme, ThemedProps, BaseInputProps } from '../theme';
import { neuPressed, neuRaised } from '../neumorphism';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends BaseInputProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  modalTitle?: string;
  onChange?: (value: string) => void;
}

export default function Select({
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
  options,
  value,
  placeholder = 'Select...',
  modalTitle = 'Select option',
  onChange,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: SelectProps) {
  const t = resolveTheme(themeOverride);
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption?.label ?? placeholder;

  return (
    <>
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
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(true)}
          disabled={disabled}
          className="flex items-center justify-between w-full rounded-2xl text-left"
          style={{
            ...neuPressed(t),
            padding: '16px 24px',
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className="text-[15px] flex-1"
            style={{ color: selectedOption ? t.textPrimary : t.textSecondary }}
          >
            {displayText}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={t.textSecondary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
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

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            onClick={() => setIsOpen(false)}
          />
          <div
            className="fixed inset-x-0 bottom-0 z-50 pt-4 px-3 pb-3 overflow-y-auto"
            style={{
              backgroundColor: t.bgColor,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: '70%',
            }}
            role="listbox"
          >
            <h3 className="text-lg font-bold text-center mb-1" style={{ color: t.textPrimary }}>
              {modalTitle}
            </h3>
            <ul className="px-4">
              {options.map((o) => {
                const isSelected = o.value === value;
                return (
                  <li key={o.value}>
                    <button
                      onClick={() => {
                        onChange?.(o.value);
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full py-3.5 px-4 mb-2 rounded-2xl text-left"
                      style={
                        isSelected
                          ? { ...neuRaised(t) }
                          : { backgroundColor: 'transparent' }
                      }
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span
                        className="text-[15px] font-semibold flex-1"
                        style={{ color: isSelected ? t.accent : t.textPrimary }}
                      >
                        {o.label}
                      </span>
                      {isSelected && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
