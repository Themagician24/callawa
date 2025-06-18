import { AlertCircleIcon } from "lucide-react"

interface Props {
  title: string
  description: string
  onRetry?: () => void // Bonus UX
}

export const ErrorState = ({ title, description, onRetry }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-12">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl p-8 sm:p-10 max-w-md w-full shadow-lg text-center space-y-6">
        
        <div className="flex justify-center">
          <AlertCircleIcon className="text-red-600 dark:text-red-400 w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-300">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Try Again ...
          </button>
        )}
      </div>
    </div>
  )
}
