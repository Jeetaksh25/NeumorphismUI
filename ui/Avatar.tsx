'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuAvatar } from '../neumorphism';

interface AvatarProps extends ThemedProps {
  source?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  online?: boolean;
}

const sizeMap: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 40,
  md: 56,
  lg: 80,
  xl: 120,
};

const initialSizeMap: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 14,
  md: 20,
  lg: 28,
  xl: 36,
};

export default function Avatar({
  source,
  initials = '?',
  size = 'md',
  online = false,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: AvatarProps) {
  const t = resolveTheme(themeOverride);
  const numericSize = typeof size === 'number' ? size : sizeMap[size];
  const fontSize = typeof size === 'number' ? Math.round(size * 0.3) : initialSizeMap[size];

  return (
    <div className={`relative inline-block ${containerClassName ?? ''}`} style={containerStyle}>
      <div
        className="grid place-items-center overflow-hidden"
        style={{
          width: numericSize,
          height: numericSize,
          ...neuAvatar(t, numericSize),
        }}
      >
        {source ? (
          <img
            src={source}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="font-bold"
            style={{
              fontSize,
              color: t.textPrimary,
            }}
          >
            {initials}
          </span>
        )}
      </div>
      {online && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2"
          style={{
            width: numericSize * 0.3,
            height: numericSize * 0.3,
            borderRadius: numericSize * 0.15,
            backgroundColor: t.success,
            borderColor: t.bgColor,
          }}
        />
      )}
    </div>
  );
}
