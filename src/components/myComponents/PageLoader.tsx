import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
