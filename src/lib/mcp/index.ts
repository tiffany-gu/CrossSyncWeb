import { defineMcp } from "@lovable.dev/mcp-js";

// Lovable-side tools
import listRecentChanges from "./tools/list-recent-changes";
import getDesignTokens from "./tools/get-design-tokens";
import getComponentHierarchy from "./tools/get-component-hierarchy";
import getPages from "./tools/get-pages";
import getRoutes from "./tools/get-routes";
import getPrompts from "./tools/get-prompts";
import applyComponentUpdate from "./tools/apply-component-update";
import validateDesignConsistency from "./tools/validate-design-consistency";

// Replit-side tools
import replitGetFileTree from "./tools/replit-get-file-tree";
import replitGetChangedFiles from "./tools/replit-get-changed-files";
import replitGetMobileComponents from "./tools/replit-get-mobile-components";
import replitGetNavigationFiles from "./tools/replit-get-navigation-files";
import replitGetPackageFiles from "./tools/replit-get-package-files";
import replitGetBuildLogs from "./tools/replit-get-build-logs";
import replitApplyCodeChange from "./tools/replit-apply-code-change";
import replitRunBuild from "./tools/replit-run-build";
import replitRunTests from "./tools/replit-run-tests";
import replitRunLint from "./tools/replit-run-lint";

export default defineMcp({
  name: "crosssync-mcp",
  title: "CrossSync — Lovable × Replit MCP",
  version: "0.2.0",
  instructions:
    "Exposes both sides of the CrossSync Agent. Lovable-side tools (get_pages, get_routes, get_component_hierarchy, get_design_tokens, get_prompts, list_recent_changes, apply_component_update, validate_design_consistency) read and modify the Lovable web app. Replit-side tools (prefixed replit_) read the mobile file tree, changed files, components, navigation, and package config, apply code changes, and run build/tests/lint. Typical lifecycle: detect Lovable change → read Lovable context → read Replit context → plan mapping → apply Replit change → run build/tests/lint → mark synced or route to human review.",
  tools: [
    listRecentChanges,
    getDesignTokens,
    getComponentHierarchy,
    getPages,
    getRoutes,
    getPrompts,
    applyComponentUpdate,
    validateDesignConsistency,
    replitGetFileTree,
    replitGetChangedFiles,
    replitGetMobileComponents,
    replitGetNavigationFiles,
    replitGetPackageFiles,
    replitGetBuildLogs,
    replitApplyCodeChange,
    replitRunBuild,
    replitRunTests,
    replitRunLint,
  ],
});
