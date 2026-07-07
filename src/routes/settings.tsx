import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/crosssync/app-shell";
import { Card } from "@/components/ui/card";
import { StatusBadge, StatusDot } from "@/components/crosssync/status-badge";
import { PlatformIcon } from "@/components/crosssync/platform-icon";
import { agentSettings } from "@/data/sample";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Agent Settings — CrossSync Agent" },
      { name: "description", content: "Control sync direction, review policy, and how strict the agent should be." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-muted",
      )}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-4.5 left-0.5" : "left-0.5",
        )}
        style={{ transform: checked ? "translateX(1rem)" : "translateX(0)" }}
      />
    </button>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-md border bg-muted/40 p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-7 rounded px-3 text-xs font-medium transition-colors",
            value === o.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Row({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        {description && <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function SettingsPage() {
  const [s, setS] = useState(agentSettings);
  const set = <K extends keyof typeof s>(k: K, v: (typeof s)[K]) => setS((prev) => ({ ...prev, [k]: v }));

  return (
    <AppShell>
      <PageHeader
        title="Agent Settings"
        description="Configure how CrossSync Agent detects, applies, and validates changes."
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="mb-1 text-base font-semibold">Automation</h2>
            <p className="text-xs text-muted-foreground">Decide when the agent may act without asking.</p>
            <div className="mt-2 divide-y">
              <Row title="Enable automatic sync" description="Agent applies safe changes without waiting for review.">
                <Toggle checked={s.autoSync} onChange={(v) => set("autoSync", v)} />
              </Row>
              <Row title="Require review before code changes" description="Never push a Replit code change without human approval.">
                <Toggle checked={s.requireReviewCode} onChange={(v) => set("requireReviewCode", v)} />
              </Row>
              <Row title="Require review before design changes" description="Ask before applying design token or layout updates.">
                <Toggle checked={s.requireReviewDesign} onChange={(v) => set("requireReviewDesign", v)} />
              </Row>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-1 text-base font-semibold">Sync behavior</h2>
            <p className="text-xs text-muted-foreground">Direction and strictness of synchronization.</p>
            <div className="mt-2 divide-y">
              <Row title="Sync direction" description="Which way changes should flow.">
                <Segmented
                  value={s.direction}
                  onChange={(v) => set("direction", v)}
                  options={[
                    { value: "lovable-to-replit", label: "Lovable → Replit" },
                    { value: "replit-to-lovable", label: "Replit → Lovable" },
                    { value: "bidirectional", label: "Bidirectional" },
                  ]}
                />
              </Row>
              <Row title="Validation level" description="How thoroughly to verify each applied change.">
                <Segmented
                  value={s.validation}
                  onChange={(v) => set("validation", v)}
                  options={[
                    { value: "light", label: "Light" },
                    { value: "standard", label: "Standard" },
                    { value: "strict", label: "Strict" },
                  ]}
                />
              </Row>
              <Row title="Design consistency enforcement" description="How closely mobile must match web design decisions.">
                <Segmented
                  value={s.designEnforcement}
                  onChange={(v) => set("designEnforcement", v)}
                  options={[
                    { value: "flexible", label: "Flexible" },
                    { value: "balanced", label: "Balanced" },
                    { value: "strict", label: "Strict" },
                  ]}
                />
              </Row>
            </div>
          </Card>
        </div>

        <Card className="p-5 h-fit">
          <h2 className="mb-1 text-base font-semibold">MCP connections</h2>
          <p className="text-xs text-muted-foreground">Model Context Protocol endpoints for each platform.</p>
          <div className="mt-4 space-y-3">
            {(["lovable", "replit"] as const).map((p) => (
              <div key={p} className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={p} />
                  <div>
                    <div className="text-sm font-medium">{p === "lovable" ? "Lovable" : "Replit"}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {p === "lovable" ? "web app MCP" : "mobile app MCP"}
                    </div>
                  </div>
                </div>
                <StatusBadge tone="success" icon={<StatusDot tone="success" />}>
                  {p === "lovable" ? s.mcp.lovable : s.mcp.replit}
                </StatusBadge>
              </div>
            ))}
          </div>
          <button className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md border bg-card text-sm font-medium hover:bg-accent">
            Reconnect MCP endpoints
          </button>
        </Card>
      </div>
    </AppShell>
  );
}
