import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { PlatformCard } from "@/components/crosssync/platform-card";
import { SyncConnector } from "@/components/crosssync/sync-connector";
import { AgentProgress } from "@/components/crosssync/agent-progress";
import { ActivityItem } from "@/components/crosssync/activity-item";
import { StatusBadge, StatusDot } from "@/components/crosssync/status-badge";
import { activity, agentSteps, designChecks, globalStatus, platforms, quickStats } from "@/data/sample";
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, Palette, Play, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CrossSync Agent" },
      { name: "description", content: "Real-time synchronization status between your Lovable web app and Replit mobile app." },
    ],
  }),
  component: Dashboard,
});

const heroTone: Record<typeof globalStatus.state, "success" | "info" | "primary" | "warning" | "danger"> = {
  "in-sync": "success",
  "lovable-changed": "info",
  "replit-changed": "info",
  "agent-running": "primary",
  "review-required": "warning",
  "sync-failed": "danger",
};

const heroLabel: Record<typeof globalStatus.state, string> = {
  "in-sync": "In Sync",
  "lovable-changed": "Lovable Changed",
  "replit-changed": "Replit Changed",
  "agent-running": "Agent Running",
  "review-required": "Human Review Required",
  "sync-failed": "Sync Failed",
};

function Dashboard() {
  const tone = heroTone[globalStatus.state];
  return (
    <AppShell>
      <PageHeader
        title="Sync Overview"
        description="Real-time status of design and feature parity between Lovable web and Replit mobile."
        actions={
          <>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md border bg-card px-3 text-sm font-medium hover:bg-accent">
              <RefreshCw className="h-3.5 w-3.5" /> Re-scan
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Play className="h-3.5 w-3.5" /> Run sync
            </button>
          </>
        }
      />

      {/* Hero sync status */}
      <Card className="mb-6 overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-6 p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <StatusDot tone={tone} pulse />
              <div className="ml-2 h-3 w-3 rounded-full bg-primary/70" />
            </div>
            <div>
              <StatusBadge tone={tone}>{heroLabel[globalStatus.state]}</StatusBadge>
              <div className="mt-2 text-lg font-semibold tracking-tight">{globalStatus.headline}</div>
              <div className="mt-1 text-sm text-muted-foreground">{globalStatus.detail}</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            Updated {globalStatus.since}
            <Link to="/activity" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              View activity <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Card>

      {/* Quick stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quickStats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{s.hint}</div>
          </Card>
        ))}
      </div>

      {/* Platform pair */}
      <div className="mb-6 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <PlatformCard
          platform="lovable"
          name={platforms.lovable.name}
          type={platforms.lovable.type}
          lastSaved={platforms.lovable.lastSaved}
          detectedChange={platforms.lovable.detectedChange}
          syncBadge="Changed"
          syncTone="info"
          context={platforms.lovable.context}
        />
        <SyncConnector active />
        <PlatformCard
          platform="replit"
          name={platforms.replit.name}
          type={platforms.replit.type}
          lastSaved={platforms.replit.lastSaved}
          detectedChange={platforms.replit.detectedChange}
          syncBadge="Waiting"
          syncTone="neutral"
          context={platforms.replit.context}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_1fr]">
        {/* Agent Progress */}
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Agent Progress</h2>
              <p className="text-xs text-muted-foreground">Current sync from Lovable → Replit</p>
            </div>
            <StatusBadge tone="primary" icon={<StatusDot tone="primary" pulse />}>Running</StatusBadge>
          </div>
          <AgentProgress steps={agentSteps} />
        </Card>

        {/* Recent activity */}
        <Card className="p-0">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h2 className="text-base font-semibold">Recent Sync Activity</h2>
              <p className="text-xs text-muted-foreground">Last 5 events across both platforms</p>
            </div>
            <Link to="/activity" className="text-xs font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="divide-y">
            {activity.slice(0, 5).map((item) => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </div>
        </Card>
      </div>

      {/* Design consistency summary */}
      {(() => {
        const passing = designChecks.filter((c) => c.status === "pass").length;
        const warnings = designChecks.filter((c) => c.status === "warn").length;
        const failing = designChecks.filter((c) => c.status === "fail").length;
        const total = designChecks.length;
        const score = Math.round((passing / total) * 100);
        const attention = designChecks
          .filter((c) => c.status !== "pass")
          .sort((a, b) => (a.status === "fail" ? -1 : b.status === "fail" ? 1 : 0))
          .slice(0, 3);
        return (
          <Card className="mt-6 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                <div>
                  <h2 className="text-base font-semibold">Design Consistency</h2>
                  <p className="text-xs text-muted-foreground">Parity between web and mobile design systems</p>
                </div>
              </div>
              <Link to="/design" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                Open report <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Parity score</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">{score}%</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{passing}/{total} checks passing</div>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-success" /> Passing
                </div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-success">{passing}</div>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  <AlertTriangle className="h-3 w-3 text-warning" /> Warnings
                </div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-warning">{warnings}</div>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  <XCircle className="h-3 w-3 text-danger" /> Failing
                </div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-danger">{failing}</div>
              </div>
            </div>

            {attention.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Needs attention
                </div>
                <ul className="divide-y rounded-lg border">
                  {attention.map((c) => (
                    <li key={c.name} className="flex items-center justify-between gap-3 p-3 text-sm">
                      <div className="flex min-w-0 items-center gap-2">
                        {c.status === "fail" ? (
                          <XCircle className="h-3.5 w-3.5 shrink-0 text-danger" />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-warning" />
                        )}
                        <span className="truncate font-medium">{c.name}</span>
                      </div>
                      <StatusBadge tone={c.severity === "High" ? "danger" : c.severity === "Medium" ? "warning" : "neutral"}>
                        {c.severity}
                      </StatusBadge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        );
      })()}
    </AppShell>
  );
}
