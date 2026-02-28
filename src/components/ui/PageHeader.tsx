import * as React from "react";

interface PageHeaderProps {
  tag: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({
  tag,
  title,
  highlight,
  subtitle,
  className = "",
}: PageHeaderProps) {
  return (
    <header className={`space-y-2 ${className}`}>
      <span
        className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent"
        style={{
          fontSize: 11,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        {tag}
      </span>
      <h1
        className="text-[2.25rem] font-extrabold tracking-tight text-text"
        style={{
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: "-1px",
        }}
      >
        {title}
        {highlight != null && (
          <>
            {" "}
            <span className="text-accent">{highlight}</span>
          </>
        )}
      </h1>
      {subtitle && (
        <p
          className="text-base leading-relaxed text-text2"
          style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text2)" }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
