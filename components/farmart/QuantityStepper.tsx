"use client";

import { useState } from "react";

export interface QuantityStepperProps {
  /** Pass together with `onChange` for a fully controlled stepper. */
  value?: number;
  onChange?: (value: number) => void;
  /** Initial count when uncontrolled (no `value` passed) — defaults to `min`. */
  defaultValue?: number;
  min?: number;
  max?: number;
}

/** {component.qty-stepper-button} — the -/+ control used on product cards and the product detail page. */
export function QuantityStepper({
  value,
  onChange,
  defaultValue,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? min);
  const current = isControlled ? value : internalValue;

  const set = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    if (isControlled) {
      onChange?.(clamped);
    } else {
      setInternalValue(clamped);
      onChange?.(clamped);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => set(current - 1)}
        disabled={current <= min}
        className="flex h-[22px] w-[22px] items-center justify-center rounded border border-[#eeeeee] bg-white text-xs text-[#28374b] disabled:opacity-40"
      >
        -
      </button>
      <span className="w-4 text-center text-[12px] font-semibold text-[#28374b]">{current}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => set(current + 1)}
        disabled={current >= max}
        className="flex h-[22px] w-[22px] items-center justify-center rounded border border-[#eeeeee] bg-white text-xs text-[#28374b] disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
