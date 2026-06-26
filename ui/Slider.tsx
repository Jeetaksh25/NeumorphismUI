'use client';

import React, { useRef, useState, useCallback } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuSliderTrack, neuSliderThumb, neuPressed } from '../neumorphism';

interface SliderProps extends ThemedProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
  showValue?: boolean;
  showLabels?: boolean;
  minLabel?: string;
  maxLabel?: string;
  valueFormatter?: (value: number) => string;
}

export default function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  showValue = true,
  showLabels = true,
  minLabel,
  maxLabel,
  valueFormatter = (v) => String(v),
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: SliderProps) {
  const t = resolveTheme(themeOverride);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const computeValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const raw = (clientX - rect.left) / rect.width;
      const clamped = Math.max(0, Math.min(1, raw));
      const rawValue = min + clamped * (max - min);
      const stepped = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, stepped));
    },
    [min, max, step, value]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(true);
    onValueChange(computeValue(e.clientX));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragging) {
      onValueChange(computeValue(e.clientX));
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
    <div className={`flex flex-col py-2.5 px-1 ${containerClassName ?? ''}`} style={containerStyle}>
      {showValue && (
        <div className="text-center text-lg font-extrabold mb-2" style={{ color: t.accent }}>
          {valueFormatter(value)}
        </div>
      )}
      <div className="relative">
        <div
          ref={trackRef}
          className="w-full grid"
          style={{ height: 14, ...neuSliderTrack(t) }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
            style={{
              height: 8,
              width: `${percentage}%`,
              backgroundColor: t.accent,
              boxShadow: '2px 0 10px rgba(66,133,244,0.4)',
              marginLeft: 3,
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 28,
              height: 28,
              left: `calc(${percentage}% - 14px)`,
              border: `3px solid ${t.bgColor}`,
              ...(dragging ? neuPressed(t) : neuSliderThumb(t)),
              cursor: 'grab',
            }}
          />
        </div>
      </div>
      {showLabels && (
        <div className="flex justify-between mt-2.5 text-xs font-bold" style={{ color: t.textSecondary }}>
          <span>{minLabel ?? min}</span>
          <span>{maxLabel ?? max}</span>
        </div>
      )}
    </div>
  );
}
