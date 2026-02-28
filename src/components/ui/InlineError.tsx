"use client";

interface InlineErrorProps {
  message: string;
  id?: string;
}

export default function InlineError({ message, id }: InlineErrorProps) {
  return (
    <span
      id={id}
      role="alert"
      className="text-sm text-destructive"
    >
      {message}
    </span>
  );
}
