"use client";

import * as React from "react";

const variantFills = {
  accent:
    "linear-gradient(90deg, var(--accent), #9c94ff)",
  accent2:
    "linear-gradient(90deg, var(--accent2), #00ffcc)",
} as const;

type ProgressBarVariant = keyof typeof variantFills;

interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  className?: string;
}

export function ProgressBar({
  value,
  variant = "accent",
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`h-1.5 overflow-hidden rounded-[3px] ${className}`}
      style={{
        height: 6,
        background: "var(--border)",
        borderRadius: 3,
      }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-[3px] transition-[width] duration-[1.5s] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: `${clamped}%`,
          background: variantFills[variant],
          borderRadius: 3,
        }}
      />
    </div>
  );
}
