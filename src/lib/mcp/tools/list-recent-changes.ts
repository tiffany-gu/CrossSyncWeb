import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { activity } from "@/data/sample";

export default defineTool({
  name: "list_recent_changes",
  title: "List recent Lovable changes",
  description:
    "Return the most recent saved changes detected on the Lovable web app, including source/target platforms, change type, agent action, result, and timestamp. Use this to understand what has recently changed on Lovable before syncing to Replit.",
  inputSchema: {
    limit: z
      .number()
      .int()
      .describe("Maximum number of change entries to return. Defaults to 20 if omitted.")
      .optional(),
    platform: z
      .enum(["lovable", "replit", "all"])
      .describe("Filter by source platform. 'all' returns changes originating on either platform.")
      .optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ limit, platform }) => {
    const cap = Math.min(Math.max(limit ?? 20, 1), 100);
    const src = platform ?? "lovable";
    const filtered = activity.filter((a) => (src === "all" ? true : a.source === src)).slice(0, cap);
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { changes: filtered, count: filtered.length },
    };
  },
});
