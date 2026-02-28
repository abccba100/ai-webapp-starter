import * as React from "react";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function PageTitle({ children, className }: BaseProps) {
  return (
    <h1
      className={cx(
        "text-5xl font-semibold leading-tight tracking-tight text-neutral-900",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function SectionTitle({ children, className }: BaseProps) {
  return (
    <h2
      className={cx(
        "text-2xl font-medium text-neutral-900",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function CardTitle({ children, className }: BaseProps) {
  return (
    <h3
      className={cx(
        "text-lg font-medium text-neutral-900",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function BodyText({ children, className }: BaseProps) {
  return (
    <p
      className={cx(
        "text-base leading-relaxed text-neutral-600",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className }: BaseProps) {
  return (
    <p
      className={cx(
        "text-sm font-medium tracking-wide text-neutral-500",
        className
      )}
    >
      {children}
    </p>
  );
}
