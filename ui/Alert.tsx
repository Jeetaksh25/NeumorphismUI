'use client';

import React from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuAlert, neuAlertIcon } from '../neumorphism';

export type AlertType = 'success' | 'warning' | 'danger' | 'info';

interface AlertProps extends ThemedProps {
  type?: AlertType;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const iconMap: Record<AlertType, React.ReactNode> = {
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#48bb78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ed8936" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f56565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4299e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const colorMap: Record<AlertType, keyof typeof import('../theme-colors').defaultTheme> = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
};

export default function Alert({
  type = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: AlertProps) {
  const t = resolveTheme(themeOverride);
  const iconColor = t[colorMap[type]];

  return (
    <div
      className={`flex items-center gap-3.5 p-[18px] mb-4 ${containerClassName ?? ''}`}
      style={{
        ...neuAlert(t),
        ...containerStyle,
      }}
      role="alert"
    >
      <div
        className="grid place-items-center flex-shrink-0"
        style={{ width: 42, height: 42, ...neuAlertIcon(t) }}
      >
        {React.cloneElement(iconMap[type] as React.ReactElement<any>, { stroke: iconColor })}
      </div>
      <div className="flex-1">
        {title && (
          <div className="text-sm font-extrabold mb-0.5" style={{ color: t.textPrimary }}>
            {title}
          </div>
        )}
        <div className="text-[13px] leading-5" style={{ color: t.textSecondary }}>
          {message}
        </div>
      </div>
      {dismissible && (
        <button onClick={onDismiss} aria-label="Dismiss alert" className="flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
