"use client";

import { useUser } from "@clerk/nextjs";
import { ChatTeardropTextIcon, LifebuoyIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-muted-foreground">Nice to see you</p>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
        </h1>
      </div>

      <div className="lg:flex hidden items-center gap-3">
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
