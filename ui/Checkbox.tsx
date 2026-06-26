'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuRaised, neuPressed, neuCheckMark } from '../neumorphism';

export interface CheckboxOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxProps extends ThemedProps {
  options: CheckboxOption[];
  selectedValues?: string[];
  onValueChange: (values: string[]) => void;
}

export default function Checkbox({
  options,
  selectedValues = [],
  onValueChange,
  theme: themeOverride,
  containerStyle,
}: CheckboxProps) {
  const t = resolveTheme(themeOverride);

  const toggleValue = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onValueChange(next);
  };

  return (
    <div className="flex flex-col" role="group" style={containerStyle}>
      {options.map((option) => {
        const selected = selectedValues.includes(option.value);
        return (
          <button
            key={option.value}
            onClick={() => !option.disabled && toggleValue(option.value)}
            disabled={option.disabled}
            className="flex items-center gap-3.5 py-3.5 px-3.5 rounded-2xl mb-3 text-left transition-shadow duration-200 ease-in-out"
            style={{
              opacity: option.disabled ? 0.5 : 1,
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              ...(selected ? neuPressed(t) : neuRaised(t)),
            }}
            role="checkbox"
            aria-checked={selected}
            aria-label={option.label}
          >
            <div
              className="grid place-items-center flex-shrink-0"
              style={{ width: 26, height: 26, ...neuCheckMark(t) }}
            >
              {selected && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={t.accent}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-semibold" style={{ color: t.textPrimary }}>
                {option.label}
              </div>
              {option.description && (
                <div className="text-xs mt-0.5" style={{ color: t.textSecondary }}>
                  {option.description}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
