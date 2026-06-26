'use client';

import React, { useState } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuChip } from '../neumorphism';

interface ChipProps extends ThemedProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  showRemoveIcon?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
}

export default function Chip({
  label,
  active = false,
  disabled = false,
  iconLeft,
  iconRight,
  showRemoveIcon = false,
  onPress,
  onRemove,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: ChipProps) {
  const t = resolveTheme(themeOverride);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`flex items-center gap-1.5 py-2 px-4 rounded-[20px] transition-shadow duration-100 ease-in-out ${containerClassName ?? ''}`}
      style={{
        ...neuChip(t, active || pressed),
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...containerStyle,
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {iconLeft}
      <span className="text-[13px] font-bold" style={{ color: active ? t.accent : t.textPrimary }}>
        {label}
      </span>
      {iconRight}
      {showRemoveIcon && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={active ? t.accent : t.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      )}
    </button>
  );
}
