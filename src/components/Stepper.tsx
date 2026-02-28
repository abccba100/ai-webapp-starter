// src/components/Stepper.tsx
"use client";
import { usePathname } from "next/navigation";

const steps = [
  { path: "/input", label: "Idea" },
  { path: "/spec", label: "Spec" },
  { path: "/design", label: "Design" },
  { path: "/build", label: "Build" },
];

export default function Stepper() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <nav className="md:hidden flex justify-center py-4 bg-background border-b">
      <div className="flex items-center space-x-4 overflow-x-auto px-4">
        {steps.map((step, idx) => {
          const isActive = pathname.startsWith(step.path);
          return (
            <div key={step.path} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={`ml-2 text-xs ${
                  isActive
                    ? "font-semibold text-secondary"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <div className="w-8 h-px bg-slate-300 ml-4" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
