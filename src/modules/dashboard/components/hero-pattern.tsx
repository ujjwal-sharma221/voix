"use client";

import { cn } from "@/lib/utils";
import { BarVisualizer } from "@/components/ui/bar-visualizer";

export function HeroPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none rounded-none bg-muted  absolute inset-0 hidden overflow-hidden lg:block ",
        className,
      )}
    >
      <BarVisualizer
        className="rounded-t-none "
        demo={true}
        state="speaking"
        barCount={15}
      />
    </div>
  );
}
