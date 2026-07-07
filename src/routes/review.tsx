import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/crosssync/status-badge";
import { PlatformIcon } from "@/components/crosssync/platform-icon";
import { reviewQueue } from "@/data/sample";
import { ArrowRight, Check, X, Pencil, FileCode2, CheckCircle2, AlertTriangle, XCircle, Wand2 } from "lucide-react";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Human Review — CrossSync Agent" },
      { name: "description", content: "Verify agent-proposed changes with side-by-side diffs and validation checks before they ship to either platform." },
    ],
  }),
  component: ReviewPage,
});

const priorityTone = { High: "danger", Medium: "warning", Low: "info" } as const;
const checkIcon = {
  pass: <CheckCircle2 className="h-3.5 w-3.5 text-success" />,
  warn: <AlertTriangle className="h-3.5 w-3.5 text-warning" />,
  fail: <XCircle className="h-3.5 w-3.5 text-danger" />,
};

function platformLabel(p: "lovable" | "replit") {
  return p === "lovable" ? "Lovable (web)" : "Replit (mobile)";
}

function ReviewPage() {
  const highCount = reviewQueue.filter((r) => r.priority === "High").length;
  return (
    <AppShell>
      <PageHeader
        title="Human Review Queue"
        description={`${reviewQueue.length} change${reviewQueue.length === 1 ? "" : "s"} awaiting verification · ${highCount} high priority`}
        actions={
          <Link
            to="/planner"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border bg-card px-3 text-sm font-medium hover:bg-accent"
          >
            <Wand2 className="h-4 w-4" /> Open Sync Planner
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4">
        {reviewQueue.map((r) => (
          <Card key={r.id} className="overflow-hidden p-0">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b bg-muted/30 p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <PlatformIcon platform={r.source} />
                  <span>{platformLabel(r.source)}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                  <PlatformIcon platform={r.target} />
                  <span>{platformLabel(r.target)}</span>
                  <span className="mx-1 text-border">•</span>
                  <span>{r.changeType}</span>
                  <span className="mx-1 text-border">•</span>
                  <span>Detected {r.detectedAt}</span>
                </div>
                <div className="mt-2 text-base font-semibold">{r.summary}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge tone={priorityTone[r.priority]}>{r.priority} priority</StatusBadge>
                <StatusBadge tone="warning">Needs review</StatusBadge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Verify the change across both platforms
                </div>
                <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-lg border bg-card">
                    <div className="flex items-center justify-between border-b px-3 py-2 text-xs">
                      <span className="font-medium">{r.before.label}</span>
                      <StatusBadge tone="neutral">Before</StatusBadge>
                    </div>
                    <pre className="max-h-52 overflow-auto p-3 text-[12px] leading-relaxed text-muted-foreground">
{r.before.snippet}
                    </pre>
                  </div>
                  <div className="rounded-lg border border-primary/30 bg-primary/5">
                    <div className="flex items-center justify-between border-b border-primary/20 px-3 py-2 text-xs">
                      <span className="font-medium">{r.after.label}</span>
                      <StatusBadge tone="primary">After</StatusBadge>
                    </div>
                    <pre className="max-h-52 overflow-auto p-3 text-[12px] leading-relaxed">
{r.after.snippet}
                    </pre>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Affected files</div>
                  <ul className="mt-2 space-y-1.5">
                    {r.affectedFiles.map((f) => (
                      <li key={f.path} className="flex items-center gap-2 text-xs">
                        <FileCode2 className="h-3.5 w-3.5 text-muted-foreground" />
                        <PlatformIcon platform={f.platform} />
                        <span className="font-mono text-foreground/80">{f.path}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border bg-muted/30 p-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Why review is required</div>
                  <div className="mt-1 text-sm">{r.reason}</div>
                </div>
                <div className="rounded-lg border bg-primary/5 p-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-primary">Agent&apos;s recommended action</div>
                  <div className="mt-1 text-sm">{r.suggested}</div>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Verification checks</div>
                  <ul className="mt-2 space-y-1.5">
                    {r.checks.map((c) => (
                      <li key={c.label} className="flex items-start gap-2 text-xs">
                        <span className="mt-0.5">{checkIcon[c.status]}</span>
                        <div className="min-w-0">
                          <div className="font-medium text-foreground">{c.label}</div>
                          {c.note && <div className="text-muted-foreground">{c.note}</div>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-muted/20 px-5 py-3">
              <div className="text-[11px] text-muted-foreground">
                Approving applies the change to <span className="font-medium text-foreground">{platformLabel(r.target)}</span> and marks the pair as in-sync.
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex h-9 items-center gap-1.5 rounded-md border bg-card px-3 text-sm font-medium hover:bg-accent">
                  <X className="h-4 w-4" /> Reject
                </button>
                <button className="inline-flex h-9 items-center gap-1.5 rounded-md border bg-card px-3 text-sm font-medium hover:bg-accent">
                  <Pencil className="h-4 w-4" /> Edit instructions
                </button>
                <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  <Check className="h-4 w-4" /> Approve & apply
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
