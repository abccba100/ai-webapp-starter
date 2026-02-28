import * as React from "react";

const variantStyles = {
  core: "bg-accent/20 text-accent",
  extra: "bg-accent2/15 text-accent2",
  admin: "bg-accent3/15 text-accent3",
} as const;

type BadgeVariant = keyof typeof variantStyles;

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "core",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
