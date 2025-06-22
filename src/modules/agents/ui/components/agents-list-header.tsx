"use client";

import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <header
        className="py-6 px-4 md:px-8 bg-white rounded-lg shadow-sm
                   flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-gray-900
                     tracking-tight select-none"
        >
          My Agents
        </h1>

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
      </header>
    </>
  );
};

export default AgentsListHeader;
