"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWizard } from "@/context/WizardContext";

const steps = [
  { path: "/input", label: "Idea" },
  { path: "/spec", label: "Spec" },
  { path: "/design", label: "Design" },
  { path: "/build", label: "Build" },
];

export default function SidebarSteps() {
  const pathname = usePathname();
  const { specApproved, selectedTheme } = useWizard();
  if (pathname === "/") return null;

  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <div className="sticky top-24 rounded-card border border-border bg-surface p-6">
        <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          MVP 단계
        </h2>
        <nav className="flex flex-col gap-1">
          {steps.map((step) => {
            const isActive = pathname.startsWith(step.path);
            const isDesignStep = step.path === "/design";
            const isBuildStep = step.path === "/build";
            const isDesignDisabled = isDesignStep && !specApproved;
            const isBuildDisabled =
              isBuildStep && (!specApproved || !selectedTheme);

            if (isDesignDisabled || isBuildDisabled) {
              return (
                <div
                  key={step.path}
                  className="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-2.5 text-sm text-text2"
                >
                  <span className="font-medium">{step.label}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    {isDesignDisabled ? "승인 필요" : "테마 선택 필요"}
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={step.path}
                href={step.path}
                className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-text2 hover:border-accent hover:bg-surface2 hover:text-text"
                }`}
              >
                {step.label}
                {isActive && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                    Active
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
