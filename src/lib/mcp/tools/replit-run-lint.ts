import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "replit_run_lint",
  title: "Replit — run lint",
  description: "Run ESLint + TypeScript checks on the Replit mobile app. Returns per-file errors, warnings, and any suggested fixes.",
  inputSchema: {
    fix: z.boolean().describe("Whether to apply auto-fixable issues. Defaults to false.").optional(),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: ({ fix }) => {
    const result = {
      status: "success" as const,
      autoFixed: fix ? 2 : 0,
      errors: 0,
      warnings: 1,
      details: [{ file: "screens/Checkout.tsx", rule: "react-hooks/exhaustive-deps", line: 42, level: "warning" }],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
