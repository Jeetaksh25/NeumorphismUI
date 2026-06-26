'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import IconButton from './IconButton';

interface PremiumOverlayProps extends ThemedProps {
  onPress?: () => void;
}

export default function PremiumOverlay({
  onPress,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: PremiumOverlayProps) {
  const t = resolveTheme(themeOverride);

  return (
    <div
      className={`absolute inset-0 z-10 grid place-items-center ${containerClassName ?? ''}`}
      style={{
        backgroundColor: `${t.bgColor}66`,
        ...containerStyle,
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <IconButton
          variant="round"
          size={60}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={t.textPrimary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          onPress={onPress}
          theme={t}
          aria-label="Premium content locked"
        />
        <span className="text-sm font-bold" style={{ color: t.textPrimary }}>
          Premium
        </span>
      </div>
    </div>
  );
}
