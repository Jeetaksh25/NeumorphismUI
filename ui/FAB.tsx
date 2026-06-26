'use client';

import React, { useState } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuFab, neuFabPressed } from '../neumorphism';

interface FABProps extends ThemedProps {
  icon?: React.ReactNode;
  onPress?: () => void;
  position?: 'bottomRight' | 'bottomLeft' | 'bottomCenter';
  bottomOffset?: number;
  rightOffset?: number;
  leftOffset?: number;
  size?: number;
  disabled?: boolean;
}

export default function FAB({
  icon,
  onPress,
  position = 'bottomRight',
  bottomOffset = 90,
  rightOffset = 24,
  leftOffset = 24,
  size = 60,
  disabled = false,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: FABProps) {
  const t = resolveTheme(themeOverride);
  const [pressed, setPressed] = useState(false);

  const getPositionStyle = (): React.CSSProperties => {
    const base = { bottom: bottomOffset };
    if (position === 'bottomRight') return { ...base, right: rightOffset };
    if (position === 'bottomLeft') return { ...base, left: leftOffset };
    return { ...base, left: '50%', transform: 'translateX(-50%)' };
  };

  const style = pressed ? neuFabPressed(t) : neuFab(t);

  return (
    <button
      onClick={onPress}
      disabled={disabled}
      aria-label="Add"
      className={`fixed grid place-items-center rounded-full transition-shadow duration-200 ease-in-out ${containerClassName ?? ''}`}
      style={{
        width: size,
        height: size,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...getPositionStyle(),
        ...style,
        ...containerStyle,
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {icon ?? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )}
    </button>
  );
}
