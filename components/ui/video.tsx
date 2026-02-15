import { cn } from "@/lib/utils";

function Video({ className, ...props }: React.ComponentProps<"video">) {
  return (
    <video
      data-slot="video"
      className={cn("h-auto w-full rounded-xl border border-border/60 bg-black", className)}
      {...props}
    />
  );
}

export { Video };
