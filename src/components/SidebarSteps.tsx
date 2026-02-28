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
      <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          MVP 단계
        </h2>
        <nav className="flex flex-col gap-1">
          {steps.map((step) => {
            const isActive = pathname.startsWith(step.path);
            const isDesignStep = step.path === "/design";
            const isBuildStep = step.path === "/build";
            const isDesignDisabled = isDesignStep && !specApproved;
            const isBuildDisabled = isBuildStep && (!specApproved || !selectedTheme);

            if (isDesignDisabled || isBuildDisabled) {
              return (
                <div
                  key={step.path}
                  className="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-2.5 text-sm text-neutral-400"
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
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
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
