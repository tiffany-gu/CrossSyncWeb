import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { lovablePages } from "@/data/sample";

export default defineTool({
  name: "get_pages",
  title: "Get Lovable pages",
  description:
    "Return the list of pages in the Lovable web app: URL path, human name, and the mobile screen they map to on Replit. Use this to discover which page a change belongs to before mapping updates.",
  inputSchema: {
    path: z.string().describe("If provided, return only the page matching this path (e.g. '/checkout').").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ path }) => {
    const pages = path ? lovablePages.filter((p) => p.path === path) : lovablePages;
    return {
      content: [{ type: "text", text: JSON.stringify(pages, null, 2) }],
      structuredContent: { pages, count: pages.length },
    };
  },
});
