import { StatusBadge, type StatusTone } from "./status-badge";
import type { ChangeType } from "@/data/sample";

const toneByType: Record<ChangeType, StatusTone> = {
  "UI Layout": "info",
  Feature: "primary",
  Navigation: "info",
  Content: "neutral",
  "Design System": "primary",
  "Data/API": "warning",
  "Bug Fix": "danger",
};

export function ChangeBadge({ type }: { type: ChangeType }) {
  return <StatusBadge tone={toneByType[type]}>{type}</StatusBadge>;
}
