import * as React from "react";

const variantStyles = {
  info: "border-accent/30 bg-accent/10 text-[#a59eff]",
  warn: "border-amber-400/30 bg-amber-400/10 text-amber-400",
  success: "border-accent2/30 bg-accent2/10 text-accent2",
} as const;

type AlertVariant = keyof typeof variantStyles;

interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

export function Alert({
  variant = "info",
  children,
  className = "",
}: AlertProps) {
  return (
    <div
      role="alert"
      className={`mb-4 rounded-lg px-4 py-3 text-[13px] font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
