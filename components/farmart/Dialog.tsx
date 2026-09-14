"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
}

/** {component.dialog-overlay} / {component.dialog} / {component.dialog-close-button} */
export function Dialog({
  open,
  onClose,
  title,
  children,
  primaryLabel = "Confirm",
  secondaryLabel = "Cancel",
  onPrimaryClick,
}: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(40,55,75,0.5)] p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[420px] rounded-lg bg-white p-6 shadow-[0_20px_40px_rgba(40,55,75,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-[17px] font-bold leading-snug text-[#28374b]">{title}</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#8a8f98] transition-colors hover:bg-[#f7f7f7]"
          >
            ✕
          </button>
        </div>

        <div className="text-[13px] leading-relaxed text-[#5b6672]">{children}</div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {secondaryLabel}
          </Button>
          <Button variant="primary" onClick={onPrimaryClick}>
            {primaryLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
