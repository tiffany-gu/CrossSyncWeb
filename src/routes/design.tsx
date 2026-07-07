import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/crosssync/status-badge";
import { designChecks, webToMobileIssues } from "@/data/sample";
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design Consistency — CrossSync Agent" },
      { name: "description", content: "Detect visual and interaction inconsistencies between web and mobile." },
    ],
  }),
  component: DesignPage,
});

const statusMap = {
  pass: { tone: "success" as const, label: "Pass", Icon: CheckCircle2 },
  warn: { tone: "warning" as const, label: "Warning", Icon: AlertTriangle },
  fail: { tone: "danger" as const, label: "Fail", Icon: XCircle },
};

function DesignPage() {
  return (
    <AppShell>
      <PageHeader
        title="Design Consistency"
        description="Where the mobile app drifts from the web experience — and how to fix it."
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-0">
          <div className="border-b p-5">
            <h2 className="text-base font-semibold">Consistency checks</h2>
            <p className="text-xs text-muted-foreground">Automated design parity checks across both platforms.</p>
          </div>
          <div className="divide-y">
            {designChecks.map((c) => {
              const s = statusMap[c.status];
              return (
                <div key={c.name} className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[1.4fr_auto_1fr_auto] sm:items-center">
                  <div className="flex items-center gap-3">
                    <s.Icon className={`h-4 w-4 shrink-0 ${c.status === "pass" ? "text-success" : c.status === "warn" ? "text-warning" : "text-danger"}`} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">Last checked {c.lastChecked}</div>
                    </div>
                  </div>
                  <StatusBadge tone={s.tone}>{s.label}</StatusBadge>
                  <div className="text-xs text-muted-foreground">{c.fix}</div>
                  <StatusBadge tone={c.severity === "High" ? "danger" : c.severity === "Medium" ? "warning" : "neutral"}>
                    {c.severity}
                  </StatusBadge>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-warning" />
            <h2 className="text-base font-semibold">Common Web-to-Mobile Issues</h2>
          </div>
          <ul className="space-y-3">
            {webToMobileIssues.map((issue, i) => (
              <li key={i} className="flex gap-3 rounded-lg border bg-muted/30 p-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground">{issue}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
