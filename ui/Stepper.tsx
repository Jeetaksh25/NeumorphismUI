'use client';

import React, { useState } from 'react';
import { resolveTheme, ThemedProps } from '../theme';
import { neuStepper, neuStepperBtn, neuStepperBtnPressed } from '../neumorphism';

interface StepperProps extends ThemedProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  valueFormatter?: (value: number) => string;
}

export default function Stepper({
  value,
  onValueChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  valueFormatter = (v) => String(v),
  theme: themeOverride,
  containerStyle,
  containerClassName,
}: StepperProps) {
  const t = resolveTheme(themeOverride);
  const [minusPressed, setMinusPressed] = useState(false);
  const [plusPressed, setPlusPressed] = useState(false);

  const decrease = () => onValueChange(Math.max(min, value - step));
  const increase = () => onValueChange(Math.min(max, value + step));

  return (
    <div
      className={`flex items-center gap-3.5 p-1 ${containerClassName ?? ''}`}
      style={{
        ...neuStepper(t),
        ...containerStyle,
      }}
    >
      <button
        onClick={decrease}
        disabled={value <= min}
        className="grid place-items-center transition-shadow duration-100"
        style={{
          width: 40,
          height: 40,
          ...(minusPressed ? neuStepperBtnPressed(t) : neuStepperBtn(t)),
          opacity: value <= min ? 0.4 : 1,
          cursor: value <= min ? 'not-allowed' : 'pointer',
        }}
        aria-label="Decrease"
        onMouseDown={() => value > min && setMinusPressed(true)}
        onMouseUp={() => setMinusPressed(false)}
        onMouseLeave={() => setMinusPressed(false)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="text-[17px] font-extrabold min-w-[32px] text-center" style={{ color: t.textPrimary }}>
        {valueFormatter(value)}
      </span>
      <button
        onClick={increase}
        disabled={value >= max}
        className="grid place-items-center transition-shadow duration-100"
        style={{
          width: 40,
          height: 40,
          ...(plusPressed ? neuStepperBtnPressed(t) : neuStepperBtn(t)),
          opacity: value >= max ? 0.4 : 1,
          cursor: value >= max ? 'not-allowed' : 'pointer',
        }}
        aria-label="Increase"
        onMouseDown={() => value < max && setPlusPressed(true)}
        onMouseUp={() => setPlusPressed(false)}
        onMouseLeave={() => setPlusPressed(false)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
