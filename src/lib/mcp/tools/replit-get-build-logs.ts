import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const logs = {
  latest: {
    id: "build_9421",
    startedAt: "2 hr ago",
    duration: "18.4s",
    status: "success",
    platform: "iOS+Android",
    lines: [
      "> expo prebuild --clean",
      "✓ Metro bundler ready",
      "✓ Compiled ios in 9.8s",
      "✓ Compiled android in 8.6s",
      "Build succeeded",
    ],
  },
  previousFailed: {
    id: "build_9420",
    startedAt: "5 hr ago",
    duration: "6.1s",
    status: "failed",
    platform: "iOS",
    lines: [
      "> expo prebuild --clean",
      "✗ theme/tokens.ts:3  unknown color function oklch()",
      "  at parseColor (react-native/StyleSheet)",
      "Build failed",
    ],
  },
};

export default defineTool({
  name: "replit_get_build_logs",
  title: "Replit — get build logs",
  description: "Return the most recent Replit build's stdout/stderr and its status. Use this to diagnose failures before proposing a fix.",
  inputSchema: {
    which: z.enum(["latest", "previousFailed"]).describe("Which log to return.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ which }) => {
    const log = logs[which ?? "latest"];
    return {
      content: [{ type: "text", text: JSON.stringify(log, null, 2) }],
      structuredContent: log,
    };
  },
});
