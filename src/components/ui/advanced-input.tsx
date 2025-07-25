"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AdvancedInputProps {
  className?: string;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  dialogTitle?: string;
}

function AdvancedInput({
  className,
  children,
  title,
  dialogTitle,
  onOpenChange,
}: AdvancedInputProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          data-slot="input"
          className={cn(
            "flex h-9 w-full rounded-lg bg-transparent px-3 py-1 text-base outline-none cursor-pointer select-none",
            "focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "dark:bg-input/30",
            "[box-shadow:0_4_36px_rgba(0,0,0,0.05)] mb-0",
            className
          )}
        >
          <div className="flex items-center justify-center text-[#CBCBCB]">
            {title || "Click to open"}
          </div>
        </button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
      </DialogHeader>

      <DialogContent className="">
        {dialogTitle && (
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
        )}
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export { AdvancedInput };
