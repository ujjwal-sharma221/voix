"use client";

import { usePathname } from "next/navigation";

import { BarVisualizer, type AgentState } from "@/components/ui/bar-visualizer";
import { cn } from "@/lib/utils";

export function HeroPattern({ className }: { className?: string }) {
  const pathname = usePathname();

  const visualizerMap = new Map<string, AgentState>([
    ["/", "initializing"],
    ["/voices", "listening"],
    ["/text-to-speech", "speaking"],
    ["/voice-cloning", "thinking"],
  ]);

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
        state={visualizerMap.get(pathname) ?? "initializing"}
        barCount={15}
      />
    </div>
  );
}
