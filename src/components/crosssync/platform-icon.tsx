import { Globe, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlatformKey } from "@/data/sample";

export function PlatformIcon({ platform, className }: { platform: PlatformKey; className?: string }) {
  const Icon = platform === "lovable" ? Globe : Smartphone;
  const bg = platform === "lovable" ? "bg-info-soft text-info" : "bg-primary/10 text-primary";
  return (
    <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg", bg, className)}>
      <Icon className="h-4.5 w-4.5" size={18} />
    </span>
  );
}

export function PlatformLabel({ platform }: { platform: PlatformKey }) {
  return <span className="font-medium">{platform === "lovable" ? "Lovable" : "Replit"}</span>;
}
