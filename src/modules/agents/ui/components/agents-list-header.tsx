"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE } from "@/constants";
import { useAgentFilters } from "@/modules/agents/hooks/use-agents-filters";
import { AgentSearchFilter } from "@/modules/agents/ui/components/agents-search-filter";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({ 
      search: "",
      page: DEFAULT_PAGE,

     });
  }

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <div
        className="py-6 px-4 md:px-8 bg-white rounded-lg shadow-sm
                   flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <h5
          className="text-2xl sm:text-3xl font-extrabold text-gray-900
                     tracking-tight select-none"
        >
          My Agents
        </h5>

        <Button
          onClick={() => setIsDialogOpen(true)}
          aria-label="Create a new agent"
          aria-expanded={isDialogOpen}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                     focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2
                     text-white font-semibold transition-transform duration-150
                     ease-in-out shadow-md hover:shadow-lg active:scale-95"
        >
          <PlusIcon className="w-5 h-5" aria-hidden="true" />
          New Agent
        </Button>
      </div>

      <div className="flex items-center gap-x-2 py-4 p-1" >
        <AgentSearchFilter />

        {isAnyFilterModified && (
          <Button
            onClick={onClearFilters}
            variant="outline"
           
          >
            <XCircleIcon />
            Clear 
          </Button>
        )}
      </div>
    </>
  );
};

export default AgentsListHeader;
