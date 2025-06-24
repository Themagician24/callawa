import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronRightIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";

interface Props {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const AgentIdViewHeader = ({
  agentId,
  agentName,
  onEdit,
  onRemove,
}: Props) => {
  return (
    <div className="flex items-center justify-between border-b pb-4 mb-2">
      {/* Fil d’ariane stylisé */}
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/agents"
                className="text-gray-500 hover:text-blue-600 transition-colors font-medium"
              >
                My Agents
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/agents/${agentId}`}
                className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:underline"
              >
                {agentName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Bouton d'action avec dropdown */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200 group"
          >
            <MoreVerticalIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-800 dark:group-hover:text-white" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl animate-in fade-in zoom-in-95"
        >
          <DropdownMenuItem
            onClick={onEdit}
            className="flex items-center gap-2 text-sm font-medium px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors"
          >
            <PencilIcon className="w-4 h-4 text-blue-600" />
            Edit Agent
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onRemove}
            className="flex items-center gap-2 text-sm font-medium px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors"
          >
            <Trash2Icon className="w-4 h-4 text-red-600" />
            Remove Agent
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
