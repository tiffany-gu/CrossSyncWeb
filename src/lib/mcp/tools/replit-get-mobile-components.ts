import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const components = [
  { name: "Button", file: "components/Button.tsx", webEquivalent: "shadcn/ui Button" },
  { name: "Card", file: "components/Card.tsx", webEquivalent: "shadcn/ui Card" },
  { name: "TabBar", file: "components/TabBar.tsx", webEquivalent: "AppShell Sidebar" },
  { name: "CheckoutSheet", file: "components/CheckoutSheet.tsx", webEquivalent: "CheckoutSummary" },
  { name: "PriceRow", file: "components/PriceRow.tsx", webEquivalent: "PricingTable row" },
  { name: "OnboardingSlide", file: "components/OnboardingSlide.tsx", webEquivalent: "OnboardingStep" },
  { name: "PayCTA", file: "components/PayCTA.tsx", webEquivalent: "— (mobile-only, sticky bottom pattern)" },
];

export default defineTool({
  name: "replit_get_mobile_components",
  title: "Replit — get mobile components",
  description:
    "Return the Replit mobile app's component list with file paths and their web equivalents on Lovable. Use this to select the right target component when applying a mapping.",
  inputSchema: {
    name: z.string().describe("Filter by component name (case-insensitive substring).").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ name }) => {
    const q = name?.toLowerCase();
    const filtered = q ? components.filter((c) => c.name.toLowerCase().includes(q)) : components;
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { components: filtered, count: filtered.length },
    };
  },
});
