'use client';

import React, { useState } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuAccordion } from '../neumorphism';

export interface AccordionItem {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps extends ThemedProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenKeys?: string[];
  openKeys?: string[];
  onOpenChange?: (keys: string[]) => void;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenKeys = [],
  openKeys: controlledOpenKeys,
  onOpenChange,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: AccordionProps) {
  const t = resolveTheme(themeOverride);
  const [internalOpenKeys, setInternalOpenKeys] = useState<Set<string>>(
    new Set(defaultOpenKeys)
  );

  const isControlled = controlledOpenKeys !== undefined;
  const openKeysSet = isControlled
    ? new Set(controlledOpenKeys)
    : internalOpenKeys;

  const toggleKey = (key: string) => {
    const next = new Set(openKeysSet);
    if (next.has(key)) {
      next.delete(key);
    } else {
      if (!allowMultiple) {
        next.clear();
      }
      next.add(key);
    }
    if (!isControlled) {
      setInternalOpenKeys(next);
    }
    onOpenChange?.(Array.from(next));
  };

  return (
    <div className={`flex flex-col ${containerClassName ?? ''}`} style={containerStyle}>
      {items.map((item) => {
        const isOpen = openKeysSet.has(item.key);
        return (
          <div
            key={item.key}
            className="mb-3.5 rounded-[20px] overflow-hidden"
            style={neuAccordion(t)}
          >
            <button
              onClick={() => toggleKey(item.key)}
              className="flex items-center justify-between w-full px-5 py-[18px] text-left"
              aria-expanded={isOpen}
            >
              <span
                className="text-[15px] font-bold flex-1 mr-4"
                style={{ color: t.textPrimary }}
              >
                {item.title}
              </span>
              <span
                className="transition-transform duration-200 flex-shrink-0"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={t.textSecondary}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-200 ease-in-out"
              style={{
                maxHeight: isOpen ? 999 : 0,
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div
                className="px-5 pb-[18px] text-sm leading-[22px]"
                style={{ color: t.textSecondary }}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
