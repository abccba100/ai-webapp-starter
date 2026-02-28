"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWizard } from "@/context/WizardContext";

const steps = [
  { path: "/input", label: "Idea" },
  { path: "/spec", label: "Spec" },
  { path: "/design", label: "Design" },
  { path: "/build", label: "Build" },
];

export default function Stepper() {
  const pathname = usePathname();
  const { specApproved, selectedTheme } = useWizard();
  if (pathname === "/") return null;

  return (
    <nav className="flex justify-center border-b border-border bg-surface2 py-4 md:hidden">
      <div className="mx-auto flex max-w-[960px] items-center gap-4 overflow-x-auto px-4 sm:px-8">
        {steps.map((step, idx) => {
          const isActive = pathname.startsWith(step.path);
          const isDesignStep = step.path === "/design";
          const isBuildStep = step.path === "/build";
          const isDisabled =
            (isDesignStep && !specApproved) ||
            (isBuildStep && (!specApproved || !selectedTheme));

          if (isDisabled) {
            return (
              <span
                key={step.path}
                className="flex shrink-0 cursor-not-allowed items-center gap-2 rounded-lg px-3 py-1.5 text-text2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded bg-surface text-xs font-bold text-text2">
                  {idx + 1}
                </span>
                {step.label}
              </span>
            );
          }

          return (
            <Link
              key={step.path}
              href={step.path}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 transition ${
                isActive
                  ? "bg-accent font-medium text-white"
                  : "text-text2 hover:text-text"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-surface text-text2"
                }`}
              >
                {idx + 1}
              </span>
              {step.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
