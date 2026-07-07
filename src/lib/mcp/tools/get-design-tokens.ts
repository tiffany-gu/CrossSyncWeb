import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const tokens = {
  radius: {
    base: "0.75rem",
    sm: "calc(base - 4px)",
    md: "calc(base - 2px)",
    lg: "base",
    xl: "calc(base + 4px)",
  },
  colors: {
    background: "oklch(0.985 0.003 250)",
    foreground: "oklch(0.19 0.02 265)",
    card: "oklch(1 0 0)",
    primary: "oklch(0.55 0.19 258)",
    "primary-foreground": "oklch(0.99 0 0)",
    muted: "oklch(0.968 0.007 250)",
    "muted-foreground": "oklch(0.52 0.02 260)",
    border: "oklch(0.925 0.008 255)",
    success: "oklch(0.6 0.15 155)",
    warning: "oklch(0.72 0.16 75)",
    danger: "oklch(0.62 0.22 27)",
    info: "oklch(0.6 0.16 250)",
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    features: ["cv02", "cv03", "cv04", "cv11"],
  },
  spacingScale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  motion: {
    "cs-pulse": "1.8s ease-in-out infinite",
    "cs-flow": "1.2s linear infinite (stroke dash offset)",
  },
} as const;

export default defineTool({
  name: "get_design_tokens",
  title: "Get Lovable design tokens",
  description:
    "Return the CrossSync Agent design system tokens defined in the Lovable web app: color palette (oklch), radius scale, typography, spacing scale, and motion primitives. Use this to keep the Replit mobile app visually aligned with the Lovable web app.",
  inputSchema: {
    group: z
      .enum(["all", "colors", "radius", "typography", "spacingScale", "motion"])
      .describe("Which token group to return. 'all' returns every group.")
      .optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ group }) => {
    const g = group ?? "all";
    const payload = g === "all" ? tokens : { [g]: (tokens as Record<string, unknown>)[g] };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
