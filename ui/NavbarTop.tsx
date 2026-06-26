'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuIconButton, neuIconButtonPressed } from '../neumorphism';
import IconButton from './IconButton';

interface NavbarTopProps extends ThemedProps {
  title?: string;
  titleFontSize?: number;
  titleFontWeight?: string;
  titleStyle?: React.CSSProperties;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  sticky?: boolean;
  zIndex?: number;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function NavbarTop({
  title = 'Neumorphism UI',
  titleFontSize = 20,
  titleFontWeight = '800',
  titleStyle,
  showLeftIcon = true,
  showRightIcon = true,
  sticky = true,
  zIndex = 900,
  onLeftPress,
  onRightPress,
  leftIcon,
  rightIcon,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: NavbarTopProps) {
  const t = resolveTheme(themeOverride);

  return (
    <header
      className={`flex items-center justify-between px-4 mb-2 ${sticky ? 'sticky top-0' : ''} ${containerClassName ?? ''}`}
      style={{
        backgroundColor: t.bgColor,
        zIndex,
        ...containerStyle,
      }}
    >
      {showLeftIcon ? (
        <IconButton
          variant="round"
          icon={leftIcon ?? <ChevronLeftIcon color={t.textPrimary} />}
          onPress={onLeftPress}
          theme={t}
          aria-label="Go back"
        />
      ) : (
        <div className="w-12" />
      )}
      <h1
        className="text-xl font-extrabold tracking-tight"
        style={{
          color: t.textPrimary,
          fontSize: titleFontSize,
          fontWeight: titleFontWeight,
          letterSpacing: -0.5,
          ...titleStyle,
        }}
      >
        {title}
      </h1>
      {showRightIcon ? (
        <IconButton
          variant="round"
          icon={rightIcon ?? <MoreVerticalIcon color={t.textPrimary} />}
          onPress={onRightPress}
          theme={t}
          aria-label="More options"
        />
      ) : (
        <div className="w-12" />
      )}
    </header>
  );
}

function ChevronLeftIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function MoreVerticalIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
