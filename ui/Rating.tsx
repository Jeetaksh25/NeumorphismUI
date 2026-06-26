'use client';

import React, { useState } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuRatingStar } from '../neumorphism';

interface RatingProps extends ThemedProps {
  value: number;
  onValueChange?: (value: number) => void;
  size?: number;
  activeColor?: string;
  gap?: number;
}

export default function Rating({
  value,
  onValueChange,
  size = 26,
  activeColor,
  gap = 8,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: RatingProps) {
  const t = resolveTheme(themeOverride);
  const color = activeColor ?? t.warning;
  const padSize = size + 12;

  return (
    <div className={`flex ${containerClassName ?? ''}`} style={{ gap, ...containerStyle }} role="radiogroup">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
        const isActive = i <= value;
        return (
          <button
            key={i}
            onClick={() => onValueChange?.(i)}
            className="grid place-items-center rounded-full transition-shadow duration-100"
            style={{
              width: padSize,
              height: padSize,
              ...neuRatingStar(isActive, color, t),
            }}
            role="radio"
            aria-checked={isActive}
            aria-label={`${i} stars`}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={isActive ? color : 'transparent'}
              stroke={isActive ? 'transparent' : t.textSecondary}
              strokeWidth={isActive ? 0 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
