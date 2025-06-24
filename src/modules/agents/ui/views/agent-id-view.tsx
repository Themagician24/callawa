"use client";

import { ErrorState } from "@/components/error-state";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { LoadingState } from "@/components/loading-state";
import { Badge } from "@/components/ui/badge";
import { AgentIdViewHeader } from "@/modules/agents/ui/components/agent-id-view-header";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 py-6 px-6 md:px-10 flex flex-col gap-y-6 bg-gray-50 dark:bg-background">
      {/* Header */}
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => console.log("edit")}
        onRemove={() => console.log("remove")}
      />

      {/* Carte principale */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-border shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="px-6 py-6 flex flex-col gap-y-6">
          
          {/* Avatar + Nom + ID */}
          <div className="flex items-center gap-x-4">
            <GeneratedAvatar
              variant="bottsNeutral"
              seed={data.name}
              className="w-14 h-14 shadow-md rounded-full"
            />

            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                {data.name}
              </h2>

              <span className="inline-flex items-center gap-2 mt-1 rounded-full bg-gradient-to-r from-red-600 to-pink-600 px-3 py-1 text-xs font-bold text-white shadow ring-1 ring-red-500/40">
                <span className="uppercase">ID</span>
                <span className="text-sm font-mono">{data.identifier}</span>
              </span>
            </div>
          </div>

          {/* Badge réunion avec icône visible et stylée */}
          <Badge
            variant="outline"
            className="group flex items-center gap-x-3 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/10 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            <div className="flex items-center justify-center p-2 rounded-full bg-blue-100 dark:bg-blue-800 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <VideoIcon className="w-6 h-6 text-blue-700 dark:text-blue-300" />
            </div>

            <span className="text-sm font-semibold tracking-tight">
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "Meeting" : "Meetings"}
            </span>
          </Badge>

          {/* Instructions */}
          <div className="flex flex-col gap-y-3">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Instructions
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {data.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentIdViewLoading = () => (
  <LoadingState
    title="Loading agent..."
    description="This might take a few seconds..."
  />
);

export const AgentIdViewError = () => (
  <ErrorState
    title="Error loading agent"
    description="Something went wrong. Please try again."
  />
);
