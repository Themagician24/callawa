import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentGetOne } from "@/modules/agents/types";
import { AgentForm } from "@/modules/agents/ui/components/agent-form";


interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialsValues: AgentGetOne;
};

export const UpdateAgentDialog = ({
   open,
   onOpenChange,
   initialsValues
} : UpdateAgentDialogProps) => {
  
  return (
    <ResponsiveDialog
     title= "Edit Agent"
     description="Edit the agent details"
     open={open}
     onOpenChange={onOpenChange}
    >

    <AgentForm
     onSuccess={() => onOpenChange(false)}
     onCancel={() => onOpenChange(false)}
     initialValues={initialsValues}
    />

    </ResponsiveDialog>
  )
}