import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const prompts = [
  { at: "3 min ago", page: "/checkout", instruction: "Redesign checkout as a 3-column layout with sticky pay CTA on desktop" },
  { at: "2 hr ago", page: "global", instruction: "Bump primary color to a bolder blue and radius to 16px across the app" },
  { at: "yesterday", page: "/dashboard", instruction: "Add quick-stats cards for in-sync features and pending reviews" },
  { at: "2 days ago", page: "/settings", instruction: "Split settings into automation, sync behavior, and MCP sections" },
];

export default defineTool({
  name: "get_prompts",
  title: "Get recent Lovable prompts/instructions",
  description:
    "Return the recent design/build instructions given to Lovable — the human intent behind each save. Use this to understand *why* a change was made, not just what changed, when planning the mobile equivalent.",
  inputSchema: {
    page: z.string().describe("Filter to prompts targeting this page (e.g. '/checkout' or 'global').").optional(),
    limit: z.number().int().describe("Maximum entries to return. Defaults to 10.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ page, limit }) => {
    const cap = Math.min(Math.max(limit ?? 10, 1), 50);
    const filtered = (page ? prompts.filter((p) => p.page === page) : prompts).slice(0, cap);
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { prompts: filtered, count: filtered.length },
    };
  },
});
