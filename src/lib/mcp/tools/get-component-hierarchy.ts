import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const hierarchy = {
  app: "AppShell",
  shell: {
    root: "AppShell",
    children: [
      {
        name: "Topbar",
        children: ["ProductBadge", "GlobalSearch", "GlobalSyncStatusPill", "NotificationsButton", "AvatarBadge"],
      },
      {
        name: "Sidebar",
        children: [
          "NavItem: Dashboard",
          "NavItem: Sync Activity",
          "NavItem: Platform Context",
          "NavItem: Design Consistency",
          "NavItem: Feature Mapping",
          "NavItem: Human Review",
          "NavItem: Agent Settings",
          "AgentStatusCard",
        ],
      },
      { name: "Main", children: ["<Outlet /> — page content"] },
    ],
  },
  pages: {
    "/": {
      component: "Dashboard",
      children: ["PageHeader", "SyncStatusHero", "QuickStats", "PlatformPair (PlatformCard × 2 + SyncConnector)", "AgentProgress", "RecentActivity"],
    },
    "/activity": { component: "ActivityPage", children: ["PageHeader", "FilterBar", "ActivityItem[]"] },
    "/context": { component: "ContextPage", children: ["PageHeader", "Panel: Lovable", "Panel: Replit"] },
    "/design": { component: "DesignPage", children: ["PageHeader", "ConsistencyChecklist", "CommonWebToMobileIssues"] },
    "/features": { component: "FeaturesPage", children: ["PageHeader", "FilterBar", "FeatureMappingTable"] },
    "/review": { component: "ReviewPage", children: ["PageHeader", "ReviewCard[]"] },
    "/settings": { component: "SettingsPage", children: ["PageHeader", "AutomationCard", "SyncBehaviorCard", "MCPConnectionsCard"] },
  },
  sharedComponents: {
    "components/crosssync/app-shell.tsx": ["AppShell", "PageHeader"],
    "components/crosssync/status-badge.tsx": ["StatusBadge", "StatusDot"],
    "components/crosssync/change-badge.tsx": ["ChangeBadge"],
    "components/crosssync/platform-icon.tsx": ["PlatformIcon", "PlatformLabel"],
    "components/crosssync/platform-card.tsx": ["PlatformCard"],
    "components/crosssync/sync-connector.tsx": ["SyncConnector"],
    "components/crosssync/agent-progress.tsx": ["AgentProgress"],
    "components/crosssync/activity-item.tsx": ["ActivityItem"],
    "components/ui/*": "shadcn primitives (button, card, table, etc.)",
  },
} as const;

export default defineTool({
  name: "get_component_hierarchy",
  title: "Get Lovable component hierarchy",
  description:
    "Return the Lovable web app's UI hierarchy: app shell, per-page component trees, and shared component modules. Use this to map web components to equivalent Replit mobile components.",
  inputSchema: {
    scope: z
      .enum(["all", "shell", "pages", "sharedComponents"])
      .describe("Which slice of the hierarchy to return. 'all' returns everything.")
      .optional(),
    route: z
      .string()
      .describe("If provided, return only the component tree for this route (e.g. '/', '/activity').")
      .optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ scope, route }) => {
    if (route) {
      const page = (hierarchy.pages as Record<string, unknown>)[route];
      if (!page) {
        return { content: [{ type: "text", text: `Unknown route: ${route}` }], isError: true };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(page, null, 2) }],
        structuredContent: { route, tree: page },
      };
    }
    const s = scope ?? "all";
    const payload = s === "all" ? hierarchy : { [s]: (hierarchy as Record<string, unknown>)[s] };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
