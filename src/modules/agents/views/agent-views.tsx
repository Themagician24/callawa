'use client';


import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import {  columns } from "@/modules/agents/ui/components/columns";
import { DataTable } from "@/modules/agents/ui/components/data-table";


import { useTRPC } from "@/trpc/client";


import { useSuspenseQuery } from "@tanstack/react-query";





export const AgentsView = () => {
  // Initialisation du client TRPC
  const trpc = useTRPC();

  // Récupération des agents avec react-query
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

 

  // Affichage des données si tout va bien
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">


      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings.Each agent will follow your instructions and can interact with the participants during the call."
        />
      )}
      
     
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
