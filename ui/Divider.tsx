'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuDivider } from '../neumorphism';

interface DividerProps extends ThemedProps {}

export default function Divider({
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: DividerProps) {
  const t = resolveTheme(themeOverride);

  return (
    <hr
      className={`w-full border-0 ${containerClassName ?? ''}`}
      style={{
        height: 2,
        marginBlock: 20,
        ...neuDivider(t),
        ...containerStyle,
      }}
    />
  );
}
