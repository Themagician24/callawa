import Image from "next/image";

interface Props {
  title: string;
  description: string;
  onRetry?: () => void; // Optionnel : bouton pour relancer une action
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center space-y-6">
      {/* Illustration */}
      <Image
        src="/empty.svg"
        width={240}
        height={240}
        alt="Illustration vide"
        className="mb-2"
        priority
      />

      {/* Titre + Description */}
      <div className="flex flex-col gap-y-2 max-w-md">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

     
    </div>
  );
};
