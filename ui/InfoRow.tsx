'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';

interface InfoRowProps extends ThemedProps {
  label: string;
  value: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showBorder?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

export default function InfoRow({
  label,
  value,
  leftIcon,
  rightIcon,
  showBorder = true,
  paddingVertical = 14,
  paddingHorizontal = 4,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: InfoRowProps) {
  const t = resolveTheme(themeOverride);

  return (
    <div
      className={`flex items-center justify-between ${containerClassName ?? ''}`}
      style={{
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: t.shadowDark,
        ...containerStyle,
      }}
    >
      <div className="flex items-center gap-3">
        {leftIcon}
        <span className="text-sm font-semibold" style={{ color: t.textSecondary }}>
          {label}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold" style={{ color: t.textPrimary }}>
          {value}
        </span>
        {rightIcon}
      </div>
    </div>
  );
}
