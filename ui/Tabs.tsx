'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuTab, neuBadge } from '../neumorphism';

export interface TabItem {
  key: string;
  label: string;
  badge?: number;
}

interface TabsProps extends ThemedProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  gap?: number;
}

export default function Tabs({
  tabs,
  activeKey,
  onChange,
  gap = 12,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: TabsProps) {
  const t = resolveTheme(themeOverride);

  return (
    <div className={`overflow-x-auto ${containerClassName ?? ''}`} style={containerStyle}>
      <div className="flex pb-1" style={{ gap, padding: 12 }}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className="flex items-center rounded-[14px] transition-shadow duration-200 ease-in-out"
              style={{
                padding: '10px 22px',
                ...neuTab(t, isActive),
              }}
              role="tab"
              aria-selected={isActive}
            >
              <span
                className="text-sm font-bold whitespace-nowrap"
                style={{ color: isActive ? t.accent : t.textSecondary }}
              >
                {tab.label}
              </span>
              {tab.badge != null && tab.badge > 0 && (
                <span
                  className="ml-2 grid place-items-center min-w-[20px] h-[20px] px-[5px] rounded-[10px] text-[10px] font-extrabold"
                  style={{
                    color: t.danger,
                    ...neuBadge(t),
                  }}
                >
                  {tab.badge > 99 ? '99+' : tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
