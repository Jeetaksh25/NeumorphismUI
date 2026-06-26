'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuRaised, neuPressed, neuToggleTrack, neuToggleThumb } from '../neumorphism';

interface ToggleProps extends ThemedProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
}

export default function Toggle({
  value,
  onValueChange,
  label,
  leftIcon,
  disabled = false,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: ToggleProps) {
  const t = resolveTheme(themeOverride);

  return (
    <button
      onClick={() => onValueChange(!value)}
      disabled={disabled}
      className={`flex items-center gap-3 py-3 px-4 rounded-2xl transition-shadow duration-200 ease-in-out text-left ${containerClassName ?? ''}`}
      style={{
        ...(value ? neuPressed(t) : neuRaised(t)),
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...containerStyle,
      }}
      role="switch"
      aria-checked={value}
    >
      {leftIcon}
      {label && (
        <span className="flex-1 text-[15px] font-semibold" style={{ color: t.textPrimary }}>
          {label}
        </span>
      )}
      <span
        className="grid place-items-center flex-shrink-0"
        style={{
          width: 54,
          height: 30,
          paddingInline: 4,
          ...neuToggleTrack(t),
        }}
      >
        <span
          className="block rounded-full transition-transform duration-200 ease-in-out"
          style={{
            width: 22,
            height: 22,
            ...neuToggleThumb(t, value),
            transform: value ? 'translateX(12px)' : 'translateX(-12px)',
          }}
        />
      </span>
    </button>
  );
}
