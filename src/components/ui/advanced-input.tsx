'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

interface AdvancedInputProps {
  className?: string
  children?: React.ReactNode
  popoverContent?: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

function AdvancedInput({ className, children, popoverContent, onOpenChange }: AdvancedInputProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        data-slot="input"
        className={cn(
          "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-lg bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [box-shadow:0_4_36px_rgba(0,0,0,0.05)]",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "cursor-pointer select-none",
          className
        )}
        onClick={handleButtonClick}
      >
        <div className="flex items-center justify-center text-[#CBCBCB]">
          {children || "Click to open"}
        </div>
      </button>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 w-full bg-background border border-border rounded-lg shadow-lg"
          style={{
            top: '100%',
            left: 0,
            marginTop: '4px'
          }}
        >
          {popoverContent || (
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Popover content goes here</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { AdvancedInput }
