export type PlatformKey = "lovable" | "replit";

export type SyncState =
  | "in-sync"
  | "lovable-changed"
  | "replit-changed"
  | "agent-running"
  | "review-required"
  | "sync-failed";

export type StepStatus = "pending" | "running" | "complete" | "blocked" | "failed";

export type ChangeType =
  | "UI Layout"
  | "Feature"
  | "Navigation"
  | "Content"
  | "Design System"
  | "Data/API"
  | "Bug Fix";

export type FeatureStatus =
  | "Synced"
  | "Missing on Lovable"
  | "Missing on Replit"
  | "Outdated"
  | "Needs Review";

export const globalStatus: {
  state: SyncState;
  headline: string;
  detail: string;
  since: string;
} = {
  state: "agent-running",
  headline: "Agent is syncing changes from Lovable → Replit",
  detail: "Checkout screen layout updated 3 minutes ago on Lovable. Mapping to mobile now.",
  since: "3 min ago",
};

export const platforms = {
  lovable: {
    name: "Lovable",
    type: "Web App",
    lastSaved: "3 min ago",
    detectedChange: "Checkout screen — hero grid updated to 3 columns",
    syncStatus: "changed" as const,
    context: [
      { label: "Design context", value: "Available", ok: true },
      { label: "Feature context", value: "Available", ok: true },
      { label: "MCP connection", value: "Connected", ok: true },
    ],
  },
  replit: {
    name: "Replit",
    type: "Mobile App",
    lastSaved: "42 min ago",
    detectedChange: "No local changes since last sync",
    syncStatus: "waiting" as const,
    context: [
      { label: "Code context", value: "Available", ok: true },
      { label: "Build status", value: "Passing", ok: true },
      { label: "Test status", value: "12/12 passing", ok: true },
    ],
  },
};

export const agentSteps: { label: string; status: StepStatus; detail?: string }[] = [
  { label: "Detecting platform change", status: "complete", detail: "Lovable save event received" },
  { label: "Reading source platform context", status: "complete", detail: "Loaded 14 components, 3 tokens" },
  { label: "Comparing against target platform", status: "complete", detail: "Diff against Replit checkout screen" },
  { label: "Mapping design and feature differences", status: "running", detail: "Translating web grid → mobile stack" },
  { label: "Applying target platform updates", status: "pending" },
  { label: "Running validation checks", status: "pending" },
  { label: "Waiting for human review or marking sync complete", status: "pending" },
];

export type ValidationCheck = {
  kind: "build" | "test" | "lint" | "visual";
  status: "pass" | "fail" | "warn" | "running" | "pending";
  detail: string;
};

export type ActivityItem = {
  id: string;
  source: PlatformKey;
  target: PlatformKey;
  changeType: ChangeType;
  summary: string;
  action: string;
  result: "Applied" | "Review required" | "Failed" | "In progress";
  timestamp: string;
  risk: "Low" | "Medium" | "High";
  mappingRule?: string;
  validation: ValidationCheck[];
};

export const activity: ActivityItem[] = [
  {
    id: "a1",
    source: "lovable",
    target: "replit",
    changeType: "UI Layout",
    summary: "Checkout screen layout updated",
    action: "Mapping web 3-column grid to mobile stacked cards",
    result: "In progress",
    timestamp: "3 min ago",
    risk: "High",
    mappingRule: "Multi-column grid → stacked cards",
    validation: [
      { kind: "build", status: "running", detail: "Bundling Replit mobile app…" },
      { kind: "test", status: "pending", detail: "Waiting on build" },
      { kind: "lint", status: "pass", detail: "0 issues" },
      { kind: "visual", status: "pending", detail: "Snapshot diff queued" },
    ],
  },
  {
    id: "a2",
    source: "replit",
    target: "lovable",
    changeType: "Feature",
    summary: "New onboarding step added",
    action: "Added matching onboarding step to Lovable web flow",
    result: "Applied",
    timestamp: "42 min ago",
    risk: "Medium",
    mappingRule: "Mobile screen → web route",
    validation: [
      { kind: "build", status: "pass", detail: "Web build ok · 12.4s" },
      { kind: "test", status: "pass", detail: "48/48 tests pass" },
      { kind: "lint", status: "pass", detail: "0 issues" },
      { kind: "visual", status: "pass", detail: "0 pixel drift" },
    ],
  },
  {
    id: "a3",
    source: "lovable",
    target: "replit",
    changeType: "Design System",
    summary: "Primary button styling changed",
    action: "Updated Replit Button component tokens",
    result: "Applied",
    timestamp: "2 hr ago",
    risk: "Low",
    mappingRule: "Token → native theme value",
    validation: [
      { kind: "build", status: "pass", detail: "iOS + Android build ok" },
      { kind: "test", status: "pass", detail: "12/12 tests pass" },
      { kind: "lint", status: "pass", detail: "0 issues" },
      { kind: "visual", status: "warn", detail: "6 button snapshots updated" },
    ],
  },
  {
    id: "a4",
    source: "replit",
    target: "lovable",
    changeType: "Bug Fix",
    summary: "Replit build failed on push",
    action: "Paused sync — human review required",
    result: "Review required",
    timestamp: "5 hr ago",
    risk: "High",
    mappingRule: "—",
    validation: [
      { kind: "build", status: "fail", detail: "oklch() not supported in RN theme parser" },
      { kind: "test", status: "fail", detail: "6 snapshot mismatches" },
      { kind: "lint", status: "pass", detail: "0 issues" },
      { kind: "visual", status: "warn", detail: "Skipped — build failed" },
    ],
  },
  {
    id: "a5",
    source: "lovable",
    target: "replit",
    changeType: "Navigation",
    summary: "Top nav restructured",
    action: "Mapped web nav to mobile bottom tab bar",
    result: "Applied",
    timestamp: "Yesterday",
    risk: "Medium",
    mappingRule: "Desktop sidebar → mobile bottom tabs",
    validation: [
      { kind: "build", status: "pass", detail: "Build ok · 14.2s" },
      { kind: "test", status: "pass", detail: "Navigation e2e pass" },
      { kind: "lint", status: "pass", detail: "0 issues" },
      { kind: "visual", status: "pass", detail: "Approved by reviewer" },
    ],
  },
  {
    id: "a6",
    source: "lovable",
    target: "replit",
    changeType: "Content",
    summary: "Home hero copy updated",
    action: "Synced copy to mobile home screen",
    result: "Applied",
    timestamp: "Yesterday",
    risk: "Low",
    mappingRule: "Copy sync (auto)",
    validation: [
      { kind: "build", status: "pass", detail: "Build ok" },
      { kind: "test", status: "pass", detail: "All pass" },
      { kind: "lint", status: "pass", detail: "0 issues" },
      { kind: "visual", status: "pass", detail: "Text-only diff" },
    ],
  },
  {
    id: "a7",
    source: "replit",
    target: "lovable",
    changeType: "Data/API",
    summary: "New /profile/preferences endpoint",
    action: "Wired Lovable settings page to endpoint",
    result: "Applied",
    timestamp: "2 days ago",
    risk: "Medium",
    mappingRule: "Mobile API → web data hook",
    validation: [
      { kind: "build", status: "pass", detail: "Build ok" },
      { kind: "test", status: "pass", detail: "Contract tests pass" },
      { kind: "lint", status: "pass", detail: "0 issues" },
      { kind: "visual", status: "pass", detail: "No UI regressions" },
    ],
  },
];

export type DesignCheck = {
  name: string;
  status: "pass" | "warn" | "fail";
  severity: "Low" | "Medium" | "High";
  fix: string;
  lastChecked: string;
};

export const designChecks: DesignCheck[] = [
  { name: "Typography consistency", status: "pass", severity: "Low", fix: "—", lastChecked: "3 min ago" },
  { name: "Color consistency", status: "pass", severity: "Low", fix: "—", lastChecked: "3 min ago" },
  { name: "Button hierarchy", status: "warn", severity: "Medium", fix: "Secondary button on Replit uses outline; Lovable uses ghost", lastChecked: "3 min ago" },
  { name: "Spacing and sizing", status: "warn", severity: "Medium", fix: "Compress mobile card padding from 24 → 16", lastChecked: "12 min ago" },
  { name: "Navigation patterns", status: "pass", severity: "Low", fix: "—", lastChecked: "1 hr ago" },
  { name: "Form controls", status: "pass", severity: "Low", fix: "—", lastChecked: "1 hr ago" },
  { name: "Loading states", status: "fail", severity: "High", fix: "Mobile checkout missing skeleton loader", lastChecked: "2 hr ago" },
  { name: "Error states", status: "warn", severity: "Medium", fix: "Standardize error toast placement", lastChecked: "2 hr ago" },
  { name: "Empty states", status: "pass", severity: "Low", fix: "—", lastChecked: "3 hr ago" },
  { name: "Mobile responsiveness", status: "warn", severity: "Medium", fix: "Web pricing table needs mobile card layout", lastChecked: "3 hr ago" },
];

export const webToMobileIssues = [
  "Desktop multi-column layouts need to become stacked mobile layouts",
  "Tables may need to become mobile cards",
  "Large navigation bars may need to become bottom navigation or hamburger menus",
  "Desktop spacing may need to be compressed for mobile",
  "Hover states need mobile-friendly alternatives",
];

export type MappingRule = {
  id: string;
  webPattern: string;
  mobilePattern: string;
  category: "Navigation" | "Layout" | "Data Display" | "Input" | "Interaction" | "Feedback";
  risk: "Auto" | "Review" | "Human only";
  description: string;
  webExample: string;
  mobileExample: string;
  appliedCount: number;
  lastApplied: string;
};

export const mappingRules: MappingRule[] = [
  {
    id: "m1",
    webPattern: "Desktop sidebar navigation",
    mobilePattern: "Bottom tab bar (5 tabs max)",
    category: "Navigation",
    risk: "Auto",
    description: "Persistent left rail collapses to a bottom tab bar. Overflow items move to a 'More' tab.",
    webExample: "<Sidebar>\n  <NavItem to='/home' />\n  <NavItem to='/inbox' />\n  <NavItem to='/settings' />\n</Sidebar>",
    mobileExample: "<TabBar>\n  <Tab to='home' icon={Home} />\n  <Tab to='inbox' icon={Inbox} />\n  <Tab to='more' icon={More} />\n</TabBar>",
    appliedCount: 4,
    lastApplied: "Yesterday",
  },
  {
    id: "m2",
    webPattern: "Data table with columns",
    mobilePattern: "Vertical card list with key-value rows",
    category: "Data Display",
    risk: "Auto",
    description: "Rows become cards; each column becomes a labeled row inside the card. Primary column is the card title.",
    webExample: "<Table>\n  <Row>\n    <Cell>Order #1204</Cell>\n    <Cell>$48.20</Cell>\n    <Cell>Shipped</Cell>\n  </Row>\n</Table>",
    mobileExample: "<Card>\n  <Title>Order #1204</Title>\n  <Row label='Total'>$48.20</Row>\n  <Row label='Status'>Shipped</Row>\n</Card>",
    appliedCount: 3,
    lastApplied: "2 days ago",
  },
  {
    id: "m3",
    webPattern: "Multi-column grid (>2 cols)",
    mobilePattern: "Stacked cards with sticky primary CTA",
    category: "Layout",
    risk: "Review",
    description: "Ambiguous — multiple valid mobile mappings. Agent proposes stacked cards and routes to human review.",
    webExample: "<Grid cols={3}>\n  <Summary />\n  <Address />\n  <Payment />\n</Grid>",
    mobileExample: "<VStack sticky={<PayCTA />}>\n  <Card><Summary /></Card>\n  <Card><Address /></Card>\n  <Card><Payment /></Card>\n</VStack>",
    appliedCount: 1,
    lastApplied: "3 min ago",
  },
  {
    id: "m4",
    webPattern: "Hover-only tooltip",
    mobilePattern: "Tap-to-reveal popover with 'i' affordance",
    category: "Interaction",
    risk: "Auto",
    description: "Hover has no mobile equivalent. Adds a visible info affordance next to the trigger.",
    webExample: "<Tooltip content='Ships in 2 days'>\n  <Icon.Info />\n</Tooltip>",
    mobileExample: "<Popover trigger={<InfoButton />}>\n  Ships in 2 days\n</Popover>",
    appliedCount: 9,
    lastApplied: "1 hr ago",
  },
  {
    id: "m5",
    webPattern: "Modal dialog",
    mobilePattern: "Bottom sheet (dismissible by swipe)",
    category: "Feedback",
    risk: "Auto",
    description: "Center modals feel oversized on mobile. Bottom sheets keep thumb reach and native feel.",
    webExample: "<Dialog>\n  <Header>Confirm delete</Header>\n  <Actions>...</Actions>\n</Dialog>",
    mobileExample: "<Sheet snapPoints={['40%']}>\n  <Header>Confirm delete</Header>\n  <Actions>...</Actions>\n</Sheet>",
    appliedCount: 6,
    lastApplied: "4 hr ago",
  },
  {
    id: "m6",
    webPattern: "Dropdown select (long list)",
    mobilePattern: "Full-screen picker with search",
    category: "Input",
    risk: "Auto",
    description: "Native dropdowns become unusable past ~8 options on small screens.",
    webExample: "<Select>\n  {countries.map(...)}\n</Select>",
    mobileExample: "<PickerScreen searchable>\n  {countries.map(...)}\n</PickerScreen>",
    appliedCount: 2,
    lastApplied: "1 day ago",
  },
  {
    id: "m7",
    webPattern: "Right-click / context menu",
    mobilePattern: "Long-press action sheet",
    category: "Interaction",
    risk: "Review",
    description: "Long-press is discoverable but easily missed. Agent adds a visible more-menu as fallback.",
    webExample: "onContextMenu={openMenu}",
    mobileExample: "onLongPress={openSheet}\n+ <MoreButton />",
    appliedCount: 2,
    lastApplied: "3 days ago",
  },
  {
    id: "m8",
    webPattern: "Multi-step form (single page)",
    mobilePattern: "Wizard with progress bar",
    category: "Layout",
    risk: "Human only",
    description: "Structural flow change. Always routes to human review — affects conversion and analytics.",
    webExample: "<Form>\n  <Section 1 />\n  <Section 2 />\n  <Section 3 />\n</Form>",
    mobileExample: "<Wizard steps={3}>\n  <Step 1 />\n  <Step 2 />\n  <Step 3 />\n</Wizard>",
    appliedCount: 0,
    lastApplied: "Never",
  },
];

export type FeatureRow = {
  name: string;
  lovable: "Present" | "Missing" | "Outdated" | "Partial";
  replit: "Present" | "Missing" | "Outdated" | "Partial";
  updated: string;
  status: FeatureStatus;
  action: string;
};

export const features: FeatureRow[] = [
  { name: "User authentication", lovable: "Present", replit: "Present", updated: "2 days ago", status: "Synced", action: "—" },
  { name: "Onboarding flow", lovable: "Present", replit: "Present", updated: "42 min ago", status: "Synced", action: "—" },
  { name: "Dashboard home", lovable: "Present", replit: "Present", updated: "1 day ago", status: "Synced", action: "—" },
  { name: "Profile settings", lovable: "Present", replit: "Outdated", updated: "3 days ago", status: "Outdated", action: "Sync preferences panel to mobile" },
  { name: "Checkout flow", lovable: "Present", replit: "Partial", updated: "3 min ago", status: "Needs Review", action: "Review new checkout layout" },
  { name: "Notifications", lovable: "Present", replit: "Missing", updated: "—", status: "Missing on Replit", action: "Build mobile notifications screen" },
  { name: "Search", lovable: "Present", replit: "Present", updated: "5 days ago", status: "Synced", action: "—" },
  { name: "Saved items", lovable: "Missing", replit: "Present", updated: "1 week ago", status: "Missing on Lovable", action: "Add saved items page to web" },
  { name: "Admin controls", lovable: "Present", replit: "Missing", updated: "—", status: "Missing on Replit", action: "Not required for mobile — confirm" },
];

export const lovableContext = {
  mcp: "Connected",
  sections: [
    { title: "Pages", items: ["/", "/onboarding", "/dashboard", "/settings", "/checkout", "/search"] },
    { title: "Components", items: ["Button", "Card", "NavBar", "CheckoutSummary", "PricingTable", "OnboardingStep"] },
    { title: "Design system", items: ["--primary: blue-600", "--radius: 12px", "--font: Inter", "Spacing scale 4/8/12/16/24"] },
    { title: "Recent saved changes", items: ["Checkout layout — 3 min ago", "Primary button token — 2 hr ago", "Top nav restructure — yesterday"] },
    { title: "UI hierarchy", items: ["AppShell → Sidebar + Topbar + Outlet", "Checkout → Summary + Address + Payment"] },
    { title: "Styling metadata", items: ["Tailwind v4", "shadcn/ui", "Light theme"] },
  ],
};

export const replitContext = {
  mcp: "Connected",
  sections: [
    { title: "Mobile codebase", items: ["app/", "components/", "screens/", "lib/", "assets/"] },
    { title: "Components", items: ["Button", "Card", "TabBar", "CheckoutSheet", "PriceRow", "OnboardingSlide"] },
    { title: "Feature files", items: ["auth.ts", "onboarding.ts", "checkout.ts", "search.ts", "profile.ts"] },
    { title: "Git / file changes", items: ["screens/Checkout.tsx (pending)", "components/Button.tsx (synced)"] },
    { title: "Build status", items: ["✓ iOS: passing", "✓ Android: passing", "Last build: 42 min ago"] },
    { title: "Test status", items: ["12 / 12 unit tests passing", "3 / 3 e2e passing"] },
    { title: "Recent commits", items: ["feat: onboarding step 4 — 42 min ago", "fix: button token — 2 hr ago"] },
  ],
};

export type ReviewCheck = { label: string; status: "pass" | "warn" | "fail"; note?: string };

export type ReviewItem = {
  id: string;
  summary: string;
  source: PlatformKey;
  target: PlatformKey;
  changeType: ChangeType;
  reason: string;
  suggested: string;
  priority: "Low" | "Medium" | "High";
  detectedAt: string;
  affectedFiles: { platform: PlatformKey; path: string }[];
  before: { platform: PlatformKey; label: string; snippet: string };
  after: { platform: PlatformKey; label: string; snippet: string };
  checks: ReviewCheck[];
};

export const reviewQueue: ReviewItem[] = [
  {
    id: "r1",
    summary: "Checkout screen layout — 3 column grid → mobile stack",
    source: "lovable",
    target: "replit",
    changeType: "UI Layout",
    reason: "The design mapping is ambiguous — two viable mobile layouts",
    suggested: "Use vertical stacked cards with sticky pay CTA",
    priority: "High",
    detectedAt: "3 min ago",
    affectedFiles: [
      { platform: "lovable", path: "src/routes/checkout.tsx" },
      { platform: "replit", path: "screens/Checkout.tsx" },
      { platform: "replit", path: "components/CheckoutSheet.tsx" },
    ],
    before: {
      platform: "replit",
      label: "Replit — current",
      snippet: "<ScrollView>\n  <Summary />\n  <Address />\n  <Payment />\n</ScrollView>",
    },
    after: {
      platform: "replit",
      label: "Replit — proposed",
      snippet: "<VStack sticky={<PayCTA />}>\n  <Card><Summary /></Card>\n  <Card><Address /></Card>\n  <Card><Payment /></Card>\n</VStack>",
    },
    checks: [
      { label: "Design tokens match", status: "pass" },
      { label: "Navigation parity preserved", status: "pass" },
      { label: "Accessibility (tap targets ≥ 44pt)", status: "warn", note: "Pay CTA is 40pt — nudge to 48pt" },
      { label: "No regressions in checkout tests", status: "pass" },
    ],
  },
  {
    id: "r2",
    summary: "Onboarding step 4 affects primary user flow",
    source: "replit",
    target: "lovable",
    changeType: "Feature",
    reason: "The update affects a core user flow",
    suggested: "Insert matching step between screens 3 and 4 in Lovable flow",
    priority: "Medium",
    detectedAt: "42 min ago",
    affectedFiles: [
      { platform: "replit", path: "screens/Onboarding/Step4.tsx" },
      { platform: "lovable", path: "src/routes/onboarding.tsx" },
    ],
    before: {
      platform: "lovable",
      label: "Lovable — current flow",
      snippet: "steps = [Welcome, Profile, Interests, Finish]",
    },
    after: {
      platform: "lovable",
      label: "Lovable — proposed flow",
      snippet: "steps = [Welcome, Profile, Interests, Notifications, Finish]",
    },
    checks: [
      { label: "Analytics events wired", status: "pass" },
      { label: "Copy translated to web voice", status: "warn", note: "Web uses 'Enable alerts' vs mobile 'Turn on notifications'" },
      { label: "Skip path preserved", status: "pass" },
    ],
  },
  {
    id: "r3",
    summary: "Replit build failure on push (button token change)",
    source: "lovable",
    target: "replit",
    changeType: "Design System",
    reason: "A Replit build failed after auto-apply",
    suggested: "Revert token change and re-map to mobile token",
    priority: "High",
    detectedAt: "5 hr ago",
    affectedFiles: [
      { platform: "replit", path: "components/Button.tsx" },
      { platform: "replit", path: "theme/tokens.ts" },
    ],
    before: {
      platform: "replit",
      label: "Replit — pre-sync",
      snippet: "primary: '#3B82F6'\nradius: 8",
    },
    after: {
      platform: "replit",
      label: "Replit — applied (failed)",
      snippet: "primary: oklch(0.55 0.19 255)\nradius: 12",
    },
    checks: [
      { label: "Build passes", status: "fail", note: "React Native theme parser doesn't accept oklch()" },
      { label: "Snapshot tests", status: "fail", note: "6 button snapshots changed" },
      { label: "Visual parity with Lovable", status: "pass" },
    ],
  },
];

export type PlannerIssue = {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  platform: PlatformKey | "both";
  category: "Bug" | "Design Drift" | "Feature Gap" | "Build Failure" | "Data Contract";
  detectedAt: string;
  symptom: string;
  rootCause: string;
  impact: string;
  options: { label: string; effort: "S" | "M" | "L"; risk: "Low" | "Med" | "High"; outcome: string; recommended?: boolean }[];
  plan: { step: string; owner: "Agent" | "Human"; eta: string }[];
};

export const plannerIssues: PlannerIssue[] = [
  {
    id: "p1",
    title: "Replit build fails after design token sync",
    severity: "High",
    platform: "replit",
    category: "Build Failure",
    detectedAt: "5 hr ago",
    symptom: "iOS build errors: 'unknown color function oklch()' in theme/tokens.ts",
    rootCause: "Lovable ships OKLCH color tokens; React Native StyleSheet only parses hex/rgb/hsl.",
    impact: "Blocks all Replit deploys. Design consistency check reports drift on primary button.",
    options: [
      { label: "Convert OKLCH → hex at sync time (agent-side transform)", effort: "S", risk: "Low", outcome: "Unblocks build immediately, no source-of-truth change", recommended: true },
      { label: "Adopt a shared token pipeline (Style Dictionary)", effort: "L", risk: "Med", outcome: "Long-term parity but requires migration on both sides" },
      { label: "Revert Lovable to hex tokens", effort: "M", risk: "Med", outcome: "Loses wide-gamut color fidelity on web" },
    ],
    plan: [
      { step: "Insert OKLCH→hex transform in agent's token mapper", owner: "Agent", eta: "~5 min" },
      { step: "Re-run Replit build & snapshot tests", owner: "Agent", eta: "~8 min" },
      { step: "Post diff to Human Review before merge", owner: "Agent", eta: "auto" },
      { step: "Approve or request adjustments", owner: "Human", eta: "on you" },
    ],
  },
  {
    id: "p2",
    title: "Checkout layout ambiguity — 3-col web → mobile",
    severity: "Medium",
    platform: "replit",
    category: "Design Drift",
    detectedAt: "3 min ago",
    symptom: "Two viable mobile mappings for the new 3-column checkout grid.",
    rootCause: "No mobile layout rule defined for grids with > 2 columns in the design contract.",
    impact: "Sync paused pending choice; users may see inconsistent checkout across platforms.",
    options: [
      { label: "Stacked cards + sticky pay CTA", effort: "S", risk: "Low", outcome: "Best conversion pattern for mobile checkout", recommended: true },
      { label: "Horizontal snap-scroll cards", effort: "M", risk: "Med", outcome: "Preserves visual density but hurts scan-ability" },
      { label: "Multi-step wizard", effort: "L", risk: "High", outcome: "Major flow change — requires PM sign-off" },
    ],
    plan: [
      { step: "Draft mobile layout using stacked-cards template", owner: "Agent", eta: "~3 min" },
      { step: "Generate before/after preview for review", owner: "Agent", eta: "~2 min" },
      { step: "Codify 'grid > 2 cols → stacked' rule in design contract", owner: "Agent", eta: "on approval" },
      { step: "Review and approve mapping", owner: "Human", eta: "on you" },
    ],
  },
  {
    id: "p3",
    title: "Profile preferences drift on Replit",
    severity: "Medium",
    platform: "replit",
    category: "Feature Gap",
    detectedAt: "1 day ago",
    symptom: "Lovable settings page exposes 4 preferences; Replit only surfaces 2.",
    rootCause: "Two preferences added on web after last mobile sync window.",
    impact: "Users on mobile cannot toggle marketing emails or theme.",
    options: [
      { label: "Auto-generate matching Replit screen sections", effort: "M", risk: "Low", outcome: "Full parity in one sync", recommended: true },
      { label: "Feature-flag missing prefs on web until mobile catches up", effort: "S", risk: "Low", outcome: "Reduces UX gap but delays value" },
    ],
    plan: [
      { step: "Read Lovable settings schema via MCP", owner: "Agent", eta: "~1 min" },
      { step: "Scaffold Replit settings rows + wire to /profile/preferences", owner: "Agent", eta: "~10 min" },
      { step: "Run e2e settings test suite", owner: "Agent", eta: "~4 min" },
      { step: "Ship to review", owner: "Agent", eta: "auto" },
    ],
  },
  {
    id: "p4",
    title: "Notifications feature missing on Replit",
    severity: "Low",
    platform: "replit",
    category: "Feature Gap",
    detectedAt: "3 days ago",
    symptom: "No mobile notifications screen; deep-link from push lands on home.",
    rootCause: "Feature shipped web-first; mobile epic not yet scheduled.",
    impact: "Push CTR is 40% below web notif engagement.",
    options: [
      { label: "Agent scaffolds mobile screen from web component tree", effort: "M", risk: "Med", outcome: "Working baseline in one sync cycle", recommended: true },
      { label: "Defer to product team", effort: "S", risk: "Low", outcome: "No change until manually scheduled" },
    ],
    plan: [
      { step: "Draft mobile Notifications screen", owner: "Agent", eta: "~15 min" },
      { step: "Route push deep-links to new screen", owner: "Agent", eta: "~5 min" },
      { step: "Product review & approve", owner: "Human", eta: "on team" },
    ],
  },
];

export const agentSettings = {
  autoSync: true,
  requireReviewCode: true,
  requireReviewDesign: false,
  direction: "bidirectional" as "lovable-to-replit" | "replit-to-lovable" | "bidirectional",
  validation: "standard" as "light" | "standard" | "strict",
  designEnforcement: "balanced" as "flexible" | "balanced" | "strict",
  mcp: {
    lovable: "Connected",
    replit: "Connected",
  },
};

export const quickStats = [
  { label: "In-sync features", value: "78%", hint: "7 of 9 features" },
  { label: "Syncs today", value: "14", hint: "12 auto · 2 reviewed" },
  { label: "Pending reviews", value: "3", hint: "1 high priority" },
  { label: "Failed syncs (7d)", value: "1", hint: "Replit build failure" },
];

// ---------- Simulator ----------

export const lovablePages = [
  { path: "/", name: "Home", mobileScreen: "screens/Home.tsx" },
  { path: "/onboarding", name: "Onboarding", mobileScreen: "screens/Onboarding/index.tsx" },
  { path: "/dashboard", name: "Dashboard", mobileScreen: "screens/Dashboard.tsx" },
  { path: "/settings", name: "Settings", mobileScreen: "screens/Settings.tsx" },
  { path: "/checkout", name: "Checkout", mobileScreen: "screens/Checkout.tsx" },
  { path: "/search", name: "Search", mobileScreen: "screens/Search.tsx" },
  { path: "/pricing", name: "Pricing", mobileScreen: "screens/Pricing.tsx" },
];

export type SimChangeType = "UI Layout" | "Design System" | "Copy" | "Navigation" | "New Feature" | "Data Contract";

export const simExamples: { page: string; type: SimChangeType; description: string }[] = [
  { page: "/checkout", type: "UI Layout", description: "Redesign as a 3-column layout: summary, address, payment" },
  { page: "/settings", type: "New Feature", description: "Add a notifications preferences panel with 4 toggles" },
  { page: "/", type: "Design System", description: "Bump primary color to a bolder blue and radius to 16px" },
  { page: "/dashboard", type: "Navigation", description: "Replace top nav with a persistent left sidebar" },
];

export type LifecyclePhase = {
  key: string;
  label: string;
  mcp: "Lovable MCP" | "Replit MCP" | "Agent" | "Replit CI" | "Reviewer";
  tool?: string;
  detail: string;
};

export type SimPlan = {
  headline: string;
  risk: "Low" | "Medium" | "High";
  requiresReview: boolean;
  mappingRule: string;
  affectedMobileFiles: string[];
  suggestions: { title: string; before: string; after: string; file: string }[];
  validation: { kind: "build" | "test" | "lint" | "visual"; status: "pass" | "fail" | "warn"; detail: string }[];
  lifecycle: LifecyclePhase[];
  dashboardImpact: string[];
};

export function generateSimPlan(page: string, type: SimChangeType, description: string): SimPlan {
  const mobilePath = lovablePages.find((p) => p.path === page)?.mobileScreen ?? "screens/Unknown.tsx";
  const risk: SimPlan["risk"] =
    type === "New Feature" || type === "Navigation"
      ? "High"
      : type === "UI Layout" || type === "Data Contract"
      ? "Medium"
      : "Low";
  const requiresReview = risk !== "Low";

  const mappingRule =
    type === "Navigation"
      ? "Desktop sidebar → mobile bottom tab bar"
      : type === "UI Layout"
      ? "Multi-column grid → stacked cards"
      : type === "Design System"
      ? "OKLCH tokens → hex-safe native tokens"
      : type === "New Feature"
      ? "Web page → mobile screen scaffold"
      : type === "Data Contract"
      ? "REST endpoint → typed mobile hook"
      : "Copy sync (locale keys)";

  const suggestions: SimPlan["suggestions"] =
    type === "UI Layout"
      ? [
          {
            title: "Convert multi-column grid to stacked cards",
            file: mobilePath,
            before: "<Grid cols={3}>\n  <Summary />\n  <Address />\n  <Payment />\n</Grid>",
            after: "<VStack spacing={12} sticky={<PayCTA />}>\n  <Card><Summary /></Card>\n  <Card><Address /></Card>\n  <Card><Payment /></Card>\n</VStack>",
          },
          {
            title: "Add sticky bottom CTA (mobile pattern)",
            file: "components/PayCTA.tsx",
            before: "// (not present)",
            after: "export const PayCTA = () => (\n  <SafeAreaBottom>\n    <PrimaryButton onPress={pay}>Pay</PrimaryButton>\n  </SafeAreaBottom>\n);",
          },
        ]
      : type === "Design System"
      ? [
          {
            title: "Convert OKLCH tokens to hex for RN theme parser",
            file: "theme/tokens.ts",
            before: "primary: 'oklch(0.55 0.19 258)',\nradius: 12,",
            after: "primary: '#3567F0', // from oklch(0.55 0.19 258)\nradius: 16,",
          },
          {
            title: "Update Button to consume new radius",
            file: "components/Button.tsx",
            before: "borderRadius: tokens.radius, // 12",
            after: "borderRadius: tokens.radius, // 16",
          },
        ]
      : type === "New Feature"
      ? [
          {
            title: `Scaffold ${page} mobile screen`,
            file: mobilePath,
            before: "// (not present)",
            after: "export default function Screen() {\n  return <ScrollView>{/* mirrored */}</ScrollView>;\n}",
          },
          {
            title: "Register in mobile navigator",
            file: "navigation/AppTabs.tsx",
            before: "<Tab.Screen name='Home' component={Home} />",
            after: "<Tab.Screen name='Home' component={Home} />\n<Tab.Screen name='New' component={New} />",
          },
        ]
      : type === "Navigation"
      ? [
          {
            title: "Rewrite nav as bottom tab bar (5 tabs max)",
            file: "navigation/AppTabs.tsx",
            before: "<TopBar items={items} />",
            after: "<Tab.Navigator>\n  {items.slice(0, 4).map((i) => <Tab.Screen key={i.key} {...i} />)}\n  <Tab.Screen name='more' component={MoreSheet} />\n</Tab.Navigator>",
          },
        ]
      : type === "Copy"
      ? [
          {
            title: "Sync copy keys to mobile locale",
            file: "locales/en.json",
            before: '"cta": "Get started"',
            after: `"cta": "${description.split(" ").slice(0, 3).join(" ") || "Updated"}"`,
          },
        ]
      : [
          {
            title: "Generate typed mobile hook from OpenAPI",
            file: "lib/api/hooks.ts",
            before: "// (endpoint not wired)",
            after: `export const use${page.replace("/", "") || "Data"}Query = () => useQuery(...);`,
          },
        ];

  const validation: SimPlan["validation"] =
    type === "Design System"
      ? [
          { kind: "build", status: "pass", detail: "iOS + Android build ok · 18.4s" },
          { kind: "test", status: "warn", detail: "6 button snapshots updated" },
          { kind: "lint", status: "pass", detail: "0 issues" },
          { kind: "visual", status: "pass", detail: "Primary color drift < 2%" },
        ]
      : [
          { kind: "build", status: "pass", detail: "Mobile build ok · 14.1s" },
          { kind: "test", status: "pass", detail: "All targeted tests pass" },
          { kind: "lint", status: "pass", detail: "0 issues" },
          { kind: "visual", status: requiresReview ? "warn" : "pass", detail: requiresReview ? "Layout drift — review" : "0 pixel drift" },
        ];

  const lifecycle: LifecyclePhase[] = [
    { key: "detect", label: "Lovable change detected", mcp: "Lovable MCP", tool: "list_recent_changes", detail: `Save on ${page} · ${type}` },
    { key: "read", label: "Agent reads Lovable context", mcp: "Lovable MCP", tool: "get_pages · get_component_hierarchy · get_design_tokens", detail: "Loaded page tree, tokens, recent prompts" },
    { key: "compare", label: "Agent compares Replit mobile app", mcp: "Replit MCP", tool: "get_file_tree · get_mobile_components", detail: `Diffing against ${mobilePath}` },
    { key: "plan", label: "Agent creates sync plan", mcp: "Agent", detail: `Mapping rule: ${mappingRule}` },
    { key: "apply", label: "Agent updates Replit", mcp: "Replit MCP", tool: "apply_code_change", detail: `${suggestions.length} file${suggestions.length === 1 ? "" : "s"} to modify` },
    { key: "ci", label: "Replit build / test / lint runs", mcp: "Replit CI", tool: "run_build · run_tests · run_lint", detail: "Validation pipeline" },
    { key: "gate", label: requiresReview ? "Human review required" : "Sync complete", mcp: requiresReview ? "Reviewer" : "Agent", detail: requiresReview ? "Routed to Human Review Queue" : "Marked in-sync on dashboard" },
  ];

  const dashboardImpact = [
    `New entry appears in Sync Activity: "${description.slice(0, 60)}${description.length > 60 ? "…" : ""}"`,
    `Global status pill flips to "Agent running" then "${requiresReview ? "Review required" : "In sync"}"`,
    requiresReview ? "Review queue count increments by 1" : "In-sync features % ticks up",
    `Mapping rule "${mappingRule}" applied count +1`,
  ];

  return {
    headline: `${type} on ${page} → mobile plan`,
    risk,
    requiresReview,
    mappingRule,
    affectedMobileFiles: Array.from(new Set(suggestions.map((s) => s.file))),
    suggestions,
    validation,
    lifecycle,
    dashboardImpact,
  };
}
