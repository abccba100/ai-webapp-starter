"use client";

import { useState } from "react";
import { useWizard } from "@/context/WizardContext";
import { SpecItem } from "@/types";

export default function SpecEditor() {
  const { specs, setSpecs, specApproved } = useWizard();
  const isReadOnly = specApproved;
  const [newItem, setNewItem] = useState("");

  const addSpec = () => {
    if (isReadOnly || !newItem) return;
    setSpecs([
      ...specs,
      { id: Date.now().toString(), feature: newItem, priority: "P1" } as SpecItem,
    ]);
    setNewItem("");
  };

  const removeSpec = (id: string) => {
    if (isReadOnly) return;
    setSpecs(specs.filter((s) => s.id !== id));
  };

  const togglePriority = (id: string) => {
    if (isReadOnly) return;
    setSpecs(
      specs.map((s) =>
        s.id === id ? { ...s, priority: s.priority === "P0" ? "P1" : "P0" } : s
      )
    );
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-medium text-neutral-900">기능 목록</h2>
      </div>

      <ul className="space-y-2">
          {specs.map((spec) => (
            <li
              key={spec.id}
              className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="min-w-0 flex-1 truncate text-base text-neutral-900">
                {spec.feature}
              </span>
              {!isReadOnly && (
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => togglePriority(spec.id)}
                    className={`rounded px-2 py-1 text-xs font-medium transition ${
                      spec.priority === "P0"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {spec.priority === "P0" ? "필수" : "권장"}
                  </button>
                  <button
                    onClick={() => removeSpec(spec.id)}
                    className="text-neutral-400 transition hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

      {!isReadOnly && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="기능 직접 추가..."
            className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300"
            onKeyDown={(e) => e.key === "Enter" && addSpec()}
          />
          <button
            onClick={addSpec}
            className="rounded-lg bg-neutral-900 px-4 py-3 text-base font-medium text-white transition hover:bg-neutral-800"
          >
            추가
          </button>
        </div>
      )}
    </div>
  );
}
