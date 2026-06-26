'use client';

import React from 'react';
import { resolveTheme, ThemedProps, Status, statusColorMap, Size } from '../theme';
import { neuButton, neuButtonPressed } from '../neumorphism';

interface ButtonProps extends ThemedProps {
  title?: string;
  onPress?: () => void;
  size?: Size;
  status?: Status;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  size = 'md',
  status = 'default',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: ButtonProps) {
  const t = resolveTheme(themeOverride);
  const colorKey = statusColorMap[status];
  const textColor = t[colorKey];

  const padding = size === 'sm' ? '10px 20px' : size === 'md' ? '16px 28px' : '20px 36px';
  const textSize = size === 'sm' ? 13 : 15;
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onPress}
      disabled={isDisabled}
      className={`flex items-center justify-center gap-2 transition-shadow duration-200 ease-in-out ${containerClassName ?? ''}`}
      style={{
        ...neuButton(t, size),
        padding,
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...containerStyle,
      }}
      onMouseDown={(e) => {
        if (!isDisabled) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = neuButtonPressed(t, size).boxShadow;
        }
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = neuButton(t, size).boxShadow;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = neuButton(t, size).boxShadow;
      }}
    >
      {leftIcon}
      {title && (
        <span className="font-bold" style={{ fontSize: textSize, color: textColor }}>
          {title}
        </span>
      )}
      {rightIcon}
    </button>
  );
}
