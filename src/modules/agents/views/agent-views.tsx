'use client';


import { LoadingState } from "@/components/loading-state";

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

export const AgentsViewLoading = () => {
  return (
    <LoadingState
     title="Loading agents..."
      description="This can take few seconds..." 
    />
  )
}

export const AgentsViewError = () => {
  return (
    <LoadingState
     title="Error loading agents"
      description="Something went wrong" 
    />
  )
}
