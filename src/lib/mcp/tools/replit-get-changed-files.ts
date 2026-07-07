import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const changed = [
  { path: "screens/Checkout.tsx", status: "modified", added: 42, removed: 18, since: "3 min ago" },
  { path: "components/PayCTA.tsx", status: "added", added: 22, removed: 0, since: "3 min ago" },
  { path: "theme/tokens.ts", status: "modified", added: 3, removed: 3, since: "2 hr ago" },
  { path: "components/Button.tsx", status: "modified", added: 1, removed: 1, since: "2 hr ago" },
  { path: "navigation/AppTabs.tsx", status: "modified", added: 12, removed: 8, since: "yesterday" },
];

export default defineTool({
  name: "replit_get_changed_files",
  title: "Replit — get changed files",
  description:
    "Return files changed in the Replit mobile app since the last sync, with added/removed line counts and timestamps.",
  inputSchema: {
    since: z.string().describe("ISO date or relative window (e.g. '24h', '7d'). Defaults to 7d.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(changed, null, 2) }],
    structuredContent: { changed, count: changed.length },
  }),
});
