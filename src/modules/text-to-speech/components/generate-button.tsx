"use client";

import { Button } from "@/components/ui/button";
import { SpinnerGapIcon } from "@phosphor-icons/react";

interface GenerateButtonProps {
  size?: "default" | "sm";
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  className?: string;
}

export function GenerateButton({
  size,
  isSubmitting,
  onSubmit,
  className,
  disabled,
}: GenerateButtonProps) {
  return (
    <Button
      size={size}
      onClick={onSubmit}
      disabled={disabled}
      className={className}
    >
      {isSubmitting ? (
        <>
          <SpinnerGapIcon className="size-3 animate-spin" />
          Generating
        </>
      ) : (
        <>Generate Speech</>
      )}
    </Button>
  );
}
