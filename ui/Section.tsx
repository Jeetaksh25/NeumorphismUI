'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuPressed } from '../neumorphism';

interface SectionProps extends ThemedProps {
  title?: string;
  useInnerContainer?: boolean;
  gap?: number;
  innerContainerPadding?: number;
  innerContainerBorderRadius?: number;
  neuStyle?: boolean;
  children: React.ReactNode;
}

export default function Section({
  title,
  useInnerContainer = false,
  gap = 12,
  innerContainerPadding = 12,
  innerContainerBorderRadius = 22,
  neuStyle = false,
  children,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: SectionProps) {
  const t = resolveTheme(themeOverride);

  return (
    <section
      className={`flex flex-col ${containerClassName ?? ''}`}
      style={{ gap, ...containerStyle }}
    >
      {title && (
        <h3
          className="text-xs font-bold uppercase tracking-[1.2px]"
          style={{ color: t.textSecondary }}
        >
          {title}
        </h3>
      )}
      {useInnerContainer && (
        <div
          className="flex flex-col"
          style={{
            gap,
            padding: innerContainerPadding,
            borderRadius: innerContainerBorderRadius,
            backgroundColor: t.bgColor,
            ...(neuStyle ? neuPressed(t) : {}),
          }}
        >
          {children}
        </div>
      )}
      {!useInnerContainer && children}
    </section>
  );
}
