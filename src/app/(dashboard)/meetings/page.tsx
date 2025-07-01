import { auth } from '@/lib/auth';
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header';
import MeetingsViews, {
  MeetingsViewError,
  MeetingsViewLoading
} from '@/modules/meetings/ui/views/meetings-views';

// TRPC + gestion du cache server-side
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

// Outils Next.js
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// React + gestion d’erreur + suspense
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';


// Composant serveur de la page
const page = async () => {

  
  // Protection d'accès à la page : redirection si non connecté
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in"); // Redirige les utilisateurs non authentifiés
  }

  // Préchargement des données de réunions avec TRPC (SSR compatible)
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  );

  
  return (
    <>
      {/*  Header avec le titre et bouton "New meeting" */}
      <MeetingsListHeader />
      {/* 💾 Hydrate les données TRPC côté client (pour éviter un refetch inutile) */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Affiche un fallback de chargement tant que la vue ne s’est pas rendue */}
        <Suspense fallback={<MeetingsViewLoading />}>
          {/*Gère les erreurs dans le composant MeetingsViews */}
          <ErrorBoundary fallback={<MeetingsViewError />}>
            {/* Vue principale qui liste les réunions */}
            <MeetingsViews />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
