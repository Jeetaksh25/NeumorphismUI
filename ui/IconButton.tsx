'use client';

import React, { useState } from 'react';
import { resolveTheme, ThemedProps, Status, statusColorMap } from '../theme';
import { neuIconButton, neuIconButtonPressed, neuIconOnlyButton, neuIconOnlyButtonPressed, neuRoundButton, neuRoundButtonPressed } from '../neumorphism';

interface IconButtonProps extends ThemedProps {
  icon: React.ReactNode;
  onPress?: () => void;
  variant?: 'square' | 'round';
  size?: number;
  status?: Status;
  disabled?: boolean;
  'aria-label'?: string;
}

export default function IconButton({
  icon,
  onPress,
  variant = 'square',
  size = 48,
  status = 'default',
  disabled = false,
  'aria-label': ariaLabel,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: IconButtonProps) {
  const t = resolveTheme(themeOverride);
  const [pressed, setPressed] = useState(false);

  const isRound = variant === 'round';
  const isDisabled = disabled;

  const getStyle = () => {
    if (isRound) {
      return pressed ? neuRoundButtonPressed(t) : neuRoundButton(t);
    }
    return pressed ? neuIconOnlyButtonPressed(t) : neuIconOnlyButton(t);
  };

  const style = getStyle();

  return (
    <button
      onClick={onPress}
      disabled={isDisabled}
      aria-label={ariaLabel}
      className={`grid place-items-center transition-shadow duration-200 ease-in-out ${containerClassName ?? ''}`}
      style={{
        width: size,
        height: size,
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...style,
        ...containerStyle,
      }}
      onMouseDown={() => !isDisabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {icon}
    </button>
  );
}
