import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  Layers,
  Palette,
  Boxes,
  ShieldCheck,
  Settings,
  Zap,
  Bell,
  Search,
  Wand2,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusDot } from "./status-badge";
import { globalStatus } from "@/data/sample";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/activity", label: "Sync Activity", icon: Activity, exact: false },
  { to: "/simulate", label: "Simulate Sync", icon: Sparkles, exact: false },
  { to: "/context", label: "Platform Context", icon: Layers, exact: false },
  { to: "/design", label: "Design Consistency", icon: Palette, exact: false },
  { to: "/mappings", label: "Mapping Rules", icon: Shuffle, exact: false },
  { to: "/features", label: "Feature Mapping", icon: Boxes, exact: false },
  { to: "/review", label: "Human Review", icon: ShieldCheck, exact: false },
  { to: "/planner", label: "Sync Planner", icon: Wand2, exact: false },
  { to: "/settings", label: "Agent Settings", icon: Settings, exact: false },
] as const;

const statusPill: Record<typeof globalStatus.state, { label: string; tone: "success" | "info" | "warning" | "danger" | "primary" }> = {
  "in-sync": { label: "In Sync", tone: "success" },
  "lovable-changed": { label: "Lovable Changed", tone: "info" },
  "replit-changed": { label: "Replit Changed", tone: "info" },
  "agent-running": { label: "Agent Running", tone: "primary" },
  "review-required": { label: "Human Review Required", tone: "warning" },
  "sync-failed": { label: "Sync Failed", tone: "danger" },
};

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pill = statusPill[globalStatus.state];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Topbar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur">
        <div className="flex items-center gap-2 w-60 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-none">CrossSync Agent</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">Lovable × Replit</div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search features, changes, screens…"
              className="h-8 w-full rounded-md border bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
              pill.tone === "success" && "bg-success-soft text-success ring-success/20",
              pill.tone === "info" && "bg-info-soft text-info ring-info/20",
              pill.tone === "warning" && "bg-warning-soft text-warning-foreground ring-warning/30",
              pill.tone === "danger" && "bg-danger-soft text-danger ring-danger/20",
              pill.tone === "primary" && "bg-primary/10 text-primary ring-primary/20",
            )}
          >
            <StatusDot tone={pill.tone === "success" ? "success" : pill.tone === "danger" ? "danger" : pill.tone === "warning" ? "warning" : pill.tone === "info" ? "info" : "primary"} pulse={pill.tone === "primary"} />
            {pill.label}
          </span>
          <button
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-info text-primary-foreground text-xs font-semibold grid place-items-center">
            AK
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden md:flex h-[calc(100vh-3.5rem)] w-60 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground">
          <nav className="flex-1 space-y-0.5 p-3">
            {nav.map((item) => {
              const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className={cn("h-4 w-4", active && "text-primary")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t p-3">
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2 text-xs font-medium">
                <StatusDot tone="success" />
                Agent online
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                MCP · Lovable & Replit connected
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
