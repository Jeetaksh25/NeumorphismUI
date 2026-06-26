'use client';

import React, { useState } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuListItem, neuListItemPressed, neuListIcon, neuBadge } from '../neumorphism';

interface ListItemProps extends ThemedProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: number | string | null;
  badgeColor?: string;
  showChevron?: boolean;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

export default function ListItem({
  title,
  subtitle,
  icon,
  badge,
  badgeColor,
  showChevron = true,
  rightElement,
  onPress,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: ListItemProps) {
  const t = resolveTheme(themeOverride);
  const [pressed, setPressed] = useState(false);

  const Wrapper = onPress ? 'button' : 'div';
  const pressProps = onPress
    ? {
        onClick: onPress,
        onMouseDown: () => setPressed(true),
        onMouseUp: () => setPressed(false),
        onMouseLeave: () => setPressed(false),
      }
    : {};

  const style = pressed ? neuListItemPressed(t) : neuListItem(t);

  return (
    <Wrapper
      {...pressProps}
      className={`flex items-center gap-4 py-4 px-4 transition-shadow duration-200 ease-in-out text-left ${containerClassName ?? ''}`}
      style={{
        ...style,
        cursor: onPress ? 'pointer' : 'default',
        ...containerStyle,
      }}
    >
      {icon && (
        <div
          className="grid place-items-center flex-shrink-0"
          style={{ width: 46, height: 46, ...neuListIcon(t) }}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold mb-0.5 truncate" style={{ color: t.textPrimary }}>
          {title}
        </div>
        {subtitle && (
          <div className="text-[13px] truncate" style={{ color: t.textSecondary }}>
            {subtitle}
          </div>
        )}
      </div>
      {badge != null && (
        <div
          className="grid place-items-center min-w-[22px] h-[22px] px-[7px] rounded-[11px] flex-shrink-0"
          style={{ ...neuBadge(t) }}
        >
          <span className="text-[11px] font-extrabold" style={{ color: badgeColor ?? t.danger }}>
            {badge}
          </span>
        </div>
      )}
      {rightElement}
      {showChevron && !rightElement && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </Wrapper>
  );
}
