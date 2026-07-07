import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "replit_apply_code_change",
  title: "Replit — apply code change",
  description:
    "Apply a code change to a file in the Replit mobile app. In this demo build the change is simulated; a production build would commit via the Replit API. Riskier changes should be gated behind human review before calling this tool.",
  inputSchema: {
    file: z.string().describe("Target file path (e.g. 'screens/Checkout.tsx')."),
    summary: z.string().describe("Short summary of the change."),
    patch: z.string().describe("Unified diff or before/after snippet."),
    dryRun: z.boolean().describe("If true, validate without writing. Defaults to true in this environment.").optional(),
    mappingRule: z.string().describe("The mapping rule that produced this change (e.g. 'Multi-column grid → stacked cards').").optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: ({ file, summary, patch, dryRun, mappingRule }) => {
    const commit = `rpl_${Math.random().toString(36).slice(2, 10)}`;
    const persisted = dryRun === false;
    return {
      content: [
        {
          type: "text",
          text: `${persisted ? "Applied" : "Simulated"} change to ${file}\nCommit: ${commit}\nSummary: ${summary}\nMapping: ${mappingRule ?? "—"}\n\n${patch}`,
        },
      ],
      structuredContent: { file, summary, commit, persisted, mappingRule, patch },
    };
  },
});
