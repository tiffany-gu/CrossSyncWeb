import { ArrowRight, Hammer, FlaskConical, Sparkles, ScanEye, Loader2, CheckCircle2, XCircle, AlertTriangle, Circle, Route } from "lucide-react";
import { ChangeBadge } from "./change-badge";
import { StatusBadge } from "./status-badge";
import { PlatformIcon } from "./platform-icon";
import type { ActivityItem as ActivityItemT, ValidationCheck } from "@/data/sample";

const resultTone = {
  Applied: "success",
  "Review required": "warning",
  Failed: "danger",
  "In progress": "info",
} as const;

const riskTone = { Low: "neutral", Medium: "warning", High: "danger" } as const;

const kindIcon = {
  build: Hammer,
  test: FlaskConical,
  lint: Sparkles,
  visual: ScanEye,
} as const;

const kindLabel = { build: "Build", test: "Tests", lint: "Lint", visual: "Visual" } as const;

function ValidationPill({ check }: { check: ValidationCheck }) {
  const Icon = kindIcon[check.kind];
  const tone =
    check.status === "pass"
      ? "text-success bg-success-soft ring-success/20"
      : check.status === "fail"
      ? "text-danger bg-danger-soft ring-danger/20"
      : check.status === "warn"
      ? "text-warning-foreground bg-warning-soft ring-warning/30"
      : check.status === "running"
      ? "text-primary bg-primary/10 ring-primary/20"
      : "text-muted-foreground bg-muted ring-border";

  const StatusIcon =
    check.status === "pass"
      ? CheckCircle2
      : check.status === "fail"
      ? XCircle
      : check.status === "warn"
      ? AlertTriangle
      : check.status === "running"
      ? Loader2
      : Circle;

  return (
    <span
      title={check.detail}
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${tone}`}
    >
      <Icon className="h-3 w-3" />
      {kindLabel[check.kind]}
      <StatusIcon className={`h-3 w-3 ${check.status === "running" ? "animate-spin" : ""}`} />
    </span>
  );
}

export function ActivityItem({ item }: { item: ActivityItemT }) {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className="flex items-center gap-1.5 pt-0.5 shrink-0">
        <PlatformIcon platform={item.source} />
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        <PlatformIcon platform={item.target} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">{item.summary}</span>
          <ChangeBadge type={item.changeType} />
          <StatusBadge tone={riskTone[item.risk]}>Risk · {item.risk}</StatusBadge>
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">{item.action}</div>
        {item.mappingRule && item.mappingRule !== "—" && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Route className="h-3 w-3" />
            <span className="font-medium text-foreground/80">Mapping:</span>
            {item.mappingRule}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.validation.map((v) => (
            <ValidationPill key={v.kind} check={v} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <StatusBadge tone={resultTone[item.result]}>{item.result}</StatusBadge>
        <span className="text-xs text-muted-foreground tabular-nums">{item.timestamp}</span>
      </div>
    </div>
  );
}
