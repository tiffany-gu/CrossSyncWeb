import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { designChecks } from "@/data/sample";

export default defineTool({
  name: "validate_design_consistency",
  title: "Validate design consistency",
  description:
    "Run the design consistency checklist across the Lovable web app: typography, color, button hierarchy, spacing, navigation patterns, form controls, loading/error/empty states, and mobile responsiveness. Returns per-check status, severity, and suggested fix.",
  inputSchema: {
    only: z
      .enum(["all", "failing", "warnings"])
      .describe("Filter which checks to return.")
      .optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ only }) => {
    const filter = only ?? "all";
    const filtered = designChecks.filter((c) =>
      filter === "failing" ? c.status === "fail" : filter === "warnings" ? c.status !== "pass" : true,
    );
    const summary = {
      total: designChecks.length,
      passing: designChecks.filter((c) => c.status === "pass").length,
      warnings: designChecks.filter((c) => c.status === "warn").length,
      failing: designChecks.filter((c) => c.status === "fail").length,
    };
    return {
      content: [{ type: "text", text: JSON.stringify({ summary, checks: filtered }, null, 2) }],
      structuredContent: { summary, checks: filtered },
    };
  },
});
