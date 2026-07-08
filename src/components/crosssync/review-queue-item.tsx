import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "./status-badge";
import { PlatformIcon } from "./platform-icon";
import { ChangeBadge } from "./change-badge";
import type { ReviewItem } from "@/data/sample";

const priorityTone = { High: "danger", Medium: "warning", Low: "info" } as const;

function platformLabel(p: "lovable" | "replit") {
  return p === "lovable" ? "Lovable (web)" : "Replit (mobile)";
}

export function ReviewQueueItem({ item }: { item: ReviewItem }) {
  return (
    <Link
      to="/review"
      className="group flex flex-col gap-2 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-medium leading-snug">{item.summary}</div>
        <StatusBadge tone={priorityTone[item.priority]}>{item.priority}</StatusBadge>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <PlatformIcon platform={item.source} />
        <span>{platformLabel(item.source)}</span>
        <ArrowRight className="h-3 w-3" />
        <PlatformIcon platform={item.target} />
        <span>{platformLabel(item.target)}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <ChangeBadge type={item.changeType} />
        <span className="text-border">•</span>
        <span>Detected {item.detectedAt}</span>
      </div>
    </Link>
  );
}
