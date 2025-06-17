"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";


export const DashboardNavbar = () => {

     const { state, toggleSidebar, isMobile } = useSidebar();
     const [commandOpen, setCommandOpen] = useState(false);

     useEffect(() => {
      const down = (e: KeyboardEvent) => {
           
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setCommandOpen((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
     }, [commandOpen]);



     return (
       <>
         <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

         <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
           <Button
             className="size-9 "
             variant="outline"
             onClick={toggleSidebar}
           >
             {state === "collapsed" || isMobile ? (
               <PanelLeftIcon className="size-4" />
             ) : (
               <PanelLeftIcon className="size-4" />
             )}
           </Button>

           <Button
             className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:bg-muted"
             variant="outline"
             size="sm"
             onClick={() => setCommandOpen((open) => !open)}
           >
             <SearchIcon className="mr-2 h-4 w-4" />
             Search
             <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
               <span className="text-xs">⌘</span>K
             </kbd>
           </Button>
         </nav>
       </>
     );
}