import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

/**
 * Solid pill. The orange dot lives in the left gutter (the button reserves padding for it),
 * so the label never sits on top of it. On hover the dot grows to fill the pill and the label flips to black + arrow.
 */
const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-start overflow-hidden rounded-full whitespace-nowrap text-left font-medium",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-all duration-300 group-hover:opacity-0">{text}</span>
      <span className="absolute left-[20px] top-1/2 z-0 h-2 w-2 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ease-out group-hover:left-0 group-hover:h-full group-hover:w-full group-hover:rounded-full group-hover:scale-[1.2]" aria-hidden />
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
        {text}
        <ArrowRight size={16} aria-hidden />
      </span>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
