import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { ActivityItem } from "@/components/crosssync/activity-item";
import { activity } from "@/data/sample";
import { Filter } from "lucide-react";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Sync Activity — CrossSync Agent" },
      { name: "description", content: "Every synchronization event between your Lovable web app and Replit mobile app." },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <AppShell>
      <PageHeader
        title="Sync Activity"
        description="Every change the agent has detected, mapped, and applied across both platforms."
      />
      <Card className="mb-4 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="ml-1 h-4 w-4 text-muted-foreground" />
          {["All platforms", "Lovable", "Replit"].map((f, i) => (
            <button
              key={f}
              className={`h-8 rounded-md px-3 text-xs font-medium ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"}`}
            >
              {f}
            </button>
          ))}
          <div className="mx-2 h-4 w-px bg-border" />
          {["All types", "UI Layout", "Feature", "Design System", "Data/API", "Bug Fix"].map((f, i) => (
            <button
              key={f}
              className={`h-8 rounded-md px-3 text-xs font-medium ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"}`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto text-xs text-muted-foreground">Last 7 days</div>
        </div>
      </Card>
      <Card className="p-0">
        <div className="divide-y">
          {activity.map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
