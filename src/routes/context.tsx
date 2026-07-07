import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { PlatformIcon } from "@/components/crosssync/platform-icon";
import { StatusBadge, StatusDot } from "@/components/crosssync/status-badge";
import { lovableContext, replitContext } from "@/data/sample";

export const Route = createFileRoute("/context")({
  head: () => ({
    meta: [
      { title: "Platform Context — CrossSync Agent" },
      { name: "description", content: "The design, code, and metadata context the agent has from both Lovable and Replit." },
    ],
  }),
  component: ContextPage,
});

function Panel({
  platform,
  mcp,
  sections,
}: {
  platform: "lovable" | "replit";
  mcp: string;
  sections: { title: string; items: string[] }[];
}) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PlatformIcon platform={platform} />
          <div>
            <div className="text-base font-semibold">{platform === "lovable" ? "Lovable" : "Replit"}</div>
            <div className="text-xs text-muted-foreground">{platform === "lovable" ? "Web app context" : "Mobile app context"}</div>
          </div>
        </div>
        <StatusBadge tone="success" icon={<StatusDot tone="success" />}>MCP {mcp}</StatusBadge>
      </div>
      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.title}>
            <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {s.title}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((it) => (
                <span key={it} className="inline-flex items-center rounded-md border bg-muted/40 px-2 py-1 text-xs">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ContextPage() {
  return (
    <AppShell>
      <PageHeader
        title="Platform Context"
        description="What the agent knows about each platform right now."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel platform="lovable" mcp={lovableContext.mcp} sections={lovableContext.sections} />
        <Panel platform="replit" mcp={replitContext.mcp} sections={replitContext.sections} />
      </div>
    </AppShell>
  );
}
