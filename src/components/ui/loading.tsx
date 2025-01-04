import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "default" | "sm" | "lg";
  text?: string;
}

export function Loading({ size = "default", text = "Loading..." }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-purple-600`} />
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-xl animate-pulse" />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium text-foreground">Loading</h3>
          <p className="text-sm text-muted-foreground">Please wait while we prepare your content...</p>
        </div>
      </div>
    </div>
  );
} 