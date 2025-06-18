import { Loader2Icon } from "lucide-react";

interface Props {
  title: string;
  description?: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-12">
      <div className="bg-muted/50 border border-border dark:border-zinc-700 rounded-2xl p-8 sm:p-10 max-w-md w-full shadow-md text-center space-y-6 animate-in fade-in duration-500">
        
        <div className="flex justify-center">
          <Loader2Icon className="w-10 h-10 text-primary animate-spin" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
