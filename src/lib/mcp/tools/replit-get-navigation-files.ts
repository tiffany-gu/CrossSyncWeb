import { defineTool } from "@lovable.dev/mcp-js";

const nav = {
  "navigation/AppTabs.tsx": {
    kind: "bottom-tabs",
    tabs: ["Home", "Search", "Cart", "Settings"],
    overflow: "MoreSheet",
  },
  "navigation/RootStack.tsx": {
    kind: "stack",
    screens: ["Auth", "AppTabs", "Onboarding", "Checkout", "NotFound"],
  },
  "navigation/linking.ts": {
    kind: "deep-linking",
    prefixes: ["crosssync://", "https://app.example.com"],
    config: "Auto-generated from screens",
  },
};

export default defineTool({
  name: "replit_get_navigation_files",
  title: "Replit — get navigation files",
  description:
    "Return the Replit mobile app's navigation configuration: bottom tabs, stack screens, and deep-linking config. Use this before proposing navigation changes so the mapping doesn't break existing screens.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(nav, null, 2) }],
    structuredContent: nav,
  }),
});
