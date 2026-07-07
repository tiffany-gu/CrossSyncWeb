import { Check, Loader2, Circle, Ban, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StepStatus } from "@/data/sample";
import { StatusBadge, type StatusTone } from "./status-badge";

const iconByStatus = {
  complete: Check,
  running: Loader2,
  pending: Circle,
  blocked: Ban,
  failed: AlertOctagon,
} as const;

const toneByStatus: Record<StepStatus, StatusTone> = {
  complete: "success",
  running: "primary",
  pending: "neutral",
  blocked: "warning",
  failed: "danger",
};

const labelByStatus: Record<StepStatus, string> = {
  complete: "Complete",
  running: "Running",
  pending: "Pending",
  blocked: "Blocked",
  failed: "Failed",
};

export function AgentProgress({
  steps,
}: {
  steps: { label: string; status: StepStatus; detail?: string }[];
}) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => {
        const Icon = iconByStatus[step.status];
        const tone = toneByStatus[step.status];
        const isRunning = step.status === "running";
        const isComplete = step.status === "complete";
        return (
          <li
            key={step.label}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3",
              isRunning ? "border-primary/40 bg-primary/5" : "bg-card",
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                  isComplete
                    ? "bg-success text-success-foreground"
                    : isRunning
                      ? "bg-primary text-primary-foreground"
                      : step.status === "failed"
                        ? "bg-danger text-danger-foreground"
                        : step.status === "blocked"
                          ? "bg-warning text-warning-foreground"
                          : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isRunning && "animate-spin")} />
              </div>
              {i < steps.length - 1 && <div className="mt-1 h-4 w-px bg-border" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="truncate text-sm font-medium">{step.label}</div>
                <StatusBadge tone={tone}>{labelByStatus[step.status]}</StatusBadge>
              </div>
              {step.detail && (
                <div className="mt-0.5 text-xs text-muted-foreground">{step.detail}</div>
              )}
              {isRunning && (
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-primary/15">
                  <div className="h-full w-1/2 rounded-full bg-primary cs-pulse" />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
