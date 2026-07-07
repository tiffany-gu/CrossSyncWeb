import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "apply_component_update",
  title: "Apply a Lovable component update",
  description:
    "Apply a proposed update to a Lovable page or component. In this demo build the change is simulated and echoed back with a diff preview and a synthetic commit id; a production build would route through Lovable's project editor.",
  inputSchema: {
    file: z.string().describe("Target file, e.g. 'src/routes/checkout.tsx' or 'src/components/Header.tsx'."),
    summary: z.string().describe("Short summary of the change to apply."),
    diff: z.string().describe("Unified diff or a before/after snippet describing the intended change."),
    dryRun: z.boolean().describe("If true, validate without persisting. Defaults to true in this environment.").optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: ({ file, summary, diff, dryRun }) => {
    const commit = `sim_${Math.random().toString(36).slice(2, 10)}`;
    const persisted = dryRun === false;
    return {
      content: [
        {
          type: "text",
          text: `${persisted ? "Applied" : "Simulated"} update to ${file}\nCommit: ${commit}\nSummary: ${summary}\n\n${diff}`,
        },
      ],
      structuredContent: { file, summary, commit, persisted, diff },
    };
  },
});
