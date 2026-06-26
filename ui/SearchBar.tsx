'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuSearchBar } from '../neumorphism';

interface SearchBarProps extends ThemedProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
}

export default function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  onSubmit,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: SearchBarProps) {
  const t = resolveTheme(themeOverride);

  return (
    <div
      className={`flex items-center py-4 px-4 ${containerClassName ?? ''}`}
      style={{
        ...neuSearchBar(t),
        ...containerStyle,
      }}
      role="search"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={t.textSecondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-3 flex-shrink-0"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[15px] outline-none"
        style={{ color: t.textPrimary }}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit?.();
        }}
      />
    </div>
  );
}
