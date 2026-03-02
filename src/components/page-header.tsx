"use client";

import { ChatTeardropTextIcon, LifebuoyIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

interface PageHeaderProps {
  title: string;
  className?: string;
}

export function PageHeader({ title, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b px-4 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <ChatTeardropTextIcon weight="duotone" />
          <span className="hidden lg:block">Feedback</span>
        </Button>

        <Button variant="outline" size="sm">
          <LifebuoyIcon weight="duotone" />
          <span className="hidden lg:block">Need Help?</span>
        </Button>
      </div>
    </div>
  );
}
