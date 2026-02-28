import * as React from "react";

const variantStyles = {
  primary:
    "bg-accent text-white hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(108,99,255,0.35)]",
  secondary:
    "border border-border bg-transparent text-text hover:border-accent hover:text-accent",
  success:
    "bg-accent2 text-[#001a14] hover:-translate-y-px",
} as const;

type ButtonVariant = keyof typeof variantStyles;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
