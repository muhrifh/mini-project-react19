import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function ImageLoader({ className, ...props }: ImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("bg-muted animate-pulse", className)}>
      <img
        {...props}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
