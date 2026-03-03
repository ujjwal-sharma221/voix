"use client";

import {
  EqualizerIcon,
  SparkleIcon,
  BookOpenTextIcon,
} from "@phosphor-icons/react";

import { Orb } from "@/components/ui/orb";
import { Button } from "@/components/ui/button";

export function VoicePreviewPlaceHolder() {
  return (
    <div className="hidden flex-1 lg:flex h-full flex-col items-center justify-center gap-6 border-t">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex w-32 items-center justify-center">
          <div className="">
            <Orb
              className="size-30"
              colors={["#EA7B7B", "#FFEAD3"]}
              seed={Math.random() * 100 + 1000}
            />
          </div>

          <div className="absolute left-34  rounded-full bg-muted p-4">
            <SparkleIcon className="size-5" />
          </div>

          <div className="absolute -left-15  rounded-full bg-muted p-4">
            <EqualizerIcon className="size-5" />
          </div>
        </div>

        <p className="text-lg font-semibold tracking-tight text-foreground">
          Preview will appear here
        </p>
        <p className="text-muted-foreground max-w-64 text-center text-sm">
          Once you generate, your audio results will appear here, sit back and
          relax
        </p>
      </div>

      <Button variant="outline" size="sm">
        <BookOpenTextIcon weight="duotone" />
        Know how
      </Button>
    </div>
  );
}
