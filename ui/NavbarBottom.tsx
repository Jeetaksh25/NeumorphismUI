'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuNavbarBottom, neuNavItem, neuBadge } from '../neumorphism';

export interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: number;
  badgeColor?: string;
}

interface NavbarBottomProps extends ThemedProps {
  items: NavItem[];
  activeKey: string;
  onChange: (key: string) => void;
  showLabels?: boolean;
  iconSize?: number;
  borderTopRadius?: number;
  safeAreaPadding?: boolean;
}

export default function NavbarBottom({
  items,
  activeKey,
  onChange,
  showLabels = true,
  iconSize = 20,
  borderTopRadius = 24,
  safeAreaPadding = true,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: NavbarBottomProps) {
  const t = resolveTheme(themeOverride);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-around pt-3 ${safeAreaPadding ? 'pb-6' : 'pb-3'} ${containerClassName ?? ''}`}
      style={{
        ...neuNavbarBottom(t),
        borderTopLeftRadius: borderTopRadius,
        borderTopRightRadius: borderTopRadius,
        ...containerStyle,
      }}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl"
            style={neuNavItem(t, isActive)}
            aria-label={item.label}
          >
            <span className="relative">
              {isActive ? item.activeIcon ?? item.icon : item.icon}
              {item.badge && item.badge > 0 && (
                <span
                  className="absolute -top-1.5 -right-2 min-w-[22px] h-[22px] rounded-[11px] grid place-items-center px-[7px] text-[11px] font-extrabold"
                  style={{
                    color: item.badgeColor ?? t.danger,
                    ...neuBadge(t),
                  }}
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </span>
            {showLabels && (
              <span
                className="text-[10px] font-semibold mt-1"
                style={{ color: isActive ? t.accent : t.textSecondary }}
              >
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
