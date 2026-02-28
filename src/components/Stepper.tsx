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
    <nav className="flex justify-center border-b border-neutral-200 bg-neutral-50 py-4 md:hidden">
      <div className="mx-auto flex max-w-4xl items-center gap-4 overflow-x-auto px-8">
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
                className="flex cursor-not-allowed items-center gap-2 shrink-0 rounded-lg px-3 py-1.5 text-neutral-400"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold bg-neutral-200 text-neutral-500">
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
              className={`flex items-center gap-2 shrink-0 rounded-lg px-3 py-1.5 transition ${
                isActive
                  ? "bg-neutral-900 text-white font-medium"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-600"
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
