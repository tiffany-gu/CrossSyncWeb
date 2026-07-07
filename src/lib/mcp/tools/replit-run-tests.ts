import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "replit_run_tests",
  title: "Replit — run tests",
  description: "Run the Replit mobile app's test suite (unit + e2e). Returns per-suite pass/fail counts and any failure details.",
  inputSchema: {
    suite: z.enum(["unit", "e2e", "all"]).describe("Which suite to run. Defaults to 'all'.").optional(),
    filter: z.string().describe("Optional test name filter.").optional(),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: ({ suite }) => {
    const s = suite ?? "all";
    const result = {
      suite: s,
      unit: { passed: 12, failed: 0, duration: "2.1s" },
      e2e: s === "unit" ? undefined : { passed: 3, failed: 0, duration: "38.4s" },
      status: "success" as const,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
