
import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';

import { cache } from 'react';

/**
 * Création du contexte tRPC
 * Ce contexte est partagé entre toutes les procédures (ex: pour accéder à l'utilisateur connecté, la DB, etc.)
 * On le mémorise avec React.cache pour éviter des recalculs inutiles côté serveur
 */
export const createTRPCContext = cache(async () => {
  /**
   * Ici tu peux ajouter les données du contexte comme l'utilisateur connecté, la session, etc.
   * Exemples :
   * - Récupérer un token dans les headers
   * - Valider l'authentification
   * - Charger des infos utiles pour chaque requête
   */
  // return { userId: 'user_123' }; // <-- Exemple temporaire
});

// On évite d’exporter directement l’objet t car "t" est un nom trop générique
// (souvent utilisé en i18n, ça peut créer des confusions).
const t = initTRPC.create({
  /**
   * Ici on peut configurer des options globales :
   * - data transformer (ex: superjson pour sérialiser dates, maps, etc.)
   * - middleware global
   */
  // transformer: superjson,
});

// Création du routeur de base tRPC
// Tu utiliseras cette fonction pour créer ton routeur principal et les sous-routeurs
export const createTRPCRouter = t.router;

// Fonction utilitaire pour créer un "caller" (utile pour exécuter une procédure côté serveur)
export const createCallerFactory = t.createCallerFactory;

// Procédure de base — tu l’utilises pour toutes les procédures publiques (sans auth)
export const baseProcedure = t.procedure;

// Exemple d’alias : tu peux définir ici une procédure protégée (auth) à étendre plus tard
// Tu peux la sécuriser avec un middleware pour vérifier que l'utilisateur est connecté
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }
  return next({ ctx: { ...ctx, auth: session } });
});
