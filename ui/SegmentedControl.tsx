'use client';

import React, { useRef, useState, useEffect } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuSegmentedControl, neuSegmentActive } from '../neumorphism';

export interface Segment {
  label: string;
  value: string;
}

interface SegmentedControlProps extends ThemedProps {
  segments: Segment[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export default function SegmentedControl({
  segments,
  selectedValue,
  onValueChange,
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: SegmentedControlProps) {
  const t = resolveTheme(themeOverride);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const activeIndex = segments.findIndex((s) => s.value === selectedValue);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth / segments.length;
      setIndicatorStyle({
        width,
        transform: `translateX(${activeIndex * width}px)`,
      });
    }
  }, [activeIndex, segments.length]);

  return (
    <div
      ref={containerRef}
      className={`relative flex p-1 ${containerClassName ?? ''}`}
      style={{
        ...neuSegmentedControl(t),
        ...containerStyle,
      }}
      role="tablist"
    >
      <div
        className="absolute top-1 bottom-1 left-1 rounded-xl transition-transform duration-300 ease-out"
        style={{
          ...neuSegmentActive(t),
          ...indicatorStyle,
        }}
      />
      {segments.map((segment) => {
        const isActive = segment.value === selectedValue;
        return (
          <button
            key={segment.value}
            onClick={() => onValueChange(segment.value)}
            className="relative flex-1 py-3 px-2 rounded-xl grid place-items-center"
            role="tab"
            aria-selected={isActive}
          >
            <span
              className="text-sm font-bold whitespace-nowrap"
              style={{ color: isActive ? t.accent : t.textSecondary }}
            >
              {segment.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
