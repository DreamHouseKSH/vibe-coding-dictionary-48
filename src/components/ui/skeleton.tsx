import { cn } from "cn";

function Skeleton({
  className,
  shape = "default",
  ...props
}: React.ComponentProps<"div"> & { shape?: "default" | "circle" }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-muted",
        shape === "circle" && "rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
