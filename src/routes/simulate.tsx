import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/crosssync/status-badge";
import { PlatformIcon } from "@/components/crosssync/platform-icon";
import {
  generateSimPlan,
  lovablePages,
  simExamples,
  type SimChangeType,
  type SimPlan,
} from "@/data/sample";
import {
  Play,
  Sparkles,
  ArrowRight,
  FileCode2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Hammer,
  FlaskConical,
  ScanEye,
  Wand2,
  Loader2,
  RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/simulate")({
  head: () => ({
    meta: [
      { title: "Simulate Sync — CrossSync Agent" },
      { name: "description", content: "Simulate a Lovable web change and preview the mobile update plan the agent would apply to Replit." },
    ],
  }),
  component: SimulatePage,
});

const changeTypes: SimChangeType[] = ["UI Layout", "Design System", "Copy", "Navigation", "New Feature", "Data Contract"];

const validationIcon = { build: Hammer, test: FlaskConical, lint: Sparkles, visual: ScanEye };
const validationTone = {
  pass: "text-success bg-success-soft ring-success/20",
  warn: "text-warning-foreground bg-warning-soft ring-warning/30",
  fail: "text-danger bg-danger-soft ring-danger/20",
} as const;

function SimulatePage() {
  const [page, setPage] = useState("/checkout");
  const [type, setType] = useState<SimChangeType>("UI Layout");
  const [description, setDescription] = useState(simExamples[0].description);
  const [plan, setPlan] = useState<SimPlan | null>(null);
  const [runStep, setRunStep] = useState<number>(-1);

  async function runSimulation() {
    const generated = generateSimPlan(page, type, description);
    setPlan(generated);
    setRunStep(0);
    for (let i = 0; i < generated.lifecycle.length; i++) {
      // Progressive reveal
      await new Promise((r) => setTimeout(r, 380));
      setRunStep(i + 1);
    }
  }

  function reset() {
    setPlan(null);
    setRunStep(-1);
  }

  function loadExample(i: number) {
    const ex = simExamples[i];
    setPage(ex.page);
    setType(ex.type);
    setDescription(ex.description);
    setPlan(null);
    setRunStep(-1);
  }

  return (
    <AppShell>
      <PageHeader
        title="Simulate a Sync"
        description="Pretend a designer just saved a change on Lovable. Watch the agent's full lifecycle and preview the mobile plan."
        actions={
          plan && (
            <button
              onClick={reset}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border bg-card px-3 text-sm font-medium hover:bg-accent"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          )
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[420px_1fr]">
        {/* Input panel */}
        <Card className="h-fit p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Wand2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">Simulate a Lovable change</div>
              <div className="text-xs text-muted-foreground">Agent will draft a mobile update plan</div>
            </div>
          </div>

          <div className="space-y-4">
            <Field label="Lovable page">
              <select
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                {lovablePages.map((p) => (
                  <option key={p.path} value={p.path}>
                    {p.name}  ·  {p.path}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Change type">
              <div className="flex flex-wrap gap-1.5">
                {changeTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`h-7 rounded-md px-2 text-[11px] font-medium ring-1 ring-inset transition-colors ${
                      type === t
                        ? "bg-primary text-primary-foreground ring-primary"
                        : "bg-card text-muted-foreground ring-border hover:bg-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Describe the change">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="e.g. Redesign checkout as a 3-column layout with sticky pay CTA"
                className="w-full resize-none rounded-md border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </Field>

            <button
              onClick={runSimulation}
              disabled={!description.trim()}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
            >
              <Play className="h-4 w-4" /> Run simulation
            </button>

            <div>
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Or try a sample</div>
              <div className="space-y-1.5">
                {simExamples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => loadExample(i)}
                    className="w-full rounded-md border bg-card p-2.5 text-left text-xs hover:bg-accent"
                  >
                    <div className="font-medium text-foreground">{ex.type} · {ex.page}</div>
                    <div className="mt-0.5 text-muted-foreground">{ex.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Output panel */}
        <div className="min-w-0">
          {!plan ? <EmptyState /> : <PlanView plan={plan} runStep={runStep} />}
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="grid min-h-[400px] place-items-center border-dashed p-10 text-center">
      <div className="max-w-md">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-semibold">Preview the mobile update</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in a Lovable page and change on the left, then run the simulation to see the full agent lifecycle,
          the suggested Replit code changes, validation results, and how the dashboard would update.
        </p>
      </div>
    </Card>
  );
}

function PlanView({ plan, runStep }: { plan: SimPlan; runStep: number }) {
  const riskTone = plan.risk === "High" ? "danger" : plan.risk === "Medium" ? "warning" : "success";
  return (
    <div className="space-y-4">
      {/* Summary strip */}
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <PlatformIcon platform="lovable" /> Lovable
              <ArrowRight className="h-3.5 w-3.5" />
              <PlatformIcon platform="replit" /> Replit
              <span className="text-border">•</span>
              <span>Mapping: {plan.mappingRule}</span>
            </div>
            <h2 className="mt-1.5 text-lg font-semibold">{plan.headline}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={riskTone}>Risk · {plan.risk}</StatusBadge>
            <StatusBadge tone={plan.requiresReview ? "warning" : "success"}>
              {plan.requiresReview ? "Needs human review" : "Auto-sync eligible"}
            </StatusBadge>
          </div>
        </div>
      </Card>

      {/* Lifecycle */}
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Agent lifecycle
        </div>
        <ol className="space-y-2">
          {plan.lifecycle.map((phase, i) => {
            const state =
              runStep > i ? "done" : runStep === i ? "running" : "pending";
            return (
              <li
                key={phase.key}
                className={`grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-lg border p-3 transition-colors ${
                  state === "done"
                    ? "border-success/30 bg-success-soft/40"
                    : state === "running"
                    ? "border-primary/40 bg-primary/5"
                    : "bg-card"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
                    state === "done"
                      ? "bg-success text-success-foreground"
                      : state === "running"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {state === "running" ? <Loader2 className="h-3 w-3 animate-spin" /> : i + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{phase.label}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{phase.detail}</div>
                  {phase.tool && (
                    <div className="mt-1 font-mono text-[11px] text-primary/80">{phase.tool}</div>
                  )}
                </div>
                <StatusBadge tone={phase.mcp === "Reviewer" ? "warning" : phase.mcp === "Agent" ? "primary" : "info"}>
                  {phase.mcp}
                </StatusBadge>
              </li>
            );
          })}
        </ol>
      </Card>

      {/* Code suggestions */}
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <FileCode2 className="h-3.5 w-3.5 text-primary" /> Suggested Replit code changes
        </div>
        <div className="space-y-4">
          {plan.suggestions.map((s, i) => (
            <div key={i}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="text-sm font-semibold">{s.title}</div>
                <span className="font-mono text-[11px] text-muted-foreground">{s.file}</span>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-lg border bg-card">
                  <div className="flex items-center justify-between border-b px-3 py-2 text-xs">
                    <span className="font-medium">Before</span>
                    <StatusBadge tone="neutral">Current</StatusBadge>
                  </div>
                  <pre className="max-h-48 overflow-auto p-3 text-[12px] leading-relaxed text-muted-foreground">
{s.before}
                  </pre>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5">
                  <div className="flex items-center justify-between border-b border-primary/20 px-3 py-2 text-xs">
                    <span className="font-medium">After</span>
                    <StatusBadge tone="primary">Proposed</StatusBadge>
                  </div>
                  <pre className="max-h-48 overflow-auto p-3 text-[12px] leading-relaxed">
{s.after}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Validation + dashboard impact */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Simulated validation on Replit
          </div>
          <ul className="space-y-2">
            {plan.validation.map((v) => {
              const Icon = validationIcon[v.kind];
              const StatusIcon = v.status === "pass" ? CheckCircle2 : v.status === "warn" ? AlertTriangle : XCircle;
              return (
                <li
                  key={v.kind}
                  className={`flex items-start gap-3 rounded-lg px-3 py-2 text-sm ring-1 ring-inset ${validationTone[v.status]}`}
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium capitalize">{v.kind}</div>
                    <div className="text-xs opacity-80">{v.detail}</div>
                  </div>
                  <StatusIcon className="mt-0.5 h-4 w-4 shrink-0" />
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            How the dashboard would update
          </div>
          <ul className="space-y-2">
            {plan.dashboardImpact.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            Affected mobile files: {plan.affectedMobileFiles.map((f) => (
              <span key={f} className="mr-2 font-mono text-foreground/80">{f}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
