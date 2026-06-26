'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuRaised, neuPressed, neuRadioMark } from '../neumorphism';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface RadioProps extends ThemedProps {
  options: RadioOption[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
}

export default function Radio({
  options,
  selectedValue,
  onValueChange,
  theme: themeOverride,
  containerStyle,
}: RadioProps) {
  const t = resolveTheme(themeOverride);

  return (
    <div className="flex flex-col" role="radiogroup" style={containerStyle}>
      {options.map((option) => {
        const selected = option.value === selectedValue;
        return (
          <button
            key={option.value}
            onClick={() => !option.disabled && onValueChange(option.value)}
            disabled={option.disabled}
            className="flex items-center gap-3.5 py-3.5 px-3.5 rounded-2xl mb-3 text-left transition-shadow duration-200 ease-in-out"
            style={{
              opacity: option.disabled ? 0.5 : 1,
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              ...(selected ? neuPressed(t) : neuRaised(t)),
            }}
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
          >
            <div
              className="grid place-items-center flex-shrink-0"
              style={{ width: 26, height: 26, ...neuRadioMark(t) }}
            >
              {selected && (
                <span
                  className="block rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: t.accent,
                    boxShadow: `0 0 12px ${t.accent}99`,
                  }}
                />
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
