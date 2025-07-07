"use client";

import { Button } from "@/components/ui/button";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meeting-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";



export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
     <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    <div className="py-4 px-4 md:px-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h5 className="text-3xl font-bold">My Meetings</h5>
        <Button onClick={() => setIsDialogOpen(true)}>
           <PlusIcon />
          New Meeting
        </Button>
      </div>
      <div className="flex items-center gap-x-2 p-1">
        {/* TODO: Filters */}
        TODO FILTERS

      </div>
    </div>
    
    
    </>
  )
};

export default MeetingsListHeader;
