'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuTag } from '../neumorphism';

interface TagProps extends ThemedProps {
  label: string;
  size?: 'sm' | 'md';
}

export default function Tag({
  label,
  size = 'md',
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: TagProps) {
  const t = resolveTheme(themeOverride);

  return (
    <span
      className={`inline-flex items-center ${size === 'sm' ? 'py-1 px-2.5 text-[10px]' : 'py-1.5 px-3.5 text-xs'} font-bold ${containerClassName ?? ''}`}
      style={{
        ...neuTag(t),
        color: t.textPrimary,
        ...containerStyle,
      }}
    >
      {label}
    </span>
  );
}
