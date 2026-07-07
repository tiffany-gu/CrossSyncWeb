import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/crosssync/status-badge";
import { mappingRules } from "@/data/sample";
import { ArrowRight, Hammer, FlaskConical, Sparkles, ScanEye, ShieldCheck, Bot } from "lucide-react";

export const Route = createFileRoute("/mappings")({
  head: () => ({
    meta: [
      { title: "Mapping Rules — CrossSync Agent" },
      { name: "description", content: "How the agent translates web patterns into mobile equivalents — and which ones need human approval." },
    ],
  }),
  component: MappingsPage,
});

const riskTone = { Auto: "success", Review: "warning", "Human only": "danger" } as const;

function MappingsPage() {
  const autoCount = mappingRules.filter((r) => r.risk === "Auto").length;
  const reviewCount = mappingRules.filter((r) => r.risk !== "Auto").length;

  return (
    <AppShell>
      <PageHeader
        title="Web → Mobile Mapping Rules"
        description="How the agent translates Lovable patterns into Replit equivalents. Riskier mappings always route to human review."
        actions={
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 font-medium text-success ring-1 ring-inset ring-success/20">
              <Bot className="h-3.5 w-3.5" /> {autoCount} auto-applied
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-2.5 py-1 font-medium text-warning-foreground ring-1 ring-inset ring-warning/30">
              <ShieldCheck className="h-3.5 w-3.5" /> {reviewCount} gated by review
            </span>
          </div>
        }
      />

      <Card className="mb-5 p-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="font-medium text-foreground">Validation pipeline — runs after every applied mapping:</div>
          <PipelineStep icon={Hammer} label="Build" />
          <ChevronArrow />
          <PipelineStep icon={FlaskConical} label="Tests" />
          <ChevronArrow />
          <PipelineStep icon={Sparkles} label="Lint" />
          <ChevronArrow />
          <PipelineStep icon={ScanEye} label="Visual diff" />
          <ChevronArrow />
          <PipelineStep icon={ShieldCheck} label="Review (if risky)" tone="warning" />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {mappingRules.map((r) => (
          <Card key={r.id} className="overflow-hidden p-0">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b bg-muted/30 p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{r.category}</span>
                  <span className="text-border">•</span>
                  <span>Applied {r.appliedCount}× · last {r.lastApplied}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-base font-semibold">
                  <span>{r.webPattern}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span>{r.mobilePattern}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
              </div>
              <StatusBadge tone={riskTone[r.risk]}>
                {r.risk === "Auto" ? "Auto-applied" : r.risk === "Review" ? "Needs review" : "Human only"}
              </StatusBadge>
            </div>

            <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2">
              <div className="rounded-lg border bg-card">
                <div className="flex items-center justify-between border-b px-3 py-2 text-xs">
                  <span className="font-medium">Lovable (web)</span>
                  <StatusBadge tone="neutral">Source</StatusBadge>
                </div>
                <pre className="max-h-44 overflow-auto p-3 text-[12px] leading-relaxed text-muted-foreground">
{r.webExample}
                </pre>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5">
                <div className="flex items-center justify-between border-b border-primary/20 px-3 py-2 text-xs">
                  <span className="font-medium">Replit (mobile)</span>
                  <StatusBadge tone="primary">Target</StatusBadge>
                </div>
                <pre className="max-h-44 overflow-auto p-3 text-[12px] leading-relaxed">
{r.mobileExample}
                </pre>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function PipelineStep({
  icon: Icon,
  label,
  tone = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone?: "primary" | "warning";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium ring-1 ring-inset ${
        tone === "warning"
          ? "bg-warning-soft text-warning-foreground ring-warning/30"
          : "bg-primary/10 text-primary ring-primary/20"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function ChevronArrow() {
  return <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />;
}
