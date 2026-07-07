import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/crosssync/status-badge";
import { features, type FeatureStatus } from "@/data/sample";
import { Search } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Feature Mapping — CrossSync Agent" },
      { name: "description", content: "Track which features exist on Lovable web and Replit mobile — and where they diverge." },
    ],
  }),
  component: FeaturesPage,
});

const statusTone: Record<FeatureStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
  Synced: "success",
  "Missing on Lovable": "danger",
  "Missing on Replit": "danger",
  Outdated: "warning",
  "Needs Review": "warning",
};

const cellTone = {
  Present: "success",
  Missing: "danger",
  Outdated: "warning",
  Partial: "warning",
} as const;

function FeaturesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Feature Mapping"
        description="A single source of truth for what's shipped on web vs mobile."
      />

      <Card className="mb-4 flex flex-wrap items-center gap-3 p-3">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search features…"
            className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        {(["All", "Synced", "Outdated", "Needs Review", "Missing"] as const).map((f, i) => (
          <button
            key={f}
            className={`h-8 rounded-md px-3 text-xs font-medium ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"}`}
          >
            {f}
          </button>
        ))}
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Feature</th>
                <th className="px-4 py-3 font-medium">Lovable Web</th>
                <th className="px-4 py-3 font-medium">Replit Mobile</th>
                <th className="px-4 py-3 font-medium">Last updated</th>
                <th className="px-4 py-3 font-medium">Sync status</th>
                <th className="px-4 py-3 font-medium">Required action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {features.map((f) => (
                <tr key={f.name} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{f.name}</td>
                  <td className="px-4 py-3"><StatusBadge tone={cellTone[f.lovable]}>{f.lovable}</StatusBadge></td>
                  <td className="px-4 py-3"><StatusBadge tone={cellTone[f.replit]}>{f.replit}</StatusBadge></td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{f.updated}</td>
                  <td className="px-4 py-3"><StatusBadge tone={statusTone[f.status]}>{f.status}</StatusBadge></td>
                  <td className="px-4 py-3 text-muted-foreground">{f.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
