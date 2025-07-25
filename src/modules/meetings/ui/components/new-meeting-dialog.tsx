import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "@/modules/meetings/ui/components/meeting-form";
import { useRouter } from "next/navigation";


interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewMeetingDialog = ({
   open,
   onOpenChange,
} : NewMeetingDialogProps) => {
  const router = useRouter();

  return (
    <ResponsiveDialog
     title= "New Meeting"
     description="Create a new meeting"
     open={open}
     onOpenChange={onOpenChange}
    >

    <MeetingForm
      onSuccess={(id) => {
        router.push(`/meetings/${id}`);
        onOpenChange(false);
      }}
      onCancel={() => onOpenChange(false)}
    />

    </ResponsiveDialog>
  )
}