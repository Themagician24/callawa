"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/**
 * Avatar racine – arrondi, plus grand, et hover fluide.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full",
        "w-14 h-14", // avatar plus grand par défaut
        "border border-gray-300 shadow-sm",
        "transition-transform duration-300 hover:scale-105 hover:shadow-lg",
        className
      )}
      {...props}
    />
  );
}

/**
 * Image de l’avatar – qualité haute et responsive.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "w-full h-full object-cover object-center", // assure l’effet circulaire
        "transition-opacity duration-300",
        className
      )}
      {...props}
    />
  );
}

/**
 * Fallback en cas d’absence ou d’erreur de chargement de l’image.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex items-center justify-center w-full h-full rounded-full",
        "bg-gray-200 text-gray-700 text-sm font-semibold uppercase",
        "transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
