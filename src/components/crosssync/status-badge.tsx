import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

const toneClass: Record<StatusTone, string> = {
  success: "bg-success-soft text-success ring-success/20",
  warning: "bg-warning-soft text-warning-foreground ring-warning/30",
  danger: "bg-danger-soft text-danger ring-danger/20",
  info: "bg-info-soft text-info ring-info/20",
  neutral: "bg-neutral-soft text-muted-foreground ring-border",
  primary: "bg-primary/10 text-primary ring-primary/20",
};

export function StatusBadge({
  tone = "neutral",
  children,
  icon,
  className,
}: {
  tone?: StatusTone;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        toneClass[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function StatusDot({ tone = "neutral", pulse = false }: { tone?: StatusTone; pulse?: boolean }) {
  const dotColor: Record<StatusTone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
    neutral: "bg-muted-foreground/50",
    primary: "bg-primary",
  };
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && (
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60 cs-pulse", dotColor[tone])} />
      )}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotColor[tone])} />
    </span>
  );
}
