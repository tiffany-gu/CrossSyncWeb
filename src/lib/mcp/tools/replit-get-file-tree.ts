import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const tree = {
  "app/": ["_layout.tsx", "index.tsx"],
  "screens/": ["Home.tsx", "Onboarding/index.tsx", "Onboarding/Step4.tsx", "Dashboard.tsx", "Settings.tsx", "Checkout.tsx", "Search.tsx", "Pricing.tsx"],
  "components/": ["Button.tsx", "Card.tsx", "TabBar.tsx", "CheckoutSheet.tsx", "PriceRow.tsx", "OnboardingSlide.tsx", "PayCTA.tsx"],
  "navigation/": ["AppTabs.tsx", "RootStack.tsx", "linking.ts"],
  "theme/": ["tokens.ts", "typography.ts", "spacing.ts"],
  "lib/": ["api/hooks.ts", "api/client.ts", "utils.ts"],
  "locales/": ["en.json", "es.json"],
  "assets/": ["icons/", "images/"],
  __root__: ["package.json", "app.json", "tsconfig.json", "babel.config.js", ".eslintrc.js"],
};

export default defineTool({
  name: "replit_get_file_tree",
  title: "Replit — get file tree",
  description:
    "Return the Replit mobile app's file tree grouped by directory. Use this to locate mobile equivalents of Lovable files.",
  inputSchema: {
    prefix: z.string().describe("Only return entries under this prefix (e.g. 'screens/').").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ prefix }) => {
    const filtered = prefix
      ? Object.fromEntries(Object.entries(tree).filter(([k]) => k.startsWith(prefix)))
      : tree;
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: filtered,
    };
  },
});
