"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { AgentGetOne } from "@/modules/agents/types";
import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

/**
 * Définit les colonnes pour le tableau des agents.
 * Chaque colonne est typée avec AgentGetOne.
 */
export const columns: ColumnDef<AgentGetOne>[] = [
  {
    // Colonne pour afficher le nom de l'agent avec son avatar et instructions
    accessorKey: "name",
    header: () => (
      <span
        className="text-xs font-semibold text-gray-600 uppercase tracking-widest"
        aria-label="Agent Name"
      >
        Agent Name
      </span>
    ),
    cell: ({ row }) => {
      const { name, instructions } = row.original;

      return (
        <div
          role="row"
          aria-label={`Agent ${name}`}
          tabIndex={0} // Permet la navigation clavier
          className="group flex flex-col gap-y-2 py-4 px-4 rounded-lg
                     transition duration-300 ease-in-out
                     hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg
                     cursor-pointer outline-none focus:outline-indigo-500"
        >
          {/* Avatar + Nom */}
          <div className="flex items-center gap-5">
            <GeneratedAvatar
              variant="bottsNeutral"
              seed={name}
              className="w-12 h-12 rounded-full border border-gray-300 shadow-sm
                         transition-transform duration-300 ease-in-out
                         group-hover:scale-110 group-hover:shadow-lg"
              aria-hidden="true"
            />
            <span
              className="text-lg font-semibold text-gray-900 capitalize truncate max-w-xs"
              title={name}
              aria-label={`Agent Name: ${name}`}
            >
              {name}
            </span>
          </div>

          {/* Instructions */}
          <div className="flex items-center gap-3 pl-16">
            <CornerDownRightIcon
              className="w-4 h-4 text-gray-400 flex-shrink-0"
              aria-hidden="true"
            />
            <p
              className="text-sm text-green-700 italic leading-relaxed max-w-[320px] line-clamp-2"
              title={instructions}
              aria-label={`Instructions : ${instructions}`}
            >
              {instructions}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    // Colonne affichant le nombre de réunions (meetings) avec icône et pluriel correct
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => {
      // Retourne un badge avec l'icône et le nombre de meetings
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-x-2 [&:has(svg)]:gap-x-1"
        >
          <VideoIcon className="text-blue-700" aria-hidden="true" />
          {row.original.meetingCount}{" "}
          {row.original.meetingCount === 1 ? "Meeting" : "Meetings"}
        </Badge>
      );
    },
  },
];
