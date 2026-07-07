import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { lovablePages } from "@/data/sample";

export default defineTool({
  name: "get_routes",
  title: "Get Lovable routes",
  description:
    "Return the Lovable web app's routing table: path, file, and layout parent. Use this to understand navigation structure before proposing mobile navigation changes.",
  inputSchema: {
    includeApi: z.boolean().describe("Include API/server routes.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ includeApi }) => {
    const pageRoutes = lovablePages.map((p) => ({
      path: p.path,
      file: `src/routes${p.path === "/" ? "/index" : p.path}.tsx`,
      layout: "__root",
      type: "page" as const,
    }));
    const apiRoutes = [
      { path: "/mcp", file: "src/routes/mcp.ts", layout: "—", type: "server" as const },
      { path: "/.well-known/oauth-protected-resource", file: "generated", layout: "—", type: "server" as const },
    ];
    const routes = includeApi ? [...pageRoutes, ...apiRoutes] : pageRoutes;
    return {
      content: [{ type: "text", text: JSON.stringify(routes, null, 2) }],
      structuredContent: { routes, count: routes.length },
    };
  },
});
