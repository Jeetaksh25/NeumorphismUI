'use client';

import React, { useState } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuCardRaised, neuCardPressed } from '../neumorphism';

interface CardProps extends ThemedProps {
  title?: string;
  subtitle?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'raised' | 'pressed';
  onPress?: () => void;
  padding?: number;
  borderRadius?: number;
  marginBottom?: number;
  children?: React.ReactNode;
}

export default function Card({
  title,
  subtitle,
  header,
  footer,
  variant = 'raised',
  onPress,
  padding = 24,
  borderRadius = 24,
  marginBottom = 20,
  children,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: CardProps) {
  const t = resolveTheme(themeOverride);
  const [pressed, setPressed] = useState(false);

  const isPressed = onPress ? pressed : variant === 'pressed';
  const style = isPressed ? neuCardPressed(t) : neuCardRaised(t);

  const Wrapper = onPress ? 'button' : 'div';

  return (
    <Wrapper
      {...(onPress
        ? {
            onClick: onPress,
            onMouseDown: () => setPressed(true),
            onMouseUp: () => setPressed(false),
            onMouseLeave: () => setPressed(false),
          }
        : {})}
      className={`text-left transition-shadow duration-200 ease-in-out ${containerClassName ?? ''}`}
      style={{
        ...style,
        padding,
        borderRadius,
        marginBottom,
        cursor: onPress ? 'pointer' : 'default',
        ...containerStyle,
      }}
    >
      {header}
      {title && (
        <h2 className="text-[17px] font-bold mb-2" style={{ color: t.textPrimary }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-sm leading-[22.4px]" style={{ color: t.textSecondary }}>
          {subtitle}
        </p>
      )}
      {children && <div className="mt-2">{children}</div>}
      {footer}
    </Wrapper>
  );
}
