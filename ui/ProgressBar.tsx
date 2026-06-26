'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuProgressTrack } from '../neumorphism';

interface ProgressBarProps extends ThemedProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  fillColor?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  fillColor,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: ProgressBarProps) {
  const t = resolveTheme(themeOverride);
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={`mb-5 ${containerClassName ?? ''}`} style={containerStyle}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-semibold" style={{ color: t.textSecondary }}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-bold" style={{ color: t.textPrimary }}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full overflow-hidden"
        style={{
          height: 18,
          padding: 3,
          ...neuProgressTrack(t),
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: fillColor ?? t.accent,
            boxShadow: '2px 0 10px rgba(66,133,244,0.4)',
          }}
        />
      </div>
    </div>
  );
}
