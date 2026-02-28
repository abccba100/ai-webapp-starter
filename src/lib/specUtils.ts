import type { SpecItem } from "@/types";

export function mapAnalyzeResultToSpecs(result: {
  coreFeatures: string[];
  adminFeatures: string[];
  optionalFeatures: string[];
}): SpecItem[] {
  const items: SpecItem[] = [];
  let id = 1;
  result.coreFeatures.forEach((f) =>
    items.push({ id: String(id++), feature: f, priority: "P0" })
  );
  result.adminFeatures.forEach((f) =>
    items.push({ id: String(id++), feature: f, priority: "P1" })
  );
  result.optionalFeatures.forEach((f) =>
    items.push({ id: String(id++), feature: f, priority: "P1" })
  );
  return items;
}
