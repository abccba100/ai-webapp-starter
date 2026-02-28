"use client";

import { useState } from "react";
import { useWizard } from "@/context/WizardContext";
import { Button, Card } from "@/components/ui";
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
    <Card className="mb-0">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-text">기능 목록</h2>
      </div>

      <ul className="space-y-2">
        {specs.map((spec) => (
          <li
            key={spec.id}
            className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-border bg-surface2 px-4 py-3"
          >
            <span className="min-w-0 flex-1 truncate break-words text-base text-text">
              {spec.feature}
            </span>
            {!isReadOnly && (
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => togglePriority(spec.id)}
                  className={`rounded px-2 py-1 text-xs font-semibold transition ${
                    spec.priority === "P0"
                      ? "bg-accent3/15 text-accent3"
                      : "bg-accent2/15 text-accent2"
                  }`}
                >
                  {spec.priority === "P0" ? "필수" : "권장"}
                </button>
                <button
                  onClick={() => removeSpec(spec.id)}
                  className="text-text2 transition hover:text-accent3"
                  aria-label="삭제"
                >
                  ✕
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {!isReadOnly && (
        <div className="mt-4 flex min-w-0 gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="기능 직접 추가..."
            className="ds-input flex-1 min-w-0"
            onKeyDown={(e) => e.key === "Enter" && addSpec()}
          />
          <Button type="button" onClick={addSpec}>
            추가
          </Button>
        </div>
      )}
    </Card>
  );
}
