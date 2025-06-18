'use client';

import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";


import { useSuspenseQuery } from "@tanstack/react-query";



export const AgentsView = () => {
  // Initialisation du client TRPC
  const trpc = useTRPC();

  // Récupération des agents avec react-query
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

 

  // Affichage des données si tout va bien
  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
     title="Error"
      description="Something went wrong" 
    />
  )
}
