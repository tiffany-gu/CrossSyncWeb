import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "replit_run_build",
  title: "Replit — run build",
  description: "Trigger a Replit mobile app build (iOS + Android). Returns a simulated build id, status, duration, and log tail.",
  inputSchema: {
    platform: z.enum(["ios", "android", "both"]).describe("Which platform(s) to build. Defaults to 'both'.").optional(),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: ({ platform }) => {
    const p = platform ?? "both";
    const result = {
      id: `build_${Math.floor(Math.random() * 10000)}`,
      platform: p,
      status: "success" as const,
      duration: "14.1s",
      logTail: ["✓ Metro bundler ready", "✓ Compiled successfully", "Build succeeded"],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
