'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';

interface ScreenProps extends ThemedProps {
  children: React.ReactNode;
  padding?: number;
  safeAreaBottom?: boolean;
}

export default function Screen({
  children,
  padding = 16,
  safeAreaBottom = true,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: ScreenProps) {
  const t = resolveTheme(themeOverride);

  return (
    <div
      className={`min-h-screen ${containerClassName ?? ''}`}
      style={{
        backgroundColor: t.bgColor,
        color: t.textPrimary,
        padding,
        paddingBottom: safeAreaBottom ? 90 : padding,
        ...containerStyle,
      }}
    >
      {children}
    </div>
  );
}
