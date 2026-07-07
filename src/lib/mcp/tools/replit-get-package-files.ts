import { defineTool } from "@lovable.dev/mcp-js";

const packageJson = {
  name: "crosssync-mobile",
  version: "0.4.2",
  dependencies: {
    react: "19.0.0",
    "react-native": "0.76.3",
    expo: "~52.0.0",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@tanstack/react-query": "^5.60.0",
    zod: "^3.23.8",
  },
  devDependencies: {
    typescript: "^5.6.0",
    jest: "^29.7.0",
    "detox": "^20.28.0",
    eslint: "^9.15.0",
  },
};

const appJson = {
  expo: {
    name: "CrossSync",
    slug: "crosssync-mobile",
    scheme: "crosssync",
    ios: { bundleIdentifier: "app.crosssync.mobile" },
    android: { package: "app.crosssync.mobile" },
  },
};

export default defineTool({
  name: "replit_get_package_files",
  title: "Replit — get package files",
  description:
    "Return the Replit mobile app's package.json and app.json so the agent can check dependency versions, native config, and available scripts before proposing a change.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      { type: "text", text: JSON.stringify({ "package.json": packageJson, "app.json": appJson }, null, 2) },
    ],
    structuredContent: { packageJson, appJson },
  }),
});
