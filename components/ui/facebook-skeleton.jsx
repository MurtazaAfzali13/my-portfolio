import { cn } from "@/lib/utils";

export function FacebookSkeleton({ className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-white/10",
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
        "before:animate-facebook-shimmer",
        className
      )}
    />
  );
}
