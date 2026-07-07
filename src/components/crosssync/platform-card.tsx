import { Card } from "@/components/ui/card";
import { PlatformIcon } from "./platform-icon";
import { StatusBadge, StatusDot } from "./status-badge";
import type { PlatformKey } from "@/data/sample";
import { Check, AlertCircle } from "lucide-react";

export function PlatformCard({
  platform,
  name,
  type,
  lastSaved,
  detectedChange,
  syncBadge,
  syncTone,
  context,
}: {
  platform: PlatformKey;
  name: string;
  type: string;
  lastSaved: string;
  detectedChange: string;
  syncBadge: string;
  syncTone: "success" | "warning" | "info" | "danger" | "neutral";
  context: { label: string; value: string; ok: boolean }[];
}) {
  return (
    <Card className="flex-1 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <PlatformIcon platform={platform} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold">{name}</h3>
              <span className="text-xs text-muted-foreground">{type}</span>
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <StatusDot tone={syncTone === "warning" ? "warning" : syncTone === "danger" ? "danger" : "success"} />
              Last saved {lastSaved}
            </div>
          </div>
        </div>
        <StatusBadge tone={syncTone}>{syncBadge}</StatusBadge>
      </div>

      <div className="mt-4 rounded-lg border bg-muted/40 p-3">
        <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Current detected change
        </div>
        <div className="mt-1 text-sm text-foreground">{detectedChange}</div>
      </div>

      <div className="mt-4 space-y-2">
        {context.map((c) => (
          <div key={c.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{c.label}</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              {c.ok ? (
                <Check className="h-3.5 w-3.5 text-success" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 text-warning" />
              )}
              {c.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
