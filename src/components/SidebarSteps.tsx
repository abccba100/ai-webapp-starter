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
  const { specApproved } = useWizard();
  if (pathname === "/") return null;

  return (
    <aside className="hidden md:block w-56 shrink-0">
      <div className="card sticky top-20 space-y-4">
        <h2 className="text-sm font-semibold text-secondary/80 tracking-wide">
          MVP 단계
        </h2>
        <nav className="space-y-1">
          {steps.map((step) => {
            const isActive = pathname.startsWith(step.path);
            const isDesignStep = step.path === "/design";
            const isDisabled = isDesignStep && !specApproved;

            if (isDisabled) {
              return (
                <div
                  key={step.path}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm bg-slate-100 text-slate-300 cursor-not-allowed"
                >
                  <span className="font-medium">{step.label}</span>
                  <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                    승인 필요
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={step.path}
                href={step.path}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span className="font-medium">{step.label}</span>
                {isActive && (
                  <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-white/80">
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

