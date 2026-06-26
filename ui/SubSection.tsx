'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';

interface SubSectionProps extends ThemedProps {
  title?: string;
  disabled?: boolean;
  gap?: number;
  children: React.ReactNode;
}

export default function SubSection({
  title,
  disabled = false,
  gap = 12,
  children,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: SubSectionProps) {
  const t = resolveTheme(themeOverride);

  return (
    <div
      className={`flex flex-col ${containerClassName ?? ''}`}
      style={{
        gap,
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...containerStyle,
      }}
    >
      {title && (
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.8px]"
          style={{ color: t.textSecondary }}
        >
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
