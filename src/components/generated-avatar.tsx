import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "bottsNeutral" | "initials";
}

export const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  let avatar;

  // Création avatar SVG avec Dicebear, taille élevée pour une netteté optimale
  if (variant === "bottsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed,
      size: 64,
    });
  } else {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 700,
      fontSize: 52,
      size: 64,
    });
  }

  // Génération d'une couleur dynamique basée sur la seed pour le fallback (ex: pastel)
  const hashColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    const h = hash % 360;
    return `hsl(${h}, 70%, 80%)`; // Pastel color
  };

  return (
    <Avatar
      className={cn(
        "relative w-16 h-16 sm:w-20 sm:h-20", // 64px à 80px responsives
        "rounded-full border border-gray-300 bg-white",
        "shadow-sm transition-transform duration-300 ease-out",
        "hover:shadow-xl hover:-translate-y-1 hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        className
      )}
    >
      {/* Image SVG qui remplit le conteneur, arrondie */}
      <AvatarImage
        src={avatar.toDataUri()}
        alt={`Avatar de ${seed}`}
        className="object-cover w-full h-full rounded-full select-none"
        draggable={false}
      />

      {/* Fallback : cercle avec couleur dynamique + initiale centrée */}
      <AvatarFallback
        className="flex items-center justify-center rounded-full text-gray-700 font-extrabold text-xl select-none"
        style={{ backgroundColor: hashColor(seed) }}
      >
        {seed.charAt(0).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
