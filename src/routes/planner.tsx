import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/crosssync/status-badge";
import { PlatformIcon } from "@/components/crosssync/platform-icon";
import { plannerIssues } from "@/data/sample";
import { AlertTriangle, Sparkles, Play, ChevronRight, User, Bot } from "lucide-react";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Sync Planner — CrossSync Agent" },
      { name: "description", content: "Diagnose bugs and misalignments between Lovable and Replit, then choose the agent's course of action." },
    ],
  }),
  component: PlannerPage,
});

const severityTone = {
  Critical: "danger",
  High: "danger",
  Medium: "warning",
  Low: "info",
} as const;

const effortLabel = { S: "Small", M: "Medium", L: "Large" } as const;

function PlannerPage() {
  const critical = plannerIssues.filter((i) => i.severity === "High" || i.severity === "Critical").length;

  return (
    <AppShell>
      <PageHeader
        title="Sync Planner"
        description="For every bug or misalignment the agent detects, review the diagnosis and choose a course of action."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-medium text-warning-foreground ring-1 ring-inset ring-warning/30">
            <AlertTriangle className="h-3.5 w-3.5" />
            {critical} high-severity open
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-4">
        {plannerIssues.map((issue) => (
          <Card key={issue.id} className="overflow-hidden p-0">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b bg-muted/30 p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{issue.category}</span>
                  <span className="text-border">•</span>
                  {issue.platform === "both" ? (
                    <span className="inline-flex items-center gap-1">
                      <PlatformIcon platform="lovable" /> + <PlatformIcon platform="replit" /> Both
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <PlatformIcon platform={issue.platform} />
                      {issue.platform === "lovable" ? "Lovable" : "Replit"}
                    </span>
                  )}
                  <span className="text-border">•</span>
                  <span>Detected {issue.detectedAt}</span>
                </div>
                <div className="mt-2 text-base font-semibold">{issue.title}</div>
              </div>
              <StatusBadge tone={severityTone[issue.severity]}>{issue.severity}</StatusBadge>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-3">
              <Diag label="Symptom" body={issue.symptom} />
              <Diag label="Root cause" body={issue.rootCause} />
              <Diag label="Impact" body={issue.impact} />
            </div>

            <div className="border-t p-5">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Course of action — choose one
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {issue.options.map((opt) => (
                  <div
                    key={opt.label}
                    className={`relative flex flex-col rounded-lg border p-3 ${
                      opt.recommended ? "border-primary/40 bg-primary/5" : "bg-card"
                    }`}
                  >
                    {opt.recommended && (
                      <span className="absolute -top-2 left-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                        Recommended
                      </span>
                    )}
                    <div className="text-sm font-medium">{opt.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{opt.outcome}</div>
                    <div className="mt-3 flex items-center gap-2 text-[11px]">
                      <span className="rounded bg-muted px-1.5 py-0.5 font-medium">Effort · {effortLabel[opt.effort]}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-medium ${
                          opt.risk === "Low"
                            ? "bg-success-soft text-success"
                            : opt.risk === "Med"
                            ? "bg-warning-soft text-warning-foreground"
                            : "bg-danger-soft text-danger"
                        }`}
                      >
                        Risk · {opt.risk}
                      </span>
                    </div>
                    <button
                      className={`mt-3 inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium ${
                        opt.recommended
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border bg-card hover:bg-accent"
                      }`}
                    >
                      <Play className="h-3.5 w-3.5" /> Run this plan
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t bg-muted/20 p-5">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Recommended plan — step by step
              </div>
              <ol className="space-y-2">
                {issue.plan.map((step, i) => (
                  <li key={step.step} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{step.step}</span>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{step.eta}</span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
                        step.owner === "Agent"
                          ? "bg-primary/10 text-primary ring-primary/20"
                          : "bg-warning-soft text-warning-foreground ring-warning/30"
                      }`}
                    >
                      {step.owner === "Agent" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                      {step.owner}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function Diag({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground/90">{body}</div>
    </div>
  );
}
