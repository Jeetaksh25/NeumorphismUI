'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuSkeleton } from '../neumorphism';

interface SkeletonProps extends ThemedProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  circle?: boolean;
}

export default function Skeleton({
  width = '100%',
  height = 16,
  borderRadius = 12,
  circle = false,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: SkeletonProps) {
  const t = resolveTheme(themeOverride);

  return (
    <div
      className={`${containerClassName ?? ''}`}
      style={{
        width,
        height,
        animation: 'neu-pulse 2s ease-in-out infinite',
        ...neuSkeleton(t),
        ...containerStyle,
        borderRadius: circle ? (typeof height === 'number' ? height / 2 : '50%') : borderRadius,
      }}
    />
  );
}
