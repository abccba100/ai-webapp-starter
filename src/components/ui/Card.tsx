import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-card border border-border bg-surface p-7 transition-[border-color,box-shadow] hover:border-[#3a3a50] hover:shadow-glow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
