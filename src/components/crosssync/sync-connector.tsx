import { ArrowLeftRight } from "lucide-react";

export function SyncConnector({ active = true }: { active?: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center py-4 lg:py-0">
      <svg
        viewBox="0 0 200 40"
        className="hidden lg:block h-10 w-40"
        aria-hidden
      >
        <line
          x1="4"
          y1="20"
          x2="196"
          y2="20"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
        {active && (
          <line
            x1="4"
            y1="20"
            x2="196"
            y2="20"
            stroke="var(--color-primary)"
            strokeWidth="2"
            className="cs-flow"
          />
        )}
      </svg>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border bg-card shadow-sm lg:absolute lg:inset-x-0 lg:mx-auto">
        <ArrowLeftRight className="h-4 w-4 text-primary" />
        {active && (
          <span className="absolute -inset-1 rounded-full ring-2 ring-primary/30 cs-pulse" />
        )}
      </div>
      <svg
        viewBox="0 0 4 60"
        className="block lg:hidden h-16 w-1"
        aria-hidden
      >
        <line x1="2" y1="0" x2="2" y2="60" stroke="var(--color-border)" strokeWidth="2" />
        {active && (
          <line x1="2" y1="0" x2="2" y2="60" stroke="var(--color-primary)" strokeWidth="2" className="cs-flow" />
        )}
      </svg>
    </div>
  );
}
